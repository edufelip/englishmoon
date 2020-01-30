const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'posts' }
    });

    return res.json(user);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { title, body, image } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const post = await Post.create({
      title,
      body,
      image,
      user_id,
    });

    return res.json(post);
  },

  async list(req, res) {
    const [postOne, postTwo, postThree, postFour, postFive, postSix] = await Post.findAll({
      attributes: {exclude: ['body']}
    });
    const list = [postOne, postTwo, postThree, postFour, postFive, postSix];
    let authors = [];
    let dates = [];
    for(let i = 0; i < list.length; i++){
      if(list[i]){  // tirar esse if dps pq o numbero de posts sempre sera maior que 6
        let author = await User.findByPk(list[i].user_id);
        let created = JSON.stringify(list[i].createdAt);
        let date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
        authors = [...authors, author];
        dates.push(date);
      } else {
        authors = [... authors, undefined];
      }
    }
    return res.render("home",{list:list, authors:authors, dates:dates});
  },
  
  async listAll(req,res) {
    const list = await Post.findAll({
      attributes: {exclude: ['body']}
    });
    let authors = [];
    let dates = [];
    for(let i = 0; i < list.length; i++){
      if(list[i]){  // tirar esse if dps pq o numbero de posts sempre sera maior que 6
        let author = await User.findByPk(list[i].user_id);
        let created = JSON.stringify(list[i].createdAt);
        let date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
        authors = [...authors, author];
        dates.push(date);
      } else {
        authors = [... authors, undefined];
      }
    }
    return res.render("articles",{list:list, authors:authors, dates:dates});
  }
};