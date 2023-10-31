export enum UserlevelEnum {
  Everyone = "everyone",
  Follower = "follower",
  Vip = "vip",
  Founder = "founder",
  Subscriber = "subscriber",
  Moderator = "moderator",
  Broadcaster = "broadcaster",
  Verified = "verified",
  Prime = "prime",
  Artist = "artist",
  TwitchStaff = "staff",
}

export interface Command {
  command: string;
  message: string;
  cooldown: number;
  enabled: boolean;
  channelID: number;
  userlevel: string;
  function: string | null;
  description: string;
}