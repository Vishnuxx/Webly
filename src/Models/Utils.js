export class Utils {
  static convertObjectToString(json) {
    return JSON.stringify(json).trim().replace(0, -1);
  }

  //returns the dimentions of the element
  static getDimensions(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    };
  }

  static hitTest(dimension , x , y) {
      return (
        x > dimension.left &&
        x < dimension.left + dimension.width &&
        y > dimension.top &&
        y < dimension.top + dimension.height
      );
  }

  //returns true if coordinates enters the bounding area
  static hasEntered(elem , x , y) {
      const dim = Utils.getDimensions(elem)
      return (x > dim.left && x < dim.left + dim.width) && (y > dim.top && y < (dim.top + dim.height));
  }
}
