# TypeScript practice Sprint: Hive Operations System 🐝🚀

Welcome to the **TypeScript practice Sprint**! This repository is designed to take you from a TypeScript beginner to an expert in modern static type systems, interfaces, Object-Oriented Programming (OOP) paradigms, generic constraints, asynchronous programming, and meta-programming type transformations (Mapped & Conditional types).

Unlike isolated coding exercises, the entire sprint is structured around a single, real-world domain: **The Sovereign Swarm Hive Management & Operations System**. Every section builds logically on the previous one, creating a cohesive, immersive learning experience.

---

## 📋 Table of Contents
1. [Sprint Structure](#-sprint-structure)
2. [Getting Started & Installation](#-getting-started--installation)
3. [Running Tests](#-running-tests)
4. [Step-by-Step Exercise Guides](#-step-by-step-exercise-guides)
    - [Part 1: The Hive Registry](#part-1-the-hive-registry-basics--core-types)
    - [Part 2: The Hive Hierarchy](#part-2-the-hive-hierarchy-oop-subclasses--access-modifiers)
    - [Part 3: Chamber Storage & Task Queues](#part-3-chamber-storage--task-queues-generics)
    - [Part 4: Hive Security & Events](#part-4-hive-security--events-advanced-types)
    - [Part 5: Foraging Dispatcher](#part-5-foraging-dispatcher-asynchronous-operations--promises)
    - [Part 6: Analytics Dashboard](#part-6-analytics-dashboard-mapped--conditional-types)
5. [Useful Resources](#-useful-resources)

---

## 🏗️ Sprint Structure

The sprint is split into six progressive, pedagogical sections:

```
RBKTN-TU-C1-26-typescript-sprint/
├── src/
│   ├── 01-basics.ts       <-- Part 1: Hive Registry (Core Types, Interfaces, Tuples)
│   ├── 02-bees.ts         <-- Part 2: Hive Hierarchy (OOP, Subclasses, Access Modifiers)
│   ├── 03-generics.ts     <-- Part 3: Chamber Storage & Task Queues (Generics, Type Constraints)
│   ├── 04-advanced.ts     <-- Part 4: Hive Security & Events (Intersection Types, Discriminated Unions)
│   ├── 05-async.ts        <-- Part 5: Foraging Dispatcher (Promises, Async/Await, Service Stubs)
│   └── 06-analytics.ts    <-- Part 6: Analytics Dashboard (Mapped & Conditional Types)
└── test/
    ├── 01-basics.test.ts
    ├── 02-bees.test.ts
    ├── 03-generics.test.ts
    ├── 04-advanced.test.ts
    ├── 05-async.test.ts
    └── 06-analytics.test.ts
```

---

## ⚡ Getting Started & Installation

### 1. Requirements
Ensure you have **Node.js** and **npm** installed on your system.
* Check Node: `node -v`
* Check npm: `npm -v`

If you need to install them, please visit [Node.js Official Website](https://nodejs.org/).

### 2. Setup
Navigate into this folder and install all the development dependencies (such as TypeScript, Mocha, Chai, and ts-node):

```bash
cd RBKTN-TU-C1-26-typescript-sprint
npm install
```

---

## 🧪 Running Tests

We use **Mocha** and **Chai** combined with **ts-node** to execute TypeScript tests instantly without a manual compilation step!

### 🏃‍♂️ Run All Tests
To run all tests in the project simultaneously:
```bash
npm test
```

### 🎯 Run Part-by-Part Tests (Recommended)
To focus on one specific exercise file at a time without getting compiler errors from other unfinished sections, you can execute individual test files using these dedicated scripts:

| Part | Description | Target Exercise File | Command |
| :--- | :--- | :--- | :--- |
| **Part 1** | The Hive Registry | `src/01-basics.ts` | `npm run test:1` |
| **Part 2** | The Hive Hierarchy | `src/02-bees.ts` | `npm run test:2` |
| **Part 3** | Chamber Storage & Task Queues | `src/03-generics.ts` | `npm run test:3` |
| **Part 4** | Hive Security & Events | `src/04-advanced.ts` | `npm run test:4` |
| **Part 5** | Foraging Dispatcher (Async) | `src/05-async.ts` | `npm run test:5` |
| **Part 6** | Analytics Dashboard | `src/06-analytics.ts` | `npm run test:6` |

Initially, the TypeScript compiler will complain because your classes, interfaces, and types are empty templates. As you implement the solutions step-by-step, the compilation warnings will clear up and the test runner will turn green!

---

## 📘 Step-by-Step Exercise Guides

### Part 1: The Hive Registry (Basics & Core Types)
**File:** `src/01-basics.ts`

Get comfortable with the core syntax of TypeScript:
* **Basic Annotations:** Annotate `hiveName` (string), `population` (number), and `isQueenPresent` (boolean).
* **Arrays & Tuples:** Type an array of numbers (`larvaeWeights`) and a 3-tuple `Position3D` representing `[latitude, longitude, altitude]`. Then, annotate `hiveLocation` as a `Position3D`.
* **Interfaces:** Define a `BeeProfile` interface containing mandatory fields (`id`, `name`, `age`, `role`) and optional fields (`specialization`, `healthScore`).
* **Typed Functions:** Add explicit parameter and return annotations to `isLarvaReadyForCocoon`, `registerBee`, and `calculateAverageWeight` functions.

---

### Part 2: The Hive Hierarchy (OOP, Subclasses & Access Modifiers)
**File:** `src/02-bees.ts`

Model the workforce of the colony using TypeScript's class syntax, subclass inheritance, and strict access control modifiers (`public`, `private`, `protected`, `readonly`):

1. **`BaseLarva`**:
   - Holds a readonly `age: number`, protected `healthScore: number`, and private `foodSource: string`.
   - Implement `eat(amount: number): void` (boosts healthScore by `amount * 2`, capped at `100`).
   - Implement `getHealth(): number` returning `healthScore`.

2. **`AdultBee`** (extends `BaseLarva`):
   - Holds protected `registryProfile: BeeProfile`.
   - Implement `performRole(): string` returning: `"Bee <name> is executing role: <role>"`
   - Implement `getProfile(): BeeProfile` returning `registryProfile`.

3. **`HoneyProducerBee`** (extends `AdultBee`):
   - Holds a private `honeyPotsCollected: number` initialized to `0`.
   - Implement `produceHoney(): void` (increments pots and adds `2` to `healthScore`).
   - Implement `unloadHoney(): number` which returns the pot count and resets it to `0`.

4. **`PollenForager`** (extends `AdultBee`):
   - Holds private `canFly: boolean` and a private array `treasureChest: string[]`.
   - Implement `forage(location: Position3D): void`. If `canFly` is true, append `"pollen-[lat]-[long]-[alt]"` to chest.
   - Implement `getTreasure(): string[]` returning the chest contents.

5. **`RoyalQueenBee`** (extends `AdultBee`):
   - Holds a private array `workerRegistry: AdultBee[]`.
   - Implement `layEggs(count: number): string` returning: `"Queen <name> laid <count> larvae"`.
   - Implement `registerWorker(worker: AdultBee): void` to track active workers in the hive workforce.

---

### Part 3: Chamber Storage & Task Queues (Generics)
**File:** `src/03-generics.ts`

Write highly reusable, type-safe utilities:
* **Generic Class (`ChamberStorage<T>`)**: Manage type-safe storage collections of any resource (e.g. food jars, eggs, or tools) with methods `addItem(item: T)`, `getItem(index: number)`, `listItems()`, and `size()`.
* **Generic Constraint Task Queue (`HiveTaskRunner<T extends Task>`)**: Enforce constraints on a type parameter. Implement a FIFO execution task queue where every task must structurally implement the `Task` interface (`id`, `description`, `urgency: 'LOW' | 'HIGH'`). Implement methods `queueTask(task: T)`, `runNextTask()`, `getHighPriorityTasks()`, and `size()`.

---

### Part 4: Hive Security & Events (Advanced Types)
**File:** `src/04-advanced.ts`

Combine type definitions and implement strict event-loop handling using advanced typing features:
* **Intersection Types:** Combine `AdultBee`, `Specialist` (with `specializationCode` and `performAnalysis()`), and `Guard` (with `defendStation` and `alertSignal()`) to form a new type: `DefenseLead`.
* **Discriminated Unions:** Group separate hive operations events (`HoneyHarvestEvent`, `IntruderAlertEvent`, `SwarmRequestEvent`) under a single union type `HiveEvent` tagged by a common literal string `type` property.
* **Custom Type Guards:** Implement Type Guard functions `isAlertEvent` and `isHarvestEvent` utilizing the `is` keyword type predicate.
* **Exhaustive Narrowing:** Complete `processHiveEvent` using type narrowing branches to generate custom, structured strings based on exact event variants.

---

### Part 5: Foraging Dispatcher (Asynchronous Operations & Promises)
**File:** `src/05-async.ts`

Master asynchronous TypeScript programming:
* **Service Mocking:** Implement an async contract for `WeatherService` returning a Promise of a strictly typed `WeatherReport` (`temperature`, `windSpeed`, and `status: 'SAFE' | 'WARNING' | 'DANGEROUS'`).
* **Custom Rejections:** Subclass the standard `Error` class to create a custom, descriptive `WeatherError`.
* **Async Dispatching:** Implement `HiveDispatcher.dispatchSquad(location, foragers)` which awaits weather conditions, evaluates risks, throws `WeatherError` if dangerous, or resolves safety deployment warning messages.

---

### Part 6: Analytics Dashboard (Mapped & Conditional Types)
**File:** `src/06-analytics.ts`

Practice type transformations and advanced meta-programming type operations:
* **Mapped Types:** Implement `StrictRegistryConfig<T>` which iterates over keys and transforms all properties of a type to be both `readonly` and required (by stripping out optional `?` flags).
* **Conditional Types:** Implement `FilterLaborBees<T>`. If a union element `T` contains a property `{ canPerformLabor: true }` matching `LaborBeeType`, keep it. Otherwise, resolve to `never`.
* **Standard Built-in Utilities:** Practice advanced mappings using standard utilities:
  - `Required<T>` to make all profile keys mandatory.
  - `Omit<T, K>` to exclude sensitive data properties (e.g. `confidentialSystemLog`) from public reports.
  - `Record<K, T>` to map string names to numeric yields.

---

## 📚 Useful Resources

* [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
* [TypeScript Classes & Inheritance](https://www.typescriptlang.org/docs/handbook/2/classes.html)
* [TypeScript Generics Guide](https://www.typescriptlang.org/docs/handbook/2/generics.html)
* [TypeScript Narrowing & Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
* [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/2/utility-types.html)
* [TypeScript Advanced Types (Mapped & Conditional)](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

Good luck, and happy coding! 🐝🚀
