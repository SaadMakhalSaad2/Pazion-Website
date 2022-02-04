function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
function navbar() {
   var database = firebase.database();
   var topic = document.getElementById("topic");
   var questionurl = document.getElementById("questionurl");
   var answerurl = document.getElementById("answerurl");
   var subject = document.getElementById("subject");
   var questionid = makeid(10),
   database.ref("question/" + "/" + questionid).set({
      questionid: questionid + "_" + topic + "_" + subject,
      topic: topic.value,
      questionurl: questionurl.value,
      answerurl: answerurl.value,
      subject: subject.value,
   });
   swal("Updated navbar values");   
}