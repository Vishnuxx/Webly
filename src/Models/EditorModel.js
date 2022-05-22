
export function EditorModel() {
  var longPressDuration = 0;
  
  this.widgets = [];

  this.currentData = {};
  this.currentDraggingElement = null;


  this.setLongPressDuration = (duration) => (longPressDuration = duration);
  this.getLongPressDuration = () => longPressDuration;

  this.addWidget = (widget) => {
    this.widgets.push(widget);
  };

  this.removeWidget = (widget) => {
    this.widgets.splice(this.widgets.indexOf(widget), 1);
  };

  this.addWidgetFromPallette = (widget) => {
    const pallette = this.currentData;
    widget.tag = pallette.tag;
    widget.uid = pallette.uid;
    widget.attrs = { ...pallette.attrs };
    widget.debugAttrs = { ...pallette.debugAttrs };
    widget.isViewGroup = pallette.isViewGroup;
    widget.content = pallette.content;
    widget.isMultiChilded = pallette.isMultiChilded;
    this.addWidget(widget);
  };

  this.renderEelements = (canvas) => {
    canvas.innerHTML = "";
    for (let wid of this.widgets) {
      canvas.appendChild(wid.render());
    }
  };
}


