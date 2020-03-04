const User = require('../models/User');
const Post = require('../models/Post');
const flash = require('connect-flash')

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
    const { title, body, image } = req.sanitize(req.body);
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
    const name = req.sanitize(req.query.name);
    const posts = [];
    const fitered = [];
    const index = req.sanitize(req.query.page);
    const list = await Post.findAll({
      attributes: {exclude: ['body']}
    });
    
    if(name){
      filtered = list.filter( (element) => {
        let bool = 0;
        let titleWords = element.title.split(' ');
        let queryWords = name.split(' ');
        queryWords.forEach( (word) => {
          if (titleWords.indexOf(word) !== -1) bool++;
        });
        return bool;
      });
    }
    
    if(name){
      for(let i = 0; i < 6; i++){
        if(filtered[6*(index-1)+i]) posts[i] = filtered[6*(index-1)+i];
      }
    } else {
      for(let i = 0; i < 6; i++){
          if(list[6*(index-1)+i]) posts[i] = list[6*(index-1)+i];
      }
    }

    let authors = [];
    let dates = [];
    let modifiedTitles = [];
    for(let i = 0; i < posts.length; i++){
      if(posts[i]){
        let author = await User.findByPk(posts[i].user_id);
        let created = JSON.stringify(posts[i].createdAt);
        let date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
        let modified = posts[i].title.replace(/ /g, '-');
        authors = [... authors, author];
        dates.push(date);
        modifiedTitles.push(modified);
      } else {
        authors = [... authors, undefined];
      }
    }
    if(posts[0]) {
      return res.render("articles",{list:list, posts:posts, authors:authors, dates:dates, index:index, name:name, modifiedTitles:modifiedTitles});
    } else {
      return res.json("erro: pagina indisponivel");
    }
  },

  async listPost(req, res){
    const params = req.sanitize(req.params.post_name);
    const name = params.replace(/-/g, ' ');
    const post_id = req.sanitize(req.params.post_id);
    const post = await Post.findByPk(post_id);

    if(post.title == name){
      const author = await User.findByPk(post.user_id);
      const created = JSON.stringify(post.createdAt);
      const date = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
      return res.render("oneArticle", {post:post, author:author, date:date})
    } else {
      return res.json("erro: Página não encontrada");
    }
    
  }
};