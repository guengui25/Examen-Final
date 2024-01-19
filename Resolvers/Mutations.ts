import {ContactModelType,ContactModel} from "../DB/contact.ts"

import { check_telefono } from "../LIB/telefono.ts";

import { GraphQLError } from "graphql";

import mongoose from "mongoose"

export const Mutation = {

    addContact:async (_:unknown,args:{nombre:string,telefono:string}):Promise<ContactModelType> => {
        try{

            const {nombre, telefono} = args;

            const {pais,valid_telefono} = await check_telefono(telefono);
            
            if(!valid_telefono) {throw new Error("Telefono no valido")}

            const newContact = new ContactModel({
                nombre:nombre,
                telefono:telefono,
                pais:pais
            })

            await newContact.save();

            return newContact;

        }catch(e){
            throw new GraphQLError(e);
        }
    },
    deleteContact:async (_:unknown,args:{id:string}):Promise<boolean> => {
        try{

            const {id} = args;

            if(!mongoose.isValidObjectId(id)){throw new Error("Introduce un id de Mongoose valido")}

            const deleteContact = await ContactModel.findByIdAndDelete({id});

            if(!deleteContact){return false};

            return true;

        }catch(e){
            throw new GraphQLError(e);
        } 
    },
    updateContact:async (_:unknown,args:{id:string,nombre:string,telefono:string}):Promise<ContactModelType> => {
        try{
            const {id,nombre,telefono} = args;

            if(!mongoose.isValidObjectId(id)){throw new Error("Introduce un id de Mongoose valido")}

            const updateContact = await ContactModel.findById(id);

            if(!updateContact) {throw new Error ("Contacto no encontrado")}
            
            if(telefono){
                if(updateContact.telefono !== telefono){
                    const {pais,valid_telefono} = await check_telefono(telefono);
    
                    if(!valid_telefono) {throw new Error("Telefono no valido")}
    
                    updateContact.pais = pais;
                    updateContact.telefono = telefono;
                }
            }else{
                updateContact.telefono = updateContact.telefono
                updateContact.pais = updateContact.pais
            }
            
            if(nombre){
                if(updateContact.nombre !== nombre){
                    updateContact.nombre = nombre;

                }
            }else{
                updateContact.nombre = updateContact.nombre
            }
            
            updateContact.save();

            return updateContact;

        }catch(e){
            throw new GraphQLError(e);
        } 
    }
}