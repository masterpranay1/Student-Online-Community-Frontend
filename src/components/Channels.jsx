import { useContext, useEffect, useState, useCallback } from 'react';
import ChannelContext from '../contexts/ChannelContext';

const Channels = () => {
  const { channels, setChannels } = useContext(ChannelContext);
  const [channelsId, setChannelsId] = useState([]);
  const [channelsData, setChannelsData] = useState([]);

  const fetchChannelsId = useCallback(async () => {
    const response = await fetch(
      'https://student-online-community-backend-omega.vercel.app/api/channels/getAllChannels',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': ''
        },
        credentials: 'include',
      }
    )

    const data = await response.json();
    setChannelsId(data.channelsId);
  }, [])

  const fetchChannelsData = useCallback(async () => {
    channelsId.forEach(async (channelId) => {
      const response = await fetch(
        `https://student-online-community-backend-omega.vercel.app/api/channels/getChannelById/${channelId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': ''
          },
          credentials: 'include',
        }
      )

      const data = await response.json();
      setChannelsData((channelsData) => [...channelsData, data.channel]);
    })
  }, [channelsId])

  useEffect(() => {
    fetchChannelsId();
  }, [])

  useEffect(() => {
    const fun = async () => {
      await fetchChannelsData();
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
          {channels.map((channel, id) => (
            <div className="card md:w-[calc(50%-1.5em)] lg:w-[calc(33.33%-1.5em)] bg-base-100 shadow-xl border" key={id}>
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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-secondary text-center">
          Sorry!! But there are no channels.
        </h1>
      )}
    </div>
  );
};

export default Channels;
