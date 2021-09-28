console.log("login script.jsss");

let messages = document.getElementsByClassName("message-temp");

for (let i = 0; i < messages.length; i++) {

    setTimeout(() => {
        messages[i].innerText = '';
    }, 2500);
}