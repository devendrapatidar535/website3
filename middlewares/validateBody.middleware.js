 const {ZodError} = require('zod');
 
 const validateRequestBody =
  (schema) =>
   (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    // } catch (error) {
    //   if (error instanceof ZodError) {
    //     //res.status(400).json({ error: error.errors });

    //   }
    // }
    
      }  catch (error) {
        if (error.errors) {
            // Render the error page with validation errors
            return res.render('error', { 
                errors: error.errors 
            });
        }
        
        // Handle other types of errors
        return res.render('error', { 
            errors: [{ message: 'An unexpected error occurred. Please try again.' }] 
        });
    }



  }  

  module.exports = validateRequestBody; 
  