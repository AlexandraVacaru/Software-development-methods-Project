function User(firstName, lastName, email, password, height, weight, age, gender, freeTime, exercisePerWeek,uid) {
    return ({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        height: height,
        weight: weight,
        age: age,
        gender: gender,
        freeTime: freeTime,
        exercisePerWeek: exercisePerWeek,
        uid : uid
    })
}

function submit() {
    var firstName = document.getElementById('first-name').value
    var lastName = document.getElementById('last-name').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var height = document.getElementById('height').value
    var weight = document.getElementById('weight').value
    var age = document.getElementById('age').value

    var gender = document.getElementsByName('gender')
    if(gender[0].checked) {
        gender = 'male'
    } else {
        gender = 'female'
    }

    var freeTime = document.getElementById('free-time')
    freeTime = freeTime.options[freeTime.selectedIndex].value

    var exercisePerWeek = document.getElementById('exercise-per-week')
    exercisePerWeek = exercisePerWeek.options[exercisePerWeek.selectedIndex].value

    /*firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code
        var errorMessage = error.message
    })*/

    
    
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (userCreds) {
            console.log(userCreds.user.uid);
            firebase.database().ref('users/' + userCreds.user.uid).set(User(
                firstName, lastName, email, password, 
                height, weight, age, gender, freeTime, exercisePerWeek,userCreds.user.uid))
            })

    

    /*firebase.database().ref('users/' + firstName + ' ' + lastName).set(User(
        firstName, lastName, email, password, 
        height, weight, age, gender, freeTime, exercisePerWeek))

        var uid = firebase.auth().currentUser.uid;
        console.log(uid);*/
}