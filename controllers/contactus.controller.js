const { Contactus } = require('../models/contactus.model');
const Joi = require('joi');

// For Any Role
function validateUserRegistration(Contactus) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(200).required(),
        lastname: Joi.string().min(1).max(200).required(),
        emailId: Joi.string().required(),
        mobileNo: Joi.string().min(1).max(200).required(),
        message: Joi.string().min(1).max(200).required()
      
    });

    const result = schema.validate(Contactus);
    return result;
}

const addContactUs = async (req, res, next) => {
    const result = validateUserRegistration(req.body);
    if (result.error) {
        res.status(400);
        return next(new Error(result.error.details[0].message));
    }

    const userData = result.value;

   
    console.log(userData);

  //res.send(userData);
   
    let user = await new Contactus(userData).save();
    res.json({ message: "sucessfully Inserted of contactus" })
    //res.status(200);
   
}


module.exports = { addContactUs };

