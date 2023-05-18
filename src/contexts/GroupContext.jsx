import { createContext } from 'react';

const GroupContext = createContext({
  activeIndex: 0,
  setActiveIndex: () => {},
  activeGroupId: '',
  setActiveGroupId: () => {},
});

export default GroupContext;