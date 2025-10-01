import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

export default function CustomSelect({ options, value, onChange, placeholder, className }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      {/* здесь добавляем className для ошибки */}
      <div className={`custom-select ${open ? "open" : ""} ${className || ""}`} onClick={() => setOpen(!open)}>
        {value || placeholder}
        <span className="arrow"></span>
      </div>
      {open && (
        <ul className="custom-options">
          {options.map((opt) => (
            <li
              key={opt}
              className={opt === value ? "selected" : ""}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
