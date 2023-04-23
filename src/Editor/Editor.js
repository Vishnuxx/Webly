import { History } from "../Models/History";

export function Editor() {
  
  var activeEditorPlugin;
  var activeParserPlugin;
  var currentData = {}; 

  const widgetData = {root: []}; 
  const history = new History();

  
  this.elemType = () => "elementtype"

  this.isFromPallette = (elem) => elem.getAttribute(this.elemType()) === "pallette";

  //set and get current data of the touched element
  this.setCurrentData = (data) => (currentData = data);
  this.getCurrentData = () => currentData;

  //get canvas data
  this.getRootData = () => widgetData["root"]

  this.getWidgetDataOf = (id) => widgetData[id];

  this.getAllWidgetDatas = () => widgetData;

  this.addWidgetData = (id, data) => {
    widgetData[id] = data;
  };

  this.removeWidgetData = (id) => {
    delete widgetData[id];
  };

  //editor plugin
  this.setEditorPlugin = (plug) => {
    activeEditorPlugin = plug;
  };

  this.getActiveEditorPlugin = () => activeEditorPlugin;

  //parser plugin
  this.setParserPlugin = (plug) => {
    activeParserPlugin = plug;
  };

  this.getActiveParserPlugin = () => activeParserPlugin;

  
  //Command oprations

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
