import "./Button.scss";

interface ButtonProps {
  children: string;
  type?: "button" | "reset" | "submit";
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  type = "button",
  className = "",
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`myButton${className != "" ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
