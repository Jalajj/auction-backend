const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRouter = require('./routes/product.routes')
const userRouter = require('./routes/user.routes')
const categoryRouter = require('./routes/category.routes')
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require("morgan");
// const handleErrors = require('./middlewares/error')
const port = process.env.PORT || 4000;

dotenv.config({path:"./config.env"});

const app = express();

//Cors setup 
const whitelist = ['http://localhost:3000','http://localhost:4000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Admin Resource! You cant access this origin"))
    }
  },
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}
app.use(cors(corsOptions));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(morgan('tiny'));
app.use(bodyParser.json())
app.use(express.json());
 app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
// app.use("/", enrollmentRouter)

app.get("/welcome", (request, response) => {
    response.status(200).send("<h1>Jalaj</h1>");
  });

mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log("Connected successfully to the database")
}).catch((err) => {
    console.log(err)
})

app.get('/', (req, res) => {
    res.send("I am server")
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

module.exports = app;