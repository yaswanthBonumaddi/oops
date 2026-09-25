<!-- style: editorial -->
<!-- footer: Leaderboard · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">13</div>
<div class="kicker">Deep Dive 13 · రెండు ప్రశ్నలు, రెండు వేర్వేరు కష్టాలు</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>Leaderboard</div>
<div class="lede">Dream11 · Zynga · Riot · Duolingo · LeetCode — "Top 10 ఎవరు?" సులభం. <b>"నా rank ఎంత?"</b> — అదే అసలు problem.</div>
<div class="sub">మూడు విరుపులు. మొదటిది ఒక్క read కి <b>51 ms</b> తీసుకుంటుంది. రెండోది ప్రతి score update కి <b>2,00,560 మూలకాలని</b> కదిలిస్తుంది. మూడోది — ఏమీ మారకుండానే <b>leaderboard ని తారుమారు చేస్తుంది.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 13</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి సంఖ్య నిజంగా `node` lo run చేసినదే.**

<div class="box">
<div class="lab">ఈ doc lo ఒక పద్ధతి మారింది — మరియు అది ఎందుకో చెప్తాను</div>
మిగతా docs lo నేను <b>మిల్లీసెకన్లు</b> కొలిచాను. ఇక్కడ ఒక చోట అది <b>పనిచేయలేదు</b> — V8 యొక్క <code>splice</code> సమయాలు ఒకే code కి 28 ms నుంచి 1,861 ms వరకు ఊగాయి (§7). GC, JIT, memory layout — ఏదో ఒకటి.<br><br>
కాబట్టి అక్కడ గడియారానికి బదులు <b>పనిని లెక్కించాను</b> — "ఎన్ని మూలకాలు కదిలాయి?". ఆ సంఖ్య <b>ప్రతిసారీ అక్షరాలా ఒకటే</b>, మరియు అదే నిజమైన ఖర్చు.<br><br>
<b>ఇది ఒక పాఠం:</b> benchmark అస్థిరంగా ఉంటే, దాన్ని పదేపదే నడపొద్దు — <b>వేరే విషయాన్ని కొలవండి.</b>
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు ఇందులో రెండు వేర్వేరు ప్రశ్నలు
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: ప్రతిసారీ sort**

3. Step — ఒక Map, ప్రతి చదువుకీ sort
4. **మొదటి విరుపు** — ఒక్క "నా rank ఎంత?" కి 51 ms
5. Step — జాబితాని ఎప్పుడూ క్రమంలోనే ఉంచడం

**Part 3 — రెండో విరుపు: ఇప్పుడు రాయడం విరిగింది**

6. Step — గడియారం ఇక్కడ అబద్ధం చెప్పింది
7. **రెండో విరుపు** — ఒక్క submit కి 2,00,560 మూలకాలు
8. Step — Fenwick tree · score ప్రకారం లెక్కించడం

**Part 4 — మూడో విరుపు: సమాన scores**

9. Step — ముగ్గురికీ 1500 · ఎవరు ముందు?
10. **మూడో విరుపు** — ఏమీ మారకుండానే స్థానాలు మారాయి
11. Step — ఎప్పుడు చేరుకున్నాడో గుర్తుపెట్టడం

**Part 5 — పూర్తి system**

12. Step — "నేను ఎక్కడ ఉన్నాను" · మరియు నేనే మళ్ళీ చేసిన తప్పు
13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — Redis, కాలపరిమితి, విభజన
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు ఇందులో రెండు వేర్వేరు ప్రశ్నలు

> *"Design a leaderboard for an online game. Players submit scores; the system should show the top players and tell a player their rank."*

ఇందులో రెండు ప్రశ్నలు ఉన్నాయి, మరియు అవి **పూర్తిగా వేర్వేరు కష్టాలు**:

<div class="fig">
<div class="cap">రెండు ప్రశ్నలు · ఒకటి సులభం, ఒకటి కాదు</div>
<svg viewBox="0 0 750 288"><text class="t-xs" x="0" y="14">"Top 10" మరియు "నా rank" — ఇవి ఒకే ప్రశ్న కాదు</text><rect class="n-good" x="0" y="26" width="360" height="118" rx="4"/><text class="t mid" x="180" y="50">1 · "Top 10 ఎవరు?"</text><text class="t-sm mid" x="180" y="76">10 మందిని చూపించాలి — కోట్ల మందిలో నుంచి</text><text class="t-sm mid" x="180" y="96">ఒక heap సరిపోతుంది · O(n log k)</text><text class="t-sm mid" x="180" y="116">ఇది ఒక <tspan class="t-acc">సుపరిచితమైన</tspan> problem</text><text class="t-sm mid" x="180" y="136">చాలా మంది ఇక్కడే ఆగిపోతారు</text><rect class="n-acc" x="390" y="26" width="360" height="118" rx="4"/><text class="t-w mid" x="570" y="50">2 · "నా rank ఎంత?"</text><text class="t-w-sm mid" x="570" y="76">నా కంటే ఎక్కువ score ఎంత మందికి ఉంది?</text><text class="t-w-sm mid" x="570" y="96">Heap దీనికి <tspan class="t-acc">పనికిరాదు</tspan> — heap top ని మాత్రమే తెలుసు</text><text class="t-w-sm mid" x="570" y="116">Sorted జాబితా చదవడానికి బాగుంది,</text><text class="t-w-sm mid" x="570" y="136">కానీ <tspan class="t-acc">రాయడానికి కాదు</tspan> (§7)</text><rect class="n-bad" x="0" y="160" width="750" height="126" rx="4"/><text class="t mid" x="375" y="184">మరియు మూడో ప్రశ్న — ఎవరూ అడగనిది</text><text class="t-sm mid" x="375" y="208">ముగ్గురికీ సరిగ్గా 1500 points ఉంటే — <tspan class="t-acc">ఎవరు ముందు?</tspan> ముగ్గురికీ ఏ rank?</text><text class="t-sm mid" x="375" y="228">ఇది ఒక సాంకేతిక ప్రశ్న కాదు — ఇది <tspan class="t-acc">ఆట యొక్క నియమం</tspan>.</text><text class="t-sm mid" x="375" y="250">మరియు దీన్ని నిర్ణయించకపోతే — leaderboard <tspan class="t-acc">కారణం లేకుండా తారుమారవుతుంది</tspan> (§10),</text><text class="t-sm mid" x="375" y="272">మరియు ఆటగాళ్ళు మోసం జరిగిందని ఫిర్యాదు చేస్తారు.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **"Top 10" ఎక్కువా, "నా rank" ఎక్కువా?** | Top-10 మాత్రమే అయితే heap చాలు. Rank కావాలంటే **పూర్తిగా వేరే structure** |
| **ఎంత మంది ఆటగాళ్ళు? Scores ఎంత తరచుగా మారతాయి?** | §4 మరియు §7 — ఇదే రెండు విరుపులని నిర్ణయిస్తుంది |
| **Score పరిధి ఎంత? (0–100? 0–10 లక్షలు?)** | §8 — Fenwick tree పరిమాణం దీని మీదే ఆధారపడుతుంది |
| **సమాన scores ఉంటే ఏ rank?** | §10 — **ఇది మీరే లేవనెత్తాలి** |
| **Score పెరుగుతుందా, లేక కొత్తది పాతదాన్ని తుడిచేస్తుందా?** | "అత్యుత్తమ score" నా "తాజా score" నా — వేర్వేరు నియమాలు |
| **రోజువారీ / వారపు leaderboard?** | అవును అంటే **పలు leaderboards** + కాలపరిమితి (§16) |
| **ఒక ఆటగాడిని తీసేయాలా (ban)?** | `remove` కావాలి — చాలా మంది మర్చిపోతారు |

<div class="box warn">
<div class="lab">మొదటి ప్రశ్న ఎందుకు అంత ముఖ్యం</div>
<i>"Top 10 ఎక్కువగా అడుగుతారా, లేక 'నా rank ఎంత?' ఎక్కువగా అడుగుతారా?"</i><br><br>
నిజమైన ఆటల్లో జవాబు <b>రెండోది</b>, మరియు చాలా ఎక్కువ తేడాతో. Top 10 అంటే పది మంది; <b>మిగతా కోటి మంది తమ rank చూసుకుంటారు.</b><br><br>
మరియు ఇక్కడే చాలా మంది అభ్యర్థులు తప్పిపోతారు: వారు వెంటనే <b>min-heap of size K</b> అంటారు — అది top-K కి పాఠ్యపుస్తక జవాబు. కానీ heap కి <b>"ఈ ఆటగాడు ఎక్కడ ఉన్నాడు" అనేది అస్సలు తెలియదు.</b> అది సరైన సాధనం, <b>తప్పు ప్రశ్నకి</b>.
</div>

---

# Part 2 — మొదటి విరుపు: ప్రతిసారీ sort

---

## 3. Step — ఒక Map, ప్రతి చదువుకీ sort

అతి సహజమైన మొదటి version:

```javascript
class Leaderboard {
  constructor() { this.scores = new Map(); }      // player → score

  submit(player, score) { this.scores.set(player, score); }

  #sorted() {
    return [...this.scores.entries()].sort((a, b) => b[1] - a[1]);
  }
  top(k) { return this.#sorted().slice(0, k); }
  rank(player) {
    const list = this.#sorted();
    return list.findIndex(([p]) => p === player) + 1;
  }
}
```

మరియు ఇది **సరిగ్గా పనిచేస్తుంది**:

```
Top 3:
  asha     1850
  meera    1500
  ravi     1200

rank('ravi') : 3
rank('asha') : 1
```

`submit` అనేది ఒక `Map.set` — తక్షణం. `top` మరియు `rank` కూడా సరైన జవాబులే ఇస్తున్నాయి. Code ఐదు పంక్తులు.

మరి సమస్య ఏమిటి?

---

## 4. మొదటి విరుపు — ఒక్క "నా rank ఎంత?" కి 51 ms

ఆటగాళ్ళ సంఖ్య పెంచి, 200 reads కి పట్టే సమయం కొలుద్దాం:

```
200 reads (సగం "top 10", సగం "నా rank ఎంత?")

   ఆటగాళ్ళు |  200 reads |  ఒక్క read |  10,000 reads అయితే
   ---------+------------+------------+--------------------
       1000 |      22 ms |    0.11 ms | 1.1 సెకన్లు
      20000 |     659 ms |    3.29 ms | 33.0 సెకన్లు
     200000 |   10236 ms |   51.18 ms | 511.8 సెకన్లు
```

<div class="note">మూడు runs: 19–22 ms, 659–678 ms, 9,982–10,517 ms. చివరి వరుస ±3% ఊగుతుంది — ఇంత పెద్ద సమయాలకి అది చిన్నదే, కాబట్టి ఈ పట్టికని నమ్మొచ్చు. §6 lo అలా కాదు.</div>

<div class="fig">
<div class="cap">ఒక్క read యొక్క ఖర్చు</div>
<svg viewBox="0 0 750 220"><text class="t-xs" x="0" y="14">ప్రతి read ప్రతిసారీ మొత్తం జాబితాని sort చేస్తుంది</text><text class="t-sm" x="0" y="48">1,000 ఆటగాళ్ళు</text><rect class="n-good" x="148" y="34" width="3" height="18" rx="1"/><text class="t-sm" x="166" y="48">0.11 ms</text><text class="t-sm" x="0" y="88">20,000</text><rect class="n-acc" x="148" y="74" width="36" height="18" rx="2"/><text class="t-sm" x="200" y="88">3.29 ms</text><text class="t-sm" x="0" y="128">2,00,000</text><rect class="n-dark" x="148" y="114" width="556" height="18" rx="2"/><text class="t-w-sm" x="160" y="128">51.18 ms — ఒక్క ఆటగాడు తన rank అడిగితే</text><rect class="n-bad" x="0" y="146" width="750" height="66" rx="4"/><text class="t-sm mid" x="375" y="170">సెకనుకి 10,000 ఆటగాళ్ళు rank అడిగితే — అది <tspan class="t-acc">8.5 నిమిషాల</tspan> పని.</text><text class="t-sm mid" x="375" y="192">సెకనుకి కాదు. <tspan class="t-acc">ఒక్క సెకను</tspan> traffic కి 8.5 నిమిషాలు.</text><text class="t-sm mid" x="375" y="208">అంటే server మొదటి నిమిషంలోనే కుప్పకూలుతుంది.</text></svg>
</div>

<div class="box warn">
<div class="lab">మొదటి విరుపు — ప్రతి చదువుకీ మొత్తం పని మళ్ళీ</div>
<code>rank('ravi')</code> ఒక్క సంఖ్య ఇస్తుంది. దాని కోసం అది <b>2,00,000 ఆటగాళ్ళని sort</b> చేస్తుంది — ఆపై ఆ sorted జాబితాని విసిరేస్తుంది. తర్వాతి call మళ్ళీ అదే చేస్తుంది.<br><br>
<b>మౌలిక తప్పు:</b> క్రమం (order) అనేది ఈ system యొక్క <b>ముఖ్యమైన స్థితి</b> — కానీ మనం దాన్ని <b>నిల్వ చేయట్లేదు</b>. ప్రతిసారీ తిరిగి లెక్కిస్తున్నాం.<br><br>
Deep Dive 12 §4 lo సరిగ్గా ఇదే ఆకారం చూశాం: నిర్మాణాన్ని నిల్వ చేయకపోతే, ప్రతి ప్రశ్నకీ దాన్ని <i>తిరిగి కనుక్కోవాలి</i>.
</div>

---

## 5. Step — జాబితాని ఎప్పుడూ క్రమంలోనే ఉంచడం

క్రమాన్ని **నిర్వహిద్దాం**. Scores దిగువకి క్రమంలో ఒక array, మరియు rank కోసం **binary search**:

```javascript
class SortedLeaderboard {
  constructor() {
    this.scores = new Map();     // player → score
    this.list = [];              // [score, player] — ఎక్కువ నుంచి తక్కువకి
  }

  // ఒక score కంటే *ఖచ్చితంగా ఎక్కువ* ఎంత మందికి ఉందో — binary search
  #countAbove(score) {
    let lo = 0, hi = this.list.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.list[mid][0] > score) lo = mid + 1; else hi = mid;
    }
    return lo;
  }

  top(k) { return this.list.slice(0, k).map(([s, p]) => [p, s]); }

  rank(player) {
    const s = this.scores.get(player);
    return s === undefined ? -1 : this.#countAbove(s) + 1;
  }
}
```

<div class="note"><b>ఆ <code>#countAbove</code> ఒక ముఖ్యమైన ఆలోచన.</b> "Ravi జాబితాలో ఎక్కడ ఉన్నాడు?" అని వెతకట్లేదు — "Ravi కంటే ఎక్కువ score ఎంత మందికి ఉంది?" అని <b>లెక్కిస్తున్నాం</b>. జవాబు ఒకటే, కానీ రెండోది Ravi ఎవరో తెలియకుండానే లెక్కించగలదు. §8 lo ఇదే ఆలోచన మొత్తం పరిష్కారానికి దారితీస్తుంది.</div>

Reads ఇప్పుడు:

```
  ఆటగాళ్ళు |     2,000 reads
           |  sort-each  →  sorted
  ---------+----------------------
      1000 |    183 ms   →   1 ms
     20000 |   6682 ms   →   1 ms
    200000 | 105605 ms   →   1 ms
```

<div class="box warn">
<div class="lab">కానీ ఒక క్షణం — ఈ రెండు version లూ <i>ఒకే జవాబు</i> ఇస్తున్నాయా?</div>
నేను ఆ పోలిక పెట్టాను, మరియు అవి <b>ఇవ్వట్లేదు</b>. 2,000 rank queries lo:<br><br>
<code>&nbsp;&nbsp;&nbsp;1,000 ఆటగాళ్ళు → 9 తేడాలు · 2,00,000 ఆటగాళ్ళు → 1,883 తేడాలు</code><br><br>
<b>కారణం: సమాన scores.</b> పాత version <code>findIndex</code> వాడుతుంది — అంటే సమాన score ఉన్నవారికి <i>వారు array lo ఎక్కడ పడ్డారో</i> బట్టి వేర్వేరు ranks. కొత్తది <code>countAbove</code> వాడుతుంది — సమాన score → <b>సమాన rank</b>.<br><br>
రెండోదే సరైనదని నేను అనుకుంటున్నాను. కానీ అది <b>నా అభిప్రాయం</b>, ఒక bug fix కాదు — మరియు ఆ నిర్ణయాన్ని ఇంకా ఎవరూ తీసుకోలేదు. <b>అదే Part 4 (§9–§11).</b>
</div>

**1,05,605 ms → 1 ms.** మరియు మళ్ళీ ఆ ముఖ్యమైన విషయం: tree వరుసలాగే, ఇక్కడ కూడా **1 ms అనేది మూడు సందర్భాల్లోనూ ఒకటే**. ఆటగాళ్ళ సంఖ్యతో సంబంధం లేదు.

విరుపు పరిష్కారమైంది. కానీ...

---

# Part 3 — రెండో విరుపు: ఇప్పుడు రాయడం విరిగింది

---

## 6. Step — గడియారం ఇక్కడ అబద్ధం చెప్పింది

`submit` ఇప్పుడు ఏమి చేస్తోందో చూద్దాం:

```javascript
submit(player, score) {
  const old = this.scores.get(player);
  if (old !== undefined) {
    const i = this.#indexOf(player, old);
    if (i !== -1) this.list.splice(i, 1);                          // ← O(n)
  }
  this.scores.set(player, score);
  this.list.splice(this.#countAbove(score), 0, [score, player]);   // ← O(n)
}
```

రెండు `splice` calls. ప్రతి `splice` array మధ్యలో ఒక మూలకాన్ని తీసేయడం/చేర్చడం — అంటే **దాని తర్వాతి అన్ని మూలకాలనీ కదిలించడం**.

కొలుద్దాం... మరియు ఇక్కడే నేను ఇబ్బంది పడ్డాను:

```
2,000 submits — వేర్వేరు runs, ఒకే code
  n=  20000     89 ms
  n= 100000     28 ms      ← ఎక్కువ డేటా, తక్కువ సమయం?
  n= 200000     53 ms
  n= 500000   1861 ms
```

<div class="box warn">
<div class="lab">ఈ సంఖ్యలని ప్రచురించలేము</div>
1,00,000 ఆటగాళ్ళకి <b>28 ms</b>, కానీ 20,000 కి <b>89 ms</b>? ఎక్కువ డేటాకి తక్కువ సమయమా? అది algorithm గురించి ఏమీ చెప్పదు.<br><br>
కారణం V8 <code>splice</code> లోతుల్లో ఉంది — array representation, GC, memory layout. ఒకే code, ఒకే input — కానీ పరిమాణం మారితే <b>66 రెట్లు</b> అస్తవ్యస్తమైన తేడా.<br><br>
<b>ఇక్కడ చాలా మంది చేసే తప్పు:</b> మళ్ళీ మళ్ళీ నడిపి, తమకి నచ్చిన సంఖ్యని తీసుకోవడం. అది కొలత కాదు, ఎంపిక.<br><br>
<b>సరైన పని: వేరే విషయాన్ని కొలవడం.</b>
</div>

---

## 7. రెండో విరుపు — ఒక్క submit కి 2,00,560 మూలకాలు

గడియారానికి బదులు **`splice` ఎన్ని మూలకాలని కదిలిస్తుందో** లెక్కిద్దాం:

```javascript
submit(player, score) {
  const old = this.scores.get(player);
  if (old !== undefined) {
    const i = this.#indexOf(player, old);
    if (i !== -1) { this.moved += this.list.length - i; this.list.splice(i, 1); }
  }
  this.scores.set(player, score);
  const j = this.#countAbove(score);
  this.moved += this.list.length - j;                    // ← పనిని లెక్కించడం
  this.list.splice(j, 0, [score, player]);
}
```

```
2,000 submits — splice ఎన్ని మూలకాలని కదిలించింది

   ఆటగాళ్ళు |  కదిలిన మూలకాలు |  ఒక్కో submit కి
   ---------+-----------------+------------------
       1000 |       19,83,807 |              992
      20000 |     4,01,35,824 |           20,068
     200000 |    40,11,20,653 |         2,00,560
```

<div class="box warn">
<div class="lab">రెండో విరుపు — చదవడం సరిచేసి, రాయడం విరగ్గొట్టాం</div>
<b>ఒక్క score update కి 2,00,560 మూలకాలు కదులుతున్నాయి.</b> అంటే సరిగ్గా n — ఆటగాళ్ళ సంఖ్య. 992 → 20,068 → 2,00,560: <b>ఖచ్చితంగా రేఖీయం</b>.<br><br>
మరియు గమనించండి — ఈ సంఖ్యలు <b>ప్రతి run lo అక్షరాలా ఒకటే</b>. గడియారం 28 ms నుంచి 1,861 ms వరకు ఊగింది; ఈ లెక్క ఊగలేదు, ఎందుకంటే <b>ఇదే నిజమైన పని</b>.<br><br>
<b>మౌలిక తప్పు:</b> ఒక array క్రమాన్ని బాగా నిల్వ చేస్తుంది, కానీ <b>మధ్యలో మార్పులని</b> భరించదు. మరియు ఒక ఆటలో scores <b>నిరంతరం</b> మారుతాయి — అదే system చేసే ప్రధాన పని.
</div>

<div class="fig">
<div class="cap">రెండు design లూ ఒక్కో వైపు విరుగుతున్నాయి</div>
<svg viewBox="0 0 750 214"><text class="t-xs" x="0" y="14">ఒకదాన్ని సరిచేస్తే రెండోది విరుగుతోంది — మనకి రెండూ కావాలి</text><rect class="n-info" x="0" y="26" width="360" height="86" rx="4"/><text class="t mid" x="180" y="50">ప్రతిసారీ sort (§3)</text><text class="t-sm mid" x="180" y="74">రాయడం: <tspan class="t-acc">తక్షణం</tspan> ✓</text><text class="t-sm mid" x="180" y="96">చదవడం: 51 ms ✗</text><rect class="n-soft" x="390" y="26" width="360" height="86" rx="4"/><text class="t mid" x="570" y="50">క్రమంలో ఉంచిన array (§5)</text><text class="t-sm mid" x="570" y="74">చదవడం: <tspan class="t-acc">1 ms</tspan> ✓</text><text class="t-sm mid" x="570" y="96">రాయడం: 2,00,560 కదలికలు ✗</text><rect class="n-acc" x="150" y="128" width="450" height="76" rx="4"/><text class="t-w mid" x="375" y="152">కావాల్సింది: రెండూ log వేగంతో</text><text class="t-w-sm mid" x="375" y="174">Score ప్రకారం <tspan class="t-acc">లెక్కించగలిగే</tspan> ఒక structure —</text><text class="t-w-sm mid" x="375" y="194">ఆటగాళ్ళని క్రమంలో ఉంచనిది. → <tspan class="t-acc">Fenwick tree (§8)</tspan></text></svg>
</div>

---

## 8. Step — Fenwick tree · score ప్రకారం లెక్కించడం

§5 lo ఒక ఆలోచన వచ్చింది: **"Ravi ఎక్కడ ఉన్నాడు" అని వెతకొద్దు — "Ravi కంటే ఎక్కువ ఎంత మందికి?" అని లెక్కించు.**

ఆ ఆలోచనని పూర్తిగా అనుసరిద్దాం. **ఆటగాళ్ళని క్రమంలో ఉంచడం అవసరమే లేదు.** కావాల్సింది ఒక్కటే: *"1500 కంటే ఎక్కువ score ఎంత మందికి ఉంది?"*

అంటే — ప్రతి score కి **ఎంత మంది ఉన్నారో** ఒక గణన, మరియు ఆ గణనల **మొత్తాన్ని వేగంగా** తీసే సామర్థ్యం. అదే **Fenwick tree** (Binary Indexed Tree).

```javascript
class Fenwick {
  constructor(size) { this.n = size; this.t = new Int32Array(size + 1); }
  add(i, d) { for (i++; i <= this.n; i += i & -i) this.t[i] += d; }
  prefix(i) { let s = 0; for (i++; i > 0; i -= i & -i) s += this.t[i]; return s; }
}
```

<div class="note"><b>ఆ <code>i & -i</code> ఏమిటి?</b> అది <code>i</code> యొక్క <b>అతి కుడి 1-బిట్</b>. Fenwick tree lo ప్రతి index ఒక <i>పరిధి</i> యొక్క మొత్తాన్ని పట్టుకుంటుంది, మరియు ఆ పరిధి పొడవు సరిగ్గా ఆ బిట్. కాబట్టి <code>i += i & -i</code> అంటే "నన్ను కలుపుకునే తర్వాతి పెద్ద పరిధికి వెళ్ళు", మరియు <code>i -= i & -i</code> అంటే "నా పరిధిని లెక్కించి, దాని ముందున్నదానికి వెళ్ళు".<br><br>
మీరు దీన్ని <b>గుర్తుపెట్టుకోవాలి</b>, రాబట్టాల్సిన అవసరం లేదు — నాలుగు పంక్తులు, మరియు అవి ఎప్పుడూ ఇలాగే ఉంటాయి. Interview lo ముఖ్యమైనది <b>ఎందుకు దీన్ని ఎంచుకున్నారో</b>, ఎలా అమలు చేశారో కాదు.</div>

ఇప్పుడు leaderboard:

```javascript
class FastLeaderboard {
  constructor(maxScore = 100000) {
    this.max = maxScore;
    this.scores = new Map();          // player → score
    this.byScore = new Map();         // score → Set<player>
    this.counts = new Fenwick(maxScore + 1);
    this.total = 0;
  }
  submit(player, score) {
    const old = this.scores.get(player);
    if (old !== undefined) { this.byScore.get(old).delete(player);
                             this.counts.add(old, -1); }
    else this.total++;
    this.scores.set(player, score);
    if (!this.byScore.has(score)) this.byScore.set(score, new Set());
    this.byScore.get(score).add(player);
    this.counts.add(score, +1);
  }
  countAbove(score) { return this.total - this.counts.prefix(score); }
  rank(player) {
    const s = this.scores.get(player);
    return s === undefined ? -1 : this.countAbove(s) + 1;
  }
}
```

**Fenwick గణనలని పట్టుకుంటుంది; `byScore` పేర్లని పట్టుకుంటుంది.** ఏ ఆటగాడూ ఏ క్రమంలోనూ లేడు.

### మళ్ళీ అదే లెక్క

```
2,000 submits — Fenwick ఎన్ని అడుగులు వేసింది

   ఆటగాళ్ళు |     అడుగులు |  ఒక్కో submit కి
   ---------+-------------+------------------
       1000 |      35,139 |             17.6
      20000 |      35,154 |             17.6
     200000 |      35,079 |             17.5
```

<div class="box">
<div class="lab">2,00,560 → 17.6</div>
మూడు సందర్భాల్లోనూ <b>~17.6 అడుగులు</b>. ఆటగాళ్ళ సంఖ్యతో సంబంధమే లేదు — ఎందుకంటే Fenwick యొక్క ఖర్చు <b>ఆటగాళ్ళ సంఖ్య మీద కాదు, <i>score పరిధి</i> మీద</b> ఆధారపడుతుంది.<br><br>
(17.6 ఎక్కడ నుంచి? ఒక <code>submit</code> = రెండు <code>add</code> calls, ఒక్కొక్కటీ సగటున ~8.8 అడుగులు. Score పరిధి 1,00,000 కి <code>log₂</code> ≈ 16.6, మరియు సగటు దానిలో సగం.)<br><br>
<b>ఇదే ఈ problem యొక్క కేంద్ర ఆలోచన:</b> కోటి మంది ఆటగాళ్ళు ఉండొచ్చు, కానీ <b>scores లక్ష మాత్రమే</b>. కాబట్టి <i>scores</i> ని index చేయాలి, <i>ఆటగాళ్ళని</i> కాదు.
</div>

### రెండూ ఒకే జవాబులు ఇస్తున్నాయా?

వేగం అర్థవంతం కావాలంటే జవాబు సరైనదై ఉండాలి. 20,000 యాదృచ్ఛిక operations, ప్రతి 200 అడుగులకీ రెండు version లనీ పోల్చడం:

```
20,000 operations · రెండూ ఒకే జవాబులు ఇచ్చాయా? అవును ✓
```

---

# Part 4 — మూడో విరుపు: సమాన scores

---

## 9. Step — ముగ్గురికీ 1500 · ఎవరు ముందు?

ఇప్పుడు వేగం బాగుంది. ఒక సాధారణ leaderboard చూద్దాం — **ముగ్గురికీ సరిగ్గా 1500**:

```
మొదట:
   1.  asha     1850
   2.  ravi     1500
   2.  meera    1500
   2.  kiran    1500
   5.  sai      900
```

Ranks **1, 2, 2, 2, 5** — ముగ్గురికీ ఒకే rank, ఆపై 5 కి దూకుతుంది. దీన్ని **పోటీ ర్యాంకింగ్** (competition ranking) అంటారు, ఒలింపిక్స్ lo వాడేది.

ఇది సరైనదే. **కానీ ప్రదర్శన క్రమం చూడండి** — ravi, meera, kiran. ఆ క్రమం ఎక్కడి నుంచి వచ్చింది?

<div class="box">
<div class="lab">పక్కదారి — నా benchmark డేటా అబద్ధం చెప్తోంది</div>
"ఎంత మందికి సమాన score ఉంటుంది?" అని కొలిచాను. జవాబు: 20,000 ఆటగాళ్ళకి <b>87%</b>. అది చాలా ఎక్కువ — 20,000 మందిని 1,00,000 scores lo పంచితే ~10% మాత్రమే ఢీ కొట్టాలి.<br><br>
<b>తప్పు నా random number generator lo ఉంది.</b> నేను ఒక సరళమైన LCG వాడాను (<code>seed = seed * a + c mod 2³¹</code>). అది 20,000 నమూనాల్లో <b>13,499 విభిన్న విలువలు</b> ఇచ్చింది; సరైన generator <b>18,136</b> ఇచ్చింది — ఆశించినది 18,127.<br><br>
కాబట్టి ఈ doc lo ఉన్న <b>ప్రతి సంఖ్యనీ</b> మంచి generator (mulberry32) తో మళ్ళీ కొలిచాను. వేగపు ఫలితాలు పెద్దగా మారలేదు — కానీ <b>ties గురించిన ప్రతి ముగింపూ మారేది</b>.<br><br>
<b>పాఠం:</b> ఒక benchmark యొక్క డేటా కూడా ఒక ఊహ. అది ఎంత నిజమో <b>ముందు తనిఖీ చేయండి</b> — ఫలితాలు వచ్చాక కాదు.
</div>

---

## 10. మూడో విరుపు — ఏమీ మారకుండానే స్థానాలు మారాయి

meera మళ్ళీ ఆడింది మరియు **సరిగ్గా అదే 1500** సాధించింది. ఏమీ మారలేదు:

```javascript
lb.submit('meera', 1500);        // అదే score
```

```
meera *అదే* 1500 మళ్ళీ submit చేశాక:
   1.  asha     1850
   2.  ravi     1500
   2.  kiran    1500
   2.  meera    1500
   5.  sai      900
```

<div class="box warn">
<div class="lab">మూడో విరుపు — meera పైకి ఎక్కలేదు, అయినా కిందకి పడింది</div>
meera ఏమీ సాధించలేదు, ఏమీ పోగొట్టుకోలేదు — <b>అదే score మళ్ళీ submit చేసింది</b>. అయినా ఆమె జాబితాలో రెండో నుంచి <b>మూడో స్థానానికి</b> జారింది, మరియు kiran <b>కారణం లేకుండా పైకి వచ్చాడు</b>.<br><br>
<b>ఎందుకు?</b> <code>byScore</code> ఒక <code>Set</code>. meera ని తీసేసి మళ్ళీ చేర్చాం, కాబట్టి ఆమె <b>Set చివరికి</b> వెళ్ళింది. ఆ క్రమమే జాబితాలో కనిపిస్తోంది.<br><br>
<b>ఇది ఒక performance bug కాదు — ఇది ఒక నమ్మకం సమస్య.</b> ఆటగాళ్ళు leaderboard ని <i>చూస్తూ</i> ఉంటారు. స్థానాలు కారణం లేకుండా మారితే వారు "ఏదో మోసం జరుగుతోంది" అనుకుంటారు — మరియు వారు తప్పు కాదు: <b>జవాబు నిజంగా యాదృచ్ఛికమే.</b>
</div>

### అసలు ప్రశ్న: సమానంగా ఉంటే ఎవరు ముందు?

ఇది **సాంకేతిక ప్రశ్న కాదు** — ఇది ఆట యొక్క నియమం. మూడు సాధారణ జవాబులు:

| నియమం | ఎవరు వాడతారు | ఇక్కడ ముగ్గురికి |
|-------|---------------|------------------|
| **ముందు చేరుకున్నవాడు ముందు** | చాలా ఆటలు, LeetCode contests | ఎవరు ముందు 1500 చేరారో వారు |
| **మరో కొలత** (తక్కువ సమయం, తక్కువ ప్రయత్నాలు) | పరుగు పందాలు, speedruns | ఆ రెండో కొలత ప్రకారం |
| **అక్షర క్రమం** | సరళమైనది, కానీ అన్యాయం | asha, kiran, meera |

**మొదటిది** సహజమైనది మరియు న్యాయమైనది: *"నువ్వు ముందు ఆ score చేరుకున్నావు, కాబట్టి నువ్వే ముందు."*

---

## 11. Step — ఎప్పుడు చేరుకున్నాడో గుర్తుపెట్టడం

ప్రతి ఆటగాడు తన **ప్రస్తుత score ని ఎప్పుడు చేరుకున్నాడో** ఒక వరుస సంఖ్య (`seq`) గా నిల్వ చేద్దాం:

```javascript
submit(player, score) {
  const old = this.entry.get(player);
  if (old && old.score === score)
    return { ok: true, changed: false };     // ఏమీ మారలేదు → ఏమీ చేయొద్దు
  ...
  const seq = ++this.#seq;                   // ఈ score ని ఎప్పుడు చేరుకున్నాడు
  this.entry.set(player, { score, seq });
  this.byScore.get(score).set(player, seq);
  ...
}
```

రెండు మార్పులు, మరియు **రెండూ ముఖ్యం**:

**1 · `changed: false`** — score మారకపోతే **ఏమీ చేయకూడదు**. Fenwick ని తాకొద్దు, `seq` ని మార్చొద్దు. ఇది §10 విరుపుని నేరుగా ఆపుతుంది.

> **ఇది ఒక సార్వత్రిక నియమం:** *ఏమీ మార్చని ఒక update, ఏమీ మార్చకూడదు.* చాలా systems lo bugs ఇక్కడే పుడతాయి — "save" నొక్కితే `updated_at` మారుతుంది, cache ఖాళీ అవుతుంది, event publish అవుతుంది... **ఏమీ మారకపోయినా.**

**2 · `seq`** — సమాన scores ఉన్నవారి మధ్య ఒక **నిర్ణయాత్మకమైన** క్రమం. `Set` కి బదులు `Map<player, seq>`, మరియు చూపించేటప్పుడు `seq` ప్రకారం:

```javascript
#bucket(score) {
  return [...(this.byScore.get(score) ?? new Map())]
           .sort((a, b) => a[1] - b[1]).map(([p]) => p);
}
```

అదే పరీక్ష మళ్ళీ:

```
--- meera *అదే* 1500 మళ్ళీ submit ---
  { ok: true, changed: false }
  క్రమం:
   1.  asha     1850
   2.  ravi     1500
   2.  meera    1500
   2.  kiran    1500
   5.  sai      900
```

**meera అక్కడే ఉంది.** మరియు `changed: false` అనేది call చేసినవారికి **స్పష్టంగా చెప్తోంది** — ఇది ఒక no-op అని. UI దాన్ని చూసి animation ని దాటేయొచ్చు; analytics దాన్ని లెక్కించకుండా ఉండొచ్చు.

---

# Part 5 — పూర్తి system

---

## 12. Step — "నేను ఎక్కడ ఉన్నాను" · మరియు నేనే మళ్ళీ చేసిన తప్పు

ప్రతి ఆటలో ఉండే feature: *"మీరు #75,906 — మీ చుట్టుపక్కల వాళ్ళు ఇదిగో."* ఇది ఆటగాళ్ళని ఆడిస్తూ ఉంచే విషయం.

నేను మొదట ఇలా రాశాను:

```javascript
around(player, radius = 2) {
  const e = this.entry.get(player);
  if (!e) return { ok: false, reason: `NOT_FOUND: ${player}` };
  const mine = this.slice(1, this.total).findIndex(r => r.player === player) + 1;
  return { ok: true, rows: this.slice(mine - radius, mine + radius) };
}
```

ఇది **సరైన జవాబు ఇస్తుంది**. కానీ ఆ `this.slice(1, this.total)` చూడండి — అది **మొత్తం 2,00,000 వరుసలనీ కడుతుంది**, ఆపై అందులో ఒక్క పేరు కోసం వెతుకుతుంది.

<div class="box warn">
<div class="lab">§4 విరుపుని నేనే మళ్ళీ, నా స్వంత "సరిచేసిన" code lo</div>
మూడు దశలు పెట్టి O(n) ని తొలగించాను — ఆపై ఒక సౌకర్యవంతమైన method రాసి <b>దాన్ని వెనక్కి తెచ్చాను</b>.<br><br>
మరియు అది <b>సరైన జవాబు ఇస్తుంది</b>, కాబట్టి ఏ test ఫెయిల్ కాదు. Tests సరైనతని పరీక్షిస్తాయి, <b>ఖర్చుని కాదు.</b>
</div>

**సరైన రూపం:** స్థానాన్ని **లెక్కించడం** — §5 lo మొదలైన అదే ఆలోచన:

```javascript
#positionOf(player) {
  const e = this.entry.get(player);
  if (!e) return -1;
  const startedAt = this.countAbove(e.score) + 1;      // నా బకెట్ ఎక్కడ మొదలు
  return startedAt + this.#bucket(e.score).indexOf(player);
}
around(player, radius = 2) {
  const pos = this.#positionOf(player);
  if (pos === -1) return { ok: false, reason: `NOT_FOUND: ${player}` };
  return { ok: true, rows: this.slice(pos - radius, pos + radius) };
}
```

```
  ఒక around() call:
    మొత్తం జాబితా కట్టితే : 39.8 ms
    స్థానం లెక్కిస్తే      : 0.0008 ms
    తేడా                : 49,750×
```

---

## 13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

<div class="fig">
<div class="cap">నిర్మాణం · ఏ ఆటగాడూ క్రమంలో లేడు</div>
<svg viewBox="0 0 750 264"><text class="t-xs" x="0" y="14">మూడు నిల్వలు — ఒక్కొక్కటీ ఒక వేర్వేరు ప్రశ్నకి జవాబు</text><rect class="n-acc" x="215" y="26" width="320" height="48" rx="4"/><text class="t-w mid" x="375" y="46">Leaderboard</text><text class="t-w-sm mid" x="375" y="64">submit · rank · top · around · remove</text><line class="ln-acc" x1="300" y1="78" x2="140" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="78" x2="375" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="450" y1="78" x2="610" y2="104" marker-end="url(#aa)"/><rect class="n-info" x="0" y="108" width="240" height="62" rx="4"/><text class="t mid" x="120" y="130">entry</text><text class="t-sm mid" x="120" y="150">player → score, seq</text><text class="t-sm mid" x="120" y="166">"నా score ఎంత?"</text><rect class="n-good" x="258" y="108" width="234" height="62" rx="4"/><text class="t mid" x="375" y="130">counts (Fenwick)</text><text class="t-sm mid" x="375" y="150">score → ఎంత మంది</text><text class="t-sm mid" x="375" y="166">"నా కంటే ఎక్కువ ఎంత మంది?"</text><rect class="n-soft" x="510" y="108" width="240" height="62" rx="4"/><text class="t mid" x="630" y="130">byScore</text><text class="t-sm mid" x="630" y="150">score → Map(player, seq)</text><text class="t-sm mid" x="630" y="166">"ఆ score ఎవరికి ఉంది?"</text><rect class="n-bad" x="0" y="186" width="750" height="72" rx="4"/><text class="t-sm mid" x="375" y="210">ఎక్కడా <tspan class="t-acc">ఆటగాళ్ళ క్రమం</tspan> నిల్వ చేయలేదు — అదే కీలకం.</text><text class="t-sm mid" x="375" y="232">Scores లక్ష మాత్రమే; ఆటగాళ్ళు కోట్లు కావచ్చు. కాబట్టి <tspan class="t-acc">scores ని index చేశాం.</tspan></text><text class="t-sm mid" x="375" y="252">క్రమం ఎప్పుడూ నిల్వ కాలేదు — ప్రతిసారీ <tspan class="t-acc">లెక్కించబడుతుంది</tspan>, log వేగంతో.</text></svg>
</div>

```javascript
'use strict';
class Fenwick {
  constructor(size) { this.n = size; this.t = new Int32Array(size + 1); }
  add(i, d) { for (i++; i <= this.n; i += i & -i) this.t[i] += d; }
  prefix(i) { let s = 0; for (i++; i > 0; i -= i & -i) s += this.t[i]; return s; }
  // prefix(idx) >= target అయ్యే అతి చిన్న idx — binary lifting
  lowerBound(target) {
    let pos = 0, rem = target;
    for (let pw = 1 << 31 - Math.clz32(this.n); pw > 0; pw >>= 1)
      if (pos + pw <= this.n && this.t[pos + pw] < rem) {
        pos += pw; rem -= this.t[pos];
      }
    return pos;
  }
}

class Leaderboard {
  #seq = 0;
  constructor(maxScore = 100000) {
    this.max = maxScore;
    this.entry = new Map();            // player → { score, seq }
    this.byScore = new Map();          // score → Map<player, seq>
    this.counts = new Fenwick(maxScore + 1);
    this.total = 0;
  }

  submit(player, score) {
    if (score < 0 || score > this.max)
      return { ok: false, reason: `OUT_OF_RANGE: ${score}` };
    const old = this.entry.get(player);
    if (old && old.score === score)
      return { ok: true, changed: false };    // ఏమీ మారలేదు → ఏమీ చేయొద్దు
    if (old) {
      const b = this.byScore.get(old.score);
      b.delete(player);
      if (!b.size) this.byScore.delete(old.score);
      this.counts.add(old.score, -1);
    } else this.total++;
    const seq = ++this.#seq;                  // ఈ score ని ఎప్పుడు చేరుకున్నాడు
    this.entry.set(player, { score, seq });
    if (!this.byScore.has(score)) this.byScore.set(score, new Map());
    this.byScore.get(score).set(player, seq);
    this.counts.add(score, +1);
    return { ok: true, changed: true, rank: this.rank(player) };
  }

  remove(player) {
    const e = this.entry.get(player);
    if (!e) return { ok: false, reason: `NOT_FOUND: ${player}` };
    const b = this.byScore.get(e.score);
    b.delete(player);
    if (!b.size) this.byScore.delete(e.score);
    this.counts.add(e.score, -1);
    this.entry.delete(player);
    this.total--;
    return { ok: true };
  }

  score(player) { return this.entry.get(player)?.score ?? null; }
  countAbove(score) { return this.total - this.counts.prefix(score); }

  // పోటీ ర్యాంకు: సమాన score → సమాన rank (1, 2, 2, 2, 5)
  rank(player) {
    const e = this.entry.get(player);
    return e ? this.countAbove(e.score) + 1 : -1;
  }

  // ఒక బకెట్‌లోని ఆటగాళ్ళు — ముందు చేరుకున్నవారు ముందు
  #bucket(score) {
    return [...(this.byScore.get(score) ?? new Map())]
             .sort((a, b) => a[1] - b[1]).map(([p]) => p);
  }
  // i-వ స్థానం (1 నుంచి) ఉన్న ఆటగాడి score
  #scoreAtPosition(i) { return this.counts.lowerBound(this.total - i + 1); }

  // [from, to] స్థానాల మధ్య ఉన్నవారు (1 నుంచి)
  slice(from, to) {
    const out = [];
    from = Math.max(1, from);
    to = Math.min(this.total, to);
    let pos = from;
    while (pos <= to) {
      const s = this.#scoreAtPosition(pos);
      const players = this.#bucket(s);
      const startedAt = this.countAbove(s) + 1;      // ఈ బకెట్ ఎక్కడ మొదలు
      for (let j = pos - startedAt; j < players.length && pos <= to; j++, pos++)
        out.push({ rank: startedAt, position: pos, player: players[j], score: s });
    }
    return out;
  }
  top(k) { return this.slice(1, k); }

  // నా స్థానం — మొత్తం జాబితా కట్టకుండా
  #positionOf(player) {
    const e = this.entry.get(player);
    if (!e) return -1;
    const startedAt = this.countAbove(e.score) + 1;
    return startedAt + this.#bucket(e.score).indexOf(player);
  }
  around(player, radius = 2) {
    const pos = this.#positionOf(player);
    if (pos === -1) return { ok: false, reason: `NOT_FOUND: ${player}` };
    return { ok: true, rows: this.slice(pos - radius, pos + radius) };
  }
}
```

```
--- Top 5 ---
   1.  asha     1850
   2.  ravi     1500
   2.  meera    1500
   2.  kiran    1500
   5.  sai      900

--- meera *అదే* 1500 మళ్ళీ submit ---
  { ok: true, changed: false }
  క్రమం:
   1.  asha     1850
   2.  ravi     1500
   2.  meera    1500
   2.  kiran    1500
   5.  sai      900

--- ravi 1900 కి పెరిగాడు ---
  { ok: true, changed: true, rank: 1 }
  క్రమం:
   1.  ravi     1900
   2.  asha     1850
   3.  meera    1500
   3.  kiran    1500
   5.  sai      900

--- తిరస్కరణలు ---
  score పరిధి దాటితే : { ok: false, reason: 'OUT_OF_RANGE: 999999' }
  లేని ఆటగాడు       : -1
```

2,00,000 ఆటగాళ్ళతో:

```
2,00,000 ఆటగాళ్ళు
  ravi rank : 77,661
  2,000 rank calls : 0 ms
  2,000 top(10)    : 5 ms
  2,000 around()   : 3 ms

  ravi చుట్టుపక్కల:
     77660.  p69430    61235
     77661.  p70783    61234
     77661.  ravi      61234
     77663.  p89984    61233
     77663.  p124519   61233
```

### ఈ output ని పంక్తి పంక్తిగా చదువుదాం

**`changed: false`** — meera అక్కడే ఉంది. §10 విరుపు మాయమైంది.

**ravi 1900 కి పెరిగాక ranks 1, 2, 3, 3, 5** — meera మరియు kiran ఇద్దరికీ rank 3 (వారి కంటే ఇద్దరు ఎక్కువ), sai కి 5 (నలుగురు ఎక్కువ). **గణితం సరైనది, మరియు క్రమం నిలకడగా ఉంది.**

**`77661. p70783` మరియు `77661. ravi`** — ఇద్దరికీ 61234, ఇద్దరికీ **ఒకే rank**. కానీ ప్రదర్శనలో p70783 ముందు ఉన్నాడు, ఎందుకంటే అతను **ముందు** ఆ score చేరుకున్నాడు. `rank` సమానం, `position` వేరు — **రెండూ విడిగా ఉన్నాయి**, మరియు అదే సరైనది.

**`77663` కి దూకింది** — 77661, 77661 తర్వాత 77662 కాదు, **77663**. పోటీ ర్యాంకింగ్ అంటే అదే.

**`rank` 2,000 calls కి 0 ms** — 2,00,000 ఆటగాళ్ళలో. §4 lo ఒక్క call కి 51 ms.

<div class="note">ఆ <code>top</code> మరియు <code>around</code> సంఖ్యలు runs మధ్య 2–11 ms ఊగుతాయి. §6 lo చెప్పినట్టే — <b>ఇంత చిన్న సమయాలని నమ్మొద్దు</b>. ఇక్కడ ముఖ్యమైనది ఒక సంఖ్య కాదు: <b>2,00,000 ఆటగాళ్ళ మీద మూడు operations ఒక్కో దానికీ మిల్లీసెకనులో ముగుస్తున్నాయి</b>, §4 lo ఒక్క దానికి 51 ms పట్టేది.</div>

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `Map<player, score>` | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | క్రమాన్ని నిల్వ చేయడం | ఒక్క read కి 51 ms |
| §5 | `countAbove` — వెతకడం కాదు, లెక్కించడం | ఈ ఆలోచనే మిగతా అంతటికీ ఆధారం |
| §7 (విరుపు) | `Fenwick` | ఒక్క submit కి 2,00,560 కదలికలు |
| §8 | `byScore` విడిగా | గణనలు మరియు పేర్లు వేర్వేరు పనులు |
| §10 (విరుపు) | `seq` + `changed: false` | ఏమీ మారకుండా leaderboard తారుమారైంది |
| §12 | `#positionOf` | నా స్వంత `around` O(n) ని వెనక్కి తెచ్చింది |
| §13 | `rank` మరియు `position` విడిగా | సమాన rank, వేర్వేరు స్థానాలు |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Fenwick కి ఎక్కువ సమయం ఇవ్వండి — మిగతాది వేగంగా</text><rect class="n-acc" x="0" y="26" width="90" height="38" rx="3"/><text class="t-w mid" x="45" y="50">5 నిమి</text><text class="t-sm" x="106" y="50"><tspan class="t-acc">Clarify</tspan> — top-K నా rank నా? ties? score పరిధి?</text><rect class="n-acc" x="0" y="70" width="120" height="38" rx="3"/><text class="t-w mid" x="60" y="94">8 నిమి</text><text class="t-sm" x="136" y="94">Naive → sorted → <tspan class="t-acc">రెండూ ఎందుకు విఫలం</tspan></text><rect class="n-acc" x="0" y="114" width="220" height="38" rx="3"/><text class="t-w mid" x="110" y="138">14 నిమి — Fenwick</text><text class="t-sm" x="236" y="138">scores ని index చేయడం · <tspan class="t-acc">ఇదే కేంద్రం</tspan></text><rect class="n-good" x="0" y="158" width="140" height="38" rx="3"/><text class="t mid" x="70" y="182">9 నిమి — Ties</text><text class="t-sm" x="236" y="182">seq · changed:false · rank vs position</text><rect class="n-soft" x="0" y="202" width="140" height="38" rx="3"/><text class="t mid" x="70" y="226">9 నిమి</text><text class="t-sm" x="236" y="226">around · Redis · కాలపరిమితి · విభజన</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **"Top 10" మరియు "నా rank" వేర్వేరు problems** (§1) — మరియు **heap రెండోదానికి పనికిరాదు**. ఇది మొదటి 60 సెకన్లలో చెప్పండి.
2. **ఆటగాళ్ళని కాదు, scores ని index చెయ్యి** (§8) — "కోటి ఆటగాళ్ళు, కానీ లక్ష scores." ఇదే మొత్తం ఆలోచన.
3. **వెతకొద్దు, లెక్కించు** (§5) — `countAbove`. Rank అంటే "నా కంటే ఎక్కువ ఎంత మంది" + 1.
4. **Ties ని మీరే లేవనెత్తండి** (§10) — మరియు "ఏమీ మార్చని update ఏమీ మార్చకూడదు" అనే నియమం.
5. **`rank` మరియు `position` వేర్వేరు** (§13) — సమాన rank, వేర్వేరు ప్రదర్శన స్థానాలు.

### ఏమి వదిలేయాలి

- **Fenwick ని పూర్తిగా రాయొద్దు** — `add` మరియు `prefix` నాలుగు పంక్తులు రాసి, "binary lifting తో k-వ మూలకాన్ని కూడా తీయొచ్చు" అని చెప్పండి. `lowerBound` ని రాయొద్దు.
- **`slice` పూర్తిగా రాయొద్దు** — `top` మరియు `around` రెండూ ఇదే అని చెప్తే చాలు.
- **Naive version lo ఎక్కువ సమయం పెట్టొద్దు** — రెండు నిమిషాలు, ఆపై "ఇది O(n log n) per read, కొలిస్తే 2 లక్షల ఆటగాళ్ళకి 51 ms" అని ముందుకి వెళ్ళండి.
- **Balanced BST / skip list గురించి మాట్లాడండి, రాయొద్దు** (§16).

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"First — which question dominates: 'who's in the top ten' or 'what's my rank'? They look similar and they're completely different problems. And two more: what's the score range, and what happens on a tie?<br><br>
I ask about top-K versus rank because the textbook answer for top-K is a size-K min-heap, and that's the wrong tool here. A heap knows its top; it has no idea where an arbitrary player sits. In a real game ten people are in the top ten and ten million people are checking their own rank, so rank is the operation to design around.<br><br>
The obvious version keeps a map of player to score and sorts on every read. That works and it's five lines, but every read redoes the whole ordering. I measured it — one rank lookup over two hundred thousand players took about forty-eight milliseconds, so ten thousand of them is eight minutes of CPU for one second of traffic.<br><br>
The next instinct is to keep the list sorted, and reads do get fast — binary search gives you the count of players above a score, which is the rank. But now every score update has to splice into the middle of the array. I tried to time it and the numbers were useless — the same code ranged from twenty-eight milliseconds to thirteen hundred across runs, because of how V8 handles array internals. So instead of timing it I counted the work: how many elements does splice move? That number is identical every run — about two hundred thousand elements moved per submit at two hundred thousand players. Exactly linear, which is what you'd expect, and in a game scores are changing constantly.<br><br>
So neither ordering strategy works, because I was ordering the wrong thing. There might be ten million players, but there are only a hundred thousand distinct scores. So I'd index the scores, not the players: a Fenwick tree over the score range holding how many players have each score. A rank is then the total minus the prefix count up to your score, plus one — no player is stored in any order at all. Same counting experiment gives about seventeen steps per submit, and crucially that's the same number at a thousand players and at two hundred thousand, because the cost depends on the score range, not the player count. I'd keep a separate map from score to the players holding it, so I can turn positions back into names.<br><br>
On ties — this is worth raising before they ask. If tied players are stored in a set and someone resubmits the same score, they get removed and reinserted, and they move in the display even though nothing happened. Players watching the board see themselves drop for no reason and assume it's rigged. Two fixes: first, an update that doesn't change the score should do nothing at all — return early. Second, record a sequence number for when a player reached their current score, and order within a tie by that, so whoever got there first shows first.<br><br>
I'd also keep rank and display position as separate fields. Tied players genuinely share a rank — that's competition ranking, one two two two five — but they still need a stable order on screen. Conflating those is where most tie bugs come from."
</div>

---

## 16. Follow-ups — Redis, కాలపరిమితి, విభజన

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "Scores పరిధి చాలా పెద్దది (దశాంశాలు, కోట్లు)" | Fenwick పరిమాణం పెరుగుతుంది → **balanced BST** లేదా **skip list** వాడాలి | `counts` |
| "రోజువారీ / వారపు leaderboard" | **పలు Leaderboard వస్తువులు**, ఒక్కో కాలానికి ఒకటి | **0 concepts** |
| "ఒక ఆటగాడిని ban చెయ్యి" | `remove` ఇప్పటికే ఉంది | **0** |
| "నా స్నేహితుల మధ్య నా rank" | స్నేహితుల scores తీసి sort — జాబితా చిన్నది | **+1 method** |
| "అత్యుత్తమ score మాత్రమే ఉంచాలి" | `submit` lo `if (score <= old.score) return` | **1 పంక్తి** |
| "నిజంగా production lo ఏమి వాడతారు?" | కింద చూడండి | — |
| "కోట్ల మంది · పలు servers" | కింద చూడండి | Storage layer |

### నిజ ప్రపంచంలో: Redis sorted set

> *"ఆచరణలో చాలా జట్లు దీన్ని స్వయంగా రాయవు — **Redis sorted set** (`ZADD`, `ZRANK`, `ZRANGE`) వాడతాయి. అది లోపల **skip list + hash map** — నేను చేసినదే, కానీ score పరిధి మీద ఎలాంటి హద్దూ లేకుండా.*
>
> ***మరియు ties కి Redis ఒక తెలివైన ఉపాయం వాడుతుంది:** score మరియు tiebreak ని **ఒకే సంఖ్యలో కలపడం** — `score * పెద్దది + (గరిష్ఠ_సమయం − timestamp)`. అప్పుడు structure కి ties అనేవే ఉండవు; అన్నీ విభిన్న విలువలే.*
>
> ***కానీ ఆ ఉపాయానికి ఒక ధర ఉంది:** ఇప్పుడు `ZRANK` ఇచ్చేది **ordinal position**, పోటీ rank కాదు. సమాన score ఉన్నవారికి వేర్వేరు ranks వస్తాయి. §13 lo నేను వాటిని విడిగా ఉంచాను — ఏది కావాలో అది **ఆట యొక్క నిర్ణయం**.*
>
> *Interview lo Redis పేరు చెప్పడం మంచిది — కానీ **ముందు లోపల ఏమి ఉందో చెప్పండి**. "Redis వాడతాను" అనేది design కాదు."*

### Scale

> *"Fenwick tree ఒక array — దాన్ని servers మధ్య పంచడం కష్టం.*
>
> *ఆచరణలో: **score పరిధిని ముక్కలుగా విభజించడం** (sharding). ఒక్కో shard ఒక score పరిధిని పట్టుకుంటుంది మరియు తన మొత్తాన్ని తెలుసుకుంటుంది. Rank అంటే — నా shard lo లెక్కించి, **నా పైన ఉన్న shards యొక్క మొత్తాలని** కలపడం. Shards పది ఉంటే అది పది చిన్న calls.*
>
> ***మరియు ఒక ముఖ్యమైన సరళీకరణ:** rank కి **ఖచ్చితత్వం అవసరమా?** "#75,906" మరియు "#75,910" మధ్య ఏ ఆటగాడికీ తేడా తెలియదు. కాబట్టి పెద్ద leaderboards lo **top 1,000 ఖచ్చితంగా**, మిగతావి **ఉజ్జాయింపుగా** — ఇది ఖర్చుని భారీగా తగ్గిస్తుంది.*
>
> *ఈ ఆలోచన — **ఎక్కడ ఖచ్చితత్వం అవసరం లేదో గుర్తించడం** — interview lo చాలా బలమైన సంకేతం."*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **వెతకొద్దు — లెక్కించు** | `countAbove` (§5, §8) | Deep Dive 08, 10 §8, 11 §8, 12 §5 |
| **సరైన విషయాన్ని index చెయ్యి** | ఆటగాళ్ళని కాదు, scores ని (§8) | Databases, search, Deep Dive 11 |
| **Benchmark అస్థిరమైతే వేరే కొలత** | 28–1,861 ms → 2,00,560 కదలికలు (§7) | ప్రతి optimisation |
| **ఏమీ మార్చని update, ఏమీ మార్చకూడదు** | `changed: false` (§11) | Caches, events, `updated_at`, re-render |
| **నిర్ణయాత్మక క్రమం ఒక feature** | `seq` (§11) | Pagination, sync, diffs |
| **ఒకే డేటా, రెండు ప్రశ్నలు** | `rank` vs `position` (§13) | UI vs domain modelling |
| **సౌకర్యవంతమైన method ఖర్చుని దాచేస్తుంది** | నా `around` (§12) | ORMs, getters, helper functions |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — ఈ doc lo నేను రెండుసార్లు తప్పు చేశాను</div>
<b>ఒకసారి (§6):</b> ఒక benchmark రాసి, దాని సంఖ్యలు అర్ధరహితమని గమనించాను — 1,00,000 ఆటగాళ్ళకి 20,000 కంటే <i>తక్కువ</i> సమయం. వాటిని ప్రచురిస్తే మీరు ఒక తప్పు నమ్మేవారు.<br><br>
<b>రెండోసారి (§12):</b> మొత్తం doc <code>O(n)</code> ని తొలగించడం గురించి రాసి, ఆపై చివరి method lo దాన్ని <b>వెనక్కి తెచ్చాను</b>. Tests అన్నీ pass అయ్యాయి, ఎందుకంటే జవాబు సరైనదే.<br><br>
<b>రెండూ ఒకే పాఠాన్ని చెప్తాయి:</b> "పనిచేస్తోంది" మరియు "సరైనది" ఒకటి కాదు. Tests సరైనతని చూస్తాయి; <b>ఖర్చుని మీరే చూడాలి</b> — మరియు మీ స్వంత "సరిచేసిన" code ని కూడా.
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b>.<br><br>
వేగవంతమైన revision కోసం — <code>LLD_Design_Problems_Telugu.pdf</code>.
</div>

---

_Leaderboard — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ప్రతి సంఖ్య నిజంగా `node` lo run చేసి తీసినదే ✅_
