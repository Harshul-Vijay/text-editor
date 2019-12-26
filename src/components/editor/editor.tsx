import { Component, Host, h, Prop } from '@stencil/core';
import { PluginManager } from '../../global/lib/plugins';
import { setInstance } from '../../global/lib/editor';

@Component({
  tag: 'text-editor',
  styleUrl: 'editor.scss',
  shadow: true
})
export class Editor {
  /**
   * The plugins to activate
   * 
   * @example
   * <text-editor plugins={[
   *  {
   *    plugin: PluginA,
   *    config: {
   *      some: 'config here'
   *    }
   *  },
   *  {
   *    plugin: PluginB,
   *  },
   *  ...
   * ]}></text-editor>
   */
  @Prop() plugins: Array<iEditorPlugins>;

  /**
   * The reference to the complete `Editor` element.
   * 
   * @protected This property can be used within this class only. If you want 
   * to use it outside this class, you may want to use `ref` instead.
   */
  protected reference: HTMLElement;

  /**
   * The reference object to the pre-defined `slot`s.
   * Each member of this object is of type `HTMLElement`, so you can modify 
   * them just like any other DOM element.
   * 
   * @example
   * // For example, to get a reference to the `Editor` slot, you may do this:
   * const editor = this.slots.editor;
   * // Or, alternatively, you may do this:
   * const editor = this.slots['editor'];
   */
  slots: iEditorSlots;
  
  constructor() {
    // This line sets the instance of the editor to this class, which is then 
    // used by the `PluginBase` class
    setInstance(this);
  }

  /**
   * Appends an element as a child to the given `slot`.
   * 
   * @param {iElementInfo} config Configuration about the element
   */
  appendElement(config: iElementInfo): void {
    const { element, slot: slotName, name: pluginName } = config;
    // Create a container element (so that we can attach a shadow root to it)
    const containerElement = document.createElement('span');
    // Append the child element to the container element
    containerElement
      .attachShadow({
        mode: 'open'
      })
      .appendChild(element as Node);
    containerElement.className = `plugin-${pluginName.toLowerCase()}`;
    // Append the container element as a child of the proper slot
    this.slots[slotName].appendChild(containerElement);
  }

  /**
   * The reference to the complete `Editor` element in the `document`.
   */
  get ref() {
    return this.reference;
  }

  /**
   * Inserts the given text/media (or anything that can be rendered on a
   * webpage) at a given position in the editor.
   * 
   * @param {iEditorCaretPosition} caretPos The coordinates of the position to 
   * insert at.
   * 
   * @deprecated This method should be implemented by the plugin that's
   * handling the actual interaction with the text that the user is entering.
   */
  insert(caretPos: iEditorCaretPosition) {
    console.log(caretPos);
  }

  componentDidRender() {}

  componentDidLoad() {
    // Set the slots
    this.slots = {
      editor: this.reference.querySelector('slot[name=editor]'),
      footer: this.reference.querySelector('slot[name=footer]'),
      ribbon: this.reference.querySelector('slot[name=ribbon]')
    };
    // Initialize the `PluginManager`
    const pluginManager = new PluginManager(this.plugins);
    // Initialize all the plugins
    pluginManager.init();
  }

  render() {
    return (
      <Host>
        <div is="text-editor" ref={(ref: HTMLElement) => this.reference = ref}>
          <slot name="ribbon">
            { /* The ribbon: The tools/action buttons shall reside here */ }
          </slot>
          <slot name="editor">
            { /* The editor: The main editor should reside here */ }
          </slot>
          <slot name="footer">
            { /* The footer: Any info/previews or anything along those lines 
            should be rendered here. */ }
          </slot>
        </div>
      </Host>
    );
  }

}
