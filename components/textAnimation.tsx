"use client"

import { useEffect } from 'react';

function vec2(x, y) {
  return { x, y };
}

function length(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function map(value, start1, stop1, start2, stop2) {
  return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

const TextAnimation = () => {
  useEffect(() => {
    const canvasElement = document.getElementById('animationCanvas');

    if (canvasElement instanceof HTMLCanvasElement && canvasElement.getContext) {
      const ctx = canvasElement.getContext('2d');

      if (ctx) {
        // canvasElement.width = window.innerWidth;
        // canvasElement.height = window.innerHeight;
        canvasElement.width = 450;
        canvasElement.height = 450;

        ctx.font = '5px monospace';
        ctx.fillStyle = 'white';

        const { PI, atan2 } = Math;
        const TAU = PI * 2;
        const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

        const main = (coord, context) => {
    const { PI, atan2 } = Math;
    const TAU = PI * 2;
    const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
  
    const t = context.time * 0.0006;
    const m = Math.min(context.cols, context.rows);
    const a = context.metrics.aspect;
  
    let st = {
      x: ((2.0 * (coord.x - context.cols / 2)) / m) * a,
      y: (2.0 * (coord.y - context.rows / 2)) / m
    };
  
    const radius = length(st);
    const angle = atan2(st.y, st.x);
    const rot = 0.03 * TAU * t;
    const turn = angle / TAU + rot;
  
    const n_sub = 1.5;
    const turn_sub = (n_sub * turn) % n_sub;
  
    let intensity = Math.abs(turn_sub - 0.5);
    const index = Math.floor(map(intensity, 0, 1, 0, density.length));
    const char = density[index];
    ctx.fillText(char, coord.x * 10, coord.y * 10);
  };
  
  let context = {
    time: 0,
    cols: Math.floor(canvasElement.width / 10),
    rows: Math.floor(canvasElement.height / 10),
    metrics: { aspect: canvasElement.width / canvasElement.height }
  };

  const animate = () => {
    context.time++;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    for (let x = 0; x < context.cols; x++) {
      for (let y = 0; y < context.rows; y++) {
        let coord = { x, y };
        main(coord, context);
      }
    }

    requestAnimationFrame(animate);
  };

  animate();
}
}
}, []);

const canvasStyles = {
width: '100%',
height: '400px',
backgroundColor: '#000000',
margin: 0,
overflow: 'hidden',
display: 'block',
};

return <canvas id="animationCanvas" style={canvasStyles}></canvas>;
};

export default TextAnimation;
