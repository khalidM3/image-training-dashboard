import "./Tag.css";
import { genColorFromString } from "../helpers";

export default function Tag({ label="", isActive, onClick }) {
  return (
    <button
      className="Tag"
      onClick={onClick && onClick}
      style={{
        backgroundColor: isActive && genColorFromString(label),
        color: isActive && genColorFromString(label, 100, 30),
      }}
    >
      {label}
    </button>
  );
}
