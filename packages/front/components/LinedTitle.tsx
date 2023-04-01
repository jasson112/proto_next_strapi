import React, { Children } from "react";

interface CtaBtnProps {
  title1?: string; // 👈️ marked optional
  title2?: string;
}

//function CtaBtn({ name = "Alice", age = 30, country }: CtaBtnProps) {
function CtaBtn({ title1 = "Title1", title2 = "Title2" }: CtaBtnProps) {
  return (
    <div className="lined_title">
      <h2>{title1}</h2>
      <hr></hr>
      <h3>{title2}</h3>
    </div>
  );
}

export default CtaBtn;
