import { Button, Pane, Paragraph, Popover, Position, SideSheet, Text } from "evergreen-ui";
import { Fragment, useRef, useState } from "react";
import { dragProcessor, editor } from "../../../Models/Main";
import { WidgetsPane } from "../WidgetsPane/WidgetsPane";
import style from "./extensionpanel.module.css";

export function ExtensionPanel(props) {
  const sheet = useRef();
  const [isShown, setIsShown] = useState(false);
  const code = () => {
    if (isShown === true) {
      const code = editor.getActiveParserPlugin().parseIntoCode();
      console.log(code);
      return <div dangerouslySetInnerHTML={{ __html: code }} />;
    }
    return <Text>Nothing</Text>;
  };

  return (
    <section className={style.menu}>
      <Fragment>
        <Popover
          content={
            <Pane
              width={350}
              height="fit-content"
              display="flex"
              alignItems="start"
              justifyContent="start"
              flexDirection="column"
            >
              <WidgetsPane></WidgetsPane>
            </Pane>
          }
          position={Position.BOTTOM_LEFT}
        >
          <Button>Add</Button>
        </Popover>
      </Fragment>
      <Fragment>
        <SideSheet isShown={isShown} onCloseComplete={() => setIsShown(false)}>
          <div>{code()}</div>
        </SideSheet>
        <Button color="green" onClick={() => setIsShown(true)}>
          Preview
        </Button>
      </Fragment>
    </section>
  );
}
