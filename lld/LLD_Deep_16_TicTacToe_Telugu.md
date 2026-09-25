<!-- style: editorial -->
<!-- footer: Tic-Tac-Toe → Board Game Engine · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">16</div>
<div class="kicker">Deep Dive 16 · ఒక ఆట కాదు — ఒక engine</div>
<div class="rule"></div>
<div class="cover-title">Design<br>Tic-Tac-Toe<br><span style="font-size:.55em">…ఆపై N×N, ఆపై Connect-4</span></div>
<div class="lede">LeetCode 348 · Amazon · Microsoft · Adobe — ఇది interview lo <b>ఎప్పుడూ ఒక్క ఆట కాదు</b>. మొదట 3×3, ఆపై "N×N చెయ్యి", ఆపై "Connect-4 చెయ్యి".</div>
<div class="sub">మూడు విరుపులు. మొదటిది ఒక ఎత్తుకి <b>1.8 లక్షల గడులు</b> తనిఖీ చేస్తుంది. రెండోది Gomoku lo <b>గెలుపుని మిస్</b> చేస్తుంది — ఆపై <b>గెలవని వారిని గెలిపిస్తుంది</b>. మూడోది <b>ఒకరి ఎత్తుని తుడిచేస్తుంది.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 16</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి సంఖ్య నిజంగా `node` lo run చేసినదే.**

<div class="box">
<div class="lab">ఈ problem గురించి నిజం — మరియు దాన్ని ముందే చెప్తున్నాను</div>
<b>Tic-tac-toe ఒక్కటే ఒక interview problem కాదు.</b> 3×3 board, 9 గడులు — ఏ పద్ధతైనా పనిచేస్తుంది. దాన్ని 20 నిమిషాల్లో రాసేసి కూర్చుంటే, మిగిలిన 25 నిమిషాలూ ఏమి చేస్తారు?<br><br>
అందుకే interviewer <b>ఎప్పుడూ దాన్ని పెంచుతాడు</b>: "N×N చెయ్యి", "వరుసగా K ఉంటే గెలుపు అను", "Connect-4 గా మార్చు". మరియు అక్కడే <b>ప్రతి సులభమైన పరిష్కారమూ విరుగుతుంది</b>.<br><br>
ఈ doc ఆ దారినే నడుస్తుంది — 3×3 నుంచి మొదలుపెట్టి, ప్రతి అడుగులోనూ విరగ్గొట్టి, చివరికి <b>ఒకే code మూడు ఆటలు ఆడేలా</b> చేస్తుంది.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు అది ఎక్కడికి వెళుతుంది
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: ప్రతి ఎత్తుకీ మొత్తం board**

3. Step — ప్రతి ఎత్తు తర్వాత అన్ని రేఖలనీ తనిఖీ
4. **మొదటి విరుపు** — ఒక ఎత్తుకి 1,80,600 గడులు
5. Step — ప్రతి రేఖకీ ఒక గణన

**Part 3 — రెండో విరుపు: K వరుసగా**

6. Step — "ఇప్పుడు Gomoku చెయ్యి"
7. **రెండో విరుపు** — గెలుపు కనిపించలేదు · ఆపై గెలవనివాడు గెలిచాడు
8. Step — చివరి ఎత్తు గుండా వరుసని లెక్కించడం

**Part 4 — మూడో విరుపు: ఆట స్థితి లేదు**

9. Step — నియమాలు ఎక్కడ?
10. **మూడో విరుపు** — ఒకరి ఎత్తు తుడిచిపెట్టుకుపోయింది
11. Step — `Game` ఒక స్థితి యంత్రం

**Part 5 — ఒక engine, మూడు ఆటలు**

12. Step — ఎత్తు నియమాన్ని బయటికి తీయడం · గురుత్వాకర్షణ
13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — AI, undo, ఆన్‌లైన్ ఆట
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు అది ఎక్కడికి వెళుతుంది

> *"Design a tic-tac-toe game."*

ఇది ప్రశ్న **కాదు** — ఇది **ప్రారంభ బిందువు**.

<div class="fig">
<div class="cap">Interview యొక్క నిజమైన ఆకారం</div>
<svg viewBox="0 0 750 292"><text class="t-xs" x="0" y="14">ప్రతి అడుగులోనూ ముందటి పరిష్కారం విరుగుతుంది</text><rect class="n-good" x="0" y="26" width="170" height="64" rx="4"/><text class="t mid" x="85" y="50">1 · 3×3</text><text class="t-sm mid" x="85" y="70">ఏ పద్ధతైనా పనిచేస్తుంది</text><text class="t-sm mid" x="85" y="84">9 గడులు</text><line class="ln-acc" x1="174" y1="58" x2="212" y2="58" marker-end="url(#aa)"/><rect class="n-info" x="216" y="26" width="170" height="64" rx="4"/><text class="t mid" x="301" y="50">2 · N×N</text><text class="t-sm mid" x="301" y="70">"ఇప్పుడు 300×300"</text><text class="t-acc mid" x="301" y="86">§4 · 35 సెకన్లు</text><line class="ln-acc" x1="390" y1="58" x2="428" y2="58" marker-end="url(#aa)"/><rect class="n-acc" x="432" y="26" width="150" height="64" rx="4"/><text class="t-w mid" x="507" y="50">3 · K వరుసగా</text><text class="t-w-sm mid" x="507" y="70">"Gomoku: 15×15, 5"</text><text class="t-w-sm mid" x="507" y="86">§7 · <tspan class="t-acc">తప్పు జవాబు</tspan></text><line class="ln-acc" x1="586" y1="58" x2="624" y2="58" marker-end="url(#aa)"/><rect class="n-dark" x="628" y="26" width="122" height="64" rx="4"/><text class="t-w mid" x="689" y="50">4 · Connect-4</text><text class="t-w-sm mid" x="689" y="70">గురుత్వాకర్షణ</text><text class="t-w-sm mid" x="689" y="86">§12</text><rect class="n-bad" x="0" y="106" width="750" height="86" rx="4"/><text class="t mid" x="375" y="130">మరియు ఒక నాలుగో విషయం — ఎవరూ అడగనిది</text><text class="t-sm mid" x="375" y="154">"ఆట ముగిసింది" అంటే ఏమిటి? ఎవరి వంతు? ఆక్రమించిన గడి మీద ఆడితే?</text><text class="t-sm mid" x="375" y="176">ఇవి <tspan class="t-acc">win check కంటే ముందు</tspan> ఉండాల్సిన నియమాలు — మరియు చాలా మంది వీటిని అస్సలు రాయరు (§10).</text><rect class="n-soft" x="0" y="208" width="750" height="78" rx="4"/><text class="t-sm mid" x="375" y="232">ఈ doc చివరికి — <tspan class="t-acc">ఒకే engine</tspan> మూడు ఆటలూ ఆడుతుంది.</text><text class="t-sm mid" x="375" y="254">Tic-tac-toe అంటే <code>KInARow(3)</code> + <code>PlaceAnywhere</code>.</text><text class="t-sm mid" x="375" y="276">Connect-4 అంటే <code>KInARow(4)</code> + <code>DropInColumn</code>. <tspan class="t-acc">Game class lo ఒక్క మార్పూ లేదు.</tspan></text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **Board పరిమాణం స్థిరమా, N×N నా?** | N×N అంటే §4 — win check ఖర్చు ముఖ్యమవుతుంది |
| **గెలవడానికి పూర్తి వరుస కావాలా, K వరుసగా చాలా?** | K < N అంటే **పూర్తిగా వేరే algorithm** (§8) |
| **ఇద్దరే ఆటగాళ్ళా, ఎక్కువమందా?** | ఎక్కువమంది అయితే turn logic సాధారణీకరించాలి |
| **గురుత్వాకర్షణ ఉందా (Connect-4)?** | అవును అంటే ఎత్తు నియమం వేరే (§12) |
| **సమం (draw) ఎలా నిర్ణయించాలి?** | §11 — మరియు చాలా మంది దీన్ని మర్చిపోతారు |
| **Undo కావాలా?** | అవును అంటే ఎత్తుల చరిత్ర (§16) |
| **AI ఎదురుగా ఆడాలా?** | §16 — ఇది ఒక వేరే layer |

<div class="box warn">
<div class="lab">రెండో ప్రశ్న అతి ముఖ్యమైనది — మరియు దాదాపు ఎవరూ అడగరు</div>
<i>"గెలవడానికి <b>మొత్తం వరుస</b> కావాలా, లేక <b>వరుసగా K</b> ఉంటే చాలా?"</i><br><br>
Tic-tac-toe lo ఇవి <b>ఒకటే</b> — 3×3 board, 3 వరుసగా = పూర్తి వరుస. కాబట్టి తేడా కనిపించదు.<br><br>
కానీ Gomoku lo board 15×15, గెలుపు <b>5 వరుసగా</b>. ఇప్పుడు ఆ రెండూ <b>పూర్తిగా వేర్వేరు problems</b> — మరియు tic-tac-toe కి పనిచేసే అందమైన పరిష్కారం (§5) ఇక్కడ <b>నిశ్శబ్దంగా తప్పు జవాబులు</b> ఇస్తుంది (§7).<br><br>
ఈ ప్రశ్న అడగడం అంటే — <b>మీరు ముందు చూస్తున్నారని</b> చూపించడం.
</div>

---

# Part 2 — మొదటి విరుపు: ప్రతి ఎత్తుకీ మొత్తం board

---

## 3. Step — ప్రతి ఎత్తు తర్వాత అన్ని రేఖలనీ తనిఖీ

```javascript
class Game {
  constructor(n = 3) {
    this.n = n;
    this.board = Array.from({ length: n }, () => Array(n).fill(null));
    this.turn = 'X';
  }
  play(r, c) {
    this.board[r][c] = this.turn;
    const won = this.checkWin(this.turn);
    this.turn = this.turn === 'X' ? 'O' : 'X';
    return won ? `${this.board[r][c]} గెలిచాడు` : null;
  }
  checkWin(p) {
    const n = this.n, b = this.board;
    for (let i = 0; i < n; i++) {                       // ప్రతి వరుస
      if (b[i].every(x => x === p)) return true;
      let col = true;
      for (let j = 0; j < n; j++) if (b[j][i] !== p) { col = false; break; }
      if (col) return true;
    }
    let d1 = true, d2 = true;                           // రెండు వికర్ణాలు
    for (let i = 0; i < n; i++) {
      if (b[i][i] !== p) d1 = false;
      if (b[i][n-1-i] !== p) d2 = false;
    }
    return d1 || d2;
  }
}
```

**పనిచేస్తుంది**, మరియు చదవడానికి స్పష్టం:

```
  (0,0) → …
  (1,1) → …
  (0,1) → …
  (2,2) → …
  (0,2) → X గెలిచాడు

X X X
. O .
. . O
```

3×3 కి ఇది **పరిపూర్ణం**. Interviewer అంటాడు: *"ఇప్పుడు N×N చెయ్యి."*

---

## 4. మొదటి విరుపు — ఒక ఎత్తుకి 1,80,600 గడులు

ఒక పూర్తి ఆట (n² ఎత్తులు) ఆడి, **ఎన్ని గడులు తనిఖీ అయ్యాయో** లెక్కిద్దాం:

```
   board   |  ఎత్తులు |  గడి తనిఖీలు   |  ఒక్కో ఎత్తుకి |  సమయం
   --------+----------+----------------+----------------+---------
       3×3 |        9 |            216 |             24 |     0 ms
     20×20 |      400 |       3,36,000 |            840 |     3 ms
   100×100 |    10000 |   20,20,00,000 |         20,200 |   425 ms
   300×300 |    90000 | 16,25,40,00,000|       1,80,600 | 35275 ms
```

<div class="fig">
<div class="cap">ఒక్క ఎత్తు వేయడానికి చేసే పని</div>
<svg viewBox="0 0 750 214"><text class="t-xs" x="0" y="14">Board పెరిగితే, ఒక్కో ఎత్తు ఖరీదవుతుంది — ఎత్తు మాత్రం అదే ఒక్క గడి</text><text class="t-sm" x="0" y="48">3×3</text><rect class="n-good" x="118" y="34" width="3" height="18" rx="1"/><text class="t-sm" x="138" y="48">24 తనిఖీలు</text><text class="t-sm" x="0" y="88">20×20</text><rect class="n-good" x="118" y="74" width="6" height="18" rx="2"/><text class="t-sm" x="142" y="88">840</text><text class="t-sm" x="0" y="128">100×100</text><rect class="n-acc" x="118" y="114" width="66" height="18" rx="2"/><text class="t-sm" x="200" y="128">20,200</text><text class="t-sm" x="0" y="168">300×300</text><rect class="n-dark" x="118" y="154" width="586" height="18" rx="2"/><text class="t-w-sm" x="130" y="168">1,80,600 తనిఖీలు — ఒక్క రాయి పెట్టడానికి</text><rect class="n-bad" x="0" y="184" width="750" height="28" rx="4"/><text class="t-sm mid" x="375" y="203">ఆట మొత్తం: <tspan class="t-acc">16,25,40,00,000</tspan> గడి తనిఖీలు · <tspan class="t-acc">35 సెకన్లు</tspan></text></svg>
</div>

<div class="box warn">
<div class="lab">మొదటి విరుపు — మారినది ఒక గడి, తనిఖీ చేసింది మొత్తం board</div>
ఆటగాడు <b>ఒక్క గడిని</b> మార్చాడు. System <b>2n+2 రేఖలని</b> — అంటే ~n² గడులని — తనిఖీ చేసింది.<br><br>
మరియు ఆలోచించండి: (0,0) వద్ద ఒక రాయి పెడితే, <b>వరుస 250 మారే అవకాశమే లేదు</b>. అయినా దాన్ని చూస్తున్నాం.<br><br>
<b>మౌలిక తప్పు:</b> మనం <i>"ఎవరైనా గెలిచారా?"</i> అని అడుగుతున్నాం. సరైన ప్రశ్న: <i>"<b>ఈ ఎత్తు</b> గెలిపించిందా?"</i> — ఎందుకంటే ఆట మిగతా భాగం <b>మారనేలేదు</b>.<br><br>
ఇది ఈ series lo పదేపదే వచ్చిన అదే వాక్యం: <b>ఖర్చు మారిన దాని మీద ఆధారపడాలి</b> (Deep Dive 12 §5, 13 §4, 14 §11).
</div>

---

## 5. Step — ప్రతి రేఖకీ ఒక గణన

Tic-tac-toe lo గెలుపు అంటే **ఒక పూర్తి రేఖ**. కాబట్టి ప్రతి రేఖకీ ఒక **నడుస్తున్న గణన** ఉంచితే చాలు — X కి `+1`, O కి `−1`:

```javascript
class CounterGame {
  constructor(n = 3) {
    this.n = n;
    this.rows = new Int32Array(n);
    this.cols = new Int32Array(n);
    this.diag = 0; this.anti = 0;
  }
  // X → +1, O → −1. ఒక రేఖ మొత్తం |n| అయితే ఆ రేఖ పూర్తయినట్టు.
  place(r, c, p) {
    const v = p === 'X' ? 1 : -1, n = this.n;
    this.rows[r] += v; this.cols[c] += v;
    if (r === c) this.diag += v;
    if (r + c === n - 1) this.anti += v;
    return Math.abs(this.rows[r]) === n || Math.abs(this.cols[c]) === n ||
           Math.abs(this.diag) === n || Math.abs(this.anti) === n;
  }
}
```

<div class="note"><b>ఆ <code>+1 / −1</code> ఒక చక్కని ఉపాయం.</b> ఒక రేఖలో X లు మరియు O లు కలిసి ఉంటే, గణన <b>ఎప్పటికీ ±n కి చేరదు</b> — ఎందుకంటే అవి ఒకదాన్నొకటి కొట్టేస్తాయి. కాబట్టి "ఈ రేఖలో అన్నీ ఒకే ఆటగాడివేనా?" అనే ప్రశ్నకి ఒక్క <b>పూర్ణాంకం</b> సరిపోతుంది — మొత్తం రేఖని చూడాల్సిన అవసరం లేదు.<br><br>
ఇది <b>LeetCode 348</b> యొక్క కచ్చితమైన జవాబు, మరియు interview lo ఇది ఒక మంచి క్షణం.</div>

```
   board   |  ఎత్తులు |     పని     |  ఒక్కో ఎత్తుకి |  సమయం
   --------+----------+-------------+----------------+-------
       3×3 |        9 |          36 |              4 |   8 ms
     20×20 |      400 |       1,600 |              4 |   0 ms
   100×100 |    10000 |      40,000 |              4 |   1 ms
   300×300 |    90000 |    3,60,000 |              4 |   2 ms
```

**నాలుగు operations — నాలుగు సందర్భాల్లోనూ.** మరియు **35,275 ms → 2 ms**.

<div class="note">ఆ 3×3 వరుసలో <b>8 ms</b> చూడండి — 300×300 కి 2 ms కంటే ఎక్కువ. అది JIT వేడెక్కడం (మొదటి iteration), ఆటకి సంబంధించినది కాదు. <b>ఇంత చిన్న సమయాలని నమ్మొద్దు</b> — పని నిలువు వరుస (ఎప్పుడూ 4) మాత్రమే నిజమైన కొలత.</div>

---

# Part 3 — రెండో విరుపు: K వరుసగా

---

## 6. Step — "ఇప్పుడు Gomoku చెయ్యి"

Interviewer అంటాడు: *"Board 15×15, మరియు **వరుసగా 5** ఉంటే గెలుపు."*

సహజమైన ప్రతిస్పందన: *"సులభం — `n` కి బదులు `5` పెడతాను."* మరి ముందు అది **ఏమి చెప్తుందో** చూద్దాం.

---

## 7. రెండో విరుపు — గెలుపు కనిపించలేదు · ఆపై గెలవనివాడు గెలిచాడు

### మొదటి సగం — గెలుపు మిస్ అయింది

X వరుస 7 lo (7,3) నుంచి (7,7) వరకు — **సరిగ్గా ఐదు, వరుసగా**:

```
Gomoku — 15×15 board, వరుసగా 5 ఉంటే గెలుపు

  X (7,3) → …
  X (7,4) → …
  X (7,5) → …
  X (7,6) → …
  X (7,7) → …

వరుస 7: ...XXXXX.......

→ X కి వరుసగా 5 ఉన్నాయి. System ఏమీ చెప్పలేదు.
  ఎందుకంటే rows[7] = 5, మరియు అది |15| కావాలని చూస్తోంది.
```

### రెండో సగం — "సరిచేస్తే" ఇంకా ఘోరం

సహజమైన సవరణ: `=== n` కి బదులు **`>= K`**.

```javascript
place(r, c, p) {
  this.rows[r] += p === 'X' ? 1 : -1;
  return Math.abs(this.rows[r]) >= K;              // ← "సరిచేసినది"
}
```

```
"|గణన| >= 5 అయితే గెలుపు" అని సరిచేస్తే —

  X (7,0) → …   X..............
  X (7,2) → …   X.X............
  X (7,4) → …   X.X.X..........
  X (7,6) → …   X.X.X.X........
  X (7,8) → ✗ "X గెలిచాడు"   X.X.X.X.X......

→ ఏ రెండు X లూ పక్కపక్కన లేవు. అయినా "గెలిచాడు".

ఇంకో సందర్భం — X 8, O 3, కానీ ఏవీ వరుసగా లేవు:
  X (7,13) → ✗ "X గెలిచాడు"   XOXOXXOX.X.X.X.
  → X లు 5 వరుసగా లేవు. rows[7] = 5
```

<div class="box warn">
<div class="lab">రెండో విరుపు — గణన "ఎన్ని" చెప్తుంది, "ఎక్కడ" చెప్పదు</div>
మొదట అది <b>నిజమైన గెలుపుని మిస్</b> చేసింది. ఆపై "సరిచేశాక" అది <b>గెలవనివారిని గెలిపించింది</b> — రెండు రకాలుగా:<br><br>
<b>1 ·</b> <code>X.X.X.X.X</code> — ఐదు X లు, ఏ రెండూ పక్కపక్కన లేవు.<br>
<b>2 ·</b> <code>XOXOXXOX.X.X.X.</code> — 8 X, 3 O; గణన 5, కానీ వరుసగా 2 మాత్రమే.<br><br>
<b>మౌలిక తప్పు:</b> §5 యొక్క ఉపాయం ఒక <b>దాచిన ఊహ</b> మీద నిలబడింది — <i>"గెలుపు అంటే పూర్తి రేఖ"</i>. అప్పుడు "ఎన్ని" మరియు "ఎక్కడ" ఒకటే: n ఉంటే అవి వరుసగా ఉండాల్సిందే.<br><br>
K &lt; n అయిన క్షణం ఆ ఊహ చనిపోతుంది, <b>కానీ code అలాగే ఉంటుంది</b>. అందుకే ఇది ఒక error ఇవ్వదు — <b>అది నిశ్శబ్దంగా తప్పు జవాబులు ఇస్తుంది.</b>
</div>

<div class="note"><b>ఇదే నిజమైన interview ఉచ్చు.</b> §5 యొక్క counter ఉపాయాన్ని చాలా మంది గుర్తుపెట్టుకుని వస్తారు (LeetCode 348). Interviewer "ఇప్పుడు K వరుసగా" అన్నప్పుడు వారు <code>>= K</code> అని మార్చి ముందుకి వెళ్ళిపోతారు.<br><br>
<b>ఒక్క ఉదాహరణ గీస్తే చాలు</b> — <code>X.X.X.X.X</code> — మరియు మీరు ఆ ఉచ్చులో పడలేదని స్పష్టమవుతుంది.</div>

---

## 8. Step — చివరి ఎత్తు గుండా వరుసని లెక్కించడం

§4 lo అడిగిన ప్రశ్నకి తిరిగి వద్దాం: *"**ఈ ఎత్తు** గెలిపించిందా?"*

ఒక రాయి (r,c) వద్ద పెట్టాక, గెలుపు వరుస **ఆ రాయి గుండా వెళ్ళాలి**. కాబట్టి **నాలుగు దిశల్లో, రెండు వైపులా** లెక్కిస్తే చాలు:

<div class="fig">
<div class="cap">చివరి రాయి నుంచి నాలుగు దిశలు</div>
<svg viewBox="0 0 750 236"><text class="t-xs" x="0" y="14">కొత్త రాయి గుండా వెళ్ళని ఏ వరుసా ఈ ఎత్తుతో మారలేదు</text><rect class="n" x="290" y="30" width="46" height="46"/><rect class="n" x="338" y="30" width="46" height="46"/><rect class="n" x="386" y="30" width="46" height="46"/><rect class="n" x="290" y="78" width="46" height="46"/><rect class="n-acc" x="338" y="78" width="46" height="46"/><text class="t-w mid" x="361" y="107">X</text><rect class="n" x="386" y="78" width="46" height="46"/><rect class="n" x="290" y="126" width="46" height="46"/><rect class="n" x="338" y="126" width="46" height="46"/><rect class="n" x="386" y="126" width="46" height="46"/><line class="ln-acc" x1="330" y1="101" x2="250" y2="101" marker-end="url(#aa)"/><line class="ln-acc" x1="392" y1="101" x2="472" y2="101" marker-end="url(#aa)"/><line class="ln-acc" x1="361" y1="70" x2="361" y2="14" marker-end="url(#aa)"/><line class="ln-acc" x1="361" y1="132" x2="361" y2="188" marker-end="url(#aa)"/><line class="ln-acc" x1="332" y1="72" x2="280" y2="34" marker-end="url(#aa)"/><line class="ln-acc" x1="390" y1="130" x2="442" y2="168" marker-end="url(#aa)"/><line class="ln-acc" x1="390" y1="72" x2="442" y2="34" marker-end="url(#aa)"/><line class="ln-acc" x1="332" y1="130" x2="280" y2="168" marker-end="url(#aa)"/><text class="t-sm" x="490" y="60">4 దిశలు × 2 వైపులా</text><text class="t-sm" x="490" y="84">ఒక్కో దిశలో K−1 అడుగులు</text><text class="t-acc" x="490" y="112">→ ఎప్పుడూ ~9 అడుగులు</text><text class="t-sm" x="490" y="140">Board 300×300 అయినా అంతే</text><rect class="n-info" x="0" y="196" width="750" height="36" rx="4"/><text class="t-sm mid" x="375" y="220">8 దిశలు కాదు, <tspan class="t-acc">4</tspan> — ఎందుకంటే ప్రతి దిశనీ రెండు వైపులా ఒకేసారి లెక్కిస్తున్నాం.</text></svg>
</div>

```javascript
const DIRS = [[0,1],[1,0],[1,1],[1,-1]];     // అడ్డం · నిలువు · రెండు వికర్ణాలు

class KInARow {
  constructor(k) { this.k = k; }
  // చివరి ఎత్తు (r,c) గుండా మాత్రమే చూస్తాం — అదే మారిన ఏకైక విషయం
  wins(board, r, c, p) {
    for (const [dr, dc] of DIRS) {
      let run = 1;                            // ఇప్పుడే పెట్టిన రాయి
      for (const sign of [1, -1]) {           // రెండు వైపులా
        let rr = r + dr*sign, cc = c + dc*sign;
        while (board.at(rr, cc) === p) {
          if (++run >= this.k) return true;
          rr += dr*sign; cc += dc*sign;
        }
      }
      if (run >= this.k) return true;
    }
    return false;
  }
}
```

### ముందు: ఇది నిజంగా సరైనదేనా?

ఇక్కడ చాలా సరిహద్దులు ఉన్నాయి — board అంచులు, రెండు వైపులా కలిపే వరుసలు, K = N సందర్భం. కాబట్టి **fuzz test**: యాదృచ్ఛిక ఆటలు ఆడి, ప్రతి ఎత్తులోనూ ఒక **brute-force scan** తో పోల్చడం.

```javascript
// brute force: మొత్తం board ని scan చేసి k వరుసలు వెతకడం
function bruteWins(board, n, k, p) {
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      for (const [dr, dc] of DIRS) {
        let ok = true;
        for (let i = 0; i < k; i++) {
          const rr = r + dr*i, cc = c + dc*i;
          if (rr < 0 || rr >= n || cc < 0 || cc >= n || board[rr][cc] !== p)
            { ok = false; break; }
        }
        if (ok) return true;
      }
  return false;
}
```

```
720 ఆటలు · 32,287 ఎత్తులు · 6 వేర్వేరు (n,k) జతలు
run-checker = brute force? అవును ✓
```

ఇప్పుడు వేగం:

```
ఒక పూర్తి board (n² ఎత్తులు) · k = 5

   board   |  ఎత్తులు |  brute scan  |  run check |  ఒక్కో ఎత్తుకి
   --------+----------+--------------+------------+----------------
     10×10 |      100 |         3 ms |       0 ms | 10.4 అడుగులు
     50×50 |     2500 |        13 ms |       1 ms |  9.4 అడుగులు
   150×150 |    22500 |       237 ms |       1 ms |  9.1 అడుగులు
   300×300 |    90000 |      1911 ms |       7 ms |  9.1 అడుగులు
```

<div class="note">Brute scan వరుస runs మధ్య ఊగుతుంది — 1–3 ms, 8–13 ms, 235–237 ms, 1,885–1,911 ms. Run check వరుస 0–7 ms. ఇక్కడా ఒక్కో సంఖ్యని కాదు, <b>రెండు వరుసల ఆకారాన్ని</b> చూడండి: ఒకటి board తో పాటు పెరుగుతోంది, రెండోది పెరగట్లేదు. "అడుగులు" నిలువు వరుస మాత్రమే స్థిరమైన కొలత.</div>

**~9 అడుగులు, board పరిమాణంతో సంబంధం లేకుండా.** మరియు ఇది **K = N కి కూడా సరైనది** — tic-tac-toe కి కూడా ఇదే వాడొచ్చు.

<div class="box">
<div class="lab">ఒక పరిష్కారం, రెండు ఆటలు — మరియు అదే ముఖ్యం</div>
§5 యొక్క counters <b>వేగవంతమైనవి</b> (4 అడుగులు vs 9), కానీ అవి <b>ఒక్క ఆటకే</b> పనిచేస్తాయి.<br><br>
§8 యొక్క run check కొంచెం ఖరీదు, కానీ అది <b>tic-tac-toe, Gomoku, Connect-4 — అన్నిటికీ</b> పనిచేస్తుంది.<br><br>
<b>Interview lo ఈ ఎంపికని బయటపెట్టి చెప్పండి:</b> <i>"The counter trick is O(1) but assumes k equals n. I'd use directional run counting instead — it's O(k) but it generalises, and k is small."</i> ఇది మీరు <b>ఒక trade-off ని తెలిసి తీసుకుంటున్నారని</b> చూపిస్తుంది, ఒక ఉపాయాన్ని గుర్తుపెట్టుకున్నారని కాదు.
</div>

---

# Part 4 — మూడో విరుపు: ఆట స్థితి లేదు

---

## 9. Step — నియమాలు ఎక్కడ?

§3 యొక్క `play` ని మళ్ళీ చూడండి:

```javascript
play(r, c) {
  this.board[r][c] = this.turn;               // ← ఎలాంటి తనిఖీ లేదు
  const won = this.checkWin(this.turn);
  this.turn = this.turn === 'X' ? 'O' : 'X';
  return won ? `${this.board[r][c]} గెలిచాడు` : null;
}
```

Win check మీద మనం చాలా కష్టపడ్డాం. కానీ దానికి **ముందు** ఏమి ఉండాలి? — ఆ గడి ఖాళీయేనా? ఆట ఇంకా నడుస్తోందా? ఎవరి వంతు?

**ఒక్కటీ లేదు.** నడిపి చూద్దాం.

---

## 10. మూడో విరుపు — ఒకరి ఎత్తు తుడిచిపెట్టుకుపోయింది

```
1 · ఆక్రమించిన గడి మీద ఆడితే
  X (0,0) తర్వాత:
  X . .
  . . .
  . . .
  O కూడా (0,0):
  O . .
  . . .
  . . .
  → X ఎత్తు తుడిచిపెట్టుకుపోయింది.

2 · గెలిచాక కూడా ఆట కొనసాగుతుంది
   X గెలిచాడు
  గెలిచాక O (2,2) ఆడితే : అనుమతించింది ✗
  ఇప్పుడు board:
  X X X
  O O .
  . . O

3 · సమం (draw) — ఎవరూ గెలవకుండా board నిండితే
  (0,0) → null
  ... (తొమ్మిదీ null)
  board నిండింది. ఆట ఏమి చెప్పింది? — ఏమీ లేదు ✗
  X O X
  X O O
  O X X
```

<div class="box warn">
<div class="lab">మూడో విరుపు — ఆటకి "ఆట" అనేది తెలియదు</div>
<b>1 · ఎత్తు తుడిచేయడం.</b> O గడి (0,0) మీద ఆడింది, మరియు X యొక్క రాయి <b>మాయమైంది</b>. Board lo ఇప్పుడు తొమ్మిది గడులు ఉన్నాయి కానీ ఒక్క ఎత్తే.<br><br>
<b>2 · ముగిసిన ఆట ముగియలేదు.</b> X గెలిచాక కూడా O ఆడగలదు. గెలుపు ఒక <i>సందేశం</i> మాత్రమే అయింది, ఒక <i>స్థితి</i> కాదు.<br><br>
<b>3 · సమం అనేది లేదు.</b> Board పూర్తిగా నిండింది, ఎవరూ గెలవలేదు, మరియు ఆట <b>తొమ్మిదిసార్లూ <code>null</code></b> చెప్పింది. UI ఎప్పటికీ ఎదురుచూస్తూనే ఉంటుంది.<br><br>
<b>మౌలిక తప్పు:</b> <code>play()</code> ఒక <b>చర్య</b> మాత్రమే అయింది; అది ఒక <b>పరివర్తన</b> కాలేదు. ఒక పరివర్తనకి <i>ముందు షరతులు</i> (ఎవరి వంతు, గడి ఖాళీయేనా, ఆట నడుస్తోందా) మరియు <i>ఒక ఫలితం</i> (గెలుపు, సమం, లేదా తర్వాతి వంతు) ఉంటాయి.
</div>

<div class="note">Deep Dive 11 §10 lo ఇదే ఆకారం చూశాం — order ఒకేసారి cancelled మరియు delivered కాగలిగింది, ఎందుకంటే దశల <b>మధ్య నియమాలు</b> లేవు. ఇక్కడ ఆట ఒకేసారి ముగిసినది మరియు నడుస్తున్నది.</div>

---

## 11. Step — `Game` ఒక స్థితి యంత్రం

```javascript
class Game {
  #history = [];
  constructor({ rows, cols, players = ['X', 'O'], win, moveRule }) {
    this.board = new Board(rows, cols);
    this.players = players;
    this.win = win;
    this.moveRule = moveRule;
    this.turnIndex = 0;
    this.result = null;                       // null · {winner} · {draw:true}
  }
  get turn() { return this.players[this.turnIndex]; }
  get isOver() { return this.result !== null; }

  play(move, by = this.turn) {
    if (this.isOver) return { ok: false, reason: 'GAME_OVER', result: this.result };
    if (by !== this.turn)
      return { ok: false, reason: `NOT_YOUR_TURN: ${this.turn}` };

    const spot = this.moveRule.resolve(this.board, move);
    if (!spot.ok) return spot;

    const { r, c } = spot;
    this.board.set(r, c, by);
    this.#history.push({ r, c, by });

    if (this.win.wins(this.board, r, c, by)) {
      this.result = { winner: by, at: { r, c }, moves: this.#history.length };
      return { ok: true, r, c, result: this.result };
    }
    if (this.board.isFull) {
      this.result = { draw: true, moves: this.#history.length };
      return { ok: true, r, c, result: this.result };
    }
    this.turnIndex = (this.turnIndex + 1) % this.players.length;
    return { ok: true, r, c, next: this.turn };
  }
}
```

నాలుగు వివరాలు:

- **`result` ఒక వస్తువు**, ఒక boolean కాదు. `null` = నడుస్తోంది, `{winner}` = గెలుపు, `{draw:true}` = సమం. **మూడు స్థితులు, మూడు రూపాలు.**
- **ప్రతి తనిఖీ ఒక ముందు షరతు** — మరియు అవి **క్రమంలో** ఉన్నాయి: ఆట ముగిసిందా → నా వంతా → ఎత్తు చెల్లుతుందా.
- **గెలుపు తర్వాత వంతు మారదు.** అది సూక్ష్మమైనది కానీ సరైనది — ఆట ముగిసింది, తర్వాతి వంతు అనేది లేదు.
- **`players` ఒక array**, రెండు స్థిర విలువలు కాదు. ముగ్గురితో ఆడాలంటే `['X','O','Z']` — code lo ఒక్క మార్పూ లేదు.

---

# Part 5 — ఒక engine, మూడు ఆటలు

---

## 12. Step — ఎత్తు నియమాన్ని బయటికి తీయడం · గురుత్వాకర్షణ

`play` lo `this.moveRule.resolve(...)` గమనించారా? — **ఒక ఎత్తు ఎక్కడ పడుతుందో** అనేది `Game` కి తెలియదు.

Tic-tac-toe lo నువ్వు చెప్పిన గడిలోనే పడుతుంది:

```javascript
class PlaceAnywhere {                          // Tic-tac-toe, Gomoku
  resolve(board, move) {
    const { r, c } = move;
    if (!board.inside(r, c)) return { ok: false, reason: `OFF_BOARD: ${r},${c}` };
    if (board.at(r, c) !== null)
      return { ok: false, reason: `OCCUPIED: ${r},${c}` };
    return { ok: true, r, c };
  }
}
```

Connect-4 lo నువ్వు **నిలువు వరుస** మాత్రమే చెప్తావు; రాయి **కిందికి పడుతుంది**:

```javascript
class DropInColumn {                           // Connect-4 — గురుత్వాకర్షణ
  resolve(board, move) {
    const { c } = move;
    if (c < 0 || c >= board.cols)
      return { ok: false, reason: `OFF_BOARD: col ${c}` };
    for (let r = board.rows - 1; r >= 0; r--)  // కింది నుంచి పైకి
      if (board.at(r, c) === null) return { ok: true, r, c };
    return { ok: false, reason: `COLUMN_FULL: ${c}` };
  }
}
```

<div class="box">
<div class="lab">ఇప్పుడు మూడు ఆటలూ మూడు పంక్తులు</div>
<code>const ticTacToe = () => new Game({ rows: 3, cols: 3, win: new KInARow(3), moveRule: new PlaceAnywhere() });</code><br>
<code>const gomoku&nbsp;&nbsp;&nbsp; = () => new Game({ rows: 15, cols: 15, win: new KInARow(5), moveRule: new PlaceAnywhere() });</code><br>
<code>const connect4&nbsp;&nbsp; = () => new Game({ rows: 6, cols: 7, win: new KInARow(4), moveRule: new DropInColumn() });</code><br><br>
<b><code>Game</code> class lo ఒక్క <code>if</code> కూడా లేదు</b> — "ఇది Connect-4 అయితే..." అని ఎక్కడా రాయలేదు. ఆట రకం అనేది <b>ఒక configuration</b>, ఒక శాఖ కాదు.<br><br>
మరియు ఇక్కడ <b>రెండు వేర్వేరు విషయాలని</b> వేరు చేశాం: <i>ఎత్తు ఎక్కడ పడుతుంది</i> (<code>moveRule</code>) మరియు <i>గెలుపు అంటే ఏమిటి</i> (<code>win</code>). వాటిని కలిపితే 3×3 దాటి ఏమీ చేయలేం.
</div>

---

## 13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

<div class="fig">
<div class="cap">నిర్మాణం · Game కి ఆట ఏదో తెలియదు</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">మూడు ముక్కలు — ఏ ఆట అనేది వాటిని కలిపే విధానం</text><rect class="n-acc" x="255" y="26" width="240" height="48" rx="4"/><text class="t-w mid" x="375" y="46">Game</text><text class="t-w-sm mid" x="375" y="64">turn · result · play()</text><line class="ln-acc" x1="300" y1="78" x2="140" y2="106" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="78" x2="375" y2="106" marker-end="url(#aa)"/><line class="ln-acc" x1="450" y1="78" x2="610" y2="106" marker-end="url(#aa)"/><rect class="n-info" x="0" y="110" width="240" height="56" rx="4"/><text class="t mid" x="120" y="132">Board</text><text class="t-sm mid" x="120" y="152">rows × cols · at · set · isFull</text><rect class="n-good" x="258" y="110" width="234" height="56" rx="4"/><text class="t mid" x="375" y="132">moveRule</text><text class="t-sm mid" x="375" y="152">ఎత్తు <tspan class="t-acc">ఎక్కడ</tspan> పడుతుంది</text><rect class="n-soft" x="510" y="110" width="240" height="56" rx="4"/><text class="t mid" x="630" y="132">win</text><text class="t-sm mid" x="630" y="152">గెలుపు <tspan class="t-acc">అంటే ఏమిటి</tspan></text><rect class="n-dark" x="0" y="184" width="750" height="66" rx="4"/><text class="t-w-sm mid" x="375" y="208">Tic-tac-toe = 3×3 + PlaceAnywhere + KInARow(3)</text><text class="t-w-sm mid" x="375" y="228">Gomoku = 15×15 + PlaceAnywhere + KInARow(5)</text><text class="t-w-sm mid" x="375" y="246">Connect-4 = 6×7 + <tspan class="t-acc">DropInColumn</tspan> + KInARow(4)</text></svg>
</div>

```javascript
'use strict';
const DIRS = [[0,1],[1,0],[1,1],[1,-1]];      // అడ్డం · నిలువు · రెండు వికర్ణాలు

class Board {
  constructor(rows, cols) {
    Object.assign(this, { rows, cols, filled: 0 });
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  }
  inside(r, c) { return r >= 0 && r < this.rows && c >= 0 && c < this.cols; }
  at(r, c) { return this.inside(r, c) ? this.grid[r][c] : undefined; }
  set(r, c, v) { if (this.grid[r][c] === null) this.filled++; this.grid[r][c] = v; }
  get isFull() { return this.filled === this.rows * this.cols; }
  render() {
    return this.grid.map(row => row.map(x => x ?? '.').join(' ')).join('\n');
  }
}

class KInARow {
  constructor(k) { this.k = k; }
  // చివరి ఎత్తు (r,c) గుండా మాత్రమే చూస్తాం — అదే మారిన ఏకైక విషయం
  wins(board, r, c, p) {
    for (const [dr, dc] of DIRS) {
      let run = 1;
      for (const sign of [1, -1]) {
        let rr = r + dr*sign, cc = c + dc*sign;
        while (board.at(rr, cc) === p) {
          if (++run >= this.k) return true;
          rr += dr*sign; cc += dc*sign;
        }
      }
      if (run >= this.k) return true;
    }
    return false;
  }
}

class PlaceAnywhere {                          // Tic-tac-toe, Gomoku
  resolve(board, move) {
    const { r, c } = move;
    if (!board.inside(r, c)) return { ok: false, reason: `OFF_BOARD: ${r},${c}` };
    if (board.at(r, c) !== null)
      return { ok: false, reason: `OCCUPIED: ${r},${c}` };
    return { ok: true, r, c };
  }
}
class DropInColumn {                           // Connect-4 — గురుత్వాకర్షణ
  resolve(board, move) {
    const { c } = move;
    if (c < 0 || c >= board.cols)
      return { ok: false, reason: `OFF_BOARD: col ${c}` };
    for (let r = board.rows - 1; r >= 0; r--)  // కింది నుంచి పైకి
      if (board.at(r, c) === null) return { ok: true, r, c };
    return { ok: false, reason: `COLUMN_FULL: ${c}` };
  }
}

class Game {
  #history = [];
  constructor({ rows, cols, players = ['X', 'O'], win, moveRule }) {
    this.board = new Board(rows, cols);
    this.players = players;
    this.win = win;
    this.moveRule = moveRule;
    this.turnIndex = 0;
    this.result = null;                        // null · {winner} · {draw:true}
  }
  get turn() { return this.players[this.turnIndex]; }
  get isOver() { return this.result !== null; }

  play(move, by = this.turn) {
    if (this.isOver)
      return { ok: false, reason: 'GAME_OVER', result: this.result };
    if (by !== this.turn)
      return { ok: false, reason: `NOT_YOUR_TURN: ${this.turn}` };

    const spot = this.moveRule.resolve(this.board, move);
    if (!spot.ok) return spot;

    const { r, c } = spot;
    this.board.set(r, c, by);
    this.#history.push({ r, c, by });

    if (this.win.wins(this.board, r, c, by)) {
      this.result = { winner: by, at: { r, c }, moves: this.#history.length };
      return { ok: true, r, c, result: this.result };
    }
    if (this.board.isFull) {
      this.result = { draw: true, moves: this.#history.length };
      return { ok: true, r, c, result: this.result };
    }
    this.turnIndex = (this.turnIndex + 1) % this.players.length;
    return { ok: true, r, c, next: this.turn };
  }
  get history() { return [...this.#history]; }
}

const ticTacToe = () => new Game({ rows: 3, cols: 3,
  win: new KInARow(3), moveRule: new PlaceAnywhere() });
const gomoku = () => new Game({ rows: 15, cols: 15,
  win: new KInARow(5), moveRule: new PlaceAnywhere() });
const connect4 = () => new Game({ rows: 6, cols: 7,
  win: new KInARow(4), moveRule: new DropInColumn() });
```

```
--- Tic-tac-toe (3×3, k=3) ---
  (0,0) → O
  (1,1) → X
  (0,1) → O
  (2,2) → X
  (0,2) {"winner":"X","at":{"r":0,"c":2},"moves":5}
X X X
. O .
. . O

--- తిరస్కరణలు ---
  అదే గడి        : { ok: false, reason: 'OCCUPIED: 0,0' }
  board బయట      : { ok: false, reason: 'OFF_BOARD: 9,9' }
  తప్పు వంతు      : { ok: false, reason: 'NOT_YOUR_TURN: O' }
  ఆట ముగిశాక     : { ok: false, reason: 'GAME_OVER', result: { winner: 'X', at: { r: 0, c: 2 }, moves: 5 } }

--- సమం (draw) ---
  { draw: true, moves: 9 }
X O X
X O O
O X X

--- Gomoku (15×15, k=5) — అదే code ---
  X (7,3) → …
  X (7,4) → …
  X (7,5) → …
  X (7,6) → …
  X (7,7) → {"winner":"X","at":{"r":7,"c":7},"moves":9}

--- Connect-4 (6×7, k=4, గురుత్వాకర్షణ) — అదే code ---
  column 3 → row 5
  column 4 → row 5
  column 3 → row 4
  column 4 → row 4
  column 3 → row 3
  column 4 → row 3
  column 3 → row 2  {"winner":"X","at":{"r":2,"c":3},"moves":7}
. . . . . . .
. . . . . . .
. . . X . . .
. . . X O . .
. . . X O . .
. . . X O . .

--- చెదురుమదురు X లు Gomoku lo (§7 విరుపు) ---
  X (7,0) → కాదు ✓
  X (7,2) → కాదు ✓
  X (7,4) → కాదు ✓
  X (7,6) → కాదు ✓
  X (7,8) → కాదు ✓
```

### మరియు fuzz test

```
600 ఆటలు · 25,791 చెల్లుబాటయ్యే ఎత్తులు · 4 ఆట రకాలు
engine = brute force, మరియు ప్రతి ఆటా ముగిసిందా? అవును ✓
```

రెండు విషయాలు పరీక్షించాం: (1) engine యొక్క గెలుపు తీర్పు **brute-force scan** తో సరిపోతుందా, మరియు (2) **ప్రతి ఆటా ఒక ఫలితంతో ముగుస్తుందా** — §10 యొక్క "సమం అనేది లేదు" సమస్య తిరిగి రాకుండా.

### ఈ output ని పంక్తి పంక్తిగా చదువుదాం

**`(0,0) → O`** — ఎత్తు విజయవంతం, **తర్వాతి వంతు** ఎవరిదో చెప్తోంది. UI కి అదే కావాలి.

**నాలుగు తిరస్కరణలూ వేర్వేరు కారణాలతో** — `OCCUPIED`, `OFF_BOARD`, `NOT_YOUR_TURN`, `GAME_OVER`. §10 lo నాలుగూ **నిశ్శబ్దంగా అనుమతించబడ్డాయి**.

**`{ draw: true, moves: 9 }`** — board నిండింది, ఎవరూ గెలవలేదు, మరియు ఆట **అలా చెప్పింది**. §10 lo ఇది తొమ్మిది `null` లు.

**Connect-4 lo `column 3 → row 5`** — నేను నిలువు వరుస 3 చెప్పాను; engine **row 5** అని జవాబిచ్చింది. రాయి ఎక్కడ పడిందో అదే. ఆపై 4, 3, 2 — పైకి పేరుకుంటూ, నాలుగోది గెలిపించింది.

**`X (7,8) → కాదు ✓`** — §7 యొక్క తప్పుడు గెలుపు ఇప్పుడు లేదు.

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | Board + `checkWin` | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | రేఖల గణనలు | ఒక ఎత్తుకి 1,80,600 తనిఖీలు |
| §7 (విరుపు) | `KInARow` — దిశల వరుస | గణనలు K &lt; N కి తప్పు జవాబులు |
| §8 | Fuzz vs brute force | సరిహద్దులు చాలా, tests చాలవు |
| §10 (విరుపు) | `result`, ముందు షరతులు | ఎత్తు తుడిచేయడం, ముగియని ఆట |
| §11 | `players` ఒక array | ముగ్గురితో ఆడటం ఉచితం |
| §12 | `moveRule` విడిగా | Connect-4 lo రాయి కిందికి పడుతుంది |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">3×3 ని వేగంగా దాటండి — నిజమైన సమయం సాధారణీకరణకే</text><rect class="n-acc" x="0" y="26" width="90" height="38" rx="3"/><text class="t-w mid" x="45" y="50">5 నిమి</text><text class="t-sm" x="106" y="50"><tspan class="t-acc">Clarify</tspan> — N×N? K వరుసగా? గురుత్వాకర్షణ?</text><rect class="n-acc" x="0" y="70" width="110" height="38" rx="3"/><text class="t-w mid" x="55" y="94">7 నిమి</text><text class="t-sm" x="126" y="94">3×3 · scan ఎందుకు సరిపోదు</text><rect class="n-acc" x="0" y="114" width="200" height="38" rx="3"/><text class="t-w mid" x="100" y="138">13 నిమి — KInARow</text><text class="t-sm" x="216" y="138">counters · <tspan class="t-acc">అవి ఎక్కడ విరుగుతాయో</tspan> · run check</text><rect class="n-good" x="0" y="158" width="160" height="38" rx="3"/><text class="t mid" x="80" y="182">11 నిమి — Game</text><text class="t-sm" x="216" y="182">result · ముందు షరతులు · draw</text><rect class="n-soft" x="0" y="202" width="140" height="38" rx="3"/><text class="t mid" x="70" y="226">9 నిమి</text><text class="t-sm" x="216" y="226">moveRule · Connect-4 · AI · undo</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **"ఈ ఎత్తు గెలిపించిందా?"** (§4) — "ఎవరైనా గెలిచారా?" కాదు. ఇదే మొత్తం ఆలోచన.
2. **Counter ఉపాయం, మరియు అది ఎక్కడ విరుగుతుందో** (§7) — **ముందు అది చెప్పి, ఆపై దాని హద్దు చెప్పండి**. `X.X.X.X.X` ఉదాహరణ గీయండి.
3. **Run check O(k), board పరిమాణంతో సంబంధం లేదు** (§8) — మరియు అది K = N కి కూడా పనిచేస్తుంది.
4. **`result` ఒక వస్తువు; draw ఒక ఫలితం** (§11) — చాలా మంది draw ని పూర్తిగా మర్చిపోతారు.
5. **`moveRule` విడిగా** (§12) — "Connect-4 is the same engine with a different move rule." ఇది ఒక వాక్యం, మరియు అది interview ని ముగిస్తుంది.

### ఏమి వదిలేయాలి

- **Counter class ని పూర్తిగా రాయొద్దు** — నాలుగు పంక్తులు చెప్పి, హద్దు చెప్పి, run check కి వెళ్ళండి.
- **`bruteWins` రాయొద్దు** — "I'd fuzz against a brute-force scan" అని చెప్తే చాలు.
- **AI (minimax)** — అడిగితేనే (§16).
- **UI, rendering** — `board.render()` ఒక పంక్తి, అంతే.

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"Three questions first. Is the board fixed at three by three or N by N? Does winning need a full line, or K in a row? And is there gravity, like Connect-4?<br><br>
I ask the second one because it changes the algorithm completely, and it's easy to miss since they're the same thing on a three by three board.<br><br>
The naive version checks every row, column and diagonal after each move. That's fine at three by three and quadratic per move as the board grows — I measured it, and a three-hundred by three-hundred game did about a hundred and eighty thousand cell checks per move and took thirty-five seconds. The tell is that the player changed one cell and we re-examined the whole board.<br><br>
If winning means a full line, there's a nice trick: keep a running count per row, per column and per diagonal, plus one for the anti-diagonal. X adds one, O subtracts one. A line is won when the absolute value hits N, because mixed marks cancel. That's four operations per move regardless of board size, and it's the standard answer to LeetCode 348.<br><br>
But I'd flag straight away where it breaks. It quietly assumes K equals N. For Gomoku — fifteen by fifteen, five in a row — five consecutive X's give a count of five, and the check is looking for fifteen, so it misses the win entirely. And the obvious fix, comparing against K instead, is worse: five X's scattered across a row with gaps also sums to five, so it declares a win where no two stones are adjacent. The count tells you how many, not where.<br><br>
So I'd use directional run counting instead. After placing a stone, walk outward from it in four directions — horizontal, vertical, and both diagonals — counting matching stones on both sides. If any run reaches K, that's a win. It's O(K) per move rather than O(1), but K is small, it's independent of board size, and it's correct for K equals N too, so one implementation covers every variant. I measured about nine steps per move at every board size, versus nearly two seconds of brute scanning at three hundred by three hundred. And I'd fuzz it against a brute-force scan, because the edge cases — board borders, runs that span both sides of the new stone — are easy to get subtly wrong.<br><br>
The part people skip is the game state itself. A play method that just writes to the board and checks for a win lets you play on an occupied cell and silently erase someone's move, lets play continue after a win, and never detects a draw — a full board with no winner just returns null nine times and the UI waits forever. So play is a transition with preconditions: is the game over, is it your turn, is the move legal — and it produces a result: a winner, a draw, or whose turn is next.<br><br>
Last, I'd pull out where a move lands as its own rule. Tic-tac-toe places where you point; Connect-4 drops to the lowest empty row in the column. With that separated, Connect-4 is the same engine with a different move rule and K of four — no conditionals inside the game class at all."
</div>

---

## 16. Follow-ups — AI, undo, ఆన్‌లైన్ ఆట

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "ముగ్గురు ఆటగాళ్ళు" | `players: ['X','O','Z']` | **0** |
| "దీర్ఘచతురస్ర board (6×7)" | `Board` ఇప్పటికే rows × cols | **0** |
| "Undo" | `#history` ఇప్పటికే ఉంది — చివరి ఎత్తు తీసి, `result` ని `null` చేయడం | **+1 method** |
| "ఆట స్థితిని save/load" | `#history` ని serialize చేసి, మళ్ళీ ఆడించడం | **+2 methods** |
| "ఎవరు గెలుస్తారో ముందే చెప్పగలమా (3×3)?" | 3×3 ఆట **పరిష్కరించబడినది** — సరిగ్గా ఆడితే ఎప్పుడూ draw | — |
| "AI ఎదురుగా ఆడాలి" | కింద చూడండి | కొత్త layer |
| "ఆన్‌లైన్ — ఇద్దరు వేర్వేరు చోట్ల" | కింద చూడండి | Server layer |

### AI — ఒక కొత్త layer, ఒక కొత్త concept కాదు

> *"3×3 కి **minimax** సరిపోతుంది — ఆటల చెట్టు చిన్నది (9! కంటే తక్కువ). ముఖ్యమైన విషయం: minimax కి **ఒక `Game` నకలు** కావాలి, ఎందుకంటే అది ఎత్తులు వేసి చూసి వెనక్కి తీయాలి.*
>
> *నా `#history` ఉంది కాబట్టి **undo** సులభం — అదే minimax కి కావాల్సినది. కాబట్టి ఇది ఒక కొత్త layer, కొత్త design కాదు.*
>
> ***Gomoku కి minimax పనిచేయదు** — 15×15 lo శాఖల సంఖ్య చాలా ఎక్కువ. అక్కడ **alpha-beta pruning + ఒక heuristic** (బహిరంగ మూడు, బహిరంగ నాలుగు వంటి నమూనాలకి score) అవసరం. ఆ తేడాని చెప్పడం — మీరు సమస్య పరిమాణాన్ని గుర్తిస్తున్నారని చూపిస్తుంది."*

### ఆన్‌లైన్ ఆట

> *"ఇద్దరు వేర్వేరు చోట్ల ఆడితే, **నిజం ఎక్కడ ఉంది** అనేది ప్రశ్న. జవాబు: **server lo**. Client ఒక ఎత్తు పంపుతుంది, server `play()` పిలుస్తుంది, ఫలితాన్ని ఇద్దరికీ పంపుతుంది.*
>
> ***నా `play()` ఇప్పటికే దీనికి సిద్ధంగా ఉంది** — ఎందుకంటే అది `by` అనే parameter తీసుకుంటుంది మరియు `NOT_YOUR_TURN` తిరస్కరిస్తుంది. Client ని నమ్మాల్సిన అవసరం లేదు.*
>
> *మరియు నవీకరణలు పంపడానికి — Deep Dive 07 యొక్క event bus, లేదా WebSocket. <b>0 కొత్త concepts.</b>"*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **"ఏమి మారింది?" అని అడగడం** | చివరి ఎత్తు గుండా మాత్రమే (§8) | Deep Dive 12 §5, 13 §4, 14 §11 |
| **వేగవంతమైన ఉపాయాల దాచిన ఊహలు** | Counters K = N అనుకున్నాయి (§7) | ప్రతి "తెలివైన" optimisation |
| **తప్పు జవాబు error కంటే ప్రమాదకరం** | `X.X.X.X.X` గెలిచాడు (§7) | Deep Dive 11 §8, 13 §5 |
| **చర్య కాదు — పరివర్తన** | `play()` ముందు షరతులు (§11) | Deep Dive 11 §11 · ప్రతి state machine |
| **మారేదాన్ని బయట పెట్టు** | `moveRule`, `win` (§12) | Deep Dive 01, 03, 05, 06, 10 |
| **ముగింపు ఒక ఫలితం** | `{draw:true}` (§11) | Jobs, transactions, workflows |
| **Fuzz vs brute force** | 32,287 + 25,791 ఎత్తులు (§8, §13) | Deep Dive 14 · ఏ optimisation ఐనా |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — ఈ problem ఎందుకు మోసపూరితమైనది</div>
Tic-tac-toe ని చాలా మంది "వేడెక్కించే ప్రశ్న" అనుకుంటారు, మరియు <b>అదే ప్రమాదం</b>.<br><br>
3×3 board మీద <b>ప్రతి పద్ధతీ పనిచేస్తుంది</b>. కాబట్టి interviewer మీ మొదటి పరిష్కారాన్ని చూసి ఏమీ తెలుసుకోలేడు. అతను తెలుసుకునేది — <b>మీరు దాన్ని ఎంత దూరం తీసుకెళ్ళగలరో</b>.<br><br>
మరియు ఈ doc lo చూసినట్టు, ఆ దారిలో ప్రతి అడుగులోనూ ఒక <b>నిశ్శబ్ద తప్పు</b> ఉంది: counters K &lt; N కి తప్పు, threshold సవరణ మరింత తప్పు, మరియు win check మీద కష్టపడుతూ <b>ఆట నియమాలనే</b> మర్చిపోవడం.<br><br>
<b>"సులభమైన" problem అంటే — తప్పులు కనిపించని problem.</b>
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b> · <b>14 Text Editor</b> · <b>15 Library</b> · <b>16 Tic-Tac-Toe</b>.<br><br>
<b>Deep Dive 09 (Chess)</b> దీని పెద్ద సోదరుడు — అక్కడ ఎత్తు నియమాలు ముక్కని బట్టి మారతాయి, మరియు "చెల్లుబాటయ్యే ఎత్తు" అనేది మొత్తం board మీద ఆధారపడుతుంది.
</div>

---

_Tic-Tac-Toe → Board Game Engine — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output నిజంగా `node` lo run చేసి తీసినదే ✅_
