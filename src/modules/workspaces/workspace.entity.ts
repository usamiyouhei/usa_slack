import { Channel } from "../channels/channel.entitiy";

export class Workspace {
  id!: string;
  name!: string;
  channels!: Channel[];
  constructor(data: Workspace) {
    Object.assign(this, data);
    this.channels = data.channels.map((channel) => new Channel(channel));
  }
}
