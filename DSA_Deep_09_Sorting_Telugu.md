<!-- style: editorial -->
<!-- footer: Sorting · DSA అడుగు అడుగునా · తెలుగు గైడ్ -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">D09</div>
<div class="kicker">DSA Deep Dive 09 · మీరు రాసేది sort కాదు — comparator</div>
<div class="rule"></div>
<div class="cover-title">Sorting</div>
<div class="lede">Sorting ని ఎవరూ మళ్ళీ రాయరు. <code>.sort()</code> అని రాసి ముందుకి వెళ్తారు. మరియు అక్కడే మూడు bugs దాక్కుంటాయి — <b>ఒక్కటీ crash కాకుండా</b>.</div>
<div class="sub">మొదటిది — <code>.sort()</code> comparator లేకుండా, మరియు మీ test data <b>సరిగ్గా 0.0%</b> విఫలం చేస్తుంది. రెండోది — <code>? 1 : -1</code> అనే comparator <b>21,000 runs lo ఒక్క array నీ తప్పుగా sort చేయలేదు</b>, మరియు స్థిరత్వాన్ని <b>100%</b> నాశనం చేసింది. మూడోది — median-of-three quicksort ని sorted input నుంచి కాపాడుతుంది, మరియు నకళ్ళ దగ్గర అది <b>2,001×</b> నెమ్మది.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · DSA Deep Dive 09</span></div>
</div>

## ఈ doc ఎలా చదవాలి

పక్కన editor తెరిచి కలిసి రాయండి. ఇక్కడి **ప్రతి output, ప్రతి సంఖ్యా నిజంగా `node` lo run చేసినదే** — §10 యొక్క 2,001× ని నేను **వెతుకుతూ కనుగొనలేదు**; నా స్వంత fuzz కి పని-పరిమితి కలిపినప్పుడు **నా code lo** అది బయటపడింది.

<div class="box warn">
<div class="lab">Sorting ఈ series lo ప్రత్యేకం: algorithm మీరు రాయరు</div>
<b>Deep 01–08</b> lo bug మీ algorithm lo ఉంటుంది. ఇక్కడ algorithm <b>V8 రాసింది</b>, మరియు అది సరైనది.<br><br>
మీరు రాసేది <b>ఒకే ఒక్క function</b> — comparator. మరియు మూడు విరుపుల్లో <b>రెండు</b> అందులోనే ఉన్నాయి.<br><br>
కాబట్టి ఇక్కడ ప్రశ్న "ఏ sorting algorithm" కాదు — అది interview lo అడిగే <i>ఆఖరి</i> ప్రశ్న. ప్రశ్న: <b>"మీ comparator ఒక చెల్లుబాటు అయ్యే క్రమాన్ని నిర్వచిస్తోందా?"</b>
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం**

1. Comparator ఒక ఒప్పందం
2. అడగాల్సిన ప్రశ్నలు

**Part 2 — మొదటి విరుపు: comparator లేకపోవడం**

3. Step — `.sort()` అని రాయడం
4. **మొదటి విరుపు** — 0.0% తప్పు, ఆపై 63.3%
5. Step — `a > b` ఎందుకు ఏమీ చేయదు

**Part 3 — రెండో విరుపు: స్థిరత్వం**

6. Step — రెండు keys ప్రకారం sort
7. **రెండో విరుపు** — 21,000 runs, 0 తప్పులు, 100% నష్టం
8. Step — `byKeys`

**Part 4 — మూడో విరుపు: partition**

9. Step — quicksort మరియు pivot
10. **మూడో విరుపు** — median-of-three నకళ్ళని చూడదు

**Part 5 — నిరూపణ మరియు ప్రదర్శన**

11. మొత్తం code
12. 24,000 cases · mutation testing
13. n log n ని దాటడం
14. Follow-ups — external sort, radix, TimSort
15. ఏమి నేర్చుకున్నాం

---

# Part 1 — సమస్యని నిజంగా అర్థం చేసుకోవడం

---

## 1. Comparator ఒక ఒప్పందం

`arr.sort(cmp)` అంటే *"cmp ప్రకారం sort చెయ్యి"* కాదు. అది ఒక **ఒప్పందం**:

<div class="box good">
<div class="lab">Comparator తప్పక పాటించాల్సినవి</div>
<b>1.</b> <code>cmp(a, b) &lt; 0</code> అయితే <code>a</code> ముందు · <code>&gt; 0</code> అయితే <code>b</code> ముందు · <code>= 0</code> అయితే <b>సమానం</b><br>
<b>2. వ్యతిరేకత</b> — <code>cmp(a,b)</code> మరియు <code>cmp(b,a)</code> వ్యతిరేక గుర్తులు కలిగి ఉండాలి<br>
<b>3. సంక్రమణ</b> — <code>a &lt; b</code> మరియు <code>b &lt; c</code> అయితే <code>a &lt; c</code><br>
<b>4. సమానత్వం నిజమైనది</b> — <code>cmp(a,b) = 0</code> అయితే <code>a</code>, <code>b</code> ఏ క్రమంలోనైనా సరే<br><br>
మీరు ఈ ఒప్పందాన్ని ఉల్లంఘిస్తే — spec ప్రకారం ఫలితం <b>undefined</b>. Engine crash కాదు, హెచ్చరించదు, ఒక "సరైనదిలా కనిపించే" జవాబు ఇస్తుంది.<br><br>
<b>§7 lo చూస్తాం: ఒప్పందం ఉల్లంఘించినా 21,000 runs lo ఒక్క array కూడా "sort కాలేదు" అనిపించలేదు.</b>
</div>

---

## 2. అడగాల్సిన ప్రశ్నలు

| ప్రశ్న | ఎందుకు అడుగుతున్నాం |
|---|---|
| **స్థిరత్వం** కావాలా? | §7 — రెండు keys ప్రకారం sort చేస్తుంటే *తప్పక* కావాలి |
| సమాన మూలకాలు **ఉంటాయా**? | ఉంటే §10 — partition ఎంపిక O(n log n) మరియు O(n²) మధ్య తేడా |
| **ఏ రకం** విలువలు — సంఖ్యలా, strings ఆ? | §4 — `.sort()` అన్నిటినీ string గా చూస్తుంది |
| Keys ఒక **చిన్న పూర్ణాంక పరిధిలో** ఉన్నాయా? | §13 — అయితే n log n పరిమితిని దాటొచ్చు |
| Data **memory lo పడుతుందా**? | పడకపోతే ఇది సమస్యే వేరు — §14 |
| **పూర్తి** sort నిజంగా కావాలా? | Top-K కావాలంటే Deep 06 — `sort` 289 ms, heap 4.1 ms |
| Data ఇప్పటికే **దాదాపు sorted** ఆ? | అయితే TimSort O(n) — కానీ మీ చేతి quicksort O(n²) |

<div class="box warn">
<div class="lab">ఒక ప్రశ్న అడిగితే మీరు దీన్ని నిజంగా నడిపారని తెలుస్తుంది</div>
<b>"ఈ sort స్థిరమైనదా, మరియు మీకు స్థిరత్వం అవసరమా?"</b><br><br>
ఎందుకంటే జవాబు <b>ప్రతిచోటా</b> వేరు: JavaScript <code>Array.sort</code> ES2019 నుంచి స్థిరం · Java <code>Arrays.sort</code> objects కి స్థిరం, <b>primitives కి కాదు</b> · C++ <code>std::sort</code> <b>స్థిరం కాదు</b>, <code>std::stable_sort</code> వేరే function · Python <code>sorted</code> స్థిరం.<br><br>
మరియు §7 lo చూస్తాం — <b>స్థిరమైన sort వాడినా</b> మీ comparator తప్పైతే స్థిరత్వం పోతుంది.
</div>

---

# Part 2 — మొదటి విరుపు: comparator లేకపోవడం

---

## 3. Step — `.sort()` అని రాయడం

```javascript
const scores = [3, 1, 4, 1, 5, 9, 2, 6];
console.log(scores.sort());        // [1, 1, 2, 3, 4, 5, 6, 9]  ✓
```

సరైనదే. ఒక పరీక్ష రాద్దాం:

```javascript
const a = [7, 2, 9, 4, 1];
console.log(a.sort());             // [1, 2, 4, 7, 9]  ✓
```

అదీ సరైనదే. **ఇంకో అయిదు ఉదాహరణలు రాసినా అన్నీ నెగ్గుతాయి.**

---

## 4. మొదటి విరుపు — 0.0% తప్పు, ఆపై 63.3%

```
default .sort() — comparator లేకుండా

  విలువల పరిధి | 5,000 arrays lo తప్పు |      %
  -------------+-----------------------+--------
           0–9 |                     0 |   0.0%
          0–99 |                  2,948 |  59.0%
         0–999 |                  3,166 |  63.3%
   0–10 లక్షలు |                  3,237 |  64.7%
```

<div class="box bad">
<div class="lab">ఒక అంకె విలువలు — <b>సరిగ్గా సున్నా</b> వైఫల్యాలు</div>
<code>.sort()</code> ప్రతి మూలకాన్నీ <b>string గా మార్చి</b> నిఘంటువు క్రమంలో పేరుస్తుంది.<br><br>
ఒక అంకె సంఖ్యలకి <b>నిఘంటువు క్రమం = సంఖ్యా క్రమం</b>. <code>"3" &lt; "7"</code> మరియు <code>3 &lt; 7</code> — ఒకటే.<br><br>
కాబట్టి <b>మీ test data ఈ bug ని చూపించలేదు</b>. §3 lo నేను ఏ ఉదాహరణ రాసినా నెగ్గేది. రెండంకెల సంఖ్య ఒక్కటి వచ్చిన క్షణం —<br><br>
<code>[10, 9, 1, 100, 25].sort()</code> → <b><code>[1, 10, 100, 25, 9]</code></b>
</div>

<div class="box warn">
<div class="lab">"మీ code ని అనుమానించే ముందు మీ data ని అనుమానించండి"</div>
<b>Deep 03</b> lo ఒక-అంకె జతలు hash key bug ని దాచాయి · <b>Deep 05</b> lo దట్టమైన graphs <code>n−1</code> mutation ని దాచాయి · <b>Deep 06</b> lo n ≤ 12 arrays పని-పరిమితిని నిరుపయోగం చేశాయి · <b>Deep 08</b> lo 1 లేని నాణెం వ్యవస్థలే లేవు.<br><br>
<b>ఇది అయిదోసారి.</b> మరియు ప్రతిసారీ ఆకారం ఒకటే: <b>సరైన code కి మరియు తప్పు code కి ఒకే జవాబు ఇచ్చే data</b>.<br><br>
కాబట్టి ఒక పరీక్ష రాసిన తర్వాత అడగండి: <b>"ఈ data ఏ తప్పుని *చూపించలేదు*?"</b>
</div>

---

## 5. Step — `a > b` ఎందుకు ఏమీ చేయదు

సరే, comparator ఇద్దాం:

```javascript
arr.sort((a, b) => a > b);         // ← చాలామంది రాసేది
```

```
boolean comparator  arr.sort((a,b) => a > b)

     n | 2,000 arrays lo తప్పుగా sort అయినవి |      %
  -----+--------------------------------------+--------
     4 |                                 1,926 |  96.3%
     8 |                                 2,000 | 100.0%
    32 |                                 2,000 | 100.0%
  1000 |                                 2,000 | 100.0%
```

<div class="box bad">
<div class="lab">5,000 arrays lo <b>5,000 సార్లు output = input</b> — అంటే 100%</div>
<code>a > b</code> ఇచ్చేది <code>true</code> లేదా <code>false</code>. Sort అది సంఖ్యగా మార్చుతుంది: <b>1 లేదా 0</b>.<br><br>
<b>ఋణాత్మక సంఖ్య ఎప్పుడూ రాదు.</b> కాబట్టి sort కి <i>"a, b కంటే చిన్నది"</i> అని తెలిసే మార్గమే లేదు — అది ప్రతి జతనీ "సమానం లేదా పెద్దది" అని చూస్తుంది.<br><br>
ఫలితం: <b>array అస్సలు కదలదు.</b> Crash లేదు, హెచ్చరిక లేదు — మీ data యథాతథంగా తిరిగి వస్తుంది, మరియు మీరు దాన్ని "sorted" అనుకుంటారు.<br><br>
<b>సరైనది: <code>(a, b) => a - b</code></b> — ఇది ముగ్గురినీ ఇస్తుంది: ఋణాత్మకం, సున్నా, ధనాత్మకం.
</div>

---

# Part 3 — రెండో విరుపు: స్థిరత్వం

---

## 6. Step — రెండు keys ప్రకారం sort

ఒక leaderboard: **score ప్రకారం (ఎక్కువ ముందు), సమాన scores lo పేరు ప్రకారం.**

సహజమైన పద్ధతి — **రెండు దశలు**: ముందు పేరు ప్రకారం, ఆపై score ప్రకారం. Sort స్థిరమైతే సమాన scores lo పేర్ల క్రమం **నిలిచిపోతుంది**.

```javascript
const byName = [...players].sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
return byName.sort((a, b) => a.score < b.score ? 1 : -1);   // ఎక్కువ score ముందు
```

`Array.sort` ES2019 నుంచి స్థిరమైనది. కాబట్టి ఇది పనిచేయాలి.

---

## 7. రెండో విరుపు — 21,000 runs, 0 తప్పులు, 100% నష్టం

```
Leaderboard — ముందు పేరు ప్రకారం, ఆపై score ప్రకారం

  ఆశించినది (a.score - b.score)   |  వచ్చినది (? 1 : -1)
  --------------------------------+---------------------------
  90  Anil                      < |  90  Eshwar
  90  Charan                      |  90  Charan
  90  Eshwar                    < |  90  Anil
  85  Bhavani                   < |  85  Geetha
  85  Deepa                       |  85  Deepa
  85  Geetha                    < |  85  Bhavani
  70  Farhan                    < |  70  Harsha
  70  Harsha                    < |  70  Farhan

  8 వరుసల్లో 6 తప్పు స్థానంలో. కానీ scores మాత్రం సరిగ్గానే పేరుకున్నాయి.
```

```
comparator  (a,b) => a.score > b.score ? 1 : -1   — 0 ఎప్పుడూ ఇవ్వదు

     n | ప్రత్యేక scores | 3,000 runs: sort తప్పు | స్థిరత్వం పోయినవి
  -----+-----------------+------------------------+------------------
    10 |              10 |                      0 |            2,999
    10 |               3 |                      0 |            3,000
    50 |              50 |                      0 |            3,000
    50 |               5 |                      0 |            3,000
   200 |             200 |                      0 |            3,000
   200 |              10 |                      0 |            3,000
  1000 |              20 |                      0 |            3,000

  అదే data, comparator  (a,b) => a.score - b.score :
   200 |              10 |                      0 |                0
  1000 |              20 |                      0 |                0
```

<div class="box bad">
<div class="lab"><b>21,000 runs · sort తప్పైంది సున్నా సార్లు · స్థిరత్వం పోయింది 100%</b></div>
మీరు రాసే సహజమైన పరీక్ష — <i>"ఫలితం sort అయిందా?"</i> — ఈ bug ని <b>ఎప్పటికీ</b> పట్టుకోదు. 21,000 ప్రయత్నాల్లో ఒక్కసారీ కాదు.<br><br>
కారణం: <code>? 1 : -1</code> lo <b>0 ఎప్పుడూ రాదు</b>. సమాన scores ఉన్న రెండు మూలకాలకి comparator <i>"రెండోది ముందు"</i> అని చెబుతుంది — <b>ఏ క్రమంలో అడిగినా</b>. అంటే <code>cmp(a,b) = −1</code> మరియు <code>cmp(b,a) = −1</code>.<br><br>
అది §1 యొక్క <b>వ్యతిరేకత</b> నియమాన్ని ఉల్లంఘిస్తుంది. Spec ప్రకారం ఫలితం undefined. V8 lo array పాడవదు, మూలకాలు పోవు — <b>కేవలం సమాన మూలకాల క్రమం అర్థరహితం అవుతుంది</b>.<br><br>
<b>మరియు అదే మీరు రెండు-దశల sort lo ఆధారపడుతున్న ఒక్క విషయం.</b>
</div>

<div class="box warn">
<div class="lab">స్థిరమైన sort + అస్థిరమైన comparator = అస్థిరమైన ఫలితం</div>
<code>Array.sort</code> స్థిరమైనది అనేది <b>నిజం</b>. కానీ "స్థిరం" అంటే <i>"comparator సమానం అన్న మూలకాల క్రమం నిలుపుతాను"</i> అని అర్థం.<br><br>
మీ comparator <b>ఏదీ సమానం అనకపోతే</b> — నిలపడానికి ఏమీ లేదు.<br><br>
<b>స్థిరత్వం sort యొక్క లక్షణం కాదు. అది sort మరియు comparator <i>కలిసి</i> ఇచ్చే లక్షణం.</b>
</div>

---

## 8. Step — `byKeys`

రెండు-దశల sort పని చేస్తుంది, కానీ ప్రతిసారీ ఆ ఒప్పందం గుర్తు పెట్టుకోవాలి. ఒక్క comparator lo రాయడం స్పష్టం:

```javascript
function byKeys(keys) {                          // keys: [{ get, desc }]
  return (a, b) => {
    for (const k of keys) {
      const x = k.get(a), y = k.get(b);
      if (x < y) return k.desc ? 1 : -1;
      if (x > y) return k.desc ? -1 : 1;
    }
    return 0;          // ← ఇది *తప్పక* 0. §7 యొక్క bug సరిగ్గా ఇక్కడే పుడుతుంది.
  };
}
```

`byKeys([{get: p => p.score, desc: true}, {get: p => p.name}])` — ఒకే pass, స్థిరత్వం మీద ఆధారపడదు, మరియు చదివితే **ఏ క్రమం కావాలో స్పష్టంగా** తెలుస్తుంది.

§12 lo ఒక నియమం ఈ రెండు దారులూ **ఒకే ఫలితం** ఇస్తాయని ప్రతి run lo తనిఖీ చేస్తుంది.

---

# Part 4 — మూడో విరుపు: partition

---

## 9. Step — quicksort మరియు pivot

పాఠ్యపుస్తక quicksort — **చివరి మూలకమే pivot**:

```
quicksort (చివరి మూలకం pivot) · పోలికల సంఖ్య

       n | యాదృచ్ఛిక input | ఇప్పటికే sorted input |  రెట్లు
  -------+-----------------+-----------------------+---------
     100 |             584 |                 4,950 |    8.5×
     500 |           5,138 |               1,24,750 |   24.3×
    2000 |          24,691 |              19,99,000 |   81.0×
    5000 |          68,152 |            1,24,97,500 |  183.4×
```

```
quicksort · ఇప్పటికే sorted input · default stack

       n | ఫలితం
  -------+---------------------------------------
    1000 | సరే · recursion లోతు 999
    2000 | సరే · recursion లోతు 1999
    4000 | RangeError: Maximum call stack size exceeded
```

<div class="box bad">
<div class="lab">ఇప్పటికే sorted array → recursion లోతు <b>n−1</b> → n = 4,000 దగ్గర <b>crash</b></div>
Sorted input lo చివరి మూలకం ఎప్పుడూ <b>అతి పెద్దది</b>. కాబట్టి ప్రతి partition <code>n−1</code> మరియు <code>0</code> గా విడుతుంది — ఇది quicksort కాదు, <b>selection sort</b>.<br><br>
మరియు అది నెమ్మదవ్వడం కంటే <b>ముందే</b> crash అవుతుంది: n = 4,000 దగ్గర stack నిండిపోతుంది. <b>Deep 04</b> lo ఇదే RangeError, అదే కారణం.<br><br>
<b>పరిష్కారం రెండు ముక్కలు:</b> <b>(1)</b> median-of-three pivot — <code>lo</code>, <code>mid</code>, <code>hi</code> ల మధ్యస్థాన్ని తీసుకోవడం · <b>(2)</b> చిన్న భాగాన్ని మాత్రమే recursion, పెద్దదాన్ని loop lo — దీనితో లోతు <b>ఎప్పుడూ ≤ log₂n</b>.
</div>

రెండూ కలిపితే sorted input **0.96× n log n** కి వస్తుంది. సమస్య పరిష్కారం అయినట్టే.

---

## 10. మూడో విరుపు — median-of-three నకళ్ళని చూడదు

§12 కోసం fuzz రాసినప్పుడు ఒక **పని-పరిమితి** పెట్టాను — *"quickSort పోలికలు ≤ 3·n·⌈log₂(n+1)⌉ + 20"*. ఆపై నా స్వంత code మీద నడిపాను:

```
n = 2,000 · పోలికల సంఖ్య   (n·log₂n = 21,932)

  input ఆకారం        | Lomuto (2-భాగాలు) | ÷ n log n | మూడు-భాగాలు | ÷ n log n
  -------------------+-------------------+-----------+--------------+-----------
  యాదృచ్ఛికం         |            23,219 |     1.06× |       24,801 |     1.13×
  ఇప్పటికే sorted    |            21,033 |     0.96× |       37,976 |     1.73×
  నకళ్ళు (0–3)       |          5,11,747 |    23.33× |        4,996 |     0.23×
  అన్నీ ఒకే విలువ    |        20,04,997 |    91.42× |        2,003 |     0.09×
```

<div class="box bad">
<div class="lab">Median-of-three <b>sorted</b> input ని సరిచేసింది. <b>నకళ్ళని</b> అది చూడనే లేదు.</div>
Lomuto partition lo షరతు <code>cmp(arr[j], p) &lt; 0</code>. <b>సమానమైన ప్రతి మూలకం కుడి వైపుకి</b> వెళ్తుంది.<br><br>
కాబట్టి అన్నీ ఒకే విలువ ఉన్న array lo pivot ఏదైనా సరే — ఎడమ భాగం <b>ఎప్పుడూ ఖాళీ</b>. Median-of-three మంచి pivot ఎంచుకుంటుంది, మరియు <b>అది ఏమీ మార్చదు</b>.<br><br>
<b>91.42× — మరియు ఇది నా code, నేను "సరిచేశాను" అనుకున్న తర్వాత.</b>
</div>

```
అన్నీ ఒకే విలువ · n పెరిగితే

       n | Lomuto పోలికలు | మూడు-భాగాలు | రెట్లు
  -------+----------------+--------------+--------
     250 |         31,872 |          253 |   126×
     500 |       1,26,247 |          503 |   251×
    1000 |       5,02,497 |        1,003 |   501×
    2000 |      20,04,997 |        2,003 |  1001×
    4000 |      80,09,997 |        4,003 |  2001×
```

<div class="box good">
<div class="lab">రెట్లు <b>ప్రతిసారీ రెట్టింపు</b> అవుతున్నాయి — అదే O(n²) యొక్క సంతకం</div>
126 → 251 → 501 → 1001 → 2001. n రెట్టింపైతే నిష్పత్తి రెట్టింపు.<br><br>
అంటే ఒకటి <b>n తో</b> పెరుగుతోంది, ఇంకొకటి <b>n² తో</b>. ఒక్క సంఖ్య ఇది చెప్పదు — <b>వరుస</b> చెబుతుంది.<br><br>
<b>పరిష్కారం — మూడు-భాగాల partition (Dutch national flag):</b> <code>&lt; p</code>, <code>= p</code>, <code>&gt; p</code>. సమానమైనవన్నీ <b>మధ్యలో ఉండిపోతాయి, recursion కి వెళ్ళవు</b>. అన్నీ ఒకటే అయితే <b>ఒక్క pass</b> చాలు — 4,003 పోలికలు, అంటే <b>n తో సమానం</b>.
</div>

<div class="box warn">
<div class="lab">ఖరీదు: మూడు-భాగాలు sorted input మీద <b>1.73×</b>, రెండు-భాగాలు 0.96×</div>
దాచడం లేదు — మూడు-భాగాల partition <b>ఉచితం కాదు</b>. Sorted input మీద ఇది దాదాపు <b>రెండింతలు</b> పోలికలు చేస్తుంది, యాదృచ్ఛిక input మీద 1.06× కి బదులు 1.13×.<br><br>
మీరు కొంటున్నది: <b>నకళ్ళ దగ్గర 91× నుంచి 0.09× కి</b>.<br><br>
<b>మీ data lo నకళ్ళు లేవని *నిజంగా* తెలిస్తే</b> రెండు-భాగాలే మంచిది. తెలియకపోతే — 1.73× ఒక చౌక బీమా.
</div>

---

# Part 5 — నిరూపణ మరియు ప్రదర్శన

---

## 11. మొత్తం code

```javascript
// మూడు భాగాలు: [lo,lt) < p · [lt,i) = p · (gt,hi] > p  → నకళ్ళకి రక్ష
let lt = lo, i = lo, gt = hi;
while (i <= gt) {
  const d = cmp(arr[i], p);
  if (d < 0)      { [arr[lt], arr[i]] = [arr[i], arr[lt]]; lt++; i++; }
  else if (d > 0) { [arr[i], arr[gt]] = [arr[gt], arr[i]]; gt--; }
  else i++;                    // సమానం — అది ఇక్కడే ఉండిపోతుంది, recursion కి వెళ్ళదు
}
// చిన్న భాగాన్ని recursion, పెద్దదాన్ని loop → recursion లోతు ≤ log₂n
if (lt - lo < hi - gt) { go(lo, lt - 1); lo = gt + 1; }
else                   { go(gt + 1, hi); hi = lt - 1; }
```

```javascript
// స్థిరమైన merge sort — `<=` వల్లే స్థిరం
if (cmp(L[i], R[j]) <= 0) out.push(L[i++]);   // సమానమైతే *ఎడమది* ముందు
else                      out.push(R[j++]);
```

ఆ `<=` ని `<` గా మార్చితే ఫలితం ఇంకా **sort అయే ఉంటుంది** — స్థిరత్వం మాత్రమే పోతుంది. §12 lo అది **120/120** విఫలం, ఎందుకంటే ఒక నియమం సరిగ్గా అదే అడుగుతుంది.

---

## 12. 24,000 cases · mutation testing

పదకొండు నియమాలు: **mergeSort = built-in**, **quickSort = built-in**, **input మారలేదు**, **mergeSort పోలికలు ≤ n⌈log₂n⌉**, **quickSort పోలికలు ≤ 3n⌈log₂(n+1)⌉+20**, **countingSort = built-in**, **ప్రతి విలువ లెక్క అలాగే**, **mergeSort స్థిరం**, **objects sort అయ్యాయి**, **ఒక్క మూలకమూ పోలేదు**, **byKeys = రెండు-దశల స్థిర sort**, **byKeys సమానమైతే 0**.

```
300 runs · 12,000 arrays · 6,000 counting sorts · 6,000 object sorts
  నియమ ఉల్లంఘనలు: 0

ఏ దారులు నడిచాయి:
  arrays           12,000
  objs              6,000
  counting          6,000
  dupHeavy          4,215
  presorted         2,430
  big (n ≥ 100)     6,174
  multiKey          6,000
```

```
==== mutation testing ====

  మార్పు లేని code                                           →   0/300 విఫలం
  merge lo `cmp(L[i],R[j]) <= 0` ని `< 0` గా                 → 120/120 విఫలం
      ఉదా: mergeSort స్థిరం కాదు: idx 28 ముందు 27
  mergeSort lo `mid = arr.length >> 1` ని `mid = 1` గా       → 120/120 విఫలం
      ఉదా: mergeSort 633 పోలికలు > పరిమితి 270 (n=45)
  quickSort lo median-of-three తీసేస్తే (చివరి మూలకమే pivot) → 120/120 విఫలం
      ఉదా: quickSort 38,216 పోలికలు > పరిమితి 7,391 (n=273)
  quickSort lo మూడు భాగాలకి బదులు రెండు భాగాలు               → 120/120 విఫలం
      ఉదా: quickSort 24,75,00,000 పోలికలు > పరిమితి 3,908 (n=162)
  quickSort lo చిన్న భాగాన్ని recursion చేసే ఎంపిక తీసేస్తే  →   0/120 విఫలం
  countingSort lo `cnt[v]++` ని `cnt[v] = 1` గా              → 120/120 విఫలం
      ఉదా: countingSort ≠ built-in · [9,9,13,2,9,11,13,6] → [0,1,2,3,4,5,6,7]
  countingSort lo `v <= maxV` ని `v < maxV` గా               → 120/120 విఫలం
      ఉదా: countingSort lo 15 : 6 → undefined
  byKeys lo `return 0` ని `return 1` గా  (§7 యొక్క bug)      → 120/120 విఫలం
      ఉదా: byKeys ≠ రెండు-దశల స్థిర sort · n=31
  byKeys lo keys క్రమాన్ని తిరగేస్తే                         → 120/120 విఫలం
```

<div class="box good">
<div class="lab">రెండు-భాగాల mutation <b>ముగియనే ముగియదు</b></div>
24.75 కోట్ల పోలికలు అనే సంఖ్య నిజమైనదే, కానీ అది <b>సహజంగా ఆగిన</b> run కాదు — నేను ఒక loop guard పెట్టాకే కొలవగలిగాను.<br><br>
కారణం: సమానమైనవన్నీ కుడి వైపుకి వెళ్తే, అన్నీ ఒకే విలువ ఉన్న array lo <code>lt = lo</code> మరియు <code>gt = lo−1</code> అవుతాయి. అప్పుడు <code>lo</code> <b>ముందుకు కదలదు</b>, మరియు <code>while (lo &lt; hi)</code> ఎప్పటికీ ఆగదు.<br><br>
<b>ఒక "కేవలం నెమ్మది" అనుకున్న మార్పు నిజానికి ఒక అనంత loop.</b> §10 యొక్క 91.42× ని Lomuto (<code>arr[i]</code> తో swap చేసేది) ఇస్తుంది; నా మూడు-భాగాల code నుంచి మూడో శాఖ తీసేస్తే అది నెమ్మది కాదు — అది hang.
</div>

<div class="box warn">
<div class="lab">బతికిన mutation — <b>"చిన్న భాగాన్ని recursion" తీసేసినా 0/120</b></div>
ఆ పంక్తి recursion <b>లోతు</b>ని కాపాడుతుంది. నా నియమాలు <b>పోలికలు</b> లెక్కపెడతాయి, లోతు కాదు — మరియు 400 మూలకాల array stack ని నింపదు.<br><br>
కాబట్టి కొలిచాను — n = 1,00,000 దగ్గర గరిష్ఠ లోతు:<br><br>
<table><tr><th>input ఆకారం</th><th>చిన్న భాగం recursion</th><th>ఎప్పుడూ ఎడమ భాగం</th></tr>
<tr><td>యాదృచ్ఛికం</td><td>11</td><td>21</td></tr>
<tr><td>sorted</td><td>14</td><td>16</td></tr>
<tr><td>reverse</td><td>14</td><td>27</td></tr>
<tr><td>నకళ్ళు 0–3</td><td>2</td><td>2</td></tr>
<tr><td>అన్నీ ఒకటే</td><td>1</td><td>1</td></tr></table><br>
తేడా ఉంది (11 vs 21), కానీ <b>crash కి వేలల్లో లోతు కావాలి</b>, మరియు నేను ప్రయత్నించిన ఏ ఆకారమూ దాన్ని దగ్గరకైనా తీసుకెళ్ళలేదు.<br><br>
<b>తీర్పు: median-of-three మరియు మూడు-భాగాల partition *కలిసి* ఆ పంక్తి కాపాడే సందర్భాన్ని ఇప్పటికే నివారిస్తున్నాయి.</b> అది రక్షణ కోసం ఉంది — నేను నిర్మించగలిగిన ఏ input మీదా అది భారం మోయడం లేదు. దాచడం కాదు; <b>నేను దాన్ని విరగ్గొట్టే input తయారు చేయలేకపోయాను</b>.
</div>

---

## 13. n log n ని దాటడం

పోలికల మీద ఆధారపడే ఏ sort అయినా **Ω(n log n)** — ఇది నిరూపితం. కానీ ఆ నిరూపణ *"పోలికలు మాత్రమే వాడితే"* అనే షరతు మీద ఆధారపడుతుంది.

విలువలు చిన్న పూర్ణాంక పరిధిలో ఉంటే — **పోలికలే అక్కర్లేదు**:

```
పనితీరు · n = 20,00,000 · విలువలు 0–999

  .sort((a,b)=>a-b) :   251 ms
  counting sort     :    15 ms   → 16.7× వేగం
  ఒకే ఫలితమా? true
```

<div class="box good">
<div class="lab">Ω(n log n) ని "దాటడం" లేదు — <b>దాని షరతు నుంచి బయటపడటం</b></div>
Counting sort ఏ రెండు మూలకాలనీ పోల్చదు. అది <b>లెక్కపెడుతుంది</b>: విలువ 7 ఎన్నిసార్లు వచ్చిందో ఒక array lo పెట్టి, ఆపై 0 నుంచి 999 వరకు నడుస్తుంది.<br><br>
<b>ఖరీదు: <code>maxV + 1</code> పరిమాణం ఉన్న ఒక array.</b> విలువలు 0–999 అయితే అది 1,000 గళ్ళు — చౌక. విలువలు 0–10⁹ అయితే అది <b>4 GB</b>, మరియు ఇది పనికిరాదు.<br><br>
కాబట్టి §2 యొక్క ప్రశ్న: <b>"keys ఒక చిన్న పూర్ణాంక పరిధిలో ఉన్నాయా?"</b> — అవును అంటే 16.7×, కాదంటే ఈ ఆలోచనే వదిలేయండి.
</div>

---

## 14. Follow-ups — external sort, radix, TimSort

**"Data RAM lo పట్టకపోతే?"**

**External merge sort**: data ని RAM lo పట్టే ముక్కలుగా చదివి, ఒక్కో ముక్కనీ sort చేసి డిస్క్‌కి రాసి, ఆపై అన్ని ముక్కలనీ ఒక k-way merge (Deep 06 యొక్క heap) తో కలపడం. **నేను దీన్ని కొలవలేదు** — HLD Deep 15 lo డిస్క్ vs RAM సంఖ్యలు ఉన్నాయి.

**"Radix sort counting sort కంటే మంచిదా?"**

Radix sort counting sort ని **ఒక్కో అంకె మీద** పదే పదే నడుపుతుంది, కాబట్టి `maxV` పెద్దదైనా memory పేలదు. ఖరీదు: `d` passes, `d` = అంకెల సంఖ్య. **ప్రతి pass స్థిరమైనదై తీరాలి** — లేకపోతే మొత్తం విరుగుతుంది, మరియు ఇది §7 యొక్క పాఠమే మళ్ళీ. **నేను radix sort ని కొలవలేదు.**

**"V8 ఏ algorithm వాడుతుంది?"**

**TimSort** — merge sort మరియు insertion sort కలయిక. ఇది ఇప్పటికే sorted ముక్కలని ("runs") గుర్తించి వాడుకుంటుంది, కాబట్టి దాదాపు sorted data మీద **O(n)**. మరియు ఇది **స్థిరమైనది** — §7 ఆధారపడేది సరిగ్గా దీని మీదే.

**"అన్నీ ఒకటే అనే array నిజ జీవితంలో వస్తుందా?"**

§10 lo అది ఒక తీవ్రమైన సందర్భం. కానీ **నకళ్ళు (0–3)** వరుస — 23.33× — అది రోజువారీ: *"status ప్రకారం sort చెయ్యి"* (`pending`/`done`/`failed`), *"నక్షత్రాల ప్రకారం"* (1–5), *"విభాగం ప్రకారం"*. **కొన్ని ప్రత్యేక విలువలు, లక్షల rows** — అదే అత్యంత సాధారణ ఆకారం.

**"ఈ doc lo నేను ఏమి కొలవలేదు"**

మూడు: **external sort**, **radix sort**, మరియు **V8 యొక్క TimSort** — నేను నా స్వంత merge sort మరియు quicksort ని మాత్రమే కొలిచాను; §13 యొక్క 251 ms మాత్రం నిజమైన V8 sort.

---

## 15. ఏమి నేర్చుకున్నాం

**1. మీరు రాసేది sort కాదు — comparator.** మూడు విరుపుల్లో రెండు అందులోనే.

**2. `.sort()` comparator లేకుండా అన్నిటినీ string గా చూస్తుంది.** ఒక-అంకె data మీద **0.0% తప్పు**, నిజమైన data మీద **63.3%**.

**3. `(a, b) => a > b` array ని కదపదు.** 5,000 arrays lo **5,000 సార్లు** output = input. `a - b` రాయండి.

**4. `? 1 : -1` అనే comparator 21,000 runs lo ఒక్క array నీ తప్పుగా sort చేయలేదు** — మరియు స్థిరత్వాన్ని **100%** నాశనం చేసింది.

**5. స్థిరత్వం sort యొక్క లక్షణం కాదు.** అది sort **మరియు** comparator కలిసి ఇచ్చేది. `return 0` లేకపోతే నిలపడానికి ఏమీ లేదు.

**6. Sorted input quicksort ని నెమ్మది చేయదు — దాన్ని crash చేస్తుంది.** n = 4,000 దగ్గర `RangeError`, recursion లోతు n−1.

**7. Median-of-three sorted input ని సరిచేస్తుంది, నకళ్ళని చూడనే చూడదు.** అన్నీ ఒకే విలువ → **91.42×**, మరియు n రెట్టింపైతే నిష్పత్తి రెట్టింపు.

**8. మూడు-భాగాల partition ఉచితం కాదు** — sorted input మీద 0.96× నుంచి 1.73×. అది నకళ్ళ దగ్గర 91× కి కొన్న బీమా.

**9. Ω(n log n) ని దాటలేరు, కానీ దాని షరతు నుంచి బయటపడొచ్చు.** Counting sort **16.7×**, ఖరీదు `maxV+1` గళ్ళ array.

**10. ఒక-అంకె data ఏ తప్పునీ చూపించదు.** Deep 03, 05, 06, 08 — ఇది అయిదోసారి.

<div class="box good">
<div class="lab">ఈ doc నుంచి ఒక్క వాక్యం గుర్తుపెట్టుకోవాలంటే</div>
<b>తప్పు comparator sort ని విఫలం చేయదు — అది sort ని <i>అర్థరహితం</i> చేస్తుంది, మరియు ఫలితం sorted గానే కనిపిస్తుంది.</b><br><br>
§4 lo array కదలనే లేదు. §7 lo scores సరిగ్గా పేరుకున్నాయి, పేర్లు అర్థరహితం. §10 lo ఫలితం ఖచ్చితంగా సరైనది — <b>2,001× నెమ్మదిగా</b>.<br><br>
మూడూ "sort పనిచేసింది" అని చెబుతాయి. కాబట్టి <b>"sort అయిందా?"</b> అని అడగడం సరిపోదు. అడగండి: <b>సమానమైనవి ఏమయ్యాయి?</b> మరియు <b>ఎన్ని పోలికలు తీసుకుంది?</b>
</div>
