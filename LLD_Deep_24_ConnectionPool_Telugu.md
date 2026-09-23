<!-- style: editorial -->
<!-- footer: Connection Pool · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">24</div>
<div class="kicker">Deep Dive 24 · పది connections, వెయ్యి requests</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>Connection<br>Pool</div>
<div class="lede">ప్రతి web app · ప్రతి microservice · HikariCP, pgbouncer, database/sql — "connections ని ఒక జాబితాలో పెట్టి తిరిగి వాడదాం" అని అందరూ మొదలుపెడతారు.</div>
<div class="sub">మూడు విరుపులు. మొదటిది pool ఖాళీ అయినప్పుడు — <b>undefined</b>, ఆ తర్వాత "ఎదురుచూద్దాం" అనే సహజ పరిష్కారం ఆలస్యాన్ని <b>1,990 ms</b> కి తీసుకెళ్తుంది, ఇంకా పెరుగుతూనే. రెండోది — కేవలం <b>9 లీక్‌లు 52% requests ని</b> చంపుతాయి. మూడోది ఒక నిశ్శబ్ద రాత్రి తర్వాత <b>750 queries విఫలం</b>, సరిగ్గా రద్దీ మొదలైన క్షణంలో.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 24</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి సంఖ్య నిజంగా `node` lo run చేసినదే.**

<div class="box warn">
<div class="lab">Deep Dive 22 (Logging Framework) చదివారా? — ఇది ఆ queue కథ కాదు</div>
DD 22 lo <code>LevelQueue</code> చూశాం — queue నిండితే తక్కువ ముఖ్యమైన వాటిని <b>వదిలేయడం</b>. ఆ ఆలోచన ఇక్కడ §5 lo మళ్ళీ వస్తుంది, కాబట్టి దాన్ని మళ్ళీ మొదటి నుంచి వివరించను.<br><br>
Connection pool యొక్క నిజమైన problem పూర్తిగా వేరేది, మరియు అది ఒక్క వాక్యంలో ఉంది:<br><br>
<b>ఒక log line ని వదిలేయడం <i>ఉచితం</i>. ఒక connection ని వదిలేయడం <i>శాశ్వతం</i>.</b><br><br>
Logging lo queue lo ఉన్నది ఒక <i>సందేశం</i> — పోతే పోయింది, system ఆరోగ్యంగానే ఉంటుంది. ఇక్కడ queue lo ఉన్నది ఒక <b>ఎదురుచూస్తున్న user</b>, మరియు వనరు <b>తిరిగి రావాలి</b>. తిరిగి రాకపోతే అది ఎప్పటికీ పోయినట్టే — మరియు ఏ programming language కూడా ఆ తిరిగి రావడాన్ని బలవంతం చేయదు. అదే §7.<br><br>
మరియు §10 — DD 22 lo appender ఎప్పుడూ చావదు. ఇక్కడ connection <b>మనకు చెప్పకుండా</b> చచ్చిపోతుంది, మరియు అది చచ్చిందని మనకు తెలిసేది <b>user ఒక query పంపినప్పుడే</b>.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు pool అసలు ఎందుకు ఉంది?
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: pool ఖాళీ అయితే**

3. Step — ఒక జాబితా · `borrow` మరియు `release`
4. **మొదటి విరుపు** — `undefined`, ఆ తర్వాత అంతులేని ఎదురుచూపు
5. Step — గడువు · "లేదు" అని చెప్పగలగడం

**Part 3 — రెండో విరుపు: తిరిగి రాని connections**

6. Step — బయట ఎన్ని ఉన్నాయో లెక్కపెట్టడం
7. **రెండో విరుపు** — 9 లీక్‌లు, సగం system చచ్చిపోయింది
8. Step — `use()` · మరియు నా reaper చేసిన తప్పు

**Part 4 — మూడో విరుపు: చచ్చిన connections**

9. Step — pool ని రాత్రంతా ఉంచడం
10. **మూడో విరుపు** — 750 వైఫల్యాలు, సరిగ్గా రద్దీ మొదలైన క్షణంలో
11. Step — ఖాళీగా కూర్చున్నదాన్ని మాత్రమే పరీక్షించడం

**Part 5 — పూర్తి system**

12. Step — pool పరిమాణం ఎంత ఉండాలి? (పెద్దది చేస్తే **ఘోరం**)
13. మొత్తం code · 3,000 యాదృచ్ఛిక ప్రయోగాలు · **నాలుగు నియమాలు**

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — circuit breaker, బహుళ databases, async/await
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు pool అసలు ఎందుకు ఉంది?

"Database connection pool design చెయ్యి" అంటే చాలామంది వెంటనే `Array` మరియు `pop()` గురించి మాట్లాడతారు. కానీ ముందు **ఈ వస్తువు అసలు ఎందుకు ఉంది** అన్నది స్పష్టంగా చెప్పాలి — ఎందుకంటే మిగతా ప్రతి నిర్ణయం దాని నుంచే వస్తుంది.

ఒక database connection తెరవడం ఖరీదైనది: TCP handshake, TLS, తర్వాత authentication. అది సుమారు **30 ms**. అసలు query **2 ms**. అంటే ప్రతి query కి కొత్త connection తెరిస్తే, పనిలో **94% సమయం తెరవడానికే** పోతుంది.

<div class="box">
<div class="lab">ఇక్కడ 30 ms మరియు 2 ms నేను <b>ఊహించిన</b> ఖర్చులు — అవి మీ network మీద ఆధారపడతాయి. కానీ వాటి <i>పర్యవసానం</i> కొలిచినదే:</div>
</div>

```
1,000 queries · ఒక్కో connection తెరవడానికి 30 ms · ఒక్కో query 2 ms

  విధానం                    | తెరిచిన connections | సగటు latency | మొత్తం సమయం
  --------------------------+---------------------+--------------+-------------
  ప్రతి query కీ కొత్తది    |                1000 |      32.0 ms |     3029 ms
  pool (10)                 |                  10 |       2.0 ms |     2999 ms
```

**16× తక్కువ latency, 100× తక్కువ connections.** ఇదే pool ఉనికికి కారణం.

కానీ రెండో కారణం ఇంకా ముఖ్యమైనది, మరియు అది interview lo చాలా తక్కువమంది చెప్తారు:

<div class="box good">
<div class="lab">Pool యొక్క రెండో పని — మరియు అసలు ముఖ్యమైనది</div>
Database కి <b>ఒక గరిష్ఠ పరిమితి</b> ఉంటుంది (Postgres lo <code>max_connections</code>, సాధారణంగా 100). అది దాటితే database <i>కొత్త connections ని తిరస్కరించడం</i> మొదలుపెడుతుంది — అంటే <b>అప్పటికే నడుస్తున్న</b> queries తో సహా అంతా చెడిపోతుంది.<br><br>
కాబట్టి pool అనేది కేవలం <b>వేగం కోసం cache కాదు</b>. అది మీ app మరియు database మధ్య ఒక <b>అడ్డుకట్ట (limiter)</b>. అది database ని మీ స్వంత traffic నుంచి కాపాడుతుంది.<br><br>
ఈ రెండో పనే §12 lo "pool ని పెద్దది చేస్తే ఘోరం" అనే ఫలితానికి కారణం.
</div>

<svg viewBox="0 0 750 264"><text class="t-xs" x="0" y="14">Pool ఎక్కడ కూర్చుంటుంది — మరియు అది దేన్ని కాపాడుతుంది</text><rect class="n-info" x="0" y="28" width="120" height="44" rx="4"/><text class="t-sm mid" x="60" y="55">Request 1</text><rect class="n-info" x="0" y="80" width="120" height="44" rx="4"/><text class="t-sm mid" x="60" y="107">Request 2</text><rect class="n-info" x="0" y="132" width="120" height="44" rx="4"/><text class="t-sm mid" x="60" y="159">Request 3</text><rect class="n-soft" x="0" y="184" width="120" height="44" rx="4"/><text class="t-sm mid" x="60" y="211">… 1,000</text><line class="ln-acc" x1="124" y1="50" x2="256" y2="110" marker-end="url(#aa)"/><line class="ln-acc" x1="124" y1="102" x2="256" y2="118" marker-end="url(#aa)"/><line class="ln-acc" x1="124" y1="154" x2="256" y2="128" marker-end="url(#aa)"/><line class="ln-acc" x1="124" y1="206" x2="256" y2="138" marker-end="url(#aa)"/><rect class="n-acc" x="260" y="88" width="180" height="72" rx="4"/><text class="t-w mid" x="350" y="114">Pool</text><text class="t-w-sm mid" x="350" y="136">10 connections మాత్రమే</text><text class="t-w-sm mid" x="350" y="152">— అంతకు మించి లేదు —</text><line class="ln-acc" x1="444" y1="124" x2="556" y2="124" marker-end="url(#aa)"/><rect class="n-dark" x="560" y="88" width="190" height="72" rx="4"/><text class="t-w mid" x="655" y="118">Database</text><text class="t-w-sm mid" x="655" y="140">max_connections = 100</text><rect class="n-good" x="0" y="242" width="750" height="0" rx="4"/><text class="t-sm mid" x="375" y="252">వెయ్యి requests లోపలికి · <tspan class="t-acc">పది</tspan> బయటికి. ఆ సంకోచమే pool యొక్క అసలు విలువ.</text></svg>

**కాబట్టి మనం design చేస్తున్నది:** పరిమిత సంఖ్యలో ఖరీదైన, **తిరిగి వాడదగిన** వస్తువులను పంచే ఒక వ్యవస్థ — అవి **తప్పక తిరిగి రావాలి**, మరియు అవి **మనకు చెప్పకుండా చచ్చిపోగలవు**.

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

Interview lo ఈ ప్రశ్నలు అడగడం వల్ల మీరు ఈ problem ని ఇంతకుముందు ఆలోచించారని తెలుస్తుంది. ప్రతిదానికీ **ఎందుకు అడుగుతున్నామో** కూడా ఇచ్చాను — interviewer అదే వినాలనుకుంటాడు.

| ప్రశ్న | ఎందుకు అడుగుతున్నాం |
|---|---|
| Pool ఖాళీ అయితే ఏమి జరగాలి — ఎదురుచూడాలా, తిరస్కరించాలా? | ఇదే §4/§5 మొత్తం. "ఎదురుచూడు" అనేది సమాధానం కాదు, అది **ఆలస్యాన్ని అపరిమితం** చేస్తుంది |
| ఎదురుచూసేవాళ్ళ క్రమం FIFO నా? | FIFO కాకపోతే కొందరు **ఎప్పటికీ** connection పొందరు (starvation) |
| Connection ని తిరిగి ఇవ్వడం మర్చిపోతే? | లీక్. §7 lo 9 లీక్‌లు 52% system ని చంపుతాయి |
| Database restart అయితే pool కి తెలుస్తుందా? | తెలియదు. §10 |
| Pool పరిమాణం ఎవరు నిర్ణయిస్తారు — మనమా, DBA యా? | సమాధానం DBA. §12 lo ఎందుకో కొలుస్తాం |
| ఒకే database యా, read-replica కూడా ఉందా? | ఉంటే pool ఒకటి కాదు, **ఒక్కో లక్ష్యానికి ఒకటి**. §16 |
| Transaction మధ్యలో connection మారవచ్చా? | **కూడదు** — transaction అంతా ఒకే connection మీదే. ఇది `use()` design ని నిర్ణయిస్తుంది |

<div class="box warn">
<div class="lab">ఒక ప్రశ్న అడగకూడదు</div>
"Thread-safe గా ఉండాలా?" అని అడగవద్దు — <b>అవును</b>, ఎప్పుడూ. Pool అంటేనే పంచుకునే వస్తువు. అది అడిగితే మీరు ఈ problem ని ఇంకా అర్థం చేసుకోలేదని అర్థం.<br><br>
బదులుగా చెప్పండి: <i>"JavaScript single-threaded కాబట్టి ఇక్కడ lock అవసరం లేదు, కానీ Java lo ఇదే code కి <code>free</code> జాబితా మరియు <code>waiters</code> రెండింటి మీదా ఒకే lock కావాలి — లేదా <code>ArrayBlockingQueue</code>."</i> అది మీకు రెండూ తెలుసని చూపిస్తుంది.
</div>

---

# Part 2 — మొదటి విరుపు: pool ఖాళీ అయితే

---

## 3. Step — ఒక జాబితా · `borrow` మరియు `release`

మొదట అందరూ రాసే code. ఇది తప్పు కాదు — ఇది **అసంపూర్ణం**, మరియు ఎక్కడ అసంపూర్ణమో చూడటమే ఈ Part.

```javascript
class NaivePool {
  constructor(size) {
    this.free = [];
    for (let i = 0; i < size; i++) this.free.push({ id: i + 1 });
  }
  borrow()  { return this.free.pop(); }
  release(c) { this.free.push(c); }
}
```

మూడు పంక్తులు. `borrow` ఒకటి తీస్తుంది, `release` వెనక్కి పెడుతుంది. నడిపి చూద్దాం:

```javascript
const pool = new NaivePool(3);
console.log('  pool పరిమాణం : 3\n');

const a = pool.borrow(), b = pool.borrow(), c = pool.borrow();
console.log('  మూడూ తీసుకున్నాం :', a.id + ',', b.id + ',', c.id);

const d = pool.borrow();            // ← నాలుగోది
console.log('  నాలుగోది         :', d);

console.log('\n  → undefined. తర్వాతి పంక్తి ఏమవుతుంది?');
try { d.query('SELECT 1'); }
catch (e) { console.log('   ', e.constructor.name + ':', e.message); }
```

```
  pool పరిమాణం : 3

  మూడూ తీసుకున్నాం : 3, 2, 1
  నాలుగోది         : undefined

  → undefined. తర్వాతి పంక్తి ఏమవుతుంది?
    TypeError: Cannot read properties of undefined (reading 'query')
```

---

## 4. మొదటి విరుపు — `undefined`, ఆ తర్వాత అంతులేని ఎదురుచూపు

ఆ `TypeError` ని జాగ్రత్తగా చదవండి. అది **అబద్ధం చెప్తోంది**.

నిజమైన సమస్య "connection మీద `query` లేదు" కాదు. నిజమైన సమస్య **"మా database సామర్థ్యం అయిపోయింది"**. కానీ ఆ TypeError ని చూసిన developer రాత్రంతా `query` method ఎక్కడ పోయిందా అని వెతుకుతాడు.

<div class="box bad">
<div class="lab">పాఠం — సామర్థ్య లోపాన్ని <code>undefined</code> గా అనువదించకూడదు</div>
<code>undefined</code> తిరిగి ఇవ్వడం వల్ల <b>ఏమి జరిగిందో</b> అనే సమాచారం పూర్తిగా పోతుంది. Stack trace <i>వాడిన చోట</i> చూపిస్తుంది, <i>అసలు కారణం</i> దగ్గర కాదు.<br><br>
ఇది ఈ doc lo పదేపదే వచ్చే విషయం: <b>సమస్య పుట్టిన చోటే దాని పేరు చెప్పాలి.</b>
</div>

సరే, మరి ఏమి చెయ్యాలి? సహజమైన సమాధానం అందరికీ వెంటనే వస్తుంది: **"ఖాళీ లేకపోతే ఒకటి ఖాళీ అయ్యేవరకు ఎదురుచూడు."**

దాన్ని రాద్దాం:

```javascript
class WaitingPool {
  constructor(sim, size) {
    this.sim = sim; this.free = []; this.waiters = [];
    for (let i = 0; i < size; i++) this.free.push({ id: i + 1 });
  }
  borrow(cb) {
    if (this.free.length) return cb(this.free.pop());
    this.waiters.push(cb);                    // ఎదురుచూసేవాళ్ళ వరుస
  }
  release(c) {
    const w = this.waiters.shift();           // FIFO — మొదట అడిగినవాడికి మొదట
    if (w) return w(c);                       // connection ని నేరుగా అప్పగించు
    this.free.push(c);
  }
}
```

ఇది మెరుగ్గా అనిపిస్తుంది. `undefined` లేదు, `TypeError` లేదు, ఎవరూ తిరస్కరించబడలేదు. **ఇదే చాలా interviews lo "సరైన" సమాధానంగా చెప్పబడుతుంది.**

కొలిచి చూద్దాం. Pool 10, ప్రతి 5 ms కి ఒక request:

```
pool 10 · ప్రతి 5 ms కి ఒక request · ఒక్కో request 40 ms పడుతుంది

  (10 connections × 5 ms = 50 ms సామర్థ్యం · demand 40 ms — సరిపోతుంది)

  arrivals |  served |  p50 wait |  p99 wait |  గరిష్ఠ wait
  ---------+---------+-----------+-----------+--------------
       500 |     500 |      0 ms |      0 ms |         0 ms
      2000 |    2000 |      0 ms |      0 ms |         0 ms
```

అద్భుతం. ఒక్క ms కూడా ఎదురుచూపు లేదు, 2,000 requests అయినా ఫరవాలేదు.

ఇప్పుడు **ఒక్కటే మార్పు**: requests కొంచెం నెమ్మదిగా అవుతాయి — 40 ms కి బదులు **60 ms**. అంటే demand సామర్థ్యాన్ని కేవలం 20% దాటింది:

```
  arrivals |  served |  p50 wait |  p99 wait |  గరిష్ఠ wait
  ---------+---------+-----------+-----------+--------------
       500 |     500 |    250 ms |    490 ms |       490 ms
      2000 |    2000 |   1000 ms |   1980 ms |      1990 ms
```

<div class="box bad">
<div class="lab">ఈ రెండు వరుసలని పక్కపక్కన చూడండి — ఇదే మొదటి విరుపు</div>
500 requests → గరిష్ఠ ఎదురుచూపు <b>490 ms</b>.<br>
2,000 requests → గరిష్ఠ ఎదురుచూపు <b>1,990 ms</b>.<br><br>
<b>4× ఎక్కువ requests → 4× ఎక్కువ ఎదురుచూపు.</b> ఇది స్థిరపడదు. 20,000 requests వస్తే 20 సెకన్లు. 2,00,000 వస్తే 200 సెకన్లు.<br><br>
మరియు గమనించండి — <b>served ఎప్పుడూ 100%</b>. ప్రతి request "విజయవంతమైంది". మీ error rate dashboard <b>పచ్చగా</b> ఉంటుంది. కానీ మీ users 2 సెకన్లు ఎదురుచూస్తున్నారు, మరియు అది పెరుగుతూనే ఉంది.
</div>

<svg viewBox="0 0 750 286"><text class="t-xs" x="0" y="14">సామర్థ్యాన్ని 20% దాటితే — ఎదురుచూపు ఆగదు, పేరుకుపోతుంది</text><text class="t-sm" x="0" y="42">వచ్చేవి : 5 ms కి ఒకటి</text><text class="t-sm" x="430" y="42">పోయేవి : 6 ms కి ఒకటి</text><rect class="n-good" x="0" y="54" width="300" height="34" rx="4"/><text class="t-sm mid" x="150" y="76">200 / సెకను</text><rect class="n-bad" x="430" y="54" width="300" height="34" rx="4"/><text class="t-sm mid" x="580" y="76">166 / సెకను</text><line class="ln-acc" x1="304" y1="71" x2="426" y2="71" marker-end="url(#aa)"/><text class="t-xs mid" x="365" y="64">pool</text><rect class="n-soft" x="0" y="106" width="750" height="46" rx="4"/><text class="t-sm mid" x="375" y="126">ప్రతి సెకనుకూ <tspan class="t-acc">34 requests</tspan> queue lo చేరుతాయి — మరియు ఎప్పటికీ బయటికి రావు</text><text class="t-xs mid" x="375" y="145">queue పొడవు = సమయం × 34 · ఎదురుచూపు = queue పొడవు ÷ 166</text><text class="t-xs" x="0" y="178">గరిష్ఠ ఎదురుచూపు</text><rect class="n-good" x="0" y="186" width="122" height="22" rx="3"/><text class="t-xs" x="130" y="202">490 ms · 500 requests</text><rect class="n-bad" x="0" y="214" width="497" height="22" rx="3"/><text class="t-xs" x="505" y="230">1,990 ms · 2,000 requests</text><rect class="n-dark" x="0" y="250" width="750" height="34" rx="4"/><text class="t-w-sm mid" x="375" y="272">ఎదురుచూడటం ఒక పరిష్కారం కాదు — అది <tspan class="t-acc">సమస్యని కనపడకుండా చేయడం</tspan>.</text></svg>

<div class="box">
<div class="lab">DD 22 తో సంబంధం</div>
DD 22 §9 lo <b>అపరిమిత queue</b> memory ని తినేస్తుందని చూశాం, మరియు దానికి పరిమితి పెట్టాం. ఇక్కడ అదే వ్యాధి, కానీ లక్షణం వేరు — <b>memory కాదు, సమయం</b> పెరుగుతోంది.<br><br>
ఎందుకంటే ఇక్కడ queue lo ఉన్నది ఒక సందేశం కాదు, <b>ఒక వ్యక్తి</b>. ఆ వ్యక్తికి browser tab తెరిచి ఉంది, మరియు అతని HTTP request కి కూడా ఒక గడువు ఉంది.
</div>

---

## 5. Step — గడువు · "లేదు" అని చెప్పగలగడం

పరిష్కారం ఒక్క మాటలో: **ఎదురుచూపుకి ఒక గడువు పెట్టాలి, మరియు గడువు దాటితే స్పష్టంగా తిరస్కరించాలి.**

```javascript
class Pool {
  constructor(sim, size, { timeoutMs = Infinity } = {}) {
    this.sim = sim; this.free = []; this.waiters = [];
    this.timeoutMs = timeoutMs;
    for (let i = 0; i < size; i++) this.free.push({ id: i + 1 });
  }
  borrow(cb) {
    if (this.free.length) return cb(null, this.free.pop());
    const w = { cb, dead: false };
    this.waiters.push(w);
    if (this.timeoutMs === Infinity) return;
    this.sim.after(this.timeoutMs, () => {
      if (w.dead) return;                              // ఈలోపు connection దొరికింది
      w.dead = true;
      this.waiters.splice(this.waiters.indexOf(w), 1);
      cb({ reason: 'POOL_TIMEOUT' }, null);            // స్పష్టమైన తిరస్కరణ
    });
  }
  release(c) {
    while (this.waiters.length) {
      const w = this.waiters.shift();
      if (w.dead) continue;                            // గడువు దాటినవాడిని దాటేయ్
      w.dead = true;
      return w.cb(null, c);
    }
    this.free.push(c);
  }
}
```

రెండు చిన్న విషయాలు ముఖ్యమైనవి:

**ఒకటి — `dead` అనే గుర్తు.** ఒక waiter కి గడువు దాటింది అని చెప్పాక, ఇంకెప్పుడూ అతనికి connection ఇవ్వకూడదు. `dead` లేకపోతే `release` అతనికి connection అప్పగిస్తుంది — కానీ అతని callback అప్పటికే "విఫలం" అని చెప్పేసింది. ఆ connection **అక్కడే పోతుంది** (§7 lo చూసే లీక్).

**రెండు — `release` lo `while`, `if` కాదు.** `waiters` జాబితాలో చచ్చిన waiters ఉండొచ్చు. `if` వాడితే చచ్చినవాడిని తీసి connection ని పారేస్తాం. `while` బతికి ఉన్నవాడు దొరికేవరకు వెతుకుతుంది.

ఇప్పుడు వేర్వేరు గడువులతో కొలిచి చూద్దాం — సామర్థ్యం కంటే ఎక్కువ demand ఉన్నప్పుడు:

```
pool 10 · ప్రతి 5 ms కి request · ఒక్కో request 60 ms (సామర్థ్యం కంటే ఎక్కువ)

  గడువు      |  served |  తిరస్కృతం |  p50 wait |  p99 wait |  గరిష్ఠ wait
  -----------+---------+------------+-----------+-----------+--------------
  లేదు       |    2000 |          0 |   1000 ms |   1980 ms |      1990 ms
  500 ms     |    1750 |        250 |    500 ms |    500 ms |       500 ms
  200 ms     |    1700 |        300 |    200 ms |    200 ms |       200 ms
  100 ms     |    1684 |        316 |    100 ms |    100 ms |       100 ms
```

<div class="box good">
<div class="lab">ఈ పట్టికలో ముఖ్యమైనది "తిరస్కృతం" నిలువు వరుస కాదు — "గరిష్ఠ wait" వరుస</div>
గడువు లేకపోతే గరిష్ఠ ఎదురుచూపు <b>1,990 ms</b>, మరియు అది arrivals తో పెరుగుతుంది.<br><br>
గడువు పెడితే గరిష్ఠ ఎదురుచూపు <b>సరిగ్గా గడువే</b> — 500, 200, 100. అది ఎన్ని requests వచ్చినా మారదు. <b>మీరు latency మీద ఒక పైకప్పు పెట్టారు.</b><br><br>
మరియు 100 ms కీ 500 ms కీ మధ్య served లో తేడా కేవలం <b>66 requests</b> (1,684 vs 1,750) — 4% మాత్రమే. కానీ latency <b>5× తక్కువ</b>. అంటే <b>పొడవైన గడువు దాదాపు ఏమీ కొనదు.</b>
</div>

<div class="box warn">
<div class="lab">గడువు ఎంత పెట్టాలి? — ఒక నియమం</div>
Pool గడువు <b>మీ HTTP request గడువు కంటే తక్కువ</b> ఉండాలి. లేకపోతే ఇలా జరుగుతుంది: user యొక్క browser 2 సెకన్ల దగ్గర request ని వదిలేస్తుంది, కానీ మీ pool ఇంకా 3వ సెకనులో connection వెతుకుతూనే ఉంటుంది — <b>ఎవరూ లేని పని కోసం ఒక connection ఖర్చు.</b><br><br>
ఇది నిజమైన systems lo చాలా సాధారణమైన తప్పు, మరియు interview lo దీన్ని చెప్తే గుర్తుండిపోతారు.
</div>

**మొదటి విరుపు పూర్తయింది.** ఇప్పుడు pool ఖాళీ అయితే ఏమి జరుగుతుందో మనకు తెలుసు, మరియు దాన్ని మనమే నియంత్రిస్తున్నాం.

కానీ ఈ code lo ఒక **మౌనమైన** ఊహ ఉంది, మరియు అదే తర్వాతి విరుపు.

---

# Part 3 — రెండో విరుపు: తిరిగి రాని connections

---

## 6. Step — బయట ఎన్ని ఉన్నాయో లెక్కపెట్టడం

మన pool మొత్తం ఒక్క ఊహ మీద నిలబడి ఉంది:

> **`borrow()` చేసిన ప్రతి ఒక్కరూ చివరికి `release()` చేస్తారు.**

ఈ ఊహని ఎవరూ అమలు చేయడం లేదు. `free.pop()` చేశాక ఆ connection ఎక్కడికి పోయిందో pool కి **అస్సలు తెలియదు**. అది కేవలం "ఇక్కడ లేదు" అని మాత్రమే తెలుసు.

నిజమైన code ఇలా ఉంటుంది:

```javascript
// ఇది నిజమైన applications lo ప్రతిచోటా కనిపించే ఆకారం
function handleRequest(req, res) {
  pool.borrow((err, conn) => {
    if (err) return res.status(503).send('busy');
    const user = conn.query('SELECT * FROM users WHERE id = ?', req.id);
    if (!user) return res.status(404).send('not found');   // ← ఇక్కడ చూడండి
    res.send(user);
    pool.release(conn);
  });
}
```

ఆ `return res.status(404)` పంక్తిని చూడండి. User దొరకకపోతే function అక్కడే తిరిగి వెళ్ళిపోతుంది — **`pool.release(conn)` ఎప్పటికీ నడవదు.**

ఇది ఎవరో నిర్లక్ష్యంగా రాసిన code కాదు. ఇది **సహజమైన, శుభ్రంగా కనిపించే** code. Early return ఒక మంచి అలవాటు. కానీ ఇక్కడ అది ఒక connection ని శాశ్వతంగా మింగేస్తుంది.

అదే `throw` తోనూ, `await` విఫలమైనా, timeout తోనూ జరుగుతుంది.

<div class="box bad">
<div class="lab">లీక్ అంటే ఏమిటి — మరియు అది ఎందుకు ప్రత్యేకమైనది</div>
Memory leak lo మీరు memory కోల్పోతారు, కానీ garbage collector చాలావరకు కాపాడుతుంది.<br><br>
Connection leak <b>తిరిగి రాదు</b>. ఆ object ఇంకా JavaScript lo బతికే ఉంది (మీ closure దాన్ని పట్టుకుని ఉంది), కాబట్టి GC దాన్ని ముట్టుకోదు. Database వైపు ఆ connection ఇంకా తెరిచే ఉంది. కేవలం <b>pool కి అది ఎప్పటికీ తిరిగి రాదు.</b><br><br>
Pool పరిమాణం 10 అయితే, <b>10 లీక్‌లతో మీ app శాశ్వతంగా చచ్చిపోతుంది</b> — restart చేసేవరకు.
</div>

దీన్ని కనీసం **చూడగలగాలి** — అందుకే బయట ఎన్ని ఉన్నాయో లెక్కపెడదాం:

```javascript
stats() {
  return {
    free:  this.free.length,        // pool lo ఉన్నవి
    inUse: this.out.size,           // బయట ఉన్నవి
    live:  this.live.length,        // మొత్తం తెరిచినవి
  };
}
```

`free + inUse === live` — ఇది ఎప్పుడూ నిజం కావాలి. ఇదే మన మొదటి **నియమం (invariant)**, మరియు §13 lo దీన్ని 3,000 యాదృచ్ఛిక ప్రయోగాలతో పరీక్షిస్తాం.

---

## 7. రెండో విరుపు — 9 లీక్‌లు, సగం system చచ్చిపోయింది

ఇప్పుడు కొలుద్దాం. Pool 10, 4,000 requests, ఒక్కో request 40 ms. ప్రతి కొన్నో request ఒక exception విసురుతుంది మరియు `release` జరగదు.

నా ఊహ ఏమిటంటే: లీక్ రేటు తక్కువగా ఉంటే ప్రభావం తక్కువగా ఉంటుంది. **అది పూర్తిగా తప్పు.**

```
pool 10 · 4,000 requests · ఒక్కో request 40 ms

  లీక్ రేటు     | లీక్‌లు | పూర్తయినవి | తిరస్కృతం | విజయం % | pool చచ్చిన క్షణం
  --------------+-------+---------+-----------+---------+------------------
  లేదు           |     0 |    4000 |         0 |    100% |          —
  ప్రతి 1000వ    |     3 |    3910 |        90 |     98% |   16635 ms
  ప్రతి 500వ     |     6 |    3252 |       748 |     81% |    9135 ms
  ప్రతి 200వ     |     9 |    1912 |      2088 |     48% |    4395 ms
```

<div class="box bad">
<div class="lab">చివరి వరుసని మళ్ళీ చదవండి</div>
<b>9 లీక్‌లు.</b> 4,000 requests lo కేవలం తొమ్మిది.<br><br>
ఫలితం: <b>2,088 requests తిరస్కరించబడ్డాయి</b> (52%), మరియు pool <b>4.4 సెకన్లకే</b> పూర్తిగా చచ్చిపోయింది.<br><br>
ఇది 0.22% లోపం రేటు. అది <b>52% వైఫల్య రేటు</b> గా మారింది — <b>236 రెట్లు పెద్దది.</b>
</div>

ఎందుకు ఇంత తీవ్రం? ఎందుకంటే లీక్ ఒక **శాశ్వత నష్టం**, తాత్కాలికమైనది కాదు.

ఒక నెమ్మదైన query pool ని కొద్దిసేపు ఇబ్బంది పెడుతుంది, తర్వాత connection తిరిగి వస్తుంది. ఒక లీక్ ఆ connection ని **ఎప్పటికీ** తీసేస్తుంది. Pool యొక్క సామర్థ్యం 10 నుంచి 9 కి, 8 కి, 7 కి **ఒక దిశలో మాత్రమే** దిగుతుంది.

<svg viewBox="0 0 750 300"><text class="t-xs" x="0" y="14">pool lo ఖాళీగా ఉన్న connections — కాలక్రమంలో</text><text class="t-xs" x="0" y="42">లీక్ లేకుండా</text><rect class="n-good" x="0" y="50" width="86" height="20" rx="3"/><rect class="n-good" x="90" y="50" width="17" height="20" rx="3"/><rect class="n-good" x="180" y="50" width="17" height="20" rx="3"/><rect class="n-good" x="270" y="50" width="17" height="20" rx="3"/><rect class="n-good" x="360" y="50" width="17" height="20" rx="3"/><rect class="n-good" x="450" y="50" width="26" height="20" rx="3"/><rect class="n-good" x="540" y="50" width="26" height="20" rx="3"/><rect class="n-good" x="630" y="50" width="26" height="20" rx="3"/><text class="t-xs" x="676" y="65">నిలకడగా</text><text class="t-xs" x="0" y="98">ప్రతి 200వ దానిలో ఒక లీక్</text><rect class="n-bad" x="0" y="106" width="86" height="20" rx="3"/><text class="t-xs" x="94" y="121">0</text><text class="t-xs" x="184" y="121">0</text><text class="t-xs" x="274" y="121">0</text><text class="t-xs" x="364" y="121">0</text><text class="t-xs" x="454" y="121">0</text><text class="t-xs" x="544" y="121">0</text><text class="t-xs" x="634" y="121">0</text><text class="t-xs" x="676" y="121">ఎప్పటికీ 0</text><text class="t-xs" x="0" y="144">0 ms</text><text class="t-xs" x="90" y="144">2.5 s</text><text class="t-xs" x="180" y="144">5 s</text><text class="t-xs" x="270" y="144">7.5 s</text><text class="t-xs" x="360" y="144">10 s</text><text class="t-xs" x="450" y="144">12.5 s</text><text class="t-xs" x="540" y="144">15 s</text><text class="t-xs" x="630" y="144">17.5 s</text><rect class="n-soft" x="0" y="162" width="750" height="60" rx="4"/><text class="t-sm mid" x="375" y="186">రెండు వరుసల్లోనూ మొదటి క్షణంలో 10 ఖాళీ connections ఉన్నాయి.</text><text class="t-sm mid" x="375" y="210">కింది వరుసలో అవి <tspan class="t-acc">తిరిగి రాలేదు</tspan> — 2.5 సెకన్లకే pool ఖాళీ, మరియు అది శాశ్వతం.</text><rect class="n-dark" x="0" y="236" width="750" height="60" rx="4"/><text class="t-w-sm mid" x="375" y="260">నెమ్మదైన query = <tspan class="t-acc">తాత్కాలిక</tspan> ఒత్తిడి. లీక్ = <tspan class="t-acc">శాశ్వత</tspan> సామర్థ్య నష్టం.</text><text class="t-w-sm mid" x="375" y="284">అందుకే 0.22% లోపం 52% వైఫల్యం అవుతుంది.</text></svg>

<div class="box warn">
<div class="lab">Interview lo ఇది ఎందుకు బలమైన క్షణం</div>
చాలామంది "connection leak చెడ్డది" అని చెప్తారు. మీరు <b>"pool 10 తో, 4,000 requests lo 9 లీక్‌లు 52% traffic ని చంపుతాయి, మరియు pool 4.4 సెకన్లకే చచ్చిపోతుంది"</b> అని చెప్పగలిగితే — అది పూర్తిగా వేరే స్థాయి సమాధానం.<br><br>
ఎందుకంటే అది <b>లీక్ ఒక సాధారణ bug కాదు, అది ఒక రకమైన మరణం</b> అని చూపిస్తుంది.
</div>

---

## 8. Step — `use()` · మరియు నా reaper చేసిన తప్పు

రెండు పరిష్కారాలు కావాలి, మరియు **రెండూ** కావాలి.

### పరిష్కారం ఒకటి — `release` ని మర్చిపోవడం సాధ్యం కాకుండా చేయడం

అసలు సమస్య `release` ని *పిలవడం మర్చిపోవడం* కాదు. సమస్య ఏమిటంటే **API అది మర్చిపోవడాన్ని అనుమతిస్తోంది**.

కాబట్టి `borrow`/`release` ని బహిరంగ API గా ఇవ్వకూడదు. బదులుగా `use()` ఇవ్వాలి — అది `release` ని **మీ తరఫున** చేస్తుంది:

```javascript
use(work, done = () => {}) {
  this.borrow((err, c) => {
    if (err) return done(err, null);
    let released = false;
    const finish = (e, v) => {
      if (released) return;                    // రెండోసారి పిలిస్తే పట్టించుకోవద్దు
      released = true;
      this.release(c, { broken: !!e });
      done(e, v);
    };
    try { work(c, finish); }
    catch (e) { finish(e, null); }             // విసిరినా connection వెనక్కి
  });
}
```

మూడు విషయాలు ఇక్కడ జరుగుతున్నాయి:

**`try/catch`** — `work` ఒక exception విసిరినా connection వెనక్కి వెళ్తుంది. §6 lo చూసిన early-return bug ఇక్కడ సాధ్యం కాదు, ఎందుకంటే `release` ని పిలిచేది మీరు కాదు.

**`released` గుర్తు** — ఒకే connection ని రెండుసార్లు తిరిగి ఇవ్వడం **లీక్ కంటే ప్రమాదకరం**. అప్పుడు ఒకే connection ఇద్దరికి ఇవ్వబడుతుంది, మరియు ఒకరి query మధ్యలో ఇంకొకరి query వచ్చి కూర్చుంటుంది.

**`broken: !!e`** — పని విఫలమైతే ఆ connection మీద నమ్మకం పోయింది. అది transaction మధ్యలో ఆగిపోయి ఉండొచ్చు. దాన్ని తీసేసి కొత్తది తెరవడం సురక్షితం.

<div class="box good">
<div class="lab">ఇదే వాస్తవ పాఠం — మరియు ఇది pool కి మాత్రమే పరిమితం కాదు</div>
<b>సరిగ్గా వాడటం మీద ఆధారపడే API ని ఇవ్వకండి. సరిగ్గా వాడటం తప్ప వేరే దారి లేని API ఇవ్వండి.</b><br><br>
Python lo <code>with</code>, Java lo try-with-resources, Go lo <code>defer</code>, C++ lo RAII, Rust lo <code>Drop</code> — ప్రతి భాషా ఈ ఒక్క సమస్యకే ఒక ప్రత్యేక feature ఇచ్చింది. అది ఎంత ముఖ్యమో అది చెప్తుంది.
</div>

### పరిష్కారం రెండు — అయినా ఎవరో లీక్ చేస్తారు

`use()` ఉన్నా, ఎవరో ఒకరు `borrow()` ని నేరుగా వాడతారు. లేదా `finish` ని పిలవని ఒక callback రాస్తారు. కాబట్టి **చివరి రక్షణ** కావాలి: చాలాసేపు బయట ఉన్న connection ని **బలవంతంగా వెనక్కి లాగడం**.

నేను మొదట ఇలా రాశాను:

```javascript
#track(c) {
  this.out.set(c, this.sim.now);
  this.sim.after(this.reapAfterMs, () => {
    if (this.out.get(c) !== undefined) {      // ఇంకా బయటే ఉందా?
      this.reaped++;
      this.release(c);                        // బలవంతంగా వెనక్కి
    }
  });
}
```

కొలిస్తే ఫలితం **అద్భుతంగా** కనిపించింది — pool ఇక చావడం లేదు, 4,000 requests అన్నీ పూర్తయ్యాయి:

```
పరిష్కారం: 2 సెకన్ల కంటే ఎక్కువసేపు బయట ఉన్న connection ని బలవంతంగా వెనక్కి తీసుకోవడం

  లీక్ రేటు     | లీక్‌లు | పూర్తయినవి | తిరస్కృతం | విజయం % | pool చచ్చిన క్షణం
  --------------+-------+---------+-----------+---------+------------------
  ప్రతి 500వ     |     8 |    4000 |         0 |    100% |          —
                   (బలవంతంగా వెనక్కి తీసుకున్నవి: 77)
  ప్రతి 200వ     |    20 |    4000 |         0 |    100% |          —
                   (బలవంతంగా వెనక్కి తీసుకున్నవి: 391)
```

100% విజయం. కానీ **ఆ చివరి సంఖ్యని చూడండి.**

<div class="box bad">
<div class="lab">20 లీక్‌లు · 391 సార్లు "వెనక్కి లాగాం"</div>
లీక్ అయినవి 20 మాత్రమే. మరి 391 ఎక్కడి నుంచి వచ్చాయి?<br><br>
సమాధానం: <b>నా reaper లీక్ అవ్వని connections ని కూడా లాగేస్తోంది</b> — ఇప్పుడే ఇచ్చిన, చక్కగా పని చేస్తున్న వాటిని.<br><br>
అంటే ఒక query నడుస్తుండగానే దాని connection ని లాగేసి ఇంకొకరికి ఇచ్చేస్తున్నాను. <b>ఇది లీక్ కంటే చాలా ఘోరమైన bug</b> — మరియు ఇది 100% విజయ రేటు వెనక దాక్కుంది.
</div>

కారణం ఇది. `release()` ఒక connection ని నేరుగా ఒక waiter కి అప్పగించినప్పుడు, నేను `#track(c)` మళ్ళీ పిలుస్తాను — అది **కొత్త timer** పెడుతుంది. కానీ **పాత timer ఇంకా ఆగిపోలేదు.** అది 2 సెకన్ల తర్వాత మేల్కొని "ఈ connection ఇంకా బయటే ఉంది" అని చూస్తుంది — నిజమే, కానీ అది **వేరే ఎవరో** ఇప్పుడే తీసుకున్నది.

<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">ఒకే connection · రెండు timers · పాతది తప్పు పని చేస్తుంది</text><line class="ln" x1="60" y1="46" x2="700" y2="46"/><text class="t-xs" x="0" y="50">సమయం</text><text class="t-xs" x="60" y="38">0 s</text><text class="t-xs" x="300" y="38">2 s</text><text class="t-xs" x="520" y="38">4 s</text><rect class="n-info" x="60" y="60" width="200" height="30" rx="3"/><text class="t-xs mid" x="160" y="80">A తీసుకున్నాడు (0 s)</text><rect class="n-good" x="300" y="60" width="200" height="30" rx="3"/><text class="t-xs mid" x="400" y="80">B తీసుకున్నాడు (2.1 s)</text><text class="t-xs" x="60" y="112">timer 1 · A కోసం పెట్టినది</text><line class="ln-acc" x1="60" y1="122" x2="340" y2="122" marker-end="url(#aa)"/><text class="t-xs" x="348" y="126">2 s దగ్గర మేల్కొంటుంది</text><text class="t-xs" x="300" y="152">timer 2 · B కోసం పెట్టినది</text><line class="ln-dash" x1="300" y1="162" x2="580" y2="162" marker-end="url(#a)"/><rect class="n-bad" x="0" y="180" width="750" height="84" rx="4"/><text class="t-sm mid" x="375" y="204">2.1 s దగ్గర timer 1 మేల్కొంటుంది. "ఈ connection బయటే ఉందా?" — <tspan class="t-acc">అవును</tspan>.</text><text class="t-sm mid" x="375" y="228">కానీ అది A ది కాదు — అది <tspan class="t-acc">B ది</tspan>, ఇప్పుడే ఇచ్చినది.</text><text class="t-sm mid" x="375" y="252">timer 1 దాన్ని లాగేస్తుంది. B ఇప్పుడు ఇంకొకరు వాడుతున్న connection మీద query చేస్తున్నాడు.</text></svg>

**పరిష్కారం:** "ఇది ఇంకా బయట ఉందా?" అని అడగడం సరిపోదు. **"ఇది ఇంకా *ఆ* checkout లోనే ఉందా?"** అని అడగాలి. ప్రతి checkout కి ఒక ప్రత్యేక గుర్తు ఇద్దాం:

```javascript
#track(c) {
  const token = ++this.epoch;              // ఈ checkout కి ప్రత్యేక గుర్తు
  this.out.set(c, token);
  this.sim.after(this.reapAfterMs, () => {
    if (this.out.get(c) !== token) return; // వేరే checkout — ఈ timer పాతది
    this.out.delete(c);
    this.reaped++;
    this.#giveBack(c);
  });
}
```

ఒక్క పంక్తి మార్పు — `!== undefined` నుంచి `!== token`. ఇప్పుడు కొలిస్తే:

```
సరిదిద్దిన reaper (ప్రతి checkout కి ప్రత్యేక token) · pool 10 · 4,000 requests

  లీక్ రేటు     | లీక్‌లు | వెనక్కి లాగినవి | పూర్తయినవి | తిరస్కృతం | pool చచ్చిన క్షణం
  --------------+-------+-----------+---------+-----------+------------------
  ప్రతి 500వ     |     8 |         8 |    4000 |         0 |          —
  ప్రతి 200వ     |    20 |        20 |    4000 |         0 |          —
```

**8 లీక్‌లు → 8 లాగినవి. 20 → 20.** సరిగ్గా సరిపోయాయి, ఒక్కటి ఎక్కువా కాదు.

<div class="box good">
<div class="lab">ఈ తప్పు నుంచి అసలు పాఠం</div>
నా మొదటి reaper <b>సరైన ఫలితాలు చూపించింది</b> — 100% విజయం, pool చావడం లేదు. నేను అక్కడే ఆగిపోయి ఉంటే, ఈ doc lo ఒక తీవ్రమైన bug ఉండేది.<br><br>
అది బయటపడింది ఎందుకంటే నేను <b>reaper ఎన్నిసార్లు పని చేసిందో లెక్కపెట్టాను</b>, మరియు ఆ సంఖ్య <b>లీక్‌ల సంఖ్యకి సమానంగా ఉండాలని</b> నాకు తెలుసు.<br><br>
<b>ఫలితం సరిగ్గా ఉందా అని చూడటం సరిపోదు. అది సరైన కారణం వల్లే సరిగ్గా ఉందా అని చూడాలి.</b> అందుకే ప్రతి మరమ్మత్తుకీ ఒక counter పెట్టండి, మరియు ఆ counter ఎంత ఉండాలో <i>ముందే</i> ఊహించండి.
</div>

<div class="box warn">
<div class="lab">లాగిన connection ని తిరిగి వాడకూడదు</div>
గమనించండి — సరిదిద్దిన code lo <code>this.#giveBack(c)</code> ఉంది, కానీ <b>పూర్తి system lo (§13) దాన్ని మూసేసి కొత్తది తెరుస్తాం</b>.<br><br>
ఎందుకంటే లీక్ అయిన connection మీద ఏమి జరిగిందో మనకు తెలియదు. అది ఒక తెరిచిన transaction మధ్యలో ఉండొచ్చు, లేదా చదవని ఫలితాలు దాని మీద పేరుకుని ఉండొచ్చు. దాన్ని ఇంకొకరికి ఇస్తే ఆ చెత్త అంతా వాళ్ళకి వెళ్తుంది.
</div>

---

# Part 4 — మూడో విరుపు: చచ్చిన connections

---

## 9. Step — pool ని రాత్రంతా ఉంచడం

ఇప్పటివరకు మన pool ఒక ఊహ మీద నడుస్తోంది: **`free` జాబితాలో ఉన్న connection పని చేస్తుంది.**

ఈ ఊహ పగటిపూట నిజమే. రాత్రిపూట కాదు.

ఆలోచించండి — మీ app కి రాత్రి 2 గంటలకు traffic తక్కువ. 10 connections lo 9 **గంటల తరబడి ఖాళీగా కూర్చుంటాయి**. ఆ సమయంలో:

- Database ఒక maintenance restart చేసుకుంటుంది
- మీ cloud provider యొక్క NAT gateway నిశ్శబ్ద connections ని మూసేస్తుంది (AWS lo 350 సెకన్లు)
- ఒక firewall "ఇది ఎవరూ వాడటం లేదు" అని నిర్ణయించి మూసేస్తుంది
- Database యొక్క `idle_session_timeout` పని చేస్తుంది

ఈ అన్నిటిలోనూ **ఒకే విషయం** ఉమ్మడిగా ఉంది, మరియు అదే సమస్య:

<div class="box bad">
<div class="lab">TCP యొక్క ఒక క్రూరమైన నిజం</div>
అవతలివైపు connection మూసేసినప్పుడు, <b>మీకు ఏమీ తెలియదు.</b><br><br>
మీ వైపు socket object ఇంకా అక్కడే ఉంది. అది "connected" అనే చూపిస్తుంది. మీరు దాన్ని <code>free</code> జాబితాలో పెట్టారు, అది బాగానే కనిపిస్తోంది.<br><br>
అది చచ్చిందని మీకు తెలిసేది <b>మీరు దాని మీద ఒక query పంపినప్పుడే</b> — అంటే <b>ఒక నిజమైన user ఎదురుచూస్తున్నప్పుడు.</b>
</div>

ఇది కొలవడానికి ఒక వాస్తవిక కథ కావాలి, ఒక కృత్రిమమైనది కాదు. నా సిమ్యులేషన్ ఇలా ఉంది:

- **0–5 సెకన్లు:** పగటి రద్దీ — ప్రతి 5 ms కి ఒక request
- **5–65 సెకన్లు:** రాత్రి నిశ్శబ్దం — ప్రతి 6 సెకన్లకు ఒక request
- **firewall:** ప్రతి సెకనుకూ చూస్తుంది; **30 సెకన్ల కంటే ఎక్కువ ఖాళీగా ఉన్న** connection ని మూసేస్తుంది
- **65 సెకన్ల దగ్గర:** ఉదయం రద్దీ మళ్ళీ మొదలు

<div class="box">
<div class="lab">మొదటి ప్రయత్నంలో నా సిమ్యులేషన్ తప్పుగా ఉంది</div>
నేను మొదట "ఒక క్షణంలో <b>అన్ని</b> ఖాళీ connections చచ్చిపోతాయి" అని రాశాను. అది 1,005 వైఫల్యాలు చూపించింది — పెద్ద సంఖ్య, కానీ <b>అన్యాయమైనది</b>: అది కేవలం 6 సెకన్లు ఖాళీగా ఉన్న connection ని కూడా చంపేస్తోంది.<br><br>
నిజమైన firewall అలా చేయదు — అది <b>వయసు</b> చూసి చంపుతుంది. దాన్ని సరిచేశాక సంఖ్య 750 కి తగ్గింది, కానీ ఇప్పుడు అది <b>నిజమైన సంఖ్య</b>.<br><br>
పెద్ద సంఖ్య కోసం సిమ్యులేషన్‌ని అన్యాయంగా ఉంచడం చాలా సులభం. అది doc ని బలహీనం చేస్తుంది, బలంగా కాదు.
</div>

---

## 10. మూడో విరుపు — 750 వైఫల్యాలు, సరిగ్గా రద్దీ మొదలైన క్షణంలో

```
firewall: 30 s కంటే ఎక్కువ ఖాళీగా ఉన్న connection మూత · 60 s నిశ్శబ్దం · pool 10

  వ్యూహం                   | విఫలం | మొదటి వైఫల్యం | ping‌లు | ping ఖర్చు
  -------------------------+-------+---------------+--------+-----------
  పరీక్షించకపోవడం          |   750 |      65005 ms |      0 |       0 ms
```

**ఆ `65005 ms` అనే సంఖ్యే ఈ విరుపు యొక్క అసలు కథ.**

Firewall connections ని చంపింది **35 సెకన్ల దగ్గర**. మొదటి వైఫల్యం వచ్చింది **65 సెకన్ల దగ్గర** — ఉదయం రద్దీ మొదలైన క్షణం.

అంటే మీ system **30 సెకన్ల పాటు పూర్తిగా విరిగిపోయి ఉంది**, మరియు ఒక్క alert కూడా రాలేదు. Error rate సున్నా. ఎందుకంటే అడిగేవాళ్ళే లేరు.

<div class="box bad">
<div class="lab">ఇదే ఈ రకమైన bug యొక్క సంతకం</div>
మీ pool విరిగే <b>సమయానికీ</b>, మీకు తెలిసే <b>సమయానికీ</b> మధ్య ఒక అగాధం ఉంది. మరియు ఆ అగాధం చివర సరిగ్గా <b>traffic తిరిగి వచ్చే క్షణం</b> ఉంటుంది.<br><br>
కాబట్టి మీ system ఎప్పుడూ ఇలాగే విరుగుతుంది: <b>సోమవారం ఉదయం 9 గంటలకి, ఆదివారం రాత్రి పడిన దెబ్బ వల్ల.</b><br><br>
ఇది కల్పన కాదు — ఇదే "Monday morning outage" అనే పేరుకి అసలు కారణం.
</div>

<svg viewBox="0 0 750 276"><text class="t-xs" x="0" y="14">విరిగిన క్షణానికీ, తెలిసిన క్షణానికీ మధ్య 30 సెకన్ల అగాధం</text><line class="ln" x1="0" y1="62" x2="750" y2="62"/><text class="t-xs" x="0" y="80">0 s</text><text class="t-xs" x="52" y="80">5 s</text><text class="t-xs" x="380" y="80">35 s</text><text class="t-xs" x="700" y="80">65 s</text><rect class="n-good" x="0" y="40" width="58" height="22" rx="3"/><text class="t-xs mid" x="29" y="34">రద్దీ</text><rect class="n-soft" x="58" y="40" width="642" height="22" rx="3"/><text class="t-xs mid" x="379" y="34">నిశ్శబ్ద రాత్రి · connections ఖాళీగా కూర్చుంటాయి</text><rect class="n-good" x="700" y="40" width="50" height="22" rx="3"/><text class="t-xs mid" x="725" y="34">రద్దీ</text><line class="ln-acc" x1="390" y1="94" x2="390" y2="118" marker-end="url(#aa)"/><rect class="n-bad" x="270" y="122" width="240" height="40" rx="4"/><text class="t-sm mid" x="390" y="147">35 s — firewall అన్నీ మూసేసింది</text><line class="ln-acc" x1="710" y1="94" x2="710" y2="118" marker-end="url(#aa)"/><rect class="n-bad" x="530" y="170" width="220" height="40" rx="4"/><text class="t-sm mid" x="640" y="195">65 s — 750 queries విఫలం</text><rect class="n-dark" x="0" y="224" width="750" height="50" rx="4"/><text class="t-w-sm mid" x="375" y="248">ఈ 30 సెకన్లలో error rate <tspan class="t-acc">సున్నా</tspan>. Dashboard పచ్చగా. Alert లేదు.</text><text class="t-w-sm mid" x="375" y="268">ఎందుకంటే system విరిగినట్టు తెలియాలంటే ఎవరో ఒకరు అడగాలి — మరియు ఎవరూ అడగలేదు.</text></svg>

### సహజమైన పరిష్కారం, మరియు దాని ఖరీదు

"అయితే ఇవ్వబోయే ముందు ప్రతిసారీ ఒక చిన్న `SELECT 1` పంపుదాం" — ఇది సరైన ఆలోచన. కొలిచి చూద్దాం:

```
  వ్యూహం                   | విఫలం | మొదటి వైఫల్యం | ping‌లు | ping ఖర్చు
  -------------------------+-------+---------------+--------+-----------
  పరీక్షించకపోవడం          |   750 |      65005 ms |      0 |       0 ms
  ప్రతిసారీ ping           |     0 |             — |   2010 |    2010 ms
```

వైఫల్యాలు **సున్నా**. కానీ **2,010 pings** — ప్రతి ఒక్క borrow కీ ఒకటి.

అది ప్రతి query కి ఒక అదనపు network round-trip. మీ database 1 ms దూరంలో ఉంటే, **ప్రతి query 1 ms నెమ్మదైంది**. 2 ms query మీద అది **50% అదనపు ఖర్చు** — మనం §1 lo pool తో సంపాదించినదాన్ని తిరిగి ఇచ్చేసినట్టు.

మరియు ఇది ఒక వృథా ఖర్చు, ఎందుకంటే **ఇప్పుడే వాడిన connection చచ్చే అవకాశమే లేదు.**

---

## 11. Step — ఖాళీగా కూర్చున్నదాన్ని మాత్రమే పరీక్షించడం

ఇక్కడే అసలు అంతర్దృష్టి ఉంది, మరియు ఇది ఒక్క వాక్యంలో ఉంది:

> **Connections వాడటం వల్ల చావవు. ఖాళీగా కూర్చోవడం వల్ల చస్తాయి.**

Firewall, NAT, `idle_session_timeout` — అన్నీ **ఖాళీ సమయాన్ని** చూసి చంపుతాయి. కాబట్టి **ఖాళీ సమయం ఎక్కువ ఉన్నప్పుడు మాత్రమే** పరీక్షిద్దాం:

```javascript
#check(c, cb) {
  const idleFor = this.sim.now - c.idleSince;
  if (idleFor <= this.idleValidateMs) return this.#hand(c, cb);   // ఖర్చు 0
  this.stats.validated++;
  if (c.alive) return this.#hand(c, cb);
  this.stats.replacedStale++;
  this.#retire(c);
  this.#hand(this.#make(), cb);                                   // కొత్తది తెరువు
}
```

`release` lo ఒక్క పంక్తి జోడించాలి — connection ఎప్పుడు ఖాళీ అయిందో గుర్తుపెట్టుకోవడం:

```javascript
release(c) {
  c.idleSince = this.sim.now;     // ఇప్పటి నుంచి ఇది ఖాళీగా కూర్చుంటోంది
  this.#giveBack(c);
}
```

ఇప్పుడు వేర్వేరు పరిమితులతో కొలుద్దాం:

```
firewall: 30 s కంటే ఎక్కువ ఖాళీగా ఉన్న connection మూత · 60 s నిశ్శబ్దం · pool 10

  వ్యూహం                   | విఫలం | మొదటి వైఫల్యం | ping‌లు | ping ఖర్చు
  -------------------------+-------+---------------+--------+-----------
  పరీక్షించకపోవడం          |   750 |      65005 ms |      0 |       0 ms
  ప్రతిసారీ ping           |     0 |             — |   2010 |    2010 ms
  25 s ఖాళీ అయితేనే ping   |     0 |             — |      3 |       3 ms
  10 s ఖాళీ అయితేనే ping   |     0 |             — |      3 |       3 ms
  5 s ఖాళీ అయితేనే ping    |     0 |             — |     13 |      13 ms
```

<div class="box good">
<div class="lab">మూడో వరుస — ఈ doc lo అత్యంత తృప్తికరమైన ఫలితం</div>
<b>విఫలాలు 0. Pings 3.</b><br><br>
"ప్రతిసారీ ping" కూడా 0 వైఫల్యాలు ఇచ్చింది, కానీ దానికి <b>2,010 pings</b> అయ్యాయి. అదే రక్షణ, <b>670× తక్కువ ఖర్చుతో</b>.<br><br>
ఎందుకంటే 2,010 borrows lo కేవలం <b>3</b> మాత్రమే నిజంగా ప్రమాదంలో ఉన్నాయి — రాత్రంతా ఖాళీగా కూర్చున్నవి. మిగతా 2,007 ఇప్పుడే వాడినవి.
</div>

**పరిమితి ఎంత పెట్టాలి?** పట్టికలో 25 s మరియు 10 s ఒకేలా ఉన్నాయి (3 pings), 5 s కి 13 — ఎక్కువ pings, ఒకే ఫలితం. కాబట్టి నియమం:

<div class="box warn">
<div class="lab">పరిమితి ఎంచుకోవడానికి నియమం</div>
మీ పరిమితి <b>మీ మార్గంలో ఉన్న అన్ని timeouts కంటే తక్కువ</b> ఉండాలి — NAT యొక్క idle timeout, firewall యొక్క, database యొక్క <code>idle_session_timeout</code>. వాటిలో <b>అతి తక్కువది</b> తీసుకుని, దానిలో సగం పెట్టండి.<br><br>
AWS NAT gateway 350 సెకన్లు → పరిమితి 150 సెకన్లు.<br><br>
మరియు ఇంకొకటి — <b>ఇంకా తక్కువ పెట్టడం వల్ల ఏమీ లాభం లేదు</b>. పట్టికలో 5 s, 10 s రెండూ 0 వైఫల్యాలే. కేవలం pings పెరిగాయి.
</div>

### ఇంకొక రక్షణ — గరిష్ఠ వయసు

Ping ఒక్కటే సరిపోదు. ఒక connection **చాలా రోజులు** బతికితే, అది database వైపు memory పేరుస్తుంది (prepared statements, temp tables), మరియు మీరు database ని replace చేసినా పాత దానికే అంటుకుని ఉంటుంది.

కాబట్టి ఒక **గరిష్ఠ వయసు** పెట్టాలి — అది దాటితే, ఖాళీగా ఉన్నప్పుడు నిశ్శబ్దంగా మూసేసి కొత్తది తెరవాలి:

```javascript
#takeUsable() {
  while (this.free.length) {
    const c = this.free.pop();
    if (this.sim.now - c.bornAt > this.maxLifetimeMs) {   // వయసు మీరింది
      this.stats.retired++;
      this.retire(c);
      this.free.push(this.make());
      continue;                                           // తర్వాతిది చూడు
    }
    return c;
  }
  return null;
}
```

ఇది **ఖాళీగా ఉన్నప్పుడే** జరుగుతుంది కాబట్టి ఎవరికీ ఆలస్యం కాదు. మరియు ఇది pool ని **నెమ్మదిగా, నిరంతరం తాజా చేస్తుంది** — ఒకేసారి అన్నీ కాకుండా.

**మూడో విరుపు పూర్తయింది.** ఇప్పుడు అన్నీ కలిపి ఒక system చేద్దాం.

---

# Part 5 — పూర్తి system

---

## 12. Step — pool పరిమాణం ఎంత ఉండాలి?

ఇది interview lo దాదాపు ఖచ్చితంగా వచ్చే ప్రశ్న, మరియు దీనికి **అందరూ ఇచ్చే సమాధానం తప్పు.**

సహజమైన ఆలోచన: "requests తిరస్కరించబడుతున్నాయా? pool ని పెద్దది చెయ్యి."

కొలుద్దాం. Demand సెకనుకు 1,000 queries. Database ఒకేసారి 12 queries వరకు బాగా భరిస్తుంది; అంతకు మించి ప్రతి అదనపు query అన్నిటినీ 3 ms నెమ్మది చేస్తుంది (lock contention, disk, CPU — నిజమైన databases ఇలాగే ప్రవర్తిస్తాయి).

```
demand 1,000 queries/సెకను · DB 12 కంటే ఎక్కువ ఒకేసారి భరించదు

  pool పరిమాణం | పూర్తయినవి | తిరస్కృతం | p50 | p99  | throughput
  -------------+---------+-----------+-----+------+------------
         4     |     800 |      2200 | 1020 | 1020 |      200/s
         8     |    1600 |      1400 | 1020 | 1020 |      399/s
        12     |    2400 |       600 |  820 | 1020 |      598/s
        16     |    2012 |       988 | 1021 | 1032 |      499/s
        24     |    1737 |      1263 | 1056 | 1056 |      428/s
        40     |    1574 |      1426 | 1104 | 1104 |      384/s
        80     |    1507 |      1493 | 1224 | 1224 |      357/s
```

<div class="box bad">
<div class="lab">Throughput నిలువు వరుసని పైనుంచి కిందకి చదవండి</div>
200 → 399 → <b>598</b> → 499 → 428 → 384 → <b>357</b><br><br>
అత్యుత్తమ స్థానం <b>pool = 12</b>, సరిగ్గా database యొక్క సామర్థ్యం.<br><br>
మరియు <b>pool = 80 తో throughput 357/s</b> — pool = 12 కంటే <b>40% తక్కువ</b>. Pool ని 6.7 రెట్లు పెద్దది చేసి, మీరు system ని <b>నెమ్మది</b> చేశారు.
</div>

ఎందుకు? ఎందుకంటే **pool ఒక queue కాదు, అది ఒక అడ్డుకట్ట** (§1 lo చెప్పినది).

Pool చిన్నదిగా ఉంటే, అదనపు requests **బయట** ఎదురుచూస్తాయి — database ప్రశాంతంగా, వేగంగా పని చేస్తుంది. Pool పెద్దదిగా ఉంటే, అదే requests **database లోపల** ఎదురుచూస్తాయి — మరియు అక్కడ అవి ఒకదానికొకటి **నెమ్మది చేసుకుంటాయి**.

<svg viewBox="0 0 750 292"><text class="t-xs" x="0" y="14">throughput vs pool పరిమాణం — పైకి, తర్వాత కిందకి</text><line class="ln" x1="46" y1="180" x2="730" y2="180"/><line class="ln" x1="46" y1="30" x2="46" y2="180"/><text class="t-xs" x="0" y="36">600/s</text><text class="t-xs" x="0" y="110">400/s</text><text class="t-xs" x="0" y="184">200/s</text><rect class="n-soft" x="60" y="150" width="60" height="30" rx="3"/><text class="t-xs mid" x="90" y="196">4</text><text class="t-xs mid" x="90" y="144">200</text><rect class="n-soft" x="150" y="105" width="60" height="75" rx="3"/><text class="t-xs mid" x="180" y="196">8</text><text class="t-xs mid" x="180" y="99">399</text><rect class="n-good" x="240" y="30" width="60" height="150" rx="3"/><text class="t-xs mid" x="270" y="196">12</text><text class="t-xs mid" x="270" y="24">598</text><rect class="n-soft" x="330" y="75" width="60" height="105" rx="3"/><text class="t-xs mid" x="360" y="196">16</text><text class="t-xs mid" x="360" y="69">499</text><rect class="n-soft" x="420" y="93" width="60" height="87" rx="3"/><text class="t-xs mid" x="450" y="196">24</text><text class="t-xs mid" x="450" y="87">428</text><rect class="n-bad" x="510" y="110" width="60" height="70" rx="3"/><text class="t-xs mid" x="540" y="196">40</text><text class="t-xs mid" x="540" y="104">384</text><rect class="n-bad" x="600" y="120" width="60" height="60" rx="3"/><text class="t-xs mid" x="630" y="196">80</text><text class="t-xs mid" x="630" y="114">357</text><text class="t-xs" x="676" y="184">pool పరిమాణం</text><rect class="n-dark" x="0" y="212" width="750" height="78" rx="4"/><text class="t-w-sm mid" x="375" y="236">Pool చిన్నదైతే — అదనపు requests <tspan class="t-acc">బయట</tspan> ఎదురుచూస్తాయి, database ప్రశాంతం.</text><text class="t-w-sm mid" x="375" y="258">Pool పెద్దదైతే — అవే requests <tspan class="t-acc">database లోపల</tspan> ఎదురుచూస్తాయి, ఒకదాన్నొకటి నెమ్మది చేస్తూ.</text><text class="t-w-sm mid" x="375" y="280">ఎదురుచూపు పోలేదు. అది <tspan class="t-acc">మీరు చూడలేని చోటికి</tspan> మారింది — మరియు అక్కడ అది ఖరీదైనది.</text></svg>

<div class="box good">
<div class="lab">Interview lo ఈ ప్రశ్నకి సమాధానం</div>
<b>"Pool పరిమాణాన్ని మీ app యొక్క traffic నుంచి లెక్కించకూడదు. దాన్ని database ఎంత ఏకకాలిక పని భరించగలదో దాని నుంచి లెక్కించాలి."</b><br><br>
అంటే ఆ సంఖ్య <b>మీది కాదు, DBA ది</b>. మరియు అన్ని app instances కలిపి ఆ పరిమితిలో ఇమడాలి — 20 instances × pool 20 = database మీద 400 connections.<br><br>
ఒక ఆచరణాత్మక సూత్రం: <b>connections ≈ (CPU cores × 2) + disk spindles</b>. 8-core database కి అది దాదాపు 20. చాలామంది 200 పెడతారు, మరియు వాళ్ళ system <b>నెమ్మదిగా</b> ఉంటుంది.
</div>

---

## 13. మొత్తం code · 3,000 యాదృచ్ఛిక ప్రయోగాలు · నాలుగు నియమాలు

ఇప్పుడు మూడు Parts lo నేర్చుకున్నవన్నీ ఒక చోట. ఇది పూర్తి code — ఏమీ దాచలేదు.

```javascript
const NO_CONN = { reason: 'POOL_TIMEOUT' };

class Pool {
  #sim; #open; #live = []; #free = []; #waiters = [];
  #out = new Map(); #epoch = 0; #closed = false;
  #size; #borrowTimeoutMs; #idleValidateMs; #maxLifetimeMs; #leakAfterMs;
  #stats = { borrowed: 0, timedOut: 0, validated: 0,
             replacedStale: 0, retired: 0, leaksReclaimed: 0 };

  constructor(sim, {
    open, size = 10, borrowTimeoutMs = 2000,
    idleValidateMs = Infinity, maxLifetimeMs = Infinity, leakAfterMs = Infinity,
  }) {
    this.#sim = sim; this.#open = open; this.#size = size;
    this.#borrowTimeoutMs = borrowTimeoutMs;
    this.#idleValidateMs = idleValidateMs;
    this.#maxLifetimeMs = maxLifetimeMs;
    this.#leakAfterMs = leakAfterMs;
    for (let i = 0; i < size; i++) this.#free.push(this.#make());
  }

  #make() {
    const c = this.#open(this.#sim.now);
    c.bornAt = this.#sim.now;
    c.idleSince = this.#sim.now;
    this.#live.push(c);
    return c;
  }
  #retire(c) {
    const i = this.#live.indexOf(c);
    if (i >= 0) this.#live.splice(i, 1);
    if (c.close) c.close();
  }
```

**§8 — ప్రధాన API.** `release` ని మర్చిపోవడం సాధ్యం కాదు:

```javascript
  use(work, done = () => {}) {
    this.borrow((err, c) => {
      if (err) return done(err, null);
      let released = false;
      const finish = (e, v) => {
        if (released) return;                  // రెండోసారి పిలిస్తే పట్టించుకోవద్దు
        released = true;
        this.release(c, { broken: !!e });
        done(e, v);
      };
      try { work(c, finish); }
      catch (e) { finish(e, null); }           // విసిరినా connection వెనక్కి
    });
  }
```

**§5 — గడువుతో borrow.** ఖాళీ లేకపోతే FIFO వరుసలో, కానీ ఎప్పటికీ కాదు:

```javascript
  borrow(cb) {
    if (this.#closed) return cb({ reason: 'POOL_CLOSED' }, null);
    this.#stats.borrowed++;
    const c = this.#takeUsable();
    if (c) return this.#check(c, cb);
    const w = { cb, dead: false };
    this.#waiters.push(w);                     // FIFO — మొదట అడిగినవాడికి మొదట
    if (this.#borrowTimeoutMs === Infinity) return;
    this.#sim.after(this.#borrowTimeoutMs, () => {
      if (w.dead) return;
      w.dead = true; this.#stats.timedOut++;
      this.#waiters.splice(this.#waiters.indexOf(w), 1);
      cb(NO_CONN, null);
    });
  }
```

**§11 — వయసు మీరినవి, మరియు ఖాళీగా కూర్చున్నవి:**

```javascript
  #takeUsable() {
    while (this.#free.length) {
      const c = this.#free.pop();
      if (this.#sim.now - c.bornAt > this.#maxLifetimeMs) {   // వయసు మీరింది
        this.#stats.retired++;
        this.#retire(c);
        this.#free.push(this.#make());
        continue;
      }
      return c;
    }
    return null;
  }

  #check(c, cb) {                              // ఖాళీగా ఉంటేనే ping
    if (this.#sim.now - c.idleSince <= this.#idleValidateMs)
      return this.#hand(c, cb);
    this.#stats.validated++;
    if (c.alive) return this.#hand(c, cb);
    this.#stats.replacedStale++;
    this.#retire(c);
    this.#hand(this.#make(), cb);
  }
```

**§8 — token తో reaper.** ఇదే నేను మొదట తప్పుగా రాసినది:

```javascript
  #hand(c, cb) {
    const token = ++this.#epoch;               // ఈ checkout కి మాత్రమే
    this.#out.set(c, token);
    if (this.#leakAfterMs !== Infinity)
      this.#sim.after(this.#leakAfterMs, () => {
        if (this.#out.get(c) !== token) return;    // పాత timer — వదిలేయ్
        this.#stats.leaksReclaimed++;
        this.#out.delete(c);
        this.#retire(c);                           // లీక్ అయినది నమ్మకూడదు
        this.#giveBack(this.#make());
      });
    cb(null, c);
  }

  release(c, { broken = false } = {}) {
    if (!this.#out.delete(c)) return;          // reaper ముందే తీసుకుంది
    if (broken) { this.#retire(c); this.#giveBack(this.#make()); return; }
    c.idleSince = this.#sim.now;
    this.#giveBack(c);
  }

  #giveBack(c) {
    while (this.#waiters.length) {
      const w = this.#waiters.shift();
      if (w.dead) continue;
      w.dead = true;
      return this.#check(c, w.cb);             // waiter కీ అదే పరీక్ష
    }
    this.#free.push(c);
  }
```

**మూసివేత మరియు లెక్కలు:**

```javascript
  drain() {
    this.#closed = true;
    while (this.#waiters.length) {
      const w = this.#waiters.shift();
      if (!w.dead) { w.dead = true; w.cb({ reason: 'POOL_CLOSED' }, null); }
    }
    for (const c of [...this.#live]) this.#retire(c);
    this.#free = [];
  }

  stats() {
    return { ...this.#stats, size: this.#size, free: this.#free.length,
             inUse: this.#out.size, live: this.#live.length,
             waiting: this.#waiters.length };
  }
}
```

### నాలుగు నియమాలు — మరియు వాటిని ఎలా పరీక్షించాలి

Unit tests రాయడం కంటే మంచి పద్ధతి ఒకటి ఉంది: **ఎప్పుడూ నిజం కావాల్సిన నియమాలను** రాసి, వాటిని **యాదృచ్ఛిక ప్రయోగాలతో** పరీక్షించడం.

| # | నియమం | ఇది విరిగితే అర్థం |
|---|---|---|
| 1 | `live === size` | connections లీక్ అయ్యాయి, లేదా pool పరిమితి దాటి పెరుగుతోంది |
| 2 | `free + inUse === live` | ఒక connection లెక్కలో తప్పిపోయింది లేదా రెండుసార్లు లెక్కైంది |
| 3 | ఒకే connection ఒకేసారి ఇద్దరికి ఉండకూడదు | queries ఒకదానితో ఒకటి కలిసిపోతున్నాయి |
| 4 | `free > 0` అయితే `waiting === 0` | ఖాళీ ఉండగా ఎవరో ఎదురుచూస్తున్నారు — అప్పగింత విరిగింది |

Test ఒక్కో ప్రయోగంలో 400 requests పంపుతుంది, మరియు ప్రతిదీ యాదృచ్ఛికంగా ఇలా ప్రవర్తిస్తుంది:

```javascript
pool.use((c, finish) => {
  if (seenBy.has(c.id)) bad.push(`connection ${c.id} ఇద్దరికి ఇచ్చారు`);
  if (c.closed)         bad.push(`మూసేసిన connection ${c.id} ఇచ్చారు`);
  seenBy.set(c.id, i);
  if (r < 0.06) { seenBy.delete(c.id); throw new Error('పని విసిరింది'); }
  sim.after(hold, () => {
    seenBy.delete(c.id);
    if (r < 0.12)      { /* లీక్: finish పిలవడం లేదు */ }
    else if (r < 0.18) { finish(new Error('connection చెడింది')); }
    else if (r < 0.24) { finish(null, 'ok'); finish(null, 'మళ్ళీ'); }
    else               { finish(null, 'ok'); }
  });
});
```

అంటే: 6% exception విసురుతాయి, 6% లీక్ అవుతాయి, 6% "చెడిపోయాయి" అని చెప్తాయి, 6% **రెండుసార్లు** `finish` పిలుస్తాయి. Pool పరిమాణం, గడువు, ping పరిమితి, గరిష్ఠ వయసు — అన్నీ ప్రతి ప్రయోగంలోనూ యాదృచ్ఛికం. మరియు **25% connections పుట్టుకతోనే చచ్చినవి**, §10 lo చూసిన firewall కథని అనుకరిస్తూ.

```
3,000 యాదృచ్ఛిక ప్రయోగాలు · 6,74,115 పనులు పూర్తి · 4,76,407 తిరస్కృతం
  నియమ ఉల్లంఘనలు: 0
```

### కానీ — ఈ test అసలు ఏదైనా పట్టుకోగలదా?

విఫలం కాలేని test ఏమీ నిరూపించదు. రెండు విధాలుగా తనిఖీ చేశాను.

**ఒకటి — దారులన్నీ నిజంగా నడిచాయా?**

```
ఏ దారులు నిజంగా నడిచాయి (3,000 ప్రయోగాల మొత్తం):
  borrowed         12,00,000
  timedOut          3,77,627
  validated            54,208
  replacedStale         8,616
  retired               2,874
  leaksReclaimed       49,478
```

ప్రతి కొమ్మా నడిచింది — 3.7 లక్షల గడువులు, 49,478 లీక్ మరమ్మత్తులు, 8,616 చచ్చిన connections replace అయ్యాయి.

**రెండు — కావాలని విరగ్గొడితే పట్టుకుంటుందా?** §8 lo సరిచేసిన ఆ ఒక్క పంక్తిని తీసేసి చూశాను:

```
==== token check తీసేస్తే fuzz పట్టుకుంటుందా? ====
3,000 యాదృచ్ఛిక ప్రయోగాలు · 9,55,576 పనులు పూర్తి · 1,74,839 తిరస్కృతం
  విఫలమైనవి: 3000
  ఉదా (seed 1): 812ms: live=8 కానీ size=6
```

**3,000/3,000 ప్రయోగాలు విఫలం**, మొదటి ప్రయోగంలోనే 0.8 సెకన్ల దగ్గర పట్టుకుంది.

<div class="box bad">
<div class="lab">మరియు ఇక్కడ ఒక ముఖ్యమైన వివరం ఉంది</div>
విరిగిన version <b>ఎక్కువ పని చేసినట్టు</b> కనిపిస్తోంది — 9,55,576 vs 6,74,115. అది <b>42% ఎక్కువ</b>.<br><br>
ఎందుకంటే అది pool ని పరిమితి దాటి పెంచేస్తోంది. ఎక్కువ connections = ఎక్కువ throughput = <b>మంచి dashboard</b>.<br><br>
<b>ఈ bug ఒక మెరుగుదలలా కనిపిస్తుంది.</b> Performance metrics మాత్రమే చూస్తే, మీరు దీన్ని ఎప్పటికీ పట్టుకోలేరు. నియమాలే దీన్ని బయటపెట్టాయి.
</div>

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ | ఏమి జోడించాం | ఏమి బాగుపడింది |
|---|---|---|
| §3 | `free` జాబితా, `borrow`/`release` | pool అనేది ఉంది |
| §5 | `timeoutMs`, `dead` గుర్తు, FIFO | 1,990 ms → **గడువు మించదు** |
| §8 | `use()`, `released` గుర్తు | early return, `throw` — రెండింటిలోనూ లీక్ లేదు |
| §8 | `token` తో reaper | 52% వైఫల్యం → **0%**, మరియు లాగినవి = లీక్‌లు |
| §11 | `idleSince` + షరతుతో ping | 750 వైఫల్యాలు → **0**, 2,010 pings → **3** |
| §11 | `maxLifetimeMs` | pool నెమ్మదిగా తనని తాను తాజా చేసుకుంటుంది |
| §13 | `drain()`, `stats()` | మూసివేత, మరియు కనిపించడం |

<svg viewBox="0 0 750 262"><text class="t-xs" x="0" y="14">పూర్తి system — ఏ భాగం ఏ విరుపుని ఆపుతుంది</text><rect class="n-acc" x="255" y="26" width="240" height="46" rx="4"/><text class="t-w mid" x="375" y="46">use(work, done)</text><text class="t-w-sm mid" x="375" y="64">ఏకైక బహిరంగ API</text><line class="ln-acc" x1="310" y1="76" x2="140" y2="102" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="76" x2="375" y2="102" marker-end="url(#aa)"/><line class="ln-acc" x1="440" y1="76" x2="610" y2="102" marker-end="url(#aa)"/><rect class="n-info" x="0" y="106" width="250" height="58" rx="4"/><text class="t mid" x="125" y="128">గడువు · §5</text><text class="t-sm mid" x="125" y="148">అంతులేని ఎదురుచూపు ఆగుతుంది</text><rect class="n-good" x="262" y="106" width="226" height="58" rx="4"/><text class="t mid" x="375" y="128">token reaper · §8</text><text class="t-sm mid" x="375" y="148">లీక్ శాశ్వతం కాదు</text><rect class="n-soft" x="500" y="106" width="250" height="58" rx="4"/><text class="t mid" x="625" y="128">ఖాళీ ping · §11</text><text class="t-sm mid" x="625" y="148">చచ్చినవి బయటపడతాయి</text><rect class="n-dark" x="0" y="180" width="750" height="78" rx="4"/><text class="t-w-sm mid" x="375" y="204">మూడూ ఒకే నిజాన్ని వేరే వైపుల నుంచి ఎదుర్కొంటాయి:</text><text class="t-w-sm mid" x="375" y="228"><tspan class="t-acc">pool కి తన connections ఎక్కడ ఉన్నాయో తెలియదు.</tspan></text><text class="t-w-sm mid" x="375" y="250">కాబట్టి అది ఎప్పుడూ ఎదురుచూడకూడదు, ఎప్పుడూ నమ్మకూడదు, ఎప్పుడూ మర్చిపోకూడదు.</text></svg>

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

| నిమిషాలు | ఏమి చెయ్యాలి |
|---|---|
| 0–4 | Pool ఎందుకు ఉంది — **రెండు కారణాలు**: వేగం, మరియు **database ని కాపాడటం**. రెండోది చెప్పండి, అది మిగతా అంతా నిర్ణయిస్తుంది |
| 4–8 | §2 ప్రశ్నలు. ముఖ్యంగా "**ఖాళీ అయితే ఏమి చెయ్యాలి?**" — దాన్ని interviewer తోనే నిర్ణయించండి |
| 8–14 | `free` జాబితా, `borrow`/`release` రాయండి. `undefined` సమస్యని **మీరే** చూపించండి |
| 14–22 | **మొదటి విరుపు.** "ఎదురుచూద్దాం" అని రాసి, అది ఆలస్యాన్ని అపరిమితం చేస్తుందని చూపించండి. గడువు జోడించండి |
| 22–30 | **రెండో విరుపు.** Early-return code ని board మీద రాసి లీక్ చూపించండి. `use()` ఇవ్వండి. తర్వాత "అయినా ఎవరో `borrow` నేరుగా వాడతారు" అని reaper జోడించండి |
| 30–36 | **మూడో విరుపు.** "రాత్రి 2 గంటలకి NAT gateway..." — ఖాళీగా ఉంటేనే ping అని చెప్పండి |
| 36–42 | **Pool పరిమాణం.** "పెద్దది చేస్తే ఘోరం" — ఇది interviewer కి ఆశ్చర్యం కలిగిస్తుంది |
| 42–45 | నియమాలు. "నేను unit tests కంటే ఈ నాలుగు నియమాలని యాదృచ్ఛిక ప్రయోగాలతో పరీక్షిస్తాను" |

### ఏమి తప్పక చెప్పాలి

1. **Pool ఒక limiter, cache కాదు.** ఇది ఒక్క వాక్యం, మరియు ఇది మీ మొత్తం సమాధానాన్ని వేరే స్థాయిలో ఉంచుతుంది.
2. **అపరిమిత ఎదురుచూపు ఒక bug.** గడువు లేని pool "అన్నీ విజయవంతం" అని చెప్తుంది, కానీ latency పెరుగుతూనే ఉంటుంది.
3. **`borrow`/`release` ని బహిరంగంగా ఇవ్వకూడదు.** `use()` మాత్రమే. "సరిగ్గా వాడటం తప్ప వేరే దారి లేని API."
4. **Connections ఖాళీగా కూర్చోవడం వల్ల చస్తాయి, వాడటం వల్ల కాదు.** అందుకే ప్రతిసారీ కాదు, ఖాళీగా ఉంటేనే ping.
5. **Pool పరిమాణం database యొక్క సంఖ్య, మీ app ది కాదు.**

### ఏమి వదిలేయాలి

- Thread-safety యొక్క వివరాలు — ఒక వాక్యంలో చెప్పి ముందుకి వెళ్ళండి
- కనిష్ఠ/గరిష్ఠ పరిమాణం తో pool పెరగడం/తగ్గడం — అడిగితే మాత్రమే
- Prepared statement cache — వేరే problem
- పరిమాణాన్ని తనంతట తానే సర్దుకునే pool — చాలా systems lo ఇది స్థిరంగానే ఉంటుంది, మరియు అదే మంచిది

---

## 15. నోటితో చెప్పాల్సిన English script

> "A connection pool looks like a cache, but it's really a **limiter**. Opening a connection costs a TCP handshake plus TLS plus auth — about thirty milliseconds against a two-millisecond query. But the more important job is that the database has a hard connection ceiling, and the pool is what keeps my app from crossing it."

> "I'll start with a free list and `borrow`/`release`. When it's empty, `pop()` returns `undefined`, and the app crashes with a `TypeError` about a missing `query` method — which hides the real cause. So the first fix is to **name the failure at the point it happens**."

> "The natural next step is to queue and wait. That's a trap. I measured it: at twenty percent over capacity, five hundred requests wait up to 490 milliseconds and two thousand requests wait up to **1,990**. It scales with arrivals, so it never settles. And every request still 'succeeds' — the error dashboard stays green while users wait two seconds. **Waiting isn't a fix, it's a way of hiding the problem.** So I put a timeout on the wait, which caps latency at exactly the timeout regardless of load."

> "The second failure is leaks. Any early return or thrown exception between borrow and release loses a connection **permanently** — the object is still alive in a closure, so GC won't help. I measured it: with a pool of ten and four thousand requests, **nine leaks rejected fifty-two percent of traffic** and killed the pool in 4.4 seconds. A 0.22% error rate became a 52% failure rate."

> "Two fixes. First, don't expose `borrow` and `release` at all — expose `use(work)` that releases in a `finally`. Second, reclaim connections held too long. I got that one wrong initially: my reaper scheduled a new timer on every hand-off but never cancelled the old one, so a stale timer would yank a connection that someone else was actively using. **It still showed 100% success** — I only caught it because I counted reclaims and they were 391 against 20 leaks. The fix is a per-checkout token the timer checks before acting."

> "Third failure is stale connections. During a quiet night, idle connections get closed by NAT or a firewall, and TCP doesn't tell you — the socket still looks connected. I measured a sixty-second quiet period: the firewall killed connections at thirty-five seconds, but the **first failure landed at sixty-five seconds**, the exact moment traffic returned. Thirty seconds broken with zero errors reported. That's the Monday-morning outage."

> "Validating on every borrow fixes it but costs a round trip per query. The insight is that connections die from **sitting idle**, not from being used — so I only validate when idle time exceeds a threshold. Same zero failures, **three pings instead of 2,010**."

> "On sizing: the instinct is to grow the pool when requests get rejected. I measured the opposite. Against a database that degrades past twelve concurrent queries, throughput peaks at pool size twelve — and **a pool of eighty delivers forty percent less throughput**. A bigger pool doesn't remove the waiting, it just moves it inside the database where it's more expensive. So the pool size comes from what the database can take, not from my traffic."

> "For testing I'd write four invariants — `live === size`, `free + inUse === live`, no connection handed to two callers, and never anyone waiting while something's free — then fuzz them. Three thousand randomized runs with injected leaks, exceptions, and double-releases: zero violations. And when I removed the token check on purpose, it failed all three thousand — while reporting **42% more throughput**, because the bug inflates the pool. That's why I test invariants and not just metrics."

---

## 16. Follow-ups — circuit breaker, బహుళ databases, async/await

**"Database పూర్తిగా పడిపోతే?"**

అప్పుడు గడువు కూడా సరిపోదు. ప్రతి request 2 సెకన్లు ఎదురుచూసి విఫలమవుతుంది — అంటే users నెమ్మదిగా విఫలమవుతారు, ఇది వెంటనే విఫలమవడం కంటే ఘోరం. కావాల్సింది **circuit breaker**: వరుసగా N వైఫల్యాలు వస్తే pool ని "తెరిచిన" స్థితిలో పెట్టి, **ఎదురుచూపు లేకుండానే** తిరస్కరించండి. కొంత సమయం తర్వాత ఒక్క request ని పరీక్షగా పంపండి.

**"Read replica కూడా ఉంటే?"**

ఒక pool కాదు, **ఒక్కో లక్ష్యానికి ఒకటి**. Primary కి ఒకటి, ప్రతి replica కి ఒకటి. కారణం §12 — పరిమాణం *ఆ database* యొక్క సామర్థ్యం నుంచి వస్తుంది, మరియు అవి వేర్వేరుగా ఉంటాయి. వాటి మీద ఒక routing పొర పెట్టండి: `SELECT` → replica, మిగతావి → primary.

**"Pool పరిమాణాన్ని తనంతట తానే మార్చుకోవచ్చా?"**

చేయగలం, కానీ **చాలా జాగ్రత్త**. Load పెరిగినప్పుడు pool పెరిగితే, §12 lo చూసినట్టు అది database ని **ఇంకా నెమ్మది** చేస్తుంది — అది latency ని పెంచుతుంది, అది "ఇంకా pool కావాలి" అనిపిస్తుంది. **ఒక దుష్ట చక్రం.** కనిష్ఠాన్ని మాత్రమే మార్చడం సురక్షితం (ఖాళీగా ఉన్నవాటిని రాత్రిపూట తగ్గించడం), గరిష్ఠాన్ని స్థిరంగా ఉంచడం.

**"ఇది `async`/`await` తో ఎలా ఉంటుంది?"**

ఈ doc lo callbacks వాడాను ఎందుకంటే సిమ్యులేషన్ సమయాన్ని నేనే నియంత్రిస్తున్నాను. నిజమైన code lo ఆకారం ఇది, మరియు **logic ఒక్కటే**:

```javascript
async use(work) {
  const c = await this.borrow();            // గడువు దాటితే throw
  try { return await work(c); }
  finally { this.release(c); }              // ← ఇక్కడే మొత్తం §8
}
```

ఆ `finally` ఒక్క పంక్తే §8 మొత్తం. కానీ **reaper ఇప్పటికీ కావాలి** — ఎందుకంటే `work` ఎప్పటికీ పూర్తవకపోతే (ఒక hung socket) `finally` ఎప్పటికీ నడవదు.

**"Connection మీద transaction ఉంటే?"**

`use()` బ్లాక్ ఒక transaction యొక్క సరిహద్దు కావాలి. `release` కి ముందు `ROLLBACK` పంపడం ముఖ్యం — పని విఫలమైతే ఆ connection మీద ఒక తెరిచిన transaction ఉండిపోతుంది, మరియు అది తర్వాతి వ్యక్తికి వెళ్తుంది. `broken: true` దారిలో connection ని పూర్తిగా మూసేయడం ఇంకా సురక్షితం.

---

## 17. ఏమి నేర్చుకున్నాం

**1. Pool ఒక cache కాదు, ఒక limiter.** వేగం దాని దుష్ప్రభావం మాత్రమే. దాని అసలు పని database ని మీ స్వంత traffic నుంచి కాపాడటం. ఈ ఒక్క వాక్యం §5, §12 రెండింటినీ వివరిస్తుంది.

**2. ఎదురుచూపు ఒక పరిష్కారం కాదు.** గడువు లేని pool 100% విజయం చూపిస్తూ latency ని అపరిమితంగా పెంచుతుంది. **"అంతా విజయవంతం" అనే metric ఒక hazard కావచ్చు.**

**3. సరిగ్గా వాడటం మీద ఆధారపడే API ఇవ్వకండి.** `borrow`/`release` ని బహిరంగంగా ఇస్తే ఎవరో ఒకరు మర్చిపోతారు — మరియు 0.22% లోపం 52% వైఫల్యం అవుతుంది. `use()` మాత్రమే ఇవ్వండి.

**4. వనరులు వాడటం వల్ల చావవు, ఖాళీగా కూర్చోవడం వల్ల చస్తాయి.** ఈ ఒక్క అంతర్దృష్టి 2,010 pings ని 3 కి తగ్గించింది — అదే రక్షణతో.

**5. విరిగిన క్షణానికీ, తెలిసిన క్షణానికీ మధ్య అగాధం ఉంటుంది.** మరియు ఆ అగాధం చివర ఎప్పుడూ **traffic తిరిగి వచ్చే క్షణం** ఉంటుంది. అందుకే systems సోమవారం ఉదయం విరుగుతాయి.

**6. ఎక్కువ వనరులు ఎప్పుడూ మంచివి కావు.** Pool ని 12 నుంచి 80 కి పెంచితే throughput **40% తగ్గింది**. ఎదురుచూపు పోలేదు — అది మీరు చూడలేని చోటికి మారింది.

**7. సరైన ఫలితం సరైన కారణం వల్లేనా అని చూడండి.** నా మొదటి reaper 100% విజయం చూపించింది, కానీ నడుస్తున్న queries నుంచి connections లాగేస్తోంది. అది బయటపడింది ఎందుకంటే **ఆ సంఖ్య ఎంత ఉండాలో నాకు ముందే తెలుసు** — లీక్‌ల సంఖ్యకి సమానంగా. ప్రతి మరమ్మత్తుకీ ఒక counter పెట్టండి, మరియు దాని ఆశించిన విలువను ముందే రాయండి.

**8. Metrics కాదు, నియమాలు పరీక్షించండి.** Token పరీక్ష తీసేసిన version **41% ఎక్కువ throughput** చూపించింది. Performance dashboard దాన్ని ఒక మెరుగుదలగా చూపేది. నాలుగు నియమాలు దాన్ని 0.8 సెకన్లలో పట్టుకున్నాయి.

<div class="box good">
<div class="lab">ఈ doc నుంచి ఒక్క వాక్యం గుర్తుపెట్టుకోవాలంటే</div>
<b>Pool కి తన connections ఎక్కడ ఉన్నాయో ఎప్పటికీ తెలియదు.</b><br><br>
అది వాటిని ఇచ్చిన క్షణం నుంచి అవి తిరిగి వచ్చే క్షణం వరకు, అవి బతికున్నాయో లేదో, తిరిగి వస్తాయో రావో pool కి తెలియదు.<br><br>
కాబట్టి pool యొక్క ప్రతి design నిర్ణయం ఒకే ప్రశ్నకి సమాధానం: <b>"నాకు తెలియని దాని గురించి నేను ఏమి ఊహించకూడదు?"</b><br><br>
ఎప్పటికీ ఎదురుచూడకు (§5). ఎప్పటికీ తిరిగి వస్తుందని నమ్మకు (§8). ఎప్పటికీ బతికే ఉందని నమ్మకు (§11).
</div>
