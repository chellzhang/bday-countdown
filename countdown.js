import { signOut } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { ref, child, get } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
import { auth, db } from './firebase.js'

$(document).ready(() => {

    const dbRef = ref(db)
    const userId = localStorage.getItem('userId')

    const today = new Date()

    function countdays(bm, bd) {
        const bday = new Date(today.getFullYear(), bm - 1, bd)
        let diff
        if (today.getTime() > bday.getTime()) {
            bday.setFullYear(bday.getFullYear() + 1)
        }
        diff = bday.getTime() - today.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24))
    }

    get(child(dbRef, `users/${userId}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                console.log("No data available");
            }
        }).then(data => {
            const userName = data.name
            const birthday = data.DOB

            const bdayMonth = parseInt(birthday.substring(0, 2));
            const bdayDay = parseInt(birthday.substring(3, 5));

            if (today.getMonth() == bdayMonth - 1 && today.getDate() == bdayDay) {
                let quote
                fetch('https://type.fit/api/quotes')
                    .then(res => {
                        return res.json()
                    }).then(jsonRes => {
                        const len = jsonRes.length
                        const idx = Math.floor(Math.random() * len)
                        quote = '"' + jsonRes[idx].text + '" ---' + jsonRes[idx].author
                        $('#display').html(`Happy birthday, ${userName}!`)
                        $('#quoteDisplay').html(`${quote}`)
                    })
            } else {
                $('#display').html(`${countdays(bdayMonth, bdayDay)} days until your birthday`)
            }
        }).catch(error => {
            console.log(error)
        })


    $('#signout-btn').on('click', e => {
        e.preventDefault()

        signOut(auth).then(() => {
            window.location.href = "index.html"
        }).catch((error) => {
            console.error(error);
        });
    })
})