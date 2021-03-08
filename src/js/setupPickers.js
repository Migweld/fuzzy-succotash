var initColor = 'hsla(0, 100%, 50%, 1)';
var satPicker = document.getElementById("satVal");
var satCanvasCtx = satPicker.getContext('2d');

var satWidth = satPicker.width;
var satHeight = satPicker.height;

var huePicker = document.getElementById('hueVal');
var hueCanvasCtx = huePicker.getContext('2d');

var hueWidth = huePicker.width;
var hueHeight = huePicker.height;

satCanvasCtx.rect(0, 0, satWidth, satHeight);
fillGradient();

hueCanvasCtx.rect(0, 0, hueWidth, hueHeight);
var hueGrad = createGradient(hueCanvasCtx, hueHeight, [
  { position: 1, value: "hsla(0, 100%, 50%, 1)" },
  { position: 0.85, value: "hsla(60, 100%, 50%, 1)" },
  { position: 0.68, value: "hsla(120, 100%, 50%, 1)" },
  { position: 0.51, value: "hsla(180, 100%, 50%, 1)" },
  { position: 0.34, value: "hsla(240, 100%, 50%, 1)" },
  { position: 0.17, value: "hsla(300, 100%, 50%, 1)" },
  { position: 0, value: "hsla(0, 100%, 50%, 1)" }
], "vertical");
hueCanvasCtx.fillStyle = hueGrad;
hueCanvasCtx.fill();

function createGradient(ctx, ctxSize, colors, type) {
  var gradient = null;
  switch (type) {
    case "vertical":
      gradient = ctx.createLinearGradient(0, 0, 0, ctxSize);
      break;
    case "horizontal":
      gradient = ctx.createLinearGradient(0, 0, ctxSize, 0);
      break;
  }

  colors.forEach(function (color) {
    gradient.addColorStop(color.position, color.value);
  });

  return gradient;
}

function fillGradient() {
  satCanvasCtx.fillStyle = initColor;
  satCanvasCtx.fillRect(0, 0, satWidth, satHeight);

  var grdWhite = createGradient(hueCanvasCtx, satWidth, [
    { position: 0, value: "hsla(0,0%,100%,1)" },
    { position: 1, value: "hsla(0,0%,100%,0)" },
  ], "horizontal");
  satCanvasCtx.fillStyle = grdWhite;
  satCanvasCtx.fillRect(0, 0, satWidth, satHeight);

  var grdBlack = createGradient(satCanvasCtx, satHeight, [
    { position: 0, value: "hsla(0,0%,0%,0)" },
    { position: 1, value: "hsla(0,0%,0%,1)" },
  ], "vertical");
  satCanvasCtx.fillStyle = grdBlack;
  satCanvasCtx.fillRect(0, 0, satWidth, satHeight);
}
