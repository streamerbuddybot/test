// authSlice.ts
import { createSlice, ThunkDispatch} from "@reduxjs/toolkit"; // Import Dispatch
import { Models } from "appwrite";
import { RootState } from "@/app/store";
import { TwitchDataStorage, UserData } from "@/types/database/user";
import { getSessionData, fetchTwitchData, logoutUser } from "./AuthActions";
import { account } from "@/lib/appwrite";
import { baseURl, defaultPage, scopes } from "@/lib/constants";

// Define the type for the state
interface AuthState {
  session: UserData 
  isAuthenticated: boolean;
  loading: "loading" | "succeeded" | "failed";
  error: string | undefined;
}

// Create an async thunk to fetch the initial data

const authSlice = createSlice({
  name: "auth",
  initialState: {
    session: {} as UserData,
    loading: "loading",
    error: undefined,
    isAuthenticated: false,    
  } as AuthState,
  reducers: {
    loginInUser: () => {
      // console.log(`${baseURl}${defaultPage}`)
      account.createOAuth2Session("twitch", `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/overview`, `${process.env.NEXT_PUBLIC_BASE_URL}/error`, scopes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getSessionData.fulfilled, (state, action) => {
        state.session = action.payload;
        state.isAuthenticated = true;
        state.loading = "succeeded";

      })
      .addCase(getSessionData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
        console.log("failed to get session data")
      })
      
      .addCase(logoutUser.pending, (state) => {
        // Handle any loading state related to logout if needed
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Reset the user state upon successful logout
        state.session = {} as UserData
        state.isAuthenticated = false;        
        state.error = undefined;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Handle any errors that may occur during logout if needed
        console.error("Logout error:", action.error);
      });
  },
});

export default authSlice.reducer;
export const { loginInUser } = authSlice.actions;
