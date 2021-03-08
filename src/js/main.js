var draggable = false;
var hexDisplay = document.getElementById("hexVal");

huePicker.addEventListener('click', function (event) {
  changeHue(event);
});

satPicker.addEventListener("mousedown", function (event) {
  draggable = true;
  changeColor(event);
}, false);

satPicker.addEventListener("mouseup", function () {
  draggable = false;
}, false);

satPicker.addEventListener("mousemove", function (event) {
  if (draggable) {
    changeColor(event);
  }
}, false);

function changeHue(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  var hueData = hueCanvasCtx.getImageData(x, y, 1, 1).data;
  var hueAsHsl = rgb2hsl(hueData[0], hueData[1], hueData[2]);
  initColor = `hsla(${hueAsHsl[0]}, ${hueAsHsl[1]}%, ${hueAsHsl[2]}%, 1)`;
  fillGradient();
}

function changeColor(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  var getColor = satCanvasCtx.getImageData(x, y, 1, 1).data;
  hexVal.innerHTML = rgb2hex(getColor[0], getColor[1], getColor[2]);
}

function rgb2hex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length === 1) {
    r = `0${r}`;
  }
  if (g.length === 1) {
    g = `0${g}`;
  }
  if (b.length === 1) {
    b = `0${b}`;
  }

  return `#${r}${g}${b}`;
}

function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;

  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);

  var delta = max - min;
  var hue;
  if (delta === 0) hue = 0;
  else {
    switch (max) {
      case r: hue = (g - b) / delta % 6;
        break;
      case g: hue = (b - r) / delta + 2;
        break;
      case b: hue = (r - g) / delta + 4;
    }
    var light = (min + max) / 2;
    var sat = delta === 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));
    return [Math.floor(hue * 60), Math.floor(sat * 100), Math.floor(light * 100)];
  }
}
