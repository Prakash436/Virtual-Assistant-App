import plus from "../src/icons/icons8-plus-24.png";
import send from "../src/icons/icons8-send-24.png";

function App() {
  return (
    <div className="app">
      <div className="side-bar">
        <button className="new-chat">
        <img src={plus} className="plus-icon" alt="+"></img>
        New chat</button>
        <ul className="history">
          <li>Hey</li>
          <li>Bro</li>
        </ul>
      </div>
      <div className="main">
        <h1>ChatGPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input/>
            <img id="submit" src={send} alt="->"></img>
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
