import ParserPlugin from "./ParserPlugin";

export class VanillaParser extends ParserPlugin{
    constructor(editor) {
        super();
        this.editor = editor
        this.data = editor.getAllWidgetDatas()
    }

    parseIntoCode() {
        super.parseIntoCode();
       let code = ""
       this.editor.getRootData().children.map(elemId => {
            code += this._generateCode(elemId);
        });
        return code;
    }   

    _generateCode(id) {

        let attributes ="";
        let style = "";
        let childNodes = ""

        Object.keys(this.data[id].attrs).map(key => {
            console.log(this.data[id].attrs[key]);
            attributes += ` ${key} = "${this.data[id].attrs[key]}"`;
        })
        Object.keys(this.data[id].styles).map((key) => {
           style += `${key}: ${this.data[id].styles[key]};`;
         });
        
        this.data[id].children.map(id => {
            childNodes += this._generateCode(id)
         })

        return (
            `<${this.data[id].tag} ${attributes} style="${style }"> 
                ${this.data[id].content}
                ${childNodes}
            </${this.data[id].tag}>`
          )
    }

    parseIntoData() {
        super.parseIntoData();
    }
}