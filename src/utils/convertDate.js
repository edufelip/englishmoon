module.exports =  {
  convertDate: (date) => {
    const created = JSON.stringify(date)
    const convertedDate = created.substr(9, 2) + '/' + created.substr(6,2) + '/' + created.substr(1,4);
    return convertedDate
  }
}
