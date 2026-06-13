import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import type { UseFormReturn } from "react-hook-form";
import { Calendar } from "lucide-react";

type Props = {
  fieldName: string;
  form: UseFormReturn<any, unknown, any>;
  placeholder?: string;
  error?: string;
};

const CustomDatePicker = ({
  fieldName,
  form,
  placeholder = "YYYY-MM-DD",
  error,
}: Props) => {
  const value = form.watch(fieldName);

  // Try parsing the date carefully
  let selectedDate = null;
  if (value) {
    try {
      selectedDate = parseISO(value);
      // Validate that it's a valid date
      if (isNaN(selectedDate.getTime())) {
        selectedDate = null;
      }
    } catch (e) {
      selectedDate = null;
    }
  }

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) {
              form.setValue(fieldName, format(date, "yyyy-MM-dd"), {
                shouldValidate: true,
              });
            } else {
              form.setValue(fieldName, "", { shouldValidate: true });
            }
          }}
          dateFormat="yyyy-MM-dd"
          placeholderText={placeholder}
          className={`input-box w-full pr-10 cursor-pointer ${error ? "border-danger" : ""
            }`}
          wrapperClassName="w-full"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cusblack">
          <Calendar size={16} />
        </div>
      </div>
      {error && (
        <p className="mt-1 text-bs-m md:text-bs text-danger">{error}</p>
      )}
    </div>
  );
};

export default CustomDatePicker;
