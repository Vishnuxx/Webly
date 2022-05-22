export  function Pallette(editor) {
  const palletteCode = "pallette";


  this.getPalletteCode = () => palletteCode;

  //returns the data of the key
  this.getDataOf = (key) => palletteData[key];


  var palletteData = {
    div: {},

    button: {
      uid: "",
      class: "",
      id: "",
      tag: "button",
      attrs: {},
      debugAttrs: {
        // disabled: "true",
      },
      styles: {
        color: "green",
        padding: "10px",
      },
      content: "Button",
      isViewGroup: true,
      isMultiChilded: true,
      children: [],
    },

    input: {
      uid: "",
      class: "",
      id: "",
      tag: "input",
      attrs: {
        type: "password",
        active: false,
        placeholder: "Type here...",
      },
      debugAttrs: {
        disabled: "true",
      },
      styles: {
        padding: "10px",
      },
      content: "Hello",

      isViewGroup: false,
      isMultiChilded: false,
      children: [],
      parent: null,
    },
  };
}
