import { Button, Paragraph, SideSheet, Text } from "evergreen-ui";
import { Fragment, useRef, useState } from "react";
import { canvas, editor } from "../../../Models/Models";
import style from "./extensionpanel.module.css";

export function ExtensionPanel(props) {
  const sheet = useRef()
  const [isShown, setIsShown] = useState(false);
  const code = () => {
  
    if (isShown === true) {
      // console.log(
      //   editor.getActiveParserPlugin().parseIntoCode(canvas.getCanvasView().children[0]));
      return <div dangerouslySetInnerHTML={{__html: editor
        .getActiveParserPlugin()
        .parseIntoCode(canvas.getCanvasView().children[0])}} /> 
    }
   return <Text>Nothing</Text>
  };

  
  return (
    <section className={style.menu}>
      <Fragment>
        <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
          <div>{code()}</div>
        </SideSheet>
        <Button onClick={() => setIsShown(true)}>Show Basic Side Sheet</Button>
      </Fragment>
    </section>
  );
}
