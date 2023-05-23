import { useContext, useEffect, useState, useRef } from "react";

import SendIcon from "../assets/send.png";
import AccountIcon from "../assets/account.svg";

import GroupContext from "../contexts/GroupContext";
import LoginContext from "../contexts/LoginContext";

import { io, Manager } from "socket.io-client";
const socket = io("https://student-online-community.onrender.com", {
  path: "/socket.io",
  autoConnect: false,
})

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

const SendMessageBox = ({ setIsChatsUpdated, channelId }) => {

  const { activeGroupId } = useContext(GroupContext)
  const { userId } = useContext(LoginContext)
  const [sendButtonClicked, setIsSendButtonClicked] = useState(false)

  const inputRef = useRef(null)

  const handleButtonOnClick = () => {
    if(!inputRef.current.value || sendButtonClicked) return;

    setIsSendButtonClicked(true)
    socket.emit('chat', {
      message: inputRef.current.value,
      group: activeGroupId,
      channel: channelId,
      sender: userId
    }, (data) => {

      if (data.status == 'error') {
        alert('Error Sending Message')
        return;
      } else {
        inputRef.current.value = ''
        setIsChatsUpdated(prev => !prev)
      }

      setIsSendButtonClicked(false)
    })
  }

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key == 'Enter') {
        handleButtonOnClick()
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <div className="sendMessageBox mt-auto w-[100%] flex border border-secondary-content bg-base-100">
      <input type="text" placeholder="Type here" className="input w-full" ref={inputRef} />
      <button className="h-12 w-12 border-l" onClick={handleButtonOnClick}>
        <img src={SendIcon} className="h-[50%] w-[50%] m-auto" alt="sendicon" />
      </button>
    </div>
  )
}

const ChatBox = ({ groups, channelId }) => {

  const { activeGroupId } = useContext(GroupContext)
  const { userId } = useContext(LoginContext)
  const [chats, setChats] = useState([])
  const [isChatsUpdated, setIsChatsUpdated] = useState(true)
  const chatContainer = useRef(null)

  useEffect(() => {
    chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
  }, [chats])

  const getAllChats = async () => {
    if (!activeGroupId) return;
    const res = await fetch(
      'https://student-online-community.onrender.com/api/group/getAllChats/' + activeGroupId,
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
    if (data.status == 'ok') {
      setChats(data.chats);
    } else {
      alert('Error Fetching Chats')
    }
  }

  useEffect(() => {
    getAllChats();
  }, [isChatsUpdated, activeGroupId])

  useEffect(() => {
    function onChat(data) {
      if (data.group == activeGroupId) {
        setIsChatsUpdated(prev => !prev)
      }
    }
    socket.connect()
    socket.on('chat', onChat)

    return () => {
      socket.off('chat', onChat)
      socket.disconnect()
    }
  }, [activeGroupId])

  // useEffect(() => {
  //   console.log(chats)
  // }, [chats])

  return (
    <section className="w-full flex flex-col bg-base-100">
      <div className="w-[100%] h-full flex-1 border border-gray-500 border-solid flex flex-col justify-end">
        <div ref={chatContainer} className="h-full p-8 overflow-y-auto">
        {
          chats && chats.map((chat, index) => {
            return (

              chat.sender == userId ?
                <ChatUser key={index} username={chat.senderName} message={chat.message} />
                :
                <ChatOther key={index} username={chat.senderName} message={chat.message} />

            )
          }
          )
        }

        {
          chats.length == 0 &&
          <p className="text-2xl text-center font-bold text-secondary">No Chat</p>
        }
        </div>
      </div>
      <SendMessageBox setIsChatsUpdated={setIsChatsUpdated} channelId={channelId} />
    </section>
  )
}

export default ChatBox;