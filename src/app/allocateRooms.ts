import { Booking } from "../interfaces/IBooking";
import { Hotel } from "../interfaces/IHotel";
import { parseDate } from "../utils/parseDate";

// Calculate room allocations to accommodate a specified number of people
export default function allocateRooms(
  hotel: Hotel,
  bookings: Booking[],
  dateRange: string,
  people: number
): string {
  const [start, end] = dateRange.includes("-")
    ? dateRange.split("-").map(parseDate)
    : [parseDate(dateRange), parseDate(dateRange)];

  const roomCapacities: Record<string, number> = {
    SGL: 1,
    DBL: 2,
  };

  const availableRooms = hotel.rooms.filter((room) => {
    const booked = bookings.some(
      (booking) =>
        booking.hotelId === hotel.id &&
        booking.roomType === room.roomType &&
        Math.max(parseDate(booking.arrival), start) <
          Math.min(parseDate(booking.departure), end)
    );
    return !booked;
  });

  const roomCount: Record<string, number> = {};
  for (const room of availableRooms) {
    roomCount[room.roomType] = (roomCount[room.roomType] || 0) + 1;
  }

  const result: string[] = [];
  for (const [roomType, capacity] of Object.entries(roomCapacities).sort(
    (a, b) => b[1] - a[1]
  )) {
    while (roomCount[roomType] && people >= capacity) {
      result.push(roomType);
      roomCount[roomType]--;
      people -= capacity;
    }
  }

  if (people > 0) {
    return "Error: Allocation not possible";
  }

  return result.join(", ");
}
