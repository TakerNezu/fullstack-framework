import React from 'react'
import aspida from '@aspida/axios'
import api from "$aspida/$api"
import {postRes} from "$mock/api/typeDefinition";

const App: React.FC = () => {
  const client = api(aspida())
  const [admin, setAdmin] = React.useState("")
  const [posts, setPosts] = React.useState<postRes["post"]>([])

  React.useEffect(() => {
    const handler = async () => {
      await client.api.post.get()
        .then(result => {
          setPosts(result.body.post)
          console.log(posts)
        })
    }
    handler()
  }, [])

  return (
    <div className="App">
      <p>ハロー React!!</p>
      <p>{admin}</p>
      {/*<p>{posts[0].title}</p>*/}
    </div>
  )
}

export default App