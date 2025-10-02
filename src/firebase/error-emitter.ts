
import { EventEmitter } from 'events';
import type { FirestorePermissionError } from './errors';

// Define the type for the event map
interface ErrorEvents {
  'permission-error': (error: FirestorePermissionError) => void;
}

// Extend EventEmitter with the typed event map
class TypedEventEmitter<T> {
  private emitter = new EventEmitter();

  on<K extends keyof T>(event: K, listener: T[K]): this {
    this.emitter.on(event as string, listener as any);
    return this;
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): boolean {
    return this.emitter.emit(event as string, ...args);
  }
}

// Create a singleton instance of the typed event emitter
export const errorEmitter = new TypedEventEmitter<ErrorEvents>();
