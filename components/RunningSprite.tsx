"use client";

/**
 * RunningSprite Component
 *
 * A Canvas-based sprite animation component that displays a running character
 * with a colorful trail effect. Based on the CodePen animation by frhd.
 *
 * HOW TO CONTROL ANIMATION SPEED:
 * ================================
 * The animation speed is controlled by the `interval` variable in the img.onload callback.
 *
 * Current setting: const interval = 1 / 30;  // 30 frames per second
 *
 * To make it faster: Use a smaller number (e.g., 1/60 for 60fps, 1/45 for 45fps)
 * To make it slower: Use a larger number (e.g., 1/15 for 15fps, 1/20 for 20fps)
 *
 * Example:
 *   const interval = 1 / 60;  // Faster animation (60fps)
 *   const interval = 1 / 20;  // Slower animation (20fps)
 *
 *
 * HOW TO CONTROL TRAIL COLORS:
 * ============================
 * The trail colors are controlled by HSL (Hue, Saturation, Lightness) values.
 *
 * 1. Initial trail colors are set when creating trail sprites:
 *    trail.color.h = -(i % 8) * 10;  // Initial hue offset per sprite
 *
 * 2. Color rotation speed is in the TrailSprite update method:
 *    this.color.h += 5;  // Hue increases by 5 degrees per frame
 *
 * 3. Color saturation and lightness are in createTrailSprite:
 *    color: { h: 0, s: 100, l: 50 }  // s=saturation (0-100), l=lightness (0-100)
 *
 * To change color rotation speed:
 *    this.color.h += 10;  // Faster color rotation
 *    this.color.h += 2;   // Slower color rotation
 *
 * To change color saturation (intensity):
 *    s: 80   // Less saturated (more muted colors)
 *    s: 100  // Fully saturated (vibrant colors)
 *
 * To change color brightness:
 *    l: 40   // Darker colors
 *    l: 60   // Brighter colors
 *    l: 50   // Medium brightness (default)
 *
 * To change initial hue spread:
 *    trail.color.h = -(i % 8) * 15;  // Wider hue spread
 *    trail.color.h = -(i % 8) * 5;   // Narrower hue spread
 *
 *
 * ANIMATION PARAMETERS:
 * =====================
 * - frameWidth: 302 (width of each frame in pixels)
 * - frameHeight: 274 (height of each frame in pixels)
 * - trailCount: 24 (number of trail sprites, change in the for loop)
 * - trailOffset: -5 (horizontal offset between trail sprites)
 *
 * To add more trails:
 *    for (let i = 0; i < 30; i++) { ... }  // 30 trails instead of 24
 *
 * To change trail spacing:
 *    ctx.drawImage(trail.canvas, start + i * -8, 0);  // Wider spacing
 *    ctx.drawImage(trail.canvas, start + i * -3, 0);  // Tighter spacing
 */

import { useEffect, useRef } from "react";

interface Sprite {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  frameWidth: number;
  frameHeight: number;
  img: HTMLImageElement;
  interval: number;
  time: number;
  frameIndex: number;
  frames: number[][];
  update: (dt: number) => void;
  draw: () => void;
}

interface TrailSprite extends Sprite {
  color: { h: number; s: number; l: number; toString: () => string };
}

function calcFrames(
  img: HTMLImageElement,
  frameWidth: number,
  frameHeight: number
): number[][] {
  const frames: number[][] = [];
  const count = Math.floor(img.naturalWidth / frameWidth);

  for (let i = 0; i < count; i++) {
    frames.push([i * frameWidth, 0, frameWidth, frameHeight]);
  }

  return frames;
}

function createSprite(
  img: HTMLImageElement,
  frameWidth: number,
  frameHeight: number,
  interval: number
): Sprite {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = frameWidth;
  canvas.height = frameHeight;

  const frames = calcFrames(img, frameWidth, frameHeight);

  const sprite: Sprite = {
    canvas,
    ctx,
    frameWidth,
    frameHeight,
    img,
    interval,
    time: 0,
    frameIndex: 0,
    frames,
    update(dt: number) {
      this.time += dt;

      if (this.time >= this.interval) {
        if (++this.frameIndex === this.frames.length) {
          this.frameIndex = 0;
        }

        this.time = 0;
        this.draw();
      }
    },
    draw() {
      const f = this.frames[this.frameIndex];

      this.ctx.clearRect(0, 0, this.frameWidth, this.frameHeight);
      this.ctx.drawImage(
        this.img,
        f[0],
        f[1],
        f[2],
        f[3],
        0,
        0,
        this.frameWidth,
        this.frameHeight
      );
    },
  };

  sprite.draw();
  return sprite;
}

function createTrailSprite(
  img: HTMLImageElement,
  frameWidth: number,
  frameHeight: number,
  interval: number
): TrailSprite {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = frameWidth;
  canvas.height = frameHeight;

  const frames = calcFrames(img, frameWidth, frameHeight);

  const hslToString = (h: number, s: number, l: number) =>
    `hsl(${h},${s}%,${l}%)`;

  const trailSprite: TrailSprite = {
    canvas,
    ctx,
    frameWidth,
    frameHeight,
    img,
    interval,
    time: 0,
    frameIndex: 0,
    frames,
    color: {
      // ==========================================
      // COLOR PROPERTIES: HSL (Hue, Saturation, Lightness)
      // ==========================================
      h: 0, // Hue: 0-360 (color wheel position)
      s: 100, // Saturation: 0-100 (0=gray, 100=vibrant)
      l: 50, // Lightness: 0-100 (0=black, 50=normal, 100=white)
      toString() {
        return hslToString(this.h, this.s, this.l);
      },
    },
    update(dt: number) {
      this.time += dt;
      // ==========================================
      // COLOR ROTATION SPEED: Change this to speed up/slow down color shifting
      // ==========================================
      // Higher values = faster color rotation (try: 10, 15, 20)
      // Lower values = slower color rotation (try: 2, 3)
      this.color.h += 5;

      if (this.time >= this.interval) {
        if (++this.frameIndex === this.frames.length) {
          this.frameIndex = 0;
        }

        this.time = 0;
        this.draw();
      }
    },
    draw() {
      const f = this.frames[this.frameIndex];

      this.ctx.clearRect(0, 0, this.frameWidth, this.frameHeight);

      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.fillStyle = this.color.toString();
      this.ctx.fillRect(0, 0, this.frameWidth, this.frameHeight);
      this.ctx.globalCompositeOperation = "destination-atop";
      this.ctx.drawImage(
        this.img,
        f[0],
        f[1],
        f[2],
        f[3],
        0,
        0,
        this.frameWidth,
        this.frameHeight
      );
    },
  };

  trailSprite.draw();
  return trailSprite;
}

export function RunningSprite() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runnerSpriteRef = useRef<Sprite | null>(null);
  const trailSpritesRef = useRef<TrailSprite[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    };
    setCanvasSize();

    // Load sprite sheet
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/running-man.png";

    img.onload = () => {
      const frameWidth = 302;
      const frameHeight = 274;

      // ==========================================
      // SPEED CONTROL: Change this value to adjust animation speed
      // ==========================================
      // 1/30 = 30 fps (default, normal speed)
      // 1/60 = 60 fps (faster)
      // 1/20 = 20 fps (slower)
      // 1/15 = 15 fps (very slow)
      const interval = 1 / 30;

      // Create runner sprite
      runnerSpriteRef.current = createSprite(
        img,
        frameWidth,
        frameHeight,
        interval
      );

      // Create trail sprites
      trailSpritesRef.current = [];
      // ==========================================
      // TRAIL COUNT: Change the loop limit to add/remove trails
      // ==========================================
      for (let i = 0; i < 24; i++) {
        const trail = createTrailSprite(img, frameWidth, frameHeight, interval);
        // ==========================================
        // INITIAL TRAIL COLORS: Controls hue spread across trails
        // ==========================================
        // -(i % 8) * 10 creates a repeating pattern of 8 hues
        // Change the multiplier (10) to widen/narrow the hue spread
        trail.color.h = -(i % 8) * 10;
        trailSpritesRef.current.push(trail);
      }

      // Start animation loop
      let lastTime = performance.now();

      function loop(currentTime: number) {
        const dt = (currentTime - lastTime) / 1000; // Convert to seconds
        lastTime = currentTime;

        // Update sprites
        if (runnerSpriteRef.current) {
          runnerSpriteRef.current.update(dt);
        }

        trailSpritesRef.current.forEach((s) => {
          s.update(dt);
        });

        // Draw
        if (ctx && canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Center the animation horizontally
          const frameWidth = 302;
          const centerX = canvas.width / 2;
          const start = centerX - frameWidth / 2;

          // Draw trails (back to front)
          for (let i = trailSpritesRef.current.length - 1; i >= 0; i--) {
            const trail = trailSpritesRef.current[i];
            // ==========================================
            // TRAIL SPACING: Change -5 to adjust horizontal spacing between trails
            // ==========================================
            // More negative (e.g., -8) = wider spacing
            // Less negative (e.g., -3) = tighter spacing
            ctx.drawImage(trail.canvas, start + i * -5, 0);
          }

          // Draw main runner
          if (runnerSpriteRef.current) {
            ctx.drawImage(runnerSpriteRef.current.canvas, start, 0);
          }
        }

        animationFrameRef.current = requestAnimationFrame(loop);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ maxHeight: "400px" }}
    />
  );
}
