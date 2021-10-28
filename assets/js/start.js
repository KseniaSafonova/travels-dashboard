let preview; 
let avatarUrl;

let users = [];

// function previewFile() {
//     preview = document.querySelector('#avatarPreview');
//     let file = document.querySelector('input[type=file]').files[0];
//     let reader  = new FileReader();
  
//     reader.onloadend = function () {
//       preview.src = reader.result;
//     }

//     if (file) {
//       reader.readAsDataURL(file);

//     } else {
//       preview.src = "";
//     }
// }

function checkPass(pass) {
  document.getElementById('passInfo').innerHTML = (pass.value == document.getElementById('signUp__form__password').value) ?  `<span class='accepted'>Password accepted</span>` : `<span class='error'>Password mismatch</span>`;
}

function validateEmail(mail){
  let mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (mail.value.match(mailFormat) && mail.value != null) {
      if(document.getElementById('passErr') != null) {
          document.getElementById('passErr').innerHTML = '<p></p>';
      }
      return true;
  } else {
      if(document.getElementById('passErr') != null) {
        document.getElementById('passErr').innerHTML = '<p></p>';
      }
      let passErr = document.createElement('p');
          passErr.id = 'passErr';
          passErr.innerText = 'Sorry, your password is incorrect';
          passErr.classList.add('error');
          mail.after(passErr);
  }
}

function validatePass(pass){
  let passFormat = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
  if (pass.value.match(passFormat) && pass.value != null) {
      if(document.getElementById('passErr') != null) {
        document.getElementById('passErr').innerHTML = '<p></p>';
    }
      return true;
  }
  else {
        if(document.getElementById('passErr') != null) {
          document.getElementById('passErr').innerHTML = '<p></p>';
      }
      let passErr = document.createElement('p');
          passErr.innerText = 'Sorry, your password is incorrect';
          passErr.classList.add('error');
          pass.after(passErr);
  }
}

function showPreview(){
  preview = document.querySelector('#avatarPreview');
  avatarUrl = document.getElementById('urlInput').value;
    if(avatarUrl != ''){
      preview.src = avatarUrl;
    } else {
      preview.src = "";
    }
}

document.addEventListener('DOMContentLoaded', function(event){

    document.getElementById('signIn__btn').addEventListener('click', function(){
      users = JSON.parse(localStorage.getItem('storedUsers'));
      for(i = 0; i < users.length; i++){
        if(users[i].email == document.getElementById('emailInput').value && users[i].password == document.getElementById('passInput').value){
          window.location.href='index.html';
        } else {
          document.getElementById('systemMsg').innerHTML = '<p class="error">Sorry, user with such info does not exist</p>';
        }
      }
    });

    document.getElementById('signUp__btn').addEventListener('click', function(event){
        let newUser = {
            email: document.getElementById('signUp__form__email').value,
            password: document.getElementById('signUp__form__password').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            avatar: avatarUrl
        }
        
        if(localStorage.getItem('storedUsers') == null){
          users = [newUser];
          localStorage.setItem('storedUsers', JSON.stringify(users));
        } else if (localStorage.getItem('storedUsers') != null){
          users = JSON.parse(localStorage.getItem('storedUsers'));
          users[users.length] = newUser;
          localStorage.removeItem('storedUsers');
          localStorage.setItem('storedUsers', JSON.stringify(users));
        }
    });
});




    

