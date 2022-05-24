import { nanoid } from "nanoid";

export function Widget(editormodel) {
  const editor = editormodel;
  var widget = null
  

  // this.select = () => {
  // }

  // this.unselect = () => {
  // }

 

 

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

  this.create = (data) => {
    // const data = editormodel.currentData;
    this.tag = data.tag;
    this.isViewGroup = data.isViewGroup;
    this.isMultiChilded = data.isMultiChilded;
    this.acceptableTypes = [...data.acceptableTypes]
    this.attrs = { ...data.attrs };
    this.debugAttrs = { ...data.debugAttrs };
    this.content = data.content;
    this.styles = { ...data.styles };
    this.pseudoclass = { ...data.pseudoclass };
    this.children = [...data.children];
    widget = document.createElement(this.tag);
    for (let key in this.attrs) {
      widget.setAttribute(key, this.attrs[key]);
    }
    for (let key in this.styles) {
      widget.style[key] = this.styles[key];
    }
    for (let key in this.debugAttrs) {
      widget.setAttribute(key, this.debugAttrs[key]);
    }

    widget.innerHTML = this.content;
   console.log(this.isViewGroup, this.isMultiChilded);
    if (this.isViewGroup === true && this.isMultiChilded === true) {
      
      //Multichilded viewgroups
      this.children.map((data) => {
        widget.appendChild(new Widget(editor).create(data));
      });
   
    } else if (this.isViewgroup === true && this.isMultichilded === false) {
      //SingleChilded Viewgroup
      this.children.map((data) => widget.children.push(widget));
    } else {
      //Standalone Views
      this.children.map((data) => widget.children.push(widget));
    }

    return widget;
  };

  
}
