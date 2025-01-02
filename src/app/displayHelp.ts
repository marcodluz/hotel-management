import { Command } from "../interfaces/ICommand";

const commands: Command[] = [
  {
    name: "Availability",
    args: ["hotelId", "dateRange", "roomType"],
    description: "Check room availability.",
    examples: [
      "Availability(H1, 20240901, SGL)",
      "Availability(H1, 20240901-20240903, DBL)",
    ],
  },
  {
    name: "RoomTypes",
    args: ["hotelId", "dateRange", "numPeople"],
    description: "List available room types.",
    examples: [
      "RoomTypes(H1, 20240904, 3)",
      "RoomTypes(H1, 20240905-20240907, 5)",
    ],
  },
];

export function displayHelp() {
  console.log(`
    Available Commands:
  
  `);

  commands.forEach((command) => {
    console.log(
      `  • ${command.name}(${command.args.map((arg) => `[${arg}]`).join(", ")})`
    );
    console.log(`    ${command.description}`);
    console.log(`    Examples:`);
    command.examples.forEach((example) => {
      console.log(`      - ${example}`);
    });
    console.log();
  });
}
