console.log("login script.jsss");

let messages = document.getElementsByClassName("message-temp");

for (let i = 0; i < messages.length; i++) {

    setTimeout(() => {
        messages[i].innerText = '';
        window.history.pushState({}, document.title, "/" + "login");
    }, 3200);
}