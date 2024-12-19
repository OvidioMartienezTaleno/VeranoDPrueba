import React from "react";

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => (
  <button onClick={onClick}>Siguiente Tienda</button>
);

export default Button;
