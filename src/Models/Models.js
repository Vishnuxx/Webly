import PluginManager from "./PluginManager";
import VanillaPlugin from "../Plugins/EditorPlugins/VanillaEditor";

import { Editor } from "./Editor";
import { Pallette } from "./Pallette";
import Commands from "./Commands";
import { DragProcessor } from "./DragProcessor";
import { VanillaParser } from "../Plugins/ParserPlugins/VanillaParser";

export const editor = new Editor();
export const canvas = new DragProcessor(editor);
export const COMMANDS = new Commands(editor);

//plugins
const pluginmanager = new PluginManager(editor, canvas);

const vanillaPlugin = pluginmanager.registerEditorPlugin({
  id: "plugin1",
  name: "VanillaEditorPlugin",
  ref: new VanillaPlugin(),
});
pluginmanager.activateEditorPlugin("plugin1");

//parser
const vanillaparser = new VanillaParser(editor);
pluginmanager.registerParserPlugin({
  id: "parser1",
  name: "VanillaParserPlugin",
  ref: new VanillaParser(editor),
});

pluginmanager.activateParserPlugin("parser1");

//pallette
export const pallette = new Pallette(editor);
pallette.setPalletteData({
  div: {
    tag: "div",
    attrs: {},
    debugAttrs: {},
    styles: {
      padding: "10px",
      "min-height": "30px",
      height: "fit-content",
      "background-color": "#08c893",
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
      placeholder: "Type here..",
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

  h1: {
    tag: "h1",
    attrs: {
      contenteditable: "true",
    },
    debugAttrs: {
      //   disabled: "true",
    },
    styles: {},
    content: "This is H1 Text",
    isViewGroup: false,
    isMultiChilded: false,
    acceptableTypes: [],
    children: [],
  },

  h2: {
    tag: "h2",
    attrs: {
      contenteditable: "true",
    },
    debugAttrs: {
      //   disabled: "true",
    },
    styles: {},
    content: "This is H2 Text",
    isViewGroup: false,
    isMultiChilded: false,
    acceptableTypes: [],
    children: [],
  },

  h3: {
    tag: "h3",
    attrs: {
      contenteditable: "true",
    },
    debugAttrs: {
      //   disabled: "true",
    },
    styles: {},
    content: "This is H3 Text",
    isViewGroup: false,
    isMultiChilded: false,
    acceptableTypes: [],
    children: [],
  },

  h4: {
    tag: "h4",
    attrs: {
      contenteditable: "true",
    },
    debugAttrs: {
      //   disabled: "true",
    },
    styles: {},
    content: "This is H4 Text",
    isViewGroup: false,
    isMultiChilded: false,
    acceptableTypes: [],
    children: [],
  },

  h5: {
    tag: "h5",
    attrs: {
      contenteditable: "true",
    },
    debugAttrs: {
      //   disabled: "true",
    },
    styles: {},
    content: "This is H5 Text",
    isViewGroup: false,
    isMultiChilded: false,
    acceptableTypes: [],
    children: [],
  },

  h6: {
    tag: "h6",
    attrs: {
      contenteditable: "true",
    },
    debugAttrs: {
      //   disabled: "true",
    },
    styles: {},
    content: "This is H6 Text",
    isViewGroup: false,
    isMultiChilded: false,
    acceptableTypes: [],
    children: [],
  },
});
