import { Pane, RedoIcon, UndoIcon } from "evergreen-ui";
import { MenuOptionButton } from "../../../../Components/MenuOptionButton";

export function UndoRedoButtons(props) {
   return <Pane display="flex" width="100px" justifyContent="space-evenly">
      <MenuOptionButton egIcon={UndoIcon} label="Undo" />
      <MenuOptionButton egIcon={RedoIcon} label="Redo" />
    </Pane>;
}