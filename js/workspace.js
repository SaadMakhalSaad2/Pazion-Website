import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
const topicTitle = document.getElementById('topic-title');
var questionsListContainer = document.getElementById('questions-list');
var questionIframe = document.getElementById('question-iframe');
var answerIframe = document.getElementById('answer-iframe');

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
  const topicQuestions = []


  auth.onAuthStateChanged(function (user) {
    if (user) {
      const starCountRef = ref(database, 'questions/');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const allQuestions = json2array(data);
        console.log(allQuestions);
        console.log(localStorage.getItem('topic_redirect_id'))

        for (let i = 0; i < allQuestions.length; i++) {
          if (allQuestions[i].topic == localStorage.getItem('topic_redirect_id')) {
            console.log('match')
            topicQuestions.push(allQuestions[i])
          }
        }

        console.log(topicQuestions)
        topicQuestions.forEach(function (question) {
          var li = document.createElement('li');
          li.setAttribute('class','list-group-item');

          questionsListContainer.appendChild(li);

          li.innerHTML=li.innerHTML + 'Question '+ (topicQuestions.indexOf(question)+1);

        });


      });
    } else {
      return;
    }
  });


  document.getElementById("questions-list").addEventListener("click", function (e) {

    const ulList = document.getElementById("questions-list");
    const li = document.getElementsByTagName('li');
    var nodes = Array.from(ulList.children);
    let selected = -1;
    if (selected !== nodes.indexOf(e.target)) {
      selected = nodes.indexOf(e.target);
      console.log(selected);
    } else {
      console.log("Already selected");
    }


    if (e.target && e.target.nodeName == "LI") {
      e.target.classList.add('selected')
      var currentQuestionUrl = topicQuestions[selected].question_url.toString().split('preview')[0] + 'preview'
      var currentAnswerUrl = topicQuestions[selected].answerUrl.toString().split('preview')[0] + 'preview'
      console.log(currentQuestionUrl)
      console.log(currentAnswerUrl)
      document.getElementById('question-iframe').src = currentQuestionUrl;
      document.getElementById('answer-iframe').src = currentAnswerUrl;

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