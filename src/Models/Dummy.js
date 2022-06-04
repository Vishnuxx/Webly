export class Dummy {
  constructor(canvas) {
    this.canvas = canvas;

    this.dummy = this.dummy = document.createElement("div");
    this.dummy.style.display = "block";
    this.dummy.style.background = "#E0e0e0";
    this.dummy.style.width = "60px";
    this.dummy.style.height = "30px";
    this.dummy.style.position = "relative";
    this.dummy.style.boxShadow = "0px 2px 3px 1px #BFBFBF";
  }

  //tracks and predicts droppable regions
  predictDropArea(x, y) {
    // const currentElement = document.elementFromPoint(x, y);
    // if(this.canvas.isRootWidget(currentElement)) return
    // if (this.canvas.isCanvasWidget(currentElement)) {
    //   this.dummy.remove();
    //   const parent = currentElement.parentElement;
    //   parent.insertBefore(
    //     this.dummy,
    //     parent.children[[...parent.children].indexOf(currentElement)]
    //   );
    //   return;
    // }
    // this.dummy.remove();
  }

  stopTracking() {
    this.dummy.remove();
  }
}
