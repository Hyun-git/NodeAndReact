const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    //회원가입 할 때 필요한 정보들을 클라이언트 에서 가져오면
    //그것들을 DB에 저장
    const user = new User(req.body)

    user.save((err ,userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

