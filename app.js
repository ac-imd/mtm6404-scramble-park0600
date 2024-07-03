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
const words = ['turtle', 'dolphin', 'whale', 'penguin', 'panda', 'cat', 'dog', 'elephant', 'rabbit', 'squirrel']

//Make a copy word array to track remaining words
let wordsCopy = words.slice()

const App = () => {

  //Track the score
  const [score, setScore] = React.useState(() => {
    const savedScore = localStorage.getItem('score')
    return savedScore ? parseInt(savedScore, 10) : 0
  })

  //Track the strikes
  const [strikes, setStrikes] = React.useState(() => {
    const savedStrikes = localStorage.getItem('strikes')
    return savedStrikes ? parseInt(savedStrikes, 10) : 0
  })
  
  //Track the passes
  const [passes, setPasses] = React.useState(() => {
    const savedPasses = localStorage.getItem('passes')
    return savedPasses ? parseInt(savedPasses, 10) : 3
  })


  const [quizWord, setQuizWord] = React.useState('')
  const [answerWord, setAnswerWord] = React.useState('')
  const [responseMessage, setResponseMessage] = React.useState('')
  const [gameOver, setGameOver] = React.useState(false)

  //Load game from local storage
const gameStart = () => {
  if (wordsCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * wordsCopy.length)
    const newWord = wordsCopy.splice(randomIndex, 1)[0]
    setQuizWord(shuffle(newWord))
  }else{
    checkGameEnd()
  }
}

const checkGameEnd = () => {
  if (wordsCopy.length === 0 || strikes >= 3) {
    setResponseMessage('Game Over!')
    setGameOver(true)
  }
}

  // React.useEffect(() => {
  //   const storedScore = localStorage.getItem('scrambleScore')
  //   const storedStrikes = localStorage.getItem('scrambleStrikes')
  //   const storedPasses = localStorage.getItem('scramblePasses')

  // if (storedScore) {
  //   setScore(parseInt(storedScore))
  // }
  // if (storedStrikes) {
  //   setStrikes(parseInt(storedStrikes))
  // }
  // if (storedPasses) {
  //   setPasses(parseInt(storedPasses))
  // }

  // gameStart()
  // }, [])

  // const gameStart = () => {}

  //Handler for guess, pass, reset
  const submitHandler = (e) => {
    e.preventDefault()
    const guess = e.target.elements.guess.value.trim().toLowerCase()
    e.target.elements.guess.value = ''

    if (guess === answerWord.toLowerCase()) {
      //correct answer
      setScore((prevScore) => {
        const newScore = prevScore + 1
        localStorage.setItem('score', newScore)
        return newScore
      })
      setResponseMessage('Good job! Next Quiz')
      gameStart()
    }else{
      //incorrect answer
      setStrikes((prevStrices) => {
        const newStrikes = prevStrikes + 1
        localStorage.setItem('strikes', newStrikes)
        return newStrikes
      })
      setReponseMessage('Please try again')
    }
  }
  
  const passHandler =() => {
    if (passes > 0) {
      gameStart()
      setPasses((prevPasses) => {
        const newPasses = prevPasses - 1
        localStorage.setItem('passes', newPasses)
        return newPasses
      })
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

  React.useEffect(() => {
    gameStart()
  }, [])


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