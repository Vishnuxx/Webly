import { CanvasModel } from "./CanvasModel";
import { EditorModel } from "./EditorModel";
import { Pallette } from "./Pallette";

export const editor = new EditorModel();
export const canvas = new CanvasModel(editor);