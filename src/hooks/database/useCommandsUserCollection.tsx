
import { database } from '@/lib/appwrite'
import { databases } from '@/lib/constants'
import { ID, Query } from 'appwrite'
import React, { useState, useEffect } from 'react'
import { Command } from '@/types/command'
import { useAppSelector } from '../redux'
import { CommandStorage, CommandsStorage } from '../../types/database/commandStorage'

export default function useCommandsUserCollection() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [commands, setCommands] = useState<CommandsStorage>()
  const [page, setPage] = useState<number>(0)
  const {
    session: { channelID },
  } = useAppSelector((state) => state.auth);

  const databaseID = databases.commands.databaseID

  // Define a function to fetch commands
  const fetchCommands = async () => {
    console.log('fetching commands')
    setLoading(true)
    try {
      const res = await database.listDocuments<CommandStorage>(
        databaseID,
        channelID.toString(),
        [],
      )
      setCommands(res)
    } catch (error: any) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  // Use the useEffect hook to fetch commands when the component mounts
  useEffect(() => {
    fetchCommands()
  }, []) // run when the page variable changes to fetch the next page of commands

  //function to fetch the next page of commands
  const nextPage = () => {
    setPage(page + 1)
  }

  //function to fetch the previous page of commands
  const previousPage = () => {
    setPage(page - 1)
  }

  //function to fetch a command based of its function
  const getCommandByFunction = async (functionName: string) => {
    setLoading(true)
    try {
      const res = await database.listDocuments<CommandStorage>(
        databaseID,
        channelID.toString(),
        [Query.equal('function', functionName)],
      )
      if (res.total === 0) {
        setCommands(undefined)
      }
      setCommands(res)
    } catch (error: any) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  //function to update a command
  const updateCommand = async (commandData: Command, documentID: string) => {
    setLoading(true)
    try {
      await database.updateDocument<CommandStorage>(
        databaseID,
        channelID.toString(),
        documentID,
        commandData,
      )
    } catch (error: any) {
      console.log(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  //function to create a command
  const createCommand = async (commandData: Command) => {
    setLoading(true)
    try {
      await database.createDocument<CommandStorage>(
        databaseID,
        channelID.toString(),
        ID.unique(),
        commandData,
      )
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    commands,
    loading,
    error,
    nextPage,
    previousPage,
    getCommandByFunction,
    updateCommand,
    createCommand,
  }
}
