export function DataOperations(editor) {

    const widgetData = editor.getAllWidgetDatas();

    this.addToRoot = (childId, index) => {
      if (index !== undefined) {
        widgetData["root"].splice(index, 0, childId);
      } else {
        widgetData["root"].push(childId);
      }
    };

    this.addChild = (parentId, childId, index) => {
      if (index !== undefined) {
        widgetData[parentId]["children"].splice(index, 0, childId);
      } else {
        widgetData[parentId]["children"].push(childId);
      }
    };

    this.moveFromRootToRoot = (id, index) => {
      this.removeFromRoot(id);
      if (index !== undefined) {
        widgetData["root"].splice(index, 0, id);
        return;
      }
      widgetData["root"].splice(widgetData["root"].length, 0, id);
    };

    this.moveChildFromRoot = (id, destinationId, index) => {
      //remove from root
      widgetData["root"].splice(widgetData["root"].indexOf(id), 1);
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
        widgetData["root"].splice(index, 0, id);
      } else {
        widgetData["root"].splice(widgetData["root"].length, 0, id);
        console.log("hie");
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

    this.removeFromRoot = (widgetid) => {
      widgetData["root"].splice(widgetData["root"].indexOf(widgetid), 1);
    };

    this.removeChild = (parentId, key) => {
      const children = widgetData[parentId]["children"];
      children.splice(children.indexOf(key), 1);
    };


}