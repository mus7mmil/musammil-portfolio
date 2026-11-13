import gsap from "gsap";
import { TextSplitter } from "./splitText";

export function initialFX() {
  document.body.style.overflowY = "auto";
  const mainEl = document.getElementsByTagName("main")[0];
  if (mainEl) {
    mainEl.classList.add("main-active");
  }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.4,
  });

  const landingIntroH2 = document.querySelector(".landing-intro h2") as HTMLElement;
  const landingNameLines = document.querySelectorAll<HTMLElement>(
    ".landing-name-line"
  );
  const landingInfoH3 = document.querySelector(".landing-info h3") as HTMLElement;

  if (landingIntroH2) {
    const s1 = new TextSplitter(landingIntroH2, { type: "chars" });
    gsap.fromTo(
      s1.chars,
      { opacity: 0, y: 40, filter: "blur(4px)" },
      {
        opacity: 1,
        duration: 0.9,
        filter: "blur(0px)",
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
        delay: 0.1,
      }
    );
  }

  landingNameLines.forEach((line, index) => {
    const splitter = new TextSplitter(line, { type: "chars" });
    if (!splitter.chars.length) return;
    gsap.fromTo(
      splitter.chars,
      { opacity: 0, y: 50, filter: "blur(4px)" },
      {
        opacity: 1,
        duration: 1.0,
        filter: "blur(0px)",
        ease: "power3.out",
        y: 0,
        stagger: 0.025,
        delay: 0.2 + index * 0.08,
      }
    );
  });

  if (landingInfoH3) {
    const s3 = new TextSplitter(landingInfoH3, { type: "chars" });
    gsap.fromTo(
      s3.chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
        delay: 0.3,
      }
    );
  }

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      y: 0,
      delay: 0.5,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section"],
    { opacity: 0, y: -10, xPercent: -50 },
    {
      opacity: 1,
      y: 0,
      xPercent: -50,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
      stagger: 0.1,
    }
  );

  gsap.fromTo(
    [".nav-fade", ".landing-actions"],
    { opacity: 0, y: -10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5,
      stagger: 0.1,
    }
  );

  const textProps = { type: "chars", linesClass: "split-h2" };
  const h2Info = document.querySelector(".landing-h2-info") as HTMLElement;
  const h2Info1 = document.querySelector(".landing-h2-info-1") as HTMLElement;
  const h2_1 = document.querySelector(".landing-h2-1") as HTMLElement;
  const h2_2 = document.querySelector(".landing-h2-2") as HTMLElement;

  if (h2Info && h2Info1) {
    const sA = new TextSplitter(h2Info, textProps);
    const sB = new TextSplitter(h2Info1, textProps);
    loopText(sA, sB);
  }

  if (h2_1 && h2_2) {
    const sC = new TextSplitter(h2_1, textProps);
    const sD = new TextSplitter(h2_2, textProps);
    loopText(sC, sD);
  }
}

function loopText(text1: TextSplitter, text2: TextSplitter) {
  if (!text1.chars.length || !text2.chars.length) return;

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 3.5;
  const delay2 = delay * 2 + 0.8;

  tl.fromTo(
    text2.chars,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      duration: 0.9,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.05,
      delay: delay,
    },
    0
  )
    .fromTo(
      text1.chars,
      { y: 40 },
      {
        duration: 0.9,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.05,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1.chars,
      { y: 0 },
      {
        y: -40,
        duration: 0.9,
        ease: "power3.inOut",
        stagger: 0.05,
        delay: delay,
      },
      0
    )
    .to(
      text2.chars,
      {
        y: -40,
        duration: 0.9,
        ease: "power3.inOut",
        stagger: 0.05,
        delay: delay2,
      },
      1
    );
}
