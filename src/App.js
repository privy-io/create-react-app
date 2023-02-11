import "./App.css";
import { usePrivy } from "@privy-io/react-auth";

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
        {authenticated ? (
          <div>
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              style={{ width: "600px", height: "250px" }}
            />
            <br />
            <button onClick={logout} style={{ marginTop: "20px" }}>
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={login}>Log In</button>
        )}
      </header>
    </div>
  );
}

export default App;
