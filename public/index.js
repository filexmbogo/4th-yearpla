

document.addEventListener("DOMContentLoaded", function() {      
    




const form=document.querySelector('#regform').
    form.addEventListener('submit', function (event) {
        
 event.preventDefault();
    
    
       
   
    function ValidateregForm() {   

         //registration form

        //all fiellds must  not empty
        //password should be equal to repeated 
        //email must be in correct format
        const errorMessage = document.querySelector(".error");
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const regmail=document.querySelector('#regmail').value;
    const regname=document.querySelector('#regname').value
    const regpassword=document.querySelector('#regpassword').value
    const repeated=document.querySelector('#repeated').value
    const terms=document.querySelector('#terms').checked
    console.log(regmail,regname,regpassword,repeated,terms);

    if (regmail===''||regname===""||regpassword===''||repeated===''){
        errorMessage.textContent='fill all the fields provided below'
        return false;
    }
    
        if (!emailPattern.test(regmail)) {
            errorMessage.textContent = "Please enter a valid email address.";
            return false;
        }
        if (repeated.length < 6) {
            console.log('here');
                
                 errorMessage.textContent = "Password must be at least 6 characters.";
             }       


    
    if(regpassword!=repeated){
        errorMessage.textContent='your repeated password does not match'
        return false;
    }
    if (regpassword.length < 6) {
            console.log(repeated.length)
            errorMessage.textContent = "Password must be at least 6 characters.";
            return false;
        }
if (!terms){
    errorMessage.textContent='agree to terms and services to proceed'
}
  
else
{errorMessage.textContent=''}
        
        
return true}
console.log(ValidateregForm());



ValidateregForm()
if (!validateregForm()) {
    return;
}
});})