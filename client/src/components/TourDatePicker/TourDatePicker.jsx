import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TourDatePicker.scss";
import useComponentVisible from "../../hooks/useComponentVisible";
import closeIcon from "../../assets/icons/close.svg";

const TourDatePicker = ({ availableDates, onDateSelected }) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleDateClick = (event) => {
    const dayElement = event.target.closest(".react-datepicker__day");
    if (dayElement) {
      const rect = dayElement.getBoundingClientRect();
      const { top, left, width } = rect;
      setPopupPosition({
        top: top + dayElement.offsetHeight,
        left: left + width / 2,
      });
      setIsComponentVisible(true);
    }
  };

  const isDateAvailable = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return availableDates.includes(formattedDate.replace(/-/g, "/"));
  };

  const handleDateChange = (date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      onDateSelected(date);
      if (isComponentVisible) {
        setIsComponentVisible(false);
      }
    } else {
      setSelectedDate(date);
      setIsComponentVisible(true);
    }
  };

  // const highlightWithRanges = availableDates.map(
  //   (date) => new Date(date.replace(/-/g, "/"))
  // );

  return (
    <div className="tour-date-picker">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        onClick={handleDateClick}
        dayClassName={(date) =>
          isDateAvailable(date) ? "react-datepicker__day--available" : ""
        }
        inline
      />
      {isComponentVisible && (
        <div
          className="popup"
          ref={ref}
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <div className="popup-content">
            <p className="popup-content__date">
              {selectedDate ? selectedDate.toDateString() : ""}
            </p>
            <p>No schedules available for the selected date.</p>
            <button
              className="btn--close"
              type="button"
              onClick={() => setIsComponentVisible(false)}
            >
              <img src={closeIcon} alt="close icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDatePicker;
