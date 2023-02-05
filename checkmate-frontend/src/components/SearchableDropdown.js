import { useEffect, useRef, useState } from "react";
import "./SearchableDropdown.css";

const SearchableDropdown = ({
  options,
  idx,
  name,
  selectedVal,
  onDropdownChange,
  length,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    onDropdownChange({ target: { value: option } }, name);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    return selectedVal;
  };

  return (
    <div className="dropdown">
      <div className="control">
        <div className="selected-value">
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            disabled={idx === length - 1 ? false : true}
            onChange={(e) => {
              console.log(e);
              console.log(e.target.value);
              onDropdownChange(e);
            }}
            onClick={toggle}
            placeholder={name}
            maxLength={name === "dose" ? "0" : "20"}
          />
        </div>
        <div className={`arrow ${isOpen ? "open" : ""}`}></div>
      </div>
      <div className={`options ${isOpen ? "open" : ""}`}>
        {idx === length - 1
          ? options.map((option, index) => {
              return (
                <div
                  onClick={() => {
                    selectOption(option);
                  }}
                  className={`option ${
                    option === selectedVal ? "selected" : ""
                  }`}
                  key={`${name}-${index}`}
                >
                  {option}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SearchableDropdown;
