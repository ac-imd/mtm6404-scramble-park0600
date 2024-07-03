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
function App() {
  return (
    React.createElement('div', null,
      React.createElement('h1', null, 'Scramble Game'),
      React.createElement('input', {id: 'wordInput', type: 'text', placeholder: 'Enter a word'}),
      React.createElement('button', {onClick: handleScramble}, 'Scramble'),
      React.createElement('div', null,
        React.createElement('h2', null, 'Scrambled Word'),
        React.createElement('p', {id: 'scrambledWord'})
      )
    )
  )
}