import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";

import LoginContext from "../contexts/LoginContext";
import AccountIcon from "../assets/account.svg";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import SendIcon from "../assets/send.png";

const CreateGroup = ({channelId}) => {
  const groupIdRef = useRef(null);
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const groupId = groupIdRef.current.value;
    const name = nameRef.current.value;
    const type = typeRef.current.value;

    console.log(type);
    
    buttonRef.current.classList.add("loading");

    if (!groupId || !name || !type) {
      buttonRef.current.classList.remove("loading");
      return alert("Please enter all the fields");
    }
    if(typeRef.current.selectedIndex == 0) {
      buttonRef.current.classList.remove("loading");
      return alert("Please select the type of the group");
    }
    const res = await fetch(
      "https://student-online-community-backend-omega.vercel.app/api/admin/createGroup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
          groupId: groupId,
          name: name,
          type: type,
          channelId: channelId
        }),
        credentials: "include",

      })
    const data = await res.json();
    buttonRef.current.classList.remove("loading");
    if (res.status === 201) {
      alert("Group Created Successfully");
      groupIdRef.current.value = "";
      nameRef.current.value = "";
      typeRef.current.selectedIndex = 0;

      navigate(0);
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle overflow-hidden">
        <div className="modal-box overflow-hidden max-w-sm w-fit">
          <h2 className='text-secondary text-2xl font-bold'>New Group Details</h2>

          <div className="form-control w-fit mx-0">
            <label className="label w-fit">
              <span className="label-text w-fit">Group Id</span>
            </label>
            <input type="text" placeholder="Enter the channel id" className="input input-bordered w-full max-w-xs" ref={groupIdRef} />
          </div>

          <div className="form-control w-fit">
            <label className="label w-fit">
              <span className="label-text w-fit">Name</span>
            </label>
            <input type="text" placeholder="Type here the channel name" className="input input-bordered w-full max-w-xs" ref={nameRef} />
          </div>

          <div className="form-control w-fit">
            <select className="select select-bordered w-full max-w-xs mt-4" ref={typeRef}>
              <option value="Select the type">Select the type </option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
          </div>

          <div className="form-control mt-6 w-fit">
            <button className="btn btn-secondary px-8" ref={buttonRef} onClick={handleButtonClick}>Create Channel</button>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-3" className="btn">Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

const GroupsTab = ({ groups, channelId }) => {
  const { role } = useContext(LoginContext);

  return (
    <section>
      <h3 className="text-neutral mb-4 text-center text-2xl font-bold bg-base-100 py-4">Groups</h3>
      <ul className="flex flex-col w-48 h-[100%]">
        {/* <li className="bg-accent px-8 py-4 text-base-100 border-b">Group 1</li> */}
        {
          groups.map((group, index) => {
            return (
              <li key={index} className="bg-base-100 px-8 py-4 text-accent text-center border-b">{group.name}</li>
            )
          })
        }

        {
          role === "admin" ? (
            <li className="bg-accent px-8 py-4 text-base-100 border-b">
              <label htmlFor="my-modal-3" className="btn" >Create Group</label>
            </li>
          ) : null
        }

        <CreateGroup channelId={channelId}/>
      </ul>
    </section>
  )
}

const ChatBox = () => {
  return (
    <section className="w-full h-[100%] flex flex-col bg-base-100">
      <div className="w-[100%] h-[100%] p-8 border border-gray-500 border-solid flex flex-col justify-end">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={AccountIcon} />
            </div>
          </div>
          <div className="chat-header">
            Pranay Raj
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">Hey There!!</div>
          <div className="chat-footer opacity-50">
            Delivered
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={AccountIcon} />
            </div>
          </div>
          <div className="chat-header">
            Rizul
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">Hi!! Pranay</div>
          <div className="chat-footer opacity-50">
            Seen at 12:46
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={AccountIcon} />
            </div>
          </div>
          <div className="chat-header">
            Rizul
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">Would you like to paripicipate in a hackathon with me ?</div>
          <div className="chat-footer opacity-50">
            Seen at 12:46
          </div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img src={AccountIcon} />
            </div>
          </div>
          <div className="chat-header">
            Pranay
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">Sure</div>
          <div className="chat-footer opacity-50">
            Delivered
          </div>
        </div>
      </div>
      <div className="sendMessageBox w-[100%] flex border border-secondary-content bg-base-100">
        <input type="text" placeholder="Type here" className="input w-full" />
        <button className="h-12 w-12 border-l">
          <img src={SendIcon} className="h-[50%] w-[50%] m-auto" alt="sendicon" />
        </button>
      </div>
    </section>
  )
}

const UsersTab = ({ users }) => {
  return (
    <section>
      <h3 className="text-neutral bg-base-100 py-4 mb-4 text-center text-2xl font-bold">Users</h3>
      <ul className="flex flex-col w-32">
        {/* <li className="bg-base-100 px-4 py-4 text-neutral border-b h-auto">User 1</li> */}
        {
          users.map((user, index) => {
            return (
              <li key={index} className="bg-base-100 py-4 text-accent w-full text-center border-b">{user.name}</li>
            )
          })
        }
      </ul>
    </section>
  )
}

const ChannelDashboard = () => {
  const { channelId } = useParams();
  const { isLogin } = useContext(LoginContext);

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllGroups = async () => {
    const res = await fetch(
      `https://student-online-community-backend-omega.vercel.app/api/channels/getAllGroups/${channelId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        credentials: "include",
      }
    );
    const data = await res.json();

    if (data.error) {
      console.log(data.error);
      return;
    }

    setGroups(data);
  }

  const getAllUsersOfAChannel = async () => {
    const res = await fetch(
      `https://student-online-community-backend-omega.vercel.app/api/channels/getUsersOfChannel/${channelId}`,
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

    if (data.error) {
      console.log(data.error);
      return;
    }

    setUsers(data.users);
  }

  useEffect(() => {
    getAllGroups()
  }, [])

  useEffect(() => {
    getAllUsersOfAChannel()
  }, [])

  return (
    <>
      <Navbar />
      {
        isLogin ? (
          <div className="p-16 min-h-screen bg-primary">
            <h1 className="text-4xl text-secondary font-bold">Channel Dashboard</h1>
            <div className="h-[90vh] my-16 mx-auto flex flex-row gap-6">
              <GroupsTab groups={groups} channelId={channelId}/>
              {
                groups.length > 0 ? (
                  <ChatBox groups={groups} />
                ) : (
                  <div className="w-full h-full flex justify-center items-center">
                    <h1 className="text-4xl text-secondary font-bold">No Groups</h1>
                  </div>
                )
              }
              <UsersTab users={users} />
            </div>
          </div>
        ) : (
          <div className="p-16 min-h-[70vh]">
            <h1 className="text-4xl text-secondary font-bold text-center">Not Logged In</h1>
          </div>
        )
      }
      <Footer />

    </>
  );
}

export default ChannelDashboard;