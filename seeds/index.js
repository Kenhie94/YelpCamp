const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://kenhiebusiness:KA9QfhKZ7HUlodDG@cluster0.lqucgiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 30)
        const camp = new Campground({
          author: '666b84cf3a1726441ac32018',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, alias deserunt quam veniam adipisci, incidunt aspernatur blanditiis hic dolorum amet eius cum nulla temporibus ducimus quisquam consectetur cumque, consequatur voluptate?',
          price,
          geometry: {
            type: "Point",
            coordinates: [
              cities[random1000].longitude,
              cities[random1000].latitude,
            ]
          },
          images: [
            {
              url: 'https://res.cloudinary.com/dkbtlt1qt/image/upload/v1719946020/YelpCamp/vdcgvartqoeaqgr2e6fo.jpg',
              filename: 'YelpCamp/vdcgvartqoeaqgr2e6fo',
            },
            {
              url: 'https://res.cloudinary.com/dkbtlt1qt/image/upload/v1719946020/YelpCamp/kd08gpvmektnabfaqskr.jpg',
              filename: 'YelpCamp/kd08gpvmektnabfaqskr',
            }
          ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})