const handleSignin = (request, response, db, bcrypt) => {
    const {email, password} = request.body;
    if(!email || !password) {
        return response.status(400).json('incorrect form submission');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        if(data.length){
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if(isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        response.json(user[0])
                    })
                    .catch(err => response.status(400).json('error logging in'));
            } else {
                throw ('wrong credentials');
            }
        } else {
            throw ('wrong credentials');
        }
        
    })
    .catch(err => response.status(400).json(err));
};

module.exports = {
    handleSignin: handleSignin
}