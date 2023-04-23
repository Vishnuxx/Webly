//API for drag and drop operations


// Widget           dataType
// canvasWidget   = canvaswidget  : canvaswidget forms when pallette widget drops onto canvas
// palletteWidget = pallette
// rootWidget     = root : root of the view

//attributes
// dataId : id of the canvaswidget
// dataKey : key type of pallette

import { COMMANDS, pallette } from "../Models/Main";
import { Utils } from "../Models/Utils";
import style from "./dragprocessor.module.css"

//>> Editing canvas
export function DragProcessor(editor) {
  this.editor = editor;

  var longPressDuration = 150;
  var timeout;
  var isHolding = false;
  var entered = false;

  var canvasDom = null;

  // var canvasDimensions;
  var currentSlectedElement;
  var currentDraggingElement;
  var dropArea;

  var canDrop = false;

  var previousWidget;

  const getLastIndexOf = (parent , element) => {
     return [...parent.children].indexOf(element)
  }



  //util methods


  //Sets the editing canvas dom element (IMPORTANT)
  this.setCanvasView = (canv) => {
    if (canvasDom !== null) {
      canvasDom.removeAttribute(editor.elemType());
      canvasDom = canv;
      canvasDom.setAttribute(editor.elemType(), "root");
    } else {
      canvasDom = canv;
      canvasDom.setAttribute(editor.elemType(), "root");
    }
  };

  //returns the type of the widget
  //pallette , canvaswidget ...
  this.getWidgetType = (elem) => {
    return elem.getAttribute(editor.elemType());
  }

  this.setLongPressDuration = (duration) => (longPressDuration = duration);
  this.getLongPressDuration = () => longPressDuration;


  this.isPointerInsideCanvas = (x, y) =>
    Utils.hitTest(canvasDom.getBoundingClientRect(), x, y);

  

  this.selectElement = (elem) => {
    if (
      currentSlectedElement !== undefined &&
      currentSlectedElement.classList.contains(style.selected) === true
    ) {
      currentSlectedElement.classList.remove(style.selected);
    }
     if (this.isCanvasWidget(elem)) {
       currentSlectedElement = elem;
       currentSlectedElement.classList.add(style.selected);
     }
  };

  this.highlightElement = (elem) => {
    if (
      dropArea !== undefined &&
      dropArea.classList.contains(style.highlight) === true
    ) {
      dropArea.classList.remove(style.highlight);
    }

    if(elem === null) return;

    if (this.isCanvasWidget(elem)) {
      dropArea = elem;
      dropArea.classList.add(style.highlight);
    }
  }

  this.getCanvasView = () => canvasDom;

  this.getCurrentDraggingElement = () => currentDraggingElement;

  this.getCurrentSelectedElement = () => currentSlectedElement;

  this.isHolding = () => isHolding;

  this.getID = (elem) => elem.getAttribute("dataId");

  //checks if the element is canvas item
  this.isCanvasWidget = (elem) => {
    return elem.getAttribute(editor.elemType()) === "canvaswidget";
  };

  this.isRootWidget = (elem) => {
    return elem.getAttribute(editor.elemType()) === "root";
  };

  this.canAcceptChild = (dropareaElement) => {
    if (this.isCanvasWidget(dropareaElement)) {
       const data = this.editor.getWidgetDataOf(
         dropareaElement.getAttribute("dataId")
       );
       return (
         data.isViewGroup &&
         (data.isMultiChilded || data.children.length === 0) &&
         (data.acceptableTypes.includes(editor.getCurrentData().tag) ||
           data.acceptableTypes.length === 0)
       );
    }
    return false;
   
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
    mouseUp
  ) => {



    //POINTER DOWN
    document.onpointerdown = (e) => {
      pointerDown(e);
      
      //get touched element
      const elem = document.elementFromPoint(e.pageX, e.pageY);
      this.selectElement(elem);

      timeout = window.setTimeout(() => {
        //check if elem is pallette , canvaswidget or other
        //if pallette : it is from pallette area
        //if canvaswidget : it is currently using widget

        switch (this.getWidgetType(elem)) {

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
            dragStart(e);
            currentDraggingElement.style.display = 'none';
            break;

          default:
            currentDraggingElement = null;
            break;
        }
      }, longPressDuration);
    };



    //POINTER MOVE
    document.onpointermove = (e) => {
   
      pointerMove(e);
     
      if (isHolding) {
        if (this.isPointerInsideCanvas(e.pageX, e.pageY)) {
          dragOver(e);
          const droparea = document.elementFromPoint(e.pageX , e.pageY);
          if(droparea === this.getCanvasView()) {
            canDrop = true;
          } else {
            canDrop = this.canAcceptChild(droparea);
          }
          
          if (canDrop) {
             this.highlightElement(droparea);
          } else {
             this.highlightElement(null);
          }
          
          if (entered === false) {
           
            dragEntered(e); 
             entered = true;
          }
        } else {
          if (entered === true) {
            dragExit(e);
            entered = false;
          }
        }
        dragMove(e);
      }
    };


    //POINTET UP
    document.onpointerup = (e) => {
     
      if (isHolding === true && entered === true && canDrop) {
        
        //____DROP_____
        const droppable = document.elementFromPoint(e.pageX, e.pageY);
           const dropIndex= getLastIndexOf(droppable , currentDraggingElement)
           switch (this.getWidgetType(currentDraggingElement)) {
             case "pallette":
               COMMANDS.executeCommand("addElement", {
                 element: droppable,
                 index: dropIndex,
               });
               
               // console.log("drop");
               break;
             case "canvaswidget":
               COMMANDS.executeCommand("moveElement", {
                 element: currentDraggingElement,
                 destination: droppable,
                 index: dropIndex,
               });
               
               break;
             default:
               break;
           }
           drop(e);
        
      }
      isHolding = false;
      entered = false;
      canDrop = false;
      this.highlightElement(null);
      
      mouseUp(e);
      window.clearTimeout(timeout);
    };
  };
}
