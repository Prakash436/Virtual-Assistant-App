import plus from "../src/icons/icons8-plus-24.png";
import send from "../src/icons/icons8-send-24.png";
import { useState, useEffect } from "react";

function App() {

  const [value, setValue] = useState(null)
  const [message,setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleclick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const getMessages = async() => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type":"application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8000/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log(currentTitle,value,message)
    if(!currentTitle&&value&&message){
      setCurrentTitle(value)
    }
    if(currentTitle && value && message){
      setPreviousChats(prevChats => (
        [...prevChats,
          {
            title: currentTitle,
            role: "user",
            content: value
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          }
        ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousChats)

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles)

  return (
    <div className="app">
      <div className="side-bar">
        <button onClick={createNewChat} className="new-chat">
        <img src={plus} className="plus-icon" alt="+"></img>
        New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleclick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </div>
      <div className="main">
        {!currentTitle && <h1>ChatGPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <img id="submit" onClick={getMessages} src={send} alt="->"></img>
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
