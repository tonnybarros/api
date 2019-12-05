const Antl = use('Antl')

class Signup {

    get validateAll() {
        return true
    }

    get rules() {
        return {
            name: 'required',
            username: 'required|unique:users,username',
            email: 'required|email|unique:users,email',
            password: 'required:min:6'
        }
    }

    get messages() {
        return Antl.list('validation')
    }

}

module.exports = Signup