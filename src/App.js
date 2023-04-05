import logo from './logo.svg';
import './App.css';
import {startNewBattle} from './battler.ts';

function App() {
  console.log("Starting App");
  const battleResult = startNewBattle();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {battleResult}
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
