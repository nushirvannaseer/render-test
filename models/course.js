const Joi = require('joi')
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
   code: String,
   name: String, 
   duration: Number,
   description: String,
   fee: Number,
   credits: Number
})


// module.exports.User = mongoose.model('User', userSchema)
// module.exports.validate = validateUser

//OR 

module.exports = mongoose.model('Course', courseSchema)



// user 1 {
//     name: "nushirvan",
//     .....,
//     courses: [
//         {
//             id: 1,
//             ...
//         },
//         {
//             id: 2,
//             ...
//         }
//     ]
// }

// user 2 {
//     name: "afaq",
//     .....,
//     courses: [
//         {
//             id: 1,
//             ...
//         },
//         {
//             id: 2,
//             ...
//         }
//     ]
// }

// Courses: [
//     {
//         id: 1,
//         ...
//     },
//     {
//         id: 2,
//         ....
//     },
//     ...
// ]