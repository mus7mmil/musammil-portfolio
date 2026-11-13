import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

/**
 * Lightweight, fully-typed, production-safe DOM text splitter.
 * Replaces gsap-trial/SplitText with 100% legitimate, zero-dependency standard DOM manipulation.
 */
export class TextSplitter implements SplitResult {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originalHTML: string;
  private element: HTMLElement;

  constructor(
    target: HTMLElement | string,
    options: { type?: string; linesClass?: string } = {}
  ) {
    const el =
      typeof target === "string"
        ? (document.querySelector(target) as HTMLElement)
        : target;
    if (!el) {
      this.originalHTML = "";
      this.element = document.createElement("div");
      return;
    }

    this.element = el;
    this.originalHTML = el.innerHTML;
    const types = (options.type || "chars,lines").split(",");
    const linesClass = options.linesClass || "split-line";

    const text = el.textContent || "";
    el.innerHTML = "";

    const wordsArray = text.trim().split(/\s+/);
    const lineWrapper = document.createElement("div");
    lineWrapper.className = linesClass;

    wordsArray.forEach((wordText, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "split-word";
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      if (types.includes("chars")) {
        for (let i = 0; i < wordText.length; i++) {
          const charSpan = document.createElement("span");
          charSpan.className = "split-char";
          charSpan.style.display = "inline-block";
          charSpan.textContent = wordText[i];
          wordSpan.appendChild(charSpan);
          this.chars.push(charSpan);
        }
      } else {
        wordSpan.textContent = wordText;
      }

      this.words.push(wordSpan);
      lineWrapper.appendChild(wordSpan);

      if (wordIdx < wordsArray.length - 1) {
        const space = document.createTextNode(" ");
        lineWrapper.appendChild(space);
      }
    });

    el.appendChild(lineWrapper);
    this.lines.push(lineWrapper);
  }

  revert() {
    if (this.element && this.originalHTML) {
      this.element.innerHTML = this.originalHTML;
    }
  }
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: TextSplitter;
}

gsap.registerPlugin(ScrollTrigger);

let resizeTimeout: number | undefined;

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 75%" : "20% 70%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new TextSplitter(para, {
      type: "words",
      linesClass: "split-line",
    });

    if (para.split.words.length > 0) {
      para.anim = gsap.fromTo(
        para.split.words,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: para.parentElement || para,
            toggleActions: ToggleAction,
            start: TriggerStart,
          },
          duration: 0.8,
          ease: "power3.out",
          y: 0,
          stagger: 0.015,
        }
      );
    }
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new TextSplitter(title, {
      type: "chars",
      linesClass: "split-line",
    });

    if (title.split.chars.length > 0) {
      title.anim = gsap.fromTo(
        title.split.chars,
        { autoAlpha: 0, y: 50, rotate: 6 },
        {
          autoAlpha: 1,
          scrollTrigger: {
            trigger: title.parentElement || title,
            toggleActions: ToggleAction,
            start: TriggerStart,
          },
          duration: 0.7,
          ease: "power2.out",
          y: 0,
          rotate: 0,
          stagger: 0.02,
        }
      );
    }
  });
}

// Debounced refresh handler to prevent recursive refresh loops
export function refreshSplitText() {
  if (resizeTimeout) window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    setSplitText();
  }, 250);
}
