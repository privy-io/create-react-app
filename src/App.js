import './App.css';
import { usePrivy } from '@privy-io/react-auth';

function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* If the user is not authenticated, show a login button */}
        {/* If the user is authenticated, show the user object and a logout button */}
        {authenticated ?
          <div>
            <textarea
              value={JSON.stringify(user, null, 2)}
              style={{width: '600px', height: '250px'}}
            />
            <br />
            <button 
              onClick={logout}
              style={{marginTop: '20px'}}
            >
              Log Out
            </button>
          </div>
           :
          <button onClick={login}>Log In</button>
        }
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
