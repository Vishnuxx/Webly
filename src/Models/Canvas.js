export function Canvas(editor) {
    var hasEntered = false;

    this.dom = null

    this.setEntered = (bool) => {
        hasEntered = bool
    }

    this.hasEntered = () => {
        return hasEntered;
    }
    
    this.findElement = () => {

    }

   
}