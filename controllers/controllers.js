import db from '../models/models.js'
import jwt from 'jsonwebtoken'
 
export const ready = (request, response) => {
    const ip = 
    request.headers['cf-connecting-ip'] ||
    request.headers['x-real-ip'] || 
    request.headers['x-forwarder-for'] ||
    request.socket.remoteAddress || ''
    console.log(ip)
    response.status(200)
    response.json('server ready!')
}

export const main = (request, response) => {
    response.status(200)
    response.json({valid : 'akun kamu tervalidasi'})
}

export const login = (request, response) => {
    const data = (`select * from data_login where username = ? and password = ?`)
    const {username, password} = request.body

    db.query(data, [username, password], (error,result) => {
        if (error) console.log('error')
        if (Object.keys(result).length > 0) {
            const token = (jwt.sign({username}, process.env.accesstoken))
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
    const data = (`select * from data_login where username = ?`)
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