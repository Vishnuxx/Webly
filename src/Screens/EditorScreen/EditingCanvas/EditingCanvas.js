import { useEffect, useMemo, useRef } from "react";
import { editor } from "../../../Models/EditorModel";
import style from "./editingcanvas.module.css";

export function EditingCanvas(props) {
  // const [hasEntered , setHasEntered] = useRecoilState(hasEnteredIntoCanvas)
  const canvasRef = useRef()
  editor.canvas.dom = canvasRef.current
  console.log("Render")

  useEffect(() => {
    console.log(canvasRef.current)
    editor.renderEelements(canvasRef.current);
  } );



  const onDragEntered = (e) => {
    editor.canvas.setEntered(true)
    canvasRef.current.style.outline = "1px solid blue";
  };

  const onDrop = () => {
    editor.addWidgetFromPallette()
    editor.renderEelements(canvasRef.current);
     canvasRef.current.style.outline = "none";
  }

  const onDragLeave = (e) => {
    editor.canvas.setEntered(false);
     canvasRef.current.style.outline = "none";
  };


  return (
    <section className={style.editingcanvas}>
      <div
      ref={canvasRef}
        className={style.canvas}
        onDragEnterCapture={onDragEntered}
        onDropCapture={onDrop}
        onDragLeaveCapture={onDragLeave}
      >
      </div>
    </section>
  );
}
