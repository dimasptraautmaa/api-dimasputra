import mysql from 'mysql'

const db = mysql.createConnection({
    user : 'vixcera',
    database : 'vixcera',
    password : 'dimas567',
    host : 'db4free.net',
})

db.connect((error) => {(error) ? console.log("==> database error") : console.log("==> database connect")})

export default db