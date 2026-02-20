# **ADAPTIVE SKILL ENGINE (ASE) RPG DESIGN DOC v2.0**
## Emergent Skills, Atomic Actions, ML-Driven Growth, and Effort/Decay Mechanics
**Version 2.0** | **February 20, 2026** | **Янис Эрикович** | **Elk Grove Village, IL**  
**Fullstack React + AI + Game Dev Portfolio Project**

---

## **TABLE OF CONTENTS**
1. [Executive Summary](#executive-summary)  
2. [Architecture Overview](#architecture-overview)  
3. [Atomic Actions](#atomic-actions)  
4. [Emergent Skill System](#emergent-skill-system)  
5. [Skill Growth: Invent / Transform / Master](#skill-growth-invent--transform--master)  
6. [Effort, Decay, and Reactivation](#effort-decay-and-reactivation)  
7. [Event → Skill → Scenario → Outcome](#event--skill--scenario--outcome)  
8. [World / Setting Layer](#world--setting-layer)  
9. [Numeric Examples & Mock RPG](#numeric-examples--mock-rpg)  
10. [Technical Implementation](#technical-implementation)  
11. [File Structure](#file-structure)  
12. [Deployment & Roadmap](#deployment--roadmap)  
13. [Success Metrics](#success-metrics)  
14. [Rationale Notes for AI Builder](#rationale-notes-for-ai-builder)

---

## **1. EXECUTIVE SUMMARY** 🎯

**Goal:**  
Develop an **ML engine that manages skill/persona growth** in any RPG or simulation:

- Tracks **atomic actions** (primitives)  
- Generates **emergent skills** from repeated behavior and effort  
- Evolves skills using **Invent / Transform / Master** rules  
- Applies **effort-based growth, decay, and reactivation**  
- Supports multiple narrative worlds without changing ML logic

**Outcome:**  

- Player behavior naturally produces **new abilities or tactics**  
- Works across fantasy, corporate, survival, or roguelike worlds  
- Skill evolution is **personalized**, not pre-scripted

---

## **2. ARCHITECTURE OVERVIEW** 🏗️

```

App.tsx
↓
GameLogger → EmbeddingEngine (MiniLM / BERT)
↓
┌─────────────┼─────────────┐
ClusterEngine    ScenarioPredictor  WorldAdapter
↓               ↓                 ↓
EmergentSkills      PredictedOutcome     NarrativeMapping

````

**Data Flow:**  

1. Player performs atomic actions → log text  
2. EmbeddingEngine converts text → vector  
3. ClusterEngine assigns to nearest skill cluster or invents new cluster  
4. Emergent skill updated (strength / centroid)  
5. ScenarioPredictor computes predicted outcome  
6. Actual outcome observed → error calculated → growth applied  
7. Decay/Reactivation applied periodically  
8. WorldAdapter maps clusters → narrative skill/ability

---

## **3. ATOMIC ACTIONS** 🏃‍♂️

### **3.1 Definition**
Atomic actions = **all primitive capabilities the player already has**.  

| Atomic Action | Description |
|---------------|------------|
| Move | Walk, run, jump, dodge |
| Throw | Throw objects or items |
| Pick | Pick up objects |
| Attack | Melee/ranged attack |
| Block | Shield or dodge |
| Interact | Talk, pull lever, push button |
| Work | Craft, negotiate, plan |

- Form the **vocabulary** for ML clustering  
- **Game-independent**; ML engine sees only vector embeddings

### **3.2 Data Structure**

```typescript
interface AtomicAction {
  id: string
  description: string
  embedding: Float32Array
  timestamp: number
}
````

---

## **4. EMERGENT SKILL SYSTEM** 🌌

### **4.1 Skill Definition**

Emergent skills = **latent clusters of atomic actions**:

```typescript
interface Skill {
  id: string
  centroid: Float32Array   // cluster center
  strength: number         // magnitude of cluster
  usage: number            // times applied
  lastUsed: number         // timestamp
}
```

* Created via **INVENT** (new cluster)
* Grows with **TRANSFORM** (repeated success/effort)
* Combines clusters via **MASTER** (composite tactic)

### **4.2 Skill Lifecycle**

| Human Term | ML Term               | Trigger                | Description                               |
| ---------- | --------------------- | ---------------------- | ----------------------------------------- |
| Invent     | New vector            | Novel cluster          | Cluster of atomic actions appears         |
| Transform  | Grow vector magnitude | Repetition + effort    | Repeated success strengthens skill        |
| Master     | Combine vectors       | Multiple clusters used | Composite skill emerges (tactic/strategy) |

---

## **5. SKILL GROWTH: INVENT / TRANSFORM / MASTER**

**Growth formula:**

```typescript
predicted_success = Σ similarity(e, v_i) × strength_i × effort
error = actual - predicted

if error > threshold:
    INVENT → create new cluster
    TRANSFORM → strength_i += α*(effort_actual - effort_expected)
    MASTER → combine clusters
```

* **α** = learning rate
* Strength reflects **skill maturity / narrative power**

---

## **6. EFFORT, DECAY, AND REACTIVATION** ⏳

### **6.1 Effort Model**

* Effort = intensity × duration × repetition
* High effort with success → stronger growth
* Discipline rewarded: repeated moderate effort > single spike

| Scenario                 | Effort Calculation  |
| ------------------------ | ------------------- |
| 10 pushups/day × 10 days | 1 per day × 10 = 10 |
| 100 pushups once         | 10 × 1 = 10 (spike) |

### **6.2 Decay**

* Skills weaken if unused:

```
Daily: strength *= 0.98
Weekly: strength *= 0.88
Monthly: strength *= 0.65
Floor: strength >= 0.25 * initial_strength
```

* Prevents skill loss entirely, preserves “muscle memory”

### **6.3 Reactivation**

* Using a decayed skill restores strength:

```
1 session → restore 45%
3 sessions → restore 100%
5 sessions → restore 105% (bonus)
```

* Scales with **effort** applied during reactivation

---

## **7. EVENT → SKILL → SCENARIO → OUTCOME**

```
Atomic actions → embeddings
        ↓
ClusterEngine → skill update (Invent/Transform/Master)
        ↓
ScenarioPredictor → predicted outcome
        ↓
Outcome observed → error
        ↓
Effort/Decay/Reactivation applied
```

* Supports **multiscale analysis**: micro (fight) → macro (campaign)
* Aggregation produces skill maturity naturally

---

## **8. WORLD / SETTING LAYER** 🌍

* World = narrative mapping layer
* Clusters universal; narrative interpretation optional

| World     | Atomic → Narrative Mapping         |
| --------- | ---------------------------------- |
| Fantasy   | FireHandling → Fireball            |
| Corporate | Attack → Argue, Work → Project     |
| Survival  | Throw → Stone Throw, Block → Dodge |

* Engine mechanics **do not change**, only interpretation differs

---

## **9. NUMERIC EXAMPLES & MOCK RPG**

### **9.1 Setting: Stonevale Dungeon**

* Atomic actions: Move, Throw, Pick, Attack, Block, Interact
* Logs: “threw torch”, “blocked hit”, “ran backward”, “killed rat”

### **9.2 Barn Fire → Fireball**

1. **Atomic Actions Logged**

```
Move near barn
Pick torch
Throw torch
Fire spreads
Rats die
Keep distance
Repeat throws
```

2. **Embeddings**

```
throw: [0.7,0.1,0.5]
fire spread: [0.8,0.2,0.6]
burn damage: [0.75,0.15,0.55]
```

3. **INVENT → Cluster**

```
v_fire = mean([0.7,0.1,0.5],[0.8,0.2,0.6],[0.75,0.15,0.55])
strength = 1.0
```

4. **TRANSFORM → Repetition/Effort**

```
effort = 3.0
predicted = 2.94, actual = 6
strength += 0.5*(3-1) = 1 → new strength = 2.0
```

5. **MASTER → Combine with Movement**

```
v_new = 0.6*v_fire + 0.4*v_move
strength_new = 1.5
Emergent skill: KitingFire
Narrative: Fireball spell
```

### **9.3 Decay & Reactivation Example**

* Skill unused for 7 days → weekly decay: `strength *= 0.88` → 1.32
* Player uses skill with effort 2 → 0.5 × (2) = 1 → restore strength = 2.32

---

## **10. TECHNICAL IMPLEMENTATION** 💻

* **Frontend:** React + TypeScript + Tailwind
* **Embedding:** MiniLM-L6-v2, 384-dim vectors
* **Vector DB:** usearch-wasm for nearest-cluster queries
* **Persistent Logs:** IndexedDB
* **Performance:**

  * Log → embed → cluster → prediction < 500ms
  * Incremental skill update < 50ms

---

## **11. FILE STRUCTURE** 📁

```
src/
├── core/
│   ├── embeddingEngine.ts
│   ├── clusterEngine.ts
│   ├── skillGrowth.ts  # includes decay/reactivation
│   ├── scenarioPredictor.ts
├── world/
│   ├── worldAdapter.ts
│   └── worlds/ (JSON mapping)
├── battle/
│   └── battleSimulator.ts
├── components/
│   ├── LogViewer.tsx
│   ├── SkillDashboard.tsx
│   └── ScenarioDisplay.tsx
└── App.tsx
```

---

## **12. DEPLOYMENT & ROADMAP** 🚀

### **Week 1: Foundation**

* Atomic action logging
* Embedding → clustering (INVENT)

### **Week 2: Dynamics**

* TRANSFORM updates with effort
* MASTER updates for composites
* Scenario predictor & error calculation

### **Week 3: Worlds**

* World adapter for narrative skill mapping
* Example worlds: Fantasy, Corporate, Survival

### **Week 4: Polish**

* UI dashboards for skills
* Decay/reactivation periodic updates
* Optimization & ML prototyping

---

## **13. SUCCESS METRICS** 📊

```
✅ Atomic action → embedding < 50ms
✅ Cluster update / skill growth < 50ms
✅ Emergent skill accuracy / prediction > 85%
✅ Multi-world mapping works
✅ Decay/reactivation functional
✅ Player behavior produces emergent tactics/abilities
```

---

## **14. RATIONALE NOTES FOR AI BUILDER** 🤖

* **Atomic actions** = immutable vocabulary → ML layer agnostic
* **Clusters** = latent concepts → INVENT allows new skills
* **Strength** = effort-driven growth → TRANSFORM models “you grew stronger”
* **Composite clusters** = MASTER → combined tactics/strategy
* **Decay/reactivation** = models forgetting & memory reinforcement
* **World mapping** = separates **mechanics from narrative**, allows reusing same engine in multiple settings
* **Error-driven updates** = core ML signal; positive/negative errors drive growth, mastery, and emergence
* **Numeric examples** = ensure AI builder can prototype pipeline with concrete values
* **Multiscale support** = micro (atomic actions/fights) → macro (campaigns/worlds)

---

**End of Document — ASE RPG v2.0**

```

-
Do you want me to produce that skeleton next?
```
