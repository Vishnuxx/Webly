export class VanillaParser {
    constructor(editor) {
        this.editor = editor
        this.data = editor.getAllWidgetDatas()
    }

    parseIntoCode() {
        return this.editor.getRootData().children.map(elemId => {
            console.log(elemId)
            return this._generateCode(elemId);
        }) 
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
}