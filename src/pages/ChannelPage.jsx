import Navbar from '../components/Navbar';
import Channels from '../components/Channels';
import Footer from '../components/Footer';

import { useContext } from 'react';
import LoginContext from '../contexts/LoginContext';

const ChannelPage = () => {
  let { isLogin } = useContext(LoginContext);

  isLogin = true;
  
  return (
    !isLogin ? 
    <>
      <Navbar />
      <section className="p-16">
        <h1 className="text-4xl font-bold text-secondary text-center">
          Sorry!! But you are not logged in.
        </h1>
      </section>
    </> :
    <>
      <Navbar />
      <section className="p-16">
        <h1 className="text-4xl font-bold text-secondary">
          All Channels
        </h1>
        <Channels />
      </section>
      <Footer />
    </>
  );
};

export default ChannelPage;
