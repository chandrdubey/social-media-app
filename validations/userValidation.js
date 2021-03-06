const Joi = require('joi');

module.exports = {
    signup: (data) => {
        //console.log(data);
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),

            password:
                Joi.string().min(3).max(15).required(),

            repeat_password: Joi.ref('password'),

            email: Joi.string()
                .email({ minDomainSegments: 2 , tlds: { allow: ['com']}})
        });
        return schema.validate(data);
    },
    signin: (data) => {
        const schema = Joi.object({
            password:
                Joi.string().min(3).max(15).required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        });
        return schema.validate(data);
    }
}
