var search = document.getElementById("site");
var submitBtn = document.querySelector(".submit");
var loadingText = '<img src="/img/loading.png" class="loading" style="margin:0" height="16">';

function submitUrl(prx){
  if(/\S/.test(search.value)){
    submitBtn.innerHTML = loadingText;
    quickGo(search.value, prx);
  }
}

if(search){  search.addEventListener('keyup', function onEvent(e) {
  if (e.keyCode === 13) { submitUrl(search.className) }   })  };
submitBtn.onclick = () => {submitUrl(search.className)};

function encodeB64(str){
  str = str.toString();
  const b64chs = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
  let u32;
  let c0; 
  let c1; 
  let c2; 
  let asc = '';
  let pad = str.length % 3;
  
  for (let i = 0; i < str.length;) {
    if((c0 = str.charCodeAt(i++)) > 255 || (c1 = str.charCodeAt(i++)) > 255 || (c2 = str.charCodeAt(i++)) > 255)throw new TypeError('invalid character found');
    u32 = (c0 << 16) | (c1 << 8) | c2;
    asc += b64chs[u32 >> 18 & 63]
        + b64chs[u32 >> 12 & 63]
        + b64chs[u32 >> 6 & 63]
        + b64chs[u32 & 63];
  }
  
  return encodeURIComponent(pad ? asc.slice(0, pad - 3) + '==='.substr(pad) : asc);
}

function encodeXor(str){
  if (!str) return str;
  return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
}

function quickGo(url, prx){
  if(prx == "wm"){
    wm(defaultUrl(url));
  }
  else if(prx == "uv"){
    uv(uvUrl(url));
  } else {
    cr(defaultUrl(url));
  }
}

function defaultUrl(url){
  if( !url.includes('.') && !url.startsWith('https://') && !url.startsWith('http://') ){
    this.url = "https://www.google.com/search?q=" + url;
  }
  else if (url.startsWith('https://')) {
    this.url = url;
  } else if(url.startsWith('http://')) {
    this.url = 'https://' + url.substring(7);
  } else if (url.startsWith('//')) {
    url = 'https:' + url;
  } else {
    this.url = 'https://' + url;
  }
  return this.url;
}

function isUrl(val = ''){ //uv
  if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
  return false;
};

/* BUTTON FUNCTIONS */

function ggl() { // Google
  quickGo("https://google.com");
}

function yt() { // Youtube
  quickGo("https://youtube.com");
}

function invds() { // Invidious
  quickGo("https://yewtu.be");
}

function rbt() { // Rebbit
  quickGo("https://reddit.com"); //window.top.location = "url";
}

function cr(url) { // Open Corrosion
  window.location.href = "/beta/" + encodeB64(url);
}