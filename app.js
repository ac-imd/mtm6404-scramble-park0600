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
  return (
    <div className = "game-container">
      <h1>Welcome to Scramble Game</h1>
      <div className = "scoreboard-container">
        <div className = "scoreboard">
          <p>Score: </p>
          <p>Strikes: </p>
        </div>
      </div>
      <div className = "quiz-word">
        <div><p>Quiz Word</p></div>
      </div>
      <div className = "response-message">
        <div>
          <p>Response Message</p>
        </div>
      </div>
      <form>
          <input type="text" name="guess" placeholder="Type your guess word." />
          <button type="submit">Submit</button>
      </form>
      <div className = "remaining-passes">
        <button>Remaining Passes: </button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));