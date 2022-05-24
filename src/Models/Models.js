import PluginManager from "./PluginManager";
import VanillaPlugin from "../EditorPlugins/VanillaEditor";
import { CanvasModel } from "./CanvasModel";
import { Editor } from "./Editor";
import { Pallette } from "./Pallette";
import Commands from "./Commands";

export const editor = new Editor();
export const canvas = new CanvasModel(editor);
export const COMMANDS = new Commands(editor)

//plugins
const pluginmanager = new PluginManager(editor);

const vanillaPlugin = pluginmanager.registerPlugin({
  id: "plugin1",
  name: "VanillaEditorPlugin",
  ref: new VanillaPlugin(),
})
pluginmanager.activateEditorPlugin("plugin1");

//pallette
export const pallette = new Pallette(editor);
pallette.setPalletteData({
    div: {
      tag: "div",
      attrs: {},
      debugAttrs: {},
      styles: {
        padding: "10px",
        minHeight: "30px",
        height: "fit-content",
        backgroundColor: "#e0e0e0",
        color: "white",
      },
      content: "",
      isViewGroup: true,
      isMultiChilded: true,
      acceptableTypes: [],
      children: [],
    },

    button: {
      tag: "button",
      attrs: {},
      debugAttrs: {
        // disabled: "true",
      },
      styles: {
        color: "green",
        padding: "10px",
      },
      content: "button",
      isViewGroup: false,
      isMultiChilded: true,
      acceptableTypes: [],
      children: [],
    },

    input: {
      tag: "input",
      attrs: {
        type: "password",
        active: false,
        placeholder: "Type here...",
      },
      debugAttrs: {
        disabled: "true",
      },
      styles: {
        padding: "10px",
      },
      content: "Hello",
      isViewGroup: false,
      isMultiChilded: false,
      acceptableTypes: [],
      children: [],
    },

    image: {
      tag: "img",
      attrs: {
        src: "https://img.icons8.com/color-glass/48/000000/image.png",
        alt: "",
      },
      debugAttrs: {
        disabled: "true",
      },
      styles: {
        padding: "10px",
      },
      content: "Hello",
      isViewGroup: false,
      isMultiChilded: false,
      acceptableTypes: [],
      children: [],
    },
  })

