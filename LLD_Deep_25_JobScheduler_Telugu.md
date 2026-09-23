<!-- style: editorial -->
<!-- footer: Job Scheduler · అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">25</div>
<div class="kicker">Deep Dive 25 · అందరూ ఒకే క్షణంలో</div>
<div class="rule"></div>
<div class="cover-title">Design a<br>Job<br>Scheduler</div>
<div class="lede">Cron · Airflow · Sidekiq · Quartz · Temporal — "ఒక heap lo సమయాలు పెట్టి, సమయం వచ్చినది తీద్దాం" అని అందరూ మొదలుపెడతారు.</div>
<div class="sub">మూడు విరుపులు. మొదటిది — <b>ఘాతీయ backoff సరిగ్గా అదే వృథా</b> చేస్తుంది, కేవలం 22 రెట్లు ఎక్కువ సమయం తీసుకుని. రెండోది — <b>16.4% jobs ఒకేసారి రెండుసార్లు</b> నడుస్తాయి, మరియు heartbeat పెట్టినా <b>2.65% jobs పాత ఫలితాన్ని</b> పట్టుకుంటాయి. మూడోది — 6 గంటల downtime తర్వాత <b>సరైన ఒక్క విధానం అంటూ ఉండదు</b>.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Deep Dive 25</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి శాతం నిజంగా `node` lo run చేసినదే.**

<div class="box warn">
<div class="lab">Deep Dive 24 (Connection Pool) చదివారా? — token మళ్ళీ వస్తోంది, కానీ వేరే కారణంతో</div>
DD 24 §8 lo ఒక <b>token</b> చూశాం: ప్రతి checkout కి ఒక ప్రత్యేక గుర్తు, తద్వారా పాత timer సజీవ connection ని లాగకూడదు. ఇక్కడ §8 lo <b>అదే ఆకారం</b> మళ్ళీ వస్తుంది — కానీ అది ఒక పునరావృతం కాదు, అది ఒక <i>వేరే సమస్యకి అదే సాధనం</i>.<br><br>
తేడా ఇది:<br><br>
<b>Pool lo మనం ఒక <i>వస్తువుని</i> కాపాడుతున్నాం. ఇక్కడ మనం ఒక <i>ఫలితాన్ని</i> కాపాడుతున్నాం.</b><br><br>
Pool lo పాత timer ఒక connection ని లాగితే, ఆ తప్పు <b>వెంటనే</b> కనిపిస్తుంది (queries కలిసిపోతాయి). ఇక్కడ ఆగిపోయిన ఒక worker మేల్కొని తన <b>పాత ఫలితాన్ని</b> రాస్తే, అది <b>సరైన ఫలితాన్ని తుడిచేస్తుంది</b> — మరియు ఎవరికీ ఏమీ తెలియదు. §8 lo అది <b>2.65%</b> jobs కి జరిగింది.<br><br>
మరియు ఇంకొక తేడా: pool lo లీక్ అయిన connection ని <i>మనం</i> వెనక్కి లాగగలం. ఇక్కడ ఆగిపోయిన worker <b>మన అదుపులో లేడు</b> — అతన్ని ఆపడం అసాధ్యం. కాబట్టి లక్ష్యం మారుతుంది: <b>రెండుసార్లు నడవకుండా ఆపడం కాదు, రెండో ఫలితం అంగీకరించబడకుండా ఆపడం.</b>
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. అడిగింది ఏమిటి — మరియు ఇది ఒక queue కంటే ఎలా వేరు?
2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

**Part 2 — మొదటి విరుపు: అందరూ ఒకే క్షణంలో**

3. Step — ఒక జాబితా, ఒక `tick`, ఒక retry
4. **మొదటి విరుపు** — ఘాతీయ backoff ఏమీ ఆదా చేయలేదు
5. Step — jitter · మరియు షెడ్యూల్‌నే పరచడం

**Part 3 — రెండో విరుపు: ఈ పని ఎవరిది?**

6. Step — lease · "ఇది నాది, ఇంత సమయం వరకు"
7. **రెండో విరుపు** — 16.4% jobs ఒకేసారి రెండుసార్లు
8. Step — heartbeat · మరియు **ఆగిపోయిన worker**

**Part 4 — మూడో విరుపు: తప్పిపోయిన runs**

9. Step — scheduler 6 గంటలు పడిపోయింది
10. **మూడో విరుపు** — సరైన ఒక్క విధానం అంటూ లేదు
11. Step — విధానాన్ని job యజమాని చెప్తాడు

**Part 5 — పూర్తి system**

12. Step — `(job, ఏ క్షణానికి)` — ఒకే ఒక్క key
13. మొత్తం code · 2,000 ప్రయోగాలు · **mutation testing**

**Part 6 — Interview lo**

14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి
15. నోటితో చెప్పాల్సిన English script
16. Follow-ups — DAGs, ప్రాధాన్యత, సమయ మండలాలు
17. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. అడిగింది ఏమిటి — మరియు ఇది ఒక queue కంటే ఎలా వేరు?

"Job scheduler design చెయ్యి" అంటే చాలామంది వెంటనే priority queue గురించి మాట్లాడతారు. అది అవసరమే, కానీ అది **సులభమైన భాగం**. అసలు కష్టం వేరే చోట ఉంది, మరియు దాన్ని ఒక్క వాక్యంలో చెప్పొచ్చు:

<div class="box good">
<div class="lab">Queue కీ scheduler కీ అసలు తేడా</div>
<b>Queue lo ఒక పని <i>ఒకసారి</i> వస్తుంది. Scheduler lo ఒక పని <i>పదేపదే</i> వస్తుంది — మరియు అది ఎప్పుడు రావాలో మనం ముందే చెప్పాం.</b><br><br>
అందుకే scheduler కి queue కి లేని మూడు ప్రశ్నలు ఉంటాయి:<br><br>
• ఒక run విఫలమైతే <b>ఎప్పుడు</b> మళ్ళీ ప్రయత్నించాలి? (§4)<br>
• ఒక worker పని మధ్యలో మాయమైతే ఆ పని <b>ఎవరిది</b>? (§7)<br>
• మనం పడిపోయినప్పుడు తప్పిపోయిన runs ని <b>ఏమి చెయ్యాలి</b>? (§10)<br><br>
ఈ మూడూ <b>సమయం గురించిన ప్రశ్నలు</b>, డేటా నిర్మాణం గురించినవి కావు. అందుకే ఈ doc lo heap గురించి ఒక్క §3 మాత్రమే ఉంది, మిగతాదంతా ఈ మూడు ప్రశ్నల గురించే.
</div>

**మనం design చేస్తున్నది:** పదేపదే జరగాల్సిన పనులను, **విఫలమయ్యే workers** మీద, **పడిపోయే scheduler** తో నడిపే వ్యవస్థ — మరియు అది ఆ మూడు వైఫల్యాల మధ్య కూడా **సరైన ఫలితం** ఇవ్వాలి.

<svg viewBox="0 0 750 268"><text class="t-xs" x="0" y="14">Scheduler యొక్క మూడు భాగాలు — మరియు ప్రతిదీ ఎక్కడ విరుగుతుంది</text><rect class="n-info" x="0" y="28" width="230" height="62" rx="4"/><text class="t mid" x="115" y="52">ఎప్పుడు నడపాలి</text><text class="t-sm mid" x="115" y="72">షెడ్యూల్ · tick · retry</text><rect class="n-good" x="260" y="28" width="230" height="62" rx="4"/><text class="t mid" x="375" y="52">ఎవరు నడుపుతున్నారు</text><text class="t-sm mid" x="375" y="72">lease · heartbeat · fence</text><rect class="n-soft" x="520" y="28" width="230" height="62" rx="4"/><text class="t mid" x="635" y="52">ఏమి జరిగింది</text><text class="t-sm mid" x="635" y="72">ఫలితం · dead letter</text><line class="ln-acc" x1="115" y1="94" x2="115" y2="118" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="94" x2="375" y2="118" marker-end="url(#aa)"/><line class="ln-acc" x1="635" y1="94" x2="635" y2="118" marker-end="url(#aa)"/><rect class="n-bad" x="0" y="122" width="230" height="54" rx="4"/><text class="t-sm mid" x="115" y="144">§4 · అందరూ ఒకే క్షణం</text><text class="t-xs mid" x="115" y="164">1,840 వృథా పిలుపులు</text><rect class="n-bad" x="260" y="122" width="230" height="54" rx="4"/><text class="t-sm mid" x="375" y="144">§7 · ఒకేసారి రెండుసార్లు</text><text class="t-xs mid" x="375" y="164">16.4% jobs</text><rect class="n-bad" x="520" y="122" width="230" height="54" rx="4"/><text class="t-sm mid" x="635" y="144">§10 · తప్పిపోయిన runs</text><text class="t-xs mid" x="635" y="164">సరైన విధానం లేదు</text><rect class="n-dark" x="0" y="196" width="750" height="66" rx="4"/><text class="t-w-sm mid" x="375" y="220">మూడూ <tspan class="t-acc">సమయం</tspan> గురించిన ప్రశ్నలు — heap గురించినవి కావు.</text><text class="t-w-sm mid" x="375" y="244">Heap ని ఐదు నిమిషాల్లో రాయొచ్చు. ఈ మూడు ప్రశ్నలే మిగతా 40 నిమిషాలు.</text></svg>

---

## 2. Clarifying questions — ప్రతిదాని వెనక ఉన్న ఉద్దేశం

| ప్రశ్న | ఎందుకు అడుగుతున్నాం |
|---|---|
| ఒక job **ఖచ్చితంగా ఒకసారే** నడవాలా, లేదా **కనీసం ఒకసారి** చాలా? | ఖచ్చితంగా ఒకసారి **అసాధ్యం**. §8 lo ఎందుకో చూపిస్తాం. ఇది ఈ మొత్తం design ని నిర్ణయిస్తుంది |
| Job idempotent దా? | కాకపోతే retry ప్రమాదకరం. Idempotent కాని jobs కి §12 lo key అవసరం |
| ఒక run ఎంతసేపు పడుతుంది? గరిష్ఠం ఎంత? | ఇదే lease వ్యవధిని నిర్ణయిస్తుంది. §7 lo తప్పు lease 16.4% duplicates ఇస్తుంది |
| Scheduler పడిపోతే తప్పిపోయిన runs ని ఏమి చెయ్యాలి? | దీనికి **ఒక సమాధానం లేదు** — §10 |
| Workers ఎన్ని? ఒకే machine యా, చాలానా? | ఒకటే అయితే lease అవసరం లేదు. చాలా అయితే §6 మొత్తం అవసరం |
| సమయ మండలం (timezone) ఎవరిది — job యజమాని దా, server ది యా? | "రోజూ ఉదయం 9" అంటే ఎవరి ఉదయం? DST lo ఒక రోజు 23 గంటలే ఉంటుంది |
| ఒక job ఇంకొక job పూర్తయ్యాక నడవాలా? | అవును అంటే ఇది scheduler కాదు, **workflow engine**. పరిధి పెద్దది |

<div class="box warn">
<div class="lab">ఒక ప్రశ్న అడగకూడదు — మరియు దాని బదులు ఏమి చెప్పాలి</div>
"Exactly-once delivery కావాలా?" అని అడగవద్దు. అడిగితే, ఆ లక్షణం <b>సాధ్యమని మీరు అనుకుంటున్నారని</b> అర్థం.<br><br>
బదులుగా ఇలా చెప్పండి: <i>"Exactly-once <b>execution</b> సాధ్యం కాదు — ఆగిపోయిన worker ని ఆపడం మన చేతిలో లేదు. కానీ exactly-once <b>effect</b> సాధ్యం: రెండు workers నడిచినా, <b>ఒక్క ఫలితమే</b> అంగీకరించబడేలా చేయగలం."</i><br><br>
ఈ ఒక్క వాక్యం మిమ్మల్ని మిగతా అభ్యర్థుల నుంచి వేరు చేస్తుంది, మరియు §8 మొత్తం దీనికి రుజువు.
</div>

---

# Part 2 — మొదటి విరుపు: అందరూ ఒకే క్షణంలో

---

## 3. Step — ఒక జాబితా, ఒక `tick`, ఒక retry

మొదట అందరూ రాసే code. ఇది తప్పు కాదు, ఇది **అసంపూర్ణం**.

```javascript
class Scheduler {
  constructor() { this.jobs = []; }
  define(id, { every, run }) {
    this.jobs.push({ id, every, run, nextAt: 0 });
  }
  tick(now) {
    for (const job of this.jobs) {
      if (now < job.nextAt) continue;
      job.nextAt = now + job.every;
      this.attempt(job, 1);
    }
  }
  attempt(job, n) {
    job.run((err) => {
      if (!err) return;
      setTimeout(() => this.attempt(job, n + 1), 1000);   // విఫలమైతే ఆగి మళ్ళీ
    });
  }
}
```

ఇది పని చేస్తుంది. `tick` ప్రతి సెకనుకూ నడుస్తుంది, సమయం వచ్చిన jobs నడుస్తాయి, విఫలమైతే ఒక సెకను ఆగి మళ్ళీ ప్రయత్నిస్తాయి.

ఇప్పుడు ఒక విషయం గమనించండి — **నిజమైన systems lo jobs ఎప్పుడు షెడ్యూల్ అవుతాయి?**

<div class="box bad">
<div class="lab">అందరూ ఒకే సమయం రాస్తారు</div>
మీ company lo 500 cron entries ఉంటే, వాటిలో ఎన్ని <code>0 * * * *</code> (గంట మొదట్లో) ఉంటాయి? <b>దాదాపు అన్నీ.</b><br><br>
ఎందుకంటే "ప్రతి గంటకీ" అని అడిగినప్పుడు ఎవరూ "గంటకి 17వ నిమిషంలో" అని రాయరు. అందరూ <b>సున్నా</b> రాస్తారు.<br><br>
అంటే మీ 500 jobs అన్నీ <b>సరిగ్గా ఒకే మిల్లీసెకనులో</b> మొదలవుతాయి.
</div>

దీన్ని కొలుద్దాం. 500 jobs, అన్నీ ఒకే క్షణం. అవి పిలిచే downstream service ఒకేసారి **60 requests** భరిస్తుంది; అంతకు మించి వచ్చినవి తిరస్కరించబడతాయి (మరియు retry అవుతాయి).

---

## 4. మొదటి విరుపు — ఘాతీయ backoff ఏమీ ఆదా చేయలేదు

మూడు విధానాలు పోల్చాం: స్థిరంగా 1 సెకను, ఘాతీయ backoff (1, 2, 4, 8…), మరియు backoff + jitter.

నా ఊహ: "backoff స్పష్టంగా మెరుగు, jitter కొంచెం ఇంకా మెరుగు." **మొదటి భాగం పూర్తిగా తప్పు.**

```
500 jobs · అన్నీ ఒకే క్షణంలో షెడ్యూల్ · downstream ఒకేసారి 60 భరిస్తుంది

  విధానం                      | ప్రయత్నాలు | వృథా పిలుపులు | గరిష్ఠ ఉప్పెన | అన్నీ అయిన క్షణం
  ----------------------------+--------+-----------+----------+---------------
  స్థిరంగా 1 s                |   2340 |      1840 |      500 |          8.2 s
  ఘాతీయ backoff               |   2340 |      1840 |      500 |        183.2 s
  backoff + jitter            |   1208 |       708 |      747 |          4.8 s
```

<div class="box bad">
<div class="lab">మొదటి రెండు వరుసలు — సంఖ్యలు <b>సరిగ్గా ఒకటే</b></div>
స్థిరంగా 1 సెకను: <b>2,340</b> ప్రయత్నాలు, <b>1,840</b> వృథా.<br>
ఘాతీయ backoff: <b>2,340</b> ప్రయత్నాలు, <b>1,840</b> వృథా.<br><br>
<b>ఒక్క పిలుపు కూడా ఆదా కాలేదు.</b> కానీ పూర్తవడానికి 8.2 సెకన్లకు బదులు <b>183.2 సెకన్లు</b> — <b>22 రెట్లు ఎక్కువ</b>.<br><br>
అంటే ఈ పరిస్థితిలో ఘాతీయ backoff <b>స్పష్టంగా నష్టం</b>. అదే వృథా, అదే ఉప్పెన, కేవలం చాలా నెమ్మది.
</div>

ఎందుకు ఇలా జరిగింది? 500 jobs **ఒకే క్షణంలో** విఫలమయ్యాయి. అందరూ ఒకే సూత్రంతో backoff లెక్కిస్తారు. కాబట్టి అందరూ **ఒకే క్షణంలో** మళ్ళీ ప్రయత్నిస్తారు.

**Backoff ఎదురుచూపు సమయాన్ని పెంచుతుంది. అది ఎదురుచూసేవాళ్ళని విడదీయదు.**

ప్రతి 500 ms కిటికీలో ఎన్ని requests వచ్చాయో చూస్తే ఇది స్పష్టంగా కనిపిస్తుంది:

```
500 ms కిటికీకి వచ్చిన requests (మొదటి 10 సెకన్లు):

  స్థిరంగా      500   0 440   0 380   0 320   0 260   0 200   0 140   0  80   0  20   0   0   0
  backoff       500   0 440   0   0   0 380   0   0   0   0   0   0   0 320   0   0   0   0   0
  + jitter      747 260  81  54  42  13   1   3   2   5   0   0   0   0   0   0   0   0   0   0
  సమయం (s)     0.0 0.5 1.0 1.5 2.0 2.5 3.0 3.5 4.0 4.5 5.0 5.5 6.0 6.5 7.0 7.5 8.0 8.5 9.0 9.5
```

మొదటి రెండు వరుసల్లో సంఖ్యలు **సరిగ్గా ఒకటే** — 500, 440, 380, 320. కేవలం వాటి మధ్య ఖాళీలు పెరిగాయి.

<svg viewBox="0 0 750 292"><text class="t-xs" x="0" y="14">ఒకే ఎత్తు, వేరే అంతరం — backoff ఉప్పెనని తగ్గించలేదు, దూరం చేసింది</text><text class="t-xs" x="0" y="42">స్థిరంగా 1 s</text><rect class="n-bad" x="0" y="50" width="40" height="26" rx="2"/><text class="t-xs mid" x="20" y="68">500</text><rect class="n-bad" x="76" y="50" width="36" height="26" rx="2"/><text class="t-xs mid" x="94" y="68">440</text><rect class="n-bad" x="148" y="50" width="32" height="26" rx="2"/><text class="t-xs mid" x="164" y="68">380</text><rect class="n-bad" x="216" y="50" width="28" height="26" rx="2"/><text class="t-xs mid" x="230" y="68">320</text><rect class="n-bad" x="280" y="50" width="24" height="26" rx="2"/><text class="t-xs mid" x="292" y="68">260</text><text class="t-xs" x="0" y="106">ఘాతీయ backoff</text><rect class="n-bad" x="0" y="114" width="40" height="26" rx="2"/><text class="t-xs mid" x="20" y="132">500</text><rect class="n-bad" x="76" y="114" width="36" height="26" rx="2"/><text class="t-xs mid" x="94" y="132">440</text><rect class="n-bad" x="220" y="114" width="32" height="26" rx="2"/><text class="t-xs mid" x="236" y="132">380</text><rect class="n-bad" x="508" y="114" width="28" height="26" rx="2"/><text class="t-xs mid" x="522" y="132">320</text><text class="t-xs" x="0" y="170">backoff + jitter</text><rect class="n-good" x="0" y="178" width="56" height="26" rx="2"/><text class="t-xs mid" x="28" y="196">747</text><rect class="n-good" x="60" y="178" width="22" height="26" rx="2"/><text class="t-xs mid" x="71" y="196">260</text><rect class="n-good" x="86" y="178" width="10" height="26" rx="2"/><rect class="n-good" x="100" y="178" width="7" height="26" rx="2"/><rect class="n-good" x="111" y="178" width="5" height="26" rx="2"/><rect class="n-good" x="120" y="178" width="3" height="26" rx="2"/><text class="t-xs" x="130" y="196">…తర్వాత దాదాపు సున్నా</text><rect class="n-dark" x="0" y="216" width="750" height="72" rx="4"/><text class="t-w-sm mid" x="375" y="240">Backoff <tspan class="t-acc">ఎదురుచూపుని</tspan> పెంచుతుంది. అది <tspan class="t-acc">ఎదురుచూసేవాళ్ళని విడదీయదు</tspan>.</text><text class="t-w-sm mid" x="375" y="264">అందరూ ఒకే క్షణంలో విఫలమైతే, అందరూ ఒకే క్షణంలో తిరిగి వస్తారు —</text><text class="t-w-sm mid" x="375" y="284">1 సెకను తర్వాత అయినా, 64 సెకన్ల తర్వాత అయినా.</text></svg>

---

## 5. Step — jitter · మరియు షెడ్యూల్‌నే పరచడం

Jitter అంటే: ఎదురుచూపు సమయాన్ని **యాదృచ్ఛికం** చేయడం. `4 సెకన్లు` కాదు — `0 నుంచి 4 సెకన్ల మధ్య ఏదో ఒకటి`.

```javascript
const Backoff = {
  fixed: ms => () => ms,
  exp:   (base, cap) => n => Math.min(cap, base * 2 ** (n - 1)),
  // "full jitter" — 0 నుంచి పరిమితి వరకు ఏదైనా
  jitter: (base, cap) => (n, rnd) =>
    Math.floor(rnd() * Math.min(cap, base * 2 ** (n - 1))),
};
```

ఒక్క `rnd() *` — అంతే. దాని ఫలితం: వృథా పిలుపులు **1,840 → 708**, మరియు పూర్తవడం **8.2 s → 4.8 s**.

కానీ పట్టికలో ఇంకొక సంఖ్య ఉంది, మరియు అది ఇబ్బందికరమైనది: jitter యొక్క **గరిష్ఠ ఉప్పెన 747** — స్థిరమైన దాని 500 కంటే **ఎక్కువ**.

<div class="box warn">
<div class="lab">ఆ 747 ఎక్కడి నుంచి వచ్చింది — మరియు అది ఏమి చెప్తోంది</div>
మొదటి 500 ms కిటికీలో: 500 original + jitter వల్ల వెంటనే తిరిగి వచ్చిన 247 = <b>747</b>.<br><br>
అంటే jitter <b>retry ఉప్పెనని</b> పరిచింది, కానీ <b>మొదటి ఉప్పెనని</b> ముట్టుకోలేదు. ఎందుకంటే ఆ 500 jobs మొదలవడం retry కాదు — అది <b>షెడ్యూల్</b>.<br><br>
కాబట్టి అసలు పరిష్కారం ఇంకా వెనక్కి ఉంది: <b>షెడ్యూల్‌నే పరచాలి.</b>
</div>

Job ని నిర్వచించేటప్పుడు ఒక `jitterMs` ఇద్దాం — "ఈ job ని ఈ కిటికీలో ఎక్కడైనా మొదలుపెట్టు":

```javascript
#create(job, scheduledFor) {
  const jitter = job.jitterMs ? Math.floor(this.#rnd() * job.jitterMs) : 0;
  const run = { jobId: job.id, scheduledFor, runAt: this.#sim.now + jitter, ... };
  this.#sim.after(jitter, () => this.#ready.push(run));
}
```

**ముఖ్యమైన వివరం:** `scheduledFor` మారలేదు — అది ఇంకా సరిగ్గా గంట మొదలే. మారింది `runAt` మాత్రమే. ఇది §12 lo చాలా ముఖ్యమవుతుంది.

ఇప్పుడు నాలుగో వరుసతో కలిపి చూద్దాం:

```
  విధానం                      | ప్రయత్నాలు | వృథా పిలుపులు | గరిష్ఠ ఉప్పెన | అన్నీ అయిన క్షణం
  ----------------------------+--------+-----------+----------+---------------
  స్థిరంగా 1 s                |   2340 |      1840 |      500 |          8.2 s
  ఘాతీయ backoff               |   2340 |      1840 |      500 |        183.2 s
  backoff + jitter            |   1208 |       708 |      747 |          4.8 s
  + షెడ్యూల్ కూడా 60 s lo పరచడం |    500 |         0 |       13 |         60.1 s
```

<div class="box good">
<div class="lab">చివరి వరుస — 500 jobs కి సరిగ్గా 500 ప్రయత్నాలు</div>
<b>వృథా పిలుపులు: 0. గరిష్ఠ ఉప్పెన: 13</b> (500 కి బదులు).<br><br>
Downstream ఎప్పుడూ ఇబ్బంది పడలేదు, కాబట్టి ఏదీ విఫలం కాలేదు, కాబట్టి retry అవసరమే రాలేదు. <b>మేము retry ని మెరుగుపరచలేదు — retry అవసరాన్నే తొలగించాం.</b>
</div>

ఖరీదు: అన్నీ పూర్తవడానికి **60.1 సెకన్లు** (4.8 కి బదులు). ఎందుకంటే మనమే వాటిని 60 సెకన్లలో పరిచాం. అంటే:

<div class="box">
<div class="lab">ఇది ఒక ఒప్పందం, ఉచిత లాభం కాదు</div>
"గంట మొదట్లో ఖచ్చితంగా" అనేది <b>12:00:08 కి అన్నీ అవుతాయి</b> నుంచి <b>12:01:00 కి అన్నీ అవుతాయి</b> గా మారుతుంది.<br><br>
చాలా jobs కి ఇది పట్టింపు లేదు — "గంటకోసారి cache refresh" కి 60 సెకన్ల తేడా ఏమీ కాదు. కొన్నిటికి పట్టింపు ఉంటుంది.<br><br>
అందుకే <code>jitterMs</code> <b>ప్రతి job కీ వేరుగా</b> ఉంటుంది, అందరికీ ఒకటే కాదు. ఇది §11 lo మళ్ళీ వచ్చే ఆలోచన.
</div>

**మొదటి విరుపు పూర్తయింది.** ఇప్పుడు ఒక job నడుస్తోంది. కానీ **ఎవరు** నడుపుతున్నారు?

---

# Part 3 — రెండో విరుపు: ఈ పని ఎవరిది?

---

## 6. Step — lease · "ఇది నాది, ఇంత సమయం వరకు"

ఒక worker ఒక job ని తీసుకున్నాక అది పని చేస్తుంది. కానీ ఆ worker **మాయమైతే**? Machine చనిపోవచ్చు, process చావొచ్చు, network తెగిపోవచ్చు.

ఆ పని **ఎప్పటికీ** జరగకూడదా? కాదు — ఇంకొకరు దాన్ని తీసుకోవాలి. కానీ ఎప్పుడు?

సాధారణ సమాధానం **lease**: "ఈ పని నీది, కానీ **30 సెకన్ల వరకే**. ఆలోపు 'అయిపోయింది' అని చెప్పకపోతే, నేను దాన్ని ఇంకొకరికి ఇచ్చేస్తాను."

```javascript
claim() {
  const run = this.#ready.shift();
  if (!run) return null;
  run.state = 'running';
  run.claimedAt = this.#sim.now;      // ← ఇక్కడి నుంచి lease మొదలు
  return run;
}

#reapExpired() {
  for (const run of this.#runs.values()) {
    if (run.state !== 'running') continue;
    if (this.#sim.now - run.claimedAt <= this.leaseMs) continue;
    this.#reschedule(run, 'LEASE_EXPIRED');   // ఇంకొకరికి ఇచ్చేయ్
  }
}
```

ఇది సరళంగా ఉంది. కానీ **lease ఎంత ఉండాలి?**

అదే ప్రశ్న ఈ మొత్తం Part కి మూలం, ఎందుకంటే దానికి రెండు వైపులా నష్టం ఉంది.

---

## 7. రెండో విరుపు — 16.4% jobs ఒకేసారి రెండుసార్లు

కొలుద్దాం. 3,000 jobs. Job వ్యవధులు **ఒకేలా ఉండవు** — నిజమైన systems lo ఎప్పుడూ ఒక **బరువైన తోక** ఉంటుంది:

- 80% jobs — 1 సెకను లోపు
- 17% — 1 నుంచి 5 సెకన్లు
- 3% — **5 నుంచి 30 సెకన్లు**

మరియు 2% workers పని మధ్యలో చచ్చిపోతారు.

```
3,000 jobs · 2% workers పని మధ్యలో చచ్చిపోతారు · job వ్యవధి బరువైన తోక
(80% jobs 1 s లోపు · 17% 1–5 s · 3% 5–30 s)

  lease | heartbeat | ఏకకాలంలో రెండుసార్లు | శాతం  | చచ్చిన job ఆగిన సమయం (మధ్య / గరిష్ఠ)
  ------+-----------+-----------------+-------+--------------------------------
    2 s |   లేదు    |             491 | 16.4% |          1.7 s / 2.0 s
    5 s |   లేదు    |              86 |  2.9% |          4.7 s / 5.0 s
   10 s |   లేదు    |              78 |  2.6% |          9.7 s / 10.0 s
   30 s |   లేదు    |               0 |  0.0% |         29.7 s / 30.0 s
   60 s |   లేదు    |               0 |  0.0% |         59.7 s / 60.0 s
```

<div class="box bad">
<div class="lab">ఈ పట్టికలో రెండు నిలువు వరుసలు <b>వ్యతిరేక దిశల్లో</b> కదులుతున్నాయి</div>
<b>2 సెకన్ల lease:</b> చచ్చిన job 1.7 సెకన్లలో తిరిగి మొదలవుతుంది — అద్భుతం. కానీ <b>491 jobs (16.4%) ఒకేసారి ఇద్దరు workers మీద నడిచాయి.</b><br><br>
<b>60 సెకన్ల lease:</b> ఏ job ఒకేసారి రెండుసార్లు నడవలేదు — అద్భుతం. కానీ ఒక worker చస్తే ఆ పని <b>59.7 సెకన్లు ఆగిపోతుంది.</b><br><br>
Lease ని ఎటు కదిపినా ఒక వైపు బాగుపడి ఇంకో వైపు చెడిపోతుంది. <b>మధ్యలో మంచి విలువ లేదు.</b>
</div>

ఆ 16.4% ఎక్కడి నుంచి వచ్చాయి? **బరువైన తోక నుంచి.** 3% jobs 5–30 సెకన్లు పడతాయి. Lease 2 సెకన్లు అయితే, అవి **ప్రతిసారీ** గడువు దాటతాయి — పని ఇంకా సవ్యంగా నడుస్తున్నా.

<div class="box">
<div class="lab">ఇది ఎందుకు ఇంత సాధారణమైన తప్పు</div>
Lease ని ఎంచుకునేటప్పుడు అందరూ <b>సగటు</b> చూస్తారు. ఇక్కడ సగటు వ్యవధి ఒక సెకను కంటే తక్కువ — కాబట్టి "2 సెకన్లు ధారాళం" అనిపిస్తుంది.<br><br>
కానీ lease ని నిర్ణయించేది సగటు కాదు, <b>తోక</b>. మరియు తోక ఎప్పుడూ మీరు అనుకున్నదాని కంటే పొడవుగా ఉంటుంది.
</div>

---

## 8. Step — heartbeat · మరియు **ఆగిపోయిన worker**

సమస్య మూలం ఇది: lease **పని మొదలైనప్పుడు** లెక్క వేస్తోంది. కానీ మనం తెలుసుకోవాలనుకుంటున్నది "పని ఎంతసేపు పడుతోంది" కాదు — **"ఈ worker ఇంకా బతికున్నాడా"**.

ఆ రెండూ వేర్వేరు ప్రశ్నలు. వాటిని విడదీద్దాం: worker ప్రతి సెకనుకూ **"నేను ఇంకా ఉన్నాను"** అని చెప్తాడు.

```javascript
heartbeat(key, fence) {
  const run = this.#runs.get(key);
  if (!run || run.fence !== fence || run.state !== 'running') return false;
  run.lastBeat = this.#sim.now;     // ← lease ఇక్కడి నుంచి మళ్ళీ మొదలు
  return true;
}

#reapExpired() {
  for (const run of this.#runs.values()) {
    if (run.state !== 'running') continue;
    // "మొదలైనప్పటి నుంచి" కాదు — "చివరి కబురు నుంచి"
    if (this.#sim.now - run.lastBeat <= this.heartbeatMs + this.leaseMs) continue;
    this.#stats.expired++;
    this.#reschedule(run, 'LEASE_EXPIRED');
  }
}
```

ఇప్పుడు పని 30 సెకన్లు పట్టినా ఫరవాలేదు — worker ప్రతి సెకనుకూ కబురు పంపుతున్నాడు. కానీ అతను **చస్తే** కబురు ఆగుతుంది, మరియు 3 సెకన్లలో ఇంకొకరు తీసుకుంటారు:

```
    2 s |  1 s కొకటి |               0 |  0.0% |          3.0 s / 3.0 s
    5 s |  1 s కొకటి |               0 |  0.0% |          6.0 s / 6.0 s
```

<div class="box good">
<div class="lab">రెండు వైపులా గెలిచాం</div>
60 సెకన్ల lease యొక్క <b>భద్రత</b> (0% duplicates) మరియు 2 సెకన్ల lease యొక్క <b>వేగం</b> (3 సెకన్లలో కోలుకోవడం) — రెండూ ఒకేసారి.<br><br>
ఎందుకంటే మనం ఇప్పుడు <b>సరైన ప్రశ్న</b> అడుగుతున్నాం: "పని ఎంతసేపు పడుతోంది" కాదు, <b>"worker బతికున్నాడా"</b>.
</div>

### కానీ — heartbeat ఒక రంధ్రాన్ని మూయలేదు

Worker **చావలేదు**. అతను **ఆగిపోయాడు**.

GC pause. VM migration. CPU ఆకలి. Laptop మూత. ఈ అన్నిటిలోనూ process సజీవంగానే ఉంది — అది కేవలం **కొన్ని సెకన్ల పాటు ఏమీ చేయదు**. Heartbeats ఆగుతాయి. Lease ముగుస్తుంది. ఇంకో worker మొదలుపెడతాడు.

తర్వాత మొదటి worker **మేల్కొంటాడు**. అతనికి తాను ఆగిపోయానని **తెలియదు**. అతను తన పని పూర్తి చేసి, తన ఫలితాన్ని రాస్తాడు.

<svg viewBox="0 0 750 276"><text class="t-xs" x="0" y="14">ఆగిపోయిన worker — అతను చావలేదు, కాబట్టి ఎవరూ అతన్ని ఆపలేరు</text><line class="ln" x1="60" y1="46" x2="720" y2="46"/><text class="t-xs" x="0" y="50">సమయం</text><rect class="n-info" x="60" y="58" width="130" height="28" rx="3"/><text class="t-xs mid" x="125" y="77">A పట్టుకున్నాడు</text><rect class="n-soft" x="190" y="58" width="250" height="28" rx="3"/><text class="t-xs mid" x="315" y="77">A ఆగిపోయాడు · heartbeats ఆగాయి</text><rect class="n-info" x="440" y="58" width="160" height="28" rx="3"/><text class="t-xs mid" x="520" y="77">A మేల్కొన్నాడు</text><line class="ln-acc" x1="360" y1="92" x2="360" y2="112" marker-end="url(#aa)"/><text class="t-xs" x="368" y="106">lease ముగిసింది</text><rect class="n-good" x="360" y="116" width="240" height="28" rx="3"/><text class="t-xs mid" x="480" y="135">B పట్టుకున్నాడు · పని చేస్తున్నాడు</text><line class="ln-acc" x1="560" y1="92" x2="560" y2="150" marker-end="url(#aa)"/><rect class="n-bad" x="0" y="164" width="750" height="106" rx="4"/><text class="t-sm mid" x="375" y="188">A మేల్కొని తన ఫలితాన్ని రాస్తాడు — అది <tspan class="t-acc">B ఫలితాన్ని తుడిచేస్తుంది</tspan>.</text><text class="t-sm mid" x="375" y="212">A కి తాను ఆగిపోయానని తెలియదు. అతని దృష్టిలో అంతా మామూలే.</text><text class="t-sm mid" x="375" y="238">Heartbeat దీన్ని ఆపలేదు — heartbeat ఆగిపోయిన వాడిని <tspan class="t-acc">గుర్తిస్తుంది</tspan>, <tspan class="t-acc">ఆపదు</tspan>.</text><text class="t-sm mid" x="375" y="262">4,000 jobs lo ఇది <tspan class="t-acc">106 సార్లు</tspan> జరిగింది — 2.65%.</text></svg>

కొలిచి చూద్దాం. 4,000 jobs, 3% workers lease దాటేంతసేపు ఆగిపోతారు. చివరికి **నిల్వలో ఎవరి ఫలితం ఉంది** అని పరీక్షిస్తాం:

```
4,000 jobs · 3% workers lease దాటేంతసేపు ఆగిపోతారు (GC pause, VM migration)
heartbeat 1000 ms · lease 2000 ms

  విధానం             | writes | తిరస్కరించినవి | తుదికి పాత ఫలితం ఉన్న jobs
  -------------------+--------+-----------+------------------------
  fencing లేకుండా    |   4111 |         0 |        106  (2.65%)
  fencing token తో   |   4004 |       107 |          0  (0.00%)
```

**పరిష్కారం:** ప్రతి claim కి ఒక **పెరుగుతున్న సంఖ్య** ఇవ్వడం, మరియు రాసేటప్పుడు ఆ సంఖ్యని అడగడం.

```javascript
claim() {
  ...
  run.fence = ++this.#fence;          // ఈ ప్రయత్నానికి మాత్రమే · ఎప్పుడూ పెరుగుతుంది
  return { key: run.key, ..., fence: run.fence };
}

complete(key, fence, result) {
  const run = this.#runs.get(key);
  if (!run) return false;
  // పాత worker · లేదా ఇప్పటికే పూర్తయింది
  if (run.fence !== fence)     { this.#stats.fenced++; return false; }
  if (run.state !== 'running') { this.#stats.fenced++; return false; }
  run.state = 'done'; run.result = result;
  return true;
}
```

DD 24 §8 lo చూసిన token ఇదే — కానీ అక్కడ అది ఒక **timer** ని ఆపింది; ఇక్కడ అది ఒక **worker** ని ఆపుతోంది.

దీన్ని నిజంగా పరీక్షించాలంటే ఆ ఒక్క క్రమాన్నే నడిపి చూడాలి:

```
==== మార్పు లేని code ====
  A పట్టుకున్నాడు · fence 1
  B పట్టుకున్నాడు · fence 2
  A రాయడానికి ప్రయత్నించాడు → తిరస్కరించబడింది
  B రాశాడు → అంగీకరించబడింది
  తుది ఫలితం: B ఫలితం · state done

==== fence పరీక్ష తీసేస్తే ====
  A పట్టుకున్నాడు · fence 1
  B పట్టుకున్నాడు · fence 2
  A రాయడానికి ప్రయత్నించాడు → ⚠ అంగీకరించబడింది
  B రాశాడు → ⚠ తిరస్కరించబడింది
  తుది ఫలితం: A ఫలితం · state done
```

<div class="box bad">
<div class="lab">రెండో భాగంలో రెండు తప్పులు జరిగాయి, ఒకటి కాదు</div>
<b>ఒకటి:</b> ఆగిపోయిన A యొక్క పాత ఫలితం అంగీకరించబడింది.<br>
<b>రెండు:</b> ఆ తర్వాత <b>సరైన</b> worker B తిరస్కరించబడ్డాడు — ఎందుకంటే run అప్పటికే 'done'.<br><br>
అంటే తప్పు ఫలితం నిల్వ అయింది, మరియు సరైనది <b>ఎప్పటికీ రాయబడలేదు</b>. మరియు ఎక్కడా ఒక్క error కూడా లేదు.
</div>

<div class="box good">
<div class="lab">ఈ Part నుంచి అసలు పాఠం — మరియు ఇది interview lo చెప్పాల్సిన వాక్యం</div>
<b>ఒక job రెండుసార్లు <i>నడవకుండా</i> ఆపడం అసాధ్యం. రెండో ఫలితం <i>అంగీకరించబడకుండా</i> ఆపడం సులభం.</b><br><br>
ఆగిపోయిన worker మన అదుపులో లేడు. అతన్ని చంపలేం, ఆపలేం, హెచ్చరించలేం. కానీ అతను తిరిగి వచ్చి <b>రాయబోయేటప్పుడు</b> — ఆ క్షణంలో అతను మన తలుపు తడతాడు. అక్కడ మనం "నువ్వు పాతవాడివి" అని చెప్పగలం.<br><br>
అందుకే ఇది <b>exactly-once execution</b> కాదు, <b>exactly-once effect</b>.
</div>

---

# Part 4 — మూడో విరుపు: తప్పిపోయిన runs

---

## 9. Step — scheduler 6 గంటలు పడిపోయింది

ఇప్పటివరకు workers విఫలమవడం చూశాం. ఇప్పుడు **scheduler స్వయంగా** పడిపోతే?

200 jobs, ప్రతిదీ 5 నిమిషాలకు ఒకసారి. Scheduler రాత్రి 2 నుంచి ఉదయం 8 వరకు పడిపోయింది — **6 గంటలు**.

అది తిరిగి లేచినప్పుడు **14,400 runs తప్పిపోయి ఉన్నాయి** (200 × 72).

మొదటి భయం: "ఇవన్నీ ఒకేసారి నడిస్తే system మునిగిపోతుంది." దాన్ని కొలుద్దాం:

```
200 jobs · ప్రతిదీ 5 నిమిషాలకు ఒకసారి · scheduler 6 గంటలు పడిపోయింది
తప్పిపోయిన runs: 200 × 72 = 14,400

  విధానం                    | queue lo చేరినవి | నడిచినవి | వదిలేసినవి | queue ఖాళీ అయిన సమయం
  --------------------------+-----------+---------+-----------+------------------
  అన్నీ నడుపు               |    14,400 |  14,400 |         0 |       12 నిమిషాలు
  అన్నీ వదిలేయ్             |         0 |       0 |    14,400 |        0 నిమిషాలు
  చివరిది ఒకటే              |       200 |     200 |    14,200 |        1 నిమిషాలు
  చివరి 30 నిమిషాలవి        |     1,200 |   1,200 |    13,200 |        1 నిమిషాలు
```

<div class="box">
<div class="lab">నా భయం తప్పు — భారం సమస్య కాదు</div>
14,400 runs <b>12 నిమిషాల్లో</b> పూర్తయ్యాయి. అది ఇబ్బందికరం కావచ్చు, కానీ అది ఒక విపత్తు కాదు.<br><br>
నేను ఈ విరుపుని "catch-up storm system ని కూల్చేస్తుంది" అని రాయబోయాను. కొలిచాక అది నిజం కాదని తేలింది — కాబట్టి ఆ కథని వదిలేశాను.<br><br>
<b>నిజమైన సమస్య భారం కాదు. అది <i>సరి-తప్పు</i>.</b>
</div>

---

## 10. మూడో విరుపు — సరైన ఒక్క విధానం అంటూ లేదు

ఆ 14,400 runs అన్నీ ఒకేలాంటివి కావు. ఒక నిజమైన fleet ఇలా ఉంటుంది:

| job రకం | అన్నీ నడిపితే ఏమవుతుంది | వదిలేస్తే ఏమవుతుంది |
|---|---|---|
| ప్రతి వాడుకరికి రోజువారీ email | **72 emails** ఒక్కొక్కరికి | ఒక email ఆలస్యం |
| Subscription బిల్లింగ్ (period కొకటి) | సరైనదే | **72 periods బిల్లు కాలేదు** |
| Cache refresh | 72 సార్లు వృథా పని | ఏమీ కాదు |
| Health check | 72 సార్లు వృథా పని | ఏమీ కాదు |

ఇప్పుడు ప్రతి **ఒకే విధానాన్ని** అందరికీ వర్తింపజేస్తే ఏమవుతుందో కొలుద్దాం:

```
Scheduler 6 గంటలు పడిపోయింది · ప్రతి job 5 నిమిషాలకు ఒకసారి → 72 runs తప్పాయి

  job రకం                              | సరైన విధానం | అన్నీ | వదిలేయ్ | ఒకటే | per-job
  -------------------------------------+---------+-----+---------+------+--------
  ప్రతి వాడుకరికి రోజువారీ email       | one     |2880 |     0 |   40 |     40
  subscription బిల్లింగ్ (period కొకటి) | all     |1440 |     0 |   20 |   1440
  cache refresh                        | one     |5760 |     0 |   80 |     80
  health check                         | skip    |4320 |     0 |   60 |      0

  విధానం      | అదనంగా నడిచినవి (తప్పుడు పని) | జరగని runs (పోయిన పని)
  ------------+--------------------------+---------------------
  అన్నీ నడుపు |                   12,840 |                   0
  అన్నీ వదిలేయ్ |                        0 |               1,560
  చివరిది ఒకటే |                       60 |               1,420
  per-job     |                        0 |                   0
```

<div class="box bad">
<div class="lab">మూడు "సహజమైన" విధానాలు — మూడూ తప్పు</div>
<b>అన్నీ నడుపు:</b> 12,840 తప్పుడు runs. అందులో <b>2,880 అదనపు emails</b> — మీ వాడుకరులకి ఒక్కొక్కరికి 72 emails. Support team కి ఇది ఒక సంక్షోభం.<br><br>
<b>అన్నీ వదిలేయ్:</b> 1,560 runs పోయాయి. అందులో <b>1,440 బిల్లింగ్ periods</b> — అంటే <b>నిజమైన డబ్బు</b>. ఎవరూ దీన్ని గమనించరు, ఎందుకంటే ఏ error రాదు.<br><br>
<b>చివరిది ఒకటే:</b> ఇది "సమతుల్యం" లా అనిపిస్తుంది. కానీ ఇది ఇంకా <b>1,420 runs</b> కోల్పోతుంది — బిల్లింగ్ తో సహా.<br><br>
<b>per-job:</b> తప్పుడు పని 0, పోయిన పని 0.
</div>

<div class="box good">
<div class="lab">ఇదే ఈ Part యొక్క పాఠం, మరియు ఇది ఒక design పాఠం</div>
<b>"తప్పిపోయిన runs ని ఏమి చెయ్యాలి" అనేది ఒక engineering నిర్ణయం కాదు. అది ఒక business నిర్ణయం.</b><br><br>
Scheduler కి ఆ సమాధానం <b>తెలియదు</b>, మరియు తెలియకూడదు. బిల్లింగ్ ప్రతి period కీ నడవాలో లేదో scheduler రచయితకి ఎలా తెలుస్తుంది?<br><br>
కాబట్టి scheduler పని ఆ నిర్ణయం తీసుకోవడం కాదు — <b>ఆ నిర్ణయాన్ని job యజమాని చెప్పగలిగేలా చేయడం.</b>
</div>

---

## 11. Step — విధానాన్ని job యజమాని చెప్తాడు

కాబట్టి catch-up విధానాన్ని ఒక **విలువగా** చేద్దాం, `if` పరంపరగా కాదు:

```javascript
const CatchUp = {
  all:    missed => missed,                    // ప్రతి periodకీ ఒకటి (బిల్లింగ్)
  skip:   ()     => [],                        // ఏదీ వద్దు (health check)
  latest: missed => missed.slice(-1),          // చివరిది ఒకటే (cache, report)
  within: ms => (missed, now) => missed.filter(t => now - t <= ms),
};
```

ఇప్పుడు job నిర్వచనం **తన సమాధానాన్ని తానే మోసుకొస్తుంది**:

```javascript
sched.define('subscription-billing', { every: HOUR, catchUp: CatchUp.all });
sched.define('daily-digest',         { every: DAY,  catchUp: CatchUp.latest });
sched.define('health-check',         { every: MIN,  catchUp: CatchUp.skip });
sched.define('rebuild-index',        { every: HOUR, catchUp: CatchUp.within(2*HOUR) });
```

మరియు `tick` lo ఒక్క పంక్తి:

```javascript
tick() {
  const now = this.#sim.now;
  for (const job of this.#jobs.values()) {
    const missed = [];
    for (let t = job.lastScheduled + job.every; t <= now; t += job.every)
      missed.push(t);
    if (!missed.length) continue;
    job.lastScheduled = missed[missed.length - 1];
    const chosen = job.catchUp(missed, now);     // ← job తన విధానాన్ని తానే చెప్తుంది
    this.#stats.caughtUp += chosen.length;
    this.#stats.skipped  += missed.length - chosen.length;
    for (const at of chosen) this.#create(job, at);
  }
}
```

`tick` కి `all`, `skip`, `latest` అంటే ఏమిటో **తెలియదు**. అది కేవలం ఒక function పిలుస్తుంది. కొత్త విధానం కావాలంటే scheduler ని ముట్టుకోనవసరం లేదు.

<div class="box warn">
<div class="lab">ఇక్కడ ఒక సూక్ష్మమైన విషయం ఉంది — <code>missed</code> ఎప్పుడూ <i>అన్నీ</i> లెక్కిస్తుంది</div>
<code>catchUp</code> ని పిలిచే <b>ముందు</b> మనం తప్పిపోయిన అన్ని క్షణాలనూ లెక్కిస్తాం, తర్వాత job వాటిలో కొన్నిటిని ఎంచుకుంటుంది.<br><br>
దీని వల్ల <code>skipped</code> అనే లెక్క నిజాయితీగా ఉంటుంది — "72 తప్పాయి, 1 నడిపాం, 71 వదిలేశాం". <b>ఎంత వదిలేశామో మనకు తెలుసు</b>, మరియు అది dashboard lo కనిపిస్తుంది.<br><br>
<code>catchUp</code> లోపలే లెక్కపెడితే ఈ సంఖ్య పోతుంది, మరియు "మేము ఎంత పని వదిలేశాం" అనే ప్రశ్నకి ఎప్పటికీ సమాధానం ఉండదు.
</div>

**మూడో విరుపు పూర్తయింది.** ఇప్పుడు అన్నిటినీ కలిపే ఒక్క ఆలోచన మిగిలింది.

---

# Part 5 — పూర్తి system

---

## 12. Step — `(job, ఏ క్షణానికి)` — ఒకే ఒక్క key

మూడు విరుపుల్లోనూ ఒకే ప్రశ్న పదేపదే వచ్చింది, వేరే వేషాల్లో:

- §5 lo: jitter వల్ల job ఆలస్యంగా నడిస్తే, అది **ఏ run**?
- §8 lo: రెండు workers నడిపితే, అది **ఒకే run** అని ఎలా చెప్పాలి?
- §11 lo: scheduler రెండుసార్లు tick చేస్తే, అది **అదే run** నా, కొత్తదా?

ఈ మూడింటికీ ఒకే సమాధానం: **ఒక run ని దాని `(jobId, scheduledFor)` జత గుర్తిస్తుంది.**

```javascript
#create(job, scheduledFor) {
  const key = `${job.id}@${scheduledFor}`;
  if (this.#runs.has(key)) { this.#stats.deduped++; return; }   // ఇది ఇప్పటికే ఉంది
  const jitter = job.jitterMs ? Math.floor(this.#rnd() * job.jitterMs) : 0;
  const run = { key, jobId: job.id, scheduledFor, runAt: this.#sim.now + jitter,
                attempt: 0, state: 'pending', fence: 0, lastBeat: 0 };
  this.#runs.set(key, run);
  ...
}
```

ఇక్కడ **`scheduledFor` ఉంది, `runAt` కాదు** — ఇది ముఖ్యం.

<div class="box good">
<div class="lab">ఎందుకు <code>scheduledFor</code>, <code>Date.now()</code> కాదు?</div>
ఎందుకంటే <code>scheduledFor</code> అనేది <b>షెడ్యూల్ నుంచి వచ్చే సంఖ్య</b> — అదే job, అదే నియమం, అదే క్షణం నుంచి <b>ఎప్పుడూ అదే విలువ</b> వస్తుంది.<br><br>
కాబట్టి scheduler పడిపోయి, తిరిగి లేచి, ఒక పాత checkpoint నుంచి కొనసాగినా — అది అదే key ని లెక్కిస్తుంది, మరియు <code>#runs.has(key)</code> "ఇది ఇప్పటికే ఉంది" అని చెప్తుంది.<br><br>
<code>Date.now()</code> వాడితే ప్రతి restart కొత్త key తయారు చేస్తుంది, మరియు <b>ప్రతి restart కి jobs మళ్ళీ నడుస్తాయి</b>.
</div>

మరియు అదే key ఒక **idempotency key** గా job కి కూడా ఇవ్వొచ్చు. Job ఒక email పంపుతుంటే, అది `sendEmail(user, key)` అని పిలిస్తే — email service అదే key ని రెండోసారి చూసి **పంపకుండా** ఉంటుంది. అలా exactly-once effect **job లోపల కూడా** కొనసాగుతుంది.

<svg viewBox="0 0 750 258"><text class="t-xs" x="0" y="14">ఒకే key మూడు సమస్యలనూ కట్టేస్తుంది</text><rect class="n-acc" x="250" y="26" width="250" height="46" rx="4"/><text class="t-w mid" x="375" y="46">key = jobId @ scheduledFor</text><text class="t-w-sm mid" x="375" y="64">షెడ్యూల్ నుంచే వచ్చే సంఖ్య</text><line class="ln-acc" x1="300" y1="76" x2="130" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="375" y1="76" x2="375" y2="104" marker-end="url(#aa)"/><line class="ln-acc" x1="450" y1="76" x2="620" y2="104" marker-end="url(#aa)"/><rect class="n-info" x="0" y="108" width="240" height="60" rx="4"/><text class="t-sm mid" x="120" y="130">scheduler restart</text><text class="t-xs mid" x="120" y="150">అదే key → dedupe</text><rect class="n-good" x="258" y="108" width="234" height="60" rx="4"/><text class="t-sm mid" x="375" y="130">ఇద్దరు workers</text><text class="t-xs mid" x="375" y="150">అదే key → ఒక్క ఫలితమే</text><rect class="n-soft" x="510" y="108" width="240" height="60" rx="4"/><text class="t-sm mid" x="630" y="130">job లోపల</text><text class="t-xs mid" x="630" y="150">అదే key → ఒక్క email</text><rect class="n-dark" x="0" y="186" width="750" height="68" rx="4"/><text class="t-w-sm mid" x="375" y="210">ఈ key <tspan class="t-acc">సమయం నుంచి</tspan> వస్తుంది, <tspan class="t-acc">యాదృచ్ఛికత నుంచి కాదు</tspan>.</text><text class="t-w-sm mid" x="375" y="234">అందుకే దాన్ని ఎవరైనా, ఎప్పుడైనా, ఎన్నిసార్లైనా మళ్ళీ లెక్కించగలరు —</text><text class="t-w-sm mid" x="375" y="250">మరియు అందరికీ అదే జవాబు వస్తుంది. అదే దాని మొత్తం శక్తి.</text></svg>

---

## 13. మొత్తం code · 2,000 ప్రయోగాలు · mutation testing

ఇప్పుడు అన్నీ ఒక చోట.

```javascript
const CatchUp = {
  all:    missed => missed,
  skip:   ()     => [],
  latest: missed => missed.slice(-1),
  within: ms => (missed, now) => missed.filter(t => now - t <= ms),
};

const Backoff = {
  fixed:  ms => () => ms,
  exp:    (base, cap) => n => Math.min(cap, base * 2 ** (n - 1)),
  jitter: (base, cap) => (n, rnd) =>
    Math.floor(rnd() * Math.min(cap, base * 2 ** (n - 1))),
};

class Scheduler {
  #sim; #rnd; #jobs = new Map(); #runs = new Map(); #ready = [];
  #fence = 0;
  #stats = { created: 0, claimed: 0, completed: 0, failed: 0, retried: 0,
             dead: 0, expired: 0, fenced: 0, deduped: 0, caughtUp: 0, skipped: 0 };

  constructor(sim, { rnd = Math.random, leaseMs = 30_000,
                     heartbeatMs = 10_000 } = {}) {
    this.#sim = sim; this.#rnd = rnd;
    this.leaseMs = leaseMs; this.heartbeatMs = heartbeatMs;
  }

  define(id, { every, jitterMs = 0, catchUp = CatchUp.latest,
               maxAttempts = 5, backoff = Backoff.jitter(1000, 60_000) }) {
    this.#jobs.set(id, { id, every, jitterMs, catchUp, maxAttempts, backoff,
                         lastScheduled: this.#sim.now });
    return this;
  }
```

**§11 — tick.** తప్పిపోయినవి లెక్కించి, job ని ఏమి చెయ్యాలో అడుగుతుంది:

```javascript
  tick() {
    const now = this.#sim.now;
    for (const job of this.#jobs.values()) {
      const missed = [];
      for (let t = job.lastScheduled + job.every; t <= now; t += job.every)
        missed.push(t);
      if (!missed.length) continue;
      job.lastScheduled = missed[missed.length - 1];
      const chosen = job.catchUp(missed, now);
      this.#stats.caughtUp += chosen.length;
      this.#stats.skipped  += missed.length - chosen.length;
      for (const at of chosen) this.#create(job, at);
    }
  }
```

**§12 — ఒకే key, మరియు §5 యొక్క jitter:**

```javascript
  #create(job, scheduledFor) {
    const key = `${job.id}@${scheduledFor}`;
    if (this.#runs.has(key)) { this.#stats.deduped++; return; }
    const jitter = job.jitterMs ? Math.floor(this.#rnd() * job.jitterMs) : 0;
    const run = { key, jobId: job.id, scheduledFor,
                  runAt: this.#sim.now + jitter,
                  attempt: 0, state: 'pending', fence: 0, lastBeat: 0 };
    this.#runs.set(key, run);
    this.#stats.created++;
    this.#sim.after(jitter, () => {
      if (run.state === 'pending') this.#ready.push(run);
    });
  }
```

**§8 — claim ఒక fence ఇస్తుంది:**

```javascript
  claim() {
    this.#reapExpired();
    while (this.#ready.length) {
      const run = this.#ready.shift();
      if (run.state !== 'pending') continue;
      run.state = 'running';
      run.attempt++;
      run.fence = ++this.#fence;               // ఈ ప్రయత్నానికి మాత్రమే
      run.lastBeat = this.#sim.now;
      this.#stats.claimed++;
      return { key: run.key, jobId: run.jobId, scheduledFor: run.scheduledFor,
               attempt: run.attempt, fence: run.fence };
    }
    return null;
  }

  heartbeat(key, fence) {
    const run = this.#runs.get(key);
    if (!run || run.fence !== fence || run.state !== 'running') return false;
    run.lastBeat = this.#sim.now;
    return true;
  }

  complete(key, fence, result) {
    const run = this.#runs.get(key);
    if (!run) return false;
    if (run.fence !== fence)     { this.#stats.fenced++; return false; }
    if (run.state !== 'running') { this.#stats.fenced++; return false; }
    run.state = 'done'; run.result = result;
    this.#stats.completed++;
    return true;
  }

  fail(key, fence, error) {
    const run = this.#runs.get(key);
    if (!run || run.fence !== fence || run.state !== 'running') {
      this.#stats.fenced++; return false;
    }
    this.#stats.failed++;
    return this.#reschedule(run, error);
  }
```

**§5 — backoff, మరియు వదిలేయాల్సిన చోటు:**

```javascript
  #reschedule(run, error) {
    const job = this.#jobs.get(run.jobId);
    if (run.attempt >= job.maxAttempts) {
      run.state = 'dead'; run.error = error;   // dead letter — మౌనంగా పోకూడదు
      this.#stats.dead++;
      return false;
    }
    run.state = 'pending';
    this.#stats.retried++;
    this.#sim.after(job.backoff(run.attempt, this.#rnd), () => {
      if (run.state === 'pending') this.#ready.push(run);
    });
    return true;
  }

  #reapExpired() {
    for (const run of this.#runs.values()) {
      if (run.state !== 'running') continue;
      if (this.#sim.now - run.lastBeat <= this.heartbeatMs + this.leaseMs) continue;
      this.#stats.expired++;
      // fence ని ఇక్కడ రద్దు చెయ్యనవసరం లేదు: తిరిగి పట్టుకున్నపుడు
      // ++this.#fence ఎప్పుడూ పెద్ద సంఖ్యే ఇస్తుంది, కాబట్టి పాత fence సరిపోదు.
      this.#reschedule(run, 'LEASE_EXPIRED');
    }
  }
```

**Scheduler పడిపోయి లేస్తే:**

```javascript
  checkpoint() {
    return [...this.#jobs.values()].map(j => [j.id, j.lastScheduled]);
  }
  restore(cp) {
    for (const [id, last] of cp) {
      const job = this.#jobs.get(id);
      if (job) job.lastScheduled = last;
    }
  }

  get(key)  { return this.#runs.get(key); }
  runs()    { return [...this.#runs.values()]; }

  stats() {
    let pending = 0, running = 0, done = 0, dead = 0;
    for (const r of this.#runs.values())
      r.state === 'pending' ? pending++ : r.state === 'running' ? running++
      : r.state === 'done'  ? done++    : dead++;
    return { ...this.#stats, pending, running, done, dead, total: this.#runs.size };
  }
}
```

### ఆరు నియమాలు

| # | నియమం | విరిగితే అర్థం |
|---|---|---|
| 1 | `pending + running + done + dead === total` | ఒక run మాయమైంది |
| 2 | ఒక్కో `(job, క్షణం)` ఒక్కసారే పూర్తవ్వాలి | job రెండుసార్లు జరిగింది |
| 3 | `attempt` ఎప్పుడూ `maxAttempts` దాటకూడదు | retry ఆగడం లేదు |
| 4 | అంగీకరించిన ఫలితం **ఇప్పటి** worker దే కావాలి | పాత worker గెలిచాడు (§8) |
| 5 | అదే fence తో రెండోసారి `complete` → తిరస్కరించాలి | job ప్రభావం రెండుసార్లు |
| 6 | **ఇద్దరు workers ఒకేసారి నడపడం ఒక ఉల్లంఘన కాదు** | ఇది ఆశించినది — కింద చూడండి |

<div class="box warn">
<div class="lab">నియమం 6 — నేను మొదట దీన్ని తప్పుగా రాశాను</div>
నా మొదటి fuzz test "ఒక run ని ఇద్దరు workers ఒకేసారి నడపకూడదు" అని పరీక్షించింది. అది <b>2,000 lo 1,848 ప్రయోగాల్లో విఫలమైంది</b>.<br><br>
కొన్ని గంటలు code ని వెతికాక నాకు అర్థమైంది — <b>code తప్పు కాదు, నియమమే తప్పు.</b><br><br>
ఆగిపోయిన worker ని ఆపడం అసాధ్యం (§8). కాబట్టి "ఇద్దరు ఒకేసారి నడపకూడదు" అనేది సాధించలేని లక్ష్యం. సాధించగలిగినది — <b>ఒక్క ఫలితమే అంగీకరించబడాలి</b>, అదే నియమం 4 మరియు 5.<br><br>
ఇది ఒక testing తప్పు కాదు, ఒక <b>అవగాహన</b> తప్పు. మరియు fuzz test దాన్ని బయటపెట్టింది.
</div>

```
2,000 యాదృచ్ఛిక ప్రయోగాలు · 2,10,118 runs తయారయ్యాయి
  నియమ ఉల్లంఘనలు: 0
  (ఏకకాలంలో ఇద్దరు workers నడిపినవి: 29,841 — ఇది ఆశించినది,
   ఎందుకంటే ఆగిపోయిన worker ని ఆపడం అసాధ్యం. ముఖ్యమైనది — ఒక్క ఫలితమే అంగీకరించబడాలి.)

ఏ దారులు నడిచాయి:
  created      2,10,118
  claimed      2,87,641
  completed    2,02,183
  failed          34,464
  retried         78,534
  dead             6,279
  expired         50,349
  fenced          74,132
  deduped         52,723
  caughtUp     2,62,841
  skipped      1,04,916
```

**29,841 సార్లు ఇద్దరు workers ఒకే run ని ఒకేసారి నడిపారు** — మరియు ప్రతిసారీ **సరిగ్గా ఒక ఫలితం** అంగీకరించబడింది. అదే మొత్తం design యొక్క రుజువు.

### "0 ఉల్లంఘనలు" అంటే ఏమీ కాదు — test విఫలం కాగలదని ముందు నిరూపించాలి

ఇది DD 24 §13 lo చేసిన పనే, కానీ ఈసారి **నాలుగు** మార్పులతో. ప్రతిసారీ ఒక్క పంక్తి తీసేసి, fuzz పట్టుకుంటుందా అని చూశాను:

```
మార్పు లేని code : 0/400 విఫలం

  fence పరీక్ష తీసేస్తే (complete lo)        → 152/400 విఫలం
     ఉదా: 89567ms: j1@80712 — రద్దైన worker (fence 204) ఫలితం గెలిచింది,
          ఇప్పటిది fence 225
  dedupe తీసేస్తే (#create lo)               → 367/400 విఫలం
     ఉదా: 10915ms: j0@8080 రెండుసార్లు పూర్తయింది
  state పరీక్ష తీసేస్తే (complete lo)        → 370/400 విఫలం
     ఉదా: 3953ms: j3@2614 — అదే worker రెండోసారి రాయగలిగాడు
  backoff తీసేసి వెంటనే మళ్ళీ ప్రయత్నిస్తే   →   0/400 విఫలం
```

మొదటి మూడు పట్టుబడ్డాయి. **నాలుగోది పట్టుబడలేదు** — మరియు అది ఒక లోపం కాదు.

<div class="box good">
<div class="lab">Backoff ఎందుకు పట్టుబడలేదు — మరియు అది ఏమి నేర్పుతుంది</div>
Backoff తీసేసి వెంటనే retry చేస్తే, ఫలితాలు <b>ఇంకా సరైనవే</b>. ప్రతి job సరిగ్గా ఒకసారి పూర్తవుతుంది. ఏ నియమమూ విరగదు.<br><br>
ఎందుకంటే <b>backoff ఒక సరి-తప్పు లక్షణం కాదు, అది ఒక భారపు లక్షణం</b>. దాని విలువ §4 పట్టికలో ఉంది (1,840 వృథా పిలుపులు), fuzz test lo కాదు.<br><br>
<b>రెండు రకాల లక్షణాలకి రెండు రకాల రుజువులు కావాలి:</b><br>
• సరి-తప్పు లక్షణాలు → నియమాలు + fuzz<br>
• భారం/వేగం లక్షణాలు → కొలతలు<br><br>
ఒకదాన్ని ఇంకొకదానితో పరీక్షించడానికి ప్రయత్నిస్తే, ఒకటి తప్పుగా "సరే" అంటుంది.
</div>

<div class="box bad">
<div class="lab">మరియు ఒక దండగ పంక్తిని mutation testing బయటపెట్టింది</div>
నేను మొదట <code>#reapExpired</code> lo <code>run.fence = 0;</code> అని రాశాను — "పాత worker ఇక రాయలేడు" అని.<br><br>
దాన్ని తీసేసి పరీక్షిస్తే <b>0/400 విఫలం</b>. అంటే ఆ పంక్తి <b>ఏమీ చేయడం లేదు</b>.<br><br>
కారణం: తిరిగి పట్టుకున్నప్పుడు <code>++this.#fence</code> ఎప్పుడూ <b>ఇంతకుముందు కంటే పెద్ద</b> సంఖ్య ఇస్తుంది. కాబట్టి పాత worker యొక్క fence ఎప్పటికీ సరిపోదు — మధ్యలో దాన్ని 0 చేసినా చేయకపోయినా.<br><br>
<b>కాబట్టి దాన్ని తీసేశాను.</b> "జాగ్రత్త కోసం" అని ఉంచిన code, నిజానికి ఏమీ చేయనిది, చదివేవాడిని తప్పుదారి పట్టిస్తుంది — అది అవసరం అని అతను అనుకుంటాడు.
</div>

### దశల నుంచి ఇక్కడికి — ఏమి చేరింది

| ఎక్కడ | ఏమి జోడించాం | ఏమి బాగుపడింది |
|---|---|---|
| §3 | `tick`, retry | jobs నడుస్తాయి |
| §5 | `Backoff.jitter` | వృథా పిలుపులు 1,840 → **708** |
| §5 | `jitterMs` (షెడ్యూల్ పరచడం) | వృథా **708 → 0**, ఉప్పెన 500 → **13** |
| §8 | `heartbeat` | duplicates **16.4% → 0%**, కోలుకోవడం 59.7 s → **3 s** |
| §8 | `fence` | పాత ఫలితం గెలవడం **2.65% → 0%** |
| §11 | `CatchUp` విలువలు | తప్పుడు పని 12,840 → **0**, పోయిన పని 1,560 → **0** |
| §12 | `jobId@scheduledFor` | restart కి 52,723 సార్లు dedupe |
| §13 | `dead` స్థితి | విఫలమైనవి మౌనంగా పోవు |

---

# Part 6 — Interview lo

---

## 14. ఇదంతా 45 నిమిషాల్లో ఎలా చెప్పాలి

| నిమిషాలు | ఏమి చెయ్యాలి |
|---|---|
| 0–4 | Queue కీ scheduler కీ తేడా. **మూడు ప్రశ్నలు** (ఎప్పుడు మళ్ళీ, ఎవరిది, తప్పిపోతే ఏమి) — ఇదే మీ ప్రణాళిక |
| 4–8 | §2 ప్రశ్నలు. **"Exactly-once execution అసాధ్యం, exactly-once effect సాధ్యం"** — ఇక్కడే చెప్పండి |
| 8–13 | `tick` + retry రాయండి. సులభం, త్వరగా దాటండి |
| 13–21 | **మొదటి విరుపు.** "అందరూ `0 * * * *` రాస్తారు" — backoff **ఏమీ ఆదా చేయదు** అని చూపించండి. jitter, తర్వాత షెడ్యూల్ పరచడం |
| 21–30 | **రెండో విరుపు.** Lease యొక్క రెండు వైపుల నష్టం. heartbeat. తర్వాత **"worker చావలేదు, ఆగిపోయాడు"** → fence |
| 30–37 | **మూడో విరుపు.** నాలుగు job రకాలు board మీద రాసి, ఒకే విధానం అందరికీ ఎందుకు పని చేయదో చూపించండి |
| 37–42 | `(jobId, scheduledFor)` — మూడు సమస్యలూ ఒకే key తో ఎలా కలుస్తాయి |
| 42–45 | ఆరు నియమాలు, మరియు **"నియమం 6 ని నేను మొదట తప్పుగా రాశాను"** |

### ఏమి తప్పక చెప్పాలి

1. **Exactly-once execution అసాధ్యం; exactly-once effect సాధ్యం.** ఇది ఒక్క వాక్యం, మరియు ఇది మీ మొత్తం సమాధానాన్ని వేరే స్థాయిలో ఉంచుతుంది.
2. **Backoff ఎదురుచూపుని పెంచుతుంది, ఎదురుచూసేవాళ్ళని విడదీయదు.** Jitter లేని backoff synchronized clients కి దాదాపు వ్యర్థం.
3. **Lease "పని ఎంతసేపు" అని కొలవకూడదు, "worker బతికున్నాడా" అని కొలవాలి.**
4. **Worker చావడం కంటే ఆగిపోవడం ప్రమాదకరం** — చచ్చినవాడు తిరిగి రాడు, ఆగినవాడు తిరిగి వస్తాడు.
5. **Catch-up ఒక business నిర్ణయం.** Scheduler దాన్ని తీసుకోకూడదు, అడగాలి.

### ఏమి వదిలేయాలి

- Cron వ్యక్తీకరణ (`* * * * *`) ని parse చేయడం — అది ఒక string parsing పని, design పని కాదు
- Heap vs sorted list — ఒక వాక్యంలో చెప్పి ముందుకి వెళ్ళండి
- Worker ఎలా jobs తెచ్చుకుంటాడు (poll vs push) — అడిగితే మాత్రమే
- DAG dependencies — అది వేరే problem (§16)

---

## 15. నోటితో చెప్పాల్సిన English script

> "A queue delivers each item once. A scheduler delivers the *same* job over and over, on a promise you made in advance. That difference creates three questions a queue never has: when do I retry, who owns a running job, and what do I do about runs I missed while I was down. I'll build around those three."

> "First, one thing I want to state up front: **exactly-once execution is not achievable**. A worker that's paused — GC, VM migration — isn't dead and isn't reachable, so I can't stop it. What *is* achievable is exactly-once **effect**: two workers may run, but only one result is ever accepted. That shapes everything else."

> "Retry first. Here's the thing people miss: in a real system nearly every cron entry is `0 * * * *`, because nobody writes 'seventeen minutes past'. So all your jobs start on the same millisecond. I measured 500 synchronized jobs against a downstream that handles sixty at a time. Fixed one-second retry: 2,340 attempts, 1,840 of them wasted. Exponential backoff: **the same 2,340 and the same 1,840** — not one call saved — but it took 183 seconds instead of 8. **Backoff increases the wait; it doesn't separate the waiters.** Full jitter cuts the waste to 708. But the real fix is upstream: jitter the *schedule*, not just the retry. That takes it to 500 attempts and **zero waste**, at the cost of finishing by 12:01 instead of 12:00:08."

> "Second, ownership. A worker takes a job and disappears — someone else has to pick it up, but when? A lease answers that, and choosing its length is a trap. With job durations that have a heavy tail — mine were 80% under a second but 3% up to thirty — a two-second lease made **16.4% of jobs run on two workers at once**, because the slow ones kept outliving the lease. A sixty-second lease fixed that but left a crashed job stalled for **59.7 seconds**. Both directions hurt."

> "The fix is realizing the lease is measuring the wrong thing. It measures how long the work takes; I want to know whether the worker is alive. So the worker heartbeats, and the lease runs from the last heartbeat. Now a two-second lease gives zero duplicates *and* three-second recovery."

> "But heartbeats have a hole, and it's the interesting one. A worker that's **paused** isn't dead. Its heartbeats stop, its lease expires, a second worker starts — and then the first one wakes up, with no idea any time passed, and writes its result. I measured that: **2.65% of jobs ended up holding the older worker's result**, and worse, the legitimate worker then got rejected because the run was already marked done. Two failures, no errors logged. The fix is a fencing token: every claim gets a strictly increasing number, and a write has to present the current one."

> "Third, missed runs. Scheduler down six hours, jobs every five minutes — 14,400 missed. I expected a thundering-herd problem, measured it, and it drained in twelve minutes. **That wasn't the problem.** The problem is correctness. Run them all and a daily-digest job sends 2,880 duplicate emails. Skip them all and you lose 1,440 subscription billing periods — real money, silently. Run just the last one and you still lose the billing. **There is no correct global policy**, because the right answer depends on what the job *means*. So the policy is a value the job declares — all, skip, latest, or within-a-window — and the scheduler just calls it."

> "Everything ties together through one key: `(jobId, scheduledFor)`. It comes from the schedule, not from a clock read or a UUID, so anyone can recompute it and get the same answer. That's what makes restart-dedupe work, what identifies a run across two workers, and what the job itself can hand to an email service as an idempotency key."

> "For testing, six invariants and a fuzz — 2,000 randomized runs, zero violations. Two things worth mentioning. My first invariant was 'never two workers on one run', and it failed 1,848 of 2,000 trials. The code was right; **the invariant was wrong** — that's the thing I just said is impossible. And I mutation-tested: removing the fence check fails 152 of 400, removing dedupe fails 367. Removing backoff fails **zero** — because backoff is a load property, not a correctness property, so it belongs in the measurement, not the invariant. That same exercise also showed me a line I'd written 'to be safe' was doing nothing, so I deleted it."

---

## 16. Follow-ups — DAGs, ప్రాధాన్యత, సమయ మండలాలు

**"ఒక job ఇంకొకటి పూర్తయ్యాక నడవాలంటే?"**

అప్పుడు ఇది scheduler కాదు, **workflow engine** (Airflow, Temporal). తేడా: scheduler కి "ఎప్పుడు" తెలుసు; workflow engine కి "**దేని తర్వాత**" తెలుసు. Dependencies ఉంటే మీకు ఒక DAG, ఒక topological order, మరియు "ఒక node విఫలమైతే దాని కింది nodes ని ఏమి చెయ్యాలి" అనే కొత్త ప్రశ్న వస్తాయి. ఇది ఈ doc lo చూసిన దాని కంటే పెద్ద problem — interview lo దీన్ని **స్పష్టంగా పరిధి బయట** పెట్టండి.

**"కొన్ని jobs ముఖ్యమైనవి అయితే?"**

`#ready` ని ఒక priority queue చేయండి. కానీ ఒక హెచ్చరిక: ప్రాధాన్యత ఉంటే **starvation** వస్తుంది — తక్కువ ప్రాధాన్యత jobs ఎప్పటికీ నడవకపోవచ్చు. పరిష్కారం: ఎదురుచూసిన సమయాన్ని బట్టి ప్రాధాన్యత పెంచడం (aging), లేదా ప్రతి స్థాయికీ కొంత భాగం కేటాయించడం. DD 22 §11 lo `LevelQueue` ఇదే ఆలోచన.

**"రోజూ ఉదయం 9 గంటలకి" — ఎవరి 9 గంటలు?**

ఇది ఊహించిన దాని కంటే చాలా కష్టం. `every: DAY` అనేది **తప్పు** — ఎందుకంటే DST lo ఒక రోజు 23 గంటలు, ఇంకొకటి 25 గంటలు. సరైన పద్ధతి: తదుపరి సమయాన్ని **స్థానిక క్యాలెండర్‌లో** లెక్కించి, తర్వాత UTC కి మార్చడం. మరియు రెండు నిజమైన అంచు పరిస్థితులు: DST వసంతంలో **2:30 AM ఉండదు** (ఆ job ని వదిలేయాలా, 3:00 కి నడపాలా?), శరత్తులో **2:30 AM రెండుసార్లు వస్తుంది** (రెండుసార్లు నడపాలా?). మీ `scheduledFor` UTC lo ఉంటే §12 key ఈ రెండింటినీ సరిగ్గా నిర్వహిస్తుంది.

**"ఇది ఒక్క machine మీద నడుస్తోంది — అది పడిపోతే?"**

`#runs` మరియు `lastScheduled` ఒక database lo ఉండాలి, memory lo కాదు. `claim()` ఒక atomic update కావాలి (`UPDATE ... WHERE state='pending' RETURNING`), లేకపోతే ఇద్దరు schedulers ఒకే run ని ఇస్తారు. `fence` ఒక database sequence కావచ్చు. **ఈ doc lo logic ఏదీ మారదు** — కేవలం `Map` స్థానంలో ఒక table వస్తుంది.

**"Dead letter lo పడిన jobs ని ఏమి చెయ్యాలి?"**

అవి **మౌనంగా పోకూడదు** — అదే `dead` స్థితి ఉనికికి కారణం. ఒక alert, ఒక పేజీ, మరియు వాటిని తిరిగి నడిపే ఒక button. 2,000 ప్రయోగాల్లో 6,279 runs dead letter కి వెళ్ళాయి; అవి కనిపించకపోతే అది 6,279 మౌన వైఫల్యాలు.

---

## 17. ఏమి నేర్చుకున్నాం

**1. Exactly-once execution అసాధ్యం; exactly-once effect సాధ్యం.** ఆగిపోయిన worker మన అదుపులో లేడు — కానీ అతను రాయబోయేటప్పుడు మన తలుపు తడతాడు, మరియు అక్కడ మనం "నువ్వు పాతవాడివి" అని చెప్పగలం. 29,841 సార్లు ఇద్దరు workers ఒకే పని చేశారు; ప్రతిసారీ ఒక్క ఫలితమే నిల్వ అయింది.

**2. Backoff ఎదురుచూపుని పెంచుతుంది, ఎదురుచూసేవాళ్ళని విడదీయదు.** Synchronized clients కి ఘాతీయ backoff **సరిగ్గా అదే వృథా** చేసింది — 1,840 పిలుపులు — కేవలం 22 రెట్లు ఎక్కువ సమయంలో. యాదృచ్ఛికతే వాళ్ళని విడదీస్తుంది.

**3. Retry ని మెరుగుపరచడం కంటే retry అవసరాన్ని తొలగించడం మంచిది.** Jitter వృథాని 1,840 నుంచి 708 కి తెచ్చింది. షెడ్యూల్‌నే పరచడం దాన్ని **0** కి తెచ్చింది.

**4. Worker చావడం కంటే ఆగిపోవడం ప్రమాదకరం.** చచ్చినవాడు తిరిగి రాడు. ఆగినవాడు తిరిగి వచ్చి, తనకు ఏమీ తెలియకుండా, సరైన ఫలితాన్ని తుడిచేస్తాడు — 2.65% సార్లు.

**5. ఒక limit ని ఎంచుకునేటప్పుడు సగటు చూడకూడదు, తోక చూడాలి.** Lease ని సగటు వ్యవధి బట్టి ఎంచుకుంటే 16.4% jobs రెండుసార్లు నడిచాయి. తోకే limit ని నిర్ణయిస్తుంది.

**6. కొన్ని ప్రశ్నలకి engineering సమాధానం ఉండదు.** "తప్పిపోయిన runs ని ఏమి చెయ్యాలి" అనేది బిల్లింగ్ కి `all`, health check కి `skip`. Scheduler ఆ నిర్ణయం తీసుకోకూడదు — అది ఆ నిర్ణయాన్ని **మోసుకెళ్ళాలి**.

**7. సమయం నుంచి వచ్చే key యాదృచ్ఛికత నుంచి వచ్చే key కంటే బలమైనది.** `(jobId, scheduledFor)` ని ఎవరైనా, ఎప్పుడైనా, ఎన్నిసార్లైనా మళ్ళీ లెక్కించగలరు — మరియు అందరికీ అదే జవాబు వస్తుంది. `Date.now()` లేదా UUID అలా కాదు.

**8. నియమం తప్పయితే code ని ఎంత వెతికినా ఏమీ దొరకదు.** నా fuzz 2,000 lo 1,848 సార్లు విఫలమైంది — ఎందుకంటే నేను **సాధించలేని దాన్ని** పరీక్షిస్తున్నాను. Test విఫలమైనప్పుడు మొదట అడగాల్సిన ప్రశ్న "code lo ఏమి తప్పు" కాదు, **"నేను అడుగుతున్నది సరైనదేనా"**.

**9. రెండు రకాల లక్షణాలకి రెండు రకాల రుజువులు.** Backoff ని తీసేసినా fuzz **0/400** చూపించింది — ఎందుకంటే backoff ఒక భారపు లక్షణం, సరి-తప్పు లక్షణం కాదు. దాని విలువ §4 పట్టికలో ఉంది. Mutation testing ఒక పంక్తి **నిజంగా ఏమీ చేయడం లేదని** కూడా చూపించింది, మరియు నేను దాన్ని తీసేశాను.

<div class="box good">
<div class="lab">ఈ doc నుంచి ఒక్క వాక్యం గుర్తుపెట్టుకోవాలంటే</div>
<b>Scheduler యొక్క ప్రతి కష్టమైన సమస్య "సమయం గడిచింది, కానీ ఎవరికి ఎంత గడిచిందో వేరు" అనే ఒక్క నిజం నుంచే పుడుతుంది.</b><br><br>
అందరూ ఒకే క్షణం అనుకుంటారు (§4). Worker కి సమయం ఆగిపోయింది, మనకు గడిచింది (§8). Scheduler కి 6 గంటలు గడిచాయి, jobs కి అది ఇంకా రాత్రి 2 గంటలే (§10).<br><br>
అందుకే పరిష్కారాలన్నీ ఒకే ఆకారంలో ఉంటాయి: <b>సమయాన్ని ఒక అంచనాగా కాకుండా, ఒక <i>నమోదైన వాస్తవంగా</i> మార్చడం</b> — <code>scheduledFor</code>, <code>lastBeat</code>, <code>fence</code>. మూడూ "ఇది ఎప్పుడు నిజమైంది" అని రాసి పెట్టుకునే మార్గాలే.
</div>
