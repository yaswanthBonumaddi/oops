<!-- style: editorial -->
<!-- footer: HLD Design Problems · తెలుగు గైడ్ · SDE2 / SSE / SDE3 -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
<marker id="hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
<marker id="dia" viewBox="0 0 14 10" refX="13" refY="5" markerWidth="12" markerHeight="10" orient="auto-start-reverse"><path d="M0,5 L7,0 L14,5 L7,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">HLD</div>
<div class="kicker">System Design Interview · SDE2 / SSE / SDE3</div>
<div class="rule"></div>
<div class="cover-title">HLD Design<br>Problems</div>
<div class="lede">18 problems. Answer ni గుర్తుపెట్టుకోవడం కాదు — <b>thinking process</b> ని పట్టుకోవడం. Problem చూడగానే మీ బుర్రలో ఏ order లో ఏం జరగాలో, అదే ఈ book.</div>
<div class="sub">ప్రతి problem కి: interviewer అడిగే విధానం → మీరు అడగాల్సిన clarifying questions → requirements → capacity estimation → API &amp; data model → architecture diagram → deep dive → scale &amp; failure → interview lo loud గా చెప్పాల్సిన పూర్తి English script → follow-up questions.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Interview Prep</span></div>
</div>

<div class="opener">
<div class="ghost">00</div>
<div class="kicker">ఈ Book ఎలా వాడాలి</div>
<div class="title">మొదట ఇది చదవండి</div>
<div class="meta">Read time <b>10 min</b> · ఇది skip చేస్తే మిగతాదంతా వృథా</div>
</div>

## ఈ book ఎందుకు ఇలా ఉంది

మీ దగ్గర ఇప్పటికే `HLD_Telugu.md` ఉంది — అది **concepts** నేర్పుతుంది (caching అంటే ఏమిటి, sharding అంటే ఏమిటి, CAP theorem అంటే ఏమిటి). కానీ interview lo మీకు concept అడగరు. **"Design WhatsApp"** అని ఒక వాక్యం విసిరి, 45 నిమిషాలు మీ ఆలోచనని చూస్తారు.

అక్కడ fail అయ్యేది knowledge కాదు — **order**. చాలా మంది వెంటనే boxes గీయడం మొదలుపెడతారు. Interviewer కి కావలసింది అది కాదు.

> **గుర్తుంచుకోండి:** System design interview lo మీరు evaluate అవుతున్నది "correct answer" మీద కాదు. **"ఈ మనిషితో కలిసి పని చేయగలనా?"** అన్న ప్రశ్న మీద. అంటే — clarifying questions అడుగుతారా, assumptions బయటికి చెప్తారా, trade-off ని అంగీకరిస్తారా, తప్పు చేస్తే correct చేసుకుంటారా.

అందుకే ఇక్కడ ప్రతి problem కి **అదే fixed order** follow చేశాను. మీరు ఈ 18 problems ఇలా చదివితే, 19వ కొత్త problem కూడా మీకు కొత్తగా అనిపించదు — because మీకు process వచ్చేసింది.

## ప్రతి problem లో ఉండే sections

<div class="grid">
<div class="card">
<div class="t">1 · The Ask</div>
<div class="s">Interviewer అసలు ఏం అడుగుతున్నాడు, ఈ problem ఏ skill ని test చేస్తుంది.</div>
</div>
<div class="card">
<div class="t">2 · Clarify</div>
<div class="s">మొదటి 5 నిమిషాల్లో అడగాల్సిన ప్రశ్నలు. వీటికే మార్కులు.</div>
</div>
<div class="card">
<div class="t">3 · Requirements</div>
<div class="s">Functional + Non-functional, scope lo ఏముంది ఏం లేదు.</div>
</div>
</div>

<div class="grid">
<div class="card">
<div class="t">4 · Estimation</div>
<div class="s">Numbers. QPS, storage, bandwidth — మొత్తం maths చూపిస్తూ.</div>
</div>
<div class="card">
<div class="t">5 · Design</div>
<div class="s">API → Data model → Architecture diagram. ఈ order తప్పకూడదు.</div>
</div>
<div class="card">
<div class="t">6 · Deep Dive</div>
<div class="s">అసలు problem ఇక్కడే. Options compare చేసి ఒకటి ఎంచుకోవడం.</div>
</div>
</div>

<div class="grid">
<div class="card">
<div class="t">7 · Scale &amp; Failure</div>
<div class="s">Bottleneck ఎక్కడ, ఏది down అయితే ఏమవుతుంది.</div>
</div>
<div class="card">
<div class="t">8 · Interview Script</div>
<div class="s">పూర్తి English lo — నోటితో ఏం చెప్పాలో అచ్చంగా అదే.</div>
</div>
<div class="card">
<div class="t">9 · Gotchas</div>
<div class="s">Follow-up ప్రశ్నలు + candidates చేసే common తప్పులు.</div>
</div>
</div>

## ఏ problem ఏం నేర్పుతుంది

ఒకే problem రెండుసార్లు అడగరు. కానీ **techniques మాత్రం repeat అవుతాయి.** అందుకే ఈ 18 ని technique ప్రకారం ఎంచుకున్నాను — ఒక్కొక్కటి ఒక్కో కొత్త ఆయుధం.

| # | Problem | ఇది నేర్పే core technique |
|---|---------|---------------------------|
| 01 | URL Shortener | Key generation, base62, read-heavy caching, 301 vs 302 |
| 02 | Distributed Rate Limiter | Token bucket vs sliding window, Redis atomicity, sync lag |
| 03 | News Feed | **Fan-out on write vs read** — ఈ ఒక్క trade-off system design యొక్క గుండె |
| 04 | Chat System (WhatsApp) | WebSockets, presence, message ordering, delivery receipts |
| 05 | Notification System | Fan-out, dedupe, retry with backoff, DLQ, user preferences |
| 06 | Video Streaming (YouTube) | Upload → transcode pipeline, CDN, adaptive bitrate |
| 07 | Ride Sharing (Uber) | Geospatial indexing (geohash/H3), matching, trip state machine |
| 08 | Typeahead / Autocomplete | Trie, top-k, offline index build + online serving split |
| 09 | Payment System &amp; Ledger | **Idempotency**, double-entry, saga, exactly-once illusion |
| 10 | Distributed Job Scheduler | Time-based sharding, leases, at-least-once execution |
| 11 | Web Crawler | Frontier, politeness, URL dedupe (bloom filter), traps |
| 12 | Google Docs | **OT vs CRDT** — real-time collaboration యొక్క రెండు దారులు |
| 13 | Message Queue (Kafka) | Append-only log, partitions, consumer groups, ordering |
| 14 | Key-Value Store (Dynamo) | Consistent hashing, quorum (R+W>N), vector clocks, LSM |
| 15 | Dropbox / File Sync | Chunking, content-addressed dedupe, delta sync, conflicts |
| 16 | Ticket Booking at scale | Inventory holds, overselling, hot-event thundering herd |
| 17 | Ad Click Aggregation | Stream processing, windowing, exactly-once, late events |
| 18 | Metrics &amp; Monitoring | Time-series storage, cardinality explosion, downsampling |

## Universal Framework — ఏ problem కైనా ఇదే 7 అడుగులు

Timer లేకుండా interview lo వెళ్ళకండి. 45 నిమిషాల interview ని ఇలా విడగొట్టండి:

<div class="fig">
<div class="cap">45-minute HLD interview · time budget</div>
<svg viewBox="0 0 760 150">
<rect class="n-good" x="0" y="30" width="88" height="46" rx="4"/>
<text class="t mid" x="44" y="50">Clarify</text>
<text class="t-sm mid" x="44" y="66">5 min</text>
<rect class="n-good" x="96" y="30" width="88" height="46" rx="4"/>
<text class="t mid" x="140" y="50">Requirements</text>
<text class="t-sm mid" x="140" y="66">3 min</text>
<rect class="n-soft" x="192" y="30" width="88" height="46" rx="4"/>
<text class="t mid" x="236" y="50">Estimation</text>
<text class="t-sm mid" x="236" y="66">4 min</text>
<rect class="n-soft" x="288" y="30" width="88" height="46" rx="4"/>
<text class="t mid" x="332" y="50">API + Data</text>
<text class="t-sm mid" x="332" y="66">6 min</text>
<rect class="n-acc" x="384" y="30" width="100" height="46" rx="4"/>
<text class="t-w mid" x="434" y="50">Architecture</text>
<text class="t-w-sm mid" x="434" y="66">8 min</text>
<rect class="n-acc" x="492" y="30" width="130" height="46" rx="4"/>
<text class="t-w mid" x="557" y="50">Deep Dive</text>
<text class="t-w-sm mid" x="557" y="66">12 min</text>
<rect class="n-info" x="630" y="30" width="88" height="46" rx="4"/>
<text class="t mid" x="674" y="50">Scale + Wrap</text>
<text class="t-sm mid" x="674" y="66">7 min</text>
<line class="ln-acc" x1="0" y1="14" x2="376" y2="14"/>
<text class="t-xs" x="0" y="9">MOST CANDIDATES BURN 30 MIN IN HERE</text>
<line class="ln-acc" x1="384" y1="96" x2="622" y2="96"/>
<text class="t-acc" x="384" y="118">…and never reach the deep dive, which is where seniority is judged</text>
</svg>
<div class="note">Deep dive కి చేరకపోతే మీరు "senior" గా కనిపించరు. అందుకే మొదటి భాగం fast గా, disciplined గా ముగించాలి.</div>
</div>

| # | అడుగు | ఇక్కడ interviewer ఏం చూస్తాడు |
|---|-------|-------------------------------|
| 1 | **Clarify** | Ambiguity ని గుర్తిస్తున్నారా, లేక assume చేసి పరిగెత్తుతున్నారా |
| 2 | **Requirements** | Scope ని కుదించగలరా (ఇది maturity signal) |
| 3 | **Estimation** | Numbers తో comfort. Order of magnitude చాలు |
| 4 | **API design** | Client ఏం అడుగుతుందో స్పష్టత |
| 5 | **Data model** | Access pattern → DB choice, ఈ direction lo ఆలోచిస్తున్నారా |
| 6 | **Architecture** | Components + అవి ఎందుకు ఉన్నాయో justify చేయగలరా |
| 7 | **Deep dive** | అసలు seniority test. ఒక్క component ని internals దాకా తవ్వగలరా |

<div class="box warn">
<div class="lab">Golden rule</div>
<b>ఎప్పుడూ boxes ముందు గీయకండి.</b> Requirements రాకముందే architecture గీస్తే, interviewer దృష్టిలో మీరు ఒక pattern ని memorize చేసి వాంతి చేస్తున్నారు. Requirements → estimation → అప్పుడే మొదటి box.
</div>

## SDE2 vs SSE/SDE3 — level ని ఏది decide చేస్తుంది

ఇద్దరూ ఒకే architecture గీయొచ్చు. తేడా ఎక్కడ వస్తుందంటే:

| | SDE2 జవాబు | **SSE / SDE3 జవాబు** |
|--|-----------|----------------------|
| Component | "ఇక్కడ Kafka పెడతాను" | "Kafka పెడతాను ఎందుకంటే producer ని consumer నుంచి decouple చేయాలి, replay కావాలి, ordering per-key చాలు. SQS అయితే replay రాదు" |
| Failure | ప్రస్తావించడు | "ఈ service down అయితే requests queue lo పేరుకుంటాయి, 5 నిమిషాల తర్వాత load shed చేసి 503 ఇస్తాను" |
| Numbers | "చాలా data" | "రోజుకి 2 TB, 30 రోజులు hot storage lo, తర్వాత S3 Glacier" |
| Consistency | "DB వాడతాను" | "ఇక్కడ eventual consistency చాలు, కానీ payment path lo మాత్రం strong కావాలి — అందుకే ఆ ఒక్క భాగం వేరే store" |
| Trade-off | ఒకే option చెప్తాడు | రెండు options చెప్పి, **ఎందుకు ఒకటి ఎంచుకున్నాడో** చెప్తాడు |
| Scope | అన్నీ design చేయబోతాడు | "ఇది ఇప్పుడు అవసరం లేదు, v2 lo చూద్దాం" అని కోసేస్తాడు |

<div class="box bad">
<div class="lab">Common mistakes — ఈ 7 చేస్తే round అక్కడే అయిపోతుంది</div>
<b>1.</b> Clarifying questions అడగకుండా వెంటనే design మొదలుపెట్టడం.<br>
<b>2.</b> Trade-off లేకుండా "I'll use Kafka" అనడం — <i>ఎందుకు</i> అన్నది లేకపోవడం.<br>
<b>3.</b> ప్రతిదానికీ microservices. Interviewer scale అడగకముందే మీరే complexity తెచ్చుకోవడం.<br>
<b>4.</b> Numbers ఇవ్వకపోవడం. "It will be a lot of data" ≠ "roughly 2 TB per day".<br>
<b>5.</b> Failure గురించి ఒక్క మాట కూడా చెప్పకపోవడం. Happy path మాత్రమే గీయడం.<br>
<b>6.</b> Interviewer hint ఇచ్చినప్పుడు దాన్ని పట్టించుకోకపోవడం. Hint అంటే "నువ్వు తప్పు దారిలో ఉన్నావు" అని అర్థం.<br>
<b>7.</b> మౌనంగా ఆలోచించడం. బోర్డ్ మీద ఏమీ లేకుండా 2 నిమిషాలు ఆలోచిస్తే interviewer కి మీ బుర్ర కనిపించదు.
</div>

## ప్రతి problem lo తిరిగి తిరిగి వచ్చే 6 tools

ఈ ఆరు దాదాపు అన్ని problems lo వస్తాయి. వీటిని ఒకసారి సరిగ్గా అర్థం చేసుకుంటే, ప్రతి problem lo మళ్ళీ ఆలోచించాల్సిన అవసరం లేదు.

| Tool | ఒక్క వాక్యంలో | ఎక్కడ వస్తుంది |
|------|---------------|----------------|
| **Consistent hashing** | Node add/remove చేసినప్పుడు keys అన్నీ కాకుండా 1/N భాగం మాత్రమే కదులుతాయి | Cache cluster, KV store, sharding — problems 01, 13, 14 |
| **Snowflake IDs** | 64-bit = timestamp + machine id + sequence. Sortable, collision-free, coordination లేకుండా | Chat, feed, ledger — 03, 04, 09 |
| **Idempotency key** | Client ఇచ్చే unique key ని store చేసి, retry వచ్చినప్పుడు మళ్ళీ execute చేయకపోవడం | Payment, notification, booking — 05, 09, 16 |
| **Quorum (R + W > N)** | ఎన్ని replicas చదవాలి/రాయాలో tune చేసి consistency vs latency ని adjust చేయడం | KV store, multi-region — 14 |
| **CDC / Outbox** | DB write + event publish ని atomic చేయడం (dual-write problem కి పరిష్కారం) | Feed, notification, analytics — 03, 05, 17 |
| **Bloom filter** | "ఇది ఖచ్చితంగా లేదు" అని O(1) lo చెప్పే memory-పొదుపు structure | Crawler dedupe, LSM read path — 11, 14 |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">H1</div>
<div class="kicker">Problem 01 · Warm-up</div>
<div class="title">Design a URL Shortener<br>(TinyURL / bit.ly)</div>
<div class="meta">Difficulty <b>Easy-Medium</b> · Frequency <b>చాలా ఎక్కువ</b> · నేర్పే concepts: hashing, base62, KGS, cache, 301 vs 302, sharding</div>
</div>

## 1. The Ask — interviewer అసలు ఏం అడుగుతున్నాడు

> "Design a service that takes a long URL like `https://example.com/very/long/path?utm=xyz` and returns a short one like `https://sho.rt/aB3xK9p`. Hitting the short one should redirect to the original."

ఇది **మొదటి problem** గా అందరూ అడుగుతారు — ఎందుకంటే ఇది మోసపూరితంగా సులభం. Feature ఒక్కటే: string in, string out. కానీ interviewer చూసేది feature ని కాదు.

<div class="grid">
<div class="card">
<div class="t">ఇది ఎందుకు అడుగుతారు</div>
<div class="s">Read-heavy system ని 100:1 ratio తో handle చేయగలరా — cache, replica, CDN ఆలోచన వస్తుందా.</div>
</div>
<div class="card">
<div class="t">అసలు core</div>
<div class="s">Unique short key ని distributed servers మీద collision లేకుండా ఎలా generate చేస్తారు. అదే ఈ problem యొక్క గుండె.</div>
</div>
<div class="card">
<div class="t">Hidden test</div>
<div class="s">301 vs 302 redirect. దీన్ని సరిగ్గా చెప్పే candidate 10 మందిలో ఒకరు.</div>
</div>
</div>

## 2. Clarifying Questions — మొదటి 5 నిమిషాలు

ఇక్కడ **నోరు మూసుకుని design చేయకూడదు**. ఈ ప్రశ్నలు అడగండి, జవాబులు board మీద రాయండి.

| మీరు అడగాల్సినది | ఎందుకు ఇది ముఖ్యం | సాధారణంగా వచ్చే జవాబు |
|------------------|--------------------|------------------------|
| రోజుకి ఎన్ని URLs create అవుతాయి? | మొత్తం estimation, storage ఇక్కడి నుంచే మొదలు | ~500M per month |
| Read : Write ratio ఎంత? | Cache కావాలా వద్దా అన్నది ఇది decide చేస్తుంది | 100 : 1 |
| Short link ఎంత కాలం బతకాలి? | Expiry ఉంటే cleanup job + storage తగ్గుతుంది | Default 5 years |
| User తనకు నచ్చిన custom alias ఇవ్వొచ్చా? | ఇది ఒక పూర్తిగా వేరే write path | అవును, optional |
| Analytics (click count, geo) కావాలా? | 301 vs 302 decision దీని మీద ఆధారపడి ఉంటుంది | అవును, basic |
| Link update / delete చేయగలరా? | Immutable అయితే caching చాలా సులభం | ఇప్పుడు వద్దు |
| Latency target ఏమిటి? | Redirect ఎంత fast ఉండాలో number ఇస్తుంది | p99 < 100ms |

<div class="box warn">
<div class="lab">ఇక్కడ ఒక చిన్న trick</div>
ప్రశ్న అడిగాక <b>మీ assumption కూడా చెప్పండి</b> — "Read:write 100:1 అనుకుంటున్నాను, అంటే ఇది read-heavy system, కాబట్టి cache ఖచ్చితంగా వస్తుంది." ఇలా చెప్తే interviewer కి మీ ఆలోచన కనిపిస్తుంది. మౌనంగా ఆలోచించడం interview lo సున్నా మార్కులు.
</div>

## 3. Requirements

<div class="grid">
<div class="card">
<div class="t">Functional</div>
<div class="s">
• Long URL → short URL create చేయాలి<br>
• Short URL hit అయితే original కి redirect<br>
• Custom alias (optional)<br>
• Expiry time (optional, default 5y)<br>
• Basic click analytics
</div>
</div>
<div class="card">
<div class="t">Non-Functional</div>
<div class="s">
• <b>High availability</b> — redirect down అయితే అన్ని links చచ్చినట్టే<br>
• Redirect latency p99 &lt; 100ms<br>
• Short key predictable గా ఉండకూడదు (security)<br>
• Horizontally scalable
</div>
</div>
</div>

<div class="box bad">
<div class="lab">Out of scope — ఇలా బయటికి చెప్పండి</div>
User accounts &amp; social features, link preview generation, malware scanning, QR codes, payments. ఇవి scope lo లేవని <b>మీరే ముందు చెప్పడం</b> maturity signal — interviewer అడిగే వరకు ఆగకండి.
</div>

## 4. Capacity Estimation — numbers బోర్డ్ మీద రాయండి

Estimation lo perfection అవసరం లేదు. **Order of magnitude** చాలు. కానీ maths మాత్రం బయటికి కనిపించాలి.

| Step | లెక్క | ఫలితం |
|------|-------|--------|
| Writes / month | ఇచ్చినది | 500 M |
| **Write QPS** | 500M ÷ (30 × 86,400) | **≈ 200 / sec** |
| **Read QPS** | 200 × 100 | **≈ 20,000 / sec** |
| Peak read QPS | avg × 3 (peak factor) | ≈ 60,000 / sec |
| ఒక record size | shortKey 7B + longURL 500B + metadata ~100B | ≈ 600 bytes |
| Storage / month | 500M × 600 B | ≈ 300 GB |
| **Storage 5 years** | 300 GB × 60 నెలలు | **≈ 18 TB** |
| Read bandwidth | 20,000 × 600 B | ≈ 12 MB / sec |
| Cache size (80/20 rule) | రోజు reads 1.7B × 20% × 600B | ≈ 200 GB → shard చేసిన Redis cluster |

<div class="box info">
<div class="lab">Key space — ఇది ఖచ్చితంగా చూపించాలి</div>
Base62 = <code>a-z A-Z 0-9</code> = 62 characters.<br>
6 chars → 62<sup>6</sup> ≈ <b>56.8 billion</b> · 7 chars → 62<sup>7</sup> ≈ <b>3.5 trillion</b><br>
మనకి 5 ఏళ్ళకి కావలసినది 500M × 60 = <b>30 billion</b>. 6 chars సరిపోతుంది కానీ 53% వాడేస్తాం — collision rate పెరుగుతుంది. అందుకే <b>7 characters</b> ఎంచుకుంటున్నాను. ఇలా number తో justify చేస్తే అది senior answer.
</div>

## 5. API Design

Architecture కంటే ముందు API. ఎందుకంటే API నే మీ system యొక్క contract.

```http
POST /api/v1/urls
Content-Type: application/json
Authorization: Bearer <token>

{
  "longUrl":     "https://example.com/very/long/path?utm=xyz",
  "customAlias": "my-link",        // optional
  "expiresAt":   "2031-01-01T00:00:00Z"   // optional
}

201 Created
{ "shortUrl": "https://sho.rt/aB3xK9p", "expiresAt": "2031-01-01T00:00:00Z" }

409 Conflict     → customAlias ఇప్పటికే వాడుకలో ఉంది
429 Too Many     → rate limit దాటింది
```

```http
GET /aB3xK9p

302 Found
Location: https://example.com/very/long/path?utm=xyz
Cache-Control: private, max-age=300
```

<div class="box warn">
<div class="lab">Rate limiting ని ఇక్కడే చెప్పండి</div>
Create API కి <b>తప్పనిసరిగా</b> rate limit కావాలి — లేకపోతే ఒక్క script మీ మొత్తం key space ని మింగేస్తుంది. Per user/API-key: గంటకి 100 links. దీన్ని మీరే చెప్తే, interviewer "abuse గురించి ఆలోచించాడు" అని note చేసుకుంటాడు.
</div>

## 6. Data Model — DB choice ని access pattern నుంచి derive చేయండి

మన access pattern ఒక్కటే: **`shortKey` ఇచ్చి `longUrl` తీసుకోవడం.** Joins లేవు, range queries లేవు, complex transactions లేవు. ఇది స్వచ్ఛమైన **key-value lookup**.

| Table | Column | Type | Note |
|-------|--------|------|------|
| `urls` | `short_key` | varchar(7) | **Primary key / partition key** |
| | `long_url` | varchar(2048) | |
| | `user_id` | bigint | nullable (anonymous links) |
| | `created_at` | timestamp | |
| | `expires_at` | timestamp | null = never |

| Option | సరిపోతుందా? | ఎందుకు |
|--------|-------------|---------|
| **PostgreSQL / MySQL** | పర్లేదు | ACID, custom alias uniqueness సులభం. కానీ 18 TB కి manual sharding కావాలి |
| **Cassandra / DynamoDB** | ✅ ఇదే మంచిది | Partition key మీద O(1) lookup, auto-sharding, 20K QPS ని తేలిగ్గా తట్టుకుంటుంది |
| **MongoDB** | పర్లేదు | పని చేస్తుంది కానీ ఇక్కడ document model వల్ల ఎలాంటి లాభమూ లేదు |
| **Redis (only)** | ❌ కాదు | Primary store గా వద్దు — 18 TB RAM ఖరీదు దారుణం, durability risk |

**నా choice:** Cassandra (లేదా DynamoDB), partition key = `short_key`. కారణం — access pattern సరిగ్గా key-value, write throughput ఎక్కువ, cross-partition transaction అవసరం లేదు.

<div class="box info">
<div class="lab">Custom alias కి ఒక catch ఉంది</div>
Cassandra lo సాధారణ insert last-write-wins — అంటే ఇద్దరు ఒకే alias అడిగితే ఒకరు రెండోవాడి link ని silent గా తుడిచేస్తారు. దీనికి <b>lightweight transaction</b> (<code>INSERT ... IF NOT EXISTS</code>) వాడాలి. ఇది Paxos వాడుతుంది కాబట్టి నెమ్మది — కానీ custom alias అరుదు కాబట్టి పర్లేదు. ఈ ఒక్క వాక్యం చెప్తే మీరు distributed systems తెలిసినవారని అర్థమవుతుంది.
</div>

## 7. High-Level Architecture

<div class="fig">
<div class="cap">URL shortener · high level architecture</div>
<svg viewBox="0 0 750 290">
<rect class="n" x="10" y="145" width="76" height="44" rx="5"/>
<text class="t mid" x="48" y="163">Client</text>
<text class="t-sm mid" x="48" y="177">web / app</text>
<line class="ln" x1="90" y1="167" x2="108" y2="167" marker-end="url(#a)"/>
<rect class="n" x="112" y="145" width="76" height="44" rx="5"/>
<text class="t mid" x="150" y="163">Load</text>
<text class="t mid" x="150" y="177">Balancer</text>
<line class="ln" x1="192" y1="167" x2="210" y2="167" marker-end="url(#a)"/>
<rect class="n-dark" x="214" y="145" width="104" height="44" rx="5"/>
<text class="t-w mid" x="266" y="163">API Servers</text>
<text class="t-w-sm mid" x="266" y="177">stateless · autoscaled</text>
<rect class="n-acc" x="214" y="25" width="104" height="44" rx="5"/>
<text class="t-w mid" x="266" y="43">Key Generation</text>
<text class="t-w-sm mid" x="266" y="57">pre-made unique keys</text>
<line class="ln-acc" x1="266" y1="73" x2="266" y2="141" marker-end="url(#aa)"/>
<text class="t-sm" x="274" y="110">write path</text>
<rect class="n-info" x="356" y="85" width="104" height="44" rx="5"/>
<text class="t mid" x="408" y="103">Redis Cache</text>
<text class="t-sm mid" x="408" y="117">hot keys · LRU</text>
<line class="ln" x1="322" y1="158" x2="352" y2="122" marker-end="url(#a)"/>
<text class="t-sm" x="326" y="136">1</text>
<rect class="n-soft" x="356" y="205" width="104" height="44" rx="5"/>
<text class="t mid" x="408" y="223">Cassandra</text>
<text class="t-sm mid" x="408" y="237">sharded by key</text>
<line class="ln" x1="322" y1="178" x2="352" y2="212" marker-end="url(#a)"/>
<text class="t-sm" x="326" y="204">2 (on miss)</text>
<line class="ln-dash" x1="322" y1="167" x2="506" y2="167" marker-end="url(#a)"/>
<rect class="n" x="510" y="145" width="86" height="44" rx="5"/>
<text class="t mid" x="553" y="163">Kafka</text>
<text class="t-sm mid" x="553" y="177">click events</text>
<text class="t-sm mid" x="414" y="160">async</text>
<line class="ln-dash" x1="600" y1="167" x2="628" y2="167" marker-end="url(#a)"/>
<rect class="n" x="632" y="145" width="100" height="44" rx="5"/>
<text class="t mid" x="682" y="163">Analytics</text>
<text class="t-sm mid" x="682" y="177">warehouse</text>
</svg>
<div class="note">Read path: Client → LB → API → Cache (hit అయితే అక్కడితో అయిపోయింది) → miss అయితే Cassandra. Analytics ఎప్పుడూ <b>async</b> — click count రాయడం కోసం redirect ని ఆపకూడదు.</div>
</div>

ప్రతి box ఎందుకు ఉందో ఒక్క వాక్యంలో చెప్పగలగాలి:

| Component | ఎందుకు ఉంది | ఇది తీసేస్తే ఏమవుతుంది |
|-----------|--------------|------------------------|
| Load Balancer | Traffic ని stateless API servers మీద పంచడం + health check | ఒక server చస్తే ఆ traffic అంతా చస్తుంది |
| API Servers (stateless) | Session state లేదు కాబట్టి ఎన్నయినా జోడించొచ్చు | Sticky sessions వల్ల scaling కష్టం |
| Key Generation Service | Distributed servers మధ్య collision లేకుండా unique key | Write path lo ప్రతిసారీ "ఈ key ఖాళీగా ఉందా" అని DB చదవాలి |
| Redis Cache | 20K read QPS lo 90%+ ని DB కి చేరనివ్వకుండా ఆపుతుంది | DB మీద 20K QPS — ఖరీదు, latency రెండూ పెరుగుతాయి |
| Kafka | Analytics write ని redirect path నుంచి వేరు చేస్తుంది | Analytics DB నెమ్మదిస్తే user redirect నెమ్మదిస్తుంది |

## 8. Deep Dive — Short key ఎలా పుట్టాలి?

**ఇదే ఈ problem యొక్క అసలు గుండె.** ఇక్కడ 12 నిమిషాలు గడపండి. మిగతా అంతా ఏ system design కైనా common — ఇది మాత్రం ఈ problem కే ప్రత్యేకం.

సమస్య ఇది: 200 writes/sec, 50 API servers, ఎవరూ ఒకరితో ఒకరు మాట్లాడుకోకుండా — **అందరూ unique 7-character key ఇవ్వాలి.**

| Approach | ఎలా పని చేస్తుంది | ప్లస్ | మైనస్ |
|----------|-------------------|------|--------|
| **A. Hash(longUrl)** | MD5/SHA-256 తీసి మొదటి 43 bits → base62 → 7 chars | ఒకే URL కి ఎప్పుడూ ఒకే key (dedupe free) | **Collision తప్పదు.** ప్రతి write కి "ఈ key ఉందా?" అని DB read. అదే URL ని ఇద్దరు users వేరే వేరే expiry తో shorten చేయలేరు |
| **B. Random 7 chars** | Secure random → base62 | Predictable కాదు, code చాలా simple | Key space నిండుతున్న కొద్దీ collision ఎక్కువ → ప్రతి write కి 1+ DB read. 20 TB DB మీద అది ఖరీదు |
| **C. Global auto-increment** | ఒక counter → base62 encode | Collision **సున్నా**, key చిన్నది | Single point of failure + **keys sequential** → `aB3xK9p` తర్వాత ఏముందో ఊహించి అందరి links ని scrape చేయొచ్చు |
| **D. Counter ranges (KGS)** | Redis/ZooKeeper ఒక్కో server కి 1M numbers range ఇస్తుంది. Server ఆ range ని local గా వాడుతుంది | Collision సున్నా, DB read సున్నా, network call అరుదు (1M కి ఒకసారి) | Server crash అయితే ఆ range వృథా (కానీ 3.5 trillion lo 1M వృథా అంటే లెక్కలోకి రాదు) |

<div class="box good">
<div class="lab">నా Choice · Approach D + ఒక చిన్న twist</div>
<b>Counter ranges</b> తీసుకుంటాను, కానీ counter ని నేరుగా base62 చేయను — ముందు <b>reversible bijective transform</b> (ఉదా. Feistel network / multiply-by-large-coprime mod 62<sup>7</sup>) వేసి తర్వాత encode చేస్తాను. దీంతో collision సున్నా అలాగే ఉంటుంది, కానీ keys sequential గా కనిపించవు. Approach C యొక్క ఏకైక పెద్ద లోపం ఇలా పోతుంది.
</div>

<div class="fig">
<div class="cap">Key Generation Service · range allocation</div>
<svg viewBox="0 0 750 260">
<rect class="n-acc" x="280" y="12" width="190" height="52" rx="5"/>
<text class="t-w mid" x="375" y="34">Range Allocator</text>
<text class="t-w-sm mid" x="375" y="50">Redis INCRBY 1,000,000</text>
<line class="ln-acc" x1="330" y1="68" x2="150" y2="106" marker-end="url(#aa)"/>
<line class="ln-acc" x1="375" y1="68" x2="375" y2="106" marker-end="url(#aa)"/>
<line class="ln-acc" x1="420" y1="68" x2="600" y2="106" marker-end="url(#aa)"/>
<rect class="n-dark" x="55" y="110" width="190" height="52" rx="5"/>
<text class="t-w mid" x="150" y="132">API Server 1</text>
<text class="t-w-sm mono mid" x="150" y="148">range 0 – 999,999</text>
<rect class="n-dark" x="280" y="110" width="190" height="52" rx="5"/>
<text class="t-w mid" x="375" y="132">API Server 2</text>
<text class="t-w-sm mono mid" x="375" y="148">range 1M – 1,999,999</text>
<rect class="n-dark" x="505" y="110" width="190" height="52" rx="5"/>
<text class="t-w mid" x="600" y="132">API Server 3</text>
<text class="t-w-sm mono mid" x="600" y="148">range 2M – 2,999,999</text>
<line class="ln" x1="375" y1="166" x2="375" y2="192" marker-end="url(#a)"/>
<rect class="n-soft" x="150" y="196" width="450" height="48" rx="5"/>
<text class="t mid" x="375" y="216">counter 1,000,042 → scramble → base62</text>
<text class="t-sm mono mid" x="375" y="232">1000042 → 3891746623 → "aB3xK9p"</text>
</svg>
<div class="note">ఒక్కో server తన range ని memory lo వాడుకుంటుంది. అంటే <b>ప్రతి write కి network call లేదు, DB read లేదు</b> — 1 million writes కి ఒకే ఒక్క Redis call. ఇదే ఈ approach యొక్క అందం.</div>
</div>

## 9. Redirect — 301 నా 302 నా? (దీన్ని 90% మంది తప్పుతారు)

ఇది చిన్న detail లాగా కనిపిస్తుంది. కానీ ఇది **ఒక product decision** — మరియు interviewer ఖచ్చితంగా అడుగుతాడు.

<div class="fig">
<div class="cap">301 permanent vs 302 found · ఏం మారుతుంది</div>
<svg viewBox="0 0 750 235">
<rect class="n-bad" x="10" y="10" width="355" height="215" rx="6"/>
<text class="t-acc" x="28" y="34">301 · MOVED PERMANENTLY</text>
<rect class="n" x="28" y="48" width="86" height="34" rx="4"/>
<text class="t mid" x="71" y="69">Browser</text>
<line class="ln" x1="118" y1="65" x2="154" y2="65" marker-end="url(#a)"/>
<text class="t-sm mid" x="136" y="58">1st</text>
<rect class="n-dark" x="158" y="48" width="92" height="34" rx="4"/>
<text class="t-w mid" x="204" y="69">Our Server</text>
<line class="ln" x1="254" y1="65" x2="268" y2="65" marker-end="url(#a)"/>
<rect class="n" x="272" y="48" width="70" height="34" rx="4"/>
<text class="t-sm mid" x="307" y="69">target</text>
<path class="ln-dash" d="M71 86 L71 132 L307 132 L307 88" marker-end="url(#a)"/>
<text class="t-sm" x="80" y="126">2nd hit onwards · browser caches the redirect</text>
<text class="t mid" x="187" y="167">Server కి request రానే రాదు</text>
<text class="t-sm mid" x="187" y="189">✓ latency తక్కువ · server load తక్కువ</text>
<text class="t-sm mid" x="187" y="207">✗ click analytics పూర్తిగా పోతుంది</text>
<rect class="n-good" x="385" y="10" width="355" height="215" rx="6"/>
<text class="t-acc" x="403" y="34">302 · FOUND (temporary)</text>
<rect class="n" x="403" y="48" width="86" height="34" rx="4"/>
<text class="t mid" x="446" y="69">Browser</text>
<line class="ln-acc" x1="493" y1="65" x2="529" y2="65" marker-end="url(#aa)"/>
<text class="t-sm mid" x="511" y="58">every</text>
<rect class="n-dark" x="533" y="48" width="92" height="34" rx="4"/>
<text class="t-w mid" x="579" y="69">Our Server</text>
<line class="ln" x1="629" y1="65" x2="643" y2="65" marker-end="url(#a)"/>
<rect class="n" x="647" y="48" width="70" height="34" rx="4"/>
<text class="t-sm mid" x="682" y="69">target</text>
<line class="ln-acc" x1="579" y1="86" x2="579" y2="110" marker-end="url(#aa)"/>
<rect class="n-info" x="509" y="112" width="140" height="28" rx="4"/>
<text class="t-sm mid" x="579" y="130">click event → Kafka</text>
<text class="t mid" x="562" y="167">ప్రతి click మనకి కనిపిస్తుంది</text>
<text class="t-sm mid" x="562" y="189">✓ analytics పూర్తిగా వస్తుంది</text>
<text class="t-sm mid" x="562" y="207">✗ ప్రతి hit కీ server load</text>
</svg>
</div>

<div class="box good">
<div class="lab">చెప్పాల్సిన జవాబు</div>
"Analytics మనకి functional requirement కాబట్టి నేను <b>302</b> ఎంచుకుంటాను — 301 ఇస్తే browser cache చేసేసి రెండో click నుంచి మన server కి request రాదు, అప్పుడు click count ఎప్పటికీ 1 దగ్గరే ఆగిపోతుంది. Server load పెరిగే ఖర్చుని Redis cache తో సర్దుకుంటాను. ఒకవేళ analytics అవసరం లేని plan అయితే 301 ఇస్తాను — అప్పుడు అది ఖరీదు తగ్గించే optimization."
</div>

## 10. Scale, Bottlenecks & Failure

| ఎక్కడ నొప్పి | లక్షణం | పరిష్కారం |
|--------------|---------|-----------|
| **DB read** | Cache miss ఎక్కువై Cassandra latency పెరగడం | Read replicas + cache TTL పెంచడం. Data immutable కాబట్టి TTL ధైర్యంగా పెద్దది పెట్టొచ్చు |
| **Hot link** | ఒక viral link కి secondకి 50K hits | ఆ ఒక్క Redis shard వేడెక్కుతుంది → API server memory lo local LRU (L1 cache) పెట్టండి. లేదా CDN edge lo redirect |
| **Cache cold start** | Redis restart అయితే మొత్తం load DB మీద పడి DB కూలుతుంది | Warm-up job + request coalescing (ఒకే key కి 1000 concurrent miss వస్తే DB కి ఒకే ఒక్క query) |
| **Key space అయిపోవడం** | 5 ఏళ్ళ తర్వాత | 7 → 8 chars కి పెంచడం. కొత్త keys పొడవుగా వస్తాయి, పాతవి పని చేస్తూనే ఉంటాయి |
| **Expired links** | 18 TB lo చాలా భాగం చచ్చిన data | **Lazy deletion** — read time lo expired అయితే 404 ఇచ్చి delete queue కి పంపడం. ప్లస్ రాత్రి cleanup job |
| **Region outage** | ఒక AWS region పోవడం | Multi-region active-active. Data immutable కాబట్టి async replication తో conflict ఏమీ ఉండదు — ఇది ఈ problem యొక్క పెద్ద అదృష్టం |

<div class="box info">
<div class="lab">ఇక్కడ ఒక బలమైన point చెప్పండి</div>
"ఈ system యొక్క data <b>immutable</b> — ఒకసారి short key create అయ్యాక అది ఎప్పుడూ మారదు. అందుకే caching, replication, multi-region అన్నీ trivial అవుతాయి. Consistency సమస్యే లేదు — eventual consistency సరిపోతుంది, ఎందుకంటే key ఇంకా replicate కాకముందు ఎవరూ దాన్ని hit చేయలేరు." — ఈ observation చెప్పే candidate చాలా తక్కువ.
</div>

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me start by confirming scope. I'll assume 500 million new links a month, a read-to-write ratio of about 100 to 1, links live for five years by default, custom aliases are supported, and we need basic click analytics. Is that reasonable?"</p>
<p>"That gives me roughly <em>200 writes per second and 20,000 reads per second</em>, so this is overwhelmingly a read-heavy system — caching is going to matter far more than write throughput. At 600 bytes a record, five years of data is about <em>18 terabytes</em>, which is too big for a single node, so I'll need sharding."</p>
<p>"On key length: base62 with 7 characters gives 3.5 trillion combinations against the 30 billion we need, so we stay under 1% utilisation and collisions stay negligible. Six characters would work numerically but we'd be at 53% utilisation, and I'd rather not design for that."</p>
<p>"The interesting problem here is generating unique keys across many stateless servers without coordinating on every write. Hashing the URL means a database check on every write to detect collisions. Random keys have the same problem, and it gets worse as the key space fills. A single global counter removes collisions entirely but is a single point of failure, and the keys come out sequential, which means anyone can enumerate every link in the system."</p>
<p>"So I'll use <em>counter ranges</em>. Redis hands each API server a block of a million integers, the server consumes that block from local memory, and only asks for a new block once it's exhausted. That's one network call per million writes, zero database reads, and zero collisions. To fix the enumeration problem, I run the counter through a reversible scramble before base62-encoding it, so the output looks random but is still guaranteed unique."</p>
<p>"For storage I'd pick Cassandra or DynamoDB, partitioned on the short key — our access pattern is a pure key-value lookup with no joins and no range scans. Custom aliases are the one exception: those need <em>insert-if-not-exists</em> so two users can't silently overwrite each other."</p>
<p>"For the redirect I'll return <em>302, not 301</em>. A 301 gets cached by the browser, so from the second click onwards the request never reaches us and our analytics stop at one. Since analytics is a stated requirement, 302 is the right call, and I'll absorb the extra load with Redis."</p>
<p>"One property that makes everything easier: this data is immutable. A short key never changes after creation, so I can cache aggressively, replicate asynchronously across regions, and live comfortably with eventual consistency."</p>
<p>"If we have time, the two things I'd dig into next are hot-link handling — a single viral link overloading one cache shard — and how we expire and reclaim dead links."</p>
</div>

## 11. Follow-up ప్రశ్నలు — వీటికి సిద్ధంగా ఉండండి

| Interviewer అడిగేది | మీ జవాబు (సారాంశం) |
|---------------------|---------------------|
| "ఒకే URL ని ఇద్దరు shorten చేస్తే?" | Default గా రెండు వేరే keys — ఎందుకంటే ఒక్కొక్కరికి వేరే expiry, వేరే analytics. Dedupe కావాలంటే `(user_id, long_url)` మీద ఒక secondary index, కానీ అది ఒక extra write |
| "Analytics ని ఎలా design చేస్తారు?" | Redirect path lo Kafka కి fire-and-forget event. Consumer అది aggregate చేసి time-series store lo రాస్తుంది. Exact count అవసరం లేదు కాబట్టి HyperLogLog తో unique visitors ని approximate చేయొచ్చు |
| "Malicious URL లు?" | Create time lo Google Safe Browsing API async check. అనుమానం ఉంటే redirect ముందు interstitial warning page |
| "Redis పూర్తిగా పోతే?" | System బతికే ఉంటుంది, కానీ latency పెరుగుతుంది. అందుకే API server lo చిన్న local LRU (L1) ఉంచడం — Redis చనిపోయినా hot links పని చేస్తాయి |
| "Custom alias ని ఎలా validate చేస్తారు?" | Length + charset check, reserved words blocklist (`api`, `admin`, `login`), profanity filter, తర్వాత conditional insert |
| "1 billion writes/day కి scale చేయాలంటే?" | Range size పెంచడం (1M → 10M), KGS ని multi-region చేయడం, key ని 8 chars కి పెంచడం. Architecture మారదు — అదే ఈ design యొక్క బలం |

<div class="box warn">
<div class="lab">ముగింపులో ఇలా చెప్పండి</div>
"To summarise: the system is read-heavy, the data is immutable, and the only genuinely hard part is unique key generation — which I solved with pre-allocated counter ranges plus a reversible scramble. Everything else is caching and sharding." — <b>ఒక వాక్యంలో summary</b> ఇవ్వడం interview ని బలంగా ముగిస్తుంది.
</div>

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">02</div>
<div class="kicker">Problem 02 · Algorithms + Distributed State</div>
<div class="title">Design a Distributed<br>Rate Limiter</div>
<div class="meta">Difficulty <b>Medium</b> · Frequency <b>చాలా ఎక్కువ</b> · నేర్పే concepts: token bucket, sliding window, Redis atomicity, fail-open</div>
</div>

## 1. The Ask

> "Design a rate limiter that allows at most N requests per user per minute, across a fleet of API servers."

ఇది మోసపూరితంగా చిన్న problem లా కనిపిస్తుంది — "counter పెంచు, limit దాటితే 429 ఇవ్వు". కానీ ఇక్కడ **రెండు నిజమైన కష్టాలు** ఉన్నాయి:

<div class="grid">
<div class="card">
<div class="t">కష్టం 1 · Algorithm</div>
<div class="s">"నిమిషానికి 100" అంటే అర్థం ఏమిటి? Clock నిమిషమా, rolling నిమిషమా? ఈ ఒక్క ప్రశ్న 5 వేర్వేరు algorithms కి దారితీస్తుంది.</div>
</div>
<div class="card">
<div class="t">కష్టం 2 · Distributed state</div>
<div class="s">50 API servers ఉన్నాయి. Counter ఎక్కడ ఉంటుంది? అందరూ Redis కి వెళ్తే latency + SPOF. Local గా ఉంచితే limit 50 రెట్లు తప్పు.</div>
</div>
<div class="card">
<div class="t">Hidden test</div>
<div class="s">Rate limiter down అయితే ఏం చేస్తారు? Fail-open నా fail-closed నా? దీనికి జవాబు ఇచ్చే candidate చాలా అరుదు.</div>
</div>
</div>

## 2. Clarifying Questions

| మీరు అడగాల్సినది | ఎందుకు ముఖ్యం | సాధారణ జవాబు |
|------------------|----------------|--------------|
| ఎవరిని limit చేస్తున్నాం — user, IP, API key? | Key design ఇక్కడి నుంచే | API key (+ IP anonymous కి) |
| Burst allow చేయాలా, లేక smooth గా ఉండాలా? | Token bucket vs leaky bucket ని ఇది decide చేస్తుంది | కొంత burst ఫర్వాలేదు |
| Limit దాటితే — reject నా queue నా? | Queue అంటే latency, reject అంటే error | Reject with 429 |
| ప్రతి endpoint కి వేరే limit ఉందా? | Rule engine కావాలా అన్నది | అవును, tier-based |
| Approximate సరిపోతుందా, exact కావాలా? | ఇదే అతి ముఖ్యమైన ప్రశ్న — exact అంటే ఖరీదు | ~1% error ఫర్వాలేదు |
| Rate limiter down అయితే? | Fail-open vs fail-closed | Fail-open (availability ముఖ్యం) |

<div class="box info">
<div class="lab">"Approximate సరిపోతుందా?" — ఈ ప్రశ్న అడిగితే మీరు వేరే level</div>
Exact rate limiting అంటే ప్రతి request కీ distributed consensus. అది చాలా ఖరీదు. నిజ ప్రపంచంలో Stripe, GitHub, AWS — అందరూ <b>approximate</b> limiters వాడతారు, ఎందుకంటే 100 బదులు 103 requests వెళ్ళినా ఆకాశం విరిగిపడదు. ఈ మాట interview lo చెప్తే over-engineering నుంచి బయటపడతారు.
</div>

## 3. Requirements &amp; Estimation

<div class="grid">
<div class="card">
<div class="t">Functional</div>
<div class="s">
• Per-key limit enforce చేయాలి<br>
• 429 + <code>Retry-After</code> header<br>
• Tier ప్రకారం వేరే rules<br>
• Rules ని runtime lo మార్చగలగాలి
</div>
</div>
<div class="card">
<div class="t">Non-Functional</div>
<div class="s">
• Added latency <b>&lt; 5 ms p99</b> — ఇది hot path<br>
• Rate limiter చస్తే API చావకూడదు<br>
• Memory: 1M active keys × ~50 B ≈ <b>50 MB</b> — Redis కి పలుచన
</div>
</div>
</div>

| లెక్క | విలువ |
|-------|-------|
| API traffic | 100,000 QPS |
| Active keys (users/API keys) | 1 M |
| ప్రతి key కి state | counter + timestamp ≈ 50 bytes |
| మొత్తం memory | ≈ 50 MB — ఒక్క Redis node lo సునాయాసంగా పడుతుంది |
| Redis కి extra round trip | ~0.5 ms same-AZ — ఇది budget lo సరిపోతుంది |

## 4. Deep Dive — 5 Algorithms

**ఈ problem యొక్క గుండె ఇదే.** ఇక్కడ 12 నిమిషాలు గడపండి.

<div class="fig">
<div class="cap">algorithm 1 &amp; 2 · fixed window కి ఉన్న boundary problem</div>
<svg viewBox="0 0 750 215">
<text class="t-xs" x="0" y="12">FIXED WINDOW COUNTER · limit = 100 / minute</text>
<line class="ln" x1="0" y1="70" x2="700" y2="70"/>
<line class="ln-thin" x1="120" y1="30" x2="120" y2="80"/>
<line class="ln-thin" x1="400" y1="30" x2="400" y2="80"/>
<line class="ln-thin" x1="680" y1="30" x2="680" y2="80"/>
<text class="t-sm mid" x="260" y="88">window 10:00 – 10:01</text>
<text class="t-sm mid" x="540" y="88">window 10:01 – 10:02</text>
<rect class="n-bad" x="300" y="40" width="96" height="26" rx="3"/>
<text class="t-sm mid" x="348" y="57">100 reqs</text>
<text class="t-sm mid" x="348" y="30">10:00:59</text>
<rect class="n-bad" x="404" y="40" width="96" height="26" rx="3"/>
<text class="t-sm mid" x="452" y="57">100 reqs</text>
<text class="t-sm mid" x="452" y="30">10:01:01</text>
<line class="ln-acc" x1="300" y1="102" x2="500" y2="102"/>
<text class="t-acc mid" x="400" y="120">2 సెకన్లలో 200 requests — limit 100 అయినా!</text>
<text class="t-xs" x="0" y="152">SLIDING WINDOW LOG · exact కానీ ఖరీదు</text>
<rect class="n-good" x="0" y="162" width="700" height="44" rx="4"/>
<text class="t-sm" x="14" y="182">ప్రతి request timestamp ని sorted set lo store చేసి, ప్రతిసారీ 1 నిమిషం కంటే పాతవాటిని తీసేయడం.</text>
<text class="t-sm" x="14" y="198">✓ ఖచ్చితమైనది · ✗ ఒక్కో key కి 100 timestamps — 1M keys అంటే memory పేలిపోతుంది</text>
</svg>
</div>

<div class="fig">
<div class="cap">algorithm 4 · token bucket — ఇదే industry default</div>
<svg viewBox="0 0 750 200">
<rect class="n-info" x="30" y="20" width="120" height="34" rx="4"/>
<text class="t mid" x="90" y="42">Refiller</text>
<text class="t-sm mid" x="90" y="68">సెకనుకి 2 tokens</text>
<line class="ln-acc" x1="155" y1="37" x2="245" y2="37" marker-end="url(#aa)"/>
<rect class="n" x="250" y="14" width="150" height="130" rx="6"/>
<text class="t-sm mid" x="325" y="32">Bucket · capacity 100</text>
<rect class="n-acc" x="262" y="70" width="126" height="62" rx="3"/>
<text class="t-w mid" x="325" y="96">62 tokens</text>
<text class="t-w-sm mid" x="325" y="114">ప్రస్తుతం నిల్వ</text>
<line class="ln" x1="405" y1="80" x2="470" y2="80" marker-end="url(#a)"/>
<text class="t-sm mid" x="437" y="72">1 తీసుకో</text>
<rect class="n-good" x="475" y="42" width="130" height="34" rx="4"/>
<text class="t mid" x="540" y="64">Token ఉంది → allow</text>
<rect class="n-bad" x="475" y="92" width="130" height="34" rx="4"/>
<text class="t mid" x="540" y="114">ఖాళీ → 429</text>
<line class="ln" x1="405" y1="100" x2="470" y2="108" marker-end="url(#a)"/>
<text class="t-sm" x="620" y="64">Bucket నిండి ఉంటే</text>
<text class="t-sm" x="620" y="80">100 requests ఒక్కసారే</text>
<text class="t-sm" x="620" y="96">వెళ్ళిపోతాయి — అదే</text>
<text class="t-acc" x="620" y="114">burst allowance.</text>
<text class="t-sm" x="0" y="172">రెండే numbers store చేస్తే చాలు: <tspan class="mono">tokens</tspan> మరియు <tspan class="mono">lastRefillTime</tspan>. Request వచ్చినప్పుడు</text>
<text class="t-sm" x="0" y="190">గడిచిన కాలానికి సరిపడా tokens కలిపి, తర్వాత ఒకటి తీసేయడం — O(1) time, O(1) memory.</text>
</svg>
</div>

| Algorithm | Memory / key | ఖచ్చితత్వం | Burst | ఎప్పుడు వాడాలి |
|-----------|--------------|-------------|-------|----------------|
| **Fixed window counter** | 1 number | ❌ boundary lo 2× | అనుకోకుండా | సులభం కావాలి, ఖచ్చితత్వం అవసరం లేదు |
| **Sliding window log** | N timestamps | ✅ perfect | లేదు | Limit చాలా చిన్నది (ఉదా. గంటకి 5) |
| **Sliding window counter** | 2 numbers | ~99% | లేదు | **General purpose best** — memory తక్కువ, boundary bug లేదు |
| **Token bucket** | 2 numbers | ✅ | ✅ controlled | **API rate limiting కి default.** Stripe, AWS ఇదే వాడతాయి |
| **Leaky bucket** | queue | ✅ | ❌ smooth output | Downstream ని constant rate lo protect చేయాలంటే |

<div class="box good">
<div class="lab">నా Choice</div>
<b>Token bucket.</b> కారణం — (1) ఒక్కో key కి రెండే numbers, memory పలుచన; (2) O(1) computation; (3) burst ని <i>controlled</i> గా allow చేస్తుంది, ఇది నిజమైన API వాడకానికి సరిపోతుంది (ఒక client 10 requests ఒక్కసారి పంపి తర్వాత ఆగడం సహజం); (4) రెండు knobs — <code>capacity</code> (burst ఎంత) మరియు <code>refillRate</code> (sustained rate ఎంత) — వీటిని విడిగా tune చేయొచ్చు. Fixed window ని <b>boundary problem వల్ల తిరస్కరిస్తున్నాను</b> అని స్పష్టంగా చెప్పండి.
</div>

## 5. Deep Dive — Counter ఎక్కడ ఉంచాలి?

50 API servers, ఒక్కో దానికీ 2000 QPS. Counter state ఎక్కడ?

<div class="fig">
<div class="cap">three placements · latency vs accuracy</div>
<svg viewBox="0 0 750 235">
<rect class="n" x="0" y="16" width="238" height="200" rx="5"/>
<text class="t-acc" x="16" y="38">A · LOCAL IN-MEMORY</text>
<rect class="n-dark" x="16" y="52" width="94" height="30" rx="3"/>
<text class="t-w mid" x="63" y="71">Server 1</text>
<rect class="n-dark" x="124" y="52" width="94" height="30" rx="3"/>
<text class="t-w mid" x="171" y="71">Server 2</text>
<rect class="n-soft" x="16" y="88" width="94" height="24" rx="3"/>
<text class="t-sm mid" x="63" y="104">count = 100</text>
<rect class="n-soft" x="124" y="88" width="94" height="24" rx="3"/>
<text class="t-sm mid" x="171" y="104">count = 100</text>
<text class="t-sm" x="16" y="136">✓ 0 ms latency</text>
<text class="t-sm" x="16" y="154">✗ నిజమైన limit = 100 × 50</text>
<text class="t-sm" x="16" y="172">✗ Server restart అయితే state పోతుంది</text>
<text class="t-sm" x="16" y="196">Sticky routing ఉంటేనే పనికొస్తుంది</text>
<rect class="n-good" x="256" y="16" width="238" height="200" rx="5"/>
<text class="t-acc" x="272" y="38">B · CENTRAL REDIS ✓</text>
<rect class="n-dark" x="272" y="52" width="94" height="30" rx="3"/>
<text class="t-w mid" x="319" y="71">Server 1</text>
<rect class="n-dark" x="380" y="52" width="94" height="30" rx="3"/>
<text class="t-w mid" x="427" y="71">Server 2</text>
<line class="ln-acc" x1="319" y1="86" x2="355" y2="104" marker-end="url(#aa)"/>
<line class="ln-acc" x1="427" y1="86" x2="391" y2="104" marker-end="url(#aa)"/>
<rect class="n-acc" x="308" y="108" width="130" height="30" rx="3"/>
<text class="t-w mid" x="373" y="128">Redis · Lua script</text>
<text class="t-sm" x="272" y="162">✓ ఖచ్చితమైన global count</text>
<text class="t-sm" x="272" y="180">✗ +0.5 ms · ✗ Redis SPOF</text>
<text class="t-sm" x="272" y="200">Lua script race ని పరిష్కరిస్తుంది</text>
<rect class="n" x="512" y="16" width="238" height="200" rx="5"/>
<text class="t-acc" x="528" y="38">C · LOCAL + GOSSIP</text>
<rect class="n-dark" x="528" y="52" width="94" height="30" rx="3"/>
<text class="t-w mid" x="575" y="71">Server 1</text>
<rect class="n-dark" x="636" y="52" width="94" height="30" rx="3"/>
<text class="t-w mid" x="683" y="71">Server 2</text>
<line class="ln-dash" x1="626" y1="67" x2="632" y2="67" marker-end="url(#a)"/>
<line class="ln-dash" x1="632" y1="96" x2="626" y2="96" marker-end="url(#a)"/>
<text class="t-sm mid" x="629" y="112">every 100 ms</text>
<text class="t-sm" x="528" y="142">✓ 0 ms hot path</text>
<text class="t-sm" x="528" y="160">✗ Sync lag వల్ల కొంత over-permit</text>
<text class="t-sm" x="528" y="180">Google Doorman ఇలానే పని చేస్తుంది.</text>
<text class="t-sm" x="528" y="198">చాలా ఎక్కువ scale కి మాత్రమే</text>
</svg>
<div class="note"><b>నేను B ఎంచుకుంటాను</b> — 0.5 ms latency budget lo ఇమిడిపోతుంది, code సులభం. QPS 1M దాటినప్పుడు మాత్రమే C గురించి ఆలోచిస్తాను, ఎందుకంటే అప్పుడు Redis round-trip ఖరీదు అవుతుంది.</div>
</div>

### Redis lo race condition — ఇది తప్పకుండా ప్రస్తావించండి

```lua
-- ❌ తప్పు: GET → లెక్క → SET. మధ్యలో వేరే server కూడా అదే చేస్తుంది.
-- ✓ సరైనది: మొత్తం logic ని Redis లోపలే ఒకే atomic step గా నడపడం.

-- token_bucket.lua  (KEYS[1] = "rl:user:42", ARGV = capacity, rate, now, cost)
local bucket   = redis.call('HMGET', KEYS[1], 'tokens', 'ts')
local capacity = tonumber(ARGV[1])
local rate     = tonumber(ARGV[2])   -- సెకనుకి tokens
local now      = tonumber(ARGV[3])
local cost     = tonumber(ARGV[4])

local tokens = tonumber(bucket[1]) or capacity
local ts     = tonumber(bucket[2]) or now

tokens = math.min(capacity, tokens + (now - ts) * rate)   -- గడిచిన కాలానికి refill

if tokens < cost then
  return {0, tokens}                                       -- 429
end

tokens = tokens - cost
redis.call('HMSET', KEYS[1], 'tokens', tokens, 'ts', now)
redis.call('EXPIRE', KEYS[1], math.ceil(capacity / rate) * 2)  -- idle keys ని వదిలించుకోవడం
return {1, tokens}
```

<div class="box warn">
<div class="lab">ఈ code lo మూడు senior details ఉన్నాయి</div>
<b>1. Lua script</b> — Redis single-threaded కాబట్టి script మొత్తం atomic. `WATCH/MULTI` కంటే ఇది simple, వేగం కూడా ఎక్కువ.<br>
<b>2. Lazy refill</b> — background timer తో tokens నింపడం లేదు. Request వచ్చినప్పుడే "ఇంతసేపట్లో ఎన్ని రావాలో" లెక్కిస్తున్నాం. 1M keys కి timers పెట్టడం అసాధ్యం, ఇది O(1).<br>
<b>3. EXPIRE</b> — ఇది లేకపోతే inactive keys Redis lo శాశ్వతంగా పేరుకుని memory తినేస్తాయి. చాలా మంది దీన్ని మర్చిపోతారు.
</div>

## 6. API Response — ఇది కూడా design lo భాగం

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 12
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1735689600
```

Client కి **ఎప్పుడు మళ్ళీ try చేయాలో** చెప్పకపోతే, అది వెంటనే retry చేసి మీ system ని ఇంకా ఎక్కువ కొడుతుంది. `Retry-After` ఇవ్వడం ఒక్క header కాదు — అది **backpressure mechanism**.

## 7. Scale &amp; Failure

| సమస్య | ఏమవుతుంది | పరిష్కారం |
|--------|-------------|-----------|
| **Redis down** | ప్రతి request కి error వస్తుంది | **Fail-open** — limiter చస్తే traffic ని allow చెయ్యి. Rate limiter ఒక optimisation, అది core business కాదు. (కానీ login/payment లాంటి చోట fail-closed) |
| **Hot key** | ఒక పెద్ద customer ఒక్క Redis shard ని వేడెక్కిస్తాడు | Key ని `user:42:{shard}` గా విడగొట్టి, limit ని shards మధ్య పంచడం |
| **Redis latency spike** | API p99 పెరుగుతుంది | Timeout 5 ms పెట్టి, timeout అయితే allow చేయడం (fail-open) |
| **Rules deployment** | కొత్త limit ఇవ్వడానికి deploy కావాలా? | Rules ని config store (etcd/S3) lo పెట్టి servers 30 సెకన్లకోసారి poll చేయడం |
| **Multi-region** | Region-1 lo 100, region-2 lo 100 → మొత్తం 200 | Region కి limit ని విభజించడం (ఒక్కో దానికి 50), లేదా global limit ని ఒకే region lo ఉంచడం. Cross-region sync విలువ చేయదు |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"First, some scoping. Are we limiting per user, per IP, or per API key? Do we want to allow bursts or smooth traffic out? And the question that actually shapes the design — does the limit need to be exact, or is roughly right good enough?"</p>
<p>"I'll assume approximate is fine. Exact distributed rate limiting requires consensus on every request, and nobody does that in production — Stripe, GitHub and AWS all run approximate limiters, because letting 103 requests through instead of 100 costs nothing."</p>
<p>"On algorithms, the naive answer is a fixed window counter, and I want to reject it explicitly: it has a <em>boundary problem</em>. A client can send 100 requests at 10:00:59 and another 100 at 10:01:01 — two hundred requests in two seconds against a limit of a hundred per minute."</p>
<p>"A sliding window log fixes that exactly, but it stores every request timestamp. At a million keys that's far too much memory for what we get."</p>
<p>"I'd go with a <em>token bucket</em>. It stores two numbers per key — the token count and the last refill timestamp — and refills lazily on read rather than with a background timer, which is what makes it O(1) in both time and memory. It also gives me two independent knobs: capacity controls how big a burst I tolerate, and refill rate controls the sustained throughput."</p>
<p>"The harder half of this problem is where the counter lives. With fifty stateless API servers, keeping counters locally means the effective limit is fifty times what we intended. So the state goes in Redis."</p>
<p>"But a naive Redis implementation has a race: read the count, compute, write it back — two servers interleave and both think they're under the limit. I'd put the whole read-compute-write into a <em>Lua script</em>, which Redis executes atomically because it's single-threaded. I'd also set an EXPIRE on the key, otherwise idle users accumulate in memory forever."</p>
<p>"On failure: if Redis is unavailable, I <em>fail open</em>. The rate limiter protects us from abuse, but it isn't the product — refusing all traffic because the limiter is down turns a partial outage into a total one. I'd make that configurable per rule though, because for something like a login endpoint or a payment API I'd rather fail closed."</p>
<p>"Finally, on the response: a 429 should always carry <em>Retry-After</em>. Without it, clients retry immediately and make the overload worse. That header is part of the backpressure design, not just documentation."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Client-side rate limiting కూడా పెట్టాలా?" | పెట్టొచ్చు, కానీ దాన్ని ఎప్పుడూ నమ్మకూడదు — client మీ control lo లేదు. అది optimisation మాత్రమే, enforcement కాదు |
| "ఒక్కో endpoint కి వేరే limit?" | Key lo endpoint ని కలపడం: `rl:{apiKey}:{endpoint}`. Rules ని ordered list గా evaluate చేసి మొదటి match తీసుకోవడం |
| "Gateway lo నా service lo?" | **Gateway lo** — అలా అయితే ప్రతి service తనకి తానుగా implement చేయనవసరం లేదు, పైగా malicious traffic backend కి చేరకముందే ఆగుతుంది |
| "Sliding window counter ఎలా పని చేస్తుంది?" | ప్రస్తుత window count + మునుపటి window count × (overlap ratio). రెండే numbers, boundary bug లేదు, ~99% ఖచ్చితం |
| "Distributed lock వాడొచ్చా?" | వద్దు. ప్రతి request కీ lock అంటే throughput చచ్చిపోతుంది. Redis Lua single-threaded atomicity ఇక్కడ lock కంటే చాలా చౌక |
| "Abuse detection తో ఎలా కలపాలి?" | 429 events ని stream lo పంపి, ఒక detector నిరంతరం limit కొడుతున్న keys ని గుర్తించి ఎక్కువ కాలం block చేయడం (tarpit) |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">03</div>
<div class="kicker">Problem 03 · The Most Important Trade-off</div>
<div class="title">Design a News Feed<br>(Twitter / Instagram)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>అత్యధికం</b> · నేర్పే concepts: fan-out write vs read, hybrid, celebrity problem, feed cache</div>
</div>

## 1. The Ask

> "Design the home timeline for Twitter. A user opens the app and sees recent posts from everyone they follow, newest first."

<div class="box warn">
<div class="lab">ఇది ఎందుకు అన్నిటికంటే ముఖ్యమైన problem</div>
ఈ problem lo ఉన్న <b>fan-out on write vs fan-out on read</b> అనే trade-off — system design మొత్తంలో అతి ముఖ్యమైన pattern. ఇదే idea Instagram feed, YouTube subscriptions, LinkedIn timeline, Slack channels, notification systems — అన్నిచోట్లా తిరిగి వస్తుంది. ఇది ఒక్కసారి సరిగ్గా అర్థమైతే, 5 వేరే problems కి జవాబు వచ్చినట్టే.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | సాధారణ జవాబు |
|--------|----------------|--------------|
| Feed chronological నా ranked నా? | Ranked అంటే ML scoring pipeline మొత్తం అదనంగా వస్తుంది | ముందు chronological, తర్వాత ranking |
| ఒక user సగటున ఎంత మందిని follow చేస్తాడు? | Fan-out ఖర్చు ఇక్కడి నుంచే | ~200 |
| **గరిష్ఠంగా ఎంత మంది followers?** | ఇదే celebrity problem ని బయటపెట్టే ప్రశ్న | 100 M+ |
| Post lo ఏముంటుంది — text, image, video? | Media storage + CDN అవసరమా | Text + images |
| Feed ఎంత తాజాగా ఉండాలి? | Seconds అంటే push, నిమిషాలు అంటే pull కూడా చాలు | కొన్ని సెకన్లు |
| Edit / delete ఉందా? | ఉంటే fan-out చేసిన copies అన్నీ సరిచేయాలి | Delete ఉంది, edit లేదు |

<div class="box info">
<div class="lab">"గరిష్ఠంగా ఎంత మంది followers?" — ఈ ఒక్క ప్రశ్న interview ని మారుస్తుంది</div>
సగటు 200. కానీ గరిష్ఠం 100 million. ఈ <b>అసమానతే</b> ఈ problem ని కష్టతరం చేస్తుంది. ఇది మీరే గుర్తించి బయటికి చెప్తే, interviewer వెంటనే మీరు దీన్ని ఇంతకుముందు ఆలోచించారని అర్థం చేసుకుంటాడు.
</div>

## 3. Estimation

| Step | లెక్క | ఫలితం |
|------|-------|--------|
| DAU | ఇచ్చినది | 300 M |
| Posts / day | 300M × 0.3 (30% మంది రాస్తారు) | 90 M |
| **Write QPS** | 90M ÷ 86,400 | **≈ 1,000 / sec** (peak ≈ 5,000) |
| Feed opens / day | 300M × 10 | 3 B |
| **Read QPS** | 3B ÷ 86,400 | **≈ 35,000 / sec** (peak ≈ 150,000) |
| Read : Write | 35,000 : 1,000 | **35 : 1 — read-heavy** |
| **Fan-out writes / sec** | 1,000 posts × 200 followers | **200,000 feed inserts / sec** |
| Post size | text 300 B + metadata | ≈ 1 KB |
| Post storage / year | 90M × 365 × 1 KB | ≈ 33 TB |
| Feed cache | 300M users × 500 post-ids × 8 B | ≈ 1.2 TB (active users కే ఉంచితే చాలా తక్కువ) |

<div class="box warn">
<div class="lab">ఈ ఒక్క number ని బోర్డ్ మీద పెద్దగా రాయండి</div>
<b>1,000 posts/sec → 200,000 feed writes/sec.</b> ఒక్క post 200 రెట్లు అమ్ప్లిఫై అవుతోంది. అదే fan-out. మరి 100 million followers ఉన్న celebrity post చేస్తే? <b>ఒక్క write → 100 million writes.</b> ఇక్కడే మొత్తం design విరిగిపోతుంది.
</div>

## 4. Deep Dive — Fan-out on Write vs Read

<div class="fig">
<div class="cap">the central trade-off · పని ఎప్పుడు చేయాలి</div>
<svg viewBox="0 0 750 300">
<rect class="n" x="0" y="14" width="360" height="272" rx="6"/>
<text class="t-acc" x="18" y="38">A · FAN-OUT ON WRITE (push)</text>
<rect class="n-dark" x="18" y="52" width="90" height="30" rx="3"/>
<text class="t-w mid" x="63" y="71">Post</text>
<line class="ln-acc" x1="112" y1="67" x2="150" y2="67" marker-end="url(#aa)"/>
<rect class="n-acc" x="154" y="52" width="100" height="30" rx="3"/>
<text class="t-w mid" x="204" y="71">Fan-out job</text>
<line class="ln-acc" x1="204" y1="86" x2="120" y2="112" marker-end="url(#aa)"/>
<line class="ln-acc" x1="204" y1="86" x2="204" y2="112" marker-end="url(#aa)"/>
<line class="ln-acc" x1="204" y1="86" x2="290" y2="112" marker-end="url(#aa)"/>
<rect class="n-info" x="70" y="116" width="94" height="26" rx="3"/>
<text class="t-sm mid" x="117" y="133">feed:userA</text>
<rect class="n-info" x="170" y="116" width="94" height="26" rx="3"/>
<text class="t-sm mid" x="217" y="133">feed:userB</text>
<rect class="n-info" x="270" y="116" width="80" height="26" rx="3"/>
<text class="t-sm mid" x="310" y="133">…200 more</text>
<text class="t-sm" x="18" y="168">Post చేసినప్పుడే followers అందరి</text>
<text class="t-sm" x="18" y="184">feed lo post-id ని ముందే రాసేయడం.</text>
<text class="t mid" x="180" y="212">Read = ఒక్క Redis LRANGE</text>
<rect class="n-good" x="18" y="222" width="324" height="26" rx="3"/>
<text class="t-sm mid" x="180" y="239">✓ Feed open ~5 ms — ముందే సిద్ధంగా ఉంది</text>
<rect class="n-bad" x="18" y="252" width="324" height="26" rx="3"/>
<text class="t-sm mid" x="180" y="269">✗ Celebrity post = 100M writes. Feed లోకి రావడం ఆలస్యం</text>
<rect class="n" x="390" y="14" width="360" height="272" rx="6"/>
<text class="t-acc" x="408" y="38">B · FAN-OUT ON READ (pull)</text>
<rect class="n-dark" x="408" y="52" width="90" height="30" rx="3"/>
<text class="t-w mid" x="453" y="71">Post</text>
<line class="ln" x1="502" y1="67" x2="540" y2="67" marker-end="url(#a)"/>
<rect class="n-soft" x="544" y="52" width="110" height="30" rx="3"/>
<text class="t-sm mid" x="599" y="71">posts table only</text>
<text class="t-sm" x="408" y="104">Post చేసినప్పుడు ఒకే ఒక్క write.</text>
<text class="t-sm" x="408" y="120">పని అంతా read time కి వాయిదా.</text>
<rect class="n-dark" x="408" y="132" width="90" height="28" rx="3"/>
<text class="t-w mid" x="453" y="150">Feed open</text>
<line class="ln-acc" x1="502" y1="146" x2="536" y2="146" marker-end="url(#aa)"/>
<rect class="n-acc" x="540" y="132" width="180" height="28" rx="3"/>
<text class="t-w mid" x="630" y="150">200 మంది posts తెచ్చి merge</text>
<rect class="n-good" x="408" y="180" width="324" height="26" rx="3"/>
<text class="t-sm mid" x="570" y="197">✓ Write చౌక · celebrity problem లేదు</text>
<rect class="n-bad" x="408" y="212" width="324" height="42" rx="3"/>
<text class="t-sm mid" x="570" y="230">✗ ప్రతి feed open కి 200 queries + merge</text>
<text class="t-sm mid" x="570" y="246">35,000 QPS × 200 = 7M queries/sec. అసాధ్యం</text>
<text class="t-acc mid" x="570" y="274">Read-heavy system lo read ని ఖరీదు చేయడం తప్పు</text>
</svg>
</div>

| | Fan-out on **write** (push) | Fan-out on **read** (pull) |
|--|---------------------------|----------------------------|
| పని ఎప్పుడు | Post చేసినప్పుడు | Feed చూసినప్పుడు |
| Read latency | **~5 ms** (ముందే సిద్ధం) | ~500 ms (200 queries + merge + sort) |
| Write ఖర్చు | followers సంఖ్యకి సమానం | O(1) |
| Storage | ఎక్కువ (ప్రతి user కీ copy) | తక్కువ |
| Celebrity | 💀 విరిగిపోతుంది | ✅ ఇబ్బంది లేదు |
| Inactive users | వృథా పని (వాళ్ళు ఎప్పటికీ చూడరు) | వృథా లేదు |

<div class="box good">
<div class="lab">నా Choice · Hybrid — ఇదే నిజమైన జవాబు</div>
"రెండూ కాదు — <b>రెండూనూ</b>. సాధారణ users (99.9%) కి <b>push</b> చేస్తాను, ఎందుకంటే వాళ్ళకి 200 followers మాత్రమే, fan-out చౌక. Celebrities కి (ఒక threshold, ఉదా. 100K followers దాటినవాళ్ళు) <b>push చేయను</b> — వాళ్ళ posts ని read time lo merge చేస్తాను. అంటే feed open అయినప్పుడు: ముందే సిద్ధంగా ఉన్న cached feed + నేను follow చేసే celebrities యొక్క తాజా posts (అది ఒక 10-20 మంది మాత్రమే) — ఈ రెండింటినీ merge చేసి ఇస్తాను. దీంతో fan-out పేలుడూ లేదు, read explosion లేదు."
</div>

<div class="fig">
<div class="cap">hybrid feed · ఒక feed open అయినప్పుడు జరిగేది</div>
<svg viewBox="0 0 750 210">
<rect class="n-dark" x="0" y="80" width="96" height="40" rx="4"/>
<text class="t-w mid" x="48" y="98">Feed API</text>
<text class="t-w-sm mid" x="48" y="112">GET /feed</text>
<line class="ln" x1="100" y1="92" x2="150" y2="52" marker-end="url(#a)"/>
<line class="ln" x1="100" y1="108" x2="150" y2="148" marker-end="url(#a)"/>
<rect class="n-info" x="154" y="26" width="200" height="52" rx="4"/>
<text class="t mid" x="254" y="46">Precomputed feed</text>
<text class="t-sm mid" x="254" y="62">Redis · LRANGE feed:u42 0 49</text>
<text class="t-sm mid" x="254" y="90">సాధారణ users నుంచి · ~2 ms</text>
<rect class="n-soft" x="154" y="122" width="200" height="52" rx="4"/>
<text class="t mid" x="254" y="142">Celebrity posts</text>
<text class="t-sm mid" x="254" y="158">నేను follow చేసే 15 celebs</text>
<text class="t-sm mid" x="254" y="186">Read time lo query · ~8 ms</text>
<line class="ln-acc" x1="358" y1="52" x2="410" y2="92" marker-end="url(#aa)"/>
<line class="ln-acc" x1="358" y1="148" x2="410" y2="108" marker-end="url(#aa)"/>
<rect class="n-acc" x="414" y="78" width="130" height="44" rx="4"/>
<text class="t-w mid" x="479" y="97">Merge + Rank</text>
<text class="t-w-sm mid" x="479" y="112">time / score ప్రకారం</text>
<line class="ln" x1="548" y1="100" x2="592" y2="100" marker-end="url(#a)"/>
<rect class="n-good" x="596" y="78" width="150" height="44" rx="4"/>
<text class="t mid" x="671" y="97">Hydrate + return</text>
<text class="t-sm mid" x="671" y="112">post-ids → పూర్తి posts</text>
</svg>
<div class="note"><b>Feed cache lo post-ids మాత్రమే ఉంటాయి, పూర్తి posts కాదు.</b> ఒక post 1 KB, ఒక id 8 bytes — 300M users × 500 posts lo ఈ తేడా 150 TB vs 1.2 TB. Hydration ని చివర్లో ఒక్క batch call తో చేస్తాం.</div>
</div>

## 5. Data Model &amp; Architecture

| Store | ఏముంటుంది | ఎందుకు ఈ store |
|-------|------------|-----------------|
| `posts` — Cassandra | post_id (Snowflake), user_id, text, media_url, created_at | Write-heavy, append-only, sharded by post_id |
| `follows` — MySQL/Graph | follower_id → followee_id (రెండు దిక్కులా index) | "నా followers ఎవరు" + "నేను ఎవరిని follow చేస్తున్నాను" రెండూ కావాలి |
| `feed:{userId}` — Redis List | ఇటీవలి 500 post-ids | O(1) LPUSH, LTRIM తో పరిమాణం అదుపు |
| `celebrity_set` — Redis Set | Followers > 100K ఉన్న user-ids | Fan-out ముందు ఒక్క lookup |

<div class="fig">
<div class="cap">news feed · write path (fan-out)</div>
<svg viewBox="0 0 750 250">
<rect class="n" x="0" y="100" width="80" height="40" rx="4"/>
<text class="t mid" x="40" y="125">User</text>
<line class="ln" x1="84" y1="120" x2="112" y2="120" marker-end="url(#a)"/>
<rect class="n-dark" x="116" y="100" width="100" height="40" rx="4"/>
<text class="t-w mid" x="166" y="118">Post Service</text>
<text class="t-w-sm mid" x="166" y="132">write + validate</text>
<line class="ln" x1="166" y1="96" x2="166" y2="60" marker-end="url(#a)"/>
<rect class="n-soft" x="106" y="16" width="120" height="40" rx="4"/>
<text class="t mid" x="166" y="34">posts (Cassandra)</text>
<text class="t-sm mid" x="166" y="48">source of truth</text>
<line class="ln" x1="220" y1="120" x2="248" y2="120" marker-end="url(#a)"/>
<rect class="n-acc" x="252" y="100" width="96" height="40" rx="4"/>
<text class="t-w mid" x="300" y="118">Kafka</text>
<text class="t-w-sm mid" x="300" y="132">post-created</text>
<line class="ln" x1="352" y1="120" x2="380" y2="120" marker-end="url(#a)"/>
<rect class="n-dark" x="384" y="92" width="130" height="56" rx="4"/>
<text class="t-w mid" x="449" y="112">Fan-out Workers</text>
<text class="t-w-sm mid" x="449" y="128">followers తెచ్చి</text>
<text class="t-w-sm mid" x="449" y="142">feed lo LPUSH</text>
<line class="ln-acc" x1="449" y1="88" x2="449" y2="60" marker-end="url(#aa)"/>
<rect class="n-bad" x="374" y="16" width="150" height="40" rx="4"/>
<text class="t mid" x="449" y="34">Celebrity? → skip</text>
<text class="t-sm mid" x="449" y="48">read time lo merge అవుతుంది</text>
<line class="ln" x1="518" y1="120" x2="556" y2="120" marker-end="url(#a)"/>
<rect class="n-info" x="560" y="92" width="180" height="56" rx="4"/>
<text class="t mid" x="650" y="112">Redis feed cache</text>
<text class="t-sm mid" x="650" y="128">LPUSH feed:u1 postId</text>
<text class="t-sm mid" x="650" y="142">LTRIM feed:u1 0 499</text>
<line class="ln-dash" x1="449" y1="152" x2="449" y2="186" marker-end="url(#a)"/>
<rect class="n-soft" x="344" y="190" width="210" height="40" rx="4"/>
<text class="t mid" x="449" y="208">Active users కి మాత్రమే fan-out</text>
<text class="t-sm mid" x="449" y="224">30 రోజుల్లో login కానివాళ్ళని వదిలేయడం</text>
</svg>
<div class="note">Post write మరియు fan-out ని <b>Kafka తో విడదీయడం</b> ముఖ్యం. లేకపోతే celebrity post చేసినప్పుడు అతని API call 100M writes పూర్తయ్యేదాకా వేలాడుతుంది. ఇప్పుడు post ఒక్క write తో success అవుతుంది, fan-out background lo జరుగుతుంది.</div>
</div>

## 6. Scale, Bottlenecks &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Celebrity fan-out** | Threshold దాటినవాళ్ళకి push చేయకపోవడం (పైన చెప్పిన hybrid) |
| **Inactive users కి వృథా fan-out** | 30 రోజుల్లో active అయినవాళ్ళకే push. మిగతావాళ్ళు తిరిగి వచ్చినప్పుడు feed ని on-demand rebuild చేయడం. ఇది fan-out పనిని 60-70% తగ్గిస్తుంది |
| **Feed cache పరిమాణం** | `LTRIM 0 499` — ఎవరూ 500 posts కంటే వెనక్కి scroll చేయరు. అంతకంటే వెనక్కి వెళ్తే DB నుంచి |
| **Redis node down** | Feed ఒక cache మాత్రమే, source of truth కాదు. Cache miss అయితే posts నుంచి rebuild (నెమ్మది కానీ correct) |
| **Fan-out worker వెనకబడటం** | Kafka lag monitor చేయడం. Celebrity posts కి వేరే priority topic — సాధారణ posts వెనక వాటిని ఆపకుండా |
| **Post delete** | Feed cache నుంచి తీసేయడం ఖరీదు (100M lists). బదులుగా **read time lo filter** — hydration lo deleted posts ని వదిలేయడం. ఇది "tombstone" approach |
| **Duplicate posts feed lo** | Fan-out at-least-once కాబట్టి retry లో duplicate రావొచ్చు. Redis Sorted Set (score = post_id) వాడితే dedupe ఉచితం |

<div class="box info">
<div class="lab">Ranking కి jump ఎప్పుడు చేయాలి</div>
Interviewer "chronological కాకుండా ranked feed ఎలా?" అని అడిగితే: "Feed cache lo ఇప్పటికీ candidate post-ids ఉంటాయి. Read time lo ఒక ranking service ఆ 500 candidates ని తీసుకుని — recency, engagement rate, author affinity, media type లాంటి features తో score చేసి top 50 ఇస్తుంది. Architecture మారదు; <b>merge step కి ఒక scoring step చేరుతుంది</b> అంతే." ఈ జవాబు మీ design flexible అని నిరూపిస్తుంది.
</div>

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me confirm scope first: chronological or ranked, roughly how many people does a user follow, and — the one that matters most — what's the <em>maximum</em> follower count? If the answer is a hundred million, that single number changes the entire design."</p>
<p>"I'll assume 300 million daily users, 90 million posts a day, and each user opening the feed about ten times. That's roughly a thousand writes a second against thirty-five thousand reads a second, so this is heavily read-dominated — which tells me I should be willing to pay on the write path to make reads cheap."</p>
<p>"But here's the amplification: a thousand posts a second times two hundred followers is <em>two hundred thousand feed writes a second</em>. That's the number worth writing on the board."</p>
<p>"There are two ways to build this. Fan-out on write means when you post, I immediately push the post ID into the precomputed feed list of every follower. Reading is then a single Redis range query — about five milliseconds. Fan-out on read means I store the post once and, when you open the feed, I go fetch posts from all two hundred people you follow and merge them. Writing is cheap, but reading becomes two hundred queries — at thirty-five thousand reads a second that's seven million queries a second. In a read-heavy system, making reads expensive is the wrong direction."</p>
<p>"So push looks right — except for celebrities. Someone with a hundred million followers turns one write into a hundred million writes, and their post takes minutes to finish propagating."</p>
<p>"My answer is a <em>hybrid</em>. Normal users get pushed, because two hundred writes is nothing. Accounts above a threshold — say a hundred thousand followers — are excluded from fan-out entirely. When you open your feed I read your precomputed list, then separately fetch recent posts from the handful of celebrities you follow, and merge the two. You typically follow fifteen or twenty of those, so it's a small, bounded read."</p>
<p>"Two implementation details I'd call out. First, the feed cache stores <em>post IDs, not posts</em> — eight bytes instead of a kilobyte, which is the difference between a terabyte and a hundred and fifty terabytes. I hydrate the full posts in one batch call at the end. Second, fan-out runs off Kafka rather than inline, so the poster's request returns after one write instead of waiting for the fan-out to finish."</p>
<p>"For efficiency I'd only fan out to users active in the last thirty days. Most accounts are dormant and will never read that feed — skipping them cuts fan-out work by more than half. When a dormant user returns, I rebuild their feed on demand."</p>
<p>"On deletes: removing a post from millions of cached feeds is prohibitively expensive, so I'd filter at read time during hydration instead — a tombstone approach. Slightly wasteful, dramatically cheaper."</p>
<p>"If you'd like, the two areas I'd go deeper on are how ranking slots into this, and how I'd keep the fan-out workers from falling behind during a traffic spike."</p>
</div>

## 7. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Celebrity threshold ఎంత?" | Fixed number కంటే **cost-based** మేలు: fan-out ఖర్చు (followers × write cost) vs read-merge ఖర్చు — ఏది తక్కువో అది. ఆచరణలో 100K తో మొదలుపెట్టి metrics చూసి tune చేయడం |
| "Pagination ఎలా?" | Offset వాడొద్దు — కొత్త posts వస్తే items repeat/skip అవుతాయి. **Cursor** వాడాలి: చివరి post_id. Snowflake ids time-sortable కాబట్టి ఇది సహజంగా పని చేస్తుంది |
| "కొత్తగా follow చేస్తే?" | ఆ user యొక్క ఇటీవలి posts ని feed lo backfill చేయడం (async). లేదా ఏమీ చేయకుండా వదిలేయడం — తర్వాతి posts నుంచే కనిపిస్తాయి |
| "Feed lo ads ఎలా?" | Merge step తర్వాత ఒక injection step — ప్రతి 5వ position lo ad slot. Feed pipeline lo ఇంకో stage మాత్రమే |
| "Twitter vs Instagram తేడా?" | Twitter చాలా ఎక్కువ chronological + higher post rate. Instagram ranking-heavy + media-heavy కాబట్టి CDN, image variants ఎక్కువ ముఖ్యం |
| "Fan-out worker crash అయితే posts పోతాయా?" | లేదు — Kafka offset commit ని fan-out పూర్తయ్యాకే చేయడం. At-least-once అవుతుంది, duplicates ని Sorted Set dedupe చూసుకుంటుంది |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">04</div>
<div class="kicker">Problem 04 · Stateful Connections</div>
<div class="title">Design a Chat System<br>(WhatsApp / Messenger)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>అత్యధికం</b> · నేర్పే concepts: WebSockets, presence, ordering, delivery receipts, offline queue</div>
</div>

## 1. The Ask

> "Design WhatsApp. One-to-one messaging, group chats, online status, and the blue ticks."

ఇంతకుముందు problems అన్నీ **request-response** (client అడుగుతుంది, server జవాబిస్తుంది). ఇది వేరే జాతి — ఇక్కడ **server కి క్లయింట్‌ని pushచేయాలి**. అదే ఈ problem యొక్క కొత్తదనం.

<div class="grid">
<div class="card">
<div class="t">కొత్త కష్టం 1</div>
<div class="s">Server నుంచి client కి push. HTTP request-response తో ఇది కాదు — persistent connection కావాలి.</div>
</div>
<div class="card">
<div class="t">కొత్త కష్టం 2</div>
<div class="s">Servers ఇప్పుడు <b>stateful</b>. "User 42 ఏ server తో connect అయ్యాడు?" అని తెలియాలి.</div>
</div>
<div class="card">
<div class="t">కొత్త కష్టం 3</div>
<div class="s">Receiver offline ఉంటే? Message ని ఎక్కడ దాచాలి, ఎప్పుడు ఇవ్వాలి, ఎప్పుడు తీసేయాలి.</div>
</div>
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| 1:1 మాత్రమేనా, groups కూడానా? | Group అంటే fan-out మళ్ళీ వస్తుంది | రెండూ |
| Group గరిష్ఠ పరిమాణం? | 256 vs 100,000 — పూర్తిగా వేరే designs | 256 (WhatsApp limit) |
| Message history ఎంతకాలం? | Server lo permanent నా, delivery తర్వాత delete నా | WhatsApp: delivery తర్వాత delete. మనం 30 రోజులు ఉంచుదాం |
| End-to-end encryption ఉందా? | ఉంటే server content చూడలేదు → search, moderation సాధ్యం కాదు | ఉంది (కానీ scope బయట) |
| Media (photos, video)? | వేరే upload path + CDN | అవును |
| Online status / last seen? | Presence system — దీనికి ప్రత్యేక fan-out సమస్య ఉంది | అవును |
| Multi-device? | ఒకే user కి బహుళ connections | అవును |

## 3. Estimation

| Step | లెక్క | ఫలితం |
|------|-------|--------|
| DAU | ఇచ్చినది | 500 M |
| Messages / user / day | ఇచ్చినది | 40 |
| Messages / day | 500M × 40 | 20 B |
| **Avg QPS** | 20B ÷ 86,400 | **≈ 230,000 / sec** |
| Peak QPS | avg × 3 | ≈ 700,000 / sec |
| Message size | text ~100 B + metadata ~100 B | ≈ 200 B |
| Storage / day | 20B × 200 B | **≈ 4 TB / day** |
| 30 రోజుల storage | 4 TB × 30 | ≈ 120 TB |
| **Concurrent connections** | 500M DAU lo ~20% ఒకేసారి | **≈ 100 M open sockets** |
| ఒక server ఎన్ని sockets? | Tuned Linux box ≈ 100K | **≈ 1,000 gateway servers** |

<div class="box warn">
<div class="lab">ఈ number ని బోర్డ్ మీద రాయండి</div>
<b>100 million concurrent WebSocket connections.</b> ఇదే ఈ problem lo అసలు constraint — QPS కాదు. Stateless API servers అయితే load balancer ఏ server కైనా పంపొచ్చు. కానీ ఇక్కడ user 42 కి message పంపాలంటే, <b>అతను ఏ ఒక్క server తో connect అయ్యాడో సరిగ్గా ఆ server కే</b> వెళ్ళాలి. ఇది routing problem — ఇంతకుముందు problems lo ఇది లేదు.
</div>

## 4. Deep Dive — Connection ఎలా ఉంచాలి?

| Option | ఎలా | Verdict |
|--------|-----|---------|
| **Polling** | ప్రతి 2 సెకన్లకి "కొత్త message ఉందా?" | ❌ 500M × ప్రతి 2s = అపారమైన వృథా traffic, latency కూడా చెడ్డది |
| **Long polling** | Request ని server పట్టుకుని, message వచ్చినప్పుడు జవాబివ్వడం | ⚠️ పని చేస్తుంది, కానీ ప్రతి message తర్వాత reconnect. Client → server పంపడానికి వేరే request |
| **SSE** | Server-sent events — ఒక దిక్కు stream | ⚠️ Server→client మాత్రమే. Chat కి రెండు దిక్కులా కావాలి |
| **WebSocket** | ఒకసారి handshake, తర్వాత full-duplex | ✅ **ఇదే సరైనది.** ఒకే connection lo రెండు దిక్కులా, తక్కువ overhead |

<div class="fig">
<div class="cap">chat architecture · connection routing</div>
<svg viewBox="0 0 750 290">
<rect class="n" x="0" y="30" width="80" height="40" rx="4"/>
<text class="t mid" x="40" y="48">Alice</text>
<text class="t-sm mid" x="40" y="62">phone</text>
<line class="ln-acc" x1="84" y1="50" x2="122" y2="50" marker-end="url(#aa)"/>
<text class="t-sm mid" x="103" y="42">WS</text>
<rect class="n-dark" x="126" y="26" width="110" height="48" rx="4"/>
<text class="t-w mid" x="181" y="46">Gateway 7</text>
<text class="t-w-sm mid" x="181" y="62">100K sockets</text>
<line class="ln" x1="240" y1="50" x2="278" y2="50" marker-end="url(#a)"/>
<rect class="n-acc" x="282" y="26" width="120" height="48" rx="4"/>
<text class="t-w mid" x="342" y="46">Chat Service</text>
<text class="t-w-sm mid" x="342" y="62">persist + route</text>
<line class="ln" x1="342" y1="78" x2="342" y2="112" marker-end="url(#a)"/>
<rect class="n-soft" x="262" y="116" width="160" height="44" rx="4"/>
<text class="t mid" x="342" y="136">Cassandra</text>
<text class="t-sm mid" x="342" y="152">messages · sharded by chat_id</text>
<line class="ln-acc" x1="406" y1="50" x2="444" y2="50" marker-end="url(#aa)"/>
<rect class="n-info" x="448" y="26" width="150" height="48" rx="4"/>
<text class="t mid" x="523" y="44">Session Registry</text>
<text class="t-sm mid" x="523" y="60">Redis: user42 → gw3</text>
<line class="ln-acc" x1="523" y1="78" x2="523" y2="112" marker-end="url(#aa)"/>
<rect class="n-dark" x="468" y="116" width="110" height="48" rx="4"/>
<text class="t-w mid" x="523" y="136">Gateway 3</text>
<text class="t-w-sm mid" x="523" y="152">Bob ఇక్కడ ఉన్నాడు</text>
<line class="ln-acc" x1="582" y1="140" x2="620" y2="140" marker-end="url(#aa)"/>
<rect class="n" x="624" y="120" width="80" height="40" rx="4"/>
<text class="t mid" x="664" y="138">Bob</text>
<text class="t-sm mid" x="664" y="152">phone</text>
<line class="ln-dash" x1="342" y1="164" x2="342" y2="200" marker-end="url(#a)"/>
<rect class="n-bad" x="222" y="204" width="240" height="46" rx="4"/>
<text class="t mid" x="342" y="224">Bob offline అయితే</text>
<text class="t-sm mid" x="342" y="240">offline queue lo store + push notification (APNs/FCM)</text>
<text class="t-xs" x="0" y="278">SESSION REGISTRY లేకపోతే — Bob కి message పంపడానికి 1,000 gateways అన్నిటినీ అడగాలి</text>
</svg>
<div class="note"><b>Session Registry</b> ఈ design యొక్క గుండె. "ఏ user ఏ gateway మీద ఉన్నాడు" అనే map. Gateway crash అయితే ఆ entries TTL తో తమంతట తామే పోవాలి — అందుకే heartbeat తో refresh అయ్యే short TTL (~30s) పెట్టాలి.</div>
</div>

## 5. Deep Dive — Message Ordering (ఇది తప్పకుండా అడుగుతారు)

**సమస్య:** Alice రెండు messages వరుసగా పంపింది. అవి రెండు వేరే servers గుండా వెళ్ళి, Bob కి తప్పు వరుసలో చేరాయి.

| Approach | సమస్య |
|----------|--------|
| Client timestamp | Client clocks తప్పుగా ఉంటాయి. User తన phone time మార్చొచ్చు |
| Server timestamp | Servers మధ్య clock drift (NTP అయినా milliseconds తేడా). రెండు messages ఒకే ms lo వస్తే tie |
| Global sequence number | పని చేస్తుంది కానీ ఒక global counter అంటే bottleneck + SPOF |
| **Per-conversation sequence** ✅ | ఒక్కో chat కి ఒక counter. `chat_id` shard lo atomic increment. Conversations మధ్య order అవసరం లేదు — **ఒక chat లోపల మాత్రమే order ముఖ్యం** |

<div class="box good">
<div class="lab">ఇక్కడ చెప్పాల్సిన insight</div>
"Global ordering అవసరం లేదు — అది over-engineering. Alice-Bob chat lo messages order lo ఉండాలి, కానీ ఆ chat కీ Charlie-Dave chat కీ మధ్య order ఎవరూ చూడరు. అందుకే <b>per-conversation sequence number</b> చాలు. ఇది సహజంగా shard అవుతుంది — <code>chat_id</code> ఏ shard lo ఉందో అక్కడే counter, cross-shard coordination అవసరం లేదు." — ఈ "అవసరమైన దానికంటే బలహీనమైన guarantee ఎంచుకోవడం" అనేదే senior thinking.
</div>

## 6. Deep Dive — మూడు Ticks (delivery receipts)

<div class="fig">
<div class="cap">sent · delivered · read — మూడు వేర్వేరు acknowledgements</div>
<svg viewBox="0 0 750 230">
<rect class="n" x="20" y="20" width="86" height="30" rx="4"/>
<text class="t mid" x="63" y="40">Alice</text>
<rect class="n-dark" x="332" y="20" width="86" height="30" rx="4"/>
<text class="t-w mid" x="375" y="40">Server</text>
<rect class="n" x="644" y="20" width="86" height="30" rx="4"/>
<text class="t mid" x="687" y="40">Bob</text>
<line class="ln-thin" x1="63" y1="54" x2="63" y2="220"/>
<line class="ln-thin" x1="375" y1="54" x2="375" y2="220"/>
<line class="ln-thin" x1="687" y1="54" x2="687" y2="220"/>
<line class="ln" x1="66" y1="76" x2="370" y2="76" marker-end="url(#a)"/>
<text class="t-sm mid" x="218" y="70">send(msg)</text>
<line class="ln-acc" x1="372" y1="102" x2="68" y2="102" marker-end="url(#aa)"/>
<text class="t-acc mid" x="218" y="96">ack — ✓ ONE TICK (server కి చేరింది)</text>
<line class="ln" x1="378" y1="128" x2="682" y2="128" marker-end="url(#a)"/>
<text class="t-sm mid" x="530" y="122">deliver(msg)</text>
<line class="ln-acc" x1="684" y1="154" x2="380" y2="154" marker-end="url(#aa)"/>
<text class="t-acc mid" x="530" y="148">delivered-ack</text>
<line class="ln-acc" x1="372" y1="180" x2="68" y2="180" marker-end="url(#aa)"/>
<text class="t-acc mid" x="218" y="174">✓✓ TWO TICKS (Bob phone lo ఉంది)</text>
<line class="ln-acc" x1="684" y1="210" x2="68" y2="210" marker-end="url(#aa)"/>
<text class="t-acc mid" x="375" y="204">Bob chat తెరిచాడు → ✓✓ BLUE TICKS (చదివాడు)</text>
</svg>
<div class="note">మూడూ వేర్వేరు events, వేర్వేరు సమయాల్లో వస్తాయి. Blue tick కి <b>వేరే ack</b> కావాలి — message phone కి చేరడం వేరు, user చూడడం వేరు. చాలా మంది candidates ఈ తేడాని మిస్ అవుతారు.</div>
</div>

## 7. Deep Dive — Presence (online status) యొక్క దాచిన బాంబు

**సమస్య:** Alice కి 500 contacts ఉన్నారు. ఆమె online అయితే 500 మందికీ చెప్పాలా? 100M users × ప్రతి connect/disconnect = presence fan-out పేలుతుంది.

| Approach | ఖర్చు | Verdict |
|----------|-------|---------|
| Online అయినప్పుడు contacts అందరికీ push | 100M × 500 = 50 B events | ❌ Message traffic కంటే presence traffic ఎక్కువవుతుంది |
| **Pull on demand** ✅ | Chat list తెరిచినప్పుడు కనిపించే 20 మంది status ని మాత్రమే అడగడం | ✅ 500 కాదు, 20. 25× తక్కువ |
| Heartbeat + TTL | Client ప్రతి 30s కి `SET presence:u42 online EX 45`. Key లేకపోతే offline | ✅ Server crash అయినా status తనంతట తానే సరిచేసుకుంటుంది |

<div class="box info">
<div class="lab">ఇలా చెప్పండి</div>
"Presence ని <b>eventually consistent, pull-based</b> గా చేస్తాను. Last-seen 30 సెకన్లు పాతది అయినా ఎవరూ గమనించరు — ఇది chat message కాదు. ఈ ఒక్క నిర్ణయం presence traffic ని 25 రెట్లు తగ్గిస్తుంది. Presence కోసం message system ని ఖరీదు చేయడం విలువ లేని పని."
</div>

## 8. Group Chat — News Feed మళ్ళీ ఇక్కడ

Group lo 256 మంది. Message వచ్చినప్పుడు 256 copies రాయాలా, లేక ఒక్కటి రాసి అందరూ చదవాలా?

| | Fan-out on write | Fan-out on read |
|--|------------------|-----------------|
| 256 members | 256 inserts — పెద్ద ఖర్చు కాదు | 1 insert, 256 reads |
| **Verdict** | ✅ **256 చిన్న సంఖ్య** కాబట్టి write fan-out సరిపోతుంది. ఇక్కడ celebrity problem లేదు (group size capped) | Group size unlimited అయితే మాత్రమే |

<div class="box warn">
<div class="lab">ఇక్కడ News Feed తో connect చేయండి</div>
"News feed lo fan-out on write విరిగింది ఎందుకంటే followers unbounded (100M). ఇక్కడ group size <b>256 కి capped</b> కాబట్టి అదే approach బాగా పని చేస్తుంది. <b>Bound ఉందా లేదా అన్నదే</b> ఆ నిర్ణయాన్ని మారుస్తుంది — problem పేరు కాదు." ఇలా రెండు problems ని కలిపి మాట్లాడితే interviewer కి మీరు pattern ని అర్థం చేసుకున్నారని తెలుస్తుంది.
</div>

## 9. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Gateway crash** | ఆ 100K users disconnect అవుతారు, client auto-reconnect చేసి వేరే gateway కి వెళ్తాడు. Session registry entries TTL తో పోతాయి. Reconnect అయ్యాక client `last_seq` పంపి missed messages తెచ్చుకుంటాడు |
| **Message duplicate** | Client-generated `message_id` (UUID). Server అదే id మళ్ళీ వస్తే ignore చేస్తుంది — idempotent write |
| **Offline user** | Message ని offline queue lo (Cassandra) store చేసి, push notification పంపడం. User తిరిగి వచ్చాక queue drain |
| **Load balancer stickiness** | WebSocket కాబట్టి connection ఒకే server కి అంటుకుని ఉండాలి. L4 LB + connection-aware routing |
| **Thundering herd on restart** | Deploy చేసినప్పుడు 100K clients ఒకేసారి reconnect. **Jittered exponential backoff** client side lo తప్పనిసరి |
| **Hot chat (పెద్ద group)** | `chat_id` shard వేడెక్కుతుంది. Group messages ని `(chat_id, time_bucket)` తో sub-shard చేయడం |
| **Media** | Message lo media వెళ్ళదు — client ముందు S3 కి upload చేసి, message lo URL మాత్రమే పంపుతుంది |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"A few things I want to pin down: one-to-one only or groups too, what's the maximum group size, how long do we retain history on the server, and is it end-to-end encrypted? I'll assume both chat types, groups capped at 256, thirty days of retention, and E2E encryption which I'll treat as out of scope for the architecture."</p>
<p>"Five hundred million daily users at forty messages each is twenty billion messages a day — about two hundred and thirty thousand a second. But the number that actually constrains this design isn't QPS, it's <em>a hundred million concurrent connections</em>. At roughly a hundred thousand sockets per tuned server, that's about a thousand gateway servers."</p>
<p>"That changes the shape of the system. Everything so far has been stateless — the load balancer could send a request anywhere. Here, to deliver a message to Bob I have to reach the <em>one specific gateway</em> holding Bob's socket. So I need a session registry: a Redis map from user ID to gateway ID, refreshed by heartbeat with a short TTL so that entries for a crashed gateway expire on their own."</p>
<p>"For transport I'd use WebSockets. Polling wastes enormous traffic at this scale, and server-sent events are one-directional — chat needs both ways over one connection."</p>
<p>"On ordering: I'd avoid a global sequence number, because that's a single bottleneck for something we don't actually need. Ordering only matters <em>within</em> a conversation — nobody can observe the relative order of two unrelated chats. So I use a per-conversation sequence number, which shards naturally by chat ID with no cross-shard coordination. Choosing the weakest guarantee that's still correct is usually the right move."</p>
<p>"The ticks are three separate acknowledgements, and it's worth being precise: one tick is the server acknowledging receipt, two ticks is the recipient's device acknowledging delivery, and blue ticks require a <em>third</em> ack sent when the user actually opens the chat. Delivered and read are genuinely different events."</p>
<p>"Presence has a hidden scaling trap. If I push status changes to all of a user's contacts, someone with five hundred contacts generates five hundred events every time they connect — presence traffic ends up exceeding message traffic. Instead I make presence <em>pull-based</em>: when you open your chat list, I fetch status for the twenty conversations actually on screen. Presence is eventually consistent by nature; a thirty-second-stale last-seen is invisible to users."</p>
<p>"Group chat is the fan-out question again. In the news feed, fan-out on write broke because follower count is unbounded. Here group size is capped at 256, so writing 256 copies is perfectly fine. The bound is what changes the answer, not the problem name."</p>
<p>"For failure: if a gateway dies, its clients reconnect elsewhere and send their last sequence number to pull what they missed. I'd insist on jittered exponential backoff on reconnect, otherwise a deploy causes a hundred thousand clients to stampede back simultaneously."</p>
</div>

## 10. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Multi-device ఎలా?" | Session registry ని `user → [device1:gw3, device2:gw9]` గా చేయడం. Message అన్ని devices కీ fan-out. ప్రతి device కి తన సొంత `last_seq` |
| "E2E encryption ఉంటే server ఏం చేస్తుంది?" | Server ఒక **dumb router** అవుతుంది — ciphertext ని store చేసి forward చేయడం మాత్రమే. Key exchange (Signal protocol) clients మధ్య. Server-side search, moderation సాధ్యం కాదు |
| "Message search?" | E2E ఉంటే client-side index మాత్రమే. లేకపోతే Elasticsearch, chat_id ప్రకారం sharded |
| "Typing indicator?" | Presence లాంటిదే కానీ ఇంకా ephemeral — persist చేయవద్దు, నేరుగా gateway గుండా push, 5 సెకన్ల TTL |
| "Cassandra ఎందుకు, MySQL కాదు?" | Access pattern: `chat_id` + time range తో messages చదవడం. అది సరిగ్గా Cassandra యొక్క partition-key + clustering-key model. పైగా 4 TB/day write throughput |
| "Message delete for everyone?" | Tombstone record పంపడం. Clients దాన్ని చూసి local గా తీసేస్తాయి. Server copy ని కూడా delete. కానీ receiver already చూసి ఉంటే మనం ఏమీ చేయలేం — దాన్ని honest గా చెప్పండి |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">05</div>
<div class="kicker">Problem 05 · Reliability Engineering</div>
<div class="title">Design a Notification<br>System</div>
<div class="meta">Difficulty <b>Medium-Hard</b> · Frequency <b>ఎక్కువ</b> · నేర్పే concepts: idempotency, retry + backoff, DLQ, circuit breaker, priority queues</div>
</div>

## 1. The Ask

> "Design a system that sends push notifications, SMS and email — a billion a day — reliably."

ఈ problem lo **architecture సులభం** (queue + workers). కష్టం అంతా **reliability** lo ఉంది. అందుకే ఇది ఒక reliability engineering interview — system design interview ముసుగులో.

<div class="box warn">
<div class="lab">ఇక్కడ మీరు గెలిచేది ఇక్కడ</div>
Basic pipeline ని అందరూ గీస్తారు. మీరు వేరుగా కనిపించేది ఈ నాలుగు ప్రశ్నలకి జవాబు ఇచ్చినప్పుడు: (1) <b>Third party (APNs) down అయితే</b> ఏమవుతుంది? (2) Same notification <b>రెండుసార్లు</b> వెళ్ళకుండా ఎలా ఆపుతారు? (3) User కి రోజుకి 500 notifications వెళ్ళకుండా ఎలా ఆపుతారు? (4) OTP మరియు marketing email <b>ఒకే queue lo</b> ఉంటే ఏమవుతుంది?
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| ఏఏ channels? | ఒక్కో దానికి వేరే provider, వేరే latency, వేరే ఖరీదు | Push, SMS, Email, in-app |
| Delivery guarantee — at-least-once నా exactly-once? | Exactly-once distributed systems lo సాధ్యం కాదు; at-least-once + dedupe అనే నిజం చెప్పాలి | At-least-once + idempotency |
| Priority ఉందా? | OTP 5 సెకన్లలో వెళ్ళాలి, newsletter గంట ఆలస్యమైనా ఫర్వాలేదు | అవును, 3 tiers |
| User preferences / opt-out? | Legal requirement (GDPR, TRAI). ప్రతి send ముందు check | తప్పనిసరి |
| Scheduling ఉందా? | "రేపు ఉదయం 9కి పంపు" అంటే scheduler కూడా కావాలి | అవును |
| Templates ఎవరు manage చేస్తారు? | Content ని code నుంచి వేరు చేయాలి | Template service |
| Analytics — delivered/opened/clicked? | Feedback loop, provider webhooks | అవును |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| Notifications / day | 1 B |
| **Avg QPS** | 1B ÷ 86,400 ≈ **12,000 / sec** |
| Peak (ఉదయం 9, పండగలు) | ≈ 50,000 / sec |
| Channel split | Push 70% · Email 25% · SMS 5% |
| Payload size | ≈ 1 KB |
| Kafka throughput | 12,000 × 1 KB ≈ 12 MB/sec — ఇది చాలా తక్కువ |
| Dedupe key store | 1B keys × 24h TTL × 50 B ≈ **50 GB Redis** |

<div class="box info">
<div class="lab">ఇక్కడ ఒక మంచి observation</div>
"12,000 QPS అనేది scale పరంగా చాలా తక్కువ — ఒక్క Kafka cluster తో సునాయాసంగా అవుతుంది. అంటే <b>ఈ problem lo కష్టం throughput కాదు</b>. కష్టం అంతా <i>correctness</i> lo — duplicates, retries, third-party outages, user fatigue. అందుకే నా design ఎక్కువ భాగం failure handling మీద ఉంటుంది." — ఇలా చెప్పి మీరే problem యొక్క నిజమైన స్వభావాన్ని పేరు పెట్టడం బలమైన opening.
</div>

## 4. Architecture

<div class="fig">
<div class="cap">notification pipeline · producer నుంచి provider దాకా</div>
<svg viewBox="0 0 750 320">
<rect class="n" x="0" y="20" width="96" height="42" rx="4"/>
<text class="t mid" x="48" y="38">Services</text>
<text class="t-sm mid" x="48" y="52">order, auth…</text>
<line class="ln" x1="100" y1="41" x2="128" y2="41" marker-end="url(#a)"/>
<rect class="n-dark" x="132" y="20" width="120" height="42" rx="4"/>
<text class="t-w mid" x="192" y="38">Notification API</text>
<text class="t-w-sm mid" x="192" y="52">validate + idempotency</text>
<line class="ln" x1="192" y1="66" x2="192" y2="96" marker-end="url(#a)"/>
<rect class="n-info" x="112" y="100" width="160" height="56" rx="4"/>
<text class="t mid" x="192" y="120">Preference Service</text>
<text class="t-sm mid" x="192" y="136">opt-out? quiet hours?</text>
<text class="t-sm mid" x="192" y="150">ఇష్టం లేకపోతే ఇక్కడే ఆగిపోతుంది</text>
<line class="ln" x1="276" y1="128" x2="304" y2="128" marker-end="url(#a)"/>
<rect class="n-soft" x="308" y="100" width="140" height="56" rx="4"/>
<text class="t mid" x="378" y="120">Template Service</text>
<text class="t-sm mid" x="378" y="136">content + i18n</text>
<text class="t-sm mid" x="378" y="150">render చేసిన payload</text>
<line class="ln" x1="452" y1="128" x2="480" y2="128" marker-end="url(#a)"/>
<rect class="n-acc" x="484" y="86" width="120" height="84" rx="4"/>
<text class="t-w mid" x="544" y="106">Kafka</text>
<text class="t-w-sm mid" x="544" y="124">high · OTP</text>
<text class="t-w-sm mid" x="544" y="140">medium · txn</text>
<text class="t-w-sm mid" x="544" y="156">low · marketing</text>
<line class="ln-acc" x1="544" y1="174" x2="544" y2="200" marker-end="url(#aa)"/>
<rect class="n-dark" x="454" y="204" width="180" height="46" rx="4"/>
<text class="t-w mid" x="544" y="224">Channel Workers</text>
<text class="t-w-sm mid" x="544" y="240">rate limit · retry · circuit break</text>
<line class="ln" x1="454" y1="227" x2="400" y2="227" marker-end="url(#a)"/>
<rect class="n-good" x="250" y="204" width="146" height="46" rx="4"/>
<text class="t mid" x="323" y="224">APNs · FCM</text>
<text class="t-sm mid" x="323" y="240">SES · Twilio</text>
<line class="ln-acc" x1="544" y1="254" x2="544" y2="278" marker-end="url(#aa)"/>
<rect class="n-bad" x="444" y="282" width="200" height="34" rx="4"/>
<text class="t mid" x="544" y="304">3 retries fail → Dead Letter Queue</text>
<rect class="n" x="0" y="204" width="220" height="46" rx="4"/>
<text class="t mid" x="110" y="222">Scheduler</text>
<text class="t-sm mid" x="110" y="238">"రేపు 9కి" → time-bucketed store</text>
<line class="ln-dash" x1="110" y1="200" x2="110" y2="160" marker-end="url(#a)"/>
<line class="ln-dash" x1="110" y1="128" x2="108" y2="128"/>
</svg>
<div class="note">Preference check ని <b>pipeline మొదట్లోనే</b> పెట్టడం ముఖ్యం — opt-out చేసిన user కోసం template render చేసి, queue lo పెట్టి, worker దాకా తీసుకెళ్ళి అప్పుడు వదిలేయడం వృథా. ముందే ఆపితే 100% ఆ పని ఆదా.</div>
</div>

## 5. Deep Dive — Duplicate ఎలా ఆపాలి

**నిజం ఏమిటంటే:** Distributed system lo **exactly-once delivery సాధ్యం కాదు**. Worker notification పంపి, ack రాయకముందే crash అయితే — retry lo మళ్ళీ పంపుతుంది. ఇది గణితపరంగా తప్పించలేనిది.

<div class="box good">
<div class="lab">సరైన జవాబు</div>
"Exactly-once <b>delivery</b> సాధ్యం కాదు. కానీ exactly-once <b>effect</b> సాధ్యం — at-least-once delivery + receiver side idempotency. Producer ప్రతి notification కీ ఒక <code>idempotency_key</code> ఇస్తుంది (ఉదా. <code>order-4471-shipped</code>). API దాన్ని Redis lo <code>SET key NX EX 86400</code> తో రాస్తుంది. అది false ఇస్తే ఇది duplicate — silently drop." ఇలా చెప్పడం "exactly-once చేస్తాను" అనే అమాయకమైన జవాబు కంటే చాలా బలం.
</div>

```javascript
// API layer — ఇదే మొత్తం system యొక్క duplicate gate
async function accept(req) {
  const key = req.idempotencyKey ?? `${req.event}:${req.userId}:${req.entityId}`;
  const fresh = await redis.set(`notif:${key}`, '1', { NX: true, EX: 86400 });
  if (!fresh) return { status: 200, deduped: true };   // ఇప్పటికే పంపాం
  await kafka.produce(topicFor(req.priority), req);
  return { status: 202 };
}
```

## 6. Deep Dive — Retry, Backoff, DLQ

<div class="fig">
<div class="cap">failure handling · ఏ error ని ఎలా చూడాలి</div>
<svg viewBox="0 0 750 240">
<rect class="n-dark" x="290" y="10" width="170" height="38" rx="4"/>
<text class="t-w mid" x="375" y="34">Provider కి పంపడం</text>
<line class="ln" x1="330" y1="52" x2="150" y2="82" marker-end="url(#a)"/>
<line class="ln" x1="375" y1="52" x2="375" y2="82" marker-end="url(#a)"/>
<line class="ln" x1="420" y1="52" x2="600" y2="82" marker-end="url(#a)"/>
<rect class="n-good" x="30" y="86" width="220" height="58" rx="4"/>
<text class="t mid" x="140" y="106">2xx · విజయం</text>
<text class="t-sm mid" x="140" y="122">Analytics kకి event</text>
<text class="t-sm mid" x="140" y="136">Kafka offset commit</text>
<rect class="n-bad" x="266" y="86" width="220" height="58" rx="4"/>
<text class="t mid" x="376" y="106">4xx · శాశ్వత తప్పు</text>
<text class="t-sm mid" x="376" y="122">Invalid token, unsubscribed</text>
<text class="t-sm mid" x="376" y="136">Retry వద్దు — వెంటనే DLQ</text>
<rect class="n-info" x="502" y="86" width="220" height="58" rx="4"/>
<text class="t mid" x="612" y="106">5xx / timeout · తాత్కాలికం</text>
<text class="t-sm mid" x="612" y="122">Retry with backoff</text>
<text class="t-sm mid" x="612" y="136">1s → 4s → 16s (+ jitter)</text>
<line class="ln-acc" x1="612" y1="148" x2="612" y2="176" marker-end="url(#aa)"/>
<rect class="n-bad" x="482" y="180" width="260" height="50" rx="4"/>
<text class="t mid" x="612" y="200">3 సార్లు fail → Dead Letter Queue</text>
<text class="t-sm mid" x="612" y="218">Alert + manual replay. మౌనంగా వదిలేయకూడదు</text>
<rect class="n-soft" x="10" y="180" width="440" height="50" rx="4"/>
<text class="t mid" x="230" y="200">Circuit breaker — వరుసగా 50% fail అయితే</text>
<text class="t-sm mid" x="230" y="218">30 సెకన్లు ఆ provider కి పంపడం ఆపి, messages ని queue lo నిలిపి ఉంచడం</text>
</svg>
</div>

| నియమం | ఎందుకు |
|-------|---------|
| **4xx ని retry చేయొద్దు** | Invalid device token 100 సార్లు retry చేసినా pass కాదు. Retry చేయడం అంటే provider ని అనవసరంగా కొట్టడం |
| **Jitter తప్పనిసరి** | Jitter లేని exponential backoff అంటే — provider recover అయిన క్షణంలో అన్ని workers ఒకేసారి కొట్టి మళ్ళీ కూల్చేస్తాయి (thundering herd) |
| **DLQ ని monitor చేయాలి** | DLQ ఉండటం సరిపోదు. దాని మీద alert లేకపోతే messages మౌనంగా చస్తాయి — అది silent data loss |
| **Circuit breaker** | APNs down అయినప్పుడు ప్రతి message కీ 30 సెకన్లు timeout అంటే workers అన్నీ ఇరుక్కుపోతాయి. Breaker fast-fail చేసి queue ని కాపాడుతుంది |

## 7. Deep Dive — Notification Fatigue

Technical గా ప్రతిదీ సరిగ్గా ఉన్నా, user కి రోజుకి 200 notifications వెళ్తే **అతను app ని uninstall చేస్తాడు.** అది system failure కంటే పెద్ద failure.

| Control | ఎలా |
|---------|-----|
| Per-user rate limit | "గంటకి గరిష్ఠంగా 5, రోజుకి 20" — token bucket (Problem 02 అక్కడ నేర్చుకున్నదే ఇక్కడ వాడుతున్నాం) |
| Quiet hours | User timezone lo రాత్రి 10 – ఉదయం 8 మధ్య low priority ని ఆపి, ఉదయానికి వాయిదా |
| Digest / batching | 10 likes = 10 notifications కాదు, "10 people liked your post" ఒకటే |
| Priority bypass | OTP, security alert — వీటికి fatigue limits వర్తించవు |

## 8. Priority — ఒకే queue యొక్క ప్రమాదం

<div class="box bad">
<div class="lab">ఒకే queue lo అన్నీ పెడితే ఏమవుతుంది</div>
Marketing team 50 million newsletters ని queue lo కుమ్మరిస్తుంది. అదే క్షణంలో ఒక user login చేసి <b>OTP</b> అడుగుతాడు. అతని OTP ఆ 50 million వెనక వరుసలో నిలబడుతుంది — 40 నిమిషాల తర్వాత వస్తుంది. అప్పటికి అతను login attempt వదిలేశాడు.<br><br>
<b>పరిష్కారం:</b> Priority ప్రకారం <b>వేరే topics + వేరే worker pools</b>. High priority workers ఎప్పుడూ ఖాళీగా ఉండాలి — వాటిని low priority పని చేయనివ్వకూడదు. ఇది resource వృథా అనిపిస్తుంది, కానీ అదే latency guarantee కి ఖరీదు.
</div>

## 9. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **APNs పూర్తిగా down** | Circuit breaker open → messages Kafka lo నిలిచి ఉంటాయి (అవి పోవు). Provider తిరిగి వచ్చాక drain. కానీ **stale notifications కి TTL** పెట్టాలి — 6 గంటల పాత "your order is arriving" పంపడం వల్ల లాభం లేదు |
| **Provider fallback** | SMS కి రెండు providers (Twilio + MSG91). Primary fail అయితే secondary. Push కి fallback లేదు — APNs ఒక్కటే iOS కి దారి |
| **Kafka lag పెరగడం** | Consumer workers ని autoscale. Lag metric మీద alert. Low priority ని shed చేయడం (marketing ని వదిలేసి transactional ని కాపాడటం) |
| **Preference service down** | **Fail-closed** — preferences తెలియకపోతే పంపొద్దు. Opt-out చేసిన వాడికి పంపడం legal problem. (Rate limiter lo fail-open, ఇక్కడ fail-closed — ఈ తేడాని బయటికి చెప్పండి) |
| **Analytics feedback** | Provider webhooks (delivered, bounced, opened) → Kafka → warehouse. Hard bounce వస్తే ఆ token/email ని invalidate చేయడం |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Before designing: which channels, is there a priority notion, do we honour user preferences and quiet hours, and what delivery guarantee do we promise? I'll assume push, SMS and email, three priority tiers, mandatory preference checks, and at-least-once delivery."</p>
<p>"A billion a day is about twelve thousand a second, peaking near fifty thousand. That's genuinely small — a single Kafka cluster handles it comfortably. So I want to say up front that <em>throughput isn't the hard part of this problem</em>. The hard parts are duplicates, retries, third-party outages, and not burning the user out. My design will spend most of its time there."</p>
<p>"The pipeline is: an API that validates and de-duplicates, then a preference check, then template rendering, then Kafka, then per-channel workers that talk to APNs, FCM, SES or Twilio. I put the preference check <em>early</em> deliberately — rendering a template and queuing a message for someone who opted out is pure waste."</p>
<p>"On duplicates, I want to be precise: exactly-once <em>delivery</em> is impossible. A worker can send successfully and crash before committing its offset, and the retry will send again. What is achievable is exactly-once <em>effect</em> — at-least-once delivery plus idempotency. Every notification carries an idempotency key like 'order-4471-shipped', and the API does a Redis SET NX with a day's TTL. If the key already exists, we drop it silently."</p>
<p>"For retries I'd classify errors rather than blindly retrying. A 4xx — invalid device token, unsubscribed — is permanent; retrying it just hammers the provider, so it goes straight to the dead letter queue. A 5xx or timeout is transient, so exponential backoff with <em>jitter</em>. The jitter matters: without it, every worker retries at the same instant the provider recovers and knocks it over again."</p>
<p>"I'd wrap each provider in a circuit breaker. If APNs starts failing, every message costs a thirty-second timeout and all my workers block on dead connections. The breaker fast-fails instead and lets messages accumulate in Kafka, which is exactly where I want them — durable and replayable."</p>
<p>"Two product-level things that are really engineering decisions. First, priority needs <em>separate topics and separate worker pools</em>. If marketing dumps fifty million newsletters into a shared queue, a user's login OTP queues behind them and arrives forty minutes late. Dedicated high-priority workers sitting mostly idle look wasteful, but that idleness <em>is</em> the latency guarantee."</p>
<p>"Second, notification fatigue. Per-user rate limits, quiet hours in the user's own timezone, and digesting — ten likes become one notification, not ten. A technically perfect system that gets the app uninstalled has still failed."</p>
<p>"One asymmetry worth naming: I'd fail <em>open</em> on a rate limiter, but <em>closed</em> on the preference service. If I can't tell whether a user opted out, I don't send — that's a legal exposure, not a latency one."</p>
</div>

## 10. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Scheduled notifications ఎలా?" | Time-bucketed store — `schedule:{yyyymmddhhmm}` sorted set. ఒక poller ప్రతి నిమిషం ఆ bucket ని తీసి queue lo పెడుతుంది. (Problem 10 lo దీన్ని లోతుగా చూస్తాం) |
| "50 million users కి ఒకేసారి పంపాలంటే (broadcast)?" | ఒక్కో notification API call కాదు — ఒక **campaign job**. User list ని chunks గా విడగొట్టి workers కి పంచడం, progress ని track చేయడం, resumable గా ఉంచడం |
| "Notification cost ఎలా తగ్గించాలి?" | SMS అన్నిటికంటే ఖరీదు (₹0.15/msg). Push ఉచితం. కాబట్టి push ముందు try చేసి, device unreachable అయితేనే SMS — **channel fallback ladder** |
| "Deduplication window ఎంత?" | 24 గంటలు సాధారణం. కానీ business event ని బట్టి — "order shipped" జీవితకాలంలో ఒకసారే, "cart reminder" వారానికోసారి కావొచ్చు |
| "In-app notifications?" | ఇవి push కాదు — user కోసం ఒక inbox. DB lo store చేసి, unread count ని Redis lo. Chat problem lo నేర్చుకున్న WebSocket ఇక్కడ real-time badge కి పనికొస్తుంది |
| "GDPR / data deletion?" | User delete అడిగితే notification history, device tokens, analytics events అన్నీ తీసేయాలి. అందుకే ప్రతిచోటా `user_id` ని foreign key గా ఉంచి deletion job రాయడం సులభం చేయాలి |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">06</div>
<div class="kicker">Problem 06 · Pipelines &amp; Bandwidth</div>
<div class="title">Design Video Streaming<br>(YouTube / Netflix)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>ఎక్కువ</b> · నేర్పే concepts: transcoding DAG, HLS/DASH, adaptive bitrate, CDN economics</div>
</div>

## 1. The Ask

> "Design YouTube. Users upload videos, and other users watch them on any device, on any network."

ఈ problem lo **రెండు పూర్తిగా వేరే systems** ఉన్నాయి. వాటిని విడదీసి చెప్పడమే మీ మొదటి పని:

<div class="grid">
<div class="card">
<div class="t">Write path · Upload</div>
<div class="s">తక్కువ traffic (సెకనుకి కొన్ని వందలు), కానీ ఒక్కో పని <b>భారీ</b> — ఒక video ని transcode చేయడానికి నిమిషాల CPU. ఇది batch processing problem.</div>
</div>
<div class="card">
<div class="t">Read path · Playback</div>
<div class="s">అపారమైన traffic, కానీ ఒక్కో పని <b>చౌక</b> — ఒక file ని పంపడం. ఇది bandwidth + CDN problem.</div>
</div>
<div class="card">
<div class="t">Interviewer చూసేది</div>
<div class="s">ఈ రెండింటినీ మీరు విడిగా చూస్తున్నారా. ఒకే architecture తో రెండింటినీ కప్పేయాలని ప్రయత్నిస్తే అది తప్పు దారి.</div>
</div>
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| VOD నా live streaming నా? | పూర్తిగా వేరే designs — live lo transcode real-time గా జరగాలి | VOD (live ని follow-up lo) |
| ఏఏ resolutions? | Transcoding ఖర్చు rendition సంఖ్యకి proportional | 240p – 4K, 6 renditions |
| Video పొడవు గరిష్ఠం? | 10 నిమిషాలా, 10 గంటలా — chunking strategy మారుతుంది | సగటు 10 నిమిషాలు |
| DRM కావాలా? | Netflix కి తప్పనిసరి, YouTube కి కాదు | ఇప్పుడు వద్దు |
| Recommendations scope lo ఉన్నాయా? | ఉంటే అది ఒక పూర్తి ML system | బయట |
| Comments, likes? | సాధారణ CRUD — video problem కి సంబంధం లేదు | బయట |

## 3. Estimation — ఇక్కడ bandwidth నే రాజు

| లెక్క | విలువ |
|-------|--------|
| DAU | 500 M |
| Videos watched / user / day | 4 (సగటు 10 నిమిషాలు) |
| Views / day | 2 B |
| Uploads / day | 720,000 గంటల video |
| Raw upload storage / day | 720K గం × 2 GB ≈ **1.4 PB / day** |
| Transcoded (6 renditions) | raw × ~1.5 ≈ **2 PB / day** |
| 5 ఏళ్ళ storage | ≈ 3.6 EB (exabytes) — tiering తప్పనిసరి |
| Avg bitrate (mix of resolutions) | ≈ 3 Mbps |
| **Egress bandwidth** | 2B × 600s × 3 Mbps ÷ 8 ≈ **450 PB / day ≈ 40 Tbps** |

<div class="box warn">
<div class="lab">ఈ ఒక్క వాక్యం మీ level ని చూపిస్తుంది</div>
"40 Tbps egress అంటే — <b>ఈ business lo అతి పెద్ద ఖర్చు compute కాదు, storage కాదు, bandwidth.</b> అందుకే నా design lo అతి ముఖ్యమైన నిర్ణయం <i>CDN cache hit ratio</i>. 90% నుంచి 95% కి పెంచితే origin traffic సగం అవుతుంది — అది కోట్ల రూపాయల ఆదా. ఈ ఒక్క metric మిగతా అన్నిటికంటే ఎక్కువ ముఖ్యం."
</div>

## 4. Deep Dive — Upload &amp; Transcoding Pipeline

<div class="fig">
<div class="cap">upload → transcode → publish</div>
<svg viewBox="0 0 750 300">
<rect class="n" x="0" y="16" width="86" height="40" rx="4"/>
<text class="t mid" x="43" y="34">Creator</text>
<text class="t-sm mid" x="43" y="48">raw file</text>
<line class="ln" x1="90" y1="36" x2="118" y2="36" marker-end="url(#a)"/>
<rect class="n-dark" x="122" y="16" width="140" height="40" rx="4"/>
<text class="t-w mid" x="192" y="34">Pre-signed S3 URL</text>
<text class="t-w-sm mid" x="192" y="48">నేరుగా S3 కి — server గుండా కాదు</text>
<line class="ln" x1="266" y1="36" x2="294" y2="36" marker-end="url(#a)"/>
<rect class="n-soft" x="298" y="16" width="120" height="40" rx="4"/>
<text class="t mid" x="358" y="34">Raw bucket</text>
<text class="t-sm mid" x="358" y="48">S3</text>
<line class="ln-acc" x1="422" y1="36" x2="450" y2="36" marker-end="url(#aa)"/>
<rect class="n-acc" x="454" y="16" width="130" height="40" rx="4"/>
<text class="t-w mid" x="519" y="34">S3 event → Kafka</text>
<text class="t-w-sm mid" x="519" y="48">"కొత్త video వచ్చింది"</text>
<line class="ln-acc" x1="519" y1="60" x2="519" y2="84" marker-end="url(#aa)"/>
<rect class="n-dark" x="429" y="88" width="180" height="40" rx="4"/>
<text class="t-w mid" x="519" y="106">Transcoding Orchestrator</text>
<text class="t-w-sm mid" x="519" y="120">DAG ని విడగొట్టి పంచడం</text>
<line class="ln" x1="429" y1="108" x2="380" y2="108" marker-end="url(#a)"/>
<rect class="n-info" x="230" y="86" width="146" height="44" rx="4"/>
<text class="t mid" x="303" y="106">Split into chunks</text>
<text class="t-sm mid" x="303" y="122">ప్రతి 10 సెకన్లకి ఒక segment</text>
<text class="t-xs" x="0" y="164">PARALLEL TRANSCODE · ఒక్కో chunk ఒక్కో worker మీద — 60 నిమిషాల video 2 నిమిషాల్లో</text>
<rect class="n" x="0" y="174" width="118" height="42" rx="4"/>
<text class="t-sm mid" x="59" y="192">chunk 1 → 6 renditions</text>
<text class="t-sm mid" x="59" y="207">240p…4K</text>
<rect class="n" x="126" y="174" width="118" height="42" rx="4"/>
<text class="t-sm mid" x="185" y="192">chunk 2 → 6 renditions</text>
<text class="t-sm mid" x="185" y="207">240p…4K</text>
<rect class="n" x="252" y="174" width="118" height="42" rx="4"/>
<text class="t-sm mid" x="311" y="199">… 360 chunks</text>
<rect class="n-good" x="378" y="174" width="180" height="42" rx="4"/>
<text class="t mid" x="468" y="192">Thumbnail + captions</text>
<text class="t-sm mid" x="468" y="207">సమాంతరంగా అవే</text>
<rect class="n-bad" x="566" y="174" width="184" height="42" rx="4"/>
<text class="t mid" x="658" y="192">Content moderation</text>
<text class="t-sm mid" x="658" y="207">copyright + policy scan</text>
<line class="ln-acc" x1="375" y1="222" x2="375" y2="246" marker-end="url(#aa)"/>
<rect class="n-acc" x="205" y="250" width="340" height="42" rx="4"/>
<text class="t-w mid" x="375" y="268">అన్నీ పూర్తయ్యాక → manifest రాయడం → publish</text>
<text class="t-w-sm mid" x="375" y="283">అప్పుడే video "ready" అవుతుంది · CDN కి push</text>
</svg>
<div class="note">రెండు కీలక ఆలోచనలు: (1) <b>Client నేరుగా S3 కి upload చేస్తాడు</b> — pre-signed URL తో. 2 GB file ని మన API servers గుండా పంపడం అనవసరమైన ఖర్చు. (2) <b>Video ని chunks గా విడగొట్టి parallel transcode</b> — లేకపోతే 60 నిమిషాల video కి 60 నిమిషాలు పడుతుంది.</div>
</div>

| Pipeline నిర్ణయం | ఎందుకు |
|------------------|---------|
| Chunk-level parallelism | 360 chunks × 6 renditions = 2,160 స్వతంత్ర tasks. Embarrassingly parallel |
| Spot / preemptible instances | Transcoding batch పని, ఆలస్యం ఫర్వాలేదు → 70% చౌక. Task fail అయితే మళ్ళీ run |
| DAG orchestration | Thumbnail, captions, moderation — వీటికి పరస్పర ఆధారం లేదు, సమాంతరంగా. Publish మాత్రం అన్నీ పూర్తయ్యాకే |
| Idempotent tasks | Worker crash అయితే అదే chunk మళ్ళీ transcode. Output deterministic కాబట్టి సమస్య లేదు |
| Progressive publish | 240p ముందు ready అయితే వెంటనే publish — 4K తర్వాత చేరుతుంది. Creator ఎదురుచూపు తగ్గుతుంది |

## 5. Deep Dive — Adaptive Bitrate (HLS / DASH)

**సమస్య:** ఒకే video ని 4G lo, WiFi lo, lift lo — అన్నిచోట్లా ఆగకుండా చూపించాలి.

<div class="fig">
<div class="cap">adaptive bitrate · manifest + segments</div>
<svg viewBox="0 0 750 250">
<rect class="n-dark" x="0" y="16" width="230" height="120" rx="5"/>
<text class="t-w" x="16" y="38">master.m3u8 (manifest)</text>
<text class="t-w-sm mono" x="16" y="60">240p  → 400 kbps</text>
<text class="t-w-sm mono" x="16" y="76">480p  → 1 Mbps</text>
<text class="t-w-sm mono" x="16" y="92">720p  → 2.5 Mbps</text>
<text class="t-w-sm mono" x="16" y="108">1080p → 5 Mbps</text>
<text class="t-w-sm mono" x="16" y="124">4K    → 18 Mbps</text>
<text class="t-sm" x="0" y="158">Player మొదట ఈ చిన్న text file ని</text>
<text class="t-sm" x="0" y="174">download చేసి, తన bandwidth ని బట్టి</text>
<text class="t-sm" x="0" y="190">ఏ rendition తీసుకోవాలో నిర్ణయిస్తుంది.</text>
<line class="ln-acc" x1="234" y1="76" x2="272" y2="76" marker-end="url(#aa)"/>
<text class="t-xs" x="278" y="20">SEGMENTS · ప్రతి 10 సెకన్లకి ఒకటి</text>
<rect class="n-good" x="278" y="30" width="76" height="34" rx="3"/>
<text class="t-sm mid" x="316" y="51">seg1·720p</text>
<rect class="n-good" x="358" y="30" width="76" height="34" rx="3"/>
<text class="t-sm mid" x="396" y="51">seg2·720p</text>
<rect class="n-bad" x="438" y="30" width="76" height="34" rx="3"/>
<text class="t-sm mid" x="476" y="51">seg3·480p</text>
<rect class="n-bad" x="518" y="30" width="76" height="34" rx="3"/>
<text class="t-sm mid" x="556" y="51">seg4·480p</text>
<rect class="n-good" x="598" y="30" width="76" height="34" rx="3"/>
<text class="t-sm mid" x="636" y="51">seg5·720p</text>
<line class="ln" x1="278" y1="78" x2="674" y2="78"/>
<text class="t-sm" x="440" y="96">network పడిపోయింది</text>
<text class="t-sm" x="600" y="96">తిరిగి వచ్చింది</text>
<rect class="n-info" x="278" y="110" width="396" height="60" rx="4"/>
<text class="t mid" x="476" y="132">Player ప్రతి segment తర్వాత తనని తాను సరిచేసుకుంటుంది</text>
<text class="t-sm mid" x="476" y="150">Buffer తగ్గుతోందా? → తక్కువ bitrate. నిండుతోందా? → ఎక్కువ</text>
<text class="t-sm mid" x="476" y="164">Video ఆగదు — quality మాత్రమే మారుతుంది</text>
<rect class="n-soft" x="278" y="182" width="396" height="56" rx="4"/>
<text class="t mid" x="476" y="202">ఇది ఎందుకు పని చేస్తుంది</text>
<text class="t-sm mid" x="476" y="220">అన్ని renditions ఒకే chunk boundaries మీద కత్తిరించబడ్డాయి —</text>
<text class="t-sm mid" x="476" y="236">అందుకే మధ్యలో switch చేసినా seam కనిపించదు</text>
</svg>
</div>

<div class="box good">
<div class="lab">ఇక్కడ చెప్పాల్సిన కీలక వాక్యం</div>
"Adaptive bitrate యొక్క మొత్తం తెలివి <b>client lo</b> ఉంది, server lo కాదు. Server కేవలం static files ని పంచుతుంది — అందుకే దీన్ని CDN తో 100% cache చేయొచ్చు. ఇది intentional design: <b>intelligence ని edge కి నెట్టి, origin ని dumb గా ఉంచడం</b>. Server-side adaptive streaming చేస్తే CDN caching సాధ్యం కాదు, అప్పుడు 40 Tbps మొత్తం మన origin మీద పడుతుంది."
</div>

## 6. Deep Dive — CDN Strategy (అసలు ఖర్చు ఇక్కడే)

| Video రకం | వాటా | Strategy |
|------------|------|----------|
| **Viral / trending** | 1% videos, 80% views | CDN edge lo **ముందే push** (pre-warm). Cache hit ~99% |
| **Popular** | 10% videos, 15% views | Pull-through cache — మొదటి request origin కి, తర్వాత edge lo |
| **Long tail** | 89% videos, 5% views | Cache చేయకపోవడమే మేలు. Origin నుంచే. Cold storage (Glacier) lo raw ని ఉంచడం |

<div class="box info">
<div class="lab">Regional pre-warming</div>
"ఒక కొత్త video upload అయినప్పుడు దాన్ని ప్రపంచంలోని అన్ని edges కి push చేయను — అది వృథా. Creator యొక్క audience ఎక్కడ ఉందో (గత videos నుంచి తెలుసు) ఆ regions కి మాత్రమే pre-warm చేస్తాను. మిగతాచోట్ల మొదటి viewer origin నుంచి తెచ్చుకుంటాడు, ఆ తర్వాత అది cache అవుతుంది."
</div>

## 7. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Storage ఖర్చు (3.6 EB)** | Tiering: 30 రోజులు hot (S3 Standard), తర్వాత Infrequent Access, ఏడాది తర్వాత Glacier. 4K rendition ని unpopular videos కి delete చేసి, అవసరమైతే మళ్ళీ transcode |
| **Transcoding backlog** | Queue depth మీద autoscale. Priority: verified creators ముందు. Spot instance reclaim అయితే task ని మళ్ళీ schedule |
| **Upload విఫలం (పెద్ద file)** | **Resumable upload** — file ని 5 MB parts గా, S3 multipart. Network పోతే మిగిలిన parts నుంచి కొనసాగడం |
| **CDN origin overload** | Cache miss storm వస్తే origin చస్తుంది. **Request coalescing** — ఒకే segment కి 1000 concurrent misses వస్తే origin కి ఒకే fetch |
| **Region outage** | Videos multi-region replicated (కనీసం popular వాటిని). Manifest lo multiple CDN URLs |
| **Thumbnail hot path** | Thumbnails చాలా చిన్నవి కానీ చాలా ఎక్కువ requests — వాటిని వేరే CDN path, aggressive caching, WebP |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"First, is this video-on-demand or live? They're genuinely different systems — live means transcoding has to keep up with real time, which changes everything. I'll design VOD and treat live as an extension. I'll also assume six renditions from 240p to 4K, and put recommendations and comments out of scope."</p>
<p>"I want to split this into two systems immediately, because they have opposite shapes. The <em>upload path</em> is low traffic but each unit of work is enormous — minutes of CPU per video. The <em>playback path</em> is astronomical traffic where each unit of work is trivial — serve a file. Trying to design both with one architecture is where people go wrong."</p>
<p>"On numbers: two billion views a day at roughly three megabits average works out to about <em>forty terabits per second of egress</em>. That tells me the dominant cost in this business isn't compute or storage — it's bandwidth. So the single most important metric in my design is CDN cache hit ratio. Going from ninety to ninety-five percent halves origin traffic."</p>
<p>"For upload, the client gets a pre-signed URL and uploads <em>directly to object storage</em> — a two-gigabyte file should never pass through my API servers. Uploads are multipart and resumable, because a phone on mobile data will drop mid-upload."</p>
<p>"Object storage fires an event, and an orchestrator splits the video into ten-second chunks. Each chunk transcodes into six renditions independently — a sixty-minute video becomes about two thousand parallel tasks, so wall-clock time drops from an hour to a couple of minutes. Because these tasks are idempotent and latency-tolerant, I'd run them on spot instances at roughly a third of the cost and just re-run anything that gets preempted."</p>
<p>"Thumbnails, captions and content moderation run as parallel branches of the same DAG. The video only publishes when everything completes — though I'd consider progressive publish, releasing 240p as soon as it's ready so the creator isn't waiting on 4K."</p>
<p>"For playback I'd use HLS or DASH. The player downloads a small manifest listing the available bitrates, then requests ten-second segments, adjusting quality between segments based on how its buffer is doing. The important architectural consequence is that <em>all the intelligence lives in the client</em>. The server only serves static files, which is exactly what makes them a hundred percent CDN-cacheable. If I did the adaptation server-side, nothing would be cacheable and all forty terabits would hit my origin."</p>
<p>"On CDN strategy, view distribution is extremely skewed — roughly one percent of videos get eighty percent of views. I'd pre-warm trending content to edges, let popular content populate through normal pull-through caching, and deliberately <em>not</em> cache the long tail, since caching something watched twice a month is pure cost. And I'd pre-warm regionally based on where the creator's audience actually is, rather than globally."</p>
<p>"The failure case I'd protect hardest is a cache-miss storm on a newly viral video — a thousand simultaneous misses for the same segment. Request coalescing at the edge turns that into a single origin fetch."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Live streaming ఎలా మారుతుంది?" | Transcode real-time గా జరగాలి (chunk-level parallelism సాధ్యం కాదు — future chunks ఇంకా లేవు). Latency budget 3-10 సెకన్లు. Protocol: RTMP ingest → HLS/LL-HLS out. Rewind కోసం DVR window |
| "Video ని ఎలా search చేస్తారు?" | Metadata (title, description, tags) → Elasticsearch. Content search కావాలంటే captions ని index చేయడం (అవి transcoding pipeline lo generate అవుతున్నాయి) |
| "View count ఎలా లెక్కిస్తారు?" | Real-time exact అవసరం లేదు. Client events → Kafka → stream aggregation → approximate count కి Redis, exact కి batch job. (Problem 17 lo దీన్ని లోతుగా చూస్తాం) |
| "DRM ఎలా?" | Segments ని encrypt చేసి, key ని license server నుంచి. Widevine/FairPlay. CDN encrypted bytes ని cache చేస్తుంది — caching చెడిపోదు |
| "Netflix vs YouTube తేడా?" | Netflix catalogue చిన్నది, స్థిరమైనది → అన్నీ ముందే transcode + edges lo ముందే push (Open Connect appliances). YouTube catalogue అనంతం → long tail ని cache చేయలేం. ఈ ఒక్క తేడా రెండు వేరే architectures కి దారితీస్తుంది |
| "Copyright detection?" | Audio/video fingerprint (Content ID) — upload సమయంలో known works database తో match. ఇది transcoding DAG lo ఒక parallel branch |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">07</div>
<div class="kicker">Problem 07 · Geospatial Systems</div>
<div class="title">Design Ride Sharing<br>(Uber / Ola)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>ఎక్కువ</b> · నేర్పే concepts: geohash, quadtree, write amplification, matching, trip state machine</div>
</div>

## 1. The Ask

> "Design Uber. A rider opens the app, sees nearby cars, requests a ride, and gets matched to a driver. Both sides see each other move in real time."

ఇది మొదటి **geospatial** problem. ఇక్కడ కొత్త ప్రశ్న ఒక్కటే కానీ చాలా లోతైనది: **"నా చుట్టూ 2 కిలోమీటర్లలో ఎవరున్నారు?"** అనే query ని సెకనుకి లక్షల సార్లు ఎలా జవాబివ్వాలి.

<div class="box warn">
<div class="lab">ఈ problem యొక్క దాచిన కష్టం</div>
అందరూ matching గురించి మాట్లాడతారు. కానీ అసలు scale problem <b>location updates</b> lo ఉంది. 1 million drivers, ప్రతి 4 సెకన్లకి ఒక location — అంటే <b>సెకనుకి 250,000 writes</b>. Rides మాత్రం సెకనుకి 230. అంటే location traffic, ride traffic కంటే <b>వెయ్యి రెట్లు</b> ఎక్కువ. దీన్ని మీరే గుర్తించి చెప్తే interviewer ఆగిపోతాడు.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| ఒక city నా ప్రపంచమా? | Sharding strategy ఇక్కడి నుంచే — cities స్వతంత్రం | ప్రపంచం, కానీ trips city లోపలే |
| Driver location ఎంత తరచుగా? | ఇదే మొత్తం write load ని నిర్ణయిస్తుంది | ప్రతి 4 సెకన్లకి |
| Matching దేని ఆధారంగా? | దూరమా, ETA నా, rating నా — ranking logic | ETA ప్రధానం |
| Pooling (షేర్డ్ rides) ఉందా? | ఉంటే matching అనేది ఒక optimisation problem అవుతుంది | ఇప్పుడు వద్దు |
| Surge pricing? | వేరే service, real-time demand/supply | ప్రస్తావిస్తాం, deep dive వద్దు |
| Payment scope lo ఉందా? | వేరే problem (09 చూడండి) | బయట |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| మొత్తం drivers | 10 M |
| ఏ క్షణంలోనైనా online | 1 M |
| Location update frequency | ప్రతి 4 సెకన్లకి |
| **Location write QPS** | 1M ÷ 4 = **250,000 / sec** |
| Rides / day | 20 M |
| **Ride request QPS** | 20M ÷ 86,400 ≈ **230 / sec** (peak ≈ 1,000) |
| Location record size | driverId + lat + lng + ts ≈ 40 B |
| Location writes / day | 21.6 B × 40 B ≈ 900 GB/day (ఇది store చేస్తే) |

<div class="box good">
<div class="lab">ఇక్కడ మొదటి పెద్ద నిర్ణయం</div>
"250,000 writes/sec ని <b>ఏ disk-based database కీ పంపను</b>. Driver location అనేది <b>ephemeral state</b> — 4 సెకన్ల తర్వాత అది చెత్త. దాన్ని durable గా రాయడం అనవసరం. కాబట్టి current location అంతా <b>Redis lo మాత్రమే</b> ఉంటుంది. Trip జరుగుతున్నప్పటి route ని మాత్రం (billing, disputes కోసం) async గా Cassandra lo archive చేస్తాను. ఈ ఒక్క నిర్ణయం 250K QPS ని 1K QPS కి తగ్గిస్తుంది."
</div>

## 4. Deep Dive — "నా చుట్టూ ఎవరున్నారు?" (Geospatial Index)

<div class="fig">
<div class="cap">geospatial indexing · నాలుగు మార్గాలు</div>
<svg viewBox="0 0 750 265">
<rect class="n-bad" x="0" y="14" width="176" height="120" rx="5"/>
<text class="t-acc" x="14" y="36">A · SQL లో lat/lng</text>
<text class="t-sm" x="14" y="58">WHERE lat BETWEEN …</text>
<text class="t-sm" x="14" y="74">AND lng BETWEEN …</text>
<text class="t-sm" x="14" y="98">B-tree ఒక column మీదే</text>
<text class="t-sm" x="14" y="114">పని చేస్తుంది. రెండో దాన్ని</text>
<text class="t-sm" x="14" y="128">scan చేయాలి. ❌ నెమ్మది</text>
<rect class="n-info" x="192" y="14" width="176" height="120" rx="5"/>
<text class="t-acc" x="206" y="36">B · GEOHASH</text>
<text class="t-sm" x="206" y="58">2D → 1D string</text>
<text class="t-sm mono" x="206" y="76">tdr1y8 (6 chars ≈ 1 km)</text>
<text class="t-sm" x="206" y="98">Prefix ఒకటే అంటే</text>
<text class="t-sm" x="206" y="114">దగ్గరగా ఉన్నట్టు.</text>
<text class="t-sm" x="206" y="128">✅ సులభం, Redis native</text>
<rect class="n-info" x="384" y="14" width="176" height="120" rx="5"/>
<text class="t-acc" x="398" y="36">C · QUADTREE</text>
<text class="t-sm" x="398" y="58">Dense ప్రాంతాన్ని మాత్రమే</text>
<text class="t-sm" x="398" y="74">చిన్న grids గా విడగొట్టడం</text>
<text class="t-sm" x="398" y="98">✅ Uniform load</text>
<text class="t-sm" x="398" y="114">❌ In-memory tree ని</text>
<text class="t-sm" x="398" y="128">maintain చేయాలి</text>
<rect class="n-good" x="576" y="14" width="174" height="120" rx="5"/>
<text class="t-acc" x="590" y="36">D · H3 / S2 ✓</text>
<text class="t-sm" x="590" y="58">Hexagon grid (Uber H3)</text>
<text class="t-sm" x="590" y="80">పొరుగు cells అన్నీ</text>
<text class="t-sm" x="590" y="96">సమాన దూరంలో —</text>
<text class="t-sm" x="590" y="112">geohash lo ఇది తప్పు</text>
<text class="t-sm" x="590" y="128">✅ Production choice</text>
<text class="t-xs" x="0" y="164">GEOHASH యొక్క BOUNDARY సమస్య · దీన్ని తప్పకుండా ప్రస్తావించండి</text>
<rect class="n" x="0" y="174" width="120" height="80" rx="3"/>
<rect class="n" x="122" y="174" width="120" height="80" rx="3"/>
<text class="t-sm mid" x="60" y="200">cell tdr1y8</text>
<text class="t-sm mid" x="182" y="200">cell tdr1y9</text>
<circle cx="115" cy="230" r="5" fill="#e2653a"/>
<circle cx="130" cy="230" r="5" fill="#17203a"/>
<text class="t-sm" x="14" y="246">rider</text>
<text class="t-sm" x="140" y="246">driver</text>
<rect class="n-bad" x="256" y="174" width="230" height="80" rx="4"/>
<text class="t mid" x="371" y="198">50 మీటర్ల దూరంలో ఉన్నారు</text>
<text class="t-sm mid" x="371" y="218">కానీ వేరే cells lo. ఒక్క cell</text>
<text class="t-sm mid" x="371" y="234">వెతికితే driver కనిపించడు!</text>
<rect class="n-good" x="500" y="174" width="250" height="80" rx="4"/>
<text class="t mid" x="625" y="198">పరిష్కారం</text>
<text class="t-sm mid" x="625" y="218">ఎప్పుడూ నా cell + 8 పొరుగు</text>
<text class="t-sm mid" x="625" y="234">cells — మొత్తం 9 cells వెతకడం</text>
</svg>
</div>

**Redis తో ఎలా:**

```
# Driver location update — ప్రతి 4 సెకన్లకి, ప్రతి driver
GEOADD drivers:city:hyd 78.4867 17.3850 "driver:9931"

# Rider "నా చుట్టూ ఎవరున్నారు?" — ఒక్క command
GEOSEARCH drivers:city:hyd FROMLONLAT 78.4772 17.4123 BYRADIUS 3 km ASC COUNT 20
```

<div class="box info">
<div class="lab">Redis GEO లోపల ఏముంది</div>
Redis GEO commands అనేవి నిజానికి <b>Sorted Set + geohash</b> మాత్రమే. Lat/lng ని 52-bit geohash integer గా మార్చి score గా వాడుతుంది. అంటే <code>ZRANGEBYSCORE</code> తో range query. ఈ లోపలి విషయం చెప్తే — మీరు tool ని వాడటమే కాదు, అది ఎలా పని చేస్తుందో తెలుసని అర్థమవుతుంది.
</div>

## 5. Deep Dive — Matching (ఇక్కడ correctness చాలా ముఖ్యం)

<div class="fig">
<div class="cap">ride request → matched driver</div>
<svg viewBox="0 0 750 250">
<rect class="n" x="0" y="20" width="86" height="38" rx="4"/>
<text class="t mid" x="43" y="44">Rider</text>
<line class="ln" x1="90" y1="39" x2="118" y2="39" marker-end="url(#a)"/>
<rect class="n-dark" x="122" y="20" width="120" height="38" rx="4"/>
<text class="t-w mid" x="182" y="38">Ride Service</text>
<text class="t-w-sm mid" x="182" y="52">request created</text>
<line class="ln" x1="246" y1="39" x2="274" y2="39" marker-end="url(#a)"/>
<rect class="n-info" x="278" y="20" width="150" height="38" rx="4"/>
<text class="t mid" x="353" y="38">GEOSEARCH 3 km</text>
<text class="t-sm mid" x="353" y="52">→ 20 candidates</text>
<line class="ln" x1="432" y1="39" x2="460" y2="39" marker-end="url(#a)"/>
<rect class="n-soft" x="464" y="20" width="150" height="38" rx="4"/>
<text class="t mid" x="539" y="38">Rank by ETA</text>
<text class="t-sm mid" x="539" y="52">road distance, traffic</text>
<line class="ln-acc" x1="539" y1="62" x2="539" y2="86" marker-end="url(#aa)"/>
<rect class="n-acc" x="424" y="90" width="230" height="46" rx="4"/>
<text class="t-w mid" x="539" y="110">SETNX lock:driver:9931 (TTL 15s)</text>
<text class="t-w-sm mid" x="539" y="126">ఇదే overselling ని ఆపే గీత</text>
<line class="ln-acc" x1="424" y1="113" x2="330" y2="113" marker-end="url(#aa)"/>
<rect class="n-dark" x="180" y="92" width="146" height="42" rx="4"/>
<text class="t-w mid" x="253" y="112">Driver కి offer push</text>
<text class="t-w-sm mid" x="253" y="127">15 సెకన్ల గడువు</text>
<line class="ln" x1="253" y1="138" x2="180" y2="170" marker-end="url(#a)"/>
<line class="ln" x1="253" y1="138" x2="330" y2="170" marker-end="url(#a)"/>
<rect class="n-good" x="70" y="174" width="200" height="58" rx="4"/>
<text class="t mid" x="170" y="194">Accept</text>
<text class="t-sm mid" x="170" y="212">Trip create · driver ని pool నుంచి</text>
<text class="t-sm mid" x="170" y="226">తీసివేయడం · rider కి notify</text>
<rect class="n-bad" x="290" y="174" width="240" height="58" rx="4"/>
<text class="t mid" x="410" y="194">Reject / timeout</text>
<text class="t-sm mid" x="410" y="212">Lock release · తర్వాతి candidate కి</text>
<text class="t-sm mid" x="410" y="226">3 సార్లు fail అయితే radius పెంచడం</text>
</svg>
<div class="note">Lock TTL <b>15 సెకన్లు</b> — driver offer ని accept చేయడానికి ఇచ్చిన సమయమే. Driver app crash అయినా lock తనంతట తానే విడిపోతుంది. TTL లేని lock అంటే — ఆ driver శాశ్వతంగా ఎవరికీ దొరకడు.</div>
</div>

| Matching నిర్ణయం | ఎందుకు |
|------------------|---------|
| **సరళ దూరం కాదు, ETA** | నదికి అవతల 500 మీటర్ల దూరంలో ఉన్న driver కంటే, రోడ్డు మీద 2 కిమీ దూరంలో ఉన్నవాడు ముందు వస్తాడు |
| **ఒక్కొక్కరికే offer (sequential)** | అందరికీ ఒకేసారి పంపితే ఇద్దరు accept చేస్తారు — అప్పుడు ఒకరిని తిరస్కరించాలి, అది చెడ్డ అనుభవం |
| **Distributed lock తప్పనిసరి** | ఇద్దరు riders ఒకే driver కి ఒకేసారి request చేయొచ్చు. `SETNX` + TTL ఇక్కడ సరిపోతుంది |
| **Radius ని దశలవారీగా పెంచడం** | 3 కిమీ lo ఎవరూ లేకపోతే 5, తర్వాత 10. మొదటే 10 కిమీ వెతికితే అనవసరంగా దూరపు drivers వస్తారు |

## 6. Trip State Machine

```
REQUESTED → MATCHED → DRIVER_ARRIVING → IN_PROGRESS → COMPLETED
     ↓          ↓             ↓                            
 NO_DRIVER  CANCELLED    CANCELLED (fee వర్తించొచ్చు)
```

<div class="box warn">
<div class="lab">State machine ని ఎందుకు explicit గా చెప్పాలి</div>
Trip అనేది <b>ఒక long-running transaction</b> — ఇది నిమిషాలు, కొన్నిసార్లు గంటలు నడుస్తుంది. దాన్ని DB transaction తో చేయలేం. అందుకే state machine + <b>ప్రతి transition ని idempotent</b> గా ఉంచడం. Driver "arrived" button రెండుసార్లు నొక్కితే రెండో సారి ఏమీ జరగకూడదు. ఈ ఒక్క మాట చెప్తే — distributed systems lo long-lived workflows గురించి మీకు తెలుసని అర్థం.
</div>

## 7. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **250K location writes/sec** | Redis lo మాత్రమే, disk DB కి కాదు. `city_id` ప్రకారం Redis cluster ని shard చేయడం — cities స్వతంత్రం కాబట్టి ఇది సహజమైన shard key |
| **City-level hot shard** | ముంబై shard, గోవా shard కంటే 100 రెట్లు busy. City ని geohash prefix తో sub-shard చేయడం |
| **Driver app offline** | Location updates ఆగిపోతాయి → Redis GEO entry కి TTL పెట్టడం (30 సెకన్లు). Stale drivers తమంతట తామే pool నుంచి పోతారు |
| **Redis cluster down** | Matching ఆగిపోతుంది. Multi-AZ replicas + AOF. కానీ location data ephemeral కాబట్టి పోయినా 4 సెకన్లలో తిరిగి నిండుతుంది — ఇది recovery చాలా సులభం చేస్తుంది |
| **Live tracking (rider driver ని చూడటం)** | WebSocket (Problem 04). Driver location → gateway → ఆ trip ని చూస్తున్న rider కి push. ప్రతి location ని అందరికీ broadcast చేయకూడదు — ఆ trip lo ఉన్న ఇద్దరికే |
| **Surge pricing** | Geohash cell స్థాయిలో demand/supply ratio ని 1 నిమిషం window lo లెక్కించి multiplier. ఇది వేరే stream job |
| **Payment / fare** | Trip route ని archive చేసి, ముగిసిన తర్వాత fare లెక్కించడం. Live గా కాదు — trip మధ్యలో network పోవచ్చు |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me scope this: are trips always within one city, how often do driver apps report location, and is matching optimised for distance or ETA? I'll assume city-scoped trips, location every four seconds, and ETA-based matching. Pooling and payments I'll treat as separate problems."</p>
<p>"Here's the number that shapes everything. With a million drivers online reporting every four seconds, that's <em>two hundred and fifty thousand location writes per second</em>. Ride requests are only about two hundred and thirty a second. So location traffic outweighs ride traffic by a factor of a thousand — the interesting engineering is on the location path, not the booking path."</p>
<p>"My first decision follows from that: driver locations never touch a disk-backed database. A location is <em>ephemeral</em> — four seconds later it's garbage. It lives in Redis only. I do archive the route asynchronously to Cassandra during an active trip, for billing and disputes, but that's a thousand writes a second, not a quarter million."</p>
<p>"The core query is 'who is near me'. Doing that in SQL with latitude and longitude ranges is slow, because a B-tree only indexes one dimension well — you end up scanning the other. The standard answer is to project two dimensions onto one: geohashing turns a coordinate into a string where a shared prefix means physical proximity. Uber's H3 uses hexagons instead of rectangles, which is better because every neighbouring cell is equidistant — with square geohash cells, diagonal neighbours are further away than edge neighbours."</p>
<p>"One trap I'd flag explicitly: geohash cells have a <em>boundary problem</em>. A rider and driver fifty metres apart can land in different cells, so searching only your own cell misses them. You always search your cell plus its eight neighbours."</p>
<p>"For matching, I search a three-kilometre radius, take about twenty candidates, and rank them by <em>ETA rather than straight-line distance</em> — a driver five hundred metres away across a river is further in practice than one two kilometres down the road."</p>
<p>"Then correctness matters. Two riders can request the same driver simultaneously. I take a distributed lock on the driver — a Redis SET NX with a fifteen-second TTL, matching the offer window. The TTL is important: if the driver's app crashes mid-offer, the lock releases itself. A lock without a TTL means that driver is invisible forever."</p>
<p>"I also offer to drivers <em>one at a time</em> rather than broadcasting. Broadcasting gets two acceptances and forces me to reject someone who already committed, which is a bad experience. If three drivers decline or time out, I widen the radius."</p>
<p>"Finally, a trip is a long-running transaction — minutes to hours — so it can't be a database transaction. I model it as an explicit state machine with idempotent transitions, so a driver double-tapping 'arrived' doesn't corrupt anything."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "ETA ఎలా లెక్కిస్తారు?" | Road graph + historical traffic + live traffic. ఇది ఒక ప్రత్యేక service (OSRM/Valhalla లాంటిది). Matching service దాన్ని batch గా అడుగుతుంది — 20 candidates కి ఒకే call |
| "Pooling ఎలా మారుస్తుంది?" | Matching ఒక **optimisation problem** అవుతుంది — ఇప్పటికే ఉన్న route lo ఈ కొత్త rider ని కలిపితే ఎంత detour? Threshold దాటకుండా. దీనికి greedy + periodic re-optimisation |
| "Drivers ని ఎలా reposition చేస్తారు?" | Demand prediction (ML) → drivers కి "ఈ ప్రాంతానికి వెళ్ళండి" అని సూచన + incentive. ఇది matching కంటే వేరే loop |
| "Geohash precision ఎంత?" | Level ని density ని బట్టి — dense city lo 6 chars (~1.2 km), rural lo 5 (~5 km). H3 lo ఇది resolution parameter |
| "Trip మధ్యలో driver app crash అయితే?" | Trip state server side lo ఉంది కాబట్టి పోదు. Driver reconnect అయ్యాక server current state ని push చేస్తుంది. Location gap ని route archive lo interpolate చేయడం |
| "Fraud (fake GPS) ఎలా పట్టుకుంటారు?" | Speed anomaly (ఒక్క update lo 5 కిమీ దూకడం), route ని road graph తో snap చేసి match కాకపోవడం, device signals. ఇది వేరే detection pipeline |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">08</div>
<div class="kicker">Problem 08 · Offline / Online Split</div>
<div class="title">Design Typeahead<br>(Search Autocomplete)</div>
<div class="meta">Difficulty <b>Medium-Hard</b> · Frequency <b>ఎక్కువ</b> · నేర్పే concepts: trie, precomputed top-k, batch index build, latency budget</div>
</div>

## 1. The Ask

> "Design Google's search autocomplete. As the user types, show the top 5 suggestions — and it has to feel instant."

ఈ problem యొక్క ప్రత్యేకత: **latency budget చాలా కఠినం.** User అక్షరం టైప్ చేసిన 100 ms లోపు suggestions కనిపించాలి. అంతకంటే ఆలస్యమైతే user తర్వాతి అక్షరం టైప్ చేసేస్తాడు, మన జవాబు అప్పటికే పనికిరాదు.

<div class="box warn">
<div class="lab">ఈ problem నేర్పే అతి ముఖ్యమైన pattern</div>
<b>Read time lo ఏ పనీ చేయకూడదు.</b> Query వచ్చినప్పుడు ranking లెక్కలు, aggregation, sorting — ఏమీ చేయడానికి సమయం లేదు. అంటే <b>జవాబు ముందే సిద్ధంగా ఉండాలి</b>. ఇదే <i>offline build + online serve</i> pattern — ఇది search, recommendations, leaderboards, feed ranking అన్నిచోట్లా వస్తుంది.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| Prefix match మాత్రమేనా, typo tolerance ఉందా? | Fuzzy అంటే edit-distance — పూర్తిగా వేరే index | ప్రస్తుతం prefix మాత్రమే |
| ఎన్ని suggestions? | Top-k lo k విలువ — precompute size ని నిర్ణయిస్తుంది | 5 |
| Personalized నా global నా? | Personalized అంటే ప్రతి user కి వేరే index — భారీ | Global (personalization ని follow-up lo) |
| Suggestions ఎంత తాజాగా? | Real-time అంటే streaming index update | 1 గంట సరిపోతుంది (trending కి 5 నిమిషాలు) |
| Ranking దేని ఆధారంగా? | Frequency, recency, CTR | Frequency + recency |
| Offensive terms filter? | తప్పనిసరి — index build lo blocklist | అవును |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| Searches / day | 5 B |
| ఒక search lo keystrokes | ~20 |
| Debounce తర్వాత requests | ~5 per search |
| Autocomplete requests / day | 25 B |
| **QPS** | 25B ÷ 86,400 ≈ **290,000 / sec** (peak ≈ 900,000) |
| Unique queries index lo | ~100 M |
| సగటు query పొడవు | 20 chars |
| **Trie memory (naive)** | 100M × 20 × (node overhead) ≈ **చాలా GB** — sharding తప్పనిసరి |
| Latency budget | **p99 &lt; 100 ms** (network తో సహా) |

## 4. Deep Dive — Trie + Precomputed Top-K

<div class="fig">
<div class="cap">trie with top-k cached at every node</div>
<svg viewBox="0 0 750 275">
<circle cx="60" cy="30" r="16" fill="#17203a"/>
<text class="t-w mid" x="60" y="35">·</text>
<line class="ln" x1="66" y1="42" x2="128" y2="70" marker-end="url(#a)"/>
<text class="t-sm" x="88" y="52">c</text>
<circle cx="140" cy="78" r="16" fill="#17203a"/>
<text class="t-w mid" x="140" y="83">c</text>
<line class="ln" x1="150" y1="90" x2="208" y2="118" marker-end="url(#a)"/>
<text class="t-sm" x="170" y="100">a</text>
<circle cx="220" cy="126" r="16" fill="#17203a"/>
<text class="t-w mid" x="220" y="131">a</text>
<line class="ln" x1="230" y1="138" x2="288" y2="166" marker-end="url(#a)"/>
<text class="t-sm" x="250" y="148">r</text>
<circle cx="300" cy="174" r="16" fill="#e2653a"/>
<text class="t-w mid" x="300" y="179">r</text>
<line class="ln-acc" x1="318" y1="174" x2="360" y2="174" marker-end="url(#aa)"/>
<rect class="n-good" x="364" y="132" width="250" height="84" rx="4"/>
<text class="t-xs" x="376" y="150">PRECOMPUTED TOP-5 AT THIS NODE</text>
<text class="t-sm mono" x="376" y="170">car          · 8.2 M</text>
<text class="t-sm mono" x="376" y="186">career       · 3.1 M</text>
<text class="t-sm mono" x="376" y="202">cardiologist · 0.9 M</text>
<text class="t-sm" x="628" y="170">Query time =</text>
<text class="t-acc" x="628" y="188">3 pointer hops.</text>
<text class="t-sm" x="628" y="206">Sort లేదు, scan లేదు.</text>
<text class="t-xs" x="0" y="248">ఇది లేకపోతే: "car" prefix కింద ఉన్న అన్ని leaf nodes ని traverse చేసి, count ప్రకారం sort చేసి, top-5 తీయాలి —</text>
<text class="t-xs" x="0" y="266">"a" లాంటి చిన్న prefix కి అది లక్షల nodes. 100 ms budget lo అది అసాధ్యం. అందుకే ప్రతి node lo జవాబు ముందే దాచడం.</text>
</svg>
</div>

| నిర్ణయం | ఎందుకు |
|---------|---------|
| **ప్రతి node lo top-5 cache** | Query time O(prefix length) — data పరిమాణంతో సంబంధం లేదు |
| Memory ఖర్చు | ఒక్కో node కి 5 strings అదనం. Memory పెరుగుతుంది, కానీ latency కి అది సరైన బేరం |
| **Trie ని immutable గా ఉంచడం** | Serve చేస్తున్న trie ని ఎప్పుడూ modify చేయకూడదు. కొత్తది build చేసి **atomic swap** — lock లేదు, consistency సమస్య లేదు |

## 5. Deep Dive — Offline Build + Online Serve

<div class="fig">
<div class="cap">two independent pipelines · ఇదే ఈ design యొక్క గుండె</div>
<svg viewBox="0 0 750 285">
<text class="t-xs" x="0" y="14">OFFLINE · గంటకోసారి · latency ముఖ్యం కాదు</text>
<rect class="n-soft" x="0" y="24" width="120" height="46" rx="4"/>
<text class="t mid" x="60" y="44">Query logs</text>
<text class="t-sm mid" x="60" y="59">5 B / day</text>
<line class="ln" x1="124" y1="47" x2="152" y2="47" marker-end="url(#a)"/>
<rect class="n-soft" x="156" y="24" width="130" height="46" rx="4"/>
<text class="t mid" x="221" y="44">Aggregate</text>
<text class="t-sm mid" x="221" y="59">frequency + recency</text>
<line class="ln" x1="290" y1="47" x2="318" y2="47" marker-end="url(#a)"/>
<rect class="n-soft" x="322" y="24" width="130" height="46" rx="4"/>
<text class="t mid" x="387" y="44">Filter</text>
<text class="t-sm mid" x="387" y="59">spam · offensive</text>
<line class="ln" x1="456" y1="47" x2="484" y2="47" marker-end="url(#a)"/>
<rect class="n-acc" x="488" y="24" width="140" height="46" rx="4"/>
<text class="t-w mid" x="558" y="44">Build trie</text>
<text class="t-w-sm mid" x="558" y="59">top-5 at every node</text>
<line class="ln-acc" x1="632" y1="47" x2="660" y2="47" marker-end="url(#aa)"/>
<rect class="n-good" x="664" y="24" width="86" height="46" rx="4"/>
<text class="t mid" x="707" y="44">Snapshot</text>
<text class="t-sm mid" x="707" y="59">S3</text>
<line class="ln-acc" x1="707" y1="74" x2="707" y2="108" marker-end="url(#aa)"/>
<text class="t-xs" x="0" y="106">ONLINE · 290,000 QPS · 100 ms budget</text>
<rect class="n" x="0" y="118" width="100" height="46" rx="4"/>
<text class="t mid" x="50" y="138">Browser</text>
<text class="t-sm mid" x="50" y="153">debounce 150ms</text>
<line class="ln" x1="104" y1="141" x2="132" y2="141" marker-end="url(#a)"/>
<rect class="n-info" x="136" y="118" width="110" height="46" rx="4"/>
<text class="t mid" x="191" y="138">CDN edge</text>
<text class="t-sm mid" x="191" y="153">popular prefixes</text>
<line class="ln" x1="250" y1="141" x2="278" y2="141" marker-end="url(#a)"/>
<rect class="n-dark" x="282" y="118" width="120" height="46" rx="4"/>
<text class="t-w mid" x="342" y="138">Router</text>
<text class="t-w-sm mid" x="342" y="153">prefix → shard</text>
<line class="ln" x1="342" y1="168" x2="342" y2="196" marker-end="url(#a)"/>
<rect class="n-dark" x="200" y="200" width="92" height="46" rx="4"/>
<text class="t-w mid" x="246" y="220">Shard a-f</text>
<text class="t-w-sm mid" x="246" y="235">in-memory trie</text>
<rect class="n-dark" x="298" y="200" width="92" height="46" rx="4"/>
<text class="t-w mid" x="344" y="220">Shard g-p</text>
<text class="t-w-sm mid" x="344" y="235">in-memory trie</text>
<rect class="n-dark" x="396" y="200" width="92" height="46" rx="4"/>
<text class="t-w mid" x="442" y="220">Shard q-z</text>
<text class="t-w-sm mid" x="442" y="235">in-memory trie</text>
<line class="ln-acc" x1="664" y1="141" x2="500" y2="200" marker-end="url(#aa)"/>
<rect class="n-good" x="530" y="118" width="220" height="46" rx="4"/>
<text class="t mid" x="640" y="138">కొత్త snapshot ని load చేసి</text>
<text class="t-sm mid" x="640" y="153">atomic గా swap — downtime లేదు</text>
<text class="t-xs" x="0" y="272">SERVING PATH లో DATABASE లేదు · DISK లేదు · అంతా RAM లో. అందుకే 5 ms lo జవాబు వస్తుంది.</text>
</svg>
<div class="note"><b>ఈ విభజనే జవాబు.</b> భారీ పని (5 billion logs ని aggregate చేయడం) offline lo, గంటకోసారి. Serving path lo కేవలం memory lookup. రెండూ కలిపేస్తే — query time lo aggregate చేయడానికి ప్రయత్నిస్తే — latency budget ఎప్పటికీ కుదరదు.</div>
</div>

## 6. Sharding &amp; Client-side Optimisations

| Sharding option | Verdict |
|-----------------|---------|
| First letter ప్రకారం (a-z) | ❌ Uneven — 'a', 's' shards భారీ; 'x', 'z' ఖాళీ |
| **First 2-3 letters ప్రకారం, load-balanced grouping** | ✅ Historical traffic ని బట్టి prefixes ని groups గా కట్టడం |
| Hash of prefix | ❌ పని చేయదు — prefix search కి ఒకే shard lo related prefixes ఉండాలి |

<div class="box info">
<div class="lab">Client-side తో సగం సమస్య పోతుంది</div>
<b>1. Debounce (150 ms)</b> — ప్రతి keystroke కి request పంపొద్దు. ఇది traffic ని 20 → 5 కి తగ్గిస్తుంది.<br>
<b>2. Local cache</b> — "car" కి జవాబు వచ్చాక, user "card" టైప్ చేస్తే — "car" జవాబులో "card" ఉంటే ఆ suggestions ని local గా filter చేయొచ్చు, request అవసరం లేదు.<br>
<b>3. CDN caching</b> — "fac" లాంటి popular prefixes కి జవాబు అందరికీ ఒకటే. దాన్ని edge lo 5 నిమిషాలు cache చేస్తే backend traffic భారీగా తగ్గుతుంది.<br><br>
ఈ మూడూ కలిపి 290,000 QPS ని backend కి చేరే ముందే <b>80%+ తగ్గిస్తాయి</b>. Client ని design lo భాగంగా చూడటం — ఇది చాలా మంది మర్చిపోతారు.
</div>

## 7. Freshness — Trending terms

గంటకోసారి build సరిపోతుంది... **సాధారణంగా**. కానీ ఏదైనా పెద్ద సంఘటన జరిగినప్పుడు కొత్త term ని జనం వెతకడం మొదలుపెడతారు, అది గంట ఆలస్యం అయితే పనికిరాదు.

<div class="box good">
<div class="lab">Two-layer approach</div>
"Base trie గంటకోసారి batch build. దాని పైన ఒక చిన్న <b>real-time layer</b> — గత 5 నిమిషాల query stream నుంచి trending terms ని Redis lo. Query వచ్చినప్పుడు రెండింటినీ చూసి merge చేస్తాను. Real-time layer చిన్నది (కొన్ని వేల terms) కాబట్టి ఇది latency కి పెద్దగా ఖర్చు కాదు. ఇది <b>lambda architecture</b> — batch layer ఖచ్చితత్వానికి, speed layer తాజాదనానికి."
</div>

## 8. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Shard down** | ప్రతి shard కి 3+ replicas. Autocomplete optional feature — worst case suggestions కనిపించవు, search మాత్రం పని చేస్తుంది. **Graceful degradation** |
| **Snapshot load సమయం** | Trie build చేసిన serialized form ని load చేయడం (mmap). Load పూర్తయ్యాకే traffic ని కొత్త దానికి మార్చడం |
| **Memory పరిమితి** | Trie ని compress: common prefixes ని merge (radix tree), strings ని interned pool lo, top-5 lo ids మాత్రమే ఉంచి strings ని వేరే array lo |
| **Bad suggestion (offensive)** | Build pipeline lo blocklist + ఒక manual override list, అది real-time layer lo apply అవుతుంది (గంట ఎదురుచూడకుండా) |
| **Traffic spike** | Serving stateless కాబట్టి autoscale. CDN అప్పటికే 60%+ absorb చేస్తుంది |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me pin the requirements: prefix matching only or typo tolerance, how many suggestions, global or personalised, and how fresh do they need to be? I'll assume prefix-only, top five, global, and roughly hourly freshness — with a carve-out for trending terms."</p>
<p>"The defining constraint here is the latency budget. Suggestions have to appear within about a hundred milliseconds, otherwise the user has already typed the next character and my answer is stale. At around three hundred thousand queries a second, that means <em>I cannot do any real work at query time</em> — no aggregation, no sorting, no database."</p>
<p>"So the whole design is an offline/online split. Offline, a batch job reads query logs, aggregates by frequency and recency, filters spam and offensive terms, and builds a trie. Online, servers hold that trie in memory and do nothing but walk it."</p>
<p>"The key trick is that I <em>precompute the top five at every node</em>, not just at leaves. Without that, answering a short prefix like 'a' would mean traversing millions of descendant nodes and sorting them. With it, a query is just three or four pointer hops — the cost is independent of how much data sits below."</p>
<p>"The served trie is immutable. A new build produces a snapshot, servers load it, and swap atomically. No locking, no partial-update consistency problems."</p>
<p>"For sharding, I wouldn't shard by first letter — 'a' and 's' would be enormous while 'x' and 'z' sit idle. I'd group prefixes into balanced buckets based on historical traffic. Hashing doesn't work here at all, because prefix search needs related prefixes co-located."</p>
<p>"A lot of the load never needs to reach me. Debouncing at a hundred and fifty milliseconds cuts requests per search from twenty to about five. The client can filter locally — if I already have results for 'car', typing 'card' often doesn't need a round trip. And popular prefixes are identical for every user, so a CDN can cache them for a few minutes. Together those remove most of the traffic before it hits a server."</p>
<p>"Hourly freshness fails for breaking news, so I'd add a small real-time layer: trending terms from the last five minutes in Redis, merged with the batch result at query time. That's a lambda architecture — the batch layer for accuracy, a thin speed layer for recency."</p>
<p>"On failure, I'd note that autocomplete is a convenience, not the product. If a shard is down, the right behaviour is to return nothing and let the user press enter — degrade gracefully rather than fail the search box."</p>
</div>

## 9. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Typo tolerance ఎలా?" | Prefix trie సరిపోదు. **BK-tree** లేదా edit-distance-1 variants ని ముందే generate చేసి index lo పెట్టడం. లేదా n-gram index + fuzzy scoring. ఖరీదు గణనీయంగా పెరుగుతుంది |
| "Personalization ఎలా కలపాలి?" | Global top-20 ని తీసుకుని, user history తో re-rank చేయడం. User-specific trie కాదు — అది scale కాదు. Personalization ఎప్పుడూ **re-ranking layer**, index layer కాదు |
| "బహుళ భాషలు?" | భాష ప్రకారం వేరే tries. Language detection ని client locale + typed characters నుంచి. Unicode prefix handling జాగ్రత్త (ఒక "అక్షరం" బహుళ code points కావొచ్చు) |
| "Index build ఎంత సమయం?" | 100M queries → MapReduce/Spark job, ~30 నిమిషాలు. గంటకోసారి build చేయడానికి ఇది సరిపోతుంది |
| "సరిగ్గా Google లాగా చేయాలంటే?" | Google personalization + location + session context + ML ranking వాడుతుంది. కానీ **అంతర్గత structure ఇదే** — precomputed candidates + re-ranking |
| "Search results కూడా design చేయాలంటే?" | అది పూర్తిగా వేరే problem — inverted index, TF-IDF/BM25, distributed scoring. Typeahead అనేది దాని ముందు ఉన్న చిన్న, ప్రత్యేకమైన system |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">09</div>
<div class="kicker">Problem 09 · Correctness Over Scale</div>
<div class="title">Design a Payment System<br>&amp; Ledger</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>ఎక్కువ (fintech lo తప్పనిసరి)</b> · నేర్పే concepts: idempotency, double-entry, saga, reconciliation</div>
</div>

## 1. The Ask

> "Design the payment system for an e-commerce site. A user pays, we charge their card through a payment provider, and our books must always be correct."

<div class="box warn">
<div class="lab">ఈ problem lo scale ఒక ఎర</div>
QPS చిన్నది — సెకనుకి కొన్ని వేలు మాత్రమే. కానీ ఇక్కడ <b>ఒక్క తప్పు = నిజమైన డబ్బు నష్టం</b>. Feed lo ఒక post మిస్ అయితే ఎవరూ పట్టించుకోరు. ఇక్కడ ఒక్క double-charge అంటే customer కోపం, refund, chargeback, regulatory problem. అందుకే ఈ interview lo మీరు <b>scale గురించి కాదు, correctness గురించి</b> మాట్లాడాలి. "How do you make sure money is never lost or duplicated?" — ఇదే అసలు ప్రశ్న.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| మనం card data ని handle చేస్తామా? | చేస్తే PCI-DSS compliance — భారీ బాధ్యత | లేదు, PSP (Stripe/Razorpay) tokenization |
| ఏఏ payment methods? | ఒక్కో దానికీ వేరే flow (UPI async, card sync) | Card, UPI, wallet |
| Refunds, partial refunds? | Ledger design ని మారుస్తుంది | అవును |
| బహుళ currencies? | FX rate ని ఎప్పుడు lock చేయాలి అనే ప్రశ్న | ఒక్క currency (ఇప్పటికి) |
| Marketplace నా, single seller నా? | Marketplace అంటే split payments, payouts | Single seller |
| Reconciliation ఎవరిది? | Finance team కి రోజువారీ report కావాలి | మనదే |

## 3. Deep Dive — Idempotency (ఇదే మొదటి రక్షణ గోడ)

**దృశ్యం:** User "Pay" నొక్కాడు. Request వెళ్ళింది, PSP charge చేసింది, కానీ జవాబు తిరిగి రాకముందే network timeout అయింది. App "Failed" చూపించింది. User మళ్ళీ "Pay" నొక్కాడు.

<div class="box bad">
<div class="lab">Idempotency లేకపోతే</div>
User కి <b>రెండుసార్లు charge</b> అయింది. అతను చూసేది ఒకే order, కానీ bank statement lo రెండు entries. ఇది అతి సాధారణమైన payment bug — మరియు అతి ఖరీదైనది.
</div>

<div class="fig">
<div class="cap">payment intent · state machine</div>
<svg viewBox="0 0 750 215">
<rect class="n-info" x="0" y="60" width="120" height="46" rx="4"/>
<text class="t mid" x="60" y="80">CREATED</text>
<text class="t-sm mid" x="60" y="96">intent + amount lock</text>
<line class="ln" x1="124" y1="83" x2="158" y2="83" marker-end="url(#a)"/>
<rect class="n-soft" x="162" y="60" width="130" height="46" rx="4"/>
<text class="t mid" x="227" y="80">PROCESSING</text>
<text class="t-sm mid" x="227" y="96">PSP కి పంపాం</text>
<line class="ln-acc" x1="296" y1="72" x2="336" y2="42" marker-end="url(#aa)"/>
<line class="ln" x1="296" y1="94" x2="336" y2="128" marker-end="url(#a)"/>
<rect class="n-good" x="340" y="18" width="130" height="46" rx="4"/>
<text class="t mid" x="405" y="38">SUCCEEDED</text>
<text class="t-sm mid" x="405" y="54">ledger entry రాయడం</text>
<rect class="n-bad" x="340" y="112" width="130" height="46" rx="4"/>
<text class="t mid" x="405" y="132">FAILED</text>
<text class="t-sm mid" x="405" y="148">కారణం record చేయడం</text>
<line class="ln" x1="474" y1="41" x2="508" y2="41" marker-end="url(#a)"/>
<rect class="n-soft" x="512" y="18" width="130" height="46" rx="4"/>
<text class="t mid" x="577" y="38">REFUNDED</text>
<text class="t-sm mid" x="577" y="54">reversal entry</text>
<rect class="n-acc" x="0" y="150" width="292" height="56" rx="4"/>
<text class="t-w mid" x="146" y="172">అదే idempotency_key మళ్ళీ వస్తే</text>
<text class="t-w-sm mid" x="146" y="190">కొత్త intent సృష్టించము — ఉన్నదాని</text>
<text class="t-w-sm mid" x="146" y="202">current state ని తిరిగి ఇస్తాం</text>
<text class="t-sm" x="512" y="94">PROCESSING lo timeout అయితే</text>
<text class="t-sm" x="512" y="112">FAILED అనుకోకూడదు —</text>
<text class="t-acc" x="512" y="130">PSP ని అడిగి తెలుసుకోవాలి</text>
<text class="t-sm" x="512" y="148">(status polling / webhook)</text>
</svg>
<div class="note"><b>PROCESSING నుంచి FAILED కి తొందరపడి వెళ్ళకూడదు.</b> Timeout అంటే "జరగలేదు" అని అర్థం కాదు — "ఏం జరిగిందో తెలియదు" అని అర్థం. ఈ తేడాయే payment systems lo అతి ముఖ్యమైన మానసిక మార్పు.</div>
</div>

```javascript
async function pay(req) {
  const key = req.idempotencyKey;               // client generate చేసినది (UUID)

  // 1. ఈ key ఇప్పటికే ఉందా? ఉంటే ఉన్న ఫలితమే తిరిగి ఇవ్వు — మళ్ళీ charge చేయొద్దు.
  const existing = await db.paymentIntents.findByKey(key);
  if (existing) return existing;                // అదే జవాబు, side effect లేదు

  // 2. లేకపోతే intent ని CREATED గా రాయడం (ఇక్కడ unique constraint మీద ఆధారపడుతున్నాం)
  const intent = await db.paymentIntents.insert({
    key, orderId: req.orderId, amount: req.amount, status: 'CREATED',
  });                                            // duplicate key error → step 1 కి retry

  // 3. PSP కి పంపేటప్పుడు మన key నే forward చేయడం —
  //    PSP కూడా idempotent, అంటే మనకి రెండు రక్షణ పొరలు.
  await db.paymentIntents.setStatus(intent.id, 'PROCESSING');
  const result = await psp.charge({ ...req, idempotencyKey: key });

  return finalise(intent.id, result);            // SUCCEEDED / FAILED + ledger entry
}
```

## 4. Deep Dive — Double-Entry Ledger

**"Balance ఒక column lo ఉంచి, `UPDATE balance = balance - 100` చేస్తే సరిపోదా?"** — సరిపోదు. అలా చేస్తే డబ్బు *ఎక్కడి నుంచి ఎక్కడికి* వెళ్ళిందో record లేదు. Audit సాధ్యం కాదు, bug వస్తే ఎక్కడ తప్పిందో తెలియదు.

<div class="fig">
<div class="cap">double-entry · ప్రతి లావాదేవీకి రెండు వరుసలు, మొత్తం ఎప్పుడూ సున్నా</div>
<svg viewBox="0 0 750 240">
<text class="t-xs" x="0" y="14">TRANSACTION t-8891 · CUSTOMER PAYS ₹1,000</text>
<rect class="n-soft" x="0" y="24" width="750" height="26" rx="3"/>
<text class="t-sm" x="14" y="42">entry_id</text>
<text class="t-sm" x="120" y="42">txn_id</text>
<text class="t-sm" x="240" y="42">account</text>
<text class="t-sm" x="450" y="42">debit</text>
<text class="t-sm" x="580" y="42">credit</text>
<rect class="n" x="0" y="52" width="750" height="30" rx="3"/>
<text class="t-sm mono" x="14" y="72">e-1</text>
<text class="t-sm mono" x="120" y="72">t-8891</text>
<text class="t-sm mono" x="240" y="72">customer:4471:wallet</text>
<text class="t-sm mono" x="450" y="72">1,000.00</text>
<text class="t-sm mono" x="580" y="72">—</text>
<rect class="n" x="0" y="84" width="750" height="30" rx="3"/>
<text class="t-sm mono" x="14" y="104">e-2</text>
<text class="t-sm mono" x="120" y="104">t-8891</text>
<text class="t-sm mono" x="240" y="104">merchant:88:receivable</text>
<text class="t-sm mono" x="450" y="104">—</text>
<text class="t-sm mono" x="580" y="104">970.00</text>
<rect class="n" x="0" y="116" width="750" height="30" rx="3"/>
<text class="t-sm mono" x="14" y="136">e-3</text>
<text class="t-sm mono" x="120" y="136">t-8891</text>
<text class="t-sm mono" x="240" y="136">platform:fee_revenue</text>
<text class="t-sm mono" x="450" y="136">—</text>
<text class="t-sm mono" x="580" y="136">30.00</text>
<rect class="n-good" x="0" y="152" width="750" height="30" rx="3"/>
<text class="t mono" x="240" y="172">SUM</text>
<text class="t mono" x="450" y="172">1,000.00</text>
<text class="t mono" x="580" y="172">1,000.00</text>
<text class="t-acc" x="660" y="172">✓ balanced</text>
<rect class="n-acc" x="0" y="194" width="750" height="42" rx="4"/>
<text class="t-w mid" x="375" y="212">ప్రతి transaction lo debits sum = credits sum. ఇది invariant.</text>
<text class="t-w-sm mid" x="375" y="228">ఏ entry నీ ఎప్పుడూ update/delete చేయము — తప్పు జరిగితే reversal entry రాస్తాం</text>
</svg>
</div>

| నియమం | ఎందుకు |
|-------|---------|
| **Append-only, immutable** | Ledger row ని ఎప్పుడూ update చేయకూడదు. తప్పు జరిగితే opposite entry రాయాలి. దీంతో పూర్తి audit trail |
| **Debits = Credits invariant** | ఇది ఒక **automated check**. ప్రతి రాత్రి `SUM(debit) - SUM(credit) = 0` కాకపోతే alert. Bug వెంటనే బయటపడుతుంది |
| **Balance ఒక derived value** | `SELECT SUM(credit) - SUM(debit) WHERE account = ?`. వేగం కోసం snapshot cache, కానీ **source of truth entries మాత్రమే** |
| **Integers, floats కాదు** | `0.1 + 0.2 !== 0.3`. Money ని ఎప్పుడూ paise/cents lo integer గా store చేయాలి. ఇది ప్రస్తావిస్తే గట్టి point |

## 5. Deep Dive — Order + Payment + Inventory (Saga)

Order create, payment charge, inventory reserve — ఇవి మూడు వేర్వేరు services. ఒక్క transaction lo చేయలేం.

<div class="fig">
<div class="cap">saga · forward steps + compensations</div>
<svg viewBox="0 0 750 235">
<rect class="n-good" x="0" y="20" width="150" height="48" rx="4"/>
<text class="t mid" x="75" y="40">1 · Order created</text>
<text class="t-sm mid" x="75" y="57">status: PENDING</text>
<line class="ln" x1="154" y1="44" x2="192" y2="44" marker-end="url(#a)"/>
<rect class="n-good" x="196" y="20" width="150" height="48" rx="4"/>
<text class="t mid" x="271" y="40">2 · Inventory reserved</text>
<text class="t-sm mid" x="271" y="57">15 నిమిషాల hold</text>
<line class="ln" x1="350" y1="44" x2="388" y2="44" marker-end="url(#a)"/>
<rect class="n-bad" x="392" y="20" width="150" height="48" rx="4"/>
<text class="t mid" x="467" y="40">3 · Payment ✗</text>
<text class="t-sm mid" x="467" y="57">card declined</text>
<line class="ln-acc" x1="467" y1="72" x2="467" y2="102" marker-end="url(#aa)"/>
<rect class="n-acc" x="330" y="106" width="274" height="42" rx="4"/>
<text class="t-w mid" x="467" y="126">COMPENSATE — వెనక్కి తిరగడం</text>
<text class="t-w-sm mid" x="467" y="141">ROLLBACK కాదు. ఇప్పటికే commit అయినవాటిని రద్దు చేసే కొత్త actions</text>
<line class="ln-acc" x1="330" y1="127" x2="292" y2="127" marker-end="url(#aa)"/>
<rect class="n-info" x="140" y="106" width="146" height="42" rx="4"/>
<text class="t mid" x="213" y="126">Inventory release</text>
<text class="t-sm mid" x="213" y="141">hold తీసివేయడం</text>
<line class="ln-acc" x1="140" y1="127" x2="102" y2="127" marker-end="url(#aa)"/>
<rect class="n-info" x="0" y="106" width="96" height="42" rx="4"/>
<text class="t-sm mid" x="48" y="126">Order →</text>
<text class="t-sm mid" x="48" y="141">CANCELLED</text>
<rect class="n-soft" x="0" y="164" width="750" height="66" rx="4"/>
<text class="t" x="16" y="186">Compensation ఎప్పుడూ rollback కాదు — payment already succeed అయి తర్వాతి step fail అయితే,</text>
<text class="t" x="16" y="206">"charge ని undo" చేయలేం. బదులుగా REFUND అనే కొత్త transaction రాస్తాం.</text>
<text class="t-acc" x="16" y="224">అందుకే డబ్బు తీసే step ని ఎప్పుడూ saga lo చివరన పెట్టాలి.</text>
</svg>
</div>

<div class="box good">
<div class="lab">2PC కాదు, ఎందుకు?</div>
"Two-phase commit ఇక్కడ వాడను. కారణం — coordinator crash అయితే participants అందరూ <b>locks పట్టుకుని blocked</b> గా ఉండిపోతారు. External PSP మీద అసలు 2PC చేయలేం, వాళ్ళు మన coordinator ని పాటించరు. అందుకే <b>saga</b> — ప్రతి step ని commit చేసి, fail అయితే compensating actions నడపడం. Availability కోసం atomicity ని వదులుకోవడం, ఆ మధ్యంతర inconsistency ని explicit states తో బహిర్గతం చేయడం."
</div>

## 6. Deep Dive — PSP Webhooks &amp; Reconciliation

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Webhook ఆలస్యంగా వస్తుంది** | Webhook మీద మాత్రమే ఆధారపడొద్దు. PROCESSING lo ఉన్న intents కి **polling job** కూడా — 30s, 2min, 10min తర్వాత PSP ని అడగడం |
| **Webhook తప్పు order lo వస్తుంది** | `succeeded` కంటే ముందు `refunded` రావొచ్చు. ప్రతి webhook lo ఉన్న **event timestamp/version** ని చూసి, పాతది అయితే వదిలేయడం |
| **Webhook duplicate** | Event id ని store చేసి dedupe — idempotency మళ్ళీ ఇక్కడ |
| **Webhook నకిలీది** | Signature verification తప్పనిసరి (HMAC). లేకపోతే ఎవరైనా "payment succeeded" అని పంపొచ్చు |
| **మన record vs PSP record తేడా** | **రోజువారీ reconciliation** — PSP settlement file ని download చేసి మన ledger తో line-by-line match. తేడాలని exception queue lo పెట్టి manual review |

<div class="box warn">
<div class="lab">ఈ వాక్యం చెప్తే మీరు fintech తెలిసినవారు</div>
"<b>Source of truth మనం కాదు — bank/PSP.</b> మన ledger ఒక record మాత్రమే. అందుకే reconciliation ఐచ్ఛికం కాదు, తప్పనిసరి. ప్రతి రాత్రి PSP settlement report తో మన entries ని match చేసి, తేడాలని ఒక exception queue lo పెడతాను. ఏ payment system అయినా ఈ reconciliation job లేకపోతే — ఎప్పుడో ఒకప్పుడు నిశ్శబ్దంగా డబ్బు తప్పిపోతుంది, ఎవరికీ తెలియదు."
</div>

## 7. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **PSP down** | Circuit breaker + secondary PSP కి failover. Intent CREATED lo ఆగి, provider తిరిగి వచ్చాక retry. User కి "processing" చూపించడం, "failed" కాదు |
| **DB write fail (ledger రాసేటప్పుడు)** | Payment మరియు ledger entry <b>ఒకే DB transaction lo</b> ఉండాలి. వేరైతే — charge అయి ledger రాయకపోతే — డబ్బు కనిపించకుండా పోతుంది |
| **Event publish + DB write (dual write)** | **Outbox pattern** — event ని అదే transaction lo `outbox` table lo రాసి, ఒక relay దాన్ని Kafka కి పంపడం. దీంతో "DB rollback అయినా event వెళ్ళిపోయింది" అనే సమస్య పోతుంది |
| **Ledger పరిమాణం** | Append-only కాబట్టి ఎప్పటికీ పెరుగుతుంది. నెలవారీ partitioning + పాత partitions ని cold storage కి. Account balance snapshots (month-end) తో query వేగం |
| **Hot account (platform fee account)** | ప్రతి transaction కీ ఈ ఒక్క account కి entry — contention. **Sharded sub-accounts** (`fee_revenue:shard_0..9`) పెట్టి, balance చదివేటప్పుడు కలపడం |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"First, a scoping question that matters a lot: do we touch raw card data? I'll assume no — we use a provider like Stripe and only ever see tokens, which keeps us out of full PCI scope."</p>
<p>"I want to name the shape of this problem up front. The throughput here is modest — a few thousand a second. This is not a scale problem, it's a <em>correctness</em> problem. Losing a post in a feed costs nothing; double-charging a customer costs money, trust, and possibly a regulator's attention. So I'll spend my time on the guarantees, not the box count."</p>
<p>"The first line of defence is idempotency. The classic failure is: the user taps Pay, we charge the provider, the response times out, the app shows 'failed', and the user taps again. Without protection that's two charges. So every payment carries a client-generated idempotency key. We insert a payment intent keyed on it with a unique constraint; if the key already exists we return the existing intent instead of charging again. And we forward that same key to the provider, so there are two independent layers of protection."</p>
<p>"A related subtlety: on timeout I do <em>not</em> mark the payment failed. A timeout means 'I don't know what happened', not 'it didn't happen'. The intent stays in PROCESSING and we resolve it via webhook or by polling the provider. Confusing 'unknown' with 'failed' is how systems lose money."</p>
<p>"For the books I'd use a <em>double-entry ledger</em> rather than a balance column. Every transaction writes at least two rows that sum to zero — debit the customer, credit the merchant, credit the platform fee. The ledger is append-only and immutable: corrections are reversal entries, never updates. That gives a complete audit trail, and it gives me an automated invariant — total debits must equal total credits — so I can detect a bug the same night instead of during an audit. And money is stored as integers in the smallest unit, because floating point cannot represent currency correctly."</p>
<p>"Order, inventory and payment span three services, so I'd use a <em>saga</em> rather than two-phase commit. 2PC leaves participants holding locks if the coordinator dies, and it's simply not available to me across an external payment provider. In a saga each step commits independently and failures trigger compensating actions. Compensation isn't rollback — once a charge succeeds you can't un-charge it, you issue a refund, which is a new transaction. That's why I order the saga to take money <em>last</em>."</p>
<p>"On provider integration: I never rely on webhooks alone. Webhooks arrive late, out of order, duplicated, and can be forged. So I verify signatures, dedupe on event ID, ignore events older than my current state, and run a polling job as a backstop for anything stuck in PROCESSING."</p>
<p>"Finally, the thing that distinguishes a real payment system: <em>daily reconciliation</em>. We are not the source of truth — the provider and the bank are. Every night I pull the settlement file and match it line by line against our ledger, and anything that doesn't match goes to an exception queue for a human. Without that job, discrepancies accumulate silently and nobody finds out for months."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Partial refund ఎలా?" | కొత్త transaction, తక్కువ మొత్తానికి reversal entries. మొత్తం refunded amount ≤ original amount అనే check. Original entry ని ఎప్పుడూ ముట్టుకోకూడదు |
| "Multi-currency?" | ప్రతి account కి ఒక currency. Cross-currency అంటే FX conversion account గుండా — మూడు entries (debit USD, credit FX, debit FX, credit INR). Rate ని transaction సమయంలో lock చేసి store చేయడం |
| "Marketplace / split payment?" | Merchant కి ఒక receivable account, payout ఒక వేరే transaction. Escrow period lo డబ్బు platform account lo ఉంటుంది — ledger lo ఇది సహజంగా representable |
| "Chargeback?" | ఒక కొత్త transaction (reversal + fee). ఒక `disputes` state machine. Chargeback వచ్చినప్పుడు order ని కూడా flag చేయాలి |
| "Fraud detection?" | Payment path lo ఒక synchronous risk check (velocity, device, amount anomaly) + async deeper scoring. Risk score ఎక్కువ అయితే manual review queue |
| "Exactly-once ఎలా guarantee చేస్తారు?" | చేయము — **at-least-once + idempotency = exactly-once effect**. ఇదే నిజాయితీ గల జవాబు. "Exactly-once delivery" అని చెప్పే candidate ని interviewer వెంటనే గుర్తుపడతాడు |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">10</div>
<div class="kicker">Problem 10 · Time &amp; Coordination</div>
<div class="title">Design a Distributed<br>Job Scheduler</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>మధ్యస్థం (కానీ SSE lo ఎక్కువ)</b> · నేర్పే concepts: time bucketing, leases, zombie detection, jitter</div>
</div>

## 1. The Ask

> "Design a system that runs scheduled jobs — cron at scale. A hundred million jobs, each with its own schedule, executed reliably across a fleet of workers."

<div class="grid">
<div class="card">
<div class="t">కష్టం 1 · Discovery</div>
<div class="s">"ఇప్పుడు ఏ jobs run అవ్వాలి?" — 100 million rows lo ప్రతి సెకనుకి ఈ query వేయలేం.</div>
</div>
<div class="card">
<div class="t">కష్టం 2 · Coordination</div>
<div class="s">50 workers ఉన్నారు. ఒకే job ని ఇద్దరు తీసుకోకుండా ఎలా ఆపాలి? Worker crash అయితే?</div>
</div>
<div class="card">
<div class="t">కష్టం 3 · Time</div>
<div class="s">అందరూ "ప్రతి గంట మొదట్లో" అని schedule చేస్తారు. :00 కి లక్షల jobs ఒకేసారి.</div>
</div>
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| One-time నా recurring నా? | Recurring అంటే run తర్వాత తర్వాతి run ని schedule చేయాలి | రెండూ |
| Precision ఎంత? | సెకను ఖచ్చితత్వం vs నిమిషం — architecture మారుతుంది | ±1 సెకను |
| Job ఎంతసేపు నడుస్తుంది? | గంటల job అంటే heartbeat + lease renewal కావాలి | సెకన్ల నుంచి గంటల దాకా |
| **At-least-once నా at-most-once నా?** | ఇదే అతి ముఖ్యమైన ప్రశ్న | At-least-once (idempotent jobs) |
| Jobs మధ్య dependency ఉందా? | ఉంటే ఇది workflow engine (Airflow) అవుతుంది | లేదు, స్వతంత్రం |
| Failure అయితే retry? | Backoff policy | 3 retries, exponential |

<div class="box warn">
<div class="lab">At-least-once vs at-most-once — ఇక్కడ నిజం చెప్పండి</div>
"రెండూ ఒకేసారి ఇవ్వలేను. Worker job ని run చేసి, 'పూర్తయింది' అని రాయకముందే crash అయితే — నేను దాన్ని మళ్ళీ run చేయాలా (at-least-once, duplicate risk) లేక వదిలేయాలా (at-most-once, miss risk)? నేను <b>at-least-once</b> ఎంచుకుంటాను, ఎందుకంటే job ని miss చేయడం కంటే రెండుసార్లు run చేయడం మేలు — మరియు jobs ని idempotent గా రాయమని contract పెడతాను. ఇది system limitation ని user కి బదిలీ చేయడం — కానీ అదే నిజాయితీ గల design."
</div>

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| మొత్తం scheduled jobs | 100 M |
| సగటు execution rate | ≈ 10,000 / sec |
| **Peak (:00 spike)** | ≈ **200,000 / sec** — సగటు కంటే 20 రెట్లు |
| Job metadata size | ≈ 1 KB |
| Metadata storage | 100 GB |
| Execution history (30 రోజులు) | 10K/s × 86400 × 30 × 200 B ≈ 5 TB |

## 4. Deep Dive — "ఇప్పుడు ఏ jobs due?" (Discovery)

| Approach | సమస్య |
|----------|--------|
| `SELECT * FROM jobs WHERE next_run <= NOW()` ప్రతి సెకనుకి | ❌ 100M rows మీద index scan, ప్రతి సెకనుకి, 50 workers నుంచి. DB చస్తుంది |
| Job కి ఒక OS timer | ❌ 100 million timers. Memory పేలుతుంది, restart అయితే అన్నీ పోతాయి |
| **Time-bucketed partitions** ✅ | ప్రతి నిమిషానికి ఒక bucket. ఆ నిమిషం వచ్చినప్పుడు ఆ bucket ని మాత్రమే చదవడం |
| Hierarchical timing wheel | ✅ In-memory కి అద్భుతం (Kafka ఇదే వాడుతుంది), కానీ persistence కోసం bucketing తోడు కావాలి |

<div class="fig">
<div class="cap">time-bucketed scheduling · నిమిషానికి ఒక bucket</div>
<svg viewBox="0 0 750 275">
<text class="t-xs" x="0" y="14">SCHEDULE STORE · sorted set per minute</text>
<rect class="n-soft" x="0" y="24" width="128" height="56" rx="4"/>
<text class="t-sm mid" x="64" y="44">10:00</text>
<text class="t-sm mid" x="64" y="62">42,000 jobs</text>
<text class="t-sm mid" x="64" y="74">✓ done</text>
<rect class="n-soft" x="134" y="24" width="128" height="56" rx="4"/>
<text class="t-sm mid" x="198" y="44">10:01</text>
<text class="t-sm mid" x="198" y="62">38,500 jobs</text>
<text class="t-sm mid" x="198" y="74">✓ done</text>
<rect class="n-acc" x="268" y="24" width="128" height="56" rx="4"/>
<text class="t-w mid" x="332" y="44">10:02 ← ఇప్పుడు</text>
<text class="t-w-sm mid" x="332" y="62">51,200 jobs</text>
<text class="t-w-sm mid" x="332" y="74">dispatch అవుతోంది</text>
<rect class="n" x="402" y="24" width="128" height="56" rx="4"/>
<text class="t-sm mid" x="466" y="44">10:03</text>
<text class="t-sm mid" x="466" y="62">39,900 jobs</text>
<rect class="n" x="536" y="24" width="128" height="56" rx="4"/>
<text class="t-sm mid" x="600" y="44">10:04</text>
<text class="t-sm mid" x="600" y="62">44,100 jobs</text>
<text class="t-sm" x="670" y="56">…</text>
<line class="ln-acc" x1="332" y1="86" x2="332" y2="112" marker-end="url(#aa)"/>
<rect class="n-dark" x="222" y="116" width="220" height="46" rx="4"/>
<text class="t-w mid" x="332" y="136">Dispatcher (leader)</text>
<text class="t-w-sm mid" x="332" y="152">bucket ని చదివి queue lo పెట్టడం</text>
<line class="ln" x1="442" y1="139" x2="480" y2="139" marker-end="url(#a)"/>
<rect class="n-acc" x="484" y="116" width="150" height="46" rx="4"/>
<text class="t-w mid" x="559" y="136">Execution Queue</text>
<text class="t-w-sm mid" x="559" y="152">Kafka / SQS</text>
<line class="ln" x1="559" y1="166" x2="559" y2="192" marker-end="url(#a)"/>
<rect class="n-info" x="440" y="196" width="90" height="44" rx="4"/>
<text class="t-sm mid" x="485" y="222">Worker 1</text>
<rect class="n-info" x="536" y="196" width="90" height="44" rx="4"/>
<text class="t-sm mid" x="581" y="222">Worker 2</text>
<rect class="n-info" x="632" y="196" width="90" height="44" rx="4"/>
<text class="t-sm mid" x="677" y="222">Worker N</text>
<rect class="n-good" x="0" y="180" width="410" height="60" rx="4"/>
<text class="t" x="16" y="202">ఎందుకు ఇది పని చేస్తుంది</text>
<text class="t-sm" x="16" y="220">100 million jobs lo వెతకడం లేదు — ఒక్క నిమిషపు bucket ని</text>
<text class="t-sm" x="16" y="234">చదువుతున్నాం. అది 50,000 rows. Query ఖర్చు స్థిరం.</text>
<text class="t-xs" x="0" y="268">DISPATCHER ముందుగానే పని చేస్తుంది — 10:02 bucket ని 10:01:55 కే చదివి queue lo పెడుతుంది</text>
</svg>
<div class="note"><b>Dispatcher మరియు worker ని విడదీయడం ముఖ్యం.</b> Dispatcher కేవలం "ఏవి due" అని చూసి queue lo పెడుతుంది — ఇది వేగవంతమైన, తేలికైన పని. Workers అసలు execution చేస్తారు — అది నెమ్మది, భారీ పని. వీటిని కలిపేస్తే ఒక నెమ్మది job మిగతా అన్నిటినీ ఆలస్యం చేస్తుంది.</div>
</div>

## 5. Deep Dive — ఒకే job ని ఇద్దరు తీసుకోకుండా (Leases)

<div class="fig">
<div class="cap">lease lifecycle · worker crash ని ఎలా తట్టుకోవడం</div>
<svg viewBox="0 0 750 230">
<rect class="n" x="0" y="20" width="170" height="50" rx="4"/>
<text class="t mid" x="85" y="40">1 · Claim</text>
<text class="t-sm mid" x="85" y="58">UPDATE … SET owner=w7,</text>
<line class="ln" x1="174" y1="45" x2="206" y2="45" marker-end="url(#a)"/>
<rect class="n" x="210" y="20" width="170" height="50" rx="4"/>
<text class="t mid" x="295" y="40">2 · lease_until = now+60s</text>
<text class="t-sm mid" x="295" y="58">WHERE owner IS NULL</text>
<line class="ln" x1="384" y1="45" x2="416" y2="45" marker-end="url(#a)"/>
<rect class="n-good" x="420" y="20" width="150" height="50" rx="4"/>
<text class="t mid" x="495" y="40">3 · Execute</text>
<text class="t-sm mid" x="495" y="58">job నడుస్తోంది</text>
<line class="ln" x1="574" y1="45" x2="606" y2="45" marker-end="url(#a)"/>
<rect class="n-good" x="610" y="20" width="140" height="50" rx="4"/>
<text class="t mid" x="680" y="40">4 · Complete</text>
<text class="t-sm mid" x="680" y="58">owner=NULL, next_run</text>
<line class="ln-acc" x1="495" y1="74" x2="495" y2="102" marker-end="url(#aa)"/>
<rect class="n-info" x="380" y="106" width="230" height="46" rx="4"/>
<text class="t mid" x="495" y="126">పొడవైన job అయితే · Heartbeat</text>
<text class="t-sm mid" x="495" y="142">ప్రతి 20s కి lease_until ని పొడిగించడం</text>
<line class="ln-acc" x1="380" y1="129" x2="330" y2="129" marker-end="url(#aa)"/>
<rect class="n-bad" x="90" y="106" width="236" height="46" rx="4"/>
<text class="t mid" x="208" y="126">Worker crash → heartbeat ఆగుతుంది</text>
<text class="t-sm mid" x="208" y="142">60 సెకన్ల తర్వాత lease గడువు ముగుస్తుంది</text>
<line class="ln-acc" x1="208" y1="156" x2="208" y2="182" marker-end="url(#aa)"/>
<rect class="n-acc" x="0" y="186" width="750" height="40" rx="4"/>
<text class="t-w mid" x="375" y="204">Reaper job: lease_until &lt; now ఉన్న jobs ని owner=NULL చేసి తిరిగి pool lo వేయడం</text>
<text class="t-w-sm mid" x="375" y="220">ఇదే at-least-once కి కారణం — job నిజంగా పూర్తయి ఉండొచ్చు, కానీ మనకి తెలియదు కాబట్టి మళ్ళీ run చేస్తాం</text>
</svg>
</div>

| నియమం | ఎందుకు |
|-------|---------|
| **Lease, lock కాదు** | Lock శాశ్వతం — worker చస్తే job శాశ్వతంగా ఇరుక్కుంటుంది. Lease కి గడువు ఉంది, తనంతట తానే విడుదల అవుతుంది |
| **Conditional update** | `WHERE owner IS NULL` — ఇద్దరు ఒకేసారి claim చేస్తే ఒకరికే 1 row affected వస్తుంది. Distributed lock service అవసరం లేదు |
| **Heartbeat renewal** | గంట నడిచే job కి 60 సెకన్ల lease సరిపోదు. Worker నడుస్తున్నంతసేపు lease ని పొడిగించాలి |
| **Reaper తప్పనిసరి** | లేకపోతే crash అయిన worker యొక్క jobs శాశ్వతంగా stuck |

## 6. Deep Dive — :00 Thundering Herd

**నిజం:** ప్రతి ఒక్కరూ "ప్రతి గంటకి", "ప్రతి రోజు అర్ధరాత్రి" అని schedule చేస్తారు. అంటే **సెకనుకి 200,000 jobs** — సగటు కంటే 20 రెట్లు.

| పరిష్కారం | ఎలా |
|-----------|-----|
| **Automatic jitter** | User "ప్రతి గంట" అంటే, మనం ఆ job ని `hash(job_id) % 60` సెకన్ల ఆలస్యంతో run చేయడం. అదే job ఎప్పుడూ అదే offset lo — deterministic, కానీ load నిమిషం అంతటా పరుచుకుంటుంది |
| Sub-minute buckets | నిమిషానికి బదులు 10-సెకన్ల buckets — spike ని మరింత సన్నగా చేస్తుంది |
| Queue absorption | Dispatcher అన్నిటినీ queue lo పోసేస్తుంది. Workers తమ వేగంతో తీసుకుంటారు. Queue అనేది shock absorber |
| Priority lanes | Critical jobs కి వేరే queue — batch reports వెనక అవి వేలాడకూడదు |

<div class="box good">
<div class="lab">Jitter గురించి ఇలా చెప్పండి</div>
"User 'ప్రతి గంట' అని అడిగినప్పుడు అతనికి కావలసింది <b>గంటకోసారి</b>, సరిగ్గా :00:00 కి కాదు. ఆ తేడాని వాడుకుని నేను job ని hash ఆధారంగా నిమిషం అంతటా పరుస్తాను. User కి ఏ తేడా తెలియదు, నా peak load 20 రెట్లు తగ్గుతుంది. <b>Requirement ని కాస్త వదులు చేయడం ద్వారా భారీ engineering ఆదా</b> — ఇది system design lo తరచుగా అత్యుత్తమ కదలిక."
</div>

## 7. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Dispatcher SPOF** | Leader election (ZooKeeper/etcd). Leader చస్తే కొత్తవాడు వస్తాడు. Buckets idempotent — ఒకే bucket ని రెండుసార్లు dispatch చేసినా job level lease duplicate ని ఆపుతుంది |
| **Dispatcher వెనకబడటం** | Bucket ని shard చేయడం — `10:02:shard_0..9`, ప్రతి shard కి వేరే dispatcher. అప్పుడు leader ఒక్కడే కాదు |
| **Job execution చాలా నెమ్మది** | Timeout పెట్టడం. Timeout దాటితే kill + retry. లేకపోతే ఒక job worker ని శాశ్వతంగా ఆక్రమిస్తుంది |
| **Poison job (ఎప్పుడూ fail)** | 3 retries తర్వాత `SUSPENDED` state కి పంపి alert. మౌనంగా అనంతంగా retry చేయడం resource వృథా |
| **Clock skew** | Servers మధ్య clock తేడా. అందుకే job "due" నిర్ణయం **ఒకే చోట** (dispatcher/DB time) జరగాలి, workers తమ సొంత clock ని నమ్మకూడదు |
| **Recurring job overlap** | ప్రతి 5 నిమిషాలకి job, కానీ ఒక run 7 నిమిషాలు తీసుకుంది. Overlap allow చేయాలా? సాధారణంగా **వద్దు** — ఒక `running` flag తో skip చేయడం |
| **Backfill** | System 2 గంటలు down అయితే, 2 గంటల jobs ఏమవుతాయి? అన్నీ ఒకేసారి run చేస్తే overload. Policy కావాలి: skip, లేదా rate-limited backfill |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"A few questions: one-time jobs, recurring, or both? What precision do we need — seconds or minutes? How long can a job run? And most importantly, do we promise at-least-once or at-most-once execution?"</p>
<p>"On that last one I'd be explicit: I can't give both. If a worker executes a job and dies before recording completion, I either re-run it or skip it. I'd choose <em>at-least-once</em> — missing a job is usually worse than running it twice — and make idempotency part of the contract with job authors. That's pushing a constraint onto the user, but it's the honest engineering answer rather than pretending exactly-once is available."</p>
<p>"The first hard part is discovery: with a hundred million jobs, I can't run 'select where next_run is due' every second. And I obviously can't hold a hundred million OS timers. Instead I <em>bucket by time</em> — a sorted set per minute. To find what's due at 10:02, I read the 10:02 bucket, which is maybe fifty thousand entries. The cost of that query is constant regardless of how many jobs exist in total."</p>
<p>"I separate dispatch from execution. A dispatcher reads the bucket slightly ahead of time and pushes jobs onto a queue; workers consume from the queue and actually run them. If I merged those roles, one slow job would delay dispatch for everything else."</p>
<p>"The second hard part is making sure two workers don't run the same job. I'd use <em>leases rather than locks</em>. A worker claims a job with a conditional update — set owner and lease expiry where owner is null — so only one worker gets a row affected. The lease expires after sixty seconds, and a long-running job renews it with a heartbeat. If the worker crashes, the heartbeat stops, the lease expires, and a reaper returns the job to the pool. A plain lock would leave that job stuck forever."</p>
<p>"The third problem is the one people forget: everyone schedules on the hour. Average load might be ten thousand a second, but at :00 it's two hundred thousand — a twenty-times spike sizing my entire fleet for one second a minute."</p>
<p>"My fix is <em>deterministic jitter</em>. When a user says 'every hour', what they actually want is hourly, not exactly at zero seconds. So I offset each job by hash of its ID modulo sixty seconds. Same job always lands at the same offset, so it stays predictable, but the load spreads evenly across the minute. Relaxing a requirement slightly to save a huge amount of engineering is often the strongest move available in system design."</p>
<p>"One correctness detail: the decision about whether a job is due must be made in <em>one place</em> — the dispatcher or the database — never on individual workers' clocks, because clock skew across a fleet will cause both double-runs and misses."</p>
<p>"And I'd insist on a policy for backfill. If the scheduler is down for two hours, running two hours of accumulated jobs all at once will take down whatever they call. Usually the answer is to skip missed runs for frequent jobs and rate-limit the backfill for important ones."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Cron expression ఎలా parse చేస్తారు?" | Job create/complete అయినప్పుడు `next_run` ని ముందే లెక్కించి store చేయడం. Runtime lo cron parse చేయకూడదు — ముందే లెక్కించిన timestamp మీద index వేగంగా ఉంటుంది |
| "Timezone ఎలా?" | `next_run` ని ఎప్పుడూ UTC lo store చేయడం, కానీ user timezone ని కూడా ఉంచడం — DST మార్పులు వచ్చినప్పుడు తర్వాతి run ని సరిగ్గా లెక్కించడానికి అది కావాలి |
| "Job dependencies (A తర్వాత B)?" | అప్పుడు ఇది scheduler కాదు, **workflow engine**. DAG, state per node, upstream success మీద trigger. Airflow/Temporal ఆ space |
| "1 సెకను కంటే మెరుగైన precision?" | Sub-second కి in-memory **hierarchical timing wheel** (Kafka's purgatory లాంటిది). Persistence కి bucketing, precision కి wheel — రెండూ కలిపి |
| "Job results ఎక్కడ?" | Execution history table (partitioned by date) + logs ని object storage lo. History ని 30 రోజుల తర్వాత purge |
| "Multi-tenant fairness?" | ఒక tenant లక్ష jobs schedule చేస్తే మిగతా అందరూ వేచి ఉండకూడదు. Tenant ప్రకారం queue quota / weighted fair queuing |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">11</div>
<div class="kicker">Problem 11 · Politeness &amp; Deduplication</div>
<div class="title">Design a Web Crawler</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>మధ్యస్థం</b> · నేర్పే concepts: URL frontier, bloom filter, simhash, politeness, traps</div>
</div>

## 1. The Ask

> "Design a web crawler that downloads a billion pages a month for a search index."

<div class="box warn">
<div class="lab">ఈ problem ఎందుకు మోసపూరితం</div>
"URL తీసుకో, download చెయ్యి, links తీసి queue lo పెట్టు" — ఇది 5 నిమిషాల్లో చెప్పేయొచ్చు. కానీ ఈ problem యొక్క నిజమైన కష్టం అంతా <b>అనుకోని పరిస్థితుల్లో</b> ఉంది: ఒకే content వేరే URLs lo, అనంతమైన calendar pages, ఒకే site ని కొట్టి కూల్చడం, robots.txt, redirect loops. Interviewer చూసేది మీరు ఈ <b>అసహ్యమైన నిజాలని</b> ఎన్ని ఊహించగలరు అన్నదే.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| ఎన్ని pages, ఎంత కాలంలో? | Throughput ని ఇది నిర్ణయిస్తుంది | 1 B / month |
| HTML మాత్రమేనా, JS render కావాలా? | JS rendering అంటే headless browser — 50× ఖరీదు | HTML ప్రధానం, కొన్నిటికి JS |
| ఎంత తరచుగా re-crawl? | Freshness policy | Site importance ని బట్టి |
| robots.txt పాటించాలా? | తప్పనిసరి — లేకపోతే IP block + legal | తప్పకుండా |
| Content ఎక్కడ store? | Raw HTML storage భారీ | Object storage |
| Duplicate content ఏం చేయాలి? | Web lo 30%+ duplicate | Detect చేసి skip |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| Pages / month | 1 B |
| **Pages / sec** | 1B ÷ (30 × 86,400) ≈ **400 / sec** |
| సగటు page size | 500 KB (HTML + resources కాకుండా HTML ≈ 100 KB) |
| **Bandwidth** | 400 × 100 KB ≈ **40 MB/sec ≈ 320 Mbps** |
| Raw storage / month | 1B × 100 KB = **100 TB** (compressed ≈ 20 TB) |
| URL frontier size | ఏ క్షణంలోనైనా pending ≈ 10 B URLs |
| URL seen set | 10 B URLs × 8 B hash ≈ 80 GB → **bloom filter** తో ~12 GB |

## 4. Architecture

<div class="fig">
<div class="cap">crawler pipeline · ప్రతి stage ఒక ప్రత్యేక బాధ్యత</div>
<svg viewBox="0 0 750 290">
<rect class="n-acc" x="0" y="30" width="130" height="56" rx="4"/>
<text class="t-w mid" x="65" y="52">URL Frontier</text>
<text class="t-w-sm mid" x="65" y="68">priority + politeness</text>
<text class="t-w-sm mid" x="65" y="80">10 B pending</text>
<line class="ln" x1="134" y1="58" x2="162" y2="58" marker-end="url(#a)"/>
<rect class="n-dark" x="166" y="30" width="120" height="56" rx="4"/>
<text class="t-w mid" x="226" y="52">Fetcher</text>
<text class="t-w-sm mid" x="226" y="68">robots.txt check</text>
<text class="t-w-sm mid" x="226" y="80">DNS cache</text>
<line class="ln" x1="290" y1="58" x2="318" y2="58" marker-end="url(#a)"/>
<rect class="n-info" x="322" y="30" width="130" height="56" rx="4"/>
<text class="t mid" x="387" y="52">Content dedupe</text>
<text class="t-sm mid" x="387" y="68">simhash compare</text>
<text class="t-sm mid" x="387" y="80">ఇప్పటికే ఉందా?</text>
<line class="ln" x1="456" y1="58" x2="484" y2="58" marker-end="url(#a)"/>
<rect class="n-dark" x="488" y="30" width="120" height="56" rx="4"/>
<text class="t-w mid" x="548" y="52">Parser</text>
<text class="t-w-sm mid" x="548" y="68">text + links తీయడం</text>
<line class="ln" x1="612" y1="58" x2="640" y2="58" marker-end="url(#a)"/>
<rect class="n-good" x="644" y="30" width="106" height="56" rx="4"/>
<text class="t mid" x="697" y="52">Index</text>
<text class="t-sm mid" x="697" y="68">+ S3 raw</text>
<line class="ln-acc" x1="548" y1="90" x2="548" y2="116" marker-end="url(#aa)"/>
<rect class="n-info" x="440" y="120" width="216" height="50" rx="4"/>
<text class="t mid" x="548" y="140">URL normalize + filter</text>
<text class="t-sm mid" x="548" y="157">lowercase, fragment తీయడం, tracking params తీయడం</text>
<line class="ln-acc" x1="440" y1="145" x2="392" y2="145" marker-end="url(#aa)"/>
<rect class="n-bad" x="216" y="120" width="170" height="50" rx="4"/>
<text class="t mid" x="301" y="140">Bloom filter</text>
<text class="t-sm mid" x="301" y="157">"ఈ URL ఇంతకుముందు చూశామా?"</text>
<line class="ln-acc" x1="216" y1="145" x2="70" y2="145" marker-end="url(#aa)"/>
<line class="ln-acc" x1="65" y1="140" x2="65" y2="92" marker-end="url(#aa)"/>
<text class="t-sm" x="76" y="118">కొత్తది అయితే</text>
<text class="t-sm" x="76" y="134">frontier కి తిరిగి</text>
<rect class="n-soft" x="0" y="192" width="750" height="88" rx="4"/>
<text class="t" x="16" y="214">ఇది ఒక CYCLE — crawler ఒక BFS/DFS graph traversal</text>
<text class="t-sm" x="16" y="236">Page ని fetch చేయడం → అందులోని links తీయడం → అవి కొత్తవా అని చూడటం → frontier lo చేర్చడం.</text>
<text class="t-sm" x="16" y="254">Web ఒక అనంతమైన graph కాబట్టి ఈ loop ఎప్పటికీ ఆగదు. అందుకే <tspan class="t-acc">frontier ఎలా ప్రాధాన్యత ఇస్తుంది</tspan> అన్నదే</text>
<text class="t-sm" x="16" y="272">crawler quality ని నిర్ణయిస్తుంది — ఏ pages ముందు, ఏవి ఎప్పటికీ కాదు.</text>
</svg>
</div>

## 5. Deep Dive — URL Frontier (ఇదే crawler యొక్క మెదడు)

Frontier రెండు విరుద్ధమైన లక్ష్యాలని ఏకకాలంలో సాధించాలి:

<div class="grid">
<div class="card">
<div class="t">Priority</div>
<div class="s">ముఖ్యమైన pages (high PageRank, తరచుగా మారేవి) ముందు crawl కావాలి.</div>
</div>
<div class="card">
<div class="t">Politeness</div>
<div class="s">ఒకే host ని సెకనుకి 100 సార్లు కొట్టకూడదు — అది DDoS అవుతుంది, IP block అవుతుంది.</div>
</div>
</div>

<div class="fig">
<div class="cap">Mercator frontier · రెండు అంచెల queues</div>
<svg viewBox="0 0 750 265">
<text class="t-xs" x="0" y="14">FRONT QUEUES · PRIORITY ప్రకారం</text>
<rect class="n-acc" x="0" y="24" width="140" height="34" rx="3"/>
<text class="t-w mid" x="70" y="45">P1 · news, homepages</text>
<rect class="n-info" x="0" y="62" width="140" height="34" rx="3"/>
<text class="t mid" x="70" y="83">P2 · సాధారణ pages</text>
<rect class="n-soft" x="0" y="100" width="140" height="34" rx="3"/>
<text class="t mid" x="70" y="121">P3 · deep / పాతవి</text>
<line class="ln-acc" x1="144" y1="79" x2="186" y2="79" marker-end="url(#aa)"/>
<rect class="n-dark" x="190" y="56" width="120" height="46" rx="4"/>
<text class="t-w mid" x="250" y="76">Prioritiser</text>
<text class="t-w-sm mid" x="250" y="92">weighted pick</text>
<line class="ln-acc" x1="314" y1="79" x2="356" y2="79" marker-end="url(#aa)"/>
<text class="t-xs" x="360" y="14">BACK QUEUES · HOST ప్రకారం (ఒక్కో host కి ఒకటే)</text>
<rect class="n" x="360" y="24" width="180" height="30" rx="3"/>
<text class="t-sm mid" x="450" y="43">queue A → bbc.com</text>
<rect class="n" x="360" y="58" width="180" height="30" rx="3"/>
<text class="t-sm mid" x="450" y="77">queue B → wikipedia.org</text>
<rect class="n" x="360" y="92" width="180" height="30" rx="3"/>
<text class="t-sm mid" x="450" y="111">queue C → nytimes.com</text>
<line class="ln" x1="544" y1="70" x2="576" y2="70" marker-end="url(#a)"/>
<rect class="n-good" x="580" y="46" width="170" height="48" rx="4"/>
<text class="t mid" x="665" y="66">Host timing heap</text>
<text class="t-sm mid" x="665" y="83">"bbc ని 10:02:03 కి తర్వాత"</text>
<line class="ln" x1="665" y1="98" x2="665" y2="126" marker-end="url(#a)"/>
<rect class="n-dark" x="590" y="130" width="150" height="40" rx="4"/>
<text class="t-w mid" x="665" y="155">Fetcher threads</text>
<rect class="n-good" x="0" y="150" width="560" height="106" rx="4"/>
<text class="t" x="16" y="172">ఈ రెండు అంచెలు ఎందుకు</text>
<text class="t-sm" x="16" y="194">Front queues మాత్రమే ఉంటే — high priority URLs అన్నీ ఒకే site వి కావొచ్చు, ఆ site ని కూల్చేస్తాం.</text>
<text class="t-sm" x="16" y="212">Back queues మాత్రమే ఉంటే — politeness ఉంటుంది కానీ ముఖ్యమైన pages చివర్లో వస్తాయి.</text>
<text class="t-acc" x="16" y="236">రెండూ కలిపితే: priority ప్రకారం ఎంచుకోవడం, కానీ ఒక్కో host ని దాని సొంత వేగంతోనే కొట్టడం.</text>
<text class="t-sm" x="16" y="250">ఒక్కో back queue ని ఒకే fetcher thread మాత్రమే చదువుతుంది — అదే politeness guarantee.</text>
</svg>
</div>

## 6. Deep Dive — రెండు రకాల Duplicates

| రకం | ఉదాహరణ | పరిష్కారం |
|-----|---------|-----------|
| **URL duplicate** | `site.com/page`, `site.com/page/`, `site.com/page?utm=x`, `SITE.com/Page` — అన్నీ ఒకటే | **Normalisation**: lowercase host, trailing slash, fragment తీయడం, tracking params తీయడం, query params ని sort చేయడం. తర్వాత hash ని **bloom filter** lo |
| **Content duplicate** | వేరే URLs, కానీ ఒకే వ్యాసం (mirrors, syndication, printer-friendly version) | **Simhash / MinHash** — content యొక్క 64-bit fingerprint. Hamming distance ≤ 3 అయితే near-duplicate |

<div class="box info">
<div class="lab">Bloom filter ఎందుకు, ఎందుకు అది సరిపోతుంది</div>
10 billion URLs ని hash set lo ఉంచితే 80 GB+ RAM. Bloom filter తో అదే పని ~12 GB lo. ఖరీదు: <b>false positive</b> — "ఇది ఇంతకుముందు చూశాం" అని తప్పుగా చెప్పడం, అంటే ఒక కొత్త page ని miss చేయడం. కానీ false <i>negative</i> ఎప్పుడూ రాదు.<br><br>
<b>ఇది ఎందుకు ఆమోదయోగ్యం:</b> "1% pages ని miss చేయడం web crawler కి ఫర్వాలేదు — web అనంతం, మనం ఎలాగూ అంతా crawl చేయలేం. కానీ payment system lo ఇలాంటి approximation ఎప్పటికీ ఆమోదయోగ్యం కాదు. <b>ఏ problem lo ఏ తప్పు భరించగలమో తెలియడమే</b> సరైన tool ఎంచుకోవడానికి కీలకం."
</div>

## 7. Crawler Traps &amp; Politeness

| ఉచ్చు | ఏమవుతుంది | పరిష్కారం |
|-------|-------------|-----------|
| **Infinite calendar** | `/calendar?month=1`, `2`, `3`… అనంతం | URL depth limit, ఒక్కో domain కి page quota, pattern detection |
| **Session id in URL** | ప్రతిసారీ కొత్త URL, ఒకే content | Normalisation lo session params తీసేయడం + content simhash |
| **Redirect loop** | A → B → A | Hop limit (5) |
| **భారీ file** | 2 GB PDF | Content-Length check + download cap |
| **Slow server** | Connection ని గంటలు పట్టుకోవడం | Aggressive timeouts (10s connect, 30s read) |
| **robots.txt** | Disallow ని పాటించకపోతే block + legal | Domain కి robots.txt ని cache చేసి (24h) ప్రతి fetch ముందు check |
| **Crawl-delay** | Site "10 సెకన్లకి ఒకసారి" అంటుంది | Host timing heap lo ఆ delay ని గౌరవించడం |

## 8. Freshness — ఎప్పుడు మళ్ళీ crawl చేయాలి?

<div class="box good">
<div class="lab">Adaptive re-crawl</div>
"అన్ని pages ని ఒకే rate తో re-crawl చేయను. ప్రతి page కి <b>change frequency</b> ని track చేస్తాను — గత 10 crawls lo ఎన్నిసార్లు మారింది? News homepage ప్రతిసారీ మారుతుంది → గంటకోసారి. 2011 నాటి blog post ఎప్పుడూ మారలేదు → నెలకోసారి. ఇది <b>Poisson process estimate</b> — గత మార్పుల rate నుంచి తర్వాతి మార్పు ఎప్పుడు అని అంచనా. దీంతో అదే bandwidth తో చాలా ఎక్కువ freshness."
</div>

## 9. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **DNS lookup bottleneck** | ప్రతి fetch కి DNS query అంటే భారీ ఆలస్యం. Local DNS cache + ముందే resolve చేయడం (prefetch) |
| **Frontier persistence** | 10 B URLs memory lo పట్టవు. Disk-backed queues (Kafka/RocksDB), memory lo hot భాగం మాత్రమే |
| **Fetcher node crash** | URL ని frontier నుంచి తీసేయకుండా lease తీసుకోవడం (Problem 10 లాగానే). Crash అయితే lease expire అయి URL తిరిగి వస్తుంది |
| **Bloom filter ని shard చేయడం** | `hash(url) % N` ప్రకారం — ఒక్కో node ఒక భాగాన్ని పట్టుకుంటుంది. అదే shard key తో frontier ని కూడా shard చేస్తే network hop తగ్గుతుంది |
| **ఒకే site నుంచి కోట్ల URLs** | Domain quota — ఒక్కో domain నుంచి గరిష్ఠంగా N pages. లేకపోతే ఒక spam site మొత్తం crawler ని మింగేస్తుంది |
| **JS-heavy sites** | Headless browser pool — ఇది 50× ఖరీదు. కాబట్టి ముందు plain HTTP fetch, content ఖాళీగా ఉంటే మాత్రమే render పంపడం |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me scope it: how many pages and over what period, do we need JavaScript rendering, how fresh do results need to be, and do we honour robots.txt? I'll assume a billion pages a month, mostly plain HTML, adaptive freshness, and strict robots compliance."</p>
<p>"A billion a month is about four hundred pages a second — roughly forty megabytes a second of HTML. That's not a lot of throughput. The difficulty in this problem isn't scale, it's everything the web does to you: duplicate content, infinite URL spaces, hostile servers, and the fact that hammering one site is indistinguishable from an attack."</p>
<p>"The heart of the design is the URL frontier, and it has to satisfy two goals that pull against each other. I want to crawl <em>important</em> pages first, and I must not hit any single host too fast."</p>
<p>"The standard structure — Mercator's — is two tiers of queues. Front queues hold URLs by priority. Back queues hold URLs by <em>host</em>, one queue per host, and each back queue is drained by exactly one fetcher thread. So the prioritiser picks what's important, but the per-host queues guarantee politeness. If I only had priority queues, all my high-priority URLs might belong to the same site and I'd take it down. If I only had host queues, I'd be polite but crawl garbage first."</p>
<p>"I'd pair that with a host timing heap that records the earliest time each host may be contacted again, honouring any crawl-delay in robots.txt."</p>
<p>"There are two completely different deduplication problems here. URL duplicates — trailing slashes, uppercase hosts, tracking parameters — I handle by normalising aggressively and then checking a <em>bloom filter</em> of seen URLs. Ten billion URL hashes in a hash set would be eighty gigabytes; a bloom filter does it in about twelve. The cost is false positives, meaning I occasionally skip a page I've never seen. That's acceptable here — the web is infinite and I'll never crawl all of it anyway. I want to flag that explicitly, though: the same approximation would be completely unacceptable in the payment system. Knowing which errors a problem can tolerate is what tells you which tool to reach for."</p>
<p>"Content duplicates are separate — different URLs serving the same article, mirrors, printer-friendly versions. That needs a content fingerprint like simhash, where near-duplicates land within a small Hamming distance."</p>
<p>"Then there are traps. Infinite calendars generating endless URLs, session IDs making every visit a new URL, redirect loops, two-gigabyte PDFs, servers that accept a connection and never respond. I'd defend with depth limits, per-domain page quotas, hop limits, content-length caps, and aggressive timeouts — none of which are clever, but all of which are the difference between a crawler that runs and one that stalls on day two."</p>
<p>"For freshness I wouldn't re-crawl uniformly. I'd track how often each page has actually changed and model it as a Poisson process — a news homepage gets revisited hourly, a decade-old blog post monthly. Same bandwidth, far better index freshness."</p>
</div>

## 10. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Priority ఎలా నిర్ణయిస్తారు?" | Inbound links (PageRank-ish), domain authority, గత change frequency, URL depth, sitemap priority. ఇవన్నీ కలిపి ఒక score |
| "Distributed crawler lo work ని ఎలా పంచుతారు?" | `hash(domain) % N` — **domain ప్రకారం**, URL ప్రకారం కాదు. అలా అయితే ఒక domain యొక్క politeness state ఒకే node lo ఉంటుంది, coordination అవసరం లేదు |
| "sitemap.xml వాడతారా?" | తప్పకుండా — అది site స్వయంగా ఇచ్చే URL list + lastmod. Discovery చాలా చౌక అవుతుంది |
| "Crawler ని ఎలా ఆపాలి (kill switch)?" | Config-driven rate limits, domain blocklist — deploy లేకుండా వెంటనే మార్చగలిగేలా. Site owner complain చేస్తే నిమిషాల్లో ఆపగలగాలి |
| "Deep web / login pages?" | Crawl చేయము. Login అవసరమైతే అది crawl scope బయట (legal + ethical) |
| "ఇదే design ని site scraper కి వాడొచ్చా?" | అవును కానీ చాలా చిన్నది — ఒకే domain, politeness సులభం, frontier చిన్నది. Bloom filter బదులు సాధారణ set చాలు |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">12</div>
<div class="kicker">Problem 12 · Concurrency &amp; Convergence</div>
<div class="title">Design Collaborative Editing<br>(Google Docs)</div>
<div class="meta">Difficulty <b>చాలా కష్టం</b> · Frequency <b>మధ్యస్థం</b> · నేర్పే concepts: OT, CRDT, convergence, causality</div>
</div>

## 1. The Ask

> "Design Google Docs. Ten people edit the same paragraph at the same time, and everyone must end up seeing exactly the same document."

<div class="box warn">
<div class="lab">ఈ problem ఎందుకు ప్రత్యేకం</div>
ఇంతవరకు అన్ని problems lo మనం <b>scale</b> ని పరిష్కరించాం. ఇది వేరే — ఇది ఒక <b>algorithm problem</b>. 10 మంది users, ఒక్క paragraph — scale ఏమీ లేదు. కానీ ప్రశ్న గణితపరమైనది: <i>concurrent edits ని ఎలా కలిపితే అందరూ ఒకే ఫలితానికి చేరతారు?</i> ఇక్కడ మీరు distributed systems theory ని చూపించాలి, boxes కాదు.
</div>

## 2. అసలు సమస్య — ఒక ఉదాహరణ

<div class="fig">
<div class="cap">the divergence problem · అమాయకమైన పరిష్కారం ఎందుకు విఫలమవుతుంది</div>
<svg viewBox="0 0 750 250">
<rect class="n-soft" x="270" y="10" width="210" height="34" rx="4"/>
<text class="t mid" x="375" y="32">మొదటి document: "HAT"</text>
<line class="ln" x1="330" y1="48" x2="180" y2="76" marker-end="url(#a)"/>
<line class="ln" x1="420" y1="48" x2="570" y2="76" marker-end="url(#a)"/>
<rect class="n-info" x="60" y="80" width="240" height="60" rx="4"/>
<text class="t mid" x="180" y="100">Alice</text>
<text class="t-sm mid" x="180" y="118">position 0 lo "C" చేర్చడం</text>
<text class="t-sm mono mid" x="180" y="134">insert(0, "C") → "CHAT"</text>
<rect class="n-info" x="450" y="80" width="240" height="60" rx="4"/>
<text class="t mid" x="570" y="100">Bob</text>
<text class="t-sm mid" x="570" y="118">position 2 lo "R" చేర్చడం</text>
<text class="t-sm mono mid" x="570" y="134">insert(2, "R") → "HART"</text>
<line class="ln-acc" x1="180" y1="144" x2="300" y2="176" marker-end="url(#aa)"/>
<line class="ln-acc" x1="570" y1="144" x2="450" y2="176" marker-end="url(#aa)"/>
<rect class="n-bad" x="20" y="180" width="340" height="64" rx="4"/>
<text class="t mid" x="190" y="200">Alice దగ్గర Bob operation apply అయితే</text>
<text class="t-sm mono mid" x="190" y="220">"CHAT" + insert(2,"R") → "CHRAT" ✗</text>
<text class="t-sm mid" x="190" y="236">Bob "HA" తర్వాత అనుకున్నాడు, కానీ index మారింది</text>
<rect class="n-bad" x="390" y="180" width="340" height="64" rx="4"/>
<text class="t mid" x="560" y="200">Bob దగ్గర Alice operation apply అయితే</text>
<text class="t-sm mono mid" x="560" y="220">"HART" + insert(0,"C") → "CHART" ✓</text>
<text class="t-sm mid" x="560" y="236">ఇద్దరూ వేరే documents చూస్తున్నారు — DIVERGED</text>
</svg>
<div class="note">ఇదే మొత్తం problem. Operations <b>ఒకే క్రమంలో</b> apply అయినా ఫలితం వేరుగా వస్తుంది, ఎందుకంటే <b>index అనేది relative</b> — దాని అర్థం document state మీద ఆధారపడి ఉంది. దీన్ని పరిష్కరించడానికే OT మరియు CRDT పుట్టాయి.</div>
</div>

| అమాయక పరిష్కారం | ఎందుకు విఫలం |
|-------------------|---------------|
| **Last-write-wins** | ఒకరి edit మౌనంగా పోతుంది. Document editor lo ఇది ఆమోదయోగ్యం కాదు |
| **Document lock** | ఒకరు edit చేస్తుంటే మిగతావాళ్ళు ఆగాలి — అప్పుడు అది "collaborative" కాదు |
| **Character lock** | Lock traffic actual edits కంటే ఎక్కువ. Latency వల్ల typing ఆగిపోతుంది |
| **Server serialises అన్నిటినీ** | సరైన దిశ, కానీ ఇంకా సరిపోదు — index అర్థం మారే సమస్య అలాగే ఉంది |

## 3. Deep Dive — Operational Transformation (OT)

**కీలక ఆలోచన:** Operation ని యథాతథంగా apply చేయకు. దాన్ని ఇప్పటికే apply అయిన concurrent operations కి **వ్యతిరేకంగా transform** చేసి, తర్వాత apply చెయ్యి.

<div class="fig">
<div class="cap">OT · transform function ఏం చేస్తుంది</div>
<svg viewBox="0 0 750 205">
<rect class="n" x="0" y="20" width="200" height="52" rx="4"/>
<text class="t mid" x="100" y="42">Bob యొక్క original op</text>
<text class="t-sm mono mid" x="100" y="60">insert(2, "R")</text>
<line class="ln-acc" x1="204" y1="46" x2="252" y2="46" marker-end="url(#aa)"/>
<rect class="n-acc" x="256" y="14" width="230" height="64" rx="4"/>
<text class="t-w mid" x="371" y="36">transform(op_bob, op_alice)</text>
<text class="t-w-sm mid" x="371" y="54">"Alice నా కంటే ముందు position 0 lo</text>
<text class="t-w-sm mid" x="371" y="68">insert చేసింది → నా index ఒకటి పెరగాలి"</text>
<line class="ln-acc" x1="490" y1="46" x2="538" y2="46" marker-end="url(#aa)"/>
<rect class="n-good" x="542" y="20" width="208" height="52" rx="4"/>
<text class="t mid" x="646" y="42">Transformed op</text>
<text class="t-sm mono mid" x="646" y="60">insert(3, "R")</text>
<line class="ln" x1="646" y1="76" x2="646" y2="102" marker-end="url(#a)"/>
<rect class="n-good" x="470" y="106" width="280" height="46" rx="4"/>
<text class="t mid" x="610" y="126">"CHAT" + insert(3,"R") → "CHART" ✓</text>
<text class="t-sm mid" x="610" y="142">ఇద్దరూ ఇప్పుడు ఒకే document చూస్తున్నారు</text>
<rect class="n-info" x="0" y="106" width="440" height="46" rx="4"/>
<text class="t mid" x="220" y="126">Server అన్ని ops కి ఒక global order ఇస్తుంది</text>
<text class="t-sm mid" x="220" y="142">ప్రతి client తన pending ops ని ఆ order కి వ్యతిరేకంగా transform చేసుకుంటాడు</text>
<text class="t-xs" x="0" y="182">OT కి CENTRAL SERVER తప్పనిసరి — ఆ server ఇచ్చే క్రమమే "సత్యం". Peer-to-peer OT చాలా కష్టం.</text>
<text class="t-xs" x="0" y="198">TRANSFORM FUNCTIONS ని రాయడం కుఖ్యాతమైన కష్టం — Google Wave ఇక్కడే చాలా bugs తో బాధపడింది.</text>
</svg>
</div>

## 4. Deep Dive — CRDT (వేరే దారి)

**కీలక ఆలోచన:** Index ని పూర్తిగా వదిలేయ్. ప్రతి అక్షరానికీ ఒక **శాశ్వతమైన, ప్రత్యేకమైన id** ఇవ్వు — ఆ id ఎప్పటికీ మారదు.

<div class="fig">
<div class="cap">CRDT · position కాదు, identity</div>
<svg viewBox="0 0 750 210">
<text class="t-xs" x="0" y="14">ప్రతి అక్షరం ఒక UNIQUE, ORDERED ID ని పొందుతుంది · ఆ id ఎప్పటికీ మారదు</text>
<rect class="n" x="0" y="24" width="130" height="46" rx="3"/>
<text class="t mid" x="65" y="46">H</text>
<text class="t-sm mono mid" x="65" y="62">id 1.0 · alice</text>
<rect class="n" x="136" y="24" width="130" height="46" rx="3"/>
<text class="t mid" x="201" y="46">A</text>
<text class="t-sm mono mid" x="201" y="62">id 2.0 · alice</text>
<rect class="n" x="272" y="24" width="130" height="46" rx="3"/>
<text class="t mid" x="337" y="46">T</text>
<text class="t-sm mono mid" x="337" y="62">id 3.0 · alice</text>
<rect class="n-good" x="408" y="24" width="150" height="46" rx="3"/>
<text class="t mid" x="483" y="46">C — Alice చేర్చింది</text>
<text class="t-sm mono mid" x="483" y="62">id 0.5 · alice</text>
<rect class="n-info" x="564" y="24" width="150" height="46" rx="3"/>
<text class="t mid" x="639" y="46">R — Bob చేర్చాడు</text>
<text class="t-sm mono mid" x="639" y="62">id 2.5 · bob</text>
<rect class="n-acc" x="0" y="86" width="750" height="46" rx="4"/>
<text class="t-w mid" x="375" y="106">Document = అన్ని characters ని వాటి ids ప్రకారం sort చేయడం</text>
<text class="t-w-sm mid" x="375" y="122">0.5(C) · 1.0(H) · 2.0(A) · 2.5(R) · 3.0(T) → "CHART" — ఏ క్రమంలో వచ్చినా ఇదే ఫలితం</text>
<rect class="n-good" x="0" y="142" width="366" height="62" rx="4"/>
<text class="t" x="14" y="162">ఎందుకు ఇది పని చేస్తుంది</text>
<text class="t-sm" x="14" y="182">Operations commutative — ఏ క్రమంలో apply చేసినా</text>
<text class="t-sm" x="14" y="198">ఒకే ఫలితం. Transform అవసరం లేదు, server అవసరం లేదు.</text>
<rect class="n-bad" x="384" y="142" width="366" height="62" rx="4"/>
<text class="t" x="398" y="162">ఖరీదు</text>
<text class="t-sm" x="398" y="182">ప్రతి అక్షరానికీ metadata (id + author + clock).</text>
<text class="t-sm" x="398" y="198">Deleted అక్షరాలని tombstones గా ఉంచాలి — memory పెరుగుతుంది.</text>
</svg>
</div>

| | **OT** | **CRDT** |
|--|--------|----------|
| ఆలోచన | Index ని transform చేయడం | Index బదులు unique ids |
| Server | **తప్పనిసరి** (global order కోసం) | అవసరం లేదు (P2P సాధ్యం) |
| Memory | తక్కువ — plain text | ఎక్కువ — ప్రతి char కి metadata + tombstones |
| Implementation | **చాలా కష్టం** — transform functions correctness prove చేయడం కష్టం | సులభం, గణితపరంగా నిరూపితం |
| Offline support | కష్టం | సహజం |
| ఎవరు వాడతారు | Google Docs, Etherpad | Figma, Notion, Apple Notes, Automerge/Yjs |

<div class="box good">
<div class="lab">నా Choice — ఇలా చెప్పండి</div>
"నేను <b>CRDT</b> ఎంచుకుంటాను. కారణం correctness — CRDT convergence గణితపరంగా నిరూపితం, OT lo transform functions ప్రతి operation జతకీ సరిగ్గా రాయాలి, అది Google Wave ని ముంచిన సమస్య. CRDT memory ఎక్కువ తింటుంది, కానీ దాన్ని periodic garbage collection మరియు compaction తో నియంత్రించొచ్చు — ఇది engineering problem, correctness problem కాదు. <b>Google Docs OT వాడుతుంది ఎందుకంటే అది CRDTs practical అవ్వడానికి ముందు రాసినది</b> — ఈరోజు కొత్తగా మొదలుపెడితే పరిశ్రమ CRDT వైపే మొగ్గుతోంది (Figma, Notion అలానే చేశాయి)."
</div>

## 5. Architecture

<div class="fig">
<div class="cap">document collaboration · runtime + durability</div>
<svg viewBox="0 0 750 230">
<rect class="n" x="0" y="20" width="90" height="40" rx="4"/>
<text class="t mid" x="45" y="45">Alice</text>
<rect class="n" x="0" y="76" width="90" height="40" rx="4"/>
<text class="t mid" x="45" y="101">Bob</text>
<rect class="n" x="0" y="132" width="90" height="40" rx="4"/>
<text class="t mid" x="45" y="157">Carol</text>
<line class="ln-acc" x1="94" y1="40" x2="150" y2="80" marker-end="url(#aa)"/>
<line class="ln-acc" x1="94" y1="96" x2="150" y2="96" marker-end="url(#aa)"/>
<line class="ln-acc" x1="94" y1="152" x2="150" y2="112" marker-end="url(#aa)"/>
<text class="t-sm" x="100" y="70">WebSocket</text>
<rect class="n-dark" x="154" y="66" width="150" height="60" rx="4"/>
<text class="t-w mid" x="229" y="88">Document Session</text>
<text class="t-w-sm mid" x="229" y="104">doc_id → ఒకే server</text>
<text class="t-w-sm mid" x="229" y="118">in-memory CRDT state</text>
<line class="ln" x1="308" y1="82" x2="346" y2="52" marker-end="url(#a)"/>
<rect class="n-acc" x="350" y="30" width="150" height="44" rx="4"/>
<text class="t-w mid" x="425" y="50">Ops log (append-only)</text>
<text class="t-w-sm mid" x="425" y="65">ప్రతి edit ఇక్కడ durable</text>
<line class="ln" x1="308" y1="110" x2="346" y2="140" marker-end="url(#a)"/>
<rect class="n-soft" x="350" y="120" width="150" height="44" rx="4"/>
<text class="t mid" x="425" y="140">Snapshot store</text>
<text class="t-sm mid" x="425" y="155">ప్రతి 1000 ops కి</text>
<line class="ln" x1="504" y1="52" x2="542" y2="52" marker-end="url(#a)"/>
<line class="ln" x1="504" y1="142" x2="542" y2="142" marker-end="url(#a)"/>
<rect class="n-good" x="546" y="66" width="150" height="60" rx="4"/>
<text class="t mid" x="621" y="88">Document load</text>
<text class="t-sm mid" x="621" y="105">snapshot + తర్వాతి ops</text>
<text class="t-sm mid" x="621" y="120">= current state</text>
<rect class="n-info" x="154" y="180" width="546" height="44" rx="4"/>
<text class="t mid" x="427" y="200">Presence &amp; cursors — వేరే ephemeral channel</text>
<text class="t-sm mid" x="427" y="216">Persist చేయము. Cursor updates document ops కంటే 10× ఎక్కువ — వాటిని ops log lo పెడితే అది పేలుతుంది</text>
</svg>
<div class="note">ఒక document ని <b>ఒకే server</b> handle చేయాలి (doc_id ప్రకారం routing) — అలా అయితే merge logic ఒకేచోట, servers మధ్య coordination అవసరం లేదు. Ops log ద్వారా durability, snapshots ద్వారా వేగవంతమైన load.</div>
</div>

## 6. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Document server crash** | Ops log durable కాబట్టి state పోదు. కొత్త server snapshot + తర్వాతి ops నుంచి rebuild. Clients reconnect చేసి తమ unacked ops ని మళ్ళీ పంపుతారు (ops idempotent — ఒకే op id) |
| **CRDT memory పెరగడం** | Tombstones ని GC చేయడం — అందరు clients ఆ point దాటాక (causal stability) tombstone ని తీసేయొచ్చు. పైగా consecutive characters ని ఒక "block" గా merge చేయడం (RGA optimisation) |
| **Ops log అనంతంగా పెరగడం** | Snapshot + snapshot కంటే పాత ops ని archive. Version history కావాలంటే వాటిని cold storage lo ఉంచడం |
| **పెద్ద document (100 pages)** | Document ని sections/blocks గా విడగొట్టడం — Notion ఇలానే చేస్తుంది. అప్పుడు merge unit చిన్నది, memory తక్కువ |
| **Offline editing** | CRDT యొక్క సహజ బలం — client offline lo ops పోగేసి, తిరిగి వచ్చాక పంపుతాడు. Commutative కాబట్టి merge తనంతట తానే జరుగుతుంది |
| **చాలా మంది ఒకే doc lo (100+)** | Ops broadcast O(n²) అవుతుంది. Ops ని batch చేసి 50 ms కి ఒకసారి పంపడం. చాలా మంది కేవలం చూస్తుంటారు — వాళ్ళని read-only channel కి పంపడం |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"I want to frame this differently from the previous problems. This isn't primarily a scale problem — ten people editing one paragraph is nothing. It's a <em>convergence</em> problem: how do concurrent edits merge so that everyone ends up with an identical document?"</p>
<p>"Let me show why it's hard with the smallest possible example. The document says 'HAT'. Alice inserts 'C' at position zero. Concurrently Bob inserts 'R' at position two. If Alice applies Bob's operation literally, her 'CHAT' becomes 'CHRAT' — because her insert shifted every index. Bob applying Alice's operation gets 'CHART'. They've <em>diverged</em>, and no amount of ordering fixes it, because an index is a relative reference whose meaning depends on the document state."</p>
<p>"Last-write-wins silently loses someone's typing. Locking, at any granularity, destroys the feel of collaboration. So we need a real algorithm, and there are two families."</p>
<p>"<em>Operational Transformation</em> keeps indices but transforms each operation against the concurrent operations already applied. Bob's insert-at-2 becomes insert-at-3 once we account for Alice's earlier insert. It requires a central server to impose a global order, and its weakness is that you must write a correct transform function for every pair of operation types. That is notoriously difficult — it's a large part of why Google Wave struggled."</p>
<p>"<em>CRDTs</em> take the opposite route: abandon indices entirely. Every character gets a permanent unique identifier that sorts, and the document is just all characters sorted by ID. Operations become commutative — apply them in any order and you converge. No transform, and in principle no server."</p>
<p>"I'd choose CRDTs, primarily for correctness: convergence is provable, whereas OT correctness depends on hand-written transform functions. CRDTs cost more memory — every character carries metadata, and deletions leave tombstones — but that's an engineering problem I can attack with garbage collection once changes are causally stable, and by merging runs of characters into blocks. Google Docs uses OT largely because it predates practical CRDT implementations; newer products like Figma and Notion went the CRDT route."</p>
<p>"Architecturally, each document is pinned to a single server by document ID, so merge logic lives in one place. Every operation appends to a durable ops log, and I snapshot every thousand operations so loading a document is snapshot-plus-tail rather than replaying everything from creation."</p>
<p>"One detail I'd insist on: cursors and presence go on a <em>separate ephemeral channel</em> and are never persisted. Cursor movements outnumber real edits by an order of magnitude, and putting them in the ops log would bloat it for data nobody ever needs again."</p>
<p>"If a document server crashes, nothing is lost — the ops log is durable, clients reconnect and resend anything unacknowledged, and operations are idempotent by ID."</p>
</div>

## 7. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Version history / undo ఎలా?" | Ops log ఇప్పటికే పూర్తి చరిత్ర. Undo అంటే **inverse operation** ని కొత్త op గా apply చేయడం (log ని వెనక్కి తిప్పడం కాదు — వేరేవాళ్ళ edits పోతాయి) |
| "Comments, suggestions?" | అవి text కి **anchored** — CRDT ids తో anchor చేస్తే text మారినా comment సరైన చోటే ఉంటుంది. Index తో anchor చేస్తే అది తప్పు చోటికి జారుతుంది |
| "Rich text (bold, headings)?" | CRDT ని plain text కి కాకుండా **tree/block structure** కి extend చేయడం. Formatting ని range annotations గా (start id, end id, attribute) |
| "Permissions?" | Document స్థాయిలో ACL, ops apply చేయడానికి ముందు check. Read-only users కి ops పంపుతాం కానీ వాళ్ళవి తీసుకోము |
| "OT ని ఎప్పుడు ఎంచుకుంటారు?" | Memory చాలా కీలకం అయినప్పుడు, central server ఎలాగూ ఉన్నప్పుడు, మరియు operation types చాలా తక్కువగా ఉన్నప్పుడు (plain text insert/delete మాత్రమే) |
| "Google Sheets కి ఇదే పని చేస్తుందా?" | కాదు — cells స్వతంత్రం కాబట్టి చాలా సులభం. Cell స్థాయిలో last-write-wins చాలు. కానీ row insert/delete అనేవి మళ్ళీ index problem — వాటికి మాత్రం OT/CRDT ఆలోచన కావాలి |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">13</div>
<div class="kicker">Problem 13 · Infrastructure</div>
<div class="title">Design a Distributed<br>Message Queue (Kafka)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>SSE/SDE3 lo ఎక్కువ</b> · నేర్పే concepts: append-only log, partitions, ISR, delivery semantics</div>
</div>

## 1. The Ask

> "Design Kafka. A durable, replayable message queue that handles a million messages a second."

ఇంతవరకు మనం Kafka ని **వాడాం** (problems 03, 05, 17). ఇప్పుడు దాన్ని **నిర్మించాలి**. Senior interviews lo ఇది తరచుగా వస్తుంది, ఎందుకంటే ఇది మీరు abstraction లోపల చూడగలరా అని test చేస్తుంది.

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| Ordering ఎంత అవసరం? | Global ordering అంటే ఒకే partition — parallelism సున్నా | Per-key ordering చాలు |
| Delivery semantics? | At-most / at-least / exactly-once — పూర్తిగా వేరే complexity | At-least-once default, exactly-once option |
| Retention ఎంత? | Consume తర్వాత delete నా, time-based నా | Time-based (7 రోజులు) — replay కావాలి |
| Consumers ఎన్ని groups? | Pub-sub నా queue నా — Kafka రెండూ చేస్తుంది | రెండూ |
| Message size? | పెద్దవి అయితే వేరే tuning | ~1 KB |
| Throughput? | ఇది design ని నిర్ణయిస్తుంది | 1 M msg/sec |

## 3. Deep Dive — Core Insight: Append-Only Log

**సాధారణ queue (RabbitMQ):** message ని consume చేశాక delete. Random deletes అంటే random disk I/O.

**Kafka:** ఏమీ delete చేయదు. కేవలం **append**. Consumers తమ **offset** ని గుర్తుంచుకుంటారు.

<div class="fig">
<div class="cap">append-only log · ఒకే డేటా, పలువురు స్వతంత్ర readers</div>
<svg viewBox="0 0 750 235">
<text class="t-xs" x="0" y="14">PARTITION 0 · ఒక append-only file</text>
<rect class="n" x="0" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="33" y="49">msg 0</text>
<rect class="n" x="70" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="103" y="49">msg 1</text>
<rect class="n" x="140" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="173" y="49">msg 2</text>
<rect class="n" x="210" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="243" y="49">msg 3</text>
<rect class="n" x="280" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="313" y="49">msg 4</text>
<rect class="n" x="350" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="383" y="49">msg 5</text>
<rect class="n" x="420" y="24" width="66" height="40" rx="3"/>
<text class="t-sm mid" x="453" y="49">msg 6</text>
<rect class="n-good" x="490" y="24" width="80" height="40" rx="3"/>
<text class="t-sm mid" x="530" y="49">← append</text>
<text class="t-sm" x="580" y="49">కొత్తవి ఇక్కడ</text>
<line class="ln-acc" x1="243" y1="68" x2="243" y2="94" marker-end="url(#aa)"/>
<line class="ln-acc" x1="453" y1="68" x2="453" y2="94" marker-end="url(#aa)"/>
<rect class="n-acc" x="160" y="98" width="170" height="42" rx="4"/>
<text class="t-w mid" x="245" y="118">Consumer group A</text>
<text class="t-w-sm mid" x="245" y="133">offset = 3 (analytics)</text>
<rect class="n-info" x="370" y="98" width="170" height="42" rx="4"/>
<text class="t mid" x="455" y="118">Consumer group B</text>
<text class="t-sm mid" x="455" y="133">offset = 6 (search index)</text>
<rect class="n-soft" x="0" y="156" width="750" height="76" rx="4"/>
<text class="t" x="16" y="178">ఈ ఒక్క నిర్ణయం నుంచి వచ్చే మూడు లాభాలు</text>
<text class="t-sm" x="16" y="198">1 · Sequential disk write — HDD మీద కూడా 100+ MB/s. Random write కంటే 100 రెట్లు వేగం.</text>
<text class="t-sm" x="16" y="214">2 · Replay ఉచితం — offset ని వెనక్కి పెట్టి మళ్ళీ చదవడం. Bug fix చేశాక 3 రోజుల data ని reprocess చేయొచ్చు.</text>
<text class="t-sm" x="16" y="228">3 · పలువురు consumers ఒకే data ని స్వతంత్రంగా — broker వాళ్ళ state ని maintain చేయదు, offset వాళ్ళదే.</text>
</svg>
<div class="note"><b>Broker ఏ consumer ఏం చదివాడో track చేయదు.</b> అది consumer బాధ్యత. ఈ ఒక్క మార్పు వల్ల broker దాదాపు stateless అవుతుంది — అందుకే ఇది ఇంత scale అవుతుంది.</div>
</div>

<div class="box info">
<div class="lab">Sequential I/O ఎందుకు ఇంత వేగం — ఈ detail చెప్తే మీరు వేరే level</div>
Disk random seek ≈ 10 ms. Sequential read/write కి seek లేదు. పైగా Kafka <b>OS page cache</b> ని నమ్ముకుంటుంది — తన సొంత cache రాయదు. కొత్తగా రాసిన messages ఇంకా RAM lo ఉంటాయి, consumers వెంటనే చదివితే disk ని ముట్టుకోరు. అలాగే <b>zero-copy</b> (<code>sendfile</code> syscall) — data ని page cache నుంచి నేరుగా network socket కి, user space గుండా కాకుండా. ఈ మూడు కలిపి 1 GB/sec ని సాధారణ hardware మీద సాధ్యం చేస్తాయి.
</div>

## 4. Deep Dive — Partitions (parallelism vs ordering)

<div class="fig">
<div class="cap">partitions &amp; consumer groups · ఇక్కడే trade-off ఉంది</div>
<svg viewBox="0 0 750 250">
<text class="t-xs" x="0" y="14">TOPIC "orders" · 3 PARTITIONS · hash(key) % 3</text>
<rect class="n-dark" x="0" y="24" width="230" height="40" rx="4"/>
<text class="t-w mid" x="115" y="42">Partition 0 · broker 1</text>
<text class="t-w-sm mid" x="115" y="57">user-1, user-4, user-7…</text>
<rect class="n-dark" x="238" y="24" width="230" height="40" rx="4"/>
<text class="t-w mid" x="353" y="42">Partition 1 · broker 2</text>
<text class="t-w-sm mid" x="353" y="57">user-2, user-5…</text>
<rect class="n-dark" x="476" y="24" width="230" height="40" rx="4"/>
<text class="t-w mid" x="591" y="42">Partition 2 · broker 3</text>
<text class="t-w-sm mid" x="591" y="57">user-3, user-6…</text>
<line class="ln-acc" x1="115" y1="68" x2="115" y2="96" marker-end="url(#aa)"/>
<line class="ln-acc" x1="353" y1="68" x2="353" y2="96" marker-end="url(#aa)"/>
<line class="ln-acc" x1="591" y1="68" x2="591" y2="96" marker-end="url(#aa)"/>
<rect class="n-info" x="30" y="100" width="170" height="38" rx="4"/>
<text class="t mid" x="115" y="124">Consumer 1</text>
<rect class="n-info" x="268" y="100" width="170" height="38" rx="4"/>
<text class="t mid" x="353" y="124">Consumer 2</text>
<rect class="n-info" x="506" y="100" width="170" height="38" rx="4"/>
<text class="t mid" x="591" y="124">Consumer 3</text>
<text class="t-sm mid" x="353" y="156">ఒక consumer group lo — ఒక్కో partition ని ఒకే consumer చదువుతాడు</text>
<rect class="n-good" x="0" y="170" width="366" height="76" rx="4"/>
<text class="t" x="16" y="192">లాభం</text>
<text class="t-sm" x="16" y="212">Partitions పెంచితే consumers పెంచొచ్చు —</text>
<text class="t-sm" x="16" y="228">throughput linear గా పెరుగుతుంది.</text>
<text class="t-sm" x="16" y="242">ఒకే key ఎప్పుడూ ఒకే partition → per-key order భద్రం.</text>
<rect class="n-bad" x="384" y="170" width="366" height="76" rx="4"/>
<text class="t" x="400" y="192">ఖరీదు</text>
<text class="t-sm" x="400" y="212">Partitions మధ్య ordering లేదు. Global order</text>
<text class="t-sm" x="400" y="228">కావాలంటే ఒకే partition — అంటే ఒకే consumer,</text>
<text class="t-sm" x="400" y="242">parallelism సున్నా. Consumers &gt; partitions అయితే మిగతావాళ్ళు ఖాళీ.</text>
</svg>
</div>

<div class="box good">
<div class="lab">ఈ trade-off ని ఇలా చెప్పండి</div>
"Partition అనేది <b>parallelism యొక్క unit మరియు ordering యొక్క unit — రెండూ ఒకటే.</b> ఇది యాదృచ్ఛికం కాదు, ఉద్దేశపూర్వకం. అందుకే partition key ఎంచుకోవడం అతి ముఖ్యమైన నిర్ణయం: <code>user_id</code> ఇస్తే ఒక user యొక్క events క్రమంలో ఉంటాయి, వేరే users సమాంతరంగా వెళ్తాయి. అదే <code>order_id</code> ఇస్తే ఒక user యొక్క రెండు orders తప్పు క్రమంలో process అవ్వొచ్చు. <b>ఏ స్థాయిలో order కావాలో అదే partition key.</b>"
</div>

## 5. Deep Dive — Replication &amp; Durability

<div class="fig">
<div class="cap">leader, followers, ISR</div>
<svg viewBox="0 0 750 225">
<rect class="n" x="0" y="60" width="90" height="40" rx="4"/>
<text class="t mid" x="45" y="85">Producer</text>
<line class="ln-acc" x1="94" y1="80" x2="140" y2="80" marker-end="url(#aa)"/>
<text class="t-sm mid" x="117" y="72">write</text>
<rect class="n-acc" x="144" y="56" width="150" height="48" rx="4"/>
<text class="t-w mid" x="219" y="78">LEADER (broker 1)</text>
<text class="t-w-sm mid" x="219" y="94">reads + writes అన్నీ ఇక్కడే</text>
<line class="ln" x1="298" y1="70" x2="344" y2="40" marker-end="url(#a)"/>
<line class="ln" x1="298" y1="90" x2="344" y2="120" marker-end="url(#a)"/>
<rect class="n-good" x="348" y="18" width="150" height="44" rx="4"/>
<text class="t mid" x="423" y="38">Follower (broker 2)</text>
<text class="t-sm mid" x="423" y="53">in-sync ✓</text>
<rect class="n-good" x="348" y="98" width="150" height="44" rx="4"/>
<text class="t mid" x="423" y="118">Follower (broker 3)</text>
<text class="t-sm mid" x="423" y="133">in-sync ✓</text>
<rect class="n-bad" x="348" y="158" width="150" height="44" rx="4"/>
<text class="t mid" x="423" y="178">Follower (broker 4)</text>
<text class="t-sm mid" x="423" y="193">వెనకబడింది → ISR నుంచి తొలగింపు</text>
<rect class="n-info" x="520" y="18" width="230" height="84" rx="4"/>
<text class="t" x="534" y="40">acks setting</text>
<text class="t-sm mono" x="534" y="60">acks=0 → wait లేదు, పోవచ్చు</text>
<text class="t-sm mono" x="534" y="76">acks=1 → leader రాశాక. Leader</text>
<text class="t-sm mono" x="546" y="90">చస్తే ఆ message పోతుంది</text>
<rect class="n-good" x="520" y="110" width="230" height="92" rx="4"/>
<text class="t" x="534" y="132">acks=all ✓ (సరైనది)</text>
<text class="t-sm" x="534" y="152">ISR అందరూ రాశాకే ack.</text>
<text class="t-sm" x="534" y="168">min.insync.replicas=2 తో కలిపితే —</text>
<text class="t-sm" x="534" y="184">ఒక broker పోయినా data పోదు.</text>
<text class="t-acc" x="534" y="198">Latency ఎక్కువ, కానీ durability నిజం.</text>
</svg>
<div class="note"><b>ISR (In-Sync Replicas)</b> = leader తో వేగంగా నడుస్తున్న followers. వెనకబడినవాడిని ISR నుంచి తీసేస్తారు — లేకపోతే ఒక నెమ్మది broker మొత్తం cluster ని ఆపేస్తుంది. Leader చస్తే <b>ISR లోపలి నుంచే</b> కొత్త leader — ఇది data loss ని ఆపుతుంది.</div>
</div>

## 6. Deep Dive — Delivery Semantics

| Semantics | ఎలా | ఖరీదు |
|-----------|-----|--------|
| **At-most-once** | Process చేయకముందే offset commit. Crash అయితే message పోతుంది | వేగం, కానీ data loss |
| **At-least-once** ✅ | Process చేశాకే offset commit. Crash అయితే duplicate | Default. Consumer idempotent గా ఉండాలి |
| **Exactly-once** | Idempotent producer (sequence number per producer) + transactional writes (offset commit మరియు output write ఒకే transaction lo) | Throughput ~20-30% తగ్గుతుంది |

<div class="box warn">
<div class="lab">Kafka యొక్క "exactly-once" నిజంగా ఏమిటి</div>
Kafka exactly-once <b>Kafka లోపల మాత్రమే</b> పని చేస్తుంది — "read from topic A, process, write to topic B" అనే pattern కి. ఆ మూడింటినీ ఒకే transaction lo చేస్తుంది. కానీ మీరు <b>బయటి system</b> కి రాస్తుంటే (ఒక REST API call, ఒక email) — అక్కడ exactly-once లేదు, మళ్ళీ idempotency మీద ఆధారపడాలి. ఈ సూక్ష్మ భేదాన్ని చెప్తే మీరు దీన్ని నిజంగా వాడారని అర్థమవుతుంది.
</div>

## 7. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Broker crash** | Controller ఆ broker leader గా ఉన్న partitions కి ISR నుంచి కొత్త leaders ఎంచుకుంటుంది. Producers/consumers metadata refresh చేసి కొత్త leader కి వెళ్తారు |
| **Consumer crash** | Group coordinator heartbeat miss ని గుర్తించి **rebalance** — ఆ partitions మిగతా consumers కి. కొత్త consumer చివరి committed offset నుంచి మొదలు |
| **Rebalance storm** | ప్రతి rebalance lo మొత్తం group ఆగుతుంది. **Cooperative/incremental rebalancing** — ప్రభావితమైన partitions ని మాత్రమే కదిలించడం |
| **Consumer lag** | Lag = latest offset − consumer offset. ఇదే ముఖ్యమైన health metric. Lag పెరిగితే consumers ని scale చేయడం (partitions కంటే ఎక్కువ కాదు) |
| **Hot partition** | ఒక key చాలా ఎక్కువ traffic. Key కి suffix కలిపి spread చేయడం — కానీ అప్పుడు ఆ key యొక్క ordering పోతుంది. Explicit trade-off |
| **Disk నిండటం** | Retention policy — time-based (7 రోజులు) లేదా size-based. **Log compaction** — key ప్రకారం చివరి value ని మాత్రం ఉంచడం (changelog topics కి) |
| **Partition సంఖ్య తప్పు** | పెంచొచ్చు కానీ తగ్గించలేం. పైగా పెంచితే `hash(key) % n` మారి existing keys వేరే partitions కి వెళ్తాయి — ordering విరుగుతుంది. అందుకే **ఉదారంగా ముందే ఎక్కువ partitions** పెట్టడం |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Key questions first: what ordering guarantee do we owe, what delivery semantics, do we retain after consumption, and what throughput? I'll assume per-key ordering, at-least-once by default, seven days of retention so consumers can replay, and a million messages a second."</p>
<p>"The central design decision is that this is an <em>append-only log</em>, not a traditional queue. A traditional broker deletes a message once it's consumed, which means random deletes and random disk I/O, and it has to track per-consumer state. I do neither. Messages are appended and retained for a fixed window; consumers track their own <em>offset</em>."</p>
<p>"Three things fall out of that. Writes are purely sequential, which is around a hundred times faster than random I/O. Replay is free — move an offset backwards and reprocess. And multiple independent consumer groups can read the same data without the broker tracking anything about them, which is what keeps brokers close to stateless."</p>
<p>"For raw speed I'd lean on the operating system rather than fight it: no application-level cache, just the OS page cache, so recently written messages are served from memory. And <em>zero-copy</em> via sendfile, so data goes from page cache straight to the network socket without being copied through user space."</p>
<p>"Parallelism comes from partitions. A topic is split into partitions by hashing the message key, and within a consumer group each partition is read by exactly one consumer. The thing I'd emphasise is that <em>the partition is simultaneously the unit of parallelism and the unit of ordering</em> — that's deliberate, not accidental. There's no ordering across partitions. If you want global ordering you need a single partition, which means a single consumer and no parallelism at all. So choosing the partition key is the most consequential decision: key by user ID and one user's events stay ordered while different users run in parallel."</p>
<p>"For durability, each partition has a leader and followers, and Kafka tracks the set of <em>in-sync replicas</em>. A follower that falls behind is ejected from that set, so one slow broker can't stall the cluster. Producers should use acks=all with min.insync.replicas of two — that costs latency, but it's the only setting where a broker failure genuinely doesn't lose data. Leader election only ever picks from the in-sync set, which is what makes that guarantee hold."</p>
<p>"On semantics, at-least-once is the sane default — commit the offset after processing, and accept that a crash means a duplicate, which the consumer handles idempotently. Kafka does offer exactly-once via idempotent producers and transactions, but I'd be precise about its scope: it applies to consume-transform-produce <em>within Kafka</em>. The moment you write to an external system — call an API, send an email — you're back to at-least-once plus idempotency."</p>
<p>"Two operational things I'd call out. Consumer lag is the health metric that matters, and rebalances are the thing that hurts — every rebalance stops the whole group, so I'd use cooperative rebalancing to move only the affected partitions. And I'd over-provision partitions from the start, because you can add them but never remove them, and adding them reshuffles the hash and breaks per-key ordering for existing keys."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "ZooKeeper ఎందుకు వాడేవారు, ఇప్పుడు?" | Metadata, controller election, ISR state కి. Kafka 3.x నుంచి **KRaft** — Raft consensus ని Kafka లోపలే, ZooKeeper అవసరం లేదు. ఒక తక్కువ system operate చేయాలి |
| "Kafka vs RabbitMQ ఎప్పుడు?" | **Kafka**: high throughput, replay కావాలి, event streaming, log. **RabbitMQ**: complex routing, per-message ack/nack, priority queues, తక్కువ latency, చిన్న scale |
| "Log compaction అంటే?" | ప్రతి key కి చివరి value ని మాత్రం ఉంచి మిగతావి తీసేయడం. దీంతో topic ఒక "current state snapshot" అవుతుంది — CDC, config distribution కి పనికొస్తుంది |
| "Consumer partitions కంటే ఎక్కువ ఉంటే?" | అదనపు consumers **ఖాళీగా** ఉంటారు. Partitions సంఖ్యే గరిష్ఠ parallelism |
| "Message ordering ni ఎలా guarantee చేస్తారు retry lo?" | `max.in.flight.requests=1` లేదా idempotent producer. లేకపోతే — msg1 fail అయి retry అవుతుంటే msg2 ముందే వెళ్ళిపోతుంది, order విరుగుతుంది |
| "Tiered storage?" | పాత segments ని S3 కి తరలించి, brokers lo ఇటీవలివి మాత్రం. దీంతో retention ని నెలలు పొడిగించొచ్చు — storage cost తక్కువ, replay ఇంకా సాధ్యం |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">14</div>
<div class="kicker">Problem 14 · Distributed Systems Theory</div>
<div class="title">Design a Distributed<br>Key-Value Store (Dynamo)</div>
<div class="meta">Difficulty <b>చాలా కష్టం</b> · Frequency <b>SDE3 lo ఎక్కువ</b> · నేర్పే concepts: consistent hashing, quorum, vector clocks, LSM tree</div>
</div>

## 1. The Ask

> "Design DynamoDB. A key-value store that scales horizontally, survives node failures, and never goes down."

ఇది **అన్ని problems కి తల్లి**. Cassandra, DynamoDB, Riak — అన్నీ ఇదే paper (Amazon Dynamo, 2007) నుంచి. ఇక్కడ నేర్చుకునే ఐదు ఆలోచనలు మిగతా అన్ని distributed systems lo తిరిగి కనిపిస్తాయి.

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| API ఏమిటి? | Range queries కావాలంటే design పూర్తిగా మారుతుంది | `get(key)`, `put(key, value)` మాత్రమే |
| **Consistency — strong నా eventual నా?** | ఇదే CAP నిర్ణయం | Tunable (quorum తో) |
| Availability ఎంత ముఖ్యం? | Dynamo యొక్క మూల లక్ష్యం: **ఎప్పుడూ write ని తిరస్కరించకూడదు** | "Always writeable" |
| Value size? | పెద్దవి అయితే వేరే storage | ≤ 1 MB |
| Transactions కావాలా? | Multi-key transactions అంటే వేరే system | లేదు, single-key మాత్రం |

<div class="box warn">
<div class="lab">Dynamo యొక్క మూల తత్వం</div>
Amazon shopping cart కోసం ఇది రాశారు. వాళ్ళ నియమం: <b>"Add to cart" ఎప్పుడూ విఫలం కాకూడదు</b> — network partition అయినా, nodes చచ్చినా. అందుకే వాళ్ళు <b>CAP lo C ని వదిలేసి AP ఎంచుకున్నారు</b>. Conflict వస్తే? రెండు versions ని ఉంచి, application ని resolve చేయమనడం (cart కి అది సులభం — రెండు carts ని union చేయడం). ఈ context ని చెప్తే మీ మిగతా design అంతా అర్థవంతంగా మారుతుంది.
</div>

## 3. Deep Dive — Consistent Hashing

<div class="fig">
<div class="cap">consistent hashing ring · node చేరినా, పోయినా — 1/N keys మాత్రమే కదులుతాయి</div>
<svg viewBox="0 0 750 250">
<circle cx="170" cy="125" r="96" fill="none" stroke="#d9d3c6" stroke-width="2"/>
<circle cx="170" cy="29" r="11" fill="#17203a"/>
<text class="t-sm mid" x="170" y="14">Node A</text>
<circle cx="253" cy="173" r="11" fill="#17203a"/>
<text class="t-sm" x="270" y="180">Node B</text>
<circle cx="87" cy="173" r="11" fill="#17203a"/>
<text class="t-sm end" x="70" y="180">Node C</text>
<circle cx="238" cy="66" r="7" fill="#e2653a"/>
<text class="t-sm" x="250" y="60">key "x"</text>
<path class="ln-acc" d="M244 60 A 96 96 0 0 0 180 32" marker-end="url(#aa)"/>
<text class="t-sm mid" x="170" y="130">hash ring</text>
<text class="t-sm mid" x="170" y="146">0 → 2^128</text>
<rect class="n-good" x="300" y="14" width="450" height="76" rx="4"/>
<text class="t" x="316" y="36">నియమం ఒక్కటే</text>
<text class="t-sm" x="316" y="58">key ని hash చేసి ring మీద పెట్టు. అక్కడి నుంచి <tspan class="t-acc">సవ్య దిశలో</tspan> మొదట</text>
<text class="t-sm" x="316" y="76">కనిపించే node ఆ key కి యజమాని. తర్వాతి N−1 nodes replicas.</text>
<rect class="n-bad" x="300" y="98" width="450" height="66" rx="4"/>
<text class="t" x="316" y="120">సాధారణ hash తో పోలిస్తే</text>
<text class="t-sm" x="316" y="140">hash(key) % N lo N మారితే <tspan class="t-acc">దాదాపు అన్ని keys</tspan> కదులుతాయి —</text>
<text class="t-sm" x="316" y="156">అంటే ఒక node చేర్చడానికి మొత్తం cluster ని rebalance చేయాలి.</text>
<rect class="n-info" x="300" y="172" width="450" height="70" rx="4"/>
<text class="t" x="316" y="194">Virtual nodes — ఎందుకు తప్పనిసరి</text>
<text class="t-sm" x="316" y="214">Physical node ని ring మీద 100+ చోట్ల పెట్టడం. లేకపోతే మూడు nodes</text>
<text class="t-sm" x="316" y="230">అసమానంగా పంచుకుంటాయి, పైగా ఒకటి పోతే దాని భారం మొత్తం ఒక్క పొరుగువాడి మీద పడుతుంది.</text>
</svg>
</div>

## 4. Deep Dive — Quorum (tunable consistency)

**N** = replicas సంఖ్య · **W** = write కి ఎన్ని nodes ack ఇవ్వాలి · **R** = read కి ఎన్ని nodes నుంచి చదవాలి

<div class="fig">
<div class="cap">R + W &gt; N అయితే ఎందుకు తాజా data దొరుకుతుంది</div>
<svg viewBox="0 0 750 215">
<text class="t-xs" x="0" y="14">N = 3 · W = 2 · R = 2 · R + W = 4 &gt; 3 ✓</text>
<rect class="n-good" x="0" y="26" width="120" height="44" rx="4"/>
<text class="t mid" x="60" y="46">Replica 1</text>
<text class="t-sm mid" x="60" y="62">v2 (కొత్తది)</text>
<rect class="n-good" x="128" y="26" width="120" height="44" rx="4"/>
<text class="t mid" x="188" y="46">Replica 2</text>
<text class="t-sm mid" x="188" y="62">v2 (కొత్తది)</text>
<rect class="n-bad" x="256" y="26" width="120" height="44" rx="4"/>
<text class="t mid" x="316" y="46">Replica 3</text>
<text class="t-sm mid" x="316" y="62">v1 (పాతది)</text>
<text class="t-sm" x="390" y="42">Write v2 · rep 1, 2 ack ఇచ్చాయి (W=2 ✓)</text>
<text class="t-sm" x="390" y="60">Replica 3 ఇంకా చేరుకోలేదు</text>
<line class="ln-acc" x1="188" y1="76" x2="188" y2="100" marker-end="url(#aa)"/>
<rect class="n-info" x="0" y="104" width="376" height="46" rx="4"/>
<text class="t mid" x="188" y="124">Read ఏవైనా 2 replicas నుంచి (R=2)</text>
<text class="t-sm mid" x="188" y="141">3 lo ఏ 2 తీసుకున్నా — కనీసం ఒకటి v2 ఉన్నదే ఉంటుంది</text>
<rect class="n-acc" x="390" y="104" width="360" height="46" rx="4"/>
<text class="t-w mid" x="570" y="124">ఇదే pigeonhole principle</text>
<text class="t-w-sm mid" x="570" y="141">W nodes రాశాయి, R nodes చదువుతున్నాయి, R+W &gt; N → overlap తప్పనిసరి</text>
<rect class="n-soft" x="0" y="160" width="750" height="50" rx="4"/>
<text class="t-sm" x="16" y="180">W=1, R=1 → చాలా వేగం, కానీ పాత data రావొచ్చు (R+W=2, N=3 కంటే తక్కువ)</text>
<text class="t-sm" x="16" y="198">W=3, R=1 → reads వేగం, writes నెమ్మది + ఒక node పోతే write ఆగిపోతుంది. Read-heavy కి మంచిది</text>
</svg>
<div class="note">ఇదే <b>tunable consistency</b> — ఒక్కో query కీ R, W ని మార్చొచ్చు. User profile చదవడానికి R=1 (వేగం), account balance కి R=2 (correctness). ఒకే database lo రెండు రకాల guarantees.</div>
</div>

## 5. Deep Dive — Conflicts (vector clocks vs LWW)

W=2 తో ఇద్దరు clients ఒకే key కి ఒకేసారి రాశారు, network partition వల్ల ఒకరికొకరు తెలియదు. ఇప్పుడు రెండు versions.

| పరిష్కారం | ఎలా | ఖరీదు |
|-----------|-----|--------|
| **Last-write-wins (timestamp)** | పెద్ద timestamp గెలుస్తుంది | ❌ **డేటా మౌనంగా పోతుంది.** పైగా clock skew వల్ల "పాతది" గెలవొచ్చు. Cassandra default — సులభం కానీ ప్రమాదకరం |
| **Vector clocks** | ప్రతి version తో `{nodeA: 2, nodeB: 1}` లాంటి causality metadata. దీంతో "ఇది ఆ దాని తర్వాతిదా, లేక సమాంతరమా" అని ఖచ్చితంగా చెప్పొచ్చు | ✅ Causality ని నిజంగా tracks చేస్తుంది. కానీ concurrent అయితే **application** resolve చేయాలి |
| **CRDT values** | Value నే commutative structure గా (counter, set) | ✅ Automatic merge, కానీ అన్ని data types కి కుదరదు |

<div class="box good">
<div class="lab">ఇలా చెప్పండి</div>
"Vector clock మనకి <b>జవాబు ఇవ్వదు</b> — అది ఒక ప్రశ్నకి మాత్రమే జవాబిస్తుంది: 'ఈ రెండు versions lo ఒకటి రెండోదాని తర్వాత వచ్చిందా, లేక అవి నిజంగా concurrent నా?' Concurrent అయితే database వాటిని <b>siblings</b> గా రెండింటినీ ఉంచి, తర్వాతి read lo application కి ఇస్తుంది. Shopping cart కి ఇది సులభం — రెండు carts ని union చేయడం. కానీ ప్రతి application ఈ బాధ్యతని తీసుకోలేదు, అందుకే చాలా systems LWW కే వెళ్తాయి — <b>data loss ని తెలిసి అంగీకరిస్తూ</b>."
</div>

## 6. Deep Dive — Storage Engine (LSM Tree)

<div class="fig">
<div class="cap">LSM tree · write path మరియు read path</div>
<svg viewBox="0 0 750 250">
<text class="t-xs" x="0" y="14">WRITE PATH · అన్ని writes memory lo, sequential flush</text>
<rect class="n" x="0" y="24" width="100" height="40" rx="4"/>
<text class="t mid" x="50" y="49">put(k,v)</text>
<line class="ln" x1="104" y1="44" x2="132" y2="44" marker-end="url(#a)"/>
<rect class="n-bad" x="136" y="24" width="130" height="40" rx="4"/>
<text class="t mid" x="201" y="42">1 · Commit log</text>
<text class="t-sm mid" x="201" y="57">append — durability</text>
<line class="ln" x1="270" y1="44" x2="298" y2="44" marker-end="url(#a)"/>
<rect class="n-acc" x="302" y="24" width="130" height="40" rx="4"/>
<text class="t-w mid" x="367" y="42">2 · Memtable</text>
<text class="t-w-sm mid" x="367" y="57">in-memory sorted tree</text>
<line class="ln-acc" x1="436" y1="44" x2="464" y2="44" marker-end="url(#aa)"/>
<rect class="n-good" x="468" y="24" width="282" height="40" rx="4"/>
<text class="t mid" x="609" y="42">3 · నిండాక → SSTable గా disk కి flush</text>
<text class="t-sm mid" x="609" y="57">sorted, immutable, sequential write</text>
<text class="t-xs" x="0" y="98">READ PATH · కొత్తది నుంచి పాతది వైపు</text>
<rect class="n-acc" x="0" y="108" width="110" height="42" rx="4"/>
<text class="t-w mid" x="55" y="128">Memtable</text>
<text class="t-w-sm mid" x="55" y="143">అతి కొత్తది</text>
<line class="ln" x1="114" y1="129" x2="140" y2="129" marker-end="url(#a)"/>
<rect class="n-info" x="144" y="108" width="130" height="42" rx="4"/>
<text class="t mid" x="209" y="126">Bloom filter</text>
<text class="t-sm mid" x="209" y="142">"ఈ SSTable lo ఉందా?"</text>
<line class="ln" x1="278" y1="129" x2="304" y2="129" marker-end="url(#a)"/>
<rect class="n" x="308" y="108" width="100" height="42" rx="4"/>
<text class="t-sm mid" x="358" y="133">SSTable 3</text>
<rect class="n" x="412" y="108" width="100" height="42" rx="4"/>
<text class="t-sm mid" x="462" y="133">SSTable 2</text>
<rect class="n" x="516" y="108" width="100" height="42" rx="4"/>
<text class="t-sm mid" x="566" y="133">SSTable 1</text>
<text class="t-sm" x="626" y="133">…పాతవి</text>
<rect class="n-good" x="0" y="164" width="366" height="80" rx="4"/>
<text class="t" x="16" y="186">ఎందుకు LSM (B-tree కాదు)</text>
<text class="t-sm" x="16" y="206">అన్ని writes sequential (log + flush). B-tree lo</text>
<text class="t-sm" x="16" y="222">ప్రతి write ఒక random page update —</text>
<text class="t-acc" x="16" y="238">write-heavy loads కి LSM చాలా వేగం.</text>
<rect class="n-bad" x="384" y="164" width="366" height="80" rx="4"/>
<text class="t" x="400" y="186">ఖరీదు · read amplification</text>
<text class="t-sm" x="400" y="206">ఒక key కోసం పలు SSTables చూడాలి. అందుకే</text>
<text class="t-sm" x="400" y="222">bloom filter (ఇక్కడ లేదని O(1) lo చెప్పడం) +</text>
<text class="t-sm" x="400" y="238">background compaction (SSTables ని merge చేయడం).</text>
</svg>
</div>

## 7. Failure Handling — మూడు యంత్రాంగాలు

| యంత్రాంగం | ఎప్పుడు | ఏం చేస్తుంది |
|-----------|---------|---------------|
| **Gossip** | ఎప్పుడూ | ప్రతి node కొన్ని random peers తో state ని పంచుకుంటుంది. కొన్ని సెకన్లలో "ఎవరు బతికున్నారు" అనేది cluster అంతా వ్యాపిస్తుంది. Central failure detector అవసరం లేదు (అది SPOF అవుతుంది) |
| **Hinted handoff** | Node తాత్కాలికంగా down | Node C కి రాయాల్సిన write ని Node D **hint** గా పట్టుకుంటుంది. C తిరిగి రాగానే D దాన్ని అందిస్తుంది. **అందుకే write ఎప్పుడూ విఫలం కాదు** — Dynamo యొక్క మూల వాగ్దానం ఇక్కడ నెరవేరుతుంది |
| **Merkle tree anti-entropy** | Node చాలాసేపు down | రెండు replicas తమ data యొక్క hash tree ని పోల్చుకుంటాయి. మొత్తం data పంపకుండా, **తేడా ఉన్న ranges** ని మాత్రమే గుర్తించి sync చేయడం. Root hash ఒకటే అయితే పని అయిపోయింది |

<div class="box info">
<div class="lab">Read repair — నాలుగోది, ఉచితమైనది</div>
Read lo R replicas నుంచి జవాబులు వచ్చాయి, ఒకటి పాతది. ఆ క్షణంలోనే దాన్ని update చేసేయడం. అంటే <b>ఎక్కువగా చదివే data దానంతట అదే సరిచేసుకుంటుంది</b> — అదనపు ఖర్చు దాదాపు లేకుండా. తక్కువగా చదివే data కి anti-entropy ఉంది.
</div>

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me establish the philosophy first, because it drives every later decision. Dynamo was built for Amazon's shopping cart, with one non-negotiable rule: <em>a write must never be rejected</em>, even during a network partition. That means choosing availability over consistency in CAP terms, and accepting that we'll sometimes have conflicting versions to reconcile."</p>
<p>"Data placement uses <em>consistent hashing</em>. Keys and nodes both hash onto a ring; a key belongs to the first node clockwise from it, and the next N−1 nodes hold replicas. The reason to prefer this over hash-modulo-N is that adding or removing a node moves only about one Nth of the keys instead of nearly all of them. I'd add virtual nodes — each physical machine appears at a hundred-plus points on the ring — otherwise load is uneven, and when a node dies its entire share lands on a single neighbour."</p>
<p>"Consistency is <em>tunable</em> through quorums. With N replicas, W acknowledgements on write and R on read, if R plus W exceeds N then the read and write sets must overlap by the pigeonhole principle, so a read always sees the latest write. N=3, W=2, R=2 is the usual balance. But the caller can choose per query — R=1 for a profile fetch where speed matters, higher where correctness does."</p>
<p>"Because we allow writes during partitions, conflicts are inevitable. Last-write-wins by timestamp is simple but <em>silently discards data</em>, and clock skew means the wrong version can win. Dynamo instead uses <em>vector clocks</em>. It's worth being precise about what they do: a vector clock doesn't resolve conflicts, it only tells you whether one version causally descends from another or whether they're genuinely concurrent. If they're concurrent, both are kept as siblings and handed to the application on the next read. For a shopping cart that's easy — union the two carts. Not every application can shoulder that, which is why many systems fall back to last-write-wins and knowingly accept the data loss."</p>
<p>"For storage I'd use an <em>LSM tree</em> rather than a B-tree. Writes go to a commit log for durability and an in-memory sorted table, which is flushed to immutable sorted files on disk. Every write is sequential, which is what makes this fast for write-heavy workloads — a B-tree does a random page update per write. The cost is read amplification, since a key might live in any of several files. Bloom filters fix most of that by telling us in constant time that a key is definitely <em>not</em> in a given file, and background compaction merges files to keep the count down."</p>
<p>"Failure handling has three layers. <em>Gossip</em> spreads membership and liveness without a central detector, which would itself be a single point of failure. <em>Hinted handoff</em> is what actually delivers the 'always writeable' promise — if a replica is down, a neighbour accepts the write as a hint and forwards it when the node returns. And <em>Merkle trees</em> handle longer outages: two replicas compare hash trees to find exactly which key ranges differ, so they sync only the divergent data rather than everything. Read repair adds a fourth, nearly free layer — whenever a read reveals a stale replica, we fix it on the spot."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Range queries ఎలా (`WHERE id BETWEEN`)?" | Consistent hashing తో సాధ్యం కాదు — hash order, key order ని నాశనం చేస్తుంది. **Range partitioning** కావాలి (HBase, Bigtable అలా చేస్తాయి). ఖరీదు: hotspot ప్రమాదం, ఎందుకంటే వరుస keys ఒకే node మీద |
| "Secondary indexes?" | Local index (ప్రతి node తన data కి — read lo అన్ని nodes ని అడగాలి) లేదా global index (వేరే table గా, కానీ అప్పుడు cross-partition consistency సమస్య) |
| "Cassandra vs DynamoDB తేడా?" | ఒకే Dynamo వంశం. Cassandra: self-hosted, tunable, wide-column, LWW default. DynamoDB: managed, single-digit ms SLA, strongly consistent read option కూడా ఇస్తుంది |
| "Strong consistency కూడా కావాలంటే?" | R=N, W=N (అప్పుడు availability పోతుంది), లేదా consensus (Raft/Paxos) per partition — అది Spanner/CockroachDB దారి. Latency ఎక్కువ, కానీ నిజమైన linearizability |
| "Hot partition ఎలా handle చేస్తారు?" | Adaptive capacity (DynamoDB), లేదా key కి random suffix కలిపి spread. కానీ అప్పుడు ఆ key ని చదవడానికి అన్ని suffixes ని అడగాలి |
| "Compaction strategy?" | **Size-tiered** — write-heavy కి మంచిది, కానీ space amplification ఎక్కువ. **Leveled** — read-heavy కి మంచిది, కానీ ఎక్కువ write amplification. Workload ని బట్టి ఎంచుకోవడం |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">15</div>
<div class="kicker">Problem 15 · Content Addressing</div>
<div class="title">Design File Sync<br>(Dropbox / Google Drive)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>మధ్యస్థం</b> · నేర్పే concepts: chunking, content-defined boundaries, dedupe, delta sync</div>
</div>

## 1. The Ask

> "Design Dropbox. A file changes on my laptop and appears on my phone within seconds — without re-uploading the whole file."

<div class="box warn">
<div class="lab">ఈ problem యొక్క ఒకే ఒక్క కీలక ప్రశ్న</div>
"నేను ఒక 1 GB video file lo చివరన 5 సెకన్లు కత్తిరించాను. ఇప్పుడు ఎంత data upload కావాలి?" — <b>1 GB అని జవాబిస్తే</b> మీరు ఈ problem ని అర్థం చేసుకోలేదు. సరైన జవాబు: <b>కొన్ని MB మాత్రమే</b>. దీన్ని ఎలా సాధించాలో చెప్పడమే ఈ interview.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| File పరిమాణం గరిష్ఠం? | Chunking strategy | 10 GB దాకా |
| Version history కావాలా? | ఉంటే పాత chunks ని ఉంచాలి | 30 రోజులు |
| Sharing / collaboration? | Permission model + notification fan-out | అవును |
| Offline editing? | Conflict resolution తప్పనిసరి | అవును |
| Sync latency? | Push నా poll నా | కొన్ని సెకన్లు |
| ఒకే file ని ఇద్దరు edit చేస్తే? | Conflict policy | రెండు copies ఉంచడం |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| Users | 100 M (DAU 20 M) |
| ఒక user సగటు storage | 50 GB |
| **Raw storage** | 100M × 50 GB = **5 EB** — dedupe లేకుండా అసాధ్యం |
| Dedupe తర్వాత (సాధారణంగా 30-50% ఆదా) | ≈ 2.5–3 EB |
| రోజుకి మారే files / user | 10 |
| Metadata QPS | 20M × 10 ÷ 86,400 ≈ 2,300 / sec (peak ~10K) |
| Chunk size | 4 MB |
| Upload bandwidth | Delta sync తో నిజమైన traffic చాలా తక్కువ |

## 4. Deep Dive — Chunking (ఇదే అసలు కీలకం)

<div class="fig">
<div class="cap">fixed-size vs content-defined chunking · ఎందుకు తేడా అపారమైనది</div>
<svg viewBox="0 0 750 290">
<text class="t-xs" x="0" y="14">FIXED-SIZE CHUNKS · ప్రతి 4 MB కి కత్తిరించడం</text>
<rect class="n" x="0" y="24" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="70" y="45">chunk 1</text>
<rect class="n" x="144" y="24" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="214" y="45">chunk 2</text>
<rect class="n" x="288" y="24" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="358" y="45">chunk 3</text>
<rect class="n" x="432" y="24" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="502" y="45">chunk 4</text>
<text class="t-sm" x="590" y="45">అసలు file</text>
<text class="t-acc" x="0" y="78">File మొదట్లో 1 byte చేర్చాక —</text>
<rect class="n-bad" x="0" y="88" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="70" y="109">chunk 1'</text>
<rect class="n-bad" x="144" y="88" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="214" y="109">chunk 2'</text>
<rect class="n-bad" x="288" y="88" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="358" y="109">chunk 3'</text>
<rect class="n-bad" x="432" y="88" width="140" height="34" rx="3"/>
<text class="t-sm mid" x="502" y="109">chunk 4'</text>
<text class="t-sm" x="590" y="102">అన్ని boundaries</text>
<text class="t-sm" x="590" y="118">1 byte జరిగాయి →</text>
<text class="t-acc" x="590" y="134">అన్ని chunks మారాయి</text>
<text class="t-xs" x="0" y="168">CONTENT-DEFINED CHUNKING · rolling hash ఒక pattern చూసినప్పుడు కత్తిరించడం</text>
<rect class="n" x="0" y="178" width="112" height="34" rx="3"/>
<text class="t-sm mid" x="56" y="199">chunk A</text>
<rect class="n" x="116" y="178" width="168" height="34" rx="3"/>
<text class="t-sm mid" x="200" y="199">chunk B</text>
<rect class="n" x="288" y="178" width="128" height="34" rx="3"/>
<text class="t-sm mid" x="352" y="199">chunk C</text>
<rect class="n" x="420" y="178" width="152" height="34" rx="3"/>
<text class="t-sm mid" x="496" y="199">chunk D</text>
<text class="t-sm" x="590" y="199">సైజులు వేరువేరు</text>
<text class="t-acc" x="0" y="232">అదే 1 byte చేర్చాక —</text>
<rect class="n-bad" x="0" y="242" width="116" height="34" rx="3"/>
<text class="t-sm mid" x="58" y="263">chunk A' (మారింది)</text>
<rect class="n-good" x="120" y="242" width="164" height="34" rx="3"/>
<text class="t-sm mid" x="202" y="263">chunk B (అదే)</text>
<rect class="n-good" x="288" y="242" width="128" height="34" rx="3"/>
<text class="t-sm mid" x="352" y="263">chunk C (అదే)</text>
<rect class="n-good" x="420" y="242" width="152" height="34" rx="3"/>
<text class="t-sm mid" x="496" y="263">chunk D (అదే)</text>
<text class="t-acc" x="590" y="256">ఒక్క chunk మాత్రమే</text>
<text class="t-acc" x="590" y="272">upload కావాలి ✓</text>
</svg>
<div class="note"><b>Rolling hash (Rabin fingerprint)</b> — file మీద ఒక window ని జరుపుతూ, hash ఒక నిర్దిష్ట pattern (ఉదా. చివరి 13 bits సున్నా) చూపినప్పుడు అక్కడ కత్తిరించడం. Boundary అనేది <i>content</i> మీద ఆధారపడుతుంది, position మీద కాదు — అందుకే content జరిగినా boundaries జరగవు.</div>
</div>

<div class="box good">
<div class="lab">ఈ ఒక్క idea ని బాగా చెప్పండి</div>
"Chunk boundary ని <b>position తో కాకుండా content తో</b> నిర్ణయించడం — ఇదే మొత్తం system ని సాధ్యం చేసే idea. Fixed chunks తో file మొదట్లో ఒక్క byte చేర్చితే మొత్తం file మళ్ళీ upload కావాలి. Content-defined chunking తో ఒక్క chunk మాత్రమే. ఇదే idea rsync, git, Docker layers, backup systems — అన్నిచోట్లా ఉంది."
</div>

## 5. Deep Dive — Content Addressing &amp; Dedupe

```
chunk_id = SHA-256(chunk_bytes)     # content యే దాని పేరు

file "video.mp4" = [
  "a3f9…",  "7b21…",  "c04e…",  "f8d2…"     # chunk hashes క్రమంలో
]
```

| స్థాయి | ఎలా | ఆదా |
|--------|-----|------|
| **Per-user dedupe** | ఒక user రెండు folders lo ఒకే file — ఒక్కసారే store | మధ్యస్థం |
| **Global dedupe** | ప్రపంచంలో ఎవరైనా ఆ chunk upload చేసి ఉంటే మళ్ళీ వద్దు | భారీ (30-50%) — కానీ ⚠️ చూడండి |

<div class="box bad">
<div class="lab">Global dedupe యొక్క దాచిన security bug</div>
Client "ఈ hash ఇప్పటికే ఉందా?" అని అడిగి, ఉంటే upload skip చేస్తే — దాడి చేసేవాడు ఒక file యొక్క hash ని ఊహించి (ఉదా. ఒక సాధారణ document) "నా దగ్గర ఇది ఉంది" అని చెప్పి, <b>upload చేయకుండానే</b> ఆ file ని పొందగలడు. దీన్ని <b>side-channel / confirmation attack</b> అంటారు.<br><br>
<b>పరిష్కారం:</b> Dedupe ని server-side lo చేయడం (client ఎప్పుడూ upload చేస్తుంది, server duplicate అయితే reference మాత్రం పెంచుతుంది), లేదా per-user dedupe కి పరిమితం చేయడం. Dropbox ఈ కారణంగానే client-side global dedupe ని తొలగించింది.
</div>

## 6. Architecture — Metadata మరియు Block ని విడదీయడం

<div class="fig">
<div class="cap">two independent services · ఇది ఎందుకు ముఖ్యం</div>
<svg viewBox="0 0 750 260">
<rect class="n" x="0" y="90" width="90" height="46" rx="4"/>
<text class="t mid" x="45" y="110">Client</text>
<text class="t-sm mid" x="45" y="126">watcher + chunker</text>
<line class="ln" x1="94" y1="102" x2="140" y2="60" marker-end="url(#a)"/>
<line class="ln-acc" x1="94" y1="124" x2="140" y2="170" marker-end="url(#aa)"/>
<rect class="n-dark" x="144" y="34" width="160" height="52" rx="4"/>
<text class="t-w mid" x="224" y="54">Metadata Service</text>
<text class="t-w-sm mid" x="224" y="70">file tree, versions, ACL</text>
<text class="t-w-sm mid" x="224" y="82">chunk hash list</text>
<line class="ln" x1="308" y1="60" x2="346" y2="60" marker-end="url(#a)"/>
<rect class="n-soft" x="350" y="34" width="140" height="52" rx="4"/>
<text class="t mid" x="420" y="56">Metadata DB</text>
<text class="t-sm mid" x="420" y="72">చిన్నది · SQL</text>
<rect class="n-acc" x="144" y="148" width="160" height="52" rx="4"/>
<text class="t-w mid" x="224" y="168">Block Service</text>
<text class="t-w-sm mid" x="224" y="184">chunk upload/download</text>
<text class="t-w-sm mid" x="224" y="196">content-addressed</text>
<line class="ln-acc" x1="308" y1="174" x2="346" y2="174" marker-end="url(#aa)"/>
<rect class="n-soft" x="350" y="148" width="140" height="52" rx="4"/>
<text class="t mid" x="420" y="170">S3</text>
<text class="t-sm mid" x="420" y="186">భారీ · exabytes</text>
<line class="ln" x1="494" y1="60" x2="532" y2="60" marker-end="url(#a)"/>
<rect class="n-info" x="536" y="34" width="214" height="52" rx="4"/>
<text class="t mid" x="643" y="54">Notification Service</text>
<text class="t-sm mid" x="643" y="70">"file మారింది" → ఇతర devices</text>
<line class="ln" x1="643" y1="90" x2="643" y2="118" marker-end="url(#a)"/>
<rect class="n" x="586" y="122" width="114" height="44" rx="4"/>
<text class="t-sm mid" x="643" y="140">Phone</text>
<text class="t-sm mid" x="643" y="156">long poll / WS</text>
<rect class="n-good" x="0" y="212" width="750" height="44" rx="4"/>
<text class="t mid" x="375" y="232">ఎందుకు విడదీయాలి: metadata చిన్నది, transactional, తరచుగా మారుతుంది. Blocks భారీవి, immutable.</text>
<text class="t-sm mid" x="375" y="248">Metadata కి SQL + strong consistency. Blocks కి object storage + CDN. కలిపేస్తే రెండూ చెడతాయి.</text>
</svg>
</div>

## 7. Sync Flow &amp; Conflicts

**Upload:** file మారింది → chunk చేయడం → hashes లెక్కించడం → **"ఈ hashes lo ఏవి server దగ్గర లేవు?"** అని అడగడం → లేనివి మాత్రం upload → metadata update.

**Download:** notification వచ్చింది → కొత్త chunk list తీసుకోవడం → **local lo లేని chunks** మాత్రం download → file ని reassemble.

| Conflict దృశ్యం | పరిష్కారం |
|------------------|-----------|
| ఇద్దరు offline lo ఒకే file ని edit చేశారు | **రెండింటినీ ఉంచడం** — `report.docx` మరియు `report (Alice's conflicted copy).docx`. మౌనంగా ఒకటి పోగొట్టడం క్షమించరాని తప్పు |
| Auto-merge చేయాలా? | **వద్దు** — binary files ని merge చేయలేం. Text కి కూడా Dropbox చేయదు. Merge అనేది application పని (Google Docs దాన్ని చేస్తుంది, file sync చేయకూడదు) |
| Version detection | ప్రతి file కి version vector / revision id. Client తన base revision ని పంపి, server అది తాజాదా అని check చేస్తుంది (optimistic concurrency) |

## 8. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Upload మధ్యలో ఆగింది** | Chunks స్వతంత్రం కాబట్టి సహజంగా resumable — ఇప్పటికే ఉన్న chunks ని మళ్ళీ పంపము |
| **Chunk reference counting** | ఒక chunk ని పలు files వాడుతున్నాయి. Delete చేసినప్పుడు వెంటనే తీసేయకూడదు. Refcount, లేదా mark-and-sweep GC (సురక్షితం, చౌక) |
| **చాలా చిన్న files (లక్షలు)** | ఒక్కో దానికి 4 MB chunk వృథా. చిన్న files ని ఒక "pack file" lo కలిపి store చేయడం (git packfiles లాంటిది) |
| **Metadata DB scale** | `user_id` ప్రకారం shard — ఒక user యొక్క file tree మొత్తం ఒకే shard lo, cross-shard queries లేవు |
| **Notification fan-out** | ఒక user కి 5 devices — చిన్న fan-out. కానీ shared folder lo 1000 మంది ఉంటే? అప్పుడు feed problem లాంటిది — active devices కి మాత్రమే push |
| **Sync loop / storm** | Client ఒక file రాస్తుంది → watcher గుర్తిస్తుంది → sync → server notify → client మళ్ళీ రాస్తుంది → అనంతం. **Client తన సొంత మార్పులని గుర్తించి ignore చేయాలి** (revision id తో) |
| **Bandwidth ఖర్చు** | LAN sync — ఒకే network lo ఉన్న devices ఒకదాని నుంచి ఒకటి chunks తీసుకోవడం, cloud నుంచి కాదు |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Let me start with the question this whole problem turns on. If I trim five seconds off the end of a one-gigabyte video, how much data should we upload? If the answer is a gigabyte, we've failed. It should be a few megabytes."</p>
<p>"Getting there means files are stored as <em>chunks</em>, not as whole objects. But the naive version — cut every four megabytes — breaks immediately. Insert a single byte at the start of a file and every subsequent boundary shifts by one byte, so every chunk hashes differently and you re-upload the entire file."</p>
<p>"The fix is <em>content-defined chunking</em>. I run a rolling hash across the file and cut wherever the hash matches a pattern — say the low thirteen bits are zero. Boundaries are then determined by content rather than position, so inserting a byte changes only the chunk containing it. Everything after it hashes identically. That single idea is what makes rsync, git, Docker layers and every deduplicating backup system work."</p>
<p>"Chunks are then <em>content-addressed</em> — the chunk's ID is the SHA-256 of its bytes. That gives deduplication for free: identical content is stored once. Uploading becomes: chunk the file, compute hashes, ask the server which hashes it's missing, send only those."</p>
<p>"I'd flag a security subtlety with global deduplication, though. If the client can skip an upload by claiming to already possess a hash, an attacker who can guess or obtain a file's hash can effectively download that file without ever having it. That's a confirmation attack, and it's why Dropbox removed client-side global dedupe. I'd either dedupe server-side — always upload, let the server collapse duplicates — or restrict dedupe to within a single user."</p>
<p>"Architecturally I'd split metadata from blocks, because they have opposite characteristics. Metadata — the file tree, versions, permissions, chunk lists — is small, transactional, frequently updated, and wants a relational database with strong consistency. Blocks are enormous, immutable and write-once, and want object storage fronted by a CDN. Serving both from one system makes both worse."</p>
<p>"For conflicts, my answer is deliberately unambitious: when two people edit offline, <em>keep both</em> as a conflicted copy. I would not auto-merge. Binary files can't be merged meaningfully, and silently discarding someone's work is the one unforgivable failure in a sync product. Merging is an application-layer concern — that's what Google Docs is for, and notably that's a completely different design."</p>
<p>"Two failure modes I'd design against specifically. First, chunk garbage collection: a chunk may be referenced by many files, so deletion can't be immediate — I'd use mark-and-sweep rather than refcounts, since refcounts get corrupted by partial failures. Second, sync loops: the client writes a file, its own watcher sees the change, syncs it, gets notified, and writes again. Clients must recognise and ignore their own changes by revision ID, or the system oscillates forever."</p>
</div>

## 9. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Chunk size ఎంత ఉండాలి?" | చిన్నది → ఎక్కువ dedupe కానీ ఎక్కువ metadata. పెద్దది → తక్కువ metadata కానీ తక్కువ dedupe. CDC lo సగటు 4 MB, min 1 MB, max 8 MB (chunk పేలుడు ఆపడానికి bounds అవసరం) |
| "Encryption ఎలా?" | Client-side encryption అయితే dedupe పోతుంది (ఒకే content వేరే keys తో వేరే ciphertext). **Convergent encryption** — key = hash(content) — దీంతో dedupe ఉంటుంది కానీ confirmation attack తిరిగి వస్తుంది. ఇది నిజమైన trade-off |
| "Shared folder permissions?" | Metadata service lo ACL. Folder స్థాయిలో ఇచ్చి, children కి inherit. Permission మారితే ఆ folder ని చూస్తున్న అందరికీ re-sync notification |
| "Selective sync / smart sync?" | Metadata మొత్తం download చేసి, blocks ని on-demand. OS filesystem driver (placeholder files) తో file తెరిచినప్పుడు download |
| "Git కి ఇదే డిజైనా?" | చాలా దగ్గరిది — content-addressed objects, immutable, hash ids. తేడా: git కి పూర్తి history distributed గా ఉంటుంది, ఇక్కడ server అధికారికం. Git delta compression కూడా వాడుతుంది |
| "10 GB file ని ఎలా handle చేస్తారు?" | 2,500 chunks — metadata చాలా పెద్దది. Chunk list ని కూడా chunk చేయడం (Merkle tree of chunks). అప్పుడు file యొక్క root hash ఒక్కటే metadata lo |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">16</div>
<div class="kicker">Problem 16 · Contention Under Load</div>
<div class="title">Design Ticket Booking<br>at Scale (BookMyShow)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>ఎక్కువ (Indian companies lo చాలా)</b> · నేర్పే concepts: inventory holds, overselling, waiting room</div>
</div>

## 1. The Ask

> "Design BookMyShow. Sell seats for a show. Never sell the same seat twice. And survive a blockbuster opening where a million people arrive in the same minute for fifty thousand seats."

<div class="box warn">
<div class="lab">ఈ problem ప్రత్యేకత — extreme contention</div>
ఇంతవరకు మనం చూసిన systems lo load <b>పరుచుకుని</b> ఉంటుంది — వేర్వేరు users, వేర్వేరు data. ఇక్కడ <b>ఒక్క show యొక్క seat map మీద ఒకేసారి 10 లక్షల మంది</b>. అంటే అన్ని requests ఒకే rows ని ముట్టుకుంటున్నాయి. Sharding ఇక్కడ సహాయం చేయదు — ఎందుకంటే అందరికీ కావలసినది ఒకే data. ఇదే "hot partition" యొక్క తీవ్రమైన రూపం.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| Seat selection ఉందా, లేక general admission? | Numbered seats అంటే ప్రతి seat ఒక resource — contention తీవ్రం | Numbered seats |
| Payment పూర్తయ్యేదాకా seat ని పట్టుకోవాలా? | Hold mechanism అవసరమా | అవును, 10 నిమిషాలు |
| **Overselling అంగీకారమా?** | Airlines overbook చేస్తాయి. Cinema చేయదు | ❌ ఎప్పటికీ కాదు |
| Peak load ఎంత? | Hot event architecture ని ఇది నిర్ణయిస్తుంది | 1 M concurrent |
| Group booking (5 seats కలిసి)? | Atomic multi-seat reservation | అవును |
| Cancellation? | Inventory తిరిగి రావాలి | అవును |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| సాధారణ రోజు bookings | 1 M / day ≈ **12 / sec** — చాలా చిన్నది |
| **Blockbuster opening** | 60 సెకన్లలో 1 M మంది → **~17,000 booking attempts / sec** |
| ఒక show lo seats | 50,000 (పెద్ద stadium) లేదా 300 (cinema) |
| Seat map read QPS (hot event) | ప్రతి user ప్రతి 2 సెకన్లకి refresh → **500,000 reads / sec** |
| Read : Write | 30 : 1 — reads వల్లే system కూలుతుంది |

<div class="box good">
<div class="lab">ఇక్కడ మొదటి insight</div>
"సాధారణ load 12 QPS. Peak load 17,000 QPS. అంటే <b>1,400 రెట్లు తేడా</b>. ఈ system ని సగటుకి design చేస్తే opening night కూలుతుంది; peak కి design చేస్తే 364 రోజులు డబ్బు వృథా. అందుకే నా design lo <b>hot event ని ఒక ప్రత్యేక mode</b> గా చూస్తాను — waiting room, aggressive caching, pre-scaling. సాధారణ path ని సులభంగా ఉంచుతాను."
</div>

## 4. Deep Dive — Seat State Machine &amp; Holds

<div class="fig">
<div class="cap">seat lifecycle · hold అనేది ఒక TTL ఉన్న state</div>
<svg viewBox="0 0 750 215">
<rect class="n-good" x="0" y="70" width="130" height="50" rx="4"/>
<text class="t mid" x="65" y="92">AVAILABLE</text>
<text class="t-sm mid" x="65" y="108">ఎవరైనా తీసుకోవచ్చు</text>
<line class="ln-acc" x1="134" y1="95" x2="176" y2="95" marker-end="url(#aa)"/>
<text class="t-sm mid" x="155" y="86">select</text>
<rect class="n-acc" x="180" y="70" width="150" height="50" rx="4"/>
<text class="t-w mid" x="255" y="92">HELD</text>
<text class="t-w-sm mid" x="255" y="108">user + expires_at (10 min)</text>
<line class="ln" x1="334" y1="88" x2="376" y2="60" marker-end="url(#a)"/>
<text class="t-sm" x="336" y="56">pay ✓</text>
<rect class="n-dark" x="380" y="34" width="140" height="50" rx="4"/>
<text class="t-w mid" x="450" y="56">BOOKED</text>
<text class="t-w-sm mid" x="450" y="72">శాశ్వతం</text>
<line class="ln" x1="334" y1="104" x2="376" y2="134" marker-end="url(#a)"/>
<text class="t-sm" x="336" y="132">timeout / cancel</text>
<rect class="n-info" x="380" y="120" width="140" height="50" rx="4"/>
<text class="t mid" x="450" y="142">RELEASED</text>
<text class="t-sm mid" x="450" y="158">→ AVAILABLE</text>
<path class="ln" d="M450 172 L450 192 L65 192 L65 124" marker-end="url(#a)"/>
<line class="ln" x1="524" y1="59" x2="560" y2="59" marker-end="url(#a)"/>
<rect class="n-bad" x="564" y="34" width="186" height="50" rx="4"/>
<text class="t mid" x="657" y="56">CANCELLED (refund)</text>
<text class="t-sm mid" x="657" y="72">→ inventory కి తిరిగి</text>
<rect class="n-soft" x="560" y="120" width="190" height="66" rx="4"/>
<text class="t" x="574" y="142">Hold ఎందుకు అవసరం</text>
<text class="t-sm" x="574" y="162">Payment 2 నిమిషాలు పడుతుంది.</text>
<text class="t-sm" x="574" y="178">ఆ మధ్యలో seat ని వేరేవాళ్ళు తీసుకోకూడదు.</text>
</svg>
</div>

### Overselling ని ఆపే code

```sql
-- ❌ తప్పు: check-then-act. రెండు requests మధ్యలో దూరిపోతాయి.
SELECT status FROM seats WHERE seat_id = 'A12';       -- 'AVAILABLE'
UPDATE seats SET status = 'HELD' WHERE seat_id = 'A12';

-- ✓ సరైనది: ఒకే atomic conditional update.
UPDATE seats
   SET status = 'HELD', held_by = :userId, expires_at = NOW() + INTERVAL '10 minutes'
 WHERE seat_id = 'A12'
   AND (status = 'AVAILABLE'
        OR (status = 'HELD' AND expires_at < NOW()));   -- గడువు ముగిసిన hold ని తీసుకోవచ్చు
-- rows affected = 1 → మనం గెలిచాం.  0 → వేరేవాళ్ళు ముందు తీసుకున్నారు.
```

<div class="box good">
<div class="lab">ఈ ఒక్క query lo మూడు విషయాలు</div>
<b>1.</b> Check మరియు act ఒకే statement lo — DB row lock దానంతట అదే race ని ఆపుతుంది.<br>
<b>2.</b> <code>expires_at &lt; NOW()</code> — గడువు ముగిసిన holds ని <b>read time lo</b> తీసుకోవడం. అంటే cleanup job ఆలస్యమైనా seats ఇరుక్కోవు (lazy expiry).<br>
<b>3.</b> Group booking కి — 5 seats ని ఒకే transaction lo update చేసి, affected rows 5 కాకపోతే rollback. All-or-nothing.
</div>

## 5. Deep Dive — Hot Event (Virtual Waiting Room)

17,000 booking attempts/sec ని database కి పంపితే, ఎంత scale చేసినా ఒకే seat rows మీద lock contention వల్ల throughput కూలుతుంది. **పరిష్కారం: traffic ని database కి చేరనివ్వకపోవడం.**

<div class="fig">
<div class="cap">virtual waiting room · load ని సమయంలో పరచడం</div>
<svg viewBox="0 0 750 265">
<rect class="n" x="0" y="80" width="110" height="50" rx="4"/>
<text class="t mid" x="55" y="100">1 M users</text>
<text class="t-sm mid" x="55" y="116">ఒకేసారి</text>
<line class="ln-acc" x1="114" y1="105" x2="152" y2="105" marker-end="url(#aa)"/>
<rect class="n-acc" x="156" y="72" width="160" height="66" rx="4"/>
<text class="t-w mid" x="236" y="94">Waiting Room</text>
<text class="t-w-sm mid" x="236" y="112">Redis queue · token issue</text>
<text class="t-w-sm mid" x="236" y="128">"మీ స్థానం: 45,231"</text>
<line class="ln-acc" x1="320" y1="105" x2="358" y2="105" marker-end="url(#aa)"/>
<rect class="n-good" x="362" y="72" width="170" height="66" rx="4"/>
<text class="t mid" x="447" y="94">Admission control</text>
<text class="t-sm mid" x="447" y="112">సెకనుకి 500 మందిని మాత్రమే</text>
<text class="t-sm mid" x="447" y="128">లోపలికి పంపడం</text>
<line class="ln" x1="536" y1="105" x2="574" y2="105" marker-end="url(#a)"/>
<rect class="n-dark" x="578" y="72" width="172" height="66" rx="4"/>
<text class="t-w mid" x="664" y="94">Booking Service</text>
<text class="t-w-sm mid" x="664" y="112">స్థిరమైన, ఊహించదగిన load</text>
<text class="t-w-sm mid" x="664" y="128">DB సంతోషంగా ఉంది</text>
<rect class="n-info" x="0" y="160" width="366" height="92" rx="4"/>
<text class="t" x="14" y="182">ఎందుకు ఇది పని చేస్తుంది</text>
<text class="t-sm" x="14" y="202">50,000 seats ఉన్నాయి. 10 లక్షల మందిని లోపలికి</text>
<text class="t-sm" x="14" y="218">పంపడం అర్థరహితం — 95% మంది ఎలాగూ ఖాళీ చేతులతో</text>
<text class="t-sm" x="14" y="234">వెళ్తారు. వాళ్ళని ముందే ఆపి database ని కాపాడటం.</text>
<text class="t-acc" x="14" y="248">Load ని తగ్గించడం కాదు — సమయంలో పరచడం.</text>
<rect class="n-good" x="384" y="160" width="366" height="92" rx="4"/>
<text class="t" x="398" y="182">User అనుభవం కూడా మెరుగు</text>
<text class="t-sm" x="398" y="202">"Server error, మళ్ళీ ప్రయత్నించండి" కంటే</text>
<text class="t-sm" x="398" y="218">"మీ స్థానం 45,231 · సుమారు 6 నిమిషాలు" చాలా మేలు.</text>
<text class="t-sm" x="398" y="234">Refresh కొట్టే ఉద్ధృతి కూడా ఆగుతుంది —</text>
<text class="t-sm" x="398" y="248">అది లేకపోతే users తామే load ని రెట్టింపు చేస్తారు.</text>
</svg>
</div>

| Hot event lo మిగతా రక్షణలు | ఎలా |
|----------------------------|-----|
| **Seat map ని cache చేయడం** | 500K reads/sec ని DB కి పంపొద్దు. Redis lo seat map, 1-2 సెకన్ల TTL. కొంచెం stale — user ఒక seat select చేసినప్పుడు అది పోయి ఉండొచ్చు, అది ఫర్వాలేదు |
| **Read/write ని విడదీయడం** | Availability chart ఒక cached read. అసలు reservation ఒక్కటే DB write |
| **Pre-scaling** | Show ఎప్పుడు open అవుతుందో మనకి తెలుసు. ముందే servers, DB connections, cache ని warm చేయడం |
| **Bot protection** | Hot events lo 50%+ traffic bots (scalpers). CAPTCHA at waiting room entry, device fingerprint, per-account limits |
| **Queue lo fairness** | FIFO ప్రధానం, కానీ ముందుగానే login అయినవాళ్ళకి ప్రాధాన్యం ఇవ్వొచ్చు — refresh చేసేవాళ్ళు గెలవకుండా |

## 6. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Payment fail అయ్యాక seat** | Hold expire అయ్యే వరకు ఆగకుండా వెంటనే release. కానీ **payment status తెలియకపోతే** (timeout) — release చేయకూడదు, hold ని పొడిగించి PSP ని అడగాలి (Problem 09 logic) |
| **Hold expiry job down** | Lazy expiry (పైన query lo `expires_at < NOW()`) వల్ల system పని చేస్తూనే ఉంటుంది. Cleanup job కేవలం optimisation |
| **DB single point** | Seat inventory ని shard చేయడం — `show_id` ప్రకారం. ఒక show ఒకే shard lo (అది సహజం — ఒక show యొక్క seats ఎప్పుడూ కలిసి ఉంటాయి) |
| **ఒకే show hot shard** | ఇదే ఈ problem యొక్క పరిమితి. Waiting room తప్ప వేరే మార్గం లేదు. Seat block ప్రకారం sub-shard చేయొచ్చు (Block A, B, C వేరే rows) |
| **Double booking bug** | Unique constraint మీద ఆధారపడటం — `UNIQUE(show_id, seat_number, status='BOOKED')` (partial index). Application bug ఉన్నా DB ఆపుతుంది. **చివరి రక్షణ ఎప్పుడూ DB constraint** |
| **Cache stale వల్ల నిరాశ** | User "ఖాళీ" అని చూసిన seat తీసుకోబోతే fail. UI lo దీన్ని సున్నితంగా చూపడం + వెంటనే fresh seat map. దీన్ని పూర్తిగా ఆపలేం — honest గా చెప్పండి |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"Two questions matter most here: are seats individually numbered, and is overselling ever acceptable? Numbered seats mean each one is a contended resource. And unlike airlines, a cinema can't overbook — so 'never sell the same seat twice' is a hard constraint, not a target."</p>
<p>"The defining characteristic of this system is the load profile. A normal day is about twelve bookings a second. A blockbuster on-sale is seventeen thousand a second — a factor of over a thousand. And unlike every previous problem, that load isn't spread across data. A million people all want the <em>same fifty thousand rows</em>. Sharding doesn't help when everyone wants the same partition."</p>
<p>"The core mechanism is a seat state machine with holds. A seat is available, held, or booked. Selecting a seat puts it in <em>held</em> with an expiry, because payment takes a couple of minutes and nobody else may take it meanwhile."</p>
<p>"The critical detail is how the hold is taken. The obvious version — check availability, then update — has a race between the two statements. Instead it must be a <em>single conditional update</em>: set the seat to held where it is currently available, or where an existing hold has already expired. If rows-affected is one we won, if it's zero somebody beat us. The database's row lock does the concurrency control for us, with no distributed lock service."</p>
<p>"Including the expired-hold case in the same predicate matters: it means holds expire <em>lazily at read time</em>. If my cleanup job is delayed or down, seats still become bookable again rather than being stranded."</p>
<p>"For group bookings, all seats update in one transaction and I check that rows-affected equals the number requested, otherwise roll back. All or nothing."</p>
<p>"Now the hard part — the on-sale spike. No amount of horizontal scaling fixes contention on the same rows; past a point throughput actually drops as lock waiting grows. So the answer isn't to scale the database, it's to <em>not send the traffic there</em>. I'd put a virtual waiting room in front: everyone gets a queue token, and admission control lets a few hundred people per second into the actual booking flow."</p>
<p>"The reasoning is simple: there are fifty thousand seats and a million people. Letting all of them into the booking path is pointless — most will leave empty-handed regardless. The waiting room doesn't reduce the load, it <em>spreads it over time</em>. And it's a better user experience: 'you are number 45,231, about six minutes' beats a 500 error, and it stops the refresh storm where users double the load themselves."</p>
<p>"Alongside that I'd cache the seat map in Redis with a one-second TTL, since reads outnumber writes thirty to one and a slightly stale map is acceptable — occasionally a user picks a seat that's just gone, and the UI handles that gracefully."</p>
<p>"Finally, whatever the application logic does, I'd back it with a database uniqueness constraint on booked seats. Application bugs happen; that constraint is the last line that makes double-booking impossible rather than unlikely."</p>
</div>

## 7. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Redis lo hold పెట్టొచ్చా, DB కాకుండా?" | వేగం ఎక్కువ (`SET NX EX`), కానీ Redis persistence బలహీనం — restart అయితే holds పోతాయి. Holds ఫర్వాలేదు (అవి ఎలాగూ ephemeral) కానీ **BOOKED state మాత్రం ఎప్పుడూ durable DB lo**. Hybrid: hold Redis lo, booking DB lo |
| "General admission (seat numbers లేకపోతే)?" | ఇది చాలా సులభం — ఒక counter. `DECR available` atomic. అప్పుడు contention ఒక్క key మీద, దాన్ని sharded counters తో పరచొచ్చు (`available:shard_0..9`) |
| "Fairness ఎలా — bots గెలవకుండా?" | Waiting room lo entry timestamp ప్రకారం FIFO, CAPTCHA, per-account seat limit, device fingerprinting, payment method verification. పూర్తిగా ఆపలేం కానీ ఖరీదు పెంచొచ్చు |
| "Seat map ఎలా cache చేస్తారు?" | Bitmap — ఒక్కో seat కి 1 bit. 50,000 seats = 6 KB. దీన్ని Redis lo ఉంచి 1 సెకను TTL. Bitmap కాబట్టి transfer చాలా చౌక |
| "Analytics — ఏ seats ముందు అమ్ముడయ్యాయి?" | Booking events ని Kafka కి. అది వేరే pipeline, booking path ని నెమ్మది చేయకూడదు |
| "Multi-city, multi-screen?" | `show_id` ఒక సహజ shard key. వేర్వేరు shows పూర్తిగా స్వతంత్రం — ఇది ఈ domain యొక్క పెద్ద అదృష్టం |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">17</div>
<div class="kicker">Problem 17 · Stream Processing</div>
<div class="title">Design Ad Click<br>Aggregation</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>ఎక్కువ (data-heavy companies lo)</b> · నేర్పే concepts: windowing, watermarks, exactly-once, lambda architecture</div>
</div>

## 1. The Ask

> "Design a system that counts ad clicks. Advertisers see near-real-time dashboards, and we bill them from the same data — so the numbers must be right."

<div class="box warn">
<div class="lab">ఈ problem lo రెండు విరుద్ధమైన అవసరాలు</div>
<b>Dashboard కి కావలసినది వేగం</b> — advertiser తన campaign ఎలా నడుస్తోందో ఇప్పుడే చూడాలి, ఒక నిమిషం పాతది అయినా ఫర్వాలేదు.<br>
<b>Billing కి కావలసినది ఖచ్చితత్వం</b> — ఒక్క click తప్పుగా లెక్కిస్తే అది డబ్బు తప్పు.<br><br>
ఒకే pipeline తో రెండింటినీ ఇవ్వలేం. ఈ ఉద్రిక్తతని మీరు గుర్తించి, <b>రెండు పొరలతో</b> పరిష్కరించడమే ఈ interview యొక్క గుండె.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| Dashboard latency ఎంత? | 1 సెకనా, 1 నిమిషమా — పూర్తిగా వేరే designs | ~1 నిమిషం సరిపోతుంది |
| **Billing కి approximate సరిపోతుందా?** | ఇదే కీలక ప్రశ్న | ❌ లేదు, ఖచ్చితం కావాలి |
| Aggregation granularity? | నిమిషం, గంట, రోజు × ad_id, country, device | నిమిషానికి, పలు dimensions |
| Late events ఎంత ఆలస్యం కావొచ్చు? | Mobile offline lo ఉండి గంటల తర్వాత పంపొచ్చు | 1 గంట దాకా |
| Duplicate clicks? | Retry, bot, double-tap | Dedupe కావాలి |
| Query patterns? | Ad-hoc slicing కావాలా | అవును — OLAP |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| Ad impressions / day | 100 B |
| Click-through rate | ~1% |
| Clicks / day | 1 B |
| **Avg click QPS** | 1B ÷ 86,400 ≈ **12,000 / sec** |
| Peak | ≈ 50,000 / sec |
| Event size | ≈ 200 B (ad_id, user, ts, country, device, cost) |
| Raw events / day | 1B × 200 B = **200 GB / day** |
| Aggregated (నిమిషానికి × 1M ad_ids) | 1M × 1440 × 50 B ≈ 72 GB/day — raw కంటే చిన్నది |

## 4. Deep Dive — Windowing &amp; Watermarks

<div class="fig">
<div class="cap">event time vs processing time · late events అనే సమస్య</div>
<svg viewBox="0 0 750 250">
<text class="t-xs" x="0" y="14">WINDOW 10:00 – 10:01 · నిమిషానికి aggregate</text>
<line class="ln" x1="0" y1="60" x2="700" y2="60"/>
<line class="ln-thin" x1="100" y1="40" x2="100" y2="80"/>
<line class="ln-thin" x1="400" y1="40" x2="400" y2="80"/>
<text class="t-sm mid" x="250" y="34">window 10:00</text>
<text class="t-sm" x="410" y="34">window 10:01</text>
<circle cx="150" cy="60" r="6" fill="#2f7d5d"/>
<circle cx="220" cy="60" r="6" fill="#2f7d5d"/>
<circle cx="310" cy="60" r="6" fill="#2f7d5d"/>
<text class="t-sm mid" x="230" y="86">సమయానికి వచ్చిన clicks</text>
<circle cx="520" cy="60" r="6" fill="#e2653a"/>
<path class="ln-acc" d="M520 68 Q 420 110 300 78" marker-end="url(#aa)"/>
<text class="t-acc" x="430" y="108">10:00:45 కి జరిగిన click,</text>
<text class="t-acc" x="430" y="124">10:01:30 కి వచ్చింది (mobile offline)</text>
<text class="t-sm" x="430" y="142">→ ఇది 10:00 window కి చెందాలి,</text>
<text class="t-sm" x="430" y="158">వచ్చిన సమయం ప్రకారం కాదు</text>
<rect class="n-info" x="0" y="106" width="400" height="60" rx="4"/>
<text class="t" x="14" y="128">Event time ని వాడాలి, processing time కాదు</text>
<text class="t-sm" x="14" y="148">Event lo ఉన్న timestamp ప్రకారం window కి కేటాయించడం.</text>
<text class="t-sm" x="14" y="162">లేకపోతే offline user యొక్క clicks తప్పు నిమిషానికి పడతాయి.</text>
<rect class="n-acc" x="0" y="178" width="366" height="68" rx="4"/>
<text class="t-w" x="14" y="200">Watermark — "ఇక ఈ window కి ఏమీ రాదు"</text>
<text class="t-w-sm" x="14" y="220">10:00 window ని 10:00:59 కి మూసేయలేం. Late events కోసం</text>
<text class="t-w-sm" x="14" y="236">5 నిమిషాలు ఆగి, తర్వాత మూయడం. Watermark = ఆ నిర్ణయం.</text>
<rect class="n-good" x="384" y="178" width="366" height="68" rx="4"/>
<text class="t" x="398" y="200">Watermark తర్వాత వచ్చినవి?</text>
<text class="t-sm" x="398" y="220">Dashboard: వదిలేయడం (1% తేడా ఫర్వాలేదు).</text>
<text class="t-sm" x="398" y="236">Billing: batch job అన్నిటినీ మళ్ళీ లెక్కిస్తుంది — ఏదీ పోదు.</text>
</svg>
</div>

## 5. Deep Dive — Lambda Architecture (రెండు పొరలు)

<div class="fig">
<div class="cap">speed layer + batch layer · ఒకే data, రెండు హామీలు</div>
<svg viewBox="0 0 750 275">
<rect class="n" x="0" y="100" width="90" height="46" rx="4"/>
<text class="t mid" x="45" y="120">Click</text>
<text class="t-sm mid" x="45" y="136">event</text>
<line class="ln" x1="94" y1="123" x2="132" y2="123" marker-end="url(#a)"/>
<rect class="n-acc" x="136" y="100" width="110" height="46" rx="4"/>
<text class="t-w mid" x="191" y="120">Kafka</text>
<text class="t-w-sm mid" x="191" y="136">raw events</text>
<line class="ln-acc" x1="250" y1="112" x2="288" y2="62" marker-end="url(#aa)"/>
<line class="ln" x1="250" y1="134" x2="288" y2="190" marker-end="url(#a)"/>
<text class="t-xs" x="292" y="24">SPEED LAYER · నిమిషాల్లో · approximate</text>
<rect class="n-dark" x="292" y="34" width="170" height="52" rx="4"/>
<text class="t-w mid" x="377" y="54">Flink / Spark Streaming</text>
<text class="t-w-sm mid" x="377" y="70">1-min tumbling windows</text>
<line class="ln" x1="466" y1="60" x2="504" y2="60" marker-end="url(#a)"/>
<rect class="n-info" x="508" y="34" width="150" height="52" rx="4"/>
<text class="t mid" x="583" y="54">Druid / ClickHouse</text>
<text class="t-sm mid" x="583" y="70">dashboard queries</text>
<text class="t-xs" x="292" y="168">BATCH LAYER · గంటకోసారి · exact</text>
<rect class="n-soft" x="292" y="178" width="170" height="52" rx="4"/>
<text class="t mid" x="377" y="198">Spark batch job</text>
<text class="t-sm mid" x="377" y="214">S3 lo ఉన్న raw events నుంచి</text>
<line class="ln" x1="466" y1="204" x2="504" y2="204" marker-end="url(#a)"/>
<rect class="n-good" x="508" y="178" width="150" height="52" rx="4"/>
<text class="t mid" x="583" y="198">Billing tables</text>
<text class="t-sm mid" x="583" y="214">source of truth</text>
<line class="ln" x1="191" y1="150" x2="191" y2="196" marker-end="url(#a)"/>
<rect class="n-soft" x="130" y="200" width="122" height="42" rx="4"/>
<text class="t-sm mid" x="191" y="220">S3 raw archive</text>
<text class="t-sm mid" x="191" y="236">అన్నీ శాశ్వతం</text>
<rect class="n-acc" x="0" y="248" width="750" height="26" rx="4"/>
<text class="t-w mid" x="375" y="266">Batch layer ఎప్పుడూ speed layer ని దిద్దుతుంది — late events, bugs, reprocessing అన్నీ ఇక్కడ సరిపోతాయి</text>
</svg>
<div class="note"><b>ఇది duplication కాదు, ఉద్దేశపూర్వక redundancy.</b> Speed layer తప్పు చేయొచ్చు — వేగం కోసం. Batch layer నెమ్మది కావొచ్చు — ఖచ్చితత్వం కోసం. Batch ఫలితం వచ్చాక అదే అధికారికం. Streaming pipeline lo bug కనిపిస్తే, code fix చేసి raw events ని మళ్ళీ process చేయొచ్చు — <b>raw ని ఎప్పుడూ దాచుకోవడం</b> అందుకే.</div>
</div>

## 6. Deep Dive — Aggregation lo Exactly-Once

Stream job crash అయితే Kafka offset నుంచి మళ్ళీ చదువుతుంది. అప్పుడు కొన్ని events రెండుసార్లు లెక్కించబడతాయి — **count తప్పు అవుతుంది**.

| Approach | ఎలా |
|----------|-----|
| ❌ `UPDATE counts SET n = n + 1` | Increment idempotent కాదు. Retry lo count పెరిగిపోతుంది |
| ✅ **Idempotent upsert by (window, key)** | Aggregate result ని `(ad_id, minute) → count` గా **overwrite** చేయడం. అదే window ని మళ్ళీ process చేసినా అదే విలువ వస్తుంది |
| ✅ Checkpointing (Flink) | Operator state + offsets ని atomic గా checkpoint. Restore చేసినప్పుడు ఖచ్చితంగా అదే స్థానం నుంచి |

<div class="box good">
<div class="lab">ఇది ఎందుకు అందమైన పరిష్కారం</div>
"Increment బదులు <b>overwrite</b> చేయడం — ఈ ఒక్క మార్పుతో exactly-once సమస్య పోతుంది. ఎందుకంటే 'ad-42, 10:03వ నిమిషానికి 1,847 clicks' అనేది ఒక <b>పూర్తి, స్వతంత్ర సత్యం</b>. దాన్ని ఎన్నిసార్లు రాసినా ఫలితం ఒకటే. ఇదే idempotency యొక్క సాధారణ రూపం — <i>delta కాకుండా final state</i> రాయడం. Notification system lo idempotency key, ఇక్కడ (window, key) — ఒకే ఆలోచన."
</div>

## 7. Scale &amp; Failure

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Hot ad (viral campaign)** | ఒక ad_id ఒకే partition కి వెళ్తుంది → hot. **Two-level aggregation**: ముందు local pre-aggregation (ప్రతి worker తన దగ్గర 10 సెకన్ల partial sums), తర్వాత global merge. Network traffic మరియు contention రెండూ తగ్గుతాయి |
| **Duplicate clicks (double tap, retry)** | Client ప్రతి click కి ఒక `click_id` (UUID). Dedupe window (5 నిమిషాలు) lo bloom filter / Redis set తో filter |
| **Click fraud** | వేరే pipeline — IP velocity, device fingerprint, ఒకే user పలుసార్లు, unrealistic CTR. Fraud clicks ని flag చేసి billing నుంచి తీసేయడం |
| **Stream job crash** | Flink checkpoint నుంచి restore. Kafka retention (7 రోజులు) వల్ల ఎంత వెనక్కైనా వెళ్ళొచ్చు |
| **Kafka lag** | Aggregation stateful కాబట్టి simply scale చేయలేం — partitions ని పెంచి rebalance చేయాలి. అందుకే **ముందే ఉదారంగా partitions** |
| **Storage పెరుగుదల** | Raw events 30 రోజులు hot, తర్వాత Glacier. Aggregates: నిమిషానికి 7 రోజులు → గంటకి 90 రోజులు → రోజుకి శాశ్వతం (**rollup tiers**) |
| **Timezone / billing period** | Aggregates ని ఎప్పుడూ UTC lo store చేసి, query time lo advertiser timezone కి మార్చడం |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"The question I'd ask first is whether approximate numbers are acceptable — and I expect the answer to be different for different consumers. A dashboard can tolerate being a percent off. Billing cannot, because that's money. Those two requirements pull in opposite directions, and I don't think one pipeline can serve both honestly."</p>
<p>"About a billion clicks a day is twelve thousand a second, peaking around fifty. That's not extreme throughput. The difficulty is <em>time</em>."</p>
<p>"Specifically: a click that happened at 10:00:45 might not reach us until 10:01:30, because the user's phone was offline. If I bucket by arrival time, that click lands in the wrong minute and every report is subtly wrong. So aggregation must use <em>event time</em> — the timestamp inside the event — not processing time."</p>
<p>"Which raises the next question: when can I close the 10:00 window? Not at 10:01, or I lose every late arrival. I use a <em>watermark</em> — wait some grace period, say five minutes, then declare the window final. Anything later than that is where the two consumers diverge: the dashboard drops it, and the batch layer picks it up."</p>
<p>"So the architecture has two layers over the same Kafka stream. A <em>speed layer</em> — Flink doing one-minute tumbling windows into an OLAP store like Druid — gives dashboards fresh, approximate numbers. A <em>batch layer</em> reprocesses the raw events archived in object storage on an hourly schedule and produces the authoritative billing numbers. The batch result always supersedes the streaming result."</p>
<p>"That's not wasteful duplication, it's deliberate. It also means that if I find a bug in my streaming logic, I can fix the code and reprocess history — which is only possible because I keep the raw events forever rather than only the aggregates."</p>
<p>"On correctness in the stream: if the job crashes and replays from an offset, naive counting double-counts. The fix is to stop thinking in increments. Instead of 'add one', I write 'ad-42, minute 10:03, count 1847' as an <em>idempotent upsert keyed on window and ad</em>. Reprocessing the same window produces the same value, so replay is harmless. It's the same principle as the idempotency key in the payment system — write final state, not deltas."</p>
<p>"The scaling problem specific to this domain is hot keys. A viral campaign sends all its clicks to one partition. I'd solve it with <em>two-level aggregation</em>: each worker pre-aggregates locally over a few seconds, and only those partial sums are shuffled for the global merge. That cuts both network volume and contention on the hot key dramatically."</p>
<p>"And I'd keep click deduplication and fraud detection as separate concerns — a client-generated click ID with a short dedupe window handles accidental duplicates, while systematic fraud needs its own scoring pipeline whose output subtracts from billable clicks."</p>
</div>

## 8. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Kappa architecture ఎందుకు కాదు?" | Kappa = streaming ఒక్కటే, batch layer లేదు (bug వస్తే stream ని replay చేయడం). ఇది సులభం, maintain చేయడానికి ఒకే codebase. కానీ **billing కి ఒక స్వతంత్ర, verifiable batch computation** ఉండటం audit కి విలువైనది. Financial data లేకపోతే నేను Kappa కే వెళ్తాను |
| "Unique users ఎలా లెక్కిస్తారు?" | Exact count అంటే అన్ని user ids store చేయాలి — భారీ. **HyperLogLog** — ~2% error తో 12 KB lo కోట్ల unique values. Dashboard కి ఇది సరిపోతుంది |
| "OLAP store ఎందుకు, Postgres కాదు?" | Query pattern: "గత 7 రోజుల్లో country ప్రకారం clicks" — ఇది columnar scan. Druid/ClickHouse column-oriented + pre-aggregation, ఇలాంటి queries కి 100× వేగం |
| "Tumbling vs sliding vs session windows?" | **Tumbling** — అతివ్యాప్తి లేని fixed buckets (నిమిషానికి count). **Sliding** — అతివ్యాప్తి ఉన్నవి (గత 5 నిమిషాల moving average). **Session** — activity gap ఆధారంగా (user session analysis) |
| "Backfill ఎలా?" | Raw events S3 lo ఉన్నాయి కాబట్టి ఏ కాలాన్నయినా మళ్ళీ process చేయొచ్చు. Aggregate table lo (window, key) upsert కాబట్టి backfill idempotent |
| "Real-time budget enforcement (బడ్జెట్ అయిపోతే ad ఆపడం)?" | ఇది వేరే, కఠినమైన problem — నిమిషం ఆలస్యం అంటే overspend. Ad serving path lo ఒక Redis counter, approximate కానీ వేగం. Batch తర్వాత సరిచేయడం |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">18</div>
<div class="kicker">Problem 18 · Time-Series at Scale</div>
<div class="title">Design Metrics &amp;<br>Monitoring (Prometheus)</div>
<div class="meta">Difficulty <b>Hard</b> · Frequency <b>SSE/SDE3 lo ఎక్కువ</b> · నేర్పే concepts: cardinality, time-series compression, rollups, alerting</div>
</div>

## 1. The Ask

> "Design a monitoring system. A hundred thousand servers report metrics, engineers query dashboards, and alerts fire when something breaks."

<div class="box warn">
<div class="lab">ఈ problem lo అసలు శత్రువు: Cardinality</div>
"సెకనుకి కోటి datapoints" అనేది భయపెడుతుంది, కానీ నిజానికి అది సులభమైన భాగం — time-series data అద్భుతంగా compress అవుతుంది. <b>నిజమైన హంతకుడు cardinality</b> — ఎన్ని <i>విభిన్న</i> time series ఉన్నాయి అన్నది. ఒక engineer ఒక metric కి <code>user_id</code> అనే label జోడిస్తే, ఒక్క రాత్రిలో 1 series 10 million series అవుతుంది, database కూలుతుంది. ఈ ఒక్క విషయాన్ని అర్థం చేసుకున్న candidate చాలా అరుదు.
</div>

## 2. Clarifying Questions

| ప్రశ్న | ఎందుకు ముఖ్యం | జవాబు |
|--------|----------------|--------|
| Metrics మాత్రమేనా, logs/traces కూడానా? | మూడూ పూర్తిగా వేరే systems | Metrics మాత్రమే |
| Scrape interval? | Datapoint rate ని నిర్ణయిస్తుంది | 10 సెకన్లు |
| Retention? | Storage + rollup strategy | Raw 15 రోజులు, rollups 2 ఏళ్ళు |
| **Push నా pull నా?** | Architecture ని మౌలికంగా మారుస్తుంది | Pull (Prometheus model) |
| Query patterns? | ఇటీవలివి ఎక్కువా, పాతవా | 95% queries గత 24 గంటలు |
| Alerting scope lo ఉందా? | ఉంటే evaluation engine కావాలి | అవును |

## 3. Estimation

| లెక్క | విలువ |
|-------|--------|
| Hosts | 100,000 |
| Host కి metrics (labels తో సహా) | 1,000 series |
| **మొత్తం active time series** | **100 M** |
| Scrape interval | 10 సెకన్లు |
| **Datapoints / sec** | 100M ÷ 10 = **10 M / sec** |
| Naive datapoint size | timestamp 8 B + value 8 B = **16 B** |
| Naive storage / day | 10M × 86,400 × 16 B = **13.8 TB / day** ❌ |
| **Compression తర్వాత** (~1.4 B/point) | ≈ **1.2 TB / day** ✅ |

## 4. Deep Dive — Time-Series Compression

<div class="fig">
<div class="cap">Gorilla compression · 16 bytes → ~1.4 bytes per point</div>
<svg viewBox="0 0 750 250">
<text class="t-xs" x="0" y="14">TIMESTAMPS · DELTA-OF-DELTA</text>
<rect class="n" x="0" y="24" width="366" height="88" rx="4"/>
<text class="t-sm mono" x="14" y="46">t: 10:00:00, 10:00:10, 10:00:20, 10:00:30…</text>
<text class="t-sm mono" x="14" y="64">delta:      10,        10,        10</text>
<text class="t-sm mono" x="14" y="82">delta-of-delta:  0,         0</text>
<text class="t-acc" x="14" y="102">Scrape interval స్థిరం → దాదాపు ఎప్పుడూ 0 → 1 bit lo!</text>
<text class="t-xs" x="384" y="14">VALUES · XOR</text>
<rect class="n" x="384" y="24" width="366" height="88" rx="4"/>
<text class="t-sm mono" x="398" y="46">CPU: 42.1, 42.3, 42.2, 42.4…</text>
<text class="t-sm" x="398" y="66">వరుస values దాదాపు ఒకేలా ఉంటాయి →</text>
<text class="t-sm" x="398" y="84">XOR చేస్తే ఎక్కువ bits సున్నా →</text>
<text class="t-acc" x="398" y="102">సున్నా కాని bits ని మాత్రం store చేయడం</text>
<rect class="n-good" x="0" y="126" width="750" height="52" rx="4"/>
<text class="t mid" x="375" y="148">ఇది ఎందుకు పని చేస్తుంది: time-series data నిజ ప్రపంచంలో నెమ్మదిగా మారుతుంది</text>
<text class="t-sm mid" x="375" y="168">CPU 42% నుంచి 89% కి ఒక్క datapoint lo దూకదు. ఈ ఊహ మీద మొత్తం compression నిలబడుతుంది.</text>
<rect class="n-info" x="0" y="190" width="366" height="56" rx="4"/>
<text class="t" x="14" y="212">Columnar layout</text>
<text class="t-sm" x="14" y="232">Timestamps ఒక column, values ఒక column —</text>
<text class="t-sm" x="14" y="244">ఒకే రకమైన data పక్కపక్కన → compression మెరుగు</text>
<rect class="n-acc" x="384" y="190" width="366" height="56" rx="4"/>
<text class="t-w" x="398" y="212">ఫలితం</text>
<text class="t-w-sm" x="398" y="232">13.8 TB/day → 1.2 TB/day. ఇది optimisation కాదు —</text>
<text class="t-w-sm" x="398" y="244">ఇది లేకపోతే ఈ system ఆర్థికంగా సాధ్యం కాదు.</text>
</svg>
</div>

## 5. Deep Dive — Cardinality (అసలు ప్రమాదం)

```
http_requests_total{method="GET", status="200", host="web-01"}     ← ఒక series
```

Series సంఖ్య = **అన్ని label విలువల గుణకారం**.

| Labels | ప్రత్యేక విలువలు | Series |
|--------|-------------------|--------|
| `method` | 5 | 5 |
| `status` | 10 | 50 |
| `host` | 100,000 | **5,000,000** |
| ➕ `user_id` జోడిస్తే | 10,000,000 | **50,000,000,000** 💀 |

<div class="box bad">
<div class="lab">ఇది ఎందుకు system ని చంపుతుంది</div>
ప్రతి unique series కి <b>ఒక ప్రత్యేక file/chunk + index entry + memory lo ఒక active writer</b> ఉంటుంది. Datapoints సంఖ్య పెరగలేదు — కానీ <b>series సంఖ్య</b> పెరిగింది. Memory పేలుతుంది, index పేలుతుంది, queries నెమ్మదిస్తాయి. అందుకే నియమం: <b>label విలువలు తక్కువ, పరిమితమైన సమూహంలో (bounded set) ఉండాలి.</b> `user_id`, `request_id`, `email`, `url with params` — ఇవి ఎప్పుడూ labels కాకూడదు. అవి <b>logs కి చెందినవి, metrics కి కాదు.</b>
</div>

| రక్షణ | ఎలా |
|-------|-----|
| **Per-metric series limit** | ఒక metric 10,000 series దాటితే reject + alert. System ని కాపాడటం |
| **Label validation** | High-cardinality label patterns ని ingestion lo block చేయడం |
| **Cardinality dashboard** | ఏ metrics ఎక్కువ series తింటున్నాయో teams కి చూపడం |
| **సరైన tool** | High-cardinality debugging కి logs/traces వాడాలి, metrics కాదు |

## 6. Architecture &amp; Pull vs Push

<div class="fig">
<div class="cap">monitoring architecture · pull model</div>
<svg viewBox="0 0 750 250">
<rect class="n" x="0" y="20" width="110" height="38" rx="4"/>
<text class="t-sm mid" x="55" y="44">app /metrics</text>
<rect class="n" x="0" y="66" width="110" height="38" rx="4"/>
<text class="t-sm mid" x="55" y="90">app /metrics</text>
<rect class="n" x="0" y="112" width="110" height="38" rx="4"/>
<text class="t-sm mid" x="55" y="136">app /metrics</text>
<line class="ln-acc" x1="150" y1="60" x2="118" y2="40" marker-end="url(#aa)"/>
<line class="ln-acc" x1="150" y1="72" x2="118" y2="86" marker-end="url(#aa)"/>
<line class="ln-acc" x1="150" y1="84" x2="118" y2="132" marker-end="url(#aa)"/>
<text class="t-sm" x="124" y="168">scrape ప్రతి 10s</text>
<rect class="n-dark" x="154" y="46" width="140" height="52" rx="4"/>
<text class="t-w mid" x="224" y="66">Scraper / Ingester</text>
<text class="t-w-sm mid" x="224" y="82">service discovery</text>
<line class="ln" x1="298" y1="72" x2="336" y2="72" marker-end="url(#a)"/>
<rect class="n-acc" x="340" y="46" width="140" height="52" rx="4"/>
<text class="t-w mid" x="410" y="66">TSDB</text>
<text class="t-w-sm mid" x="410" y="82">WAL + compressed blocks</text>
<line class="ln" x1="410" y1="102" x2="410" y2="130" marker-end="url(#a)"/>
<rect class="n-soft" x="316" y="134" width="188" height="46" rx="4"/>
<text class="t mid" x="410" y="154">Storage tiers</text>
<text class="t-sm mid" x="410" y="170">memory → local SSD → S3</text>
<line class="ln" x1="484" y1="72" x2="522" y2="72" marker-end="url(#a)"/>
<rect class="n-info" x="526" y="46" width="140" height="52" rx="4"/>
<text class="t mid" x="596" y="66">Query engine</text>
<text class="t-sm mid" x="596" y="82">PromQL</text>
<line class="ln" x1="596" y1="102" x2="596" y2="130" marker-end="url(#a)"/>
<rect class="n" x="526" y="134" width="140" height="46" rx="4"/>
<text class="t-sm mid" x="596" y="154">Grafana</text>
<text class="t-sm mid" x="596" y="170">dashboards</text>
<line class="ln-acc" x1="480" y1="60" x2="526" y2="30" marker-end="url(#aa)"/>
<rect class="n-bad" x="530" y="6" width="220" height="34" rx="4"/>
<text class="t mid" x="640" y="28">Alerting engine → PagerDuty</text>
<rect class="n-good" x="0" y="192" width="366" height="56" rx="4"/>
<text class="t" x="14" y="214">Pull యొక్క లాభం</text>
<text class="t-sm" x="14" y="234">Target reachable కాకపోతే అదే ఒక signal ("up=0").</text>
<text class="t-sm" x="14" y="246">Rate limiting scraper చేతిలో. Config ఒకేచోట.</text>
<rect class="n-info" x="384" y="192" width="366" height="56" rx="4"/>
<text class="t" x="398" y="214">Push ఎప్పుడు అవసరం</text>
<text class="t-sm" x="398" y="234">Short-lived batch jobs — scrape చేసేలోపు అవి</text>
<text class="t-sm" x="398" y="246">చనిపోతాయి. వాటికి ఒక push gateway.</text>
</svg>
</div>

## 7. Rollups &amp; Retention

Raw data ని 2 ఏళ్ళు ఉంచడం అసాధ్యం (1.2 TB/day × 730 = 876 TB). కానీ ఎవరూ ఏడాది క్రితం 10-సెకన్ల resolution అడగరు.

| Tier | Resolution | Retention | Storage |
|------|------------|-----------|---------|
| Hot | 10 సెకన్లు | 15 రోజులు | ≈ 18 TB (local SSD) |
| Warm | 5 నిమిషాలు | 90 రోజులు | ≈ 3.5 TB |
| Cold | 1 గంట | 2 ఏళ్ళు | ≈ 1.2 TB (S3) |

<div class="box good">
<div class="lab">Rollup lo ఒక సూక్ష్మత</div>
"5-నిమిషాల rollup lo నేను <b>ఒకే average</b> store చేయను — <code>min, max, sum, count</code> నాలుగూ store చేస్తాను. ఎందుకంటే averages ని తిరిగి aggregate చేయలేం (average of averages తప్పు), కానీ sum మరియు count ని చేయొచ్చు. పైగా <b>spike ని కోల్పోకూడదు</b> — 5 నిమిషాల్లో ఒక సెకను CPU 100% కి వెళ్తే, average lo అది కనిపించదు, max lo కనిపిస్తుంది. Incident debugging lo max యే ముఖ్యం."
</div>

## 8. Alerting

| సమస్య | పరిష్కారం |
|--------|-----------|
| **Flapping** (metric limit చుట్టూ ఊగడం) | `for: 5m` — condition 5 నిమిషాలు నిజంగా ఉంటేనే alert. ఒక్క spike కి page చేయకూడదు |
| **Alert storm** | ఒక DB down అయితే 500 services alert చేస్తాయి. **Grouping + inhibition** — root cause alert ఉంటే దాని పైన ఆధారపడిన alerts ని అణచడం |
| **Alert fatigue** | Actionable alerts మాత్రమే page చేయాలి. మిగతావి dashboard/ticket. Page అయిన ప్రతిసారీ మనిషి ఏదో చేయగలగాలి — లేకపోతే అది noise |
| **Alerting engine SPOF** | Alerting ని monitoring కంటే వేరే, సరళమైన, ఎక్కువ HA ఉన్న path lo. **Monitoring down అయితే కూడా అది తెలియాలి** — dead man's switch (ఎప్పుడూ fire అయ్యే alert; అది రాకపోతే system down) |
| **Query load వల్ల ingestion దెబ్బతినడం** | Read path మరియు write path ని వేరు చేయడం — వేరే replicas. Dashboard query storm ingestion ని ఆపకూడదు |

<div class="script">
<div class="lab">🎤 Interview Script · ఇలా చెప్పండి (English)</div>
<p>"First: metrics only, or logs and traces too? They're three different systems with different data models, and I'd design metrics here. I'd also settle push versus pull early, since it changes the architecture."</p>
<p>"A hundred thousand hosts with a thousand series each scraped every ten seconds is a hundred million active series and ten million datapoints a second. Naively that's sixteen bytes a point and fourteen terabytes a day, which nobody would pay for."</p>
<p>"That's solved by compression, and it's worth explaining why it works so well. Timestamps are almost perfectly regular, so I store the <em>delta of the delta</em> — with a fixed scrape interval that's nearly always zero, which fits in a single bit. Values change slowly in the real world; CPU doesn't jump from forty-two to eighty-nine percent between adjacent samples. So I XOR consecutive values and store only the non-zero bits. Together that's the Gorilla scheme, and it takes sixteen bytes down to under one and a half. That isn't an optimisation, it's what makes the system economically possible at all."</p>
<p>"But I'd argue the datapoint rate is the <em>easy</em> half. The thing that actually kills monitoring systems is <em>cardinality</em> — the number of distinct series, which is the product of all label value counts. Method times status times host is already five million series. The moment somebody adds a user ID label, it becomes fifty billion."</p>
<p>"That's fatal because every unique series needs its own chunk, index entry and in-memory writer. The datapoint volume hasn't changed at all — the series count has. So I'd enforce hard limits: reject metrics past a series budget, block known high-cardinality label patterns at ingestion, and give teams a cardinality dashboard so they can see who's spending the budget. The underlying rule is that labels must have bounded value sets. User IDs and request IDs belong in logs and traces, not metrics."</p>
<p>"I'd use a <em>pull</em> model. Targets expose an endpoint and the scraper collects on a schedule. Pull is nicer operationally: failing to scrape is itself a signal that the target is down, rate limiting sits with the scraper rather than with thousands of clients, and configuration lives in one place. The exception is short-lived batch jobs that finish before anyone can scrape them, which need a push gateway."</p>
<p>"For retention I'd use rollup tiers — full resolution for two weeks on local SSD, five-minute rollups for ninety days, hourly for two years in object storage. One detail I'd insist on: a rollup stores min, max, sum and count, not just an average. Averages can't be re-aggregated correctly, and more importantly a one-second spike to a hundred percent disappears in a five-minute average but survives in the max — and during an incident the max is the number you actually need."</p>
<p>"On alerting, the failure modes are human. Alerts need a duration condition so a momentary blip doesn't page anyone, and they need grouping and inhibition, or one database outage pages five hundred times. And the alerting path should be simpler and more available than the monitoring system itself — including a dead man's switch, an alert that always fires, so that <em>silence</em> tells you monitoring is down rather than that everything is fine."</p>
</div>

## 9. Follow-ups

| అడిగేది | జవాబు |
|---------|--------|
| "Logs కి ఇదే design పని చేస్తుందా?" | లేదు. Logs high-cardinality, unstructured, పెద్దవి. అక్కడ inverted index (Elasticsearch) లేదా columnar + brute force scan (Loki). Metrics compression ఇక్కడ పని చేయదు |
| "Traces ఎలా వేరు?" | Trace = ఒక request యొక్క spans tree. Cardinality అపారం (ప్రతి request ప్రత్యేకం) కాబట్టి **sampling** తప్పనిసరి (ఉదా. 1%, కానీ errors ని 100%) |
| "Prometheus HA ఎలా?" | రెండు identical Prometheus instances ఒకే targets ని scrape చేయడం (data duplicate కానీ independent). Long-term + global view కి Thanos/Cortex |
| "Histogram ఎలా store చేస్తారు?" | Buckets గా — `le="0.1"`, `le="0.5"`… ప్రతి bucket ఒక series. అందుకే histograms cardinality ని వేగంగా పెంచుతాయి. p99 ని buckets నుంచి interpolate చేస్తారు — అది approximate అని గుర్తుంచుకోవాలి |
| "Downsampling ఎప్పుడు చేయాలి?" | Background compaction lo, ingestion path lo కాదు. Ingestion ని ఎప్పుడూ నెమ్మదిస్తే మొత్తం system దెబ్బతింటుంది |
| "Query timeout / expensive query?" | Series limit + time range limit + query timeout. `sum by (user_id)` లాంటి query 50 million series ని touch చేయొచ్చు — దాన్ని ముందే reject చేయాలి |

<div class="pagebreak"></div>

<div class="opener">
<div class="ghost">✓</div>
<div class="kicker">ముగింపు</div>
<div class="title">18 problems తర్వాత —<br>మీరు ఏం నేర్చుకున్నారు</div>
<div class="meta">ఇది revision page · interview ముందు రోజు ఇది ఒక్కటే చదివితే చాలు</div>
</div>

## తిరిగి తిరిగి వచ్చిన 8 ఆలోచనలు

| ఆలోచన | ఏఏ problems lo వచ్చింది | సారాంశం |
|--------|--------------------------|----------|
| **పనిని ఎప్పుడు చేయాలి — write time నా read time నా** | 03 feed · 08 typeahead · 17 analytics | Read-heavy అయితే write time lo పని చేయి. అదే మొత్తం system design lo అతి ముఖ్యమైన ప్రశ్న |
| **At-least-once + idempotency** | 05 · 09 · 10 · 13 · 17 | Exactly-once delivery సాధ్యం కాదు. Delta కాకుండా final state రాయడం, లేదా idempotency key |
| **Lease, lock కాదు** | 07 uber · 10 scheduler · 16 booking | TTL ఉన్న claim. Worker చస్తే తనంతట తానే విడుదల |
| **Conditional update (compare-and-set)** | 07 · 10 · 16 | `UPDATE … WHERE status = expected`. Distributed lock service అవసరం లేని concurrency control |
| **Hot key / hot partition** | 01 · 03 · 07 · 13 · 16 · 17 | ఏ system lo అయినా load ఎప్పుడూ సమానంగా ఉండదు. Sub-sharding, two-level aggregation, waiting room |
| **Approximate ఎప్పుడు సరిపోతుంది** | 02 rate limit · 11 bloom filter · 18 histogram | ఏ తప్పు భరించగలమో తెలిస్తే చాలా చౌక పరిష్కారాలు తెరుచుకుంటాయి. Payment lo మాత్రం ఎప్పటికీ కాదు |
| **Fail-open vs fail-closed** | 02 · 05 · 09 | Rate limiter down → allow. Preference service down → block. ఏది ప్రమాదకరమో అది నిర్ణయిస్తుంది |
| **Requirement ని కాస్త వదులు చేయడం** | 04 presence · 10 jitter · 12 CRDT | "ప్రతి గంట" ≠ ":00:00". "Online status" ≠ real-time. ఈ చిన్న సడలింపులు భారీ engineering ని ఆదా చేస్తాయి |

<div class="box warn">
<div class="lab">Interview ముందు 60 సెకన్ల checklist</div>
<b>1.</b> Clarifying questions అడిగానా? Assumptions బోర్డ్ మీద రాశానా?<br>
<b>2.</b> Numbers ఇచ్చానా? (QPS, storage, bandwidth)<br>
<b>3.</b> Read:write ratio చెప్పానా? అది design ని ఎలా మార్చిందో చెప్పానా?<br>
<b>4.</b> ప్రతి component కి <i>ఎందుకు</i> అన్నది చెప్పానా? రెండు options compare చేశానా?<br>
<b>5.</b> Deep dive కి చేరానా? (ఇక్కడే seniority తేలుతుంది)<br>
<b>6.</b> Failure గురించి మాట్లాడానా? ఏది down అయితే ఏమవుతుంది?<br>
<b>7.</b> Bottleneck ఎక్కడో పేరు పెట్టానా?<br>
<b>8.</b> చివర్లో ఒక వాక్యంలో summary ఇచ్చానా?
</div>

> **చివరి మాట:** ఈ 18 problems lo ఏదీ interview lo అచ్చంగా అలానే రాదు. కానీ ఇక్కడ ఉన్న **techniques** ప్రతి problem lo వస్తాయి. మీరు గుర్తుంచుకోవాల్సింది URL shortener యొక్క architecture కాదు — **read-heavy system ని ఎలా గుర్తించాలి, గుర్తించాక ఏం చేయాలి** అనేది. అదే తేడా.
