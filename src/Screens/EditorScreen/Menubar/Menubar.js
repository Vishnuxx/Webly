
import style from "./menubar.module.css";
import { UndoRedoButtons } from "./MenuComponents/MenuComponents";

export function Menubar(props) {
    
  return (
    <menu className={style.menu}>
      <UndoRedoButtons></UndoRedoButtons>
    </menu>
  );
}
