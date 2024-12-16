import React from "react";
import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { truncate } from "fs";

interface IProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  disabled?: boolean;
}

const DateTimePicker: React.FC<IProps> = ({ date, setDate, disabled }) => {
  const onChange: DatePickerProps["onChange"] = (value, dateString) => {
    console.log("Selected Time:", value);
    console.log("Formatted Selected Time:", dateString);

    // Cập nhật giá trị cho component cha
    if (value) {
      setDate(value.toDate());
    } else {
      setDate(undefined);
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <DatePicker
        className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-blue-400 active:border-blue-400 disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        value={date ? dayjs(date) : null}
        showTime={{ format: "HH:mm:ss" }}
        format="DD-MM-YYYY HH:mm"
        onChange={onChange}
        disabled={disabled}
        onOk={(value) => {
          console.log("onOk:", value);
        }}
      />
    </Space>
  );
};

export default DateTimePicker;
