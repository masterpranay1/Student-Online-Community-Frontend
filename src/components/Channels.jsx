import { useContext } from 'react';
import ChannelContext from '../contexts/ChannelContext';

const Channels = () => {
  const { channels } = useContext(ChannelContext);
  return (
    <div className="py-16">
      {channels ? (
        <div className='flex flex-row flex-wrap gap-6 justify-between'>
          {channels.map((channel) => (
            <div className="card md:w-[calc(50%-1.5em)] lg:w-[calc(33.33%-1.5em)] bg-base-100 shadow-xl border" key={channel.id}>
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
