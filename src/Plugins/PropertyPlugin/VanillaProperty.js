import { PropertyPlugin } from "./PropertyPlugin";

export class VanillaProperty extends PropertyPlugin {

    constructor() {
        super()
        this.objectData = {}
        this.excludedProperties = []
    }



    renderEditorProperties() {
        super.renderEditorProperties()

    }

    renderAttributes() {
        super.renderProperties()

    }
}