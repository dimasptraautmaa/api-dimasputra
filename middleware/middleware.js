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