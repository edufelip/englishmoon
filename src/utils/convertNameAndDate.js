const { convertDate } = require('./convertDate')

module.exports = {
  convertNameAndDate: (list) => {
    let modifiedTitles = []
    let dates = []
    list.map( post => {
      dates.push(convertDate(post.createdAt))
      modifiedTitles.push(post.title.replace(/ /g, '-'))
    })
    return [modifiedTitles, dates]
  }
}