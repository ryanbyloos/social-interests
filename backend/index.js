const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');

const port = process.env.PORT || 8080;
const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

authRoutes(app);
userRoutes(app);
bookRoutes(app);

app.listen(port, () => console.log(`App listening on port ${port}!`))

db.mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to the database");
        dbInit();
    }
    )
    .catch(err => {
        console.log("Could not connect to the database. Exiting now...", err);
        process.exit();
    }
    );

const dbInit = () => {
    db.role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new db.role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new db.role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}