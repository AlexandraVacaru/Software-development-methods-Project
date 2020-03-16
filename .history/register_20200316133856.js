function User(firstName, lastName, email, password) {
    return ({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })
}

function Check() {
    if(document.getElementsByName('password')[0].value ==
    document.getElementsByName('confirm')[0].value) {
        document.getElementById('message').style.color = 'green'
        document.getElementById('message').innerHTML = 'matching'
    }
    else{
        document.getElementById('message').style.color = 'red'
        document.getElementById('message').innerHTML = 'not matching'
    }
}

function Submit() {
    var firstName = document.getElementsByName('first-name')[0].value
    var lastName = document.getElementsByName('last-name')[0].value
    var email = document.getElementsByName('email')[0].value
    var password = document.getElementsByName('password')[0].value
    var confirmPassword = document.getElementsByName('confirm')[0].value

    if(password !== confirmPassword) {
        alertify.alert('Passwords not matching!')
        return
    }

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
        if (errorCode == 'auth/weak-password') {
            alertify.alert('The password is too weak.')
        } else {
            alertify.alert(errorMessage)
        }
        console.log(error)
    })

    firebase.database().ref('users/' + firstName + lastName).set(User(firstName, lastName, email, password))
}