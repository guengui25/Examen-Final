export const check_telefono =async (telefono:string):Promise<{pais:string,valid_telefono:boolean}>  => {
    
    const API_KEY  = Deno.env.get("API_KEY");

    if(!API_KEY){throw new Error("No API_KEY")}

    const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`;

    const fetch_telefono = await fetch(url,{headers:{'X-Api-Key':API_KEY}});

    if(fetch_telefono.status !== 200) { throw new Error("Error con la api de telefonos")}

    const telefono_data = await fetch_telefono.json();

    return{
        pais:telefono_data.country,
        valid_telefono: telefono_data.is_valid
    }
}