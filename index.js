const express = require('express')
const morgan = require('morgan')
const cors = require('cors');//to aviod CROS
const app = express()
const port = process.env.PORT || '3333';

const user_Router = require('./routers/user.js')
const product_Router = require('./routers/product.js')
const category_Router = require('./routers/category.js')
const renting_operation_Router = require('./routers/renting_operation.js')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/assets/images', express.static('./public/images'))
app.use('/frontend', express.static('frontend'))
//routes
app.use('/api/user',user_Router)
app.use('/api/product',product_Router)
app.use('/api/category',category_Router)
app.use('/api/renting-operation',renting_operation_Router)

//error message
app.use((err,req,res,next)=>{
    res.status(404).json({'msg':err})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
