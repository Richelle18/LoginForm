const form = document.getElementById('form');
const username  = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show error function
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//show success
function showSuccess(input){
    formControl = input.parentElement;
    formControl.className = 'form-control success';

}
function checkEmail(input){
    const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // return re.test(email); 
    console.log(input.value.trim());
    console.log(re.test(input.value));
    if(re.test(input.value.trim())){
        showSuccess(input)
    }else{
        showError(input, 'Email is not valid');
    }
}

//check required function
function checkRequired(inputArr){
    inputArr.forEach(function (input){
       if(input.value.trim() === ''){
           showError(input, `${getFieldName(input)} is Required `)
       }else{
           showSuccess(input);
       }
       
    })
}

//check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less that ${max} characters`);
    }else{
        showSuccess(input);
    }
}
// check password match
function checkPasswordsMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match');
    }
}


//get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    
    // //username validation
    // if(username.value === ''){
    //     showError(username, 'Username is required');
    // }else if(!isValidEmail(email.value)){
    //     showError(email, 'Email is not Valid')
    // }else{
    //     showSuccess(username);
    // }
    // //email validation
    // if(email.value === ''){
    //     showError(email, 'Email is required');
    // }else{
    //     showSuccess(email);
    // }

    // //password validation
    // if(password.value === ''){
    //     showError(password, 'Password is required');
    // }else{
    //     showSuccess(password);
    // }

    // //confirm password validation
    // if(password2.value === ''){
    //     showError(password2, 'Password is not match');
    // }else{
    //     showSuccess(password2);
    // }


    checkRequired([username, email, password, password2]);
    checkLength(username,3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
});


fetch('http://192.168.100.57:8000/posts')
    .then(res =>{
        if(res.ok ){
            console.log('POST request successful');
            return res
        }else{
            console.log('POST request unsuccessful');
        }
    
    })
    .then((result) => {
        return result.json();
    })
    .then((data)=>{
        console.log(data);
    })
    .catch((err) => {
        
    });