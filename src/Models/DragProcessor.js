import { Dummy } from "./Dummy";
import { COMMANDS, pallette } from "./Models";
import { Utils } from "./Utils";

// Widget           dataType
// canvasWidget   = canvaswidget
// palletteWidget = pallette
// rootWidget     = root

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
  var currentDraggingType = "";

  var previousWidget;

  //util methods
  this.setLongPressDuration = (duration) => (longPressDuration = duration);

  this.getLongPressDuration = () => longPressDuration;

  this.isPointerInsideCanvas = (x, y) =>
    Utils.hitTest(canvasDom.getBoundingClientRect(), x, y);

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

  this.selectElement = (elem) => {
    // currentSlectedElement.style.outline = "none";
    if (this.isCanvasWidget(elem)) {
      currentSlectedElement = elem;
      // currentSlectedElement.style.outline = "1px solid red";
    }
  };

  this.getCanvasView = () => canvasDom;

  this.getCurrentDraggingElement = () => currentDraggingElement;

  this.getCurrentSelectedElement = () => currentSlectedElement;

  this.isHolding = () => isHolding;

  this.getID = (elem) => elem.getAttribute("dataId");

  this.getType = (elem) => elem.getAttribute(editor.elemType());

  //checks if the element is canvas item
  this.isCanvasWidget = (elem) => {
    return elem.getAttribute(editor.elemType()) === "canvaswidget";
  };

  this.isRootWidget = (elem) => {
    return elem.getAttribute(editor.elemType()) === "root";
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

  this.highlightElement = (elem, classname) => {
    if (elem.classList.contains(classname) !== true) {
      elem.classList.add(classname);
    }
    //detect the variable change
    if (elem !== previousWidget) {
      if (previousWidget !== undefined)
        previousWidget.classList.remove(classname);
      previousWidget = elem;
    }
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
    //timer
    document.onpointerdown = (e) => {
      pointerDown(e);
      // canvasDimensions = canvasDom.getBoundingClientRect();
      const elem = document.elementFromPoint(e.pageX, e.pageY);

      timeout = window.setTimeout(() => {
        console.log("started");
        currentDraggingType = elem.getAttribute(editor.elemType());
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
      }, longPressDuration);
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
              destination: droppable,
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
      this.selectElement(e.target);
      mouseUp(e);
      window.clearTimeout(timeout);
    };
  };
}
