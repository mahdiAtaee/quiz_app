const highScoresList = document.querySelector('#highScoreList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


highScoresList.innerHTML= 
highScores.map(score => {
    if (score.score === '400') {
        return `<li class='high-score'><i class="fas fa-crown"></i>${score.name} - ${score.score}</li>`
    }
    return `<li class='high-score'>${score.name} - ${score.score}</li>`
}).join('');

