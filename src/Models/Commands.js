
import { AddElementCommand } from "../Commands/AddElementCommand";
import { MoveElementCommand } from "../Commands/MoveElementCommand";

export default class Commands {
    constructor(editor , dataOperator) {
        this.editor = editor;
        this.dataOperator = dataOperator;
    }
    executeCommand(commandName , props) {
        switch (commandName) {
          case "addElement":
            this.editor.execute(
              new AddElementCommand(this.editor , this.dataOperator , props.element, props.index)
            );
            break;
          case "moveElement":
            console.log(this.dataOperator)
            this.editor.execute(
              new MoveElementCommand(this.editor, this.dataOperator ,  props.element, props.destination ,  props.index)
            );
            break;

            default:
                break;
        }
    }
}