const { Router } = require('express')
const router = Router()

// unlink nos va a servir para borrar la imagen
const { unlink } = require('fs-extra')
// la razon de importar path es porque estamos trabajando con rutas del sistema
// path me devuelve el inicio de /src
const path = require('path')
const Image = require('../models/image')

router.get('/', async (req,res) =>{
	//res.send('index page')
	const images = await Image.find()
	console.log(images)
	res.render('index' , {images : images})
})

router.get('/upload', (req,res) =>{
	//res.send('Form Upload')
	res.render('upload')
})

router.post('/upload', async (req,res) =>{
	console.log('.....req.file......')
	console.log(req.file)
	
	const image = new Image()
	image.title = req.body.title
	image.description = req.body.description
	image.filename = req.file.filename
	image.path ='/img/uploads/' + req.file.filename
	image.originalname = req.file.originalname
	image.mimetype = req.file.mimetype
	image.size = req.file.size
	console.log('Objeto Image')
	console.log(image)

    await image.save()
	
	res.redirect('/')
})

router.get('/image/:id',async (req,res) =>{
	//res.send('Profile Img')
	const { id } = req.params
	const image = await Image.findById(id)
	//Otra manera : Image.findById(req.params.id)
	console.log(image)
	res.render('profile', { image: image}) // con { image: image} , le pasamos datos a la vista
})

router.get('/image/:id/delete',async (req,res) =>{
	console.log(req.params.id)
	const { id } = req.params
	const image = await Image.findByIdAndDelete(id)
	await unlink(path.resolve('./src/public' + image.path))

	res.redirect('/')	
	//res.send('Image deleted')
})



module.exports = router