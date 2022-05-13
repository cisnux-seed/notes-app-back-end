const Joi = require('joi');

// merupakan fungsi untuk membuata objek
// bersifat tidak diketahui.
// Artinya, objek boleh memiliki property apapun
// karena memang tidak tahu objek dapat memiliki
// property apa saja.
const ImageHeaderSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpg', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown();

module.exports = { ImageHeaderSchema };
