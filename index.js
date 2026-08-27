// Create styles directly with JS
let loadingBar = document.getElementById("loadingBar");
let progress = document.getElementById("progress");

function startLoading() {
  loadingBar.style.width = "90%";
  loadingBar.style.borderRadius="10px"
  loadingBar.style.height = "20px";
  loadingBar.style.background = "green";
 
  let progress = document.getElementById("progress");
  let width = 0;

  let interval = setInterval(() => {
     progress.style.width = "0px";
     progress.style.position="absolute"
     progress.style.left="0";
     progress.style.marginTop="3px";
     progress.style.marginLeft="6%";
     progress.style.marginRight="50%";
     progress.style.height = "14px";
     progress.style.background = "#3498db";
     progress.style.borderRadius="10px";
     progress.style.backgroundImage="url('image/loading bg.webp')";
     progress.style.backgroundSize = "cover";
     progress.style.backgroundRepeat = "no-repeat";
     progress.style.borderColor="lightgreen";
     progress.style.borderStyle="solid";
     progress.style.borderWidth="2px";
    if (width >= 88) {
      clearInterval(interval); // stop when full
    } else {
      width++;
      progress.style.width = width + "%"; // grows left → right
    }
  }, 30); // speed: every 30ms
}
function delayedLink(event) {
  event.preventDefault();
  setTimeout(() => {
    window.location.href = event.target.href;
  }, 30);
}
