const { Op } = require('sequelize')
const Post = require('../models/Post');
const { convertDate } = require('../utils/convertDate')
const { convertNameAndDate } = require('../utils/convertNameAndDate')

module.exports = {
  async index(req, res) {
    const route = req.originalUrl.split('?')[0]
    switch(route) {
      case '/': {
        const list = await Post.findAll({
          limit: 6,
          include: {association: 'user'}
        })
        const [ modifiedTitles, dates ] = convertNameAndDate(list)
        return res.render("home",{list:list, dates:dates, modifiedTitles: modifiedTitles});
      }
      case '/articles': {
        const posts = [];
        const name = req.sanitize(req.query.name) || '';
        const index = parseInt(req.sanitize(req.query.page)) || 1;
        const {count, rows} = await Post.findAndCountAll({
          where: {
            title: {
              [Op.iLike]: `%${name}%`
            }
          },
          attributes: {exclude: ['body']},
          limit: 6,
          offset: 6 * (index - 1),
          include: {association: 'user'}
        });
        const [ modifiedTitles, dates ] = convertNameAndDate(rows)
        return res.render("articles", {list:rows, dates:dates, modifiedTitles:modifiedTitles, count:count, index:index, name:name})
      }
      default: {
        return res.json("something wrong happened")
      }
    }
  }
};