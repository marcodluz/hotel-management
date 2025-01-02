import { parseDate } from "../utils/parseDate";
import { Hotel } from "../interfaces/IHotel";
import { Booking } from "../interfaces/IBooking";

// Check room availability for a specified hotel, date range, and room type
export default function checkAvailability(
  hotel: Hotel,
  bookings: Booking[],
  dateRange: string,
  roomType: string
): number {
  const [start, end] = dateRange.includes("-")
    ? dateRange.split("-").map(parseDate)
    : [parseDate(dateRange), parseDate(dateRange)];

  const totalRooms = hotel.rooms.filter(
    (room) => room.roomType === roomType
  ).length;
  let bookedRooms = 0;

  for (const booking of bookings) {
    if (
      booking.hotelId === hotel.id &&
      booking.roomType === roomType &&
      Math.max(parseDate(booking.arrival), start) <
        Math.min(parseDate(booking.departure), end)
    ) {
      bookedRooms++;
    }
  }

  return totalRooms - bookedRooms;
}
