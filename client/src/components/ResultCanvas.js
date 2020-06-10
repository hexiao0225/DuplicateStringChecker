import React, { useRef, useEffect } from "react";
import {
  LINE_HEIGHT,
  CANVAS_WIDTH,
  CANVAS_RIGHT_PADDING,
  CANVAS_LEFT_PADDING,
  CANVAS_MIN_HEIGHT,
  BLOCK_HEIGHT,
  TEXT_PADDING,
} from "../constants/constants";

const estimateCanvasHeightByTextsSize = (len) => {
  // Chrome max canvas height is 16,384 and IE is 8,192. We use 8000 here.
  return Math.min(Math.floor(len / 10) * BLOCK_HEIGHT + 300, 9000);
};

const ResultCanvas = ({ results }) => {
  const canvasRef = useRef(null);
  let texts = Object.keys(results).sort();

  let draw = (ctx) => {
    ctx.font = "15px Arial";
    let xPos = CANVAS_LEFT_PADDING;
    let yPos = BLOCK_HEIGHT;
    let numOfLine = 0;

    for (let i = 0; i < texts.length; i++) {
      const text = texts[i];
      const count = results[text];
      const textMetrics = ctx.measureText(text);
      const countMetrics = ctx.measureText(count);
      const w = Math.max(textMetrics.width, countMetrics.width) + TEXT_PADDING;

      if (xPos + w >= CANVAS_WIDTH - CANVAS_RIGHT_PADDING) {
        xPos = CANVAS_LEFT_PADDING;
        numOfLine += 1;
        yPos += BLOCK_HEIGHT;
      }

      // Draw box and line
      ctx.strokeStyle = "#6a6c6d";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xPos - TEXT_PADDING / 2, yPos + 6);
      ctx.lineTo(xPos - TEXT_PADDING / 2 - 5 + w, yPos + 6);
      ctx.stroke();
      ctx.strokeRect(
        xPos - TEXT_PADDING / 2,
        yPos - LINE_HEIGHT / 2,
        w - 5,
        LINE_HEIGHT * 2
      );

      // Draw texts
      ctx.fillText(text, xPos, yPos); //Characters
      ctx.fillText(count, xPos, yPos + LINE_HEIGHT); //Number of Occurrence

      xPos = xPos + w;
      yPos = (numOfLine + 1) * BLOCK_HEIGHT;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.canvas.width = CANVAS_WIDTH;
    context.canvas.height = Math.max(
      estimateCanvasHeightByTextsSize(texts.length),
      CANVAS_MIN_HEIGHT
    );
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw(context);
  }, [draw, results]);

  return <canvas ref={canvasRef} />;
};

export default ResultCanvas;
