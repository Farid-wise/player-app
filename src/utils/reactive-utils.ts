import { delay } from "./delay";

/**
 * Creates a reactive reference to a value. The returned proxy object has a single 'value'
 * property that can be used to get or set the value. An optional callback can be provided
 * that will be called when the value is set.
 *
 * @template T The type of the value being referenced.
 * @param {T} value The initial value of the reference.
 * @param {((val: T) => void) | undefined} [callback] An optional callback to be called
 *   when the value is set.
 * @returns {Proxy<T>} A reactive reference to the value.
 */
export function ref<T = any>(value: T, callback?: (val: T, flushState?: () => void) => void) {
  const wrapper = {
    value,
  };

  /**
   * Flushes the state of the reactive reference by setting its value to null.
   * This is used internally by the proxy to force the value to be re-fetched
   * from the original source when the value is set.
   * @returns {void} Nothing.
   */
  const flushState = () => {
    // @ts-ignore
    wrapper.value = null
  };

  // @ts-ignore
  window.appState = wrapper;

  return new Proxy(wrapper, {
    get(target, key) {
      if (key === "value") {
        return target[key];
      }
      // @ts-ignore
      window.appState = wrapper;
      return undefined;
    },
    set(target, key, newValue) {
      if (key === "value") {
        target[key] = newValue;
        callback && callback(newValue, flushState);
        // @ts-ignore
        window.appState = wrapper;
        return true;
      }
      return false;
    },
  });
}

/**
 * Creates a reactive property that encapsulates a value and allows subscription to changes.
 * The returned object provides access to the current value, a history of values, and a subscription
 * mechanism to notify subscribers whenever the value changes.
 *
 * @template T The type of the value being observed.
 * @param {T} value The initial value of the reactive property.
 * @returns {Object} An object with the properties:
 *   - `value`: The current value of the reactive property.
 *   - `subscribe`: A function to add subscribers that will be notified on value changes.
 */

export type ReactiveState<T> = {
  value: T;
  subscribe: (...subscribers: ((value: T) => void)[]) => void;
  history: () => Promise<T[]>;
};
/**
 * Creates a reactive property that encapsulates a value and allows subscription to changes.
 * The returned object provides access to the current value, a history of values, and a subscription
 * mechanism to notify subscribers whenever the value changes.
 *
 * @template T The type of the value being observed.
 * @param {T} value The initial value of the reactive property.
 * @returns {Object} An object with the properties:
 *   - `value`: The current value of the reactive property.
 *   - `subscribe`: A function to add subscribers that will be notified on value changes.
 *   - `history`: A function that returns a promise that resolves with an array of all values that the reactive
 *     property has taken on.
 */
export function reactive<T>(value: T): ReactiveState<T> {
  class Reactive {
    private _value: T;
    private _values: T[] = [];
    private subscribers: ((value: T) => void)[];

    /**
     * @param {T} value The initial value of the reactive property.
     */
    constructor() {
      this._value = value;

      /**
       * A list of subscriber functions to be called when the reactive property's value changes.
       * @type {Array<function>}
       * @private
       */
      this.subscribers = [];
    }

    /**
     * Retrieves the current value of the reactive property.
     * @returns {T} The current value.
     */
    get value(): T {
      return this._value;
    }

    /**
     * Sets the value of the reactive property. All subscribers will be notified.
     * @param {T} newValue The new value of the reactive property.
     */
    set value(newValue: T) {
      this._value = newValue;

      //console.log(this._values);

      this.subscribers.forEach((sub) => sub(newValue));
      this._values.push(this._value);
    }

    /**
     * Subscribes one or more functions to be notified when the reactive property's value changes.
     * Each function will be called with the new value as its argument whenever the value is updated.
     * @param {...function} subscribers The functions to subscribe for change notifications.
     */

    subscribe(...subscribers: ((value: T) => void)[]) {
      subscribers.forEach((subscriber) => this.subscribers.push(subscriber));
    }

    async history(): Promise<T[]> {
      await delay(1000);
      return this._values;
    }
  }

  return new Reactive();
}
