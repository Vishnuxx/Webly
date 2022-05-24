export function Pallette(editor) {
  const palletteCode = "pallette";
  var palletteData = {};


  this.getPalletteCode = () => palletteCode;

  //returns the data of the key
  this.getDataOf = (key) => palletteData[key];

  this.setPalletteData = (dataobj) => palletteData = dataobj;

  
}

