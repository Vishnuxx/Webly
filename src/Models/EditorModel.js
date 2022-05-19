import { Canvas } from "./Canvas";
import { Widget } from "./Widget";

function EditorModel() {
    this.currentData = {}

    this.canvas = new Canvas(this)

    this.fromPallette = true;

    this.widgets = []

    this.addWidget = (widget) => {
        this.widgets.push(widget)
    }

    this.removeWidget = (widget) => {
        this.widgets.splice(this.widgets.indexOf(widget) ,  1);
    }

    this.addWidgetFromPallette = () => {
       const pallette = this.currentData
       const widget = new Widget(this)
        widget.tag = pallette.tag
        widget.uid = pallette.uid
        widget.attrs = {...pallette.attrs}
        widget.debugAttrs = {...pallette.debugAttrs}
        widget.isViewGroup = pallette.isViewGroup
        widget.content = pallette.content
        // .isMultiChilded = pallette.isMultiChilded;
        this.addWidget(widget)
    }

    this.renderEelements = (canvas) => { 
        canvas.innerHTML = "";
        for(let wid of this.widgets) {
            canvas.appendChild(wid.render())
        }
    }
    
}

export const editor = new EditorModel();