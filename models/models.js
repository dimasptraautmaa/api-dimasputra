import mysql from 'mysql'

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
})

db.connect((error) => {
    if (error) {
        console.log('database disconnected!')
    } else {
        console.log('database connected...')
    }
})

export default db