module.exports = {

  viewDashbord: (req,res) => {
    res.render('admin/dashboard', {title: "Dashboard | Charuniverse"});
  }

}