<!-- style: editorial -->
<!-- footer: Snake &amp; Ladder · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">18</div>
<div class="kicker">Deep Dive 18 · నిజంగా సులభమైనదా?</div>
<div class="rule"></div>
<div class="cover-title">Design<br>Snake &amp;<br>Ladder</div>
<div class="lede">Amazon · Oracle · Zoho · service MNCs — "ఇది పిల్లల ఆట, పది నిమిషాల్లో అయిపోతుంది" అని అందరూ అనుకుంటారు.</div>
<div class="sub">మూడు విరుపులు. మొదటిది ఆటగాడిని <b>పాము నోట్లో నిలబెడుతుంది</b>. రెండోది అతన్ని <b>103వ గడిలో</b> పెడుతుంది. మూడోది — మొదటిదాన్ని సరిచేస్తే — <b>ఆటని అనంతంగా తిప్పుతుంది.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 18</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output నిజంగా `node` lo run చేసినదే** — 50,000 ఆటల అనుకరణతో సహా.

<div class="box">
<div class="lab">నేను దీన్ని తక్కువ అంచనా వేశాను — మరియు తప్పు అని తేలింది</div>
ఈ series రాస్తున్నప్పుడు నేను Snake &amp; Ladder ని <b>"పలచని problem"</b> అని అనుకున్నాను. Board, పాచిక, ఆటగాళ్ళు — వ్యూహమే లేదు, కాబట్టి design lo ఏముంటుంది?<br><br>
Code రాసి చూశాక <b>మూడు నిజమైన విరుపులు</b> దొరికాయి, మరియు అందులో ఒకటి <b>అనంత లూప్</b>. మరియు చివరికి ఒక కొలత నా అంచనాని పూర్తిగా తలకిందులు చేసింది (§13).<br><br>
<b>ఇది కూడా ఒక పాఠమే:</b> ఒక problem పలచనిదా కాదా అనేది — దాన్ని <i>రాసి చూసేదాకా</i> తెలియదు.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు వ్యూహం లేకపోతే design ఏముంది?
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: ఒక్క జంప్**

3. Step — `from + die`, ఆపై ఒక Map చూడటం
4. **మొదటి విరుపు** — నిచ్చెన ఎక్కి పాము నోట్లో నిలబడటం
5. Step — గొలుసుని *ముందే* పరిష్కరించడం

**Part 3 — రెండో విరుపు: 103వ గడి**

6. Step — "100 దాటితే" అంటే ఏమిటి?
7. **రెండో విరుపు** — board lo లేని గడి
8. Step — ముగింపు నియమం ఒక మారే వస్తువు

**Part 4 — మూడో విరుపు: చెల్లని board**

9. Step — board ని ఎవరు తనిఖీ చేస్తారు?
10. **మూడో విరుపు** — వలయం, మరియు ఆట ఆగదు
11. Step — నిర్మాణ సమయంలోనే తిరస్కరించడం

**Part 5 — పూర్తి system**

12. Step — పాచికని బయటికి తీయడం
13. మొత్తం code · నడిపి చూద్దాం · **50,000 ఆటల కొలత**

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — బహుళ ఆటగాళ్ళు, ఆన్‌లైన్, board తయారీ
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు వ్యూహం లేకపోతే design ఏముంది?

> *"Design the game Snake and Ladder."*

ఈ ఆటలో **ఆటగాడు ఏ నిర్ణయమూ తీసుకోడు**. పాచిక వేయడం, కదలడం — అంతే. మరి design చేయడానికి ఏముంది?

<div class="fig">
<div class="cap">నిర్ణయాలు ఆటగాడివి కావు — అవి <i>నియమాలవి</i></div>
<svg viewBox="0 0 750 288"><text class="t-xs" x="0" y="14">వ్యూహం లేని ఆట = నియమాలన్నీ system బాధ్యత</text><rect class="n-info" x="0" y="26" width="240" height="118" rx="4"/><text class="t mid" x="120" y="50">1 · జంప్ గొలుసులు</text><text class="t-sm mid" x="120" y="74">నిచ్చెన ఎక్కాక అక్కడ</text><text class="t-sm mid" x="120" y="92">ఒక <tspan class="t-acc">పాము</tspan> ఉంటే?</text><text class="t-sm mid" x="120" y="110">ఆగాలా, కొనసాగాలా?</text><text class="t-acc mid" x="120" y="136">→ §4</text><rect class="n-acc" x="255" y="26" width="240" height="118" rx="4"/><text class="t-w mid" x="375" y="50">2 · ముగింపు</text><text class="t-w-sm mid" x="375" y="74">97 వద్ద ఉండి 6 వేస్తే?</text><text class="t-w-sm mid" x="375" y="92">ఆగాలా, వెనక్కి తిరగాలా,</text><text class="t-w-sm mid" x="375" y="110">గెలవాలా?</text><text class="t-w-sm mid" x="375" y="136">→ §7 · <tspan class="t-acc">103వ గడి</tspan></text><rect class="n-good" x="510" y="26" width="240" height="118" rx="4"/><text class="t mid" x="630" y="50">3 · Board చెల్లుతుందా</text><text class="t-sm mid" x="630" y="74">పైకి వెళ్ళే పాము?</text><text class="t-sm mid" x="630" y="92">ఒకే గడి నుంచి రెండు?</text><text class="t-sm mid" x="630" y="110">ఒక <tspan class="t-acc">వలయం</tspan>?</text><text class="t-acc mid" x="630" y="136">→ §10 · ఆట ఆగదు</text><rect class="n-bad" x="0" y="160" width="750" height="126" rx="4"/><text class="t mid" x="375" y="184">అందుకే ఇది ఒక మంచి interview problem</text><text class="t-sm mid" x="375" y="208">Algorithm లేదు, data structure లేదు, వ్యూహం లేదు — కాబట్టి దాచుకోవడానికి ఏమీ లేదు.</text><text class="t-sm mid" x="375" y="230">మిగిలేది ఒక్కటే: <tspan class="t-acc">నియమాలని ఎంత జాగ్రత్తగా ఆలోచించారు</tspan> అనేది.</text><text class="t-sm mid" x="375" y="256">"ఒక Map lo snakes మరియు ladders పెడతాను" అని 5 నిమిషాల్లో ముగించేవాళ్ళు చాలా మంది.</text><text class="t-sm mid" x="375" y="278">మిగిలిన 40 నిమిషాలూ interviewer ఆ Map ని విరగ్గొట్టడానికే.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **నిచ్చెన చివర ఒక పాము ఉంటే — దాన్ని కూడా అనుసరించాలా?** | **ఇదే §4** — మరియు ఇది మీరే అడగాలి |
| **100 దాటితే? (97 + 6)** | §8 — మూడు సాధారణ నియమాలు ఉన్నాయి |
| **6 వేస్తే మళ్ళీ వంతు వస్తుందా?** | ఒక ఎంపిక — `extraTurnOnSix` |
| **మొదలుపెట్టడానికి 6 కావాలా?** | ఒక ఎంపిక; అడగకపోతే వదిలేయండి |
| **Board ఎవరు ఇస్తారు — అది తప్పు అయితే?** | §11 — **చాలా మంది దీన్ని అస్సలు ఆలోచించరు** |
| **ఎంతమంది ఆటగాళ్ళు?** | Array ఒకటి చాలు — 2 అని hardcode చేయొద్దు |
| **ఒకే గడిలో ఇద్దరు ఉండొచ్చా?** | సాధారణంగా అవును; కాదంటే ఒక కొత్త నియమం |

<div class="box warn">
<div class="lab">మొదటి ప్రశ్న — మరియు ఎందుకు అది interviewer కి నచ్చుతుంది</div>
<i>"నేను నిచ్చెన ఎక్కి 22వ గడికి చేరాను. అక్కడ ఒక పాము నోరు ఉంది. నేను 22 వద్దే ఉంటానా, లేక పాము నన్ను మింగుతుందా?"</i><br><br>
సరైన జవాబు: <b>పాము మింగుతుంది</b>. ఆటగాడు ఆ గడి మీద <i>నిలబడ్డాడు</i>, కాబట్టి ఆ గడి నియమం వర్తిస్తుంది. బోర్డు మీద ఆడినా అదే జరుగుతుంది.<br><br>
ఈ ప్రశ్న ఎందుకు మంచిది? — ఇది ఒక <b>నియమ ప్రశ్న</b>, code ప్రశ్న కాదు. మరియు దీన్ని అడిగితే, మీరు <b>ఆటని ఊహించుకుంటున్నారని</b> తెలుస్తుంది, కేవలం classes గీయట్లేదని.
</div>

---

# Part 2 — మొదటి విరుపు: ఒక్క జంప్

---

## 3. Step — `from + die`, ఆపై ఒక Map చూడటం

```javascript
class Game {
  constructor(snakes, ladders, players) {
    this.jumps = new Map([...Object.entries(snakes), ...Object.entries(ladders)]);
    this.pos = new Map(players.map(p => [p, 0]));
    this.players = players;
    this.turn = 0;
  }
  roll(die) {
    const p = this.players[this.turn % this.players.length];
    let next = this.pos.get(p) + die;
    // ఒక జంప్ మాత్రమే
    if (this.jumps.has(String(next))) next = this.jumps.get(String(next));
    this.pos.set(p, next);
    this.turn++;
    return { player: p, to: next, won: next >= 100 };
  }
}
```

**పనిచేస్తుంది** — పాములు, నిచ్చెనలు, వంతులు, గెలుపు, అన్నీ:

```
  { player: 'ravi', to: 38, won: false }      ← 0 + 1 = 1, నిచ్చెన 1→38
  { player: 'asha', to: 3, won: false }
  { player: 'ravi', to: 46, won: false }
  { player: 'asha', to: 5, won: false }
  { player: 'ravi', to: 50, won: false }
```

పదిహేను పంక్తులు, పూర్తి ఆట. **ఇక్కడే చాలా మంది ఆగిపోతారు.**

---

## 4. మొదటి విరుపు — నిచ్చెన ఎక్కి పాము నోట్లో నిలబడటం

ఒక board పెడదాం: **3 → 22 (నిచ్చెన), మరియు 22 → 8 (పాము)**.

```
1 · గొలుసు జంప్‌లు — నిచ్చెన ఎక్కి పాము నోట్లో పడటం
  స్థానం 1 నుంచి 2 వేస్తే → 22
  కానీ 22 వద్ద ఒక పాము ఉంది, అది 8 కి దిగుతుంది.
  ఆటగాడు నిజంగా ఎక్కడ ఉండాలి? → 8
```

<div class="box warn">
<div class="lab">మొదటి విరుపు — ఆటగాడు ఒక పాము నోట్లో నిలబడి ఉన్నాడు</div>
Code 22 అని చెప్పింది. కానీ 22 అనేది ఒక <b>పాము నోరు</b> — బోర్డు మీద ఎవరూ అక్కడ ఉండలేరు.<br><br>
మరియు ఇది మరింత చెడ్డది: <b>తర్వాతి వంతులో</b> అతను 22 నుంచి కదులుతాడు, ఆ పాము ఎప్పటికీ వర్తించదు. అంటే <b>ఆ పాము ఈ ఆటలో ఉనికిలోనే లేదు</b>.<br><br>
<b>మౌలిక తప్పు:</b> <code>if</code> అనేది "ఒకసారి తనిఖీ చెయ్యి" అని చెప్తుంది. కానీ నియమం "<b>ఎక్కడ ఆగుతావో అక్కడి నియమం వర్తిస్తుంది</b>" — మరియు అది <b>పునరావృత్తం</b>. <code>if</code> కి బదులు <code>while</code> కావాలి.<br><br>
(మరియు ఆ <code>while</code> మూడో విరుపుని తెస్తుంది — §10.)
</div>

---

## 5. Step — గొలుసుని *ముందే* పరిష్కరించడం

ఇక్కడ ఒక మంచి ఆలోచన ఉంది: **గొలుసులు board యొక్క లక్షణం, ఆట యొక్క లక్షణం కాదు.** "22 మీద నిలబడితే చివరికి 8" అనేది ఆట మొదలవకముందే తెలిసిన విషయం.

కాబట్టి దాన్ని **ఒకసారి, నిర్మాణ సమయంలో** లెక్కిద్దాం:

```javascript
// ఒక గడి మీద నిలబడితే చివరికి ఎక్కడ ఆగుతాం — గొలుసు మొత్తం
landOn(square) { return this.#resolved.get(square) ?? square; }
```

```
--- గొలుసు జంప్‌లు ---   (board: 3→22, 22→8, 40→75, 75→99)
    3 మీద నిలబడితే → 8
   22 మీద నిలబడితే → 8
   40 మీద నిలబడితే → 99
   75 మీద నిలబడితే → 99
   50 మీద నిలబడితే → 50
```

`3 → 8` (రెండు జంప్‌లు) మరియు `40 → 99` (రెండు నిచ్చెనలు). మరియు `50` — జంప్ లేని గడి — అలాగే ఉంది.

<div class="box">
<div class="lab">ఎందుకు ఆట సమయంలో కాకుండా నిర్మాణ సమయంలో?</div>
మూడు కారణాలు:<br><br>
<b>1 ·</b> ఆట lo <code>landOn</code> ఒక <b>Map lookup</b> — ఒక లూప్ కాదు.<br>
<b>2 ·</b> గొలుసు ఎప్పుడూ ఒకటే. ప్రతి వంతులోనూ దాన్ని మళ్ళీ నడవడం వృథా.<br>
<b>3 ·</b> మరియు ఇది ముఖ్యమైనది — ఆ గొలుసులని నడుస్తున్నప్పుడే <b>వలయాలు కనిపిస్తాయి</b> (§11). ఆట మధ్యలో ఒక అనంత లూప్ కనుక్కోవడం కంటే, <b>board కట్టేటప్పుడే</b> దాన్ని తిరస్కరించడం మేలు.<br><br>
ఇది Deep Dive 12 §5 lo చూసిన అదే ఆలోచన: <b>నిర్మాణాన్ని ఒకసారి లెక్కించి నిల్వ చెయ్యి, ప్రతిసారీ తిరిగి కనుక్కోవద్దు.</b>
</div>

---

# Part 3 — రెండో విరుపు: 103వ గడి

---

## 6. Step — "100 దాటితే" అంటే ఏమిటి?

ఆటగాడు 97వ గడిలో ఉన్నాడు. 6 వేశాడు. **103.**

కానీ board lo 100 గడులే ఉన్నాయి.

---

## 7. రెండో విరుపు — board lo లేని గడి

```
2 · 100 దాటిపోవడం
  స్థానం 97 నుంచి 6 వేస్తే → 103 (గరిష్ఠం 100)
```

<div class="box warn">
<div class="lab">రెండో విరుపు — <code>won: next >= 100</code> అనేది ఒక నిర్ణయాన్ని దాచేసింది</div>
§3 యొక్క code <code>next >= 100</code> అని చూస్తుంది, కాబట్టి 103 "గెలుపు" అవుతుంది. అది ఒక crash కాదు — కానీ అది <b>ఒక ఆట నియమాన్ని నిశ్శబ్దంగా ఎంచుకుంది</b>.<br><br>
నిజ ప్రపంచంలో <b>మూడు వేర్వేరు నియమాలు</b> వాడతారు:<br><br>
<b>1 · అక్కడే ఉండిపోవడం</b> — 100 మీద <i>సరిగ్గా</i> పడాలి. దాటితే వంతు వృథా. (అత్యంత సాధారణం)<br>
<b>2 · వెనక్కి తిరగడం</b> — 103 అంటే 100 నుంచి 3 వెనక్కి = 97.<br>
<b>3 · దాటినా గెలుపే</b> — పిల్లలతో ఆడేటప్పుడు.<br><br>
<b>మూడూ చెల్లుబాటయ్యేవే.</b> కాబట్టి ఇది ఒక <code>if</code> కాదు — ఇది ఒక <b>మారే నియమం</b>, మరియు §13 lo మనం దాని ప్రభావాన్ని <b>కొలుస్తాం</b>.
</div>

---

## 8. Step — ముగింపు నియమం ఒక మారే వస్తువు

```javascript
class MustLandExactly {     // దాటితే అక్కడే ఉండిపోవడం (సాధారణ నియమం)
  apply(from, raw, size) { return raw > size ? from : raw; }
}
class BounceBack {          // దాటిన మేరకు వెనక్కి
  apply(from, raw, size) { return raw > size ? size - (raw - size) : raw; }
}
class AnyOvershootWins {    // దాటినా గెలుపే
  apply(from, raw, size) { return Math.min(raw, size); }
}
```

```
--- 100 దాటితే ---
  అక్కడే ఉండిపోవడం     96 + 6 →  96
  అక్కడే ఉండిపోవడం     99 + 6 →  99
  వెనక్కి తిరగడం       96 + 6 →  98
  వెనక్కి తిరగడం       99 + 6 →  95
```

<div class="note"><b>గమనించండి:</b> "వెనక్కి తిరగడం" నియమంలో 99 నుంచి 6 వేస్తే <b>95</b> — అంటే ఆటగాడు <i>వెనక్కి</i> వెళ్ళాడు. అది సరైనదే, మరియు ఆ నియమం ఎందుకు ఆటని పొడిగిస్తుందో §13 lo కొలిచి చూస్తాం.<br><br>
మరియు ఒక సూక్ష్మమైన వివరం: వెనక్కి వచ్చిన గడి మీద <b>ఒక పాము ఉండొచ్చు</b> — మరియు అది వర్తించాలి. అందుకే <code>finish.apply()</code> <b>తర్వాత</b> <code>board.landOn()</code> పిలుస్తాం, ముందు కాదు.</div>

---

# Part 4 — మూడో విరుపు: చెల్లని board

---

## 9. Step — board ని ఎవరు తనిఖీ చేస్తారు?

§5 lo గొలుసులని అనుసరించాలని నిర్ణయించాం. దాన్ని సహజంగా రాస్తే:

```javascript
let next = from + die;
while (jumps.has(next)) next = jumps.get(next);     // గొలుసుని పూర్తిగా అనుసరించడం
```

ఇది §4 విరుపుని సరిచేస్తుంది. కానీ ఒక board ఇలా ఉంటే?

```
  5 → 25 (నిచ్చెన), 25 → 5 (పాము)
```

---

## 10. మూడో విరుపు — వలయం, మరియు ఆట ఆగదు

```
3 · వలయం — నిచ్చెన పైకి, పాము కిందకి, మళ్ళీ అదే చోటికి
  5 → 25 (నిచ్చెన), 25 → 5 (పాము)
  ✗ INFINITE_LOOP: 20 జంప్‌ల తర్వాత కూడా ఆగలేదు
```

<div class="fig">
<div class="cap">ఒక నిచ్చెన, ఒక పాము, ఒక అనంత లూప్</div>
<svg viewBox="0 0 750 216"><text class="t-xs" x="0" y="14">రెండూ విడివిడిగా సహేతుకమే — కలిసి ఆటని ఆపేస్తాయి</text><rect class="n-good" x="120" y="34" width="180" height="56" rx="4"/><text class="t mid" x="210" y="58">గడి 5</text><text class="t-sm mid" x="210" y="78">నిచ్చెన → 25</text><rect class="n-bad" x="450" y="34" width="180" height="56" rx="4"/><text class="t mid" x="540" y="58">గడి 25</text><text class="t-sm mid" x="540" y="78">పాము → 5</text><line class="ln-acc" x1="304" y1="50" x2="446" y2="50" marker-end="url(#aa)"/><line class="ln-acc" x1="446" y1="76" x2="304" y2="76" marker-end="url(#aa)"/><rect class="n-dark" x="0" y="110" width="750" height="100" rx="4"/><text class="t-w-sm mid" x="375" y="136">ఆటగాడు 5 మీద పడ్డాడు → 25 కి → 5 కి → 25 కి → …</text><text class="t-w-sm mid" x="375" y="160">ఇది ఒక crash కాదు. Error message లేదు. <tspan class="t-acc">ఆట కేవలం ఆగిపోతుంది.</tspan></text><text class="t-w-sm mid" x="375" y="184">మరియు ఇది <tspan class="t-acc">ఒక నిర్దిష్ట ఆటగాడు ఒక నిర్దిష్ట సంఖ్య</tspan> వేసినప్పుడు మాత్రమే జరుగుతుంది —</text><text class="t-w-sm mid" x="375" y="204">అంటే tests lo కనిపించదు, ఉత్పత్తిలో కనిపిస్తుంది.</text></svg>
</div>

<div class="box warn">
<div class="lab">మూడో విరుపు — తప్పు code lo లేదు, అది <i>డేటాలో</i> ఉంది</div>
<code>while (jumps.has(next))</code> అనే code <b>పూర్తిగా సరైనది</b>. Board చెల్లుబాటయ్యేది అయితే అది ఎప్పుడూ ఆగుతుంది.<br><br>
సమస్య ఏమిటంటే — <b>ఎవరూ board చెల్లుబాటయ్యేదా అని అడగలేదు.</b><br><br>
మరియు ఇది ఒక్క వలయమే కాదు. ఒక board ఇవి కూడా కలిగి ఉండొచ్చు:<br><br>
• <b>పైకి వెళ్ళే పాము</b> / <b>కిందకి వెళ్ళే నిచ్చెన</b> — నియమాల ఉల్లంఘన<br>
• <b>ఒకే గడి నుంచి రెండు జంప్‌లు</b> — ఏది వర్తిస్తుంది?<br>
• <b>తనలోకే జంప్</b> (10 → 10) — అర్ధరహితం<br>
• <b>పరిధి బయట</b> (105 → 3, లేదా 50 → 250)<br>
• <b>గడి 100 నుంచి జంప్</b> — గెలిచాక ఎక్కడికి?<br><br>
<b>ఇవన్నీ ఆట సమయంలో కనిపించవు</b> — ఎవరో ఆ గడి మీద పడేవరకు.
</div>

---

## 11. Step — నిర్మాణ సమయంలోనే తిరస్కరించడం

**Board కట్టేటప్పుడే** అన్నిటినీ తనిఖీ చేద్దాం — మరియు **అన్ని సమస్యలనీ ఒకేసారి** నివేదిద్దాం:

```javascript
constructor(size = 100, jumps = {}) {
  this.size = size;
  const pairs = Array.isArray(jumps)
    ? jumps : Object.entries(jumps).map(([k, v]) => [+k, v]);
  const problems = [];
  for (const [from, to] of pairs) {
    if (!Number.isInteger(from) || !Number.isInteger(to))
      { problems.push(`NOT_INTEGER: ${from}→${to}`); continue; }
    if (from < 1 || from > size - 1)
      { problems.push(`BAD_START: ${from} (1..${size-1} మాత్రమే)`); continue; }
    if (to < 1 || to > size)
      { problems.push(`BAD_END: ${from}→${to}`); continue; }
    if (to === from) { problems.push(`SELF_JUMP: ${from}`); continue; }
    if (this.#jumps.has(from))
      { problems.push(`DUPLICATE_START: ${from}`); continue; }
    this.#jumps.set(from, to);
  }
  // వలయాలు — ఒక గొలుసు తనలోకే తిరిగి వస్తే board చెల్లదు
  for (const start of this.#jumps.keys()) {
    const seen = new Set([start]);
    let cur = this.#jumps.get(start);
    while (this.#jumps.has(cur)) {
      if (seen.has(cur)) {
        problems.push(`CYCLE: ${[...seen, cur].join('→')}`); break;
      }
      seen.add(cur); cur = this.#jumps.get(cur);
    }
    if (!this.#jumps.has(cur)) this.#resolved.set(start, cur);
  }
  if (problems.length) {
    const e = new Error(`INVALID_BOARD: ${problems.length} సమస్యలు`);
    e.problems = problems;
    throw e;
  }
}
```

```
--- చెల్లని boards ---
  వలయం                   → INVALID_BOARD: 2 సమస్యలు
      CYCLE: 5→25→5
      CYCLE: 25→5→25
  తనలోకే                 → INVALID_BOARD: 1 సమస్యలు
      SELF_JUMP: 10
  ఒకే గడి నుంచి రెండు    → INVALID_BOARD: 1 సమస్యలు
      DUPLICATE_START: 7
  పరిధి బయట              → INVALID_BOARD: 3 సమస్యలు
      BAD_START: 0 (1..99 మాత్రమే)
      BAD_END: 50→250
      BAD_START: 105 (1..99 మాత్రమే)
```

<div class="box">
<div class="lab">మూడు design వివరాలు — ప్రతిదీ ఉద్దేశపూర్వకం</div>
<b>1 · అన్ని సమస్యలనీ సేకరించడం, మొదటిదానికే ఆగిపోకపోవడం.</b> చివరి ఉదాహరణలో <b>మూడు</b> సమస్యలు చెప్పింది. ఒక board file సరిచేసేవారికి — ఒక్కొక్కటిగా కనుక్కోవడం కంటే ఇది ఎంతో మేలు.<br><br>
<b>2 · ఇక్కడ <code>throw</code>, <code>{ok:false}</code> కాదు.</b> ఈ series lo చాలాసార్లు తిరస్కరణని ఒక విలువగా ఇచ్చాం. కానీ ఇది వేరు — <b>ఒక చెల్లని board తో ఆట ఉనికిలో ఉండకూడదు</b>. Constructor ఒక విలువ తిరిగి ఇవ్వలేదు, మరియు "సగం కట్టిన board" అనేది ప్రమాదకరం.<br><br>
<b>3 · <code>jumps</code> ఒక array కూడా కావచ్చు.</b> JavaScript object lo నకిలీ keys <b>ఉండలేవు</b> — <code>{7:20, 7:44}</code> అనేది ఒకే entry. కానీ ఒక board file lo నకిలీలు సులభంగా వస్తాయి. అందుకే <code>[[7,20],[7,44]]</code> రూపాన్ని కూడా అంగీకరిస్తున్నాం — <b>లేకపోతే ఆ తనిఖీకి అర్థమే లేదు.</b>
</div>

---

# Part 5 — పూర్తి system

---

## 12. Step — పాచికని బయటికి తీయడం

ఒక చివరి సమస్య: **`Math.random()` ని ఎలా పరీక్షించాలి?**

```javascript
class Die {
  constructor(sides = 6, rand = Math.random) {
    this.sides = sides; this.rand = rand;
  }
  roll() { return 1 + Math.floor(this.rand() * this.sides); }
}
class ScriptedDie {               // పరీక్షలకి
  constructor(values) { this.values = [...values]; this.i = 0; }
  roll() { return this.values[this.i++ % this.values.length]; }
}
```

<div class="box">
<div class="lab">ఇది ఒక చిన్న class — కానీ అది మూడు పనులు చేస్తుంది</div>
<b>1 · పరీక్షించగలగడం.</b> <code>ScriptedDie([1,3,8,...])</code> తో ఒక ఆట <b>ప్రతిసారీ ఒకేలా</b> నడుస్తుంది. లేకపోతే "6 వేస్తే ఏమవుతుంది?" అని పరీక్షించడానికి <code>Math.random</code> ని mock చేయాలి.<br><br>
<b>2 · అనుకరణ.</b> <code>new Die(6, seededRand)</code> — §13 lo 50,000 ఆటలని <b>పునరుత్పత్తి చేయగలిగేలా</b> నడపడానికి ఇదే కావాలి.<br><br>
<b>3 · మార్పులు.</b> 12-ముఖాల పాచిక? రెండు పాచికలు? — <code>Die</code> ని మార్చితే చాలు, <code>Game</code> ని కాదు.<br><br>
Deep Dive 14 §12 lo సమయాన్ని ఇలాగే బయటికి తీశాం. <b>నియమం ఒకటే: system బయటి ప్రపంచం నుంచి ఏదైనా <i>అడిగితే</i>, దాన్ని బదులుగా <i>ఇవ్వాలి</i>.</b>
</div>

---

## 13. మొత్తం code · నడిపి చూద్దాం · 50,000 ఆటల కొలత

<div class="fig">
<div class="cap">నిర్మాణం · ఐదు ముక్కలు</div>
<svg viewBox="0 0 750 246"><text class="t-xs" x="0" y="14">Game కి నియమాలు తెలియవు — అవి లోపలికి ఇవ్వబడతాయి</text><rect class="n-acc" x="255" y="26" width="240" height="48" rx="4"/><text class="t-w mid" x="375" y="46">Game</text><text class="t-w-sm mid" x="375" y="64">turn · pos · winner · play()</text><line class="ln-acc" x1="300" y1="78" x2="130" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="78" x2="375" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="450" y1="78" x2="620" y2="104" marker-end="url(#aa)"/><rect class="n-info" x="0" y="108" width="230" height="56" rx="4"/><text class="t mid" x="115" y="130">Board · §5, §11</text><text class="t-sm mid" x="115" y="150">landOn() · నిర్మాణ తనిఖీ</text><rect class="n-good" x="258" y="108" width="234" height="56" rx="4"/><text class="t mid" x="375" y="130">finish · §8</text><text class="t-sm mid" x="375" y="150">100 దాటితే ఏమి చేయాలి</text><rect class="n-soft" x="520" y="108" width="230" height="56" rx="4"/><text class="t mid" x="635" y="130">die · §12</text><text class="t-sm mid" x="635" y="150">Die · ScriptedDie</text><rect class="n-bad" x="0" y="182" width="750" height="58" rx="4"/><text class="t-sm mid" x="375" y="206">Board <tspan class="t-acc">కట్టేటప్పుడే</tspan> చెల్లుతుందని నిర్ధారించుకున్నాం — కాబట్టి <code>landOn</code> ఎప్పుడూ ఆగుతుంది.</text><text class="t-sm mid" x="375" y="230">అంటే <code>Game</code> lo ఒక్క రక్షణ తనిఖీ కూడా అవసరం లేదు.</text></svg>
</div>

```javascript
'use strict';
class Board {
  #jumps = new Map();                       // from → to
  #resolved = new Map();                    // from → గొలుసు చివర
  // jumps: { from: to } లేదా [[from, to], ...] — రెండో రూపం నకిలీలని చూపగలదు
  constructor(size = 100, jumps = {}) {
    this.size = size;
    const pairs = Array.isArray(jumps)
      ? jumps : Object.entries(jumps).map(([k, v]) => [+k, v]);
    const problems = [];
    for (const [from, to] of pairs) {
      if (!Number.isInteger(from) || !Number.isInteger(to))
        { problems.push(`NOT_INTEGER: ${from}→${to}`); continue; }
      if (from < 1 || from > size - 1)
        { problems.push(`BAD_START: ${from} (1..${size-1} మాత్రమే)`); continue; }
      if (to < 1 || to > size)
        { problems.push(`BAD_END: ${from}→${to}`); continue; }
      if (to === from) { problems.push(`SELF_JUMP: ${from}`); continue; }
      if (this.#jumps.has(from))
        { problems.push(`DUPLICATE_START: ${from}`); continue; }
      this.#jumps.set(from, to);
    }
    for (const start of this.#jumps.keys()) {
      const seen = new Set([start]);
      let cur = this.#jumps.get(start);
      while (this.#jumps.has(cur)) {
        if (seen.has(cur)) {
          problems.push(`CYCLE: ${[...seen, cur].join('→')}`); break;
        }
        seen.add(cur); cur = this.#jumps.get(cur);
      }
      if (!this.#jumps.has(cur)) this.#resolved.set(start, cur);
    }
    if (problems.length) {
      const e = new Error(`INVALID_BOARD: ${problems.length} సమస్యలు`);
      e.problems = problems;
      throw e;
    }
  }
  get jumps() { return new Map(this.#jumps); }
  landOn(square) { return this.#resolved.get(square) ?? square; }
  kind(from) {
    const to = this.#jumps.get(from);
    return to === undefined ? null : (to > from ? 'LADDER' : 'SNAKE');
  }
}

class MustLandExactly {      // దాటితే అక్కడే ఉండిపోవడం
  apply(from, raw, size) { return raw > size ? from : raw; }
}
class BounceBack {           // దాటిన మేరకు వెనక్కి
  apply(from, raw, size) { return raw > size ? size - (raw - size) : raw; }
}
class AnyOvershootWins {     // దాటినా గెలుపే
  apply(from, raw, size) { return Math.min(raw, size); }
}

class Die {
  constructor(sides = 6, rand = Math.random) {
    this.sides = sides; this.rand = rand;
  }
  roll() { return 1 + Math.floor(this.rand() * this.sides); }
}
class ScriptedDie {
  constructor(values) { this.values = [...values]; this.i = 0; }
  roll() { return this.values[this.i++ % this.values.length]; }
}

class Game {
  #history = [];
  constructor(board, players, {
    die = new Die(), finish = new MustLandExactly(), extraTurnOnSix = false,
  } = {}) {
    if (players.length < 1) throw new Error('NO_PLAYERS');
    Object.assign(this, { board, players, die, finish, extraTurnOnSix });
    this.pos = new Map(players.map(p => [p, 0]));
    this.turnIndex = 0;
    this.winner = null;
  }
  get turn() { return this.players[this.turnIndex]; }
  get isOver() { return this.winner !== null; }

  play(by = this.turn) {
    if (this.isOver) return { ok: false, reason: 'GAME_OVER', winner: this.winner };
    if (by !== this.turn)
      return { ok: false, reason: `NOT_YOUR_TURN: ${this.turn}` };

    const die = this.die.roll();
    const from = this.pos.get(by);
    const raw = from + die;
    const capped = this.finish.apply(from, raw, this.board.size);
    const landed = this.board.landOn(capped);      // గొలుసు మొత్తం అనుసరించడం

    this.pos.set(by, landed);
    const jumped = landed !== capped ? this.board.kind(capped) : null;
    this.#history.push({ by, die, from, capped, landed, jumped });

    if (landed === this.board.size) {
      this.winner = by;
      return { ok: true, die, from, to: landed, jumped, won: true };
    }
    if (!(this.extraTurnOnSix && die === this.die.sides))
      this.turnIndex = (this.turnIndex + 1) % this.players.length;
    return { ok: true, die, from, to: landed, jumped, next: this.turn };
  }
  get history() { return [...this.#history]; }
}
```

```
--- ఒక పూర్తి ఆట (scripted dice) ---
  ravi  1 →   0 →  38  (LADDER)
  asha  3 →   0 →   3
  ravi  8 →  38 →  46
  asha  2 →   3 →   5
  ravi  4 →  46 →  50
  asha  6 →   5 →  11
  ravi  5 →  50 →  55
  asha  2 →  11 →  13
  ravi  6 →  55 →  61
  asha  4 →  13 →   7  (SNAKE)
  ravi  3 →  61 →  60  (SNAKE)
  asha  5 →   7 →  12

--- తిరస్కరణలు ---
  తప్పు వంతు : { ok: false, reason: 'NOT_YOUR_TURN: ravi' }
```

### మరియు ఇప్పుడు — ఒక కొలత నా అంచనాని తలకిందులు చేసింది

`Die` ని బయటికి తీశాం కాబట్టి (§12), ఒక seeded RNG ఇచ్చి **50,000 ఆటలని పునరుత్పత్తి చేయగలిగేలా** నడపొచ్చు:

```
50,000 ఆటలు · ఒక్క ఆటగాడు · 6-ముఖాల పాచిక

  board                     |  సగటు |  మధ్యస్థ |   p90 |   p99 |  గరిష్ఠం
  --------------------------+--------+----------+-------+-------+----------
  పాములు/నిచ్చెనలు లేకుండా  |   33.3 |       32 |    41 |    53 |       84
  classic board             |   33.4 |       29 |    58 |   101 |      250
  నిచ్చెనలు మాత్రమే         |   21.8 |       21 |    32 |    45 |       75
  పాములు మాత్రమే            |   90.3 |       72 |   169 |   307 |      641
```

<div class="box">
<div class="lab">పాములు మరియు నిచ్చెనలు ఆట పొడవుని మార్చవు — అవి <i>అనిశ్చితిని</i> మారుస్తాయి</div>
మొదటి రెండు వరుసలు చూడండి. <b>సగటు దాదాపు ఒకటే — 33.3 vs 33.4.</b> ఒక ఖాళీ board మీద నడిచినా, పదహారు పాములు నిచ్చెనలు ఉన్న classic board మీద నడిచినా, సగటు ఒకటే.<br><br>
కానీ <b>ఆకారం పూర్తిగా వేరు</b>:<br><br>
• <b>మధ్యస్థ</b> 32 → <b>29</b> — సాధారణ ఆట <i>చిన్నది</i> అయింది<br>
• <b>p99</b> 53 → <b>101</b> — చెడ్డ ఆట <i>రెట్టింపు</i> అయింది<br>
• <b>గరిష్ఠం</b> 84 → <b>250</b> — <i>మూడు రెట్లు</i><br><br>
అంటే ఆ board రూపకర్త <b>సగటుని కాదు, నాటకీయతని</b> design చేశాడు. చాలా ఆటలు త్వరగా ముగుస్తాయి; కొన్ని భయంకరంగా సాగుతాయి. <b>అదే ఆటని ఆసక్తికరంగా చేస్తుంది.</b><br><br>
<b>మరియు నేను దీన్ని ఊహించలేదు</b> — నేను classic board ఆటని <i>పొడిగిస్తుందని</i> అనుకున్నాను. కొలిచాకే తెలిసింది.
</div>

<div class="note">మొదటిసారి 20,000 ఆటలు నడిపినప్పుడు రెండు సగటులూ <b>సరిగ్గా 33.3</b> వచ్చాయి, మరియు నేను "ఇవి ఖచ్చితంగా సమానం" అని రాయబోయాను. నాలుగు వేర్వేరు seeds తో పరీక్షిస్తే — ఖాళీ board 33.30–33.35, classic 33.38–33.71. అంటే classic <b>కొంచెం ఎక్కువే</b>, సమానం కాదు.<br><br>
<b>ఒక run నుంచి "సరిగ్గా సమానం" అని తీర్మానించడం</b> — అది ఒక తప్పు, మరియు దాన్ని పట్టుకున్నది పలు seeds మాత్రమే.</div>

మరియు §8 యొక్క ముగింపు నియమాలు:

```
  classic board · వేర్వేరు "100 దాటితే" నియమాలు:
  నియమం                     |  సగటు |  మధ్యస్థ |   p90 |   p99 |  గరిష్ఠం
  --------------------------+--------+----------+-------+-------+----------
  అక్కడే ఉండిపోవడం          |   33.4 |       29 |    58 |   101 |      250
  వెనక్కి తిరగడం            |   36.7 |       30 |    67 |   121 |      242
  దాటినా గెలుపే             |   30.3 |       26 |    53 |    90 |      229
```

**"వెనక్కి తిరగడం" ఆటని 3 వంతులు పొడిగిస్తుంది** — ఎందుకంటే అది ఆటగాడిని వెనక్కి నెట్టడమే కాదు, **వెనక్కి వచ్చిన గడిలో ఒక పాము ఉండొచ్చు**.

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `jumps` Map, వంతులు | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | `#resolved` — గొలుసు చివర | ఆటగాడు పాము నోట్లో నిలబడ్డాడు |
| §5 | నిర్మాణ సమయంలో లెక్కించడం | ఆటలో lookup, లూప్ కాదు |
| §7 (విరుపు) | `finish` నియమం | 103వ గడి |
| §8 | మూడు నియమ classes | మూడూ నిజమైన ఆటల్లో వాడేవే |
| §10 (విరుపు) | వలయ తనిఖీ | `while` అనంతంగా తిరిగింది |
| §11 | అన్ని సమస్యలనీ సేకరించడం | Board file సరిచేసేవారికి |
| §12 | `Die` బయటికి | పరీక్షించడానికి, అనుకరించడానికి |
| §13 | — | ఆ అనుకరణే §13 యొక్క కొలతని సాధ్యం చేసింది |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Code చిన్నది — సమయం అంతా నియమాల మీదే</text><rect class="n-acc" x="0" y="26" width="120" height="38" rx="3"/><text class="t-w mid" x="60" y="50">7 నిమి</text><text class="t-sm" x="136" y="50"><tspan class="t-acc">Clarify</tspan> — గొలుసులు? 100 దాటితే? board ఎవరిస్తారు?</text><rect class="n-acc" x="0" y="70" width="130" height="38" rx="3"/><text class="t-w mid" x="65" y="94">8 నిమి</text><text class="t-sm" x="146" y="94">మౌలిక ఆట · <tspan class="t-acc">వేగంగా దాటండి</tspan></text><rect class="n-acc" x="0" y="114" width="170" height="38" rx="3"/><text class="t-w mid" x="85" y="138">10 నిమి — గొలుసులు</text><text class="t-sm" x="186" y="138">నిర్మాణ సమయంలో పరిష్కరించడం</text><rect class="n-good" x="0" y="158" width="200" height="38" rx="3"/><text class="t mid" x="100" y="182">12 నిమి — Validation</text><text class="t-sm" x="216" y="182">వలయం · <tspan class="t-acc">ఇక్కడే మీరు నిలబడతారు</tspan></text><rect class="n-soft" x="0" y="202" width="130" height="38" rx="3"/><text class="t mid" x="65" y="226">8 నిమి</text><text class="t-sm" x="216" y="226">Die · finish నియమాలు · అనుకరణ</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **"నిచ్చెన చివర పాము ఉంటే?" అని మీరే అడగండి** (§4) — ఇది మొదటి రెండు నిమిషాల్లో, మరియు ఇది ఆటని ఊహించుకుంటున్నారని చూపిస్తుంది.
2. **గొలుసుని నిర్మాణ సమయంలో పరిష్కరించడం** (§5) — ఆటలో lookup. మరియు అదే వలయాలని బయటపెడుతుంది.
3. **Board validation** (§11) — **ఇదే ఈ problem lo మీరు నిలబడే చోటు.** చాలా మంది దీన్ని అస్సలు ప్రస్తావించరు. వలయం, పైకి వెళ్ళే పాము, నకిలీ start — మూడూ చెప్పండి.
4. **"100 దాటితే" ఒక మారే నియమం** (§8) — మూడు నిజమైన ఎంపికలు ఉన్నాయని చెప్పండి.
5. **`Die` ని inject చేయడం** (§12) — "so the game is deterministic in tests and I can Monte-Carlo it."

### ఏమి వదిలేయాలి

- **Board రూపకల్పన (ఏ గడిలో ఏ పాము)** — అది ఒక game-design ప్రశ్న, అడిగితేనే.
- **UI, rendering** — పూర్తిగా వదిలేయండి.
- **`BounceBack` మరియు `AnyOvershootWins` రాయొద్దు** — interface చూపించి, ఒకటి రాయండి.
- **అనుకరణ** — ఒక వాక్యం: "with an injected die I could Monte-Carlo the board to check it's balanced." అది ఒక బలమైన ముగింపు.

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"Three questions before I start. If a ladder puts me on a square that has a snake's head, does the snake apply? What happens if I'm on ninety-seven and roll a six? And who supplies the board — can I assume it's valid?<br><br>
The first one matters because it's the difference between an if and a while. The obvious implementation adds the die, looks up one jump, and stops. That leaves the player standing on a snake's head, which can't happen on a physical board — and worse, on their next turn they move off it, so that snake never fires at all. Landing on a square means the square's rule applies, and that's recursive.<br><br>
I'd resolve those chains once, when the board is constructed, rather than every turn. Two reasons: during play it becomes a map lookup instead of a loop, and walking the chains at construction is exactly where cycles show up.<br><br>
Because there's a third problem hiding in that fix. If the board has a ladder from five to twenty-five and a snake from twenty-five back to five, the while loop never terminates. That's not a crash with a stack trace — the game just stops, and only when a particular player rolls a particular number, so it won't show up in tests.<br><br>
The code isn't wrong there; the data is. So I'd validate the board in the constructor and refuse to build an invalid one. Cycles, snakes that go up, ladders that go down, two jumps from the same square, jumps off the board, a jump from the winning square. And I'd collect all the problems rather than throwing on the first, because whoever is fixing a board file wants the whole list. This is one of the few places I'd actually throw rather than return a result object — a half-built board shouldn't exist.<br><br>
On overshoot, there are three real rules people play: you must land exactly and a bust wastes the turn, you bounce back by the excess, or any overshoot wins. All three are legitimate, so that's a strategy object rather than an if. One ordering detail: apply the overshoot rule first and the board's jump resolution second, because bouncing back can land you on a snake.<br><br>
Last, I'd inject the die rather than calling Math.random inside. That makes games deterministic in tests, and it means I can run the board through a Monte Carlo simulation to check it's balanced. I actually did that — fifty thousand games. The interesting result is that the classic board has almost the same mean length as a board with no snakes or ladders at all, about thirty-three turns either way. What it changes is the spread: the median drops from thirty-two to twenty-nine, but the ninety-ninth percentile goes from fifty-three to a hundred and one, and the worst game from eighty-four turns to two hundred and fifty. The board isn't designed to change how long a game takes — it's designed to add variance."
</div>

---

## 16. Follow-ups — బహుళ ఆటగాళ్ళు, ఆన్‌లైన్, board తయారీ

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "6 వేస్తే మళ్ళీ వంతు" | `extraTurnOnSix` ఇప్పటికే ఉంది | **0** |
| "మొదలుపెట్టడానికి 6 కావాలి" | `play` lo ఒక షరతు (`from === 0 && die !== 6`) | **1 పంక్తి** |
| "రెండు పాచికలు" | `class TwoDice { roll() { ... } }` | **+1 కొత్తది** |
| "ఒక గడిలో ఇద్దరు ఉంటే వెనకవాడు మొదటికి" | `play` lo ఒక తనిఖీ | `Game` |
| "నలుగురు ఆటగాళ్ళు" | `players` ఇప్పటికే array | **0** |
| "ఒక సమతుల్యమైన board తయారు చెయ్యి" | కింద చూడండి | — |
| "ఆన్‌లైన్ — ఇద్దరు వేర్వేరు చోట్ల" | కింద చూడండి | Server layer |

### సమతుల్యమైన board తయారు చేయడం

> *"§13 యొక్క అనుకరణ ఇప్పుడు ఒక **సాధనం** అయింది. ఒక board ఇచ్చి, 50,000 ఆటలు నడిపి, దాని <b>ఆకారాన్ని</b> చూడొచ్చు.*
>
> *ఒక board designer ఇలా పనిచేయొచ్చు: యాదృచ్ఛిక boards తయారు చేసి, ప్రతిదాన్నీ అనుకరించి, కావాల్సిన లక్షణాలు ఉన్నవాటిని ఎంచుకోవడం — ఉదాహరణకి "మధ్యస్థ 30 కంటే తక్కువ, p99 90 కంటే ఎక్కువ".*
>
> ***ఇది ఒక సాధారణ నమూనా:** ఒక system ని పరీక్షించగలిగేలా చేస్తే (§12), అదే పరీక్షా సాధనం ఒక <b>design సాధనం</b> అవుతుంది."*

### ఆన్‌లైన్ ఆట

> *"పాచిక **server lo** వేయాలి — లేకపోతే client 6 అని చెప్పుకోవచ్చు. నా `Die` ఇప్పటికే inject చేయబడింది, కాబట్టి server తన సొంత RNG ఇస్తుంది.*
>
> *మరియు `play(by)` ఇప్పటికే ఎవరు ఆడుతున్నారో తీసుకుని `NOT_YOUR_TURN` తిరస్కరిస్తుంది — <b>client ని నమ్మాల్సిన అవసరం లేదు.</b>*
>
> *నవీకరణలు పంపడానికి Deep Dive 07 యొక్క event bus. <b>0 కొత్త concepts.</b>*
>
> ***మరియు `#history` ఉంది కాబట్టి** — ఒక ఆటగాడు disconnect అయి తిరిగి వస్తే, మొత్తం ఆటని మళ్ళీ ఆడించి స్థితిని పునర్నిర్మించొచ్చు."*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **నియమం పునరావృత్తమా, ఒకసారా?** | `if` vs `while` (§4) | Redirects, rewrites, aliases |
| **నిర్మాణ సమయంలో లెక్కించడం** | `#resolved` (§5) | Deep Dive 12 §5, 17 §9 |
| **తప్పు code lo కాదు, డేటాలో** | వలయం (§10) | Configs, schemas, board/level files |
| **అన్ని సమస్యలనీ ఒకేసారి చెప్పడం** | `problems[]` (§11) | Form validation, compilers, linters |
| **ఎప్పుడు `throw`, ఎప్పుడు `{ok:false}`** | Constructor (§11) | సగం కట్టిన వస్తువు ఉండకూడదు |
| **బయటి ప్రపంచాన్ని inject చెయ్యి** | `Die` (§12) | Deep Dive 14 §12 · clocks, RNG, IO |
| **పరీక్షా సాధనం = design సాధనం** | 50,000 ఆటలు (§13, §16) | Load tests, simulations, fuzzers |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — నేను ఈ problem ని తక్కువ అంచనా వేశాను</div>
ఈ doc మొదట్లో చెప్పాను: నేను Snake &amp; Ladder ని "పలచని problem" అని అనుకున్నాను. వ్యూహం లేని ఆటలో design ఏముంటుంది?<br><br>
మూడు విరుపులు దొరికాయి, మరియు అవి మూడూ <b>వేర్వేరు రకాలు</b>: ఒకటి <b>నియమాన్ని తప్పుగా అర్థం చేసుకోవడం</b> (§4), ఒకటి <b>ఒక నిర్ణయాన్ని దాచేయడం</b> (§7), ఒకటి <b>డేటాని నమ్మడం</b> (§10). మరియు చివరికి ఒక కొలత నా అంచనాని తలకిందులు చేసింది (§13).<br><br>
<b>పాఠం:</b> "ఈ problem lo ఏమీ లేదు" అనేది ఒక <i>ఊహ</i>, ఒక వాస్తవం కాదు. మరియు ఏ ఊహనైనా పరీక్షించే మార్గం ఒక్కటే — <b>దాన్ని రాసి చూడటం</b>.<br><br>
Interview lo ఇది మరింత నిజం: <b>"సులభమైన" problem ఇచ్చారంటే, వారు చూసేది పరిష్కారం కాదు — మీరు ఎంత లోతుకి వెళ్తారో.</b>
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b> · <b>14 Text Editor</b> · <b>15 Library</b> · <b>16 Tic-Tac-Toe</b> · <b>17 Autocomplete</b> · <b>18 Snake &amp; Ladder</b>.<br><br>
<b>Deep Dive 16 (Tic-Tac-Toe)</b> దీనికి జంట — అక్కడా ఒక ఆట, అక్కడా నియమాలని బయటికి తీయడం. తేడా: అక్కడ ఆటగాళ్ళు నిర్ణయాలు తీసుకుంటారు.
</div>

---

_Snake &amp; Ladder — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, 50,000 ఆటల కొలతతో సహా నిజంగా `node` lo run చేసి తీసినదే ✅_
