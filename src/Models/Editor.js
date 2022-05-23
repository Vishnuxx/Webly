import { nanoid } from "nanoid";

export function Editor() {
  var longPressDuration = 0;
  var activePlugin;
  

  this.widgetData = {};

  this.currentData = {};
  this.currentDraggingElement = null;

  this.setEditorPlugin = (plug) => {
    activePlugin = plug
  };

  this.getActivePlugin = () => activePlugin;

  

  this.setLongPressDuration = (duration) => (longPressDuration = duration);
  this.getLongPressDuration = () => longPressDuration;
}
