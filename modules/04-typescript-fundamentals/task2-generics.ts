/**
 * Task 2: Generics in Action
 * 
 * Master TypeScript generics by creating reusable, type-safe utility functions and classes.
 */

// Part 1: Generic Functions

// TODO: Implement a generic function that returns the first element
export function getFirst<T>(array: T[]): T | undefined {
  // TODO: Implement this function
  return undefined;
}

// TODO: Create a generic API response wrapper interface
// interface ApiResponse<T> {
//   ...
// }

// TODO: Function that creates a success response
// export function createSuccessResponse<T>(data: T): ApiResponse<T> {
//   ...
// }

// TODO: Generic filter with predicate
export function filterArray<T>(
  array: T[],
  predicate: (item: T) => boolean
): T[] {
  // TODO: Implement this function
  return [];
}

// Part 2: Generic Class

// TODO: Implement a generic Repository class
export class Repository<T> {
  private items: T[] = [];

  // TODO: Add item
  add(item: T): void {
    // TODO: Implement
  }

  // TODO: Get all items
  getAll(): T[] {
    // TODO: Implement
    return [];
  }

  // TODO: Find item by condition
  find(predicate: (item: T) => boolean): T | undefined {
    // TODO: Implement
    return undefined;
  }

  // TODO: Remove item
  remove(predicate: (item: T) => boolean): boolean {
    // TODO: Implement
    return false;
  }

  // TODO: Update item
  update(predicate: (item: T) => boolean, updates: Partial<T>): boolean {
    // TODO: Implement
    return false;
  }
}

// Part 3: Generic Constraints

// TODO: Define HasId interface
// interface HasId {
//   id: number;
// }

// TODO: Generic function that works only with objects having an 'id' property
// export function findById<T extends HasId>(items: T[], id: number): T | undefined {
//   ...
// }

// Part 4: Multiple Type Parameters

// TODO: Generic function with two type parameters
// export function mapObject<K extends string, V, R>(
//   obj: Record<K, V>,
//   mapper: (value: V, key: K) => R
// ): Record<K, R> {
//   ...
// }
