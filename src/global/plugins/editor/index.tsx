import { PluginBase } from "../../lib/plugins";

interface iEditorPlugin {
  theme?: string;
  direction?: string;
  height?: string;
  width?: string;
  lineHeight?: string;
}

export class EditorPlugin extends PluginBase {
  pluginConfig: iEditorPlugin;

  constructor(config: iEditorPlugin) {
    super({
      name: 'editor',
      type: 'editor',
      version: '0.0.1',
    });
    this.pluginConfig = config || {};
  }

  onInit() {
    const editor = document.createElement('div');
    editor.className = `editor`;
    editor.contentEditable = `true`;
    this.editor.appendElement({
      element: editor,
      name: 'editor',
      slot: 'editor'
    });
    this.enableStyling();
    const style = this.stylables.div.style;
    const themeName = this.pluginConfig.theme.toLowerCase();
    let theme: number;
    if (themeName === 'dark') {
      theme = 0;
    } else if (themeName === 'light') {
      theme = 1;
    } else {
      console.warn('Warning! Theme not supported. Using dark theme.');
      theme = 0;
    }
    style.background = theme ? '#ddd' : '#212121';
    style.color = theme ? '#000' : '#fff';
    style.height = this.pluginConfig.height || '45vh';
    style.lineHeight = this.pluginConfig.lineHeight || '1em';
    style.width = this.pluginConfig.width || '100vw';
    style.direction = this.pluginConfig.direction || 'ltr';
    style.overflowX = 'none';
    style.overflowY = 'auto';
    style.border = 'none';
    style.outline = 'none';
    style.userSelect = 'text';
    /* style.userSelect = theme ? '#9e9e9e' : '#eeeeee'; */
  }

  onDestroy() {}
}

