import {Link} from 'react-router-dom'
import { useState } from 'react';


export default function Join () {
    
  const [userData, setUserData] = useState({
    nick: "",
    room: ""
  })

    return (
        <>
        Join To Chat
        <div><input placeholder="Nick" className="input" type="text" onChange={(e) => setUserData(s=> { return ({...s, nick : e.target.value})})} /> </div>
        <div><input placeholder="Room" className="input" type="text" onChange={(e) => setUserData(s=> { return ({...s, room : e.target.value})})}/> </div>
        <Link
        onClick={event => (!userData.nick || !userData.room) ? event.preventDefault() : null}
        to={`/chat?nick=${userData.nick}&room=${userData.room}`}>
        <button className="button" type="submit"> JUMP TO ROOM </button>
        </Link>

        </>
    )
}