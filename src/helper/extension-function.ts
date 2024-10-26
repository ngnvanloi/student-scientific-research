export function isCurrentDateInRange(
  startDate: string | undefined,
  endDate: string | undefined
): boolean {
  const currentDate = new Date(); // Ngày hiện tại
  const start = new Date(startDate || ""); // Ngày bắt đầu
  const end = new Date(endDate || ""); // Ngày kết thúc

  return currentDate >= start && currentDate <= end;
}
