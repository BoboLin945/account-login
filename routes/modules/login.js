const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', (req, res) => {
  res.render('login', { message: req.flash('message')})
})
// 驗證
router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  // 檢查有沒有 email 此帳號
  User.findOne({ email: email })
    .lean()
    .then(user => {
      // 沒有輸入完整，顯示請輸入
      if (!email || !password) {
        req.flash('message', 'Please input email and password!')
        res.redirect('/login')
      } else {
        // 沒有帳號，顯示無此人
        if (!user) {
          req.flash('message', 'User is not exist!')
          res.redirect('/login')
        } else {
          // 有帳號，比對 password
          if (user.password === password) {
            res.render('index', { user })
          } else {
            req.flash('message', 'Password is wrong!')
            res.redirect('/login')
          }
        }
      }
    })






})

module.exports = router