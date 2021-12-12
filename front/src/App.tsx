import React from 'react'
import axios from 'axios'

const App: React.FC = () => {
  let admin: string
  axios.get('/api')
    .then(result => admin = result.data.admin)
    .catch(err => console.log(err))
  axios.get('/api/post')

  return (
    <div className="App">
      <p>ハロー React!!</p>
      <p>{admin}</p>
    </div>
  )
}

export default App