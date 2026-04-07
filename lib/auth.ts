import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET!;

export function signToken(payload: object) {
    //this function creates a JWT token with the given payload and a secret key
    // and sets an expiration time of 1 hour
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
    // this function verifies the given JWT token using the secret key
    // if the token is valid, it returns the decoded payload
    // if the token is invalid or expired, it throws an error
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token', { cause: error });
    }
}
