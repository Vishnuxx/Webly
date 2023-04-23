import { DragShadowLayer } from "./DragShadowLayer/DragShadowLayer";
import { EditingCanvas } from "./EditingCanvas/EditingCanvas";
import style from "./editorscreen.module.css";
import { ExtensionPanel } from "./ExtensionPanel/ExtensionPanel";
import { Menubar } from "./Menubar/Menubar";
import { PropsPane } from "./PropsPane/PropsPane";
import {WidgetsPane} from './WidgetsPane/WidgetsPane'

export function EditorScreen(props) {

 

  return (
    <section className={style.editor}>
      <Menubar></Menubar>
      <ExtensionPanel></ExtensionPanel>
      <div className={style.mainContainer}>
       
        <EditingCanvas></EditingCanvas>
        <PropsPane></PropsPane>
      </div>

      <DragShadowLayer></DragShadowLayer>
    </section>
  );
}
