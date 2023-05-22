
// Declared variables
var highScore = document.querySelector("#highScore");
var clearScores = document.querySelector("#clear");
var goBacktoFrontPage = document.querySelector("#goBack");

// Event listener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// helps you retrieve the local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener to go back to index page
goBacktoFrontPage.addEventListener("click", function () {
    window.location.replace("./index.html");
});