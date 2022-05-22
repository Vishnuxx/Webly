import { Image, Pane, Text } from "evergreen-ui";
import { widgetlist } from "../../../Plugins/widgetList";

export function WidgetsPane(props) {
  return (
    <Pane width="250px" padding='5px'>
      <WidgetsPallette></WidgetsPallette>
    </Pane>
  );
}

function WidgetsPallette(props) {
  return (
    <Pane userSelect="none" display="flex" flexFlow="column" padding="0">
      {widgetlist.map((elem, index) => {
        if (elem.type === "widget") {
          return (
            <PalletteItem
              key={index}
              datakey={elem.key}
              icon={elem.icon}
              label={elem.label}
            ></PalletteItem>
          );
        } else {
          return (
            <h4 padding="0" margin='0' key={index}>
              {elem.label}
            </h4>
          );
        }
      })}
    </Pane>
  );
}

function PalletteItem(props) {
  return (
    <Pane
      datatype="pallette"
      datakey={props.datakey}
      userSelect="none"
      padding="0"
      background="#efefef"
      margin="5px"
      display="flex"
      alignItems="center"
    >
      <Image
        src={props.icon}
        width="30px"
        height="30px"
        marginRight="2px"
        draggable={false}
        pointerEvents="none"
      ></Image>
      <Text pointerEvents="none">{props.label}</Text>
    </Pane>
  );
}
