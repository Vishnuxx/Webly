import { History } from "./History";

export function Editor() {
  var longPressDuration = 0;
  var activePlugin;
  // var currentDraggingElement = null; //current Dragging Element
  // var currentDropTarget = null;

  const history = new History();
  const widgetData = {}; //datas of widgets
  var currentData = {}; //currentDraggingData

  this.isFromPallette = (elem) => elem.getAttribute("dataType") === "pallette";

  this.setCurrentData = (data) => (currentData = data);

  this.getCurrentData = () => currentData;

  this.getWidgetDataOf = (id) => widgetData[id];

  this.addWidgetData = (id, data) => {
    widgetData[id] = data;
  };

  this.removeWidgetData = (id) => {
    delete widgetData[id];
  };

  this.setEditorPlugin = (plug) => {
    activePlugin = plug;
  };

  this.getActivePlugin = () => activePlugin;

  this.setLongPressDuration = (duration) => (longPressDuration = duration);

  this.getLongPressDuration = () => longPressDuration;

  this.execute = (command) => {
    history.execute(command);
  };

  this.undo = () => {
    history.undo();
  };

  this.redo = () => {
    history.redo();
  };
}
