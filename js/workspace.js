import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
const topicTitle = document.getElementById('topic-title');
document.addEventListener("DOMContentLoaded", function (event) {
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
  const auth = getAuth();
  const database = getDatabase();


  auth.onAuthStateChanged(function (user) {
    if (user) {
      const starCountRef = ref(database, 'questions/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const allQuestions = json2array(data);
        console.log(allQuestions);
        const topicQuestions = []
        console.log(localStorage.getItem('topic_redirect_id'))

        for (let i = 0; i < allQuestions.length; i++) {
          if (allQuestions[i].topic == localStorage.getItem('topic_redirect_id')) {
            console.log('match')
            topicQuestions.push(allQuestions[i])
          }
        }

        console.log(topicQuestions)


      });
    } else {
      return;
    }
  });








});

function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  return result;
}