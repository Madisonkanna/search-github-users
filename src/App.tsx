
import './App.css';
import { useState, useEffect } from "react"

interface User {
  login: string
}

function User({ user }) {
  console.log(user, 'user ooo')
  return user ? (
    <div>
      <div>{user.login}</div>
      <div>{user.bio}</div>
      <div>{user.email}</div>
      <div>{user.location}</div>
      <img src={user.avatar_url} />
    
    </div>
  ) : null 
}

function App() {
  const [userObj, setUser] = useState({
    user: {},
    username: ""
  })
  const [error, setError] = useState("")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const getUser = async () => {
        if (userObj.username) {
          const getUser = await fetch(`https://api.github.com/users/${userObj.username}
          `)
          const getUserRes = await getUser 
          console.log(getUserRes, 'get user res')
          if (getUserRes.status === 200) {
            const user = await getUserRes.json()
            setUser({
              user,
              username: userObj.username
            })

          } else if (getUserRes.status == 403) {
            setError("Prob rate limited")
          } else {
            setError("No user found.")
          }

        }

      }
      getUser()

    }, 1000)

    return () => clearTimeout(delayDebounceFn)

  }, [userObj.username])

  return (
    <div className="App">
      <header className="App-header">
      
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" 
          onChange={e => {
            setUser({
              username: e.target.value,
              user: {}
            })

          }}
        /> 
        <User user={userObj.user} />
        {error.length ? error : null}
      </header>
    </div>
  );
}

export default App;
