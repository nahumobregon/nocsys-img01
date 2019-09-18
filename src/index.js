const express = require('express')
const path = require('path')
const morgan = require('morgan')
const multer = require('multer')
const uuid = require('uuid/v4')  //para generar un uuid aleatorio
const {format} = require('timeago.js')

//Inicializaciones
const app=express()
require('./database')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views' , path.join(__dirname, 'views'))
app.set('view engine' , 'ejs')

//instalar middlewares Morgan y Multer
app.use(morgan('dev'))  //visualiza en consola las peticiones al server
app.use(express.urlencoded({extended: false})) //cuando hay multiples inputs, permite entender los datos de los formularios
const storage = multer.diskStorage({
	destination: path.join(__dirname,'public/img/uploads') ,
	filename: (req, file , cb , filename)=>{
		cb(null ,uuid() + path.extname(file.originalname))
	}
})
app.use(multer({
	storage : storage
}).single('image')) //hay que decirle a travez de que input se recibira la imagn

//variables Globales

//middleware
app.use((req,res,next)=>{
	app.locals.format = format
	next()
})

//Routes
app.use(require('./routes/index'))

//Archivos Estaticos -- Para que la carpeta Public pueda ser accedida desde el navegador
app.use(express.static(path.join(__dirname,'public')))

//Start the server
app.listen(app.get('port') , () => {
	console.log(`server on port ${app.get('port')}`)
})
