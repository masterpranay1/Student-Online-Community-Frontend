import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";

import LoginContext from "../contexts/LoginContext";
import GroupContext from "../contexts/GroupContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GroupsTab from "../components/GroupsTab";
import ChatBox from "../components/ChatBox";


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

const getInitialActiveIndex = () => {
  const state = localStorage.getItem('active-group-index');
  return state ? JSON.parse(state) : 0
}

const getInitialActiveGroupId = () => {
  const state = localStorage.getItem('active-group-id');
  return state ? JSON.parse(state) : ''
}


const ChannelDashboard = () => {
  const { channelId } = useParams();
  const { isLogin } = useContext(LoginContext);

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(getInitialActiveIndex);
  const [activeGroupId, setActiveGroupId] = useState(getInitialActiveGroupId)

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
    console.log(data);
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

    return () => {
      localStorage.setItem('active-group-index', JSON.stringify(0))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('active-group-index', JSON.stringify(activeIndex));
  }, [activeIndex])

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
            <GroupContext.Provider value={{activeIndex, setActiveIndex, activeGroupId, setActiveGroupId}}>
              <div className="h-[90vh] my-16 mx-auto flex flex-row gap-6">
                <GroupsTab groups={groups} channelId={channelId} />
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
            </GroupContext.Provider>
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