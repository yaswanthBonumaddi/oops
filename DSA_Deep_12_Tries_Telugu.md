<!-- style: editorial -->
<!-- footer: Tries · DSA అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">D12</div>
<div class="kicker">DSA Deep Dive 12 · నిజమైన 2,34,454-పదాల నిఘంటువు మీద కొలిచినది</div>
<div class="rule"></div>
<div class="cover-title">Tries</div>
<div class="lede">Trie ఒక hash map యొక్క మెరుగైన రూపం కాదు. అది <b>ఒక ప్రత్యేక ప్రశ్నకి</b> మాత్రమే మెరుగైనది — మరియు మిగతా ప్రతి ప్రశ్నకీ <b>నాసిరకం</b>.</div>
<div class="sub">మొదటిది — ఒక్క <code>end</code> గుర్తు మర్చిపోతే, నిజమైన ఉపసర్గల మీద <b>100.0%</b> తప్పు, కానీ యాదృచ్ఛిక strings మీద <b>3.78%</b>. రెండోది — ఉపసర్గ వెతుకులాటకి trie <b>208×</b> వేగం, మరియు కచ్చితమైన వెతుకులాటకి <code>Set</code> <b>19.9×</b> వేగం. మూడోది — ఆ వేగం <b>30×</b> memory తో కొన్నది, మరియు 26-గళ్ళ array వాడితే అది <b>96.2% ఖాళీ</b>.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · DSA Deep Dive 12</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి సంఖ్యా నిజంగా `node` lo run చేసినదే**, మరియు అవన్నీ ఒక **నిజమైన నిఘంటువు** మీద — `/usr/share/dict/words`, అందులో a–z పదాలు **2,34,454**, మొత్తం అక్షరాలు **22,48,642**.

<div class="box warn">
<div class="lab">Trie ఈ series lo ఏకైక structure — దీనికి ఒక <i>ఒకే ఒక్క</i> కారణం ఉంది</div>
Hash map: కచ్చితమైన key → విలువ. <b>వేగం, చౌక.</b><br>
Trie: కచ్చితమైన key → విలువ. <b>నెమ్మది, ఖరీదు.</b><br><br>
అలాంటప్పుడు trie ఎందుకు? ఎందుకంటే hash map ఒక ప్రశ్నకి జవాబు ఇవ్వలేదు: <b>"'pre' తో మొదలయ్యేవి ఏవి?"</b> — దానికి hash map <b>ప్రతి key నీ</b> చూడాల్సిందే.<br><br>
<b>కాబట్టి trie కి ఒకే ఒక్క సమర్థన: ఉపసర్గ (prefix).</b> అది మీ problem lo లేకపోతే — trie వద్దు. §7 lo రెండు వైపులా కొలుస్తాం.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. Trie ఒక ఆకారం, ఒక structure కాదు
2. అడగాల్సిన ప్రశ్నలు

**Part 2 — మొదటి విరుపు: ఒక bit**

3. Step — trie కట్టడం
4. **మొదటి విరుపు** — 3.78%, ఆపై 100.0%
5. Step — `end` మరియు `startsWith` వేరు

**Part 3 — రెండో విరుపు: దేనికి వేగం**

6. Step — ఉపసర్గ వెతుకులాట
7. **రెండో విరుపు** — 208× వేగం, మరియు 19.9× నెమ్మది

**Part 4 — మూడో విరుపు: ఖరీదు**

8. Step — nodes ఎన్ని?
9. **మూడో విరుపు** — 30× memory, 96.2% ఖాళీ
10. Step — తీసేయడం ఎందుకు కష్టం

**Part 5 — నిరూపణ మరియు ప్రదర్శన**

11. మొత్తం code
12. 3,600 tries · mutation testing
13. Trie ఎప్పుడు **వద్దు**
14. Follow-ups — radix tree, Aho-Corasick, DAWG
15. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. Trie ఒక ఆకారం, ఒక structure కాదు

Trie lo **విలువలు nodes lo ఉండవు** — అవి **దారిలో** ఉంటాయి.

`"cat"` అనే పదం ఎక్కడా నిల్వ ఉండదు. `c` → `a` → `t` అనే **మూడు అంచుల దారి** ఉంటుంది, మరియు చివరి node మీద ఒక గుర్తు: *"ఇక్కడ ఒక పదం ముగిసింది."*

<div class="box good">
<div class="lab">దీని నుంచి రెండు విషయాలు వెంటనే వస్తాయి</div>
<b>1. ఉపసర్గలు ఉచితంగా పంచుకోబడతాయి.</b> <code>cat</code>, <code>car</code>, <code>card</code> — <code>ca</code> ఒక్కసారే నిల్వ.<br><br>
<b>2. "ఒక పదం ముగిసింది" అనేది <i>ప్రత్యేకంగా</i> గుర్తుపెట్టాలి.</b> ఎందుకంటే <code>ca</code> దగ్గర ఒక node ఉంది, కానీ <code>ca</code> ఒక పదం కాదు.<br><br>
రెండోది ఒక్క boolean. మరియు <b>§4 lo చూస్తాం — ఆ ఒక్క boolean మర్చిపోతే తప్పుల రేటు 100.0%.</b>
</div>

---

## 2. అడగాల్సిన ప్రశ్నలు

| ప్రశ్న | ఎందుకు అడుగుతున్నాం |
|---|---|
| **ఉపసర్గ** ప్రశ్నలు నిజంగా ఉన్నాయా? | లేకపోతే trie వద్దు — §7 lo `Set` **19.9×** వేగం |
| **ఎన్ని** పదాలు, **ఎంత పొడవు**? | §9 — 2.34 లక్షల పదాలకి trie **150 MB**, `Set` **5 MB** |
| **అక్షరమాల** (alphabet) ఏమిటి? | a–z ఆ, Unicode ఆ? §9 — 26-గళ్ళ array Unicode కి పనిచేయదు |
| **తీసేయడం** అవసరమా? | అవసరమైతే §10 — ఇది చాలా tricky, మరియు ఇక్కడే చాలా bugs |
| ఎన్ని **సూచనలు** చూపించాలి? | 10 చాలంటే traversal ముందే ఆపొచ్చు — §7 lo అదే కొలిచాను |
| Trie **మారుతూ** ఉంటుందా, స్థిరమా? | స్థిరమైతే §14 — DAWG లేదా sorted array + binary search చౌక |

<div class="box warn">
<div class="lab">ఒక ప్రశ్న అడిగితే మీరు దీన్ని నిజంగా నడిపారని తెలుస్తుంది</div>
<b>"ఉపసర్గ ప్రశ్నలు నిజంగా ఉన్నాయా, లేక కచ్చితమైన వెతుకులాట మాత్రమేనా?"</b><br><br>
ఎందుకంటే §7 lo కొలిచినది ఇదే, మరియు జవాబు <b>రెండు వైపులా</b> పెద్దది:<br><br>
<b>ఉపసర్గ → trie 208× వేగం</b> (831 ms → 4 ms) · <b>కచ్చితం → <code>Set</code> 19.9× వేగం</b> (18 ms vs 358 ms).<br><br>
మరియు trie <b>30× memory</b> తీసుకుంటుంది. కాబట్టి తప్పు ఎంపిక చేస్తే <b>నెమ్మది <i>మరియు</i> ఖరీదు</b>.
</div>

---

# Part 2 — మొదటి విరుపు: ఒక bit

---

## 3. Step — trie కట్టడం

```javascript
const node = () => ({ ch: new Map() });
function insert(root, word) {
  let n = root;
  for (const c of word) {
    if (!n.ch.has(c)) n.ch.set(c, node());
    n = n.ch.get(c);
  }
}
function has(root, word) {
  let n = root;
  for (const c of word) {
    if (!n.ch.has(c)) return false;
    n = n.ch.get(c);
  }
  return true;              // దారి ఉంది → పదం ఉంది
}
```

నిఘంటువు మొత్తం చేర్చి పరీక్షిద్దాం: `has("apple")` ✓ · `has("zzzz")` ✗ · `has("computer")` ✓ · `has("qwxyz")` ✗.

**నాలుగూ సరైనవి.**

---

## 4. మొదటి విరుపు — 3.78%, ఆపై 100.0%

```
`end` గుర్తు లేకపోతే — "ఈ పదం నిఘంటువులో ఉందా?"

  ఏ strings పరీక్షించాం        | పరీక్షించినవి | "ఉంది" అన్నవి |      %
  -----------------------------+---------------+---------------+---------
  యాదృచ్ఛిక అక్షర strings      |      1,96,595 |         7,430 |   3.78%
  నిజమైన పదాల *ఉపసర్గలు*       |      1,23,047 |      1,23,047 | 100.00%
```

<div class="box bad">
<div class="lab">ఒకే bug. ఒక data మీద <b>3.78%</b>, ఇంకో data మీద <b>100.0%</b>.</div>
<code>"dep"</code> ← <code>"depasturation"</code> యొక్క ఉపసర్గ · <code>"op"</code> ← <code>"opprobriously"</code> · <code>"isal"</code> ← <code>"isallotherm"</code> · <code>"electrob"</code> ← <code>"electrobath"</code><br><br>
ఇవి పదాలు కావు. కానీ trie lo వీటికి <b>దారి ఉంది</b>, ఎందుకంటే పొడవైన పదాలు వాటి గుండా వెళ్తాయి. <code>end</code> గుర్తు లేకపోతే "దారి ఉంది" అంటే "పదం ఉంది".<br><br>
<b>మరియు 100.0% — ఒక్కటి కూడా తప్పలేదు, 1,23,047 lo.</b>
</div>

<div class="box warn">
<div class="lab">ఇక్కడ హారం (denominator) ఒక <i>అభిప్రాయం</i> కాదు — అది మీ నిజమైన traffic</div>
యాదృచ్ఛిక strings మీద ఇది <b>3.78%</b> — "అరుదైన edge case" అనిపిస్తుంది.<br><br>
కానీ trie ఎక్కడ వాడతారు? <b>Autocomplete lo.</b> అక్కడ ప్రతి keystroke ఒక <b>ఉపసర్గ</b>. user <code>d</code>, <code>de</code>, <code>dep</code> అని టైప్ చేస్తున్నాడు.<br><br>
<b>అంటే మీ నిజమైన inputs 100% వరుసలోనివి, 3.78% వరుసలోనివి కావు.</b><br><br>
<b>Deep 10</b> lo హారం మారితే 1.38% → 35.4% · <b>Deep 11</b> lo 9.21% → 81.9% · ఇక్కడ 3.78% → <b>100.0%</b>. ప్రతిసారీ అదే ప్రశ్న: <b>"నా నిజమైన inputs ఏ వరుసలో ఉంటాయి?"</b>
</div>

---

## 5. Step — `end` మరియు `startsWith` వేరు

```javascript
const node = () => ({ ch: new Map(), end: false });   // ← ఒక boolean

function has(root, word) {                 // కచ్చితమైన పదం
  const n = walk(root, word);
  return n !== null && n.end;              // ← దారి *మరియు* గుర్తు
}
function startsWith(root, prefix) {        // ఈ ఉపసర్గతో ఏదైనా ఉందా
  return walk(root, prefix) !== null;      // ← దారి చాలు, గుర్తు వద్దు
}
```

<div class="box good">
<div class="lab">ఇవి రెండు <i>వేర్వేరు</i> ప్రశ్నలు, మరియు రెండింటికీ trie కావాలి</div>
<code>has("app")</code> → <b>false</b> (అది పదం కాదు) · <code>startsWith("app")</code> → <b>true</b> (<code>apple</code>, <code>apply</code> ఉన్నాయి).<br><br>
ఒకే పదాలు, ఒకే trie, ఒకే node — <b>వేర్వేరు జవాబులు</b>. మరియు తేడా సరిగ్గా ఒక <code>&& n.end</code>.<br><br>
§12 lo రెండు mutations ఇదే: <code>has</code> lo <code>end</code> తీసేస్తే <b>120/120</b>, <code>startsWith</code> lo <code>end</code> కలిపితే <b>120/120</b>.
</div>

---

# Part 3 — రెండో విరుపు: దేనికి వేగం

---

## 6. Step — ఉపసర్గ వెతుకులాట

*"'pre' తో మొదలయ్యే 10 పదాలు చూపించు."*

`Set` లేదా array తో: **ప్రతి పదాన్నీ** చూసి `startsWith` చేయాలి.
Trie తో: 3 nodes నడిచి, అక్కడి నుంచి కిందికి 10 దొరికేవరకు.

---

## 7. రెండో విరుపు — 208× వేగం, మరియు 19.9× నెమ్మది

```
2,34,454 పదాలు · 2,000 ఉపసర్గ queries · ఒక్కోదానికి 10 సూచనలు

  Array ని scan చేయడం : 831 ms   (19,461 ఫలితాలు)
  Trie                :   4 ms   (19,461 ఫలితాలు)
  → 208× వేగం
```

```
అదే నిఘంటువు · 5,00,000 *కచ్చితమైన* queries

  Set  :  18 ms
  Trie : 358 ms
  → Set 19.9× వేగం
```

<div class="box bad">
<div class="lab">Trie ఒక మెరుగైన hash map <b>కాదు</b>. అది ఒక <i>వేరే</i> structure.</div>
<b>208× వేగం</b> మరియు <b>19.9× నెమ్మది</b> — ఒకే data, ఒకే structures, రెండు వేర్వేరు ప్రశ్నలు.<br><br>
కారణం సూటిది: <code>Set.has("computer")</code> ఒక hash లెక్క మరియు ఒక పోలిక. Trie కి <b>ఎనిమిది Map lookups</b> — ఒక్కో అక్షరానికి ఒకటి, ఒక్కొక్కటీ ఒక pointer దూకు.<br><br>
<b>Trie యొక్క O(m) hash map యొక్క O(1) కంటే నెమ్మది, ఎందుకంటే ఆ m నిజమైన memory దూకులు.</b><br><br>
మరియు ఉపసర్గ ప్రశ్నలో hash map యొక్క O(1) <b>వర్తించనే వర్తించదు</b> — అక్కడ అది O(n), n = 2.34 లక్షలు.
</div>

---

# Part 4 — మూడో విరుపు: ఖరీదు

---

## 8. Step — nodes ఎన్ని?

Trie ఎంత పెద్దది అవుతుంది? ఒక node ప్రతి **ప్రత్యేక ఉపసర్గ**కి — కాబట్టి లెక్కపెడదాం.

---

## 9. మూడో విరుపు — 30× memory, 96.2% ఖాళీ

```
2,34,454 పదాలు · మొత్తం అక్షరాలు 22,48,642

  Trie nodes                    :     7,58,880
  నిజంగా వాడిన పిల్లల గళ్ళు      :     7,58,879
  ఒక node కి సగటున పిల్లలు       :         1.00
  26-గళ్ళ array అయితే గళ్ళు      : 1,97,30,880
  → 3.8% మాత్రమే వాడతాం, 96.2% ఖాళీ
```

<div class="box bad">
<div class="lab">సగటున <b>1.00</b> పిల్లలు — మరియు ఇది యాదృచ్ఛికం కాదు</div>
Trie ఒక <b>tree</b>. Tree lo అంచులు ఎప్పుడూ <code>nodes − 1</code>. కాబట్టి ఒక node కి సగటు పిల్లలు ఎప్పుడూ <b>దాదాపు సరిగ్గా 1</b> — <i>ఏ పద జాబితా అయినా సరే</i>.<br><br>
7,58,879 = 7,58,880 − 1. <b>ఖచ్చితంగా.</b><br><br>
అంటే 26-గళ్ళ array ఎప్పుడూ <b>~96% ఖాళీ</b>గా ఉంటుంది — ఇది ఈ నిఘంటువు యొక్క లక్షణం కాదు, <b>tries యొక్క లక్షణం</b>.
</div>

```
heap usage · ఒక్కో ప్రక్రియలో విడిగా కొలిచినది

  Set (పదాలన్నీ)          :   5 MB
  Trie · Map పిల్లలు      : 150 MB   →  30×
  Trie · object పిల్లలు   : 151 MB   →  30×
  Trie · 26-గళ్ళ array    : 200 MB   →  40×
```

<div class="box warn">
<div class="lab">26-గళ్ళ array "వేగం కోసం" — కానీ అది <b>1.33× ఎక్కువ memory</b></div>
పాఠ్యపుస్తకాలు <code>new Array(26)</code> చెబుతాయి, ఎందుకంటే <code>ch[c - 'a']</code> ఒక Map lookup కంటే వేగం.<br><br>
కొలత: <b>200 MB vs 150 MB</b>. మరియు 96.2% ఆ గళ్ళు <code>null</code>.<br><br>
మరియు అది <b>a–z కి మాత్రమే</b> పనిచేస్తుంది. తెలుగు, ఎమోజి, అంకెలు, hyphen, apostrophe — ఏదైనా ఒకటి వస్తే <code>c.charCodeAt(0) - 97</code> పరిధి దాటుతుంది, మరియు అది <b>crash కాదు</b>: <code>undefined</code> లేదా తప్పు గడి.<br><br>
<b>Map వాడండి. 25% తక్కువ memory, ఏ అక్షరమాల అయినా సరే, మరియు వేగం తేడా §7 యొక్క 208× ముందు కనిపించదు.</b>
</div>

---

## 10. Step — తీసేయడం ఎందుకు కష్టం

`insert` మరియు `has` ఐదేసి పంక్తులు. `remove` కాదు — ఎందుకంటే **nodes పంచుకోబడతాయి**.

`"apple"` తీసేయాలంటే `app` యొక్క nodes ని తాకకూడదు, ఎందుకంటే `"app"` ఇంకా ఒక పదం కావచ్చు, లేదా `"apply"` ఆ దారిలో ఉండొచ్చు.

```javascript
function remove(root, word) {
  const path = [];
  let n = root;
  for (const c of word) {
    if (!n.ch.has(c)) return false;            // పదమే లేదు
    path.push([n, c]);
    n = n.ch.get(c);
  }
  if (!n.end) return false;                    // దారి ఉంది, కానీ అది ఒక పదం కాదు
  n.end = false;
  for (let i = path.length - 1; i >= 0; i--) { // ← *కింది నుంచి* పైకి
    const [parent, c] = path[i];
    const child = parent.ch.get(c);
    if (child.ch.size > 0 || child.end) break; // ఇంకెవరో వాడుతున్నారు — ఆగు
    parent.ch.delete(c);
  }
  return true;
}
```

<div class="box good">
<div class="lab">ఈ పదిహేను పంక్తుల్లో <b>నాలుగు</b> load-bearing</div>
<b><code>if (!n.end) return false</code></b> — <code>"apple"</code> ఉన్నప్పుడు <code>remove("app")</code> ని ఆపుతుంది. లేకపోతే ఏమీ లేని పదాన్ని "తీసేశాను" అంటుంది. → <b>120/120</b><br><br>
<b><code>child.ch.size > 0</code></b> — <code>"apply"</code> ఆ దారిలో ఉంటే ఆపుతుంది. → <b>120/120</b><br><br>
<b><code>child.end</code></b> — <code>"app"</code> కూడా ఒక పదం అయితే ఆపుతుంది. → <b>38/120</b> (§12 lo ఎందుకో)<br><br>
<b>కింది నుంచి పైకి</b> — పై నుంచి తుడిస్తే మొదటి node దగ్గరే ఆగిపోతుంది, మరియు <b>చచ్చిన nodes మిగులుతాయి</b>. → <b>120/120</b>
</div>

---

# Part 5 — నిరూపణ మరియు ప్రదర్శన

---

## 11. మొత్తం code

```javascript
// ఈ ఉపసర్గతో మొదలయ్యే పదాలు (నిఘంటువు క్రమంలో, limit వరకు)
function withPrefix(root, prefix, limit = Infinity) {
  const start = walk(root, prefix);
  const out = [];
  if (!start) return out;
  const go = (n, p) => {
    if (out.length >= limit) return;
    if (n.end) out.push(p);                       // ← `end` — §5
    for (const c of [...n.ch.keys()].sort()) {    // ← sort → నిఘంటువు క్రమం
      if (out.length >= limit) return;            // ← ముందే ఆగడం: §7 యొక్క 4 ms
      go(n.ch.get(c), p + c);
    }
  };
  go(start, prefix);
  return out;
}
```

మూడు పంక్తులూ ముఖ్యం. `limit` తనిఖీ లేకపోతే `withPrefix("a")` **మొత్తం** `a`-పదాలనీ కూడబెడుతుంది — §7 యొక్క 4 ms అది **10 దగ్గర ఆగడం** వల్లే.

---

## 12. 3,600 tries · mutation testing

పద్నాలుగు నియమాలు: **చేర్చినవన్నీ దొరుకుతాయి**, **పదం కాని ఉపసర్గలు `has` కి false**, **కానీ `startsWith` కి true**, **లేని పదాలు దొరకవు**, **`withPrefix` = filter చేసి sort చేసినది**, **ప్రతి ఫలితమూ ఆ ఉపసర్గతోనే, నకళ్ళు లేకుండా**, **`limit` ఇస్తే సరిగ్గా మొదటివే**, **`has` సరిగ్గా `word.length` అడుగులు**, **తీసేసినది పోతుంది, మిగతావి ఉంటాయి**, **తీసేశాక nodes సరిగ్గా తగ్గుతాయి**, **లేని పదానికి `false`, trie మారదు**, **పదం కాని ఉపసర్గకీ `false`, trie మారదు**, **మళ్ళీ చేర్చితే అంతా తిరిగి వస్తుంది**, **nodes = ప్రత్యేక ఉపసర్గలు**.

```
300 runs · 3,600 tries · 1,95,141 ఉపసర్గ queries
  నియమ ఉల్లంఘనలు: 0

ఏ దారులు నడిచాయి:
  tries             3,600
  realWords         1,288      ← నిజమైన నిఘంటువు నుంచి
  sharedPrefix      1,369      ← "a", "ap", "app", "appl" లాంటివి
  prefixIsWord     14,751      ← ఉపసర్గ *కూడా* ఒక పదమైన సందర్భాలు
  removes           3,600
  removeMissing     3,600
  removePrefix      3,207      ← పదం *కాని* ఉపసర్గని తీసేయాలని చూసినవి
  emptyStr            627
```

```
==== mutation testing ====

  మార్పు లేని code                                           →   0/300 విఫలం
  has() lo `end` చూడకపోతే  (§4 యొక్క bug)                    → 120/120 విఫలం
      ఉదా: "" పదం కాదు, కానీ has() true (w="ad")
  insert lo `n.end = true` తీసేస్తే                          → 120/120 విఫలం
  startsWith lo `end` కూడా చూస్తే                            → 120/120 విఫలం
      ఉదా: startsWith("") false, కానీ "ad" ఉంది
  withPrefix lo `n.end` చూడకుండా ప్రతి node నీ ఇస్తే         → 120/120 విఫలం
      ఉదా: ["a","ad","adc","adcc","adccc","adccd"] ≠ ["ad","adc","adccc","adccd"]
  withPrefix lo పిల్లల keys ని sort చేయకపోతే                 → 120/120 విఫలం
  remove lo `child.end` తనిఖీ తీసేస్తే                       →  38/120 విఫలం
      ఉదా: "cac" తీసేస్తే "c" కూడా పోయింది
  remove lo `child.ch.size > 0` తనిఖీ తీసేస్తే               → 120/120 విఫలం
      ఉదా: "adccc" తీసేస్తే "adccd" కూడా పోయింది
  remove lo `if (!n.end) return false` తీసేస్తే              → 120/120 విఫలం
      ఉదా: "a" ఒక పదం కాదు, కానీ remove() true
  remove lo దారిని *పై నుంచి* కిందికి తుడిస్తే               → 120/120 విఫలం
      ఉదా: "adccc" తీసేశాక nodes 7 ≠ 6 (చచ్చిన nodes మిగిలాయా?)
  walk lo `n.ch.has(c)` కి బదులు `n.ch.get(c)` నే వాడితే     → 119/120 విఫలం
```

<div class="box bad">
<div class="lab">ఈ పట్టికలో మొదట <b>రెండు</b> mutations 0/120 గా బతికాయి</div>
<b><code>if (!n.end) return false</code> తీసేస్తే — 0/120.</b> నా fuzz <code>remove</code> ని <b>ఎప్పుడూ నిజమైన పదాల మీదే</b> పిలిచింది. "దారి ఉంది కానీ పదం కాదు" అనే సందర్భం — సరిగ్గా ఆ పంక్తి కాపాడేది — <b>నా data lo లేనే లేదు</b>.<br><br>
<b>దారిని పై నుంచి తుడిస్తే — 0/120.</b> నా నియమాలు <code>countNodes</code> ని <b>తీసేసి, మళ్ళీ చేర్చాక</b> మాత్రమే చూశాయి. ఏమీ తీసేయకపోతే, మళ్ళీ చేర్చినా ఏమీ కలవదు, మరియు లెక్క సరిపోతుంది. <b>చచ్చిన nodes మధ్యలో ఉన్నాయి, మరియు నేను ఆ క్షణంలో చూడలేదు.</b>
</div>

<div class="box good">
<div class="lab">రెండు కొత్త నియమాలు, రెండూ 120/120</div>
<b>(1)</b> "తీసేసిన <i>వెంటనే</i> nodes = మిగిలిన పదాల ప్రత్యేక ఉపసర్గలు" — ఇది చచ్చిన nodes ని ఆ క్షణంలోనే పట్టుకుంటుంది.<br><br>
<b>(2)</b> "పదం కాని ఉపసర్గని <code>remove</code> చేస్తే <code>false</code>, మరియు ఏమీ మారకూడదు" — 120 runs lo 3,207 సార్లు నడిచింది.<br><br>
<code>child.end</code> mutation <b>38/120</b> దగ్గరే ఆగింది, మరియు అది నిజాయితీగా ఆగింది: అది విఫలం కావాలంటే ఒక పదం ఇంకో పదానికి <b>ఖచ్చితమైన ఉపసర్గ</b> కావాలి, <b>మరియు</b> పొడవైనదే తీసేయాలి. ఆ రెండూ కలిసి రావడం 120 runs lo 38 సార్లు జరిగింది.<br><br>
<b>మళ్ళీ అదే పాఠం: బలహీనమైన mutation ఫలితం అంటే బలహీనమైన code కాదు — బలహీనమైన data.</b>
</div>

---

## 13. Trie ఎప్పుడు **వద్దు**

ఈ doc మొత్తం trie ని సమర్థిస్తోందని అనిపించొచ్చు. **కాదు.** కొలతలు చెప్పేది ఇది:

| మీ ప్రశ్న | వాడాల్సినది | ఎందుకు |
|---|---|---|
| "ఈ పదం ఉందా?" | **`Set`** | 19.9× వేగం, 30× తక్కువ memory |
| "ఈ ఉపసర్గతో ఏమున్నాయి?" | **Trie** | 208× వేగం |
| "ఈ పదం ఉందా, మరియు జాబితా స్థిరం?" | **sorted array + binary search** | Deep 01 — memory దాదాపు సున్నా |
| "*మధ్యలో* ఈ భాగం ఉన్నవి ఏవి?" | **Trie కాదు** — suffix structures | Trie ఉపసర్గలకే |
| Unicode / ఏ భాష అయినా | **Trie + Map** | 26-గళ్ళ array పనిచేయదు (§9) |

<div class="box warn">
<div class="lab">2.34 లక్షల పదాలకి <b>150 MB</b> — ఇది ఒక నిజమైన నిర్ణయం</div>
ఒక సాధారణ container lo అది మీ మొత్తం heap కావచ్చు. మరియు ఇది <b>ఒక్క</b> నిఘంటువుకి.<br><br>
కాబట్టి §2 యొక్క మొదటి ప్రశ్న అలంకారం కాదు: <b>"ఉపసర్గ ప్రశ్నలు నిజంగా ఉన్నాయా?"</b><br><br>
లేకపోతే మీరు 145 MB ఎక్కువ ఖర్చు చేసి 19.9× నెమ్మది అయ్యారు.
</div>

---

## 14. Follow-ups — radix tree, Aho-Corasick, DAWG

**"150 MB ని తగ్గించొచ్చా?"**

**Radix tree** (compressed trie): ఒకే పిల్ల ఉన్న nodes ని కలిపేయడం. §9 lo సగటు పిల్లలు **1.00** అని కొలిచాను — అంటే **చాలా nodes కి ఒకే పిల్ల ఉంది**, మరియు అవన్నీ కలిపేయదగినవే. **నేను radix tree ని కొలవలేదు**, కానీ ఆ 1.00 అనే సంఖ్య ఎందుకు లాభం ఉంటుందో చెబుతోంది.

**"పదాలన్నీ స్థిరమైతే?"**

**DAWG** (directed acyclic word graph) — ఉపసర్గలే కాదు, **ప్రత్యయాలని కూడా** (suffixes) పంచుకోవడం. `-ing`, `-tion`, `-ness` ఒక్కసారే నిల్వ. చేర్చడం/తీసేయడం కుదరదు. **నేను దీన్ని కొలవలేదు.**

**"ఒక పెద్ద text lo వెయ్యి పదాలని ఒకేసారి వెతకాలంటే?"**

**Aho-Corasick** — trie కి "failure links" కలిపి, text ని **ఒక్కసారే** చదివి అన్ని matches. **నేను దీన్ని కొలవలేదు.**

**"Autocomplete lo ర్యాంకింగ్?"**

ప్రతి node lo ఆ ఉపసర్గ కింద ఉన్న **అత్యుత్తమ k పదాలని** ముందే నిల్వ చేయడం. అప్పుడు traversal అక్కర్లేదు. ఖరీదు: ఇంకా ఎక్కువ memory, మరియు ప్రతి update కి పైకి propagate. **LLD Deep 17** lo autocomplete ని పూర్తిగా కొలిచాను.

**"ఈ doc lo నేను ఏమి కొలవలేదు"**

నాలుగు: **radix tree**, **DAWG**, **Aho-Corasick**, మరియు **Unicode పదాలు** — నా నిఘంటువు a–z మాత్రమే.

---

## 15. ఏమి నేర్చుకున్నాం

**1. Trie lo విలువలు nodes lo ఉండవు — దారిలో ఉంటాయి.** అందుకే "ఇక్కడ ఒక పదం ముగిసింది" అనేది ప్రత్యేకంగా గుర్తుపెట్టాలి.

**2. ఆ ఒక్క boolean మర్చిపోతే — యాదృచ్ఛిక strings మీద 3.78%, నిజమైన ఉపసర్గల మీద 100.0%.**

**3. మీ నిజమైన inputs యాదృచ్ఛికం కావు.** Autocomplete lo ప్రతి keystroke ఒక ఉపసర్గ — అంటే మీరు **సరిగ్గా 100% వరుసలో** ఉన్నారు.

**4. `has` మరియు `startsWith` రెండు వేర్వేరు ప్రశ్నలు,** మరియు తేడా ఒక `&& n.end`.

**5. Trie ఒక మెరుగైన hash map కాదు.** ఉపసర్గకి **208× వేగం**, కచ్చితమైన వెతుకులాటకి **19.9× నెమ్మది**.

**6. ఆ వేగం 30× memory తో కొన్నది** — 2.34 లక్షల పదాలకి `Set` 5 MB, trie 150 MB.

**7. Trie ఒక tree, కాబట్టి అంచులు = nodes − 1, కాబట్టి సగటు పిల్లలు ఎప్పుడూ 1.00.** అందుకే 26-గళ్ళ array **ఎప్పుడూ ~96% ఖాళీ** — ఏ పద జాబితా అయినా సరే.

**8. 26-గళ్ళ array "వేగం కోసం" 1.33× ఎక్కువ memory తీసుకుంటుంది,** మరియు a–z బయట ఏ అక్షరానికీ పనిచేయదు.

**9. `remove` పదిహేను పంక్తులు, అందులో నాలుగు load-bearing** — మరియు దారిని **కింది నుంచి** తుడవాలి.

**10. నా fuzz రెండు mutations ని 0/120 గా వదిలేసింది** — ఎందుకంటే నేను `remove` ని ఎప్పుడూ నిజమైన పదాల మీదే పిలిచాను, మరియు node లెక్కని **తప్పు క్షణంలో** చూశాను.

<div class="box good">
<div class="lab">ఈ doc నుంచి ఒక్క వాక్యం గుర్తుపెట్టుకోవాలంటే</div>
<b>Trie ఒక ప్రశ్నకి 208× వేగం మరియు మిగతా అన్నిటికీ 30× ఖరీదు. కాబట్టి "trie వాడాలా?" అనే ప్రశ్నకి జవాబు code lo లేదు — అది మీ <i>queries</i> lo ఉంది.</b><br><br>
ఉపసర్గ ప్రశ్నలు ఉన్నాయా? అయితే trie, మరియు <code>end</code> గుర్తు మర్చిపోకండి.<br><br>
లేవా? అయితే <code>Set</code>. <b>145 MB ఆదా, మరియు 19.9× వేగం.</b>
</div>
