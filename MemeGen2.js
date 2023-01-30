function generateMeme(img, topTextInput, bottomTextInput) {
  const canvas = document.getElementById('meme');
  const ctx = canvas.getContext('2d');

  // Size canvas to image
  canvas.width = img.width;
  canvas.height = img.height;
  // function drawImageScaled(img, ctx) {
  //   var canvas = ctx.canvas ;
    // var hRatio = canvas.width  / img.width    ;
    // var vRatio =  canvas.height / img.height  ;
    // var ratio  = Math.min ( hRatio, vRatio );
    // var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
    // var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
    // ctx.clearRect(0,0,canvas.width, canvas.height);
    // ctx.drawImage(img, 0,0, img.width, img.height, centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);
    // }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw main image
  ctx.drawImage(img, 0, 0);

  // Text style: white with black borders
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.textAlign = 'center';

  // Top text font size
  let fontSize = canvas.width / 8;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;

  // Draw top text
  ctx.textBaseline = 'top';
  topTextInput.split('\n').forEach((t, i) => {
    ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
  });

  // Bottom text font size
  fontSize = canvas.width / 8;
  ctx.font = `${fontSize}px Impact`;
  ctx.lineWidth = fontSize / 20;

  // Draw bottom text
  ctx.textBaseline = 'bottom';
  bottomTextInput.split('\n').reverse().forEach((t, i) => { // .reverse() because it's drawing the bottom text from the bottom up
    ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Initialize variables
  const topTextInput = document.getElementById('topTextInput');
  const bottomTextInput = document.getElementById('bottomTextInput');
  const imageFileInput = document.getElementById('imageFileInput');
  const generate = document.getElementById('generate');

  // Generate button click listener
  generate.addEventListener('click', () => {
    // Read image as DataURL using the FileReader API
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        generateMeme(img, topTextInput.value, bottomTextInput.value);
      };
    };
    reader.readAsDataURL(imageFileInput.files[0]);
  });
});

document.getElementById("reset").addEventListener("click", resetMeme);

function resetMeme() {
  window.location.reload();
  // document.getElementById("imageFileInput").src = "";
  // document.getElementById("topTextInput").value = "";
  // document.getElementById("bottomTextInput").value = "";
  // document.getElementById("meme").value = "";
}
