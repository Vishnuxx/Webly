import { COMMANDS, pallette } from "./Models";
import { Utils } from "./Utils";


// Widget           dataType
// canvasWidget   = canvaswidget
// palletteWidget = pallette
// rootWidget     = root


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

  var previousWidget;

  this.isPointerInsideCanvas = (x, y) =>
    Utils.hitTest(canvasDom.getBoundingClientRect(), x, y);

  this.setCanvasView = (canv) => {
    if(canvasDom !== null) {
      canvasDom.removeAttribute("dataType")
      canvasDom = canv;
      canvasDom.setAttribute("dataType" , "root");
    } else {
       canvasDom = canv;
       canvasDom.setAttribute("dataType", "root");
    }
    
  };
  this.getCanvasView = () => canvasDom;

  this.getCurrentDraggingElement = () => currentDraggingElement;

  this.isHolding = () => isHolding;

  this.getID = (elem) => elem.getAttribute("dataId");

  this.getType = (elem) => elem.getAttribute("dataType");

  //checks if the element is canvas item
  this.isEditingWidget = (elem) => {
    return elem.getAttribute("datatype") === "canvaswidget";
  };

  this.canAcceptChild = (dropareaElement) => {
    
    const data = this.editor.getWidgetDataOf(
      dropareaElement.getAttribute("dataId")
    );
    return (
      data.isViewGroup &&
      (data.isMultiChilded || data.children.length === 0) &&
      (data.acceptableTypes.includes(editor.getCurrentData().tag) ||
        data.acceptableTypes.length === 0)
    );
  };

  this.highlightElement = (elem , classname) => {
     if (elem.classList.contains(classname) !== true) {
       elem.classList.add(classname);
     }
     //detect the variable change
     if (elem !== previousWidget) {
       
       if (previousWidget !== undefined)
         previousWidget.classList.remove(classname);
       previousWidget = elem;
     }
  } 

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
        currentDraggingType = elem.getAttribute("dataType");
        switch (currentDraggingType) {
          case "pallette":
            isHolding = true;
            currentDraggingElement = elem;

            editor.setCurrentData(
              pallette.getDataOf(elem.getAttribute("dataKey"))
            );
            dragStart(e);
            break;

          case "canvaswidget":
            //isWidget
            isHolding = true;
            currentDraggingElement = elem;
            editor.setCurrentData(
              editor.getWidgetDataOf(elem.getAttribute("dataId"))
            );
            console.log(currentDraggingElement);
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

        //____DROP_____
        const droppable = document.elementFromPoint(e.pageX, e.pageY);
        switch (currentDraggingType) {
          case "pallette":
            COMMANDS.executeCommand("addElement", {
              element: droppable,
              index: undefined,
            });
            // console.log("drop");
            break;
          case "canvaswidget":
             COMMANDS.executeCommand("moveElement", {
               element: currentDraggingElement,
               destination: droppable ,
               index: undefined,
             });
            break;
          default:
            break;
        }
        drop(e);

      }
      isHolding = false;
      entered = false;
      canvasDom.style.outline = "none";
      dragEnd(e);
      //currentDraggingElement = null;
      window.clearInterval(timer);
    };
  };

  
}
