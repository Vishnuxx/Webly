import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { dragShadowPositionState } from "../../../State/EditorState";

export function DragShadowLayer(props) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "0",
        padding: "0",
        pointerEvents: "none",
        zIndex:11
      }}
    >
      <DragShadow />
    </div>
  );
}

function DragShadow(props) {
  const location = useRecoilValue(dragShadowPositionState);
  return (
    <div
      style={{
        display: location.isVisible ? "flex" : "none",
        top: location.y,
        left: location.x,
        position: "absolute",
        background: "#e9e9e9",
        width: "100px",
        height: "30px",
        borderRadius: "5px",
        justifyContent: "center",
        alignItems: "center",
        opacity: "0.8",
        border:"1px solid #e0e0e0",
        color:"grey"
      }}
    >
      Element
    </div>
  );
}
