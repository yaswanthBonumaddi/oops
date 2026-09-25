<!-- style: editorial -->
<!-- footer: ATM · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">21</div>
<div class="kicker">Deep Dive 21 · రెండు systems, ఒక network</div>
<div class="rule"></div>
<div class="cover-title">Design an<br>ATM</div>
<div class="lede">JPMorgan · Goldman · Visa · ప్రతి బ్యాంకు — పైకి ఇది Vending Machine లాగే కనిపిస్తుంది. <b>అది కాదు.</b></div>
<div class="sub">మూడు విరుపులు. మొదటిది ₹3,000 <b>ఖాతా నుంచి తీసేసి నోట్లు ఇవ్వదు</b>. రెండోది ₹3,000 కోసం <b>₹9,000 తీసేసి</b> "విజయం" అంటుంది. మూడోది దాన్ని సరిచేయలేక — <b>ఆ విషయమే మర్చిపోతుంది.</b></div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 21</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output నిజంగా `node` lo run చేసినదే** — 2,000 ATMs, ₹1.96 కోట్ల అనుకరణతో సహా.

<div class="box warn">
<div class="lab">Deep Dive 20 (Vending Machine) చదివారా? — ఇది దానికి కొనసాగింపు, పునరావృత్తం కాదు</div>
Vending machine lo డబ్బు, నిల్వ, jam, rollback — అన్నీ చూశాం. మరియు అక్కడ rollback <b>పనిచేసింది</b>, ఎందుకంటే <b>అన్నీ ఒకే పెట్టెలో</b> ఉన్నాయి. <code>float</code>, <code>escrow</code>, <code>qty</code> — మూడింటినీ ఒక <code>clone()</code> తో వెనక్కి తిప్పగలం.<br><br>
ATM lo <b>అది సాధ్యం కాదు</b>. ఖాతా నిల్వ ఒక <b>వేరే యంత్రంలో</b>, ఒక <b>network అవతల</b> ఉంది. ATM దాన్ని "వెనక్కి తిప్పలేదు" — అది కేవలం <b>అడగగలదు</b>, మరియు ఆ అభ్యర్థన కూడా విఫలం కావచ్చు.<br><br>
<b>ఈ ఒక్క తేడా మూడు కొత్త problems పుట్టిస్తుంది:</b> idempotency, compensation, మరియు reconciliation. అవే ఈ doc.<br><br>
(నోట్ల denominations లెక్క Deep Dive 20 §5 లోనిదే — దాన్ని ఇక్కడ మళ్ళీ రాబట్టను.)
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు network ఎందుకు అంతా మారుస్తుంది
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: "ఏమి జరిగిందో తెలియదు"**

3. Step — Debit, ఆపై dispense
4. **మొదటి విరుపు** — మూడు వైఫల్యాలు, రెండు ఒకేలా కనిపిస్తాయి
5. Step — అనిశ్చితిని ఒక స్థితిగా గుర్తించడం

**Part 3 — రెండో విరుపు: మళ్ళీ ప్రయత్నించడం**

6. Step — "Timeout అంటే తాత్కాలికం, మళ్ళీ ప్రయత్నిద్దాం"
7. **రెండో విరుపు** — ₹3,000 కి ₹9,000 debit
8. Step — Idempotency key

**Part 4 — మూడో విరుపు: సరిచేయలేకపోవడం**

9. Step — నోట్లు ఇవ్వలేకపోతే వెనక్కి తిప్పడం
10. **మూడో విరుపు** — reversal కూడా విఫలమైంది, మరియు ఆ విషయం మాయమైంది
11. Step — Journal · మరియు తర్వాత సరిచేయడం

**Part 5 — పూర్తి system**

12. Step — Network ని తాకకముందే ఆపగలిగేవి
13. మొత్తం code · నడిపి చూద్దాం · **2,000 ATMs, ₹1.96 కోట్లు**

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — రెండు ATMs, cash forecasting, EMV
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు network ఎందుకు అంతా మారుస్తుంది

> *"Design an ATM. A customer inserts a card, enters a PIN, chooses an amount, and the machine dispenses cash."*

<div class="fig">
<div class="cap">ఒక్క పంక్తి తేడా · మొత్తం problem మారుతుంది</div>
<svg viewBox="0 0 750 276"><text class="t-xs" x="0" y="14">Vending machine vs ATM — పైకి ఒకటే, లోపల వేరే</text><rect class="n-good" x="0" y="26" width="360" height="104" rx="4"/><text class="t mid" x="180" y="50">Vending Machine (DD 20)</text><text class="t-sm mid" x="180" y="74">డబ్బు, నిల్వ, dispenser —</text><text class="t-sm mid" x="180" y="94">అన్నీ <tspan class="t-acc">ఒకే పెట్టెలో</tspan></text><text class="t-sm mid" x="180" y="118">jam అయితే: clone() → rollback ✓</text><rect class="n-acc" x="390" y="26" width="360" height="104" rx="4"/><text class="t-w mid" x="570" y="50">ATM</text><text class="t-w-sm mid" x="570" y="74">నోట్లు ఇక్కడ · ఖాతా <tspan class="t-acc">అక్కడ</tspan></text><text class="t-w-sm mid" x="570" y="94">మధ్యలో ఒక network</text><text class="t-w-sm mid" x="570" y="118">jam అయితే: ఖాతాని <tspan class="t-acc">అడగాలి</tspan> ✗</text><rect class="n-bad" x="0" y="146" width="750" height="124" rx="4"/><text class="t mid" x="375" y="170">మరియు "అడగడం" మూడు రకాలుగా ముగుస్తుంది</text><text class="t-sm mid" x="375" y="194"><tspan class="t-acc">విజయం</tspan> — జరిగింది, జవాబు వచ్చింది.  ·  <tspan class="t-acc">Down</tspan> — చేరనేలేదు, ఏమీ జరగలేదు.</text><text class="t-sm mid" x="375" y="218"><tspan class="t-acc">Timeout</tspan> — చేరింది, జరిగింది, <tspan class="t-acc">కానీ జవాబు రాలేదు</tspan>.</text><text class="t-sm mid" x="375" y="244">ఆ మూడోది ఒక వైఫల్యం కాదు — అది ఒక <tspan class="t-acc">అనిశ్చితి</tspan>.</text><text class="t-sm mid" x="375" y="266">మరియు ఈ doc lo ఉన్న మూడు విరుపులూ ఆ ఒక్క పదం నుంచే పుడతాయి.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **ఖాతా నిల్వ ATM lo ఉందా, bank server lo ఉందా?** | **ఇదే మొత్తం problem** — server అంటే §4 |
| **Network విఫలమైతే? Timeout అయితే?** | §5 — మరియు ఈ రెండూ **వేర్వేరు** అని గుర్తించాలి |
| **ఒక debit ని వెనక్కి తిప్పగలమా?** | §9 — మరియు ఆ reversal కూడా విఫలం కావచ్చు (§10) |
| **నోట్లు ఇవ్వలేకపోతే (jam)?** | §9 — Deep Dive 20 §10 యొక్క అదే సమస్య, కానీ కష్టమైన సందర్భంలో |
| **ఏ నోట్లు ఉన్నాయి? ₹1,350 ఇవ్వగలమా?** | §12 — Deep Dive 20 §5 యొక్క DP |
| **రోజువారీ పరిమితి? PIN ప్రయత్నాలు?** | §12 — network ని తాకకముందే చేయగలిగేవి |
| **ATM పునఃప్రారంభమైతే?** | §11 — journal **తప్పనిసరి** |

<div class="box warn">
<div class="lab">రెండో ప్రశ్న — మరియు ఇది interview ని తెరుస్తుంది</div>
<i>"Bank కి పంపిన debit request timeout అయితే — ఆ debit జరిగిందా, జరగలేదా?"</i><br><br>
సరైన జవాబు: <b>తెలియదు.</b> మరియు అదే మొత్తం ఇబ్బంది.<br><br>
"Network down" అంటే request <b>చేరనేలేదు</b> — ఏమీ జరగలేదు, సురక్షితం.<br>
"Timeout" అంటే request <b>చేరింది, server పని చేసింది, జవాబు తిరిగి రాలేదు</b> — లేదా అసలు చేరలేదు. <b>రెండూ ఒకేలా కనిపిస్తాయి.</b><br><br>
ఈ ప్రశ్న అడిగితే, interviewer కి మీరు <b>distributed systems</b> ఆలోచిస్తున్నారని తెలుస్తుంది — ఒక్క machine ఆలోచన కాదని.
</div>

---

# Part 2 — మొదటి విరుపు: "ఏమి జరిగిందో తెలియదు"

---

## 3. Step — Debit, ఆపై dispense

```javascript
class ATM {
  constructor(bank, cash) { this.bank = bank; this.cash = cash; }
  withdraw(acct, amount, { dispenser = () => true } = {}) {
    const d = this.bank.debit(acct, amount);      // 1 · ఖాతా నుంచి తీసేయడం
    if (!d.ok) return d;
    this.cash -= amount;
    if (!dispenser(amount))
      return { ok: false, reason: 'DISPENSE_FAILED' };   // 2 · నోట్లు
    return { ok: true, dispensed: amount, balance: d.balance };
  }
}
```

**క్రమం సరైనది** — ముందు debit, ఆపై నోట్లు. (తిరగబడితే: నోట్లు ఇచ్చాక debit విఫలమైతే బ్యాంకు డబ్బు పోతుంది.)

```
  ప్రారంభ నిల్వ  : ₹10000
  ₹2,000 తీస్తే  : { ok: true, dispensed: 2000, balance: 8000 }
  ₹50,000 తీస్తే : { ok: false, reason: 'INSUFFICIENT_FUNDS' }

  ఇప్పుడు యంత్రం నోట్లు ఇవ్వలేకపోతే:
  ₹3,000 తీస్తే  : { ok: false, reason: 'DISPENSE_FAILED' }
  ఖాతా నిల్వ     : ₹5000 ← డబ్బు పోయింది, నోట్లు రాలేదు
```

ఇది **Deep Dive 20 §10 యొక్క అదే సమస్య**, మరియు అక్కడి పరిష్కారం rollback. కానీ ఇక్కడ...

---

## 4. మొదటి విరుపు — మూడు వైఫల్యాలు, రెండు ఒకేలా కనిపిస్తాయి

Network ని నిజాయితీగా నమూనా చేద్దాం — **మూడు ముగింపులతో**:

```javascript
class Network {
  constructor(script = []) { this.script = [...script]; }
  send(name, fn) {
    const mode = this.script.shift() ?? 'OK';
    if (mode === 'DOWN') return { ok: false, reason: 'NETWORK_DOWN' };  // చేరనేలేదు
    const result = fn();                                    // server చేసింది
    // చేరింది, జరిగింది — కానీ జవాబు రాలేదు
    if (mode === 'TIMEOUT') return { ok: false, reason: 'TIMEOUT' };
    return result;
  }
}
```

ఆ `fn()` ఎక్కడ ఉందో గమనించండి: **`TIMEOUT` lo అది ఇప్పటికే నడిచింది.** అదే నిజ ప్రపంచం.

```
  అంతా బాగుంది
    ATM చూసినది : {"ok":true,"dispensed":3000,"balance":7000}
    ఖాతా నిల్వ   : ₹7000  ·  bank log: [debit A-1 ₹3000]

  Network down (చేరలేదు)
    ATM చూసినది : {"ok":false,"reason":"NETWORK_DOWN"}
    ఖాతా నిల్వ   : ₹10000  ·  bank log: []

  Timeout (చేరింది, జవాబు రాలేదు)
    ATM చూసినది : {"ok":false,"reason":"TIMEOUT"}
    ఖాతా నిల్వ   : ₹7000  ·  bank log: [debit A-1 ₹3000]
```

<div class="box warn">
<div class="lab">మొదటి విరుపు — ATM చూసే జవాబు నిజాన్ని దాచేస్తుంది</div>
కింది రెండు వరుసలు చూడండి. <b>ATM కి రెండూ <code>ok: false</code></b>.<br><br>
కానీ ఖాతా నిల్వ ఒకదాంట్లో <b>₹10,000</b>, రెండోదాంట్లో <b>₹7,000</b>.<br><br>
అంటే: <b>ATM కి తను చూస్తున్న వైఫల్యం ఏ రకమో తెలియదు.</b> ఏమీ జరగలేదా, లేక అంతా జరిగి జవాబు మాత్రం పోయిందా — ఆ తేడా ₹3,000.<br><br>
<b>మౌలిక తప్పు:</b> <code>{ ok: false }</code> అనేది "జరగలేదు" అని అర్థం అనుకున్నాం. <b>Network అవతల అది "జరిగిందో లేదో తెలియదు" అని మాత్రమే అర్థం.</b> ఒక ఫలితం కాదు — ఒక <b>అజ్ఞానం</b>.
</div>

---

## 5. Step — అనిశ్చితిని ఒక స్థితిగా గుర్తించడం

ఈ సమస్యకి ఒక **తెలివైన పరిష్కారం లేదు**. ATM ఎప్పటికీ ఖచ్చితంగా తెలుసుకోలేదు.

చేయగలిగేది ఒక్కటే: **అనిశ్చితిని ఒక స్థితిగా అంగీకరించి, దాన్ని పరిష్కరించగలిగేలా చేయడం.** అది మూడు అవసరాలని పుట్టిస్తుంది —

<div class="fig">
<div class="cap">అనిశ్చితి నుంచి పుట్టే మూడు అవసరాలు</div>
<svg viewBox="0 0 750 244"><text class="t-xs" x="0" y="14">"జరిగిందో లేదో తెలియదు" — దీన్ని సురక్షితంగా నిర్వహించడానికి</text><rect class="n-info" x="0" y="26" width="240" height="108" rx="4"/><text class="t mid" x="120" y="50">1 · Idempotency</text><text class="t-sm mid" x="120" y="74">మళ్ళీ అడిగితే రెండోసారి</text><text class="t-sm mid" x="120" y="92">జరగకూడదు</text><text class="t-acc mid" x="120" y="120">→ §8</text><rect class="n-acc" x="255" y="26" width="240" height="108" rx="4"/><text class="t-w mid" x="375" y="50">2 · Compensation</text><text class="t-w-sm mid" x="375" y="74">వెనక్కి తిప్పలేను, కానీ</text><text class="t-w-sm mid" x="375" y="92"><tspan class="t-acc">ఎదురు పని</tspan> చేయగలను</text><text class="t-w-sm mid" x="375" y="120">→ §9</text><rect class="n-good" x="510" y="26" width="240" height="108" rx="4"/><text class="t mid" x="630" y="50">3 · Reconciliation</text><text class="t-sm mid" x="630" y="74">ఇప్పుడు కుదరకపోతే</text><text class="t-sm mid" x="630" y="92"><tspan class="t-acc">తర్వాత</tspan> కుదరాలి</text><text class="t-acc mid" x="630" y="120">→ §11</text><rect class="n-dark" x="0" y="150" width="750" height="86" rx="4"/><text class="t-w-sm mid" x="375" y="176">ఈ మూడూ కలిపి ఒక పేరు ఉంది: <tspan class="t-acc">saga</tspan> — పలు systems మీద విస్తరించిన లావాదేవీ.</text><text class="t-w-sm mid" x="375" y="200">ఒక database transaction కాదు; ఒక <tspan class="t-acc">దశల వరుస</tspan>, ప్రతి దశకీ ఒక ఎదురు దశ.</text><text class="t-w-sm mid" x="375" y="224">ATM ఆ నమూనా యొక్క <tspan class="t-acc">అతి స్పష్టమైన ఉదాహరణ</tspan> — అందుకే ఇది ఒక మంచి interview problem.</text></svg>
</div>

---

# Part 3 — రెండో విరుపు: మళ్ళీ ప్రయత్నించడం

---

## 6. Step — "Timeout అంటే తాత్కాలికం, మళ్ళీ ప్రయత్నిద్దాం"

Timeout ఒక తాత్కాలిక సమస్యలా అనిపిస్తుంది. Network కొంచెం నెమ్మదైంది, అంతే. **మళ్ళీ ప్రయత్నిద్దాం** — ఇది ప్రతి HTTP client lo ఉండే ప్రవర్తన:

```javascript
withdraw(acct, amount) {
  for (let attempt = 0; attempt <= this.retries; attempt++) {
    const r = this.net.send(() => this.bank.debit(acct, amount));
    if (r.ok) return { ok: true, dispensed: amount,
                       balance: r.balance, attempts: attempt+1 };
    // ఇది మళ్ళీ ప్రయత్నించొద్దు
    if (r.reason === 'INSUFFICIENT_FUNDS') return r;
  }
  return { ok: false, reason: 'GAVE_UP', attempts: this.retries + 1 };
}
```

ఇది **జాగ్రత్తగా రాసిన code** — `INSUFFICIENT_FUNDS` ని మళ్ళీ ప్రయత్నించట్లేదు, ప్రయత్నాల సంఖ్యని తిరిగి ఇస్తోంది.

---

## 7. రెండో విరుపు — ₹3,000 కి ₹9,000 debit

```
Customer ₹3,000 అడిగాడు. మొదటి రెండు ప్రయత్నాలు timeout అయ్యాయి.

  ATM చూసినది   : { ok: true, dispensed: 3000, balance: 1000, attempts: 3 }
  నోట్లు ఇచ్చినవి : ₹3,000  (ఒక్కసారే)
  bank debits    : ₹3000 + ₹3000 + ₹3000 =  ₹9000
  ఖాతా నిల్వ     : ₹1000 ← ₹9,000 పోయింది, ₹3,000 వచ్చింది
```

<div class="box warn">
<div class="lab">రెండో విరుపు — ATM "విజయం" అని చెప్పింది, మరియు అది నిజమే</div>
Customer ₹3,000 అడిగాడు. అతనికి ₹3,000 వచ్చాయి. ATM screen "Transaction successful" చూపించింది. <b>అంతా సరిగ్గా జరిగినట్టే కనిపిస్తోంది.</b><br><br>
కానీ అతని ఖాతా నుంచి <b>₹9,000</b> పోయాయి — ఎందుకంటే మొదటి రెండు "విఫలమైన" ప్రయత్నాలూ <b>నిజంగా విజయవంతమయ్యాయి</b>, జవాబు మాత్రమే పోయింది.<br><br>
<b>మరియు ఎవరికీ తెలియదు.</b> ATM కి తెలియదు, customer కి వెంటనే తెలియదు, bank కి మూడు చెల్లుబాటయ్యే debits కనిపిస్తాయి.<br><br>
<b>మౌలిక తప్పు:</b> "మళ్ళీ ప్రయత్నించడం" అనేది <b>ఒక operation మళ్ళీ చేస్తే అదే ఫలితం వస్తుంది</b> అని ఊహిస్తుంది. చదవడానికి అది నిజం. <b>డబ్బు తీసేయడానికి అది పూర్తిగా అబద్ధం.</b>
</div>

---

## 8. Step — Idempotency key

పరిష్కారం: **ప్రతి కోరికకీ ఒక ప్రత్యేక గుర్తింపు**, మరియు bank ఆ గుర్తింపుతో ఫలితాన్ని గుర్తుపెట్టుకుంటుంది.

```javascript
debit(key, acct, amount) {
  if (this.seen.has(key))
    return { ...this.seen.get(key), replayed: true };   // ఇప్పటికే చేసినది
  ...
  this.seen.set(key, res);                             // ఫలితాన్ని key తో దాచడం
  return res;
}
```

మరియు ATM వైపు — **ఒక్కో కోరికకి ఒక్కటే key, ప్రయత్నాలన్నిటికీ అదే**:

```javascript
withdraw(acct, amount) {
  const key = `W-${++this.#seq}`;         // ఒక్కో కోరికకి ఒక్కటే key
  for (let attempt = 0; attempt <= this.retries; attempt++) {
    const r = this.net.send(() => this.bank.debit(key, acct, amount));
    ...
  }
}
```

<div class="box">
<div class="lab">ఆ <code>key</code> ఎక్కడ పుడుతుందో అదే కీలకం</div>
ఇది <b>ATM lo</b> పుడుతుంది, loop కి <b>బయట</b>. మూడు ప్రయత్నాలూ <b>అదే key</b> పంపుతాయి.<br><br>
Bank కి "ఇది మూడో ప్రయత్నమా" అని తెలియనవసరం లేదు — అది <b>key ని చూసి</b> "ఇది ఇప్పటికే చేశాను" అని గుర్తిస్తుంది, మరియు <b>అదే ఫలితాన్ని</b> తిరిగి ఇస్తుంది.<br><br>
<b>నియమం:</b> <i>Idempotency అనేది ఒక operation యొక్క లక్షణం కాదు — అది ఒక <b>ఒప్పందం</b>.</i> పంపేవాడు ఒక స్థిరమైన key ఇవ్వాలి; అందుకునేవాడు దాన్ని గుర్తుపెట్టుకోవాలి. ఒక్కరు తప్పినా అది విరిగిపోతుంది.
</div>

```
అదే పరిస్థితి — రెండు timeouts, ఆపై విజయం

  ATM చూసినది   : { ok: true, dispensed: 3000, balance: 7000,
                    attempts: 3, replayed: true }
  bank debits    : ₹3000
  ఖాతా నిల్వ     : ₹7000 ← సరిగ్గా ₹3,000 మాత్రమే ✓
```

**మూడు ప్రయత్నాలు, ఒక్క debit.** మరియు `replayed: true` — ATM కి "ఇది ఒక పునరావృత్తి" అని తెలుసు.

---

# Part 4 — మూడో విరుపు: సరిచేయలేకపోవడం

---

## 9. Step — నోట్లు ఇవ్వలేకపోతే వెనక్కి తిప్పడం

Debit విజయవంతమైంది. ఇప్పుడు నోట్లు ఇరుక్కున్నాయి. **ఎదురు పని చేయాలి** — ఒక `reverse`:

```javascript
reverse(key, acct, amount) {
  const rk = 'R:' + key;
  if (this.seen.has(rk)) return { ...this.seen.get(rk), replayed: true };
  const b = this.accounts.get(acct);
  this.accounts.set(acct, b + amount);
  ...
}
```

<div class="note"><b>Reversal కూడా idempotent కావాలి</b> — అదే key తో, ఒక <code>R:</code> ఉపసర్గతో. లేకపోతే §7 యొక్క సమస్య <b>అద్దంలో</b> తిరిగి వస్తుంది: reversal ని మూడుసార్లు retry చేస్తే customer కి ₹6,000 అదనంగా వస్తాయి.<br><br>
మరియు గమనించండి — ఇది <b>rollback కాదు</b>. Rollback అంటే "జరగనట్టు చేయడం"; ledger lo మొదటి debit <b>ఇప్పటికీ ఉంటుంది</b>, దాని పక్కన ఒక ఎదురు entry చేరుతుంది. <b>అదే compensation.</b></div>

---

## 10. మూడో విరుపు — reversal కూడా విఫలమైంది, మరియు ఆ విషయం మాయమైంది

```
నోట్లు ఇవ్వలేకపోయాం — reversal ప్రయత్నిస్తాం

  reversal విజయవంతం
    ATM      : {"ok":false,"reason":"DISPENSE_FAILED","reversed":true}
    bank log : −₹3000 +₹3000  ·  నిల్వ ₹10000

  reversal కూడా విఫలం
    ATM      : {"ok":false,"reason":"DISPENSE_FAILED","reversed":false,
                "reversalError":"NETWORK_DOWN"}
    bank log : −₹3000  ·  నిల్వ ₹7000
```

<div class="box warn">
<div class="lab">మూడో విరుపు — ATM కి తెలుసు, కానీ ఆ జ్ఞానం ఎక్కడికీ వెళ్ళదు</div>
రెండో సందర్భంలో customer <b>₹3,000 పోగొట్టుకున్నాడు</b>. నోట్లు రాలేదు. ATM కి ఇది <b>తెలుసు</b> — <code>reversed: false</code> అని తిరిగి ఇస్తోంది.<br><br>
<b>కానీ ఆ function return అయిన క్షణం, ఆ జ్ఞానం మాయమవుతుంది.</b><br><br>
ఎవరూ దాన్ని దాచలేదు. ఎవరూ మళ్ళీ ప్రయత్నించరు. ATM పునఃప్రారంభమైతే ఆ విషయం ఉనికిలోనే ఉండదు. Customer బ్యాంకుకి ఫోన్ చేసి, నిరూపించుకుని, వారాల తర్వాత తన డబ్బు తిరిగి పొందాలి.<br><br>
<b>మౌలిక తప్పు:</b> మనం "ఇప్పుడే సరిచేయాలి" అని ప్రయత్నించాం. కానీ network విఫలమైనప్పుడు <b>ఇప్పుడు అనేది ఉండదు</b>. కావాల్సినది: <b>సరిచేయాల్సిన పని ఒక శాశ్వత రికార్డుగా మిగలాలి.</b>
</div>

---

## 11. Step — Journal · మరియు తర్వాత సరిచేయడం

ATM ప్రతి లావాదేవీని **ముందు రాస్తుంది, ఆపై చేస్తుంది** — మరియు ప్రతి దశనీ గుర్తిస్తుంది:

```javascript
const PHASE = {
  STARTED: 'STARTED', DEBITED: 'DEBITED', DISPENSED: 'DISPENSED',
  COMPLETE: 'COMPLETE', REVERSAL_PENDING: 'REVERSAL_PENDING',
  REVERSED: 'REVERSED', DECLINED: 'DECLINED',
};
class Journal {
  entries = new Map();
  open(key, acct, amount) {
    const e = { key, acct, amount, phase: PHASE.STARTED, at: this.entries.size };
    this.entries.set(key, e);
    return e;
  }
  mark(key, phase, extra = {}) {
    const e = this.entries.get(key);
    Object.assign(e, { phase }, extra);
    return e;
  }
  get unresolved() {
    return [...this.entries.values()]
             .filter(e => e.phase === PHASE.REVERSAL_PENDING);
  }
}
```

మరియు **తర్వాత సరిచేయడం**:

```javascript
// ---- మిగిలిపోయినవాటిని మళ్ళీ ప్రయత్నించడం ----
reconcile() {
  const pending = this.journal.unresolved;
  let fixed = 0;
  for (const e of pending) if (this.#tryReverse(e.key)) fixed++;
  return { checked: pending.length, resolved: fixed,
           stillPending: this.journal.unresolved.length };
}
```

<div class="box">
<div class="lab">Timeout కూడా <code>REVERSAL_PENDING</code> కి వెళుతుంది — మరియు అది ఉద్దేశపూర్వకం</div>
Debit timeout అయితే, debit జరిగిందో లేదో తెలియదు. ATM ఏమి చేయాలి?<br><br>
<b>జవాబు: reversal పంపాలి.</b> Debit జరిగి ఉంటే అది సరిచేస్తుంది; జరగకపోతే bank <code>NOTHING_TO_REVERSE</code> అంటుంది, అదీ పర్వాలేదు.<br><br>
<code>if (d.reason === 'TIMEOUT') { mark(REVERSAL_PENDING); tryReverse(key); }</code><br><br>
<b>ఇది ఒక ముఖ్యమైన వైఖరి:</b> అనిశ్చితిని ఎదుర్కొన్నప్పుడు, <b>సురక్షితమైన వైపు తప్పు చేయడం</b>. Customer కి నోట్లు రాలేదు కాబట్టి, debit ఉండకూడదు. Reversal అనవసరమైనా హాని లేదు (idempotent); reversal చేయకపోతే customer డబ్బు పోతుంది.
</div>

```
--- §10: reversal కూడా విఫలం → journal lo మిగిలింది ---
  ₹3,000 → { ok: false, reason: 'DISPENSE_FAILED', key: 'W-0001',
             reversed: false, willReconcile: true }
  నిల్వ         : ₹17000 ← ఇంకా తక్కువే
  journal       : W-0001=REVERSAL_PENDING

  తర్వాత network తిరిగి వచ్చింది. reconcile():
    { checked: 1, resolved: 1, stillPending: 0 }
    నిల్వ ఇప్పుడు : ₹20000 ← సరిచేయబడింది ✓
    journal       : W-0001=REVERSED
```

---

# Part 5 — పూర్తి system

---

## 12. Step — Network ని తాకకముందే ఆపగలిగేవి

ఒక చివరి ఆలోచన, మరియు ఇది సులభమైనది కానీ ముఖ్యమైనది: **network ని అడగకుండానే తెలిసిపోయేవి ముందే తనిఖీ చేయాలి.**

```javascript
// ---- ముందు, network ని తాకకుండా చేయగలిగే తనిఖీలు ----
if (amount <= 0) return { ok: false, reason: `BAD_AMOUNT: ${amount}` };
const today = this.withdrawnToday.get(acct) ?? 0;
if (today + amount > this.dailyLimit)
  return { ok: false,
           reason: `DAILY_LIMIT: ₹${this.dailyLimit - today} మిగిలింది` };
const plan = this.cash.plan(amount);
if (!plan) return { ok: false, reason: `CANNOT_DISPENSE: ₹${amount}` };

// ---- ఇక్కడి నుంచి journal lo రాస్తున్నాం ----
const key = `W-${String(++this.#seq).padStart(4, '0')}`;
this.journal.open(key, acct, amount);
```

```
--- తిరస్కరణలు (network తాకకుండా) ---
  నోట్లతో ఇవ్వలేనిది : { ok: false, reason: 'CANNOT_DISPENSE: ₹1350' }
  రోజువారీ పరిమితి   : { ok: false, reason: 'DAILY_LIMIT: ₹25000 మిగిలింది' }
  ఋణాత్మకం          : { ok: false, reason: 'BAD_AMOUNT: -100' }
  network calls      : 0 ← సున్నా, అన్నీ ముందే ఆగిపోయాయి
```

<div class="box">
<div class="lab">₹1,350 ని ఎందుకు ముందే ఆపాలి</div>
ATM lo ₹100, ₹200, ₹500, ₹2000 నోట్లు ఉన్నాయి. <b>₹1,350 ఇవ్వడం అసాధ్యం</b> — ₹50 నోట్లు లేవు.<br><br>
దీన్ని <b>debit తర్వాత</b> కనుక్కుంటే, ఒక అనవసరమైన debit + reversal జంట ledger lo మిగులుతుంది, ఒక network round-trip వృథా, మరియు ఒక reversal విఫలమయ్యే అవకాశం పుడుతుంది.<br><br>
<b>నియమం: ప్రమాదకరమైన దశకి ముందు, ఖచ్చితంగా చెప్పగలిగేవన్నీ చెప్పేయాలి.</b> ఇది Deep Dive 20 §12 (<code>canBuy</code>) యొక్క అదే ఆలోచన — కానీ ఇక్కడ దాని విలువ చాలా ఎక్కువ, ఎందుకంటే తర్వాతి దశ <b>వెనక్కి తీసుకోలేనిది</b>.
</div>

---

## 13. మొత్తం code · నడిపి చూద్దాం · 2,000 ATMs, ₹1.96 కోట్లు

<div class="fig">
<div class="cap">నిర్మాణం · నాలుగు ముక్కలు, ఒక network</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">ATM కి ఖాతా కనిపించదు — అది ఒక network అవతల</text><rect class="n-acc" x="30" y="26" width="280" height="48" rx="4"/><text class="t-w mid" x="170" y="46">ATM</text><text class="t-w-sm mid" x="170" y="64">withdraw · reconcile</text><rect class="n-dark" x="440" y="26" width="280" height="48" rx="4"/><text class="t-w mid" x="580" y="46">Bank</text><text class="t-w-sm mid" x="580" y="64">debit · reverse (idempotent)</text><line class="ln-acc" x1="316" y1="42" x2="434" y2="42" marker-end="url(#aa)"/><line class="ln-dash" x1="434" y1="60" x2="316" y2="60"/><text class="t-sm mid" x="375" y="92">OK · DOWN · <tspan class="t-acc">TIMEOUT</tspan></text><line class="ln-acc" x1="100" y1="78" x2="100" y2="112" marker-end="url(#aa)"/><line class="ln-acc" x1="240" y1="78" x2="240" y2="112" marker-end="url(#aa)"/><rect class="n-info" x="0" y="116" width="190" height="52" rx="4"/><text class="t mid" x="95" y="138">CashBox · §12</text><text class="t-sm mid" x="95" y="156">plan() · DD 20 §5</text><rect class="n-good" x="200" y="116" width="190" height="52" rx="4"/><text class="t mid" x="295" y="138">Journal · §11</text><text class="t-sm mid" x="295" y="156">phase · unresolved</text><rect class="n-bad" x="0" y="184" width="750" height="66" rx="4"/><text class="t-sm mid" x="375" y="208">అచలం: <tspan class="t-acc">ఖాతా నుంచి పోయినది = ఇచ్చిన నగదు + పరిష్కారం కాని బాకీలు</tspan></text><text class="t-sm mid" x="375" y="232">అది ఎప్పుడూ నిజం — timeouts lo నూ, jams lo నూ, reconcile ముందూ తర్వాతా.</text></svg>
</div>

```javascript
'use strict';
class Bank {
  #accounts = new Map();
  #seen = new Map();                            // idempotency key → ఫలితం
  ledger = [];
  constructor(accounts) {
    for (const [a, b] of Object.entries(accounts)) this.#accounts.set(a, b);
  }
  balance(acct) { return this.#accounts.get(acct); }

  debit(key, acct, amount) {
    if (this.#seen.has(key)) return { ...this.#seen.get(key), replayed: true };
    let res;
    const bal = this.#accounts.get(acct);
    if (bal === undefined) res = { ok: false, reason: `NO_ACCOUNT: ${acct}` };
    else if (amount <= 0) res = { ok: false, reason: `BAD_AMOUNT: ${amount}` };
    else if (bal < amount)
      res = { ok: false, reason: `INSUFFICIENT_FUNDS: ₹${bal}` };
    else {
      this.#accounts.set(acct, bal - amount);
      this.ledger.push({ key, acct, delta: -amount });
      res = { ok: true, balance: bal - amount };
    }
    this.#seen.set(key, res);
    return res;
  }
  // ఒక debit ని వెనక్కి తిప్పడం — అదే key తో, ఒక్కసారే
  reverse(key, acct, amount) {
    const rk = `R:${key}`;
    if (this.#seen.has(rk)) return { ...this.#seen.get(rk), replayed: true };
    if (!this.#seen.has(key) || !this.#seen.get(key).ok)
      return { ok: false, reason: `NOTHING_TO_REVERSE: ${key}` };
    const bal = this.#accounts.get(acct);
    this.#accounts.set(acct, bal + amount);
    this.ledger.push({ key: rk, acct, delta: +amount });
    const res = { ok: true, balance: bal + amount };
    this.#seen.set(rk, res);
    return res;
  }
}

// చిల్లర లెక్క Deep Dive 20 §5 లోనిదే — అదే bounded coin change DP
class CashBox {
  #n = new Map();
  constructor(init = {}) {
    for (const [k,v] of Object.entries(init)) this.#n.set(+k, v);
  }
  get denoms() { return [...this.#n.keys()].sort((a,b) => b-a); }
  count(d) { return this.#n.get(d) ?? 0; }
  add(d, n = 1) { this.#n.set(d, this.count(d) + n); return this; }
  get total() { return this.denoms.reduce((s,d) => s + d*this.count(d), 0); }
  clone() {
    const c = new CashBox();
    for (const d of this.denoms) c.add(d, this.count(d));
    return c;
  }
  toString() {
    const p = this.denoms.filter(d => this.count(d))
                  .map(d => `${this.count(d)}×₹${d}`);
    return p.length ? p.join(' ') : 'ఖాళీ';
  }
  plan(amount) {                                // ఈ మొత్తాన్ని ఇవ్వగలమా
    if (amount === 0) return new CashBox();
    const best = new Array(amount + 1).fill(null);
    best[0] = new Map();
    for (const d of this.denoms) {
      const avail = this.count(d);
      for (let take = 1; take <= avail; take++)
        for (let v = amount; v >= d; v--)
          if (best[v] === null && best[v-d] !== null &&
              (best[v-d].get(d) ?? 0) < avail) {
            const m = new Map(best[v-d]);
            m.set(d, (m.get(d) ?? 0) + 1); best[v] = m;
          }
    }
    if (best[amount] === null) return null;
    const out = new CashBox();
    for (const [d, n] of best[amount]) out.add(d, n);
    return out;
  }
  take(plan) {
    for (const d of plan.denoms) {
      if (this.count(d) < plan.count(d)) throw new Error(`NOT_ENOUGH_NOTES: ₹${d}`);
      this.#n.set(d, this.count(d) - plan.count(d));
    }
    return this;
  }
}

const PHASE = {
  STARTED: 'STARTED', DEBITED: 'DEBITED', DISPENSED: 'DISPENSED',
  COMPLETE: 'COMPLETE', REVERSAL_PENDING: 'REVERSAL_PENDING',
  REVERSED: 'REVERSED', DECLINED: 'DECLINED',
};
class Journal {
  entries = new Map();
  open(key, acct, amount) {
    const e = { key, acct, amount, phase: PHASE.STARTED, at: this.entries.size };
    this.entries.set(key, e);
    return e;
  }
  mark(key, phase, extra = {}) {
    const e = this.entries.get(key);
    Object.assign(e, { phase }, extra);
    return e;
  }
  get unresolved() {
    return [...this.entries.values()]
             .filter(e => e.phase === PHASE.REVERSAL_PENDING);
  }
}

class ATM {
  #seq = 0;
  constructor(bank, net, cash, { dailyLimit = 25_000, maxPin = 3 } = {}) {
    Object.assign(this, { bank, net, cash: new CashBox(cash), dailyLimit, maxPin });
    this.journal = new Journal();
    this.pinFails = new Map();
    this.withdrawnToday = new Map();
  }
  #call(fn) { return this.net.send(fn); }

  authenticate(card, pin, correctPin) {
    const fails = this.pinFails.get(card) ?? 0;
    if (fails >= this.maxPin) return { ok: false, reason: 'CARD_BLOCKED' };
    if (pin !== correctPin) {
      this.pinFails.set(card, fails + 1);
      return { ok: false, reason: `WRONG_PIN`, left: this.maxPin - fails - 1 };
    }
    this.pinFails.delete(card);
    return { ok: true };
  }

  withdraw(acct, amount, { dispenser = () => true } = {}) {
    // ---- ముందు, network ని తాకకుండా చేయగలిగే తనిఖీలు ----
    if (amount <= 0) return { ok: false, reason: `BAD_AMOUNT: ${amount}` };
    const today = this.withdrawnToday.get(acct) ?? 0;
    if (today + amount > this.dailyLimit)
      return { ok: false,
           reason: `DAILY_LIMIT: ₹${this.dailyLimit - today} మిగిలింది` };
    const plan = this.cash.plan(amount);
    if (!plan) return { ok: false, reason: `CANNOT_DISPENSE: ₹${amount}` };

    const key = `W-${String(++this.#seq).padStart(4, '0')}`;
    this.journal.open(key, acct, amount);

    const d = this.#call(() => this.bank.debit(key, acct, amount));
    if (!d.ok) {
      // TIMEOUT అయితే debit జరిగిందో లేదో తెలియదు — reversal కి పంపడం సురక్షితం
      if (d.reason === 'TIMEOUT') {
        this.journal.mark(key, PHASE.REVERSAL_PENDING, { why: 'DEBIT_UNCERTAIN' });
        this.#tryReverse(key);
        return { ok: false, reason: 'TIMEOUT', key, willReconcile: true };
      }
      this.journal.mark(key, PHASE.DECLINED, { why: d.reason });
      return { ok: false, reason: d.reason, key };
    }
    this.journal.mark(key, PHASE.DEBITED);

    this.cash.take(plan);
    if (!dispenser(plan)) {
      // నోట్లు వెనక్కి పెట్టెలోకి
      for (const dd of plan.denoms) this.cash.add(dd, plan.count(dd));
      this.journal.mark(key, PHASE.REVERSAL_PENDING, { why: 'DISPENSE_FAILED' });
      const rev = this.#tryReverse(key);
      return { ok: false, reason: 'DISPENSE_FAILED', key,
               reversed: rev, willReconcile: !rev };
    }
    this.journal.mark(key, PHASE.COMPLETE);
    this.withdrawnToday.set(acct, today + amount);
    return { ok: true, key, dispensed: plan.toString(),
             amount, balance: d.balance };
  }

  #tryReverse(key) {
    const e = this.journal.entries.get(key);
    const r = this.#call(() => this.bank.reverse(key, e.acct, e.amount));
    if (r.ok || r.reason?.startsWith('NOTHING_TO_REVERSE')) {
      this.journal.mark(key, PHASE.REVERSED);
      return true;
    }
    return false;                                // REVERSAL_PENDING గానే ఉంటుంది
  }

  // ---- మిగిలిపోయినవాటిని మళ్ళీ ప్రయత్నించడం ----
  reconcile() {
    const pending = this.journal.unresolved;
    let fixed = 0;
    for (const e of pending) if (this.#tryReverse(e.key)) fixed++;
    return { checked: pending.length, resolved: fixed,
             stillPending: this.journal.unresolved.length };
  }
}
```

```
--- సాధారణ withdrawal ---
  నోట్ల పెట్టె : 5×₹2000 10×₹500 10×₹200 20×₹100
  ₹3,700 → { ok: true, key: 'W-0001', dispensed: '1×₹2000 3×₹500 1×₹200', amount: 3700, balance: 16300 }
  నోట్ల పెట్టె : 4×₹2000 7×₹500 9×₹200 20×₹100
  ఖాతా నిల్వ   : ₹16300

--- §7: retry double-debit ఇక లేదు ---
  ₹3,000 → { ok: false, reason: 'TIMEOUT', key: 'W-0001', willReconcile: true }
  ledger  : W-0001 -3000 · R:W-0001 +3000
  నిల్వ    : ₹20000 ← debit జరిగింది, వెంటనే వెనక్కి ✓

--- §10: dispense విఫలం, reversal విజయం ---
  ₹3,000 → { ok: false, reason: 'DISPENSE_FAILED', key: 'W-0001', reversed: true, willReconcile: false }
  నిల్వ    : ₹20000
  నోట్లు   : 5×₹2000 10×₹500 10×₹200 20×₹100

--- §10: reversal కూడా విఫలం → journal lo మిగిలింది ---
  ₹3,000 → { ok: false, reason: 'DISPENSE_FAILED', key: 'W-0001', reversed: false, willReconcile: true }
  నిల్వ         : ₹17000 ← ఇంకా తక్కువే
  journal       : W-0001=REVERSAL_PENDING

  తర్వాత network తిరిగి వచ్చింది. reconcile():
    { checked: 1, resolved: 1, stillPending: 0 }
    నిల్వ ఇప్పుడు : ₹20000 ← సరిచేయబడింది ✓
    journal       : W-0001=REVERSED

--- తిరస్కరణలు (network తాకకుండా) ---
  నోట్లతో ఇవ్వలేనిది : { ok: false, reason: 'CANNOT_DISPENSE: ₹1350' }
  రోజువారీ పరిమితి   : { ok: false, reason: 'DAILY_LIMIT: ₹25000 మిగిలింది' }
  ఋణాత్మకం          : { ok: false, reason: 'BAD_AMOUNT: -100' }
  network calls      : 0 ← సున్నా, అన్నీ ముందే ఆగిపోయాయి

--- ఖాతా / PIN ---
  సరిపోని నిల్వ : { ok: false, reason: 'INSUFFICIENT_FUNDS: ₹1000', key: 'W-0001' }
  PIN 1111       : { ok: false, reason: 'WRONG_PIN', left: 2 }
  PIN 2222       : { ok: false, reason: 'WRONG_PIN', left: 1 }
  PIN 3333       : { ok: false, reason: 'WRONG_PIN', left: 0 }
  PIN 1234       : { ok: false, reason: 'CARD_BLOCKED' }
```

### అసలు రుజువు — రెండు systems మీద డబ్బు సంరక్షణ

Vending machine lo ఒక్క సమీకరణం సరిపోయింది (DD 20 §13). ఇక్కడ **రెండు systems** ఉన్నాయి, కాబట్టి సమీకరణం పెద్దది:

> **ఖాతా నుంచి పోయినది = ఇచ్చిన నగదు + పరిష్కారం కాని బాకీలు**

2,000 ATMs, ఒక్కొక్కటీ 8 యాదృచ్ఛిక withdrawals, **network lo ప్రతి call కి 25% వైఫల్య అవకాశం** (timeouts మరియు outages కలిపి), 20% jams:

```
2,000 ATMs · 9555 పూర్తి · 4516 వెనక్కి · 0 పరిష్కారం కానివి
మొత్తం ఇచ్చిన నగదు: ₹1,96,60,100
ledger ↔ నిల్వ ↔ నోట్లు ↔ journal — అన్నీ ఏకీభవిస్తున్నాయా? అవును ✓
```

నాలుగు అచలాలు: **ledger మొత్తం = నిల్వ మార్పు**, **నోట్ల పెట్టె తగ్గుదల = ఇచ్చిన నగదు**, **ఖాతా తగ్గుదల = నగదు + బాకీలు**, మరియు **ప్రతి journal entry ఒక చెల్లుబాటయ్యే phase lo**.

**మరియు network తిరిగి వచ్చాక `reconcile()` — 0 పరిష్కారం కానివి.** ₹1.96 కోట్లు, 4,516 reversals, ఒక్క రూపాయి కూడా ఇరుక్కుపోలేదు.

<div class="note"><b>ఒక పద్ధతి పొరపాటు, నేను చేసినది:</b> ఈ పరీక్ష మొదట <b>206 వైఫల్యాలు</b> చూపించింది. నేను వెంటనే <code>#tryReverse</code> ని అనుమానించాను.<br><br>
నిజానికి ledger పూర్తిగా సరైనది — నా <b>పరీక్ష</b> తప్పు. నేను "network తిరిగి వచ్చింది" అని చెప్పడానికి <code>script.push('OK')</code> చేశాను, కానీ <code>send()</code> script ని <b>ముందు నుంచి</b> తీసుకుంటుంది. ఆ 'OK' లు జాబితా చివర్లో ఉండిపోయాయి, మరియు <code>reconcile()</code> ఇంకా యాదృచ్ఛిక వైఫల్యాలనే ఎదుర్కొంది.<br><br>
Deep Dive 17 §12 lo సరిగ్గా ఇదే జరిగింది. <b>ఒక పరీక్ష విఫలమైతే, పరీక్ష కూడా అనుమానితురాలే.</b></div>

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `debit` ఆపై `dispense` | మౌలిక క్రమం |
| §4 (విరుపు) | `Network` మూడు ముగింపులతో | DOWN మరియు TIMEOUT ఒకేలా కనిపిస్తాయి |
| §7 (విరుపు) | Idempotency key | ₹3,000 కి ₹9,000 debit |
| §8 | `reverse` కూడా idempotent | లేకపోతే అదే సమస్య అద్దంలో |
| §10 (విరుపు) | `Journal` + `reconcile` | సరిచేయలేని విషయం మాయమైంది |
| §11 | TIMEOUT → `REVERSAL_PENDING` | అనిశ్చితిలో సురక్షితమైన వైపు |
| §12 | Network ముందు తనిఖీలు | తర్వాతి దశ వెనక్కి తీసుకోలేనిది |
| §13 | రెండు-system అచలం | ఒక్క సమీకరణం చాలదు |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Card, PIN, నోట్లు — వేగంగా. Network అవతలి కథే అసలు interview.</text><rect class="n-acc" x="0" y="26" width="100" height="38" rx="3"/><text class="t-w mid" x="50" y="50">6 నిమి</text><text class="t-sm" x="116" y="50"><tspan class="t-acc">Clarify</tspan> — నిల్వ ఎక్కడ? timeout అయితే? reversal ఉందా?</text><rect class="n-acc" x="0" y="70" width="110" height="38" rx="3"/><text class="t-w mid" x="55" y="94">6 నిమి</text><text class="t-sm" x="126" y="94">PIN · నోట్లు · పరిమితులు — <tspan class="t-acc">వేగంగా</tspan></text><rect class="n-acc" x="0" y="114" width="200" height="38" rx="3"/><text class="t-w mid" x="100" y="138">13 నిమి — Idempotency</text><text class="t-sm" x="216" y="138">retry ఎందుకు ప్రమాదకరం · key</text><rect class="n-good" x="0" y="158" width="220" height="38" rx="3"/><text class="t mid" x="110" y="182">13 నిమి — Journal</text><text class="t-sm" x="236" y="182">compensation · <tspan class="t-acc">reconciliation</tspan></text><rect class="n-soft" x="0" y="202" width="110" height="38" rx="3"/><text class="t mid" x="55" y="226">7 నిమి</text><text class="t-sm" x="236" y="226">అచలం · రెండు ATMs · forecasting</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **"Timeout ≠ వైఫల్యం"** (§4) — "a timeout means I don't know whether it happened." **ఇదే ఈ interview యొక్క కేంద్రం**, మరియు దీన్ని మొదటి ఐదు నిమిషాల్లో చెప్పండి.
2. **Retry ఒక్కటే double-debit కి కారణం** (§7) — ₹3,000 కి ₹9,000 ఉదాహరణ చెప్పండి.
3. **Idempotency key ఒక ఒప్పందం** (§8) — key **పంపేవాడు** పుట్టిస్తాడు, **అందుకునేవాడు** గుర్తుపెట్టుకుంటాడు.
4. **Reversal ఒక compensation, rollback కాదు** (§9) — ledger lo రెండు entries ఉంటాయి.
5. **Journal + reconcile** (§11) — "if I can't fix it now, it has to survive until I can." మరియు **TIMEOUT కూడా reversal కి వెళుతుంది**.

### ఏమి వదిలేయాలి

- **`CashBox.plan` రాయొద్దు** — "bounded coin change, same DP as making change" అని చెప్పండి.
- **PIN, card blocking** — రెండు వాక్యాలు.
- **Bank యొక్క అంతర్గత భాగం** — అది ఒక interface.
- **నిజమైన EMV/ISO-8583 వివరాలు** — అడిగితేనే (§16).

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"First question, and everything follows from it: does the ATM hold the balance, or is the account on a bank server across a network? If it's on a server, then this isn't really a vending machine problem — it's a distributed transaction problem, and I'd design around that.<br><br>
The obvious order is right: debit first, then dispense. If you dispense first and the debit fails, the bank has lost money. But now the interesting part. When the ATM calls the bank, there are three outcomes, not two. Success. Network down, meaning the request never arrived and nothing happened. And timeout — which means the request may well have arrived, the debit may well have happened, and only the response was lost. The ATM sees the same failure for the last two, but in one case the balance is untouched and in the other three thousand rupees are gone. A timeout isn't a failure; it's an absence of information.<br><br>
That's what makes retries dangerous. Retrying a timeout feels obviously correct — it's what every HTTP client does. But if the debit did land, retrying debits again. I ran it: a customer asking for three thousand rupees, two timeouts then a success, got three thousand in cash and nine thousand taken from their account, and the ATM displayed 'transaction successful'. Retry assumes replaying an operation gives the same result. That's true for reads and completely false for moving money.<br><br>
So every withdrawal gets an idempotency key, generated by the ATM once, outside the retry loop, and sent with every attempt. The bank records the result against that key and returns the same result for a repeat instead of debiting again. The important part is that it's a contract between two sides — the caller has to keep the key stable and the callee has to remember it. If either half is missing it doesn't work.<br><br>
Next: the debit succeeded and then the notes jam. I can't roll back, because the balance lives in another system. What I can do is send a compensating reversal — and that has to be idempotent too, or retrying the reversal over-credits the customer. It's not a rollback; the original debit stays in the ledger and a reversing entry sits next to it.<br><br>
And then the case people miss. The reversal can fail too. At that point the customer is out three thousand rupees, the ATM knows it, and the moment that function returns, that knowledge is gone. So the ATM writes a journal entry before it starts and marks each phase as it goes, and anything left in reversal-pending gets retried by a reconcile pass when the network comes back. I'd also route timeouts into reversal-pending rather than guessing — if the debit happened, the reversal fixes it; if it didn't, the bank says there's nothing to reverse, which is harmless. When you're uncertain, err toward the customer.<br><br>
One small thing that matters a lot: everything I can check without the network — amount validity, daily limit, whether the note denominations can even make this amount — I check before writing anything or calling anyone. The next step is the one I can't take back.<br><br>
For testing I'd use an invariant rather than cases: money out of the account equals cash dispensed plus unresolved liabilities. I ran two thousand ATMs with a twenty-five percent network failure rate and twenty percent jams — about two crore rupees dispensed — and after reconciliation there were zero unresolved transactions and the ledger, the balance, the cash box and the journal all agreed."
</div>

---

## 16. Follow-ups — రెండు ATMs, cash forecasting, EMV

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "ATM పునఃప్రారంభమైతే?" | Journal **disk మీద** ఉండాలి; startup lo `reconcile()` | Storage |
| "రెండు ATMs, ఒకే ఖాతా, ఒకేసారి" | Bank వైపు atomic debit — Deep Dive 04 §7 | Bank |
| "Deposit కూడా" | అదే నమూనా తిరగబడి — నోట్లు ముందు, credit తర్వాత | **+1 method** |
| "బదిలీ (transfer)" | రెండు debits/credits — ఒక పూర్తి saga | Bank |
| "ఏ ATM lo ఎంత నగదు ఉందో" | Deep Dive 19 యొక్క counters + `cash.total` | **0 concepts** |
| "ఎప్పుడు నగదు నింపాలి" | కింద చూడండి | Forecasting layer |
| "నిజమైన ATM protocol" | కింద చూడండి | — |

### నగదు అంచనా

> *"ఒక ATM ఖాళీ అయితే అది <b>కనిపించని వైఫల్యం</b> — Deep Dive 20 §16 lo చెప్పిన అదే ఆకారం.*
>
> *కానీ ఇక్కడ ఒక అదనపు మలుపు ఉంది: <b>ఏ నోట్లు అయిపోతాయో ముఖ్యం</b>. ₹2000 నోట్లు ఉండి ₹100 నోట్లు అయిపోతే, ATM lo ₹50,000 ఉన్నా అది <b>₹1,300 ఇవ్వలేదు</b>.*
>
> *కాబట్టి అంచనా వేయాల్సినది మొత్తం కాదు — <b>ఒక్కో denomination</b>. మరియు అది అడిగే మొత్తాల నమూనా మీద ఆధారపడుతుంది: ₹500 గుణిజాలు ఎక్కువ అడిగితే ₹500 నోట్లు వేగంగా అయిపోతాయి.*
>
> ***నా <code>plan()</code> ఇప్పటికే ఒక telemetry సంకేతం ఇస్తోంది** — అది <code>null</code> తిరిగి ఇచ్చిన ప్రతిసారీ, ఆ మొత్తం మరియు ఆ క్షణపు నోట్ల మిశ్రమం నమోదు చేస్తే, ఏ denomination కొరత ఖర్చు పెడుతోందో తెలుస్తుంది."*

### నిజమైన protocol

> *"నిజమైన ATMs **ISO 8583** అనే సందేశ ప్రమాణం వాడతాయి, మరియు అందులో ఈ doc lo చూసినవన్నీ <b>పేర్లతో సహా</b> ఉన్నాయి:*
>
> - ***Retrieval Reference Number (RRN)** — నా `key`. ఒక్కో లావాదేవీకి ఒక్కటే, retries అన్నిటికీ అదే.*
> - ***Reversal messages (0400/0420)** — నా `reverse`. మరియు ప్రమాణం స్పష్టంగా చెప్తుంది: reversal <b>జవాబు వచ్చేదాకా పంపుతూనే ఉండాలి</b>.*
> - ***Stand-in processing** — bank చేరకపోతే ATM ఒక పరిమితి వరకు తనే నిర్ణయించడం, తర్వాత settle చేయడం.*
>
> ***ఇది ఒక ఆహ్లాదకరమైన నిర్ధారణ:** ఈ మూడు విరుపులూ ఊహించినవి కావు — 1980ల నుంచి బ్యాంకింగ్ ప్రమాణాలు వాటినే పరిష్కరిస్తూ వచ్చాయి. Interview lo ఆ పేర్లు చెప్పడం మీ జవాబుకి బరువు ఇస్తుంది."*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **Timeout ≠ వైఫల్యం** | DOWN vs TIMEOUT (§4) | ప్రతి network call, ప్రతి API |
| **Retry safe కాదు** | ₹9,000 debit (§7) | Payments, emails, webhooks |
| **Idempotency ఒక ఒప్పందం** | Key పంపేవాడు పుట్టిస్తాడు (§8) | Stripe, PSPs, message queues |
| **Compensation ≠ rollback** | `reverse` (§9) | Sagas, microservices |
| **సరిచేయలేకపోతే గుర్తుపెట్టుకో** | Journal (§11) | WAL, outbox pattern, dead-letter queues |
| **అనిశ్చితిలో సురక్షిత వైపు** | TIMEOUT → reversal (§11) | Deep Dive 04 §9 · HELD |
| **వెనక్కి తీసుకోలేని దశకి ముందు తనిఖీ** | §12 | Deep Dive 20 §12 · ప్రతి commit |

<div class="box">
<div class="lab">ఒక చివరి ఆలోచన — ఈ problem ఎందుకు ప్రత్యేకమైనది</div>
ఈ series lo <b>ఇరవై problems</b> lo ఇది మొదటిసారి — ఇక్కడ <b>సరైన పరిష్కారం అనేది లేదు</b>.<br><br>
మిగతా అన్నిచోట్లా ఒక విరుపుని పూర్తిగా మూసేయగలిగాం: piece table అక్షరాలని కదపదు, trie prefix ని నడుస్తుంది, escrow నాణేలని గుర్తుపెడుతుంది. <b>సమస్య పోయింది.</b><br><br>
ఇక్కడ అది సాధ్యం కాదు. ATM ఎప్పటికీ ఖచ్చితంగా తెలుసుకోలేదు debit జరిగిందో లేదో. నేను చేసినదంతా — <b>ఆ అజ్ఞానాన్ని సురక్షితంగా మార్చడం</b>: మళ్ళీ అడిగినా హాని లేకుండా (idempotency), తప్పుని సరిచేయగలిగేలా (compensation), మరియు ఇప్పుడు కుదరకపోతే తర్వాత కుదిరేలా (reconciliation).<br><br>
<b>అదే distributed systems యొక్క నిజమైన స్వభావం:</b> అనిశ్చితిని తొలగించడం కాదు — <b>దానితో కలిసి జీవించడం</b>.
</div>

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b> · <b>09 Chess</b> · <b>10 Meeting Scheduler</b> · <b>11 Food Delivery</b> · <b>12 File System</b> · <b>13 Leaderboard</b> · <b>14 Text Editor</b> · <b>15 Library</b> · <b>16 Tic-Tac-Toe</b> · <b>17 Autocomplete</b> · <b>18 Snake &amp; Ladder</b> · <b>19 Hit Counter</b> · <b>20 Vending Machine</b> · <b>21 ATM</b>.<br><br>
<b>Deep Dive 20 (Vending Machine)</b> ఈ doc కి తప్పనిసరి ముందుమాట — అక్కడ ఒకే పెట్టెలో డబ్బు, ఇక్కడ network అవతల.
</div>

---

_ATM — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ₹1.96 కోట్ల అనుకరణతో సహా నిజంగా `node` lo run చేసి తీసినదే ✅_
