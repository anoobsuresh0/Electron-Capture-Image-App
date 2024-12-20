const video = document.getElementById("camera");
const captureButton = document.getElementById("capture-image");
const imageTag = document.getElementById("image");

// video.setAttribute

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

captureButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL();
  window.electronApi.sendImage(dataUrl);

  new Notification("Image Captured", {body: "Image has been captured "});
});
