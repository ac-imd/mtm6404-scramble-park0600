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
function shuffle (src) {
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

// 2. The game should be persistent. The player's progress should be tracked throughout the game and stored in local storage.

let score = 0

// Check the localStorage if there is already a score
const savedScore = localStorage.getItem('score')
if (savedScore) {
  score = parseInt(savedScore, 10)
} else {
  localStorage.setItem('score', score.toString());
}

// Update the score in local storage
function updateScore(newScore) {
  score = newScore;``
  localStorage.setItem('score', score.toString())
}

// Create a React root
const root = ReactDOM.createRoot(document.getElementById('root'))

function App() {
  const [score, setScore] = React.useState(0)
  const [strikes, setStrikes] = React.useState(0)
  const [quizWord, setQuizWord] = React.useState('')

  //root layout
  return (
    <div className="game-container">
      <h1>Welcome to Scramble.</h1>
      <div className="scoreboard">
        <p className="points">Points: {score}</p>
        <p className="strikes">Strikes: {strikes}</p>
      </div>
      <div className="quiz-word">
        <p className="quiz-word">{quizWord}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="guess" placeholder="Type the word you guessed here" />
        <button type="submit">Submit</button>
      </form>
      <div className="passes">
        <p>Passes remaining: {passes}</p>
      </div>
    </div>
  );
}

root.render(<App />);