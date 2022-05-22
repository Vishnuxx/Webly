export  function Pallette(editor) {
  const palletteCode = "pallette";


  this.getPalletteCode = () => palletteCode;

  //returns the data of the key
  this.getDataOf = (key) => palletteData[key];


  var palletteData = {
    div: {
      tag: "div",
      attrs: {},
      debugAttrs: {},
      styles: {
        padding: "10px",
        height: "30px",
        backgroundColor: "#e0e0e0",
        color: "white",
      },
      content: "",
      isViewGroup: true,
      isMultiChilded: true,
      acceptableTypes: [],
      children: [],
    },

    button: {
      tag: "button",
      attrs: {},
      debugAttrs: {
        // disabled: "true",
      },
      styles: {
        color: "green",
        padding: "10px",
      },
      content: "button",
      isViewGroup: true,
      isMultiChilded: true,
      acceptableTypes: [],
      children: [],
    },

    input: {
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
      acceptableTypes: [],
      children: [],
    },

    image: {
      tag: "img",
      attrs: {
        src: "https://img.icons8.com/color-glass/48/000000/image.png",
        alt: "",
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
      acceptableTypes: [],
      children: [],
    },
  };
}

