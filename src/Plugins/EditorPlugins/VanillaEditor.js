import { nanoid } from "nanoid";
import { editor } from "../../Models/Main";
import EditorPluginInterface from "./EditorPlugin";

export default class VanillaPlugin extends EditorPluginInterface {
  constructor() {
    super();
    this._WIDGET_DATAS = {};
  }

  //override
  getWidgetDatas = () => {
    super.getWidgetDatas();
    return this._WIDGET_DATAS;
  };

  // @override
  createWidget = (palletteData) => {
    super.createWidget();
    const uid = this._createWidgetData(palletteData);
    const obj = {
      elem: this._createWidgetElement(uid),
      data: { ...this._WIDGET_DATAS },
      uid: uid,
    };

    this._WIDGET_DATAS = {};
    return obj;
  };

  //updates the attribute of the element at runtime
  //override
  updateAttribute = (elem, attributename, value) => {
    super.updateAttribute();
    this._WIDGET_DATAS[elem.getAttribute("dataId")]["attrs"][attributename] =
      value;
    elem.setAttribute(attributename, value);
  };

  //updates the style of the element at runtime
  //override

  updateStyle = (elem, stylename, value) => {
    super.updateStyle();
    this._WIDGET_DATAS[elem.getAttribute("dataId")]["styles"][stylename] =
      value;
    elem.style[stylename] = value;
  };

  _createWidgetElement = (uid) => {
    //const uid = createWidgetData(palletteData);
    const data = this._WIDGET_DATAS[uid];
    const elem = document.createElement(data.tag);
    elem.setAttribute(editor.elemType(), "canvaswidget"); // used to check if element is a widget or not
    elem.setAttribute("dataId", uid); //storing the referenceID of the data
    //parsing attributes
    for (let key in data.attrs) {
      elem.setAttribute(key, data.attrs[key]);
    }
    //parsing styles
    for (let key in data.styles) {
      elem.style[key] = data.styles[key];
    }
    //parsing debug attributes (used only at editing time)
    for (let key in data.debugAttrs) {
      elem.setAttribute(key, data.debugAttrs[key]);
    }
    //parsing contents
    elem.innerHTML = data.content;

    //parsing child elements
    if (data.isViewGroup === true && data.isMultiChilded === true) {
      //Multichilded viewgroups
      data.children.map((childUID) => {
        elem.appendChild(this.createWidgetElement(childUID));
      });
    } else if (this.isViewgroup === true && this.isMultichilded === false) {
      //SingleChilded Viewgroup
      if (data.children.length > 0)
        elem.appendChild(this._createWidgetElement(data.children[0]));
    }

    return elem;
  };

  _createWidgetData = (palletteData) => {
    const uid = nanoid(16);

    const widgetData = {
      tag: palletteData.tag,
      attrs: { ...palletteData.attrs },
      debugAttrs: { ...palletteData.debugAttrs },
      styles: { ...palletteData.styles },
      content: palletteData.content,
      isViewGroup: palletteData.isViewGroup,
      isMultiChilded: palletteData.isMultiChilded,
      acceptableTypes: palletteData.acceptableTypes,
      children: palletteData.children.map((childData) =>
        this._createWidgetData(childData)
      ),
    };

    this._WIDGET_DATAS[uid] = widgetData;
    return uid;
  };
}
