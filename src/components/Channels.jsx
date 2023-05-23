import { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ChannelContext from '../contexts/ChannelContext';
import LoginContext from '../contexts/LoginContext';

const CreateChannel = () => {
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const urlRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();

  const handleButtonClick = async (e) => {
    e.preventDefault();
    buttonRef.current.classList.add('loading');
    const id = idRef.current.value;
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const url = urlRef.current.value;

    if (!id || !name || !description || !url) {
      alert('Please fill all the fields');
      buttonRef.current.classList.remove('loading');
      return;
    }
    const res = await fetch(
      'https://student-online-community.onrender.com/api/admin/createChannel',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
          channelId: id,
          name: name,
          description: description,
          imageUrl: url
        }),
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log(data, res);
    buttonRef.current.classList.remove('loading');
    if (res.status === 201) {
      alert('Channel Created Successfully');
      idRef.current.value = '';
      nameRef.current.value = '';
      descriptionRef.current.value = '';
      urlRef.current.value = '';

      navigate(0)
    } else {
      alert('Invalid Credentials');
    }
  }

  return (
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle overflow-hidden">
        <div className="modal-box overflow-hidden max-w-sm w-fit">
          <h2 className='text-secondary text-2xl font-bold'>New Channel Details</h2>

          <div className="form-control w-fit mx-0">
            <label className="label w-fit">
              <span className="label-text w-fit">Channel Id</span>
            </label>
            <input type="text" placeholder="Enter the channel id" className="input input-bordered w-full max-w-xs" ref={idRef}/>
          </div>

          <div className="form-control w-fit">
            <label className="label w-fit">
              <span className="label-text w-fit">Name</span>
            </label>
            <input type="text" placeholder="Type here the channel name" className="input input-bordered w-full max-w-xs" ref={nameRef}/>
          </div>

          <div className="form-control w-fit">
            <label className="label w-fit">
              <span className="label-text w-fit">Description</span>
            </label>
            <input type="text" placeholder="Here goes you channel description" className="input input-bordered w-full max-w-xs" ref={descriptionRef}/>
          </div>

          <div className="form-control w-fit">
            <label className="label w-fit">
              <span className="label-text w-fit">Image Url</span>
            </label>
            <input type="text" placeholder="Enter the Image Url" className="input input-bordered w-full max-w-xs" ref={urlRef}/>
          </div>

          <div className="form-control mt-6 w-fit">
            <button className="btn btn-secondary px-8" ref={buttonRef} onClick={handleButtonClick}>Create Channel</button>
          </div>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">Close</label>
          </div>
        </div>
      </div>
    </>
  )
}

const Channels = () => {
  const { role } = useContext(LoginContext);
  const { channels, setChannels } = useContext(ChannelContext);

  const [channelsId, setChannelsId] = useState([]);
  const [channelsData, setChannelsData] = useState([]);

  const [isInChannelList, setIsInChannelList] = useState({});

  const navigate = useNavigate();

  const fetchChannelsId = useCallback(async () => {
    const response = await fetch(
      'https://student-online-community.onrender.com/api/channels/getAllChannels',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        credentials: 'include',
      }
    )

    const data = await response.json();
    console.log(data);
    channelsId.sort()
    setChannelsId(data.channelsId);
  }, [])

  const fetchChannelsData = useCallback(async () => {
    channelsId.forEach(async (channelId) => {
      const response = await fetch(
        `https://student-online-community.onrender.com/api/channels/getChannelById/${channelId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          },
          credentials: 'include',
        }
      )

      const data = await response.json();
      setChannelsData((channelsData) => [...channelsData, data.channel]);
    })
  }, [channelsId])

  const isUserInChannel = useCallback(async (channelId) => {
    if (role === 'admin') return {
      [channelId]: true
    };
    if (role === 'user') {
      const res = await fetch(
        `https://student-online-community.onrender.com/api/users/isUserInChannel/${channelId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
          },
          credentials: 'include',
        })
      const data = await res.json();
      return {
        [channelId]: data.isInChannel
      };
    }
  }, [])

  const fetchIsInChannelList = useCallback(async (channelsId) => {
    setIsInChannelList([]);
    console.log(channelsId);
    channelsId.forEach(async (channelId) => {
      const isInChannel = await isUserInChannel(channelId);
      console.log(isInChannel);
      setIsInChannelList((isInChannelList) => { return { ...isInChannelList, ...isInChannel } });
    })
  }, [])

  const handleJoinChannel = useCallback(async (channel) => {
    console.log(channel)
    const res = await fetch(
      `https://student-online-community.onrender.com/api/channels/joinChannel`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'true'
        },
        body: JSON.stringify({
          channelId: channel.channelId
        }),
        credentials: 'include',
      })
    const data = await res.json();
    console.log(data);
    if (data.message == 'User joined the channel') {
      await fetchIsInChannelList(channelsId);
      navigate(`/channelDashboard/${channel.channelId}`);
    }
  }, [])

  useEffect(() => {
    fetchChannelsId();
  }, [])

  useEffect(() => {
    const fun = async () => {
      await fetchChannelsData();
      await fetchIsInChannelList(channelsId);
    }
    fun();
  }, [channelsId])

  useEffect(() => {
    setChannels(channelsData);
  }, [channelsData])

  return (
    <div className="py-16">
      {channels ? (
        <div className='flex flex-row flex-wrap gap-6 justify-between min-h-[90vh]'>
          {channels.map((channel, index) => (
            <div className="card md:w-[calc(50%-1.5em)] lg:w-[calc(33.33%-1.5em)] bg-base-100 shadow-xl border" key={index}>
              <figure>
                <img src={channel.imageUrl} alt={channel.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-secondary">
                  {channel.name}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{channel.description}</p>
                {/* <div className="card-actions justify-end">
                  <div className="badge badge-outline">Fashion</div>
                  <div className="badge badge-outline">Products</div>
                </div> */}

                {
                  isInChannelList[channel.channelId] ? (
                    <Link to={`/channelDashboard/${channel.channelId}`}>
                      <button className="btn btn-secondary">Open</button>
                    </Link>) : (
                    <button className="btn btn-secondary" onClick={(e) =>
                      handleJoinChannel(channel)
                    }>Join</button>
                  )
                }
              </div>
            </div>
          ))}

          {
            role === 'admin' ? (
              <label htmlFor="my-modal-6" className="btn btn-secondary btn-xl mx-auto mt-8">Create Channel</label>
            ) : ''
          }
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-secondary text-center">
          Sorry!! But there are no channels.
        </h1>
      )}

      <CreateChannel />
    </div>
  );
};

export default Channels;
