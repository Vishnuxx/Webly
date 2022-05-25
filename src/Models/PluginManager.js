export default class PluginManager {
  constructor(editor) {
    this.editor = editor;
    this.editorPlugins = {};
    this.parserPlugins = {};
  }

  //    Editor plugins
  registerEditorPlugin({ id, name, ref }) {
    if (this.editorPlugins.hasOwnProperty(id))
      throw "This plugin is already installed";
    const plugin = {
      name: name,
      ref: ref,
    };
    this.editorPlugins[id] = plugin;
  }

  unregisterEditorPlugin(uid) {
    delete this.editorPlugins[uid];
  }

  activateEditorPlugin(uid) {
    this.editor.setEditorPlugin(this.editorPlugins[uid].ref);
    
  }

  //   Parser plugins

  registerParserPlugin({ id, name, ref }) {
    if (this.parserPlugins.hasOwnProperty(id))
      throw "This parser plugin is already installed";
    const parser = {
      name: name,
      ref: ref,
    };
    this.parserPlugins[id] = parser;
  }

  unregisterParserPlugin(uid) {
    delete this.parserPlugins[uid];
  }

  activateParserPlugin(uid) {
    this.editor.setParserPlugin(this.parserPlugins[uid].ref);
   
  }
}
