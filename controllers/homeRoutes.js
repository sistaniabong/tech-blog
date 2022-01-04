const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts available
router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
    //   res.render('homepage', { 
    //     posts
    //     // logged_in: req.session.logged_in 
    //   });
      res.render('homepage', { posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });


// GET all posts by a specific user
  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      console.log('asfda')
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const posts = postData.map((post) => post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { posts });
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/new-post', (req, res) => {
    if (req.session.logged_in) {
        res.render('newpost');
      return;
    }
    res.render('login');
  });

  router.get('/new-comment/:id',withAuth, async (req, res) => {
    if (req.session.logged_in) {
      // const post_id = req.params.id
      // res.render('updatepost',post_id);
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User
          },
        ],
      });
  
      const post = postData.get({ plain: true });
      // const comments = post.comments;
      console.log(post)
      res.render('newcomment',{post});
    return;

  }
  res.render('login');
  });

  router.get('/update/:id',withAuth, async (req, res) => {
    if (req.session.logged_in) {
        // const post_id = req.params.id
        // res.render('updatepost',post_id);
        const postData = await Post.findByPk(req.params.id, {
          include: [
            {
              model: User
            },
          ],
        });
    
        const post = postData.get({ plain: true });
        // const comments = post.comments;
        console.log(post)
        res.render('updatepost',{post});
      return;

    }
    res.render('login');
  });



  router.get('/login', (req, res) => {
    console.log('login')
    console.log(req.session.logged_in)
    if (req.session.logged_in) {
        res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });


  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      // res.redirect('/api/pet');
      return;
    }
  
    res.render('signup');
  });



module.exports = router;