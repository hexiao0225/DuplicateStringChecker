import React, { useRef, useEffect } from "react";
const LINE_HEIGHT = 15;
const CANVAS_WIDTH = 900;
const CANVAS_CONTENT_WIDTH = 700;

function estimateCanvasHeightByTextsSize(len) {
  // Estimate 10 words per row
  // Each row takes up 40px
  // Chrome max canvas height is 16,384 and IE is 8,192. We take 8000 here.
  return Math.min(Math.floor(len / 10) * 40 + 300, 8000);
}
const ResultCanvas = ({ results }) => {
  const canvasRef = useRef(null);
  let texts = Object.keys(results);

  let draw = (ctx) => {
    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = Math.max(
      estimateCanvasHeightByTextsSize(texts.length),
      400
    );
    ctx.font = "12px 300 Roboto";
    let accumulatedXPos = 0;
    let xPos = 0;
    let yPos = 0;
    let numOfLine = 0;
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      var metrics = ctx.measureText(text);
      const w = metrics.width;
      accumulatedXPos += w + 24;
      if (xPos > CANVAS_CONTENT_WIDTH || xPos + w + 24 > CANVAS_CONTENT_WIDTH) {
        xPos = 0;
      }
      xPos += w + 24;
      numOfLine = Math.floor(accumulatedXPos / CANVAS_CONTENT_WIDTH) + 1;
      yPos = numOfLine * 35;
      ctx.strokeRect(xPos - 8, yPos - 8, w + 16, 28);
      ctx.fillText(text, xPos, yPos);
      ctx.fillText(results[text], xPos, yPos + LINE_HEIGHT);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(context);
  }, [draw, results]);

  return <canvas ref={canvasRef} />;
};

export default ResultCanvas;
