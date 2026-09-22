#!/usr/bin/env python3
"""Validate the inline SVG figures in the *_Telugu.md docs.

Every check here corresponds to a defect class that actually shipped into a PDF
at some point, and that reading the page did not reliably catch:

  blankline  a blank line inside <svg> makes markdown-it close the HTML block,
             and the rest of the diagram is emitted as a paragraph
  htmltag    <b>/<i> are invalid in the SVG namespace and break out of the svg
  leaked     a CSS class name rendered as text ("t-w", or split one char per
             line) — caused by passing a class into a body-lines argument
  contrast   text whose colour fails a WCAG luminance check against the shape
             filled behind it, in either direction
  below      a text baseline or rect bottom past the viewBox height: SVG clips
             there, so the content is invisible with no other symptom
  side       text running past the left/right edge of the viewBox
  overlap    two box-like rects partially overlapping (nested ones are normal)

Usage:  python3 .pdftool/check-figures.py [file.md ...]     (default: *_Telugu.md)
"""
import glob
import re
import sys
import unicodedata

SVG = re.compile(r'<svg\b.*?</svg>', re.S)
TEXT = re.compile(r'<text\s([^>]*?)>(.*?)</text>', re.S)
RECT = re.compile(r'<rect\s([^>]*?)/?>')
ROUND = re.compile(r'<(?:circle|ellipse)\s([^>]*?)/?>')

NODE_FILL = {'n': '#ffffff', 'n-dark': '#17203a', 'n-acc': '#e2653a',
             'n-good': '#e9f4ee', 'n-bad': '#fcecea', 'n-info': '#eaf0fa',
             'n-soft': '#f4efe4'}
TEXT_FILL = {'t': '#16203a', 't-sm': '#6f7889', 't-xs': '#6f7889',
             't-w': '#ffffff', 't-w-sm': '#e8ecf4', 't-acc': '#e2653a'}
FLIP = {'t': 't-w', 't-sm': 't-w-sm', 't-w': 't', 't-w-sm': 't-sm'}
PAPER = '#fdf9f0'
MIN_CONTRAST = 2.6

# rough per-character advance, by text class; Telugu combining marks add none
ADVANCE = {'t': 6.4, 't-w': 6.4, 't-sm': 5.0, 't-w-sm': 4.8,
           't-xs': 5.4, 't-acc': 5.4, 'mono': 5.7}


def attrs(s):
    return dict(re.findall(r'(\w[\w-]*)="([^"]*)"', s))


def num(d, k, default=0.0):
    try:
        return float(d.get(k, default))
    except ValueError:
        return default


def luminance(hex_colour):
    h = hex_colour.lstrip('#')
    ch = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in ch]
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2]


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def shape_fill(d):
    for c in d.get('class', '').split():
        if c in NODE_FILL:
            return NODE_FILL[c]
    fill = d.get('fill', '')
    return fill if re.fullmatch(r'#[0-9a-fA-F]{6}', fill) else None


def advance(body, unit):
    return sum(0 if unicodedata.combining(c) or 'ా' <= c <= 'ౖ' else unit
               for c in body)


def plain(body):
    body = re.sub(r'<[^>]+>', '', body)
    return (body.replace('&lt;', '<').replace('&gt;', '>')
                .replace('&amp;', '&').strip())


def check(path):
    src = open(path).read()
    issues = []

    def say(kind, line, msg):
        issues.append((kind, path, line, msg))

    for m in SVG.finditer(src):
        svg, line = m.group(0), src[:m.start()].count('\n') + 1

        if '\n\n' in svg:
            say('blankline', line, 'blank line inside <svg> — block will break')
        for tag in re.finditer(r'</?(?:b|i|strong|em)>', svg):
            say('htmltag', line, f'{tag.group(0)} is invalid inside <svg>')

        vb = re.search(r'viewBox="([\d.\- ]+)"', svg)
        if not vb:
            say('viewbox', line, 'no viewBox')
            continue
        _, _, vw, vh = (float(x) for x in vb.group(1).split())

        shapes = []
        for r in RECT.finditer(svg):
            d = attrs(r.group(1))
            box = (num(d, 'x'), num(d, 'y'), num(d, 'width'), num(d, 'height'))
            fill = shape_fill(d)
            if fill:
                shapes.append((*box, fill))
            if box[1] + box[3] > vh:
                say('below', line, f'rect bottom {box[1] + box[3]:g} > viewBox {vh:g}')
        for r in ROUND.finditer(svg):
            d = attrs(r.group(1))
            fill = shape_fill(d)
            if fill:
                rad = num(d, 'r') or num(d, 'rx')
                shapes.append((num(d, 'cx') - rad, num(d, 'cy') - rad,
                               2 * rad, 2 * rad, fill))

        # Partially overlapping boxes. Fully nested is a normal header band, and
        # a deliberate overlap (two colliding calendar entries, say) is drawn
        # semi-transparent so both stay visible — so `opacity` opts a rect out.
        opaque = {(num(d, 'x'), num(d, 'y'), num(d, 'width'), num(d, 'height'))
                  for d in (attrs(r.group(1)) for r in RECT.finditer(svg))
                  if 'opacity' in d}
        boxes = [s for s in shapes
                 if s[2] >= 40 and s[3] >= 20 and s[:4] not in opaque]
        for i in range(len(boxes)):
            for j in range(i + 1, len(boxes)):
                ax, ay, aw, ah, _ = boxes[i]
                bx, by, bw, bh, _ = boxes[j]
                ox = max(0, min(ax + aw, bx + bw) - max(ax, bx))
                oy = max(0, min(ay + ah, by + bh) - max(ay, by))
                if ox <= 1 or oy <= 1:
                    continue
                area, smaller = ox * oy, min(aw * ah, bw * bh)
                if area >= smaller - 1 or area < 0.04 * smaller:
                    continue
                say('overlap', line,
                    f'{aw:g}x{ah:g}@{ax:g},{ay:g} overlaps {bw:g}x{bh:g}@{bx:g},{by:g}')

        nodes = [(attrs(t.group(1)), plain(t.group(2))) for t in TEXT.finditer(svg)]

        # a class name rendered as text, whole or split one character per line
        for i, (d, body) in enumerate(nodes):
            if body in ('t-w', 't-w-sm', 't-sm', 'n-acc', 'n-dark'):
                say('leaked', line, f'text node renders the class name {body!r}')
        i = 0
        while i < len(nodes):
            j, chars = i, []
            x0, c0 = nodes[i][0].get('x'), nodes[i][0].get('class')
            while (j < len(nodes) and len(nodes[j][1]) == 1
                   and nodes[j][0].get('x') == x0
                   and nodes[j][0].get('class') == c0):
                chars.append(nodes[j][1])
                j += 1
            if len(chars) >= 3 and ''.join(chars) in TEXT_FILL:
                say('leaked', line,
                    f'class name {"".join(chars)!r} split one char per line')
                i = j
            else:
                i += 1

        for d, body in nodes:
            if not body:
                continue
            cls = d.get('class', '').split()
            x, y = num(d, 'x'), num(d, 'y')

            if y > vh:
                say('below', line, f'baseline {y:g} > viewBox {vh:g} | {body[:40]}')

            unit = next((ADVANCE[c] for c in cls if c in ADVANCE), 6.0)
            w = advance(body, unit)
            if 'mid' in cls:
                left = x - w / 2
            elif 'end' in cls or d.get('text-anchor') == 'end':
                left = x - w
            else:
                left = x
            if left + w > vw + 10 or left < -10:
                say('side', line,
                    f'spans {left:.0f}..{left + w:.0f} of {vw:g} | {body[:40]}')

            key = next((c for c in cls if c in FLIP), None)
            if not key or 'fill:' in d.get('style', ''):
                continue
            bg = PAPER
            for rx, ry, rw, rh, fill in shapes:   # last match wins = topmost
                if rx + 3 <= x <= rx + rw - 3 and ry + 8 <= y <= ry + rh - 1:
                    bg = fill
            if contrast(TEXT_FILL[key], bg) < MIN_CONTRAST:
                alt = FLIP[key]
                better = ' — use %s' % alt if contrast(TEXT_FILL[alt], bg) > \
                    contrast(TEXT_FILL[key], bg) else ''
                say('contrast', line,
                    f'{key} on {bg} is {contrast(TEXT_FILL[key], bg):.1f}:1'
                    f'{better} | {body[:34]}')
    return issues


def main(argv):
    files = argv[1:] or sorted(glob.glob('*_Telugu.md'))
    found = []
    for f in files:
        found += check(f)
    for kind, path, line, msg in found:
        print('%-10s %-42s L%-6d %s' % (kind, path, line, msg))
    print('\n%d figure issue(s) across %d file(s)' % (len(found), len(files)))
    return 1 if found else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv))
