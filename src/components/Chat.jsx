import queryString from "query-string";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
let socket;

export default function Chat({ location }) {
  const [userData, setUserData] = useState({
    nick: "",
    room: "",
  });
  const [messages, setMessages] = useState({
    allMessages: [],
    newMessage: ""
  })
  const ENDPOINT = "localhost:5000";


  useEffect(() => {
    const { nick, room } = queryString.parse(location.search);
    setUserData({ nick: nick, room: room });

    socket = io(ENDPOINT);
    socket.emit("join", { nick, room }, ({ callbackData }) => {
      console.log(callbackData);
    });

    console.log(socket);

    // unmount
    return () => {
        // socket.emit('disconnect')
        socket.off()
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(s => ({...s, allMessages: [...s.allMessages, message]}))
    })
  },[messages])

  const sendMessage = (message) => {
    if(message) {
      setMessages(s => ({...s, allMessages: [...s.allMessages, message]}))
        socket.emit('sendMessage', message, () => setMessages(s => ({...s, newMessage: ""})))
    }
  }

  return (
      <>
<div>
  <input value={messages.newMessage}
  onChange={(e) => setMessages(s =>  ({...s, newMessage: e.target.value }))}
  onKeyPress={(e) => e.key === "Enter"   ?sendMessage(messages.newMessage) : null  }
  >
  </input>
</div>

      </>
      )

}
