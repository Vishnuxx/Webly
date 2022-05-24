import { Pane, RedoIcon, UndoIcon } from "evergreen-ui";
import { MenuOptionButton } from "../../../../Components/MenuOptionButton";
import { editor } from "../../../../Models/Models";

export function UndoRedoButtons(props) {
   
   return (
     <Pane display="flex" width="100px" justifyContent="space-evenly">
       <MenuOptionButton
         egIcon={UndoIcon}
         label="Undo"
         onClick={()=> editor.undo()}
       />
       <MenuOptionButton
         egIcon={(RedoIcon)}
         label="Redo"
         onClick={()=> editor.redo()}
       />
     </Pane>
   );
}