"use client"
import { Client, Databases, Account } from "appwrite";


const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID); // Replace with your project ID

export const account = new Account(client);
export const database = new Databases(client);
