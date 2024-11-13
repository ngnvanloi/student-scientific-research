import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  endDate: string; // Thời gian kết thúc được truyền vào dưới dạng string
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  // Hàm tính toán thời gian đếm ngược
  const calculateTimeLeft = () => {
    const end = new Date(endDate);
    const now = new Date();
    const difference = end.getTime() - now.getTime();

    if (difference <= 0) {
      return "Hết thời gian";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
  };

  // Sử dụng useEffect để cập nhật thời gian đếm ngược mỗi giây
  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer(); // Gọi hàm ngay lập tức để cập nhật state ban đầu
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId); // Dọn dẹp khi component unmount
  }, [endDate]);

  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
};

export default CountdownTimer;
