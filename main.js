
document.addEventListener('DOMContentLoaded', function () {
  const width = 300;
  const height = 5;
  let currentColor = {
    hue: 0,
    saturation: 100,
    lightness: 100
  }

  const style = document.querySelector('[data="thumbs"]');

  const hueCanvas = document.getElementById("hsl-hue-canvas");
  const satCanvas = document.getElementById("hsl-saturation-canvas");
  const lightCanvas = document.getElementById("hsl-lightness-canvas");

  const hueSlider = document.getElementById("hue-slider");
  const satSlider = document.getElementById("saturation-slider");
  const lightSlider = document.getElementById("lightness-slider");

  hueSlider.addEventListener("input", function (event) {
    currentColor.hue = parseInt(event.target.value);
    updateApp();
  });

  satSlider.addEventListener("input", function (event) {
    currentColor.saturation = parseInt(event.target.value);
    updateApp();
  });
  lightSlider.addEventListener("input", function (event) {
    currentColor.lightness = parseInt(event.target.value);
    updateApp();
  });

  const setColorContainer = document.getElementById("setColor");
  const guessColorContainer = document.getElementById("guessColor");
  let setColor = generateRandomColor();
  setColorContainer.style.backgroundColor = `hsl(${setColor.hue}, ${setColor.saturation}%, ${setColor.lightness}%)`;
  const setColorLabel = document.getElementById("setColorLabel");
  const container = document.getElementById("compareResult");

  function updateApp() {
    generateCanvasBackground(hueCanvas, "hue");
    generateCanvasBackground(satCanvas, "saturation");
    generateCanvasBackground(lightCanvas, "lightness");
    updateThumbStyles();
    updateGuessColor();
    updateGuessColorLabel();
  }

  updateApp();

  document.getElementById("checkColorsBtn").addEventListener("click", function () {
    if (compareColors()) {
      container.innerHTML = "Congrats! Your color is very close 🥳";
      showAnswer();
    } else {
      container.innerHTML = "Not really... keep on trying!"
    }
  });

  document.getElementById("showAnswerBtn").addEventListener("click", showAnswer);
  document.getElementById("nextColorBtn").addEventListener("click", function () {
    setColor = generateRandomColor();
    setColorContainer.style.backgroundColor = `hsl(${setColor.hue}, ${setColor.saturation}%, ${setColor.lightness}%)`;
    setColorLabel.innerHTML = "hsl( 🤔, 🤔, 🤔)";
    container.innerHTML = "";
  });

  function showAnswer() {
    setColorLabel.innerHTML = `hsl(${setColor.hue}, ${setColor.saturation}%,${setColor.lightness}%)`;
  }

  function generateRandomColor() {
    return {
      hue: parseInt(Math.random() * 360),
      saturation: parseInt(Math.random() * 80 + 20),
      lightness: parseInt(Math.random() * 65 + 25)
    };
  }

  function generateCanvasBackground(canvas, type) {
    const ctx = canvas.getContext("2d");
    const grd = ctx.createLinearGradient(0, 0, width, 0);
    switch (type) {
      case "hue":
        for (let i = 0; i <= 360; i++) {
          grd.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
        }
        break;
      case "saturation":
        for (let i = 0; i <= 100; i++) {
          grd.addColorStop(i / 100, `hsl(${currentColor.hue}, ${i}%, 50%)`)
        }
        break;
      case "lightness":
        for (let i = 0; i <= 100; i++) {
          grd.addColorStop(i / 100, `hsl(${currentColor.hue}, ${currentColor.saturation}%, ${i}%)`)
        }
        break;
    }
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);
  }

  function updateThumbStyles() {
    style.innerHTML = `
      #hue-slider::-webkit-slider-thumb { background: hsl(${currentColor.hue}, 100%, 50%) }
      #saturation-slider::-webkit-slider-thumb { background: hsl(${currentColor.hue}, ${currentColor.saturation}%,50%) }
      #lightness-slider::-webkit-slider-thumb { background: hsl(${currentColor.hue}, ${currentColor.saturation}%,${currentColor.lightness}%) }
    `;
  }
  function updateGuessColorLabel() {
    document.getElementById("guessColorLabel").innerHTML = `hsl(${currentColor.hue}, ${currentColor.saturation}%,${currentColor.lightness}%)`;
  }

  function updateGuessColor() {
    guessColorContainer.style.backgroundColor = `hsl(${currentColor.hue}, ${currentColor.saturation}%, ${currentColor.lightness}%)`
  }

  function compareColors() {
    if ((currentColor.hue > setColor.hue + 5) || (currentColor.hue < setColorContainer.hue - 5)) {
      if (currentColor.hue > 2 && setColor.hue < 357) {
        return false;
      }
    }
    if ((currentColor.saturation > setColor.saturation + 20) || (currentColor.saturation < setColorContainer.saturation - 20)) {
      return false;
    }
    if ((currentColor.lightness > setColor.lightness + 20) || (currentColor.lightness < setColorContainer.lightness - 20)) {
      return false;
    }
    return true;
  }

});
