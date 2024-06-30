import React from 'react'
import { createGlobalStyle } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width {
    }


    .date_picker.full-width .react-datepicker__input-container {
        width: 163px;
        height: 44px;
    }

    .date_picker.full-width .react-datepicker__input-container input {
        width: 100%;
        height: 100%;
        padding: 12px 0 12px 16px;
        border: 1px solid transparent;
        transition: border-color 0.2s;
    }

    .date_picker.full-width .react-datepicker__input-container input:focus {
        border: 1px solid #000;
    }

    .react-datepicker__month-container .react-datepicker__header {
        background-color: #fff;
        border-bottom: 1px solid transparent;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 15px;
    }

    .react-datepicker__month-container .react-datepicker__header .react-datepicker__day-names {
        padding-top: 10px;
    }

    .react-datepicker__month-container .react-datepicker__month {
        margin: 0 0.625rem 0.625rem 0.625rem;
    }

    /* Hide current arrow */
    .react-datepicker__navigation--previous {
      border-right-color: transparent;
    } 

    .react-datepicker__navigation-icon::before {
      width: 0;
      height: 0;
      border-color: transparent;
      border-width: 0 0 0 0;
    }

    .react-datepicker__navigation--next {
        background: url(../arrow-forward.svg) no-repeat;
        background-size: 60%;
        top: 15px;
        right: 5px;
        width: 25px;
        height: 25px;
        border: none;
    }

    .react-datepicker__navigation--previous {
        background: url(../arrow-backward.svg) no-repeat;
        background-size: 60%;
        top: 15px;
        left: 13px;
        width: 25px;
        height: 25px;
        border: none;
    }

    .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
        padding: 0.166rem;
        margin: 0;
        border-radius: 0;
    }

    .react-datepicker__day--selected {
        background-color: #DC4B4B;
    }
    
    .react-datepicker__day--keyboard-selected{
        background-color: #DC4B4B;
        color: #fff;
    }

    /* Custom styles for date range selection */
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__day--selecting-range-start,
    .react-datepicker__day--selecting-range-end {
        background-color: #DC4B4B1A !important;
        color: #DC4B4B; 
    }

    /* Style for days that are not in the current month */
    .react-datepicker__day--outside-month {
        color: #C6C6C6 !important;
    }

    /* Custom styles for startDate and endDate */
    .react-datepicker__day--selecting-range-start {
        background-color: #DC4B4B99 !important;
        color: #fff !important;
    }

    .react-datepicker__day--selecting-range-end {
        background-color: #DC4B4B !important;
        color: #fff !important;
    }

    .react-datepicker__day--selects-start.react-datepicker__day--selected {
        background-color: #DC4B4B99 !important;
        color: #fff !important;
    }

    .react-datepicker__day--selects-end.react-datepicker__day--selected {
        background-color: #DC4B4B !important;
        color: #fff !important;
    }

    /* Responsive adjustments */
    @media (min-width: 768px) {
        .date_picker.full-width .react-datepicker__input-container {
          width: 250px;
        }
    }

`

interface CustomDatePickerProps {
  selected: Date | null
  onChange: (date: Date | null) => void
  startDate?: Date | null
  endDate?: Date | null
  selectsStart?: boolean
  selectsEnd?: boolean
  [key: string]: any
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selected,
  onChange,
  startDate,
  endDate,
  selectsStart,
  selectsEnd,
  ...props
}) => {
  return (
    <>
      <DatePicker
        selected={selected}
        onChange={onChange}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        wrapperClassName='date_picker full-width'
        {...props}
        dateFormat='yyyy/MM/dd'
      />
      <DatePickerWrapperStyles />
    </>
  )
}

export default CustomDatePicker
