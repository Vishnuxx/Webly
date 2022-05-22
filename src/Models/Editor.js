import { nanoid } from "nanoid";

export function Editor() {
  var longPressDuration = 0;
  var plugin;
  this.setEditorPlugin = (plug) => plugin = plug;

  this.widgets = [];

  this.currentData = {};
  this.currentDraggingElement = null;

  this.setLongPressDuration = (duration) => (longPressDuration = duration);
  this.getLongPressDuration = () => longPressDuration;
}
