const User = require('../model/User');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/testdatabase';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});

describe('User Registration', () => {
   var id='';
   // adding register
   it('User register testing', () => {
      const user = {
         Fname: 'Yuma',
         Lname: 'Snor',
         Email: 'yumasnor@gmail.com',
         Username: 'yumasnor',
         Password: 'Dota2',
         Address: 'Dallu',
         Age: '22',
         Usertype: 'User',
         ProfilePic: 'yumasnor.jpg'
      };

      return User.create(user)
         .then((user_res) => {
            id=user_res._id;
            expect(user_res.Fname).toEqual('Yuma');
         });
   });

   //update user
   it('updateuser testing', () => {
     
      const userup = {
         
         Username: 'sulavmalla'
      }
      console.log(id)
      return User.findByIdAndUpdate(id,userup,{ new: true })
         .then((userup) => {
            expect(userup.Username).toEqual('sulavmalla');
         });
   });

    //user delete testing
      it('testing user delete', async () => {
         const status = await User.deleteMany({Usertype:'User'});
         expect(status.ok).toBe(1);
      });
    
   });

      
