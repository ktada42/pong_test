import React, { useState } from 'react';
//import '../styles/app.css'
import styles from '../../styles/Home.module.css'


function App() {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;

    if (key === 'ArrowUp') {
      setTop((top) => top - 10);
    }

    if (key === 'ArrowDown') {
      setTop((top) => top + 10);
    }

    if (key === 'ArrowLeft') {
      setLeft((left) => left - 10);
    }

    if (key === 'ArrowRight') {
      setLeft((left) => left + 10);
    }

    if (key === 'Space') {
      let color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
      for(let count = color.length; count < 6; count++) {
        color = '0' + color;                     
      }
      setBackgroundColor('#' + color);
    }
  }

  return (
    <div
      className="container"
      tabIndex={0}
      onKeyDown={keyDownHandler}
    >
      <div
        className="box"
        style={{ 
          top: top,
          left: left,
          backgroundColor: backgroundColor,
        }}></div>
    </div>
  );
}

export default App;