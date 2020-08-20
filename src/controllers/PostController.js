const User = require('../models/User');
const Post = require('../models/Post');
const { convertDate } = require('../utils/convertDate')

module.exports = {
  async index(req, res){
    const params = req.sanitize(req.params.post_name);
    const name = params.replace(/-/g, ' ');
    const post_id = req.sanitize(req.params.post_id);
    const post = await Post.findOne({
      where: {id: post_id},
      include: {association: 'user'}
    });
    if(!post) {
      return res.json("erro: Página não encontrada");
    } 
    if(post.title === name){
      const date = convertDate(post.createdAt)
      return res.render("oneArticle", {post:post, date:date, name: params})
    }
  },

  async store(req, res){
    const user_id = req.user.id
    const {title, articleBody, description} = req.body;
    const image = req.file.filename
    const user = await User.findByPk(user_id);
    if(!user){
      return res.status(400).json({ error: 'User not found' });
    }
    const post = await Post.create({
      title: title,
      body: articleBody,
      description: description,
      image: image,
      user_id: user_id,
    });
    const format_name = post.title.replace(/ /g, '-');
    return res.redirect(`/articles/${format_name}/${post.id}`)
  },

  async delete(req, res) {
    const params = req.params
    const post = await Post.findByPk(params.post_id)
    if(req.user.id !== post.user_id){
      return res.status(403).json("você nao tem permissão para isso")
    }
    await post.destroy()
    return res.redirect("/articles")
  },
};