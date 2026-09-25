<!-- style: editorial -->
<!-- footer: Vending Machine · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">20</div>
<div class="kicker">Deep Dive 20 · డబ్బు ఉన్న problem</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>Vending<br>Machine</div>
<div class="lede">Amazon · Oracle · Adobe · service MNCs — "ఇది ఒక state machine, అంతే" అని చాలా మంది అనుకుంటారు. కానీ ఇక్కడ <b>డబ్బు</b> ఉంది.</div>
<div class="sub">మూడు విరుపులు. మొదటిది ఒక అమ్మకాన్ని <b>కారణం లేకుండా తిరస్కరిస్తుంది</b> — 2.14% సార్లు. రెండోది user యొక్క <b>₹10 మాయం</b> చేస్తుంది. మూడోది డబ్బు తీసుకుని, వస్తువు ఇవ్వకుండా, <b>రెండూ కోల్పోతుంది.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 20</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి శాతం నిజంగా `node` lo run చేసినదే.**

<div class="box">
<div class="lab">ఈ problem యొక్క నిజమైన విషయం</div>
Vending machine ని అందరూ <b>state machine problem</b> అనుకుంటారు — IDLE, COLLECTING, DISPENSING. మరియు అది నిజమే, కానీ ఆ భాగం <b>సులభమైనది</b>. (ఈ series lo state machines ఇప్పటికే మూడుసార్లు వచ్చాయి — Deep Dive 04, 11, 16.)<br><br>
ఇక్కడ కొత్తది ఒక్కటే, మరియు అది ముఖ్యమైనది: <b>డబ్బు</b>.<br><br>
డబ్బుకి మూడు లక్షణాలు ఉన్నాయి, మరియు మూడూ ఈ doc lo ఒక్కో విరుపుగా మారతాయి:<br><br>
<b>1 ·</b> అది <b>విడదీయలేనిది</b> — ₹6 ఇవ్వాలంటే సరైన నాణేలు ఉండాలి (§7)<br>
<b>2 ·</b> అది <b>గుర్తింపు కలిగినది</b> — "₹50" ఒక సంఖ్య కాదు, అది ఒక నిర్దిష్ట నోటు (§10)<br>
<b>3 ·</b> అది <b>సృష్టించబడదు, నాశనం కాదు</b> — ఏ వైఫల్యంలోనూ ఒక్క రూపాయి కూడా పోకూడదు (§13)
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు state machine ఎందుకు సులభమైన భాగం
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: అత్యాశ చిల్లర**

3. Step — పెద్ద నాణెం నుంచి మొదలుపెట్టడం
4. **మొదటి విరుపు** — ₹6 ఇవ్వలేకపోయింది, 3×₹2 ఉన్నా
5. Step — ఖచ్చితమైన DP · మరియు అది ఎంత ముఖ్యమో కొలవడం

**Part 3 — రెండో విరుపు: "50" ఒక సంఖ్య కాదు**

6. Step — `inserted += coin`
7. **రెండో విరుపు** — ₹50 ఇచ్చాడు, ₹40 తిరిగి వచ్చింది
8. Step — Escrow · వేసిన నాణేలనే గుర్తుపెట్టుకోవడం

**Part 4 — మూడో విరుపు: సగంలో ఆగిపోవడం**

9. Step — డబ్బు తీసుకుని, వస్తువు ఇవ్వడం
10. **మూడో విరుపు** — యంత్రం ఇరుక్కుంది, రెండూ పోయాయి
11. Step — పూర్తి rollback

**Part 5 — పూర్తి system**

12. Step — కొనే *ముందు* చెప్పడం
13. మొత్తం code · నడిపి చూద్దాం · **డబ్బు సంరక్షణ పరీక్ష**

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — UPI, పలు కొనుగోళ్ళు, telemetry
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు state machine ఎందుకు సులభమైన భాగం

> *"Design a vending machine. It accepts coins, dispenses items, and returns change."*

<div class="fig">
<div class="cap">అందరూ గీసేది · అసలు కష్టం ఎక్కడ ఉందో</div>
<svg viewBox="0 0 750 290"><text class="t-xs" x="0" y="14">State machine సరైనదే — కానీ అది మూడు పంక్తుల్లో ముగుస్తుంది</text><rect class="n-good" x="20" y="30" width="150" height="46" rx="4"/><text class="t mid" x="95" y="58">IDLE</text><line class="ln-acc" x1="174" y1="53" x2="244" y2="53" marker-end="url(#aa)"/><text class="t-sm mid" x="209" y="44">insert</text><rect class="n-good" x="248" y="30" width="180" height="46" rx="4"/><text class="t mid" x="338" y="58">COLLECTING</text><line class="ln-acc" x1="432" y1="53" x2="502" y2="53" marker-end="url(#aa)"/><text class="t-sm mid" x="467" y="44">buy</text><rect class="n-good" x="506" y="30" width="180" height="46" rx="4"/><text class="t mid" x="596" y="58">DISPENSING</text><line class="ln-acc" x1="596" y1="80" x2="596" y2="100"/><line class="ln" x1="596" y1="100" x2="95" y2="100"/><line class="ln-acc" x1="95" y1="100" x2="95" y2="82" marker-end="url(#aa)"/><text class="t-sm mid" x="345" y="118">పూర్తయ్యాక</text><rect class="n-bad" x="0" y="134" width="750" height="152" rx="4"/><text class="t mid" x="375" y="158">కానీ ఆ బాణాల <tspan class="t-acc">మీద</tspan> ఏమి జరుగుతుంది?</text><text class="t-sm mid" x="375" y="184">"చిల్లర ఇవ్వు" — ఏ నాణేలు? ఉన్నవాటితో అది సాధ్యమేనా? (§4)</text><text class="t-sm mid" x="375" y="206">"డబ్బు వెనక్కి ఇవ్వు" — <tspan class="t-acc">ఏ</tspan> డబ్బు? అతను ఏమి వేశాడో గుర్తుందా? (§7)</text><text class="t-sm mid" x="375" y="228">"వస్తువు ఇవ్వు" — ఇవ్వలేకపోతే? డబ్బు అప్పటికే తీసుకున్నాం. (§10)</text><text class="t-sm mid" x="375" y="256">State machine అనేది <tspan class="t-acc">ఏ క్రమంలో</tspan> అని చెప్తుంది.</text><text class="t-sm mid" x="375" y="278">ఈ మూడు ప్రశ్నలూ <tspan class="t-acc">ఏమి జరుగుతుంది</tspan> అని అడుగుతాయి — మరియు అక్కడే డబ్బు పోతుంది.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **ఏ నాణేలు/నోట్లు అంగీకరిస్తుంది?** | §5 — చిల్లర సమస్య దీని మీదే ఆధారపడుతుంది |
| **యంత్రంలో ఎన్ని నాణేలు ఉంటాయి (float)?** | **పరిమితం** అంటే §4 — ఇదే మొదటి విరుపు |
| **User వేసిన నాణేలు చిల్లరకి వాడొచ్చా?** | అవును — మరియు చాలా మంది ఇది మర్చిపోతారు (§8) |
| **చిల్లర ఇవ్వలేకపోతే ఏమి చేయాలి?** | §12 — **కొనే ముందే** చెప్పాలి |
| **వస్తువు ఇరుక్కుంటే?** | §11 — మరియు ఇది interviewer అడిగేది |
| **ఒకేసారి పలు వస్తువులు?** | §16 — escrow design దీన్ని సులభం చేస్తుంది |
| **UPI / కార్డు?** | §16 — డబ్బు తీసుకునే విధానం ఒక interface |

<div class="box warn">
<div class="lab">మూడో ప్రశ్న — మరియు దాదాపు ఎవరూ అడగరు</div>
<i>"User ఇప్పుడే వేసిన నాణేలని, చిల్లర ఇవ్వడానికి వాడొచ్చా?"</i><br><br>
జవాబు <b>అవును</b> — నిజమైన యంత్రాలు అలాగే చేస్తాయి. User వేసిన ₹10 నాణెం తర్వాతి వ్యక్తికి చిల్లరగా వెళ్ళొచ్చు.<br><br>
కానీ అది ఒక <b>సూక్ష్మమైన సమయ ప్రశ్న</b> లేవనెత్తుతుంది: ఆ నాణేలు <b>ఎప్పుడు</b> యంత్రానివి అవుతాయి? అమ్మకం పూర్తయ్యాకనా, వేసిన వెంటనేనా?<br><br>
జవాబు: <b>అమ్మకం పూర్తయ్యాకే.</b> అప్పటిదాకా అవి <b>escrow</b> lo ఉంటాయి — యంత్రం దగ్గర ఉన్నాయి, కానీ యంత్రానివి కావు. మరియు ఆ ఒక్క తేడా §7 మరియు §10 — రెండు విరుపులనీ పరిష్కరిస్తుంది.
</div>

---

# Part 2 — మొదటి విరుపు: అత్యాశ చిల్లర

---

## 3. Step — పెద్ద నాణెం నుంచి మొదలుపెట్టడం

చిల్లర ఇవ్వడానికి సహజమైన పద్ధతి: **పెద్ద నాణెం నుంచి మొదలుపెట్టి, వీలైనన్ని ఇవ్వడం.**

```javascript
// అత్యాశ (greedy): పెద్ద నాణెం నుంచి మొదలుపెట్టి ఇవ్వడం
#makeChange(amount) {
  const give = new Map();
  for (const c of [...this.coins.keys()].sort((a,b) => b-a)) {
    while (amount >= c && (this.coins.get(c) - (give.get(c) ?? 0)) > 0) {
      give.set(c, (give.get(c) ?? 0) + 1);
      amount -= c;
    }
  }
  return amount === 0 ? give : null;
}
```

ఇది **మనం నిజంగా చేసేది** — ₹37 ఇవ్వాలంటే ఎవరైనా ₹20, ₹10, ₹5, ₹2 అని ఆలోచిస్తారు. మరియు ఇది పనిచేస్తుంది:

```
  ₹50 వేసి Cola (₹35) కొంటే : { ok: true, item: 'Cola', change: '1×₹10 1×₹5' }
  ₹20 వేసి Chips (₹20)      : { ok: true, item: 'Chips', change: 'లేదు' }
  ₹10 వేసి Cola (₹35)       : { ok: false, reason: 'NEED_MORE: 25' }
```

<div class="note"><b>ఒక సాధారణ అపోహ:</b> "భారతీయ నాణేలు {1,2,5,10,20} <i>canonical</i> — కాబట్టి greedy ఎప్పుడూ సరైనది." అది <b>సగం నిజం</b>. నాణేలు <b>అపరిమితంగా</b> ఉంటే greedy కనిష్ఠ సంఖ్యలో నాణేలు ఇస్తుంది.<br><br>
కానీ ఒక vending machine lo నాణేలు <b>పరిమితం</b> — మరియు అక్కడ ఆ హామీ పూర్తిగా చెల్లదు.</div>

---

## 4. మొదటి విరుపు — ₹6 ఇవ్వలేకపోయింది, 3×₹2 ఉన్నా

యంత్రంలో ఉన్నవి: **1×₹5, 3×₹2** (₹1 నాణేలు అయిపోయాయి).

```
  ₹6 చిల్లర ఇవ్వాలి:
    అత్యాశ  : సాధ్యం కాదు
    ఖచ్చితం : 3×₹2
  ₹4 చిల్లర ఇవ్వాలి:
    అత్యాశ  : 2×₹2
    ఖచ్చితం : 2×₹2
  ₹9 చిల్లర ఇవ్వాలి:
    అత్యాశ  : 1×₹5 2×₹2
    ఖచ్చితం : 1×₹5 2×₹2
```

<div class="fig">
<div class="cap">₹6 ఇవ్వడానికి రెండు దారులు · అత్యాశ తప్పుదారి ఎంచుకుంటుంది</div>
<svg viewBox="0 0 750 232"><text class="t-xs" x="0" y="14">యంత్రంలో: 1×₹5, 3×₹2 · ఇవ్వాల్సినది ₹6</text><rect class="n-bad" x="0" y="30" width="360" height="100" rx="4"/><text class="t mid" x="180" y="54">అత్యాశ</text><text class="t-sm mid" x="180" y="78">₹5 తీసుకుంది → ₹1 మిగిలింది</text><text class="t-sm mid" x="180" y="98">₹1 నాణేలు లేవు · ₹2 చాలా పెద్దది</text><text class="t-acc mid" x="180" y="122">→ "చిల్లర లేదు" · అమ్మకం రద్దు</text><rect class="n-good" x="390" y="30" width="360" height="100" rx="4"/><text class="t mid" x="570" y="54">ఖచ్చితమైనది</text><text class="t-sm mid" x="570" y="78">₹5 ని <tspan class="t-acc">వదిలేసి</tspan> → 2+2+2</text><text class="t-sm mid" x="570" y="98">సరిగ్గా ₹6</text><text class="t-acc mid" x="570" y="122">→ అమ్మకం పూర్తి ✓</text><rect class="n-dark" x="0" y="146" width="750" height="80" rx="4"/><text class="t-w-sm mid" x="375" y="172">అత్యాశ యొక్క తప్పు: ఒకసారి ₹5 తీసుకున్నాక అది <tspan class="t-acc">వెనక్కి తిరగదు</tspan>.</text><text class="t-w-sm mid" x="375" y="194">అపరిమిత నాణేలు ఉంటే అది సమస్య కాదు — ₹1 ఎప్పుడూ ఉంటుంది.</text><text class="t-w-sm mid" x="375" y="216">కానీ ఒక యంత్రంలో నాణేలు <tspan class="t-acc">అయిపోతాయి</tspan>, మరియు అప్పుడు ఆ ఎంపిక ఒక ఉచ్చు.</text></svg>
</div>

<div class="box warn">
<div class="lab">మొదటి విరుపు — ఒక అమ్మకాన్ని కారణం లేకుండా తిరస్కరించింది</div>
యంత్రం వద్ద ₹6 ఇవ్వడానికి <b>సరిపడా నాణేలు ఉన్నాయి</b>. అది ఇవ్వలేదు.<br><br>
User కి కనిపించేది: "చిల్లర లేదు, దయచేసి సరిగ్గా డబ్బు వేయండి." అతను వెళ్ళిపోతాడు. <b>ఒక అమ్మకం పోయింది</b>, మరియు యంత్ర యజమానికి ఎప్పటికీ తెలియదు.<br><br>
<b>మౌలిక తప్పు:</b> "చిల్లర ఇవ్వడం" అనేది ఒక <i>విధానం</i> కాదు, ఒక <i>శోధన</i>. "ఏ నాణేల కలయిక ఈ మొత్తానికి సమానం?" అనేది ఒక <b>సమస్య</b>, మరియు దానికి ఒక్క దారే ఉందని అనుకోవడం తప్పు.
</div>

---

## 5. Step — ఖచ్చితమైన DP · మరియు అది ఎంత ముఖ్యమో కొలవడం

"ఏ కలయిక పనిచేస్తుంది?" అనేది ఒక **bounded coin change** problem, మరియు దానికి ఒక సాధారణ DP ఉంది:

```javascript
function makeChange(amount, bag) {
  if (amount === 0) return new CoinBag();
  if (amount < 0) return null;
  const best = new Array(amount + 1).fill(null);
  best[0] = new Map();
  for (const d of bag.denoms) {
    const avail = bag.count(d);
    for (let take = 1; take <= avail; take++)
      for (let v = amount; v >= d; v--)
        if (best[v] === null && best[v-d] !== null &&
            (best[v-d].get(d) ?? 0) < avail) {
          const m = new Map(best[v-d]); m.set(d, (m.get(d) ?? 0) + 1); best[v] = m;
        }
  }
  if (best[amount] === null) return null;
  const out = new CoinBag();
  for (const [d, n] of best[amount]) out.add(d, n);
  return out;
}
```

`best[v]` = "₹v ఇవ్వడానికి ఒక చెల్లుబాటయ్యే నాణేల కలయిక" (లేదా `null`). ఆ `(best[v-d].get(d) ?? 0) < avail` తనిఖీ ఒక నాణేన్ని **ఉన్నదానికంటే ఎక్కువసార్లు** వాడకుండా ఆపుతుంది.

<div class="note"><b>ఇది నమ్మదగినదేనా?</b> ఒక DP ని కంటితో చూసి నమ్మలేం. కాబట్టి దాన్ని <b>brute force తో పోల్చాను</b> — 30,000 యాదృచ్ఛిక సందర్భాలు, అన్ని కలయికలనీ ప్రయత్నించే ఒక నెమ్మదైన function తో:<br><br>
<code>30,000 సందర్భాలు · 28,364 సాధ్యమైనవి</code><br>
<code>DP = brute force, మరియు ఇచ్చిన నాణేలు చెల్లుతాయా? అవును ✓</code></div>

### ఇది ఎంత తరచుగా పట్టింపు? — కొలిచి చూద్దాం

"అత్యాశ కొన్నిసార్లు విఫలమవుతుంది" అనేది ఒక వాదన. **ఎన్నిసార్లు?** అనేది ఒక సంఖ్య:

```
ఒక్కో నాణెం గరిష్ఠంగా ఎన్ని ఉంటే అత్యాశ ఎంత తరచుగా విఫలమవుతుంది

  గరిష్ఠం |  సాధ్యమైనవి |  అత్యాశ విఫలం |  కోల్పోయిన అమ్మకాలు
  --------+-------------+---------------+---------------------
      0–1 |       3,404 |             0 |               0.00%
      0–2 |       8,565 |             0 |               0.00%
      0–3 |      12,522 |           140 |               1.12%
      0–5 |      16,635 |           355 |               2.13%
      0–9 |      18,904 |           405 |               2.14%
     0–20 |      19,765 |           276 |               1.40%
```

<div class="box">
<div class="lab">ఈ వక్రరేఖ నేను ఊహించనిది</div>
నా అంచనా: <b>నాణేలు తక్కువైతే అత్యాశ ఎక్కువ విఫలమవుతుంది.</b> కొలత చెప్పినది వేరు.<br><br>
<b>నాణేలు చాలా తక్కువైతే (0–2): 0% విఫలం.</b> ఎందుకంటే అప్పుడు అత్యాశ ఇరుక్కునే సందర్భాలు ఉన్నా, ఆ మొత్తాలని <b>ఏ పద్ధతీ ఇవ్వలేదు</b> — కాబట్టి అవి "కోల్పోయిన అమ్మకాలు" కావు.<br><br>
<b>నాణేలు సమృద్ధిగా ఉంటే (0–20): 1.40%.</b> ఎందుకంటే అప్పుడు దాదాపు అన్నిటికీ చాలా దారులు ఉంటాయి, అత్యాశ ఎంచుకున్నది కూడా పనిచేస్తుంది.<br><br>
<b>గరిష్ఠం మధ్యలో (0–5 నుంచి 0–9): 2.14%</b> — సరిపడా నాణేలు ఉండి, కానీ అత్యాశ తప్పుదారి పట్టేంత కొరత.<br><br>
<b>పాఠం:</b> "తక్కువ వనరులు = ఎక్కువ వైఫల్యం" అనే సహజమైన ఊహ ఇక్కడ తప్పు. <b>సంఖ్య ఊహని తలకిందులు చేసింది</b> — మరియు అది కొలిచాకే తెలిసింది.
</div>

**2.14% అంటే ఏమిటి?** రోజుకి 200 అమ్మకాలు చేసే యంత్రం — **రోజుకి 4 అమ్మకాలు**, కేవలం చిల్లర లెక్క తప్పు వల్ల.

---

# Part 3 — రెండో విరుపు: "50" ఒక సంఖ్య కాదు

---

## 6. Step — `inserted += coin`

§3 యొక్క code lo డబ్బు ఇలా నిల్వ అవుతుంది:

```javascript
constructor(items, coins) {
  ...
  this.inserted = 0;                     // ← ఒక సంఖ్య మాత్రమే
}
insert(coin) { this.inserted += coin; return this.inserted; }
refund() { const r = this.inserted; this.inserted = 0; return r; }
```

ఇది సహజమైనది మరియు సరిపోతుంది — **ఒక అమ్మకం విజయవంతమైనంత వరకు**.

---

## 7. రెండో విరుపు — ₹50 ఇచ్చాడు, ₹40 తిరిగి వచ్చింది

యంత్రంలో **రెండు ₹20 నాణేలు మాత్రమే**. Cola ₹35. User ఒక ₹50 నోటు వేశాడు.

```
యంత్రం float: 2×₹20. Cola ₹35.

  User ఒక ₹50 note వేశాడు: 50
  Cola కొనాలంటే            : { ok: false, reason: 'NO_CHANGE' }

  → ₹15 చిల్లర ఇవ్వలేదు. సరే, డబ్బు వెనక్కి ఇవ్వాలి.
  refund()                 : ₹50

  కానీ — ఏ నోట్లు ఇవ్వాలి? యంత్రానికి తెలియదు.
  అది గుర్తుపెట్టుకున్నది "50" అనే సంఖ్య మాత్రమే.
  దాని దగ్గర ఉన్నవి: 2×₹20
  ₹50 ఇవ్వాలంటే 2×₹20 = ₹40 మాత్రమే. ₹10 తక్కువ.

  → User ₹50 note ఇచ్చాడు, ₹40 తిరిగి వచ్చింది. ₹10 మాయం.
```

<div class="box warn">
<div class="lab">రెండో విరుపు — డబ్బుకి గుర్తింపు ఉంది, `inserted` కి లేదు</div>
User యొక్క ₹50 నోటు <b>యంత్రం లోపలే ఉంది</b>. దాన్ని తిరిగి ఇవ్వడం అతి సులభం.<br><br>
కానీ code <code>inserted += 50</code> అని రాసిన క్షణంలో <b>ఆ నోటు ఏమిటో మర్చిపోయింది</b>. ఇప్పుడు "₹50 తిరిగి ఇవ్వు" అంటే అది <i>ఏవైనా</i> నాణేలతో ₹50 కట్టాలి — మరియు అది సాధ్యం కాకపోవచ్చు.<br><br>
<b>మౌలిక తప్పు:</b> <code>50 + 20 = 70</code> అనేది గణితంలో నిజం. కానీ <b>ఒక ₹50 నోటు మరియు ఒక ₹20 నోటు</b> అనేవి <b>రెండు నిర్దిష్ట వస్తువులు</b> — వాటిని కూడితే "₹70" అనే ఒక ముద్ద రాదు.<br><br>
ఇది Deep Dive 11 §4 (order ఒక live MenuItem ని పట్టుకోవడం) మరియు Deep Dive 15 §4 (ఒక Book = ఒక ప్రతి) — రెండింటికీ బంధువు: <b>ఒక సంగ్రహణ చాలా ఎక్కువ సమాచారాన్ని పారేసింది.</b>
</div>

---

## 8. Step — Escrow · వేసిన నాణేలనే గుర్తుపెట్టుకోవడం

రెండు ముక్కలు:

```javascript
class CoinBag {
  #c = new Map();
  add(d, n = 1) { this.#c.set(d, this.count(d) + n); return this; }
  remove(d, n = 1) {
    if (this.count(d) < n) throw new Error(`NOT_ENOUGH_COINS: ${n}×₹${d}`);
    this.#c.set(d, this.count(d) - n); return this;
  }
  addAll(other) {
    for (const d of other.denoms) this.add(d, other.count(d)); return this;
  }
  removeAll(other) {
    for (const d of other.denoms) this.remove(d, other.count(d)); return this;
  }
  get total() { return this.denoms.reduce((s,d) => s + d*this.count(d), 0); }
}
```

మరియు యంత్రంలో **రెండు సంచులు**:

```javascript
this.float  = new CoinBag(float);      // యంత్రం సొంత నాణేలు
this.#escrow = new CoinBag();          // user వేసినవి — ఇంకా యంత్రానివి కావు
```

<div class="fig">
<div class="cap">రెండు సంచులు · డబ్బు ఎప్పుడు చేతులు మారుతుంది</div>
<svg viewBox="0 0 750 244"><text class="t-xs" x="0" y="14">Escrow = "యంత్రం దగ్గర ఉంది, కానీ యంత్రానిది కాదు"</text><rect class="n-acc" x="20" y="30" width="200" height="56" rx="4"/><text class="t-w mid" x="120" y="52">escrow</text><text class="t-w-sm mid" x="120" y="72">user వేసిన నాణేలు</text><rect class="n-info" x="530" y="30" width="200" height="56" rx="4"/><text class="t mid" x="630" y="52">float</text><text class="t-sm mid" x="630" y="72">యంత్రం సొంతం</text><line class="ln-acc" x1="226" y1="46" x2="524" y2="46" marker-end="url(#aa)"/><text class="t-sm mid" x="375" y="38">అమ్మకం <tspan class="t-acc">పూర్తయితే</tspan></text><line class="ln-acc" x1="524" y1="74" x2="226" y2="74" marker-end="url(#aa)"/><text class="t-sm mid" x="375" y="92">refund / jam</text><rect class="n-good" x="0" y="106" width="750" height="60" rx="4"/><text class="t-sm mid" x="375" y="130">చిల్లర లెక్కించేటప్పుడు <tspan class="t-acc">రెండు సంచులనీ కలిపి</tspan> చూస్తాం —</text><text class="t-sm mid" x="375" y="152">user ఇప్పుడే వేసిన ₹10 నాణెం, అతనికే చిల్లరగా తిరిగి వెళ్ళొచ్చు.</text><rect class="n-dark" x="0" y="180" width="750" height="60" rx="4"/><text class="t-w-sm mid" x="375" y="204">మరియు <tspan class="t-acc">refund ఎప్పుడూ సాధ్యమే</tspan> — ఎందుకంటే అతను వేసిన నాణేలే</text><text class="t-w-sm mid" x="375" y="226">escrow lo ఉన్నాయి. వాటిని తిరిగి ఇవ్వడానికి ఏ లెక్కా అవసరం లేదు.</text></svg>
</div>

```javascript
refund() {
  if (this.#escrow.isEmpty) return { ok: false, reason: 'NOTHING_TO_REFUND' };
  const back = this.#escrow;                  // సరిగ్గా అవే నాణేలు
  this.#escrow = new CoinBag();
  this.#state = STATES.IDLE;
  return { ok: true, returned: back.toString(), total: back.total };
}
```

**ఒక్క లెక్క కూడా లేదు.** అతను వేసినవే తిరిగి ఇస్తున్నాం:

```
  float 2×₹20, ₹50 వేశాడు: { ok: false, reason: 'NO_CHANGE: ₹15' }
  refund                 : { ok: true, returned: '1×₹50', total: 50 }
  → సరిగ్గా అదే ₹50 note తిరిగి వచ్చింది.
```

---

# Part 4 — మూడో విరుపు: సగంలో ఆగిపోవడం

---

## 9. Step — డబ్బు తీసుకుని, వస్తువు ఇవ్వడం

ఒక అమ్మకంలో **నాలుగు పనులు** ఉన్నాయి, మరియు అవి ఈ క్రమంలో జరగాలి:

```javascript
this.float.addAll(this.#escrow);          // 1 · user డబ్బు యంత్రానిది అయింది
this.#escrow = new CoinBag();
this.float.removeAll(check.change);       // 2 · చిల్లర బయటికి
s.qty--;                                  // 3 · నిల్వ తగ్గింది
dispenser(s);                             // 4 · వస్తువు బయటికి
```

మొదటి మూడూ **memory lo** జరుగుతాయి — అవి ఎప్పుడూ విజయవంతమవుతాయి. నాలుగోది **భౌతిక ప్రపంచంలో** జరుగుతుంది.

---

## 10. మూడో విరుపు — యంత్రం ఇరుక్కుంది, రెండూ పోయాయి

ఒక స్ప్రింగ్ ఇరుక్కుంది. Chips బయటికి రాలేదు.

```
  before: float 1×₹20 2×₹10 1×₹5 3×₹2 · Chips qty 3
  buy → (వస్తువు రాలేదు)
  after : float 1×₹20 2×₹10 1×₹5 3×₹2 2×₹20 ... · Chips qty 2
```

<div class="box warn">
<div class="lab">మూడో విరుపు — user ₹20 ఇచ్చాడు, ఏమీ రాలేదు, మరియు యంత్రం "అమ్ముడైంది" అనుకుంటోంది</div>
<b>1 ·</b> User యొక్క ₹20 float lo కలిసిపోయింది — escrow ఖాళీ, కాబట్టి <b>refund చేయడానికి ఏమీ లేదు</b>.<br>
<b>2 ·</b> <code>qty</code> 3 నుంచి 2 కి తగ్గింది — యంత్రం ఒక Chips అమ్మినట్టు లెక్క.<br>
<b>3 ·</b> ఆ Chips ఇప్పటికీ లోపలే ఉంది. ఇప్పుడు నిల్వ లెక్క మరియు వాస్తవం <b>శాశ్వతంగా విడిపోయాయి</b>.<br><br>
<b>మౌలిక తప్పు:</b> మూడు memory మార్పులు <b>ఇప్పటికే జరిగిపోయాయి</b>, ఆపై నాలుగోది విఫలమైంది. మధ్యలో ఆగిపోయిన ఒక ప్రక్రియ — <b>పాక్షికంగా పూర్తయిన అమ్మకం</b>.<br><br>
ఇది database lo అయితే ఒక <b>transaction</b>. ఇక్కడా అదే కావాలి: <b>అన్నీ, లేదా ఏమీ లేదు.</b>
</div>

---

## 11. Step — పూర్తి rollback

```javascript
buy(code, { dispenser = () => true } = {}) {
  const check = this.canBuy(code);
  if (!check.ok) return check;

  const s = this.slots.get(code);
  const before = { float: this.float.clone(),
                   escrow: this.#escrow.clone(), qty: s.qty };
  this.#state = STATES.DISPENSING;
  try {
    this.float.addAll(this.#escrow);          // user డబ్బు యంత్రానిది అయింది
    this.#escrow = new CoinBag();
    this.float.removeAll(check.change);       // చిల్లర బయటికి
    s.qty--;
    if (!dispenser(s)) throw new Error(`JAMMED: ${s.name}`);
    this.#state = STATES.IDLE;
    return { ok: true, item: s.name, change: check.change.toString(),
             changeTotal: check.change.total };
  } catch (e) {
    this.float = before.float;                // పూర్తి rollback
    this.#escrow = before.escrow;
    s.qty = before.qty;
    this.#state = STATES.COLLECTING;
    return { ok: false, reason: e.message, refundable: this.#escrow.toString() };
  }
}
```

```
  before: float 1×₹20 2×₹10 1×₹5 3×₹2 · Chips qty 3
  buy → { ok: false, reason: 'JAMMED: Chips', refundable: '1×₹20' }
  after : float 1×₹20 2×₹10 1×₹5 3×₹2 · Chips qty 3
  refund: { ok: true, returned: '1×₹20', total: 20 }
```

**float అక్షరాలా మారలేదు. `qty` అలాగే 3. User యొక్క ₹20 తిరిగి వచ్చింది.**

<div class="box">
<div class="lab">ఆ <code>clone()</code> ఎందుకు, మరియు <code>dispenser</code> ఒక parameter ఎందుకు</div>
<b><code>clone()</code></b> — rollback చేయాలంటే "ముందు ఎలా ఉంది" అనేది కావాలి. మార్పులని <i>వెనక్కి లెక్కించడం</i> కంటే <b>ముందటి స్థితిని దాచడం</b> చాలా సులభం మరియు తప్పు చేసే అవకాశం తక్కువ. (సంచులు చిన్నవి — ఇది ఖరీదు కాదు.)<br><br>
<b><code>dispenser</code> ఒక parameter</b> — లేకపోతే "ఇరుక్కుంటే ఏమవుతుంది?" అని <b>పరీక్షించలేం</b>. <code>{ dispenser: () => false }</code> అని ఇస్తే ఆ దారి పరీక్షించబడుతుంది.<br><br>
ఇది Deep Dive 14 §12 (సమయం) మరియు Deep Dive 18 §12 (పాచిక) — అదే నియమం: <b>బయటి ప్రపంచం నుంచి ఏదైనా <i>అడిగితే</i>, దాన్ని బదులుగా <i>ఇవ్వాలి</i>.</b>
</div>

---

# Part 5 — పూర్తి system

---

## 12. Step — కొనే *ముందు* చెప్పడం

§7 lo user ₹50 వేశాడు, ఆపై "చిల్లర లేదు" అని తెలిసింది. అది **చాలా ఆలస్యం** — అతనికి ముందే తెలియాలి.

```javascript
// కొనే *ముందు* చెప్పగలగడం — "exact change only" సూచిక
canBuy(code, extra = 0) {
  const s = this.slots.get(code);
  if (!s) return { ok: false, reason: `NO_SUCH_ITEM: ${code}` };
  if (s.isEmpty) return { ok: false, reason: `SOLD_OUT: ${s.name}` };
  const paid = this.#escrow.total + extra;
  if (paid < s.price)
    return { ok: false, reason: `NEED_MORE: ₹${s.price - paid}` };
  // చిల్లర float *మరియు* escrow రెండింటి నుంచీ ఇవ్వొచ్చు
  const pool = this.float.clone().addAll(this.#escrow);
  const change = makeChange(paid - s.price, pool);
  return change ? { ok: true, change }
                : { ok: false, reason: `NO_CHANGE: ₹${paid - s.price}` };
}
```

మరియు దాని మీద — నిజమైన యంత్రాల మీద కనిపించే ఆ **"EXACT CHANGE ONLY"** దీపం:

```javascript
exactChangeOnly() {
  const out = [];
  for (const s of this.slots.values()) {
    if (s.isEmpty) continue;
    const ok = [...this.accepted].some(d => {
      if (d < s.price) return false;
      return makeChange(d - s.price, this.float) !== null;
    });
    if (!ok) out.push(s.code);
  }
  return out;
}
```

```
  float ఖాళీ →  [ 'D1', 'D2' ] కి ఖచ్చితమైన డబ్బు కావాలి
  float నిండితే → (ఏదీ లేదు)
```

<div class="note"><code>canBuy</code> మరియు <code>buy</code> — రెండూ ఒకే తనిఖీలు చేస్తాయి, మరియు <code>buy</code> లోపల <code>canBuy</code> ని పిలుస్తుంది. <b>ఆ నకలు ఉద్దేశపూర్వకం కాదు — అది తొలగించబడింది.</b> UI కి కావాల్సినది "ఇప్పుడు కొంటే ఏమవుతుంది?"; <code>buy</code> కి కావాల్సినది అదే జవాబు. <b>ఒకే logic, రెండు ఉపయోగాలు.</b></div>

---

## 13. మొత్తం code · నడిపి చూద్దాం · డబ్బు సంరక్షణ పరీక్ష

<div class="fig">
<div class="cap">నిర్మాణం · రెండు సంచులు, ఒక పట్టిక, ఒక DP</div>
<svg viewBox="0 0 750 240"><text class="t-xs" x="0" y="14">VendingMachine ఒక సమన్వయకర్త — నిజమైన పని మూడు ముక్కల్లో</text><rect class="n-acc" x="235" y="26" width="280" height="48" rx="4"/><text class="t-w mid" x="375" y="46">VendingMachine</text><text class="t-w-sm mid" x="375" y="64">insert · canBuy · buy · refund</text><line class="ln-acc" x1="300" y1="78" x2="140" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="78" x2="375" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="450" y1="78" x2="610" y2="104" marker-end="url(#aa)"/><rect class="n-info" x="0" y="108" width="240" height="56" rx="4"/><text class="t mid" x="120" y="130">CoinBag ×2 · §8</text><text class="t-sm mid" x="120" y="150">float · escrow</text><rect class="n-good" x="258" y="108" width="234" height="56" rx="4"/><text class="t mid" x="375" y="130">makeChange · §5</text><text class="t-sm mid" x="375" y="150">ఖచ్చితమైన DP</text><rect class="n-soft" x="510" y="108" width="240" height="56" rx="4"/><text class="t mid" x="630" y="130">Slot</text><text class="t-sm mid" x="630" y="150">code · price · qty</text><rect class="n-dark" x="0" y="180" width="750" height="56" rx="4"/><text class="t-w-sm mid" x="375" y="204">అచలం: <tspan class="t-acc">float.total = ప్రారంభం + వేసినది − ఇచ్చినది</tspan> — ఎల్లప్పుడూ.</text><text class="t-w-sm mid" x="375" y="226">ఆ ఒక్క సమీకరణం jams, refunds, NO_CHANGE — అన్నిటినీ పరీక్షిస్తుంది.</text></svg>
</div>

```javascript
'use strict';
class CoinBag {
  #c = new Map();
  constructor(init = {}) {
    for (const [k,v] of Object.entries(init)) this.#c.set(+k, v);
  }
  get denoms() { return [...this.#c.keys()].sort((a,b) => b-a); }
  count(d) { return this.#c.get(d) ?? 0; }
  add(d, n = 1) { this.#c.set(d, this.count(d) + n); return this; }
  remove(d, n = 1) {
    if (this.count(d) < n) throw new Error(`NOT_ENOUGH_COINS: ${n}×₹${d}`);
    this.#c.set(d, this.count(d) - n); return this;
  }
  addAll(o) { for (const d of o.denoms) this.add(d, o.count(d)); return this; }
  removeAll(o) {
    for (const d of o.denoms) this.remove(d, o.count(d)); return this;
  }
  get total() { return this.denoms.reduce((s,d) => s + d*this.count(d), 0); }
  get isEmpty() { return this.total === 0; }
  clone() {
    const b = new CoinBag();
    for (const d of this.denoms) b.add(d, this.count(d));
    return b;
  }
  toString() {
    const p = this.denoms.filter(d => this.count(d))
                  .map(d => `${this.count(d)}×₹${d}`);
    return p.length ? p.join(' ') : 'ఏమీ లేదు';
  }
}

function makeChange(amount, bag) {
  if (amount === 0) return new CoinBag();
  if (amount < 0) return null;
  const best = new Array(amount + 1).fill(null);
  best[0] = new Map();
  for (const d of bag.denoms) {
    const avail = bag.count(d);
    for (let take = 1; take <= avail; take++)
      for (let v = amount; v >= d; v--)
        if (best[v] === null && best[v-d] !== null &&
            (best[v-d].get(d) ?? 0) < avail) {
          const m = new Map(best[v-d]); m.set(d, (m.get(d) ?? 0) + 1); best[v] = m;
        }
  }
  if (best[amount] === null) return null;
  const out = new CoinBag();
  for (const [d, n] of best[amount]) out.add(d, n);
  return out;
}

class Slot {
  constructor(code, name, price, qty) {
    Object.assign(this, { code, name, price, qty });
  }
  get isEmpty() { return this.qty <= 0; }
}

const STATES = { IDLE: 'IDLE', COLLECTING: 'COLLECTING', DISPENSING: 'DISPENSING' };

class VendingMachine {
  #state = STATES.IDLE;
  #escrow = new CoinBag();               // user వేసినవి — ఇంకా యంత్రానివి కావు
  constructor(slots, float, { accepted = [1,2,5,10,20,50] } = {}) {
    this.slots = new Map(slots.map(s => [s.code, s]));
    this.float = new CoinBag(float);     // యంత్రం సొంత నాణేలు
    this.accepted = new Set(accepted);
  }
  get state() { return this.#state; }
  get inserted() { return this.#escrow.total; }
  get escrow() { return this.#escrow.toString(); }

  insert(denom) {
    if (this.#state === STATES.DISPENSING) return { ok: false, reason: 'BUSY' };
    if (!this.accepted.has(denom))
      return { ok: false, reason: `NOT_ACCEPTED: ₹${denom}` };
    this.#escrow.add(denom);
    this.#state = STATES.COLLECTING;
    return { ok: true, inserted: this.#escrow.total };
  }

  canBuy(code, extra = 0) {
    const s = this.slots.get(code);
    if (!s) return { ok: false, reason: `NO_SUCH_ITEM: ${code}` };
    if (s.isEmpty) return { ok: false, reason: `SOLD_OUT: ${s.name}` };
    const paid = this.#escrow.total + extra;
    if (paid < s.price)
      return { ok: false, reason: `NEED_MORE: ₹${s.price - paid}` };
    const pool = this.float.clone().addAll(this.#escrow);
    const change = makeChange(paid - s.price, pool);
    return change ? { ok: true, change }
                  : { ok: false, reason: `NO_CHANGE: ₹${paid - s.price}` };
  }

  buy(code, { dispenser = () => true } = {}) {
    if (this.#state === STATES.DISPENSING) return { ok: false, reason: 'BUSY' };
    const check = this.canBuy(code);
    if (!check.ok) return check;

    const s = this.slots.get(code);
    const before = { float: this.float.clone(),
                     escrow: this.#escrow.clone(), qty: s.qty };
    this.#state = STATES.DISPENSING;
    try {
      this.float.addAll(this.#escrow);
      this.#escrow = new CoinBag();
      this.float.removeAll(check.change);
      s.qty--;
      if (!dispenser(s)) throw new Error(`JAMMED: ${s.name}`);
      this.#state = STATES.IDLE;
      return { ok: true, item: s.name, change: check.change.toString(),
               changeTotal: check.change.total };
    } catch (e) {
      this.float = before.float;                 // పూర్తి rollback
      this.#escrow = before.escrow;
      s.qty = before.qty;
      this.#state = STATES.COLLECTING;
      return { ok: false, reason: e.message, refundable: this.#escrow.toString() };
    }
  }

  refund() {
    if (this.#escrow.isEmpty) return { ok: false, reason: 'NOTHING_TO_REFUND' };
    const back = this.#escrow;                   // సరిగ్గా అవే నాణేలు
    this.#escrow = new CoinBag();
    this.#state = STATES.IDLE;
    return { ok: true, returned: back.toString(), total: back.total };
  }

  exactChangeOnly() {
    const out = [];
    for (const s of this.slots.values()) {
      if (s.isEmpty) continue;
      const ok = [...this.accepted].some(d =>
        d >= s.price && makeChange(d - s.price, this.float) !== null);
      if (!ok) out.push(s.code);
    }
    return out;
  }
}
```

```
--- సాధారణ కొనుగోలు ---
  float  : 1×₹20 2×₹10 1×₹5 3×₹2
  ₹50 వేశాక escrow : 1×₹50 · state COLLECTING
  Cola (₹35)       : { ok: true, item: 'Cola', change: '1×₹10 1×₹5', changeTotal: 15 }
  float ఇప్పుడు    : 1×₹50 1×₹20 1×₹10 3×₹2

--- §7: అత్యాశ విఫలమయ్యే చోటు ---
  float: 1×₹5 3×₹2 · Bar ₹14
  ₹20 వేశాక — ₹6 చిల్లర కావాలి
  అత్యాశ అయితే: ₹5 తీసుకుని, ₹1 దొరకదు → విఫలం
  ఖచ్చితమైన DP : { ok: true, item: 'Bar', change: '3×₹2', changeTotal: 6 }

--- §10: చిల్లర ఇవ్వలేనప్పుడు ---
  float 2×₹20, ₹50 వేశాడు: { ok: false, reason: 'NO_CHANGE: ₹15' }
  refund                 : { ok: true, returned: '1×₹50', total: 50 }

--- యంత్రం ఇరుక్కుంటే (jam) ---
  before: float 1×₹20 2×₹10 1×₹5 3×₹2 · Chips qty 3
  buy → { ok: false, reason: 'JAMMED: Chips', refundable: '1×₹20' }
  after : float 1×₹20 2×₹10 1×₹5 3×₹2 · Chips qty 3
  refund: { ok: true, returned: '1×₹20', total: 20 }

--- తిరస్కరణలు ---
  అంగీకరించని నాణెం : { ok: false, reason: 'NOT_ACCEPTED: ₹3' }
  డబ్బు లేకుండా     : { ok: false, reason: 'NEED_MORE: ₹20' }
  సరిపోని డబ్బు     : { ok: false, reason: 'NEED_MORE: ₹25' }
  అమ్ముడుపోయినది    : { ok: false, reason: 'SOLD_OUT: Water' }
  లేని code         : { ok: false, reason: 'NO_SUCH_ITEM: Z9' }
  ఖాళీ refund       : { ok: false, reason: 'NOTHING_TO_REFUND' }

--- "ఖచ్చితమైన డబ్బు మాత్రమే" సూచిక ---
  float ఖాళీ → [ 'D1', 'D2' ] కి ఖచ్చితమైన డబ్బు కావాలి
  float నిండితే → (ఏదీ లేదు)
```

### మరియు అసలు రుజువు — డబ్బు సంరక్షణ

ఒక vending machine కి **ఒకే ఒక అచలం (invariant)** ముఖ్యమైనది:

> **float.total = ప్రారంభ float + user వేసినది − user కి తిరిగి వెళ్ళినది**

అది ఎప్పుడూ నిజమై ఉండాలి — విజయవంతమైన అమ్మకాల్లోనూ, jams lo నూ, refunds lo నూ, `NO_CHANGE` lo నూ. **3,000 యాదృచ్ఛిక యంత్రాలు, ఒక్కొక్కటీ 12 యాదృచ్ఛిక operations:**

```
3,000 యంత్రాలు · 2338 అమ్మకాలు · 385 jams · 3249 refunds · 500 NO_CHANGE
డబ్బు సంరక్షణ + escrow + నాణేల లెక్క + వస్తువుల లెక్క: అన్నీ సరైనవి ✓
makeChange: 16,620 ఫలితాలు · మొత్తం సరైనదా, నిల్వ దాటలేదా: అవును ✓
```

నాలుగు అచలాలు పరీక్షించాం: **డబ్బు సృష్టించబడలేదు/నాశనం కాలేదు**, **escrow చివరికి ఖాళీ**, **ఏ నాణెం లెక్కా ఋణాత్మకం కాదు**, మరియు **బయటికి వెళ్ళిన వస్తువులు = `qty` తగ్గుదల**.

<div class="note"><b>ఒక సాధారణ vending machine పరీక్ష ఎలా ఉంటుంది?</b> — "₹50 వేసి ₹35 వస్తువు కొంటే ₹15 రావాలి." అది ఒక సందర్భం.<br><br>
<b>ఒక అచలం వేరు:</b> అది <i>ప్రతి</i> సందర్భాన్నీ పరీక్షిస్తుంది. 385 jams — ఒక్కొక్కటీ వేరే స్థితిలో — అన్నీ డబ్బు సమీకరణాన్ని గౌరవించాయి. నేను ఆ 385 సందర్భాలని <b>రాయలేదు</b>; నేను ఒక <b>నియమం</b> రాశాను.</div>

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | అత్యాశ చిల్లర | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | `makeChange` DP | ₹6 ఇవ్వలేకపోయింది, 3×₹2 ఉన్నా |
| §5 | DP vs brute force | ఒక DP ని కంటితో నమ్మలేం |
| §7 (విరుపు) | `CoinBag` + escrow | ₹50 ఇచ్చాడు, ₹40 వచ్చింది |
| §8 | చిల్లరకి float **+** escrow | User వేసిన నాణేలూ వాడొచ్చు |
| §10 (విరుపు) | `clone()` + rollback | Jam lo డబ్బు మరియు వస్తువు రెండూ పోయాయి |
| §11 | `dispenser` ఒక parameter | లేకపోతే jam ని పరీక్షించలేం |
| §12 | `canBuy`, `exactChangeOnly` | User కి **ముందే** తెలియాలి |
| §13 | డబ్బు సంరక్షణ అచలం | సందర్భాలు కాదు, ఒక నియమం |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">State machine ని వేగంగా దాటండి — డబ్బే అసలు విషయం</text><rect class="n-acc" x="0" y="26" width="100" height="38" rx="3"/><text class="t-w mid" x="50" y="50">6 నిమి</text><text class="t-sm" x="116" y="50"><tspan class="t-acc">Clarify</tspan> — float పరిమితమా? escrow వాడొచ్చా? jam?</text><rect class="n-acc" x="0" y="70" width="110" height="38" rx="3"/><text class="t-w mid" x="55" y="94">7 నిమి</text><text class="t-sm" x="126" y="94">States + slots · <tspan class="t-acc">వేగంగా</tspan></text><rect class="n-acc" x="0" y="114" width="190" height="38" rx="3"/><text class="t-w mid" x="95" y="138">13 నిమి — చిల్లర</text><text class="t-sm" x="206" y="138">అత్యాశ ఎక్కడ విరుగుతుంది · DP</text><rect class="n-good" x="0" y="158" width="170" height="38" rx="3"/><text class="t mid" x="85" y="182">11 నిమి — Escrow</text><text class="t-sm" x="206" y="182">refund · rollback · <tspan class="t-acc">డబ్బు సంరక్షణ</tspan></text><rect class="n-soft" x="0" y="202" width="120" height="38" rx="3"/><text class="t mid" x="60" y="226">8 నిమి</text><text class="t-sm" x="206" y="226">canBuy · UPI · telemetry</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **"Float పరిమితమా?" అని అడగండి** (§2) — అపరిమితం అంటే greedy సరిపోతుంది; పరిమితం అంటే §4.
2. **Greedy ఎక్కడ విరుగుతుందో ఒక ఉదాహరణతో** (§4) — "1×₹5, 3×₹2, ₹6 కావాలి." ఇది 20 సెకన్లు మరియు ఇది నిర్ణయాత్మకం.
3. **Escrow ఒక విడి సంచి** (§8) — "the coins aren't the machine's until the sale completes." ఇది refund ని **లెక్క లేని పని** చేస్తుంది.
4. **చిల్లర float + escrow నుంచి** (§8) — చాలా మంది ఇది మర్చిపోతారు.
5. **Jam → పూర్తి rollback** (§11), మరియు **డబ్బు సంరక్షణ అచలం** (§13). ఈ రెండూ కలిసి "నేను డబ్బు ఉన్న system రాస్తున్నానని నాకు తెలుసు" అని చెప్తాయి.

### ఏమి వదిలేయాలి

- **`CoinBag` పూర్తిగా రాయొద్దు** — "a multiset of denominations with add/remove" ఒక వాక్యం.
- **DP ని రాయాలా?** — recurrence చెప్పి, "it's bounded coin change" అని పేరు పెట్టి, సమయం ఉంటే రాయండి.
- **`exactChangeOnly`** — ప్రస్తావించండి, రాయొద్దు.
- **State machine మీద ఎక్కువ సమయం పెట్టొద్దు** — మూడు states, మూడు బాణాలు, ముందుకి.

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"Three questions first. Is the machine's coin float limited, or can I assume it always has change? Can I use the coins the customer just inserted to make their change? And what happens if the item jams after they've paid?<br><br>
The state machine part — idle, collecting, dispensing — is about three lines, so I'd rather spend the time on the money.<br><br>
The obvious way to make change is greedy: biggest coin first. With unlimited coins and Indian denominations that's actually optimal, so it feels safe. But a vending machine's float is limited, and there greedy doesn't just give a worse answer — it fails to find one that exists. If the machine holds one five-rupee coin and three two-rupee coins and owes six rupees, greedy takes the five, needs one more, has no ones, and reports no change available. Three twos would have worked perfectly. The customer walks away and the owner never finds out.<br><br>
I measured how often that matters, because 'sometimes greedy fails' isn't a design argument. Over twenty thousand random floats it peaked at about two point one percent of otherwise-servable sales. Interestingly it isn't monotonic — with very few coins it's zero percent, because the cases where greedy gets stuck are also cases nobody could serve. It's worst in the middle, where there are enough coins to have options but few enough to strand yourself. At two hundred sales a day that's four lost sales daily, so I'd use the exact version: bounded coin change, a small DP over the amount. And I'd verify it against brute force, because a DP you can't check is a DP you can't trust.<br><br>
Second thing, and this one is easy to miss. If you track inserted money as a running total, you've thrown away which notes the customer gave you. Then when you owe them a refund, you have to construct fifty rupees out of whatever's in the float, and that can be impossible — I had a case where the customer inserted a fifty and got forty back. So the inserted coins go into an escrow: a separate bag, physically in the machine but not yet the machine's money. Refund is then handing back the exact same coins, with no computation at all and no failure mode. And when computing change I'd draw from float plus escrow together, because the coin they just inserted is available.<br><br>
Third: the escrow only merges into the float when the sale completes. That matters because the last step — actually dispensing — is the one that happens in the physical world and can fail. If the money has already moved and the quantity has already decremented, a jam means the customer paid, got nothing, and the inventory count is now permanently wrong. So I'd snapshot the float, escrow and quantity before the dispense, and roll all three back if it fails. It's a transaction.<br><br>
For testing, I wouldn't write individual cases. There's one invariant: the float's total always equals the starting float plus what went in minus what came out. I ran three thousand random machines through random sequences of inserts, buys, jams and refunds and checked that equation, plus that escrow ends empty, no coin count goes negative, and items dispensed matches the drop in quantity. One rule covers every case, including the three hundred and eighty-five jams I never had to write by hand.<br><br>
Last, I'd expose a canBuy that runs the same checks without committing, so the display can show 'exact change only' before the customer inserts anything rather than after."
</div>

---

## 16. Follow-ups — UPI, పలు కొనుగోళ్ళు, telemetry

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "ఒకేసారి రెండు వస్తువులు" | Escrow ఇప్పటికే మొత్తం పట్టుకుంటుంది — `buy` ని ఒక జాబితా తీసుకునేలా | `buy` |
| "UPI / కార్డు" | `PaymentSource` interface — cash ఒక అమలు | **+1 కొత్తది** |
| "ధరలు మారాలి" | `Slot.price` ఒక field — కానీ escrow ఉండగా మార్చొద్దు | **0** |
| "నాణేలు నిండిపోతే?" | `CoinBag` కి ఒక capacity; నిండితే ఆ denomination తిరస్కరించడం | `insert` |
| "ఏ వస్తువు ఎక్కువ అమ్ముడైంది?" | Deep Dive 19 యొక్క hit counter — `bump(code)` | **0 concepts** |
| "ఎప్పుడు నింపాలో తెలియాలి" | కింద చూడండి | Telemetry layer |
| "ఇద్దరు ఒకేసారి" | కింద చూడండి | — |

### ఒకేసారి ఇద్దరు — మరియు ఇక్కడ ఒక ఊరట

> *"ఈ series lo చాలాసార్లు races చూశాం (Deep Dive 04 §7, 15 §16). ఇక్కడ మాత్రం అది <b>చాలా సులభం</b> — ఎందుకంటే ఒక భౌతిక యంత్రానికి <b>ఒక్కటే నాణెం రంధ్రం</b> ఉంది.*
>
> *ఒక సమయంలో ఒక్క user మాత్రమే. కాబట్టి <code>DISPENSING</code> స్థితిలో <code>insert</code> ని తిరస్కరిస్తే చాలు — అదే మొత్తం lock.*
>
> ***కానీ ఇది మారే చోటు ఒకటి ఉంది:** ఒక cloud-connected యంత్రం. నిల్వని ఒక server కి report చేస్తుంటే, మరియు app నుంచి ముందే reserve చేసుకోగలిగితే — అప్పుడు Deep Dive 04 యొక్క atomic claim మళ్ళీ అవసరం."*

### Telemetry — మరియు అది design ని ఎలా మారుస్తుంది

> *"'ఎప్పుడు నింపాలి?' అనేది ఒక inventory ప్రశ్న, కానీ <b>రెండు రకాల నిల్వ</b> ఉన్నాయి: వస్తువులు మరియు <b>నాణేలు</b>.*
>
> *వస్తువులు అయిపోతే అమ్మకం ఆగుతుంది — స్పష్టం. కానీ <b>చిల్లర నాణేలు అయిపోతే</b> యంత్రం "పని చేస్తూనే" ఉంటుంది, కేవలం <b>ఎక్కువ అమ్మకాలని తిరస్కరిస్తూ</b>. అది dashboards lo కనిపించదు.*
>
> *అందుకే నేను <code>exactChangeOnly()</code> ని ఒక method గా బయటపెట్టాను — అది UI సూచిక మాత్రమే కాదు, <b>ఒక telemetry సంకేతం</b>: "ఈ యంత్రానికి చిల్లర కావాలి, ఇంకా ఏమీ అయిపోకముందే."*
>
> *§5 యొక్క 2.14% ని గుర్తుంచుకోండి — <b>కనిపించని నష్టాలు కొలవకపోతే ఎప్పటికీ కనిపించవు.</b>"*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **అత్యాశ యొక్క దాచిన ఊహ** | అపరిమిత నాణేలు (§4) | Deep Dive 16 §7 · ప్రతి "తెలివైన" ఉపాయం |
| **ఊహని కొలవడం** | 2.14%, మరియు వక్రరేఖ (§5) | Deep Dive 05 §10, 03 §8, 19 §11 |
| **గుర్తింపు ఉన్నదాన్ని మొత్తంగా మార్చొద్దు** | `inserted += coin` (§7) | Deep Dive 11 §4, 15 §4 |
| **Escrow — "నా దగ్గర ఉంది ≠ నాది"** | float vs escrow (§8) | Payments, bookings, two-phase commit |
| **అంతా లేదా ఏమీ లేదు** | Jam rollback (§11) | Transactions, sagas, Deep Dive 04 §7 |
| **బయటి ప్రపంచాన్ని inject చెయ్యి** | `dispenser` (§11) | Deep Dive 14 §12, 18 §12 |
| **సందర్భాలు కాదు — ఒక అచలం** | డబ్బు సంరక్షణ (§13) | ప్రతి ఆర్థిక system |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — ఈ doc lo నా ఊహ తప్పైన చోటు</div>
§5 lo నేను అత్యాశ ఎంత తరచుగా విఫలమవుతుందో కొలిచాను, మరియు <b>నా అంచనా స్పష్టంగా తప్పు</b> అని తేలింది. నేను "నాణేలు తక్కువైతే ఎక్కువ విఫలం" అనుకున్నాను. వాస్తవం ఒక <b>తలకిందుల U</b> — అతి తక్కువ దగ్గర 0%, మధ్యలో 2.14%, సమృద్ధి దగ్గర 1.40%.<br><br>
ఒక్కసారి ఆలోచిస్తే కారణం స్పష్టం: <b>అత్యాశ విఫలం కావాలంటే ముందు ఒక జవాబు ఉండాలి.</b> నాణేలు చాలా తక్కువైతే జవాబే ఉండదు, కాబట్టి "కోల్పోయిన అమ్మకం" అనేదే లేదు.<br><br>
<b>కానీ అది ఆలోచించి రాబట్టినది కాదు — కొలిచి తెలుసుకున్నది.</b> మరియు ఈ series అంతటా అదే నమూనా: <b>ఒక సంఖ్య ఒక ఊహని తలకిందులు చేసినప్పుడు, ఆ క్షణమే నిజంగా ఏదో నేర్చుకున్నట్టు.</b>
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b> · <b>14 Text Editor</b> · <b>15 Library</b> · <b>16 Tic-Tac-Toe</b> · <b>17 Autocomplete</b> · <b>18 Snake &amp; Ladder</b> · <b>19 Hit Counter</b> · <b>20 Vending Machine</b>.<br><br>
<b>Deep Dive 04 (BookMyShow)</b> దీనికి దగ్గరి బంధువు — అక్కడా డబ్బు, అక్కడా "పాక్షికంగా పూర్తయిన" ప్రమాదం, అక్కడా ఒక escrow-లాంటి HELD స్థితి.
</div>

---

_Vending Machine — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ప్రతి శాతం నిజంగా `node` lo run చేసి తీసినదే ✅_
