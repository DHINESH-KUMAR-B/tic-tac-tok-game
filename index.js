// Create styles directly with JS
const loadingBar = document.getElementById("loadingBar");
const progress = document.getElementById("progress");

function startLoading(onComplete) {
  if (!loadingBar || !progress) {
    return;
  }

  if (window.xoxLoadingInterval) {
    clearInterval(window.xoxLoadingInterval);
  }

  loadingBar.style.width = "90%";
  loadingBar.style.position = "relative";
  loadingBar.style.borderRadius = "10px";
  loadingBar.style.height = "20px";
  loadingBar.style.background = "green";

  let width = 0;

  window.xoxLoadingInterval = setInterval(() => {
    progress.style.position = "absolute";
    progress.style.left = "0";
    progress.style.marginTop = "3px";
    progress.style.marginLeft = "0";
    progress.style.marginRight = "0";
    progress.style.height = "14px";
    progress.style.background = "#3498db";
    progress.style.borderRadius = "10px";
    progress.style.backgroundImage = "url('image/loading bg.webp')";
    progress.style.backgroundSize = "cover";
    progress.style.backgroundRepeat = "no-repeat";
    progress.style.borderColor = "lightgreen";
    progress.style.borderStyle = "solid";
    progress.style.borderWidth = "2px";

    if (width >= 100) {
     clearInterval(window.xoxLoadingInterval);
     window.xoxLoadingInterval = null;
     progress.style.width = "100%";
     if (onComplete) {
       onComplete();
     }
     return;
    }

    width++;
    progress.style.width = width + "%";
    let a=document.createElement("a");
    a.href="home.html";
    a.target="_self";
    setTimeout(()=>{a.click();},3000);
  }, 30);
}