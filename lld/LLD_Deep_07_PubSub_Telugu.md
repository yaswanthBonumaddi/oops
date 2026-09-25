<!-- style: editorial -->
<!-- footer: Pub-Sub · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
<marker id="hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">07</div>
<div class="kicker">Deep Dive 07 · Notification Service · Message Queue · Event Bus</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>Pub-Sub System</div>
<div class="lede">Uber · Goldman Sachs · Walmart · Eightfold AI — ఇది "Notification Service", "Message Queue", "Event Bus" అని మూడు పేర్లతో వస్తుంది. మూడూ ఒకే problem.</div>
<div class="sub">మొదటి version పది పంక్తుల్లో రాయొచ్చు, మరియు అది <b>మూడుసార్లు</b> విరుగుతుంది — ఒక subscriber విఫలమైతే మిగతావాళ్ళు కోల్పోతారు; ఒక నెమ్మది subscriber publisher ని ఆపేస్తాడు; మరియు ఒక crash message ని <b>శాశ్వతంగా</b> మాయం చేస్తుంది. మూడూ నడిపి చూపిస్తాను.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 07</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి timing నిజంగా `node` lo run చేసినదే**.

<div class="box">
<div class="lab">Observer pattern నా, message broker నా — ఈ తేడా ముందే తెలియాలి</div>
GoF <b>Observer</b> మరియు ఒక <b>message broker</b> — రెండూ "ఒకరు ప్రకటిస్తారు, చాలామంది వింటారు" అని చేస్తాయి. కానీ అవి ఒకటి కాదు:<br><br>
<b>Observer</b> — ఒకే process లోపల, synchronous, listeners publisher యొక్క thread lo నడుస్తారు, మరియు వాళ్ళ జీవితకాలం publisher తో ముడిపడి ఉంటుంది. <code>addEventListener</code> ఇదే.<br><br>
<b>Broker</b> — publisher మరియు subscriber ఒకరి గురించి ఒకరు ఏమీ తెలియనవసరం లేదు, వేర్వేరు సమయాల్లో నడవొచ్చు, మరియు messages <b>నిలిచి ఉంటాయి</b>. Kafka, SQS, RabbitMQ ఇవే.<br><br>
ఈ doc lo మనం <b>Observer తో మొదలుపెట్టి, broker కి పెరుగుతాం</b> — ఎందుకంటే ప్రతి విరుపూ ఆ దూరాన్ని ఒక అడుగు తగ్గిస్తుంది. Interview lo ఈ తేడాని మొదట్లోనే చెప్పడం ఒక బలమైన ప్రారంభం.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. ఇది ఎందుకు కావాలి — నేరుగా పిలిస్తే ఏమవుతుంది
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: ఒకరు పడితే అందరూ**

3. Step — పది పంక్తుల event bus
4. **మొదటి విరుపు** — ఒక subscriber విసిరితే మిగతావాళ్ళు కోల్పోతారు
5. Step — ప్రతి subscriber ని వేరుచేయడం

**Part 3 — రెండో విరుపు: నెమ్మది subscriber**

6. **రెండో విరుపు** — publisher 415 ms ఎదురుచూసింది
7. Step — ప్రతి subscriber కి సొంత queue

**Part 4 — మూడో విరుపు: మాయమైన message**

8. **మూడో విరుపు** — ఒక crash, ఒక payment శాశ్వతంగా పోయింది
9. Step — Ack, retry, మరియు DLQ
10. At-most-once vs at-least-once — ఒక ఎంపిక, రెండు ఖర్చులు

**Part 5 — పూర్తి system**

11. Step — Topics మరియు filters
12. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

**Part 6 — Interview lo**

13. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
14. నోటితో చెప్పాల్సిన English script
15. Follow-ups — ordering, fan-out, Kafka
16. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. ఇది ఎందుకు కావాలి — నేరుగా పిలిస్తే ఏమవుతుంది

ఒక e-commerce app. ఒక order place అయింది. ఇప్పుడు ఏమి జరగాలి?

- Confirmation email పంపాలి
- SMS పంపాలి
- Inventory తగ్గించాలి
- Analytics lo నమోదు చేయాలి
- Fraud check నడపాలి
- Warehouse కి చెప్పాలి

సులభమైన జవాబు — `placeOrder()` లోపల ఆరింటినీ పిలవడం:

```javascript
function placeOrder(order) {
  saveOrder(order);
  emailService.sendConfirmation(order);
  smsService.send(order);
  inventory.reduce(order);
  analytics.track(order);
  fraudCheck.run(order);
  warehouse.notify(order);
}
```

ఇది పనిచేస్తుంది. కానీ మూడు సమస్యలు ఉన్నాయి, మరియు అవి కాలంతో పెరుగుతాయి:

<div class="fig">
<div class="cap">నేరుగా పిలవడం vs ప్రకటించడం</div>
<svg viewBox="0 0 750 288"><text class="t-xs" x="0" y="14">ఒక order place అయినప్పుడు ఆరు పనులు జరగాలి</text><rect class="n-bad" x="0" y="26" width="366" height="126" rx="4"/><text class="t mid" x="183" y="50">నేరుగా పిలవడం</text><rect class="n" x="115" y="62" width="136" height="28" rx="3"/><text class="t-sm mid" x="183" y="81">placeOrder()</text><line class="ln" x1="140" y1="92" x2="60" y2="106" marker-end="url(#a)"/><line class="ln" x1="170" y1="92" x2="140" y2="106" marker-end="url(#a)"/><line class="ln" x1="196" y1="92" x2="226" y2="106" marker-end="url(#a)"/><line class="ln" x1="226" y1="92" x2="306" y2="106" marker-end="url(#a)"/><text class="t-sm mid" x="60" y="120">email</text><text class="t-sm mid" x="140" y="120">sms</text><text class="t-sm mid" x="226" y="120">stock</text><text class="t-sm mid" x="306" y="120">…</text><text class="t-acc mid" x="183" y="142">placeOrder కి ఆరుగురి గురించీ తెలుసు</text><rect class="n-good" x="384" y="26" width="366" height="126" rx="4"/><text class="t mid" x="567" y="50">ప్రకటించడం</text><rect class="n" x="499" y="62" width="136" height="28" rx="3"/><text class="t-sm mid" x="567" y="81">publish(ORDER_PLACED)</text><line class="ln-acc" x1="567" y1="92" x2="567" y2="104" marker-end="url(#aa)"/><rect class="n-acc" x="459" y="106" width="216" height="24" rx="3"/><text class="t-w-sm mid" x="567" y="123">Broker</text><text class="t-acc mid" x="567" y="144">placeOrder కి ఎవరి గురించీ తెలియదు</text><rect class="n-acc" x="0" y="168" width="750" height="114" rx="4"/><text class="t-w mid" x="375" y="192">నేరుగా పిలవడం వల్ల వచ్చే మూడు సమస్యలు</text><text class="t-w-sm mid" x="375" y="216">1 · <tspan class="t-acc">కలయిక</tspan> — కొత్త పని చేర్చాలంటే placeOrder ని మార్చాలి. ఏడో పనికీ, ఎనిమిదోదానికీ మళ్ళీ.</text><text class="t-w-sm mid" x="375" y="236">2 · <tspan class="t-acc">వైఫల్యం</tspan> — SMTP పడిపోతే order place కాలేదని user కి కనిపిస్తుంది. కానీ order అయిపోయింది!</text><text class="t-w-sm mid" x="375" y="256">3 · <tspan class="t-acc">వేగం</tspan> — ఆరు పనులూ వరుసగా జరిగేదాకా user ఎదురుచూస్తాడు (§6 lo కొలుస్తాం).</text><text class="t-w-sm mid" x="375" y="274">ఈ మూడూ Pub-Sub పరిష్కరించేవే — కానీ <tspan class="t-acc">ఒక్కసారిగా కాదు</tspan>. ఈ doc అదే ప్రయాణం.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **ఒకే process lo నా, పలు services మధ్యనా?** | ఒకే process అంటే Observer చాలు. పలు services అంటే నిజమైన broker |
| **Message పోతే పర్వాలేదా?** | "పర్వాలేదు" (analytics) vs "అస్సలు కాదు" (payment) — ఇదే §10 |
| **ఒకే message రెండుసార్లు వస్తే పర్వాలేదా?** | ఇది పై ప్రశ్న యొక్క వెనుక వైపు. **రెండూ ఒకేసారి సాధ్యం కాదు** |
| **క్రమం ముఖ్యమా?** | "order created" తర్వాతే "order shipped" రావాలా? |
| **Subscriber నెమ్మదిగా ఉంటే?** | Publisher ఆగాలా, లేక queue పెరగాలా? (§6) |
| **ప్రతి subscriber కీ అన్ని messages కావాలా?** | లేకపోతే **filtering** (§11) |
| **Subscriber పడిపోయి తిరిగి వస్తే — పాత messages కావాలా?** | "అవును" అంటే messages నిలిచి ఉండాలి (durable) |

<div class="box warn">
<div class="lab">రెండు మూడు ప్రశ్నలు ఒకే నాణెం</div>
<i>"Message పోతే పర్వాలేదా?"</i> మరియు <i>"రెండుసార్లు వస్తే పర్వాలేదా?"</i> — ఈ రెండిటికీ <b>"కాదు"</b> అని చెప్పలేరు. Distributed system lo <b>exactly-once delivery అసాధ్యం</b>.<br><br>
మీరు ఎంచుకోవాల్సింది: <b>at-most-once</b> (పోవచ్చు, కానీ రెండుసార్లు రాదు) లేదా <b>at-least-once</b> (రెండుసార్లు రావచ్చు, కానీ పోదు). §10 lo దీని గురించి వివరంగా.<br><br>
Interview lo ఈ తేడాని మీరే లేవనెత్తితే — అది ఒక పెద్ద సంకేతం, ఎందుకంటే ఇది distributed systems యొక్క మౌలిక వాస్తవం.
</div>

---

# Part 2 — మొదటి విరుపు: ఒకరు పడితే అందరూ

---

## 3. Step — పది పంక్తుల event bus

అతి సులభమైన రూపం. ఒక జాబితా, ఒక loop:

```javascript
class EventBus {
  constructor() { this.subscribers = []; }
  subscribe(fn) { this.subscribers.push(fn); }
  publish(event) { for (const fn of this.subscribers) fn(event); }
}
```

నడిపి చూద్దాం:

```javascript
const bus = new EventBus();
bus.subscribe((e) => console.log('  📧 Email పంపాం:', e.orderId));
bus.subscribe((e) => console.log('  📊 Analytics నమోదు:', e.orderId));
bus.subscribe((e) => console.log('  📦 Inventory తగ్గించాం:', e.orderId));
bus.publish({ type: 'ORDER_PLACED', orderId: 'ORD-1' });
```

```
ORDER_PLACED publish చేస్తున్నాం:
  📧 Email పంపాం: ORD-1
  📊 Analytics నమోదు: ORD-1
  📦 Inventory తగ్గించాం: ORD-1
```

**పనిచేస్తోంది**, మరియు §1 lo ఉన్న **కలయిక** సమస్య పరిష్కారమైంది — `placeOrder` కి ఇప్పుడు email, analytics, inventory గురించి ఏమీ తెలియదు. కొత్త subscriber చేర్చాలంటే ఒక `subscribe` పిలుపు, అంతే.

ఇది పది పంక్తులు, మరియు ఇది నిజమైన విలువ ఇచ్చింది. కాబట్టి ఇక్కడ ఆగిపోవచ్చా?

---

## 4. మొదటి విరుపు — ఒక subscriber విసిరితే మిగతావాళ్ళు కోల్పోతారు

ఇప్పుడు ఒక నిజమైన పరిస్థితి. SMTP server పడిపోయింది, కాబట్టి SMS subscriber ఒక error విసురుతుంది:

```javascript
bus.subscribe((e) => console.log('  📧 Email పంపాం:', e.orderId));
bus.subscribe((e) => { throw new Error('SMTP server down'); });     // ← ఇది విఫలమైంది
bus.subscribe((e) => console.log('  📊 Analytics నమోదు:', e.orderId));
bus.subscribe((e) => console.log('  📦 Inventory తగ్గించాం:', e.orderId));
```

```
ORDER_PLACED publish చేస్తున్నాం:
  📧 Email పంపాం: ORD-2
  💥 publish() విసిరింది: SMTP server down
=> Analytics, Inventory రెండూ ఎప్పటికీ తెలుసుకోలేదు.
=> మరియు order place చేసిన code కి ఒక SMTP error వచ్చింది.
```

<div class="box warn">
<div class="lab">మొదటి విరుపు — రెండు వేర్వేరు నష్టాలు</div>
<b>1 · Analytics మరియు Inventory ఎప్పటికీ తెలుసుకోలేదు.</b> ఆ loop రెండో subscriber దగ్గరే ఆగిపోయింది. Inventory తగ్గలేదు — అంటే ఆ వస్తువుని ఇంకొకరికి కూడా అమ్మేస్తాం.<br><br>
<b>2 · Error publisher కి చేరింది.</b> <code>placeOrder()</code> ఇప్పుడు ఒక <i>SMTP</i> error చూస్తోంది. User కి "order failed" అని కనిపిస్తుంది — కానీ order <b>నిజంగా save అయింది</b>. ఇప్పుడు అతను మళ్ళీ order చేస్తాడు, మరియు మీకు రెండు orders ఉంటాయి.<br><br>
<b>మౌలిక తప్పు:</b> subscribers ఒకరి విధిని ఒకరు పంచుకుంటున్నారు, మరియు publisher వాళ్ళందరి విధిని పంచుకుంటున్నాడు. <b>Pub-Sub యొక్క మొత్తం ఉద్దేశమే వాళ్ళని వేరుచేయడం</b> — కానీ మన code అది చేయట్లేదు.
</div>

---

## 5. Step — ప్రతి subscriber ని వేరుచేయడం

పరిష్కారం స్పష్టం: ప్రతి subscriber పిలుపునీ ఒక `try/catch` lo చుట్టడం. ఒకరి వైఫల్యం ఇంకొకరిని తాకకూడదు.

```javascript
publish(event) {
  const failures = [];
  for (const s of this.subscribers) {
    try { s.fn(event); }
    catch (err) { failures.push({ subscriber: s.name, error: err.message }); }
  }
  return { delivered: this.subscribers.length - failures.length, failures };
}
```

గమనించండి — errors ని **మింగట్లేదు**, వాటిని **సేకరించి తిరిగి ఇస్తున్నాం**. Publisher వాటిని log చేయొచ్చు, alert పంపొచ్చు. కానీ అతని స్వంత పని ఆగదు.

`subscribe` కి ఒక **పేరు** కూడా చేర్చాం — ఎందుకంటే "ఒక subscriber విఫలమైంది" అనేది పనికిరాని సమాచారం; "sms subscriber విఫలమైంది" అనేది ఉపయోగకరం.

```
ORDER_PLACED:
  📧 Email: ORD-3
  📊 Analytics: ORD-3
  📦 Inventory: ORD-3
  {
  delivered: 3,
  failures: [ { subscriber: 'sms', error: 'SMTP server down' } ]
}
```

**మూడూ డెలివరీ అయ్యాయి**, మరియు వైఫల్యం ఒక *నివేదిక* గా మారింది, ఒక *పేలుడు* గా కాదు. మొదటి విరుపు సరిచేయబడింది.

---

# Part 3 — రెండో విరుపు: నెమ్మది subscriber

---

## 6. రెండో విరుపు — publisher 415 ms ఎదురుచూసింది

Subscribers ఇప్పుడు ఒకరినొకరు విరగ్గొట్టట్లేదు. కానీ వాళ్ళు ఇంకా **publisher యొక్క సమయాన్ని** తింటున్నారు.

Fraud check ఒక ML model నడుపుతుంది — అది 400 ms తీసుకుంటుంది. మిగతా మూడూ చిన్నవి (5 ms). కొలుద్దాం:

```javascript
bus.subscribe('email',       () => sleep(5));
bus.subscribe('analytics',   () => sleep(5));
bus.subscribe('fraud-check', () => sleep(400));    // ← ఈ ఒక్కటి నెమ్మది
bus.subscribe('inventory',   () => sleep(5));

const t = Date.now();
bus.publish({ orderId: 'ORD-4' });
console.log(`publish() తిరిగి రావడానికి పట్టిన సమయం: ${Date.now() - t} ms`);
```

```
publish() తిరిగి రావడానికి పట్టిన సమయం: 415 ms
=> user ఆ 400ms అంతా "Placing order…" చూస్తూ ఎదురుచూస్తున్నాడు.
=> నిజానికి order ఎప్పుడో place అయింది — fraud-check కోసం ఆగడం అనవసరం.
```

<div class="box warn">
<div class="lab">రెండో విరుపు — వేగం అత్యంత నెమ్మది subscriber దే</div>
<code>publish()</code> ఇప్పుడు <b>అందరి మొత్తం సమయం</b> తీసుకుంటోంది. అంటే — ఒక కొత్త subscriber చేర్చినప్పుడల్లా, మీ order API <b>నెమ్మదవుతుంది</b>.<br><br>
ఇది ఒక దుష్ట ప్రోత్సాహకాన్ని సృష్టిస్తుంది: teams కొత్త subscriber చేర్చడానికి భయపడతారు, ఎందుకంటే అది checkout ని నెమ్మది చేస్తుంది. <b>Pub-Sub యొక్క ఉద్దేశమే</b> "స్వేచ్ఛగా subscriber చేర్చగలగడం" — ఆ ఉద్దేశం ఇక్కడ ఓడింది.<br><br>
<b>మౌలిక తప్పు:</b> <i>ప్రకటించడం</i> మరియు <i>ప్రాసెస్ చేయడం</i> — ఈ రెండూ ఒకే thread lo, ఒకే క్షణంలో జరుగుతున్నాయి. అవి వేరు కావాలి.
</div>

---

## 7. Step — ప్రతి subscriber కి సొంత queue

పరిష్కారం: `publish()` **handler ని పిలవకూడదు**. అది కేవలం message ని ప్రతి subscriber యొక్క **queue lo పెట్టాలి**. ప్రాసెస్ చేయడం తర్వాత, విడిగా జరుగుతుంది.

```javascript
class Broker {
  #queues = new Map();                        // subscriber → పెండింగ్ messages
  #handlers = new Map();

  subscribe(name, fn) { this.#handlers.set(name, fn); this.#queues.set(name, []); }

  publish(event) {
    for (const q of this.#queues.values()) q.push(event);   // ← కేవలం వరుసలో పెట్టడం
    return { queued: this.#queues.size };
  }

  // తర్వాత, విడిగా — ఒక "worker" ఈ queue ని ఖాళీ చేస్తుంది
  drain(name) {
    const q = this.#queues.get(name), fn = this.#handlers.get(name);
    let done = 0;
    while (q.length) { const e = q.shift(); try { fn(e); done++; } catch {} }
    return done;
  }
}
```

అదే పరీక్ష:

```
publish() సమయం: 0 ms   ← user ఇక ఎదురుచూడట్లేదు
పెండింగ్: email:1  fraud-check:1  inventory:1
ఇప్పుడు workers నడుస్తాయి (user కి సంబంధం లేకుండా):
  email: 1 message(s) ప్రాసెస్ అయ్యాయి
  fraud-check: 1 message(s) ప్రాసెస్ అయ్యాయి
  inventory: 1 message(s) ప్రాసెస్ అయ్యాయి
```

**415 ms → 0 ms.** Fraud check ఇప్పటికీ 400 ms తీసుకుంటుంది, కానీ అది **user యొక్క సమయంలో కాదు**.

<div class="note"><b>ఇక్కడ ఒక ముఖ్యమైన మార్పు జరిగింది,</b> మరియు అది code కంటే పెద్దది. ఇప్పటిదాకా మన system <b>synchronous</b> — publish అయిన క్షణం అంతా అయిపోయింది. ఇప్పుడు అది <b>asynchronous</b> — publish అంటే "ఇది జరుగుతుంది" అనే <i>వాగ్దానం</i> మాత్రమే.<br><br>
అంటే మనం <b>Observer నుంచి broker వైపు</b> ఒక పెద్ద అడుగు వేశాం. మరియు దానితో పాటు ఒక కొత్త ప్రశ్న వచ్చింది: <b>ఆ వాగ్దానం ఎంత బలమైనది?</b> తర్వాతి Part అదే.</div>

---

# Part 4 — మూడో విరుపు: మాయమైన message

---

## 8. మూడో విరుపు — ఒక crash, ఒక payment శాశ్వతంగా పోయింది

`drain()` ని జాగ్రత్తగా చూడండి:

```javascript
while (q.length) {
  const e = q.shift();          // ← ముందే queue నుంచి తీసేశాం
  try { fn(e); done++; } catch {}   // ← విఫలమైతే? అది ఇక ఎక్కడా లేదు.
}
```

`shift()` ఆ message ని queue నుంచి **శాశ్వతంగా తీసేస్తుంది**. ఆ తర్వాత handler విఫలమైతే — message **ఎక్కడా లేదు**. Queue lo లేదు, ప్రాసెస్ కాలేదు, ఎవరికీ తెలియదు.

Payment subscriber ORD-7 మీద విఫలమవుతుందని అనుకుందాం:

```javascript
b.subscribe('payment', (e) => { if (e.orderId === 'ORD-7') throw new Error('DB timeout'); });
b.publish({ orderId:'ORD-6' }); b.publish({ orderId:'ORD-7' }); b.publish({ orderId:'ORD-8' });
```

```
మూడు messages queue lo. drain చేస్తున్నాం…
  విజయవంతమైనవి: 2
  queue lo మిగిలినవి: 0
=> ORD-7 payment ప్రాసెస్ కాలేదు, మరియు queue lo కూడా లేదు.
=> ఆ order యొక్క payment *శాశ్వతంగా* పోయింది. ఎవరికీ తెలియదు.
```

<div class="box warn">
<div class="lab">మూడో విరుపు — నిశ్శబ్దంగా మాయమైన డబ్బు</div>
ORD-7 యొక్క payment ఎప్పటికీ ప్రాసెస్ కాలేదు. Queue ఖాళీగా ఉంది, కాబట్టి system <b>అంతా బాగుంది</b> అనుకుంటుంది. ఏ alert లేదు, ఏ error లేదు.<br><br>
Customer డబ్బు కట్టాడు, order confirm అయింది, కానీ payment record ఎక్కడా లేదు. ఇది నెలల తర్వాత reconciliation lo బయటపడుతుంది — అప్పటికి వందల orders అలా ఉంటాయి.<br><br>
<b>మౌలిక తప్పు:</b> మనం message ని <b>ప్రాసెస్ చేయడానికి ముందే</b> తీసేశాం. సరైనది — ప్రాసెస్ <i>విజయవంతంగా పూర్తయ్యాక</i> మాత్రమే తీసేయడం.
</div>

---

## 9. Step — Ack, retry, మరియు DLQ

పరిష్కారం మూడు భాగాలు:

**1. `poll()` — తీసుకోవడం, కానీ వదలకపోవడం.** Message queue నుంచి బయటికి వస్తుంది, కానీ ఒక **in-flight** జాబితాలోకి వెళ్తుంది. అది ఇంకా broker చేతిలోనే ఉంది.

**2. `ack()` — పూర్తయింది.** Handler విజయవంతమైతే, message ని in-flight నుంచి తీసేయడం. ఇప్పుడు అది నిజంగా పోయింది.

**3. `nack()` — విఫలమైంది.** Message ని queue lo **తిరిగి పెట్టడం**, మరియు `attempts` ని పెంచడం. కొన్ని ప్రయత్నాల తర్వాత కూడా విఫలమైతే — దాన్ని **DLQ** (dead letter queue) lo పెట్టడం.

```javascript
poll() {
  const m = this.#queue.shift();
  if (m) this.#inFlight.set(m.id, m);          // తీసుకున్నాం, కానీ ఇంకా వదల్లేదు
  return m ?? null;
}

ack(id) { this.#inFlight.delete(id); }          // పూర్తయింది → ఇప్పుడు వదలొచ్చు

nack(id) {
  const m = this.#inFlight.get(id);
  if (!m) return null;
  this.#inFlight.delete(id);
  m.attempts++;
  if (m.attempts >= this.maxAttempts) { this.dlq.push(m); return 'DLQ'; }
  this.#queue.unshift(m);                       // క్రమం కాపాడటానికి ముందే
  return 'RETRY';
}
```

<div class="fig">
<div class="cap">ఒక message యొక్క ప్రయాణం · నాలుగు గమ్యాలు</div>
<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">poll తర్వాత message ఇంకా broker చేతిలోనే ఉంటుంది — ఇదే మొత్తం ఉపాయం</text><rect class="n" x="20" y="34" width="140" height="44" rx="4"/><text class="t-sm mid" x="90" y="56">QUEUE</text><text class="t-sm mid" x="90" y="72">ఎదురుచూస్తోంది</text><line class="ln-acc" x1="164" y1="56" x2="206" y2="56" marker-end="url(#aa)"/><text class="t-sm mid" x="185" y="48">poll</text><rect class="n-acc" x="210" y="34" width="150" height="44" rx="4"/><text class="t-w-sm mid" x="285" y="56">IN-FLIGHT</text><text class="t-w-sm mid" x="285" y="72">ప్రాసెస్ అవుతోంది</text><line class="ln-acc" x1="364" y1="44" x2="430" y2="44" marker-end="url(#aa)"/><text class="t-sm mid" x="397" y="36">ack</text><rect class="n-good" x="434" y="26" width="140" height="36" rx="4"/><text class="t-sm mid" x="504" y="49">✓ పూర్తయింది</text><line class="ln-acc" x1="285" y1="82" x2="285" y2="118" marker-end="url(#aa)"/><text class="t-sm" x="292" y="104">nack · attempts &lt; 3</text><line class="ln-acc" x1="240" y1="122" x2="90" y2="84" marker-end="url(#aa)"/><text class="t-sm mid" x="140" y="118">తిరిగి queue lo</text><line class="ln-acc" x1="364" y1="68" x2="430" y2="96" marker-end="url(#aa)"/><text class="t-sm" x="380" y="92">nack · attempts = 3</text><rect class="n-bad" x="434" y="86" width="140" height="44" rx="4"/><text class="t-sm mid" x="504" y="108">DLQ</text><text class="t-sm mid" x="504" y="124">మనిషి చూడాలి</text><rect class="n-info" x="0" y="150" width="750" height="112" rx="4"/><text class="t mid" x="375" y="174">DLQ ఎందుకు అవసరం</text><text class="t-sm mid" x="375" y="198">Retry లేకపోతే — message పోతుంది (§8). <tspan class="t-acc">అపరిమిత</tspan> retry అయితే — ఒక చెడ్డ message</text><text class="t-sm mid" x="375" y="216">శాశ్వతంగా తిరుగుతూ queue ని నింపేస్తుంది, మరియు దాని వెనక అందరూ ఆగిపోతారు.</text><text class="t-sm mid" x="375" y="240">DLQ అంటే: <tspan class="t-acc">"ఇది మూడుసార్లు విఫలమైంది; ఇది ఒక తాత్కాలిక సమస్య కాదు."</tspan></text><text class="t-sm mid" x="375" y="256">అది పక్కన పెట్టి, మిగతా queue కదులుతుంది, మరియు ఒక మనిషి దాన్ని చూస్తాడు.</text></svg>
</div>

ORD-7 ని మళ్ళీ నడుపుదాం — ఈసారి ack/retry/DLQ తో:

```
payment (ORD-7 ఎప్పుడూ విఫలం):
  round 1: { ok: 1, retried: 1, dead: 0 } | pending 1
  round 2: { ok: 0, retried: 1, dead: 0 } | pending 1
  round 3: { ok: 0, retried: 0, dead: 1 } | pending 0
  round 4: { ok: 0, retried: 0, dead: 0 } | pending 0

మొత్తం ప్రయత్నాలు: 4
DLQ: 1 message(s)
```

**ORD-6 విజయవంతమైంది** (round 1 lo `ok: 1`). **ORD-7 మూడుసార్లు ప్రయత్నించి DLQ కి వెళ్ళింది.** ఇప్పుడు అది **మాయం కాలేదు** — అది ఒక నిర్దిష్ట చోట, ఒక మనిషి చూడటానికి సిద్ధంగా ఉంది.

---

## 10. At-most-once vs at-least-once — ఒక ఎంపిక, రెండు ఖర్చులు

§9 lo మనం retry చేర్చాం. దానితో ఒక కొత్త సమస్య వచ్చింది, మరియు దాన్ని ఒప్పుకోవాలి.

Handler **పని పూర్తిచేసి, ఆపై ack పంపేలోపు crash అయితే?** — Message in-flight lo ఉంది, timeout తర్వాత అది తిరిగి queue lo వస్తుంది, మరియు **మళ్ళీ ప్రాసెస్ అవుతుంది**. అంటే payment **రెండుసార్లు** జరుగుతుంది.

| | At-most-once | At-least-once |
|---|---|---|
| ఎలా | ముందే ack, ఆపై ప్రాసెస్ | ప్రాసెస్, ఆపై ack (మనం చేసింది) |
| Message పోతుందా? | **అవును** (crash అయితే) | లేదు |
| రెండుసార్లు వస్తుందా? | లేదు | **అవును** (ack కి ముందు crash) |
| ఎక్కడ సరైనది | Analytics, logs, metrics | Payment, order, inventory |

<div class="box">
<div class="lab">"Exactly-once" ఎందుకు లేదు</div>
అందరూ కోరుకునేది "exactly once" — పోకూడదు, రెండుసార్లు రాకూడదు. Distributed system lo <b>అది సాధ్యం కాదు</b>, ఎందుకంటే "పని పూర్తయింది" మరియు "అది broker కి తెలిసింది" — ఈ రెండిటి మధ్య ఎప్పుడూ ఒక ఖాళీ ఉంటుంది, మరియు ఆ ఖాళీలో crash జరగొచ్చు.<br><br>
<b>ఆచరణలో చేసేది:</b> at-least-once ఎంచుకుని, handler ని <b>idempotent</b> గా చేయడం — అంటే "రెండుసార్లు నడిపినా ఫలితం ఒకటే". Payment కి అది <code>paymentId</code> ని ఒక unique key గా వాడటం: రెండో సారి అదే id వస్తే, "ఇది ఇప్పటికే అయింది" అని వదిలేయడం.<br><br>
<b>Interview lo ఈ వాక్యం విలువైనది:</b> <i>"Exactly-once delivery isn't achievable, so I'd do at-least-once and make the consumer idempotent. That moves the problem to a place where it's actually solvable."</i>
</div>

---

# Part 5 — పూర్తి system

---

## 11. Step — Topics మరియు filters

ఇప్పటిదాకా **ప్రతి subscriber కి ప్రతి message** వెళ్తోంది. నిజ systems lo అది సరిపోదు:

- `order.placed`, `order.shipped`, `user.signup` — వేర్వేరు రకాల సంఘటనలు. Email service కి మొదటి రెండూ కావాలి, మూడోది కాదు.
- మరియు **ఒకే topic లోపల కూడా** filtering కావాలి — fraud check కి ₹10,000 దాటిన orders మాత్రమే.

**Topic** అనేది మొదటి, ముతక వడపోత. **Filter** అనేది రెండో, సూక్ష్మ వడపోత:

```javascript
class Subscription {
  constructor(name, handler, { filter = () => true, maxAttempts = 3 } = {}) {
    Object.assign(this, { name, handler, filter, maxAttempts });
    this.dlq = [];
  }
  offer(msg) { if (this.filter(msg)) { this.#queue.push(msg); return true; } return false; }
}
```

`offer` **`false` తిరిగి ఇస్తుంది** — filter తిరస్కరిస్తే. అది ముఖ్యం, ఎందుకంటే publisher కి "నలుగురు subscribers ఉన్నారు, కానీ ముగ్గురికే వెళ్ళింది" అని తెలుస్తుంది.

<div class="note"><b>Filter ఎక్కడ నడవాలి — broker lo నా, subscriber lo నా?</b> ఇది ఒక నిజమైన trade-off. Broker lo (మనం చేసింది) అంటే అనవసరమైన messages queue lo చేరవు — memory ఆదా. కానీ broker ఇప్పుడు message యొక్క <i>లోపలి</i> ఆకారం తెలుసుకోవాలి, అంటే అది కొంచెం తక్కువ సాధారణం.<br><br>
Kafka <b>filter చేయదు</b> — consumer అన్నీ చదివి తనే వదిలేస్తాడు. SNS, RabbitMQ <b>చేస్తాయి</b>. రెండూ సరైనవే; <b>ఏది ఎందుకు ఎంచుకున్నారో చెప్పగలగడమే</b> ముఖ్యం.</div>

---

## 12. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

```javascript
class Message {
  constructor(id, topic, payload, key = null) {
    Object.assign(this, { id, topic, payload, key, attempts: 0 });
  }
}

class Subscription {
  #queue = []; #inFlight = new Map();
  constructor(name, handler, { filter = () => true, maxAttempts = 3 } = {}) {
    Object.assign(this, { name, handler, filter, maxAttempts });
    this.dlq = [];
  }
  offer(msg) { if (this.filter(msg)) { this.#queue.push(msg); return true; } return false; }
  get pending()  { return this.#queue.length; }
  get inFlight() { return this.#inFlight.size; }

  poll() {
    const m = this.#queue.shift();
    if (m) this.#inFlight.set(m.id, m);        // తీసుకున్నాం, కానీ ఇంకా వదల్లేదు
    return m ?? null;
  }
  ack(id) { this.#inFlight.delete(id); }
  nack(id) {
    const m = this.#inFlight.get(id);
    if (!m) return null;
    this.#inFlight.delete(id);
    m.attempts++;
    if (m.attempts >= this.maxAttempts) { this.dlq.push(m); return 'DLQ'; }
    this.#queue.unshift(m);
    return 'RETRY';
  }
}

class Broker {
  #subs = new Map(); #seq = 0; #published = 0;

  subscribe(topic, name, handler, opts) {
    const s = new Subscription(name, handler, opts);
    if (!this.#subs.has(topic)) this.#subs.set(topic, []);
    this.#subs.get(topic).push(s);
    return s;
  }

  publish(topic, payload, key = null) {
    const targets = this.#subs.get(topic) ?? [];
    const msg = new Message(`M${++this.#seq}`, topic, payload, key);
    let queued = 0;
    for (const s of targets) if (s.offer({ ...msg, attempts: 0 })) queued++;
    this.#published++;
    return { messageId: msg.id, topic, queued, subscribers: targets.length };
  }

  deliver(topic, name) {
    const s = (this.#subs.get(topic) ?? []).find((x) => x.name === name);
    const stats = { ok: 0, retried: 0, dead: 0 };
    let m;
    while ((m = s.poll())) {
      try { s.handler(m); s.ack(m.id); stats.ok++; }
      catch {
        const r = s.nack(m.id);
        r === 'DLQ' ? stats.dead++ : stats.retried++;
        if (r === 'RETRY') break;              // తర్వాతి round lo మళ్ళీ ప్రయత్నిస్తాం
      }
    }
    return stats;
  }

  stats(topic) {
    return (this.#subs.get(topic) ?? []).map((s) =>
      ({ name: s.name, pending: s.pending, inFlight: s.inFlight, dlq: s.dlq.length }));
  }
}
```

### ప్రతి message ఒక copy ఎందుకు

`publish` lo `s.offer({ ...msg, attempts: 0 })` గమనించండి — ప్రతి subscriber కీ **ఒక సొంత copy**. ఎందుకు?

ఎందుకంటే `attempts` **subscriber వారీగా** ఉండాలి. Email subscriber ఒక message మీద రెండుసార్లు విఫలమైతే, అది analytics subscriber యొక్క లెక్కని తాకకూడదు. ఒకే object పంచుకుంటే వాళ్ళ retry counters కలిసిపోతాయి.

### నాలుగు subscribers, ఒక filter, ఒక వైఫల్యం

```javascript
broker.subscribe('order.placed', 'email', (m) => log.push(`email → ${m.payload.orderId}`));
broker.subscribe('order.placed', 'analytics', (m) => log.push(`analytics → ${m.payload.orderId}`));
broker.subscribe('order.placed', 'fraud-check',
                 (m) => log.push(`fraud → ${m.payload.orderId}`),
                 { filter: (m) => m.payload.amount > 10000 });      // ← ఖరీదైనవి మాత్రమే
broker.subscribe('order.placed', 'payment', (m) => {
  if (m.payload.orderId === 'ORD-7') throw new Error('DB timeout');
  log.push(`payment → ${m.payload.orderId}`);
}, { maxAttempts: 3 });
```

```
publish ORD-6 (₹500): { messageId: 'M1', topic: 'order.placed', queued: 3, subscribers: 4 }
publish ORD-7 (₹50000): { messageId: 'M2', topic: 'order.placed', queued: 4, subscribers: 4 }

fraud-check ఎన్ని అందుకుంది? 1 ← filter పనిచేసింది (₹500 దాటలేదు)

deliver:
 email        { ok: 2, retried: 0, dead: 0 }
 analytics    { ok: 2, retried: 0, dead: 0 }
 fraud-check  { ok: 1, retried: 0, dead: 0 }
```

### ఈ output ని పంక్తి పంక్తిగా చదువుదాం

**`queued: 3, subscribers: 4`** — ORD-6 (₹500) నలుగురిలో **ముగ్గురికే** వెళ్ళింది. Fraud check యొక్క filter దాన్ని తిరస్కరించింది. ORD-7 (₹50,000) కి `queued: 4` — నలుగురికీ వెళ్ళింది.

**Email, analytics కి `ok: 2`** — రెండు messages, రెండూ విజయవంతం. **Fraud-check కి `ok: 1`** — ఒక్కటే అందుకుంది.

**ఇక్కడ ముఖ్యమైనది:** payment subscriber ORD-7 మీద విఫలమవుతోంది, కానీ **email, analytics, fraud-check ముగ్గురూ ఆ message ని విజయవంతంగా ప్రాసెస్ చేశారు**. §4 యొక్క మొదటి విరుపు పూర్తిగా పరిష్కారమైంది — ఇప్పుడు ఒకరి వైఫల్యం ఇంకొకరిని తాకదు, మరియు వాళ్ళు *వేరే వేగాలతో* కూడా నడవగలరు.

```
విజయవంతంగా ప్రాసెస్ అయినవి:
  email → ORD-6
  email → ORD-7
  analytics → ORD-6
  analytics → ORD-7
  fraud → ORD-7
  payment → ORD-6
```

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `subscribers`, `publish` | మౌలిక కలయిక విడదీత |
| §4 (విరుపు) | `try/catch` + `failures` | ఒకరి వైఫల్యం అందరినీ ఆపింది |
| §6 (విరుపు) | Per-subscriber queue | Publisher 415 ms ఆగాడు |
| §8 (విరుపు) | `poll` / `ack` / `nack` | Crash ఒక payment ని మాయం చేసింది |
| §9 | `attempts`, `maxAttempts`, `dlq` | అపరిమిత retry queue ని ఆపేస్తుంది |
| §11 | `topic`, `filter` | అందరికీ అన్నీ అవసరం లేదు |

---

# Part 6 — Interview lo

---

## 13. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">ఈ problem lo code సులభం — విలువ అంతా "ఎందుకు" lo ఉంది</text><rect class="n-acc" x="0" y="26" width="110" height="38" rx="3"/><text class="t-w mid" x="55" y="50">6 నిమి</text><text class="t-sm" x="126" y="50"><tspan class="t-acc">Clarify</tspan> — పోవచ్చా? రెండుసార్లు రావచ్చా? క్రమం?</text><rect class="n-info" x="0" y="70" width="80" height="38" rx="3"/><text class="t mid" x="40" y="94">4 నిమి</text><text class="t-sm" x="126" y="94">Observer vs broker తేడా · Basic bus</text><rect class="n-acc" x="0" y="114" width="180" height="38" rx="3"/><text class="t-w mid" x="90" y="138">11 నిమి — Queue + async</text><text class="t-sm" x="196" y="138">isolation, మరియు publisher ఎందుకు ఆగకూడదో</text><rect class="n-acc" x="0" y="158" width="230" height="38" rx="3"/><text class="t-w mid" x="115" y="182">14 నిమి — ack/retry/DLQ</text><text class="t-sm" x="246" y="182"><tspan class="t-acc">ఇదే ఈ interview యొక్క కేంద్రం</tspan></text><rect class="n-soft" x="0" y="202" width="160" height="38" rx="3"/><text class="t mid" x="80" y="226">10 నిమి</text><text class="t-sm" x="246" y="226">Delivery guarantees, ordering, scale</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **Observer vs broker** — మొదటి నిమిషంలోనే ఈ తేడాని చెప్పండి.
2. **Publisher subscriber వేగానికి బందీ కాకూడదు** (§6) — ఒక సంఖ్యతో ("415 ms").
3. **Ack తర్వాతే తీసేయడం** (§9) — **ఇదే కేంద్రం**. ఇది చెప్పకపోతే మిగతాదంతా వృథా.
4. **DLQ ఎందుకు** (§9) — అపరిమిత retry ఒక poison message ని శాశ్వతం చేస్తుంది.
5. **Exactly-once సాధ్యం కాదు; at-least-once + idempotent** (§10).

### ఏమి వదిలేయాలి

- **Filter రాయొద్దు** — ఒక్క వాక్యంలో చెప్పండి.
- **`stats()` వదిలేయండి.**
- **Message class వదిలేయండి** — ఒక plain object చాలు, మరియు `attempts` ఎక్కడ ఉండాలో చెప్తే చాలు.

---

## 14. నోటితో చెప్పాల్సిన English script

<div class="script">
"Two questions that shape everything here. Can a message be lost, and can it be delivered twice? You can't say no to both — exactly-once isn't achievable in a distributed system — so I need to know which side to err on. And does ordering matter?<br><br>
I'll assume messages must not be lost, duplicates are tolerable if consumers are idempotent, and ordering matters per entity but not globally.<br><br>
The simplest version is a list of subscribers and a loop. That already fixes coupling — the order service stops knowing about email and inventory. But it breaks in three ways, and each one is worth fixing separately.<br><br>
First, if one subscriber throws, the loop stops and everyone after it never gets the message — and the exception surfaces in the publisher, so a broken SMTP server makes <span class='mono'>placeOrder</span> look like it failed when the order actually saved. So each handler gets its own try-catch and failures are collected and returned rather than thrown.<br><br>
Second, even isolated, the publisher still pays for everyone's time. I measured it — one fraud check taking 400 ms made publish take 415. That means every new subscriber slows down checkout, which kills the whole point of pub-sub. So publish shouldn't call handlers at all; it should enqueue, and workers drain the queues separately. That took publish from 415 ms to zero.<br><br>
Third — and this is the one I care about most — once it's a queue, you have to be careful about when you remove a message. If you pop it and then the handler crashes, that message is gone with no trace. I saw a payment vanish that way in my own test. So <span class='mono'>poll</span> moves it to an in-flight set rather than dropping it, and it's only really removed on <span class='mono'>ack</span>. On failure, <span class='mono'>nack</span> puts it back and increments an attempt count.<br><br>
That needs a bound, though. Unlimited retries mean one poison message spins forever and blocks everything behind it. So after N attempts it goes to a dead letter queue — that's the system saying 'this isn't transient, a human should look'.<br><br>
On guarantees: acking after processing gives at-least-once, so a crash between finishing and acking means a redelivery. I'd accept that and make consumers idempotent — for payments, keying on a payment id so a repeat is a no-op. That moves the problem somewhere it's actually solvable.<br><br>
One thing I'd flag: each subscriber needs its own copy of the message, because the attempt count is per-subscriber. Sharing one object would merge their retry state."
</div>

---

## 15. Follow-ups — ordering, fan-out, Kafka

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "Subscriber నెమ్మదిగా ఉంటే queue పెరుగుతుంది" | Queue కి ఒక హద్దు + backpressure, లేదా పాతవి వదిలేయడం | Subscription |
| "ఒకే subscriber కి పలు workers" | Queue ఒకటే, workers పలుగురు — poll ఇప్పటికే సరైనది | **0** |
| "Priority messages" | Queue ని ఒక priority queue గా | Subscription |
| "Retry వెంటనే కాకుండా ఆలస్యంగా" | `nack` lo `availableAt = now + backoff` | Subscription |
| "Subscriber కొంతసేపు ఆఫ్‌లైన్ అయితే" | Queue అలాగే ఉంటుంది — అదే durable subscription యొక్క అర్థం | **0** |
| "క్రమం కావాలి" | కింద చూడండి | — |
| "లక్షల messages, పలు servers" | కింద చూడండి | — |

### క్రమం (ordering)

> *"Global ordering ఖరీదైనది మరియు దాదాపు ఎప్పుడూ అవసరం లేదు. నిజంగా కావలసినది <b>per-entity ordering</b> — ఒకే order యొక్క 'created' మరియు 'shipped' సరైన క్రమంలో రావాలి; వేర్వేరు orders మధ్య క్రమం అనవసరం.*
>
> *అందుకే నా `Message` lo ఒక **`key`** ఉంది. ఒకే key ఉన్న messages ఒకే queue (లేదా partition) కి వెళ్తాయి, మరియు ఆ queue ని ఒక్క worker మాత్రమే ప్రాసెస్ చేస్తాడు. వేరే keys సమాంతరంగా నడుస్తాయి. **ఇదే Kafka partitioning.***
>
> *మరియు గమనించండి — retry lo నేను `unshift` వాడాను, `push` కాదు. విఫలమైన message **ముందుకే** తిరిగి వెళ్తుంది, లేకపోతే దాని వెనక ఉన్నవి ముందుకు దూరి క్రమం విరిగిపోతుంది."*

### లక్షల messages, పలు servers

> *"In-memory queue ఒకే process కే. Production lo నేను Kafka లేదా SQS వాడతాను, మరియు నా design అదే ఆకారంలో ఉంది — topic, partition key, offset/ack, DLQ. ఇవన్నీ ఇక్కడ ఉన్నవే.*
>
> ***ఒక ముఖ్యమైన తేడా:** Kafka lo broker messages ని తీసేయదు — consumer ఒక **offset** ఉంచుకుంటాడు. అంటే ఒక కొత్త consumer వచ్చి **మొదటి నుంచి** అన్నీ చదవగలడు. నా in-memory version lo అది సాధ్యం కాదు, ఎందుకంటే ack తర్వాత message పోతుంది. ఆ తేడా ముఖ్యం — Kafka ఒక <b>log</b>, SQS ఒక <b>queue</b>, మరియు అవి వేర్వేరు పనులకి."*

---

## 16. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **వైఫల్యాన్ని వేరుచేయడం** | Per-subscriber try/catch (§5) | Bulkhead, circuit breaker, thread pools |
| **ప్రకటించడం ≠ ప్రాసెస్ చేయడం** | Queue (§7) | Async APIs, background jobs, outbox |
| **పని పూర్తయ్యాకే వదలడం** | poll → ack (§9) | DB transactions, file writes, 2PC |
| **Retry కి ఒక హద్దు** | DLQ (§9) | ఏ retry lo అయినా |
| **Exactly-once సాధ్యం కాదు** | At-least-once + idempotent (§10) | Payments, webhooks, ETL |
| **క్రమం per-key, global కాదు** | `key` → partition (§15) | Kafka, sharding, sequencing |

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 LRU &amp; LFU Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b>.<br><br>
<b>ఈ doc ప్రత్యేకత:</b> మిగతావాటిలో విరుపులు <i>తప్పు జవాబు</i> ఇచ్చాయి. ఇక్కడ మూడో విరుపు — మాయమైన payment — <b>ఏ error నీ ఇవ్వలేదు</b>. System "అంతా బాగుంది" అని చెప్పింది. <b>నిశ్శబ్దంగా విఫలమయ్యే systems</b> అత్యంత ప్రమాదకరమైనవి, మరియు ఆ ఆలోచనే మిగతా అన్నిటికీ వర్తిస్తుంది.<br><br>
వేగవంతమైన revision కోసం — <code>LLD_Design_Problems_Telugu.pdf</code> lo Problem 10. Observer pattern కోసం — <code>LLD_Telugu.pdf</code> §27.
</div>

---

_Pub-Sub — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ప్రతి timing నిజంగా `node` lo run చేసి తీసినవే ✅_
