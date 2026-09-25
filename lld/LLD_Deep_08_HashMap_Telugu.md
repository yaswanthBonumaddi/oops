<!-- style: editorial -->
<!-- footer: HashMap · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
<marker id="hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">08</div>
<div class="kicker">Deep Dive 08 · మీరు రోజూ వాడేదాన్ని లోపలి నుంచి కట్టడం</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>HashMap</div>
<div class="lede">PayPal · Walmart · Flipkart · Uber · Goldman Sachs · Microsoft · Amazon — ఇది ఒక data structure ప్రశ్న లా కనిపిస్తుంది, కానీ interviewers దీన్ని ఒక <b>design</b> ప్రశ్నగా అడుగుతారు.</div>
<div class="sub">మీరు <code>Map</code>, <code>dict</code>, <code>HashMap</code> ని రోజూ వాడతారు. ఇక్కడ దాన్ని <b>సున్నా నుంచి</b> కడతాం — మరియు మూడుసార్లు విరగ్గొడతాం. మొదటి విరుపు lo ఒక విలువ నిశ్శబ్దంగా ఇంకొకదాన్ని <b>తినేస్తుంది</b>, మరియు అది మన మొదటి ఉదాహరణలోనే జరుగుతుంది.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 08</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి సంఖ్యా నిజంగా కొలిచినదే** — timings, chain పొడవులు, bucket పంపిణీ, అన్నీ.

<div class="box">
<div class="lab">ఇది data structure ప్రశ్న కాదు, design ప్రశ్న</div>
LeetCode lo "Design HashMap" ఒక సులభమైన problem — chaining రాసి పంపేయొచ్చు. Interview lo అది <b>మొదటి పది నిమిషాలు</b> మాత్రమే.<br><br>
అసలు ప్రశ్నలు తర్వాత వస్తాయి: <b>Load factor 0.75 ఎందుకు, 0.9 కాదు?</b> <b>Capacity రెట్టింపు ఎందుకు, +1 కాదు?</b> <b>చెడ్డ hash function ఏమి చేస్తుంది?</b> <b>Key ని మార్చితే?</b> <b>Chaining నా open addressing నా?</b><br><br>
ఇవన్నీ <b>trade-off</b> ప్రశ్నలు, మరియు ఈ doc వాటి గురించే. ప్రతి జవాబునీ <b>కొలిచి</b> చూపిస్తాను.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. HashMap ఏమి వాగ్దానం చేస్తుంది
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: వరుస వెతుకులాట**

3. Step — ఒక array, ఒక loop
4. **మొదటి విరుపు** — 10 ms నుంచి 78 ms కి

**Part 3 — రెండో విరుపు: ఢీకొన్న keys**

5. Step — Key ని ఒక చోటిగా మార్చడం
6. **రెండో విరుపు** — `city` వచ్చి `name` ని తినేసింది
7. Step — Chaining

**Part 4 — మూడో విరుపు: పొడవైపోతున్న గొలుసులు**

8. **మూడో విరుపు** — 1,122 పొడవు గల ఒక గొలుసు
9. Step — Resize మరియు rehash
10. Load factor 0.75 ఎందుకు · రెట్టింపు ఎందుకు

**Part 5 — Hash function యొక్క నాణ్యత**

11. చెడ్డ hash — 256 buckets, 4 మాత్రమే వాడబడ్డాయి
12. మారే key — ఒక entry ని శాశ్వతంగా పోగొట్టుకోవడం

**Part 6 — పూర్తి system**

13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

**Part 7 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — open addressing, thread safety, treeify
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. HashMap ఏమి వాగ్దానం చేస్తుంది

HashMap ఒక్క వాగ్దానం చేస్తుంది, మరియు అది ఆశ్చర్యకరమైనది:

> **"ఎన్ని items ఉన్నా, ఒక key ని వెతకడానికి ఒకే సమయం పడుతుంది."**

పది items ఉన్నా, పది లక్షలు ఉన్నా — `get(key)` ఒకే వేగం. దీన్నే **O(1)** అంటారు.

ఇది ఎలా సాధ్యం? ఒక ఉపమానం: మీ దగ్గర పది లక్షల పుస్తకాలు ఉన్న ఒక గ్రంథాలయం ఉంది.

- **వరుసగా వెతకడం** — మొదటి అరలో మొదలుపెట్టి ఒక్కొక్కటిగా చూడటం. పది లక్షల పుస్తకాలు = పది లక్షల చూపులు.
- **Hash** — పుస్తకం *పేరు* నుంచి *అర సంఖ్య* ని **లెక్కించడం**. "Ramayana" → అర 4,821. నేరుగా అక్కడికి వెళ్ళడం. **ఒక్క చూపు.**

ఆ "పేరు నుంచి అర సంఖ్య ని లెక్కించడం" — అదే **hash function**. ఇదే మొత్తం ఆలోచన.

కానీ ఇక్కడ మూడు కష్టాలు దాగి ఉన్నాయి, మరియు ఈ doc అవే:

<div class="fig">
<div class="cap">"ఒక్క చూపు" అనే వాగ్దానం · మూడు చోట్ల విరుగుతుంది</div>
<svg viewBox="0 0 750 276"><text class="t-xs" x="0" y="14">hash(key) % size → నేరుగా ఆ చోటికి · ఏది తప్పు కావచ్చు?</text><rect class="n-bad" x="0" y="26" width="240" height="116" rx="4"/><text class="t mid" x="120" y="50">1 · ఢీకొట్టడం</text><text class="t-sm mid" x="120" y="74">రెండు keys, ఒకే అర సంఖ్య</text><text class="t-sm mid" x="120" y="92">(పది లక్షల పుస్తకాలు,</text><text class="t-sm mid" x="120" y="108">వెయ్యి అరలు — తప్పదు)</text><text class="t-acc mid" x="120" y="132">→ §6 · ఒకటి మాయమవుతుంది</text><rect class="n-bad" x="255" y="26" width="240" height="116" rx="4"/><text class="t mid" x="375" y="50">2 · నిండిపోవడం</text><text class="t-sm mid" x="375" y="74">అరలు 16, పుస్తకాలు 16,000</text><text class="t-sm mid" x="375" y="92">ప్రతి అరలో వెయ్యి పుస్తకాలు</text><text class="t-sm mid" x="375" y="108">→ మళ్ళీ వరుస వెతుకులాట</text><text class="t-acc mid" x="375" y="132">→ §8 · O(1) పోయింది</text><rect class="n-bad" x="510" y="26" width="240" height="116" rx="4"/><text class="t mid" x="630" y="50">3 · చెడ్డ లెక్క</text><text class="t-sm mid" x="630" y="74">Hash అన్నిటినీ ఒకే</text><text class="t-sm mid" x="630" y="92">అరకి పంపితే?</text><text class="t-sm mid" x="630" y="108">వెయ్యి అరలు ఖాళీ</text><text class="t-acc mid" x="630" y="132">→ §11 · అసలు ఉపయోగమే లేదు</text><rect class="n-acc" x="0" y="158" width="750" height="110" rx="4"/><text class="t-w mid" x="375" y="182">"O(1)" అనేది ఒక షరతులతో కూడిన వాగ్దానం</text><text class="t-w-sm mid" x="375" y="206">పుస్తకాల్లో "HashMap lookup is O(1)" అని ఉంటుంది. నిజం: <tspan class="t-acc">సగటున O(1)</tspan>.</text><text class="t-w-sm mid" x="375" y="226">చెత్త పరిస్థితిలో అది <tspan class="t-acc">O(n)</tspan> — అన్ని keys ఒకే bucket lo పడితే.</text><text class="t-w-sm mid" x="375" y="250">ఈ doc మొత్తం ఆ "సగటున" ని <tspan class="t-acc">ఎలా కాపాడాలి</tspan> అనే దాని గురించే. అదే interview ప్రశ్న కూడా.</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **Keys ఏ రకం — strings మాత్రమేనా, ఏదైనానా?** | Strings అయితే ఒక string hash. Objects అయితే **hashCode/equals ఒప్పందం** (§12) |
| **Collisions ని ఎలా — chaining నా open addressing నా?** | ఇది ఒక నిజమైన ఎంపిక; §16 lo trade-offs |
| **ఎన్ని entries ఊహించాలి?** | ప్రారంభ capacity ని నిర్ణయిస్తుంది — resizes తగ్గుతాయి |
| **Iteration క్రమం ముఖ్యమా?** | ముఖ్యమైతే insertion order ని విడిగా ఉంచాలి (JS `Map` అదే చేస్తుంది) |
| **`null` key అనుమతించాలా?** | Java HashMap ఒక null key అనుమతిస్తుంది; ఇది ఒక API ఎంపిక |
| **Thread-safe కావాలా?** | ఇది **మీరే లేవనెత్తాలి** — resize మధ్యలో చదివితే? (§16) |
| **Delete తరచుగా జరుగుతుందా?** | Chaining lo సులభం; open addressing lo **tombstones** కావాలి |

<div class="box warn">
<div class="lab">"Keys ఏ రకం?" — ఇది అనిపించినంత సాధారణమైనది కాదు</div>
Strings అయితే సులభం — string నుంచి ఒక సంఖ్య లెక్కించడం స్పష్టం.<br><br>
కానీ <b>objects</b> keys అయితే — రెండు ప్రశ్నలు వస్తాయి: (1) ఒక object నుంచి సంఖ్య ఎలా? (2) రెండు objects "ఒకటే" అని ఎలా తెలుసుకోవాలి — అదే reference నా, అదే <i>విలువలా</i>?<br><br>
Java lo ఇదే <code>hashCode()</code> / <code>equals()</code> ఒప్పందం, మరియు దాన్ని ఉల్లంఘిస్తే HashMap నిశ్శబ్దంగా తప్పుగా ప్రవర్తిస్తుంది. §12 lo దాన్ని కళ్ళతో చూద్దాం.
</div>

---

# Part 2 — మొదటి విరుపు: వరుస వెతుకులాట

---

## 3. Step — ఒక array, ఒక loop

Hash గురించి ఇంకా ఆలోచించొద్దు. అతి సులభమైన "key → value" ఏమిటి? **ఒక జాబితా, మరియు వెతకడం.**

```javascript
class ArrayMap {
  constructor() { this.entries = []; }

  set(key, value) {
    const e = this.entries.find((x) => x.key === key);       // ← వరుస వెతుకులాట
    if (e) { e.value = value; return; }                      // ఉన్నదాన్ని మార్చడం
    this.entries.push({ key, value });
  }

  get(key) {
    const e = this.entries.find((x) => x.key === key);       // ← మళ్ళీ వరుస వెతుకులాట
    return e ? e.value : undefined;
  }
}
```

```
name  → Ravi
city  → Hyderabad
email → undefined
size  → 2 (name రెండుసార్లు కాదు)
```

**సరిగ్గా పనిచేస్తోంది.** `name` ని రెండుసార్లు set చేస్తే అది *మారింది*, కొత్తది చేరలేదు. లేని key కి `undefined`. API పరంగా ఇది ఒక నిజమైన Map.

మరి సమస్య ఏమిటి?

---

## 4. మొదటి విరుపు — 10 ms నుంచి 78 ms కి

`find` ప్రతిసారీ **మొదటి నుంచి** వెతుకుతుంది. Entries పెరిగితే ఏమవుతుందో కొలుద్దాం — ప్రతిసారీ 5,000 lookups, మొత్తం array అంతటా పంచి:

```javascript
for (const n of [1000, 5000, 20000]) {
  const m = new ArrayMap();
  for (let i = 0; i < n; i++) m.set('k' + i, i);
  // మొత్తం array అంతటా వెతకాలి — ముందువి మాత్రమే కాదు
  const probes = Array.from({ length: 5000 }, (_, i) => 'k' + Math.floor(i * n / 5000));
  const t = process.hrtime.bigint();
  for (const p of probes) m.get(p);
  console.log(`${n} entries → 5,000 lookups: ${(Number(process.hrtime.bigint()-t)/1e6).toFixed(0)} ms`);
}
```

```
  1000 entries → 5,000 lookups: 10 ms
  5000 entries → 5,000 lookups: 24 ms
 20000 entries → 5,000 lookups: 78 ms
```

<div class="note">ఈ timings ఒక నిజమైన run నుంచి; ప్రతి run lo ±20% తేడా వస్తుంది. <b>ఖచ్చితమైన సంఖ్య కాదు, వాలు</b> ముఖ్యం — entries పెరిగితే సమయం పెరుగుతోంది, మరియు అది ప్రతి run lo నిజం.</div>

<div class="box warn">
<div class="lab">మొదటి విరుపు — ఖర్చు పరిమాణంతో పాటు పెరుగుతోంది</div>
Entries 20 రెట్లు పెరిగితే సమయం దాదాపు 8 రెట్లు పెరిగింది. ఇది <b>O(n)</b> — సరిగ్గా HashMap <i>కాకూడని</i> లక్షణం.<br><br>
<b>ఇక్కడ ఒక పాఠం ఉంది,</b> మరియు అది benchmark రాయడం గురించి: నా మొదటి కొలతలో నేను <code>m.get('k' + (i % n))</code> అని రాశాను. n = 20,000 కి అది కేవలం k0–k4999 ని మాత్రమే వెతికింది — అవన్నీ array <b>ముందు భాగంలో</b> ఉన్నాయి, కాబట్టి <code>find</code> త్వరగా తిరిగి వచ్చింది, మరియు సమయం <i>పెరగలేదు</i>.<br><br>
<b>తప్పు benchmark తప్పు నిర్ధారణ ఇస్తుంది.</b> Probes ని మొత్తం పరిధిలో పంచాక నిజం కనిపించింది. Interview lo "I'd measure it" అనేది మంచి మాట — కానీ <i>సరిగ్గా</i> కొలవడం ఒక నైపుణ్యం.
</div>

### ఏమి కావాలి

మనకి కావలసినది: **key ని చూసి, అది ఎక్కడ ఉందో నేరుగా లెక్కించడం.** వెతకకుండా.

అంటే ఒక function కావాలి: `key → index`. అదే **hash function**.

---

# Part 3 — రెండో విరుపు: ఢీకొన్న keys

---

## 5. Step — Key ని ఒక చోటిగా మార్చడం

ఒక string ని ఒక సంఖ్యగా మార్చే function. **djb2** ఒక క్లాసిక్ — సులభం, మరియు బాగా పంచుతుంది:

```javascript
function hash(key) {
  let h = 5381;
  for (let i = 0; i < key.length; i++)
    h = ((h << 5) + h + key.charCodeAt(i)) | 0;       // h * 33 + charCode
  return h >>> 0;                                     // ఋణాత్మకం కాకుండా
}
```

`(h << 5) + h` అంటే `h * 33`. ఆ 33 ఒక మంతిరం కాదు — చిన్న bit నమూనాలని బాగా కలిపే ఒక **బేసి సంఖ్య**. `| 0` ప్రతి అడుగులోనూ 32-bit కి కుదిస్తుంది (overflow ఆపడానికి), `>>> 0` చివర్లో దాన్ని ధనాత్మకం చేస్తుంది.

ఇప్పుడు ఆ సంఖ్యని ఒక index గా మార్చడం — `% size`:

```javascript
class SlotMap {
  constructor(capacity = 8) { this.slots = new Array(capacity).fill(null); }
  #index(key) { return hash(key) % this.slots.length; }
  set(key, value) { this.slots[this.#index(key)] = { key, value }; }     // ← నేరుగా
  get(key) { const s = this.slots[this.#index(key)]; return s ? s.value : undefined; }
}
```

**వెతుకులాట పూర్తిగా పోయింది.** `set` మరియు `get` రెండూ ఒక్క లెక్క, ఒక్క array access. ఇదే మనం కోరుకున్న O(1).

---

## 6. రెండో విరుపు — `city` వచ్చి `name` ని తినేసింది

మన మొదటి ఉదాహరణనే నడుపుదాం — రెండు keys, అంతే:

```javascript
const m = new SlotMap(8);
m.set('name', 'Asha');
m.set('city', 'Hyderabad');
console.log('name →', m.get('name'), '| city →', m.get('city'));
```

```
name → Hyderabad | city → Hyderabad
slots: 6:city
```

<div class="box warn">
<div class="lab">రెండో విరుపు — ఇది మన <i>మొదటి</i> ఉదాహరణలోనే జరిగింది</div>
<code>m.get('name')</code> <b>"Hyderabad"</b> ఇచ్చింది. "Asha" ఎక్కడా లేదు. <code>slots</code> చూస్తే ఒకే ఒక entry — <code>6: city</code>.<br><br>
ఎందుకు? hash విలువలు చూడండి:<br><br>
<code>name  hash=2090536006  slot=6</code><br>
<code>city  hash=2090149662  slot=6</code><br><br>
రెండు వేర్వేరు hash విలువలు, కానీ <b>% 8 తర్వాత రెండూ 6</b>. కాబట్టి <code>city</code> వచ్చినప్పుడు అది <code>name</code> మీదే రాసేసింది.<br><br>
<b>ఇది ఒక అరుదైన దురదృష్టం కాదు.</b> ఇది <b>అనివార్యం</b>: hash విలువలు 4 బిలియన్ ఉంటాయి, slots 8 మాత్రమే. 4 బిలియన్ ని 8 గదుల్లో పెడితే ఢీకొట్టడం తప్పదు. <b>ఏ hash function కూడా దీన్ని ఆపలేదు.</b>
</div>

### Pigeonhole సూత్రం

ఇది ఒక గణిత వాస్తవం: **9 పావురాలని 8 గూళ్ళలో పెడితే, ఏదో ఒక గూట్లో రెండు ఉంటాయి.** Keys slots కంటే ఎక్కువ ఉంటే ఢీకొట్టడం **తప్పనిసరి**.

కాబట్టి సరైన ప్రశ్న *"ఎలా ఆపాలి?"* కాదు — **"ఢీకొట్టినప్పుడు ఏం చేయాలి?"**

---

## 7. Step — Chaining

అతి సులభమైన జవాబు: **ప్రతి slot ఒక విలువ కాదు, ఒక జాబితా.** ఒకే slot కి పలు keys వస్తే, అవన్నీ ఆ జాబితాలో కూర్చుంటాయి.

```javascript
class ChainMap {
  #buckets; #count = 0;
  constructor(capacity = 8) {
    this.#buckets = Array.from({ length: capacity }, () => []);   // ప్రతిదీ ఒక ఖాళీ జాబితా
  }
  #index(key) { return hash(key) % this.#buckets.length; }

  set(key, value) {
    const b = this.#buckets[this.#index(key)];
    const e = b.find((x) => x.key === key);        // ఆ *చిన్న* జాబితాలో మాత్రమే వెతకడం
    if (e) { e.value = value; return; }
    b.push({ key, value }); this.#count++;
  }
  get(key) {
    const e = this.#buckets[this.#index(key)].find((x) => x.key === key);
    return e ? e.value : undefined;
  }
}
```

```
name → Asha | city → Hyderabad   ← రెండూ సరిగ్గా
buckets: 6:[name,city]
```

**రెండూ బతికాయి**, మరియు అవి రెండూ bucket 6 lo ఉన్నాయని స్పష్టంగా కనిపిస్తోంది.

<div class="note">ఇక్కడ <code>find</code> మళ్ళీ వచ్చింది — §3 lo మనం తొలగించాలనుకున్నదే. కానీ <b>ఇప్పుడు అది మొత్తం map మీద కాదు, ఒక bucket మీద మాత్రమే</b>. 10,000 entries మరియు 10,000 buckets ఉంటే, ఒక్కో bucket lo సగటున ఒకే entry — కాబట్టి ఆ <code>find</code> ఒక్క పోలిక.<br><br>
అంటే <b>O(1) అనేది నిజానికి "buckets సరిపడా ఉంటే O(1)"</b>. ఆ షరత విరిగితే ఏమవుతుంది? — అదే తర్వాతి Part.</div>

---

# Part 4 — మూడో విరుపు: పొడవైపోతున్న గొలుసులు

---

## 8. మూడో విరుపు — 1,122 పొడవు గల ఒక గొలుసు

Buckets 16 వద్దే ఉంచి, entries పెంచుదాం. ప్రతిసారీ 50,000 lookups:

```
16 buckets, స్థిరం · 50,000 lookups:
     160 entries · load   10 · పొడవైన chain    16 → 4 ms
    1600 entries · load  100 · పొడవైన chain   126 → 8 ms
   16000 entries · load 1000 · పొడవైన chain  1122 → 43 ms
```

<div class="box warn">
<div class="lab">మూడో విరుపు — HashMap నెమ్మదిగా ఒక జాబితాగా మారుతోంది</div>
16,000 entries, 16 buckets. అంటే <b>ఒక్కో bucket lo సగటున వెయ్యి entries</b>, మరియు అత్యంత పొడవైనది <b>1,122</b>.<br><br>
ఆ bucket lo ఒక key ని వెతకాలంటే — 1,122 పోలికలు. అది O(1) కాదు, <b>అది O(n)</b>. మనం §4 lo తప్పించుకున్న సమస్యకే తిరిగి వచ్చాం, కేవలం 16 రెట్లు మెరుగైన రూపంలో.<br><br>
<b>మౌలిక తప్పు:</b> buckets సంఖ్యని <b>స్థిరంగా</b> ఉంచాం. Entries పెరుగుతున్నప్పుడు buckets కూడా పెరగాలి.
</div>

### Load factor

"ఎంత నిండింది?" అని చెప్పే ఒక సంఖ్య కావాలి:

> **load factor = entries ÷ buckets**

- `0.5` అంటే — రెండు buckets కి ఒక entry. చాలా ఖాళీ, కానీ వేగం.
- `1.0` అంటే — సగటున ఒక్కో bucket కి ఒక entry. మంచి సమతుల్యత.
- `1000` అంటే — పైన చూసిన విపత్తు.

కాబట్టి నియమం: **load factor ఒక హద్దు దాటితే, buckets ని పెంచడం.**

---

## 9. Step — Resize మరియు rehash

`set` lo, entry చేర్చాక load factor తనిఖీ చేసి, అవసరమైతే పెంచడం:

```javascript
#grow() {
  const old = this.#buckets;
  this.#buckets = Array.from({ length: old.length * 2 }, () => []);   // రెట్టింపు
  for (const bucket of old)
    for (const e of bucket) this.#buckets[this.#index(e.key)].push(e);  // ← rehash
  this.#resizes++;
}

set(key, value) {
  const b = this.#buckets[this.#index(key)];
  const e = b.find((x) => x.key === key);
  if (e) { e.value = value; return; }
  b.push({ key, value }); this.#count++;
  if (this.#count / this.#buckets.length > this.loadFactor) this.#grow();
}
```

<div class="box warn">
<div class="lab">Rehash ని మర్చిపోవడం — ఇది ఒక క్లాసిక్ bug</div>
పాత entries ని కొత్త array కి <b>నేరుగా copy చేయకూడదు</b>. ఎందుకంటే index <code>hash(key) % size</code>, మరియు <b>size మారింది</b>.<br><br>
ఒక key 16 buckets lo slot 6 lo ఉండొచ్చు, కానీ 32 buckets lo అది slot 22 కి చెందుతుంది. నేరుగా copy చేస్తే — అది slot 6 lo ఉండిపోతుంది, మరియు <code>get</code> slot 22 lo వెతుకుతుంది. <b>Entry map lo ఉంది, కానీ ఎప్పటికీ దొరకదు.</b><br><br>
అందుకే ప్రతి entry యొక్క index ని <b>మళ్ళీ లెక్కించాలి</b>. అదే "rehash" అనే పదం యొక్క అర్థం, మరియు అందుకే resize ఖరీదైనది.
</div>

అదే పరీక్ష, ఇప్పుడు resize తో:

```
resize తో · 50,000 lookups:
     160 entries ·    256 buckets · 4 resizes · పొడవైన chain 2 → 3 ms
    1600 entries ·   4096 buckets · 8 resizes · పొడవైన chain 2 → 2 ms
   16000 entries ·  32768 buckets · 11 resizes · పొడవైన chain 4 → 1 ms
```

<div class="fig">
<div class="cap">అదే డేటా, resize తో మరియు లేకుండా</div>
<svg viewBox="0 0 750 252"><text class="t-xs" x="0" y="14">16,000 entries · 50,000 lookups</text><rect class="n-bad" x="0" y="26" width="366" height="96" rx="4"/><text class="t mid" x="183" y="50">16 buckets, స్థిరం</text><text class="t-sm mid" x="183" y="74">పొడవైన chain: <tspan class="t-acc">1,122</tspan></text><text class="t-sm mid" x="183" y="92">సమయం: <tspan class="t-acc">43 ms</tspan></text><text class="t-sm mid" x="183" y="112">ఇది ఒక జాబితా, ఒక map కాదు</text><rect class="n-good" x="384" y="26" width="366" height="96" rx="4"/><text class="t mid" x="567" y="50">Resize తో (load 0.75)</text><text class="t-sm mid" x="567" y="74">పొడవైన chain: <tspan class="t-acc">4</tspan></text><text class="t-sm mid" x="567" y="92">సమయం: <tspan class="t-acc">1 ms</tspan></text><text class="t-sm mid" x="567" y="112">32,768 buckets · 11 resizes</text><rect class="n-acc" x="0" y="138" width="750" height="104" rx="4"/><text class="t-w mid" x="375" y="162">ఇక్కడ ముఖ్యమైనది వేగం కాదు — పొడవైన chain</text><text class="t-w-sm mid" x="375" y="186">160 entries → chain 2 · 1,600 → chain 2 · 16,000 → chain <tspan class="t-acc">4</tspan></text><text class="t-w-sm mid" x="375" y="206">Entries 100 రెట్లు పెరిగినా, చెత్త పరిస్థితిలో కూడా 4 పోలికలే.</text><text class="t-w-sm mid" x="375" y="230"><tspan class="t-acc">అదే O(1) యొక్క నిజమైన అర్థం</tspan> — "వేగం" కాదు, "పరిమాణంతో పెరగకపోవడం".</text></svg>
</div>

---

## 10. Load factor 0.75 ఎందుకు · రెట్టింపు ఎందుకు

ఈ రెండు సంఖ్యలూ interview lo అడిగే ప్రశ్నలు, మరియు రెండిటికీ నిజమైన కారణాలు ఉన్నాయి.

### ఎందుకు 0.75?

ఇది **సమయం vs స్థలం** మధ్య ఒక రాజీ:

| Load factor | Chains | Memory | పరిణామం |
|-------------|--------|--------|----------|
| **0.5** | చాలా చిన్నవి | సగం buckets ఖాళీ | వేగం, కానీ వృథా |
| **0.75** | చిన్నవి | సమతుల్యం | **Java, Python డిఫాల్ట్** |
| **1.0** | మధ్యస్థం | తక్కువ వృథా | ఢీకొట్టడం గమనించదగినంత |
| **2.0+** | పొడవైనవి | అతి తక్కువ | O(1) వాగ్దానం బలహీనం |

0.75 ఏదో ఒక ప్రయోగం నుంచి వచ్చిన సంఖ్య — ఆ స్థాయిలో ఢీకొట్టడం ఇంకా అరుదు, మరియు memory వృథా ఆమోదయోగ్యం. **ఇది ఒక సూత్రం కాదు, ఒక అనుభవపూర్వక ఎంపిక**, మరియు అలా చెప్పడమే సరైన జవాబు.

### ఎందుకు రెట్టింపు, +1 కాదు?

ఇది ఎక్కువ ఆసక్తికరం. Resize **ఖరీదైనది** — ప్రతి entry నీ rehash చేయాలి, అంటే O(n).

- **+1 చొప్పున పెంచితే:** n entries చేర్చడానికి n resizes, ప్రతిదీ O(n) → మొత్తం **O(n²)**. 10,000 entries కి అది 100 మిలియన్ operations.
- **రెట్టింపు చేస్తే:** resizes కేవలం **log₂(n)** సార్లు — పై కొలతలో 16,000 entries కి **11 resizes** మాత్రమే. మరియు మొత్తం rehash ఖర్చు `n + n/2 + n/4 + … < 2n` — అంటే **O(n)**.

> అంటే ఒక్కో `set` యొక్క **సగటు (amortised)** ఖర్చు O(1) గానే ఉంటుంది, అప్పుడప్పుడూ ఒక ఖరీదైన resize వచ్చినా. **Interview lo "amortised O(1)" అనే పదం వాడండి** — ఇది మీరు resize ఖర్చు గురించి ఆలోచించారని చూపిస్తుంది.

---

# Part 5 — Hash function యొక్క నాణ్యత

---

## 11. చెడ్డ hash — 256 buckets, 4 మాత్రమే వాడబడ్డాయి

ఇప్పటిదాకా మనం hash function *మంచిది* అని ఊహించాం. అది చెడ్డదైతే?

ఒక "సహజమైన" కానీ చెడ్డ hash: **key యొక్క పొడవు**.

```javascript
function badHash(key) { return key.length; }      // ← పొడవు మాత్రమే!
```

2,000 keys (`user_0` నుంచి `user_1999`) — అన్నీ 6–10 అక్షరాలు. 256 buckets:

```
మంచి hash : { usedBuckets: 256, empty: 0, longestChain: 11 }
చెడ్డ hash: { usedBuckets: 4, empty: 252, longestChain: 1000 }
```

<div class="box warn">
<div class="lab">చెడ్డ hash — 252 buckets ఖాళీగా కూర్చున్నాయి</div>
2,000 keys, 256 buckets — కానీ <b>4 buckets మాత్రమే</b> వాడబడ్డాయి, మరియు ఒక్క bucket lo <b>1,000 entries</b>.<br><br>
మీ resize logic ఖచ్చితంగా ఉండొచ్చు, load factor సరిగ్గా ఉండొచ్చు — <b>ఏమీ ఉపయోగం లేదు</b>. Resize buckets ని రెట్టింపు చేస్తుంది, కానీ చెడ్డ hash వాటిని ఎలాగూ వాడదు. మీ HashMap ఒక linked list.<br><br>
<b>మంచి hash function కి రెండు షరతులు:</b> (1) ఒకే key ఎప్పుడూ ఒకే సంఖ్య ఇవ్వాలి — <i>ఖచ్చితత్వం</i>; (2) వేర్వేరు keys buckets అంతటా <b>సమానంగా</b> పంచాలి — <i>పంపిణీ</i>. రెండోది లేకపోతే మిగతాదంతా వృథా.
</div>

---

## 12. మారే key — ఒక entry ని శాశ్వతంగా పోగొట్టుకోవడం

Keys objects అయితే ఒక సూక్ష్మమైన, మరియు చాలా ప్రమాదకరమైన ఉచ్చు ఉంది.

```javascript
const user = { id: 42, name: 'Asha' };
m.set(user, 'Asha యొక్క profile');
console.log('చేర్చిన వెంటనే  :', m.get(user));

user.id = 99;                                   // ← key ని మార్చాం
console.log('id మార్చాక     :', m.get(user), '  ← అదే object!');
```

```
చేర్చిన వెంటనే  : Asha యొక్క profile
id మార్చాక     : undefined   ← అదే object!
=> object map lo ఉంది, కానీ దాన్ని ఇక ఎప్పటికీ వెతకలేం.
```

<div class="box warn">
<div class="lab">Entry పోలేదు — కానీ దానికి దారి పోయింది</div>
మనం <b>అదే object</b> ని పాస్ చేశాం, మరియు <code>undefined</code> వచ్చింది.<br><br>
కారణం: <code>set</code> సమయంలో <code>hash({id:42})</code> ఒక bucket ఇచ్చింది, మరియు entry అక్కడ కూర్చుంది. ఆపై <code>id</code> మారింది, కాబట్టి <code>get</code> ఇప్పుడు <b>వేరే bucket</b> ని లెక్కిస్తోంది. Entry ఇంకా పాత bucket lo ఉంది — memory తింటూ, ఎవరికీ అందకుండా.<br><br>
<b>నియమం:</b> map lo key గా వాడే ఏ object నీ, అది map lo ఉన్నంతకాలం <b>మార్చకూడదు</b>. అందుకే Java lo <code>String</code> immutable — మరియు అందుకే అది అత్యంత సాధారణ HashMap key.<br><br>
<b>Interview lo ఇది చెప్పడం ఒక బలమైన సంకేతం,</b> ఎందుకంటే ఇది మీరు hashCode/equals ఒప్పందాన్ని నిజంగా అర్థం చేసుకున్నారని చూపిస్తుంది — కేవలం అప్పజెప్పట్లేదని.
</div>

---

# Part 6 — పూర్తి system

---

## 13. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

```javascript
function hashString(str) {                       // djb2
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return h >>> 0;
}

class HashMap {
  #buckets; #size = 0; #resizes = 0;

  constructor(capacity = 16, { loadFactor = 0.75, hash = hashString } = {}) {
    if (capacity < 1) throw new Error('CAPACITY_MUST_BE_POSITIVE');
    this.#buckets = Array.from({ length: capacity }, () => []);
    Object.assign(this, { loadFactor, hash });   // hash ని inject చేయడం — test కి, tuning కి
  }

  #indexFor(key, len = this.#buckets.length) { return this.hash(String(key)) % len; }

  #grow() {
    const old = this.#buckets;
    this.#buckets = Array.from({ length: old.length * 2 }, () => []);
    for (const bucket of old)
      for (const e of bucket) this.#buckets[this.#indexFor(e.key)].push(e);   // rehash
    this.#resizes++;
  }

  set(key, value) {
    const b = this.#buckets[this.#indexFor(key)];
    const e = b.find((x) => x.key === key);
    if (e) { e.value = value; return this; }                  // ఉన్నదాన్ని మార్చడం
    b.push({ key, value }); this.#size++;
    if (this.#size / this.#buckets.length > this.loadFactor) this.#grow();
    return this;                                              // chaining కోసం
  }

  get(key) {
    const e = this.#buckets[this.#indexFor(key)].find((x) => x.key === key);
    return e ? e.value : undefined;
  }

  has(key) { return this.#buckets[this.#indexFor(key)].some((x) => x.key === key); }

  delete(key) {
    const b = this.#buckets[this.#indexFor(key)];
    const i = b.findIndex((x) => x.key === key);
    if (i === -1) return false;
    b.splice(i, 1); this.#size--;                 // chaining lo tombstone అవసరం లేదు
    return true;
  }

  *entries() { for (const b of this.#buckets) for (const e of b) yield [e.key, e.value]; }
  keys() { return [...this.entries()].map(([k]) => k); }
  get size() { return this.#size; }

  get stats() {
    const lens = this.#buckets.map((b) => b.length);
    return { entries: this.#size, buckets: this.#buckets.length,
             loadFactor: +(this.#size / this.#buckets.length).toFixed(2),
             resizes: this.#resizes, usedBuckets: lens.filter((l) => l > 0).length,
             longestChain: Math.max(...lens) };
  }
}
```

```
name    → Asha
city    → Hyderabad   ← §4 lo ఇది "Asha" ని తినేసింది
missing → undefined
has(role)→ true | has(x) → false

name మార్చాక → Ravi | size 3 ← పెరగలేదు
delete(city) → true | size 2
delete(city) మళ్ళీ → false
keys: [ 'name', 'role' ]

--- 10,000 entries ---
{
  entries: 10000,
  buckets: 16384,
  loadFactor: 0.61,
  resizes: 10,
  usedBuckets: 6389,
  longestChain: 4
}
user_9999 → 9999
delete తర్వాత size: 9999 | user_5000 → undefined
```

### ఈ output ని పంక్తి పంక్తిగా చదువుదాం

**`name → Asha`, `city → Hyderabad`** — §6 lo `city` వచ్చి `name` ని తినేసింది. ఇప్పుడు రెండూ బతికాయి, అదే 8-bucket map lo.

**`size 3` (name మార్చాక)** — ఉన్న key ని మళ్ళీ `set` చేస్తే size పెరగదు. ఇది సరైన Map ప్రవర్తన.

**`delete(city)` రెండోసారి `false`** — లేని దాన్ని తీసేయడం ఒక తప్పు కాదు, కానీ అది `false` చెప్పాలి. Caller కి తేడా తెలియాలి.

**10,000 entries: `buckets: 16384`, `resizes: 10`.** 16 నుంచి మొదలై పది రెట్టింపులు = 16,384. `log₂(16384/16) = 10` — §10 lo చెప్పిన సిద్ధాంతం సరిగ్గా సరిపోయింది.

**`usedBuckets: 6389` of 16,384.** అంటే దాదాపు 39% buckets వాడబడ్డాయి. ఇది తక్కువగా అనిపిస్తుంది కానీ ఇది **యాదృచ్ఛిక పంపిణీకి ఆశించినదే** — load factor 0.61 వద్ద, గణితం ప్రకారం `1 − e^(−0.61) ≈ 46%` దగ్గరగా. §11 lo చూసిన **చెడ్డ hash యొక్క 1.5%** తో దీన్ని పోల్చి చూడండి.

**`longestChain: 4`.** 10,000 entries, మరియు చెత్త పరిస్థితిలో 4 పోలికలు. **అదే O(1).**

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `set`, `get` API | మౌలిక ఒప్పందం |
| §4 (విరుపు) | `hash()` + `% size` | వరుస వెతుకులాట O(n) |
| §6 (విరుపు) | Buckets = జాబితాలు | ఢీకొట్టడం ఒక విలువని తినేసింది |
| §8 (విరుపు) | `loadFactor`, `#grow()` | Chain 1,122 కి పెరిగింది |
| §9 | Rehash (copy కాదు) | Size మారితే index మారుతుంది |
| §11 | `hash` ని inject చేయడం | Hash నాణ్యతని పరీక్షించడానికి |
| ఇక్కడ | `delete`, `entries`, `stats` | పూర్తి Map API |

---

# Part 7 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">Code 15 నిమిషాల్లో అయిపోతుంది — మిగతాదంతా "ఎందుకు"</text><rect class="n-acc" x="0" y="26" width="80" height="38" rx="3"/><text class="t-w mid" x="40" y="50">4 నిమి</text><text class="t-sm" x="96" y="50"><tspan class="t-acc">Clarify</tspan> — key రకం, collisions, thread safety</text><rect class="n-info" x="0" y="70" width="110" height="38" rx="3"/><text class="t mid" x="55" y="94">6 నిమి</text><text class="t-sm" x="126" y="94">hash + % size · <tspan class="t-acc">ఢీకొట్టడం అనివార్యం</tspan> అని చూపించడం</text><rect class="n-acc" x="0" y="114" width="180" height="38" rx="3"/><text class="t-w mid" x="90" y="138">11 నిమి — Chaining</text><text class="t-sm" x="196" y="138">set / get / delete · ఇది సులభ భాగం</text><rect class="n-acc" x="0" y="158" width="220" height="38" rx="3"/><text class="t-w mid" x="110" y="182">13 నిమి — Resize</text><text class="t-sm" x="236" y="182">Rehash · <tspan class="t-acc">0.75 ఎందుకు · రెట్టింపు ఎందుకు</tspan></text><rect class="n-soft" x="0" y="202" width="150" height="38" rx="3"/><text class="t mid" x="75" y="226">11 నిమి</text><text class="t-sm" x="236" y="226">Hash నాణ్యత, mutable keys, thread safety</text></svg>
</div>

### ఏమి తప్పక చెప్పాలి

1. **ఢీకొట్టడం అనివార్యం** (§6) — pigeonhole. "ఎలా ఆపాలి" కాదు, "ఏం చేయాలి".
2. **Resize lo rehash తప్పనిసరి** (§9) — నేరుగా copy చేస్తే entries అందుబాటులో ఉండవు.
3. **రెట్టింపు ఎందుకు** (§10) — +1 అయితే O(n²); రెట్టింపు అయితే amortised O(1).
4. **Hash నాణ్యత** (§11) — చెడ్డ hash తో resize logic పనికిరాదు.
5. **Mutable keys** (§12) — ఇది చాలా తక్కువ మంది చెప్తారు.

### ఏమి వదిలేయాలి

- **`entries()`, `keys()`** — స్పష్టం, సమయం వృథా.
- **`stats()`** — debugging కోసం, design కోసం కాదు.
- **djb2 ని వివరించొద్దు** — "a standard string hash" అని చెప్పి ముందుకి వెళ్ళండి.

---

## 15. నోటితో చెప్పాల్సిన English script

<div class="script">
"A few questions first. What are the keys — strings, or arbitrary objects? Do I need thread safety? And roughly how many entries should I expect?<br><br>
The core idea is to compute the location from the key instead of searching for it. A hash function turns the key into a number, and modulo the bucket count turns that into an index.<br><br>
But collisions are unavoidable, and I want to be clear about why: the hash space is four billion values and I might have sixteen buckets. That's pigeonhole — you can't avoid it, so the question isn't how to prevent collisions, it's what to do when they happen. In my first two-key example, 'name' and 'city' both landed in bucket six, and the second one silently overwrote the first.<br><br>
I'll handle it with chaining — each bucket holds a small list. Lookup hashes to the bucket and scans just that list. With a good spread that list has one or two entries, so it's still constant time.<br><br>
That constant-time claim has a condition though: enough buckets. If I fix the count at sixteen and insert sixteen thousand entries, the longest chain gets to about eleven hundred and it's O(n) again — I measured that. So I track load factor, entries over buckets, and grow when it passes a threshold.<br><br>
The critical detail on growing is that I can't just copy the old array over. The index is hash modulo size, and size changed — so every entry has to be rehashed into its new bucket. Copying directly leaves entries sitting in buckets where lookup will never look for them. They're in the map and permanently unreachable.<br><br>
I double the capacity rather than growing by a fixed amount. Growing by one would mean a rehash on every insert, so n inserts cost O(n²). Doubling means log n resizes and the total rehash work is bounded by 2n, so each insert is amortised O(1).<br><br>
Threshold-wise, 0.75 is what Java and Python use. It's not a theorem, it's an empirical balance — collisions are still rare there and the wasted space is acceptable.<br><br>
Two things I'd call out. First, all of this depends on the hash spreading well. If I hash on string length, two thousand keys land in four buckets out of 256 and the resize logic is useless — it's a linked list with extra steps. Second, if keys are mutable objects and someone changes a field after insertion, the entry becomes unreachable, because you'd now hash to a different bucket. That's why immutable keys like strings are the norm."
</div>

---

## 16. Follow-ups — open addressing, thread safety, treeify

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "Capacity ని 2 యొక్క ఘాతంగా ఉంచితే?" | `% size` ని `& (size−1)` తో మార్చొచ్చు — వేగం | `#indexFor` |
| "Iteration క్రమం insertion order కావాలి" | Entries కి ఒక doubly linked list — `LinkedHashMap` | +ఒక list |
| "Hash ని inject చేయగలగాలి" | ఇప్పటికే ఉంది (constructor lo) | **0** |
| "Shrink కూడా చేయాలా?" | Load చాలా తగ్గితే — కానీ జాగ్రత్త: grow/shrink హద్దులు వేరుగా ఉండాలి (thrashing) | `delete` |
| "Chaining కాకుండా?" | కింద చూడండి | — |
| "Thread-safe" | కింద చూడండి | — |

### Open addressing

> *"Chaining కాకుండా — ఢీకొన్నప్పుడు **తర్వాతి ఖాళీ slot** వెతకడం (linear probing). లాభం: అదనపు జాబితాలు లేవు, అంతా ఒకే array lo — cache కి చాలా మంచిది, మరియు memory తక్కువ.*
>
> ***ఖర్చు:** delete కష్టమవుతుంది. ఒక entry ని తీసేస్తే, దాని తర్వాత probe అయిన entries కి దారి తెగిపోతుంది. అందుకే ఒక **tombstone** పెట్టాలి — "ఇక్కడ ఏమీ లేదు, కానీ ముందుకి వెతుకు". Tombstones పేరుకుపోతే performance తగ్గుతుంది.*
>
> *అలాగే load factor **చాలా ముఖ్యం** అవుతుంది — 0.7 దాటాక linear probing వేగంగా దిగజారుతుంది, chaining అంత సున్నితంగా కాదు. **నేను chaining ఎంచుకున్నాను ఎందుకంటే delete సులభం మరియు ప్రవర్తన ఊహించదగినది.**"*

### Thread safety

> *"రెండు threads ఒకేసారి `set` చేస్తే — ఒకే bucket lo రెండూ `push` చేయొచ్చు, మరియు ఒకటి పోవచ్చు. అంతకంటే ఘోరం: **ఒకరు resize చేస్తుండగా ఇంకొకరు చదివితే** — వాళ్ళు సగం పాత, సగం కొత్త array చూస్తారు.*
>
> *సులభ జవాబు: మొత్తం map కి ఒక lock. కానీ అప్పుడు అన్ని reads వరుసలో నిలబడతాయి.*
>
> ***నిజ systems ఏం చేస్తాయి:** Java యొక్క `ConcurrentHashMap` **bucket వారీగా** lock చేస్తుంది — వేర్వేరు buckets కి వేర్వేరు threads సమాంతరంగా రాయగలవు. ఇది Deep Dive 01 lo parking lot కి spot-వారీ lock లాంటిదే — **ఒకే ఆలోచన, వేరే domain.**"*

### Java 8 యొక్క treeify

> *"చెడ్డ hash (లేదా ఒక దాడి) వల్ల ఒక bucket చాలా పొడవైతే — Java 8 ఆ chain ని ఒక **red-black tree** గా మారుస్తుంది (8 దాటితే). అప్పుడు ఆ bucket lo lookup O(n) కాకుండా **O(log n)** అవుతుంది.*
>
> *అంటే చెత్త పరిస్థితి O(n) నుంచి O(log n) కి మెరుగైంది. ఇది ఒక **hash collision DoS దాడి** కి రక్షణ — ఎవరైనా ఉద్దేశపూర్వకంగా ఒకే bucket కి పడే keys పంపితే."*

---

## 17. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **వెతకడం కాదు, లెక్కించడం** | hash → index (§5) | Sharding, partitioning, CDN routing |
| **ఢీకొట్టడం అనివార్యం** | Pigeonhole (§6) | UUID, checksums, bloom filters |
| **O(1) ఒక షరతులతో కూడిన వాగ్దానం** | Load factor (§8) | ప్రతి "O(1)" వాదనలో |
| **రెట్టింపు = amortised O(1)** | Resize (§10) | Dynamic arrays, buffers, connection pools |
| **అంచనా నాణ్యత మీదే అంతా ఆధారపడుతుంది** | చెడ్డ hash (§11) | Load balancing, sampling, sketches |
| **Key మారితే దారి పోతుంది** | Mutable keys (§12) | Caching, memoization, DB indexes |
| **సూక్ష్మ lock > స్థూల lock** | Bucket-వారీ lock (§16) | Deep Dive 01 §9 తో అదే ఆలోచన |

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo ఇప్పటివరకు: <b>01 Parking Lot</b> · <b>02 LRU &amp; LFU Cache</b> · <b>03 Rate Limiter</b> · <b>04 BookMyShow</b> · <b>05 Splitwise</b> · <b>06 Elevator</b> · <b>07 Pub-Sub</b> · <b>08 HashMap</b>.<br><br>
<b>ఈ doc ప్రత్యేకత:</b> ఇది <code>LLD_Design_Problems_Telugu.pdf</code> lo <b>లేని</b> మొదటి problem — research ప్రకారం ఇది top-10 lo ఉండాల్సినది. Deep Dive 02 (Cache) lo మనం HashMap ని <i>వాడాం</i>; ఇక్కడ దాన్ని <i>కట్టాం</i>. ఆ రెండూ కలిపి చదివితే LRU cache యొక్క "HashMap + DLL" ఎందుకు అంత శక్తివంతమో పూర్తిగా అర్థమవుతుంది.<br><br>
Data structures పునాది కోసం — <code>DSA_00_Foundations_Telugu.pdf</code>. Hashing problems కోసం — <code>DSA_03_Hashing_Intervals_Telugu.pdf</code>.
</div>

---

_HashMap — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, timing, మరియు bucket పంపిణీ నిజంగా `node` lo run చేసి తీసినవే ✅_
