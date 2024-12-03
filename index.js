const imageTag = document.getElementById("imageTag");

window.electronApi.getImage((event, data) => {
  imageTag.src = data;
  window.electronApi.closeWindow2();
});
