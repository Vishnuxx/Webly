import { COMMANDS, pallette } from "./Models";
import { Pallette } from "./Pallette";
import { Utils } from "./Utils";
import { Widget } from "./Widget";

//>> Editing canvas
export function CanvasModel(editor) {

  this.editor = editor;

  var isHolding = false;
  var timer;
  var entered = false;

  var canvasDom = null;
  // var canvasDimensions;
  var currentDraggingElement;
  var currentDraggingType = "";

  


  this.isPointerInsideCanvas = (x, y) =>
  Utils.hitTest(canvasDom.getBoundingClientRect(), x, y);

  this.setCanvasView = (canv) => (canvasDom = canv);
  this.getCanvasView = () => canvasDom;

  this.getCurrentDraggingElement = () => currentDraggingElement;


  this.isHolding = () => isHolding;

  
  //checks if the element is canvas item
  this.isEditingWidget = (elem) => {
    return elem.getAttribute("datatype") === "editingbox";
  };

  this.canAcceptChild = (dropareaElement) => {
   
     const data =
       this.editor.widgetData[dropareaElement.getAttribute("dataId")];
     
     return (
       data.isViewGroup &&
       (data.isMultiChilded || data.children.length === 0) && (data.acceptableTypes.includes(editor.currentData.tag) || data.acceptableTypes.length === 0)
     );
   };

  //>>EditingCanvas
  //should be called only once after canvas is rendered
  this.initDragControls = (
    pointerDown,
    pointerMove,
    dragStart,
    dragMove,
    dragEntered,
    dragOver,
    dragExit,
    drop,
    dragEnd
  ) => {
    
    //timer
    timer = document.onpointerdown = (e) => {
      pointerDown(e);
      // canvasDimensions = canvasDom.getBoundingClientRect();
      const elem = document.elementFromPoint(e.pageX, e.pageY);
      //isPalletteItem
      window.setTimeout(() => {
        currentDraggingType = elem.getAttribute("dataType")
        switch (currentDraggingType) {
          case "pallette":
            isHolding = true;
            currentDraggingElement = elem;
            editor.setCurrentData(
              pallette.getDataOf(elem.getAttribute("dataKey"))
            );
            dragStart(e);
            break;

          case "widget":
            //isWidget
            isHolding = true;
            currentDraggingElement = elem;
            dragStart(e);
            break;

          default:
            currentDraggingElement = null;
            break;
        }
      }, editor.getLongPressDuration());
      
    };

    document.onpointermove = (e) => {
      pointerMove(e);
      if (isHolding) {
        if (this.isPointerInsideCanvas(e.pageX, e.pageY)) {
          dragOver(e);
          if (entered === false) {
            canvasDom.style.outline = "2px solid black";
            dragEntered(e);
            entered = true;
          }
        } else {
          if (entered === true) {
            canvasDom.style.outline = "none";
            dragExit(e);
            entered = false;
          }
        }
        dragMove(e);
      }
    };

    document.onpointerup = (e) => {
      if (isHolding === true && entered === true) {
        canvasDom.style.outline = "none";
        drop(e);
      }
      isHolding = false;
      entered = false;
      canvasDom.style.outline = "none";
      const droppable = document.elementFromPoint(e.pageX , e.pageY)
      switch(currentDraggingType){
        case "pallette":
          COMMANDS.executeCommand("addElement" , {target: droppable , index: undefined})
          break;
        case "widget":
          break;
        default:
          break;
      }
      dragEnd(e);
      currentDraggingElement = null;
      window.clearInterval(timer);
    };
  };
}
