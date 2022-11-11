var pageLoading = document.querySelector(".pageLoading");
var frame = document.querySelector(".frame");

frame.onload = function(){
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "white";
  pageLoading.style.display = "none";

  frame.contentWindow.onunload = unloading;
}

function unloading(){
  pageLoading.style.display = "flex";
}
