import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button } from 'antd';

// Loading page
const Home = () => {
  return (
    <main>
      <div className='home-banner'>
        <div className="home-title">HobbyForum</div>
        <div className="home-desc">A community-driven forum to discuss hobbies</div>
        <div className="home-btn"><Link to="/posts"><Button size="large" shape="round">Visit Now</Button></Link></div>
        {/* background animation, credit: https://codepen.io/plavookac/pen/QMwObb */}
        <div className="waveWrapper waveAnimation">
          <div className="waveWrapperInner bgTop">
            <div className="wave waveTop" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-top.png'" }}></div>
          </div>
          <div className="waveWrapperInner bgMiddle">
            <div className="wave waveMiddle" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-mid.png'" }}></div>
          </div>
          <div className="waveWrapperInner bgBottom">
            <div className="wave waveBottom" style={{ backgroundImage: "url('http://front-end-noobs.com/jecko/img/wave-bot.png'" }}></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
