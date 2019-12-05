const Antl = use('Antl')

class Login {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      username: 'required',
      password: 'required|min:6'
    }
  }

  get messages() {
    return Antl.list('validation')
  }

}

module.exports = Login
