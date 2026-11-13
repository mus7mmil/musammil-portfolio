import { useEffect, useRef } from "react";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!cursorRef.current) return;

    let hover = false;
    const cursor = cursorRef.current;
    const mousePos = { x: -100, y: -100 };
    const cursorPos = { x: -100, y: -100 };
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const onMouseOver = (e: Event) => {
      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();

      if (element.dataset.cursor === "icons") {
        cursor.classList.add("cursor-icons");
        gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
        cursor.style.setProperty("--cursorH", `${rect.height}px`);
        hover = true;
      }
      if (element.dataset.cursor === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onMouseOut = () => {
      cursor.classList.remove("cursor-disable", "cursor-icons");
      hover = false;
    };

    const cursorElements = document.querySelectorAll("[data-cursor]");
    cursorElements.forEach((item) => {
      item.addEventListener("mouseover", onMouseOver);
      item.addEventListener("mouseout", onMouseOut);
    });

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMouseMove);
      cursorElements.forEach((item) => {
        item.removeEventListener("mouseover", onMouseOver);
        item.removeEventListener("mouseout", onMouseOut);
      });
    };
  }, []);

  return <div className="cursor-main" ref={cursorRef}></div>;
};

export default Cursor;
