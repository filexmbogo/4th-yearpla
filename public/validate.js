document.addEventListener("DOMContentLoaded", function() {      ;
    


document.querySelector('.loginform').addEventListener('submit', function (event) {
        
        event.preventDefault();

        

        
       
function validateloginForm() {   
    //login form
    const errorMessage = document.querySelector(".error-message");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

//all fiellds must  not empty
//password should be equal to repeated 
//email must be in correct format

    const email = document.querySelector("#email").value;
    const password = document.querySelector(".password").value;
   
    console.log(email);
    

    if (email === "" || password === "") {
        errorMessage.textContent = "Both fields are required.";
        return false;
    }

   
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        return false;
    }

    if (password.length < 6) {
        console.log('dbj')
        errorMessage.textContent = "Password must be at least 6 characters.";
        return false;
    }

    return true;}


validateloginForm()

    if (!validateloginForm()) {
        return;
    }

    const secretKey = 'filexmbogo.691'; 

   
    function encryptData(data) {
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }

    function sendEncryptedRequest() {
        const username = document.querySelector('#email').value; 
        const encryptedUsername = encodeURIComponent(encryptData(username));   
        const url = `/login/:${encryptedUsername}`;

        window.location.href = url;
        console.log(url);
        
    }

    sendEncryptedRequest(); 
});})