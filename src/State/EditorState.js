import { atom } from "recoil";

export const dragShadowPositionState = atom({
  key: "dragShadowPositionState",
  default: {
    x: 0,
    y: 0,
    isVisible: false,
  },
});

export const hasEnteredIntoCanvas = atom({
  key: "hasEnteredIntoCanvas",
  default: false,
});

export const propertyListState = atom({
  key: "propertyPaneState",
  default: {},
});
