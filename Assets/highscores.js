// highscores.js
// get highscores from localstorage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// sort scores so the highest score is always on top
highScores.sort((a, b) => b.score - a.score);
const highScoresList = document.getElementById("highscores-card");
// display all highscores to highscores.html
highScores.forEach((score) => {
  const listItem = document.createElement("li");
  listItem.textContent = `${score.initials}: ${score.score}`;
  highScoresList.appendChild(listItem);
});
// home button listener
const homeButton = document.getElementById("home-button");
homeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
// clear high scores button
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {
  // remove data from local storage
  localStorage.removeItem("highScores");
  // refresh page after clear button is clicked
  location.reload();
});