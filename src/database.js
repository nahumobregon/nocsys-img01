const mongoose = require('mongoose')

mongoose.connect('process.env.MONGODB_URI || mongodb://localhost/finterest_tutorial', {
	//userNewUrlParser: true
	useCreateIndex: true ,
	useNewUrlParser: true ,
	useFindAndModify: false	
})
.then (db => console.log('DB is Connected'))
.catch(err => console.errpr(err))