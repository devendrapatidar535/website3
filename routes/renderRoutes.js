const router = require('express').Router();
const User = require("../models/database/usersSchema");
const auth = require('../middlewares/jwt.middleware');
// Home/Landing page route
router.get('/', (req, res) => {
    res.render('home');
});

// Dashboard route
router.get('/dashboard', auth, (req, res) => {
    // const user = {
    //     name: "John Doe",
    // };
    const user ={ name : req.user.name}; 
    const activities = [
        { title: "Logged In", description: "You logged into your account at 10:30 AM." },
        { title: "Updated Profile", description: "You updated your profile picture yesterday." },
    ];
    const tasks = [
        { name: "Complete the project report" },
        { name: "Submit timesheet" },
        { name: "Attend team meeting" },    
    ];
    res.render('dashboard', { user, activities, tasks });
});

// Profile page route
router.get('/profile', (req, res) => {
    res.render('profile');
});

// Registration success page
router.get('/registration-success', (req, res) => {
    res.render('registration-success');
});

// Error page
router.get('/error', (req, res) => {
    res.render('error');
});

// About page
router.get('/about', (req, res) => {
    res.render('about');
});

// Contact page
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Settings page
router.get('/settings', (req, res) => {
    res.render('settings');
});

// Help/FAQ page
router.get('/help', (req, res) => {
    res.render('help');
});

router.get('/login', (req, res) => {
    res.render('login'); 
});

router.get('/signup', (req, res) => {
    res.render('signup');
});



router.get('/members', async (req, res) => {
    try {
        // Fetch all users from database
        const members = await User.find({}, {
            name: 1,
            email: 1,
            createdAt: 1
        }).sort({ createdAt: -1 }); // Sort by newest first

        res.render('members', { 
            members,
            user: req.user // Current logged-in user
        });
    } catch (error) {
        console.error('Error fetching members:', error);
        res.status(500).render('error', { 
            message: 'Error loading members list'
        });
    }
});
 
router.get('/email', (req,res)=>{
    res.render('email');   
})

// router.get('/signup', (req, res) => {
//     try {
//         return res.render('signup');
//     } catch (error) {
//         console.error('Error rendering signup page:', error);
//         return res.status(500).render('error', { message: 'Server error' });
//     }
// });




module.exports = router; 
