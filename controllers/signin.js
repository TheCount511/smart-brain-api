const handleSignIn = (dbcall, bcrypt)=>(req, res) => {
    dbcall.select('email', 'hash').from('login').where('email', '=', req.body.email).then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
            return dbcall.select('*').from('users').where('email', '=', req.body.email).then(user => {
                res.json(user[0])
            }).catch(err => res.status(400).json('unable to verify login'))
        } else {
            res.status(400).json('Wrong credentials')
        }
    }).catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignIn
}