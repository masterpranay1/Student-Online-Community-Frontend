import { createContext } from "react";

const ChannelContext = createContext({
  channels : [],
  setChannels : (channels) => {},
});

export default ChannelContext;