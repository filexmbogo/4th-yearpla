const express= require ('express')
const app=express()
const port =process.env.port||10000

//database
const mongoose=require("mongoose")
const mongoURI = process.env.MONGODB_URI || 'mongodb://27017/docs';
const conn=mongoose.createConnection(mongoURI)

//gridfs to upload and serve files in chunks
const grid= require('gridfs-stream')
const {GridFSBucket}= require('mongodb')

//multer for file upload
const multer=require('multer')
const storage=multer.memoryStorage()
const upload=multer({storage})

//handle paths
const crypto= require('crypto')
const path=require ('path')

const methodoveride=require('method-override')

//router
const loginrouter= require('./src/routes/login')
const  register= require('./src/routes/register')
app.use(loginrouter)
app.use(register)
//middlewares
app.use(express.json())
app.use(express.static('./public'))
app.use(methodoveride('_method'))
app.set('view engine','ejs')
app.set('views','src/views')


//initialize gridfs
let gfs,gridfsbuccket;
conn.once('open',()=>{
    gridfsbuccket=new GridFSBucket(conn.db,{bucketName:'pdfs'})

gfs=grid(conn.db,mongoose.mongo)
gfs.collection('pdfs')})


//homepage
app.get("/",(req,res)=>{
    res.render('login',{})
})
app.get('/pdf/:id', async(req, res) => {
    const key = new mongoose.Types.ObjectId(req.params.id);
  
    let file = await gfs.files.findOne({ _id: key })
    
        if (!file || file.length === 0) {
          return res.status(404).json({ message: 'File not found' });
        }
        console.log(file);
        
    
        if (file.contentType === 'application/pdf') {
          res.set({'Content-Type':file.contentType,
            'Content-Disposition': `attachment; filename="${file.filename}"`
          });
          
          // Stream the file from GridFS to the client
          const downloadStream = gridfsbuccket.openDownloadStream(key);
          downloadStream.pipe(res);
          console.log(downloadStream);
          
          

        } else {
          res.status(404).json({ message: 'Not a PDF file' });
        }
      
  });


app.get("/upload", async (req, res) => {
    try {
        let files = await gfs.files.find().toArray();
        res.render('index',{files})
    } catch (err) {
        res.json({err})
    }
 });
   

app.post('/docs/upload',upload.single('pdf'),(req,res)=>{
const {buffer}=req.file
const filename=crypto.randomBytes(16).toString('hex') +path.extname(req.file.originalname)
//use grid fs uploadstream to save data
const uploadstream=gridfsbuccket.openUploadStream(filename,
    {_id:req.file.originalname,
        contentType:req.file.mimetype,
        metadata:{
            originalname:req.file.originalname
        }
    })
    uploadstream.end(buffer)
    uploadstream.on('finish',()=>{res.redirect('/upload')})
console.log(req.file.originalname);


})








app.listen(port,()=>{console.log('serve is listening at port 3000');
})



