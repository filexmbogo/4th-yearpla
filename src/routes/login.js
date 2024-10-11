const {Router} =require('express')
const router=  Router()
const crypto=require('crypto')




// Route to handle login with encrypted username
router.get('/login/encryptedUsername', (req, res) => {
    const encryptedUsername = req.params.encryptedUsername;
console.log(encryptedUsername);

    try {
        // Decrypt the username
        const decryptedUsername = decryptData(decodeURIComponent(encryptedUsername));
        
        if (decryptedUsername) {
            res.send(`Login for user: ${decryptedUsername}`);
        } else {
            res.status(400).send('Failed to decrypt username');
        }
    } catch (err) {
        res.status(400).send('Error decrypting data');
    }
});


module.exports= router