function User(firstName, lastName, email, password) {
    return ({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
}

function Submit() {
    var firstName = document.getElementsByName('first-name')[0].value
    var lastName = document.getElementsByName('last-name')[0].value
    var email = document.getElementsByName('email')[0].value
    var password = document.getElementsByName('password')[0].value
    var confirmPassword = document.getElementsByName('confirm')[0].value

    if (confirmPassword !== password) {
        confirmPassword.setCustomValidity('Password do not match.')
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.')
        } else {
            alert(errorMessage)
        }
        console.log(error)
    })

    firebase.database().ref('users/' + firstName + lastName).set(User(firstName, lastName, email, password))
}