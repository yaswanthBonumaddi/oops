<!-- style: editorial -->
<!-- footer: LLD · పూర్తి తెలుగు గైడ్ · Patterns & Principles -->

<svg width="0" height="0" style="position:absolute">
<defs>
<marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#a9b0be"/></marker>
<marker id="aa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#e2653a"/></marker>
<marker id="ad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#17203a"/></marker>
<marker id="hollow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
<marker id="hollowd" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path d="M0,0 L12,6 L0,12 z" fill="#fff" stroke="#6f7889" stroke-width="1.2" stroke-dasharray="0"/></marker>
<marker id="dia" viewBox="0 0 14 10" refX="13" refY="5" markerWidth="12" markerHeight="10" orient="auto-start-reverse"><path d="M0,5 L7,0 L14,5 L7,10 z" fill="#17203a"/></marker>
<marker id="diao" viewBox="0 0 14 10" refX="13" refY="5" markerWidth="12" markerHeight="10" orient="auto-start-reverse"><path d="M0,5 L7,0 L14,5 L7,10 z" fill="#fff" stroke="#6f7889" stroke-width="1.2"/></marker>
</defs>
</svg>

<div class="cover">
<div class="cover-num">LLD</div>
<div class="kicker">Object Design · Principles · 23 GoF Patterns</div>
<div class="rule"></div>
<div class="cover-title">Low-Level<br>Design</div>
<div class="lede">ఈ document చదివిన తర్వాత LLD మళ్ళీ మర్చిపోలేవు. ప్రతి principle, ప్రతి pattern కి — <b>UML diagram</b>, real-life scenario, వివరణ, మరియు run అయ్యే JavaScript code.</div>
<div class="sub">ఇది OOP గైడ్ (<code>OOPS_Telugu.md</code>) కి కొనసాగింపు — OOP పునాది అయితే, LLD ఆ పునాది మీద కట్టే భవనం. Interview lo అడిగే <i>design problems</i> కోసం <code>LLD_Design_Problems_Telugu.pdf</code> చూడండి; ఇది వాటి వెనక ఉన్న <i>పరికరాల పెట్టె</i>.</div>
<div class="spacer"></div>
<div class="cover-foot"><span>తెలుగు + English</span><span>Yaswanth · Reference</span></div>
</div>

## విషయ సూచిక (Table of Contents)

**Part 1 — పునాదులు (Foundations)**

1. LLD అంటే ఏమిటి? (HLD vs LLD)
2. LLD ని ఎలా approach చేయాలి — ఆరు అడుగుల Framework
3. Class Relationships (Association, Aggregation, Composition, Dependency)
4. UML Class Diagram చదవడం

**Part 2 — Design Principles**

5\. SOLID Principles\
6. DRY, KISS, YAGNI\
7. Composition over Inheritance\
8. Law of Demeter (కనీస పరిచయ సూత్రం)\
9. Program to Interface + Encapsulate What Varies

**Part 3 — Creational Patterns (వస్తువులు ఎలా పుట్టాలి**)

10\. Singleton\
11. Factory Method\
12. Abstract Factory\
13. Builder\
14. Prototype

**Part 4 — Structural Patterns (వస్తువులు ఎలా కలవాలి**)

15\. Adapter\
16. Bridge\
17. Composite\
18. Decorator\
19. Facade\
20. Flyweight\
21. Proxy

**Part 5 — Behavioral Patterns (వస్తువులు ఎలా మాట్లాడుకోవాలి**)

22\. Chain of Responsibility\
23. Command\
24. Iterator\
25. Mediator\
26. Memento\
27. Observer\
28. State\
29. Strategy\
30. Template Method\
31. Visitor\
32. Interpreter

**Part 6 — Beyond GoF (Practical LLD Patterns)**

33\. Dependency Injection (DI)\
34. Object Pool\
35. Null Object\
36. Concurrency మరియు Thread-Safety\
37. Architecture Patterns (MVC / Layered / Pub-Sub)

**Part 7 — Interview & Reference**

38\. ఏ Pattern ఎప్పుడు వాడాలి? (Cheat Sheet)\
39. Memory Tips Table

<div class="box">
<div class="lab">ఈ book lo worked problems ఎందుకు లేవు</div>
Parking Lot, LRU Cache, Elevator, Vending Machine, Rate Limiter, Notification Service — ఈ problems ఇక్కడ <b>ఉద్దేశపూర్వకంగా లేవు</b>. అవి <b><code>LLD_Design_Problems_Telugu.pdf</code></b> lo ఒక్కోటి 6–10 పేజీలుగా, clarifying questions నుంచి interview script వరకు పూర్తిగా ఉన్నాయి. ఒకే problem ని రెండు చోట్లా సగం సగం చెప్పడం కంటే, ఒక చోట పూర్తిగా చెప్పడం మేలు.<br><br>
<b>వాడే క్రమం:</b> ఈ book = <i>పరికరాల పెట్టె</i> (ఏ pattern ఎప్పుడు, ఎందుకు). ఆ book = <i>ఆ పరికరాలతో 17 నిజమైన problems</i>. మొదట ఇది, తర్వాత అది.
</div>

---

# Part 1 — పునాదులు (Foundations)

> LLD నేర్చుకునే ముందు పునాది: LLD అంటే ఏమిటి, entities ఎలా గుర్తించాలి, classes మధ్య సంబంధాలు, UML diagram.

---

## 1. LLD అంటే ఏమిటి? (HLD vs LLD)

### వివరణ

**LLD (Low-Level Design)** అంటే ఒక system ని **classes, objects, methods, relationships** స్థాయిలో design చేయడం. అంటే - "ఈ feature ని ఏ classes తో, ఏ methods తో, ఎలా organize చేసి రాయాలి?" అనే ప్రశ్నకి సమాధానం.

- **HLD (High-Level Design)** = పెద్ద బొమ్మ. Services, databases, load balancers, APIs - system architecture.
- **LLD (Low-Level Design)** = ఒక్కో component లోపల class-level blueprint.

### Real-life Scenario

> ఒక ఇల్లు కడుతున్నామనుకో:
>
> - **HLD** = ఎన్ని గదులు, ఎక్కడ kitchen, ఎక్కడ bathroom - master plan (architect గీసేది).
> - **LLD** = ఒక్కో గోడకి ఏ ఇటుకలు, switch board ఎక్కడ, wiring ఎలా - detailed engineering drawing.

### HLD vs LLD పోలిక

| అంశం     | HLD                            | LLD                                             |
| -------- | ------------------------------ | ----------------------------------------------- |
| Level    | System / Architecture          | Class / Object                                  |
| ప్రశ్న   | ఏ components అవసరం?            | ఆ component లోపల ఏ classes?                     |
| Output   | Architecture diagram           | Class diagram, code structure                   |
| ఉదా      | "Payment service + DB + queue" | "Payment, UPI, Card classes + Strategy pattern" |
| Audience | Architects, teams              | Developers                                      |

### LLD ఎందుకు ముఖ్యం?

1. **Maintainable** - రేపు మార్పు చేయాలంటే ఒకే చోట మార్చగలగాలి
2. **Extensible** - కొత్త feature add చేయాలంటే పాత code విరగకూడదు (Open/Closed)
3. **Reusable** - ఒకసారి రాసిన class మళ్ళీ మళ్ళీ వాడగలగాలి
4. **Testable** - చిన్న, స్పష్టమైన classes ని easy గా test చేయవచ్చు
5. **Interviews** - product companies LLD round తప్పకుండా అడుగుతాయి

> **గుర్తుంచుకో:** OOP = tools (class, object, inheritance...). LLD = ఆ tools ని _ఎప్పుడు, ఎలా_ వాడాలో నేర్పే craft.

---

## 2. LLD ని ఎలా approach చేయాలి — ఆరు అడుగుల Framework

### వివరణ

ఒక problem ("Design a Parking Lot") ఇచ్చినప్పుడు నేరుగా code రాయకూడదు. ఒక క్రమం follow చేయాలి.

<div class="box">
<div class="lab">ఇదే ఏకైక framework</div>
ఈ ఆరు అడుగులే <b><code>LLD_Design_Problems_Telugu.pdf</code></b> lo ఉన్న 17 problems అన్నిటికీ వాడబడతాయి — ఆ book lo ప్రతి problem ఇదే క్రమంలో పరిష్కరించబడింది. ఒకే framework ని రెండు చోట్లా వాడటం ఉద్దేశపూర్వకం: ఇక్కడ నేర్చుకో, అక్కడ 17 సార్లు ఆచరించు.
</div>

### ఆరు అడుగులు — 60 నిమిషాల interview lo

| # | అడుగు | సమయం | ఏం చేయాలి | ఉదా (Parking Lot) |
| --- | --- | --- | --- | --- |
| 1 | **Clarify** | ~5 నిమి | Scope, features, constraints అడుగు | ఎన్ని floors? bike + car? payment ఉందా? |
| 2 | **Use cases** | ~5 నిమి | ఎవరు ఏం చేస్తారో వాక్యాలుగా రాయి | "A driver parks a car and pays on exit" |
| 3 | **Nouns → Classes** | ~8 నిమి | Nouns = classes, verbs = methods | `ParkingLot`, `Floor`, `Spot`, `Ticket`, `Vehicle` |
| 4 | **Class diagram** | ~10 నిమి | Attributes, methods, relationships | Lot **has** Floors, Floor **has** Spots |
| 5 | **Code** | ~22 నిమి | ముఖ్య classes రాయి, patterns ఇక్కడ వస్తాయి | Strategy (fee), Factory (vehicle) |
| 6 | **Extend + Q&A** | ~10 నిమి | Follow-up ని ఎదుర్కో, SOLID check | "ఇప్పుడు EV charging కూడా కావాలంటే?" |

> **అత్యంత సాధారణ తప్పు:** అడుగు 1–4 ని దాటవేసి నేరుగా అడుగు 5 కి వెళ్ళడం. Interviewer చూసేది నీ code కాదు — **నీ ఆలోచనా క్రమం**. అడుగు 1–4 lo నువ్వు ఓడిపోతే, perfect code కూడా నిన్ను కాపాడదు.

### Nouns → Classes, Verbs → Methods (అడుగు 3 యొక్క ఉపాయం)

> Requirement వాక్యాలలో **naamavaachakaalu (nouns)** classes అవుతాయి, **kriyalu (verbs)** methods అవుతాయి.
>
> "A **user** **books** a **ticket** for a **show**"
>
> - Nouns → `User`, `Ticket`, `Show` (classes)
> - Verb → `book()` (method)

### చెప్పకూడని / చెప్పాల్సిన మాటలు

| ❌ చెప్పకు                  | ✅ చెప్పు                             |
| --------------------------- | ------------------------------------- |
| నేరుగా code మొదలుపెట్టడం    | "ముందు requirements clarify చేస్తాను" |
| "ఇలా చేస్తా" (మౌనంగా)       | Think aloud — ఆలోచనని బయటికి చెప్పు   |
| ఒకే perfect solution వెతకడం | Trade-offs మాట్లాడు                   |
| అన్ని patterns కూరడం        | అవసరమైనవి మాత్రమే (YAGNI — §6)        |

### Trade-off ని ఎలా చెప్పాలి

Interviewer perfect design కంటే **నీ reasoning** ని చూస్తాడు. ఒక pattern వాడినప్పుడు ఎప్పుడూ మూడు ముక్కలు చెప్పు — **ఎందుకు వాడాను, దేన్ని తప్పించాను, దీని ఖర్చు ఏమిటి**:

> "ఇక్కడ Strategy వాడాను ఎందుకంటే pricing rules తరచూ మారతాయి. Inheritance వాడితే `CarWeekendPricing`, `BikeHolidayPricing` లాంటి class explosion వచ్చేది. ఖర్చు — classes కొంచెం పెరుగుతాయి, మరియు ఒక చిన్న app కి ఇది over-engineering కావొచ్చు. ఈ scale lo అది acceptable trade-off."

### Key Points

- ముందు **మాట్లాడు** (clarify), తర్వాత **గీయి** (diagram), చివరిలో **రాయి** (code).
- Over-engineering వద్దు — అవసరం లేని patterns కూరకు (YAGNI — §6).
- ఒక్కో class కి ఒకే బాధ్యత (SRP) — ఇది LLD యొక్క గుండె.
- ప్రతి pattern ఎంపికకి: **ఎందుకు + దేన్ని తప్పించాను + ఖర్చు**.

---

## 3. Class Relationships (వస్తువుల మధ్య సంబంధాలు)

### వివరణ

LLD లో అతి ముఖ్యమైనది - classes మధ్య **సంబంధాలు** సరిగ్గా గుర్తించడం. 4 ముఖ్య సంబంధాలు ఉన్నాయి. వీటిని strength (బలం) క్రమంలో గుర్తుంచుకో.

| Relationship    | అర్థం                      | జీవితకాలం (Lifetime)           | ఉదా                    |
| --------------- | -------------------------- | ------------------------------ | ---------------------- |
| **Association** | "uses-a" / తెలుసు          | స్వతంత్రం                      | Teacher — Student      |
| **Aggregation** | "has-a" (weak)             | విడిపోగలవు                     | Team — Player          |
| **Composition** | "has-a" (strong) / part-of | కలిసి బతుకుతాయి, కలిసి చస్తాయి | House — Room           |
| **Dependency**  | "depends-on" (తాత్కాలికం)  | క్షణికం                        | Order — PaymentService |

### Real-life Scenario

> - **Aggregation:** Cricket **Team** కి **Players** ఉంటారు. Team రద్దయినా players బతికే ఉంటారు (వేరే team కి వెళ్తారు). Weak bond.
> - **Composition:** **ఇల్లు** కి **గదులు** ఉంటాయి. ఇల్లు కూలిపోతే గదులు కూడా పోతాయి. Strong bond - గది ఇల్లు లేకుండా ఒంటరిగా ఉండదు.

<div class="fig">
<div class="cap">నాలుగు సంబంధాలు · ఒకే చిత్రంలో</div>
<svg viewBox="0 0 750 320">
<text class="t-xs" x="0" y="14">1 · ASSOCIATION — "తెలుసు" · రెండూ పూర్తిగా స్వతంత్రం</text>
<rect class="n" x="0" y="26" width="130" height="40" rx="4"/>
<text class="t mid" x="65" y="51">Teacher</text>
<line class="ln" x1="134" y1="46" x2="216" y2="46" marker-end="url(#a)"/>
<text class="t-sm mid" x="175" y="38">teaches</text>
<rect class="n" x="220" y="26" width="130" height="40" rx="4"/>
<text class="t mid" x="285" y="51">Student</text>
<text class="t-sm" x="370" y="42">Teacher, Student ని వాడుతుంది. ఒకరు పోయినా</text>
<text class="t-sm" x="370" y="58">రెండోవారు బతికే ఉంటారు. బలహీనమైన సంబంధం.</text>
<text class="t-xs" x="0" y="98">2 · AGGREGATION — "కలిగి ఉంది" (ఖాళీ ◇) · భాగాలు విడిగా బతకగలవు</text>
<rect class="n" x="0" y="110" width="130" height="40" rx="4"/>
<text class="t mid" x="65" y="135">Team</text>
<line class="ln" x1="216" y1="130" x2="136" y2="130" marker-end="url(#diao)"/>
<text class="t-sm mid" x="176" y="122">1 … *</text>
<rect class="n" x="220" y="110" width="130" height="40" rx="4"/>
<text class="t mid" x="285" y="135">Player</text>
<text class="t-sm" x="370" y="126">Team రద్దయినా players ఉంటారు — వేరే team కి</text>
<text class="t-sm" x="370" y="142">వెళ్తారు. Players బయట create అవుతారు.</text>
<text class="t-xs" x="0" y="182">3 · COMPOSITION — "సొంతం" (నిండు ◆) · భాగాలు కలిసి పుడతాయి, కలిసి చస్తాయి</text>
<rect class="n" x="0" y="194" width="130" height="40" rx="4"/>
<text class="t mid" x="65" y="219">House</text>
<line class="ln" x1="216" y1="214" x2="136" y2="214" marker-end="url(#dia)"/>
<text class="t-sm mid" x="176" y="206">1 … *</text>
<rect class="n-acc" x="220" y="194" width="130" height="40" rx="4"/>
<text class="t-w mid" x="285" y="219">Room</text>
<text class="t-sm" x="370" y="210">ఇల్లు కూలితే గదులూ పోతాయి. Rooms ని House</text>
<text class="t-sm" x="370" y="226">తన constructor lo తానే create చేస్తుంది.</text>
<text class="t-xs" x="0" y="266">4 · INHERITANCE — "ఒక రకం" (ఖాళీ △) · Dog IS-A Animal</text>
<rect class="n" x="0" y="278" width="130" height="40" rx="4"/>
<text class="t mid" x="65" y="303">Dog</text>
<line class="ln" x1="134" y1="298" x2="216" y2="298" marker-end="url(#hollow)"/>
<rect class="n" x="220" y="278" width="130" height="40" rx="4"/>
<text class="t mid" x="285" y="303">Animal</text>
<text class="t-sm" x="370" y="294">బాణం ఎప్పుడూ <tspan class="t-acc">child → parent</tspan> దిశలో.</text>
<text class="t-sm" x="370" y="310">"Dog is an Animal" అని చదవాలి.</text>
</svg>
<div class="note">తేడాని గుర్తుంచుకోవడానికి ఒక ప్రశ్న చాలు: <b>"కంటైనర్ చస్తే భాగాలు కూడా చస్తాయా?"</b> చస్తే composition (◆), బతికితే aggregation (◇), అసలు కలిగి ఉండకపోతే కేవలం association (→).</div>
</div>

### Code

```javascript
// ---------- Association: రెండూ స్వతంత్రం, ఒకరికొకరు తెలుసు ----------
class Student {
  constructor(name) {
    this.name = name;
  }
}
class Teacher {
  teach(student) {
    // Teacher, Student ని "use" చేస్తోంది కానీ own చేయడం లేదు
    console.log(`Teacher ${student.name} కి పాఠం చెప్తోంది.`);
  }
}

// ---------- Aggregation: Team "has" Players (weak - విడిపోగలవు) ----------
class Player {
  constructor(name) {
    this.name = name;
  }
}
class Team {
  constructor(name) {
    this.name = name;
    this.players = []; // players బయట create అవుతారు, ఇక్కడ కేవలం hold చేస్తాం
  }
  addPlayer(player) {
    this.players.push(player);
  }
}

// ---------- Composition: House "owns" Rooms (strong - కలిసి పుడతాయి/చస్తాయి) ----------
class Room {
  constructor(type) {
    this.type = type;
  }
}
class House {
  constructor() {
    // Rooms ని House లోపలే create చేస్తాం - House పోతే Rooms కూడా పోతాయి
    this.rooms = [new Room("Kitchen"), new Room("Bedroom")];
  }
}

// ---------- Dependency: Order "depends on" PaymentService (తాత్కాలికం) ----------
class PaymentService {
  pay(amount) {
    console.log(`Rs.${amount} paid.`);
  }
}
class Order {
  checkout(amount) {
    const payment = new PaymentService(); // క్షణికంగా వాడి వదిలేస్తాం
    payment.pay(amount);
  }
}

// Testing
const teacher = new Teacher();
teacher.teach(new Student("Yaswanth")); // Teacher Yaswanth కి పాఠం చెప్తోంది.

const team = new Team("Chargers");
team.addPlayer(new Player("Kohli"));
console.log(`${team.name} team లో ${team.players.length} player(s).`); // 1 player

const house = new House();
console.log(`House లో ${house.rooms.length} rooms (composition).`); // 2 rooms

new Order().checkout(500); // Rs.500 paid.
```

### Association vs Aggregation vs Composition (UML గుర్తులు)

```
Association:  Teacher ────────── Student      (సాదా line)
Aggregation:  Team    ◇───────── Player       (ఖాళీ వజ్రం - weak)
Composition:  House   ◆───────── Room         (నిండు వజ్రం - strong)
Dependency:   Order   ┄┄┄┄┄┄> PaymentService  (చుక్కల బాణం)
```

> **గుర్తుంచుకో:** ఖాళీ వజ్రం (◇) = Aggregation (part విడిగా బతుకుతుంది). నిండు వజ్రం (◆) = Composition (part owner తో పాటే పోతుంది).

---

## 4. UML Class Diagram చదవడం

### వివరణ

LLD interviews లో మాటలతో కాకుండా **class diagram** గీయాలి. UML class box లో 3 అరలు ఉంటాయి: పేరు, attributes, methods.

### ఒక UML Class Box

```
┌─────────────────────────┐
│        BankAccount      │   <- Class పేరు
├─────────────────────────┤
│ - accountNumber: string │   <- Attributes
│ - balance: number       │      (- private, + public, # protected)
├─────────────────────────┤
│ + deposit(amt): void    │   <- Methods
│ + withdraw(amt): boolean│
│ - validate(): boolean   │
└─────────────────────────┘
```

### Visibility గుర్తులు

| గుర్తు          | అర్థం     | JavaScript        |
| --------------- | --------- | ----------------- |
| `+`             | public    | `this.x`          |
| `-`             | private   | `#x`              |
| `#`             | protected | `_x` (convention) |
| `_` (underline) | static    | `static x`        |

### Relationship Arrows (బాణాలు)

<div class="fig">
<div class="cap">UML బాణాల నిఘంటువు · ఇది ఒక్కసారి గుర్తుంచుకుంటే చాలు</div>
<svg viewBox="0 0 750 230">
<rect class="n-soft" x="0" y="8" width="366" height="42" rx="4"/>
<line class="ln" x1="20" y1="30" x2="120" y2="30" marker-end="url(#hollow)"/>
<text class="t" x="140" y="27">Inheritance</text>
<text class="t-sm" x="140" y="42">class Dog extends Animal</text>
<rect class="n-soft" x="384" y="8" width="366" height="42" rx="4"/>
<line class="ln-dash" x1="404" y1="30" x2="504" y2="30" marker-end="url(#hollow)"/>
<text class="t" x="524" y="27">Realization</text>
<text class="t-sm" x="524" y="42">interface ని implement చేయడం</text>
<rect class="n-soft" x="0" y="58" width="366" height="42" rx="4"/>
<line class="ln" x1="20" y1="80" x2="120" y2="80" marker-end="url(#a)"/>
<text class="t" x="140" y="77">Association</text>
<text class="t-sm" x="140" y="92">"ఒకరికొకరు తెలుసు" — వాడుకుంటుంది</text>
<rect class="n-soft" x="384" y="58" width="366" height="42" rx="4"/>
<line class="ln-dash" x1="404" y1="80" x2="504" y2="80" marker-end="url(#a)"/>
<text class="t" x="524" y="77">Dependency</text>
<text class="t-sm" x="524" y="92">తాత్కాలికం — parameter గా వస్తుంది</text>
<rect class="n-soft" x="0" y="108" width="366" height="42" rx="4"/>
<line class="ln" x1="120" y1="130" x2="24" y2="130" marker-end="url(#diao)"/>
<text class="t" x="140" y="127">Aggregation (ఖాళీ ◇)</text>
<text class="t-sm" x="140" y="142">Team ◇— Player · విడిగా బతుకుతాయి</text>
<rect class="n-soft" x="384" y="108" width="366" height="42" rx="4"/>
<line class="ln" x1="504" y1="130" x2="408" y2="130" marker-end="url(#dia)"/>
<text class="t" x="524" y="127">Composition (నిండు ◆)</text>
<text class="t-sm" x="524" y="142">House ◆— Room · కలిసి చస్తాయి</text>
<rect class="n-acc" x="0" y="162" width="750" height="60" rx="4"/>
<text class="t-w" x="16" y="184">రెండు నియమాలు గుర్తుంచుకుంటే చాలు</text>
<text class="t-w-sm" x="16" y="204"><tspan class="mono">1.</tspan> ముక్కు (triangle/diamond) ఎప్పుడూ <tspan class="t-acc">"పెద్దవాడి" వైపు</tspan> — parent వైపు, లేదా owner వైపు.</text>
<text class="t-w-sm" x="16" y="218"><tspan class="mono">2.</tspan> చుక్కల గీత = బలహీనమైన/తాత్కాలిక సంబంధం. నిండు గీత = నిజమైన, స్థిరమైన సంబంధం.</text>
</svg>
</div>

| బాణం | సంబంధం | JavaScript lo ఎలా కనిపిస్తుంది |
| ---- | ------ | ------------------------------- |
| `──▷` ఖాళీ triangle | Inheritance | `class Dog extends Animal` |
| `┄┄▷` చుక్కలు + triangle | Realization (interface) | Duck typing / abstract base class |
| `───>` | Association | `this.other = other` (constructor lo inject) |
| `◇───` ఖాళీ diamond | Aggregation | `this.players = []` (బయట create అయినవి) |
| `◆───` నిండు diamond | Composition | `this.rooms = [new Room()]` (లోపలే create) |
| `┄┄>` చుక్కల బాణం | Dependency | `method(param)` — parameter గా మాత్రమే |

### Key Points

- Box లో 3 అరలు: name / attributes / methods - ఎప్పుడూ ఈ క్రమంలో
- `-` private, `+` public - visibility ని బాణాల్లా ముఖ్యంగా చూపించు
- Interview లో perfect diagram కంటే _స్పష్టమైన_ diagram ముఖ్యం
- Multiplicity రాయవచ్చు: `Team "1" ◇─── "*" Player` (ఒక team కి చాలా players)

### Sequence Diagram (కాలక్రమంలో objects మధ్య calls)

> Class diagram = **structure** (ఏ classes ఉన్నాయి). Sequence diagram = **behaviour over time** (ఏ order లో methods call అవుతాయి). Interview లో "flow చూపించు" అంటే ఇది గీయాలి.

```
User        Controller      Service        Database
 │              │              │              │
 │ login(u,p)   │              │              │
 │─────────────>│              │              │
 │              │ validate(u,p)│              │
 │              │─────────────>│              │
 │              │              │ findUser(u)  │
 │              │              │─────────────>│
 │              │              │<─ ─ ─ ─ ─ ─ ─│  (user row)
 │              │<─ ─ ─ ─ ─ ─ ─│  (true)      │
 │<─ ─ ─ ─ ─ ─ ─│  (token)     │              │
 │              │              │              │
```

- నిలువు గీత (│) = ఒక్కో object యొక్క lifeline (కాలం కిందికి సాగుతుంది)
- నిండు బాణం (──&gt;) = method call; చుక్కల బాణం (┄ ┄) = return value
- Login, payment, booking లాంటి **flows** ని చూపించడానికి perfect

---

# Part 2 — Design Principles

> Patterns కి ముందు principles. ఇవి ఏ pattern వాడినా వర్తించే సార్వత్రిక సూత్రాలు - మంచి design కి దిక్సూచి.

---

## 5. SOLID Principles

### వివరణ

SOLID = మంచి design కి ఐదు మూల సూత్రాలు, Robert C. Martin చెప్పినవి. ఇవి ఏ pattern వాడినా వర్తిస్తాయి — అందుకే patterns కి *ముందు* ఇవి. ప్రతి సూత్రానికీ ఒక తప్పు, ఒక సరైన రూపం చూద్దాం.

| అక్షరం | సూత్రం                | LLD లో అర్థం                                      |
| ------ | --------------------- | ------------------------------------------------- |
| **S**  | Single Responsibility | ఒక class మారడానికి ఒకే కారణం ఉండాలి               |
| **O**  | Open/Closed           | కొత్త feature = కొత్త class, పాత code touch వద్దు |
| **L**  | Liskov Substitution   | Child ని parent స్థానంలో పెట్టినా break అవ్వకూడదు |
| **I**  | Interface Segregation | పెద్ద interface కాదు, చిన్న role-based interfaces |
| **D**  | Dependency Inversion  | Concrete కాదు, abstraction మీద depend అవ్వు       |

<div class="fig">
<div class="cap">SOLID · ఐదు సూత్రాలు ఒక చూపులో</div>
<svg viewBox="0 0 750 302"><rect class="n-acc" x="0" y="8" width="46" height="38" rx="4"/><text class="t-w mid" x="23" y="33" style="font-size:17px;font-weight:800">S</text><rect class="n" x="52" y="8" width="698" height="38" rx="4"/><text class="t" x="66" y="25">Single Responsibility</text><text class="t-sm" x="66" y="40">ఒక class కి మారడానికి ఒకే ఒక్క కారణం ఉండాలి</text><rect class="n-acc" x="0" y="54" width="46" height="38" rx="4"/><text class="t-w mid" x="23" y="79" style="font-size:17px;font-weight:800">O</text><rect class="n" x="52" y="54" width="698" height="38" rx="4"/><text class="t" x="66" y="71">Open / Closed</text><text class="t-sm" x="66" y="86">పొడిగించడానికి తెరిచి, మార్చడానికి మూసి</text><rect class="n-info" x="0" y="100" width="46" height="38" rx="4"/><text class="t mid" x="23" y="125" style="font-size:17px;font-weight:800">L</text><rect class="n" x="52" y="100" width="698" height="38" rx="4"/><text class="t" x="66" y="117">Liskov Substitution</text><text class="t-sm" x="66" y="132">Child ని parent స్థానంలో పెడితే ఏమీ విరగకూడదు</text><rect class="n-info" x="0" y="146" width="46" height="38" rx="4"/><text class="t mid" x="23" y="171" style="font-size:17px;font-weight:800">I</text><rect class="n" x="52" y="146" width="698" height="38" rx="4"/><text class="t" x="66" y="163">Interface Segregation</text><text class="t-sm" x="66" y="178">వాడని methods ని implement చేయమని బలవంతం చేయొద్దు</text><rect class="n-good" x="0" y="192" width="46" height="38" rx="4"/><text class="t mid" x="23" y="217" style="font-size:17px;font-weight:800">D</text><rect class="n" x="52" y="192" width="698" height="38" rx="4"/><text class="t" x="66" y="209">Dependency Inversion</text><text class="t-sm" x="66" y="224">Concrete class మీద కాదు, abstraction మీద ఆధారపడు</text><rect class="n-soft" x="0" y="242" width="750" height="52" rx="4"/><text class="t mid" x="375" y="264">ఐదింటిలో <tspan class="t-acc">O</tspan> మరియు <tspan class="t-acc">D</tspan> — ఇవే interview lo అత్యధికంగా test అవుతాయి</text><text class="t-sm mid" x="375" y="284">ఎందుకంటే "కొత్త requirement వస్తే ఏం మారుతుంది?" అనే ప్రశ్నకి జవాబు సరిగ్గా ఈ రెండే</text></svg>
</div>

### S — Single Responsibility Principle

> ఒక class database work, email work, business logic అన్నీ చేస్తే - ఏదో ఒకటి మారితే మొత్తం class touch చేయాలి. బదులుగా ఒక్కో పని ఒక్కో class కి ఇస్తాం.

```javascript
// WRONG: User class database + email అన్నీ చేస్తోంది
// CORRECT: బాధ్యతలు విడదీయడం
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  // ఒకే బాధ్యత: save/load
  save(user) {
    console.log(`${user.name} ని database లో save చేశాం.`);
  }
}

class EmailService {
  // ఒకే బాధ్యత: email పంపడం
  sendWelcome(user) {
    console.log(`${user.email} కి welcome email పంపాం.`);
  }
}

const u = new User("Yaswanth", "y@mail.com");
new UserRepository().save(u); // Yaswanth ని database లో save చేశాం.
new EmailService().sendWelcome(u); // y@mail.com కి welcome email పంపాం.
```

### O — Open/Closed Principle

> కొత్త shape add చేయాలంటే existing code (Shape, totalArea) మార్చకూడదు - కొత్త class రాస్తే చాలు.

```javascript
class Shape {
  area() {
    throw new Error("area() implement చేయాలి!");
  }
}

class Circle extends Shape {
  constructor(r) {
    super();
    this.r = r;
  }
  area() {
    return Math.PI * this.r ** 2;
  }
}

class Square extends Shape {
  constructor(s) {
    super();
    this.s = s;
  }
  area() {
    return this.s ** 2;
  }
}

// కొత్త shape - పాత code ఏమీ మార్చకుండా add చేయవచ్చు (Open for extension)
class Triangle extends Shape {
  constructor(b, h) {
    super();
    this.b = b;
    this.h = h;
  }
  area() {
    return 0.5 * this.b * this.h;
  }
}

function totalArea(shapes) {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}

console.log(
  totalArea([new Circle(2), new Square(3), new Triangle(4, 5)]).toFixed(2),
);
// 31.57
```

### L — Liskov Substitution Principle

> Parent (Bird) ని ఆశించే చోట ఏ child (Sparrow, Penguin) పెట్టినా program break అవ్వకూడదు.

```javascript
class Bird {
  move() {
    console.log("Bird కదులుతోంది.");
  }
}

class Sparrow extends Bird {
  move() {
    console.log("Sparrow ఎగురుతోంది.");
  }
}

class Penguin extends Bird {
  move() {
    console.log("Penguin నడుస్తోంది.");
  } // ఎగరదు, కానీ move() contract ని honour చేస్తుంది
}

function makeItMove(bird) {
  bird.move(); // ఏ Bird అయినా substitute చేయవచ్చు
}

makeItMove(new Sparrow()); // Sparrow ఎగురుతోంది.
makeItMove(new Penguin()); // Penguin నడుస్తోంది.
```

### I — Interface Segregation Principle

> Robot కి `eat()` అవసరం లేదు. ఒక పెద్ద interface లో అన్నీ కూరకుండా, చిన్న capabilities (Workable, Eatable) విడదీసి కావలసినవి మాత్రమే combine చేస్తాం (mixins వాడి — `OOPS_Telugu.md` §14).

```javascript
const Workable = (Base) =>
  class extends Base {
    work() {
      console.log(`${this.name} పని చేస్తోంది.`);
    }
  };
const Eatable = (Base) =>
  class extends Base {
    eat() {
      console.log(`${this.name} తింటోంది.`);
    }
  };

class Entity {
  constructor(name) {
    this.name = name;
  }
}

class Human extends Workable(Eatable(Entity)) {} // work + eat రెండూ
class Robot extends Workable(Entity) {} // work మాత్రమే (eat బలవంతం కాదు)

new Human("Ravi").work(); // Ravi పని చేస్తోంది.
new Robot("R2D2").work(); // R2D2 పని చేస్తోంది.
```

### D — Dependency Inversion Principle

> `Notification` ఏ specific channel (SMS/Email) మీద కాకుండా, ఒక `send()` contract మీద depend అవుతుంది. Channel ని బయటి నుండి inject చేస్తాం (dependency injection — §33).

```javascript
class SMSChannel {
  send(msg) {
    console.log(`SMS: ${msg}`);
  }
}
class EmailChannel {
  send(msg) {
    console.log(`Email: ${msg}`);
  }
}

class Notification {
  constructor(channel) {
    // dependency ని inject చేయడం
    this.channel = channel;
  }
  notify(msg) {
    this.channel.send(msg);
  }
}

new Notification(new SMSChannel()).notify("Hello via SMS"); // SMS: Hello via SMS
new Notification(new EmailChannel()).notify("Hello via Email"); // Email: Hello via Email
```

### Interview lo SOLID ని ఎలా వాడాలి

సూత్రాల పేర్లు అప్పజెప్పడం కాదు — ఒక **smell** ని చూపించి, ఏ సూత్రం దాన్ని పరిష్కరిస్తుందో చెప్పడం. ఇదే తేడా:

| Code lo కనిపించే smell | ఇది ఉల్లంఘిస్తున్న సూత్రం | పరిష్కారం |
| --- | --- | --- |
| ఒక class lo DB + email + validation | **S** | బాధ్యతల వారీగా విడగొట్టు |
| కొత్త రకం చేర్చాలంటే `switch` కి ఒక `case` కలపాలి | **O** | Polymorphism / Strategy (§29) |
| Child method "ఇది support చేయదు" అని throw చేస్తుంది | **L** | సరిపోని inheritanceని composition గా మార్చు (§7) |
| ఒక interface lo సగం methods ని అందరూ ఖాళీగా implement చేస్తారు | **I** | చిన్న, role-based interfaces |
| Class లోపల `new ConcreteThing()` | **D** | బయట create చేసి inject చెయ్యి (§33) |

### Key Points

- **SRP** — "ఈ class ఎన్ని కారణాలకి మారుతుంది?" ఒకటి కంటే ఎక్కువ ఉంటే విడగొట్టు.
- **OCP** — `if/else` / `switch` పెరుగుతూ ఉంటే అది polymorphism అడుగుతోంది.
- **LSP** — child, parent యొక్క *వాగ్దానాన్ని* నిలబెట్టాలి; method signature సరిపోతే చాలదు.
- **ISP** — ఖాళీ implementations కనిపిస్తే interface చాలా పెద్దది.
- **DIP** — `new` ని class లోపల కాకుండా బయట చేసి inject చెయ్యి (testable అవుతుంది).
- ఐదింటిలో **O** మరియు **D** interview lo అత్యధికంగా test అవుతాయి.

---

## 6. DRY, KISS, YAGNI

### వివరణ

SOLID తో పాటు రోజువారీ 3 practical మంత్రాలు.

| సూత్రం    | పూర్తి రూపం              | అర్థం                                        |
| --------- | ------------------------ | -------------------------------------------- |
| **DRY**   | Don't Repeat Yourself    | ఒకే logic రెండుచోట్ల ఉంటే ఒక చోటికి తీసుకురా |
| **KISS**  | Keep It Simple, Stupid   | సాధ్యమైనంత simple గా ఉంచు                    |
| **YAGNI** | You Aren't Gonna Need It | ఇప్పుడు అవసరం లేనిది ఇప్పుడు రాయకు           |

### Real-life Scenario

> - **DRY:** ప్రతి function లో tax లెక్క copy-paste చేయకుండా ఒక `calculateTax()` రాయి.
> - **KISS:** ఒక్క line తో అయ్యే పనికి 3 design patterns తేవద్దు.
> - **YAGNI:** "రేపు 10 currencies రావచ్చు" అని ఇప్పుడే multi-currency engine రాయకు - వచ్చినప్పుడు చూద్దాం.

### Code - DRY ఉదాహరణ

```javascript
// WRONG (repetition): ప్రతి చోట discount logic copy
// function priceA(p) { return p - p * 0.1; }
// function priceB(p) { return p - p * 0.1; }

// DRY: ఒకే చోట logic
function applyDiscount(price, percent) {
  return price - (price * percent) / 100;
}

console.log(applyDiscount(1000, 10)); // 900
console.log(applyDiscount(2000, 25)); // 1500

// KISS: సూటిగా - unnecessary abstraction లేదు
function isAdult(age) {
  return age >= 18;
}
console.log(isAdult(20)); // true
```

### Key Points

- DRY vs విపరీతం: ఒకే _coincidence_ ని force గా merge చేయకు (rule of three - 3 సార్లు repeat అయితేనే extract చేయి)
- KISS - "clever" code కంటే "clear" code మంచిది
- YAGNI - future కోసం over-design = wasted effort + bugs

---

## 7. Composition over Inheritance

### వివరణ

Inheritance ("is-a") శక్తివంతమైనది కానీ గట్టిగా bind చేస్తుంది (tight coupling). చాలా సందర్భాల్లో **Composition** ("has-a") flexible గా ఉంటుంది - behaviours ని విడి parts గా కలుపుతాం.

### Real-life Scenario

> **Problem:** `Robot` ఒక `Animal` కాదు, కానీ దానికి walk చేయగలగాలి. `Animal` నుండి inherit చేస్తే eat(), sleep() కూడా వస్తాయి - అవసరం లేనివి. బదులుగా `walk` అనే behaviour ని _కలుపుతాం_ (compose).

<div class="fig">
<div class="cap">Composition over Inheritance · ఎందుకు "has-a" మేలు</div>
<svg viewBox="0 0 750 332"><text class="t-xs" x="0" y="14">❌ INHERITANCE తో — combinatorial పేలుడు</text><rect class="n" x="250" y="24" width="140" height="34" rx="4"/><text class="t mid" x="320" y="46">Bird</text><line class="ln" x1="180" y1="76" x2="290" y2="60" marker-end="url(#hollow)"/><line class="ln" x1="460" y1="76" x2="350" y2="60" marker-end="url(#hollow)"/><rect class="n" x="60" y="80" width="240" height="34" rx="4"/><text class="t-sm mid" x="180" y="102">FlyingBird</text><rect class="n" x="340" y="80" width="240" height="34" rx="4"/><text class="t-sm mid" x="460" y="102">SwimmingBird</text><rect class="n-bad" x="600" y="80" width="150" height="34" rx="4"/><text class="t-sm mid" x="675" y="102">FlyingSwimming…?</text><text class="t-sm" x="0" y="136">బాతు ఎగురుతుంది <tspan class="t-acc">మరియు</tspan> ఈదుతుంది. Penguin ఈదుతుంది కానీ ఎగరదు. ప్రతి కలయికకీ ఒక కొత్త</text><text class="t-sm" x="0" y="152">class — n behaviours = 2ⁿ classes.</text><text class="t-xs" x="0" y="172">✓ COMPOSITION తో — behaviours ని ముక్కలుగా చేసి కలపడం</text><rect class="n-acc" x="270" y="182" width="210" height="46" rx="4"/><text class="t-w mid" x="375" y="202">Duck</text><text class="t-w-sm mid" x="375" y="218">- fly: FlyBehaviour</text><line class="ln-acc" x1="330" y1="232" x2="180" y2="256" marker-end="url(#aa)"/><line class="ln-acc" x1="420" y1="232" x2="570" y2="256" marker-end="url(#aa)"/><rect class="n-good" x="60" y="260" width="240" height="40" rx="4"/><text class="t-sm mid" x="180" y="278">FlyWithWings</text><text class="t-sm mid" x="180" y="293">setFlyBehaviour() తో runtime lo మార్చొచ్చు</text><rect class="n-good" x="450" y="260" width="240" height="40" rx="4"/><text class="t-sm mid" x="570" y="278">CannotFly</text><text class="t-sm mid" x="570" y="293">Penguin కి ఇది</text><text class="t-acc mid" x="375" y="322">3 behaviours × 3 birds = 9 కలయికలు, కానీ 6 classes మాత్రమే</text></svg>
</div>

### Code

```javascript
// Behaviours ని విడి, reusable objects గా చేయడం
const canWalk = (state) => ({
  walk: () => console.log(`${state.name} నడుస్తోంది.`),
});
const canFly = (state) => ({
  fly: () => console.log(`${state.name} ఎగురుతోంది.`),
});
const canSwim = (state) => ({
  swim: () => console.log(`${state.name} ఈదుతోంది.`),
});

// అవసరమైన behaviours ని మాత్రమే కలిపి object తయారు చేయడం (compose)
function createDuck(name) {
  const state = { name };
  return Object.assign({}, canWalk(state), canFly(state), canSwim(state));
}
function createRobot(name) {
  const state = { name };
  return Object.assign({}, canWalk(state)); // Robot కి walk మాత్రమే
}

const duck = createDuck("Donald");
duck.walk(); // Donald నడుస్తోంది.
duck.fly(); // Donald ఎగురుతోంది.
duck.swim(); // Donald ఈదుతోంది.

const robot = createRobot("R2D2");
robot.walk(); // R2D2 నడుస్తోంది.
// robot.fly - లేదు (అవసరం లేని behaviour రాలేదు)
console.log(typeof robot.fly); // undefined
```

### ఎప్పుడు ఏది?

| పరిస్థితి                                  | ఎంపిక                       |
| ------------------------------------------ | --------------------------- |
| నిజమైన "is-a" + stable hierarchy           | Inheritance                 |
| Behaviours mix-and-match కావాలి            | **Composition**             |
| Runtime లో behaviour మారాలి                | **Composition**             |
| Deep inheritance tree వస్తోంది (3+ levels) | **Composition** వైపు మొగ్గు |

> **Gang of Four సూత్రం:** "Favour object composition over class inheritance."

---

## 8. Law of Demeter (కనీస పరిచయ సూత్రం)

### వివరణ

**Law of Demeter (LoD)** = "నీ friends తో మాత్రమే మాట్లాడు, friends యొక్క friends తో కాదు." ఒక method కేవలం దగ్గరి objects తోనే interact అవ్వాలి - deep గా `a.b.c.d` chain చేయకూడదు.

### Real-life Scenario

> Hotel లో బిల్లు కట్టేటప్పుడు నువ్వు నీ **wallet** ని waiter కి ఇవ్వవు, డబ్బు నువ్వే తీసి ఇస్తావు.\
> అంటే waiter `customer.wallet.cash.count()` చేయకూడదు - `customer.pay(amount)` అడగాలి.

### Code

```javascript
// WRONG - Train wreck: wallet లోపలికి చొరబడటం (a.b.c.d)
class Wallet {
  constructor(cash) {
    this.cash = cash;
  }
}
class CustomerBad {
  constructor() {
    this.wallet = new Wallet(1000);
  }
}
// waiter చేసేది: customer.wallet.cash -- LoD violation!

// CORRECT - Customer తనే pay() ఇస్తుంది; wallet బయటికి కనిపించదు
class CustomerGood {
  #wallet;
  constructor(cash) {
    this.#wallet = new Wallet(cash);
  }

  pay(amount) {
    if (this.#wallet.cash >= amount) {
      this.#wallet.cash -= amount;
      console.log(`Rs.${amount} paid. Balance: Rs.${this.#wallet.cash}`);
      return amount;
    }
    console.log("Insufficient cash!");
    return 0;
  }
}

class Waiter {
  collectBill(customer, amount) {
    // wallet లోపల ఏముందో waiter కి తెలియదు - కేవలం pay() అడుగుతాడు
    return customer.pay(amount);
  }
}

const customer = new CustomerGood(1000);
new Waiter().collectBill(customer, 300); // Rs.300 paid. Balance: Rs.700
```

### Key Points

- ఒక method లో `.` ఒకటి కంటే ఎక్కువ chain (`a.getB().getC()`) కనిపిస్తే LoD alarm
- లోపలి structure ని బయటికి leak చేయకు → encapsulation బలపడుతుంది
- ఫలితం: ఒక class మారితే మిగతావి తక్కువ affect అవుతాయి (loose coupling)

---

## 9. Program to Interface + Encapsulate What Varies

### వివరణ

రెండు బంగారు LLD సూత్రాలు:

1. **Program to an interface, not an implementation** - concrete class కాదు, contract (abstraction) మీద ఆధారపడు.
2. **Encapsulate what varies** - మారే భాగాన్ని విడిగా తీసి దాచు; మిగతా code stable గా ఉంటుంది.

### Real-life Scenario

> **Power socket** ఒక interface. TV, phone charger, fridge - ఏదైనా ఆ socket కి plug అవుతాయి. Socket కి లోపల ఏ device ఉందో పట్టదు - అది "plug shape" అనే contract మీద మాత్రమే ఆధారపడుతుంది.

<div class="fig">
<div class="cap">Program to Interface · ఆధారపడే దిశని తిప్పడం</div>
<svg viewBox="0 0 750 292"><text class="t-xs" x="0" y="14">❌ CONCRETE మీద ఆధారపడటం</text><rect class="n" x="0" y="24" width="200" height="44" rx="4"/><text class="t mid" x="100" y="44">OrderService</text><text class="t-sm mid" x="100" y="60">new MySQLRepo()</text><line class="ln" x1="204" y1="46" x2="266" y2="46" marker-end="url(#a)"/><rect class="n-bad" x="270" y="24" width="200" height="44" rx="4"/><text class="t mid" x="370" y="52">MySQLRepository</text><text class="t-sm" x="490" y="40">DB మార్చాలంటే OrderService ని</text><text class="t-sm" x="490" y="56">edit చేయాలి. Test lo mock రాదు.</text><text class="t-xs" x="0" y="102">✓ INTERFACE మీద ఆధారపడటం</text><rect class="n" x="0" y="112" width="200" height="44" rx="4"/><text class="t mid" x="100" y="132">OrderService</text><text class="t-sm mid" x="100" y="148">- repo: Repository</text><line class="ln" x1="204" y1="134" x2="266" y2="134" marker-end="url(#a)"/><rect class="n-acc" x="270" y="112" width="200" height="44" rx="4"/><text class="t-w mid" x="370" y="132">«interface»</text><text class="t-w mid" x="370" y="148">Repository</text><line class="ln-dash" x1="330" y1="180" x2="370" y2="162" marker-end="url(#hollow)"/><line class="ln-dash" x1="410" y1="180" x2="370" y2="162" marker-end="url(#hollow)"/><rect class="n-good" x="230" y="184" width="130" height="36" rx="4"/><text class="t-sm mid" x="295" y="206">MySQLRepo</text><rect class="n-good" x="380" y="184" width="130" height="36" rx="4"/><text class="t-sm mid" x="445" y="206">InMemoryRepo</text><text class="t-sm" x="530" y="128">OrderService కి implementation</text><text class="t-sm" x="530" y="144">గురించి తెలియదు.</text><text class="t-acc" x="530" y="168">Test lo InMemoryRepo,</text><text class="t-acc" x="530" y="184">prod lo MySQLRepo —</text><text class="t-acc" x="530" y="200">code ఒక్క line మారదు.</text><rect class="n-soft" x="0" y="236" width="750" height="46" rx="4"/><text class="t mid" x="375" y="258">"Encapsulate what varies" — ఏది మారుతుందో దాన్ని ఒక interface వెనక దాచు</text><text class="t-sm mid" x="375" y="276">ఈ ఒక్క వాక్యమే దాదాపు అన్ని design patterns యొక్క సారాంశం</text></svg>
</div>

### Code

```javascript
// "Interface" (JS లో contract) - అన్ని sorters area() లాంటి compare() ఇవ్వాలి
// మారేది = sorting strategy. దాన్ని encapsulate చేస్తాం.
class BubbleSort {
  sort(arr) {
    console.log("Bubble sort వాడుతోంది");
    return [...arr].sort((a, b) => a - b);
  }
}
class QuickSort {
  sort(arr) {
    console.log("Quick sort వాడుతోంది");
    return [...arr].sort((a, b) => a - b);
  }
}

// Processor ఏ concrete sorter అనేది తెలుసుకోదు - "sort()" contract మీద మాత్రమే ఆధారపడుతుంది
class DataProcessor {
  constructor(sorter) {
    this.sorter = sorter;
  } // program to interface
  process(data) {
    return this.sorter.sort(data);
  }
}

const data = [5, 2, 9, 1];
console.log(new DataProcessor(new BubbleSort()).process(data)); // [1,2,5,9]
console.log(new DataProcessor(new QuickSort()).process(data)); // [1,2,5,9]
// రేపు MergeSort వచ్చినా DataProcessor మార్చక్కర్లేదు!
```

### Key Points

- Concrete class పేరు code అంతటా చిమ్మకు - ఒక చోట (factory/injection) మాత్రమే వాడు
- "ఏది మారుతోంది?" అని అడుగు → అదే part ని విడి class/strategy గా తీయి
- ఇదే Strategy pattern (Topic 29) కి పునాది

---

# Part 3 — Creational Patterns

> Creational patterns = **objects ఎలా పుట్టాలి** అనేది control చేసేవి. `new` ని నేరుగా చిమ్మకుండా, creation logic ని ఒక చోట దాచుతాయి.

---

## 10. Singleton

### వివరణ

**Singleton** = ఒక class నుండి **ఒకే ఒక్క object** మాత్రమే ఉండాలి, అది అందరికీ share అవ్వాలి.

### Real-life Scenario

> ఒక కంపెనీకి **ఒకే CEO**. ఎవరు అడిగినా అదే CEO. కొత్త CEO ని ప్రతిసారి create చేయరు.\
> Config, Logger, DB connection pool - వీటికి Singleton సరిపోతుంది.

<div class="fig">
<div class="cap">Singleton · ఒకే instance, global access</div>
<svg viewBox="0 0 750 200"><rect class="n" x="275" y="40" width="200" height="76" rx="4"/><rect class="n-acc" x="275" y="40" width="200" height="22" rx="4"/><text class="t-w mid" x="375" y="56">Singleton</text><text class="t-sm mono" x="285" y="78">- static instance</text><text class="t-sm mono" x="285" y="92">- constructor() private</text><text class="t-sm mono" x="285" y="106">+ static getInstance()</text><path class="ln-acc" d="M475 60 Q 545 60 545 95 Q 545 128 480 118" marker-end="url(#aa)"/><text class="t-sm" x="500" y="150">తనని తానే</text><text class="t-sm" x="500" y="164">create చేసుకుంటుంది</text><rect class="n-good" x="0" y="40" width="200" height="52" rx="4"/><text class="t mid" x="100" y="62">Client A</text><text class="t-sm mid" x="100" y="78">getInstance()</text><rect class="n-good" x="0" y="106" width="200" height="52" rx="4"/><text class="t mid" x="100" y="128">Client B</text><text class="t-sm mid" x="100" y="144">getInstance()</text><line class="ln" x1="204" y1="66" x2="271" y2="76" marker-end="url(#a)"/><line class="ln" x1="204" y1="132" x2="271" y2="100" marker-end="url(#a)"/><text class="t-acc mid" x="375" y="185">ఇద్దరికీ ఒకే object తిరిగి వస్తుంది</text></svg>
<div class="note">ప్రమాదం: ఇది ఒక <b>global variable</b> — hidden dependency, test lo mock చేయడం కష్టం. అందుకే modern code lo <b>Dependency Injection</b> మేలు (§33).</div>
</div>

### Code

```javascript
class AppConfig {
  static #instance = null;

  constructor() {
    if (AppConfig.#instance) return AppConfig.#instance; // ఉన్నదాన్నే తిప్పి ఇవ్వడం
    this.settings = { theme: "dark", lang: "te" };
    AppConfig.#instance = this;
  }

  static getInstance() {
    if (!AppConfig.#instance) AppConfig.#instance = new AppConfig();
    return AppConfig.#instance;
  }
}

const c1 = AppConfig.getInstance();
const c2 = AppConfig.getInstance();
console.log(c1 === c2); // true - ఒకటే object
c1.settings.theme = "light";
console.log(c2.settings.theme); // light - c1, c2 ఒకటే కాబట్టి
```

### Testing కోసం ఒక తప్పనిసరి చేర్పు

Singleton యొక్క అసలు నొప్పి testing lo కనిపిస్తుంది: ఒక test lo state మార్చితే అది తర్వాతి test కి కూడా అంటుకుంటుంది. అందుకే production Singleton lo ఎప్పుడూ ఒక reset తలుపు ఉంచుతారు:

```javascript
class AppConfig {
  static #instance = null;
  constructor() {
    if (AppConfig.#instance) throw new Error("getInstance() వాడు, new కాదు");
    this.settings = { theme: "dark", lang: "te" };
  }
  static getInstance() {
    if (!AppConfig.#instance) AppConfig.#instance = new AppConfig();
    return AppConfig.#instance;
  }
  static resetInstance() {
    AppConfig.#instance = null;   // ← tests మధ్య state లీక్ కాకుండా
  }
}

AppConfig.getInstance().settings.theme = "light";
AppConfig.resetInstance();
console.log(AppConfig.getInstance().settings.theme); // dark — తాజా instance
```

> Constructor lo `throw` చేయడం గమనించు — ఇది `new AppConfig()` ని నిశ్శబ్దంగా అనుమతించడం కంటే మెరుగు. నిశ్శబ్ద version ("ఉన్నదాన్నే తిప్పి ఇవ్వడం") పనిచేస్తుంది కానీ వాడేవాడికి తాను నియమం ఉల్లంఘిస్తున్నానని ఎప్పటికీ తెలియదు.

### ఎప్పుడు వాడాలి / వద్దు

| వాడు                   | వద్దు                                    |
| ---------------------- | ---------------------------------------- |
| Logger, Config, Cache  | ప్రతిచోటా global state కోసం (test కష్టం) |
| ఒకే resource (DB pool) | అనవసరంగా - inject చేయడం మంచిది           |

> **జాగ్రత్త:** Singleton అతిగా వాడితే hidden global state వస్తుంది → testing కష్టం. అవసరమైనప్పుడే.
>
> **Interview lo:** "Singleton ఒక anti-pattern అంటారు కదా?" అని అడిగితే — *"Global state ని దాచినప్పుడు అవును. కానీ ఒకే నిజమైన resource (connection pool) ని represent చేసినప్పుడు అది సరైనది. తేడా — singleton ని `getInstance()` తో లోపల పిలుస్తున్నామా, లేక బయట ఒకసారి create చేసి inject చేస్తున్నామా (§33). రెండోది testable."*

---

## 11. Factory Method

### వివరణ

**Factory Method** = object ని `new` తో నేరుగా కాకుండా, ఒక **factory method** ద్వారా create చేయడం. ఏ class object రావాలో ఆ method నిర్ణయిస్తుంది.

### Real-life Scenario

> **Restaurant** లో నువ్వు kitchen లోకి వెళ్ళి వంట చేయవు. "One pizza" అని **order** ఇస్తావు - kitchen (factory) సరైన dish తయారు చేసి ఇస్తుంది. నీకు internal recipe అక్కర్లేదు.

<div class="fig">
<div class="cap">Factory Method · "ఏది create చేయాలో" subclass నిర్ణయిస్తుంది</div>
<svg viewBox="0 0 750 220"><rect class="n" x="0" y="46" width="200" height="62" rx="4"/><rect class="n-dark" x="0" y="46" width="200" height="22" rx="4"/><text class="t-w mid" x="100" y="62">«abstract» Creator</text><text class="t-sm mono" x="10" y="84">+ factoryMethod()</text><text class="t-sm mono" x="10" y="98">+ operation()</text><line class="ln" x1="100" y1="118" x2="100" y2="150" marker-end="url(#hollow)"/><rect class="n" x="0" y="154" width="200" height="48" rx="4"/><rect class="n-dark" x="0" y="154" width="200" height="22" rx="4"/><text class="t-w mid" x="100" y="170">ConcreteCreator</text><text class="t-sm mono" x="10" y="192">+ factoryMethod()</text><rect class="n" x="400" y="46" width="200" height="48" rx="4"/><rect class="n-acc" x="400" y="46" width="200" height="22" rx="4"/><text class="t-w mid" x="500" y="62">«interface» Product</text><text class="t-sm mono" x="410" y="84">+ use()</text><line class="ln" x1="500" y1="118" x2="500" y2="150" marker-end="url(#hollow)"/><rect class="n" x="400" y="154" width="200" height="48" rx="4"/><rect class="n-dark" x="400" y="154" width="200" height="22" rx="4"/><text class="t-w mid" x="500" y="170">ConcreteProduct</text><text class="t-sm mono" x="410" y="192">+ use()</text><line class="ln-dash" x1="204" y1="178" x2="396" y2="178" marker-end="url(#a)"/><text class="t-sm mid" x="300" y="170">creates</text><text class="t-sm" x="240" y="76">Creator కి ConcreteProduct</text><text class="t-sm" x="240" y="92">గురించి తెలియదు — అది</text><text class="t-acc" x="240" y="108">interface ని మాత్రమే చూస్తుంది</text></svg>
<div class="note">కొత్త product రకం వస్తే — ఒక కొత్త <code>ConcreteCreator</code> + ఒక కొత్త <code>ConcreteProduct</code>. ఉన్న code lo <b>సున్నా మార్పు</b>.</div>
</div>

### Code

```javascript
class Circle {
  draw() {
    console.log("వృత్తం గీస్తున్నా ⭕");
  }
}
class Square {
  draw() {
    console.log("చతురస్రం గీస్తున్నా ⬜");
  }
}
class Triangle {
  draw() {
    console.log("త్రిభుజం గీస్తున్నా 🔺");
  }
}

// Factory - ఏ shape కావాలో string బట్టి సరైన object ఇస్తుంది
class ShapeFactory {
  static create(type) {
    switch (type) {
      case "circle":
        return new Circle();
      case "square":
        return new Square();
      case "triangle":
        return new Triangle();
      default:
        throw new Error(`Unknown shape: ${type}`);
    }
  }
}

// Client కి concrete class పేర్లు అక్కర్లేదు - "circle" అంటే చాలు
["circle", "square", "triangle"].forEach((t) => {
  ShapeFactory.create(t).draw();
});
// వృత్తం గీస్తున్నా ⭕
// చతురస్రం గీస్తున్నా ⬜
// త్రిభుజం గీస్తున్నా 🔺
```

### Key Points

- Creation logic ఒకే చోట (factory) - కొత్త type add చేస్తే client code మారదు
- Client concrete classes మీద కాకుండా factory + common contract మీద ఆధారపడుతుంది
- `switch` పెరిగితే registry (map) వాడి OCP-friendly చేయవచ్చు

---

## 12. Abstract Factory

### వివరణ

**Abstract Factory** = "factories యొక్క factory". సంబంధిత objects యొక్క **కుటుంబాన్ని (family)** ఒకేసారి create చేస్తుంది - అవి ఒకదానితో ఒకటి match అవ్వేలా.

### Real-life Scenario

> **Furniture showroom** లో "Victorian style" అడిగితే - Victorian chair + Victorian table + Victorian sofa అన్నీ ఒకే style లో వస్తాయి. "Modern" అడిగితే మొత్తం modern family. Styles mix అవ్వవు.

<div class="fig">
<div class="cap">Abstract Factory · సంబంధిత objects యొక్క కుటుంబం</div>
<svg viewBox="0 0 750 270"><rect class="n" x="275" y="8" width="200" height="62" rx="4"/><rect class="n-acc" x="275" y="8" width="200" height="22" rx="4"/><text class="t-w mid" x="375" y="24">«interface» AbstractFactory</text><text class="t-sm mono" x="285" y="46">+ createButton()</text><text class="t-sm mono" x="285" y="60">+ createCheckbox()</text><line class="ln" x1="340" y1="90" x2="200" y2="118" marker-end="url(#hollow)"/><line class="ln" x1="410" y1="90" x2="550" y2="118" marker-end="url(#hollow)"/><rect class="n" x="60" y="122" width="200" height="62" rx="4"/><rect class="n-dark" x="60" y="122" width="200" height="22" rx="4"/><text class="t-w mid" x="160" y="138">MacFactory</text><text class="t-sm mono" x="70" y="160">+ createButton()</text><text class="t-sm mono" x="70" y="174">+ createCheckbox()</text><rect class="n" x="490" y="122" width="200" height="62" rx="4"/><rect class="n-dark" x="490" y="122" width="200" height="22" rx="4"/><text class="t-w mid" x="590" y="138">WinFactory</text><text class="t-sm mono" x="500" y="160">+ createButton()</text><text class="t-sm mono" x="500" y="174">+ createCheckbox()</text><rect class="n-good" x="60" y="212" width="200" height="46" rx="4"/><text class="t-sm mid" x="160" y="232">MacButton · MacCheckbox</text><text class="t-sm mid" x="160" y="248">ఒకే కుటుంబం</text><rect class="n-info" x="490" y="212" width="200" height="46" rx="4"/><text class="t-sm mid" x="590" y="232">WinButton · WinCheckbox</text><text class="t-sm mid" x="590" y="248">ఒకే కుటుంబం</text><line class="ln-dash" x1="160" y1="194" x2="160" y2="208" marker-end="url(#a)"/><line class="ln-dash" x1="590" y1="194" x2="590" y2="208" marker-end="url(#a)"/><text class="t-acc mid" x="375" y="240">Factory ని మార్చితే మొత్తం</text><text class="t-acc mid" x="375" y="256">కుటుంబం ఒకేసారి మారుతుంది</text></svg>
<div class="note">Factory Method ఒక product ని create చేస్తుంది; Abstract Factory <b>పరస్పరం సరిపోయే products సమూహాన్ని</b>. Mac button పక్కన Windows checkbox రాకుండా ఇది ఆపుతుంది.</div>
</div>

### Code

```javascript
// Product family 1: Light theme UI
class LightButton {
  render() {
    console.log("తెల్ల button ☀️");
  }
}
class LightCheckbox {
  render() {
    console.log("తెల్ల checkbox ☀️");
  }
}

// Product family 2: Dark theme UI
class DarkButton {
  render() {
    console.log("నల్ల button 🌙");
  }
}
class DarkCheckbox {
  render() {
    console.log("నల్ల checkbox 🌙");
  }
}

// Abstract Factories - ఒక్కో family కి ఒక factory
class LightThemeFactory {
  createButton() {
    return new LightButton();
  }
  createCheckbox() {
    return new LightCheckbox();
  }
}
class DarkThemeFactory {
  createButton() {
    return new DarkButton();
  }
  createCheckbox() {
    return new DarkCheckbox();
  }
}

// Client ఒక factory తీసుకొని పూర్తి matching UI తయారు చేస్తుంది
function buildUI(factory) {
  factory.createButton().render();
  factory.createCheckbox().render();
}

console.log("--- User dark mode ఎంచుకున్నాడు ---");
buildUI(new DarkThemeFactory()); // నల్ల button + నల్ల checkbox (అన్నీ match)
console.log("--- User light mode ఎంచుకున్నాడు ---");
buildUI(new LightThemeFactory()); // తెల్ల button + తెల్ల checkbox
```

### Factory Method vs Abstract Factory

|                     | Factory Method       | Abstract Factory                       |
| ------------------- | -------------------- | -------------------------------------- |
| ఏం create చేస్తుంది | ఒక్క product         | Product family (చాలా related products) |
| ఉదా                 | `create("circle")`   | Dark theme మొత్తం UI                   |
| ముఖ్యం              | ఒక object type ఎంపిక | Products అన్నీ match అవ్వడం            |

---

## 13. Builder

### వివరణ

**Builder** = చాలా parameters ఉన్న object ని **అడుగడుగునా (step by step)** తయారు చేయడం. Constructor లో 10 arguments పెట్టే బదులు, readable method chaining వాడతాం.

### Real-life Scenario

> **Subway** sandwich: bread ఎంచుకో → veggies → sauce → toast? ఒక్కో step జోడించి చివరిలో sandwich ready. అన్నీ ఒకేసారి చెప్పక్కర్లేదు, optional వి skip చేయవచ్చు.

<div class="fig">
<div class="cap">Builder · చాలా parameters ఉన్న objects ని అడుగడుగునా కట్టడం</div>
<svg viewBox="0 0 750 210"><rect class="n" x="0" y="40" width="230" height="90" rx="4"/><rect class="n-acc" x="0" y="40" width="230" height="22" rx="4"/><text class="t-w mid" x="115" y="56">Builder</text><text class="t-sm mono" x="10" y="78">+ setEngine(v)   → this</text><text class="t-sm mono" x="10" y="92">+ setWheels(n)   → this</text><text class="t-sm mono" x="10" y="106">+ setColour(c)   → this</text><text class="t-sm mono" x="10" y="120">+ build()        → Car</text><line class="ln-dash" x1="234" y1="90" x2="300" y2="90" marker-end="url(#a)"/><text class="t-sm mid" x="267" y="82">builds</text><rect class="n" x="304" y="40" width="200" height="62" rx="4"/><rect class="n-dark" x="304" y="40" width="200" height="22" rx="4"/><text class="t-w mid" x="404" y="56">Car</text><text class="t-sm mono" x="314" y="78">- engine, wheels</text><text class="t-sm mono" x="314" y="92">- colour, sunroof</text><rect class="n-good" x="530" y="40" width="220" height="112" rx="4"/><text class="t" x="544" y="62">ఎందుకు అవసరం</text><text class="t-sm mono" x="544" y="84">new Car(v8, 4, "red",</text><text class="t-sm mono" x="544" y="98">  true, false, null, 2)</text><text class="t-sm" x="544" y="118">— ఈ 7 arguments ఏమిటో</text><text class="t-sm" x="544" y="132">ఎవరికీ గుర్తుండవు.</text><text class="t-acc" x="544" y="146">Builder వాటికి పేర్లు ఇస్తుంది.</text><text class="t-sm mono mid" x="375" y="180">new Builder().setEngine("v8").setColour("red").build()</text><text class="t-sm mid" x="375" y="198">ప్రతి setter <tspan class="t-acc">this</tspan> ని return చేస్తుంది — అదే chaining ని సాధ్యం చేస్తుంది</text></svg>
</div>

### Code

```javascript
class Burger {
  constructor(builder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.patty = builder.patty;
    this.veggies = builder.veggies;
  }
  describe() {
    const parts = [`${this.size} burger`];
    if (this.patty) parts.push("patty");
    if (this.cheese) parts.push("cheese");
    if (this.veggies) parts.push("veggies");
    console.log(parts.join(" + "));
  }
}

class BurgerBuilder {
  constructor(size) {
    this.size = size;
  } // size తప్పనిసరి
  addCheese() {
    this.cheese = true;
    return this;
  } // this return → chaining
  addPatty() {
    this.patty = true;
    return this;
  }
  addVeggies() {
    this.veggies = true;
    return this;
  }
  build() {
    return new Burger(this);
  }
}

// Method chaining తో అడుగడుగునా build - optional వి skip చేయవచ్చు
const burger = new BurgerBuilder("Large")
  .addPatty()
  .addCheese()
  .addVeggies()
  .build();
burger.describe(); // Large burger + patty + cheese + veggies

const plain = new BurgerBuilder("Small").addPatty().build();
plain.describe(); // Small burger + patty
```

### Key Points

- చాలా (ముఖ్యంగా optional) parameters ఉంటే Builder - "telescoping constructor" నొప్పి పోతుంది
- ప్రతి method `this` return చేస్తే fluent chaining (Method Chaining - OOP Topic 16)
- Immutable object తయారీకి కూడా బాగుంటుంది (build() తర్వాత మార్చలేం)

---

## 14. Prototype

### వివరణ

**Prototype** = ఒక object ని scratch నుండి కాకుండా, ఉన్న object ని **clone** చేసి కొత్తది తయారు చేయడం. Creation ఖరీదైనప్పుడు (heavy setup) ఉపయోగం.

### Real-life Scenario

> ఒక **resume template** ని ప్రతిసారి మొదటి నుండి type చేయవు - ఉన్నదాన్ని **copy** చేసి పేరు, details మారుస్తావు. అదే prototype cloning.

<div class="fig">
<div class="cap">Prototype · కొత్తగా కట్టకుండా, ఉన్నదాన్ని clone చేయడం</div>
<svg viewBox="0 0 750 220"><rect class="n" x="0" y="40" width="220" height="48" rx="4"/><rect class="n-acc" x="0" y="40" width="220" height="22" rx="4"/><text class="t-w mid" x="110" y="56">«interface» Prototype</text><text class="t-sm mono" x="10" y="78">+ clone(): Prototype</text><line class="ln" x1="110" y1="106" x2="110" y2="138" marker-end="url(#hollow)"/><rect class="n" x="0" y="142" width="220" height="62" rx="4"/><rect class="n-dark" x="0" y="142" width="220" height="22" rx="4"/><text class="t-w mid" x="110" y="158">Document</text><text class="t-sm mono" x="10" y="180">- heavy config</text><text class="t-sm mono" x="10" y="194">+ clone()</text><line class="ln-dash" x1="224" y1="178" x2="300" y2="178" marker-end="url(#a)"/><text class="t-sm mid" x="262" y="170">clone()</text><rect class="n" x="304" y="142" width="220" height="62" rx="4"/><rect class="n-dark" x="304" y="142" width="220" height="22" rx="4"/><text class="t-w mid" x="414" y="158">Document (copy)</text><text class="t-sm mono" x="314" y="180">- అదే config</text><text class="t-sm mono" x="314" y="194">+ clone()</text><rect class="n-good" x="530" y="40" width="220" height="86" rx="4"/><text class="t" x="544" y="62">ఎప్పుడు వాడాలి</text><text class="t-sm" x="544" y="84">Object create చేయడం ఖరీదైనప్పుడు —</text><text class="t-sm" x="544" y="100">DB read, network call, భారీ parsing.</text><text class="t-acc" x="544" y="118">కొత్తగా కట్టడం కంటే copy చౌక.</text><rect class="n-bad" x="530" y="136" width="220" height="72" rx="4"/><text class="t" x="544" y="158">ఉచ్చు: shallow copy</text><text class="t-sm" x="544" y="178">లోపలి objects ని కూడా clone</text><text class="t-sm" x="544" y="194">చేయకపోతే — రెండూ ఒకే</text><text class="t-sm" x="544" y="208">array ని పంచుకుంటాయి.</text></svg>
</div>

### Code

```javascript
class Enemy {
  constructor(type, health, weapon) {
    this.type = type;
    this.health = health;
    this.weapon = weapon;
  }
  // clone - ఉన్న object నుండి కొత్తది (deep-ish copy)
  clone() {
    return new Enemy(this.type, this.health, this.weapon);
  }
  describe() {
    console.log(`${this.type} (HP:${this.health}, weapon:${this.weapon})`);
  }
}

// ఖరీదైన base enemy ఒకసారి తయారు చేసి, మిగతా వాటిని clone చేస్తాం
const baseOrc = new Enemy("Orc", 100, "Axe");

const orc1 = baseOrc.clone();
const orc2 = baseOrc.clone();
orc2.weapon = "Sword"; // clone ని స్వతంత్రంగా మార్చవచ్చు

baseOrc.describe(); // Orc (HP:100, weapon:Axe)
orc1.describe(); // Orc (HP:100, weapon:Axe)
orc2.describe(); // Orc (HP:100, weapon:Sword) - base మారలేదు

// JS native: Object.create / structuredClone కూడా prototype ఆలోచనే
const config = { retries: 3, nested: { debug: true } };
const clonedConfig = structuredClone(config); // deep clone
clonedConfig.nested.debug = false;
console.log(config.nested.debug); // true - original safe
console.log(clonedConfig.nested.debug); // false
```

### Key Points

- Object creation ఖరీదైనప్పుడు (DB hit, heavy compute) clone వేగంగా
- **Shallow vs Deep** clone జాగ్రత్త: nested objects shared అవ్వకుండా `structuredClone` వాడు
- JavaScript prototype chain (OOP Topic 13) ఈ pattern యొక్క native రూపమే

---

# Part 4 — Structural Patterns

> Structural patterns = **objects/classes ని ఎలా కలిపి పెద్ద structure** తయారు చేయాలో చెప్పేవి. Objects మధ్య సంబంధాలను simple గా ఉంచుతాయి.

---

## 15. Adapter

### వివరణ

**Adapter** = రెండు incompatible interfaces మధ్య **అనువాదకుడు (translator)**. ఒక class ఆశించే shape కి, వేరే class ని సరిపడేలా చేస్తుంది.

### Real-life Scenario

> నీ laptop కి **US plug**, ఇంట్లో **Indian socket**. మధ్యలో **travel adapter** పెడతావు - రెండూ మారవు, adapter అనుసంధానం చేస్తుంది.

<div class="fig">
<div class="cap">Adapter · సరిపోని రెండు interfaces ని కలపడం</div>
<svg viewBox="0 0 750 220"><rect class="n-good" x="0" y="60" width="150" height="48" rx="4"/><text class="t mid" x="75" y="82">Client</text><text class="t-sm mid" x="75" y="98">Target ని ఆశిస్తుంది</text><line class="ln" x1="154" y1="84" x2="216" y2="84" marker-end="url(#a)"/><rect class="n" x="220" y="46" width="190" height="48" rx="4"/><rect class="n-acc" x="220" y="46" width="190" height="22" rx="4"/><text class="t-w mid" x="315" y="62">«interface» Target</text><text class="t-sm mono" x="230" y="84">+ request()</text><line class="ln" x1="315" y1="112" x2="315" y2="144" marker-end="url(#hollow)"/><rect class="n" x="220" y="148" width="190" height="62" rx="4"/><rect class="n-dark" x="220" y="148" width="190" height="22" rx="4"/><text class="t-w mid" x="315" y="164">Adapter</text><text class="t-sm mono" x="230" y="186">- adaptee</text><text class="t-sm mono" x="230" y="200">+ request()</text><line class="ln" x1="414" y1="184" x2="476" y2="184" marker-end="url(#a)"/><text class="t-sm mid" x="445" y="176">అనువదిస్తుంది</text><rect class="n" x="480" y="148" width="220" height="48" rx="4"/><rect class="n-dark" x="480" y="148" width="220" height="22" rx="4"/><text class="t-w mid" x="590" y="164">Adaptee</text><text class="t-sm mono" x="490" y="186">+ specificRequest()</text><text class="t-sm" x="480" y="66">ఇది ఇప్పటికే ఉన్న / third-party class.</text><text class="t-sm" x="480" y="82">దీన్ని మనం మార్చలేం — అందుకే</text><text class="t-acc" x="480" y="98">దాని చుట్టూ ఒక అనువాదకుడు.</text></svg>
<div class="note">నిజ జీవితంలో: మన code <code>pay()</code> ఆశిస్తుంది, Razorpay SDK <code>createTransaction()</code> ఇస్తుంది. Adapter ఆ అంతరాన్ని పూడుస్తుంది — <b>SDK ని మార్చకుండా</b>.</div>
</div>

### Code

```javascript
// మన app ఆశించే interface: log(message)
class ModernLogger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }
}

// పాత 3rd-party library - వేరే method పేరు (writeToFile)
class OldLibrary {
  writeToFile(text) {
    console.log(`పాత library file కి రాస్తోంది: "${text}"`);
  }
}

// Adapter - OldLibrary ని ModernLogger interface లా కనిపించేలా చేస్తుంది
class LoggerAdapter {
  constructor(oldLib) {
    this.oldLib = oldLib;
  }
  log(message) {
    this.oldLib.writeToFile(message);
  } // అనువాదం
}

// Client కేవలం log() మాత్రమే వాడతాడు - లోపల ఏ library అనేది పట్టదు
function runApp(logger) {
  logger.log("App started");
}

runApp(new ModernLogger()); // [LOG] App started
runApp(new LoggerAdapter(new OldLibrary())); // పాత library file కి రాస్తోంది: "App started"
```

### Key Points

- పాత/3rd-party code ని మార్చకుండా కొత్త system కి కలపడానికి
- Adapter "wrap" చేస్తుంది; interface translate చేస్తుంది (behaviour మార్చదు)

---

## 16. Bridge

### వివరణ

**Bridge** = రెండు స్వతంత్రంగా మారే dimensions ని విడదీసి (abstraction vs implementation), వాటిని ఒక "bridge" (composition) తో కలపడం. Class explosion ని ఆపుతుంది.

### Real-life Scenario

> **Remote** (abstraction) మరియు **Device** (TV/Radio - implementation) విడివిడిగా. ఏ remote అయినా ఏ device తోనైనా పని చేస్తుంది. లేకపోతే TVRemote, RadioRemote, SmartTVRemote... explosion అవుతుంది.

<div class="fig">
<div class="cap">Bridge · రెండు స్వతంత్ర axes ని విడదీయడం</div>
<svg viewBox="0 0 750 264"><rect class="n" x="0" y="40" width="210" height="62" rx="4"/><rect class="n-acc" x="0" y="40" width="210" height="22" rx="4"/><text class="t-w mid" x="105" y="56">Abstraction</text><text class="t-sm mono" x="10" y="78"># impl: Implementor</text><text class="t-sm mono" x="10" y="92">+ operation()</text><line class="ln" x1="214" y1="66" x2="300" y2="66" marker-end="url(#a)"/><text class="t-sm mid" x="257" y="58">◆ has-a</text><rect class="n" x="400" y="40" width="210" height="48" rx="4"/><rect class="n-acc" x="400" y="40" width="210" height="22" rx="4"/><text class="t-w mid" x="505" y="56">«interface» Implementor</text><text class="t-sm mono" x="410" y="78">+ doWork()</text><line class="ln" x1="105" y1="106" x2="105" y2="138" marker-end="url(#hollow)"/><line class="ln" x1="505" y1="106" x2="505" y2="138" marker-end="url(#hollow)"/><rect class="n" x="0" y="142" width="100" height="22" rx="4"/><rect class="n-dark" x="0" y="142" width="100" height="22" rx="4"/><text class="t-w mid" x="50" y="158">Circle</text><rect class="n" x="110" y="142" width="100" height="22" rx="4"/><rect class="n-dark" x="110" y="142" width="100" height="22" rx="4"/><text class="t-w mid" x="160" y="158">Square</text><rect class="n" x="400" y="142" width="100" height="22" rx="4"/><rect class="n-dark" x="400" y="142" width="100" height="22" rx="4"/><text class="t-w mid" x="450" y="158">SVG</text><rect class="n" x="510" y="142" width="100" height="22" rx="4"/><rect class="n-dark" x="510" y="142" width="100" height="22" rx="4"/><text class="t-w mid" x="560" y="158">Canvas</text><rect class="n-good" x="0" y="186" width="750" height="70" rx="4"/><text class="t mid" x="375" y="208">2 shapes × 2 renderers = 4 కలయికలు, కానీ 4 classes రాయలేదు — <tspan class="t-acc">2 + 2 మాత్రమే</tspan></text><text class="t-sm mid" x="375" y="230">Inheritance తో చేస్తే: CircleSVG, CircleCanvas, SquareSVG, SquareCanvas — combinatorial</text><text class="t-sm mid" x="375" y="246">పేలుడు</text></svg>
</div>

### Code

```javascript
// Implementation side - devices
class TV {
  turnOn() {
    console.log("TV ఆన్ అయింది 📺");
  }
  setVolume(v) {
    console.log(`TV volume: ${v}`);
  }
}
class Radio {
  turnOn() {
    console.log("Radio ఆన్ అయింది 📻");
  }
  setVolume(v) {
    console.log(`Radio volume: ${v}`);
  }
}

// Abstraction side - remotes (device ని compose చేస్తాయి = bridge)
class RemoteControl {
  constructor(device) {
    this.device = device;
  }
  power() {
    this.device.turnOn();
  }
}
// Abstraction ని విడిగా పెంచవచ్చు - devices మార్చకుండా
class AdvancedRemote extends RemoteControl {
  mute() {
    this.device.setVolume(0);
    console.log("Muted 🔇");
  }
}

// ఏ remote + ఏ device అయినా mix చేయవచ్చు (2+2 combos, 4 classes కాదు)
new RemoteControl(new TV()).power(); // TV ఆన్ అయింది 📺
const r = new AdvancedRemote(new Radio());
r.power(); // Radio ఆన్ అయింది 📻
r.mute(); // Radio volume: 0 / Muted 🔇
```

### Key Points

- రెండు dimensions స్వతంత్రంగా మారుతున్నప్పుడు (remote రకం × device రకం)
- Inheritance explosion (M×N classes) → composition (M+N classes)

---

## 17. Composite

### వివరణ

**Composite** = వ్యక్తిగత objects (leaf) మరియు objects గుంపులని (composite) **ఒకేలా** treat చేయడం. Tree structure - part-whole hierarchy.

### Real-life Scenario

> **Folder** లో files ఉంటాయి, మరో folders ఉంటాయి. "size ఎంత?" అని folder ని అడిగితే, అది లోపలి అన్నిటినీ కలిపి చెప్తుంది. File అయినా folder అయినా `getSize()` ఒకేలా అడుగుతాం.

<div class="fig">
<div class="cap">Composite · leaf ని, container ని ఒకేలా చూడటం</div>
<svg viewBox="0 0 750 262"><rect class="n" x="275" y="8" width="210" height="62" rx="4"/><rect class="n-acc" x="275" y="8" width="210" height="22" rx="4"/><text class="t-w mid" x="380" y="24">«abstract» Component</text><text class="t-sm mono" x="285" y="46">+ operation()</text><text class="t-sm mono" x="285" y="60">+ size</text><line class="ln" x1="340" y1="82" x2="200" y2="112" marker-end="url(#hollow)"/><line class="ln" x1="420" y1="82" x2="560" y2="112" marker-end="url(#hollow)"/><rect class="n" x="100" y="116" width="200" height="48" rx="4"/><rect class="n-dark" x="100" y="116" width="200" height="22" rx="4"/><text class="t-w mid" x="200" y="132">Leaf (File)</text><text class="t-sm mono" x="110" y="154">+ operation()</text><rect class="n" x="460" y="116" width="200" height="76" rx="4"/><rect class="n-dark" x="460" y="116" width="200" height="22" rx="4"/><text class="t-w mid" x="560" y="132">Composite (Folder)</text><text class="t-sm mono" x="470" y="154">- children[]</text><text class="t-sm mono" x="470" y="168">+ add(c) / remove(c)</text><text class="t-sm mono" x="470" y="182">+ operation()</text><path class="ln" d="M660 140 Q 720 140 720 60 Q 720 20 489 20" marker-end="url(#dia)"/><text class="t-acc" x="600" y="196">Composite తనలో Components ని</text><text class="t-acc" x="600" y="212">పట్టుకుంటుంది — అదే recursion</text><rect class="n-good" x="0" y="196" width="560" height="56" rx="4"/><text class="t" x="16" y="218">Client ఎప్పుడూ "ఇది file నా folder నా" అని అడగదు</text><text class="t-sm" x="16" y="224"><tspan class="mono">node.size</tspan> — Leaf అయితే సొంత size, Composite అయితే children మొత్తం. Type check లేదు.</text></svg>
</div>

### Code

```javascript
// Leaf - వ్యక్తిగత file
class FileItem {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
  getSize() {
    return this.size;
  }
}

// Composite - folder (files + folders రెండూ కలిగి ఉంటుంది)
class Folder {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
  add(item) {
    this.children.push(item);
    return this;
  }
  // File అయినా Folder అయినా అందరికీ getSize() ఉంది - ఒకేలా treat
  getSize() {
    return this.children.reduce((sum, child) => sum + child.getSize(), 0);
  }
}

const root = new Folder("root");
root.add(new FileItem("a.txt", 100)).add(new FileItem("b.txt", 200));

const sub = new Folder("images");
sub.add(new FileItem("pic.png", 500));
root.add(sub);

console.log(`Total size: ${root.getSize()} KB`); // 800 KB (100+200+500, recursive)
console.log(`Images size: ${sub.getSize()} KB`); // 500 KB
```

### Key Points

- Leaf మరియు Composite ఒకే interface (`getSize`) పంచుకుంటాయి → client తేడా చూడక్కర్లేదు
- Recursion సహజంగా వస్తుంది (folder లోపల folder)
- UI trees, org charts, file systems, menus - అన్నీ Composite

---

## 18. Decorator

### వివరణ

**Decorator** = ఒక object కి **runtime లో** కొత్త behaviour ని పొరలుగా (layers) చుట్టడం - subclass లు తయారు చేయకుండా.

### Real-life Scenario

> **Coffee**: base coffee → milk జోడించు → sugar జోడించు → cream జోడించు. ప్రతి addition price + description ని పెంచుతుంది. MilkSugarCreamCoffee అనే class వద్దు - పొరలుగా చుడతాం.

<div class="fig">
<div class="cap">Decorator · inheritance లేకుండా runtime lo behaviour కలపడం</div>
<svg viewBox="0 0 750 250"><rect class="n" x="275" y="8" width="210" height="48" rx="4"/><rect class="n-acc" x="275" y="8" width="210" height="22" rx="4"/><text class="t-w mid" x="380" y="24">«interface» Component</text><text class="t-sm mono" x="285" y="46">+ cost()</text><line class="ln" x1="340" y1="60" x2="190" y2="92" marker-end="url(#hollow)"/><line class="ln" x1="420" y1="60" x2="570" y2="92" marker-end="url(#hollow)"/><rect class="n" x="90" y="96" width="200" height="48" rx="4"/><rect class="n-dark" x="90" y="96" width="200" height="22" rx="4"/><text class="t-w mid" x="190" y="112">Coffee</text><text class="t-sm mono" x="100" y="134">+ cost() → 50</text><rect class="n" x="470" y="96" width="210" height="62" rx="4"/><rect class="n-dark" x="470" y="96" width="210" height="22" rx="4"/><text class="t-w mid" x="575" y="112">Decorator</text><text class="t-sm mono" x="480" y="134"># inner: Component</text><text class="t-sm mono" x="480" y="148">+ cost()</text><path class="ln" d="M680 120 Q 730 120 730 40 Q 730 14 489 14" marker-end="url(#dia)"/><line class="ln" x1="575" y1="160" x2="575" y2="192" marker-end="url(#hollow)"/><rect class="n" x="400" y="196" width="160" height="48" rx="4"/><rect class="n-dark" x="400" y="196" width="160" height="22" rx="4"/><text class="t-w mid" x="480" y="212">Milk</text><text class="t-sm mono" x="410" y="234">cost()+10</text><rect class="n" x="570" y="196" width="160" height="48" rx="4"/><rect class="n-dark" x="570" y="196" width="160" height="22" rx="4"/><text class="t-w mid" x="650" y="212">Sugar</text><text class="t-sm mono" x="580" y="234">cost()+5</text><rect class="n-good" x="0" y="150" width="360" height="88" rx="4"/><text class="t" x="16" y="172">పొరలుగా పేర్చడం</text><text class="t-sm mono" x="16" y="194">new Sugar(new Milk(new Coffee()))</text><text class="t-sm" x="16" y="214">cost() = 50 + 10 + 5 = <tspan class="t-acc">65</tspan></text><text class="t-sm" x="16" y="232">Decorator కూడా Component — అందుకే మళ్ళీ చుట్టొచ్చు</text></svg>
<div class="note">Inheritance తో చేస్తే: <code>CoffeeWithMilk</code>, <code>CoffeeWithMilkAndSugar</code>… n toppings కి 2<tspan class="t-acc">ⁿ</tspan> classes. Decorator తో n classes.</div>
</div>

### Code

```javascript
// Base component
class Coffee {
  cost() {
    return 50;
  }
  description() {
    return "Coffee";
  }
}

// Decorators - ఒక coffee ని wrap చేసి కొత్తది జోడిస్తాయి
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost() + 10;
  }
  description() {
    return this.coffee.description() + " + Milk";
  }
}
class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() {
    return this.coffee.cost() + 5;
  }
  description() {
    return this.coffee.description() + " + Sugar";
  }
}

// పొరలుగా చుట్టడం (wrap) - ఎన్ని అయినా, ఏ క్రమంలోనైనా
let order = new Coffee();
order = new MilkDecorator(order);
order = new SugarDecorator(order);
order = new SugarDecorator(order); // డబుల్ sugar!

console.log(order.description()); // Coffee + Milk + Sugar + Sugar
console.log(`Rs.${order.cost()}`); // Rs.70 (50+10+5+5)
```

### Decorator vs Inheritance

|                 | Decorator       | Inheritance                |
| --------------- | --------------- | -------------------------- |
| ఎప్పుడు జోడించు | Runtime         | Compile time               |
| Combinations    | పొరలుగా ఎన్నైనా | ప్రతి combo కి కొత్త class |
| Flexibility     | ఎక్కువ          | తక్కువ                     |

> **గమనిక:** OOP §25 lo `Symbol.iterator`, §21 lo wrappers చూశాం - Decorator అదే "wrap చేసి పెంచడం" ఆలోచన.

---

## 19. Facade

### వివరణ

**Facade** = ఒక సంక్లిష్టమైన subsystem కి **ఒక సాధారణ ముఖద్వారం (single simple interface)**. లోపలి గజిబిజిని దాచి, client కి ఒక్క సులభమైన method ఇస్తుంది.

### Real-life Scenario

> **Car** లో "start" button నొక్కితే - fuel pump, ignition, battery, starter motor అన్నీ లోపల జరుగుతాయి. నీకు ఒక్క button (facade) చాలు, లోపలి 10 steps అక్కర్లేదు.

<div class="fig">
<div class="cap">Facade · జటిలమైన subsystem కి ఒక సులభమైన ముఖద్వారం</div>
<svg viewBox="0 0 750 258"><rect class="n-good" x="0" y="70" width="160" height="50" rx="4"/><text class="t mid" x="80" y="92">Client</text><text class="t-sm mid" x="80" y="108">ఒకే ఒక్క call</text><line class="ln" x1="164" y1="95" x2="226" y2="95" marker-end="url(#a)"/><rect class="n" x="230" y="70" width="190" height="48" rx="4"/><rect class="n-acc" x="230" y="70" width="190" height="22" rx="4"/><text class="t-w mid" x="325" y="86">Facade</text><text class="t-sm mono" x="240" y="108">+ placeOrder()</text><line class="ln-dash" x1="424" y1="82" x2="500" y2="30" marker-end="url(#a)"/><line class="ln-dash" x1="424" y1="95" x2="500" y2="95" marker-end="url(#a)"/><line class="ln-dash" x1="424" y1="108" x2="500" y2="160" marker-end="url(#a)"/><rect class="n" x="504" y="10" width="246" height="40" rx="4"/><text class="t-sm mid" x="627" y="35">InventoryService</text><rect class="n" x="504" y="76" width="246" height="40" rx="4"/><text class="t-sm mid" x="627" y="101">PaymentService</text><rect class="n" x="504" y="142" width="246" height="40" rx="4"/><text class="t-sm mid" x="627" y="167">ShippingService</text><rect class="n-info" x="0" y="196" width="750" height="52" rx="4"/><text class="t mid" x="375" y="218">Facade subsystems ని <tspan class="t-acc">దాచదు</tspan> — కేవలం సులభమైన దారి ఇస్తుంది</text><text class="t-sm mid" x="375" y="238">అవసరమైన client ఇప్పటికీ లోపలి services ని నేరుగా వాడొచ్చు. ఇది ఒక సౌకర్యం, ఒక గోడ కాదు.</text></svg>
</div>

### Code

```javascript
// సంక్లిష్ట subsystem - చాలా భాగాలు
class FuelPump {
  activate() {
    console.log("Fuel pump ఆన్");
  }
}
class Ignition {
  fire() {
    console.log("Ignition fired");
  }
}
class Starter {
  crank() {
    console.log("Starter motor తిరుగుతోంది");
  }
}

// Facade - అన్నిటినీ దాచి ఒక్క start() ఇస్తుంది
class CarFacade {
  constructor() {
    this.fuel = new FuelPump();
    this.ignition = new Ignition();
    this.starter = new Starter();
  }
  start() {
    console.log("--- Car start అవుతోంది ---");
    this.fuel.activate();
    this.ignition.fire();
    this.starter.crank();
    console.log("🚗 Car ready!");
  }
}

// Client కి ఒక్క method చాలు - లోపలి complexity అక్కర్లేదు
new CarFacade().start();
// --- Car start అవుతోంది ---
// Fuel pump ఆన్ / Ignition fired / Starter motor తిరుగుతోంది / 🚗 Car ready!
```

### Key Points

- Complex library/subsystem ముందు ఒక సులభ layer
- Client ని subsystem మార్పుల నుండి కాపాడుతుంది (loose coupling)
- Adapter interface _మారుస్తుంది_; Facade interface ని _సులభం_ చేస్తుంది

---

## 20. Flyweight

### వివరణ

**Flyweight** = వేలాది objects ఉన్నప్పుడు, common data (intrinsic) ని share చేసి memory ఆదా చేయడం. మారే data (extrinsic) మాత్రం బయట ఉంచుతాం.

### Real-life Scenario

> **అడవి** లో 10 లక్షల చెట్లు. ప్రతి చెట్టుకి texture, color image (2MB) విడిగా store చేస్తే memory పేలుతుంది. బదులుగా "Oak" type data ఒక్కసారి store చేసి, అన్ని Oak చెట్లు దాన్ని share చేస్తాయి; ప్రతి చెట్టుకి కేవలం (x, y) position మాత్రం.

<div class="fig">
<div class="cap">Flyweight · పంచుకోగల state ని వేరు చేసి memory ఆదా చేయడం</div>
<svg viewBox="0 0 750 252"><rect class="n" x="250" y="8" width="250" height="62" rx="4"/><rect class="n-acc" x="250" y="8" width="250" height="22" rx="4"/><text class="t-w mid" x="375" y="24">FlyweightFactory</text><text class="t-sm mono" x="260" y="46">- pool: Map</text><text class="t-sm mono" x="260" y="60">+ get(key): Flyweight</text><line class="ln-dash" x1="375" y1="74" x2="375" y2="106" marker-end="url(#a)"/><text class="t-sm mid" x="375" y="98">ఉంటే తిరిగి ఇవ్వు, లేకపోతే create</text><rect class="n" x="250" y="116" width="250" height="62" rx="4"/><rect class="n-dark" x="250" y="116" width="250" height="22" rx="4"/><text class="t-w mid" x="375" y="132">Flyweight (Glyph "A")</text><text class="t-sm mono" x="260" y="154">- font, shape  ← intrinsic</text><text class="t-sm mono" x="260" y="168">+ draw(x, y)   ← extrinsic</text><rect class="n-good" x="0" y="8" width="230" height="72" rx="4"/><text class="t" x="14" y="30">INTRINSIC (పంచుకునేది)</text><text class="t-sm" x="14" y="52">అక్షరం ఆకారం, font, రంగు —</text><text class="t-sm" x="14" y="68">ఇవి అన్ని "A" లకీ ఒకటే</text><rect class="n-info" x="520" y="8" width="230" height="72" rx="4"/><text class="t" x="534" y="30">EXTRINSIC (బయటిది)</text><text class="t-sm" x="534" y="52">ఈ "A" ఎక్కడ ఉంది (x, y) —</text><text class="t-sm" x="534" y="68">ఇది ప్రతి సారీ వేరు</text><rect class="n-acc" x="0" y="190" width="750" height="52" rx="4"/><text class="t-w mid" x="375" y="212">1 లక్ష అక్షరాల document = 1 లక్ష objects కాదు — <tspan class="mono">~60</tspan> Glyph objects + positions</text><text class="t-w-sm mid" x="375" y="232">మారని state ని పంచుకోవడం, మారే state ని బయట ఉంచడం — అదే మొత్తం ఆలోచన</text></svg>
</div>

### Code

```javascript
// Flyweight - share అయ్యే intrinsic data (type, color, texture)
class TreeType {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  render(x, y) {
    console.log(`${this.color} ${this.name} @(${x},${y})`);
  }
}

// Factory - ఒకే type ని పంచుతుంది (cache)
class TreeFactory {
  static #types = new Map();
  static getType(name, color) {
    const key = `${name}_${color}`;
    if (!TreeFactory.#types.has(key)) {
      TreeFactory.#types.set(key, new TreeType(name, color));
    }
    return TreeFactory.#types.get(key); // ఉన్నదే share
  }
  static get typeCount() {
    return TreeFactory.#types.size;
  }
}

// చెట్టు - కేవలం extrinsic (position) + shared type reference
class Tree {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  render() {
    this.type.render(this.x, this.y);
  }
}

const forest = [];
for (let i = 0; i < 1000; i++) {
  const type = TreeFactory.getType("Oak", "Green"); // అన్నీ ఒకే object share
  forest.push(new Tree(i, i * 2, type));
}
forest[0].render(); // Green Oak @(0,0)
forest[999].render(); // Green Oak @(999,1998)
console.log(
  `Trees: ${forest.length}, unique TreeType objects: ${TreeFactory.typeCount}`,
);
// Trees: 1000, unique TreeType objects: 1  (memory ఆదా!)
```

### Key Points

- **Intrinsic** (share అయ్యేది) vs **Extrinsic** (ఒక్కో object కి ప్రత్యేకం) విడదీయి
- వేలాది సారూప్య objects ఉన్నప్పుడు మాత్రమే - లేకపోతే over-engineering
- Text editors (character glyphs), games (particles), maps - Flyweight

---

## 21. Proxy

### వివరణ

**Proxy** = అసలు object కి బదులు నిలిచే **ప్రతినిధి (stand-in)**. Access ని control చేస్తుంది - lazy loading, permission check, caching, logging కోసం.

### Real-life Scenario

> **Credit card** = నీ bank account కి proxy. షాప్ లో account నేరుగా ఇవ్వవు; card (proxy) ద్వారా access - అది limit check, security చేస్తుంది.

<div class="fig">
<div class="cap">Proxy · అసలు objectకి ముందు నిలబడే ప్రతినిధి</div>
<svg viewBox="0 0 750 250"><rect class="n-good" x="0" y="70" width="150" height="48" rx="4"/><text class="t mid" x="75" y="98">Client</text><line class="ln" x1="154" y1="94" x2="216" y2="94" marker-end="url(#a)"/><rect class="n" x="220" y="56" width="190" height="48" rx="4"/><rect class="n-acc" x="220" y="56" width="190" height="22" rx="4"/><text class="t-w mid" x="315" y="72">«interface» Subject</text><text class="t-sm mono" x="230" y="94">+ request()</text><line class="ln" x1="280" y1="122" x2="200" y2="154" marker-end="url(#hollow)"/><line class="ln" x1="350" y1="122" x2="500" y2="154" marker-end="url(#hollow)"/><rect class="n" x="100" y="158" width="200" height="48" rx="4"/><rect class="n-dark" x="100" y="158" width="200" height="22" rx="4"/><text class="t-w mid" x="200" y="174">RealSubject</text><text class="t-sm mono" x="110" y="196">+ request()</text><rect class="n" x="400" y="158" width="210" height="62" rx="4"/><rect class="n-dark" x="400" y="158" width="210" height="22" rx="4"/><text class="t-w mid" x="505" y="174">Proxy</text><text class="t-sm mono" x="410" y="196">- real: RealSubject</text><text class="t-sm mono" x="410" y="210">+ request()</text><line class="ln-dash" x1="400" y1="194" x2="304" y2="194" marker-end="url(#a)"/><text class="t-sm mid" x="352" y="186">నియంత్రిత access</text><rect class="n-info" x="630" y="150" width="120" height="90" rx="4"/><text class="t-sm" x="642" y="172">Proxy రకాలు:</text><text class="t-sm" x="642" y="192">· Virtual (lazy)</text><text class="t-sm" x="642" y="208">· Protection (auth)</text><text class="t-sm" x="642" y="224">· Remote (network)</text><text class="t-sm" x="642" y="240">· Caching</text><text class="t-sm" x="0" y="140">Client కి Proxy నా RealSubject నా అనేది తెలియదు — రెండూ ఒకే interface</text></svg>
<div class="note"><b>Decorator vs Proxy:</b> రెండూ ఒకేలా కనిపిస్తాయి. తేడా <i>ఉద్దేశంలో</i> — Decorator <b>సామర్థ్యాన్ని కలుపుతుంది</b>, Proxy <b>access ని నియంత్రిస్తుంది</b>.</div>
</div>

### Code

```javascript
// అసలు (ఖరీదైన) object
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.#loadFromDisk(); // ఖరీదైన operation
  }
  #loadFromDisk() {
    console.log(`💾 ${this.filename} disk నుండి load అవుతోంది...`);
  }
  display() {
    console.log(`🖼️ ${this.filename} చూపిస్తోంది`);
  }
}

// Proxy - అవసరమైనప్పుడే (lazy) అసలు object ని create చేస్తుంది
class ImageProxy {
  constructor(filename) {
    this.filename = filename;
    this.real = null;
  }
  display() {
    if (!this.real) this.real = new RealImage(this.filename); // మొదటిసారే load
    this.real.display();
  }
}

const img = new ImageProxy("photo.jpg"); // ఇంకా load కాలేదు (వేగం)
console.log("Image object తయారైంది, కానీ disk touch కాలేదు.");
img.display(); // ఇప్పుడు load + display (మొదటిసారి)
img.display(); // ఇప్పటికే load అయింది - మళ్ళీ load కాదు (cached)
```

### Proxy రకాలు

| రకం              | పని                                      |
| ---------------- | ---------------------------------------- |
| Virtual Proxy    | Lazy loading (ఖరీదైన object ని ఆలస్యంగా) |
| Protection Proxy | Access/permission check                  |
| Caching Proxy    | ఫలితాలని cache                           |
| Logging Proxy    | Calls ని log                             |

> **గమనిక:** JavaScript లో native `Proxy` object కూడా ఉంది (get/set traps) - ఇదే ఆలోచన language level లో.

---

# Part 5 — Behavioral Patterns

> Behavioral patterns = **objects ఒకరితో ఒకరు ఎలా మాట్లాడుకోవాలి, బాధ్యతలు ఎలా పంచుకోవాలి** అనేది చెప్పేవి.

---

## 22. Chain of Responsibility

### వివరణ

**Chain of Responsibility** = ఒక request ని handlers **గొలుసు (chain)** గుండా పంపడం. ఒక్కో handler "ఇది నా పని అవునా?" చూసి, కాకపోతే తర్వాతి వాడికి పంపుతుంది.

### Real-life Scenario

> **Customer support**: నీ complaint → Level 1 agent → పరిష్కారం కాకపోతే → Manager → కాకపోతే → Director. ఒక్కో స్థాయి తనవల్ల అయ్యేది చేస్తుంది, లేకపోతే పైకి పంపుతుంది.

<div class="fig">
<div class="cap">Chain of Responsibility · తీసుకునేవాడు దొరికేదాకా ముందుకి</div>
<svg viewBox="0 0 750 226"><rect class="n-good" x="0" y="60" width="120" height="46" rx="4"/><text class="t mid" x="60" y="88">Request</text><line class="ln" x1="124" y1="83" x2="166" y2="83" marker-end="url(#a)"/><rect class="n" x="170" y="60" width="170" height="48" rx="4"/><rect class="n-dark" x="170" y="60" width="170" height="22" rx="4"/><text class="t-w mid" x="255" y="76">Handler A</text><text class="t-sm mono" x="180" y="98">నాదేనా? కాకపోతే →</text><rect class="n" x="360" y="60" width="170" height="48" rx="4"/><rect class="n-dark" x="360" y="60" width="170" height="22" rx="4"/><text class="t-w mid" x="445" y="76">Handler B</text><text class="t-sm mono" x="370" y="98">నాదేనా? కాకపోతే →</text><rect class="n" x="550" y="60" width="200" height="48" rx="4"/><rect class="n-acc" x="550" y="60" width="200" height="22" rx="4"/><text class="t-w mid" x="650" y="76">Handler C</text><text class="t-sm mono" x="560" y="98">ఇక్కడ ఆగుతుంది</text><line class="ln" x1="344" y1="83" x2="356" y2="83" marker-end="url(#a)"/><line class="ln" x1="534" y1="83" x2="546" y2="83" marker-end="url(#a)"/><rect class="n-info" x="0" y="130" width="366" height="86" rx="4"/><text class="t" x="14" y="152">ఎప్పుడు సరైనది</text><text class="t-sm" x="14" y="174">ఒక request ని <tspan class="t-acc">ఒక్కడే</tspan> handle చేయాలి,</text><text class="t-sm" x="14" y="192">మరియు ఎవరు అన్నది <tspan class="t-acc">క్రమం</tspan> మీద ఆధారపడుతుంది.</text><text class="t-sm" x="14" y="210">ఉదా: ATM cash dispenser, validation, middleware</text><rect class="n-bad" x="384" y="130" width="366" height="86" rx="4"/><text class="t" x="398" y="152">ఎప్పుడు తప్పు</text><text class="t-sm" x="398" y="174">అందరూ ప్రతి message నీ చూడాలంటే — అది</text><text class="t-sm" x="398" y="192">chain కాదు, <tspan class="t-acc">fan-out</tspan>. Logging అలాంటిదే.</text><text class="t-sm" x="398" y="210">అప్పుడు ఒక జాబితా వాడాలి, chain కాదు.</text></svg>
</div>

### Code

```javascript
class Handler {
  setNext(handler) {
    this.next = handler;
    return handler;
  } // chaining
  handle(amount) {
    if (this.next) return this.next.handle(amount);
    console.log(`Rs.${amount} ఎవరూ approve చేయలేకపోయారు!`);
  }
}

class TeamLead extends Handler {
  handle(amount) {
    if (amount <= 1000)
      return console.log(`TeamLead Rs.${amount} approve చేశారు`);
    return super.handle(amount); // పైకి పంపు
  }
}
class Manager extends Handler {
  handle(amount) {
    if (amount <= 10000)
      return console.log(`Manager Rs.${amount} approve చేశారు`);
    return super.handle(amount);
  }
}
class Director extends Handler {
  handle(amount) {
    if (amount <= 100000)
      return console.log(`Director Rs.${amount} approve చేశారు`);
    return super.handle(amount);
  }
}

// గొలుసు కట్టడం: TeamLead → Manager → Director
const lead = new TeamLead();
lead.setNext(new Manager()).setNext(new Director());

lead.handle(500); // TeamLead Rs.500 approve చేశారు
lead.handle(5000); // Manager Rs.5000 approve చేశారు
lead.handle(50000); // Director Rs.50000 approve చేశారు
lead.handle(500000); // Rs.500000 ఎవరూ approve చేయలేకపోయారు!
```

### Key Points

- Sender కి ఏ handler పని చేస్తుందో తెలియదు (loose coupling)
- Handlers ని runtime లో మార్చవచ్చు/జోడించవచ్చు
- Middleware (Express.js), event bubbling, approval flows - ఇదే pattern

---

## 23. Command

### వివరణ

**Command** = ఒక request ని **object** గా mార్చడం. దీనివల్ల requests ని store, queue, undo, log చేయవచ్చు.

### Real-life Scenario

> **Restaurant order slip**: నువ్వు చెప్పింది waiter ఒక slip (command object) గా రాస్తాడు. ఆ slip ని queue చేయవచ్చు, cancel చేయవచ్చు, kitchen కి పంపవచ్చు. Order = object.

<div class="fig">
<div class="cap">Command · ఒక చర్యను object గా మార్చడం</div>
<svg viewBox="0 0 750 226"><rect class="n-good" x="0" y="46" width="160" height="50" rx="4"/><text class="t mid" x="80" y="68">Invoker</text><text class="t-sm mid" x="80" y="84">Button / Menu</text><line class="ln" x1="164" y1="71" x2="226" y2="71" marker-end="url(#a)"/><rect class="n" x="230" y="32" width="190" height="62" rx="4"/><rect class="n-acc" x="230" y="32" width="190" height="22" rx="4"/><text class="t-w mid" x="325" y="48">«interface» Command</text><text class="t-sm mono" x="240" y="70">+ execute()</text><text class="t-sm mono" x="240" y="84">+ undo()</text><line class="ln" x1="325" y1="98" x2="325" y2="130" marker-end="url(#hollow)"/><rect class="n" x="230" y="134" width="190" height="62" rx="4"/><rect class="n-dark" x="230" y="134" width="190" height="22" rx="4"/><text class="t-w mid" x="325" y="150">PasteCommand</text><text class="t-sm mono" x="240" y="172">- receiver</text><text class="t-sm mono" x="240" y="186">+ execute() / undo()</text><line class="ln" x1="424" y1="170" x2="486" y2="170" marker-end="url(#a)"/><text class="t-sm mid" x="455" y="162">నిజమైన పని</text><rect class="n" x="490" y="134" width="200" height="48" rx="4"/><rect class="n-dark" x="490" y="134" width="200" height="22" rx="4"/><text class="t-w mid" x="590" y="150">Receiver (Editor)</text><text class="t-sm mono" x="500" y="172">+ paste()</text><rect class="n-acc" x="440" y="32" width="310" height="72" rx="4"/><text class="t-w" x="454" y="54">ఒక action ని object చేస్తే మూడు ఉచిత బహుమతులు</text><text class="t-w-sm" x="454" y="74">1 · Undo/redo   2 · Queue / schedule చేయడం</text><text class="t-w-sm" x="454" y="92">3 · Audit log — ఏం జరిగిందో record ఉంటుంది</text><text class="t-sm mid" x="375" y="206">Invoker కి Receiver గురించి తెలియదు. Button కి "paste" అంటే ఏమిటో తెలియదు — అదే</text><text class="t-sm mid" x="375" y="222">decoupling.</text></svg>
</div>

### Code

```javascript
// Receiver - అసలు పని చేసేది
class Light {
  on() {
    console.log("💡 Light ఆన్");
  }
  off() {
    console.log("🌑 Light ఆఫ్");
  }
}

// Commands - ఒక్కో action ఒక object (execute + undo)
class LightOnCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.on();
  }
  undo() {
    this.light.off();
  }
}
class LightOffCommand {
  constructor(light) {
    this.light = light;
  }
  execute() {
    this.light.off();
  }
  undo() {
    this.light.on();
  }
}

// Invoker - commands ని run చేసి history ఉంచుతుంది (undo కోసం)
class RemoteControl {
  constructor() {
    this.history = [];
  }
  press(command) {
    command.execute();
    this.history.push(command);
  }
  undoLast() {
    const cmd = this.history.pop();
    if (cmd) {
      console.log("↩️ Undo:");
      cmd.undo();
    }
  }
}

const light = new Light();
const remote = new RemoteControl();
remote.press(new LightOnCommand(light)); // 💡 Light ఆన్
remote.press(new LightOffCommand(light)); // 🌑 Light ఆఫ్
remote.undoLast(); // ↩️ Undo: → 💡 Light ఆన్ (last command reverse)
```

### Key Points

- Action = object → undo/redo, queue, macro, logging సాధ్యం
- Invoker (remote) కి receiver (light) ఏం చేస్తుందో తెలియదు
- Undo/redo, task queues, transactions - Command pattern

---

## 24. Iterator

### వివరణ

**Iterator** = ఒక collection లోని elements ని, లోపలి structure చూపించకుండా, ఒక్కొక్కటిగా traverse చేసే మార్గం. (JS లో `Symbol.iterator` - OOP `OOPS_Telugu.md` §25 చూడు.)

### Real-life Scenario

> **TV remote** లో channel up button - TV లోపల channels ఎలా store అయ్యాయో నీకు అక్కర్లేదు, "next" నొక్కితే తర్వాతిది వస్తుంది. అదే iterator.

<div class="fig">
<div class="cap">Iterator · లోపలి నిర్మాణాన్ని బయటపెట్టకుండా ఒక్కొక్కటిగా తిరగడం</div>
<svg viewBox="0 0 750 226"><rect class="n" x="0" y="40" width="230" height="62" rx="4"/><rect class="n-acc" x="0" y="40" width="230" height="22" rx="4"/><text class="t-w mid" x="115" y="56">«interface» Aggregate</text><text class="t-sm mono" x="10" y="78">- items[]</text><text class="t-sm mono" x="10" y="92">+ createIterator()</text><line class="ln-dash" x1="234" y1="70" x2="296" y2="70" marker-end="url(#a)"/><text class="t-sm mid" x="265" y="62">creates</text><rect class="n" x="300" y="40" width="230" height="62" rx="4"/><rect class="n-acc" x="300" y="40" width="230" height="22" rx="4"/><text class="t-w mid" x="415" y="56">«interface» Iterator</text><text class="t-sm mono" x="310" y="78">+ hasNext(): bool</text><text class="t-sm mono" x="310" y="92">+ next(): T</text><rect class="n-good" x="0" y="130" width="530" height="86" rx="4"/><text class="t" x="16" y="152">ఎందుకు అవసరం</text><text class="t-sm" x="16" y="174">Client కి collection <tspan class="t-acc">లోపల array నా, tree నా, linked list నా</tspan> అని తెలియనవసరం లేదు.</text><text class="t-sm" x="16" y="194">అదే code array మీద, tree మీద, database cursor మీద పని చేస్తుంది.</text><text class="t-sm" x="16" y="210">JavaScript lo ఇది భాషలోనే ఉంది: <tspan class="mono">Symbol.iterator</tspan> + <tspan class="mono">for…of</tspan> + generators.</text><rect class="n-info" x="550" y="40" width="200" height="176" rx="4"/><text class="t" x="564" y="62">JS lo</text><text class="t-sm mono" x="564" y="86">*[Symbol.iterator]()</text><text class="t-sm mono" x="564" y="104">  { yield a; }</text><text class="t-sm" x="564" y="132">అంటే మీరు Iterator</text><text class="t-sm" x="564" y="148">pattern ని ఇప్పటికే</text><text class="t-sm" x="564" y="164">రోజూ వాడుతున్నారు —</text><text class="t-acc" x="564" y="188">for…of ప్రతిసారీ</text><text class="t-acc" x="564" y="204">దాన్నే పిలుస్తుంది.</text></svg>
</div>

### Code

```javascript
class Playlist {
  #songs = [];
  add(song) {
    this.#songs.push(song);
    return this;
  }

  // Symbol.iterator - for...of ని enable చేస్తుంది (internal array దాచి)
  [Symbol.iterator]() {
    let i = 0;
    const songs = this.#songs;
    return {
      next() {
        return i < songs.length
          ? { value: songs[i++], done: false }
          : { value: undefined, done: true };
      },
    };
  }
}

const playlist = new Playlist();
playlist.add("పాట 1").add("పాట 2").add("పాట 3");

// లోపల array అని client కి తెలియదు - కేవలం iterate చేస్తాడు
for (const song of playlist) console.log("▶️ " + song);
// ▶️ పాట 1 / ▶️ పాట 2 / ▶️ పాట 3

console.log([...playlist].length); // 3 (spread కూడా పనిచేస్తుంది)
```

### Key Points

- Collection యొక్క internal structure (array? tree? linked list?) దాచుతుంది
- ఒకే interface (`next`) తో ఏ collection అయినా traverse
- JS లో `Symbol.iterator` + generators (`function*`) native support

---

## 25. Mediator

### వివరణ

**Mediator** = objects నేరుగా ఒకరితో ఒకరు మాట్లాడకుండా, ఒక **మధ్యవర్తి (mediator)** ద్వారా communicate చేయడం. Many-to-many సంబంధాలని simplify చేస్తుంది.

### Real-life Scenario

> **Air Traffic Control (ATC)**: విమానాలు ఒకదానితో ఒకటి నేరుగా మాట్లాడవు - అన్నీ ATC tower (mediator) తో మాట్లాడతాయి. లేకపోతే గందరగోళం, ప్రమాదం.

<div class="fig">
<div class="cap">Mediator · అందరూ ఒకరితో ఒకరు కాకుండా, ఒక మధ్యవర్తి ద్వారా</div>
<svg viewBox="0 0 750 230"><text class="t-xs" x="0" y="14">MEDIATOR లేకుండా · ప్రతి ఒక్కరూ ప్రతి ఒక్కరికీ తెలుసు — n(n−1)/2 సంబంధాలు</text><circle cx="60" cy="80" r="22" fill="#17203a"/><text class="t-w mid" x="60" y="85">A</text><circle cx="190" cy="50" r="22" fill="#17203a"/><text class="t-w mid" x="190" y="55">B</text><circle cx="190" cy="120" r="22" fill="#17203a"/><text class="t-w mid" x="190" y="125">C</text><circle cx="320" cy="80" r="22" fill="#17203a"/><text class="t-w mid" x="320" y="85">D</text><line class="ln-thin" x1="60" y1="80" x2="190" y2="50"/><line class="ln-thin" x1="60" y1="80" x2="190" y2="120"/><line class="ln-thin" x1="60" y1="80" x2="320" y2="80"/><line class="ln-thin" x1="190" y1="50" x2="190" y2="120"/><line class="ln-thin" x1="190" y1="50" x2="320" y2="80"/><line class="ln-thin" x1="190" y1="120" x2="320" y2="80"/><text class="t-xs" x="420" y="14">MEDIATOR తో · అందరూ ఒక్కడితో మాత్రమే — n సంబంధాలు</text><circle cx="590" cy="85" r="30" fill="#e2653a"/><text class="t-w mid" x="590" y="82">Media-</text><text class="t-w mid" x="590" y="96">tor</text><circle cx="460" cy="45" r="20" fill="#17203a"/><text class="t-w mid" x="460" y="50">A</text><line class="ln-acc" x1="460" y1="45" x2="590" y2="85"/><circle cx="460" cy="125" r="20" fill="#17203a"/><text class="t-w mid" x="460" y="130">B</text><line class="ln-acc" x1="460" y1="125" x2="590" y2="85"/><circle cx="720" cy="45" r="20" fill="#17203a"/><text class="t-w mid" x="720" y="50">C</text><line class="ln-acc" x1="720" y1="45" x2="590" y2="85"/><circle cx="720" cy="125" r="20" fill="#17203a"/><text class="t-w mid" x="720" y="130">D</text><line class="ln-acc" x1="720" y1="125" x2="590" y2="85"/><rect class="n-good" x="0" y="160" width="750" height="60" rx="4"/><text class="t mid" x="375" y="182">నిజ ఉదాహరణ: విమానాశ్రయంలో pilots ఒకరితో ఒకరు మాట్లాడరు — అందరూ <tspan class="t-acc">control tower</tspan> తోనే</text><text class="t-sm mid" x="375" y="204">ప్రమాదం: Mediator పెద్దదై ఒక "god object" అవుతుంది. అప్పుడు దాన్ని విభజించాలి.</text></svg>
</div>

### Code

```javascript
// Mediator - అందరి మధ్య సందేశాలు పంపుతుంది
class ChatRoom {
  constructor() {
    this.users = [];
  }
  register(user) {
    user.room = this;
    this.users.push(user);
  }
  send(message, from) {
    this.users
      .filter((u) => u !== from) // పంపినవాడికి తప్ప అందరికీ
      .forEach((u) => u.receive(message, from.name));
  }
}

// Colleagues - నేరుగా కాకుండా room ద్వారా మాట్లాడతారు
class User {
  constructor(name) {
    this.name = name;
    this.room = null;
  }
  send(message) {
    console.log(`${this.name} పంపారు: ${message}`);
    this.room.send(message, this);
  }
  receive(message, fromName) {
    console.log(`  ${this.name} కి [${fromName}]: ${message}`);
  }
}

const room = new ChatRoom();
const a = new User("Yaswanth"),
  b = new User("Chaitanya"),
  c = new User("Priya");
[a, b, c].forEach((u) => room.register(u));

a.send("అందరికీ నమస్తే!");
// Yaswanth పంపారు: అందరికీ నమస్తే!
//   Chaitanya కి [Yaswanth]: అందరికీ నమస్తే!
//   Priya కి [Yaswanth]: అందరికీ నమస్తే!
```

### Key Points

- N objects మధ్య N×N connections → N objects + 1 mediator
- Objects ఒకదాని గురించి ఒకటి తెలియక్కర్లేదు (mediator కి మాత్రమే తెలుసు)
- Chat rooms, UI dialogs (fields మధ్య), event buses

---

## 26. Memento

### వివరణ

**Memento** = ఒక object యొక్క state ని (encapsulation పాడవకుండా) బయట save చేసి, తర్వాత restore (undo) చేయడం.

### Real-life Scenario

> **Game save point**: boss fight ముందు save చేస్తావు. చనిపోతే ఆ save point కి తిరిగి వస్తావు. State ని snapshot గా దాచడం.

<div class="fig">
<div class="cap">Memento · state ని encapsulation విరగకుండా snapshot తీయడం</div>
<svg viewBox="0 0 750 226"><rect class="n" x="0" y="46" width="210" height="76" rx="4"/><rect class="n-acc" x="0" y="46" width="210" height="22" rx="4"/><text class="t-w mid" x="105" y="62">Originator</text><text class="t-sm mono" x="10" y="84">- state</text><text class="t-sm mono" x="10" y="98">+ save(): Memento</text><text class="t-sm mono" x="10" y="112">+ restore(m)</text><line class="ln-dash" x1="214" y1="84" x2="276" y2="84" marker-end="url(#a)"/><text class="t-sm mid" x="245" y="76">creates</text><rect class="n" x="280" y="46" width="190" height="48" rx="4"/><rect class="n-dark" x="280" y="46" width="190" height="22" rx="4"/><text class="t-w mid" x="375" y="62">Memento</text><text class="t-sm mono" x="290" y="84">- state (readonly)</text><line class="ln" x1="474" y1="84" x2="536" y2="84" marker-end="url(#a)"/><text class="t-sm mid" x="505" y="76">దాచుకుంటుంది</text><rect class="n" x="540" y="46" width="210" height="62" rx="4"/><rect class="n-dark" x="540" y="46" width="210" height="22" rx="4"/><text class="t-w mid" x="645" y="62">Caretaker</text><text class="t-sm mono" x="550" y="84">- history: Memento[]</text><text class="t-sm mono" x="550" y="98">+ undo()</text><rect class="n-acc" x="0" y="132" width="750" height="86" rx="4"/><text class="t-w mid" x="375" y="154">కీలకమైన నియమం: Caretaker కి Memento <tspan class="mono">లోపల</tspan> ఏముందో తెలియకూడదు</text><text class="t-w-sm mid" x="375" y="176">అది కేవలం దాచి, తిరిగి ఇస్తుంది. Encapsulation విరగకుండానే state ని బయటికి తీసిన ఏకైక</text><text class="t-w-sm mid" x="375" y="192">మార్గం ఇది.</text><text class="t-w-sm mid" x="375" y="208">Command (§23) తో పోలిక — Command "ఏం జరిగింది" దాచుతుంది, Memento "ఏం ఉండేది" దాచుతుంది</text></svg>
</div>

### Code

```javascript
// Originator - ఎవరి state save/restore అవుతుందో
class TextEditor {
  #content = "";
  type(text) {
    this.#content += text;
  }
  getContent() {
    return this.#content;
  }

  save() {
    return { snapshot: this.#content };
  } // Memento (state copy)
  restore(memento) {
    this.#content = memento.snapshot;
  }
}

// Caretaker - mementos ని ఉంచుతుంది (state లోపల చూడకుండా)
class History {
  #stack = [];
  push(memento) {
    this.#stack.push(memento);
  }
  pop() {
    return this.#stack.pop();
  }
}

const editor = new TextEditor();
const history = new History();

editor.type("నమస్తే ");
history.push(editor.save()); // checkpoint 1
editor.type("ప్రపంచం");
console.log(editor.getContent()); // నమస్తే ప్రపంచం

editor.restore(history.pop()); // undo - checkpoint 1 కి
console.log(editor.getContent()); // నమస్తే
```

### Key Points

- State ని snapshot గా బయట store చేస్తాం (encapsulation break అవ్వదు)
- Caretaker snapshot లోపలికి చూడదు - కేవలం ఉంచి, తిప్పి ఇస్తుంది
- Undo/redo, checkpoints, transactions rollback

---

## 27. Observer

### వివరణ

**Observer** = ఒక object (subject) state మారినప్పుడు, దానిపై ఆధారపడిన అందరికీ (observers) **ఆటోమేటిక్‌గా notify** చేయడం. Publish-Subscribe.

### Real-life Scenario

> **YouTube channel**: నువ్వు subscribe చేస్తే, కొత్త video వచ్చినప్పుడు అందరు subscribers కి notification. Channel ప్రతి subscriber ని విడిగా పిలవదు - అందరికీ broadcast.

<div class="fig">
<div class="cap">Observer · ఒకటి మారితే మిగతా అందరికీ తెలియడం</div>
<svg viewBox="0 0 750 222"><rect class="n" x="0" y="46" width="230" height="90" rx="4"/><rect class="n-acc" x="0" y="46" width="230" height="22" rx="4"/><text class="t-w mid" x="115" y="62">Subject</text><text class="t-sm mono" x="10" y="84">- observers[]</text><text class="t-sm mono" x="10" y="98">+ subscribe(o)</text><text class="t-sm mono" x="10" y="112">+ unsubscribe(o)</text><text class="t-sm mono" x="10" y="126">+ notify()</text><line class="ln" x1="234" y1="90" x2="296" y2="90" marker-end="url(#a)"/><text class="t-sm mid" x="265" y="82">notify()</text><rect class="n" x="300" y="46" width="200" height="48" rx="4"/><rect class="n-acc" x="300" y="46" width="200" height="22" rx="4"/><text class="t-w mid" x="400" y="62">«interface» Observer</text><text class="t-sm mono" x="310" y="84">+ update(data)</text><line class="ln" x1="360" y1="116" x2="300" y2="148" marker-end="url(#hollow)"/><line class="ln" x1="440" y1="116" x2="560" y2="148" marker-end="url(#hollow)"/><rect class="n" x="210" y="152" width="180" height="22" rx="4"/><rect class="n-dark" x="210" y="152" width="180" height="22" rx="4"/><text class="t-w mid" x="300" y="168">EmailNotifier</text><rect class="n" x="480" y="152" width="180" height="22" rx="4"/><rect class="n-dark" x="480" y="152" width="180" height="22" rx="4"/><text class="t-w mid" x="570" y="168">AuditLogger</text><rect class="n-good" x="530" y="46" width="220" height="86" rx="4"/><text class="t" x="544" y="68">ముఖ్యమైన నియమం</text><text class="t-sm" x="544" y="90">ఒక observer throw చేస్తే</text><text class="t-sm" x="544" y="106">మిగతావాళ్ళు ఆగకూడదు —</text><text class="t-acc" x="544" y="124">ప్రతి దాన్నీ try/catch lo</text><text class="t-sm mid" x="375" y="204">Subject కి observers ఎవరో తెలియదు — కేవలం interface తెలుసు. కొత్త observer = సున్నా</text><text class="t-sm mid" x="375" y="220">edits.</text></svg>
</div>

### Code

```javascript
// Subject - observers ని ఉంచి, మారినప్పుడు notify చేస్తుంది
class Channel {
  constructor(name) {
    this.name = name;
    this.subscribers = [];
  }
  subscribe(fn) {
    this.subscribers.push(fn);
  }
  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((s) => s !== fn);
  }
  upload(video) {
    console.log(`📢 ${this.name}: "${video}" upload అయింది`);
    this.subscribers.forEach((fn) => fn(video)); // అందరికీ notify
  }
}

const channel = new Channel("Telugu Coding");

const yaswanth = (video) => console.log(`  Yaswanth చూస్తున్నాడు: ${video}`);
const priya = (video) => console.log(`  Priya చూస్తోంది: ${video}`);

channel.subscribe(yaswanth);
channel.subscribe(priya);
channel.upload("LLD in Telugu");
// 📢 Telugu Coding: "LLD in Telugu" upload అయింది
//   Yaswanth చూస్తున్నాడు: LLD in Telugu
//   Priya చూస్తోంది: LLD in Telugu

channel.unsubscribe(priya);
channel.upload("Design Patterns"); // ఇప్పుడు Yaswanth కి మాత్రమే
```

### Key Points

- Subject, observers loosely coupled - subject కి observers ఎవరో వివరంగా తెలియదు
- Event systems, MVC, reactive UI (React state), RxJS - అంతా Observer
- Memory leak జాగ్రత్త: అవసరం లేని observers ని unsubscribe చేయి

---

## 28. State

### వివరణ

**State** = object యొక్క behaviour దాని **internal state** బట్టి మారడం - అదీ పెద్ద `if/else` లేకుండా. ప్రతి state ఒక class.

### Real-life Scenario

> **Traffic signal**: Red → Green → Yellow → Red. ఒక్కో state లో "next()" వేరే విధంగా పనిచేస్తుంది. Signal ఒకటే object, కానీ state బట్టి behaviour మారుతుంది.

<div class="fig">
<div class="cap">State · ప్రవర్తన state ని బట్టి మారితే, state ని object చేయడం</div>
<svg viewBox="0 0 750 274"><rect class="n" x="0" y="56" width="210" height="62" rx="4"/><rect class="n-acc" x="0" y="56" width="210" height="22" rx="4"/><text class="t-w mid" x="105" y="72">Context</text><text class="t-sm mono" x="10" y="94">- state: State</text><text class="t-sm mono" x="10" y="108">+ request()</text><line class="ln" x1="214" y1="84" x2="276" y2="84" marker-end="url(#a)"/><text class="t-sm mid" x="245" y="76">delegate</text><rect class="n" x="280" y="40" width="200" height="48" rx="4"/><rect class="n-acc" x="280" y="40" width="200" height="22" rx="4"/><text class="t-w mid" x="380" y="56">«interface» State</text><text class="t-sm mono" x="290" y="78">+ handle()</text><line class="ln" x1="330" y1="92" x2="250" y2="130" marker-end="url(#hollow)"/><line class="ln" x1="430" y1="92" x2="520" y2="130" marker-end="url(#hollow)"/><rect class="n" x="160" y="134" width="180" height="48" rx="4"/><rect class="n-dark" x="160" y="134" width="180" height="22" rx="4"/><text class="t-w mid" x="250" y="150">IdleState</text><text class="t-sm mono" x="170" y="172">+ handle()</text><rect class="n" x="450" y="134" width="210" height="48" rx="4"/><rect class="n-dark" x="450" y="134" width="210" height="22" rx="4"/><text class="t-w mid" x="555" y="150">DispensingState</text><text class="t-sm mono" x="460" y="172">+ handle()</text><path class="ln-acc" d="M340 170 L440 170" marker-end="url(#aa)"/><text class="t-sm mid" x="390" y="162">transition</text><rect class="n-good" x="0" y="196" width="750" height="70" rx="4"/><text class="t mid" x="375" y="218">Context lo ఒక్క <tspan class="mono">if (state === …)</tspan> కూడా ఉండదు — అన్ని methods delegate చేస్తాయి</text><text class="t-sm mid" x="375" y="240">కొత్త state = కొత్త class. Base class default గా "invalid action" throw చేస్తే — ఆ state</text><text class="t-sm mid" x="375" y="256">lo చెల్లని actions ఆటోమేటిక్ గా ఆగుతాయి.</text></svg>
</div>

### Code

```javascript
// ఒక్కో state ఒక object - next() ఏ state కి వెళ్ళాలో అదే చెప్తుంది
const RedState = {
  name: "🔴 Red (ఆగు)",
  next: () => GreenState,
};
const GreenState = {
  name: "🟢 Green (వెళ్ళు)",
  next: () => YellowState,
};
const YellowState = {
  name: "🟡 Yellow (నెమ్మది)",
  next: () => RedState,
};

class TrafficSignal {
  constructor() {
    this.state = RedState;
  }
  change() {
    this.state = this.state.next();
  } // state తనే తర్వాతిది నిర్ణయిస్తుంది
  show() {
    console.log(this.state.name);
  }
}

const signal = new TrafficSignal();
signal.show(); // 🔴 Red (ఆగు)
signal.change();
signal.show(); // 🟢 Green (వెళ్ళు)
signal.change();
signal.show(); // 🟡 Yellow (నెమ్మది)
signal.change();
signal.show(); // 🔴 Red (ఆగు) - cycle
```

### State vs Strategy

|                           | State                        | Strategy                       |
| ------------------------- | ---------------------------- | ------------------------------ |
| ఎవరు మారుస్తారు           | Object తనే state మారుస్తుంది | Client strategy ఎంచుకుంటాడు    |
| States ఒకదానికొకటి తెలుసా | అవును (next state)           | లేదు (స్వతంత్రం)               |
| ఉదా                       | Traffic signal, order status | Payment method, sort algorithm |

---

## 29. Strategy

### వివరణ

**Strategy** = ఒకే పనికి **అనేక algorithms** ని విడి objects గా చేసి, runtime లో మార్చుకోవడం. `if/else` బదులు polymorphism.

### Real-life Scenario

> **Google Maps** లో ఒకే గమ్యానికి: కారు route, నడక route, bus route. ఒకే "navigate" - కానీ నువ్వు ఎంచుకున్న **strategy** బట్టి లెక్క మారుతుంది.

<div class="fig">
<div class="cap">Strategy · మారే algorithm ని బయట పెట్టడం</div>
<svg viewBox="0 0 750 270"><rect class="n" x="0" y="56" width="220" height="76" rx="4"/><rect class="n-acc" x="0" y="56" width="220" height="22" rx="4"/><text class="t-w mid" x="110" y="72">Context</text><text class="t-sm mono" x="10" y="94">- strategy: Strategy</text><text class="t-sm mono" x="10" y="108">+ setStrategy(s)</text><text class="t-sm mono" x="10" y="122">+ execute()</text><line class="ln" x1="224" y1="90" x2="286" y2="90" marker-end="url(#a)"/><text class="t-sm mid" x="255" y="82">uses</text><rect class="n" x="290" y="40" width="200" height="48" rx="4"/><rect class="n-acc" x="290" y="40" width="200" height="22" rx="4"/><text class="t-w mid" x="390" y="56">«interface» Strategy</text><text class="t-sm mono" x="300" y="78">+ run(input)</text><line class="ln" x1="340" y1="92" x2="240" y2="136" marker-end="url(#hollow)"/><line class="ln" x1="440" y1="92" x2="560" y2="136" marker-end="url(#hollow)"/><rect class="n" x="150" y="140" width="180" height="22" rx="4"/><rect class="n-dark" x="150" y="140" width="180" height="22" rx="4"/><text class="t-w mid" x="240" y="156">QuickSort</text><rect class="n" x="500" y="140" width="180" height="22" rx="4"/><rect class="n-dark" x="500" y="140" width="180" height="22" rx="4"/><text class="t-w mid" x="590" y="156">MergeSort</text><rect class="n-info" x="0" y="188" width="366" height="72" rx="4"/><text class="t" x="14" y="210">State vs Strategy — తేడా</text><text class="t-sm" x="14" y="232">నిర్మాణం <tspan class="t-acc">అచ్చం ఒకటే</tspan>. తేడా ఉద్దేశంలో:</text><text class="t-sm" x="14" y="250">State తనని తానే మారుస్తుంది; Strategy ని <tspan class="t-acc">బయటివారు</tspan> ఎంచుకుంటారు.</text><rect class="n-good" x="384" y="188" width="366" height="72" rx="4"/><text class="t" x="398" y="210">ఎప్పుడు వాడాలి</text><text class="t-sm" x="398" y="232">"ఈ algorithm భవిష్యత్తులో మారుతుంది" అని</text><text class="t-sm" x="398" y="250">మీరు <tspan class="t-acc">ఖచ్చితంగా</tspan> నమ్మినప్పుడు మాత్రమే.</text></svg>
</div>

### Code

```javascript
// Strategies - ఒకే contract (calculate), వేరే logic
const carStrategy = (km) => ({ time: km / 60, mode: "🚗 కారు" });
const walkStrategy = (km) => ({ time: km / 5, mode: "🚶 నడక" });
const bikeStrategy = (km) => ({ time: km / 40, mode: "🏍️ బైక్" });

// Context - ఏ strategy అనేది బయట నుండి inject/switch
class RoutePlanner {
  setStrategy(strategy) {
    this.strategy = strategy;
    return this;
  }
  plan(km) {
    const { time, mode } = this.strategy(km);
    console.log(`${mode}: ${km}km → ${time.toFixed(1)} గంటలు`);
  }
}

const planner = new RoutePlanner();
planner.setStrategy(carStrategy).plan(120); // 🚗 కారు: 120km → 2.0 గంటలు
planner.setStrategy(walkStrategy).plan(120); // 🚶 నడక: 120km → 24.0 గంటలు
planner.setStrategy(bikeStrategy).plan(120); // 🏍️ బైక్: 120km → 3.0 గంటలు
```

### Key Points

- పెరుగుతున్న `if/else`/`switch` = Strategy అడుగుతోంది (OCP)
- Algorithm ని runtime లో మార్చవచ్చు
- Payment methods, sorting, compression, pricing - Strategy classics
- Topic 9 (Program to Interface) యొక్క నేరు అమలు ఇదే

---

## 30. Template Method

### వివరణ

**Template Method** = ఒక algorithm యొక్క **అస్థిపంజరం (skeleton)** ని parent లో fix చేసి, కొన్ని steps ని children override చేసేలా వదలడం. క్రమం మారదు, steps మారతాయి.

### Real-life Scenario

> **Tea vs Coffee** తయారీ: నీళ్ళు మరిగించు → \[ఏదో కలుపు\] → కప్‌లో పోయు → \[ఏదో జోడించు\]. Skeleton ఒకటే; కలిపే పదార్థం మాత్రం tea/coffee బట్టి మారుతుంది.

<div class="fig">
<div class="cap">Template Method · క్రమం స్థిరం, అడుగులు మారేవి</div>
<svg viewBox="0 0 750 258"><rect class="n" x="190" y="40" width="370" height="90" rx="4"/><rect class="n-acc" x="190" y="40" width="370" height="22" rx="4"/><text class="t-w mid" x="375" y="56">AbstractClass</text><text class="t-sm mono" x="200" y="78">+ templateMethod()   ← final, క్రమం స్థిరం</text><text class="t-sm mono" x="200" y="92"># step1()   ← subclass నింపాలి</text><text class="t-sm mono" x="200" y="106"># step2()   ← subclass నింపాలి</text><text class="t-sm mono" x="200" y="120"># hook()    ← ఐచ్ఛికం</text><line class="ln" x1="375" y1="152" x2="375" y2="184" marker-end="url(#hollow)"/><rect class="n" x="190" y="188" width="370" height="48" rx="4"/><rect class="n-dark" x="190" y="188" width="370" height="22" rx="4"/><text class="t-w mid" x="375" y="204">ConcreteClass</text><text class="t-sm mono" x="200" y="226"># step1() / step2() ని override చేస్తుంది</text><rect class="n-good" x="0" y="40" width="170" height="112" rx="4"/><text class="t" x="14" y="62">ఆలోచన</text><text class="t-sm" x="14" y="84">Algorithm యొక్క</text><text class="t-sm" x="14" y="100"><tspan class="t-acc">అస్థిపంజరం</tspan> base lo,</text><text class="t-sm" x="14" y="118">మారే అడుగులు</text><text class="t-sm" x="14" y="134">subclass lo.</text><rect class="n-info" x="580" y="40" width="170" height="112" rx="4"/><text class="t" x="594" y="62">Strategy తో తేడా</text><text class="t-sm" x="594" y="84">Template = inheritance</text><text class="t-sm" x="594" y="100">(compile time)</text><text class="t-sm" x="594" y="122">Strategy = composition</text><text class="t-sm" x="594" y="138">(runtime lo మార్చొచ్చు)</text><text class="t-sm mid" x="375" y="248">ఉదా: <tspan class="mono">ParkingSpot.canFit()</tspan> — నియమం base lo ఒక్కసారే, subclass లు కేవలం data ఇస్తాయి</text></svg>
</div>

### Code

```javascript
// Parent - algorithm skeleton fix చేస్తుంది (template method)
class Beverage {
  prepare() {
    // ఈ క్రమం (template) children మార్చలేరు
    this.boilWater();
    this.brew(); // step - child నిర్ణయిస్తుంది
    this.pourInCup();
    this.addCondiments(); // step - child నిర్ణయిస్తుంది
  }
  boilWater() {
    console.log("💧 నీళ్ళు మరిగిస్తోంది");
  }
  pourInCup() {
    console.log("☕ కప్‌లో పోస్తోంది");
  }
  brew() {
    throw new Error("brew() override చేయాలి");
  }
  addCondiments() {
    throw new Error("addCondiments() override చేయాలి");
  }
}

class Tea extends Beverage {
  brew() {
    console.log("🍵 టీ పొడి వేస్తోంది");
  }
  addCondiments() {
    console.log("🍋 నిమ్మ జోడిస్తోంది");
  }
}
class Coffee extends Beverage {
  brew() {
    console.log("☕ కాఫీ పొడి వేస్తోంది");
  }
  addCondiments() {
    console.log("🥛 పాలు + చక్కెర జోడిస్తోంది");
  }
}

console.log("--- Tea ---");
new Tea().prepare();
console.log("--- Coffee ---");
new Coffee().prepare();
// క్రమం ఒకటే, కానీ brew + condiments వేరు
```

### Key Points

- Algorithm యొక్క క్రమం fix; కొన్ని steps మాత్రం subclass నిర్ణయిస్తుంది
- Code duplication తగ్గుతుంది (common steps parent లో)
- "Don't call us, we'll call you" (Hollywood principle) - parent children ని పిలుస్తుంది

---

## 31. Visitor

### వివరణ

**Visitor** = objects structure ని మార్చకుండా, వాటిపై **కొత్త operations** జోడించడం. Operation ని ఒక "visitor" object లో పెడతాం.

### Real-life Scenario

> **Tax auditor** ఇంటింటికీ వెళ్తాడు (visit). ప్రతి ఇల్లు (shop, house, factory) తనని తాను మార్చుకోదు - auditor తన లెక్క (operation) తెచ్చి ప్రతిదానిపై apply చేస్తాడు.

<div class="fig">
<div class="cap">Visitor · classes ని ముట్టుకోకుండా కొత్త operations కలపడం</div>
<svg viewBox="0 0 750 212"><rect class="n" x="0" y="46" width="230" height="48" rx="4"/><rect class="n-acc" x="0" y="46" width="230" height="22" rx="4"/><text class="t-w mid" x="115" y="62">«interface» Element</text><text class="t-sm mono" x="10" y="84">+ accept(visitor)</text><line class="ln" x1="60" y1="100" x2="60" y2="132" marker-end="url(#hollow)"/><line class="ln" x1="170" y1="100" x2="170" y2="132" marker-end="url(#hollow)"/><rect class="n" x="0" y="136" width="110" height="22" rx="4"/><rect class="n-dark" x="0" y="136" width="110" height="22" rx="4"/><text class="t-w mid" x="55" y="152">File</text><rect class="n" x="120" y="136" width="110" height="22" rx="4"/><rect class="n-dark" x="120" y="136" width="110" height="22" rx="4"/><text class="t-w mid" x="175" y="152">Folder</text><line class="ln-dash" x1="234" y1="74" x2="296" y2="74" marker-end="url(#a)"/><text class="t-w-sm mid" x="375" y="66">accept(v) → v.visitFile(this)</text><rect class="n" x="300" y="46" width="230" height="62" rx="4"/><rect class="n-acc" x="300" y="46" width="230" height="22" rx="4"/><text class="t-w mid" x="415" y="62">«interface» Visitor</text><text class="t-sm mono" x="310" y="84">+ visitFile(f)</text><text class="t-sm mono" x="310" y="98">+ visitFolder(d)</text><line class="ln" x1="360" y1="114" x2="360" y2="146" marker-end="url(#hollow)"/><line class="ln" x1="470" y1="114" x2="470" y2="146" marker-end="url(#hollow)"/><rect class="n" x="300" y="150" width="110" height="22" rx="4"/><rect class="n-dark" x="300" y="150" width="110" height="22" rx="4"/><text class="t-w mid" x="355" y="166">SizeCalc</text><rect class="n" x="420" y="150" width="110" height="22" rx="4"/><rect class="n-dark" x="420" y="150" width="110" height="22" rx="4"/><text class="t-w mid" x="475" y="166">Printer</text><rect class="n-bad" x="550" y="46" width="200" height="126" rx="4"/><text class="t" x="564" y="68">ఖరీదు — దీన్ని చెప్పండి</text><text class="t-sm" x="564" y="90">కొత్త <tspan class="t-acc">operation</tspan> చౌక</text><text class="t-sm" x="564" y="106">(ఒక కొత్త visitor).</text><text class="t-sm" x="564" y="130">కొత్త <tspan class="t-acc">element type</tspan> ఖరీదు —</text><text class="t-sm" x="564" y="146">ప్రతి visitor ని edit</text><text class="t-sm" x="564" y="162">చేయాలి.</text><text class="t-sm mid" x="375" y="200">కాబట్టి: element types స్థిరంగా ఉండి operations పెరిగే చోట మాత్రమే Visitor</text></svg>
</div>

### Code

```javascript
// Elements - accept(visitor) మాత్రమే ఉంటుంది (operations బయట)
class Circle {
  constructor(r) {
    this.r = r;
  }
  accept(visitor) {
    return visitor.visitCircle(this);
  }
}
class Rectangle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  accept(visitor) {
    return visitor.visitRectangle(this);
  }
}

// Visitor - కొత్త operation (area). Shapes మార్చకుండా జోడించాం.
const areaVisitor = {
  visitCircle: (c) => Math.PI * c.r ** 2,
  visitRectangle: (r) => r.w * r.h,
};
// మరో కొత్త operation - మళ్ళీ shapes touch చేయలేదు
const perimeterVisitor = {
  visitCircle: (c) => 2 * Math.PI * c.r,
  visitRectangle: (r) => 2 * (r.w + r.h),
};

const shapes = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach((s) => {
  console.log(
    `Area: ${s.accept(areaVisitor).toFixed(2)}, Perimeter: ${s.accept(perimeterVisitor).toFixed(2)}`,
  );
});
// Area: 78.54, Perimeter: 31.42
// Area: 24.00, Perimeter: 20.00
```

### Key Points

- కొత్త operation జోడించాలంటే కొత్త visitor - element classes touch చేయక్కర్లేదు (OCP)
- కానీ కొత్త element type జోడిస్తే అన్ని visitors మార్చాలి (trade-off)
- Compilers (AST traversal), document exporters - Visitor

---

## 32. Interpreter

### వివరణ

**Interpreter** = ఒక చిన్న భాష (grammar) కి, దాని వాక్యాలను **evaluate** చేసే classes రాయడం. ప్రతి grammar rule ఒక class; అన్నిటికీ `interpret()` ఉంటుంది.

### Real-life Scenario

> **Calculator** లో "5 + 3 - 2" అని type చేస్తే, అది ఆ expression ని అర్థం చేసుకొని (interpret) 6 అని లెక్కిస్తుంది. లేదా Google Translate ఒక వాక్యాన్ని అర్థం చేసుకున్నట్టు - grammar ప్రకారం interpret చేయడం.

<div class="fig">
<div class="cap">Interpreter · ఒక చిన్న భాషని syntax tree గా evaluate చేయడం</div>
<svg viewBox="0 0 750 246"><rect class="n" x="275" y="8" width="210" height="48" rx="4"/><rect class="n-acc" x="275" y="8" width="210" height="22" rx="4"/><text class="t-w mid" x="380" y="24">«interface» Expression</text><text class="t-sm mono" x="285" y="46">+ interpret(ctx)</text><line class="ln" x1="340" y1="60" x2="200" y2="92" marker-end="url(#hollow)"/><line class="ln" x1="420" y1="60" x2="560" y2="92" marker-end="url(#hollow)"/><rect class="n" x="90" y="96" width="210" height="48" rx="4"/><rect class="n-dark" x="90" y="96" width="210" height="22" rx="4"/><text class="t-w mid" x="195" y="112">NumberExpr</text><text class="t-sm mono" x="100" y="134">+ interpret() → value</text><rect class="n" x="460" y="96" width="230" height="62" rx="4"/><rect class="n-dark" x="460" y="96" width="230" height="22" rx="4"/><text class="t-w mid" x="575" y="112">AddExpr</text><text class="t-sm mono" x="470" y="134">- left, right: Expression</text><text class="t-sm mono" x="470" y="148">+ interpret()</text><path class="ln" d="M690 120 Q 735 120 735 40 Q 735 14 489 14" marker-end="url(#dia)"/><rect class="n-good" x="0" y="164" width="750" height="72" rx="4"/><text class="t" x="16" y="186">ఇది Composite యొక్క ఒక ప్రత్యేక రూపం</text><text class="t-sm mono" x="16" y="208">"2 + 3 * 4"  →  Add( Number(2), Multiply( Number(3), Number(4) ) )</text><text class="t-sm" x="16" y="228">ప్రతి node తనని తాను evaluate చేసుకుంటుంది. <tspan class="t-acc">నిజ ప్రపంచంలో అరుదు</tspan> — grammar పెరిగితే</text><text class="t-sm" x="16" y="244">parser generator మేలు.</text></svg>
</div>

### Code

```javascript
// Terminal expression - number (ఆకు / leaf)
class NumberExpr {
  constructor(value) {
    this.value = value;
  }
  interpret() {
    return this.value;
  }
}

// Non-terminal expressions - operations (కొమ్మలు)
class AddExpr {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  interpret() {
    return this.left.interpret() + this.right.interpret();
  }
}
class SubtractExpr {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
  interpret() {
    return this.left.interpret() - this.right.interpret();
  }
}

// "5 + 3 - 2" ని expression tree గా చేసి interpret: (5 + 3) - 2
const expr = new SubtractExpr(
  new AddExpr(new NumberExpr(5), new NumberExpr(3)),
  new NumberExpr(2),
);
console.log(expr.interpret()); // 6

// చిన్న parser - RPN (postfix) input ని tree గా build చేసి interpret
function interpretRPN(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === "+") {
      const b = stack.pop(),
        a = stack.pop();
      stack.push(new AddExpr(a, b));
    } else if (token === "-") {
      const b = stack.pop(),
        a = stack.pop();
      stack.push(new SubtractExpr(a, b));
    } else stack.push(new NumberExpr(Number(token)));
  }
  return stack.pop().interpret();
}

console.log(interpretRPN("5 3 + 2 -".split(" "))); // 6  ((5+3)-2)
console.log(interpretRPN("10 20 +".split(" "))); // 30
```

### Key Points

- ప్రతి grammar rule = ఒక class; expression = ఆ classes తో కట్టిన tree
- SQL parsers, regular expressions, calculators, rule engines - Interpreter
- ⚠️ Grammar పెద్దదైతే classes పేలతాయి - complex భాషలకి parser generator మంచిది

---

# Part 6 — Beyond GoF (Practical LLD Patterns)

> GoF 23 patterns కాకుండా, నిజ projects లో తరచూ కనిపించే మరికొన్ని ముఖ్య patterns + concepts. వీటిని interviews లో అడగడం common.

---

## 33. Dependency Injection (DI)

### వివరణ

**Dependency Injection** = ఒక class తనకి కావలసిన dependencies ని తనే `new` తో create చేయకుండా, **బయట నుండి inject** చేయించుకోవడం. ఇది DIP (SOLID లో "D") యొక్క ఆచరణ - testable, loosely-coupled code కి కీలకం.

### Real-life Scenario

> **కారుకి engine కావాలి - కానీ కారు factory లో engine తయారు చేయదు**. Engine బయట తయారై, కారులో అమర్చబడుతుంది (inject). రేపు వేరే engine కావాలంటే కారు design మార్చక్కర్లేదు.

### 3 రకాల Injection

```javascript
class Engine {
  start() {
    return "🔧 Engine started";
  }
}

// 1. Constructor Injection (అత్యంత common) - constructor లో ఇవ్వడం
class Car {
  constructor(engine) {
    this.engine = engine;
  }
  drive() {
    console.log(this.engine.start());
  }
}
new Car(new Engine()).drive(); // 🔧 Engine started

// 2. Setter Injection - object తయారయ్యాక set చేయడం
class Service {
  setLogger(logger) {
    this.logger = logger;
    return this;
  }
  run() {
    this.logger?.log("running...");
  }
}
const consoleLogger = { log: (m) => console.log(`LOG: ${m}`) };
new Service().setLogger(consoleLogger).run(); // LOG: running...
```

### Simple DI Container

```javascript
class Engine {
  start() {
    return "🔧 Engine started";
  }
}
class Car {
  constructor(engine) {
    this.engine = engine;
  }
  drive() {
    console.log(this.engine.start());
  }
}

// Container - dependencies register చేసి, auto-wire చేసి resolve చేస్తుంది
class Container {
  #registry = new Map();
  register(name, factory) {
    this.#registry.set(name, factory);
    return this;
  }
  resolve(name) {
    return this.#registry.get(name)(this);
  }
}

const container = new Container();
container.register("engine", () => new Engine());
container.register("car", (c) => new Car(c.resolve("engine"))); // auto-wire!
container.resolve("car").drive(); // 🔧 Engine started
```

### Key Points

- `new` ని class లోపల కాకుండా బయట → mock inject చేసి easy testing
- Constructor injection = mandatory deps; Setter = optional deps
- Angular, NestJS, Spring - DI containers మీద నడుస్తాయి

---
<div class="fig">
<div class="cap">Dependency Injection · dependencies ని బయటి నుంచి ఇవ్వడం</div>
<svg viewBox="0 0 750 288"><text class="t-xs" x="0" y="14">DI యొక్క మూడు రూపాలు</text><rect class="n-good" x="0" y="24" width="240" height="76" rx="4"/><text class="t" x="14" y="46">1 · Constructor injection ✓</text><text class="t-sm mono" x="14" y="68">constructor(repo) {</text><text class="t-sm mono" x="14" y="84">  this.repo = repo }</text><rect class="n" x="255" y="24" width="240" height="76" rx="4"/><text class="t" x="269" y="46">2 · Setter injection</text><text class="t-sm mono" x="269" y="68">setRepo(repo) {…}</text><text class="t-sm" x="269" y="90">ఐచ్ఛిక dependencies కి</text><rect class="n" x="510" y="24" width="240" height="76" rx="4"/><text class="t" x="524" y="46">3 · Method injection</text><text class="t-sm mono" x="524" y="68">save(order, repo)</text><text class="t-sm" x="524" y="90">ఒక్కసారి వాడేదానికి</text><rect class="n-acc" x="0" y="112" width="750" height="70" rx="4"/><text class="t-w mid" x="375" y="134">Constructor injection ఎందుకు ఉత్తమం</text><text class="t-w-sm mid" x="375" y="156">Object create అయిన క్షణం నుంచే అది పూర్తిగా చెల్లుబాటు అవుతుంది — "సగం నిర్మించిన"</text><text class="t-w-sm mid" x="375" y="172">స్థితి ఉండదు. Dependencies అన్నీ constructor చూస్తే కనిపిస్తాయి.</text><text class="t-xs" x="0" y="192">SINGLETON vs DI — ఇదే అసలు తేడా</text><rect class="n-bad" x="0" y="202" width="366" height="76" rx="4"/><text class="t" x="14" y="224">Singleton</text><text class="t-sm mono" x="14" y="246">const db = Database.getInstance()</text><text class="t-sm" x="14" y="266">Dependency <tspan class="t-acc">దాగి</tspan> ఉంది. Test lo మార్చలేం.</text><rect class="n-good" x="384" y="202" width="366" height="76" rx="4"/><text class="t" x="398" y="224">DI</text><text class="t-sm mono" x="398" y="246">constructor(db) { this.db = db }</text><text class="t-sm" x="398" y="266">Dependency <tspan class="t-acc">కనిపిస్తుంది</tspan>. Test lo fake ఇవ్వొచ్చు.</text></svg>
</div>


## 34. Object Pool

### వివరణ

**Object Pool** = ఖరీదైన objects (DB connections, threads) ని ప్రతిసారి create/destroy చేయకుండా, ఒక **pool** లో ఉంచి reuse చేయడం. (Prototype cloning కి బంధువు - creation cost తగ్గించడం.)

### Real-life Scenario

> **Cricket నెట్స్** లో balls ఒక bucket లో ఉంటాయి. ప్రతి ball కి కొత్తది కొనరు - bucket నుండి తీసి, వాడాక తిరిగి పెడతారు. అదే object pool.

### Code

```javascript
class DBConnection {
  constructor(id) {
    this.id = id;
  }
  query(sql) {
    console.log(`Conn#${this.id}: ${sql}`);
  }
}

class ConnectionPool {
  #free = [];
  #used = new Set();
  #nextId = 1;

  constructor(size) {
    for (let i = 0; i < size; i++)
      this.#free.push(new DBConnection(this.#nextId++));
  }

  acquire() {
    if (!this.#free.length) throw new Error("Pool exhausted!");
    const conn = this.#free.pop();
    this.#used.add(conn);
    return conn;
  }

  release(conn) {
    this.#used.delete(conn);
    this.#free.push(conn);
  } // తిరిగి pool కి
  get stats() {
    return `free:${this.#free.length} used:${this.#used.size}`;
  }
}

const pool = new ConnectionPool(2);
const c1 = pool.acquire();
const c2 = pool.acquire();
console.log(pool.stats); // free:0 used:2
c1.query("SELECT * FROM users"); // Conn#2: SELECT * FROM users
pool.release(c1); // c1 ని తిరిగి pool కి
console.log(pool.stats); // free:1 used:1
const c3 = pool.acquire(); // కొత్తది create కాదు - విడుదల అయిన c1 నే reuse
console.log(c3 === c1); // true (same object reused!)
```

### Key Points

- Object creation ఖరీదైనప్పుడు (network, threads) reuse తో performance పెరుగుతుంది
- Pool exhausted అయితే: wait, లేదా error, లేదా grow - policy నిర్ణయించాలి
- DB connection pools, thread pools, game object pools

---

## 35. Null Object

### వివరణ

**Null Object** = `null` return చేసే బదులు, "ఏమీ చేయని" (do-nothing) object return చేయడం. దీనివల్ల client code లో `if (x === null)` checks అవసరం లేదు.

### Real-life Scenario

> Login కాని user కి "Guest" account ఇస్తాం. `null` కాదు - Guest object. దానికి `getName()` = "Guest", permissions = ఏమీ లేవు. Code ఎక్కడా null check చేయక్కర్లేదు.

### Code

```javascript
class RealUser {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
  isGuest() {
    return false;
  }
}

// Null Object - null కి బదులు "do-nothing / default" object
class GuestUser {
  getName() {
    return "Guest";
  }
  isGuest() {
    return true;
  }
}

const db = { 1: new RealUser("Yaswanth") };

function findUser(id) {
  return db[id] || new GuestUser(); // null return చేయం!
}

// Client కి null check అక్కర్లేదు - ఎప్పుడూ valid object
console.log(findUser(1).getName()); // Yaswanth
console.log(findUser(99).getName()); // Guest (null error రాదు!)
console.log(findUser(99).isGuest()); // true
```

### Key Points

- `null`/`undefined` checks తగ్గుతాయి → NullPointerException-లాంటి bugs తగ్గుతాయి
- Default/neutral behaviour ని encapsulate చేస్తుంది
- Logging (NoOpLogger), permissions (GuestUser), strategies

---

## 36. Concurrency మరియు Thread-Safety

### వివరణ

JavaScript **single-threaded** (event loop) - కాబట్టి Java-లాంటి true data races లేవు. కానీ **async operations మధ్య interleaving** వల్ల logical race conditions వస్తాయి. Critical sections ని serialize చేయాలి.

### Real-life Scenario

> ఒకే bank account నుండి రెండు ATMs ఒకేసారి withdraw చేస్తే - రెండూ balance చదివి, రెండూ తీస్తే overdraw అవుతుంది. Lock (mutex) తో ఒక్కసారి ఒకరే access చేసేలా చేయాలి.

### Code - Async Mutex

```javascript
// Async Mutex - ఒక్కో సారి ఒక్క async task మాత్రమే critical section లో
class Mutex {
  #chain = Promise.resolve();
  runExclusive(task) {
    const result = this.#chain.then(() => task());
    this.#chain = result.catch(() => {}); // error వచ్చినా గొలుసు తెగకూడదు
    return result;
  }
}

class BankAccount {
  #balance = 100;
  #mutex = new Mutex();

  async withdraw(amount) {
    return this.#mutex.runExclusive(async () => {
      const current = this.#balance; // read
      await new Promise((r) => setTimeout(r, 5)); // async gap (race window)
      if (current >= amount) {
        this.#balance = current - amount; // write
        console.log(`✅ Rs.${amount} withdrawn. Balance: ${this.#balance}`);
      } else {
        console.log(`❌ Rs.${amount} denied. Balance: ${this.#balance}`);
      }
    });
  }
}

const acc = new BankAccount();
// రెండు concurrent withdraws - mutex లేకపోతే రెండూ 100 చదివి overdraw అయ్యేవి
await Promise.all([acc.withdraw(70), acc.withdraw(70)]);
// ✅ Rs.70 withdrawn. Balance: 30
// ❌ Rs.70 denied. Balance: 30   (mutex వల్ల serialize అయ్యాయి)
```

### Thread-Safe Singleton గమనిక

| భాష        | Singleton thread-safety                         |
| ---------- | ----------------------------------------------- |
| Java/C++   | Double-checked locking / synchronized అవసరం     |
| JavaScript | Module caching + single thread → automatic safe |

> **గుర్తుంచుకో:** JS లో "concurrency" = async coordination. Mutex, semaphore, queue తో shared state ని కాపాడు. (Producer-Consumer కి §27 Observer చూడు.)

---

## 37. Architecture Patterns (MVC / Layered / Pub-Sub)

### వివరణ

Class-level patterns పైన, application ని **layers** గా విడదీసే architectural patterns. LLD interview లో "ఎలా organize చేస్తావు?" అనేదానికి ఇవి సమాధానం.

### MVC / MVP / MVVM

| Pattern  | విభజన                                         | ఎక్కడ                          |
| -------- | --------------------------------------------- | ------------------------------ |
| **MVC**  | Model (data) / View (UI) / Controller (logic) | Web frameworks (Rails, Spring) |
| **MVP**  | Model / View / Presenter (View passive)       | Android (పాతది)                |
| **MVVM** | Model / View / ViewModel (data binding)       | Angular, Vue, WPF              |

> **ఉమ్మడి ఆలోచన:** UI ని business logic నుండి, logic ని data నుండి విడదీయడం (SRP at app scale). Layered architecture: Presentation → Service → Repository → DB.

### Pub-Sub (Event Bus) - Observer యొక్క Architectural రూపం

```javascript
// Event Bus - publishers & subscribers ఒకరినొకరు తెలియకుండా events ద్వారా మాట్లాడతారు
class EventBus {
  #handlers = new Map();
  on(event, handler) {
    if (!this.#handlers.has(event)) this.#handlers.set(event, []);
    this.#handlers.get(event).push(handler);
    return this;
  }
  emit(event, payload) {
    (this.#handlers.get(event) || []).forEach((h) => h(payload));
  }
}

const bus = new EventBus();
// వేర్వేరు modules - ఒకరికొకరు తెలియదు, event ద్వారా మాత్రమే coupled
bus.on("order.placed", (o) => console.log(`📦 Inventory: ${o.item} తగ్గించు`));
bus.on("order.placed", (o) => console.log(`📧 Email: ${o.item} confirm`));
bus.emit("order.placed", { item: "Book" });
// 📦 Inventory: Book తగ్గించు
// 📧 Email: Book confirm
```

### Key Points

- MVC/MVP/MVVM = presentation ని logic/data నుండి విడదీయడం (app-scale SRP)
- Layered architecture = Presentation → Service → Repository → DB
- Pub-Sub / Event Bus = Observer ని modules మధ్య scale చేసిన రూపం (microservices, event-driven)

---

# Part 7 — Interview & Reference

---
<div class="fig">
<div class="cap">Architecture patterns · MVC, Layered, Pub-Sub</div>
<svg viewBox="0 0 750 350"><text class="t-xs" x="0" y="14">MVC</text><rect class="n" x="0" y="24" width="110" height="38" rx="4"/><text class="t mid" x="55" y="48">View</text><rect class="n-acc" x="125" y="24" width="110" height="38" rx="4"/><text class="t-w mid" x="180" y="48">Controller</text><rect class="n" x="250" y="24" width="110" height="38" rx="4"/><text class="t mid" x="305" y="48">Model</text><line class="ln" x1="114" y1="43" x2="121" y2="43" marker-end="url(#a)"/><line class="ln" x1="239" y1="43" x2="246" y2="43" marker-end="url(#a)"/><path class="ln-dash" d="M305 66 L305 82 L55 82 L55 66" marker-end="url(#a)"/><text class="t-sm mid" x="180" y="96">model మారితే view refresh</text><text class="t-xs" x="420" y="14">LAYERED</text><rect class="n" x="420" y="24" width="330" height="26" rx="3"/><text class="t-sm mid" x="585" y="42">Presentation (UI / API)</text><rect class="n-acc" x="420" y="54" width="330" height="26" rx="3"/><text class="t-w-sm mid" x="585" y="72">Business logic</text><rect class="n" x="420" y="84" width="330" height="26" rx="3"/><text class="t-sm mid" x="585" y="102">Data access</text><text class="t-sm mid" x="585" y="128">ప్రతి పొర తన కింది పొరతో మాత్రమే మాట్లాడుతుంది</text><text class="t-xs" x="0" y="152">PUB-SUB</text><rect class="n" x="0" y="162" width="140" height="38" rx="4"/><text class="t-sm mid" x="70" y="186">OrderService</text><line class="ln-acc" x1="144" y1="181" x2="216" y2="181" marker-end="url(#aa)"/><text class="t-sm mid" x="180" y="173">publish</text><rect class="n-acc" x="220" y="162" width="140" height="38" rx="4"/><text class="t-w-sm mid" x="290" y="186">Event Bus</text><line class="ln-acc" x1="364" y1="172" x2="436" y2="152" marker-end="url(#aa)"/><line class="ln-acc" x1="364" y1="181" x2="436" y2="181" marker-end="url(#aa)"/><line class="ln-acc" x1="364" y1="190" x2="436" y2="210" marker-end="url(#aa)"/><rect class="n-good" x="440" y="134" width="200" height="34" rx="4"/><text class="t-sm mid" x="540" y="155">EmailService</text><rect class="n-good" x="440" y="172" width="200" height="34" rx="4"/><text class="t-sm mid" x="540" y="193">AnalyticsService</text><rect class="n-good" x="440" y="210" width="200" height="34" rx="4"/><text class="t-sm mid" x="540" y="231">InventoryService</text><text class="t-sm" x="660" y="176">Publisher కి</text><text class="t-sm" x="660" y="192">subscribers ఎవరో</text><text class="t-acc" x="660" y="208">తెలియదు</text><rect class="n-soft" x="0" y="256" width="750" height="86" rx="4"/><text class="t mid" x="375" y="278">MVC = UI ని logic నుంచి · Layered = బాధ్యతలను పొరలుగా · Pub-Sub = సమయం మరియు జ్ఞానం</text><text class="t mid" x="375" y="300">రెండింటినీ విడదీయడం</text><text class="t-sm mid" x="375" y="316">ఇవి patterns కంటే <tspan class="t-acc">పెద్ద స్థాయి</tspan> — ఒక class ని కాదు, మొత్తం application ని ఎలా అమర్చాలో</text><text class="t-sm mid" x="375" y="332">చెప్తాయి</text></svg>
</div>


## 38. ఏ Pattern ఎప్పుడు వాడాలి? (Cheat Sheet)

### సమస్య → Pattern

| నీ సమస్య (ఇలా అనిపిస్తే...)                     | వాడాల్సిన Pattern           |
| ----------------------------------------------- | --------------------------- |
| ఒకటే object మొత్తం app కి కావాలి                | **Singleton**               |
| `new` చిమ్ముతోంది, ఏ class అనేది runtime లో     | **Factory Method**          |
| సంబంధిత objects family match అవ్వాలి            | **Abstract Factory**        |
| Constructor లో చాలా (optional) parameters       | **Builder**                 |
| Object creation ఖరీదు, copy చేయాలి              | **Prototype**               |
| రెండు incompatible interfaces కలపాలి            | **Adapter**                 |
| Abstraction × Implementation రెండూ మారుతున్నాయి | **Bridge**                  |
| Tree structure - part & whole ఒకేలా             | **Composite**               |
| Runtime లో పొరలుగా behaviour జోడించాలి          | **Decorator**               |
| సంక్లిష్ట subsystem కి సులభ ముఖద్వారం           | **Facade**                  |
| వేలాది సారూప్య objects - memory ఆదా             | **Flyweight**               |
| Access control, lazy load, caching              | **Proxy**                   |
| Request ని handlers గొలుసు గుండా                | **Chain of Responsibility** |
| Action = object (undo/queue/log)                | **Command**                 |
| Collection ని internal దాచి traverse            | **Iterator**                |
| Many-to-many communication గజిబిజి              | **Mediator**                |
| State save/restore (undo)                       | **Memento**                 |
| State మారితే అందరికీ notify                     | **Observer**                |
| Object behaviour దాని state బట్టి మారాలి        | **State**                   |
| ఒకే పనికి swappable algorithms                  | **Strategy**                |
| Algorithm skeleton fix, steps మార్చాలి          | **Template Method**         |
| Structure మార్చకుండా కొత్త operations           | **Visitor**                 |
| ఒక చిన్న భాష / expression ని evaluate చేయాలి    | **Interpreter**             |

### Beyond GoF (Practical Patterns)

| నీ సమస్య                              | వాడాల్సినది              |
| ------------------------------------- | ------------------------ |
| Dependency ని బయట నుండి inject చేయాలి | **Dependency Injection** |
| ఖరీదైన objects reuse చేయాలి           | **Object Pool**          |
| null కి బదులు do-nothing object       | **Null Object**          |
| Modules ని events తో decouple చేయాలి  | **Pub-Sub / Event Bus**  |
| Shared state ని async నుండి కాపాడాలి  | **Mutex / Lock**         |

### "if/else పెరుగుతోంది" → ఏ pattern?

| ఏం మారుతోంది                 | Pattern                 |
| ---------------------------- | ----------------------- |
| Algorithm/logic              | Strategy                |
| Object యొక్క state           | State                   |
| ఏ object create అవ్వాలి      | Factory                 |
| ఎవరు request handle చేస్తారు | Chain of Responsibility |

> **బంగారు నియమం:** Pattern కోసం సమస్య వెతకకు. సమస్య వచ్చినప్పుడు సరిపడే pattern వాడు. (YAGNI + KISS)

---

## 39. Memory Tips Table - మర్చిపోకూడదంటే

### Design Principles

| Principle | ఒక్క ముక్కలో                              |
| --------- | ----------------------------------------- |
| **SRP**   | ఒక class = ఒక పని                         |
| **OCP**   | Extension కి open, modification కి closed |
| **LSP**   | Child, parent స్థానంలో సరిపోవాలి          |
| **ISP**   | చిన్న interfaces, పెద్దవి కాదు            |
| **DIP**   | Abstraction మీద depend, concrete మీద కాదు |
| **DRY**   | Repeat చేయకు                              |
| **KISS**  | Simple గా ఉంచు                            |
| **YAGNI** | అవసరం లేనిది రాయకు                        |
| **LoD**   | Friends తోనే మాట్లాడు (a.b.c.d వద్దు)     |

### Design Patterns (గుర్తుంచుకునే analogy)

| Pattern              | గుర్తుంచుకోవడానికి                       |
| -------------------- | ---------------------------------------- |
| **Singleton**        | ఒకే CEO                                  |
| **Factory**          | Restaurant kitchen (order → dish)        |
| **Abstract Factory** | Furniture showroom (matching family)     |
| **Builder**          | Subway sandwich (step by step)           |
| **Prototype**        | Resume template copy                     |
| **Adapter**          | Travel plug adapter                      |
| **Bridge**           | Remote × Device (mix & match)            |
| **Composite**        | Folder లో folder (tree)                  |
| **Decorator**        | Coffee + milk + sugar (పొరలు)            |
| **Facade**           | Car start button (లోపలి 10 steps దాచి)   |
| **Flyweight**        | అడవిలో చెట్లు (type share)               |
| **Proxy**            | Credit card (account కి ప్రతినిధి)       |
| **Chain of Resp.**   | Support escalation (L1→Manager→Director) |
| **Command**          | Order slip (undo/queue)                  |
| **Iterator**         | Remote channel up                        |
| **Mediator**         | ATC tower (విమానాలు నేరుగా మాట్లాడవు)    |
| **Memento**          | Game save point                          |
| **Observer**         | YouTube subscribe                        |
| **State**            | Traffic signal (Red→Green→Yellow)        |
| **Strategy**         | Maps route (car/walk/bus)                |
| **Template Method**  | Tea/Coffee recipe skeleton               |
| **Visitor**          | Tax auditor (ఇంటింటికీ visit)            |
| **Interpreter**      | Calculator ("5 + 3" → 8)                 |

### Beyond GoF (గుర్తుంచుకునే analogy)

| Pattern                  | గుర్తుంచుకోవడానికి                 |
| ------------------------ | ---------------------------------- |
| **Dependency Injection** | కారులో engine బయట అమర్చడం          |
| **Object Pool**          | Cricket నెట్స్ ball bucket (reuse) |
| **Null Object**          | Guest account (null కాదు)          |
| **Pub-Sub / Event Bus**  | Radio station (broadcast)          |

### 3 Categories గుర్తుంచుకో (23 GoF)

| Category            | ఏం చేస్తాయి       | ఆలోచన                |
| ------------------- | ----------------- | -------------------- |
| **Creational** (5)  | Objects పుట్టడం   | "ఎలా create చేయాలి?" |
| **Structural** (7)  | Objects కలవడం     | "ఎలా కలపాలి?"        |
| **Behavioral** (11) | Objects మాట్లాడటం | "ఎలా communicate?"   |

> **మొత్తం 23 GoF patterns** (5+7+11) + **Beyond GoF** practical patterns (DI, Object Pool, Null Object, Pub-Sub) - ఈ document లో అన్నీ cover అయ్యాయి.

---

## ముగింపు

> **గుర్తుంచుకో:**
>
> - LLD = OOP tools ని _ఎప్పుడు, ఎలా_ వాడాలో నేర్పే craft.
> - Principles (SOLID/DRY/KISS/YAGNI) = దిక్సూచి. Patterns = నిరూపితమైన పరిష్కారాలు.
> - Pattern కోసం సమస్య వెతకకు; సమస్యకి సరిపడే pattern వాడు.
> - ప్రతి pattern కి real-life analogy గుర్తుపెట్టుకో - అప్పుడు మర్చిపోలేవు!

ఈ మూడు కలిసి ఒక పూర్తి మార్గం:

| | Book | ఇది ఏమి నేర్పుతుంది |
| --- | --- | --- |
| **1** | `OOPS_Telugu.pdf` | JavaScript lo objects ఎలా పనిచేస్తాయి — భాషా స్థాయి |
| **2** | `LLD_Telugu.pdf` *(ఇది)* | ఆ objects ని ఎలా అమర్చాలి — principles + 23 patterns |
| **3** | `LLD_Design_Problems_Telugu.pdf` | ఆ patterns తో 17 నిజమైన interview problems |

ప్రతి విషయం ఈ మూడింటిలో **ఒకే ఒక్క చోట** ఉంటుంది — అదే ఉద్దేశం. ఒక topic ఇక్కడ కనిపించకపోతే, అది మరో book lo పూర్తిగా ఉంది.

---

_JavaScript LLD - Complete Telugu Guideప్రతి code snippet Node.js లో run చేసి verify చేయబడింది ✅_
