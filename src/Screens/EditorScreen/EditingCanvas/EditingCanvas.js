import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { Dummy } from "../../../Models/Dummy";
import { canvas, COMMANDS, editor } from "../../../Models/Main";
import {
  dragShadowPositionState,
  propertyListState,
} from "../../../State/EditorState";
import style from "./editingcanvas.module.css";

export function EditingCanvas(props) {
  const canvasRef = useRef();
  const updateSidebarList = useSetRecoilState(propertyListState);
  const updateDragShadowPosition = useSetRecoilState(dragShadowPositionState);
  var previousWidget;

  const highlightElement = (elem , classname) => {
    if (previousWidget !== undefined && elem !== previousWidget) {
      if (previousWidget.classList.contains(classname) === true) {
         previousWidget.classList.remove(classname);
         console.log(previousWidget);
      }
      
      previousWidget = elem;
      elem.classList.add(classname);
    }
   
    //detect the variable change
  };

  useEffect(() => {
    canvas.setCanvasView(canvasRef.current);
  });

  useEffect(() => {
    var dropTarget;
    var previousWidget;
    var currentPointingElement; //shows highlighted on cursor in
    const dummy = new Dummy(canvas);
    canvas.initDragControls(
      //PointerDown
      function (e) {},


      //Pointer Move
      function (e) {
        currentPointingElement = document.elementFromPoint(e.pageX, e.pageY);
        if (
          canvas.isPointerInsideCanvas(e.pageX, e.pageY) //&&
          // canvas.isHolding() === false
        ) {
          highlightElement(currentPointingElement ,  style.hover);
         
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
        if (droparea !== canvas.getCanvasView()) {
          const canaccept = canvas.canAcceptChild(droparea);
          
          if(canaccept) highlightElement(droparea , style.highlightElement);
        }
        if (canvas.isPointerInsideCanvas(e.pageX, e.pageY)) {
          dummy.predictDropArea(e.pageX, e.pageY);
        }
      },


      //Drag Exit
      function (e) {},


      //Drop
      function (e) {},


      //MouseUp
      function (e) {
        updateDragShadowPosition({ x: 0, y: 0, isVisible: false });
      }

    );
  });

  return (
    <section className={style.editingcanvas}>
      <div ref={canvasRef} className={style.canvas}></div>
    </section>
  );
}
