/**
 * SECTION 1: The Hive Registry (Basics & Core Types)
 * 
 * In this section, you will register the basic state of the honeybee colony
 * and create interfaces and type aliases for bee profiles and GPS coordinates.
 */

// 1. Basic Variable Annotations
// - Annotate 'hiveName' as a string (initialized to "Sovereign Swarm")
// - Annotate 'population' as a number (initialized to 45000)
// - Annotate 'isQueenPresent' as a boolean (initialized to true)
export let hiveName: any = "Sovereign Swarm";
export let population: any = 45000;
export let isQueenPresent: any = true;

// 2. Arrays & Tuples
// - Annotate 'larvaeWeights' as an array of numbers.
export let larvaeWeights: any = [4.2, 5.8, 10.5, 3.1, 12.0];

// - Define a Type Alias 'Position3D' representing a tuple [number, number, number]
//   which stands for [latitude, longitude, altitude].
export type Position3D = any;

// - Annotate 'hiveLocation' as a 'Position3D' tuple (initialized to [36.8065, 10.1815, 250])
export let hiveLocation: any = [36.8065, 10.1815, 250];


// 3. Interfaces
// - Define an interface 'BeeProfile' representing a registered adult bee.
// - It should have the following properties:
//   - id: number
//   - name: string
//   - age: number (in days)
//   - role: string
//   - specialization: string (optional property)
//   - healthScore: number (optional property)
export interface BeeProfile {
  // TODO: Implement the interface properties here
}


// 4. Typed Functions
// - Implement 'isLarvaReadyForCocoon'. It should accept 'weight' as a number, and return a boolean.
//   A larva is ready if its weight is 10.5 milligrams or greater.
export function isLarvaReadyForCocoon(weight: any): any {
  // TODO: Add type annotations and implementation
}

// - Implement 'registerBee'. It should accept a 'profile' of type 'BeeProfile' and return a string.
//   It should return: "Registered bee: <name> as <role>" (e.g. "Registered bee: Buzz as Forager")
export function registerBee(profile: any): any {
  // TODO: Add type annotations and implementation
}

// - Implement 'calculateAverageWeight'. It should accept an array of numbers ('weights') and return a number.
//   It should compute and return the average of the weights. If the array is empty, return 0.
export function calculateAverageWeight(weights: any): any {
  // TODO: Add type annotations and implementation
}
