import { createContext } from "react";

const ChannelContext = createContext({
  channels : [
    {
      id: 'abcd1234',
      name: 'CU',
      description: 'Chandigarh University',
      imageUrl: 'https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png',
    },
    {
      id: 'abcd1235',
      name: 'CU',
      description: 'Chandigarh University',
      imageUrl: 'https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png',
    },
    {
      id: 'abcd1236',
      name: 'CU',
      description: 'Chandigarh University',
      imageUrl: 'https://www.logodesign.net/logo-new/building-on-crescent-4303ld.png',
    }
  ],
  setChannels : (channels) => {},
});

export default ChannelContext;