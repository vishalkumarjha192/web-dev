(function() {
  
  const quizQuestions = [
    { question: "What is the capital of France?", answer: "paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What color do you get when you mix red and white?", answer: "pink" },
    { question: "What is the largest planet in our Solar System?", answer: "jupiter" },
    { question: "What programming language is this quiz written in?", answer: "javascript" }
  ];

  
  function runQuiz() {
    let score = 0;
    for (let i = 0; i < quizQuestions.length; i++) {
      let userAnswer = prompt(quizQuestions[i].question);
      if (userAnswer === null) {
        alert("Quiz cancelled.");
        return;
      }
      userAnswer = userAnswer.toLowerCase().trim();
      if (userAnswer === quizQuestions[i].answer) {
        alert("Correct!");
        score++;
      } else {
        alert("Wrong! The correct answer is " + quizQuestions[i].answer + ".");
      }
    }
    alert("Quiz finished! Your final score is " + score + " out of " + quizQuestions.length + ".");
  }

  runQuiz();
})();
