<!-- style: editorial -->
<!-- footer: LRU & LFU Cache · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
<marker id="hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">02</div>
<div class="kicker">Deep Dive 02 · దాదాపు ప్రతి పెద్ద కంపెనీ అడిగేది</div>
<div class="rule"></div>
<div class="cover-title">Design an<br>LRU &amp; LFU Cache</div>
<div class="lede">Google · Amazon · Microsoft · Meta · Apple — ఈ question యొక్క ఏదో ఒక రూపం అన్ని చోట్లా వస్తుంది. LeetCode lo ఇది ఒక puzzle; interview lo ఇది ఒక <b>design</b> ప్రశ్న.</div>
<div class="sub">ఇక్కడ మనం మూడు versions రాస్తాం, మరియు మొదటి రెండూ <b>విరిగిపోతాయి</b> — ఒకటి తప్పు జవాబు ఇచ్చి, ఇంకొకటి నెమ్మదిగా ఉండి. ఆ నెమ్మదితనాన్ని <b>కొలిచి చూపిస్తాను</b>: 183 ms నుంచి 1 ms కి.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 02</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి సంఖ్యా నిజంగా కొలిచినదే** — timing numbers కూడా. మీ machine lo కొంచెం వేరే సంఖ్యలు రావొచ్చు, కానీ **నిష్పత్తి** అదే ఉండాలి. అదే ముఖ్యం.

<div class="box">
<div class="lab">ఈ problem గురించి ఒక అపోహ</div>
చాలా మంది దీన్ని ఒక <b>LeetCode puzzle</b> అనుకుంటారు — "HashMap + doubly linked list, అంతే". ఆ జవాబు సరైనదే, కానీ interview lo అది <b>సగం మాత్రమే</b>.<br><br>
అసలు ప్రశ్నలు ఇవి: <b>ఎందుకు</b> doubly linked list? Singly సరిపోదా? LRU కాకుండా LFU కావాలంటే ఎంత code మారాలి? TTL ఎక్కడ పెడతారు? Thread safety? — ఇవి design ప్రశ్నలు, మరియు ఈ doc వాటి గురించే.
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. Cache అంటే ఏమిటి — మరియు అసలు కష్టం ఎక్కడ
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి version, మరియు మొదటి విరుపు**

3. Step — హద్దు ఉన్న ఒక cache
4. **మొదటి విరుపు** — అత్యంత వేడి key నే తీసేశాం

**Part 3 — రెండో విరుపు: సరైన జవాబు, కానీ నెమ్మది**

5. Step — వాడకం క్రమాన్ని గుర్తుపెట్టుకోవడం
6. **రెండో విరుపు** — నెమ్మదితనాన్ని కొలిచి చూడటం
7. `indexOf` + `splice` ఎందుకు ఖరీదు

**Part 4 — O(1) కి చేరడం**

8. Step — HashMap + Doubly Linked List
9. Doubly ఎందుకు, singly ఎందుకు సరిపోదు
10. కొలత — 183 ms నుంచి 1 ms కి

**Part 5 — LFU: పూర్తిగా వేరే ప్రశ్న**

11. LRU vs LFU — ఏది ఎప్పుడు తప్పు జవాబు ఇస్తుంది
12. **మూడో విరుపు** — naive LFU మరియు దాని O(n) scan
13. Step — Frequency buckets తో O(1) LFU

**Part 6 — ఒకే Cache, పలు policies**

14. Step — Eviction ని బయట పెట్టడం
15. Step — TTL, మరియు "గడియారం ఎవరిది"
16. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

**Part 7 — Interview lo**

17. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
18. నోటితో చెప్పాల్సిన English script
19. Follow-ups — thread safety, distributed cache
20. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. Cache అంటే ఏమిటి — మరియు అసలు కష్టం ఎక్కడ

Cache = **ఖరీదైన పనిని మళ్ళీ చేయకుండా, ఫలితాన్ని దాచుకోవడం.** DB query 50 ms తీసుకుంటే, ఆ ఫలితాన్ని memory lo పెట్టి తర్వాతిసారి 0.05 ms lo ఇవ్వడం.

ఇది సులభం. కష్టం ఎక్కడంటే — **memory పరిమితం.**

10 లక్షల rows ఉన్న table ని మొత్తం memory lo పెట్టలేం. కాబట్టి cache కి ఒక **capacity** ఉంటుంది. అది నిండిపోయాక, కొత్తది చేర్చాలంటే **ఏదో ఒకటి తీసేయాలి**.

> **ఇదే మొత్తం problem:** *ఏది తీసేయాలి?*

ఈ ఒక్క ప్రశ్నకి జవాబే `LRU`, `LFU`, `FIFO`, `Random`, `TTL` — ఈ పేర్లన్నీ. అవి వేర్వేరు data structures కాదు; **అవి ఒకే ప్రశ్నకి వేర్వేరు జవాబులు.**

<div class="fig">
<div class="cap">Cache యొక్క రెండు భాగాలు · ఒకటి సులభం, ఒకటి కష్టం</div>
<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">ఒక cache lo నిజంగా రెండు వేర్వేరు సమస్యలు ఉన్నాయి</text><rect class="n-good" x="0" y="26" width="366" height="106" rx="4"/><text class="t mid" x="183" y="50">1 · నిల్వ చేయడం (సులభం)</text><text class="t-sm mid" x="183" y="74">key → value</text><text class="t-sm mid" x="183" y="90">get, put — రెండూ O(1)</text><text class="t-sm mid" x="183" y="106">ఒక HashMap చాలు</text><text class="t-acc mid" x="183" y="126">ఇక్కడ ఆలోచించాల్సినది ఏమీ లేదు</text><rect class="n-acc" x="384" y="26" width="366" height="106" rx="4"/><text class="t-w mid" x="567" y="50">2 · ఎవరిని తీసేయాలి (కష్టం)</text><text class="t-w-sm mid" x="567" y="74">నిండినప్పుడు ఒక్కరిని ఎంచుకోవాలి</text><text class="t-w-sm mid" x="567" y="90">ఆ ఎంపిక కూడా O(1) కావాలి</text><text class="t-w-sm mid" x="567" y="106">మరియు ఆ <tspan class="t-acc">నియమం మారుతుంది</tspan></text><text class="t-w-sm mid" x="567" y="126">ఈ doc మొత్తం దీని గురించే</text><rect class="n-info" x="0" y="150" width="750" height="108" rx="4"/><text class="t mid" x="375" y="174">"ఏది తీసేయాలి" — ప్రసిద్ధ జవాబులు</text><text class="t-sm mid" x="375" y="198"><tspan class="t-acc">FIFO</tspan> — మొదట వచ్చినది · సులభం, కానీ వాడకాన్ని పట్టించుకోదు (§4 lo ఇది విరుగుతుంది)</text><text class="t-sm mid" x="375" y="216"><tspan class="t-acc">LRU</tspan> — చాలాసేపటి నుంచి ఎవరూ చదవనిది · ఆచరణలో అత్యుత్తమం, అందుకే ఇదే default</text><text class="t-sm mid" x="375" y="234"><tspan class="t-acc">LFU</tspan> — అతి తక్కువసార్లు చదివినది · స్థిరమైన traffic కి మేలు, కానీ ఒక ఉచ్చు ఉంది (§11)</text><text class="t-sm mid" x="375" y="252"><tspan class="t-acc">TTL</tspan> — ఒక నిర్ణీత కాలం తర్వాత పోవాలి · పైవాటికి <tspan class="t-acc">అదనంగా</tspan>, ప్రత్యామ్నాయంగా కాదు</text></svg>
</div>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | జవాబు నా design ని ఎలా మారుస్తుంది |
|--------|-------------------------------------|
| **Eviction policy ఏమిటి — LRU నా?** | LRU అయితే DLL; LFU అయితే buckets (§13). **ముందే అడగాలి** |
| **`get` కూడా "వాడకం" గా లెక్కా?** | అవును అంటే `get` lo కూడా order మార్చాలి — ఇది చాలా మంది మర్చిపోతారు |
| **ఉన్న key కి `put` చేస్తే?** | విలువ మారాలి, మరియు అది ఒక వాడకంగా లెక్కకావాలి |
| **Capacity 0 అయితే?** | ఒక edge case — `put` ఏమీ చేయకూడదు |
| **TTL కావాలా?** | ఉంటే ప్రతి entry కి `expiresAt`, మరియు "గడువు తీరినది hit కాదు" (§15) |
| **Thread-safe కావాలా?** | ఇది **మీరే లేవనెత్తాలి** — §19 |
| **`get` దొరకకపోతే ఏమి తిరిగి ఇవ్వాలి?** | `-1` (LeetCode), `null`, `undefined`, లేక exception — ఇది ఒక API నిర్ణయం |

<div class="box warn">
<div class="lab">ఆ చివరి ప్రశ్న ఒక ఉచ్చు</div>
LeetCode lo <code>-1</code> తిరిగి ఇస్తారు. కానీ నిజమైన cache lo ఒక key యొక్క విలువ <b>నిజంగానే</b> <code>-1</code> కావొచ్చు! అప్పుడు "దొరకలేదు" మరియు "విలువ −1" మధ్య తేడా తెలియదు.<br><br>
<b>ఇది interview lo చెప్పదగిన మంచి పరిశీలన:</b> <i>"నేను <code>undefined</code> తిరిగి ఇస్తాను, లేదా ఒక <code>{ found, value }</code> jodi. <code>-1</code> అనేది LeetCode యొక్క సరళీకరణ — అది నిజమైన API lo ఒక bug."</i>
</div>

---

# Part 2 — మొదటి version, మరియు మొదటి విరుపు

---

## 3. Step — హద్దు ఉన్న ఒక cache

అతి సులభమైన cache: ఒక Map, ఒక capacity. నిండితే **మొదట చేర్చినదాన్ని** తీసేయడం (FIFO).

```javascript
class FifoCache {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); }

  get(key) { return this.map.has(key) ? this.map.get(key) : -1; }

  put(key, value) {
    if (this.map.size >= this.capacity && !this.map.has(key)) {
      const oldest = this.map.keys().next().value;   // JS Map చేర్చిన క్రమం గుర్తుంచుకుంటుంది
      this.map.delete(oldest);
      console.log(`   తీసేశాం: ${oldest}`);
    }
    this.map.set(key, value);
  }
}
```

**ఇది ఏం చేస్తుంది:** నిండేవరకు చేరుస్తుంది; నిండాక, అతి పాత entry ని తీసేసి కొత్తది పెడుతుంది.

`this.map.keys().next().value` అనేది JavaScript `Map` యొక్క ఒక లక్షణాన్ని వాడుతోంది — **అది keys ని చేర్చిన క్రమంలో ఉంచుతుంది**. ఇది ఇక్కడ ఉపయోగపడింది, మరియు §8 lo మళ్ళీ వస్తుంది.

---

## 4. మొదటి విరుపు — అత్యంత వేడి key నే తీసేశాం

ఇప్పుడు ఒక నిజమైన వాడకపు నమూనా పెడదాం. మూడు keys చేర్చి, అందులో **`A` ని ఐదుసార్లు** చదువుదాం — అంటే అది అత్యంత ఉపయోగపడే key. ఆపై ఒక కొత్తది చేరుద్దాం.

```javascript
const c = new FifoCache(3);
c.put('A', 1); c.put('B', 2); c.put('C', 3);

console.log('A ని 5 సార్లు చదివాం:', [1,2,3,4,5].map(() => c.get('A')).join(','));
console.log('ఇప్పుడు D చేరుస్తున్నాం…');
c.put('D', 4);
console.log('A ఇంకా ఉందా?', c.get('A'));
console.log('cache lo ఉన్నవి:', [...c.map.keys()].join(', '));
```

```
A ని 5 సార్లు చదివాం: 1,1,1,1,1
ఇప్పుడు D చేరుస్తున్నాం…
   తీసేశాం: A
A ఇంకా ఉందా? -1
cache lo ఉన్నవి: B, C, D
```

<div class="box warn">
<div class="lab">మొదటి విరుపు</div>
<b>ఐదుసార్లు చదివిన <code>A</code> ని తీసేశాం.</b> ఒక్కసారి కూడా ఎవరూ ముట్టుకోని <code>B</code>, <code>C</code> బతికిపోయాయి.<br><br>
ఇది ఒక సాంకేతిక bug కాదు — code సరిగ్గానే పనిచేసింది. ఇది ఒక <b>విధానపరమైన తప్పు</b>. FIFO ఒక్కటే విషయం చూస్తుంది: <i>ఎప్పుడు వచ్చావు?</i> కానీ cache కి నిజంగా ముఖ్యమైనది: <i>ఎప్పుడు పనికొచ్చావు?</i><br><br>
తర్వాతిసారి <code>A</code> కావాలంటే మళ్ళీ DB కి వెళ్ళాలి. అంటే మనం cache పెట్టిన <b>ఉద్దేశమే</b> దెబ్బతింది.
</div>

### సరైన ప్రశ్న

FIFO **చేర్చిన** క్రమం చూస్తోంది. మనకి కావలసినది **చదివిన** క్రమం.

అంటే: *"చాలాసేపటి నుంచి ఎవరూ చదవని key ఏది?"* — దాన్నే **Least Recently Used (LRU)** అంటారు.

ఈ ఒక్క మార్పు — "చేర్చిన" నుంచి "చదివిన" కి — మొత్తం data structure ని మారుస్తుంది. ఎందుకంటే **చదవడం కూడా ఇప్పుడు క్రమాన్ని మార్చాలి.**

---

# Part 3 — రెండో విరుపు: సరైన జవాబు, కానీ నెమ్మది

---

## 5. Step — వాడకం క్రమాన్ని గుర్తుపెట్టుకోవడం

సహజమైన ఆలోచన: **keys ని ఒక array lo వాడకపు క్రమంలో ఉంచడం.** చదివినప్పుడల్లా ఆ key ని చివరికి తీసుకెళ్ళడం (చివర = అతి కొత్తది). తీసేయాల్సి వస్తే — మొదటిది.

```javascript
class ArrayLru {
  constructor(capacity) { this.capacity = capacity; this.map = new Map(); this.order = []; }

  #touch(key) {
    const i = this.order.indexOf(key);      // ← ఈ key ఎక్కడ ఉంది?
    if (i !== -1) this.order.splice(i, 1);  // ← అక్కడి నుంచి తీసేయడం
    this.order.push(key);                   // చివర = అతి కొత్తది
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    this.#touch(key);                       // చదవడం కూడా ఒక వాడకమే
    return this.map.get(key);
  }

  put(key, value) {
    if (!this.map.has(key) && this.map.size >= this.capacity) {
      const lru = this.order.shift();       // మొదటిది = అతి పాతది
      this.map.delete(lru);
    }
    this.map.set(key, value);
    this.#touch(key);
  }
}
```

మొదటి విరుపు పరీక్షని మళ్ళీ నడుపుదాం — ఈసారి `A` ని చదివి, ఆపై `D` చేరుద్దాం:

```
cache lo: A, C, D | A బతికిందా? true
```

**`A` బతికింది**, `B` పోయింది. **మొదటి విరుపు సరిచేయబడింది** — ఇప్పుడు cache నిజంగా వాడకాన్ని గౌరవిస్తోంది.

ఇది సరైన జవాబు. LeetCode lo ఇది pass అవుతుంది (చిన్న inputs కి). కాబట్టి **ఇక్కడ ఆగిపోవచ్చా?**

---

## 6. రెండో విరుపు — నెమ్మదితనాన్ని కొలిచి చూడటం

"ఇది నెమ్మది" అని చెప్పడం సులభం. **కొలిచి చూపిద్దాం.** వేర్వేరు capacities తో, 20,000 reads:

```javascript
for (const n of [1000, 10000, 50000]) {
  const c = new ArrayLru(n);
  for (let i = 0; i < n; i++) c.put(i, i);          // నింపడం

  const t = process.hrtime.bigint();
  for (let i = 0; i < 20000; i++) c.get(i % n);     // 20,000 reads
  const ms = Number(process.hrtime.bigint() - t) / 1e6;
  console.log(`capacity ${String(n).padStart(6)} → 20,000 reads: ${ms.toFixed(0)} ms`);
}
```

```
capacity   1000 → 20,000 reads: 4 ms
capacity  10000 → 20,000 reads: 17 ms
capacity  50000 → 20,000 reads: 183 ms
```

<div class="note"><b>ఈ సంఖ్యల గురించి ఒక నిజాయితీ మాట.</b> ఇవి ఒక నిజమైన run నుంచి తీసినవే, కానీ timing ప్రతిసారీ కొంచెం మారుతుంది — నేను ఐదుసార్లు నడిపితే ఆ చివరి వరుస <b>116 నుంచి 185 ms</b> మధ్య ఊగింది (JIT warm-up, మిగతా processes). మొదటి రెండు వరుసలు మాత్రం స్థిరంగా ఉన్నాయి.<br><br>
కాబట్టి <b>ఖచ్చితమైన సంఖ్యని కాదు, వాలుని చూడండి</b> — capacity పెరిగితే సమయం పెరుగుతోంది. అదే ఇక్కడ ముఖ్యం, మరియు అది ప్రతి run lo నిజం.</div>

<div class="box warn">
<div class="lab">రెండో విరుపు — ఈ సంఖ్యలని జాగ్రత్తగా చూడండి</div>
Capacity <b>50 రెట్లు</b> పెరిగింది (1,000 → 50,000). సమయం <b>46 రెట్లు</b> పెరిగింది (4 ms → 183 ms).<br><br>
అంటే ప్రతి <code>get</code> యొక్క ఖర్చు cache పరిమాణంతో <b>పాటు పెరుగుతోంది</b>. ఇది సరిగ్గా <b>cache అనే ఆలోచనకి వ్యతిరేకం</b> — cache పెద్దదైతే ఎక్కువ hits రావాలి, కానీ ఇక్కడ పెద్దదైతే <i>నెమ్మదవుతోంది</i>.<br><br>
10 లక్షల entries ఉన్న ఒక నిజమైన cache lo, ప్రతి read ఒక DB call కంటే నెమ్మదవుతుంది. అప్పుడు cache ఒక <b>సహాయం కాదు, ఒక భారం</b>.
</div>

---

## 7. `indexOf` + `splice` ఎందుకు ఖరీదు

`#touch` lo మూడు పంక్తులు ఉన్నాయి. వాటి ఖర్చు చూద్దాం:

| పంక్తి | ఏం చేస్తుంది | ఖర్చు |
|--------|--------------|--------|
| `this.order.indexOf(key)` | మొదటి నుంచి వెతుకుతుంది, key దొరికేవరకు | **O(n)** |
| `this.order.splice(i, 1)` | ఆ తర్వాతి అన్ని elements ని ఒక స్థానం ఎడమకి జరుపుతుంది | **O(n)** |
| `this.order.push(key)` | చివర చేరుస్తుంది | O(1) |

**రెండు O(n) operations, ప్రతి `get` కీ.** అదే ఆ 183 ms.

<div class="fig">
<div class="cap">Array lo ఒక key ని ముందుకి తేవడం · ఎంత పని</div>
<svg viewBox="0 0 750 264"><text class="t-xs" x="0" y="14">50,000 entries · మధ్యలో ఉన్న ఒక key ని చివరికి తేవాలి</text><rect class="n-bad" x="0" y="26" width="750" height="104" rx="4"/><text class="t mid" x="375" y="50">Array — ప్రతి touch కి రెండు scans</text><rect class="n" x="30" y="64" width="80" height="30" rx="3"/><text class="t-sm mid" x="70" y="84">k0</text><rect class="n" x="114" y="64" width="80" height="30" rx="3"/><text class="t-sm mid" x="154" y="84">k1</text><text class="t-sm mid" x="240" y="84">… 24,998 …</text><rect class="n-acc" x="300" y="64" width="80" height="30" rx="3"/><text class="t-w-sm mid" x="340" y="84">మనది</text><text class="t-sm mid" x="470" y="84">… 25,000 …</text><rect class="n" x="600" y="64" width="80" height="30" rx="3"/><text class="t-sm mid" x="640" y="84">k49999</text><text class="t-sm" x="30" y="114">1 · <tspan class="t-acc">indexOf</tspan> — సగటున 25,000 పోలికలు · 2 · <tspan class="t-acc">splice</tspan> — 25,000 elements ని జరపడం</text><rect class="n-good" x="0" y="146" width="750" height="112" rx="4"/><text class="t mid" x="375" y="170">Doubly linked list — ముందే node చేతిలో ఉంది</text><rect class="n" x="150" y="184" width="90" height="34" rx="3"/><text class="t-sm mid" x="195" y="205">prev</text><rect class="n-acc" x="300" y="184" width="110" height="34" rx="3"/><text class="t-w-sm mid" x="355" y="205">మన node</text><rect class="n" x="470" y="184" width="90" height="34" rx="3"/><text class="t-sm mid" x="515" y="205">next</text><line class="ln-acc" x1="244" y1="201" x2="296" y2="201" marker-end="url(#aa)"/><line class="ln-acc" x1="414" y1="201" x2="466" y2="201" marker-end="url(#aa)"/><text class="t-sm mid" x="375" y="238">HashMap నేరుగా ఆ node ని ఇస్తుంది. <tspan class="t-acc">prev.next = next; next.prev = prev;</tspan> — నాలుగు pointer మార్పులు.</text><text class="t-acc mid" x="375" y="254">Cache lo ఎన్ని entries ఉన్నా, ఖర్చు అదే.</text></svg>
</div>

### అవసరమైనవి రెండు

Array విఫలమవుతోంది ఎందుకంటే దానికి రెండూ ఒకేసారి రావట్లేదు:

1. **"ఈ key ఎక్కడ ఉంది?" — O(1) lo తెలియాలి.** → ఇది HashMap ఇస్తుంది.
2. **"దాన్ని ఇక్కడి నుంచి తీసి అక్కడ పెట్టు" — O(1) lo కావాలి.** → ఇది linked list ఇస్తుంది.

కాబట్టి జవాబు: **రెండిటినీ కలపడం.** HashMap `key → node`; node ఒక doubly linked list lo ఉంటుంది.

---

# Part 4 — O(1) కి చేరడం

---

## 8. Step — HashMap + Doubly Linked List

```javascript
class Node {
  constructor(key, value) { Object.assign(this, { key, value, prev: null, next: null }); }
}

class LruCache {
  #map = new Map();                       // key → node
  #head = new Node(null, null);           // sentinel: జాబితా ప్రారంభం
  #tail = new Node(null, null);           // sentinel: జాబితా ముగింపు

  constructor(capacity) {
    this.capacity = capacity;
    this.#head.next = this.#tail;         // ఖాళీ జాబితా: head ↔ tail
    this.#tail.prev = this.#head;
  }

  #remove(n)   { n.prev.next = n.next; n.next.prev = n.prev; }
  #addFront(n) { n.next = this.#head.next; n.prev = this.#head;
                 this.#head.next.prev = n; this.#head.next = n; }

  get(key) {
    const n = this.#map.get(key);
    if (!n) return -1;
    this.#remove(n); this.#addFront(n);   // చదివాం → ముందుకి
    return n.value;
  }

  put(key, value) {
    const existing = this.#map.get(key);
    if (existing) {
      existing.value = value;
      this.#remove(existing); this.#addFront(existing);
      return;
    }
    if (this.#map.size >= this.capacity) {
      const lru = this.#tail.prev;        // చివరిది = అతి పాతది
      this.#remove(lru); this.#map.delete(lru.key);
    }
    const n = new Node(key, value);
    this.#map.set(key, n); this.#addFront(n);
  }
}
```

### Sentinel nodes ఎందుకు

`#head` మరియు `#tail` నిజమైన data కాదు — అవి **ఖాళీ కాపలా nodes**. ఇవి లేకపోతే `#remove` ఇలా ఉండేది:

```javascript
#remove(n) {
  if (n.prev) n.prev.next = n.next; else this.first = n.next;     // మొదటి node నా?
  if (n.next) n.next.prev = n.prev; else this.last = n.prev;      // చివరి node నా?
}
```

నాలుగు `if`లు, మరియు ప్రతిదీ ఒక bug అవకాశం. Sentinels తో **ఏ node కైనా `prev` మరియు `next` ఎప్పుడూ ఉంటాయి** — కాబట్టి ఒక్క `if` కూడా అవసరం లేదు.

> **Interview lo ఇది చెప్పండి:** *"I'm using sentinel head and tail nodes so that no node is ever at a boundary. That removes every null check from remove and insert, which is where linked-list bugs normally come from."* — ఇది ఒక చిన్న వివరం, కానీ ఇది మీరు linked lists ని ఇంతకుముందు రాశారని చూపిస్తుంది.

నడిపి చూద్దాం:

```
మొదలు (కొత్తది ముందు): C → B → A
A చదివాక:           A → C → B
D చేర్చాక:          D → A → C | B పోయిందా? true
```

ప్రతి అడుగూ సరిగ్గా ఉంది: `A` చదివాక అది ముందుకి వచ్చింది, `B` చివరికి జారింది, మరియు `D` వచ్చినప్పుడు `B` పోయింది.

---

## 9. Doubly ఎందుకు, singly ఎందుకు సరిపోదు

ఇది interviewer దాదాపు ఖచ్చితంగా అడిగే ప్రశ్న.

Singly linked list lo ప్రతి node కి `next` మాత్రమే ఉంటుంది. ఇప్పుడు ఒక node ని తీసేయాలంటే — **దాని ముందున్న node యొక్క `next` ని మార్చాలి**. కానీ singly list lo *ముందున్నది ఎవరో* తెలియదు. తెలుసుకోవాలంటే మొదటి నుంచి నడవాలి — **మళ్ళీ O(n)**.

| | Singly | Doubly |
|---|---|---|
| ఒక node ని తీసేయడం (node చేతిలో ఉన్నప్పుడు) | **O(n)** — ముందున్నదాన్ని వెతకాలి | **O(1)** — `n.prev` ఉంది |
| Memory | node కి ఒక pointer | node కి రెండు pointers |
| మన అవసరం | ✗ | ✓ |

<div class="note"><b>ఒక ఆసక్తికరమైన ప్రత్యామ్నాయం:</b> JavaScript <code>Map</code> చేర్చిన క్రమాన్ని గుర్తుంచుకుంటుంది, మరియు <code>delete</code> + <code>set</code> చేస్తే ఆ key చివరికి వెళ్తుంది. అంటే <b>కేవలం ఒక Map తో</b> LRU రాయొచ్చు — 15 పంక్తుల్లో.<br><br>
కానీ interview lo <b>DLL version ఆశిస్తారు</b>, ఎందుకంటే అది భాష-స్వతంత్రం, మరియు అది మీకు ఆ structure తెలుసని చూపిస్తుంది. <b>ఉత్తమ ఎత్తుగడ:</b> DLL రాసి, ఆపై చెప్పండి — <i>"JavaScript lo Map insertion order ఇస్తుంది కాబట్టి ఇది ఒక Map తోనే చేయగలను, కానీ నేను స్పష్టమైన structure చూపించాలనుకున్నాను."</i> ఇది రెండూ తెలుసని చూపిస్తుంది.</div>

---

## 10. కొలత — 183 ms నుంచి 1 ms కి

అదే పరీక్ష, అదే machine:

```
capacity   1000 → 20,000 reads: 1 ms
capacity  10000 → 20,000 reads: 1 ms
capacity  50000 → 20,000 reads: 1 ms
```

<div class="fig">
<div class="cap">అదే పని, రెండు structures · 20,000 reads</div>
<svg viewBox="0 0 750 254"><text class="t-xs" x="0" y="14">ఎడమ వైపు capacity, కుడి వైపు సమయం</text><text class="t-sm" x="0" y="46">Array, cap 1,000</text><rect class="n-bad" x="150" y="32" width="16" height="20" rx="2"/><text class="t-sm" x="176" y="47">4 ms</text><text class="t-sm" x="0" y="78">Array, cap 10,000</text><rect class="n-bad" x="150" y="64" width="79" height="20" rx="2"/><text class="t-sm" x="239" y="79">17 ms</text><text class="t-sm" x="0" y="110">Array, cap 50,000</text><rect class="n-bad" x="150" y="96" width="600" height="20" rx="2"/><text class="t-sm" x="600" y="111">183 ms</text><text class="t-sm" x="0" y="150">HashMap + DLL</text><rect class="n-good" x="150" y="136" width="6" height="20" rx="2"/><text class="t-sm" x="166" y="151">1 ms — మూడు capacities కీ ఒకటే</text><rect class="n-acc" x="0" y="174" width="750" height="72" rx="4"/><text class="t-w mid" x="375" y="198">ఇక్కడ ముఖ్యమైనది వేగం కాదు — <tspan class="t-acc">వాలు</tspan></text><text class="t-w-sm mid" x="375" y="220">Array version యొక్క సమయం capacity తో పాటు పెరుగుతోంది. DLL version యొక్కది <tspan class="t-acc">పెరగట్లేదు</tspan>.</text><text class="t-w-sm mid" x="375" y="238">"183 ms నెమ్మది" అని కాదు — "ఇది 10 లక్షల entries lo చాలా సెకన్లు అవుతుంది" అని అర్థం.</text></svg>
</div>

---

# Part 5 — LFU: పూర్తిగా వేరే ప్రశ్న

---

## 11. LRU vs LFU — ఏది ఎప్పుడు తప్పు జవాబు ఇస్తుంది

Interviewer అంటాడు: *"ఇప్పుడు LRU కాదు, **LFU** కావాలి."*

**LFU = Least Frequently Used** — అతి *తక్కువసార్లు* చదివినదాన్ని తీసేయడం. LRU **ఎప్పుడు** చదివారో చూస్తుంది; LFU **ఎన్నిసార్లు** చదివారో చూస్తుంది.

ఈ తేడా ఎప్పుడు ముఖ్యం? రెండూ తప్పు జవాబు ఇచ్చే సందర్భాలు ఉన్నాయి:

| పరిస్థితి | LRU | LFU |
|-----------|-----|-----|
| **ఒక పెద్ద scan** (ఒక report అన్ని rows చదివింది) | ✗ **విరిగిపోతుంది** — ఆ scan మొత్తం cache ని తుడిచేస్తుంది | ✓ బతుకుతుంది — ఆ keys count 1 మాత్రమే |
| **ఒక key ఇక పనికిరాదు** (పాత promo code) | ✓ నెమ్మదిగా జారిపోతుంది | ✗ **ఇరుక్కుపోతుంది** — పాత పెద్ద count వల్ల శాశ్వతంగా ఉండిపోతుంది |
| **కొత్త hot key** | ✓ వెంటనే పైకి వస్తుంది | ✗ పాత keys తో పోటీ పడాలంటే చాలా సమయం |

<div class="box">
<div class="lab">LFU యొక్క నిజమైన ఉచ్చు — దీన్ని interview lo చెప్పండి</div>
ఒక key రెండేళ్ళ క్రితం 10 లక్షల సార్లు చదవబడింది, ఆపై ఎవరూ ముట్టుకోలేదు. దాని count ఇప్పటికీ 10 లక్షలు. <b>అది ఎప్పటికీ తీసేయబడదు</b> — కొత్త, నిజంగా hot keys అన్నీ దాని చుట్టూ వచ్చిపోతూ ఉంటాయి.<br><br>
దీన్ని <b>cache pollution</b> అంటారు, మరియు దీనికి నిజమైన పరిష్కారం <b>aging</b> — అప్పుడప్పుడూ అన్ని counts ని సగం చేయడం (ఉదా: ప్రతి 10,000 operations కి). ఇది <b>LFU-with-decay</b> లేదా <b>TinyLFU</b> అనే నమూనా.<br><br>
<i>"LFU రాయగలను"</i> అనేది ఒక జవాబు. <i>"LFU రాయగలను, మరియు అది ఎక్కడ విరుగుతుందో, దాన్ని ఎలా సరిచేస్తారో తెలుసు"</i> — ఇది ఒక వేరే స్థాయి జవాబు.
</div>

---

## 12. మూడో విరుపు — naive LFU మరియు దాని O(n) scan

సహజమైన LFU: ప్రతి key కి ఒక count పెట్టి, తీసేయాల్సినప్పుడు **అతి తక్కువ count ఉన్నదాన్ని వెతకడం**.

```javascript
class NaiveLfu {
  constructor(c) { this.capacity = c; this.vals = new Map(); this.counts = new Map(); }

  get(k) {
    if (!this.vals.has(k)) return -1;
    this.counts.set(k, this.counts.get(k) + 1);
    return this.vals.get(k);
  }

  put(k, v) {
    if (!this.vals.has(k) && this.vals.size >= this.capacity) {
      let victim = null, min = Infinity;
      for (const [key, cnt] of this.counts)        // ← ప్రతి eviction కీ అందరినీ చూడటం
        if (cnt < min) { min = cnt; victim = key; }
      this.vals.delete(victim); this.counts.delete(victim);
    }
    this.vals.set(k, v);
    this.counts.set(k, (this.counts.get(k) ?? 0) + 1);
  }
}
```

సరైన జవాబు ఇస్తోందా? చూద్దాం — `A` ని రెండుసార్లు, `B` ని ఒకసారి చదివి, `D` చేరుద్దాం:

```
counts: A=3 B=2 D=1
C పోయిందా (అతి తక్కువ)? true
```

**సరైనదే.** `C` ని ఎవరూ చదవలేదు కాబట్టి అదే పోయింది. కానీ ఖర్చు?

```
capacity   1000 → 2,000 evictions: 12 ms
capacity  10000 → 2,000 evictions: 69 ms
capacity  50000 → 2,000 evictions: 298 ms
```

<div class="box warn">
<div class="lab">మూడో విరుపు — §6 అదే కథ, కొత్త వేషంలో</div>
మళ్ళీ అదే నమూనా: capacity 50 రెట్లు పెరిగితే, సమయం 25 రెట్లు పెరిగింది. <b>Eviction ఇప్పుడు O(n).</b><br><br>
మరియు ఇది <b>§6 కంటే ఘోరం</b>, ఎందుకంటే ఇక్కడ cache <i>నిండినప్పుడు</i> — అంటే అది ఎక్కువగా పనిచేస్తున్నప్పుడు — ప్రతి <code>put</code> కీ ఈ scan జరుగుతుంది.<br><br>
<b>పాఠం:</b> "ఏది తీసేయాలి" అనే ప్రశ్నకి జవాబు కూడా O(1) కావాలి. LRU lo అది "జాబితా చివరిది" — ఉచితం. LFU lo అది అంత సులభం కాదు.
</div>

---

## 13. Step — Frequency buckets తో O(1) LFU

అసలు సమస్య: *"అతి తక్కువ count ఎంత?"* అని ప్రతిసారీ **వెతుకుతున్నాం**. బదులుగా దాన్ని **గుర్తుపెట్టుకోవచ్చు**.

ఆలోచన: **count వారీగా keys ని గుంపులుగా ఉంచడం**, మరియు ఇప్పటి **అతి తక్కువ count** ని ఒక variable lo ఉంచడం.

```javascript
class LfuCache {
  #vals = new Map();                      // key → value
  #counts = new Map();                    // key → ఎన్నిసార్లు
  #buckets = new Map();                   // count → ఆ count ఉన్న keys (Set)
  #min = 0;                               // ఇప్పటి అతి తక్కువ count

  constructor(capacity) { this.capacity = capacity; }

  #bucket(c) {
    if (!this.#buckets.has(c)) this.#buckets.set(c, new Set());
    return this.#buckets.get(c);
  }

  #bump(k) {                              // ఒక key యొక్క count ని ఒకటి పెంచడం
    const c = this.#counts.get(k);
    this.#bucket(c).delete(k);
    if (c === this.#min && this.#bucket(c).size === 0) this.#min = c + 1;   // ఖాళీ అయింది
    this.#counts.set(k, c + 1);
    this.#bucket(c + 1).add(k);
  }

  get(k) { if (!this.#vals.has(k)) return -1; this.#bump(k); return this.#vals.get(k); }

  put(k, v) {
    if (this.capacity === 0) return;
    if (this.#vals.has(k)) { this.#vals.set(k, v); this.#bump(k); return; }
    if (this.#vals.size >= this.capacity) {
      const victim = this.#bucket(this.#min).values().next().value;   // ← O(1)
      this.#bucket(this.#min).delete(victim);
      this.#vals.delete(victim); this.#counts.delete(victim);
    }
    this.#vals.set(k, v); this.#counts.set(k, 1);
    this.#bucket(1).add(k); this.#min = 1;                            // కొత్తది ఎప్పుడూ count 1
  }
}
```

### మూడు సూక్ష్మమైన, ముఖ్యమైన వివరాలు

**1. `#min` ఎప్పుడు పెరుగుతుంది?** ఒక key `c` నుంచి `c+1` కి వెళ్ళినప్పుడు, **మరియు** `c` bucket ఖాళీ అయినప్పుడు. అప్పుడు `#min = c + 1`. ఇది ఎందుకు సరైనది — ఎందుకంటే counts ఎప్పుడూ **ఒకొక్కటిగా** పెరుగుతాయి, కాబట్టి `#min` ఒక్క అడుగు మాత్రమే జరుగుతుంది, దూకదు.

**2. కొత్త key వచ్చినప్పుడు `#min = 1`.** ఇది స్పష్టం కానీ మర్చిపోతే బగ్: కొత్తదాని count 1, అంటే అదే ఇప్పుడు అతి తక్కువ.

**3. Tie-break: `Set` వాడటం.** రెండు keys కి ఒకే count ఉంటే ఎవరిని తీసేయాలి? JavaScript `Set` **చేర్చిన క్రమం** గుర్తుంచుకుంటుంది, కాబట్టి `values().next()` ఆ bucket lo **అతి పాతదాన్ని** ఇస్తుంది. అంటే మనకి ఉచితంగా **LFU-తో-LRU-tiebreak** వచ్చింది — ఇదే సరైన ప్రవర్తన.

దాన్ని పరీక్షిద్దాం:

```javascript
const t = new LfuCache(2);
t.put('X', 1); t.put('Y', 2);      // రెండూ count 1
t.put('Z', 3);                      // X ముందు వచ్చింది → X పోవాలి
```

```
counts: A=3 B=2 C=1
D చేర్చాక: A=3 B=2 D=1 | C పోయిందా? true
tie-break: X పోయిందా? true | Y ఉందా? true
```

మరియు వేగం:

```
capacity   1000 → 2,000 evictions: 1 ms
capacity  10000 → 2,000 evictions: 1 ms
capacity  50000 → 2,000 evictions: 1 ms
```

**298 ms → 1 ms**, మరియు capacity తో పెరగట్లేదు.

---

# Part 6 — ఒకే Cache, పలు policies

---

## 14. Step — Eviction ని బయట పెట్టడం

ఇప్పుడు మన దగ్గర రెండు పూర్తి caches ఉన్నాయి: `LruCache`, `LfuCache`. వాటిని పక్కపక్కన పెట్టి చూడండి — **`get` మరియు `put` యొక్క ఆకారం దాదాపు ఒకటే**:

```
విలువ ఉందా చూడు → లేకపోతే miss → ఉంటే "వాడాను" అని నమోదు చేసి విలువ ఇవ్వు
నిండిందా చూడు  → నిండితే ఒకరిని తీసేయి → కొత్తది చేర్చు
```

తేడా ఉన్నది ఒక్క చోటే: **"వాడాను అని ఎలా నమోదు చేయాలి"** మరియు **"ఎవరిని తీసేయాలి"**. అంటే మారేది eviction నియమం, మారనిది cache యొక్క అస్థిపంజరం.

మారేదాన్ని బయట పెడదాం. ఒక policy కి కావలసినవి **నాలుగు** మాత్రమే:

```javascript
class EvictionPolicy {
  onInsert(key) {}      // ఒక కొత్త key చేరింది
  onAccess(key) {}      // ఒక key చదవబడింది (లేదా తిరిగి రాయబడింది)
  onRemove(key) {}      // ఒక key పోయింది (eviction లేదా TTL వల్ల)
  victim() { throw new Error('subclass implement చేయాలి'); }   // ఎవరిని తీసేయాలి?
}
```

ఇప్పుడు మన రెండు versions ఈ ఒప్పందం లోపలికి వెళ్తాయి. **LRU policy** = మనం §8 lo రాసిన DLL, కానీ values లేకుండా — ఇది కేవలం **క్రమాన్ని** చూస్తుంది:

```javascript
class LruPolicy extends EvictionPolicy {
  #nodes = new Map();
  #head = { key: null }; #tail = { key: null };
  constructor() { super(); this.#head.next = this.#tail; this.#tail.prev = this.#head; }

  #unlink(n) { n.prev.next = n.next; n.next.prev = n.prev; }
  #front(n)  { n.next = this.#head.next; n.prev = this.#head;
               this.#head.next.prev = n; this.#head.next = n; }

  onInsert(key) { const n = { key }; this.#nodes.set(key, n); this.#front(n); }
  onAccess(key) { const n = this.#nodes.get(key); if (n) { this.#unlink(n); this.#front(n); } }
  onRemove(key) { const n = this.#nodes.get(key); if (n) { this.#unlink(n); this.#nodes.delete(key); } }
  victim()      { return this.#tail.prev.key; }
}
```

**LFU policy** = §13 యొక్క buckets, అదే ఒప్పందంలో:

```javascript
class LfuPolicy extends EvictionPolicy {
  #counts = new Map(); #buckets = new Map(); #min = 0;
  #bucket(c) { if (!this.#buckets.has(c)) this.#buckets.set(c, new Set()); return this.#buckets.get(c); }

  onInsert(key) { this.#counts.set(key, 1); this.#bucket(1).add(key); this.#min = 1; }
  onAccess(key) {
    const c = this.#counts.get(key); if (c === undefined) return;
    this.#bucket(c).delete(key);
    if (c === this.#min && this.#bucket(c).size === 0) this.#min = c + 1;
    this.#counts.set(key, c + 1); this.#bucket(c + 1).add(key);
  }
  onRemove(key) {
    const c = this.#counts.get(key); if (c === undefined) return;
    this.#bucket(c).delete(key); this.#counts.delete(key);
  }
  victim() { return this.#bucket(this.#min).values().next().value; }
}
```

<div class="note"><b>ఒక ముఖ్యమైన మార్పు గమనించండి:</b> ఇప్పుడు policy lo <b>values లేవు</b> — కేవలం keys మరియు క్రమం. Values అన్నీ <code>Cache</code> lo ఉన్నాయి. ఈ విభజన వల్ల policy ని విడిగా test చేయొచ్చు, మరియు <code>Cache</code> కి eviction నియమం గురించి ఏమీ తెలియనవసరం లేదు.<br><br>
ఇదే <b>Strategy pattern</b> — కానీ పేరు కంటే ముఖ్యమైనది ఇది: <b>కొత్త policy = ఒక కొత్త class, ఉన్న code lo సున్నా మార్పులు.</b></div>

---

## 15. Step — TTL, మరియు "గడియారం ఎవరిది"

TTL (time to live) = ఒక entry ఎంతకాలం చెల్లుబాటు అవుతుంది. Session cache, OTP, API token — వీటన్నిటికీ ఇది కావాలి.

అమలు సులభం: ప్రతి entry తో పాటు ఒక `expiresAt` ఉంచి, చదివేటప్పుడు తనిఖీ చేయడం.

కానీ ఇక్కడ ఒక **design ఉచ్చు** ఉంది, మరియు interviewers దీన్ని చూస్తారు:

```javascript
#alive(e) { return e.expiresAt === null || Date.now() < e.expiresAt; }    // ✗
```

`Date.now()` ని class లోపల పిలిస్తే — **ఈ class ని test చేయడం దాదాపు అసాధ్యం**. "600 ms తర్వాత entry పోవాలి" అని test రాయాలంటే, ఆ test నిజంగా 600 ms **ఆగాలి**. పది అలాంటి tests ఉంటే మీ test suite ఆరు సెకన్లు నిద్రపోతుంది.

పరిష్కారం: **గడియారాన్ని బయట నుంచి ఇవ్వడం.**

```javascript
constructor(capacity, { policy = new LruPolicy(), ttlMs = null,
                        clock = () => Date.now() } = {}) { … }

#alive(e) { return e.expiresAt === null || this.clock() < e.expiresAt; }   // ✓
```

Production lo default `Date.now` వాడుతుంది. Test lo మనం ఒక నకిలీ గడియారం ఇస్తాం:

```javascript
let now = 1000;
const ttl = new Cache(10, { ttlMs: 500, clock: () => now });
ttl.put('session', 'abc');
console.log('వెంటనే:      ', ttl.get('session'));
now += 400;  console.log('400ms తర్వాత:', ttl.get('session'));
now += 200;  console.log('600ms తర్వాత:', ttl.get('session'));
```

```
వెంటనే:       abc
400ms తర్వాత: abc
600ms తర్వాత: undefined
```

**ఒక్క millisecond కూడా ఆగకుండా** TTL ని పూర్తిగా test చేశాం.

<div class="box">
<div class="lab">ఇది ఒక పెద్ద సూత్రం, ఇక్కడ చిన్నగా కనిపిస్తోంది</div>
"సమయాన్ని inject చేయడం" — ఇది rate limiter, scheduler, session timeout, retry-with-backoff, token expiry… అన్నిటిలోనూ వస్తుంది. <b>Class లోపల <code>Date.now()</code> ఉంటే ఆ class ని test చేయలేరు.</b><br><br>
Deep Dive 06 (Elevator) lo ఇదే సూత్రం <code>step()</code> రూపంలో కనిపించింది. అక్కడ "ఒక tick = ఒక యూనిట్ సమయం", ఇక్కడ "clock ఒక function". <b>రెండూ ఒకే ఆలోచన.</b>
</div>

### ఒక సూక్ష్మమైన ప్రశ్న: గడువు తీరిన entry — hit నా miss నా?

ఒక entry memory lo ఉంది, కానీ దాని TTL అయిపోయింది. `get` పిలిస్తే అది **miss** — ఎందుకంటే caller కి విలువ దొరకలేదు. మరియు దాన్ని అక్కడికక్కడే **తీసేయాలి** (lazy expiry), లేకపోతే అది memory lo కూర్చుని ఒక slot వృథా చేస్తుంది.

---

## 16. మొత్తం code ఒకే చోట · నడిపి చూద్దాం

<div class="fig">
<div class="cap">నిర్మాణం · Cache కి policy ఏమిటో తెలియదు</div>
<svg viewBox="0 0 750 278"><text class="t-xs" x="0" y="14">మూడు ముక్కలు, మరియు ఒక స్పష్టమైన సరిహద్దు</text><rect class="n-acc" x="240" y="26" width="270" height="62" rx="4"/><text class="t-w mid" x="375" y="48">Cache</text><text class="t-w-sm mid" x="375" y="66">store · TTL · stats · get/put</text><line class="ln-acc" x1="375" y1="92" x2="375" y2="118" marker-end="url(#aa)"/><rect class="n-info" x="215" y="122" width="320" height="56" rx="4"/><text class="t mid" x="375" y="144">EvictionPolicy (ఒప్పందం)</text><text class="t-sm mid" x="375" y="164">onInsert · onAccess · onRemove · victim</text><line class="ln" x1="300" y1="182" x2="200" y2="208" marker-end="url(#hollow)"/><line class="ln" x1="450" y1="182" x2="550" y2="208" marker-end="url(#hollow)"/><rect class="n-good" x="40" y="212" width="290" height="56" rx="4"/><text class="t mid" x="185" y="234">LruPolicy</text><text class="t-sm mid" x="185" y="254">DLL · victim = tail.prev</text><rect class="n-soft" x="420" y="212" width="290" height="56" rx="4"/><text class="t mid" x="565" y="234">LfuPolicy</text><text class="t-sm mid" x="565" y="254">buckets + min · victim = bucket[min] మొదటిది</text></svg>
</div>

```javascript
class Cache {
  #store = new Map();                     // key → { value, expiresAt }
  #hits = 0; #misses = 0; #evictions = 0;

  constructor(capacity, { policy = new LruPolicy(), ttlMs = null,
                          clock = () => Date.now() } = {}) {
    Object.assign(this, { capacity, policy, ttlMs, clock });
  }

  #alive(e) { return e.expiresAt === null || this.clock() < e.expiresAt; }
  #drop(key) { this.#store.delete(key); this.policy.onRemove(key); }

  get(key) {
    const e = this.#store.get(key);
    if (!e) { this.#misses++; return undefined; }
    if (!this.#alive(e)) { this.#drop(key); this.#misses++; return undefined; }
    this.policy.onAccess(key); this.#hits++;
    return e.value;
  }

  put(key, value, ttlMs = this.ttlMs) {
    if (this.capacity === 0) return;
    const expiresAt = ttlMs === null ? null : this.clock() + ttlMs;

    if (this.#store.has(key)) {           // ఉన్నదాన్ని మార్చడం — eviction అవసరం లేదు
      this.#store.set(key, { value, expiresAt });
      this.policy.onAccess(key);
      return;
    }
    if (this.#store.size >= this.capacity) {
      this.#drop(this.policy.victim());
      this.#evictions++;
    }
    this.#store.set(key, { value, expiresAt });
    this.policy.onInsert(key);
  }

  get size() { return this.#store.size; }
  get stats() {
    const total = this.#hits + this.#misses;
    return { hits: this.#hits, misses: this.#misses, evictions: this.#evictions,
             hitRate: total ? +(this.#hits / total).toFixed(2) : 0 };
  }
}
```

ఇప్పుడు **ఒకే `Cache` class, రెండు policies**:

```javascript
console.log('— LRU —');
const lru = new Cache(3);
lru.put('A', 1); lru.put('B', 2); lru.put('C', 3);
lru.get('A');
lru.put('D', 4);
console.log('B పోయిందా?', lru.get('B') === undefined, '| A ఉందా?', lru.get('A') === 1);

console.log('— అదే Cache, policy మాత్రమే మారింది —');
const lfu = new Cache(3, { policy: new LfuPolicy() });
lfu.put('A', 1); lfu.put('B', 2); lfu.put('C', 3);
lfu.get('A'); lfu.get('A'); lfu.get('B');
lfu.put('D', 4);
console.log('C పోయిందా?', lfu.get('C') === undefined, '| A ఉందా?', lfu.get('A') === 1);
```

```
— LRU —
B పోయిందా? true | A ఉందా? true
— అదే Cache, policy మాత్రమే మారింది —
C పోయిందా? true | A ఉందా? true
```

**రెండు సందర్భాల్లోనూ `Cache` class ఒక్క అక్షరం కూడా మారలేదు.** మారినది ఒక constructor argument మాత్రమే.

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ నుంచి | ఏమి చేరింది | ఎందుకు |
|-------------|--------------|---------|
| §3 | `capacity`, `Map` | మౌలిక అస్థిపంజరం |
| §4 (విరుపు) | వాడకపు క్రమం | FIFO వేడి key ని తీసేసింది |
| §6 (విరుపు) | DLL, sentinels | Array touch O(n) — 183 ms |
| §12 (విరుపు) | Frequency buckets, `#min` | LFU eviction scan O(n) — 298 ms |
| §14 | `EvictionPolicy` ఒప్పందం | రెండు caches యొక్క ఆకారం ఒకటే |
| §15 | `expiresAt`, `clock` | TTL, మరియు test చేయగలగడం |
| ఇక్కడ | `stats` | Cache పనిచేస్తోందో లేదో కొలవడానికి |

### Stats ఎందుకు

ఒక cache **పనిచేస్తోందో లేదో** ఎలా తెలుసు? Hit rate చూడాలి.

```
{ hits: 2, misses: 1, evictions: 0, hitRate: 0.67 }
```

> **Interview lo ఇది ఒక మంచి అదనపు మాట:** *"I'd expose hit rate, because a cache with a 5% hit rate is worse than no cache — you're paying the memory and the lookup and getting nothing. Without the metric you'd never know."*

---

# Part 7 — Interview lo

---

## 17. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

<div class="fig">
<div class="cap">45 నిమిషాల time budget</div>
<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">ఈ problem lo code ఎక్కువ, మాటలు తక్కువ — కానీ మొదటి 5 నిమిషాలు మాటలే</text><rect class="n-acc" x="0" y="26" width="90" height="38" rx="3"/><text class="t-w mid" x="45" y="50">5 నిమి</text><text class="t-sm" x="106" y="50"><tspan class="t-acc">Clarify</tspan> — policy ఏది? get కూడా వాడకమా? TTL?</text><rect class="n-info" x="0" y="70" width="70" height="38" rx="3"/><text class="t mid" x="35" y="94">4 నిమి</text><text class="t-sm" x="106" y="94">Array ఎందుకు సరిపోదో <tspan class="t-acc">చెప్పడం</tspan> (రాయొద్దు)</text><rect class="n-acc" x="0" y="114" width="270" height="38" rx="3"/><text class="t-w mid" x="135" y="138">16 నిమి — LRU (DLL)</text><text class="t-sm" x="286" y="138">ఇదే ప్రధాన సమయం · sentinels ప్రస్తావించండి</text><rect class="n-good" x="0" y="158" width="200" height="38" rx="3"/><text class="t mid" x="100" y="182">12 నిమి — LFU</text><text class="t-sm" x="286" y="182">buckets + min · tie-break చెప్పండి</text><rect class="n-soft" x="0" y="202" width="110" height="38" rx="3"/><text class="t mid" x="55" y="226">6 నిమి</text><text class="t-sm" x="286" y="226">Policy ని బయట పెట్టడం (మాటల్లో చాలు)</text><text class="t-sm mid" x="375" y="258">మిగిలిన 2 నిమిషాలు — thread safety, TTL గురించి మీరే లేవనెత్తండి</text></svg>
</div>

### వరుస ముఖ్యం

**LRU ని పూర్తిగా ముగించండి, ఆపై LFU.** సగం LRU + సగం LFU = రెండూ అసంపూర్ణం. ఒకటి పూర్తిగా పనిచేస్తే, రెండోదాన్ని మాటల్లో వివరించినా సరిపోతుంది.

### ఏమి తప్పక చెప్పాలి

1. **Array ఎందుకు సరిపోదు** — `indexOf` + `splice` రెండూ O(n) (§7). దీన్ని **రాయకుండానే** చెప్పండి, సమయం ఆదా.
2. **Sentinel nodes ఎందుకు** (§8) — null checks తొలగిపోతాయి.
3. **Doubly ఎందుకు** (§9) — singly lo `prev` లేదు కాబట్టి delete O(n).
4. **LFU tie-break** (§13) — ఒకే count ఉన్న రెండు keys మధ్య LRU.
5. **LFU యొక్క పాత-hot-key సమస్య** (§11) — ఇది చెప్తే మీరు నిజంగా ఆలోచించారని తెలుస్తుంది.

---

## 18. నోటితో చెప్పాల్సిన English script

<div class="script">
"A couple of questions first. Which eviction policy — LRU? Does a <span class='mono'>get</span> count as a use, or only writes? And do I need TTL, or is capacity the only limit?<br><br>
I'll do LRU first. The obvious approach is a map plus an array holding keys in use order, and moving a key to the end when it's read. That's correct but it's O(n) per read — <span class='mono'>indexOf</span> scans, and <span class='mono'>splice</span> shifts everything after it. On a cache of fifty thousand entries that's measurably slow, which defeats the point of the cache.<br><br>
So I need two things at once: find the node in O(1), and move it in O(1). A hash map gives me the first, a doubly linked list gives me the second. Map from key to node; the node lives in the list; most-recent at the front, so the victim is always <span class='mono'>tail.prev</span>.<br><br>
It has to be doubly linked — with a singly linked list, removing a node means finding its predecessor, and that's a walk. I'll also use sentinel head and tail nodes so no node is ever at a boundary; that removes every null check from remove and insert, which is where these bugs usually live.<br><br>
For LFU the answer changes shape. The naive version scans every key to find the minimum count on each eviction, which is O(n) exactly when the cache is busiest. Instead I keep a bucket per count — count to a set of keys — and track the current minimum. Incrementing moves a key one bucket up, and the minimum only ever advances by one, so I can maintain it in O(1). For the victim I take the first key out of the minimum bucket, and because a JavaScript Set preserves insertion order, that gives me LRU tie-breaking within a frequency for free.<br><br>
One real problem with LFU: a key that was hot two years ago keeps a huge count and never gets evicted, so it pollutes the cache forever. Production systems fix that with aging — periodically halving all counts. That's roughly what TinyLFU does.<br><br>
Both of these are the same cache with a different eviction rule, so I'd put eviction behind a small interface — <span class='mono'>onInsert</span>, <span class='mono'>onAccess</span>, <span class='mono'>onRemove</span>, <span class='mono'>victim</span> — and a new policy becomes a new class rather than an edit.<br><br>
For TTL, I'd take the clock as a constructor parameter rather than calling <span class='mono'>Date.now()</span> inside, so expiry can be tested without any test actually sleeping."
</div>

---

## 19. Follow-ups — thread safety, distributed cache

| Follow-up | జవాబు | మారే classes |
|-----------|-------|---------------|
| "Random eviction (test కోసం)" | కొత్త `RandomPolicy` | **+1 కొత్తది, 0 edits** |
| "ప్రతి entry కి వేరే TTL" | `put(k, v, ttlMs)` ఇప్పటికే ఉంది | **0** |
| "Eviction అయినప్పుడు callback" | Constructor lo ఒక `onEvict` hook | **+1 parameter** |
| "Cache stats" | `stats` ఇప్పటికే ఉంది | **0** |
| "LFU lo aging" | `LfuPolicy` lo ప్రతి N operations కి counts సగం | Policy మాత్రమే |
| "Thread-safe కావాలి" | కింద చూడండి | — |
| "పలు servers (Redis)" | కింద చూడండి | — |

### Thread safety

> *"JavaScript is single-threaded, so this is already safe here. In Java it wouldn't be — <span style='font-family:monospace'>get</span> isn't read-only, it mutates the list, so two concurrent reads can corrupt it. The simple answer is one lock around get and put. The problem is that makes every read serialise, which for a cache is exactly the wrong trade-off, because reads are the common case.*
>
> *What production caches do instead — Caffeine is the usual example — is buffer the access records. The read returns immediately and just appends the access to a ring buffer, and the ordering is applied later in a batch. So reads stay fast and the eviction order becomes slightly approximate. That's a deliberate trade: you give up exact LRU ordering for concurrency, and for a cache that's almost always worth it."*

**ఈ జవాబు చాలా బలమైనది** ఎందుకంటే ఇది ఒక **నిజమైన trade-off** చెప్తోంది — "lock పెడతాను" అనే సాధారణ జవాబు కంటే ఒక స్థాయి పైన.

### Distributed cache

> *"అదే interface, వేరే implementation. `get`/`put` Redis కి వెళ్తాయి. కానీ అప్పుడు కొత్త సమస్యలు: **cache stampede** (ఒక hot key expire అయినప్పుడు వెయ్యి requests ఒకేసారి DB కి వెళ్ళడం — దీనికి single-flight లేదా probabilistic early refresh), మరియు **invalidation** (ఒక server data మార్చితే మిగతావాళ్ళకి ఎలా తెలుస్తుంది — pub/sub లేదా చిన్న TTL). ఈ రెండూ LRU/LFU కంటే కష్టమైన సమస్యలు."*

---

## 20. ఏమి నేర్చుకున్నాం

| ఆలోచన | ఇక్కడ ఎలా కనిపించింది | ఇంకెక్కడ వస్తుంది |
|--------|------------------------|---------------------|
| **సరైన జవాబు సరిపోదు; ఖర్చు కూడా చూడాలి** | Array version సరైనది, కానీ O(n) (§6) | ప్రతి data-structure ఎంపికలో |
| **రెండు structures కలపడం** | HashMap (వెతకడం) + DLL (కదలిక) | LFU buckets, LinkedHashMap, indexes |
| **"కనిష్ఠం" ని వెతకొద్దు, గుర్తుపెట్టుకో** | `#min` (§13) | Min-heap, running max, sliding window |
| **మారే నియమాన్ని బయట పెట్టడం** | `EvictionPolicy` (§14) | Pricing, allocation, retry, rate limit |
| **సమయాన్ని inject చేయడం** | `clock` (§15) | Rate limiter, scheduler, session, token |
| **ఖచ్చితత్వాన్ని వేగం కోసం వదులుకోవడం** | Caffeine యొక్క buffered reads (§19) | Approximate counters, sampling, sketches |

<div class="box">
<div class="lab">ఇక్కడి నుంచి ఎక్కడికి</div>
ఈ series lo తర్వాతివి: <b>03 Rate Limiter</b> (అక్కడ మళ్ళీ <code>clock</code> injection, మరియు sliding window), <b>04 BookMyShow</b> (seat locking = Deep Dive 01 యొక్క race, పెద్ద రూపంలో), <b>05 Splitwise</b>.<br><br>
ఇప్పటికే వచ్చినవి: <b>01 Parking Lot</b> · <b>06 Elevator</b>.<br><br>
వేగవంతమైన revision కోసం — <code>LLD_Design_Problems_Telugu.pdf</code> lo Problem 07. సాధారణ సూత్రాల కోసం — <code>LLD_Telugu.pdf</code> §29 (Strategy), §36 (Concurrency). Data structures కోసం — <code>DSA_00_Foundations_Telugu.pdf</code>.
</div>

---

_LRU &amp; LFU Cache — అడుగు అడుగునా · ఈ doc lo ఉన్న ప్రతి output, ప్రతి timing నిజంగా `node` lo run చేసి తీసినదే ✅_
