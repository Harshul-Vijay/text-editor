import { Component, h } from '@stencil/core';
import { EditorPlugin } from '../../global/plugins/editor';
/* import { TestPlugin } from '../editor/PLUGIN'; */
/* import { PluginA } from '../../global/plugins/pluginA';
import { PluginB } from '../../global/plugins/pluginB';
import { HybridPlugin } from '../../global/plugins/hybridPlugin'; */

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true
})
export class AppHome {

  render() {
    return (
      <div>
        <text-editor plugins={[
          /* {
            plugin: PluginA,
            config: {}
          },
          {
            plugin: PluginB,
          },
          {
            plugin: HybridPlugin,
          } */
          {
            plugin: EditorPlugin,
            config: {
              direction: 'ltr',
              theme: 'dark',
              height: '20em',
              width: '100vw',
              lineHeight: '1em'
            }
          }
        ]}></text-editor>
      </div>
    );
    {/* <div class='app-home'>
      <text-editor editor={
        {
          plugins: [
            new TestPlugin,
          ]
        }
      }></text-editor>
    </div> */}
  }
}
