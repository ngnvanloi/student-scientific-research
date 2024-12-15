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
