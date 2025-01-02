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
  // Parse date range
  const [start, end] = dateRange.includes("-")
    ? dateRange.split("-").map(parseDate)
    : [parseDate(dateRange), parseDate(dateRange)];

  const roomCapacities: Record<string, number> = {
    SGL: 1,
    DBL: 2,
  };

  // Filter rooms that are not booked for the specified date range
  const availableRooms = hotel.rooms.filter((room) => {
    const booked = bookings.some(
      (booking) =>
        // Check if the booking is for the same hotel and room type
        booking.hotelId === hotel.id &&
        booking.roomType === room.roomType &&
        // Check if the booking overlaps with the requested date range
        Math.max(parseDate(booking.arrival), start) <
          Math.min(parseDate(booking.departure), end)
    );

    // Return true if the room is not booked
    return !booked;
  });

  const roomCount: Record<string, number> = {};

  // Count the number of available rooms for each room type
  for (const room of availableRooms) {
    roomCount[room.roomType] = (roomCount[room.roomType] || 0) + 1;
  }

  const result: string[] = [];

  // Sort the room types by capacity in descending order
  for (const [roomType, capacity] of Object.entries(roomCapacities).sort(
    (a, b) => b[1] - a[1]
  )) {
    // Allocate rooms for the requested number of people
    while (roomCount[roomType] && people >= capacity) {
      result.push(roomType);
      roomCount[roomType]--;
      people -= capacity;
    }

    // Partially allocate a room if the remaining number of people is less than the room capacity
    if (roomCount[roomType] && people > 0 && people < capacity) {
      result.push(roomType + "!");
      roomCount[roomType]--;
      people = 0;
    }
  }

  if (people > 0) {
    return "Error: Allocation not possible";
  }

  return result.join(", ");
}
