import { editorInstance } from "./editor";
import { Editor } from "../../components/editor/editor";

export class PluginBase {
  /**
   * The plugin's config.
   */
  protected readonly config: iPluginConfig;

  /**
   * The editor's instance. Can be used to run functions defined in the 
   * `Editor` class.
   */
  protected readonly editor: Editor = editorInstance;

  /**
   * Reference to the current plugin's main content.
   */
  private pluginRef: HTMLElement;

  /**
   * The style of the plugin.
   */
  protected style: CSSStyleDeclaration;

  /**
   * The object containing the references to the `style` property of all the 
   * elements.
   * 
   * @example
   * class ExamplePlugin {
   *  constructor() {
   *    // This stuff is expected to be done by you!!
   *  }
   * 
   *  onInit() {
   *   // Example element (to be styled): 
   *   // Note that JSX support is yet to be added (due to issues with
   *   // 'appendChild', it couldn't be added)
   *   const elementExample = <div id="styleMe" class="iWannaBeStyled"></div>;
   *   // Append the element first
   *   this.editor.appendElement({
   *     element: elementExample,
   *     slot: 'editor',
   *     name: this.config.name
   *   });
   *   // NOTE: Calling `enableStyling()` is necessary if you want to style your 
   *   // elements
   *    this.enableStyling();
   *    // Currently, to get a reference to the `style` property, you need to 
   *    // use the following format: this.stylables['TAG_NAME.CLASS_NAME#ID'], 
   *    // where `.CLASS_NAME` and `#ID` must be used ONLY if you're setting a 
   *    // class name or an ID of the element.
   *    // Also, as of now, you can't use any other properties of your element 
   *    // to select them.
   *    const stylableExample = this.stylables['div.iWannaBeStyled#styleMe'];
   *    // Now, style it
   *    stylableExample.style.background = '#212121';
   *  }
   * }
   */
  protected stylables: iPluginStylables = {};

  /**
   * The global functions, that can be run by other plugins.
   * 
   * @example
   * class ExamplePlugin {
   *  constructor() {
   *    // Register the function
   *    this.register(this.x);
   *  }
   * 
   *  // This function will be made global
   *  x() {
   *    console.log(`I live in the global scope!`);
   *  }
   * 
   *  onInit() {
   *    // To run the function, you can do this:
   *    this.global['x']();
   *    // Or this:
   *    this.global.x();
   *    // Note that IntelliSense won't be available for this
   *  }
   * }
   */
  global: iPluginFunctions = {};

  constructor(config: iPluginConfig) {
    this.config = config;
  }

  /**
   * Registers a function that can be used globally by other functions.
   * 
   * Note that you'll have to declare that function in your plugin's class to 
   * avoid naming errors.
   * 
   * @param {Function} fn The function to add to the register.
   * @todo Check if the function already exists
   * 
   * @example
   * // Please see the example of `global`
   */
  register(fn: Function) {
    // Check if the function has a name or not, since functions that do not 
    // have a name won't be registered
    if (!!fn.name) {
      // Add the function to the function register
      this.global[fn.name] = fn;
    } else {
      // Throw an error
      console.error('The function must have a name.');
    }
  }

  /**
   * Enables styling in a plugin.
   * 
   * @example
   * // Please see the example of `stylables`.
   */
  enableStyling(): void {
    // Create a reference to the plugin
    this.pluginRef = this.editor.ref
      .querySelector(`span.plugin-${this.config.name.toLowerCase()}`);
    // Get the children of the plugin
    const innerElements = this.pluginRef.shadowRoot.children;
    // Go through all the plugins
    for (let i = 0; i < innerElements.length; i++) {
      // Get the `i`th child
      const elem = innerElements.item(i) as HTMLElement;
      // Get the class and ID for referencing the element
      const elemClass = elem.className.substr(7)
        ? `.${elem.className.substr(7)}` : '';
      const elemId = elem.id ? `#${elem.id}` : '';
      // Create a reference name
      const name = `${elem.tagName.toLowerCase()}${ elemId }${ elemClass }`;
      // Add the reference to the `stylables` object
      this.stylables[name] = {
        is: elem.getAttribute('is'),
        style: elem.style
      };
    }
  }

  onInit(): any {
    throw new Error(`Error: 'onInit()' is not defined. [${this.config.name}]`);
  }

  onDestroy(): any {
    console.warn(`Warning! Plugin destruction isn't handled.`);
  }
}

export class PluginManager {
  /**
   * The array that contains the plugin's classes(?)
   */
  protected plugins: Array<iEditorPlugins>;

  protected pluginConf: iPluginConf;

  /**
   * The array that has all the instances of the plugins created before the 
   * plugin is initialized.
   */
  protected pluginInstances = [];

  constructor(plugins: Array<iEditorPlugins>) {
    this.plugins = plugins;
  }

  init(): void {
    // Go through all the plugins
    this.plugins.map((plugin: iEditorPlugins) => {
      // Create an instance of the plugin and pass the configuration of the 
      // plugin
      const pluginInstance = new plugin.plugin(plugin.config);
      // Push `pluginInstance` to the `pluginInstances` array
      this.pluginInstances.push(pluginInstance);
      // Check if `pluginInstance` is an instance of `PluginBase`
      if (pluginInstance instanceof PluginBase) {
        // Run the `onInit()` function of the plugin
        pluginInstance.onInit();
      } else {
        // Pop the plugin off `pluginInstances` array, since it isn't an 
        // instance of `PluginBase`
        this.pluginInstances.pop();
      }
    });
  }

  destroy(): void {
    // Check if `init` has been called first
    // We can check it by checking if `pluginInstances` is empty
    if (!this.pluginInstances.length) {
      console.warn(`WARNING!\n` +
        `You are destroying plugins before initializing them. You might want` +
        ` to call 'init()' first.`);
    }
    // Go through all the instances of the plugins and destroy them one by one
    this.pluginInstances.map((plugin: PluginBase) => {
      // Destroy the plugin
      plugin.onDestroy();
      // Set the plugin to `null`
      plugin = null;
    });
    // Now, filter out all the `null` values
    // Well, this isn't needed; we can directly make the array empty, but hey, 
    // let's use `Array.prototype.filter()` ;)
    this.pluginInstances = this.pluginInstances
      .filter(isNullValue => isNullValue ? true : false);
  }
}
