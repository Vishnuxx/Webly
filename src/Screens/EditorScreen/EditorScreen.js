import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { editor } from "../../Models/Editor";
import { dragShadowPositionState } from "../../State/EditorState";
import { DragShadowLayer } from "./DragShadowLayer/DragShadowLayer";
import { EditingCanvas } from "./EditingCanvas/EditingCanvas";
import style from "./editorscreen.module.css";
import { Menubar } from "./Menubar/Menubar";
import { PropsPane } from "./PropsPane/PropsPane";
import {WidgetsPane} from './WidgetsPane/WidgetsPane'

export function EditorScreen(props) {

 

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
