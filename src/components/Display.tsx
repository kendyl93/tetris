import React from "react";

interface Props {
  text: string;
}

const Display: React.FC<Props> = ({ text }) => {
  return (
    <div>
      Display<div>{text}</div>
    </div>
  );
};

export default Display;
