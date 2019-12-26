import { sum } from './pluginB.worker';
import { PluginBase } from '../lib/plugins';

export class PluginB extends PluginBase {
  constructor() {
    super({
      name: 'PluginB',
      type: 'ribbon'
    });
  }

  async onInit() {
    const _sum = await sum(10, 11) + '';
    const button = document.createElement('button');
    button.textContent = 'PluginB';
    button.addEventListener('click', () => {
      alert(_sum)
    });
    this.editor.appendElement({
      element: button,
      name: this.config.name,
      slot: 'ribbon'
    });
    const button1 = document.createElement('button');
    button1.textContent = 'Reload page';
    button1.addEventListener('click', () => {
      window.location.reload();
    });
    this.editor.appendElement({
      element: button1,
      name: this.config.name,
      slot: 'ribbon'
    });
    this.enableStyling();
    /* this.style.background = '#212121';
    this.style.padding = '5px';
    this.style.color = '#fff'; */
  }
}