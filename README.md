# 🏨 Hotel Management System

Hotel Management is a command-line tool for managing hotel and booking data with ease. This application simplifies the process of loading and handling data from JSON files.

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download) (v14 or higher)

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/marcodluz/hotel-management.git

   cd hotel-management
   ```

2. Run the setup script to prepare the application:

   ```bash
   node setup.js
   ```

   This script will:

   - Install dependencies
   - Build the project
   - Make the index script executable
   - Link the application globally

## Usage

Once the setup is complete, you can run the application with the following command:

```bash
myapp --hotels hotels.json --bookings bookings.json
```

### Options

- `--hotels`: Specifies the path to the JSON file containing hotel data located within the `/db` directory.
- `--bookings`: Specifies the path to the JSON file containing booking data located within the `/db` directory.

### Commands

#### Availability Command

The `Availability` command retrieves the availability count for a specified room type and date or date range.

##### Input format:

```bash
Availability(HOTEL_CODE, DATE, ROOM_TYPE)
Availability(HOTEL_CODE, START_DATE-END_DATE, ROOM_TYPE)
```

- `HOTEL_CODE`: The unique code for the hotel (e.g., `H1`).
- `DATE`: A specific date in `YYYYMMDD` format.
- `START_DATE-END_DATE`: A range of dates in `YYYYMMDD-YYYYMMDD` format.
- `ROOM_TYPE`: The type of room (e.g., `SGL` for Single, `DBL` for Double).

##### Example Input:

```bash
Availability(H1, 20240901, SGL)
Availability(H1, 20240901-20240903, DBL)
```

##### Example Output:

```
1
2
```

**Note:** Hotels sometimes allow overbookings, so the availability count can be negative.

#### Availability Command

The `RoomTypes` command retrieves the available room types and their counts for a specified number of bookings on a given date or date range.

##### Input format:

```bash
RoomTypes(HOTEL_CODE, DATE, BOOKING_COUNT)
RoomTypes(HOTEL_CODE, START_DATE-END_DATE, BOOKING_COUNT)
```

- `HOTEL_CODE`: The unique code for the hotel (e.g., `H1`).
- `DATE`: A specific date in `YYYYMMDD` format.
- `START_DATE-END_DATE`: A range of dates in `YYYYMMDD-YYYYMMDD` format.
- `BOOKING_COUNT`: The number of bookings to check for room type availability.

##### Example Input:

```bash
RoomTypes(H1, 20240904, 3)
RoomTypes(H1, 20240905-20240907, 5)
```

##### Example Output:

```
DBL, DBL!
DBL, DBL, SGL
```

**Note:** If a room is partially filled, the room should be marked with a `!` and show an error if the allocation is not possible.

## Troubleshooting

If you encounter any issues:

1. Ensure Node.js and npm are correctly installed.
2. Verify that the `setup.js` script completed successfully.
3. Check the paths provided for the `--hotels` and `--bookings` options.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the [MIT License](https://github.com/marcodluz/hotel-management?tab=MIT-1-ov-file)
