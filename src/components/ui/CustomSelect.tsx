import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

type CustomSelectProps = {
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  error?: string;
  fieldName: string;
  form: UseFormReturn<any, unknown, any>;
};

/**
 * Option 1: Simple Headless Custom Dropdown
 * - Lightweight, fully controllable
 * - No external dependencies (except lucide-react)
 * - Perfect untuk form dengan validation
 */
const CustomSelect = ({
  options,
  placeholder = "Select an option",
  error,
  fieldName,
  form,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedValue = form.watch(fieldName);
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    form.setValue(fieldName, value, { shouldValidate: true });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div
        ref={dropdownRef}
        className="relative"
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        {/* Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full input-box flex items-center justify-between transition-colors ${
            error ? "border-danger" : ""
          } ${isOpen ? "ring-2 ring-cusorange" : ""}`}
        >
          <span
            className={selectedOption ? "text-cusblack" : "text-cusdarkgrey"}
          >
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-cuswhite rounded-md shadow-lg z-50 max-h-60 overflow-y-auto cursor-pointer">
            {options.length === 0 ? (
              <div className="p-3 text-center text-cusgrey text-bs-m">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-3 text-bd-m hover:bg-cusorange hover:text-cuswhite font-semibold transition-colors cursor-pointer ${
                    selectedValue === option.value
                      ? "bg-cusorange text-cuswhite font-semibold"
                      : "text-cusblack"
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-bs-m md:text-bs text-danger">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;
