import { Command } from "./Command";

export class MoveElementCommand extends Command {
  constructor(editor, dataOperator , elem , destination, index) {
    super();
    this.dataOperator = dataOperator; //for data operations

    this.editor = editor;
    this.element = elem;
    this.elementId = this.element.getAttribute("dataId");
    

    this.index = index;

    this.newParent = destination;
    this.newParentId = this.newParent.getAttribute("dataId");
    this.newParentType = this.newParent.getAttribute(editor.elemType());

    this.oldParent = elem.parentElement;
    this.oldIndex = [...this.oldParent.children].indexOf(this.element);
    this.oldParentId = this.oldParent.getAttribute("dataId");
    this.oldParentType = this.oldParent.getAttribute(editor.elemType());
    
  }

  _moveElement() {
    this.element.remove();
    if (this.index !== undefined) {
      this.newParent.insertBefore(
        this.element,
        this.newParent.children[this.index]
      );
    } else {
      this.newParent.appendChild(this.element);
    }
    this.element.style.display = "block";
  }

  _undoElement() {
    this.element.remove();
    this.oldParent.insertBefore(
      this.element,
      this.oldParent.children[this.oldIndex]
    );
  }

  _redoElement() {
    this.element.remove();
     this.newParent.insertBefore(
       this.element,
       this.newParent.children[this.index]
     );
     this.element.style.display = "block";
  }

  _moveData() {
    // console.log([...this.oldParent.children].indexOf(this.element));
    switch (this.oldParentType) {
      case "canvaswidget":

        if (this.newParentType === "canvaswidget") {
          this.dataOperator.moveChild(
            this.elementId,
            this.oldParentId,
            this.newParentId,
            this.index
          );
          return;
        } 

        if (this.newParentType === "root") {
          this.dataOperator.moveChildToRoot(this.elementId, this.oldParentId, this.index);
          return;
        }
        break;

      case "root":

        if (this.newParentType === "canvaswidget") {
          this.dataOperator.moveChildFromRoot(
            this.elementId,
            this.newParentId,
            this.index
          );
          return;
        } 
        if (this.newParentType === "root") {
          this.dataOperator.moveFromRootToRoot(this.elementId, this.index);
          return;
        }
        break;

      default:
        break;
    }
  }

  _undoData() {
    switch(this.newParentType) {
        case "canvaswidget":
             if (this.oldParentType === "canvaswidget") {
               this.dataOperator.moveChild(
                 this.elementId,
                 this.newParentId,
                 this.oldParentId,
                 this.oldIndex
               );
             } else if (this.oldParentType === "root") {
               this.dataOperator.moveChildToRoot(
                 this.elementId,
                 this.newParentId,
                 this.oldIndex
               );
             }
            break;

        case "root":
            if (this.oldParentType === "canvaswidget") {
              this.dataOperator.moveChildFromRoot(
                this.elementId,
                this.oldParentId,
                this.oldIndex
              );
            } else if (this.newParentType === "root") {
              this.dataOperator.moveFromRootToRoot(
                this.elementId,
                this.oldIndex
              );
            }
            break;
        
        default:
            break;
    }
  }

  _redoData() {
      switch (this.oldParentType) {
        case "canvaswidget":
          if (this.newParentType === "canvaswidget") {
            this.dataOperator.moveChild(
              this.elementId,
              this.oldParentId,
              this.newParentId,
              this.index
            );
          } else if (this.newParentType === "root") {
            this.dataOperator.moveChildToRoot(
              this.elementId,
              this.oldParentId,
              this.index
            );
          }
          break;

        case "root":
          if (this.newParentType === "canvaswidget") {
            this.dataOperator.moveChildFromRoot(
              this.elementId,
              this.newParentId,
              this.index
            );
          } else if (this.newParentType === "root") {
             this.dataOperator.moveFromRootToRoot(this.elementId, this.index);
             console.log("kds")
          }
          break;

        default:
          break;
      }
  }

  execute() {
    this._moveData();
    this._moveElement();
  }

  undo() {
      this._undoData();
      this._undoElement()
      
  }

  redo() {
      this._redoData();
      this._redoElement()
      
  }
}