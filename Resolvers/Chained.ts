
import {ContactModelType,ContactModel} from "../DB/contact.ts"

import { GraphQLError } from "graphql";

import { get_hora } from "../LIB/get_hora.ts";

export const Contact = {

    hora:async (parent: ContactModelType):Promise<{hora:string}> => {
        try{
            const hora = await get_hora(parent.pais);

            return hora;

        }catch(e){
            throw new GraphQLError(e);
        }
    }
}