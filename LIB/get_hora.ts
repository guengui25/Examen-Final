export const get_hora =async (pais:string):Promise<{hora:string}>  => {
    
    //Capital usando el pais
    
    const API_KEY  = Deno.env.get("API_KEY");

    if(!API_KEY){throw new Error("No API_KEY")}

    const url_capital = `https://api.api-ninjas.com/v1/country?name=${pais}`;

    const fetch_capital = await fetch(url_capital,{headers:{'X-Api-Key':API_KEY}});

    if(fetch_capital.status !== 200) { throw new Error("Error con la api de capitales")}

    const capital_data = await fetch_capital.json();

    const capital = capital_data[0].capital;

    console.log(capital);

    //Hora usando la capital
    
    const url_hora = `https://api.api-ninjas.com/v1/worldtime?city=${capital}`;

    const fetch_hora = await fetch(url_hora,{headers:{'X-Api-Key':API_KEY}});

    if(fetch_hora.status !== 200) { throw new Error("Error con la api de hora")}

    const hora_data = await fetch_hora.json();

    const hora = hora_data.datetime;

    console.log(hora)

    return hora;
}