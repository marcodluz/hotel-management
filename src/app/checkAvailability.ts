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
  // Parse date range
  const [start, end] = dateRange.includes("-")
    ? dateRange.split("-").map(parseDate)
    : [parseDate(dateRange), parseDate(dateRange)];

  // Filter rooms by type
  const totalRooms = hotel.rooms.filter(
    (room) => room.roomType === roomType
  ).length;

  let bookedRooms = 0;

  // Check each booking for the hotel
  for (const booking of bookings) {
    if (
      // Check if the booking is for the same hotel and room type
      booking.hotelId === hotel.id &&
      booking.roomType === roomType &&
      // Check if the booking overlaps with the requested date range
      Math.max(parseDate(booking.arrival), start) <
        Math.min(parseDate(booking.departure), end)
    ) {
      bookedRooms++;
    }
  }

  return totalRooms - bookedRooms;
}
