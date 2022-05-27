import { Command } from "./Command";

export class MoveElementCommand extends Command {
  constructor(editor, elem, destination, index) {
    super();
    this.editor = editor;
    this.element = elem;

    this.oldParent = elem.parentElement;
    this.newParent = destination;

    this.oldIndex = [...this.oldParent.children].indexOf(this.element);
    this.index = index;
    
    this.elementId = this.element.getAttribute("dataId");
    this.oldParentId = this.oldParent.getAttribute("dataId");
    this.newParentId = this.newParent.getAttribute("dataId");

    this.oldParentType = this.oldParent.getAttribute("dataType");
    this.newParentType = this.newParent.getAttribute("dataType");
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
       this.newParent.children[this.oldIndex]
     );
  }

  _moveData() {
    // console.log([...this.oldParent.children].indexOf(this.element));
    switch (this.oldParentType) {
      case "canvaswidget":

        if (this.newParentType === "canvaswidget") {
          this.editor.moveChild(
            this.elementId,
            this.oldParentId,
            this.newParentId,
            this.index
          );
          return;
        } 

        if (this.newParentType === "root") {
          this.editor.moveChildToRoot(this.elementId, this.oldParentId, this.index);
          return;
        }
        break;

      case "root":

        if (this.newParentType === "canvaswidget") {
          this.editor.moveChildFromRoot(
            this.elementId,
            this.newParentId,
            this.index
          );
          return;
        } 
        if (this.newParentType === "root") {
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
               this.editor.moveChild(this.elementId , this.newParentId , this.oldParentId , this.oldIndex)
             } else if (this.oldParentType === "root") {
               this.editor.moveChildToRoot(this.elementId , this.newParentId , this.oldIndex)
             }
            break;

        case "root":
            if (this.oldParentType === "canvaswidget") {
              this.editor.moveChildFromRoot(this.elementId , this.oldParentId , this.oldIndex)
            } else if (this.newParentType === "root") {
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
            this.editor.moveChild(
              this.elementId,
              this.oldParentId,
              this.newParentId,
              this.index
            );
          } else if (this.newParentType === "root") {
            this.editor.moveChildToRoot(
              this.elementId,
              this.oldParentId,
              this.index
            );
          }
          break;

        case "root":
          if (this.newParentType === "canvaswidget") {
            this.editor.moveChildFromRoot(
              this.elementId,
              this.newParentId,
              this.index
            );
          } else if (this.newParentType === "root") {
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