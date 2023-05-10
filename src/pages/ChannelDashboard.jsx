import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import LoginContext from "../contexts/LoginContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
          // 'Access-Control-Allow-Origin': ''
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
          // 'Access-Control-Allow-Origin': ''
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
    console.log(groups);
  }, [groups])

  useEffect(() => {
    getAllUsersOfAChannel()
  }, [])

  useEffect(() => {
    console.log(users);
  }, [users])

  return (
    <>
      <Navbar />
      <h1>Channel Dashboard</h1>
      {
        isLogin ? (
          <div>
            Content
          </div>
        ) : (
          <div>
            <h1>Not Logged In</h1>
          </div>
        )
      }
      <Footer />

    </>
  );
}

export default ChannelDashboard;