//import { zod } from "zod";

//import { z } from "zod";  
const z = require('zod');

// Define the Zod schema
 const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" }) // Ensure the name is not empty
    .max(100, { message: "Name must not exceed 100 characters" }), // Limit the length
    
  email: z
    .string()
    .email({ message: "Invalid email address" }), // Validate email format
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }) // Ensure a minimum length
    .max(50, { message: "Password must not exceed 50 characters" }) // Limit the length
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // Ensure uppercase
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // Ensure lowercase
    .regex(/[0-9]/, { message: "Password must contain at least one number" }) // Ensure a number
    .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }) // Ensure special char
});

module.exports = signupSchema;