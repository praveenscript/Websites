
buttons = document.querySelectorAll('.button-options');
console.log(buttons.array);



buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent == 'you clicked me') {
            console.log("already clicked");
        } else {
        console.log("clicked!");
        this.textContent = 'you clicked me'; 
    }


    });
    
});

const eyebutton = document.getElementById('eyebutton');
const passwordInput = document.getElementsByClassName('pass')[0]

eyebutton.addEventListener('click', function() {
    this.style.filter = this.style.filter === 'invert(100%)' ? 'none' : 'invert(100%)';
    passwordInput.type = passwordInput.type === 'password'  ? 'text' : 'password';
    console.log(passwordInput);
});

// passform is the id of the form tag element, input_username id of the input username/email
const user_login = document.getElementById('pass_form')
user_login.addEventListener('submit', function(event){
    event.preventDefault();

    let username = document.getElementById('input_username').value;
    let password = document.getElementById('input_password').value;
    console.log(username, password)
    let hashedPassword = btoa(password); // not using hashing right now

    let userdata = {
        username: username,
        password: hashedPassword
    };

    fetch('/save-user', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(userdata)
    })
    .then(response => response.json())
    .then(data=> console.log(data))
    .catch(error=> console.error('error:', error));

});