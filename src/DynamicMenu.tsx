import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlarmClock from './AlarmClock';
import SnakeGame from './SnakeGame';
import Calculator from './Calculator';
import AboutMe from './AboutMe';

interface MenuItem {
  label: string;
  content: React.ReactNode;
}

const buttonVariants = {
  hover: {
    scale: 1.65,
    transition: {
      duration: 0.1,
      type: 'spring',
      stiffness: 200,
      delay: 0.1,
    },
  },
  tap: {
    scale: 0.5,
  },
};

const overlayVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.01 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.01 } },
};

const DynamicMenu: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const menuItems: MenuItem[] = [

    { label: 'Bio', content: <AboutMe />},
    { label: 'Calculator', content: <Calculator /> },
    { label: 'Game', content: <SnakeGame /> },
    { label: 'Alarm', content: <AlarmClock /> },
  ];

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseOverlay = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <nav className="menu-container glass-effect">
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              style={{ position: 'relative' }}
              animate={{
                x: hoveredIndex !== null && hoveredIndex !== index ? (hoveredIndex < index ? 10 : -10) : 0,
              }}
            >
              <motion.button
                className="glass-btn"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="overlay-content glass-effect">
              {selectedItem.content}
              <button className="close-btn" onClick={handleCloseOverlay}>Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DynamicMenu;