export default class PluginManager {
    constructor(editor) {
        this.editor = editor
        this.plugins = {};
    }

    registerPlugin({id , name ,  reference}) {
        if (this.plugins.hasOwnProperty(id)) return;
        const plugin = {
            name : name ,
          ref: reference,
        };
        this.plugins[id] = plugin
    }

    unregisterPlugin(uid) {
        delete this.plugins[uid];
    }

    activateEditorPlugin(uid) {
        this.setEditorPlugin(this.plugins[uid].ref);
    }

}