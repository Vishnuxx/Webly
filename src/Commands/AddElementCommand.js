import { Command } from "./Command";

class AddElementCommand extends Command {
    constructor(editor , dropzone , index , isNewElement ) {
        super();
        this.editor = editor;
        this.dropzone = dropzone
        this.index = index
        this.isNewElement = isNewElement
    }

    execute() {
        const obj = this.editor.getActivePlugin().createWidget(this.editor.currentData);
        this.element = obj.element
        this.data = obj.data;

        //add every data to main data
        Object.keys(this.data).map(key => {
            this.editor.widgetData[key] = this.data[key];
        })

        if(this.isNewElement === true) {
            if(this.index !== undefined) {
                this.dropzone.insertBefore(
                  this.element,
                  this.dropzone.children[this.index]
                );
            }
        }
    }

    undo() {
      this.element.remove();
      //remove every data from main data
      Object.keys(this.data).map((key) => {
        delete this.editor.widgetData[key];
      });
    }

    redo() {
      //add every data to main data
      Object.keys(this.data).map((key) => {
        this.editor.widgetData[key] = this.data[key];
      });
      this.dropzone.insertBefore(
        this.element,
        this.dropzone.children[this.index]
      );
    }
}