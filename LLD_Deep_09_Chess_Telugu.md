<!-- style: editorial -->
<!-- footer: Chess · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
<marker id="hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">09</div>
<div class="kicker">Deep Dive 09 · Polymorphism యొక్క అత్యుత్తమ పరీక్ష</div>
<div class="rule"></div>
<div class="cover-title">Design<br>Chess</div>
<div class="lede">Microsoft · Salesforce · Adobe · Amazon · Wells Fargo — ఇది ఒక ఆట design చేయడం గురించి కాదు; ఇది <b>నియమాలు ఎక్కడ ఉండాలి</b> అనే దాని గురించి.</div>
<div class="sub">ఆరు రకాల పావులు — ఇది polymorphism కి ఒక పాఠ్యపుస్తక ఉదాహరణ. కానీ నిజమైన కష్టం అక్కడ లేదు. ఇక్కడ మూడో విరుపు lo ఒక bishop కి <b>తొమ్మిది</b> కదలికలు ఉన్నాయి, మరియు వాటిలో <b>సున్నా</b> చెల్లుబాటు అవుతాయి — పావు నియమాల్లో ఏ తప్పూ లేకుండా.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 09</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడ మనం **నిజంగా ఆడగలిగే** ఒక chess engine కడతాం — Fool's mate, castling, en passant, promotion, stalemate — అన్నీ నిజంగా నడిపి చూపిస్తాను.

<div class="box">
<div class="lab">Chess ని interview lo ఎందుకు అడుగుతారు</div>
చాలా మంది అనుకుంటారు: "ఆరు పావులు, ఆరు subclasses — polymorphism, అయిపోయింది." అది <b>మొదటి పది నిమిషాలు</b> మాత్రమే, మరియు దాన్ని అందరూ చేస్తారు.<br><br>
అసలు పరీక్ష తర్వాత వస్తుంది: <b>ఒక కదలిక "చెల్లుతుంది" అని ఎవరు నిర్ణయిస్తారు?</b> పావునా? Board నా? Game నా? ఎందుకంటే ఒక bishop తన నియమాల ప్రకారం కదలగలదు, కానీ ఆ కదలిక <b>మీ రాజుని చంపిస్తుంది</b> — అప్పుడు అది చట్టవిరుద్ధం.<br><br>
అంటే "చెల్లుబాటు" అనేది పావుకి తెలియని విషయం. ఆ ఒక్క గుర్తింపే ఈ problem యొక్క కేంద్రం, మరియు §8 lo దాన్ని కళ్ళతో చూద్దాం.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. Chess lo నిజమైన కష్టం ఎక్కడ ఉంది
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: పావుకి board కనిపించదు**

3. Step — ఒక Piece class, ఒక switch
4. **మొదటి విరుపు** — `canMove(from, to)` తప్పు ప్రశ్న అడుగుతోంది
5. Step — ప్రతి పావూ తన కదలికలని *తయారు* చేయడం

**Part 3 — రెండో విరుపు: చెల్లుబాటు అనేది పావుది కాదు**

6. **రెండో విరుపు** — తొమ్మిది కదలికలు, సున్నా చెల్లుబాటు
7. Step — చేసి చూడటం, ఆపై వెనక్కి తీయడం
8. `#simulate` ఎందుకు ఇంత జాగ్రత్తగా ఉండాలి

**Part 4 — మూడో విరుపు: నియమాలకి చరిత్ర కావాలి**

9. **మూడో విరుపు** — castling మరియు en passant board lo లేవు
10. Step — Castling · మూడు షరతులు
11. Step — En passant · ఒక్క కదలిక మాత్రమే గుర్తుండాలి
12. Step — Promotion · ఒక పావు వేరే పావుగా మారడం

**Part 5 — పూర్తి system**

13. మొత్తం code ఒకే చోట
14. నడిపి చూద్దాం — Fool's mate, castling, stalemate

**Part 6 — Interview lo**

15. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
16. నోటితో చెప్పాల్సిన English script
17. Follow-ups — undo, AI, performance
18. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. Chess lo నిజమైన కష్టం ఎక్కడ ఉంది

> *"Design a chess game."*

Chess నియమాలు అందరికీ తెలుసు, కాబట్టి ఇది సులభం అనిపిస్తుంది. కానీ ఆ నియమాలని **ఎక్కడ పెట్టాలి** అనేదే మొత్తం problem, మరియు అక్కడ మూడు పొరలు ఉన్నాయి:

<div class="fig">
<div class="cap">"ఈ కదలిక చెల్లుతుందా?" — మూడు వేర్వేరు ప్రశ్నలు</div>
<svg viewBox="0 0 750 302"><text class="t-xs" x="0" y="14">ఒక్క ప్రశ్న అనిపిస్తుంది — నిజానికి మూడు, మరియు అవి వేర్వేరు చోట్ల ఉండాలి</text><rect class="n-info" x="0" y="26" width="240" height="118" rx="4"/><text class="t mid" x="120" y="50">1 · పావు నియమం</text><text class="t-sm mid" x="120" y="74">"Bishop వికర్ణంగా కదులుతుంది"</text><text class="t-sm mid" x="120" y="92">ఇది పావుకి తెలిసిన విషయం</text><text class="t-sm mid" x="120" y="110">Board అవసరం లేదు</text><text class="t-acc mid" x="120" y="134">→ §5 · Polymorphism</text><rect class="n-soft" x="255" y="26" width="240" height="118" rx="4"/><text class="t mid" x="375" y="50">2 · Board నియమం</text><text class="t-sm mid" x="375" y="74">"దారిలో ఎవరో ఉన్నారు"</text><text class="t-sm mid" x="375" y="92">"గమ్యంలో నా సొంత పావు"</text><text class="t-sm mid" x="375" y="110">పావు + board కలిసి</text><text class="t-acc mid" x="375" y="134">→ §5 · పావు board ని చూస్తుంది</text><rect class="n-acc" x="510" y="26" width="240" height="118" rx="4"/><text class="t-w mid" x="630" y="50">3 · ఆట నియమం</text><text class="t-w-sm mid" x="630" y="74">"ఇది నా రాజుని బయటపెడుతుంది"</text><text class="t-w-sm mid" x="630" y="92">"Castling కి చరిత్ర కావాలి"</text><text class="t-w-sm mid" x="630" y="110">పావుకి ఇది తెలియదు · తెలియకూడదు</text><text class="t-w-sm mid" x="630" y="134">→ §7, §9 · <tspan class="t-acc">ఇదే అసలు కష్టం</tspan></text><rect class="n-bad" x="0" y="160" width="750" height="132" rx="4"/><text class="t mid" x="375" y="184">ఎవరు ఎక్కడ ఆగిపోతారు</text><text class="t-sm mid" x="375" y="208">పొర 1 ని అందరూ చేస్తారు — ఆరు subclasses, అది స్పష్టం</text><text class="t-sm mid" x="375" y="226">పొర 2 ని చాలా మంది చేస్తారు — కానీ <tspan class="t-acc">తప్పు signature</tspan> తో మొదలుపెట్టి ఇరుక్కుంటారు (§4)</text><text class="t-sm mid" x="375" y="244">పొర 3 ని <tspan class="t-acc">అడిగితేనే</tspan> గుర్తిస్తారు — మరియు అప్పటికి design మార్చడం కష్టం</text><text class="t-sm mid" x="375" y="270">మీరు మొదటి ఐదు నిమిషాల్లో ఈ మూడు పొరలని పేరుపెట్టి విడదీస్తే —</text><text class="t-sm mid" x="375" y="286">మిగతా interview అంతా సులభంగా నడుస్తుంది. అదే ఈ doc నేర్పేది.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **పూర్తి నియమాలు కావాలా — castling, en passant, promotion?** | **ఇది అతి ముఖ్యమైన ప్రశ్న.** ఈ మూడు నియమాలకీ **చరిత్ర** కావాలి (§9) |
| **Checkmate, stalemate గుర్తించాలా?** | అవును అంటే — "ఈ ఆటగాడికి ఏ చట్టబద్ధ కదలికా లేదా?" అని అడగాలి |
| **Undo కావాలా?** | అవును అంటే ప్రతి కదలికా ఒక **object** కావాలి (Command) |
| **AI ఆడాలా?** | అవును అంటే `move`/`unmove` **వేగంగా** ఉండాలి — అదే §7 |
| **Draw నియమాలు (50-move, repetition)?** | ఇవి చరిత్ర మీద ఆధారపడతాయి; నేను వీటిని **scope బయట** పెడతాను |
| **Move notation (PGN) కావాలా?** | ఒక వేరే పొర — core design ని మార్చదు |
| **Timer/clock?** | పూర్తిగా వేరే విషయం; scope బయట |

<div class="box warn">
<div class="lab">"పూర్తి నియమాలు కావాలా?" — ఈ ఒక్క ప్రశ్న design ని రెండుగా చీలుస్తుంది</div>
<b>"కేవలం మౌలిక కదలికలు"</b> అయితే — ఒక board, ఆరు పావు classes, అంతే. 20 నిమిషాల పని.<br><br>
<b>"పూర్తి నియమాలు"</b> అయితే — castling కి "రాజు, rook ఇంతకుముందు కదిలారా?" తెలియాలి. En passant కి "<i>గత</i> కదలిక ఏమిటి?" తెలియాలి. అంటే <b>board ఒక్కటే సరిపోదు</b> — ఒక <code>Game</code> కావాలి, మరియు దానికి చరిత్ర కావాలి.<br><br>
ఈ ప్రశ్న అడగకపోతే మీరు మొదటి design రాసి, ఆపై దాన్ని తిరిగి రాయాలి. అడిగితే — మీరు మొదటి నుంచే సరైన ఆకారంలో ఉంటారు.
</div>

---

# Part 2 — మొదటి విరుపు: పావుకి board కనిపించదు

---

## 3. Step — ఒక Piece class, ఒక switch

అతి సహజమైన మొదటి ప్రయత్నం: ఒక `Piece`, ఒక `type`, మరియు ఒక పెద్ద `switch`:

```javascript
class Piece {
  constructor(type, colour) { Object.assign(this, { type, colour }); }

  canMove(from, to) {
    const dr = to.r - from.r, dc = to.c - from.c;
    const adr = Math.abs(dr), adc = Math.abs(dc);
    switch (this.type) {
      case 'ROOK':   return dr === 0 || dc === 0;
      case 'BISHOP': return adr === adc;
      case 'QUEEN':  return dr === 0 || dc === 0 || adr === adc;
      case 'KING':   return adr <= 1 && adc <= 1;
      case 'KNIGHT': return (adr === 2 && adc === 1) || (adr === 1 && adc === 2);
      case 'PAWN':   return dc === 0 && dr === (this.colour === 'W' ? -1 : 1);
      default: throw new Error('UNKNOWN_PIECE: ' + this.type);
    }
  }
}
```

```
Rook a1→a8 : true
Rook a1→h8 : false
Knight b1→c3: true
Knight b1→b3: false
```

**నాలుగూ సరైన జవాబులు.** Rook నిలువుగా/అడ్డంగా, knight L ఆకారంలో. గణితం సరిగ్గా ఉంది.

మరి సమస్య ఏమిటి?

---

## 4. మొదటి విరుపు — `canMove(from, to)` తప్పు ప్రశ్న అడుగుతోంది

```
సమస్య 1 — దారిలో ఎవరైనా ఉంటే?
  Rook a1→a8 "చెల్లుతుంది": true
  కానీ a4 lo ఒక piece ఉంటే? — canMove కి board గురించి తెలియదు.

సమస్య 2 — గమ్యంలో నా సొంత piece ఉంటే?
  Rook a1→a2 "చెల్లుతుంది": true
  కానీ a2 lo నా సొంత pawn ఉంది. అది తినలేను.

సమస్య 3 — కొత్త piece చేర్చాలంటే?
  Archbishop (bishop+knight) కావాలంటే → ఈ switch ని తెరిచి మార్చాలి.
```

<div class="box warn">
<div class="lab">మొదటి విరుపు — తప్పు signature</div>
మూడు సమస్యల్లో మొదటి రెండూ ఒకే మూలం నుంచి వస్తున్నాయి: <code>canMove(from, to)</code> లో <b>board లేదు</b>.<br><br>
Chess lo ఏ కదలికా board ని చూడకుండా నిర్ణయించలేం. Rook a1 నుంచి a8 కి వెళ్ళగలదా? — <b>దారిలో ఏముందో బట్టి</b>. ఆ సమాచారం లేకుండా జవాబు చెప్పడం అసాధ్యం.<br><br>
మూడో సమస్య వేరే స్వభావం: <code>switch</code> అంటే <b>ప్రతి కొత్త పావుకీ ఉన్న code ని తెరవాలి</b>. ఇది Open/Closed ఉల్లంఘన, మరియు Deep Dive 01 §10 lo pricing తో చూసిన అదే నమూనా.<br><br>
<b>రెండు తప్పులూ ఒకే మార్పుతో పోతాయి:</b> ప్రశ్నని తిప్పడం.
</div>

### ప్రశ్నని తిప్పడం

**తప్పు ప్రశ్న:** *"ఈ పావు ఇక్కడి నుంచి అక్కడికి వెళ్ళగలదా?"* — ఇది ప్రతి గమ్యానికీ ఒక్కొక్కటిగా అడుగుతుంది.

**సరైన ప్రశ్న:** *"ఈ పావు ఈ board మీద **ఎక్కడెక్కడికి** వెళ్ళగలదు?"*

ఈ మార్పు రెండు పనులు చేస్తుంది: board సహజంగా parameter గా వస్తుంది, మరియు దారి అడ్డగించడం/సొంత పావు రెండూ **generation లోపలే** పరిష్కారమవుతాయి — ఒక్క `if` కూడా అదనంగా అవసరం లేకుండా.

---

## 5. Step — ప్రతి పావూ తన కదలికలని *తయారు* చేయడం

`switch` పోయి, ఆరు subclasses వచ్చాయి. మరియు **జారే పావులకి** (rook, bishop, queen) ఉమ్మడి logic base class lo:

```javascript
class Piece {
  constructor(colour) { this.colour = colour; this.hasMoved = false; }

  // జారే pieces కి ఉమ్మడి: ఒక దిక్కులో అడ్డు వచ్చేవరకు వెళ్ళడం
  slide(b, f, dirs) {
    const out = [];
    for (const [dr, dc] of dirs) {
      let r = f.r + dr, c = f.c + dc;
      while (b.inside(r, c)) {
        const p = b.at(r, c);
        if (!p) { out.push({ r, c }); }                       // ఖాళీ → వెళ్ళొచ్చు
        else { if (p.colour !== this.colour) out.push({ r, c });  // శత్రువు → తినొచ్చు
               break; }                                        // ఏదైనా ఉంటే ఆగాలి
        r += dr; c += dc;
      }
    }
    return out;
  }
}

class Rook   extends Piece { get letter(){return 'r';} moves(b,f){ return this.slide(b,f,ROOK_DIRS); } }
class Bishop extends Piece { get letter(){return 'b';} moves(b,f){ return this.slide(b,f,BISHOP_DIRS); } }
class Queen  extends Piece { get letter(){return 'q';} moves(b,f){ return this.slide(b,f,[...ROOK_DIRS,...BISHOP_DIRS]); } }
```

**ఆ `slide` lo మూడు నియమాలూ ఒకే చోట ఉన్నాయి:** ఖాళీ గడికి వెళ్ళొచ్చు, శత్రు పావుని తినొచ్చు (ఆపై ఆగాలి), సొంత పావు దగ్గర ఆగాలి. §4 యొక్క మొదటి రెండు సమస్యలూ ఇక్కడే పరిష్కారమయ్యాయి.

మరియు **Queen కి సొంత code లేదు** — అది కేవలం rook దిక్కులు + bishop దిక్కులు. ఇది ఒక చిన్న, అందమైన వివరం.

నడిపి చూద్దాం — a1 తెల్ల rook, a2 తెల్ల knight, a4 నల్ల rook:

```
8 . . . . . . . .
4 r . . . . . . .
2 N . . . . . . .
1 R . . . . . . .
  a b c d e f g h

a1 Rook కదలికలు: b1 c1 d1 e1 f1 g1 h1
  → a2 lo సొంత knight ఉంది కాబట్టి పైకి వెళ్ళలేదు
  → b1..h1 ఖాళీ కాబట్టి అటు వెళ్ళగలదు

a4 నల్ల Rook కదలికలు: a3 a2 a5 a6 a7 a8 b4 c4 d4 e4 f4 g4 h4
  → a2 వద్ద తెల్ల knight ని *తినగలదు*, అక్కడే ఆగుతుంది
```

తెల్ల rook **పైకి అస్సలు వెళ్ళలేదు** (సొంత knight). నల్ల rook **a2 వరకు వెళ్ళి ఆగింది** (శత్రు knight ని తినగలదు, కానీ దాన్ని దాటలేదు). **మొదటి విరుపు పూర్తిగా సరిచేయబడింది.**

---

# Part 3 — రెండో విరుపు: చెల్లుబాటు అనేది పావుది కాదు

---

## 6. రెండో విరుపు — తొమ్మిది కదలికలు, సున్నా చెల్లుబాటు

ఇప్పుడు ఒక సాధారణ, కానీ నిర్ణయాత్మకమైన స్థానం. తెల్ల రాజు **e1**, తెల్ల bishop **e2**, నల్ల rook **e8**:

```
8 . . . . r . . .
2 . . . . B . . .
1 . . . . K . . .
  a b c d e f g h

e2 Bishop "చేయగల" కదలికలు: f1 d1 f3 g4 h5 d3 c4 b5 a6
```

**తొమ్మిది కదలికలు**, మరియు మన `slide` ప్రకారం అన్నీ సరైనవే — bishop వికర్ణంగా కదులుతోంది, దారిలో ఎవరూ లేరు.

కానీ ఆలోచించండి: bishop **e-వరుస నుంచి తప్పుకుంటే** ఏమవుతుంది?

<div class="box warn">
<div class="lab">రెండో విరుపు — తొమ్మిదింటిలో ఒక్కటీ చెల్లదు</div>
Bishop e2 నుంచి ఎక్కడికి వెళ్ళినా, అది e-వరుసని వదిలేస్తుంది. అప్పుడు <b>e8 నల్ల rook కి e1 తెల్ల రాజు వరకు దారి తెరుచుకుంటుంది</b> — అంటే మన రాజు check lo పడతాడు.<br><br>
Chess నియమం: <b>మీ సొంత రాజుని check lo పెట్టే కదలిక చట్టవిరుద్ధం.</b> కాబట్టి ఆ తొమ్మిదింటిలో <b>ఒక్కటీ చెల్లదు</b>. Bishop పూర్తిగా <b>కట్టుబడి</b> ఉంది (pinned).<br><br>
<b>ఇక్కడ ముఖ్యమైనది:</b> <code>Bishop.moves()</code> lo ఏ తప్పూ లేదు. అది సరిగ్గానే పనిచేసింది. తప్పు ఏమిటంటే — <b>చెల్లుబాటుని నిర్ణయించడం పావు పని కాదు</b>.<br><br>
మరియు bishop కి అది <i>తెలియనూ కూడదు</i>. దానికి రాజు ఎక్కడ ఉన్నాడో, శత్రువులు ఎక్కడ ఉన్నారో తెలిస్తే — అది ఇక ఒక bishop కాదు, అది మొత్తం ఆటని తెలుసుకున్న ఒక దేవుడు.
</div>

### కాబట్టి రెండు రకాల కదలికలు ఉన్నాయి

| | ఎవరు నిర్ణయిస్తారు | అర్థం |
|---|---|---|
| **Pseudo-legal** (ముడి) | `Piece.moves()` | "ఈ పావు నియమాల ప్రకారం ఇక్కడికి వెళ్ళగలదు" |
| **Legal** (చట్టబద్ధం) | `Game.legalMoves()` | "…మరియు అది నా రాజుని ప్రమాదంలో పెట్టదు" |

ఈ రెండు పేర్లూ నిజమైన chess-engine పరిభాష. **Interview lo వీటిని వాడండి** — ఇది మీరు ఈ విభజనని తెలిసి చేస్తున్నారని చూపిస్తుంది.

---

## 7. Step — చేసి చూడటం, ఆపై వెనక్కి తీయడం

"ఈ కదలిక నా రాజుని check lo పెడుతుందా?" — దీన్ని ఎలా తెలుసుకోవాలి?

తెలివైన పద్ధతులు ఉన్నాయి (pin detection, ray casting). కానీ అత్యంత సరళమైనది, మరియు **తప్పు కాని** పద్ధతి: **ఆ కదలికని నిజంగా చేసి, రాజు క్షేమమా చూసి, వెనక్కి తీయడం.**

```javascript
#simulate(from, to, fn) {
  const g = this.board.grid;
  const moving = g[from.r][from.c], captured = g[to.r][to.c];
  const prevEp = this.board.enPassant;

  g[to.r][to.c] = moving; g[from.r][from.c] = null;      // చేయడం
  // … (en passant నిర్వహణ — §11) …

  const result = fn();                                   // ప్రశ్న అడగడం

  g[from.r][from.c] = moving; g[to.r][to.c] = captured;  // వెనక్కి తీయడం
  this.board.enPassant = prevEp;
  return result;
}

legalMoves(from) {
  const p = this.board.at(from.r, from.c);
  if (!p || p.colour !== this.turn) return [];
  const pseudo = p.moves(this.board, from);
  return pseudo.filter((to) => this.#simulate(from, to, () => !this.inCheck(p.colour)));
}
```

మరియు "check lo ఉన్నాడా?" అనేది ఆశ్చర్యకరంగా సులభం — **శత్రువుల ముడి కదలికల్లో రాజు గడి ఉందా?**

```javascript
isAttacked(sq, byColour) {
  for (const { piece, at } of this.board.pieces(byColour))
    if (piece.moves(this.board, at).some((m) => m.r === sq.r && m.c === sq.c)) return true;
  return false;
}
inCheck(colour) {
  const k = this.board.find(colour, King);
  return k ? this.isAttacked(k, other(colour)) : false;
}
```

<div class="note"><b>ఇక్కడ ఒక అందమైన పునర్వినియోగం ఉంది.</b> "రాజు దాడిలో ఉన్నాడా?" అని తెలుసుకోవడానికి మనం <b>అదే <code>moves()</code></b> ని వాడుతున్నాం — శత్రు పావుల మీద. కొత్త code ఏమీ లేదు.<br><br>
మరియు ఇక్కడ <b>ముడి</b> కదలికలు వాడటం సరైనది, చట్టబద్ధమైనవి కాదు. ఎందుకంటే ఒక పావు కట్టుబడి ఉన్నా కూడా అది <i>దాడి చేస్తూనే</i> ఉంటుంది — శత్రు రాజు ఆ గడికి రాలేడు. ఇది chess యొక్క ఒక సూక్ష్మమైన నియమం, మరియు ముడి కదలికలు వాడటం వల్ల అది <b>ఉచితంగా</b> సరైనదవుతుంది.</div>

అదే pinned స్థానంలో:

```
--- కట్టుబడిన (pinned) bishop ---
  Bishop యొక్క ముడి కదలికలు: 9
  చట్టబద్ధమైన కదలికలు      : 0 ← అన్నీ రాజుని బయటపెడతాయి
```

**9 → 0.** రెండో విరుపు సరిచేయబడింది, మరియు `Bishop` class lo ఒక్క అక్షరం కూడా మారలేదు.

---

## 8. `#simulate` ఎందుకు ఇంత జాగ్రత్తగా ఉండాలి

ఆ method చిన్నది, కానీ ప్రతి పంక్తికీ ఒక కారణం ఉంది — మరియు ఒకటి మర్చిపోతే bugs నిశ్శబ్దంగా వస్తాయి.

| పంక్తి | ఎందుకు · మర్చిపోతే ఏమవుతుంది |
|-------|------------------------------|
| `captured` ని గుర్తుపెట్టుకోవడం | వెనక్కి తీసేటప్పుడు తిన్న పావుని **తిరిగి పెట్టాలి**. లేకపోతే simulation ప్రతిసారీ ఒక పావుని తినేస్తుంది |
| `prevEp` ని గుర్తుపెట్టుకోవడం | En passant గడి కదలికతో మారుతుంది; తిరిగి పెట్టకపోతే తర్వాతి కదలికలు తప్పుగా లెక్కించబడతాయి |
| En passant ని ప్రత్యేకంగా | అక్కడ తిన్న పావు **గమ్యం గడిలో ఉండదు** — అది పక్కన ఉంటుంది (§11) |
| **కొత్త object సృష్టించకపోవడం** | Board ని copy చేస్తే సులభం, కానీ **చాలా నెమ్మది** — కింద చూడండి |

### Board ని copy చేయొచ్చు కదా?

చేయొచ్చు, మరియు అది సులభం:

```javascript
const copy = structuredClone(this.board);   // ✗ సులభం, కానీ ఖరీదు
```

కానీ ఆలోచించండి: `legalMoves` ప్రతి కదలికకీ ఒకసారి simulate చేస్తుంది. `status()` ప్రతి పావు యొక్క ప్రతి కదలికకీ. ఒక్క `status()` పిలుపు **వందల simulations**. Copy చేస్తే అది వందల board copies.

**Make/unmake** అనే ఈ నమూనా ప్రతి నిజమైన chess engine వాడేదే, సరిగ్గా ఈ కారణానికే. AI చేర్చాలంటే (§17) ఇది **లక్షల** సార్లు నడుస్తుంది, మరియు అప్పుడు ఈ ఎంపిక తేడా చేస్తుంది.

---

# Part 4 — మూడో విరుపు: నియమాలకి చరిత్ర కావాలి

---

## 9. మూడో విరుపు — castling మరియు en passant board lo లేవు

ఇప్పటిదాకా ప్రతి నిర్ణయం **ఇప్పటి board** ని చూసి తీసుకున్నాం. కానీ chess lo మూడు నియమాలు ఆ మాదిరి కావు:

<div class="fig">
<div class="cap">మూడు నియమాలు · board ఒక్కటే సరిపోదు</div>
<svg viewBox="0 0 750 282"><text class="t-xs" x="0" y="14">ఒకే board స్థానం — కానీ జవాబు చరిత్రని బట్టి మారుతుంది</text><rect class="n-acc" x="0" y="26" width="240" height="122" rx="4"/><text class="t-w mid" x="120" y="50">Castling</text><text class="t-w-sm mid" x="120" y="74">రాజు, rook ఇద్దరూ</text><text class="t-w-sm mid" x="120" y="92">ఇంతకుముందు <tspan class="t-acc">కదలకుండా</tspan> ఉండాలి</text><text class="t-w-sm mid" x="120" y="114">రాజు e1, rook h1 — కానీ అవి</text><text class="t-w-sm mid" x="120" y="132">కదిలి తిరిగొచ్చాయా? board చెప్పదు</text><rect class="n-acc" x="255" y="26" width="240" height="122" rx="4"/><text class="t-w mid" x="375" y="50">En passant</text><text class="t-w-sm mid" x="375" y="74"><tspan class="t-acc">సరిగ్గా గత కదలిక</tspan> ఏమిటి?</text><text class="t-w-sm mid" x="375" y="92">శత్రు pawn ఇప్పుడే రెండు గడులు</text><text class="t-w-sm mid" x="375" y="110">దూకిందా? ఒక్క కదలిక ఆలస్యమైనా</text><text class="t-w-sm mid" x="375" y="128">ఈ హక్కు <tspan class="t-acc">పోతుంది</tspan></text><rect class="n-info" x="510" y="26" width="240" height="122" rx="4"/><text class="t mid" x="630" y="50">Promotion</text><text class="t-sm mid" x="630" y="74">ఒక pawn చివరి వరుసకి</text><text class="t-sm mid" x="630" y="92">చేరితే — అది <tspan class="t-acc">వేరే పావుగా</tspan></text><text class="t-sm mid" x="630" y="110">మారుతుంది</text><text class="t-sm mid" x="630" y="132">చరిత్ర అవసరం లేదు, కానీ</text><rect class="n-bad" x="0" y="166" width="750" height="108" rx="4"/><text class="t mid" x="375" y="190">ఇవి మూడూ ఒకే విషయం చెప్తున్నాయి</text><text class="t-sm mid" x="375" y="214">ఒక కదలిక "ఒక పావు ఇక్కడి నుంచి అక్కడికి" అని మాత్రమే కాదు.</text><text class="t-sm mid" x="375" y="234">Castling lo <tspan class="t-acc">రెండు పావులు</tspan> కదులుతాయి · en passant lo తిన్నది <tspan class="t-acc">గమ్యంలో లేదు</tspan> ·</text><text class="t-sm mid" x="375" y="252">promotion lo <tspan class="t-acc">పావే మారిపోతుంది</tspan>.</text><text class="t-sm mid" x="375" y="268">అంటే <tspan class="t-acc">Move</tspan> ఒక tuple కాదు — అది ఒక object, మరియు Game దాన్ని అమలు చేయాలి.</text></svg>
</div>

మన design ఇప్పటికే సగం సిద్ధంగా ఉంది: `Piece` lo `hasMoved` ఉంది (castling కి), మరియు `Board` lo `enPassant` ఉంది. ఇప్పుడు వాటిని వాడదాం.

---

## 10. Step — Castling · మూడు షరతులు

Castling కి **మూడు వేర్వేరు** షరతులు, మరియు అవి మూడు వేర్వేరు చోట్ల నుంచి వస్తాయి:

```javascript
#castlingMoves(from, king) {
  const out = [], row = from.r;
  for (const [rookCol, step, through] of [[7, 1, [5,6]], [0, -1, [3,2,1]]]) {
    const rook = this.board.at(row, rookCol);
    if (!(rook instanceof Rook) || rook.hasMoved || rook.colour !== king.colour) continue;  // 1
    if (through.some((c) => this.board.at(row, c))) continue;                               // 2
    const cross = [from.c + step, from.c + 2*step];
    if (cross.some((c) => this.isAttacked({r:row,c}, other(king.colour)))) continue;        // 3
    out.push({ r: row, c: from.c + 2*step, castle: true });
  }
  return out;
}
```

1. **చరిత్ర** — రాజు, rook ఇద్దరూ కదలకుండా ఉండాలి (`hasMoved`).
2. **Board** — మధ్యలో ఉన్న గడులు ఖాళీగా ఉండాలి.
3. **దాడి** — రాజు *దాటే* గడులు దాడిలో ఉండకూడదు. (మరియు `legalMoves` lo ఇప్పటికే "రాజు check lo ఉండకూడదు" అని తనిఖీ చేశాం.)

మూడో షరత సూక్ష్మమైనది: రాజు e1 నుంచి g1 కి వెళ్ళేటప్పుడు **f1 గుండా** వెళ్తాడు. F1 దాడిలో ఉంటే castling చెల్లదు — రాజు *ఆగకపోయినా*.

నడిపి చూద్దాం:

```
--- Castling ---
  రాజు e1 కదలికలు: e2 f1 d1 f2 d2 g1(castle) c1(castle)
  O-O తర్వాత:
1 R . . . . R K .
  a b c d e f g h

--- Castling ఎందుకు ఆగుతుంది ---
  f-వరుసలో నల్ల rook → రాజు f1 దాటాలి, అది దాడిలో ఉంది
  రాజు కదలికలు: e2 d1 d2
```

**మొదటి భాగం:** రెండు వైపులా castling అందుబాటులో, మరియు `O-O` తర్వాత board `R . . . . R K .` — rook a1 lo ఉంది, రాజు g1, మరియు **h1 rook f1 కి వచ్చింది**. రెండు పావులూ ఒకే కదలికలో కదిలాయి.

**రెండో భాగం:** f-వరుసలో ఒక నల్ల rook పెడితే — `f1`, `f2` **రెండూ** కదలికల జాబితా నుంచి పోయాయి (రాజు దాడిలోకి వెళ్ళలేడు), మరియు **castling కూడా పోయింది**. మూడో షరత పనిచేసింది.

---

## 11. Step — En passant · ఒక్క కదలిక మాత్రమే గుర్తుండాలి

En passant chess lo అత్యంత విచిత్రమైన నియమం: ఒక శత్రు pawn **రెండు గడులు దూకి** మీ pawn పక్కన ఆగితే, మీరు దాన్ని *అది ఒక్క గడే కదిలినట్టు* తినొచ్చు — **కానీ వెంటనే మాత్రమే**.

దీనికి కావలసిన చరిత్ర **ఒక్క గడి**: "గత కదలికలో ఏ గడి *దాటబడింది*?"

```javascript
// move() చివర్లో:
this.board.enPassant = (piece instanceof Pawn && Math.abs(to.r - from.r) === 2)
  ? { r: (from.r + to.r) / 2, c: from.c }     // దాటిన గడి
  : null;                                      // ← మిగతా ప్రతి కదలికా దీన్ని తుడుస్తుంది
```

ఆ **`: null`** అత్యంత ముఖ్యమైన భాగం. ఏ ఇతర కదలికైనా ఆ హక్కుని **తక్షణం** తుడిచేస్తుంది — అదే "వెంటనే మాత్రమే" అనే నియమం.

మరియు `Pawn.moves()` lo:

```javascript
else if (!t && b.enPassant && b.enPassant.r === r && b.enPassant.c === c)
  out.push({ r, c, enPassant: true });          // ← ఖాళీ గడికి "తినడం"
```

```
--- En passant ---
  d7→d5 తర్వాత en-passant గడి: d6
  e5 తెల్ల pawn కదలికలు: e6 d6(ep)
  exd6 e.p. తర్వాత d5 lo ఏముంది? ఖాళీ ← నల్ల pawn పోయింది
```

**చివరి పంక్తి గమనించండి.** తెల్ల pawn **d6** కి వెళ్ళింది, కానీ తిన్న నల్ల pawn **d5** lo ఉంది. అంటే **తిన్న పావు గమ్యం గడిలో లేదు** — chess lo ఇది ఒక్క ఇక్కడే జరుగుతుంది, మరియు అందుకే `#simulate` lo దానికి ప్రత్యేక నిర్వహణ కావాలి (§8).

---

## 12. Step — Promotion · ఒక పావు వేరే పావుగా మారడం

Pawn చివరి వరుసకి చేరితే అది queen/rook/bishop/knight గా మారుతుంది:

```javascript
if (piece instanceof Pawn && (to.r === 0 || to.r === 7)) {
  g[to.r][to.c] = new promoteTo(piece.colour);      // ← కొత్త object, పాతది పోతుంది
  g[to.r][to.c].hasMoved = true;
}
```

```
--- Promotion ---
  a7→a8 తర్వాత a8 lo: Queen (Q)
```

<div class="note"><b>ఇక్కడ ఒక design ఎంపిక ఉంది:</b> pawn యొక్క <i>type ని మార్చడం</i> కాదు — <b>కొత్త object సృష్టించి పాతదాన్ని భర్తీ చేయడం</b>.<br><br>
ఎందుకు? ఎందుకంటే §5 lo మన పావులు <b>ప్రవర్తన ద్వారా</b> వేరుపడతాయి, ఒక <code>type</code> field ద్వారా కాదు. <code>pawn.type = 'QUEEN'</code> అని రాయడం మనల్ని §3 యొక్క switch వైపు వెనక్కి లాగుతుంది. <b>Polymorphic design lo "రకం మారడం" అంటే "వస్తువు మారడం".</b><br><br>
<code>promoteTo</code> ఒక parameter గా ఉండటం కూడా ముఖ్యం — <b>underpromotion</b> (queen కాకుండా knight ఎంచుకోవడం) నిజమైన ఆటల్లో జరుగుతుంది, మరియు అది ఒక hardcoded <code>Queen</code> తో సాధ్యం కాదు.</div>

---

# Part 5 — పూర్తి system

---

## 13. మొత్తం code ఒకే చోట

<div class="fig">
<div class="cap">నిర్మాణం · ఎవరికి ఏమి తెలుసు</div>
<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">మూడు పొరలు, మరియు ఒక స్పష్టమైన దిశ: పైవాళ్ళకి కిందివాళ్ళ గురించి తెలుసు, తిరగబడి కాదు</text><rect class="n-acc" x="235" y="26" width="280" height="56" rx="4"/><text class="t-w mid" x="375" y="48">Game</text><text class="t-w-sm mid" x="375" y="66">legalMoves · move · status · చరిత్ర</text><line class="ln-acc" x1="375" y1="86" x2="375" y2="110" marker-end="url(#aa)"/><rect class="n-info" x="255" y="114" width="240" height="52" rx="4"/><text class="t mid" x="375" y="136">Board</text><text class="t-sm mid" x="375" y="154">grid · inside · at · enPassant</text><line class="ln-acc" x1="375" y1="170" x2="375" y2="192" marker-end="url(#aa)"/><rect class="n-good" x="175" y="196" width="400" height="56" rx="4"/><text class="t mid" x="375" y="218">Piece → Rook · Bishop · Queen · Knight · King · Pawn</text><text class="t-sm mid" x="375" y="238">moves(board, from) — ముడి కదలికలు మాత్రమే</text><text class="t-sm" x="592" y="140">Board కి ఆట</text><text class="t-sm" x="592" y="156">నియమాలు తెలియవు</text><text class="t-sm" x="0" y="220">పావుకి రాజు</text><text class="t-sm" x="0" y="236">గురించి తెలియదు</text></svg>
</div>

```javascript
const W = 'W', B = 'B';
const other = (c) => (c === W ? B : W);

class Piece {
  constructor(colour) { this.colour = colour; this.hasMoved = false; }
  get symbol() { return this.colour === W ? this.letter.toUpperCase() : this.letter.toLowerCase(); }
  slide(b, f, dirs) {
    const out = [];
    for (const [dr, dc] of dirs) {
      let r = f.r + dr, c = f.c + dc;
      while (b.inside(r, c)) {
        const p = b.at(r, c);
        if (!p) out.push({ r, c });
        else { if (p.colour !== this.colour) out.push({ r, c }); break; }
        r += dr; c += dc;
      }
    }
    return out;
  }
  step(b, f, deltas) {
    return deltas.map(([dr, dc]) => ({ r: f.r + dr, c: f.c + dc }))
      .filter((s) => b.inside(s.r, s.c) && b.at(s.r, s.c)?.colour !== this.colour);
  }
}

const ROOK_DIRS    = [[1,0],[-1,0],[0,1],[0,-1]];
const BISHOP_DIRS  = [[1,1],[1,-1],[-1,1],[-1,-1]];
const KNIGHT_STEPS = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
const KING_STEPS   = [...ROOK_DIRS, ...BISHOP_DIRS];

class Rook   extends Piece { get letter(){return 'r';} moves(b,f){ return this.slide(b,f,ROOK_DIRS); } }
class Bishop extends Piece { get letter(){return 'b';} moves(b,f){ return this.slide(b,f,BISHOP_DIRS); } }
class Queen  extends Piece { get letter(){return 'q';} moves(b,f){ return this.slide(b,f,[...ROOK_DIRS,...BISHOP_DIRS]); } }
class Knight extends Piece { get letter(){return 'n';} moves(b,f){ return this.step(b,f,KNIGHT_STEPS); } }
class King   extends Piece { get letter(){return 'k';} moves(b,f){ return this.step(b,f,KING_STEPS); } }

class Pawn extends Piece {
  get letter(){ return 'p'; }
  moves(b, f) {
    const dir = this.colour === W ? -1 : 1;
    const start = this.colour === W ? 6 : 1;
    const out = [];
    if (b.inside(f.r+dir, f.c) && !b.at(f.r+dir, f.c)) {
      out.push({ r: f.r+dir, c: f.c });
      if (f.r === start && !b.at(f.r+2*dir, f.c)) out.push({ r: f.r+2*dir, c: f.c });
    }
    for (const dc of [-1, 1]) {                       // తినడం వికర్ణంగా మాత్రమే
      const r = f.r+dir, c = f.c+dc;
      if (!b.inside(r,c)) continue;
      const t = b.at(r,c);
      if (t && t.colour !== this.colour) out.push({ r, c });
      else if (!t && b.enPassant && b.enPassant.r === r && b.enPassant.c === c)
        out.push({ r, c, enPassant: true });
    }
    return out;
  }
}

class Board {
  constructor() { this.grid = Array.from({length:8},()=>Array(8).fill(null)); this.enPassant = null; }
  inside(r,c){ return r>=0&&r<8&&c>=0&&c<8; }
  at(r,c){ return this.inside(r,c) ? this.grid[r][c] : null; }
  put(r,c,p){ this.grid[r][c]=p; return this; }
  find(colour, Type) {
    for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
      const p=this.grid[r][c];
      if (p && p.colour===colour && p instanceof Type) return { r, c };
    }
    return null;
  }
  pieces(colour) {
    const out=[];
    for (let r=0;r<8;r++) for (let c=0;c<8;c++) {
      const p=this.grid[r][c];
      if (p && p.colour===colour) out.push({ piece:p, at:{r,c} });
    }
    return out;
  }
  show() {
    return this.grid.map((row,r)=>(8-r)+' '+row.map(p=>p?p.symbol:'.').join(' ')).join('\n')
         + '\n  a b c d e f g h';
  }
  static initial() {
    const b = new Board();
    const back = [Rook,Knight,Bishop,Queen,King,Bishop,Knight,Rook];
    back.forEach((T,c)=>{ b.put(0,c,new T(B)); b.put(7,c,new T(W)); });
    for (let c=0;c<8;c++) { b.put(1,c,new Pawn(B)); b.put(6,c,new Pawn(W)); }
    return b;
  }
}

class Game {
  #history = [];
  constructor(board = Board.initial(), turn = W) { Object.assign(this, { board, turn }); }

  isAttacked(sq, byColour) {
    for (const { piece, at } of this.board.pieces(byColour))
      if (piece.moves(this.board, at).some((m) => m.r===sq.r && m.c===sq.c)) return true;
    return false;
  }
  inCheck(colour) {
    const k = this.board.find(colour, King);
    return k ? this.isAttacked(k, other(colour)) : false;
  }

  #simulate(from, to, fn) {
    const g = this.board.grid;
    const moving = g[from.r][from.c], captured = g[to.r][to.c];
    const prevEp = this.board.enPassant;
    g[to.r][to.c] = moving; g[from.r][from.c] = null;
    let epCaptured = null, epSq = null;
    if (moving instanceof Pawn && prevEp && to.r===prevEp.r && to.c===prevEp.c && from.c!==to.c) {
      epSq = { r: from.r, c: to.c };
      epCaptured = g[epSq.r][epSq.c]; g[epSq.r][epSq.c] = null;
    }
    const result = fn();
    g[from.r][from.c] = moving; g[to.r][to.c] = captured;
    if (epSq) g[epSq.r][epSq.c] = epCaptured;
    this.board.enPassant = prevEp;
    return result;
  }

  legalMoves(from) {
    const p = this.board.at(from.r, from.c);
    if (!p || p.colour !== this.turn) return [];
    const pseudo = p.moves(this.board, from);
    const legal = pseudo.filter((to) => this.#simulate(from, to, () => !this.inCheck(p.colour)));
    if (p instanceof King && !p.hasMoved && !this.inCheck(p.colour))
      legal.push(...this.#castlingMoves(from, p));
    return legal;
  }

  #castlingMoves(from, king) {
    const out = [], row = from.r;
    for (const [rookCol, step, through] of [[7, 1, [5,6]], [0, -1, [3,2,1]]]) {
      const rook = this.board.at(row, rookCol);
      if (!(rook instanceof Rook) || rook.hasMoved || rook.colour !== king.colour) continue;
      if (through.some((c) => this.board.at(row, c))) continue;
      const cross = [from.c + step, from.c + 2*step];
      if (cross.some((c) => this.isAttacked({r:row,c}, other(king.colour)))) continue;
      out.push({ r: row, c: from.c + 2*step, castle: true });
    }
    return out;
  }

  allLegalMoves(colour = this.turn) {
    const out = [];
    for (const { at } of this.board.pieces(colour))
      for (const to of this.legalMoves(at)) out.push({ from: at, to });
    return out;
  }

  move(from, to, promoteTo = Queen) {
    const chosen = this.legalMoves(from).find((m) => m.r===to.r && m.c===to.c);
    if (!chosen) return { ok: false, reason: 'ILLEGAL_MOVE' };

    const g = this.board.grid;
    const piece = g[from.r][from.c];
    const captured = g[to.r][to.c];
    g[to.r][to.c] = piece; g[from.r][from.c] = null;

    if (chosen.castle) {                                   // rook కూడా కదులుతుంది
      const rookFrom = to.c > from.c ? 7 : 0, rookTo = to.c > from.c ? to.c-1 : to.c+1;
      g[to.r][rookTo] = g[to.r][rookFrom]; g[to.r][rookFrom] = null;
      g[to.r][rookTo].hasMoved = true;
    }
    if (piece instanceof Pawn && chosen.enPassant) g[from.r][to.c] = null;
    if (piece instanceof Pawn && (to.r === 0 || to.r === 7)) {
      g[to.r][to.c] = new promoteTo(piece.colour);
      g[to.r][to.c].hasMoved = true;
    }

    this.board.enPassant = (piece instanceof Pawn && Math.abs(to.r-from.r) === 2)
      ? { r: (from.r+to.r)/2, c: from.c } : null;
    piece.hasMoved = true;
    this.#history.push({ from, to, piece, captured });
    this.turn = other(this.turn);
    return { ok: true, status: this.status() };
  }

  status() {
    const hasMoves = this.allLegalMoves(this.turn).length > 0;
    if (hasMoves) return this.inCheck(this.turn) ? 'CHECK' : 'IN_PROGRESS';
    return this.inCheck(this.turn) ? 'CHECKMATE' : 'STALEMATE';
  }
}
```

### `status()` — నాలుగు స్థితులు, రెండు ప్రశ్నలు

ఆ చివరి method చిన్నది కానీ చక్కనిది. **రెండు boolean ప్రశ్నలు** నాలుగు స్థితులని ఇస్తాయి:

| | కదలికలు ఉన్నాయి | కదలికలు లేవు |
|---|---|---|
| **Check lo ఉన్నాడు** | `CHECK` | **`CHECKMATE`** |
| **Check lo లేడు** | `IN_PROGRESS` | **`STALEMATE`** |

Checkmate మరియు stalemate మధ్య తేడా **ఒక్కటే** — "రాజు ఇప్పుడు దాడిలో ఉన్నాడా?". చాలా మంది వీటికి వేర్వేరు logic రాస్తారు; ఇది అనవసరం.

---

## 14. నడిపి చూద్దాం — Fool's mate, castling, stalemate

**Fool's mate** — chess lo అత్యంత వేగవంతమైన checkmate, రెండు కదలికల్లో:

```
  f2→f3: IN_PROGRESS
  e7→e5: IN_PROGRESS
  g2→g4: IN_PROGRESS
  d8→h4: CHECKMATE
8 r n b . k b n r
7 p p p p . p p p
6 . . . . . . . .
5 . . . . p . . .
4 . . . . . . P q
3 . . . . . P . .
2 P P P P P . . P
1 R N B Q K B N R
  a b c d e f g h
```

నల్ల queen **h4** కి వచ్చింది. అది e1 తెల్ల రాజుని వికర్ణంగా దాడి చేస్తోంది (h4–g3–f2–e1), మరియు **f2, g2 pawns కదిలిపోయాయి** కాబట్టి ఆ దారి తెరిచి ఉంది. తెల్లవాడికి ఏ కదలికా లేదు → **CHECKMATE**. మన `status()` దాన్ని సరిగ్గా గుర్తించింది.

**Stalemate** — మరియు ఇది checkmate కి పూర్తి వ్యతిరేకం:

```
8 k . . . . . . .
6 . Q . . . . . .
1 . . K . . . . .
  a b c d e f g h
  నల్ల రాజు check lo ఉన్నాడా? false
  నల్లవాడికి చట్టబద్ధమైన కదలికలు: 0
  స్థితి: STALEMATE ← check కాదు, కానీ కదలిక లేదు

--- పోల్చి చూడటం: అదే స్థానం, queen b7 కి జరిపితే ---
  check lo ఉన్నాడా? true | కదలికలు: 1 | స్థితి: CHECK
```

<div class="box">
<div class="lab">ఈ రెండు పంక్తులని పక్కపక్కన చూడండి</div>
Queen <b>b6</b> lo — నల్ల రాజు a8 check lo <b>లేడు</b> (b6 నుంచి a8 కి దారి లేదు), కానీ a7, b7, b8 మూడూ దాడిలో ఉన్నాయి. కదలిక లేదు → <b>STALEMATE</b> (ఆట డ్రా).<br><br>
Queen <b>b7</b> కి జరిపితే — ఇప్పుడు రాజు check lo ఉన్నాడు, మరియు అతను queen ని <i>తినగలడు</i> (b7 రాజు పక్కనే ఉంది, తెల్ల రాజు c1 దాన్ని కాపాడట్లేదు) → <b>CHECK</b>, ఒక కదలికతో.<br><br>
ఒక్క గడి తేడా. ఒకటి డ్రా, ఇంకొకటి ఆట కొనసాగడం. <b>మన రెండు-ప్రశ్నల <code>status()</code> రెండిటినీ సరిగ్గా వేరుచేసింది</b>, ప్రత్యేక code లేకుండా.
</div>

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `Piece`, colour | మౌలిక భావన |
| §4 (విరుపు) | `moves(board, from)` — switch కాదు | Board లేకుండా జవాబు చెప్పలేం |
| §5 | `slide`, `step`, ఆరు subclasses | దారి అడ్డగింపు + capture ఒకే చోట |
| §6 (విరుపు) | `Game.legalMoves()` | చెల్లుబాటు పావు పని కాదు |
| §7 | `#simulate`, `isAttacked`, `inCheck` | చేసి చూసి వెనక్కి తీయడం |
| §9 (విరుపు) | `hasMoved`, `enPassant` | కొన్ని నియమాలకి చరిత్ర కావాలి |
| §10–12 | Castling, en passant, promotion | `Move` ఒక tuple కాదు |
| ఇక్కడ | `status()` | రెండు ప్రశ్నలు → నాలుగు స్థితులు |

---

# Part 6 — Interview lo

---

## 15. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Chess lo code ఎక్కువ — కాబట్టి ఏది రాయాలో, ఏది చెప్పాలో ఎంచుకోవడం కీలకం</text><rect class="n-acc" x="0" y="26" width="90" height="38" rx="3"/><text class="t-w mid" x="45" y="50">5 నిమి</text><text class="t-sm" x="106" y="50"><tspan class="t-acc">Clarify</tspan> — "పూర్తి నియమాలా?" తప్పనిసరి ప్రశ్న</text><rect class="n-info" x="0" y="70" width="110" height="38" rx="3"/><text class="t mid" x="55" y="94">6 నిమి</text><text class="t-sm" x="126" y="94">మూడు పొరలని పేరుపెట్టడం (§1) · Piece hierarchy</text><rect class="n-acc" x="0" y="114" width="170" height="38" rx="3"/><text class="t-w mid" x="85" y="138">10 నిమి — moves()</text><text class="t-sm" x="186" y="138">slide + step · rook/bishop/knight చాలు</text><rect class="n-acc" x="0" y="158" width="240" height="38" rx="3"/><text class="t-w mid" x="120" y="182">14 నిమి — చట్టబద్ధత</text><text class="t-sm" x="256" y="182"><tspan class="t-acc">ఇదే interview యొక్క కేంద్రం</tspan> · pin, simulate</text><rect class="n-soft" x="0" y="202" width="150" height="38" rx="3"/><text class="t mid" x="75" y="226">10 నిమి</text><text class="t-sm" x="256" y="226">Castling/en passant · status() · follow-ups</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **మూడు పొరలు** (§1) — పావు నియమం / board నియమం / ఆట నియమం. ఇది మీ మొదటి వాక్యం.
2. **Pin** (§6) — ఒక ఉదాహరణ గీసి, "తొమ్మిది కదలికలు, సున్నా చెల్లుబాటు" అని చూపించండి.
3. **Make/unmake, copy కాదు** (§8) — మరియు ఎందుకో.
4. **Castling/en passant కి చరిత్ర కావాలి** (§9) — ఇది మీరే లేవనెత్తండి.
5. **Checkmate vs stalemate ఒకే logic** (§13) — రెండు ప్రశ్నలు, నాలుగు స్థితులు.

### ఏమి వదిలేయాలి

- **ఆరు పావులూ రాయొద్దు** — `slide` చూపించి, rook + bishop రాసి, "queen రెండూ కలిపి, knight/king step" అని చెప్పండి.
- **Castling code పూర్తిగా రాయొద్దు** — **మూడు షరతులని** చెప్పండి, అది సరిపోతుంది.
- **`Board.initial()` వదిలేయండి** — ఇది కేవలం setup.

---

## 16. నోటితో చెప్పాల్సిన English script

<div class="script">
"One question that changes everything: do you want the full rules — castling, en passant, promotion — or just basic piece movement? Those three need history, not just the current board, so the answer shapes the design.<br><br>
I'll assume full rules. Before any code, I want to separate three kinds of rule, because they belong in three different places. First, how a piece moves — a bishop goes diagonally. That's the piece's own knowledge. Second, board constraints — something's blocking the path, or the target square has my own piece. That's the piece plus the board. Third, game rules — this move exposes my own king, or castling depends on whether these pieces have moved before. The piece can't know that, and shouldn't.<br><br>
For the first two, the natural mistake is <span class='mono'>canMove(from, to)</span> returning a boolean. That signature has no board in it, so it can't answer the question. I'd flip it: each piece generates all the squares it can reach, given the board. Sliding pieces share one helper that walks a direction until it hits something — empty square is fine, enemy piece is a capture and then stop, own piece stop. That handles blocking and captures in one place, and the queen becomes rook directions plus bishop directions with no code of its own.<br><br>
Now the part that actually matters. Those are <b>pseudo-legal</b> moves. Consider a white king on e1, a white bishop on e2, and a black rook on e8. The bishop has nine moves by its own rules, and every single one is illegal, because any of them opens the e-file and puts my own king in check. The bishop is pinned, and nothing about the bishop's code is wrong — deciding legality just isn't the piece's job.<br><br>
So the game filters: make the move, ask whether my king is attacked, unmake it. And 'is the king attacked' reuses the same move generator against the opponent's pieces — no new code. I'd use pseudo-legal moves there deliberately, because a pinned piece still attacks a square even though it can't move.<br><br>
I'd make and unmake rather than cloning the board. Checking game status generates every legal move for a side, which is hundreds of simulations for one call. If we later add an AI it's millions. Cloning would be the bottleneck.<br><br>
Castling and en passant need history, which is why pieces carry a hasMoved flag and the board carries the square a pawn just skipped over. That square is cleared by every other move — that's the 'only immediately' rule falling out of one line.<br><br>
One detail I like: checkmate and stalemate are the same check. Any legal moves? Is the king attacked? Those two booleans give all four states, so there's no separate stalemate logic."
</div>

---

## 17. Follow-ups — undo, AI, performance

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "కొత్త పావు (Archbishop)" | `class Archbishop extends Piece` — bishop dirs + knight steps | **+1 కొత్తది, 0 edits** |
| "Undo కావాలి" | `#history` ఇప్పటికే ఉంది; `Move` ని ఒక పూర్తి object చేయాలి — కింద చూడండి | Move + Game |
| "PGN notation" | ఒక వేరే `Notation` class — core ని తాకదు | **+1 కొత్తది** |
| "50-move rule, repetition" | చరిత్రలో position hashes — Zobrist hashing | Game |
| "వేరే board size (9×9)" | `Board` lo 8 hardcoded ఉంది → ఒక parameter | Board |
| "AI ఆడాలి" | కింద చూడండి | **0** — design ఇప్పటికే సిద్ధం |

### Undo

> *"ఇప్పుడు `#history` lo `{from, to, piece, captured}` మాత్రమే ఉంది — అది undo కి **సరిపోదు**. Castling అయితే rook కూడా కదిలింది. Promotion అయితే pawn పోయి queen వచ్చింది. En passant అయితే తిన్న pawn వేరే గడిలో ఉంది.*
>
> *కాబట్టి `Move` ఒక పూర్తి object కావాలి — ఏమి కదిలింది, ఏమి తిన్నది, **ఎక్కడి నుంచి**, ఏ ప్రత్యేక నియమం వర్తించింది, మరియు `hasMoved` ముందు ఏమిటి. అది ఉంటే undo అనేది కేవలం ఆ object ని తిరగబడి అమలు చేయడం — **ఇదే Command pattern**.*
>
> *గమనించండి — `#simulate` ఇప్పటికే ఈ పని చేస్తోంది, తాత్కాలికంగా. Undo అంటే దాన్ని **శాశ్వతం** చేయడం."*

### AI

> *"Minimax కి కావలసినవి రెండే: కదలికలు తయారుచేయడం, మరియు వేగంగా make/unmake. **రెండూ ఇప్పటికే ఉన్నాయి** — `allLegalMoves` మరియు `#simulate`. ఒక evaluation function (పావుల విలువ + స్థానం) చేర్చితే minimax + alpha-beta నేరుగా పైన కూర్చుంటుంది.*
>
> *ఇది ఒక మంచి సంకేతం: **మనం AI గురించి ఆలోచించకుండానే దానికి సరిపోయే design వచ్చింది**, ఎందుకంటే §8 lo copy కి బదులు make/unmake ఎంచుకున్నాం."*

### Performance

> *"నా `isAttacked` శత్రు పావులన్నిటి కదలికలనీ తయారుచేస్తుంది — అది వృథా. నిజమైన engines **తిరగబడి** చూస్తాయి: రాజు గడి నుంచి బయటికి కిరణాలు పంపి, అక్కడ శత్రు rook/bishop/queen ఉందా అని చూస్తాయి. అది చాలా వేగవంతం.*
>
> *అలాగే **bitboards** — 64 గడులు ఒక 64-bit సంఖ్యలో, మరియు కదలికలు bitwise operations. నా design కంటే వందల రెట్లు వేగం. కానీ అది చదవడానికి చాలా కష్టం, మరియు **interview lo స్పష్టత ముఖ్యం**. నేను ఈ రూపాన్నే ఎంచుకుంటాను, మరియు optimisation మార్గాన్ని చెప్తాను."*

---

## 18. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **తప్పు signature ఒక design ని బంధిస్తుంది** | `canMove(from,to)` (§4) | ఏ API design lo అయినా |
| **"చేయగలదు" ≠ "చేయొచ్చు"** | Pseudo-legal vs legal (§6) | Permissions, validation, business rules |
| **నియమాలని పొరలుగా విడదీయడం** | పావు / board / ఆట (§1) | Validation layers, middleware |
| **Make / unmake vs copy** | `#simulate` (§8) | Transactions, undo, backtracking, DP |
| **కొన్ని నియమాలకి చరిత్ర కావాలి** | Castling, en passant (§9) | Session state, audit, event sourcing |
| **రకం మారడం = వస్తువు మారడం** | Promotion (§12) | State pattern, polymorphic replace |
| **రెండు ప్రశ్నలు → నాలుగు స్థితులు** | `status()` (§13) | State machines, truth tables |

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b>.<br><br>
<b>Tic-Tac-Toe తో పోల్చండి</b> (<code>LLD_Design_Problems_Telugu.pdf</code> Problem 17). అక్కడ కూడా ఒక board, ఒక turn, ఒక win check. కానీ అక్కడ "ఈ కదలిక చెల్లుతుందా?" అనేది <b>ఒక్క పంక్తి</b> — ఆ గడి ఖాళీయేనా. ఇక్కడ అది <b>ఒక మొత్తం పొర</b>. అదే తేడా ఈ problem ని Medium నుంచి Hard కి తీసుకెళ్తుంది, మరియు అదే interviewer కొలిచేది.<br><br>
వేగవంతమైన revision కోసం — <code>LLD_Design_Problems_Telugu.pdf</code> lo Problem 11. Polymorphism పునాది కోసం — <code>OOPS_Telugu.pdf</code> §11. State pattern కోసం — <code>LLD_Telugu.pdf</code> §28.
</div>

---

_Chess — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి board, ప్రతి output నిజంగా `node` lo run చేసి తీసినవే ✅_
