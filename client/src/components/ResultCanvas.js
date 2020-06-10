import React, { useRef, useEffect } from "react";
const LINE_HEIGHT = 15;
const CANVAS_WIDTH = 900;
const CANVAS_CONTENT_WIDTH = 700;

function estimateCanvasHeightByTextsSize(len) {
  // Estimate 10 words per row
  // Each row takes up 60px
  // Chrome max canvas height is 16,384 and IE is 8,192. We take 8000 here.
  return Math.min(Math.floor(len / 10) * 60 + 300, 8000);
}
const ResultCanvas = ({ results }) => {
  const canvasRef = useRef(null);
  let texts = Object.keys(results).sort();

  let draw = (ctx) => {
    ctx.canvas.width = CANVAS_WIDTH;
    ctx.canvas.height = Math.max(
      estimateCanvasHeightByTextsSize(texts.length),
      400
    );
    ctx.font = "12px 300 Roboto";
    let accumulatedXPos = 0;
    let xPos = 8;
    let yPos = 0;
    let numOfLine = 0;
    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      var metrics = ctx.measureText(text);
      const w = metrics.width + 10;
      accumulatedXPos += w + 18;
      numOfLine = Math.floor(accumulatedXPos / CANVAS_CONTENT_WIDTH) + 1;
      yPos = numOfLine * 50;
      if (xPos + w + 18 > CANVAS_CONTENT_WIDTH) {
        xPos = 1.5;
      } else {
        xPos += w + 18;
      }

      ctx.strokeRect(xPos - 1.5, yPos - 12, w + 3, 30);
      ctx.fillText(text, xPos + 6, yPos);
      ctx.fillText(results[text], xPos + 6, yPos + LINE_HEIGHT);
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
