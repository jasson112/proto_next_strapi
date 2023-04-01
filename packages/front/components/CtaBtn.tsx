import React from "react";
/*
type: yell, biggy, light
*/
interface CtaBtnProps {
  type?: string; // 👈️ marked optional
  href?: string;
  tag?: string;
  children?: React.ReactNode;
}

function CtaBtn({ children, href = "#", type = "", tag = "a" }: CtaBtnProps) {
  const BtnClass = `cta_button ${type}`;
  let BtnTag = (
    <a href={href} className={BtnClass}>
      {children}
    </a>
  );
  if (tag === "btn") {
    BtnTag = (
      <button className={BtnClass} type="submit">
        {children}
      </button>
    );
  }
  return BtnTag;
}

export default CtaBtn;
