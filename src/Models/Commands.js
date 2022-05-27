
import { AddElementCommand } from "../Commands/AddElementCommand";
import { MoveElementCommand } from "../Commands/MoveElementCommand";

export default class Commands {
    constructor(editor) {
        this.editor = editor;
    }
    executeCommand(commandName , props) {
        switch (commandName) {
          case "addElement":
            this.editor.execute(
              new AddElementCommand(this.editor, props.element, props.index)
            );
            break;
          case "moveElement":
            this.editor.execute(
              new MoveElementCommand(this.editor, props.element, props.destination ,  props.index)
            );
            break;

            default:
                break;
        }
    }
}