
import { AddElementCommand } from "../Commands/AddElementCommand";

export default class Commands {
    constructor(editor) {
        this.editor = editor;
    }
    executeCommand(commandName , props) {
        switch(commandName) {
            case 'addElement' :
                this.editor.execute(new AddElementCommand(this.editor , props.target , props.index ));
                break;
            
        }
    }
}