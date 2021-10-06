if (!getCookieValue("user")) {
  window.location.href = "/login";
}
setInterval(() => {
  if (!getCookieValue("user")) {
    window.location.href = "/login";
  }
}, 200);

let scrolling = 0;
window.onload = function () {
  let message_window = document.getElementById('message-window');
  message_window.scrollTop = message_window.scrollHeight;
};
let dataset = document.getElementById('users-data').dataset;
let user = JSON.parse(dataset.user);
let other_user = JSON.parse(dataset.other);

let niz = [];
axios.get(`/msg-api?id_user=${user._id}&id_other=${other_user._id}`).then(res => {
  niz = res.data;
  rpnt_message_box(niz);
})


setInterval(() => {
  let isCookieActive = getCookieValue("user");
  if (!isCookieActive) {
    window.location.href = "/login";
    return;
  }

  axios.get(`/msg-api?id_user=${user._id}&id_other=${other_user._id}`).then(res => {
    niz = res.data;
    console.log(niz);
    rpnt_message_box(niz);
    if (scrolling === 0) {
      let message_window = document.getElementById('message-window');
      message_window.scrollTop = message_window.scrollHeight;
    }
  })

}, 12450);

let box = document.getElementById('message-window');
box.addEventListener('scroll', function () {
  scrolling = 1;

  // console.log((box.scrollHeight - box.offsetHeight)==Math.floor(box.scrollTop));
  // console.log((box.scrollHeight - box.offsetHeight),Math.floor(box.scrollTop));
  if ((box.scrollHeight - box.offsetHeight) == Math.floor(box.scrollTop) ||
    (box.scrollHeight - box.offsetHeight) == Math.floor(box.scrollTop) - 1 ||
    (box.scrollHeight - box.offsetHeight) == Math.floor(box.scrollTop) + 1
  ) {
    scrolling = 0;
  }
})


function rpnt_message_box(niz) {
  console.log("repaint funkcijaaaaaaaaaaa");

  let box = document.getElementById('message-window');
  box.innerHTML = '';
  for (let i = 0; i < niz.length; i++) {

    let one_message_div = document.createElement('div');
    one_message_div.classList.add('one-message');
    if (niz[i].from_id == user._id) {
      one_message_div.classList.add('right-message-grid');
      let div_empty = document.createElement('div');
      div_empty.classList.add('empty');
      let div_time = document.createElement('div');
      div_time.classList.add('time');
      div_time.innerHTML =formatDateString(niz[i].sent_date);
      let div_message = document.createElement('div');
      div_message.classList.add('message');
      div_message.innerText = niz[i].text;

      one_message_div.append(div_empty, div_time, div_message);

    } else if (niz[i].from_id == other_user._id) {

      one_message_div.classList.add('left-message-grid');
      let div_message = document.createElement('div');
      div_message.classList.add('message');
      div_message.innerText = niz[i].text;

      let div_time = document.createElement('div');
      div_time.classList.add('time');
      div_time.innerHTML =formatDateString(niz[i].sent_date);

      let div_empty = document.createElement('div');
      div_empty.classList.add('empty');

      one_message_div.append(div_message, div_time, div_empty);
    }

    box.appendChild(one_message_div);
  }//for from niz



}/// end of rpnt_message_box fnk

let button_send = document.getElementById('send');
button_send.addEventListener('click', function () {
  let input = document.getElementById('input_message');
  if (input.value.trim().length > 0) {
    sendMessageAxios(input.value.trim(), user._id, other_user._id);
    input.value = '';
    scrolling = 0;
  } else {
    //input.style.backgroundColor = 'ff00003f';
    input.setAttribute('style', 'background-color: #ff00003f');
    setTimeout(() => {
      input.setAttribute('style', 'background-color: #3446a798');
    }, 500);
  }
})

let input_message = document.getElementById('input_message');
input_message.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    if (e.target.value.trim().length > 0) {
      sendMessageAxios(e.target.value.trim(), user._id, other_user._id);
      e.target.value = '';
      scrolling = 0;
    } else {
      input_message.setAttribute('style', 'background-color: #ff00003f');
      setTimeout(() => {
        input_message.setAttribute('style', 'background-color: #3446a798');

      }, 500);
    }


  }
})

function sendMessageAxios(text, from, to) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  axios.post('/send-message', { message: { text, from, to, query_id: id } }).then(response => {
    console.log(response);
  })

}



/////helper functions //

function getCookieValue(name) {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}

function formatDateString(date) {

let time = date.split(" ")[4];
time = time.split(":")[0]+":"+time.split(":")[1];
let month = date.split(" ")[1]+" "+date.split(" ")[2]
date=month+"<br>"+time;
return date;
}