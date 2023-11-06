'use strict'
const jwt = require('jsonwebtoken')
require('dotenv').config();
const JWT_SECRET = "LAMHAIVN"
function sign(email, expiresIn = "30m") {
    return jwt.sign({ email },
        'dai' || JWT_SECRET,
        { expiresIn }
    )
}
function verify(token) {
    try {
        jwt.verify(token, 'dai' || JWT_SECRET);
        return true
    } catch (error) {
        return false;
    }
}
module.exports  = { sign, verify }