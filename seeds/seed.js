const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedAll = async () => {
  try{
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });  

}
  catch(error){
    console.log(error)
  }
  

  process.exit(0);
};

seedAll();