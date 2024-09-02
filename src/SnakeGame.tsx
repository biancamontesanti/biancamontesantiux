import React, { useState, useEffect, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 15 };
const INITIAL_DIRECTION = { x: 1, y: 0 };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      setFood(newFood);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver]);

  const handleDirection = useCallback((newDirection: Position) => {
    if (gameOver) {
      resetGame();
    } else {
      setDirection(newDirection);
    }
  }, [gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handleDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          handleDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          handleDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          handleDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    const gameLoop = setInterval(moveSnake, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      clearInterval(gameLoop);
    };
  }, [moveSnake, handleDirection]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
  };

  const ArrowButton: React.FC<{ direction: string; onClick: () => void }> = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      style={{
        width: '50px',
        height: '50px',
        fontSize: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        borderRadius: '50%',
        color: 'rgba(255, 255, 255, 0.8)',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        transition: 'background-color 0.3s',
        margin: '0 5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
    >
      {direction}
    </button>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: 'rgba(50, 50, 50, 0.2)',
      borderRadius: '20px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(15px)',
      width: 'fit-content',
    }}>
      <div style={{
        width: `${GRID_SIZE * CELL_SIZE}px`,
        height: `${GRID_SIZE * CELL_SIZE}px`,
        padding: '10px',
        paddingBottom: '60px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        marginBottom: '50px',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      }}>
        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: isSnake
                    ? 'rgba(255, 255, 255, 0.8)'
                    : isFood
                    ? 'rgba(255, 255, 255, 0.6)'
                    : 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'background-color 0.1s',
                }}
              />
            );
          })}
        </div>
        {gameOver && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            Game Over!
            <br />
            <span style={{ fontSize: '16px', fontWeight: 'normal' }}>Press any arrow to RESTART</span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <ArrowButton direction="◄" onClick={() => handleDirection({ x: -1, y: 0 })} />
        <ArrowButton direction="▲" onClick={() => handleDirection({ x: 0, y: -1 })} />
        <ArrowButton direction="▼" onClick={() => handleDirection({ x: 0, y: 1 })} />
        <ArrowButton direction="►" onClick={() => handleDirection({ x: 1, y: 0 })} />
      </div>
    </div>
  );
};

export default SnakeGame;