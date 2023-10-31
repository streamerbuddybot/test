// authSlice.ts
import { createSlice, createAsyncThunk, Dispatch } from "@reduxjs/toolkit"; // Import Dispatch
import { ID, Models, Query } from "appwrite";
import { RootState } from "@/app/store";
import { CommandStorage, CommandsStorage } from "@/types/database/commandStorage";
import { CreateCommand, DeleteCommand, UpdateCommand, fetchCommandsData } from "./commandActions";

// Define the type for the state
interface CommandState {
  commandData: CommandsStorage;
  loading: "idle" | "loading" | "succeeded" | "failed";
  enabledLoading: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const commandSlice = createSlice({
  name: "commands",
  initialState: {
    commandData: {},
    loading: "idle",
    enabledLoading: "idle",
    error: undefined,
  } as CommandState,
  reducers: {
    // Add your custom action here
    updateCommandStatus: (state, action) => {
      const { index, value, command } = action.payload;

      if (index === -1) {
        state.commandData.documents = [...state.commandData.documents, command];
      } else {
        state.commandData.documents = state.commandData.documents.map((item, i) => (i === index ? { ...item, enabled: value } : item));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommandsData.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchCommandsData.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.commandData = action.payload;
      })
      .addCase(fetchCommandsData.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      //create command
      .addCase(CreateCommand.pending, (state) => {
        state.enabledLoading = "loading";
      })
      .addCase(CreateCommand.fulfilled, (state, action) => {
        state.enabledLoading = "succeeded";
        state.commandData.documents = [...state.commandData.documents, action.payload];
      })
      .addCase(CreateCommand.rejected, (state, action) => {
        state.enabledLoading = "failed";
        state.error = action.error.message;
      })
      //delete command
      .addCase(DeleteCommand.pending, (state) => {
        state.enabledLoading = "loading";
      })
      .addCase(DeleteCommand.fulfilled, (state, action) => {
        state.enabledLoading = "succeeded";
        state.commandData.documents = state.commandData.documents.filter((command) => command.$id !== action.payload.$id);
      })
      .addCase(DeleteCommand.rejected, (state, action) => {
        state.enabledLoading = "failed";
        state.error = action.error.message;
      })
      // update command
      .addCase(UpdateCommand.pending, (state) => {
        state.enabledLoading = "loading";
      })
      .addCase(UpdateCommand.fulfilled, (state, action) => {
        state.enabledLoading = "succeeded";
        state.commandData.documents = state.commandData.documents.map((command) => (command.$id === action.payload.$id ? action.payload : command));
      })
      .addCase(UpdateCommand.rejected, (state, action) => {
        state.enabledLoading = "failed";
        state.error = action.error.message;
      });
  },
});
export const { updateCommandStatus } = commandSlice.actions;
export default commandSlice.reducer;
