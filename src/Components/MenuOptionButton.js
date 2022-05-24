import { Icon, Label, Pane } from "evergreen-ui";

export function MenuOptionButton(props) {
   
    return (
      <div onClick={props.onClick} style={{display:'flex' ,flexFlow:"column" ,alignItems:"center"}} >
        <Icon icon={props.egIcon} color="grey"></Icon>
        <Label color="grey">{props.label}</Label>
      </div>
    );
}