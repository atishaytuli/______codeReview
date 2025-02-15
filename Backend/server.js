require('dotenv').config();
const app = require('./src/app')


app.listen(7000, ()=> {
    console.log('Server started on port 7000')
})