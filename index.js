import { createUserWithEmailAndPassword as signUp, signInWithEmailAndPassword as singIn, signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { ref, set} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

import { app, auth, db } from './firebase.js'
//console.log(app)

$(document).ready(() => {

    $(function () {
        $("#signup-DOB").datepicker();
    })

    $('#signup-form').hide()

    $('.message a').click(()=>{
        $('form').animate({
            height: "toggle",
            opacity: "toggle" 
        }, "slow")
    })

    let emailPattern = /^[a-zA-Z0-9.#^_-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
    let passwordPattern = /\S{8,20}/


    $('.email').on('change', function () {
        const email = $(this).val()
        if (!emailPattern.test(email)) {
            $(this).addClass("is-invalid")
        }
    })

    $('.email').on('keydown', function () {
        $(this).removeClass("is-invalid")
    })

    $('.pwd').on('change', function () {
        const password = $(this).val()
        if (!passwordPattern.test(password)) {
            $(this).addClass("is-invalid")
        }
    })

    $('.pwd').on('keydown', function () {
        $(this).removeClass("is-invalid")
    })

    $('#signup-btn').on('click', e => {
        e.preventDefault()

        const email = $('#signup-email').val()
        const password = $('#signup-pwd').val()
        const name = $('#signup-name').val()
        const DOB = $('#signup-DOB').val()

        signUp(auth, email, password)
            .then(userCredential => {
                const userId = userCredential.user.uid;
                //page jump
                return {
                    userId: userId,
                    data: {
                        name: name,
                        DOB: DOB
                    }
                }
            }).then((data) => {
                //console.log(data)
                set(ref(db, 'users/' + data.userId), data.data)
                $('form').animate({
                    height: "toggle",
                    opacity: "toggle" 
                }, "slow")            
            }).catch(error => {
                const errorcode = error.code
                const errorMessage = error.message
                //handle error
            })
    })

    $('#login-btn').on('click', e => {
        e.preventDefault()

        const email = $('#login-email').val()
        const password = $('#login-pwd').val()

        singIn(auth, email, password)
            .then((userCredential) => {
                const userId = userCredential.user.uid;
                localStorage.setItem("userId", userId)
                window.location.href = "countdown.html"
            }).catch((error) => {
                console.error(error);
            });
    })
})