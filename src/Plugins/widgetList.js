export const widgetlist = [
  {
    type: "widget",
    label: "Div",
    icon: "https://img.icons8.com/color/48/000000/dashboard-layout.png",
  },
  {
    type: "widget",
    label: "Button",
    icon: "https://img.icons8.com/color/48/000000/dashboard-layout.png",
    data: {
      uid: "",
      class: "",
      id: "",
      tag: "button",
      attrs: {
        contenteditable: "true",
      },
      debugAttrs: {
        disabled: "true",
      },
      styles: {},
      content: "Hello",
      isViewGroup: true,
      isMultiChilded: true,
      children: [],
    },
  },
  {
    type: "widget",
    label: "Input",
    icon: "https://img.icons8.com/color/48/000000/dashboard-layout.png",
    data: {
      uid: "",
      class: "",
      id: "",
      tag: "input",
      attrs: {
        type: "password",
        active: false,
      },
      styles: {},
      content: "Hello",

      isViewGroup: false,
      isMultiChilded: false,
      children: [],
    },
  },
  {
    type: "title",
    label: "Advanced",
  },
  {
    type: "widget",
    label: "Paragraph",
    icon: "https://img.icons8.com/color/48/000000/dashboard-layout.png",
  },
  {
    type: "widget",
    label: "section",
    icon: "https://img.icons8.com/color/48/000000/dashboard-layout.png",
  },
];
