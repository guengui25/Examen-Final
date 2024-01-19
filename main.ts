import { ApolloServer} from "@apollo/server"

import {startStandaloneServer} from "@apollo/server/standalone"

import mongoose from "mongoose"

import {typeDefs} from "./GraphQL/typeDefs.ts"

try{

    const MONGO_URL  = Deno.env.get("MONGO_URL");

    if(!MONGO_URL){throw new Error("No mongo URL")}

    await mongoose.connect(MONGO_URL);

    const resolvers = {};

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    const {url}  = await startStandaloneServer(server,{listen: {port: 3000}})

    console.log(`Servidor corriendo en ${url}`)

}catch(e){
    console.error(e);
}