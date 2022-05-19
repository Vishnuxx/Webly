import { Pane, Paragraph } from "evergreen-ui";

export function ComponentPallette(props) {
  return (
    <Pane
      key={props.tab}
      id={`panel-${props.tab}`}
      role="tabpanel"
      aria-labelledby={props.tab}
    //   aria-hidden={props.index !== props.selectedIndex}
      height="100%"
      width="100%"
      display={props.isActive ? "block" : "none"}
    >
      <Paragraph>this is component panel {props.tab}</Paragraph>
    </Pane>
  );
}
