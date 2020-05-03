const { Op } = require('sequelize') 
const User = require('../models/User');
const Post = require('../models/Post');

function convertDate(date){
  const created = JSON.stringify(date)
  const convertedDate = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
  return convertedDate
}

function convertNameAndDate(list) {
  let modifiedTitles = []
  let dates = []
  list.map( post => {
    dates.push(convertDate(post.createdAt))
    modifiedTitles.push(post.title.replace(/ /g, '-'))
  })
  return [modifiedTitles, dates]
}

module.exports = {
  async listMainPage(req, res) {
    const list = await Post.findAll({
      limit: 6,
      include: {association: 'user'}
    })
    const [ modifiedTitles, dates ] = convertNameAndDate(list)
    return res.render("home",{list:list, dates:dates, modifiedTitles: modifiedTitles});
  },
  
  async listArticlesPage(req,res) {
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
    const [ modifiedTitles, dates ] = convertNameAndDate(rows)
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
    if(!post) {
      return res.json("erro: Página não encontrada");
    } 
    if(post.title === name){
      const date = convertDate(post.createdAt)
      return res.render("oneArticle", {post:post, date:date, name: params})
    }
  },

  async newPost(req, res){
    const user_id = req.user.id
    const {title, articleBody} = req.body;
    const image = req.file.filename
    const user = await User.findByPk(user_id);
    if(!user){
      return res.status(400).json({ error: 'User not found' });
    }
    const post = await Post.create({
      title: title,
      body: articleBody,
      image: image,
      user_id: user_id,
    });
    const format_name = post.title.replace(/ /g, '-');
    return res.redirect(`/articles/${format_name}/${post.id}`)
  },
  
  async deletePost(req, res) {
    const params = req.params
    const post = await Post.findByPk(params.post_id)
    if(req.user.id !== post.user_id){
      return res.status(403).json("você nao tem permissão para isso")
    }
    await post.destroy()
    return res.redirect("/articles")
  },

  // async editPostForm(req, res) {
  //   const params = req.params
  //   const post = await Post.findByPk(params.post_id)
  //   // if(req.user.id !)
  // },

  // async editPost(req, res) {

  // }

};