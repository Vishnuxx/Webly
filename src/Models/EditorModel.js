
export function EditorModel() {
  var longPressDuration = 0;

  this.widgets = [];

  this.currentData = {};
  this.currentDraggingElement = null;

  this.setLongPressDuration = (duration) => (longPressDuration = duration);
  this.getLongPressDuration = () => longPressDuration;


  this.createWidget = () => {
      
  }
}


