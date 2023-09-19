import jwt from 'jsonwebtoken'

export const verifytoken = (request, response, next) => {
    const auth = request.headers['authorization']
    const token = auth && auth.split(' ')[1]
    if (token == null) {
        response.status(401)
        response.json({pesan : 'token kosong'})
        console.log('token kosong')
    } else {
        jwt.verify(token, process.env.accesstoken, (error, data) => {
            if (error) {
                response.status(401).json({pesan : 'token tidak valid'})
            } else {
                response.status(200)
                console.log('token terisi')
                request.username = data.username
                next()
            }
        })
    }
}

export const paymentKey = (request, response, next) => {
    const auth = request.headers['authorization']
    const key = auth && auth.split(' ')[1]
    if (key == null) {
        response.status(401)
        response.json({pesan : 'key kosong'})
    } 
    if (key != process.env.paymentKey) {
        response.status(403) 
        response.json('key tidak sesuai')
    }
    if (key == process.env.paymentKey) {
        response.status(200)
        response.json('oke')
        next()
    } 
}