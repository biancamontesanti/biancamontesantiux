import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Operation = '+' | '-' | '*' | '/';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleNumberClick = (num: string) => {
    if (waitingForSecondOperand) {
      setDisplay(num);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperationClick = (op: Operation) => {
    if (firstOperand === null) {
      setFirstOperand(parseFloat(display));
    } else if (operation) {
      const result = calculate();
      setFirstOperand(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setWaitingForSecondOperand(true);
  };

  const calculate = (): number => {
    const secondOperand = parseFloat(display);
    if (operation === '+') return firstOperand! + secondOperand;
    if (operation === '-') return firstOperand! - secondOperand;
    if (operation === '*') return firstOperand! * secondOperand;
    if (operation === '/') return firstOperand! / secondOperand;
    return secondOperand;
  };

  const handleEqualsClick = () => {
    if (operation && firstOperand !== null) {
      const result = calculate();
      setDisplay(result.toString());
      setFirstOperand(null);
      setOperation(null);
      setWaitingForSecondOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const styles = {
    calculator: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      padding: '1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    display: {
      background: 'rgba(255, 255, 255, 0.3)',
      padding: '0.5rem',
      borderRadius: '5px',
      marginBottom: '1rem',
      textAlign: 'right' as const,
      fontSize: '1.5rem',
    },
    buttonGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '0.5rem',
    },
    button: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: 'none',
      borderRadius: '5px',
      padding: '0.5rem',
      fontSize: '1.25rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
        outline:'none'
        },
    clearButton: {
      marginTop: '0.5rem',
      width: '100%',
    },
  };

  return (
    <div style={styles.calculator}>
      <div style={styles.display}>{display}</div>
      <div style={styles.buttonGrid}>
        {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
          <motion.button
            key={btn}
            style={styles.button}
            variants={buttonVariants}
    
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              if (btn === '=') handleEqualsClick();
              else if (['+', '-', '*', '/'].includes(btn)) handleOperationClick(btn as Operation);
              else handleNumberClick(btn);
            }}
          >
            {btn}
          </motion.button>
        ))}
      </div>
      <motion.button
        style={{ ...styles.button, ...styles.clearButton }}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleClearClick}
      >
        Clear
      </motion.button>
    </div>
  );
};

export default Calculator;