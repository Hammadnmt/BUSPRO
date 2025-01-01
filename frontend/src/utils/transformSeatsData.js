export function transformSeatsData(data) {
  return data?.map((item) => ({
    seat_numbers: item?.booked_seats?.[0]?.seat_no || [],
    genders: item?.booked_seats?.[0]?.gender || [],
    status: item?.status || "unknown",
  }));
}
