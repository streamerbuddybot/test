import { database } from "@/lib/appwrite";
import { databases } from "@/lib/constants";
import { Command } from "@/types/command";
import { CommandStorage, CommandsStorage } from "@/types/database/commandStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ID, Query } from "appwrite";

// Create an async thunk to fetch the initial data
export const fetchCommandsData = createAsyncThunk<CommandsStorage, { channelID: number; page?: number }>(
  "commands/fetchInitialCommands",
  async ({ channelID, page }, { dispatch }) => {
    // Use { dispatch } to access dispatch

    try {
      // channelID === the collection ID for the command for the streamer
      const response = await database.listDocuments<CommandStorage>(databases.commands.databaseID, channelID.toString(), [
        Query.limit(100),
        Query.offset(page ? page : 0 * 100),
      ]);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const CreateCommand = createAsyncThunk<CommandStorage, { command: Command }>("commands/createCommand", async ({ command }, { dispatch }) => {
  // Use { dispatch } to access dispatch
  try {
    // channelID === the collection ID for the command for the streamer
    const response = await database.createDocument<CommandStorage>(databases.commands.databaseID, command.channelID.toString(), ID.unique(), {
      ...command,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const UpdateCommand = createAsyncThunk<CommandStorage, { command: CommandStorage }>(
  "commands/updateCommand",
  async ({ command }, { dispatch }) => {
    // Use { dispatch } to access dispatch

    try {
      // channelID === the collection ID for the command for the streamer
      const response = await database.updateDocument<CommandStorage>(databases.commands.databaseID, command.channelID.toString(), command.$id, {
        command: command.command,
        message: command.message,
        cooldown: command.cooldown,
        enabled: command.enabled,
        userlevel: command.userlevel,
        function: command.function,
        description: command.description,
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);



export const DeleteCommand = createAsyncThunk("commands/deleteCommand", async ({ command }: { command: CommandStorage }, { dispatch }) => {
  try {
    // channelID === the collection ID for the command for the streamer
    const response = await database.deleteDocument(databases.commands.databaseID, command.channelID.toString(), command.$id);
    return command;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
  }
});
