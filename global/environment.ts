


//Variables goblales a toda mi aplicación
//Heroku nos ta esto: process.env.PORT, entonces sino lo encuentra pobra el 3000

export const SERVER_PORT: number = Number( process.env.PORT ) || 3000;
