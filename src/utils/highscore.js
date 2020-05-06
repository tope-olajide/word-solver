  const getHighScore = () => {
    const highScore = localStorage.getItem('highScore');
    if(!highScore ) {
        alert(highScore)
        return 0
    }
    return highScore
}

export const saveHighscore = (score) => {
    
    const highScore = localStorage.getItem('highScore') || 0;
    if ( score > highScore ) {
        localStorage.setItem('highScore', score);
    }
}

export default getHighScore;