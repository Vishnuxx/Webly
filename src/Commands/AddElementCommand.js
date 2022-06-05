import { Command } from "./Command";

export class AddElementCommand extends Command {
  constructor(editor , dataOperator, dropzone, index) {
    super();
    this.editor = editor;
    this.dataOperator = dataOperator;
    this.dropzone = dropzone;
    this.index = index;
    this.data = {};
    this.widgetUID = null;
    this.element = null;
  }

  _executeElement() {

  }

  _undoElement() {

  }

  _redoElement() {

  }

  _executeData() {

  }

  _undoData() {

  }

  _redoData() {

  }

  execute() {

    this._executeElement()
    //create new widget
    const widgetObj = this.editor
      .getActiveEditorPlugin()
      .createWidget(this.editor.getCurrentData());

    this.element = widgetObj.elem;
    this.data = widgetObj.data;
    this.widgetUID = widgetObj.uid;

    //add every data to main data
    Object.keys(this.data).map((key) => {
      this.editor.addWidgetData(key, this.data[key]);
    });

    // console.log(this.editor.getAllWidgetDatas());
    const dropAreaId = this.dropzone.getAttribute("dataId");
    const dropType = this.dropzone.getAttribute(this.editor.elemType());
    const dropAreaIsCanvasWidget = dropType === "canvaswidget";
    const dropAreaIsRoot = dropType === "root";

    if (this.index !== undefined) {
      //element
      this.dropzone.insertBefore(
        this.element,
        this.dropzone.children[this.index]
      );

      if (dropAreaIsCanvasWidget) {
        //data
        this.dataOperator.addChild(
          dropAreaId,
          this.widgetUID,
          this.dropzone.children[this.index]
        );
      } else if (dropAreaIsRoot) {
        this.dataOperator.addToRoot(this.widgetUID);
      }
    } else {
      //element
      this.dropzone.appendChild(this.element);

      //data
      if (dropAreaIsCanvasWidget) {
        this.dataOperator.addChild(dropAreaId, this.widgetUID);
      } else if (dropAreaIsRoot) {
        this.dataOperator.addToRoot(this.widgetUID);
      }
    }

    console.log(this.editor.getAllWidgetDatas())
  }

  undo() {
     const dropAreaId = this.dropzone.getAttribute("dataId");
     const dropType = this.dropzone.getAttribute(this.editor.elemType());
     const dropAreaIsCanvasWidget = dropType === "canvaswidget";
     const dropAreaIsRoot = dropType === "root";

    this.element.remove();

    //remove every data from main data
    Object.keys(this.data).map((key) => {
      this.editor.removeWidgetData(key);
    });

    if (dropAreaIsCanvasWidget) {

      this.dataOperator.removeChild(dropAreaId, this.widgetUID);
      
      // this.editor
      //   .getWidgetDataOf(dropAreaId)
      //   .children.filter((id) => {
      //     console.log(id, this.widgetUID);
      //     return id !== ;
      //   });

    } else if (dropAreaIsRoot) {

      this.dataOperator.removeFromRoot(this.widgetUID);

    }
     console.log(this.editor.getAllWidgetDatas());
  }

  redo() {
     const dropAreaId = this.dropzone.getAttribute("dataId");
     const dropType = this.dropzone.getAttribute(this.editor.elemType());
     const dropAreaIsCanvasWidget = dropType === "canvaswidget";
     const dropAreaIsRoot = dropType === "root";

    //add every data to main data
    Object.keys(this.data).map((key) => {
      this.editor.addWidgetData(key, this.data[key]);
    });

    if (dropAreaIsCanvasWidget) {

       this.dataOperator.addChild(
         dropAreaId,
         this.widgetUID,
         this.dropzone.children[
           this.index !== undefined
             ? this.index
             : this.dropzone.children.length - 1
         ]
       );
        
    } else if(dropAreaIsRoot) {
      this.dataOperator.addToRoot(this.widgetUID);
    }

    this.dropzone.insertBefore(
      this.element,
      this.dropzone.children[this.index]
    );
     console.log(this.editor.getAllWidgetDatas());
  }
}
