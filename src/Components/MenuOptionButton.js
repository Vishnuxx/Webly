import { Icon, Label, Pane } from "evergreen-ui";

export function MenuOptionButton(props) {
    return (
      <Pane display='flex' flexFlow="column" alignItems="center">
        <Icon icon={props.egIcon} color="grey"></Icon>
        <Label color="grey">{props.label}</Label>
      </Pane>
    );
}