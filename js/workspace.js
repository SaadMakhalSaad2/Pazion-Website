import { getAuth, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
const topicTitle = document.getElementById('topic-title');
document.addEventListener("DOMContentLoaded", function (event) {
  console.log('workspace screen')

topicTitle.innerHTML = localStorage.getItem('topic_redirect_title')











});