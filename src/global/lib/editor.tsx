import { Editor } from "../../components/editor/editor";

/**
 * This line sets the instance of the editor to this class, which is used by 
 * the other classes.
 */
export let editorInstance: Editor = null;

/**
 * Sets the `editorInstance`.
 * 
 * @param {Editor} instance The instance of the editor.
 */
export function setInstance(instance: Editor): void {
  editorInstance = instance;
}
