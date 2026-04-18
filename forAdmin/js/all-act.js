
function toggleTypeFields() {
  const filmType = document.querySelector('input[name="filmType"]:checked').value;
  const filmDuration = document.getElementById('filmDuration');
  const serialInfo = document.getElementById('serialInfo');

  if (filmType === 'film') {
      filmDuration.classList.remove('hidden');
      serialInfo.classList.add('hidden');
  } else {
      filmDuration.classList.add('hidden');
      serialInfo.classList.remove('hidden');
  }
}


//----------------------------------Dashboard---------------------------------------------------
let modal = document.getElementById('modal');


function CloseButton() {
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

let sidebar = document.getElementById("sidebar");

function toggleSidebarMenu() {
  sidebar.classList.toggle("hidden");
}



//------------------------------------LOGIN-------------------------------------------------

let alertBox = document.getElementById('alert');
let message = document.getElementById('message');

message.addEventListener('click', function () {
  alertBox.style.display = alertBox.style.display === 'flex' ? 'none' : ''
});

let login = document.getElementById('loginButton')
let error = document.getElementById('error')

let  realEmail = 'fulladmin@gmail.com'
let realPass = "776"
login.addEventListener('click', function(){

  let  email = document.getElementById('email').value
  let  pass = document.getElementById('password').value

  if ( email === realEmail&& pass === realPass){
    window.location.href = "dashboard.htm"
  } else {
    error.style.display = error.style.display === 'flex' ? 'none' : '';
    
  }
})

document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    login.click()
  }
});


