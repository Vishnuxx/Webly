import { useEffect } from "react";
import { DragShadowLayer } from "./DragShadowLayer/DragShadowLayer";
import { EditingCanvas } from "./EditingCanvas/EditingCanvas";
import style from "./editorscreen.module.css";
import { Menubar } from "./Menubar/Menubar";
import { PropsPane } from "./PropsPane/PropsPane";
import { WidgetsPane } from "./WidgetsPane/WidgetsPane";
import { useSetRecoilState } from "recoil";
import { dragShadowPositionState, hasEnteredIntoCanvas } from "../../State/EditorState";

export function EditorScreen(props) {
    const setHasEntered = useSetRecoilState(hasEnteredIntoCanvas);
  const setPosition = useSetRecoilState(dragShadowPositionState);
 
  useEffect(() => {
      console.log("jd");
    var isDragging = false;
    document.ondragstart = (e) => {
      isDragging = true;
    };
    document.ondragover = (e) => {
        e.preventDefault()
      if (isDragging === true) {
        setPosition({
          x: e.pageX,
          y: e.pageY,
          isVisible: true,
        });
      }
    };

    document.ondragend = (e) => {
         e.preventDefault();
        setHasEntered(false)
      if (isDragging === true) {
        setPosition({
          x: 0,
          y: 0,
          isVisible: false,
        });
      }
    };
  });
  return (
    <section className={style.editor}>
      <Menubar></Menubar>
      <div className={style.mainContainer}>
        <WidgetsPane></WidgetsPane>
        <EditingCanvas></EditingCanvas>
        <PropsPane></PropsPane>
      </div>
      <DragShadowLayer></DragShadowLayer>
    </section>
  );
}
