const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // note - this is a unqiue index - not a validation
    validate: {
      validator: function(value) {
          const self = this;
          const errorMsg = 'Username already in use!';
          return new Promise((resolve, reject) => {
              self.constructor.findOne({ username: value })
                  .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                  .catch(err => resolve(true)) // make sure to check for db errors here
          });
      },
  }
  },
  email: {
    type: String,
    required: true,
    unique: true, // note - this is a unqiue index - not a validation
    validate: {
        validator: function(value) {
            const self = this;
            const errorMsg = 'Email already in use!';
            return new Promise((resolve, reject) => {
                self.constructor.findOne({ email: value })
                    .then(model => model._id ? reject(new Error(errorMsg)) : resolve(true)) // if _id found then email already in use 
                    .catch(err => resolve(true)) // make sure to check for db errors here
            });
        },
    }
  },
  email_verfiy: {
    type: String,
  },
  password: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  status: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)