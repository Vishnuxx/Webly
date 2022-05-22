import { Pallette } from "./Pallette";
import { Utils } from "./Utils";
import { Widget } from "./Widget";

//>> Editing canvas
export function CanvasModel(editor) {
  const palletteData = new Pallette(editor);

  var isHolding = false;
  var timer;
  var entered = false;
  var canvasDom = null;
  var canvasDimensions;
  var currentDraggingElement;

  this.isPointerInsideCanvas = (x, y) => Utils.hitTest(canvasDimensions, x, y);

  this.setCanvasView = (canv) => (canvasDom = canv);
  this.getCanvasView = () => canvasDom;

  this.getCurrentDraggingElement = () => currentDraggingElement;

  this.isHolding = () => isHolding;

  //checks if the element is pallette item
  this.isPalletteItem = (elem) => {
    return elem.getAttribute("datatype") === "pallette";
  };

  //checks if the element is canvas item
  this.isEditingWidget = (elem) => {
    return elem.getAttribute("datatype") === "editingbox";
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
    canvasDimensions = canvasDom.getBoundingClientRect();
    //timer
    timer = document.onpointerdown = (e) => {
      pointerDown(e);
      const elem = document.elementFromPoint(e.pageX, e.pageY);
      //isPalletteItem
      if (this.isPalletteItem(elem)) {
        window.setTimeout(() => {
          isHolding = true;
          currentDraggingElement = elem;
          editor.currentData = palletteData.getDataOf(
            elem.getAttribute("datakey")
          );
          dragStart(e);
        }, editor.getLongPressDuration());
      }
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
        canvasDom.appendChild(new Widget(editor).create(editor.currentData));
      }
      isHolding = false;
      entered = false;
      canvasDom.style.outline = "none";
      dragEnd(e);
      currentDraggingElement = null;
      window.clearInterval(timer);
    };
  };
}
