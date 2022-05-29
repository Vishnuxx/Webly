import { History } from "./History";

export function Editor() {
  
  var activeEditorPlugin;
  var activeParserPlugin;
  var rootData = {
    children: []
  }
  var currentData = {
  }; //currentDraggingData

  const history = new History();
  const widgetData = {}; //datas of widgets

  this.isFromPallette = (elem) => elem.getAttribute("dataType") === "pallette";

  this.setCurrentData = (data) => (currentData = data);

  this.getCurrentData = () => currentData;

  this.getRootData = () => rootData

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

  

  //Data Operations

  this.addToRoot = (childId , index) => {
    if (index !== undefined) {
      rootData["children"].splice(index, 0, childId);
    } else {
      rootData["children"].push(childId);
    }
  }

   this.moveChildFromRoot = (id, destinationId, index) => {
     //remove from root
     rootData["children"].splice(rootData["children"].indexOf(id), 1);

     if (index !== undefined) {
       //add to new parent
       widgetData[destinationId]["children"].splice(index, 0, id);
     } else {
       //add to new parent
       widgetData[destinationId]["children"].push(id);
     }
   };

   this.moveChildToRoot = (id, sourceId, index) => {
     //remove from old parent
     widgetData[sourceId]["children"].splice(
       widgetData[sourceId]["children"].indexOf(id),
       1
     );

     //add to root
     if (index !== undefined) {
       rootData["children"].splice(index, 0, id);
     } else {
       rootData["children"].splice(rootData["children"].indexOf(id), 0, id);
     }
   };

  this.removeFromRoot = (property , widgetid) => {
    delete rootData[property][widgetid];
  }

  this.addChild = (parentId, childId, index) => {
    if (index !== undefined) {
      widgetData[parentId]["children"].splice(index, 0, childId);
    } else {
      widgetData[parentId]["children"].push(childId);
    }
  };

  this.moveChild = (id, sourceId, destinationId, index) => {
    //remove from old parent
    widgetData[sourceId]["children"].splice(
      widgetData[sourceId]["children"].indexOf(id),
      1
    );

    if (index !== undefined) {
      //add to new parent
      widgetData[destinationId]["children"].splice(index, 0, id);
    } else {
      //add to new parent
      widgetData[destinationId]["children"].push(id);
    }
  };

 
  this.removeChild = (parentId, key) => {
    const children = widgetData[parentId]["children"];
    widgetData[parentId]["children"].splice(children.indexOf(key) , 1);
  };

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
