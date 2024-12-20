 const {ZodError} = require('zod');
 
 const validateRequestBody =
  (schema) =>
   (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.errors });
      }
    }
  } 

  module.exports = validateRequestBody; 
  