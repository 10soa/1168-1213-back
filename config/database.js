const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://NickSoa:nick1234@cluster0.aarxxjp.mongodb.net/BaseAPK',
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {console.log("Connection MongoDB Atlas: OK!")});


