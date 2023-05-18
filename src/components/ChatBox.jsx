import { useContext, useEffect, useState } from "react";

import SendIcon from "../assets/send.png";
import AccountIcon from "../assets/account.svg";

import GroupContext from "../contexts/GroupContext";
import LoginContext from "../contexts/LoginContext";

const ChatUser = ({ username, message }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={AccountIcon} />
        </div>
      </div>
      <div className="chat-header">
        {username}
        {/* <time className="text-xs opacity-50">12:45</time> TODO */}
      </div>
      <div className="chat-bubble">{message}</div>
      {/* <div className="chat-footer opacity-50">
        Delivered
      </div> TODO */}
    </div>
  )
}

const ChatOther = ({ username, message }) => {
  return (<div className="chat chat-end">
    <div className="chat-image avatar">
      <div className="w-10 rounded-full">
        <img src={AccountIcon} />
      </div>
    </div>
    <div className="chat-header">
      {username}
      {/* <time className="text-xs opacity-50">12:46</time> TODO */}
    </div>
    <div className="chat-bubble">{message}</div>
    {/* <div className="chat-footer opacity-50">
      Seen at 12:46
    </div> TODO */}
  </div>)
}

const SendMessageBox = () => {
  return (
    <div className="sendMessageBox w-[100%] flex border border-secondary-content bg-base-100">
        <input type="text" placeholder="Type here" className="input w-full" />
        <button className="h-12 w-12 border-l">
          <img src={SendIcon} className="h-[50%] w-[50%] m-auto" alt="sendicon" />
        </button>
      </div>
  )
}

const ChatBox = () => {

  const { activeGroupId } = useContext(GroupContext)
  const { userId } = useContext(LoginContext)
  const [chats, setChats] = useState([])

  const getAllChats = async () => {
    const res = await fetch(
      `http://localhost:5173/api/group/getAllChats/${activeGroupId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        credentials: "include",
      }
    )
    const data = await res.json();
    console.log(data);
    if (data.status == 'ok') {
      setChats(data.chats);
    } else {
      alert('Error Fetching Chats')
    }
  }

  useEffect(() => {
    getAllChats();
  }, [])

  return (
    <section className="w-full h-[100%] flex flex-col bg-base-100">
      <div className="w-[100%] h-[100%] p-8 border border-gray-500 border-solid flex flex-col justify-end">
        {
          chats && chats.map((chat, index) => {
            return (
              <div key={index}>
                {
                  chat.senderId == userId ?
                    <ChatUser username={chat.senderName} message={chat.message} />
                    :
                    <ChatOther username={chat.senderName} message={chat.message} />
                }
              </div>
            )
          }
          )
        }

        {
          chats.length == 0 &&
          <p className="text-2xl text-center font-bold text-secondary">No Chat</p>
        }
      </div>
      <SendMessageBox />
    </section>
  )
}

export default ChatBox;