// use the path of your model
const user = require('../model/User');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/user_test';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('Product Schema test anything', () => {
// the code below is for insert testing
 it('Add product testing anything', () => {
 const user = {
 'Username': 'Hammer',
 'Password': 'Head'
 };

 return User.create(user)
 .then((pro_ret) => {
 expect(pro_ret.Username).toEqual('Hammer');
 expect(pro_ret.Password).toEqual('Head');
 });
 });
});