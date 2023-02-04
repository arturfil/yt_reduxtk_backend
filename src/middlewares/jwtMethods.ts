import { Types } from 'mongoose'
import jwt from 'jsonwebtoken';

export const generateJwt = (id: Types.ObjectId, email: string) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {id, email},
            process.env.SECRET_KEY!,
            {expiresIn: "4h"},
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token);
                }
            }
        )
    });
}

// isAuthenticated