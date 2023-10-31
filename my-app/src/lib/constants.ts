
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
//returns an array of the values of the userlevels enum
export const UserlevelValue: string[] = Object.values(UserlevelEnum);

//returns an array of the keys and values of the userlevels enum
export const Userlevel: { label: string; value: string }[] = Object.keys(UserlevelEnum).map((key) => ({
  label: key,
  value: UserlevelEnum[key as keyof typeof UserlevelEnum],
}));

//returns the value of the userlevel enum based on the key
export const findKeyByValue = (value: string) => {
  for (const [key, val] of Object.entries(UserlevelEnum)) {
    if (val === value) {
      return key;
    }
  }
  return;
};

//the twitch scopes needed for the streamwizard
export const scopes: string[] = ["channel:manage:redemptions", "channel:read:redemptions"];

//returns the value for a spedific database and collection
export const databases = {
  spotifyIntegration: {
    databaseID: "64eea021e0e4804e0d0e",
    collections: {
      streamserSettings: "64eea13235071b511823",
      bannedViewers: "64f3e217f07063ad99a4",
      bannedSongs: "64eea036557408b933af",
    },
  },
  channelPoints: {
    databaseID: "64f5a59d96ce3e17ffe2",
    //collection for channelPoints is the twitch channelID
  },

  commands: {
    databaseID: "643e77f341e4deeac803",
    //collection for commands is the twitch channelID or teamID
  },

  twitch: {
    databaseID: "64392da4b5e0c9e0949d",
    collections: {
      ClosedBeta: "65079d866c8f2ad4d8e8",
      User: "64393117418a284d87a6",
    },
  },
};

//returns the value for the discord server
export const DiscordServerLink = "https://discord.gg/gjQgv8GGKn";

//returns the url for the default page
export const defaultPage = "/dashboard/twitch/commands";

export const baseURl = "http:localhost:3000"
