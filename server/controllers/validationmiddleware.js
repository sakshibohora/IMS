const joi = require('joi');
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = joi.validate(req.body, schema);
      if (result.error) {
        console.log("in result error")
        return res.status(200).json({ validation: false, msg: result })
      }
      if (!req.value) {
        req.value = {}
      }
      console.log("request validate")
      req.value['body'] = result.value;
      next();
    }
  },
  schemas: {
    authSchema: joi.object().keys({
      username: joi.string().regex(/^[a-zA-Z]+$/).required(),
      password: joi.string().required(),
      firstName: joi.string().regex(/^[a-zA-Z]+$/).required(),
      lastName: joi.string().regex(/^[a-zA-Z]+$/).required(),
      email: joi.string().email().required(),
      contactNo: joi.number().min(999999999).max(9999999999).required(),
      role: joi.boolean().required(),
      status: joi.boolean().required()
    })
  },
  category: {
    authSchema: joi.object().keys({
      categoryType: joi.string().regex(/^[a-zA-Z]*\s?[a-zA-Z]+$/).required()
    })
  },
  component:{
    authSchema:joi.object().keys({
      componentName:joi.string().regex(/^[a-zA-Z]*\s?[a-zA-Z]+$/).required(),
      status: joi.boolean().required(),
      categoryId:joi.any(),
      warrantyDate:joi.date(),
      serialNo:joi.string().regex(/^[a-zA-Z0-9]+$/).required(),
    })
  }
}