import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../contexts/LoginContext';
import GroupContext from '../contexts/GroupContext';

const CreateGroup = ({ channelId }) => {
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
    if (typeRef.current.selectedIndex == 0) {
      buttonRef.current.classList.remove("loading");
      return alert("Please select the type of the group");
    }
    const res = await fetch(
      "https://student-online-community.onrender.com/api/admin/createGroup",
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
  const { activeIndex, setActiveIndex, activeGroupId, setActiveGroupId } = useContext(GroupContext)

  return (
    <section>
      <h3 className="text-neutral mb-4 text-center text-2xl font-bold bg-base-100 py-4">Groups</h3>
      <ul className="flex flex-col w-48 h-[100%]">
        {/* <li className="bg-accent px-8 py-4 text-base-100 border-b">Group 1</li> */}
        {
          groups.map((group, index) => {
            return (
              <li
                key={index}
                className={`px-8 py-4 text-accent text-center border-b cursor-pointer ${activeIndex == index ? 'bg-neutral text-base-100' : 'bg-base-100'}`}
                onClick={() => { 
                  setActiveIndex(index)
                  setActiveGroupId(group.groupId)
                }}
              >{group.name}</li>
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

        <CreateGroup channelId={channelId} />
      </ul>
    </section>
  )
}

export default GroupsTab