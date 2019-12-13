const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

//------------------------------------------------------------

// Test to get experience in generating and returning a token.

server.get('/token',(req,res) => {
 
  const payload = {
    subject: 'thewizardofoz',
    userid: 'kly',
    favoriteFood: 'chocolate'
  };

  const secret = 'iamwhatiam';
  
  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secret, options);
  res.json({'token:':token});
})

module.exports = server;
