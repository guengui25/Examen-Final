/*
getContact, cuyo parámetro debe ser el id generado por mongo y que devuelve:
Nombres y apellidos.
Número de teléfono
País de residencia
Hora actual de la capital del país de residencia.

*/


import { GraphQLError } from "graphql";

import {ContactModelType,ContactModel} from "../DB/contact.ts"

import mongoose from "mongoose"

export const Query = {

    //getContact(id:ID!):Contact!

    getContact:async (_:unknown, args:{id:String}):Promise<ContactModelType> => {
        try{

            const {id} = args;
            
            if(!mongoose.isValidObjectId(id)){throw new Error("Introduce un id de Mongoose valido")}


            const Contact_db = await ContactModel.findById(id);

            if(!Contact_db){throw new Error(`No se ha encontrado el contacto con el id ${id}`)}

            return Contact_db;

        }catch(e){
            throw new GraphQLError(e);
        }
    },
    getContacts: async ():Promise<ContactModelType[]> => {
        try{

            const Contacts_db = await ContactModel.find();

            return Contacts_db;
            
        }catch(e){
            throw new GraphQLError(e);
        }
    }
}