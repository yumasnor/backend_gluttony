const Restaurant = require('../model/Restaurant');
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

describe('Restaurant CRUD', () => {
   var id='';
   // adding register
   it('Adding restaurant', () => {
      const restaurant = {
         Restaurantname: 'Java',
         Restauranttype: 'Cafe',
         Restaurantdesc: 'yumasnor@gmail.com',
         Restaurantcontact: '444123',
         Longitude: '23.1235344',
         Latitude: '87.3324535',
         Restaurantlogo: 'Java.jpg'        
      };

      return Restaurant.create(restaurant)
         .then((restaurant_res) => {
            id=restaurant_res._id;
            expect(restaurant_res.Restaurantname).toEqual('Java');
         });
   });

   //update restaurant 
   it('update restaurant', () => {
     
      const restaurantup = {
         
         Restaurantname: 'Coffee Beans'
      }
      console.log(id)
      return Restaurant.findByIdAndUpdate(id,restaurantup,{ new: true })
         .then((restaurantup) => {
            expect(restaurantup.Restaurantname).toEqual('Coffee Beans');
         });
   });

    //Restaurant delete
      it('delete restaurant', async () => {
         const status = await Restaurant.deleteMany({Restaurantname:'Java'});
         expect(status.ok).toBe(1);
      });
    
   });

      
