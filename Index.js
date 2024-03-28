window.location.href = "signin.html";

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const option_list = document.querySelector(".option_list");
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times" aria-hidden="true"></i></div>';

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
  } else {
    console.log("Questions completed");
    showResultBox();
  }
};

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  const userAns = answer.textContent.trim();
  const correctAns = questions[que_count].answer.trim();
  const allOptions = option_list.children.length;

  if (userAns === correctAns) {
    answer.classList.add("correct");
    console.log("Answer is correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  } else {
    answer.classList.add("incorrect");
    console.log("Answer is wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);
  }

  // Disable all options after an answer is selected
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block";
}

function showQuestions(index) {
  const que_text = document.querySelector(".que_text");
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option"> ' + questions[index].options[0] + '<span></span></div>' +
    '<div class="option">' + questions[index].options[1] + '<span></span></div>' +
    '<div class="option">' + questions[index].options[2] + '<span></span></div>' +
    '<div class="option">' + questions[index].options[3] + '<span></span></div>';
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  const option = option_list.querySelectorAll(".option");
  const allOptions = option.length;

  for (let i = 0; i < allOptions; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}

function showResultBox() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");

  let score = 0;
  let resultHTML = '';

  for (let i = 0; i < questions.length; i++) {
    const option = option_list.querySelectorAll(".option")[i];
    if (option.classList.contains("correct")) {
      score++;
      resultHTML += `<div>Question ${i + 1}: Correct</div>`;
    } else {
      resultHTML += `<div>Question ${i + 1}: Incorrect. Correct answer: ${questions[i].answer}</div>`;
    }
  }

  const score_text = result_box.querySelector(".score_text");
  score_text.innerHTML = `<span>You got ${score} out of ${questions.length} correct!</span>`;
  const result_details = result_box.querySelector(".result_details");
  result_details.innerHTML = resultHTML;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);

  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
