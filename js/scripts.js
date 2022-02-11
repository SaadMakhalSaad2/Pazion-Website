import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
console.log('sss')

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('sss')
  const firebaseConfig = {
    apiKey: "AIzaSyDJ9ptySym5DgJT9wnKSbYGuZ3k9av7UsA",
    authDomain: "pazion-d1b6c.firebaseapp.com",
    projectId: "pazion-d1b6c",
    storageBucket: "pazion-d1b6c.appspot.com",
    messagingSenderId: "259375163869",
    appId: "1:259375163869:web:b4627353698136bd292e34",
    measurementId: "G-KKL7LHF0B5"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  const database = getDatabase();

  auth.onAuthStateChanged(function (user) {
    if (user) {
      const starCountRef = ref(database, 'users/' + user.uid);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        document.getElementById('welcomeName').innerText = 'Hi, ' + data.first_name;
        $("#login").hide();
        $("#signup").hide();

      });
    } else {
      return;
    }
  });


  document.getElementById('logout').addEventListener('click', function () {
    signOut(auth).then(() => {
      // Sign-out successful.
      window.location.href = "login.html";
    }).catch((error) => {
      // An error happened.
    });
  });


  const dropdowns = document.getElementsByClassName('topic');

  for (let i = 0; i < dropdowns.length; i++) {
    const item = dropdowns[i]
    console.log(item);
    item.addEventListener('click', function () {
      console.log(item.id);
      localStorage.setItem('topic_redirect_id', item.id)
      localStorage.setItem('topic_redirect_title', item.innerText)

      window.location.href = "workplace.html";


    })
  }















});