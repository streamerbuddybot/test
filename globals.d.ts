declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: string;
    NEXT_PUBLIC_APPWRITE_PROJECTID: string;
    NEXT_PUBLIC_APPWRITE_DATABASE_ID: string;
    NEXT_PUBLIC_APPWRITE_COMMAND_COLLECTION_ID: string;
    APPWRITE_API_KEY: string;
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URL: string;
    NEXT_PUBLIC_TWITCH_CLIENT_ID: string;
    NEXT_PUBLIC_BASE_URL: string;
    NEXT_PUBLIC_BACKEND_URL: string
  }
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
  }
}

declare global {
  wi;
  interface window {
    onSpotifyWebPlaybackSDKReady: any;
  }
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
  }
}
