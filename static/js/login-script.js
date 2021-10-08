console.log("login script.jsss");

let messages = document.getElementsByClassName("message-temp");

for (let i = 0; i < messages.length; i++) {

    setTimeout(() => {
        messages[i].innerText = '';
        window.history.pushState({}, document.title, "/" + "login");
    }, 3200);
}

let counter = 0;
function on() {
    counter=1;
document.getElementById("overlay").style.display = "block";
}
function off() {
counter=0;
document.getElementById("overlay").style.display = "none";
}
let img_exp = document.getElementById('img-exp')
img_exp.addEventListener('click', ()=>{
if(counter===0){
 on()
}else{
 off()
}
})  
document.getElementById("overlay")
  .addEventListener('click', ()=>{
      off()
  })