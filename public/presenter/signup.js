import {createUserWithEmailAndPassword, getAuth} from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js'

const auth = getAuth();
const button = document.querySelector("button");
button?.addEventListener("click", clickEvent => {

    let email = document.getElementById("username").value;
    let password= document.getElementById("password").value;
    let confirm = document.getElementById("confirmation").value;

    if (password == confirm)
    {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // created account successfully
                const user = userCredentials.user;

            }).catch((error) => {
                //do something here with error
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }
    else
    {
        alert("Passwords don't match");
    }
});