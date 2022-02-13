import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
const topicTitle = document.getElementById('topic-title');
var questionsListContainer = document.getElementById('questions-list');
var questionIframe = document.getElementById('question-iframe');
var answerIframe = document.getElementById('answer-iframe');
var attemptedAnswerDropDown = document.getElementById('attemptedAnswerDropDown');
var emptyContainer = document.getElementById('empty');
var submitAnswer = document.getElementById('submitAnswer');
var answerContainer = document.getElementById('answerContainer');
var result = document.getElementById('result');

document.addEventListener("DOMContentLoaded", function (event) {
  topicTitle.innerHTML = localStorage.getItem('topic_redirect_title')
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
  var mQuestoin = null
  var userUid = null


  auth.onAuthStateChanged(function (user) {
    if (user) {
      userUid = user.uid
      console.log(`userId: ${userUid}`)
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
          li.setAttribute('class', 'list-group-item');

          questionsListContainer.appendChild(li);

          li.innerHTML = li.innerHTML + 'Question ' + (topicQuestions.indexOf(question) + 1);

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
    var attempted = false;
    let selected = -1;
    if (selected !== nodes.indexOf(e.target)) {
      selected = nodes.indexOf(e.target);
      console.log(selected);

      emptyContainer.classList.add('d-none')
      answerContainer.classList.remove('d-none')

      mQuestoin = topicQuestions[selected]
      const reportId = userUid + '_' + mQuestoin.id
      const reportRef = ref(database, 'reports/' + reportId);
      onValue(reportRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
          console.log(`attempted questions: ${data}`)

          attempted = true
          submitAnswer.setAttribute('disabled', 'disabled')
          attemptedAnswerDropDown.setAttribute('disabled', 'disabled')
          answerIframe.classList.remove('d-none')
          result.classList.remove('d-none')
          attemptedAnswerDropDown.value = data.student_answer 
          if (data.correct == true) {
            result.innerText = 'Correct!'
            result.classList.remove('result-wrong')
            result.classList.add('result-correct')
          } else {
            result.innerText = 'Oops! Check the correct answer->'
            result.classList.remove('result-correct')
            result.classList.add('result-wrong')
          }

        } else {
          attemptedAnswerDropDown.removeAttribute('disabled')
          answerIframe.classList.add('d-none')
          result.classList.add('d-none')
          attemptedAnswerDropDown.selectedIndex = 0
          attemptedAnswerDropDown.removeAttribute('disabled')
          submitAnswer.removeAttribute('disabled')

        }
      });


    } else {
      console.log("Already selected");
    }


    if (e.target && e.target.nodeName == "LI") {
      var lis = document.getElementById("questions-list").getElementsByTagName("li");

      console.log(`Saad: ${lis[2]}`)
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.remove('selected')
      }

      e.target.classList.add('selected')
      var currentQuestionUrl = topicQuestions[selected].question_url.toString().split('preview')[0] + 'preview'
      var currentAnswerUrl = topicQuestions[selected].answerUrl.toString().split('preview')[0] + 'preview'
      console.log(currentQuestionUrl)
      console.log(currentAnswerUrl)
      document.getElementById('question-iframe').src = currentQuestionUrl;
      document.getElementById('answer-iframe').src = currentAnswerUrl;
    }
  });

  document.getElementById('submitAnswer').addEventListener('click', function () {
    if (attemptedAnswerDropDown.selectedIndex < 1) {
      alert('Please select a correct answer')
      return
    }
    if (mQuestoin == null) {
      alert('Question is not selected')
      return
    }

    var isCorrect = false

    if (attemptedAnswerDropDown.value == mQuestoin.correct_answer) {
      console.log('Correct!')
      isCorrect = true

    }


    const reportId = userUid + '_' + mQuestoin.id
    var correctAnswer = ''
    if (mQuestoin.correct_answer != null) {
      correctAnswer = mQuestoin.correct_answer.toString()
    }
    const answerReport = {
      id: reportId.toString(),
      question_id: mQuestoin.id.toString(),
      student_id: userUid.toString(),
      date_attempted: Date.now().toString(),
      correct: isCorrect,
      student_answer: attemptedAnswerDropDown.value.toString(),
      correct_answer: correctAnswer,
    };

    set(ref(database, 'reports/' + reportId), answerReport).then(() => {
      var updates = {
        questions_attempted: mQuestoin.id,
      };
      const profileRef = ref(database, 'users/' + userUid);
      update(profileRef, updates).then(() => {
        console.log('updated successfully')
        result.classList.remove('d-none')
        attemptedAnswerDropDown.setAttribute('disabled', 'disabled')
        answerIframe.classList.remove('d-none')

        console.log(mQuestoin.correct_answer)
        console.log(attemptedAnswerDropDown.value)
        if (attemptedAnswerDropDown.value == mQuestoin.correct_answer) {
          console.log('Correct!')
          result.innerText = 'Correct!'

          result.classList.remove('result-wrong')
          result.classList.add('result-correct')

        } else {
          console.log('Wrong!')
          result.innerText = 'Oops! Check the correct answer->'
          result.classList.remove('result-correct')

          result.classList.add('result-wrong')

        }
      })
        .catch((error) => {
          console.log(error)
        });



    });

  })


});

function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  return result;
}