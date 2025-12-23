"use client";

import { useEffect, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  velocity: number;
}

interface WaterdropCursorProps {
  sectionRef?: React.RefObject<HTMLElement>;
  theme?: "light" | "dark";
}

export function WaterdropCursor({ sectionRef, theme = "light" }: WaterdropCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [cursorVelocity, setCursorVelocity] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const rippleIdRef = useRef(0);
  const lastRippleTime = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const currentPositionRef = useRef({ x: 0, y: 0 });

  const isDark = theme === "dark";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is within the section
      let isInSection = true;
      if (sectionRef?.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        isInSection =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
      }

      setIsVisible(isInSection);

      if (!isInSection) {
        return;
      }

      const now = Date.now();
      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const velocity = distance;

      setCursorVelocity({ x: deltaX, y: deltaY });
      setMousePosition({ x: e.clientX, y: e.clientY });
      currentPositionRef.current = { x: e.clientX, y: e.clientY };

      // Create ripple effect when moving (with velocity-based frequency)
      const rippleInterval = Math.max(30, 100 - velocity * 0.5);
      if (now - lastRippleTime.current > rippleInterval && distance > 2) {
        const newRipple: Ripple = {
          id: rippleIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          timestamp: now,
          velocity: Math.min(velocity, 50),
        };
        setRipples((prev) => [...prev, newRipple]);
        lastRippleTime.current = now;

        // Remove ripple after animation completes
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 2500);
      }

      lastPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      document.body.style.cursor = "none";
    };

    const handleMouseLeave = () => {
      document.body.style.cursor = "auto";
      setIsVisible(false);
    };

    // Smooth cursor movement with requestAnimationFrame
    const updateCursor = () => {
      if (cursorRef.current) {
        const { x, y } = currentPositionRef.current;
        cursorRef.current.style.left = `${x}px`;
        cursorRef.current.style.top = `${y}px`;
      }
      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };
    animationFrameRef.current = requestAnimationFrame(updateCursor);

    window.addEventListener("mousemove", handleMouseMove);

    // Add event listeners to section if provided
    const sectionElement = sectionRef?.current;
    if (sectionElement) {
      sectionElement.addEventListener("mouseenter", handleMouseEnter);
      sectionElement.addEventListener("mouseleave", handleMouseLeave);
      // Force check initially if mouse is already over
      if (document.body.matches(":hover")) {
         // This is hard to check accurately initially without an event, 
         // but component mount usually happens after layout.
      }
    } else {
      // If no section ref, hide cursor globally (or rely on parent containment)
      // but here we likely only want it for the section
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (sectionElement) {
        sectionElement.removeEventListener("mouseenter", handleMouseEnter);
        sectionElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.body.style.cursor = "auto";
    };
  }, [sectionRef]);

  // Calculate tilt based on velocity
  const tilt = Math.atan2(cursorVelocity.y, cursorVelocity.x) * (180 / Math.PI);
  const speed = Math.min(
    Math.sqrt(cursorVelocity.x ** 2 + cursorVelocity.y ** 2) / 10,
    1
  );

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      >
        <div className="relative">
          {/* Outer glow/Shadow */}
          <div
            className={`absolute rounded-full blur-lg transition-all duration-300 ${isDark ? 'bg-black/10' : 'bg-white'}`}
            style={{
              width: `${20 + speed * 10}px`,
              height: `${20 + speed * 10}px`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              opacity: isDark ? 0.1 + speed * 0.1 : 0.15 + speed * 0.15,
            }}
          />

          {/* Secondary glow/halo */}
          <div
            className={`absolute rounded-full blur-md transition-all duration-300 ${isDark ? 'bg-black/5' : 'bg-white'}`}
            style={{
              width: "16px",
              height: "16px",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              opacity: 0.2,
            }}
          />

          {/* Waterdrop shape */}
          <div
            className="relative"
            style={{
              width: "14px",
              height: "14px",
              transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
              left: "50%",
              top: "50%",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className={`drop-shadow-lg transition-all duration-300`}
              style={{
                filter: isDark 
                  ? "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" 
                  : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
              }}
            >
              <defs>
                {/* Light Theme Gradients */}
                <radialGradient id="waterdrop-gradient-light" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                  <stop offset="70%" stopColor="rgba(255, 255, 255, 0.9)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
                </radialGradient>
                <radialGradient id="waterdrop-highlight-light" cx="35%" cy="35%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </radialGradient>

                {/* Dark Theme Gradients - Ink/Black Pearl look */}
                <radialGradient id="waterdrop-gradient-dark" cx="35%" cy="35%">
                   <stop offset="0%" stopColor="rgba(60, 60, 60, 1)" /> 
                   <stop offset="60%" stopColor="rgba(20, 20, 20, 1)" />
                   <stop offset="100%" stopColor="rgba(0, 0, 0, 1)" />
                </radialGradient>
                <radialGradient id="waterdrop-highlight-dark" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </radialGradient>
              </defs>

              {/* Main drop shape */}
              <ellipse
                cx="7"
                cy="7"
                rx="5"
                ry="6"
                fill={isDark ? "url(#waterdrop-gradient-dark)" : "url(#waterdrop-gradient-light)"}
              />
              {/* Highlight */}
              <ellipse
                cx="5"
                cy="5"
                rx="2"
                ry="2.5"
                fill={isDark ? "url(#waterdrop-highlight-dark)" : "url(#waterdrop-highlight-light)"}
              />
              {/* Reflection */}
              <ellipse
                cx="6"
                cy="6.5"
                rx="1"
                ry="1.2"
                fill={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.4)"}
              />
            </svg>
          </div>

          {/* Simple trail for speed */}
          {speed > 0.3 && (
            <div
              className={`absolute rounded-full blur-sm ${isDark ? 'bg-black/20' : 'bg-white/30'}`}
              style={{
                width: `${4 + speed * 4}px`,
                height: `${12 + speed * 8}px`,
                transform: `translate(-50%, -50%) rotate(${tilt + 90}deg)`,
                left: "50%",
                top: `${50 + speed * 5}%`,
                opacity: speed * 0.5,
              }}
            />
          )}
        </div>
      </div>

      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Primary ripple */}
          <div
            className={`absolute rounded-full border ${isDark ? 'border-black/20' : 'border-white/40'}`}
            style={{
              width: "0px",
              height: "0px",
              animation: `ripple-expand 2.5s ease-out forwards`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: isDark ? "none" : "0 0 20px rgba(255, 255, 255, 0.2)",
            }}
          />
          {/* Secondary ripple */}
          <div
            className={`absolute rounded-full border ${isDark ? 'border-black/10' : 'border-white/25'}`}
            style={{
              width: "0px",
              height: "0px",
              animation: `ripple-expand 2.5s ease-out 0.15s forwards`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      ))}
    </>
  );
}
