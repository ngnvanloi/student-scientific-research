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

  return `${day}-${month}-${year}`;
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
