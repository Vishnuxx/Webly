import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { canvas, COMMANDS, editor } from "../../../Models/Models";
import {
  dragShadowPositionState,
  propertyListState,
} from "../../../State/EditorState";
import style from "./editingcanvas.module.css";

import { AddElementCommand } from "../../../Models/Commands";

export function EditingCanvas(props) {
  const canvasRef = useRef();
  const updateSidebarList = useSetRecoilState(propertyListState);

  useEffect(() => {
    canvas.setCanvasView(canvasRef.current);
  });

  const updateDragShadowPosition = useSetRecoilState(dragShadowPositionState);
  useEffect(() => {
    var dropTarget;
    var previousWidget;
    var currentPointingElement; //shows highlighted on cursor in
    canvas.initDragControls(
      //PointerDown
      function (e) {
        if (canvas.isPointerInsideCanvas(e.pageX, e.pageY)) {
          const elem = document.elementFromPoint(e.pageX, e.pageY);
          //  updateSidebarList(editor.widgetData[elem.getAttribute("dataId")]["styles"])
          canvas.highlightElement(elem, style.highlightWidget);
          console.log(canvas.isPointerInsideCanvas(e.pageX, e.pageY));
          updateSidebarList(
            editor.getWidgetDataOf(
              canvas.getCurrentDraggingElement().getAttribute("dataId")
            )
          );
        } else {
          updateSidebarList(editor.getWidgetDataOf({}));
        }
      },

      //Pointer Move
      function (e) {
        if (
          canvas.isPointerInsideCanvas(e.pageX, e.pageY) &&
          canvas.isHolding() === false
        ) {
          currentPointingElement = document.elementFromPoint(e.pageX, e.pageY);
          canvas.highlightElement(currentPointingElement, style.hover);
        //   if (
        //     !currentPointingElement.classList.contains(style.hover)
        //   ) {
        //     currentPointingElement.classList.add(style.hover);
        //   }
        //   //detect the variable change
        //   if (currentPointingElement !== previousWidget) {
        //     console.log("changed");
        //     if (previousWidget !== undefined)
        //       previousWidget.classList.remove(style.hover);
        //     previousWidget = currentPointingElement;
        //   }
        }
      },
      //DragStart
      function (e) {
        // editor.setCurrentElement(document.elementFromPoint(e.pageX , e.pageY));
       
        updateDragShadowPosition({ x: e.pageX, y: e.pageY, isVisible: true });
      },

      //DragMove
      function (e) {
        dropTarget = document.elementFromPoint(e.pageX, e.pageY);
        updateDragShadowPosition({ x: e.pageX, y: e.pageY, isVisible: true });
      },

      //Drag Enter
      function (e) {},

      //Drag Over
      function (e) {
        //get the target drop widget inside the canvas
        const droparea = document.elementFromPoint(e.pageX, e.pageY);
        if (droparea === canvas.getCanvasView()) {
           canvas.highlightElement(droparea, style.highlightWidget);
          // if (droparea.classList.contains(style.highlightWidget) !== true) {
          // droparea.classList.add(style.highlightWidget);
          // }
          // //detect the variable change
          // if (droparea !== previousWidget) {
          //   console.log("changed");
          //   if (previousWidget !== undefined)
          //     previousWidget.classList.remove(style.highlightWidget);
          //   previousWidget = droparea;
          // }
        } else {
          const canaccept = canvas.canAcceptChild(droparea);
          // console.log(canaccept);
          if (canaccept) {
            // if (droparea.classList.contains(style.highlightWidget) !== true) {
            // droparea.classList.add(style.highlightWidget);
            // }
            // // //detect the variable change
            // if (droparea !== previousWidget) {
            //   console.log("changed");
            //   if (previousWidget !== undefined)
            //     previousWidget.classList.toggle(style.highlightWidget);
            //   previousWidget = droparea;
            // }
            canvas.highlightElement(droparea, style.highlightWidget);
          }
        }
      },

      //Drag Exit
      function (e) {},

      //Drop
      function (e) {
      
        // COMMANDS.executeCommand("addElement" , {
        //   target :
        // })
        // editor.execute(new AddElementCommand(editor, dropTarget));
      },

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
