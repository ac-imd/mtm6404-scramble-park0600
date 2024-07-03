/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle(src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
// 1. An array of words must be created. The words should not include spaces or special characters. There must be at least 10 words in the array.

const words = [
  'horse', 'elephant', 'tiger', 'giraffe', 'monkey', 'rabbit', 'dolphin', 'whale', 'kangaroo', 'penguin', 'zebra', 'squirrel'
]

// Create a copy of the words array to track remaining words
let wordsCopy = words.slice();

const root = ReactDOM.createRoot(document.getElementById('root'))


function App() {
  //score state to track and initialize from local storage
  const [score, setScore] = React.useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  //strikes state and initialize from local storage
  const [strikes, setStrikes] = React.useState(() => {
    const savedStrikes = localStorage.getItem('strikes');
    return savedStrikes ? parseInt(savedStrikes, 10) : 0;
  });

  //passes state and initialize from local storage
  const [passes, setPasses] = React.useState(() => {
    const savedPasses = localStorage.getItem('passes');
    return savedPasses ? parseInt(savedPasses, 10) : 3;
  });

  //Current state of scrambled word
  const [quizWord, setQuizWord] = React.useState('');

  //Input answer word state
  const [answerWord, setAnswerWord] = React.useState('');

  //Response message state
  const [responseMessage, setResponseMessage] = React.useState('');

  //Game over state
  const [gameOver, setGameOver] = React.useState(false);


  //Function for shuffled word
  const shuffleWord = (word) => {
    const arr = word.split('')
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.join('')
  }

  //Game starts with random words' character
  const gameStart = () => {
  if (wordsCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * wordsCopy.length);
    const newWord = wordsCopy.splice(randomIndex, 1)[0]; // Remove the word from the array
    setQuizWord(shuffle(newWord));
    setAnswerWord(newWord);
  } else {
    checkGameEnd();
  }
}

  //Call initial state when game starts
  React.useEffect(() => {
    gameStart();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const guess = e.target.elements.guess.value.trim().toLowerCase()
    e.target.elements.guess.value = ''

    //Check the answer with input data
    const answerWord = words.find((word) => {
      return guess === word.toLowerCase()
    })
  
    if (guess === answerWord) {
      // Correct guess
      setScore((prevScore) => {
        const newScore = prevScore + 1
        updateScore(newScore)
        return newScore
      })
      setResponseMessage('Good job! Next Word')
      gameStart(); // Get a new scrambled word
    } else {
      // Incorrect guess
      setStrikes((prevStrikes) => {
        const newStrikes = prevStrikes + 1;
        updateStrikes(newStrikes);
        return newStrikes;
      })
      setResponseMessage('Please try again')
    }
  }

  //Passes function
  const handlePass = () => {
    if (passes > 0) {
      gameStart()
      setPasses((prevPasses) => {
        const newPasses = prevPasses - 1;
        updatePasses(newPasses);
        return newPasses;
      })
    }
  }

  //root layout
  return (
    <div className="game-container">
      <h1>Welcome to Scramble.</h1>
      <div className="scoreboard">
        <p className="points">Points: {score}</p>
        <p className="strikes">Strikes: {strikes}</p>
      </div>
      <div className="response">
        <p>{responseMessage}</p>
      </div>
      <div className="quiz-word">
        <p className="quiz-word">{quizWord}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="guess" placeholder="Type the word you guessed here" />
        <button type="submit">Submit</button>
      </form>
      <div className="passes">
        <button onClick={handlePass} disabled={passes === 0}>Passes remaining: <span style={{ color: 'yellow' }}>{passes}</span></button>
      </div>
    </div>
  )
}

root.render(<App />)
