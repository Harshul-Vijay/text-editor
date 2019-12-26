/**
 * @deprecated This is (currently) deprecated.
 */
interface iEditorCaretPosition {
  x: number;
  y: number;
}

interface iEditorPlugins {
  /**
   * The constructor of the plugin.
   */
  plugin: any;

  /**
   * The configuration to pass to the plugin.
   */
  config?: object;
}

interface iEditorPluginSlots {
  editor: Array<HTMLElement>;
  footer: Array<HTMLElement>;
  ribbon: Array<HTMLElement>;
}

interface iEditorSlots {
  editor: HTMLElement;
  footer: HTMLElement;
  ribbon: HTMLElement;
}

interface iElementInfo {
  readonly element: Element;
  name: string;
  slot: 'editor' | 'ribbon';
}

interface iPluginConf {
  [key: string]: object;
}

interface iPluginConfig {
  /**
   * The name of the plugin.
   */
  name: string;

  /**
   * The type of the plugin.
   */
  type: string;

  /**
   * (Optional)
   * 
   * The plugin's version.
   */
  version?: string;

  /**
   * (Optional)
   * 
   * The URL(s) to the CSS stylesheet(s) for the plugin.
   */
  stylesheets?: Array<Promise<FileReader>>;
}

interface iPluginFunctions {
  [key: string]: Function;
}

interface iPluginStylable {
  /* class: string; */
  /**
   * The `is` attribute of the element.
   */
  is: string;

  /**
   * The style of the element. Can be used to change the styling of the 
   * element.
   */
  style: CSSStyleDeclaration;
}

interface iPluginStylables {
  [key: string]: iPluginStylable
}
