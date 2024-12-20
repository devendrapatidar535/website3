const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/database/usersSchema');
const auth= require('../middlewares/jwt.middleware')
const sendRegistrationEmail= require('../utils/mailer.utils')
const signupSchema = require('../models/schema/signupEndpoints.shema')
const validateRequestBody = require('../middlewares/validateBody.middleware');

//const fetch = require('node-fetch');
// User signup route
router.post('/signup',validateRequestBody(signupSchema),  async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
             res.redirect('/email');    
           // return res.status(400).json({ message: "Email already registered." });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

      await sendRegistrationEmail(newUser.name,newUser.email);



        //res.status(201).json({ message: "User created successfully" });
        console.log('New user created:', newUser);
        res.redirect('/registration-success');  


    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: "An error occurred during signup." });
    }
});

// User login route
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate required fields
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please provide both email and password." });
//         }

//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Verify password
//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(401).json({ message: "Invalid password." });
//         }

//         // Generate JWT token
//         const token = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET || 'your-secret-key',
//             { expiresIn: '1h' } 
//         );

//         res.cookie('token', token, { httpOnly: true });
//         res.status(200).json({ message: "Login successful" });

//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).json({ message: "An error occurred during login." });
//     }
// });




router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.render('login', { 
                message: "Please provide both email and password." 
            });
        }

        // Find user in MongoDB
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.render('login', { 
                message: "User not found. Please check your email or sign up." 
            });
        }

        // Compare password hash
        const isPasswordValid = await bcrypt.compare(password, user.password);
         
        if (!isPasswordValid) {
            return res.render('login', { 
                message: "Invalid password. Please try again." 
            });
        }

        // Generate token
        const token = jwt.sign(
            { userId: user._id ,
                email:user.email,
                name:user.name
            },
            'your_secure_secret_here',
           // process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );
      console.log("token:::",token);
        // Set cookie
        res.cookie('jwt', token, { 
            httpOnly: true,
            secure: false ,     // process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });   
    
        // Store token in user document
        // user.tokens = user.tokens || [];
        // user.tokens.push({ token });
        // await user.save();

        return  res.redirect('/dashboard');




        // Successful login
       // req.session.userId = user._id;
       // res.redirect('/dashboard');

    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { 
            message: "An error occurred during login." 
        });
    }
});  




// Get user profile route
// router.get('/profile',auth, async (req, res) => {
//     try {
//         const token = req.cookies.token;
//         console.log("authToken:::",token);
//         if (!token) {
//             return res.status(401).json({ message: "Authentication required" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//         const user = await User.findById(decoded.userId).select('-password');
        
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//        res.render('/profile', {user });
//       //  res.status(200).json(user);

//     } catch (error) {
//         console.error('Profile error:', error);
//         res.status(500).json({ message: "An error occurred while fetching profile." });
//     }
// });

router.get('/profile',auth, async (req, res) => {
    try {
    
        // For demonstration, get the first user from MongoDB
        //const user = await User.findOne();

        res.render('profile', {user: req.user });
    } catch (error) {
        console.error('Profile error:', error);
        res.render('profile', { user: null });
    }
});


router.get('/logout', (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie('jwt');
        
        // Clear any other session data if needed
        req.session?.destroy();
        
        // Redirect to login page
        res.redirect('/login');
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).redirect('/dashboard');
    }
});

// router.post('/update-profile', auth, async (req, res) => {
//     try {
//         const { name, email, currentPassword, newPassword } = req.body;
//         console.log("req.user:::",req.body.name);
//         console.log(email)
//         console.log(currentPassword)
//         console.log(newPassword)
//         const user1= req.user;
//         const user = await User.find({name:user1.name});
//         console.log("user:::",user);
//         // Verify current password if provided
//         if (currentPassword) {
//             const isValidPassword = await bcrypt.compare(currentPassword, user.password);
//             if (!isValidPassword) {
//                 return res.status(400).json({ message: 'Current password is incorrect' });
//             }
//         } 

//         // Update user information
//         user.name = name;
//         user.email = email;

//         // Update password if new password is provided
//         if (newPassword) {
//             user.password = newPassword; // Will be hashed by pre-save middleware
//         }

//         const newUser = new User(user);
//         console.log("newUser:::",newUser)
//         await newUser.save();


//         //await user.save();   

//         res.json({ message: 'Profile updated successfully' });
//     } catch (error) {
//         console.error('Profile update error:', error);
//         res.status(500).json({ message: 'Error updating profile' });
//     }
// });


router.post('/update-profile', auth, async (req, res) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;
        const user1 = req.user;
        
        // Find the single user document
        const user = await User.findOne({ name: user1.name });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password if provided
        if (currentPassword) {
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
        }

        // Update user information
        user.name = name;
        user.email = email;

        // Update password if new password is provided
        if (newPassword) {
            user.password = newPassword; // Will be hashed by pre-save middleware
        }

        // Save the updated user document
        await user.save();

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: 'Error updating profile' });
    }
});



// Logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
