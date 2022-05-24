import { Pane, Text, TextInput } from "evergreen-ui";
import { useRecoilValue } from "recoil";
import { propertyListState } from "../../../State/EditorState";

export function PropsPane(props) {
  const properties = useRecoilValue(propertyListState);
  return (
    <Pane
      width="300px"
      maxWidth="300px"
       height="100%"
      display="flex"
      flexFlow="column"
    >
      {Object.keys(properties).map((key) => {
        return (
          <Property key={key} name={key} value={properties[key]}></Property>
        );
      })}
    </Pane>
  );
}

function Property(props) {
  return (
    <Pane width="200px" display="flex" flexFlow="column">
      <Text>{props.name}</Text>
      <input value={props.value}></input>
    </Pane>
  );
}
