import mongoose from "mongoose"

import { Contact } from "../types.ts"
import { GraphQLError } from "graphql";

const Schema = mongoose.Schema;

const ContactSchema = new Schema({

    //_id de mongoose
    nombre:{type:String,required:true},
    telefono:{type:String,required:true,unique:true},
    pais:{type:String,required:true},
})

export type ContactModelType = mongoose.Document & Omit<Contact,"id">

export const ContactModel = mongoose.model<ContactModelType>("Contact",ContactSchema)