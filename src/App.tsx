import { useEffect } from 'react';
import './style.scss';
import './index.css';
import { motion } from 'framer-motion';
import DynamicMenu from './DynamicMenu';
import './AlarmClock';

function App() {
  useEffect(() => {
    const interBubble = document.querySelector<HTMLDivElement>('.interactive')!;
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    return () => {
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <div className="app-container">
      <div className="gradient-bg">
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </div>
      <DynamicMenu />
      <div className="content-container">
        <div className="content-wrapper">
          <motion.h1 animate={{ scale: 1.2 }} className="name">
            Bianca Montesanti.
          </motion.h1>
          <motion.p animate={{ scale: 1.1 }} className="occupation">
            Creative Coder and Project Manager
          </motion.p>
        </div>
      </div>
    </div>
  );
}

export default App;