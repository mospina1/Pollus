import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'

const auth = getAuth();
const button = document.querySelector("button");
button?.addEventListener("click", clickEvent => {

    let email = document.getElementById("Username").value;
    let password= document.getElementById("Password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            // created account successfully
            const user = userCredentials.user;
            //idk what else to do

        }).catch((error) => {
            //do something here with error
        });

});