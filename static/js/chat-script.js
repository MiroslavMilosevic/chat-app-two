window.onload = function () {
   let message_window =document.getElementById('message-window');
   message_window.scrollTop = message_window.scrollHeight;
  };
 let dataset = document.getElementById('users-data').dataset;
 console.log(dataset);
//  let user = JSON.parse(dataset.user)
 let other_user = JSON.parse(dataset.other_user)

// console.log(user,other_user);

  let button_send = document.getElementById('send');

  button_send.addEventListener('click', function(){
    let input = document.getElementById('input_message');

    sendMessageAxios(input.value.trim(),user._id, other_user._id);

    console.log(input.value.trim());
    input.value='';
  })






  function sendMessageAxios(text, from, to){
    console.log(text, from, to); 
      }