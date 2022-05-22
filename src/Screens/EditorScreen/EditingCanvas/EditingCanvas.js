import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { canvas, editor } from "../../../Models/Models";
import { dragShadowPositionState } from "../../../State/EditorState";
import style from "./editingcanvas.module.css";

export function EditingCanvas(props) {
  const canvasRef = useRef();

  useEffect(() => {
    canvas.setCanvasView(canvasRef.current);
  });

  const updateDragShadowPosition = useSetRecoilState(dragShadowPositionState);
  useEffect(() => {
    // var canvas = editor.canvas.getCanvasView();
    var previousWidget;
    canvas.initDragControls(
      //PointerDown
      function (e) {
        if (canvas.isPointerInsideCanvas(e.pageX, e.pageY)) {
          const elem = document.elementFromPoint(e.pageX, e.pageY);

          if (elem.classList.contains(style.highlightWidget) !== true) {
            elem.classList.add(style.highlightWidget);
          }
          //detect the variable change
          if (elem !== previousWidget) {
            console.log("changed");
            if (previousWidget !== undefined)
              previousWidget.classList.remove(style.highlightWidget);
            previousWidget = elem;
          }
        }
      },

      //Pointer Move
      function (e) {},
      //DragStart
      function (e) {
        updateDragShadowPosition({ x: e.pageX, y: e.pageY, isVisible: true });
      },

      //DragMove
      function (e) {
        updateDragShadowPosition({ x: e.pageX, y: e.pageY, isVisible: true });
      },

      //Drag Enter
      function (e) {},

      //Drag Over
      function (e) {
        //get the target drop widget inside the canvas
        const droparea = document.elementFromPoint(e.pageX, e.pageY);
        if(droparea.canAcceptChild(editor.currentData.tag))
        if (droparea.classList.contains(style.highlightWidget) !== true) {
          droparea.classList.add(style.highlightWidget);
        }
        //detect the variable change
        if (droparea !== previousWidget) {
          console.log("changed");
          if (previousWidget !== undefined)
            previousWidget.classList.remove(style.highlightWidget);
          previousWidget = droparea;
        }
      },

      //Drag Exit
      function (e) {},

      //Drop
      function (e) {},

      //Drag End
      function (e) {
        updateDragShadowPosition({ x: 0, y: 0, isVisible: false });
      }
    );
    // editor.renderEelements(canvas);
  });

  return (
    <section className={style.editingcanvas}>
      <div ref={canvasRef} className={style.canvas}></div>
    </section>
  );
}
