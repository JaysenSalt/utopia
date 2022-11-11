var searchbar = document.getElementById("gsearchbar");
var resultElem = document.querySelector(".results");
var results = 0;

function searchGams() {
  var a=document.querySelectorAll('#glist a[href]');
  results = 0;
  for(var i=0;i<a.length;i++){
a[i].style.display=a[i].textContent.toUpperCase().indexOf(searchbar.value.toUpperCase())!=-1?'inline':'none';
    if(a[i].style.display == 'inline'){
      results++;
    }
  }

  if(searchbar.value != ""){
    resultElem.style.display = "block";
    resultElem.innerText = "Results found: " + results;
  } else {
    resultElem.style.display = "none";
  }
  /*for(var a=0;a<gameCategories.length;a++){
    var attrName = gameCategories[a].innerText.replace(/[^0-9a-z]/gi, '');
    var allInvis = true;
    var canRemoveCategory = false;
    for(var b=0;b<document.querySelectorAll("#glist #" + attrName + " a").length;b++){
      if(document.querySelectorAll("#glist #" + attrName + " a")[b].style.display != "none"){
        allInvis = false;
        console.log("element SHOWING:" + gameCategories[a].innerText);
      }
      if(b == (document.querySelectorAll("#glist #" + attrName + " a").length - 1) && allInvis == true){
        canRemoveCategory = true;
      }
    }
    if(canRemoveCategory == true){
      gameCategories[a].style.display = "none";
      console.log("HIDING category:" + gameCategories[a].innerText);
    }
  }
*/
}
