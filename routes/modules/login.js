const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', (req, res) => {
  res.render('login', { message: req.flash('message') })
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
        res.render('login', { email, message: req.flash('message') })
      } else {
        // 沒有帳號，顯示無此帳號
        if (!user) {
          req.flash('message', 'User is not exist!')
          res.render('login', { email, message: req.flash('message') })
        } else {
          // 有帳號，比對 password
          if (user.password === password) {
            // cookie setting
            res.cookie("user", { username: email, firstName: user.firstName }, { maxAge: 600000, httpOnly: true })
            res.redirect('/')
          } else {
            req.flash('message', 'Password is wrong!')
            res.render('login', { email, message: req.flash('message') })
          }
        }
      }
    })
})

module.exports = router