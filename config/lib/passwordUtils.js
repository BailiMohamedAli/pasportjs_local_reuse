const crypto = require('crypto');
//I think I'll work on a Bcrypt bassed passUtil system less complicated LOL complicated HHH

// TODO
function validPassword(password, hash, salt) {
    console.log('we r in password validation');
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