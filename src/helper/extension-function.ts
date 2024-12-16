export function isCurrentDateInRange(
  startDate: string | undefined,
  endDate: string | undefined
): boolean {
  const currentDate = new Date(); // Ngày hiện tại
  const start = new Date(startDate || ""); // Ngày bắt đầu
  const end = new Date(endDate || ""); // Ngày kết thúc

  return currentDate >= start && currentDate <= end;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Lấy ngày, tháng, và năm
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần +1
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function countUnreadNotifications(
  data: Array<{ status: boolean }>
): number {
  return data.filter((item) => item.status === false).length;
}

export function formatCurrencyVND(amount: number): string {
  // Kiểm tra nếu amount là số hợp lệ
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Giá trị không hợp lệ, vui lòng nhập một số.");
  }

  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
export function formatTimeMMSS(seconds: number) {
  // Tính số phút và giây
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Đảm bảo giây luôn có hai chữ số (VD: 09 thay vì 9)
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${formattedSeconds}`;
}

export function isValid(value: any): boolean {
  if (typeof value === "string") {
    return value.trim() !== "";
  }
  return (
    value !== null &&
    value !== undefined &&
    value !== 0 &&
    value !== false &&
    value !== "Unknown"
  );
}

export function formatDirectionPath(inputPath: string): string {
  return inputPath.replace(/\\/g, "\\\\");
}

export function formatToVND(amount: string | number): string {
  // Chuyển đổi chuỗi hoặc số sang kiểu số
  const numberAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Kiểm tra nếu không phải là số hợp lệ
  // if (isNaN(numberAmount)) {
  //   throw new Error("Invalid number format");
  // }

  // Định dạng số với dấu phân cách hàng nghìn và thêm "vnd"
  return numberAmount
    .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    .replace("₫", "vnd");
}

export function isValidBirthDate(birthDate: string): boolean {
  const birth = new Date(birthDate);

  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // Điều chỉnh tuổi nếu ngày sinh trong năm chưa tới
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
}
export const getDefaultDateOfBirth = (): Date => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today;
};
export function isPastDate(date: Date | string): boolean {
  const inputDate = new Date(date);

  // Kiểm tra nếu date là một ngày hợp lệ
  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date input");
  }

  // So sánh ngày nhập vào với ngày hiện tại
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đặt thời gian hiện tại về 00:00:00 để chỉ so sánh ngày

  return inputDate < today; // Kiểm tra nếu ngày nhập vào trước ngày hiện tại
}
export function isDateGreaterThan(
  date1: Date | string,
  date2: Date | string
): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Kiểm tra xem ngày thứ nhất có lớn hơn ngày thứ hai hay không
  return d1 > d2;
}
