import DatePicker from "react-datepicker";
import { useState } from "react";
import "../datepicker.css";

export default function StudyPlans() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <section>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        placeholderText="Enter date"
      />
    </section>
  );
}
