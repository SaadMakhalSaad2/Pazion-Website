import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";

document.addEventListener("DOMContentLoaded", function (event) {
   const subjectDropdown = document.getElementById('subjectDropdown')
   const topicDropdown = document.getElementById('topicDropdown')
   const questionUrl = document.getElementById('questionUrl')
   const answerUrl = document.getElementById('answerUrl')


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
   const database = getDatabase();

   document.getElementById('submitQuestion').addEventListener('click', function () {
      if (subjectDropdown.selectedIndex < 1) {
         alert('Choose subject')
         return
      }
      if (topicDropdown.selectedIndex < 1) {
         alert('Choose topic')
         return
      }
      if (questionUrl.value < 5) {
         alert('Invalid question url')
         return
      }
      if (answerUrl.value < 5) {
         alert('Invalid answer url')
         return
      }


      const questionId = `${subjectDropdown.value.toString()}_${topicDropdown.value.toString().split('_')[0]}_${Date.now().toString()}`
      console.log(questionId)
      set(ref(database, 'questions/' + questionId), {
         id: questionId,
         subject: subjectDropdown.value.toString(),
         topic: topicDropdown.value.toString(),
         date_uploaded: Date.now().toString(),
         question_url: questionUrl.value,
         answerUrl: answerUrl.value
      }).then(() => {
         window.location.href = 'index.html';
      });


   });

});

