import Joi from "joi";

const validation = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  course: Joi.string().required(),
  accountNo: Joi.string().required(),
});

export default validation;
