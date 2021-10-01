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
  console.log("scroling = ", scrolling);
  axios.get(`/msg-api?id_user=${user._id}&id_other=${other_user._id}`).then(res => {
    niz = res.data;
    rpnt_message_box(niz);
    if(scrolling === 0){
    console.log("fokusira");;
    let message_window = document.getElementById('message-window');
    message_window.scrollTop = message_window.scrollHeight;
    }
  })

}, 500);

let box = document.getElementById('message-window');
box.addEventListener('scroll', function(){
  scrolling = 1;
//console.log(box.offsetHeight,box.scrollTop, box.offsetTop,"|||", box.offsetHeight, box.clientHeight,"W", box.scrollHeight );
// console.log(box.scrollHeight - box.offsetHeight);
// console.log(box.scrollTop);
// console.log((box.scrollHeight - box.offsetHeight)==Math.floor(box.scrollTop));
// console.log((box.scrollHeight - box.offsetHeight)==Math.floor(box.scrollTop));
// console.log((box.scrollHeight - box.offsetHeight),Math.floor(box.scrollTop));
if((box.scrollHeight - box.offsetHeight)==Math.floor(box.scrollTop)||
(box.scrollHeight - box.offsetHeight)==Math.floor(box.scrollTop)-1||
(box.scrollHeight - box.offsetHeight)==Math.floor(box.scrollTop)+1
){
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
      div_time.innerText = "2.25pm";
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
      div_time.innerText = "2.25pm";

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

  sendMessageAxios(input.value.trim(), user._id, other_user._id);
  input.value = '';
  scrolling = 0;
})

function sendMessageAxios(text, from, to) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  axios.post('/send-message', { message: { text, from, to, query_id: id } }).then(response => {
    console.log(response);
  })

}