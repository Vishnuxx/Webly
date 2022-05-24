export default class PluginManager {
    constructor(editor) {
        this.editor = editor
        this.plugins = {};
    }

    registerPlugin({id , name ,  ref}) {
        if (this.plugins.hasOwnProperty(id)) throw "This plugin is already installed";
        const plugin = {
            name : name ,
            ref: ref,
        };
        this.plugins[id] = plugin
    }

    unregisterPlugin(uid) {
        delete this.plugins[uid];
    }

    activateEditorPlugin(uid) {
        this.editor.setEditorPlugin(this.plugins[uid].ref);
        console.log(this.plugins[uid].ref);
    }

}