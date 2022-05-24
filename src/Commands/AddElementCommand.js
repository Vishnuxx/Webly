import { Command } from "./Command";

export class AddElementCommand extends Command {
  constructor(editor, dropzone, index) {
    super();
    this.editor = editor;
    this.dropzone = dropzone;
    this.index = index;
    this.data = {}
    this.element = null;
  }

  execute() {
    
    const obj = this.editor
      .getActivePlugin()
      .createWidget(this.editor.getCurrentData());
    this.element = obj.elem;
    this.data = obj.data;
    //add every data to main data
    Object.keys(this.data).map((key) => {
      this.editor.addWidgetData(key , this.data[key]);
    });

    
      if (this.index !== undefined) {
        this.dropzone.insertBefore(
          this.element,
          this.dropzone.children[this.index]
        );
       } else {
         this.dropzone.appendChild(this.element);
       }
   
  }

  undo() {
    
    this.element.remove();
    //remove every data from main data
    Object.keys(this.data).map((key) => {
      console.log("deleting: " + this.editor.getWidgetDataOf(key));
      this.editor.removeWidgetData(key);
    });
  }

  redo() {
    //add every data to main data
    Object.keys(this.data).map((key) => {
      this.editor.addWidgetData(key ,  this.data[key]);
    });
    this.dropzone.insertBefore(
      this.element,
      this.dropzone.children[this.index]
    );
  }
}
