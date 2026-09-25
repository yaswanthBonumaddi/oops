# Deep Dives — తెలుగులో System Design

**44 deep dives · 985 పేజీలు · ప్రతి సంఖ్యా నిజంగా `node` lo run చేసినది.**

ఇవి interview గైడ్లు కాదు. ప్రతి doc ఒకే పని చేస్తుంది:

> ఒక **సహజమైన design** తో మొదలుపెట్టి, అది **విరిగే వరకు నడిపి**, ఆ విరుపుని **ఒక సంఖ్యగా** రాయడం. ఆపై సరిచేసి, ఆ సరిదిద్దుబాటు నిజంగా పనిచేసిందని **నిరూపించడం**.

తేడా ఆ సంఖ్యల్లో ఉంది. *"Last-write-wins డేటా పోగొడుతుంది"* అనేది అందరికీ తెలుసు — *"ఒక్కో cart కి **సరిగ్గా 2.00 చేర్పులు** పోయాయి"* అనేది ఎవరైనా నిజంగా నడిపారని చెబుతుంది.

---

## ప్రతి doc lo ఏమి ఉంటుంది

| భాగం | ఏమిటి |
|---|---|
| **Scale లెక్క** | ఏది సమస్య *కాదు* అని ముందే తేల్చడం — తరచుగా అందరూ చర్చించేదే సమస్య కాదు |
| **Clarifying questions** | ప్రతిదాని వెనక ఉన్న *ఉద్దేశం* తో — ఏ జవాబు ఏ design ని మారుస్తుందో |
| **మూడు విరుపులు** | ఒక్కొక్కటీ నడిపి, విరిగిన output తో సహా చూపించినవి |
| **మొత్తం code + fuzz** | వేల యాదృచ్ఛిక ప్రయోగాలు, పేరున్న నియమాలతో |
| **Mutation testing** | ప్రతి "0 ఉల్లంఘనలు" తర్వాత — *ఈ పరీక్ష అసలు విఫలం కాగలదా?* |
| **45-నిమిషాల ప్రణాళిక** | ఏ నిమిషంలో ఏ సంఖ్య చెప్పాలో |
| **English script** | Interview lo నోటితో చెప్పాల్సినది, మక్కికి మక్కి |

<br>

**ఒక నియమం ఈ 44 docs నీ కలిపి ఉంచుతుంది:** ప్రతి "0 ఉల్లంఘనలు" తర్వాత ఒక mutation test ఉంటుంది — ఒక load-bearing పంక్తిని తీసేసి, fuzz *నిజంగా* విఫలమవుతుందా అని చూడటం. బతికిన ప్రతి mutation కీ ఒక వివరణ ఉంది, దాచడం లేదు.

---

## LLD Deep Dives — 26 problems

| # | విషయం | పే. | విరుపు | Links |
|---|---|---|---|---|
| 01 | **Parking Lot** | 27 | ఐదు lines తో మొదలు · ఒకే సీటు ఇద్దరికి ఇచ్చే race | [md](LLD_Deep_01_ParkingLot_Telugu.md) · [pdf](pdfs/LLD_Deep_01_ParkingLot_Telugu.pdf) |
| 02 | **LRU & LFU Cache** | 26 | ఒక్క read **183 ms → 1 ms** · LRU మరియు LFU వేర్వేరు trade-offs | [md](LLD_Deep_02_Cache_Telugu.md) · [pdf](pdfs/LLD_Deep_02_Cache_Telugu.pdf) |
| 03 | **Rate Limiter** | 22 | నాలుగు algorithms, ఒకే దాడి, నాలుగు వేర్వేరు జవాబులు | [md](LLD_Deep_03_RateLimiter_Telugu.md) · [pdf](pdfs/LLD_Deep_03_RateLimiter_Telugu.pdf) |
| 04 | **Movie Ticket Booking** | 22 | ఒక modelling తప్పు, ఒక race, మరియు **payment ఖాళీ** | [md](LLD_Deep_04_BookMyShow_Telugu.md) · [pdf](pdfs/LLD_Deep_04_BookMyShow_Telugu.pdf) |
| 05 | **Splitwise** | 20 | తప్పు data ఆకారం ఎంచుకుంటే వలయాలని చేతితో విడదీస్తారు | [md](LLD_Deep_05_Splitwise_Telugu.md) · [pdf](pdfs/LLD_Deep_05_Splitwise_Telugu.pdf) |
| 06 | **Elevator System** | 34 | Design రెండుసార్లు విరుగుతుంది — విరిగిన output తో సహా | [md](LLD_Deep_06_Elevator_Telugu.md) · [pdf](pdfs/LLD_Deep_06_Elevator_Telugu.pdf) |
| 07 | **Pub-Sub System** | 20 | ఒక subscriber విఫలమైతే **మిగతా అందరూ** కోల్పోతారు | [md](LLD_Deep_07_PubSub_Telugu.md) · [pdf](pdfs/LLD_Deep_07_PubSub_Telugu.pdf) |
| 08 | **HashMap** | 22 | ఒక విలువ ఇంకొకదాన్ని మింగేస్తుంది — **మొదటి ఉదాహరణలోనే** | [md](LLD_Deep_08_HashMap_Telugu.md) · [pdf](pdfs/LLD_Deep_08_HashMap_Telugu.pdf) |
| 09 | **Chess** | 24 | ఒక bishop కి **తొమ్మిది కదలికలు, సున్నా చెల్లుబాటు** | [md](LLD_Deep_09_Chess_Telugu.md) · [pdf](pdfs/LLD_Deep_09_Chess_Telugu.pdf) |
| 10 | **Meeting Scheduler** | 22 | ఒక standup **52 rows** అవుతుంది | [md](LLD_Deep_10_MeetingScheduler_Telugu.md) · [pdf](pdfs/LLD_Deep_10_MeetingScheduler_Telugu.pdf) |
| 11 | **Swiggy / Zomato** | 29 | ₹250 → ₹300 · 2,000 searches కి **8.5 సెకన్లు** | [md](LLD_Deep_11_FoodDelivery_Telugu.md) · [pdf](pdfs/LLD_Deep_11_FoodDelivery_Telugu.pdf) |
| 12 | **In-Memory File System** | 27 | `ls` **4,620 ms** — ఎప్పుడూ 20 పేర్లే ఇచ్చినా | [md](LLD_Deep_12_FileSystem_Telugu.md) · [pdf](pdfs/LLD_Deep_12_FileSystem_Telugu.pdf) |
| 13 | **Leaderboard** | 24 | ఒక్క read **51 ms** · ఒక update **2,00,560 మూలకాలు** కదిలిస్తుంది | [md](LLD_Deep_13_Leaderboard_Telugu.md) · [pdf](pdfs/LLD_Deep_13_Leaderboard_Telugu.pdf) |
| 14 | **Text Editor with Undo** | 26 | ఒక్క keystroke **20 లక్షల అక్షరాలు** కాపీ · history **4.8 GB** | [md](LLD_Deep_14_TextEditor_Telugu.md) · [pdf](pdfs/LLD_Deep_14_TextEditor_Telugu.pdf) |
| 15 | **Library Management System** | 23 | ఒక కొత్త ప్రతి కొంటే ఒకరి loan **మాయం** | [md](LLD_Deep_15_Library_Telugu.md) · [pdf](pdfs/LLD_Deep_15_Library_Telugu.pdf) |
| 16 | **Tic-Tac-Toe** | 24 | ఒక ఎత్తుకి **1.8 లక్షల గడులు** · ఆపై N×N, ఆపై Connect-4 | [md](LLD_Deep_16_TicTacToe_Telugu.md) · [pdf](pdfs/LLD_Deep_16_TicTacToe_Telugu.pdf) |
| 17 | **Autocomplete** | 23 | నిజమైన **2,34,428-పదాల** నిఘంటువు · "hel" → helbeh, helcoid | [md](LLD_Deep_17_Autocomplete_Telugu.md) · [pdf](pdfs/LLD_Deep_17_Autocomplete_Telugu.pdf) |
| 18 | **Snake & Ladder** | 21 | ఆటగాడు పాము నోట్లో · ఆపై **103వ గడి** · ఆపై అనంత వలయం | [md](LLD_Deep_18_SnakeLadder_Telugu.md) · [pdf](pdfs/LLD_Deep_18_SnakeLadder_Telugu.pdf) |
| 19 | **Hit Counter** | 22 | 10,000 keys కి **447 GB** · పాఠ్యపుస్తక జవాబు ఒకే window కే | [md](LLD_Deep_19_HitCounter_Telugu.md) · [pdf](pdfs/LLD_Deep_19_HitCounter_Telugu.pdf) |
| 20 | **Vending Machine** | 23 | చెల్లుబాటు అయ్యే అమ్మకాన్ని **2.14%** సార్లు తిరస్కరిస్తుంది | [md](LLD_Deep_20_VendingMachine_Telugu.md) · [pdf](pdfs/LLD_Deep_20_VendingMachine_Telugu.pdf) |
| 21 | **ATM** | 25 | ₹3,000 తీసేసి **నోట్లు ఇవ్వదు** · ఆపై ₹3,000 కి ₹9,000 | [md](LLD_Deep_21_ATM_Telugu.md) · [pdf](pdfs/LLD_Deep_21_ATM_Telugu.pdf) |
| 22 | **Logging Framework** | 23 | p99 **1 ms → 21 ms** · ఒక ఘటనలో **47% ERROR logs** మాయం | [md](LLD_Deep_22_Logging_Telugu.md) · [pdf](pdfs/LLD_Deep_22_Logging_Telugu.pdf) |
| 23 | **Shopping Cart** | 23 | తీసేసిన వస్తువు login అప్పుడు **తిరిగి వస్తుంది** · ₹850 → ₹920 | [md](LLD_Deep_23_ShoppingCart_Telugu.md) · [pdf](pdfs/LLD_Deep_23_ShoppingCart_Telugu.pdf) |
| 24 | **Connection Pool** | 33 | కేవలం **9 లీక్‌లు 52% requests** ని చంపుతాయి | [md](LLD_Deep_24_ConnectionPool_Telugu.md) · [pdf](pdfs/LLD_Deep_24_ConnectionPool_Telugu.pdf) |
| 25 | **Job Scheduler** | 29 | **16.4% jobs రెండుసార్లు** · సరైన ఒక్క catch-up విధానం లేదు | [md](LLD_Deep_25_JobScheduler_Telugu.md) · [pdf](pdfs/LLD_Deep_25_JobScheduler_Telugu.pdf) |
| 26 | **Thread Pool** | 27 | మీరు max 50 రాస్తారు, **మీకు 2 వస్తాయి**, p99 **19.9 సె** | [md](LLD_Deep_26_ThreadPool_Telugu.md) · [pdf](pdfs/LLD_Deep_26_ThreadPool_Telugu.pdf) |

---

## HLD Deep Dives — 18 problems

| # | విషయం | పే. | విరుపు | Links |
|---|---|---|---|---|
| 01 | **URL Shortener** | 27 | Collision సమస్యే కాదు — **keys 100% ఊహించగలగడం** సమస్య | [md](HLD_Deep_01_URLShortener_Telugu.md) · [pdf](pdfs/HLD_Deep_01_URLShortener_Telugu.pdf) |
| 02 | **Distributed Rate Limiter** | 23 | GET-ఆపై-INCR మీ పరిమితి 100 ని **1,058** చేస్తుంది | [md](HLD_Deep_02_RateLimiter_Telugu.md) · [pdf](pdfs/HLD_Deep_02_RateLimiter_Telugu.pdf) |
| 03 | **News Feed** | 20 | ఒక celebrity post మిగతా అందరినీ **3.3 నిమిషాలు** ఆపుతుంది | [md](HLD_Deep_03_NewsFeed_Telugu.md) · [pdf](pdfs/HLD_Deep_03_NewsFeed_Telugu.pdf) |
| 04 | **Chat System** | 19 | ఆ పచ్చ చుక్క నిజమైన messages కంటే **2,400 రెట్లు** traffic | [md](HLD_Deep_04_ChatSystem_Telugu.md) · [pdf](pdfs/HLD_Deep_04_ChatSystem_Telugu.pdf) |
| 05 | **Notification System** | 16 | పరిమితి లేకపోతే **78.4% users** notifications ఆపేస్తారు | [md](HLD_Deep_05_Notifications_Telugu.md) · [pdf](pdfs/HLD_Deep_05_Notifications_Telugu.pdf) |
| 06 | **Video Streaming** | 17 | 2-గంటల video కి **5.6 రోజులు** · workers 128× పెంచినా మారదు | [md](HLD_Deep_06_VideoStreaming_Telugu.md) · [pdf](pdfs/HLD_Deep_06_VideoStreaming_Telugu.pdf) |
| 07 | **Ride Sharing** | 17 | సెకనుకి **2.5 లక్షల writes**, అందులో **99.97% అనవసరం** | [md](HLD_Deep_07_RideSharing_Telugu.md) · [pdf](pdfs/HLD_Deep_07_RideSharing_Telugu.pdf) |
| 08 | **Typeahead** | 17 | Personalization cache hit rate **95.1% → 0.2%** | [md](HLD_Deep_08_Typeahead_Telugu.md) · [pdf](pdfs/HLD_Deep_08_Typeahead_Telugu.pdf) |
| 09 | **Payment System & Ledger** | 20 | ఆరు అడుగుల చెల్లింపులో **1,135 చిక్కుకుపోతాయి** | [md](HLD_Deep_09_Payments_Telugu.md) · [pdf](pdfs/HLD_Deep_09_Payments_Telugu.pdf) |
| 10 | **Distributed Job Scheduler** | 18 | **23.5% jobs అర్ధరాత్రి** · కాలం ప్రకారం shard = **2 కోట్ల రెట్లు** | [md](HLD_Deep_10_JobScheduler_Telugu.md) · [pdf](pdfs/HLD_Deep_10_JobScheduler_Telugu.pdf) |
| 11 | **Web Crawler** | 19 | బడ్జెట్‌లో **99.6%** మూడు trap domains మీద | [md](HLD_Deep_11_WebCrawler_Telugu.md) · [pdf](pdfs/HLD_Deep_11_WebCrawler_Telugu.pdf) |
| 12 | **Google Docs** | 20 | **60 lo 0 sessions** ఒకేలా ముగిశాయి — 0 ms ఆలస్యంతో కూడా | [md](HLD_Deep_12_GoogleDocs_Telugu.md) · [pdf](pdfs/HLD_Deep_12_GoogleDocs_Telugu.pdf) |
| 13 | **Kafka** | 21 | Sequential disk కేవలం **1.62×** · batching **945×** | [md](HLD_Deep_13_Kafka_Telugu.md) · [pdf](pdfs/HLD_Deep_13_Kafka_Telugu.pdf) |
| 14 | **Dynamo** | 19 | Consistent hashing → **34 రెట్ల** అసమతుల్యత · LWW 3 lo 2 పోగొడుతుంది | [md](HLD_Deep_14_Dynamo_Telugu.md) · [pdf](pdfs/HLD_Deep_14_Dynamo_Telugu.pdf) |
| 15 | **Dropbox** | 19 | మొదట్లో **ఒక్క byte** చేర్చితే **100%** మళ్ళీ upload | [md](HLD_Deep_15_Dropbox_Telugu.md) · [pdf](pdfs/HLD_Deep_15_Dropbox_Telugu.pdf) |
| 16 | **Ticket Booking** | 16 | 20,000 సీట్లకి **60,000 టికెట్లు** · retry storm **99.1% వృథా** | [md](HLD_Deep_16_TicketBooking_Telugu.md) · [pdf](pdfs/HLD_Deep_16_TicketBooking_Telugu.pdf) |
| 17 | **Ad Click Aggregation** | 17 | 0.5% retry = **0.5% అదనపు బిల్లు** · ప్రత్యేక సంఖ్యలు **405% ఉబ్బు** | [md](HLD_Deep_17_AdClickAggregation_Telugu.md) · [pdf](pdfs/HLD_Deep_17_AdClickAggregation_Telugu.pdf) |
| 18 | **Metrics** | 19 | ఒక్క label: **6 machines → 567** · p99 ల సగటు **85% తక్కువ** | [md](HLD_Deep_18_Metrics_Telugu.md) · [pdf](pdfs/HLD_Deep_18_Metrics_Telugu.pdf) |

---

## ఇతర docs

Deep dives కాకుండా, ఈ repo lo అంశాల వారీగా గైడ్లు ఉన్నాయి:

**Core CS** — [DBMS](DBMS_Telugu.md) · [OS](OS_Telugu.md) · [CN](CN_Telugu.md) · [COA](COA_Telugu.md) · [OOPS](OOPS_Telugu.md) · [Security](Security_Telugu.md) · [Software Engineering](SoftwareEngineering_Telugu.md)

**DSA** — [Foundations](DSA_00_Foundations_Telugu.md) · [Patterns](DSA_Patterns_Telugu.md) · [Arrays & Strings](DSA_01_Arrays_Strings_Telugu.md) · [Two Pointers & Sliding Window](DSA_02_TwoPtr_SlidingWindow_Matrix_Telugu.md) · [Hashing & Intervals](DSA_03_Hashing_Intervals_Telugu.md) · [Stack & Linked List](DSA_04_Stack_LinkedList_Telugu.md) · [Trees](DSA_05_Trees_Telugu.md) · [Graphs & Trie](DSA_06_Graphs_Trie_Telugu.md) · [Backtracking](DSA_07_Backtracking_DivideConquer_Telugu.md) · [Binary Search & Heap](DSA_08_BinarySearch_Heap_Telugu.md) · [Greedy, Bit, Math](DSA_09_Greedy_Bit_Math_Telugu.md) · [DP](DSA_10_DynamicProgramming_Telugu.md)

**Languages & Frameworks** — [JavaScript](JavaScript_Telugu.md) · [TypeScript](TypeScript_Telugu.md) · [React](React_Telugu.md) · [Next.js](NextJS_Telugu.md) · [Go](GO_Telugu.md) · [Linux & Git](Linux_Git_Telugu.md)

**System Design (సంక్షిప్తం)** — [LLD](LLD_Telugu.md) · [HLD](HLD_Telugu.md) · [LLD problems](LLD_Design_Problems_Telugu.md) · [HLD problems](HLD_Design_Problems_Telugu.md) · [LLD in Go](LLD_Go_Telugu.md) · [HLD in Go](HLD_Go_Telugu.md) · [System Design in Go](SystemDesign_Go_Telugu.md)

**Interview prep** — [Infosys](Infosys_Interview_Prep_Telugu.md) · [Frontend MNC](Frontend_Engineer_MNC_Telugu.md)

---

## PDF లు ఎలా తయారవుతాయి

అన్ని PDF లు [`pdfs/`](pdfs/) lo ఉన్నాయి. ఒక doc ని మళ్ళీ build చేయాలంటే:

```bash
node .pdftool/build.mjs HLD_Deep_13_Kafka_Telugu.md
```

బొమ్మలని (inline SVG) ధృవీకరించడానికి:

```bash
python3 .pdftool/check-figures.py HLD_Deep_13_Kafka_Telugu.md
```

---

## భాష గురించి

ఈ docs "Tenglish" lo ఉన్నాయి — **తెలుగు వచనం + English సాంకేతిక పదాలు**. `cache`, `partition`, `quorum`, `watermark`, `user` — ఇవన్నీ English lo ఉంటాయి, ఎందుకంటే తెలుగు engineers వాటిని అలాగే మాట్లాడతారు. వివరణ, తర్కం, మరియు "ఇది ఎందుకు విరిగింది" — అవి తెలుగులో.

---

<div align="center">

**కొలిచే వరకు, మీకు తెలిసిందనుకున్నది నిజంగా తెలుసా అని మీకు తెలియదు.**

</div>
