const crypto = require('crypto');
//you can use Bcrypt instead of this function but I like to do it this wait to be motre step by step methodological

// TODO
function validPassword(password, hash, salt) {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt: salt, hash: genHash};
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;