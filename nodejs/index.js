const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key')
const {auth} = require('./middleware/auth')
const cookieParser = require('cookie-parser')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser())


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/hello', (req, res) => res.send('Hello World!'))


app.post('/api/users/register', (req, res) => {
    //회원가입 할 때 필요한 정보들을 클라이언트 에서 가져오면
    //그것들을 DB에 저장
    const user = new User(req.body)


    user.save((err ,userInfo) => {
        if(err) return res.json({ registerSuccess: false, err})
        return res.status(200).json({
            registerSuccess: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    
    //요청된 이메일을 데베에서 찾기
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //비밀번호랑 같은지 확인
        user.comparePassword(req.body.password, (err, isMatch)=> {
            if(!isMatch) return res.json({
                loginSuccess: false, message: "비밀번호가 틀렸습니다."
            })
            //비밀번호 맞으면 토큰 생성
            user.genToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                //토큰을 저장한다 -> 쿠키, 로컬스토리지 등등
                res.cookie("x_auth",user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id})
            })

        })
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
    { token: "" },
    (err, user) => {
        if(err) return res.json({ logoutSuccess:false, err});
        return res.status(200).json({
            logoutSuccess:true
        })
    })
})

app.get('/api/users/auth', auth ,(req, res) => {

    // 여기는 미들웨어 통과 후 내용 => Authentication 이 Ture
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        lastname:req.user.lastname,
        role:req.user.role,
        image:req.user.image
    })

})
