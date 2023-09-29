import db from '../config/database.js'
import jwt from 'jsonwebtoken'
 
export const ready = (request, response) => {
    response.status(200)
    response.json({pesan : 'halo selamat datang'})
}

export const instagram = (request, response) => {
    response.status(200).json({success : "your password has been changed"})
    const data = request.body
    console.log(data)
} 

export const main = (request, response) => {
    response.status(200)
    response.json({valid : 'akun kamu tervalidasi'})
}

export const admin = (request, response) => {
    const {username, password} = request.body
    const useradmin = process.env.useradmin
    const pwadmin = process.env.pwadmin

    if (username == useradmin && password == pwadmin) {
        const token = jwt.sign({username, password}, process.env.accesstoken)
        response.status(200)
        response.json({token : token})
    } else {
        response.status(404)
        response.json({pesan : 'akun tidak ditemukan'})
    }
}

export const login = (request, response) => {
    const data = (`select * from login where username = ? and password = ?`)
    const {username, password} = request.body
    console.log(username, password)

    db.query(data, [username, password], (error,result) => {
        if (error) throw error
        if (Object.keys(result).length > 0) {
            const parse = JSON.parse(JSON.stringify(result))
            const ID = parse[0].ID
            const token = (jwt.sign({username, data}, process.env.accesstoken))
            response.status(200).json({token : token})
        } else {
            const pesan = `hi ${username}, akun kamu tidak ditemukan!`
            response.status(404)
            response.json({pesan : pesan})
            console.log(pesan)
        }
    })
}

export const register = (request, response) => {
    const data = (`select * from login where username = ?`)
    const {username, password} = request.body

    db.query(data, [username], (error,result) => {
        if (error) {console.log('error')} 
        if (Object.keys(result).length > 0) {
            response.sendStatus(400)
            console.log('akun telah dimiliki')
        } else {
            db.query(`insert into data_login (username, password) values (?, ?)`, [username, password])
            response.sendStatus(201)
        }
    })
}

export const payment = (request, response) => {
    response.status(200)
    response.json({berhasil : "berhasil"})
}