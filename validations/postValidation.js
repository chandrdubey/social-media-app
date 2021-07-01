const Joi = require('joi');

module.exports = {
    post: (data) => {
        //console.log(data);
        const schema = Joi.object({
            content:
                Joi.string().min(1).required(),
            title: Joi.string().min(1).required(),
        });
        return schema.validate(data);
    },
    comment: (data) => {
        const schema = Joi.object({
            content:
                Joi.string().min(1).required(),
        });
        return schema.validate(data);
    }
}
