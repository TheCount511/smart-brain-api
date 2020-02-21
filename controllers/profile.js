const handleProfile = (dbcall) =>(req, res) => {
    const { id } = req.params;
    dbcall.select('*').from('users').where({ id }).then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('User non existent')
        }
    }).catch(err => res.status(400).json('User non existent'))
}
module.exports = {
    handleProfile
}