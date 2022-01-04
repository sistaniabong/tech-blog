const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    // find all pets
    try {
        const postsData = await Post.findAll({
          include: [
            {
              model: User
            },
          ],
        });
  
        const posts = postsData.map((post) => post.get({ plain: true }));
        res.render('homepage', { 
          posts,
          logged_in: req.session.logged_in 
        });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.post('/new-post', withAuth, async (req, res) => {
  // create a new pet
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/:id', withAuth, async (req, res) => {
  try {
    console.log('invidual post ID')
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment, 
          // attributes: ['user_id'],
        },
        {
          model: User
        },
      ],
      // include: { all: true }
    });

    const post = postData.get({ plain: true });
    const comments = post.comments;

    if (post.user_id == req.session.user_id){
      post_owner = true;
    } else {
      post_owner = false;
    }


    res.render('post', {
      post,
      comments,
      logged_in: req.session.logged_in,
      owner : post_owner,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try{
    const petData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(petData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  // Calls the update method on the Book model
  Post.update(
    {
      title: req.body.title,
      content: req.body.content
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedPost) => {
      // Sends the updated book as a json response
      document.location.replace(`/dashboard`)
    })
    .catch((err) => res.json(err));
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  console.log(req.body)
  try {
    
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {where: {
        id: req.params.id
      }
    });

    if (!postData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



  module.exports = router;