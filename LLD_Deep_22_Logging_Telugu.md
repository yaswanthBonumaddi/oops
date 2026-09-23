<!-- style: editorial -->
<!-- footer: Logging Framework · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">22</div>
<div class="kicker">Deep Dive 22 · అవసరమైనప్పుడే కనిపించని logs</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>Logging<br>Framework</div>
<div class="lede">Log4j · SLF4J · Winston · Zap — ప్రతి system lo ఉండేది, మరియు దాదాపు ఎవరూ దీని design గురించి ఆలోచించనిది.</div>
<div class="sub">మూడు విరుపులు. మొదటిది <b>ఆపేసిన logs కోసం</b> 2 లక్షల సార్లు పని చేస్తుంది. రెండోది request p99 ని <b>1 ms నుంచి 21 ms</b> చేస్తుంది. మూడోది — ఒక ఘటన సమయంలో — <b>47% ERROR logs ని మింగేస్తుంది.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 22</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి శాతం నిజంగా `node` lo run చేసినదే.**

<div class="box warn">
<div class="lab">Deep Dive 07 (Pub-Sub) చదివారా? — అక్కడి పాఠాలని ఇక్కడ మళ్ళీ చెప్పను</div>
Pub-Sub lo ఇప్పటికే చూశాం: subscribers ని వేరుచేయడం, ఒక్కొక్కరికీ queue, ack/retry/DLQ, at-most-once vs at-least-once. <b>"Async గా చేస్తే publisher ఆగడు"</b> అనే పాఠం అక్కడిది.<br><br>
Logging lo మూడు <b>కొత్త</b> ప్రశ్నలు ఉన్నాయి, మరియు అవే ఈ doc:<br><br>
<b>1 ·</b> ఒక సందేశం <b>ఎప్పుడూ రాయబడదు</b> అని తెలిసినా, దాన్ని <b>తయారు చేస్తామా?</b> (§4)<br>
<b>2 ·</b> Logging <b>request thread ని ఆపగలదా?</b> (§7)<br>
<b>3 ·</b> Queue నిండితే — <b>ఏ logs వదిలేయాలి?</b> (§10) ← ఇదే ఈ doc యొక్క కేంద్రం
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు logging ఎప్పుడు పట్టింపు
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: ఆపేసిన log కూడా ఖరీదే**

3. Step — స్థాయి, సందేశం, sink
4. **మొదటి విరుపు** — 0 పంక్తులు, 2,00,000 సార్లు పని
5. Step — సందేశాన్ని సోమరిగా చేయడం

**Part 3 — రెండో విరుపు: request thread ఆగిపోవడం**

6. Step — File కి రాయడం
7. **రెండో విరుపు** — p99 1 ms నుంచి 21 ms
8. Step — Queue · మరియు కొత్త ప్రశ్న

**Part 4 — మూడో విరుపు: నిండిన queue**

9. Step — Queue కి ఒక హద్దు
10. **మూడో విరుపు** — 47% ERROR logs మాయం
11. Step — స్థాయి-తెలిసిన queue

**Part 5 — పూర్తి system**

12. Step — Context · ఒక log పంక్తి ఎవరిది?
13. మొత్తం code · నడిపి చూద్దాం · **O(1) shedding నిర్ధారణ**

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — sampling, rotation, distributed tracing
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు logging ఎప్పుడు పట్టింపు

> *"Design a logging framework. It should support log levels, multiple output destinations, and be usable from anywhere in the application."*

ఇది **సులభంగా అనిపిస్తుంది** — ఒక `if` (స్థాయి తనిఖీ) మరియు ఒక `console.log`. పది పంక్తులు.

<div class="fig">
<div class="cap">Logging యొక్క విచిత్రమైన లక్షణం</div>
<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">ఒక feature — దాని విలువ సరిగ్గా దాని ఖర్చు ఎక్కువైనప్పుడే పెరుగుతుంది</text><rect class="n-good" x="0" y="26" width="360" height="96" rx="4"/><text class="t mid" x="180" y="50">సాధారణ రోజు</text><text class="t-sm mid" x="180" y="74">కొన్ని వేల logs · ఎవరూ చదవరు</text><text class="t-sm mid" x="180" y="96">ఖర్చు తక్కువ · విలువ తక్కువ</text><text class="t-sm mid" x="180" y="114">— ఇక్కడ ఏ design ఐనా పనిచేస్తుంది</text><rect class="n-bad" x="390" y="26" width="360" height="96" rx="4"/><text class="t mid" x="570" y="50">ఒక ఘటన (incident)</text><text class="t-sm mid" x="570" y="74">logs <tspan class="t-acc">వందల రెట్లు</tspan> · అందరూ చూస్తారు</text><text class="t-sm mid" x="570" y="96">ఖర్చు గరిష్ఠం · విలువ గరిష్ఠం</text><text class="t-acc mid" x="570" y="114">— ఇక్కడే ప్రతి design విరుగుతుంది</text><rect class="n-dark" x="0" y="138" width="750" height="124" rx="4"/><text class="t-w mid" x="375" y="162">అందుకే ఇది ఒక మంచి interview problem</text><text class="t-w-sm mid" x="375" y="188">సర్వర్ కష్టపడుతున్నప్పుడు — CPU నిండి, disk నెమ్మదై, errors పెరిగినప్పుడు —</text><text class="t-w-sm mid" x="375" y="210">logging system <tspan class="t-acc">అత్యధిక భారం</tspan> మోస్తుంది, మరియు <tspan class="t-acc">అత్యధికంగా కావాల్సింది</tspan> అప్పుడే.</text><text class="t-w-sm mid" x="375" y="236">"సాధారణ సమయంలో పనిచేస్తుంది" అనేది ఒక logging system కి <tspan class="t-acc">ఏ హామీ కాదు</tspan>.</text><text class="t-w-sm mid" x="375" y="256">ఈ doc lo మూడు విరుపులూ సరిగ్గా ఆ క్షణంలోనే కనిపిస్తాయి.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **సెకనుకి ఎన్ని logs? ఘటన సమయంలో ఎన్ని?** | §10 — queue పరిమాణం మరియు drop విధానం |
| **Log పంక్తి ఎక్కడికి — console, file, network?** | Network అంటే **ఆలస్యం ఖాయం** (§7) |
| **Logging request ని ఆపొచ్చా?** | **దాదాపు ఎప్పుడూ కాదు** — §8 |
| **Logs పోతే పర్వాలేదా?** | **ఏవి పోవచ్చో** అడగండి — §10 |
| **Structured (JSON) నా, plain text నా?** | §12 — fields ఉంటే వెతకడం సులభం |
| **స్థాయిని నడుస్తుండగా మార్చగలమా?** | ఒక `setLevel` — కానీ §5 ఆ తనిఖీని చౌకగా ఉంచాలి |
| **ఒక request యొక్క అన్ని logs ని కలిపి చూడగలమా?** | §12 — context / child loggers |

<div class="box warn">
<div class="lab">నాలుగో ప్రశ్న — మరియు ఇది interview ని మలుపు తిప్పుతుంది</div>
<i>"Logs కొన్ని పోతే పర్వాలేదా?"</i><br><br>
చాలా మంది "అవును, logs అంత ముఖ్యం కాదు" అంటారు. అది <b>సగం జవాబు</b>.<br><br>
సరైన ప్రశ్న: <b>"ఏవి పోవచ్చు?"</b> — DEBUG logs లక్షలు పోయినా ఎవరూ గమనించరు. కానీ ఒక్క ERROR పోతే, <b>మీరు వెతుకుతున్న సమాధానమే పోయినట్టు</b>.<br><br>
మరియు §10 lo చూస్తాం: <b>సహజమైన queue design సరిగ్గా అదే చేస్తుంది</b> — ఘటన సమయంలో 47% ERROR logs ని మింగేస్తుంది.
</div>

---

# Part 2 — మొదటి విరుపు: ఆపేసిన log కూడా ఖరీదే

---

## 3. Step — స్థాయి, సందేశం, sink

```javascript
const LEVELS = { DEBUG: 10, INFO: 20, WARN: 30, ERROR: 40 };
class Logger {
  constructor(level = 'INFO', sink = console.log) {
    this.level = LEVELS[level]; this.sink = sink;
  }
  #log(lvl, msg) {
    if (LEVELS[lvl] < this.level) return;               // స్థాయి తనిఖీ
    this.sink(`[${lvl}] ${msg}`);
  }
  debug(m) { this.#log('DEBUG', m); }
  info(m)  { this.#log('INFO',  m); }
  warn(m)  { this.#log('WARN',  m); }
  error(m) { this.#log('ERROR', m); }
}
```

**పనిచేస్తుంది**, మరియు ఇది ప్రతి tutorial lo ఉండే code:

```
[INFO] server మొదలైంది
[ERROR] DB కనెక్షన్ విఫలం
```

`DEBUG` పంక్తి కనిపించలేదు — స్థాయి `INFO` కాబట్టి. **సరిగ్గా ఉంది.**

---

## 4. మొదటి విరుపు — 0 పంక్తులు, 2,00,000 సార్లు పని

ఇప్పుడు ఒక సాధారణ వాడకం చూద్దాం — DEBUG lo ఒక వివరమైన సందేశం:

```javascript
log.debug('request: ' + describeRequest(req));
```

స్థాయి `INFO`, కాబట్టి ఇది **ఎప్పుడూ రాయబడదు**. 2,00,000 సార్లు పిలుద్దాం:

```
  2,00,000 log.debug() calls · స్థాయి INFO (DEBUG ఆఫ్)
  బయటికి వచ్చిన పంక్తులు : 0
  describeRequest() calls: 2,00,000
  సమయం                  : 69 ms
```

<div class="box warn">
<div class="lab">మొదటి విరుపు — స్థాయి తనిఖీ చాలా ఆలస్యంగా జరుగుతోంది</div>
ఒక్క పంక్తి కూడా రాయలేదు. అయినా <code>describeRequest()</code> <b>2,00,000 సార్లు</b> నడిచింది, మరియు 69 ms వృథా అయింది.<br><br>
<b>కారణం JavaScript కాదు — ఇది ప్రతి భాషలోనూ ఇలాగే.</b> <code>log.debug(x)</code> అనేది ఒక <b>function call</b>. Function కి వెళ్ళే <i>ముందు</i> దాని argument తయారుకావాలి. అంటే string కలపడం, <code>JSON.stringify</code>, అంతా — <b>logger ని చేరకముందే</b>.<br><br>
Logger lo ఉన్న <code>if</code> ఆ పని అయిపోయాక నడుస్తుంది. అది <b>రాయడాన్ని</b> ఆపుతుంది, <b>తయారీని</b> కాదు.<br><br>
<b>మరియు ఇది ఎక్కడ కరుస్తుంది?</b> — DEBUG logs ఎక్కువగా ఉండేది <b>వేడిగా నడిచే code lo</b>. అంటే ఈ ఖర్చు సరిగ్గా అత్యంత ముఖ్యమైన చోట పడుతుంది, మరియు <b>production lo DEBUG ఆఫ్ చేసినా అది తగ్గదు</b>.
</div>

---

## 5. Step — సందేశాన్ని సోమరిగా చేయడం

రెండు పరిష్కారాలు, రెండూ ఒకే ఆలోచన: **సందేశాన్ని తయారుచేయడాన్ని స్థాయి తనిఖీ తర్వాతికి వాయిదా వేయడం.**

```javascript
isEnabled(l) { return LEVELS[l] >= this.level; }

#log(l, m) {
  if (LEVELS[l] < this.level) return;
  // సందేశం ఒక function అయితే — ఇప్పుడే దాన్ని పిలవడం
  this.sink(`[${l}] ${typeof m === 'function' ? m() : m}`);
}
```

```
2,00,000 log.debug() calls · స్థాయి INFO (DEBUG ఆఫ్)

  string కలిపి (§4)    →   70 ms · describeRequest() 2,00,000 సార్లు
  function గా ఇస్తే    →    2 ms · describeRequest() 0 సార్లు
  isEnabled తనిఖీతో    →    1 ms · describeRequest() 0 సార్లు

మరియు DEBUG ఆన్ చేస్తే — మూడూ ఒకే పని చేయాలి:
  string కలిపి   → ["[DEBUG] x"]
  function గా    → ["[DEBUG] x"]
```

**70 ms → 2 ms**, మరియు ఖరీదైన function **సున్నా సార్లు**.

<div class="note">సమయాలు runs మధ్య కొంచెం ఊగుతాయి — మొదటి వరుస 67–70 ms, మిగతా రెండూ 1–2 ms. కానీ <b>calls నిలువు వరుస ఖచ్చితమైనది</b>: 2,00,000 మరియు 0, ప్రతి run lo. Deep Dive 13 §7 lo చెప్పిన అదే విషయం — <i>గడియారం ఊగితే, పనిని లెక్కించండి.</i></div>

<div class="box">
<div class="lab">రెండు పరిష్కారాలూ ఎందుకు ఉన్నాయి</div>
<code>log.debug(() =&gt; ...)</code> — <b>సొగసైనది</b>. ఒక closure మాత్రమే అదనపు ఖర్చు, మరియు call site శుభ్రంగా ఉంటుంది.<br><br>
<code>if (log.isEnabled('DEBUG')) log.debug(...)</code> — <b>మరింత చౌకైనది</b> (closure కూడా లేదు), కానీ call site lo రెండు పంక్తులు. పాత Java code lo <code>if (logger.isDebugEnabled())</code> ఎక్కడ చూసినా ఇదే కారణం.<br><br>
<b>మూడో మార్గం కూడా ఉంది:</b> చాలా ఆధునిక libraries (Go యొక్క <code>zap</code>, Rust యొక్క <code>tracing</code>) సందేశాన్ని <b>ముక్కలుగా</b> తీసుకుంటాయి — <code>log.debug("request", { id, path })</code> — మరియు ఆ ముక్కలని <b>కలపడం</b> స్థాయి తనిఖీ తర్వాతే చేస్తాయి. §13 lo <code>fields</code> అదే.
</div>

---

# Part 3 — రెండో విరుపు: request thread ఆగిపోవడం

---

## 6. Step — File కి రాయడం

Console సరిపోదు; logs ఒక file కి వెళ్ళాలి:

```javascript
class SyncFileLogger {
  constructor(file) { this.fd = fs.openSync(file, 'a'); }
  log(line) { fs.writeSync(this.fd, line + '\n'); }
}
```

**సూటిగా ఉంది, మరియు నమ్మదగినది** — ప్రతి పంక్తీ వెంటనే disk కి వెళుతుంది, crash అయినా పోదు. కొలిచి చూద్దాం:

```
50,000 log పంక్తులు · ఒక్కొక్కటీ 66 bytes

  విధానం             |   మొత్తం  |  ఒక్కో పంక్తికి  |  write() calls
  -------------------+-----------+------------------+----------------
  ప్రతిదీ నేరుగా     |     77 ms |           1.5 µs |         50,000
  500 గుంపుగా        |      2 ms |           0.0 µs |            100
```

ఒక్కో పంక్తికి **1.5 µs** — అది భయంకరమైనది కాదు. గుంపుగా రాస్తే 38 రెట్లు వేగం, కానీ మొత్తం 77 ms అనేది భరించదగినదే.

**అయితే సమస్య ఏమిటి?** — ఆ **సగటు** ఒక అబద్ధం.

---

## 7. రెండో విరుపు — p99 1 ms నుంచి 21 ms

నిజమైన appenders **ఏకరీతిగా ఉండవు**. Disk buffer నిండినప్పుడు, log file rotate అయినప్పుడు, network appender ఒక packet కోల్పోయినప్పుడు — ఒక్క call **మిల్లీసెకన్లు** ఆగుతుంది.

ప్రతి 200వ పంక్తికీ 20 ms ఆగే ఒక appender, 5,000 requests, ఒక్కో request కి 10 logs:

```
  విధానం         |  సగటు  |   p50  |   p99   |  గరిష్ఠం
  ---------------+--------+--------+---------+----------
  request path lo |  2.00ms |  1.00ms |  21.00ms |   21.02ms
  queue lo        |  1.00ms |  1.00ms |   1.01ms |    1.05ms
```

<div class="fig">
<div class="cap">ఒక appender ఆగితే · ఆ ఆలస్యం ఎవరిది?</div>
<svg viewBox="0 0 750 226"><text class="t-xs" x="0" y="14">20 ms disk flush — అది ఎక్కడ కనిపిస్తుంది</text><rect class="n-bad" x="0" y="28" width="360" height="90" rx="4"/><text class="t mid" x="180" y="52">Request path lo</text><text class="t-sm mid" x="180" y="76">ఆ 20 ms ని <tspan class="t-acc">ఒక customer</tspan> చూస్తాడు</text><text class="t-sm mid" x="180" y="96">p99 = <tspan class="t-acc">21 ms</tspan> · గరిష్ఠం 21.02 ms</text><text class="t-sm mid" x="180" y="112">అతను log రాయమని అడగలేదు</text><rect class="n-good" x="390" y="28" width="360" height="90" rx="4"/><text class="t mid" x="570" y="52">Queue lo</text><text class="t-sm mid" x="570" y="76">ఆ 20 ms <tspan class="t-acc">background lo</tspan> గడుస్తుంది</text><text class="t-sm mid" x="570" y="96">p99 = <tspan class="t-acc">1.01 ms</tspan> · గరిష్ఠం 1.05 ms</text><text class="t-sm mid" x="570" y="112">Request ముగిసిపోయింది</text><rect class="n-dark" x="0" y="134" width="750" height="88" rx="4"/><text class="t-w-sm mid" x="375" y="158">సగటు కూడా సగం అయింది (2.00 → 1.00 ms) — కానీ <tspan class="t-acc">సగటు ముఖ్యం కాదు</tspan>.</text><text class="t-w-sm mid" x="375" y="182">ముఖ్యమైనది p99: ప్రతి వందలో ఒక customer <tspan class="t-acc">21 రెట్లు</tspan> ఎక్కువ ఆగాడు —</text><text class="t-w-sm mid" x="375" y="204">మరియు ఆ ఆలస్యానికి అతని request తో <tspan class="t-acc">ఎలాంటి సంబంధమూ లేదు</tspan>.</text></svg>
</div>

<div class="box warn">
<div class="lab">రెండో విరుపు — logging ఒక customer యొక్క సమయాన్ని తింటోంది</div>
Customer ఒక order ఇచ్చాడు. అతని request 1 ms పని చేసి, ఆపై <b>20 ms disk flush కోసం ఆగింది</b> — అతను అడగని, అతనికి ప్రయోజనం లేని పని.<br><br>
మరియు ఇది <b>సరిగ్గా అత్యంత చెడ్డ సమయంలో</b> ఘోరమవుతుంది: సర్వర్ కష్టపడుతున్నప్పుడు disk నెమ్మదవుతుంది, logs పెరుగుతాయి, మరియు ప్రతి request మరింత ఆగుతుంది. <b>Logging ఒక feedback loop అవుతుంది.</b><br><br>
<b>మౌలిక తప్పు:</b> "Log రాయడం" అనేది రెండు పనులు — <b>ఏమి రాయాలో నిర్ణయించడం</b> (వేగం, request కి సంబంధించినది) మరియు <b>దాన్ని ఎక్కడికో పంపడం</b> (నెమ్మది, request కి సంబంధం లేనిది). వాటిని ఒకే call lo కలపడం వల్ల రెండోది మొదటిదాని మీద పడుతుంది.
</div>

---

## 8. Step — Queue · మరియు కొత్త ప్రశ్న

పరిష్కారం స్పష్టం: **record ని ఒక queue lo వేసి, request ని వదిలేయడం.** వేరే ఒక చోట (thread, timer, event-loop tick) దాన్ని appenders కి పంపడం.

```javascript
#emit(level, msg, fields) {
  if (LEVELS[level] < this.level) return { ok: true, skipped: true };
  const text = typeof msg === 'function' ? msg() : msg;
  const rec = new Record(level, text, { ...this.fields, ...fields }, this.clock());
  // ← request ఇక్కడే ముగుస్తుంది
  if (this.queue) return this.queue.push(rec);
  for (const a of this.appenders) a.write([rec]);
  return { ok: true };
}
```

<div class="note">Deep Dive 07 §7 lo సరిగ్గా ఇదే ఆలోచన వాడాం — slow subscriber publisher ని ఆపకుండా. <b>ఇక్కడ కొత్తది ఆ queue కాదు; దాని తర్వాత వచ్చే ప్రశ్న.</b></div>

మరియు ఆ ప్రశ్న ఇది: **queue ఎంత పెద్దది?**

- **అపరిమితం** అంటే — producer consumer కంటే వేగంగా ఉంటే queue పెరుగుతూనే ఉంటుంది. ఒక ఘటన సమయంలో logs వందల రెట్లు పెరిగితే, **logging system ఒక memory leak అవుతుంది** మరియు process చనిపోతుంది. *Logs కోసం సర్వర్ చనిపోవడం* — అది అసలు ఉద్దేశానికి పూర్తి వ్యతిరేకం.
- **పరిమితం** అంటే — నిండినప్పుడు **ఏదో ఒకటి వదిలేయాలి.**

**ఏది వదిలేయాలి?** అదే §10.

---

# Part 4 — మూడో విరుపు: నిండిన queue

---

## 9. Step — Queue కి ఒక హద్దు

సహజమైన రెండు ఎంపికలు:

```javascript
if (q.length < capacity) q.push(rec);
else if (policy === 'DROP_NEW') dropped++;              // కొత్తదాన్ని వదిలేయడం
else if (policy === 'DROP_OLD') { q.shift(); q.push(rec); }   // పాతదాన్ని వదిలేయడం
```

రెండూ సహేతుకంగా అనిపిస్తాయి, మరియు రెండూ నిజమైన libraries lo ఉన్నాయి. **DROP_NEW** ఇప్పటికే ఉన్న చరిత్రని కాపాడుతుంది; **DROP_OLD** తాజా స్థితిని కాపాడుతుంది.

ఇప్పుడు **ఒక ఘటనని అనుకరిద్దాం** — 2,00,000 log events, ఘటన సమయపు నిష్పత్తులతో (DEBUG 50%, INFO 20%, WARN 15%, ERROR 15%), queue 5,000, consumer producer కంటే నెమ్మది:

---

## 10. మూడో విరుపు — 47% ERROR logs మాయం

```
2,00,000 log events (ఘటన సమయం) · queue 5,000 · consumer నెమ్మది

  మొత్తం: DEBUG 1,00,084 · INFO 39,911 · WARN 30,178 · ERROR 29,827

  విధానం        |  ERROR రాసినవి |  ERROR పోయినవి |  ERROR నిలిచిన శాతం
  --------------+----------------+----------------+---------------------
  DROP_NEW      |         15,785 |         14,042 |               52.9%
  DROP_OLD      |         15,778 |         14,049 |               52.9%
  DROP_LOWEST   |         29,827 |              0 |              100.0%
```

<div class="box warn">
<div class="lab">మూడో విరుపు — మీరు వెతుకుతున్న logs సరిగ్గా అవే పోయాయి</div>
<b>DROP_NEW మరియు DROP_OLD — రెండూ 47% ERROR logs ని మింగేశాయి.</b> మరియు అవి ఒకేలా చెడ్డవి కావడం యాదృచ్ఛికం కాదు: <b>రెండూ వచ్చిన క్రమాన్ని బట్టి వదిలేస్తాయి</b>, ఏమి ఉందో చూడకుండా.<br><br>
Queue lo 70% DEBUG ఉంది. కాబట్టి "ఏదో ఒకటి వదిలేయి" అంటే — గణితం ప్రకారం, <b>అదే నిష్పత్తిలో ERROR లు కూడా పోతాయి</b>.<br><br>
<b>మరియు ఇది ఎప్పుడు జరిగింది? — సరిగ్గా ఘటన సమయంలో.</b> సాధారణ రోజున queue ఎప్పుడూ నిండదు, కాబట్టి ఏమీ పోదు. Queue నిండేది system కష్టపడుతున్నప్పుడే — అంటే మీరు ఆ ERROR logs కోసం <b>వెతుకుతున్న ఆ క్షణంలోనే</b>.<br><br>
<b>మౌలిక తప్పు:</b> Queue ఒక <b>FIFO</b> అని అనుకున్నాం. కానీ log records <b>సమానమైనవి కావు</b> — ఒక ERROR మరియు ఒక DEBUG కి విలువలో వందల రెట్లు తేడా ఉంది. సమాన వస్తువుల కోసం రాసిన ఒక structure ని అసమాన వస్తువులకి వాడాం.
</div>

---

## 11. Step — స్థాయి-తెలిసిన queue

పరిష్కారం: **నిండినప్పుడు, అత్యంత తక్కువ విలువైన దాన్ని వదిలేయడం** — వచ్చిన క్రమాన్ని కాదు.

సరళమైన అమలు queue అంతటినీ వెతుకుతుంది — O(n) ప్రతి drop కీ. బదులుగా **ఒక్కో స్థాయికి ఒక్కో queue** ఉంచితే అది **O(1)**:

```javascript
// ఒక్కో స్థాయికి ఒక్కో queue — కాబట్టి "అతి తక్కువ స్థాయిని వదిలేయడం" O(1)
class LevelQueue {
  #q = new Map(ORDER.map(l => [l, []]));
  #size = 0;
  dropped = Object.fromEntries(ORDER.map(l => [l, 0]));
  constructor(capacity = 10_000) { this.capacity = capacity; }

  push(rec) {
    if (this.#size < this.capacity) {
      this.#q.get(rec.level).push(rec); this.#size++;
      return { ok: true };
    }
    // నిండిపోయింది — అత్యంత తక్కువ స్థాయి ఉన్న దాన్ని వదిలేయడం
    for (const l of ORDER) {
      if (LEVELS[l] >= LEVELS[rec.level]) break;      // కొత్తదే అతి తక్కువ
      const q = this.#q.get(l);
      if (q.length) {
        q.shift(); this.dropped[l]++;
        this.#q.get(rec.level).push(rec);
        return { ok: true, shed: l };
      }
    }
    this.dropped[rec.level]++;
    return { ok: false, reason: 'QUEUE_FULL' };
  }
  // ఎక్కువ స్థాయి ముందు బయటికి
  drain(n) {
    const out = [];
    for (let i = ORDER.length - 1; i >= 0 && out.length < n; i--) {
      const q = this.#q.get(ORDER[i]);
      while (q.length && out.length < n) { out.push(q.shift()); this.#size--; }
    }
    return out;
  }
}
```

<div class="box">
<div class="lab">మూడు వివరాలు — ప్రతిదీ ఉద్దేశపూర్వకం</div>
<b>1 · <code>if (LEVELS[l] >= LEVELS[rec.level]) break;</code></b> — కొత్తదే అతి తక్కువ స్థాయి అయితే, <b>దాన్నే వదిలేయాలి</b>. ఒక DEBUG కోసం ఒక INFO ని బలి ఇవ్వకూడదు.<br><br>
<b>2 · <code>drain</code> ఎక్కువ స్థాయి ముందు ఇస్తుంది</b> — consumer నెమ్మదిగా ఉంటే, బయటికి వెళ్ళే కొద్దిపాటి logs <b>ముఖ్యమైనవే</b> కావాలి.<br><br>
<b>3 · <code>dropped</code> ఒక్కో స్థాయికీ లెక్కిస్తుంది</b> — ఇది కేవలం గణాంకం కాదు. "గత గంటలో 4 లక్షల DEBUG వదిలేశాం" అనేది ఒక <b>ఆరోగ్య సంకేతం</b>; "3 ERROR వదిలేశాం" అనేది ఒక <b>ప్రమాద ఘంటిక</b>. రెండూ ఒకేలా చూపించకూడదు.
</div>

### రెండు అమలులూ ఒకే ఫలితం ఇస్తాయా?

O(1) రూపం ఒక optimisation. అది O(n) రూపంతో **అక్షరాలా ఏకీభవిస్తుందా**? — 2,00,000 events మీద పోల్చి చూద్దాం:

```
  స్థాయి |  LevelQueue రాసినవి |  O(n) reference |  ఏకీభవించాయా
  -------+---------------------+-----------------+---------------
  DEBUG  |               5,079 |           5,079 |             ✓
  INFO   |              39,911 |          39,911 |             ✓
  WARN   |              30,178 |          30,178 |             ✓
  ERROR  |              29,827 |          29,827 |             ✓

  ERROR నిలిచిన శాతం : 100.0%
  మొత్తం సమయం        : 34 ms  (O(1) shedding)
```

**నాలుగు స్థాయిలూ సరిగ్గా సరిపోయాయి.** మరియు ఆ DEBUG వరుస చూడండి — 1,00,084 lo **5,079 మాత్రమే** రాయబడ్డాయి. **95% DEBUG పోయింది, 0% ERROR పోయింది.** అదే సరైన వ్యాపారం.

---

# Part 5 — పూర్తి system

---

## 12. Step — Context · ఒక log పంక్తి ఎవరిది?

ఒక చివరి విషయం, మరియు ఇది ఆచరణలో చాలా ముఖ్యమైనది.

సర్వర్ lo వంద requests ఒకేసారి నడుస్తున్నాయి. Log file lo వాటి పంక్తులు **కలిసిపోయి** ఉంటాయి. ఒక customer ఫిర్యాదు చేస్తే — **అతని request యొక్క పంక్తులు ఏవి?**

```javascript
// ఒక context తో కొత్త logger — అదే appenders, అదే queue
child(fields) {
  const c = new Logger({ level: this.levelName, appenders: this.appenders,
                         queue: this.queue, clock: this.clock,
                         fields: { ...this.fields, ...fields } });
  return c;
}
```

```
  2026-09-23T10:00:00.000Z [INFO] order అందింది svc=orders reqId=r-42 user=ravi items=3
  2026-09-23T10:00:00.000Z [ERROR] చెల్లింపు విఫలం svc=orders reqId=r-42 user=ravi
```

<div class="box">
<div class="lab">ఇది ఒక సౌకర్యం కాదు — ఇది logs ని <i>వెతకగలిగేలా</i> చేసేది</div>
<code>root.child({ reqId })</code> అని ఒకసారి చేస్తే, ఆ request lo ప్రతి పంక్తీ <b>ఆ reqId మోస్తుంది</b> — ప్రతి <code>log.info()</code> call lo దాన్ని రాయనవసరం లేదు.<br><br>
ఆపై <code>grep reqId=r-42</code> — <b>ఆ ఒక్క customer యొక్క పూర్తి కథ</b>, వంద ఇతర requests మధ్య నుంచి.<br><br>
మరియు <code>fields</code> ఒక వస్తువు కావడం వల్ల — string కాకుండా — దాన్ని JSON గా కూడా రాయొచ్చు, మరియు అప్పుడు <code>reqId</code> ఒక <b>వెతకగలిగే క్షేత్రం</b> అవుతుంది, ఒక string ముక్క కాదు. <b>Structured logging అంటే అదే.</b>
</div>

---

## 13. మొత్తం code · నడిపి చూద్దాం · O(1) shedding నిర్ధారణ

<div class="fig">
<div class="cap">నిర్మాణం · నాలుగు ముక్కలు</div>
<svg viewBox="0 0 750 246"><text class="t-xs" x="0" y="14">Logger ఏమి రాయాలో నిర్ణయిస్తుంది · appenders ఎక్కడికో పంపుతాయి</text><rect class="n-acc" x="235" y="26" width="280" height="48" rx="4"/><text class="t-w mid" x="375" y="46">Logger</text><text class="t-w-sm mid" x="375" y="64">level · fields · child() · pump()</text><line class="ln-acc" x1="310" y1="78" x2="150" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="440" y1="78" x2="600" y2="104" marker-end="url(#aa)"/><rect class="n-good" x="20" y="108" width="270" height="52" rx="4"/><text class="t mid" x="155" y="130">LevelQueue · §11</text><text class="t-sm mid" x="155" y="148">O(1) shedding · drain</text><rect class="n-info" x="460" y="108" width="270" height="52" rx="4"/><text class="t mid" x="595" y="130">Appenders</text><text class="t-sm mid" x="595" y="148">Memory · Buffered · …</text><line class="ln-acc" x1="290" y1="134" x2="456" y2="134" marker-end="url(#aa)"/><text class="t-sm mid" x="373" y="126">pump()</text><rect class="n-dark" x="0" y="176" width="750" height="66" rx="4"/><text class="t-w-sm mid" x="375" y="200">Request thread <tspan class="t-acc">queue.push()</tspan> వరకే వెళుతుంది — అది ఒక array push.</text><text class="t-w-sm mid" x="375" y="224"><tspan class="t-acc">pump()</tspan> ని వేరే చోట పిలవాలి: ఒక timer, ఒక thread, లేదా ఒక event-loop tick.</text></svg>
</div>

```javascript
'use strict';
const LEVELS = { DEBUG: 10, INFO: 20, WARN: 30, ERROR: 40 };
const ORDER = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

class Record {
  constructor(level, msg, fields, at) {
    Object.assign(this, { level, msg, fields, at });
  }
  format() {
    const f = Object.entries(this.fields ?? {})
      .map(([k, v]) => `${k}=${typeof v === 'string' ? v : JSON.stringify(v)}`)
      .join(' ');
    return `${new Date(this.at).toISOString()} [${this.level}] ` +
           `${this.msg}${f ? ' ' + f : ''}`;
  }
}

class MemoryAppender {
  lines = [];
  write(records) { for (const r of records) this.lines.push(r.format()); }
  close() {}
}
class BufferedAppender {                   // గుంపుగా రాయడం · §7
  constructor(sink, batch = 500) {
    Object.assign(this, { sink, batch }); this.buf = [];
  }
  write(records) {
    for (const r of records) {
      this.buf.push(r.format());
      if (this.buf.length >= this.batch) this.flush();
    }
  }
  flush() {
    if (this.buf.length) { this.sink(this.buf.join('\n')); this.buf.length = 0; }
  }
  close() { this.flush(); }
}

// ఒక్కో స్థాయికి ఒక్కో queue — "అతి తక్కువ స్థాయిని వదిలేయడం" O(1)
class LevelQueue {
  #q = new Map(ORDER.map(l => [l, []]));
  #size = 0;
  dropped = Object.fromEntries(ORDER.map(l => [l, 0]));
  constructor(capacity = 10_000) { this.capacity = capacity; }
  get size() { return this.#size; }

  push(rec) {
    if (this.#size < this.capacity) {
      this.#q.get(rec.level).push(rec); this.#size++;
      return { ok: true };
    }
    for (const l of ORDER) {
      if (LEVELS[l] >= LEVELS[rec.level]) break;     // కొత్తదే అతి తక్కువ
      const q = this.#q.get(l);
      if (q.length) {
        q.shift(); this.dropped[l]++;
        this.#q.get(rec.level).push(rec);
        return { ok: true, shed: l };
      }
    }
    this.dropped[rec.level]++;
    return { ok: false, reason: 'QUEUE_FULL' };
  }
  drain(n) {                                          // ఎక్కువ స్థాయి ముందు
    const out = [];
    for (let i = ORDER.length - 1; i >= 0 && out.length < n; i--) {
      const q = this.#q.get(ORDER[i]);
      while (q.length && out.length < n) { out.push(q.shift()); this.#size--; }
    }
    return out;
  }
  get totalDropped() { return Object.values(this.dropped).reduce((a,b) => a+b, 0); }
}

class Logger {
  constructor({ level = 'INFO', appenders = [], queue = null,
                clock = Date.now, fields = {} } = {}) {
    Object.assign(this, { appenders, queue, clock, fields });
    this.level = LEVELS[level];
    this.levelName = level;
  }
  isEnabled(l) { return LEVELS[l] >= this.level; }
  setLevel(l) { this.level = LEVELS[l]; this.levelName = l; return this; }

  // ఒక context తో కొత్త logger — అదే appenders, అదే queue
  child(fields) {
    return new Logger({ level: this.levelName, appenders: this.appenders,
                        queue: this.queue, clock: this.clock,
                        fields: { ...this.fields, ...fields } });
  }

  #emit(level, msg, fields) {
    if (LEVELS[level] < this.level) return { ok: true, skipped: true };  // §5
    // §5 · సోమరి — స్థాయి తనిఖీ తర్వాతే సందేశం తయారవుతుంది
    const text = typeof msg === 'function' ? msg() : msg;
    const rec = new Record(level, text,
                          { ...this.fields, ...fields }, this.clock());
    if (this.queue) return this.queue.push(rec);                         // §11
    for (const a of this.appenders) a.write([rec]);
    return { ok: true };
  }
  debug(m, f) { return this.#emit('DEBUG', m, f); }
  info (m, f) { return this.#emit('INFO',  m, f); }
  warn (m, f) { return this.#emit('WARN',  m, f); }
  error(m, f) { return this.#emit('ERROR', m, f); }

  // queue నుంచి appenders కి — ఒక వేరే thread/tick lo పిలవాలి
  pump(n = 1000) {
    if (!this.queue) return { written: 0 };
    const batch = this.queue.drain(n);
    if (batch.length) for (const a of this.appenders) a.write(batch);
    return { written: batch.length, queued: this.queue.size };
  }
  flush() {
    while (this.queue && this.queue.size) this.pump();
    for (const a of this.appenders) a.flush?.();
  }
  close() { this.flush(); for (const a of this.appenders) a.close(); }
}
```

```
--- ప్రాథమిక ప్రవర్తన ---
  2026-09-23T10:00:00.000Z [INFO] server మొదలైంది port=8080
  2026-09-23T10:00:00.000Z [ERROR] DB విఫలం retries=3

--- §5: సోమరి సందేశం ---
  string కలిపితే  : expensive() 1 సారి
  function గా ఇస్తే: expensive() 0 సార్లు

--- context (child logger) ---
  2026-09-23T10:00:00.000Z [INFO] order అందింది svc=orders reqId=r-42 user=ravi items=3
  2026-09-23T10:00:00.000Z [ERROR] చెల్లింపు విఫలం svc=orders reqId=r-42 user=ravi

--- §11: queue నిండితే ఏమి వదిలేస్తాం ---
  queue నిండింది (5 DEBUG). ఇప్పుడు:
    debug d5  → { ok: false, reason: 'QUEUE_FULL' }
    error e1  → { ok: true, shed: 'DEBUG' } ← ఒక DEBUG వదిలేసింది
    error e2  → { ok: true, shed: 'DEBUG' }
  వదిలేసినవి : { DEBUG: 3, INFO: 0, WARN: 0, ERROR: 0 }
  రాసినవి    : e1 e2 d2 d3 d4

--- level మార్చడం ---
   1 పంక్తి: 2026-09-23T10:00:00.000Z [INFO] ఇప్పుడు కనిపిస్తుంది

--- buffered appender ---
  250 పంక్తులు, flush ముందు  : write() 2 సార్లు
  close() తర్వాత            : write() 3 సార్లు · 100+100+50 పంక్తులు
```

### ఈ output ని పంక్తి పంక్తిగా చదువుదాం

**`debug d5 → QUEUE_FULL`** — queue నిండింది మరియు d5 **అతి తక్కువ స్థాయి**, కాబట్టి దాన్నే వదిలేసింది. ఒక DEBUG కోసం ఇంకో DEBUG ని బలి ఇవ్వలేదు.

**`error e1 → { ok: true, shed: 'DEBUG' }`** — ERROR కి చోటు కావాలి, కాబట్టి ఒక DEBUG వెళ్ళిపోయింది. మరియు **ఏది వెళ్ళిందో తిరిగి చెప్తోంది** — ఇది monitoring కి కావాల్సిన సమాచారం.

**`రాసినవి : e1 e2 d2 d3 d4`** — `drain` **ERROR లని ముందు** ఇచ్చింది. Consumer వెనకబడి ఉంటే, బయటికి వెళ్ళే మొదటివి ముఖ్యమైనవే.

**`write() 2 సార్లు` → `3 సార్లు`** — 250 పంక్తులు, batch 100. మూడో batch (50 పంక్తులు) `close()` వరకు buffer lo ఉంది. **`close()` పిలవకపోతే ఆ 50 పంక్తులు ఎప్పటికీ disk చేరవు** — buffered logging యొక్క ధర.

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | స్థాయి + sink | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | సోమరి సందేశం, `isEnabled` | 0 పంక్తులకి 2 లక్షల calls |
| §7 (విరుపు) | `LevelQueue` + `pump` | p99 1 ms → 21 ms |
| §8 | `BufferedAppender` | 50,000 syscalls → 100 |
| §10 (విరుపు) | స్థాయి-తెలిసిన shedding | 47% ERROR logs మాయం |
| §11 | ఒక్కో స్థాయికి ఒక queue | O(n) shedding → O(1) |
| §11 | `dropped` ఒక్కో స్థాయికీ | "4 లక్షల DEBUG" ≠ "3 ERROR" |
| §12 | `child(fields)` | ఒక request యొక్క కథ ఒకచోట |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Levels మరియు appenders వేగంగా — queue విధానమే అసలు interview</text><rect class="n-acc" x="0" y="26" width="100" height="38" rx="3"/><text class="t-w mid" x="50" y="50">6 నిమి</text><text class="t-sm" x="116" y="50"><tspan class="t-acc">Clarify</tspan> — ఎన్ని logs? ఏవి పోవచ్చు? ఎక్కడికి?</text><rect class="n-acc" x="0" y="70" width="120" height="38" rx="3"/><text class="t-w mid" x="60" y="94">8 నిమి</text><text class="t-sm" x="136" y="94">Levels · appenders · <tspan class="t-acc">సోమరి సందేశం</tspan></text><rect class="n-acc" x="0" y="114" width="160" height="38" rx="3"/><text class="t-w mid" x="80" y="138">10 నిమి — Async</text><text class="t-sm" x="176" y="138">p99 ఎందుకు ముఖ్యం · batching</text><rect class="n-good" x="0" y="158" width="230" height="38" rx="3"/><text class="t mid" x="115" y="182">14 నిమి — Shedding</text><text class="t-sm" x="246" y="182"><tspan class="t-acc">ఇక్కడే మీరు నిలబడతారు</tspan></text><rect class="n-soft" x="0" y="202" width="110" height="38" rx="3"/><text class="t mid" x="55" y="226">7 నిమి</text><text class="t-sm" x="246" y="226">context · sampling · rotation</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **ఆపేసిన log కూడా ఖరీదే** (§4) — "the argument is built before the level check runs." ఇది 30 సెకన్లు మరియు చాలా మంది దీన్ని ఎప్పుడూ ఆలోచించలేదు.
2. **Logging request path lo ఉండకూడదు** (§7) — మరియు **సగటు కాదు, p99** చెప్పండి.
3. **"ఏవి పోవచ్చు?" అని మీరే అడగండి** (§2, §10) — "logs can be lost" కాదు, "which logs can be lost".
4. **DROP_NEW మరియు DROP_OLD రెండూ ERROR లని మింగేస్తాయి** (§10) — **ఇదే ఈ interview యొక్క కేంద్రం**. 47% అనే సంఖ్య చెప్పకపోయినా, *ఎందుకు* అని వివరించండి: queue lo 70% DEBUG ఉంటే, క్రమం ప్రకారం వదిలేస్తే అదే నిష్పత్తిలో ERROR పోతుంది.
5. **`child(fields)` / correlation id** (§12) — ఇది ఆచరణాత్మక అనుభవాన్ని చూపిస్తుంది.

### ఏమి వదిలేయాలి

- **`Record.format()` రాయొద్దు** — "structured fields, rendered by the appender" ఒక వాక్యం.
- **File rotation, compression** — §16, అడిగితేనే.
- **Thread safety వివరాలు** — "the queue needs to be concurrent; in Java I'd use an ArrayBlockingQueue or a Disruptor" అని చెప్పి ముందుకి.
- **`LevelQueue` పూర్తిగా రాయొద్దు** — `push` lo shedding భాగం చాలు.

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"Three questions. How many log lines per second, and what does that look like during an incident rather than on a normal day? Where do they go — console, file, or over the network? And can logs be dropped — specifically, which ones?<br><br>
I'll start with something small that surprises people. A logger has a level check, so a debug call in production costs nothing, right? It doesn't. When you write log.debug of 'request: ' plus describeRequest, the argument is evaluated before the call happens — the string concatenation, the JSON stringify, all of it — and only then does the logger check the level and throw it away. I measured two hundred thousand filtered debug calls: zero lines written, two hundred thousand invocations of the expensive function, about seventy milliseconds burned. And debug logging is densest in hot code, so that cost lands exactly where it hurts. The fix is to make the message lazy — accept a closure, or expose isEnabled, or take the message as separate fields and only join them after the level check. That took seventy milliseconds down to two.<br><br>
Second: logging must not sit on the request path. Writing straight to a file is fine on average — about one and a half microseconds a line — but appenders aren't uniform. A disk flush, a log rotation, a network hiccup, and one call blocks for milliseconds. I simulated an appender that stalls twenty milliseconds every couple of hundred lines: p99 request latency went from one millisecond to twenty-one. The customer didn't ask for a log line and they paid for it. So the request thread does a queue push and nothing else, and a separate worker drains the queue into appenders in batches.<br><br>
That queue is where the real design decision is, and it's the part I'd want to be judged on. Unbounded is not an option — during an incident log volume goes up by orders of magnitude, and an unbounded queue means the logging system kills the process. Logs shouldn't be able to take down the server they're describing. So it's bounded, and when it fills something has to go.<br><br>
The two obvious policies are drop-newest and drop-oldest, and both are wrong in the same way. They shed by arrival order without looking at what they're shedding. If the queue is seventy percent debug lines, then dropping by position throws away errors in roughly that same proportion. I measured it on an incident-shaped workload: both policies lost about forty-seven percent of error lines. And notice when that happens — the queue only fills when the system is struggling, which is precisely the moment you're grepping for those errors.<br><br>
So the queue should shed by level, not by position: drop the lowest-severity record present, and if the incoming record is itself the lowest, drop that. Same workload, a hundred percent of errors survive, and about ninety-five percent of debug lines are the ones sacrificed — which is exactly the trade you want. I'd keep one sub-queue per level so that's O(1) rather than scanning, and drain highest-severity first so a lagging consumer still emits the important lines. And I'd count drops per level, because four hundred thousand dropped debug lines is a health signal and three dropped errors is an alarm.<br><br>
Last practical thing: a child logger that carries context — a request id, a user, a service name — so every line from one request is greppable as a unit without threading that id through every call."
</div>

---

## 16. Follow-ups — sampling, rotation, distributed tracing

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "JSON గా రాయాలి" | `Record.format()` కి బదులు ఒక `JsonFormatter` | **+1 కొత్తది** |
| "ఒక్కో appender కి వేరే స్థాయి" | Appender కి సొంత `minLevel` | `write` lo ఒక filter |
| "File 100 MB దాటితే కొత్తది" | `RotatingAppender` — పరిమాణం/తేదీ ప్రకారం | **+1 కొత్తది** |
| "నడుస్తుండగా స్థాయి మార్చాలి" | `setLevel` ఇప్పటికే ఉంది | **0** |
| "ఎన్ని logs వదిలేశామో చూడాలి" | `queue.dropped` ఇప్పటికే ఉంది → Deep Dive 19 counters | **0 concepts** |
| "ఒకే error వెయ్యి సార్లు వస్తోంది" | కింద చూడండి | Sampling layer |
| "పది services మీద ఒక request" | కింద చూడండి | Tracing layer |

### Sampling — shedding కంటే తెలివైనది

> *"§11 lo నేను queue నిండాక వదిలేస్తున్నాను. కానీ ఒక సాధారణ నమూనా ఉంది: <b>ఒకే సందేశం వేల సార్లు</b>. ఒక DB కనెక్షన్ పోతే, ప్రతి request ఒకే ERROR రాస్తుంది.*
>
> ***అప్పుడు queue నింపడం అర్ధరహితం** — ఆ వెయ్యి పంక్తుల్లో ఒకటి చదివితే చాలు. కాబట్టి queue కి ముందే ఒక <b>sampler</b>: "ఒకే సందేశం సెకనుకి గరిష్ఠంగా 10 సార్లు; మిగతావి లెక్కించి, చివర్లో 'ఇంకా 4,312 సార్లు' అని ఒక పంక్తి."*
>
> *ఇది <b>shedding కంటే మేలు</b> — shedding ఏది పోయిందో మర్చిపోతుంది; sampling <b>ఎన్ని జరిగాయో చెప్తుంది</b>. Go యొక్క <code>zap</code>, Rust యొక్క <code>tracing</code> — రెండింట్లోనూ ఇది ఉంది."*

### Distributed tracing

> *"§12 యొక్క <code>child({ reqId })</code> ఒక్క సర్వర్ కి సరిపోతుంది. కానీ ఒక request పది services గుండా వెళితే?*
>
> ***అదే ఆలోచన, ఒక అడుగు ముందుకి:** ఆ id ని <b>services మధ్య పంపడం</b> — ఒక HTTP header గా. దానికి ఒక ప్రమాణం ఉంది: <b>W3C Trace Context</b> (<code>traceparent</code> header).*
>
> *అప్పుడు <code>traceId</code> అన్ని services logs lo కనిపిస్తుంది, మరియు ఒక్క query తో మొత్తం ప్రయాణం కనిపిస్తుంది.*
>
> ***మరియు గమనించండి — నా <code>fields</code> నిర్మాణం దీనికి సిద్ధంగా ఉంది.** <code>child({ traceId, spanId })</code> — కొత్త concept ఏమీ లేదు, ఒక కొత్త field మాత్రమే."*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **తనిఖీ ఖర్చుకి ముందు ఉండాలి** | సోమరి సందేశం (§5) | Assertions, feature flags, validation |
| **సగటు కాదు, p99** | 2 ms సగటు, 21 ms p99 (§7) | ప్రతి latency సంభాషణ |
| **అపరిమిత queue ఒక memory leak** | §8 | Deep Dive 07 §7 · producers/consumers |
| **అన్ని items సమానం కావు** | Level-aware shedding (§11) | Priority queues, QoS, load shedding |
| **వదిలేసినదాన్ని కూడా లెక్కించు** | `dropped` ఒక్కో స్థాయికీ (§11) | Metrics, sampling, rate limits |
| **Context ని మోయడం** | `child(fields)` (§12) | Tracing, tenancy, auth |
| **Optimisation ని reference తో పోల్చు** | O(1) vs O(n) (§11) | Deep Dive 11 §8, 13 §5, 17 §12 |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — ఈ problem యొక్క నిజమైన పాఠం</div>
ఈ doc lo మూడు విరుపులూ ఒకే లక్షణాన్ని పంచుకుంటాయి: <b>అవి సాధారణ సమయంలో కనిపించవు.</b><br><br>
DEBUG ఆఫ్ ఉన్నప్పుడు ఖర్చు కనిపించదు — CPU గ్రాఫ్ కొంచెం ఎక్కువ ఉంటుంది, అంతే. Appender ఆగడం కనిపించదు — p50 బాగానే ఉంటుంది. Queue నిండటం కనిపించదు — సాధారణ రోజున అది ఎప్పుడూ నిండదు.<br><br>
<b>మూడూ ఒకేసారి కనిపిస్తాయి: ఒక ఘటన సమయంలో.</b> CPU నిండినప్పుడు, disk నెమ్మదైనప్పుడు, errors పెరిగినప్పుడు — మరియు సరిగ్గా అప్పుడే మీరు logs మీద ఆధారపడతారు.<br><br>
<b>అందుకే logging framework ని "సాధారణ లోడ్" తో పరీక్షించడం అర్ధరహితం.</b> దాన్ని పరీక్షించాల్సినది అది <b>విఫలమయ్యే పరిస్థితిలోనే</b> — మరియు ఈ doc lo నేను చేసినది అదే: ఘటన సమయపు నిష్పత్తులతో, నెమ్మది consumer తో, ఆగే appender తో.
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b> · <b>14 Text Editor</b> · <b>15 Library</b> · <b>16 Tic-Tac-Toe</b> · <b>17 Autocomplete</b> · <b>18 Snake &amp; Ladder</b> · <b>19 Hit Counter</b> · <b>20 Vending Machine</b> · <b>21 ATM</b> · <b>22 Logging</b>.<br><br>
<b>Deep Dive 07 (Pub-Sub)</b> ఈ doc కి జంట — అక్కడ queue ఒక decoupling సాధనం; ఇక్కడ queue ఒక <i>ఎంపిక</i> చేయాల్సిన చోటు.
</div>

---

_Logging Framework — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ప్రతి శాతం నిజంగా `node` lo run చేసి తీసినదే ✅_
