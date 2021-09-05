const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Property = require('../models/property');

mongoose.connect('mongodb://localhost:27017/shumel-realestate', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Property.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const property = new Property({
            author: '6120563e12b5470801c31a0f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/shumelz/image/upload/v1630206581/ShumelRealEstate/hbhkfbzzizkj1kytrnvo.jpg',
                    filename: 'ShumelRealEstate/hbhkfbzzizkj1kytrnvo'
                },
                {
                    url: 'https://res.cloudinary.com/shumelz/image/upload/v1630209797/ShumelRealEstate/ne1ikbeuw0lty1d6ddxg.jpg',
                    filename: 'ShumelRealEstate/ne1ikbeuw0lty1d6ddxg'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await property.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
