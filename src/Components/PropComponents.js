import { TextInput } from "evergreen-ui";

export function TextProp(props) {
    return <input type="text" value={props.value}></input>
}

export function NumberProp(props) {
    return <input type="number" value={props.value}></input>;
}

