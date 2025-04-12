/**
 * Interface for creating an app.
 */
interface ICreateApp {
  /**
   * The CSS selector for the root element of the app.
   */
  root: string;
  middlewares: (() => void)[];

  /**
   * A function that returns the app as a string.
   * @returns {string} The app as a string.
   */
  app: () => string;

  /**
   * Render the app.
   * @param {{onInited?: () => void, beforeInited?: () => void}} handlers The handlers for initialization.
   * @returns {void} Nothing.
   */
  render: ({
    onInited,
    middlewares,
    beforeInited,
  }: {
    onInited?: () => void;
    beforeInited?: () => void;
    middlewares: (() => void)[];

  }) => void;
}

/**
 * Class for creating and managing an app.
 * Implements the ICreateApp interface.
 */
class CreateApp implements ICreateApp {
  /**
   * Singleton instance of CreateApp.
   * @type {CreateApp | null}
   */
  static instance: CreateApp | null = null;

  root: string;
  middlewares: (() => void)[] = [];
  app: () => string;

  /**
   * Private constructor to enforce singleton pattern.
   * @param {string} root The root element for the app.
   * @param {() => string} app A function that returns the app as a string.
   */
  private constructor(root: string, app: () => string) {
    this.root = root;
    this.app = app;

    
  }

  /**
   * Returns the singleton instance of the CreateApp class.
   * @description
   * The first time this method is called, it creates a new instance of the CreateApp class,
   * stores it in the instance property and returns it. Subsequent calls of this method
   * return the same instance that was previously stored.
   * @param {string} root The root element for the app.
   * @param {() => string} app A function that returns the app as a string.
   * @returns {CreateApp} The singleton instance of the CreateApp class.
   */
  public static createApp(root: string, app: () => string): CreateApp {
    if (!this.instance) {
      this.instance = new CreateApp(root, app);

    }


    return this.instance;
  }

  /**
   * Render the app.
   * @description
   * This method renders the app within the root element.
   * @param {{beforeInited?: () => void, onInited?: () => void}} handlers The handlers for initialization.
   * @returns {void} Nothing.
   */
  public render({
    beforeInited,
    middlewares,
    onInited,
  }: {
    beforeInited?: () => void;
    middlewares: (() => void)[];
    onInited?: () => void;
  }) {


    beforeInited && beforeInited();

    document.addEventListener("DOMContentLoaded", () => {
      if (document.querySelector(this.root)) {
        const root = document.querySelector(this.root);
        if (root) {
          const parser = new DOMParser();
          const appElement = parser.parseFromString(this.app(), "text/html");
          const scripts = appElement.querySelectorAll("script");
          scripts.forEach((script) => script.remove());
          root.innerHTML = appElement.body.innerHTML;
          if(document.readyState === "interactive") {
            onInited && onInited();
          }
        }
      }
    });

    this.middlewares?.push(...middlewares);

    this.middlewares?.forEach((middleware) => middleware());

  }

  
}

/**
 * Creates a new instance of the CreateApp class, calls the render method and returns nothing.
 * @param {{root: string, app: () => string, init?: boolean, beforeInited?: () => void, onInited?: () => void}} options Options object with two properties:
 *   - `root`: The CSS selector for the root element of the app.
 *   - `app`: A function that returns the app as a string.
 * @returns {void} Nothing.
 */
export function createApp({
  root,
  app,
  beforeInited,
  middlewares,
  onInited,
}: {
  root: string;
  app: () => string;
  middlewares?: (() => void)[];
  init?: boolean;
  beforeInited?: () => void;
  onInited?: () => void;
}) {
  CreateApp.createApp(root, app).render({
    beforeInited: beforeInited && beforeInited,
    onInited: onInited && onInited,
    middlewares: middlewares || []
  });
}
