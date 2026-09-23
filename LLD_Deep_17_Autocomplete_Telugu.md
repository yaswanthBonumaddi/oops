<!-- style: editorial -->
<!-- footer: Autocomplete · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">17</div>
<div class="kicker">Deep Dive 17 · ప్రతి అక్షరానికీ ఒక శోధన</div>
<div class="rule"></div>
<div class="cover-title">Design<br>Autocomplete</div>
<div class="lede">Google · Amazon · Flipkart · Swiggy — search box lo ప్రతి అక్షరం ఒక ప్రశ్న, మరియు జవాబు <b>50 ms లోపల</b> రావాలి.</div>
<div class="sub">నిజమైన 2,34,428-పదాల నిఘంటువుతో కొలిచినవి. మొదటి విరుపు "hel" కి <b>helbeh, helcoid, helcology</b> అని సూచిస్తుంది. రెండోది ఒక్కో అక్షరానికీ <b>2.34 లక్షల పదాలని</b> తాకుతుంది. మూడోది ఒక పదం <b>trending అయినా గమనించదు.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 17</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. **ఈ doc lo ఒక తేడా ఉంది** — ఇక్కడి డేటా కృత్రిమమైనది కాదు.

<div class="box">
<div class="lab">నిజమైన నిఘంటువు</div>
ప్రతి macOS మరియు Linux యంత్రంలో <code>/usr/share/dict/words</code> అనే file ఉంటుంది. నా దగ్గర అది <b>2,35,976 పదాలు</b>. Lowercase చేసి, రెండు అక్షరాల కంటే తక్కువవి తీసేసి, <b>నకిలీలు తొలగించాక 2,34,428</b> మిగిలాయి.<br><br>
(ఆ నకిలీల కథ §4 lo ఉంది — అవి ఒక నిజమైన bug ని బయటపెట్టాయి.)<br><br>
<b>ప్రజాదరణ మాత్రం కృత్రిమమైనది</b> — నా దగ్గర Google శోధన గణాంకాలు లేవు, కాబట్టి సాధారణ ఆంగ్ల పదాలకి ఎక్కువ, మిగతావాటికి Zipf తోక ఇచ్చాను. అది ఒక ఊహ, మరియు దాన్ని ఇక్కడ స్పష్టంగా చెప్తున్నాను.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు ఇక్కడ రెండు ప్రశ్నలు ఉన్నాయి
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: తప్పు ఐదు**

3. Step — `filter` + `slice` · పదిహేను అక్షరాలు
4. **మొదటి విరుపు** — "hel" → helbeh, helcoid, helcology
5. Step — ప్రజాదరణ ప్రకారం క్రమబద్ధీకరణ

**Part 3 — రెండో విరుపు: ప్రతి అక్షరానికీ మొత్తం నిఘంటువు**

6. Step — కొలిచి చూద్దాం
7. **రెండో విరుపు** — 5 సూచనలకి 2,34,428 పదాలు
8. Step — Trie · prefix ని నడవడం, వెతకడం కాదు

**Part 4 — మూడో విరుపు: దాచిన జవాబు పాతబడింది**

9. Step — ప్రతి node వద్దా top-5 ని దాచడం
10. **మూడో విరుపు** — helicopter trending అయింది, ఎవరూ గమనించలేదు
11. Step — మారిన దారిని మాత్రమే మళ్ళీ కట్టడం

**Part 5 — పూర్తి system**

12. Step — పరీక్ష ఒక bug ని దాచింది
13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — అక్షర దోషాలు, వ్యక్తిగతీకరణ, scale
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు ఇక్కడ రెండు ప్రశ్నలు ఉన్నాయి

> *"Design a search autocomplete system. As the user types, show the top suggestions for what they've typed so far."*

ఇందులో రెండు వేర్వేరు ప్రశ్నలు దాగి ఉన్నాయి, మరియు **చాలా మంది రెండోదాన్ని అస్సలు చూడరు**:

<div class="fig">
<div class="cap">"Top suggestions" — రెండు పదాలు, రెండు problems</div>
<svg viewBox="0 0 750 290"><text class="t-xs" x="0" y="14">ఒకటి వేగం గురించి · రెండోది నాణ్యత గురించి</text><rect class="n-info" x="0" y="26" width="360" height="116" rx="4"/><text class="t mid" x="180" y="50">"suggestions" — <tspan class="t-acc">వేగం</tspan></text><text class="t-sm mid" x="180" y="76">ప్రతి keystroke ఒక శోధన</text><text class="t-sm mid" x="180" y="96">"hello" అంటే <tspan class="t-acc">ఐదు</tspan> శోధనలు</text><text class="t-sm mid" x="180" y="116">ప్రతిదీ 50 ms లోపల</text><text class="t-acc mid" x="180" y="136">→ §7 · 2.29 ms × QPS</text><rect class="n-acc" x="390" y="26" width="360" height="116" rx="4"/><text class="t-w mid" x="570" y="50">"top" — <tspan class="t-acc">నాణ్యత</tspan></text><text class="t-w-sm mid" x="570" y="76">ఏ ఐదు? ఎందుకు ఆ ఐదు?</text><text class="t-w-sm mid" x="570" y="96">ఇది ఒక <tspan class="t-acc">ర్యాంకింగ్</tspan> problem —</text><text class="t-w-sm mid" x="570" y="116">వెతకడం problem కాదు</text><text class="t-w-sm mid" x="570" y="136">→ §4 · <tspan class="t-acc">helbeh, helcoid</tspan></text><rect class="n-bad" x="0" y="158" width="750" height="128" rx="4"/><text class="t mid" x="375" y="182">మరియు అవి ఒకదానికొకటి ఎదురుగా ఉంటాయి</text><text class="t-sm mid" x="375" y="206">ర్యాంకింగ్ <tspan class="t-acc">ఖరీదు పెంచుతుంది</tspan> — ఐదు ఇవ్వాలంటే ముందు అన్నిటినీ క్రమబద్ధీకరించాలి.</text><text class="t-sm mid" x="375" y="228">వేగం కోసం జవాబులని <tspan class="t-acc">దాచితే</tspan> — ప్రజాదరణ మారినప్పుడు అవి పాతబడతాయి (§10).</text><text class="t-sm mid" x="375" y="254">కాబట్టి ఈ problem యొక్క నిజమైన ఆకారం: <tspan class="t-acc">వేగం ↔ తాజాదనం</tspan> అనే వ్యాపారం.</text><text class="t-sm mid" x="375" y="278">Interview lo ఆ వ్యాపారాన్ని పేరు పెట్టి చెప్పడమే సగం జవాబు.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **ఎన్ని సూచనలు? (5? 10?)** | K చిన్నది అంటే **ప్రతి node వద్దా దాచొచ్చు** (§9) |
| **సూచనలని దేని ప్రకారం క్రమబద్ధీకరించాలి?** | **ఇదే §4** — "top" అంటే ఏమిటో నిర్వచించకపోతే జవాబు అర్ధరహితం |
| **ఎన్ని పదాలు / queries?** | §7 — లక్షల్లో అంటే scan పనికిరాదు |
| **ప్రజాదరణ ఎంత తరచుగా మారుతుంది?** | **అత్యంత ముఖ్యమైన ప్రశ్న** — §10 lo cache నిర్ణయాన్ని ఇదే నిర్ణయిస్తుంది |
| **అక్షర దోషాలు క్షమించాలా? ("gogle" → "google")** | అవును అంటే **పూర్తిగా వేరే structure** (§16) |
| **ఒక్కో user కి వేరే సూచనలా?** | అవును అంటే వ్యక్తిగత layer (§16) |
| **మధ్యలో సరిపోయే పదాలు? ("book" → "facebook")** | అవును అంటే trie సరిపోదు (§16) |

<div class="box warn">
<div class="lab">రెండో ప్రశ్న అడగకపోతే మీ జవాబు తప్పు — మరియు అది మీకు తెలియదు</div>
<i>"సూచనలని దేని ప్రకారం క్రమబద్ధీకరించాలి?"</i><br><br>
చాలా మంది దీన్ని అడగరు, ఎందుకంటే "top 5" అనేది స్పష్టంగా అనిపిస్తుంది. వారు <code>filter(...).slice(0, 5)</code> రాస్తారు.<br><br>
కానీ <code>slice</code> ఇచ్చేది <b>మొదటి ఐదు</b> — <i>ఉత్తమ ఐదు</i> కాదు. నిఘంటువు అక్షర క్రమంలో ఉంటే, "hel" అని type చేస్తే మీకు <b>helbeh, helcoid, helcology</b> వస్తాయి.<br><br>
Code lo ఏ bug లేదు. Test pass అవుతుంది. <b>ఉత్పత్తి మాత్రం పనికిరానిది.</b>
</div>

---

# Part 2 — మొదటి విరుపు: తప్పు ఐదు

---

## 3. Step — `filter` + `slice` · పదిహేను అక్షరాలు

```javascript
class Autocomplete {
  constructor(words = []) { this.words = words; }
  add(w) { this.words.push(w); }
  suggest(prefix, k = 5) {
    return this.words
      .filter(w => w.startsWith(prefix))
      .slice(0, k);
  }
}
```

చిన్న ఉదాహరణతో ఇది **పరిపూర్ణంగా** పనిచేస్తుంది:

```
  "ca" → [ 'cat', 'car', 'card', 'care', 'careful' ]
  "car" → [ 'car', 'card', 'care', 'careful', 'cart' ]
  "do" → [ 'dog', 'do', 'door' ]
  "z" → []
```

ఇప్పుడు **నిజమైన నిఘంటువు** — 2,34,428 పదాలు — పెట్టి చూద్దాం.

---

## 4. మొదటి విరుపు — "hel" → helbeh, helcoid, helcology

```
  "car"
    మొదటి 5   : car, cara, carabao, carabeen, carabid
  "fa"
    మొదటి 5   : fa, faba, fabaceae, fabaceous, fabella
  "hel"
    మొదటి 5   : helbeh, helcoid, helcology, helcoplasty, helcosis
  "ind"
    మొదటి 5   : ind, indaba, indaconitine, indagate, indagation
```

<div class="box warn">
<div class="lab">మొదటి విరుపు — "hello" అనే పదమే జాబితాలో లేదు</div>
User "hel" అని టైప్ చేశాడు. అతనికి కావాల్సినది స్పష్టంగా <b>hello, help, held</b>.<br><br>
System ఇచ్చినది: <b>helbeh, helcoid, helcology, helcoplasty, helcosis</b> — ఇవి అన్నీ నిజమైన పదాలే, కానీ ఏ ఒక్కరూ వీటిని వెతకరు.<br><br>
<b>మౌలిక తప్పు:</b> <code>slice(0, 5)</code> అనేది "ఉత్తమ ఐదు" కాదు — అది "నిఘంటువులో ముందు కనిపించిన ఐదు". మరియు నిఘంటువు <b>అక్షర క్రమంలో</b> ఉంది, కాబట్టి జవాబు ఎప్పుడూ <b>అక్షరక్రమంలో మొదటివి</b> — అంటే దాదాపు ఎప్పుడూ అరుదైన పదాలు.<br><br>
ఇది ఒక performance bug కాదు, ఒక crash కాదు. <b>ఇది నిశ్శబ్దంగా పనికిరాని ఉత్పత్తి.</b>
</div>

### మరియు ఒక చిన్న కథ — నకిలీలు

నిఘంటువుని lowercase చేశాక ఒక విషయం గమనించాను:

```
  ముడి పదాలు      : 2,35,976
  lowercase తర్వాత: 2,35,922
  ప్రత్యేకమైనవి    : 2,34,428
  నకిలీలు         : 1,494
  ఉదాహరణలు       : abelite, abigail, abu, academic, acoma, ...
```

**1,494 నకిలీలు** — "Abigail" మరియు "abigail" రెండూ ఉన్నాయి, lowercase చేశాక ఒకటే.

<div class="note">నేను దీన్ని ఎలా కనుగొన్నాను? — <b>trie ని scan తో పోల్చినప్పుడు</b>. Trie <code>part</code> అని ఇచ్చింది, scan <code>part, part</code> అని ఇచ్చింది. మొదట trie lo bug ఉందనుకున్నాను. నిజానికి <b>scan ఒకే సూచనని రెండుసార్లు</b> ఇస్తోంది — ఎందుకంటే డేటాలో ఆ పదం రెండుసార్లు ఉంది.<br><br>
Trie సహజంగానే నకిలీలని తొలగిస్తుంది (ఒక పదం = ఒక node). Scan తొలగించదు. <b>ఇది naive version యొక్క మూడో లోపం</b> — మరియు ఇది <b>డేటా వల్ల</b> వచ్చింది, code వల్ల కాదు.</div>

---

## 5. Step — ప్రజాదరణ ప్రకారం క్రమబద్ధీకరణ

"Top" అంటే ఏమిటో **నిర్వచించాలి**. Autocomplete lo అది దాదాపు ఎప్పుడూ **శోధన సంఖ్య**:

```javascript
const best5 = (prefix, k = 5) =>
  words.filter(w => w.startsWith(prefix))
       // ప్రజాదరణ, ఆపై అక్షరక్రమం
       .sort((a, b) => count(b) - count(a) || a.localeCompare(b))
       .slice(0, k);
```

ఆ `|| a.localeCompare(b)` ముఖ్యం — **సమాన ప్రజాదరణ ఉన్నవాటికి ఒక నిర్ణయాత్మక క్రమం**. లేకపోతే సూచనలు కారణం లేకుండా మారుతూ ఉంటాయి (Deep Dive 13 §10 lo చూసిన అదే సమస్య).

```
  "car"
    మొదటి 5   : car, cara, carabao, carabeen, carabid
    సరైన 5    : car, card, care, careful, carry
  "fa"
    మొదటి 5   : fa, faba, fabaceae, fabaceous, fabella
    సరైన 5    : father, family, face, fact, factory
  "hel"
    మొదటి 5   : helbeh, helcoid, helcology, helcoplasty, helcosis
    సరైన 5    : hello, help, helbeh, helcosis, helepole
  "ind"
    మొదటి 5   : ind, indaba, indaconitine, indagate, indagation
    సరైన 5    : india, index, indian, ind, indagatory
```

**ఇప్పుడు జవాబులు అర్ధవంతంగా ఉన్నాయి.** కానీ...

---

# Part 3 — రెండో విరుపు: ప్రతి అక్షరానికీ మొత్తం నిఘంటువు

---

## 6. Step — కొలిచి చూద్దాం

ఒక ముఖ్యమైన వివరం: **autocomplete ప్రతి keystroke కీ నడుస్తుంది**. User "helicopter" అని టైప్ చేస్తే అది **పది శోధనలు**, ఒక్కటి కాదు.

200 యాదృచ్ఛిక పదాలని అక్షరం అక్షరంగా టైప్ చేద్దాం — అది **1,515 keystrokes**:

```javascript
const typed = [];
for (let i = 0; i < 200; i++) {
  const w = ALL[Math.floor(rand() * ALL.length)];
  for (let n = 1; n <= Math.min(w.length, 8); n++) typed.push(w.slice(0, n));
}
```

---

## 7. రెండో విరుపు — 5 సూచనలకి 2,34,428 పదాలు

```
1,515 keystrokes
  ranked scan : 3463 ms → 2.29 ms/keystroke
  ఒక్కో keystroke కి తాకిన పదాలు: 2,34,428

  prefix పొడవు  |  సరిపోయే పదాలు (సగటున)
  --------------+------------------------
              1 |                 15,025
              2 |                  3,703
              3 |                    597
              4 |                    143
              5 |                     62
```

<div class="fig">
<div class="cap">ఒక్కో keystroke · జవాబు 5, పని 2.34 లక్షలు</div>
<svg viewBox="0 0 750 226"><text class="t-xs" x="0" y="14">ప్రతి అక్షరానికీ మొత్తం నిఘంటువుని చదువుతున్నాం</text><rect class="n-dark" x="0" y="30" width="704" height="24" rx="3"/><text class="t-w-sm" x="12" y="47">2,34,428 పదాలని తాకాం</text><rect class="n-acc" x="0" y="62" width="45" height="24" rx="3"/><text class="t-sm" x="57" y="79">15,025 సరిపోయాయి (ఒక అక్షరం prefix కి)</text><rect class="n-good" x="0" y="94" width="3" height="24" rx="1"/><text class="t-sm" x="16" y="111">5 చూపించాం</text><rect class="n-bad" x="0" y="132" width="750" height="90" rx="4"/><text class="t-sm mid" x="375" y="156">ఒక్క user కి <tspan class="t-acc">2.29 ms</tspan> — అది భరించదగినది.</text><text class="t-sm mid" x="375" y="178">కానీ ఒక search engine సెకనుకి <tspan class="t-acc">10,000 queries</tspan> చూస్తుంది.</text><text class="t-sm mid" x="375" y="200">2.29 ms × 10,000 = <tspan class="t-acc">సెకనుకి 23 సెకన్ల CPU</tspan>. అంటే 23 servers, ఒక్క search box కోసం.</text><text class="t-sm mid" x="375" y="218">మరియు నిఘంటువు పెరిగితే ఆ సంఖ్య నేరుగా పెరుగుతుంది.</text></svg>
</div>

<div class="box warn">
<div class="lab">రెండో విరుపు — prefix ఒక filter అయింది, ఒక దారి కాలేదు</div>
User "h" అని టైప్ చేశాడు. System <b>2,34,428 పదాలని</b> చదివి, ప్రతిదాన్నీ "h తో మొదలవుతుందా?" అని అడిగింది. అందులో 15,025 అవునన్నాయి, వాటిని క్రమబద్ధీకరించి <b>ఐదు</b> చూపించింది.<br><br>
<b>మౌలిక తప్పు:</b> "hel" అనే prefix ఒక <b>దారి</b> — h, ఆపై e, ఆపై l. ఆ నిర్మాణం డేటాలో ఉంది, కానీ మనం దాన్ని <b>వాడట్లేదు</b> — ప్రతిసారీ ప్రతి పదాన్నీ మళ్ళీ చదువుతున్నాం.<br><br>
Deep Dive 12 §4 lo సరిగ్గా ఇదే ఆకారం చూశాం: path ని ఒక string గా చూస్తే, దానిలోని నిర్మాణాన్ని ప్రతిసారీ <i>తిరిగి కనుక్కోవాలి</i>.
</div>

---

## 8. Step — Trie · prefix ని నడవడం, వెతకడం కాదు

<div class="fig">
<div class="cap">Trie · ప్రతి అక్షరం ఒక అడుగు</div>
<svg viewBox="0 0 750 246"><text class="t-xs" x="0" y="14">"hel" కి చేరడం = మూడు అడుగులు, 2,34,428 పోలికలు కాదు</text><circle class="n-dark" cx="90" cy="60" r="16"/><text class="t-w-sm mid" x="90" y="65">•</text><line class="ln-acc" x1="108" y1="60" x2="152" y2="60" marker-end="url(#aa)"/><circle class="n-acc" cx="172" cy="60" r="16"/><text class="t-w-sm mid" x="172" y="65">h</text><line class="ln-acc" x1="190" y1="60" x2="234" y2="60" marker-end="url(#aa)"/><circle class="n-acc" cx="254" cy="60" r="16"/><text class="t-w-sm mid" x="254" y="65">e</text><line class="ln-acc" x1="272" y1="60" x2="316" y2="60" marker-end="url(#aa)"/><circle class="n-acc" cx="336" cy="60" r="16"/><text class="t-w-sm mid" x="336" y="65">l</text><text class="t-acc" x="364" y="52">ఇక్కడ ఆగాం — 3 అడుగులు</text><text class="t-sm" x="364" y="72">ఇక్కడి నుంచి కిందంతా "hel" తోనే మొదలవుతుంది</text><line class="ln" x1="336" y1="78" x2="270" y2="112"/><line class="ln" x1="336" y1="78" x2="336" y2="112"/><line class="ln" x1="336" y1="78" x2="402" y2="112"/><circle class="n-good" cx="270" cy="128" r="15"/><text class="t-sm mid" x="270" y="133">b</text><circle class="n-good" cx="336" cy="128" r="15"/><text class="t-sm mid" x="336" y="133">l</text><circle class="n-good" cx="402" cy="128" r="15"/><text class="t-sm mid" x="402" y="133">p</text><text class="t-sm" x="430" y="133">… ఇంకా 49,000 nodes</text><rect class="n-bad" x="0" y="160" width="750" height="80" rx="4"/><text class="t-sm mid" x="375" y="184">Node ని కనుక్కోవడం <tspan class="t-acc">3 అడుగులు</tspan>. కానీ ఉత్తమ ఐదు తెలియాలంటే —</text><text class="t-sm mid" x="375" y="206">ఆ node కింద ఉన్న <tspan class="t-acc">ప్రతి పదాన్నీ</tspan> చూసి క్రమబద్ధీకరించాలి.</text><text class="t-sm mid" x="375" y="230">ఒక అక్షరం prefix కి అది <tspan class="t-acc">49,107 nodes</tspan>. సమస్య సగమే పరిష్కారమైంది.</text></svg>
</div>

```javascript
class TrieNode {
  constructor() { this.kids = new Map(); this.word = null; this.count = 0; }
}
class Trie {
  constructor() { this.root = new TrieNode(); this.nodes = 1; }
  insert(word, count = 1) {
    let cur = this.root;
    for (const ch of word) {
      if (!cur.kids.has(ch)) { cur.kids.set(ch, new TrieNode()); this.nodes++; }
      cur = cur.kids.get(ch);
    }
    cur.word = word; cur.count = count;
  }
  nodeFor(prefix) {                              // O(prefix పొడవు)
    let cur = this.root;
    for (const ch of prefix) {
      cur = cur.kids.get(ch);
      if (!cur) return null;
    }
    return cur;
  }
  // ఆ node కింద ఉన్న పదాలని సేకరించి, ప్రజాదరణ ప్రకారం top-k
  suggest(prefix, k = 5) {
    const start = this.nodeFor(prefix);
    if (!start) return { words: [], visited: 0 };
    const found = []; let visited = 0;
    const walk = (n) => {
      visited++;
      if (n.word) found.push([n.word, n.count]);
      for (const c of n.kids.values()) walk(c);
    };
    walk(start);
    found.sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0]));
    return { words: found.slice(0,k).map(x=>x[0]), visited };
  }
}
```

```
plain trie (7,58,880 nodes)
  691 ms → 0.46 ms/keystroke · 8,550 nodes/keystroke

  prefix పొడవు  |  చూసిన nodes (సగటున)
  --------------+----------------------
              1 |               49,107
              2 |               12,635
              3 |                2,191
              4 |                  529
              5 |                  249
              6 |                   44
```

**2.29 ms → 0.46 ms**, ఐదు రెట్లు వేగం. కానీ ఆ మొదటి వరుస చూడండి: **ఒక అక్షరం prefix కి 49,107 nodes**.

<div class="box warn">
<div class="lab">సగం పరిష్కారం — మరియు మిగిలిన సగమే ముఖ్యమైనది</div>
Trie <b>node ని కనుక్కోవడాన్ని</b> పరిష్కరించింది — మూడు అక్షరాల prefix కి మూడు అడుగులు.<br><br>
కానీ <b>ఉత్తమ ఐదు ఏవో తెలుసుకోవడాన్ని</b> అది పరిష్కరించలేదు. ఆ node కింద ఉన్నవన్నీ చూడాలి.<br><br>
<b>మరియు ఇది అతి ముఖ్యమైన చోట చెడ్డది:</b> user టైప్ చేసే <b>మొదటి అక్షరం</b> — అప్పుడే అతను ఎక్కువగా ఎదురుచూస్తాడు, మరియు అప్పుడే మనం 49,107 nodes నడుస్తున్నాం. Prefix పొడవు పెరిగితే ఖర్చు తగ్గుతుంది — అంటే <b>ఖర్చు సరిగ్గా తిరగబడి ఉంది</b>.
</div>

---

# Part 4 — మూడో విరుపు: దాచిన జవాబు పాతబడింది

---

## 9. Step — ప్రతి node వద్దా top-5 ని దాచడం

ఇక్కడ ఒక కీలకమైన గమనిక: **K చిన్నది** (5), మరియు **ఒక node యొక్క top-5 దాని పిల్లల top-5 ల నుంచి మాత్రమే రాగలదు**.

> ఎందుకు? — ఒక పదం ఒక child యొక్క subtree lo 6వ స్థానంలో ఉంటే, **అదే subtree lo దాన్ని ఓడించే ఐదు పదాలు** ఉన్నాయి. ఆ ఐదూ parent యొక్క subtree lo కూడా ఉన్నాయి. కాబట్టి ఆ 6వ పదం parent యొక్క top-5 lo **ఎప్పటికీ ఉండదు**.

అంటే top-5 ని **కింది నుంచి పైకి ఒకేసారి కట్టొచ్చు**, ప్రతి node వద్దా కేవలం ఐదు entries నిల్వ చేస్తూ:

```javascript
// రెండు క్రమబద్ధమైన top-K జాబితాలని కలిపి, మళ్ళీ top-K
function merge(a, b, k = K) {
  const out = []; let i = 0, j = 0;
  while (out.length < k && (i < a.length || j < b.length)) {
    if (j >= b.length) out.push(a[i++]);
    else if (i >= a.length) out.push(b[j++]);
    else {
      const [wa, ca] = a[i], [wb, cb] = b[j];
      out.push(cb > ca || (cb === ca && wb < wa) ? b[j++] : a[i++]);
    }
  }
  return out;
}

#recompute(n) {
  let top = n.word ? [[n.word, n.count]] : [];
  for (const kid of n.kids.values()) top = merge(top, kid.top, this.k);
  n.top = top;
}
```

`suggest` ఇప్పుడు **ఒక నడక, ఒక slice**:

```javascript
suggest(prefix, k = this.k) {
  let cur = this.#root;
  for (const ch of prefix) {
    cur = cur.kids.get(ch);
    if (!cur) return [];
  }
  return cur.top.slice(0, k).map(([w]) => w);
}
```

**0.46 ms → 0.2 µs.** ఒక్కో keystroke కి **4.4 nodes** మాత్రమే — prefix పొడవు అంతే.

---

## 10. మూడో విరుపు — helicopter trending అయింది, ఎవరూ గమనించలేదు

ఒక పదం ఒక్కసారిగా ప్రజాదరణ పొందింది:

```javascript
const n = nodeFor('helicopter');
n.count = 9_000_000;              // జాబితాలో అందరికంటే ఎక్కువ
```

```
ఇప్పుడు "hel" సూచనలు:
   hello, help, helbeh, helcosis, helepole

--- "helicopter" ఒక్కసారిగా trending అయింది ---
  పాత count : 3
  కొత్త count: 90,00,000 (జాబితాలో అందరికంటే ఎక్కువ)

  "hel" సూచనలు ఇప్పుడు:
   hello, help, helbeh, helcosis, helepole
  "helicopter" ఉందా? లేదు ✗

  "helicopte" (ఆ node కి సరిగ్గా పైన): helicopter
```

<div class="box warn">
<div class="lab">మూడో విరుపు — దాచిన జవాబు సమయంలో గడ్డకట్టుకుపోయింది</div>
"helicopter" ఇప్పుడు <b>మొత్తం నిఘంటువులో అత్యధికంగా వెతికే పదం</b>. కానీ "hel" అని టైప్ చేస్తే అది కనిపించదు.<br><br>
మరియు చివరి పంక్తి చూడండి: <b>"helicopte" కి అది కనిపిస్తోంది</b> — ఎందుకంటే ఆ node యొక్క top-5 lo దాని <i>సొంత</i> పదం ఉంది. కానీ దాని <b>పూర్వీకులు</b> ఎవరూ తెలుసుకోలేదు.<br><br>
<b>మౌలిక తప్పు:</b> మనం ఒక <b>ఉత్పన్న విలువని నిల్వ చేశాం</b> (top-5), కానీ దాని <b>మూలం మారినప్పుడు దాన్ని సరిచేసే మార్గం</b> రాయలేదు. Cache అంటే అదే — మరియు ప్రతి cache కి ఒక <b>invalidation కథ</b> ఉండాలి.<br><br>
Deep Dive 15 §16 lo directory size cache గురించి ఇదే చెప్పాం: <i>"cache ఒక సులభమైన జవాబులా కనిపిస్తుంది, కానీ అది ఒక కొత్త స్థిరత్వ సమస్యని పుట్టిస్తుంది."</i> ఇక్కడ అది నిజంగా జరిగింది.
</div>

---

## 11. Step — మారిన దారిని మాత్రమే మళ్ళీ కట్టడం

పరిష్కారం సూటిది: ఒక పదం count మారితే, **root నుంచి ఆ పదం వరకు ఉన్న దారిలోని nodes మాత్రమే** మారగలవు. వాటిని కింది నుంచి పైకి మళ్ళీ కట్టడం:

```javascript
bump(word, delta = 1) {
  const path = this.#path(word, false);
  if (!path) return { ok: false, reason: `NOT_FOUND: ${word}` };
  const leaf = path[path.length - 1];
  if (leaf.word === null) return { ok: false, reason: `NOT_A_WORD: ${word}` };
  leaf.count += delta;
  for (let i = path.length - 1; i >= 0; i--) this.#recompute(path[i]);
  return { ok: true, count: leaf.count };
}
```

**ఖర్చు:** దారి పొడవు × (పిల్లల సంఖ్య × K). "helicopter" కి అది 10 nodes — మొత్తం 7,58,880 కాదు.

```
  helicopter trending → { ok: true, count: 9000003 }
  "hel" ఇప్పుడు → helicopter, hello, help, helbeh, helcosis
  "h"   ఇప్పుడు → helicopter, he, his, have, had
```

**"h" వద్ద కూడా** కనిపిస్తోంది — దారి మొత్తం root వరకు సరిచేయబడింది.

<div class="box">
<div class="lab">మరియు ఇక్కడ ఒక వ్యాపారం ఉంది — దాన్ని పేరు పెట్టి చెప్పండి</div>
ఇప్పుడు <b>ప్రతి insert కూడా</b> దారిని మళ్ళీ కడుతుంది. మొదటి loading lo అది ఖరీదు:<br><br>
<code>&nbsp;&nbsp;ఒక్కొక్కటిగా insert : 851–929 ms</code><br>
<code>&nbsp;&nbsp;loadAll (bulk)&nbsp;&nbsp;&nbsp;&nbsp; : 194–291 ms&nbsp;&nbsp;→ 3–4× వేగం</code><br><br>
అందుకే <b>రెండు దారులు</b> ఉన్నాయి: <code>loadAll</code> అన్నీ చేర్చి <b>చివర్లో ఒకేసారి</b> కడుతుంది (మొదటి loading కి), మరియు <code>insert</code>/<code>bump</code> దారిని <b>వెంటనే</b> సరిచేస్తాయి (నడుస్తున్న system కి).<br><br>
<b>ఇది ఒక సాధారణ నమూనా:</b> bulk load మరియు incremental update వేర్వేరు మార్గాలు. ఒక్కటే రాస్తే, ఏదో ఒకటి తప్పకుండా నెమ్మదవుతుంది.
</div>

---

# Part 5 — పూర్తి system

---

## 12. Step — పరీక్ష ఒక bug ని దాచింది

`bump`, `insert`, `remove` — మూడూ cache ని సరిచేయాలి. దాన్ని ఎలా నమ్మాలి? — **fuzz test**: 2,000 యాదృచ్ఛిక మార్పుల తర్వాత, trie యొక్క ప్రతి జవాబునీ ఒక సాదా reference తో పోల్చడం.

మొదటిసారి నడిపినప్పుడు **12 తేడాలు** వచ్చాయి:

```
  "d"
    trie: do|down|day|did|dogmatism
    scan: do|down|day|did|dracocephalum
```

నేను వెంటనే `merge` lo bug ఉందని అనుకున్నాను. కానీ ఆ ఖచ్చితమైన operation ని వెతికితే:

```
op #1182: [ 'bump', 'dracocephalum', 982706 ]
```

```javascript
// నా test lo ఉన్నది:
ac.bump(w, d);                        // ← తిరిగి వచ్చిన విలువని చూడలేదు
live.set(w, (live.get(w) ?? 0) + d);
```

<div class="box warn">
<div class="lab">Bug code lo లేదు — అది <i>పరీక్షలో</i> ఉంది</div>
ఆ పదం కొన్ని operations ముందు <b>తొలగించబడింది</b>. కాబట్టి:<br><br>
<code>&nbsp;&nbsp;bump ఉన్న పదం&nbsp;&nbsp; : { ok: true, count: 150 }</code><br>
<code>&nbsp;&nbsp;తీసేశాక bump&nbsp;&nbsp;&nbsp; : { ok: false, reason: 'NOT_FOUND: dracocephalum' }</code><br><br>
<code>bump</code> <b>సరిగ్గానే</b> తిరస్కరించింది. కానీ నా పరీక్ష ఆ తిరస్కరణని <b>విస్మరించి</b>, reference lo ఆ పదాన్ని తిరిగి చేర్చింది. అప్పటినుంచి reference తప్పు, trie సరైనది — మరియు పరీక్ష <b>trie ని నిందించింది</b>.<br><br>
<b>పాఠం:</b> ఒక fuzz test ఒక operation యొక్క <b>తిరిగి వచ్చిన విలువని విస్మరిస్తే</b>, అది ఒక వేరే system ని పరీక్షిస్తోంది. మరియు అది విఫలమైనప్పుడు, <b>మీ మొదటి అనుమానం తప్పు చోట</b> ఉంటుంది.<br><br>
సరిచేశాక: <b>1,998 మార్పులు · 1,494 prefixes · సరైనది ✓</b>
</div>

---

## 13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

<div class="fig">
<div class="cap">నిర్మాణం · ప్రతి node ఒక జవాబుని పట్టుకుంటుంది</div>
<svg viewBox="0 0 750 232"><text class="t-xs" x="0" y="14">Node lo మూడు విషయాలు — అక్షరం, పదం (ఉంటే), మరియు దాచిన top-K</text><rect class="n-acc" x="235" y="26" width="280" height="48" rx="4"/><text class="t-w mid" x="375" y="46">Autocomplete</text><text class="t-w-sm mid" x="375" y="64">loadAll · insert · bump · remove · suggest</text><line class="ln-acc" x1="310" y1="78" x2="180" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="440" y1="78" x2="570" y2="104" marker-end="url(#aa)"/><rect class="n-info" x="30" y="108" width="300" height="56" rx="4"/><text class="t mid" x="180" y="130">#path(word) · §11</text><text class="t-sm mid" x="180" y="150">root నుంచి ఆ పదం వరకు nodes</text><rect class="n-good" x="420" y="108" width="300" height="56" rx="4"/><text class="t mid" x="570" y="130">#recompute(n) · §9</text><text class="t-sm mid" x="570" y="150">merge(సొంత పదం, పిల్లల top-K)</text><rect class="n-dark" x="175" y="180" width="400" height="48" rx="4"/><text class="t-w mid" x="375" y="200">Node: ch · kids · word · count · top[K]</text><text class="t-w-sm mid" x="375" y="220">top అనేది ఒక cache — §10 దాని ధర</text></svg>
</div>

```javascript
'use strict';
const K = 5;

class Node {
  constructor(ch) {
    this.ch = ch; this.kids = new Map();
    this.word = null; this.count = 0;
    this.top = [];                            // [[word, count], ...] — గరిష్ఠం K
  }
}

// రెండు క్రమబద్ధమైన top-K జాబితాలని కలిపి, మళ్ళీ top-K
function merge(a, b, k = K) {
  const out = []; let i = 0, j = 0;
  while (out.length < k && (i < a.length || j < b.length)) {
    if (j >= b.length) out.push(a[i++]);
    else if (i >= a.length) out.push(b[j++]);
    else {
      const [wa, ca] = a[i], [wb, cb] = b[j];
      out.push(cb > ca || (cb === ca && wb < wa) ? b[j++] : a[i++]);
    }
  }
  return out;
}

class Autocomplete {
  #root = new Node('');
  #nodes = 1;
  constructor(k = K) { this.k = k; }
  get size() { return this.#nodes; }

  // ---- ఒక పదం దారి; create=true అయితే లేని nodes తయారు చేస్తుంది ----
  #path(word, create = false) {
    const path = [this.#root];
    let cur = this.#root;
    for (const ch of word) {
      let next = cur.kids.get(ch);
      if (!next) {
        if (!create) return null;
        next = new Node(ch); cur.kids.set(ch, next); this.#nodes++;
      }
      path.push(next); cur = next;
    }
    return path;
  }
  // ఒక node యొక్క top-K ని దాని పిల్లల నుంచి మళ్ళీ కట్టడం
  #recompute(n) {
    let top = n.word ? [[n.word, n.count]] : [];
    for (const kid of n.kids.values()) top = merge(top, kid.top, this.k);
    n.top = top;
  }

  // ఒక్కొక్కటిగా చేర్చడం — దారిలోని top-K వెంటనే సరిచేయబడుతుంది
  insert(word, count = 1) {
    if (!word) return { ok: false, reason: 'EMPTY_WORD' };
    const path = this.#path(word, true);
    const leaf = path[path.length - 1];
    leaf.word = word; leaf.count = count;
    for (let i = path.length - 1; i >= 0; i--) this.#recompute(path[i]);
    return { ok: true };
  }

  // మొదటి loading కి — అన్నీ చేర్చి, ఆపై ఒకేసారి కింది నుంచి పైకి
  loadAll(entries) {
    for (const [word, count] of entries) {
      if (!word) continue;
      const path = this.#path(word, true);
      const leaf = path[path.length - 1];
      leaf.word = word; leaf.count = count ?? 1;
    }
    const build = (n) => {
      for (const kid of n.kids.values()) build(kid);
      this.#recompute(n);
    };
    build(this.#root);
    return { ok: true, words: entries.length, nodes: this.#nodes };
  }

  // ---- ఒక పదం ప్రజాదరణ మారింది — పూర్వీకులని మాత్రమే మళ్ళీ కట్టడం ----
  bump(word, delta = 1) {
    const path = this.#path(word, false);
    if (!path) return { ok: false, reason: `NOT_FOUND: ${word}` };
    const leaf = path[path.length - 1];
    if (leaf.word === null) return { ok: false, reason: `NOT_A_WORD: ${word}` };
    leaf.count += delta;
    for (let i = path.length - 1; i >= 0; i--) this.#recompute(path[i]);
    return { ok: true, count: leaf.count };
  }

  remove(word) {
    const path = this.#path(word, false);
    if (!path) return { ok: false, reason: `NOT_FOUND: ${word}` };
    const leaf = path[path.length - 1];
    if (leaf.word === null) return { ok: false, reason: `NOT_A_WORD: ${word}` };
    leaf.word = null; leaf.count = 0;
    for (let i = path.length - 1; i >= 0; i--) this.#recompute(path[i]);
    // ఖాళీ ఆకులని కత్తిరించడం
    for (let i = path.length - 1; i > 0; i--) {
      const n = path[i];
      if (n.kids.size || n.word) break;
      path[i-1].kids.delete(n.ch); this.#nodes--;
    }
    return { ok: true };
  }

  suggest(prefix, k = this.k) {
    let cur = this.#root;
    for (const ch of prefix) {
      cur = cur.kids.get(ch);
      if (!cur) return [];
    }
    return cur.top.slice(0, k).map(([w]) => w);
  }
}
```

```
నిఘంటువు: 2,34,428 ప్రత్యేక పదాలు

  loadAll          : 247 ms   ·  ఒక్కొక్కటిగా insert: 880 ms
  suggest          : 0.2 µs/keystroke
  nodes            : 7,58,880

  "car" → car, card, care, careful, carry
  "fa"  → father, family, face, fact, factory
  "hel" → hello, help, helbeh, helcosis, helepole
  "ind" → india, index, indian, ind, indagatory

  helicopter trending → { ok: true, count: 9000003 }
  "hel" ఇప్పుడు → helicopter, hello, help, helbeh, helcosis
  "h"   ఇప్పుడు → helicopter, he, his, have, had

loadAll తర్వాత — 1,493 prefixes · సరైనది ✓
1,998 bump/insert/remove తర్వాత — 1,494 prefixes · సరైనది ✓
```

### మూడు కొలతలని పక్కపక్కన పెడితే

| | ఒక్కో keystroke ఖర్చు | సమయం |
|---|---|---|
| **§7 · ranked scan** | 2,34,428 పదాలు | 2.29 ms |
| **§8 · plain trie** | 8,550 nodes (1-అక్షరం: 49,107) | 0.46 ms |
| **§13 · cached top-K** | **4.4 nodes** | **0.2 µs** |

**2.29 ms → 0.2 µs.** దాదాపు పదకొండు వేల రెట్లు — మరియు జవాబులు **అక్షరాలా ఒకటే**.

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `filter` + `slice` | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | `count` మరియు `sort` | "hel" → helbeh, helcoid |
| §5 | `localeCompare` tiebreak | సమాన ప్రజాదరణకి స్థిర క్రమం |
| §7 (విరుపు) | `Trie` | ఒక్కో keystroke కి 2.34 లక్షల పదాలు |
| §8 | — | Trie కేవలం సగం పరిష్కారం |
| §9 | `top[K]` ప్రతి node వద్దా | 1-అక్షరం prefix కి 49,107 nodes |
| §10 (విరుపు) | `#recompute` దారి వెంట | Trending పదం కనిపించలేదు |
| §11 | `loadAll` విడిగా | Incremental build 3.6× నెమ్మది |
| §12 | Fuzz test (సరిచేసినది) | పరీక్ష తప్పు system ని పరీక్షించింది |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Trie ని వేగంగా దాటండి — నిజమైన లోతు top-K cache lo ఉంది</text><rect class="n-acc" x="0" y="26" width="100" height="38" rx="3"/><text class="t-w mid" x="50" y="50">5 నిమి</text><text class="t-sm" x="116" y="50"><tspan class="t-acc">Clarify</tspan> — ర్యాంకింగ్ దేని ప్రకారం? ఎంత తరచుగా మారుతుంది?</text><rect class="n-acc" x="0" y="70" width="130" height="38" rx="3"/><text class="t-w mid" x="65" y="94">8 నిమి</text><text class="t-sm" x="146" y="94">Scan ఎందుకు సరిపోదు · <tspan class="t-acc">కొలత చెప్పండి</tspan></text><rect class="n-acc" x="0" y="114" width="150" height="38" rx="3"/><text class="t-w mid" x="75" y="138">9 నిమి — Trie</text><text class="t-sm" x="166" y="138">node ని కనుక్కోవడం · <tspan class="t-acc">సగం మాత్రమే</tspan></text><rect class="n-good" x="0" y="158" width="230" height="38" rx="3"/><text class="t mid" x="115" y="182">15 నిమి — top-K cache</text><text class="t-sm" x="246" y="182">ఎందుకు K చాలు · invalidation</text><rect class="n-soft" x="0" y="202" width="120" height="38" rx="3"/><text class="t mid" x="60" y="226">8 నిమి</text><text class="t-sm" x="246" y="226">typos · వ్యక్తిగతీకరణ · scale</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **"Top అంటే ఏమిటి?" అని అడగండి** (§4) — మరియు `slice(0,5)` ఎందుకు తప్పో ఒక ఉదాహరణతో చెప్పండి. "hel → helbeh" అనేది 15 సెకన్లు మరియు అది గుర్తుండిపోతుంది.
2. **Trie కేవలం సగం పరిష్కారం** (§8) — ఇది చాలా మంది చెప్పరు. "Finding the node is O(prefix), but ranking still walks the subtree."
3. **ప్రతి node వద్దా top-K దాచొచ్చు — మరియు ఎందుకో** (§9) — "a word that's 6th in a child can never be in the parent's top-5." **ఆ వాదన చెప్పడం ముఖ్యం**, కేవలం "cache చేస్తాను" అనడం కాదు.
4. **Cache invalidation ఒక దారి వెంట** (§11) — మరియు bulk vs incremental build.
5. **Tiebreak నిర్ణయాత్మకంగా ఉండాలి** (§5) — లేకపోతే సూచనలు కారణం లేకుండా మారతాయి.

### ఏమి వదిలేయాలి

- **`merge` రాయొద్దు** — "merge two sorted top-K lists, keep the best K" అని చెప్తే చాలు.
- **`remove` మరియు pruning** — అడిగితేనే.
- **Memory optimisation** (§16) — ప్రస్తావించండి, అమలు చేయొద్దు.
- **Typo tolerance** — ఒక వాక్యం, ఎందుకంటే అది వేరే structure.

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"Two questions before anything else. What does 'top' mean — top by what? And how often does that ranking change?<br><br>
I ask the first one because it's the easiest thing to get silently wrong. The obvious implementation filters the word list by prefix and takes the first five. I ran that against a real dictionary — about two hundred and thirty-four thousand words — and typing 'hel' returns helbeh, helcoid, helcology, helcoplasty and helcosis. Those are real words; nobody has ever searched for them. The list is alphabetical, so 'first five' is always 'alphabetically earliest', which is almost always obscure. No crash, no failing test, completely unusable product. So suggestions have to be ranked by something — search volume, usually — with a deterministic tiebreak so they don't shuffle for no reason.<br><br>
Once ranking is right, cost becomes the problem. Autocomplete runs on every keystroke, so typing one ten-letter word is ten searches. I measured fifteen hundred keystrokes: each one scanned all two hundred and thirty-four thousand words to return five. That's about two point three milliseconds per keystroke, which one user can live with — but a search box at ten thousand queries per second would need twenty-three seconds of CPU per second.<br><br>
The structural fix is a trie. A prefix is a path, not a filter, so reaching the 'hel' node is three steps instead of a quarter-million comparisons. But I'd be explicit that this only solves half the problem: finding the node is cheap, and then ranking still means walking everything underneath it. I measured that too — a one-letter prefix still visited about forty-nine thousand nodes. And that's exactly the wrong shape, because the first keystroke is the most expensive and it's the one the user waits on.<br><br>
So the real answer is caching the top K at every node. The reason that works is worth stating: if a word is sixth-best inside some child's subtree, five words in that same subtree beat it, and all five are also in the parent's subtree — so it can never be in the parent's top five. That means a node's top five is always derivable from its children's top fives, and each node needs to store only five entries. Building it is one bottom-up pass, and a suggestion becomes a walk down the prefix and a slice. That took two point three milliseconds down to about two tenths of a microsecond, with identical answers.<br><br>
The catch is the one every cache has: when a word's popularity changes, the cached lists above it are stale. I had a word become the most-searched in the dictionary and it still didn't appear under its own prefix, because only its own node knew. The fix is cheap because the trie shape tells you exactly what's affected — only the nodes on the path from the root to that word can change, so you recompute that path bottom-up. Ten nodes, not three-quarters of a million.<br><br>
One practical detail: that makes every insert do path work too, so the initial load gets about three and a half times slower. I'd keep two entry points — a bulk load that inserts everything and does one bottom-up pass at the end, and incremental insert and bump for a running system.<br><br>
For confidence I'd fuzz it: thousands of random bumps, inserts and removes, checking every prefix against a naive sorted scan afterwards."
</div>

---

## 16. Follow-ups — అక్షర దోషాలు, వ్యక్తిగతీకరణ, scale

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "K ని 10 చెయ్యి" | `new Autocomplete(10)` | **0** |
| "పదాలు కాదు, పూర్తి queries" | ఏమీ మారదు — "how to cook rice" కూడా ఒక key | **0** |
| "ప్రతి శోధనకీ count పెంచాలి" | `bump(query, 1)` ప్రతి శోధనకీ | **0** |
| "Memory ఎక్కువ (7.5 లక్షల nodes)" | కింద చూడండి | `Node` |
| "మధ్యలో సరిపోవాలి ('book' → 'facebook')" | Trie సరిపోదు — **suffix automaton** లేదా n-gram index | కొత్త structure |
| "అక్షర దోషాలు ('gogle')" | కింద చూడండి | కొత్త layer |
| "ఒక్కో user కి వేరే సూచనలు" | కింద చూడండి | కొత్త layer |

### Memory

> *"2,34,428 పదాలకి **7,58,880 nodes** — ఒక్కో పదానికి ~3.2 nodes. ప్రతి node lo ఒక `Map` మరియు ఐదు entries ఉన్నాయి, కాబట్టి ఇది చాలా పెద్దది.*
>
> *రెండు ప్రామాణిక తగ్గింపులు:*
>
> - ***Radix tree (compressed trie)** — ఒక్కో పిల్ల మాత్రమే ఉన్న గొలుసులని ఒకే node గా కుదించడం. "helcoplasty" lo "helco" తర్వాత ఒకే దారి ఉంటే, దాన్ని విడగొట్టడం వృథా.*
> - ***`Map` కి బదులు 26-పొడవు array** (లేదా ఒక bitmask + packed array) — చిన్న alphabet కి అది చాలా తక్కువ memory.*
>
> ***మరియు ఒక ముఖ్యమైన ఎంపిక:** top-K ని **అన్ని nodes వద్దా** దాచాల్సిన అవసరం లేదు. మొదటి 3–4 అక్షరాల nodes వద్ద మాత్రమే దాచి, లోతైన వాటికి subtree ని నడవొచ్చు — ఎందుకంటే అక్కడ subtree చిన్నది (§8 పట్టిక: 4 అక్షరాలకి 529 nodes). **ఖర్చు ఎక్కడ ఉందో అక్కడే cache చేయడం.**"*

### అక్షర దోషాలు మరియు వ్యక్తిగతీకరణ

> *"**Typos** — trie ఒక ఖచ్చితమైన prefix నడక, కాబట్టి 'gogle' ఎక్కడికీ చేరదు. దీనికి **edit distance** కావాలి, మరియు సాధారణ పద్ధతి ఒక **BK-tree** లేదా trie మీద fuzzy నడక (ప్రతి అడుగులోనూ ఒక దోషం భరిస్తూ). అది ఖరీదు, కాబట్టి నిజమైన systems దీన్ని **ఖచ్చితమైన ఫలితాలు తక్కువగా ఉన్నప్పుడు మాత్రమే** నడుపుతాయి.*
>
> ***వ్యక్తిగతీకరణ** — ఒక్కో user కి వేరే trie కట్టకూడదు (కోట్ల users). బదులుగా: **ఒక ఉమ్మడి trie + ఒక చిన్న వ్యక్తిగత జాబితా**, మరియు చూపించే ముందు రెండింటినీ కలపడం. వ్యక్తిగత జాబితా చిన్నది (ఆ user యొక్క గత శోధనలు), కాబట్టి దాన్ని scan చేయడం ఉచితం.*
>
> ***ఈ రెండూ ఒకే ఆకారం:** ఖరీదైన సాధారణ నిర్మాణాన్ని అందరూ పంచుకుంటారు; వ్యక్తిగత/అరుదైన భాగం చివర్లో కలుపుతారు."*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **"Top" ని నిర్వచించకపోతే జవాబు అర్ధరహితం** | `slice(0,5)` (§4) | Search, feeds, recommendations |
| **Prefix ఒక దారి, ఒక filter కాదు** | Trie (§8) | Deep Dive 12 §5 · routing, IP lookup |
| **సగం పరిష్కారాన్ని గుర్తించడం** | Trie node ని కనుక్కుంది, ర్యాంక్ చేయలేదు (§8) | ప్రతి "సరైన structure" ఎంపిక |
| **K చిన్నదైతే ప్రతి చోటా దాచొచ్చు** | top-K merge (§9) | Deep Dive 13 · top-K ఎక్కడైనా |
| **ప్రతి cache కి ఒక invalidation కథ** | Trending పదం (§10) | Deep Dive 15 §16 · ప్రతి derived value |
| **Bulk load ≠ incremental update** | `loadAll` vs `insert` (§11) | Indexes, aggregates, caches |
| **పరీక్ష తిరస్కరణలని గౌరవించాలి** | `bump` return విస్మరించడం (§12) | ప్రతి fuzz test |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — ఈ doc lo అత్యంత విలువైన క్షణం</div>
§12 lo నా fuzz test విఫలమైంది, మరియు నేను వెంటనే <b>నా <code>merge</code> function ని అనుమానించాను</b>. దాన్ని మూడుసార్లు చదివాను. ఒక చిన్న పునరుత్పత్తి రాశాను — అది <b>pass అయింది</b>.<br><br>
ఆపై ఖచ్చితమైన operation ని వెతికాను. Bug <b>code lo లేదు — అది నా పరీక్షలో ఉంది.</b><br><br>
<b>పాఠం రెండు భాగాలు:</b> ఒకటి, ఒక పరీక్ష విఫలమైతే <i>పరీక్ష కూడా అనుమానితురాలే</i>. రెండు — మరియు ఇది ముఖ్యమైనది — <b>ఒక operation ఒక తిరస్కరణని తిరిగి ఇస్తే, దాన్ని విస్మరించే ఏ code ఐనా తప్పు</b>, అది test ఐనా, production ఐనా.<br><br>
ఈ series అంతటా "తిరస్కరణ ఒక API" అని చెప్తూ వచ్చాను. §12 lo <b>నేనే</b> దాన్ని విస్మరించాను.
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b> · <b>14 Text Editor</b> · <b>15 Library</b> · <b>16 Tic-Tac-Toe</b> · <b>17 Autocomplete</b>.<br><br>
<b>Deep Dive 13 (Leaderboard)</b> దీనికి దగ్గరి బంధువు — అక్కడా top-K, కానీ prefix లేకుండా, మరియు ranks కూడా కావాలి.
</div>

---

_Autocomplete — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ప్రతి సంఖ్య నిజమైన 2,34,428-పదాల నిఘంటువుతో `node` lo run చేసి తీసినదే ✅_
