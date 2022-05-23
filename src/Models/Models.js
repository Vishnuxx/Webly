import PluginManager from "./PluginManager";
import VanillaPlugin from "../EditorPlugins/VanillaEditor";
import { CanvasModel } from "./CanvasModel";
import { Editor } from "./Editor";
import { Pallette } from "./Pallette";

export const editor = new Editor();
export const canvas = new CanvasModel(editor);

//plugins
const pluginmanager = new PluginManager(editor);

pluginmanager.registerPlugin({
    id:"plugin1",
    name:"VanillaEditorPlugin",
    ref: new VanillaPlugin()
})

pluginmanager.activateEditorPlugin("plugin1");