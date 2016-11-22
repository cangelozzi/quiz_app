var $ = jQuery
var questions = [{
  question: 'Pink Floyd is from which country?',
  choices: [' United States',
    ' Australia',
    ' England',
    ' Canada'],
  correctAnswer: 2
}, {
  question: 'Pink Floyd were founded in?',
  choices: [' 1965',
    ' 1967',
    ' 1969',
    ' 1970'],
  correctAnswer: 0
}, {
  question: 'Wish You Were Here is a tribute to what former band member?',
  choices: [' Roger Waters',
    ' Syd Barrett',
    ' Richard Wright',
    ' Bob Ezrin'],
  correctAnswer: 1
}, {
  question: 'I have become ______________',
  choices: [' Wonderfully Numb',
    ' Awfully Numb',
    ' Compulsively Numb',
    ' Comfortably Numb'],
  correctAnswer: 3
}, {
  question: 'The Dark Side of the Moon released date:?',
  choices: [' March 1973',
    ' December 1972',
    ' August 1976',
    ' May 1969'],
  correctAnswer: 0
}, {
  question: 'Pink Floyd was supposed to have a giant inflatable ____ to close their Animals concert?',
  choices: [' Pig',
    ' Dog',
    ' Sheep',
    ' Fish'],
  correctAnswer: 0
}, {
  question: 'The song Money is unique in rock music because:',
  choices: [' of its use of sound effects',
    ' it has no guitar',
    " Gilmour's tone changing every 24 bars",
    ' of the time signature'],
  correctAnswer: 3
}, {
  question: "What was Pink Floyd's first album?",
  choices: [' A Saucerful of Secrets',
    ' Darkside of the Moon',
    ' Wish You Were Here',
    ' Piper at the Gates of Dawn'],
  correctAnswer: 3
}, {
  question: 'When did Gilmour join Pink Floyd?',
  choices: [' 1973',
    ' 1969',
    ' 1964',
    ' 1967'],
  correctAnswer: 3
}, {
  question: "...A soul in tension that's learning to fly Condition grounded but determined to try.. in which album:?",
  choices: [' Animals',
    ' A Momentary Lapse of Reason',
    ' The Wall',
    ' The Final Cut'],
  correctAnswer: 1
}
]

var currentQuestion = 0
var totalScore = 0
$('.js-nextButton').hide()

$(document).ready(function () {
  $('.js-buttonStart').click(hideIntro)

  displayQuestion()

  $('.js-submitButton').click(function () {
    // First check choice was selected and if so coerce to number not a string
    var choice = $("input[type='radio']:checked").val()
    if (choice !== undefined) choice = Number(choice)
    if (choice === undefined) {
      $('.js-message').text('Nothing is checked! ....Please select an answer').show()
    } else if (choice === questions[currentQuestion - 1].correctAnswer) {
      totalScore++
      $('.js-message').text('CORRECT! ....' + totalScore + ' question/s correct, out of ' + questions.length).show()
      $('.js-nextButton').show()
      $('.js-submitButton').hide()
    } else {
      $('.js-message').text('WRONG! ....' + totalScore + ' question/s correct, out of ' + questions.length + ' ....Correct answer is: ' + questions[currentQuestion - 1].choices[questions[currentQuestion - 1].correctAnswer]).show()
      $('.js-nextButton').show()
      $('.js-submitButton').hide()
    }
  })
  $('.js-nextButton').click(function () {
    currentQuestion++
    $('.js-submitButton').show()
    $('.js-nextButton').hide()
    if (currentQuestion <= questions.length) {
      $('.js-message').hide()
      displayQuestion()
    } else {
      $('.js-question').hide()
      $('.js-answersList').hide()
      $('.js-submitButton').hide()
      $('.js-message').text('Your TOTAL SCORE is: ' + totalScore + ' out of ' + questions.length).show()
      $('.finalPage').show(1000)
    }
  })
  $('.js-buttonStartAgain').click(function () {
    $('.finalPage').hide()
    $('.js-message').hide()
    $('.js-startQuiz').show()
    currentQuestion = 0
    totalScore = 0
    $('.js-buttonStart').click(function () {
      $('.js-startQuiz').hide()
      $('.pageStructure').show(1000)
    })
    hideIntro()
    displayQuestion()
  })
})

function hideIntro () {
  $('.js-startQuiz').hide()
  $('.pageStructure').show(1000)
}

function displayQuestion () {
  $('.js-question, .js-answersList, .js-submitButton').show()
  if (!currentQuestion) currentQuestion = 1
  var question = currentQuestion + ' out of ' + questions.length + ': ' +
  questions[currentQuestion - 1].question
  var questionDiv = $('.pageStructure > .js-question')
  var choiceListDiv = $('.pageStructure > .js-answersList')
  var numChoices = questions[currentQuestion - 1].choices.length
  $(questionDiv).text(question)
  $(choiceListDiv).find('li').remove()
  var choice
  for (var i = 0; i < numChoices; i++) {
    choice = questions[currentQuestion - 1].choices[i]
    $('<li><input type="radio" value=' + i + ' name="answerRadio" />' + choice + '</li>').appendTo(choiceListDiv)
  }
}

/*
  var totalScore = 0
  var rightAnswers = ["c", "a", "b", "d", "a", "a", "d", "d", "d", "a"]

  $("#a1").click(function(){
    if ($("input:checked").val() === rightAnswers[0]) {
      totalScore ++
      $("#question1").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
       $("#question1").remove()
       $("#question2").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question1").empty()
                     .html("WRONG! ... Pink Floyd are from England..." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question1").remove()
        $("#question2").show(1000);})
    }
  })

 $("#a2").click(function(){
    if ($("input:checked").val() === rightAnswers[1]) {
     totalScore ++
    $("#question2").empty()
                   .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                   .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question2").remove()
        $("#question3").show(1000);})
    } else if (!$("input:checked").val()) {
             alert('Nothing is checked!')
    } else {
            $("#question2").empty()
                           .html("WRONG! ....Pink Floyd were founded in 1965..."  + totalScore + " question/s correct, out of " + rightAnswers.length)
                           .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question2").remove()
        $("#question3").show(1000);})
    }
  })

$("#a3").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[2]) {
      totalScore ++
      $("#question3").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question3").remove()
        $("#question4").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question3").empty()
                     .html("WRONG! ....Wish You Were Here is a tribute to Syd Barrett...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question3").remove()
        $("#question4").show(1000);})
    }
  })

  $("#a4").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[3]) {
      totalScore ++
      $("#question4").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question4").remove()
        $("#question5").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question4").empty()
                     .html("WRONG! ....I have become Comfortably Numb...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question4").remove()
        $("#question5").show(1000);})
    }
  })

  $("#a5").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[4]) {
      totalScore ++
      $("#question5").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question5").remove()
        $("#question6").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question5").empty()
                     .html("WRONG! ....The Dark Side of the Moon released in March 1973...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question5").remove()
        $("#question6").show(1000);})
    }
  })

$("#a6").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[5]) {
      totalScore ++
      $("#question6").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question6").remove()
        $("#question7").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question6").empty()
                     .html("WRONG! ....Pink Floyd was supposed to have a giant inflatable Pig..." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question6").remove()
        $("#question7").show(1000);})
    }
})

$("#a7").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[6]) {
      totalScore ++
      $("#question7").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question7").remove()
        $("#question8").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question7").empty()
                     .html("WRONG! ....\'Money\' is noted for its unusual 7/4–4/4 time signature..." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question7").remove()
        $("#question8").show(1000);})
    }
})

  $("#a8").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[7]) {
      totalScore ++
      $("#question8").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question8").remove()
        $("#question9").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question8").empty()
                     .html("WRONG! ....Pink Floyd's first album is Piper at the Gates of Dawn ..." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question8").remove()
        $("#question9").show(1000);})
    }
  })

  $("#a9").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[8]) {
      totalScore ++
      $("#question9").empty()
                     .html("CORRECT! ...." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question9").remove()
        $("#question10").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question9").empty()
                     .html("WRONG! ....David Gilmour joined Pink Floyd in 1967..." + totalScore + " question/s correct, out of " + rightAnswers.length)
                     .append('<button id="nextButton">Next Question</button>')
      $('#nextButton').click(function() {
        $("#question9").remove()
        $("#question10").show(1000);})
    }
  })

  $("#a10").click(function(){
    var thisanswer = $("input:checked").val()
    if (thisanswer === rightAnswers[9]) {
      totalScore ++
      $("#question10").empty()
                     .html("CORRECT! ... your TOTAL SCORE is" + totalScore + " out of " + rightAnswers.length)
                     .append('<button id="nextButton">Go to Final Page</button>')
      $('#nextButton').click(function() {
        $("#question10").remove()
        $("#finalPage").show(1000);})
    } else if (!$("input:checked").val()) {
       alert('Nothing is checked!')
    } else {
      $("#question10").empty()
                     .html("WRONG! ....A Momentary Lapse of Reason...your TOTAL SCORE is" + totalScore + " out of " + rightAnswers.length)
                     .append('<button id="nextButton">Go to Final Page</button>')
      $('#nextButton').click(function() {
        $("#question10").remove()
        $("#finalPage").show(1000);})
    }
  })

      $(".js-buttonStartAgain").click(function(){
        $("#finalPage").remove()
        $(".js-startQuiz").show(1000)
      })

*/
