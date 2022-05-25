import { Command } from "./Command";

class MoveCommand extends Command {

    constructor(editor , elem , destination) {
        super();
        this.editor = editor
        this.element = elem
        this.destination = destination
        // this.oldIndex = 
    }

    execute() {

    }

    undo() {

    }

    redo() {

    }
}