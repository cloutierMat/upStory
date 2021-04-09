const Joi = require('joi')

const validate = (schema, query) => {
	const { value, error } = schema.validate(query)
	return error
}
const validateName = (nameObj) => {
	const schema = Joi.object({
		name: Joi.string()
			.alphanum()
			.min(3)
			.max(15)
			.required()
	})
	return validate(schema, nameObj)
}

const validateId = (idObj, climbers) => {
	const schema = Joi.object({
		id: Joi.number()
			.min(1)
			.valid(...climbers)
	})
	return validate(schema, idObj)
}

module.exports = {
	validateName,
	validateId
}