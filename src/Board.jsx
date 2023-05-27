import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const Box = styled.div`
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  width: 360px;
  margin: 40px auto; 
`;

const Square = styled.div`
  height: 16px;
  width: 16px;
  border: 1px solid black;
  background-color: ${(props) => props.color}
`;

const randomPosition = () => Math.floor(Math.random() * 399);

const Board = ({ size }) => {
  const [snakePosition, setSnakePosition] = useState(0);
  const [foodPosition, setFoodPosition] = useState(randomPosition());
  const [puntaje, setPuntaje] = useState(0);
  const [lastSnakeposition, setLastSnakePosition] = useState(0);
  const [snakeBody, setSnakeBody] = useState([]);
  const [considered, setConsidered] = useState(true);
  const [setter, setSetter] = useState(false);
  const [init, setInit] = useState(false);
  const [lost, setLost] = useState(false);
  const [changer, setChanger] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && snakePosition - 20 >= 0) {
        //setConsidered(false)
        setLastSnakePosition(snakePosition);
        setSnakePosition(snakePosition - 20);
        setSetter(!setter);
      } else if (e.key === 'ArrowDown' && snakePosition + 21 <= 400) {
        //setConsidered(false)
        setLastSnakePosition(snakePosition);
        setSnakePosition(snakePosition + 20);
        setSetter(!setter);
      } else if (e.key === 'ArrowLeft') {
        if (!(snakePosition % 20 == 0)) {
          //setConsidered(false)
          setLastSnakePosition(snakePosition);
          setSnakePosition(snakePosition - 1);
          setSetter(!setter);
        }
      } else if (e.key === 'ArrowRight') {
        if (!((snakePosition + 1) % 20 == 0)) {
          //setConsidered(false)
          setLastSnakePosition(snakePosition);
          setSnakePosition(snakePosition + 1);
          setSetter(!setter);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    if (!considered) {
      snakeBody.push(lastSnakeposition);
      setConsidered(true);
    }
  }, [considered]);

  useEffect(() => {
    if (init) {
      for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
      }
      snakeBody[0] = lastSnakeposition;
      setChanger(!changer);
    }
  }, [setter]);

  useEffect(() => {
    if (init) {
      if (snakeBody.includes(snakePosition)) {
        setLost(true);
      }
    }
  }, [changer]);

  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < size * size; i++) {
      if (snakePosition === foodPosition) {
        setPuntaje(puntaje + 1);
        setFoodPosition(randomPosition());
        setInit(true);
        setConsidered(false);
      }

      if (i === snakePosition || snakeBody.includes(i)) {
        squares.push(<Square key={i} color="red" />);
      } else if (i === foodPosition) {
        squares.push(<Square key={i} color="blue" />);
      } else {
        squares.push(<Square key={i} />);
      }
    }

    return squares;
  };

  return (
    //{renderSquares().map((square) => square)}
    <>
      {' '}
      {lost ? (
        <h1>¡Perdiste!</h1>
      ) : (
        <>
          <Box>{renderSquares()}</Box>
          <h1>Puntaje: {puntaje}</h1>
        </>
      )}
    </>
  );
};

export default Board;
