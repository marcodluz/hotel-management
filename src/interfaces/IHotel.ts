import { Room } from "./IRoom";
import { RoomType } from "./IRoomType";

export interface Hotel {
  id: string;
  name: string;
  roomTypes: RoomType[];
  rooms: Room[];
}
