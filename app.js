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
const App = () => {
  const words = ['turtle', 'dolphin', 'whale', 'penguin', 'panda', 'cat', 'dog', 'elephant', 'rabbit', 'squirrel']

  const [score, setScore] = React.useState(0)
  const [strikes, setStrikes] = React.useState(0)
  const [passes, setPasses] = React.useState(3)
  const [quizWord, setQuizWord] = React.useState('')
  const [answerWord, setAnswerWord] = React.useState('0')
  const [gameOver, setGameOver] = React.useState(false)

  //Load game from local storage
  React.useEffect(() => {
    const storedScore = localStorage.getItem('scrambleScore')
    const storedStrikes = localStorage.getItem('scrambleStrikes')
    const storedPasses = localStorage.getItem('scramblePasses')

  if (storedScore) {
    setScore(parseInt(storedScore))
  }
  if (storedStrikes) {
    setStrikes(parseInt(storedStrikes))
  }
  if (storedPasses) {
    setPasses(parseInt(storedPasses))
  }

  gameStart()
  }, [])

  const gameStart = () => {}

  //Handler for guess, pass, reset
  const submitHandler = (e) => {
    e.preventDefault()
    const guess = e.target.elements.guess.value.toLowerCase().trim()

    if (guess === answerWord) {
      //correct answer
      setScore(score + 1)
      setReponseMessage('Good job! Next Quiz')
    }else{
      //incorrect answer
      setStrikes(strikes + 1)
      setReponseMessage('Please try again')
    }

    e.target.reset()
  }
  
  const passHandler =() => {
    if (passes > 0) {
      setPasses(passes - 1)
      gameStart()
    }
  }

  const resetHandler =() => {
    localStorage.clear()
    setScore(0)
    setStrikes(0)
    setPasses(3)
    setQuizWord('')
    setAnswerWord('')
    setReponseMessage('')
    setGameOver(false)
  }


  return (
    <div className = "game-container">
      <h1>Welcome to Scramble Game</h1>
      <div className = "scoreboard-container">
        <div className = "scoreboard">
          <p>Score: {score}</p>
          <p>Strikes:{strikes} </p>
        </div>
      </div>
      <div className = "quiz-word">
        <div><p>{quizWord}</p></div>
      </div>
      <div className = "response-message">
        <div>
          <p>ResponseMessage</p>
        </div>
      </div>
      <form onSubmit = {submitHandler}>
          <input type="text" name="guess" placeholder="Type your guess word." />
          <button type="submit">Submit</button>
      </form>
      <div className = "remaining-passes">
        <button>Remaining Passes: {passes}</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));