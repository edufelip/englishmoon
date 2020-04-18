const { Op } = require('sequelize') 
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
    const title = req.sanitize(req.body.title);
    const body = req.sanitize(req.body.body);
    const image = req.sanitize(req.body.image);
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
    const list = await Post.findAll({
      limit: 6,
      include: {association: 'user'}
    })
    const dates = [];
    list.map( element => {
      const created = JSON.stringify(element.createdAt);
      const date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
      dates.push(date);
    })
    return res.render("home",{list:list, dates:dates});
  },
  
  async listAll(req,res) {
    const posts = [];
    const name = req.sanitize(req.query.name) || '';
    const index = parseInt(req.sanitize(req.query.page)) || 1;
    const {count, rows} = await Post.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${name}%` // change to ilike when using pg
        }
      },
      attributes: {exclude: ['body']},
      limit: 6,
      offset: 6 * (index - 1),
      include: {association: 'user'}
    });
    const dates = [];
    const modifiedTitles = [];
    rows.map(element => {
      const created = JSON.stringify(element.createdAt);
      const date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
      const modified = element.title.replace(/ /g, '-');
      dates.push(date);
      modifiedTitles.push(modified);
    })
    return res.render("articles", {list:rows, dates:dates, modifiedTitles:modifiedTitles, count:count, index:index, name:name})
  },

  async listPost(req, res){
    const params = req.sanitize(req.params.post_name);
    const name = params.replace(/-/g, ' ');
    const post_id = req.sanitize(req.params.post_id);
    const post = await Post.findOne({
      where: {id: post_id},
      include: {association: 'user'}
    });

    if(post.title == name){
      const created = JSON.stringify(post.createdAt);
      const date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
      return res.render("oneArticle", {post:post, date:date})
    } else {
      return res.json("erro: Página não encontrada");
    }
    
  }
};