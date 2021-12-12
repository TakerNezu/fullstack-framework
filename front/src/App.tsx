import React from 'react'
import aspida from '@aspida/axios'
import api from "$aspida/$api"
import { useAspidaQuery } from "@aspida/react-query"

const client = api(aspida())

const App: React.FC = () => {
  // Queries
  const postQuery = useAspidaQuery(client.api.post)
  const profileQuery = useAspidaQuery(client.api.profile)

  return (
    <div className="App">
      <p>ハロー React!!</p>
      <p>{profileQuery.status === 'success' ? profileQuery.data.profile.name : ''}</p>
      <p>{postQuery.status === 'success' ? postQuery.data.post[0].title : ''}</p>
    </div>
  )
}

export default App