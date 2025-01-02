#!/usr/bin/env node
// This is to make the file executable from the command line using the "myapp" command

import { Hotel } from "../interfaces/IHotel";
import { Booking } from "../interfaces/IBooking";
import { loadJson } from "../utils/loadJsonFile";

import checkAvailability from "../app/checkAvailability";
import allocateRooms from "../app/allocateRooms";
import { displayHelp } from "./displayHelp";

function main() {
  console.log(`
    __        __   _                            
    \\ \\      / /__| | ___ ___  _ __ ___   ___  
     \\ \\ /\\ / / _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ 
      \\ V  V /  __/ | (_| (_) | | | | | |  __/ 
       \\_/\\_/ \\___|_|\\___\\___/|_| |_| |_|\\___| 
                                                
    Welcome to the Hotel Management System!
  
    Type 'help' to see all available commands.
  `);

  const args = process.argv.slice(2);
  const dbFolder = "db/";
  let hotelsFile: string | undefined;
  let bookingsFile: string | undefined;

  args.forEach((arg, index) => {
    if (arg === "--hotels" && args[index + 1]) {
      hotelsFile = dbFolder + args[index + 1];
    }
    if (arg === "--bookings" && args[index + 1]) {
      bookingsFile = dbFolder + args[index + 1];
    }
  });

  if (!hotelsFile || !bookingsFile) {
    console.error("Usage: myapp --hotels hotels.json --bookings bookings.json");
    process.exit(1);
  }

  const hotels: Hotel[] = loadJson<Hotel[]>(hotelsFile);
  const bookings: Booking[] = loadJson<Booking[]>(bookingsFile);

  const input = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  input.on("line", (line: string) => {
    if (!line.trim()) {
      input.close();
      return;
    }

    try {
      if (line.startsWith("Availability")) {
        const match = line.match(/Availability\((.+?),\s*(.+?),\s*(.+?)\)/);

        if (!match) throw new Error("Invalid command format");

        const [_, hotelId, dateRange, roomType] = match;
        const hotel = hotels.find((h) => h.id === hotelId);

        if (!hotel) throw new Error(`Hotel not found: ${hotelId}`);

        const availability = checkAvailability(
          hotel,
          bookings,
          dateRange,
          roomType
        );

        console.log(availability);
      } else if (line.startsWith("RoomTypes")) {
        const match = line.match(/RoomTypes\((.+?),\s*(.+?),\s*(\d+)\)/);

        if (!match) throw new Error("Invalid command format");

        const [_, hotelId, dateRange, peopleStr] = match;
        const people = parseInt(peopleStr, 10);
        const hotel = hotels.find((h) => h.id === hotelId);

        if (!hotel) throw new Error(`Hotel not found: ${hotelId}`);

        const allocation = allocateRooms(hotel, bookings, dateRange, people);

        console.log(allocation);
      } else if (line.startsWith("help")) {
        displayHelp();
      } else {
        throw new Error("Unknown command");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  });
}

main();
