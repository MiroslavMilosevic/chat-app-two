if( ! getCookieValue("user")){
  window.location.href = "/login";
}
setInterval(() => {
if( ! getCookieValue("user")){
  window.location.href = "/login";
}
}, 200);


let users_grids = document.getElementsByClassName('one-chat-grid');


for (let i = 0; i < users_grids.length;i++){

      users_grids[i].addEventListener('click', function(){

        console.log(users_grids[i].dataset.user_id);
        window.location.href = `/chat?id=${users_grids[i].dataset.user_id}`;

      });
}

function getCookieValue(name){
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
}