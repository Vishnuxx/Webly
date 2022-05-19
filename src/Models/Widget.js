import { Utils } from "./Utils";

export function Widget(editormodel) {
  const editor = editormodel;
  this.icon = "";
  this.label = "";
  this.uid = "";

  this.tag = "div";
  this.isViewgroup = true;
  this.isMultichilded = true;
  this.attrs = {};
  this.debugAttrs = {};
  this.content = null;
  this.styles = {};
  this.pseudoclass = {};
  this.children = [];
  this.parent = null;
  this.index = 0;

  this.render = () => {
    const widget = document.createElement(this.tag);
    for (let key in this.attrs) {
      widget.setAttribute(key, this.attrs[key]);
    }
    for (let key in this.debugAttrs) {
      widget.setAttribute(key, this.debugAttrs[key]);
    }

    widget.innerHTML = this.content;

    if (this.isViewGroup === true && this.isMultichilded === true) {
      //Multichilded viewgroups
      this.children.map((elem) => widget.children.push(widget));
    } else if (this.isViewgroup === true && this.isMultichilded === false) {
      //SingleChilded Viewgroup
      this.children.map((elem) => widget.children.push(widget));
    } else {
      //Standalone Views
      this.children.map((elem) => widget.children.push(widget));
    }

    return widget;
  };

  this.addChild = (child) => {
    editor.addWidget(child);
    this.children.push(child);
    child.parent = this;
    child.index = this.children.length - 1;
  };

  this.addChildAt = (child, index) => {
    editor.addWidget(child);
    this.children.splice(index, 0, child);
    child.parent = this;
    child.index = index;
  };

  this.removeWidget = (child) => {
    editor.removeWidget(child);
    for (let i = 0; i < this.children.length - 1; i++) {
      if (this.children[i] === child) {
        child.parent = null;
        this.children.splice(i, 1);
        return child;
      }
    }
    return;
  };

  this.moveWidgetTo = (widget, destinationWidget, index) => {
    const parent = editor.findWidgetById(widget.parent);
    parent.removeWidget(widget);
    if (index !== undefined) {
      destinationWidget.addChildAt(widget, index);
    } else {
      destinationWidget.addChild(widget);
    }
  };
}
