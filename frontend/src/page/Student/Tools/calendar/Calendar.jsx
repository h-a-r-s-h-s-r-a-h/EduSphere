import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calendar.module.css"

export default function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.main}>
      <h1 className={styles.mainLine}>Calendar</h1>
      <Calendar className={styles.xalendar} onChange={onChange} value={value} />
    </div>
  );
}
