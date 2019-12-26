import { PluginBase } from "../lib/plugins";

class HybridPluginRibbon extends PluginBase {
  constructor() {
    super({
      name: 'hybridPlugin',
      type: 'ribbon'
    });
  }

  get element() {
    const element = document.createElement('button');
    element.textContent = `Run`;
    element.onclick = () => {
      window.dispatchEvent(new Event('run'));
    };
    return element as HTMLElement;
  }

  get name() {
    return this.config.name;
  }
}

export class HybridPlugin extends PluginBase {
  constructor() {
    super({
      name: 'hybridPlugin',
      type: 'hybrid'
    });
  }

  onInit() {
    const ribbon = new HybridPluginRibbon();
    this.editor.appendElement({
      element: ribbon.element,
      name: ribbon.name,
      slot: 'ribbon'
    });
    const editor = document.createElement('div');
    editor.textContent = `Output will be shown here`;
    let number = 1;
    window.addEventListener('run', () => {
      editor.innerText += `\nRun #${number**2}`;
      number += 1;
    });
    this.editor.appendElement({
      element: editor,
      name: this.config.name,
      slot: 'editor'
    });
  }
}
