const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // console.log(req.cookies)
  const user = req.cookies.user
  if (user) {
    res.render('index', { user })
  } else {
    // 未登入進入 login 頁面
    res.redirect('/login')
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('user')
  res.redirect('/login')
})

module.exports = router