import { PluginBase } from '../lib/plugins';

export class PluginA extends PluginBase {
  constructor() {
    super({
      name: 'PluginA',
      type: 'editor'
    });
    this.register(this.x);
  }

  x() {
    console.log(`I'm defined in the global scope of the plugin!!`);
  }

  onInit() {
    const editor = document.createElement('div');
    editor.contentEditable = 'true';
    editor.autocapitalize = 'true';
    this.editor.appendElement({
      element: editor as HTMLElement,
      slot: 'editor',
      name: this.config.name
    });
    this.enableStyling();
    const style = this.stylables['div'].style;
    style.background = '#212121';
    style.color = '#fff';
    style.height = '30vh';
    style.width = '98vw';
    style.lineHeight = '1em';
    style.border = '1px solid grey';
    style.overflowX = 'none';
    style.overflowY = 'auto';
    style.fontSize = '2em';
    /* const keywords = [
      {
        word: 'const',
        regex: new RegExp('const', 'gimu')
      },
      {
        word: 'var',
        regex: new RegExp('var', 'gimu')
      },
      {
        word: 'let',
        regex: new RegExp('let', 'gimu')
      }
    ]; */
    editor.onkeyup = () => {
      /* const content = editor.textContent;
      /* const tokens = content.split(/[ .]/); */
      /* tokens.map((token) => {
        if (keywords.find((keyword) => keyword === token ? true : false)) {
          /* console.log(editor.textContent.split(/[ .]/).pop());
          /* const remaining = editor.textContent; *
          editor.innerHTML += `<div style="color: blue">${token}</div>`; *
          console.log(content.replace(/${token}/gi, `<div style='color: blue'>${token}</div>`))
        }
      }); */
      /* keywords.map((keyword) => {
        /* console.log(new RegExp(keyword, 'gimu').exec(content)) *
      }); */
      /* editor.innerHTML = content
        .replace(new RegExp([], 'gimu'), `<div style='color: blue'>${1}</div>`); *
      keywords.map(keyword => {
        if (!!content.includes(keyword.word)) {
          const newContent = content.replace(keyword.regex,
            `<span style="color: yellow;">${keyword.word}</span>`);
          editor.innerHTML = newContent;
        }
      }); */
    }
  }
}