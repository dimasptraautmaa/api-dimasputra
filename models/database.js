import mysql from 'mysql'

const db = mysql.createConnection({
    database : 'databasebaru',
    password : '',
    host : 'localhost',
    user : 'root',
})

db.connect((error) => {
    if (error) {
        console.log('database disconnected!')
    } else {
        console.log('database connected...')
    }
})

export default db