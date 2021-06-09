const express = require('express')
const router = express.Router()
const User = require('../../models/user')

router.get('/', (req, res) => {
  res.render('login')
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
        console.log('please input email and password')
      } else {
        // 沒有帳號，顯示無此人
        if (!user) {
          console.log('user is not exist')
        } else {
          console.log('user is exist')
          // 有帳號，比對 password
          if (user.password === password) {
            res.render('index', { user })
          } else {
            console.log('password is wrong')
          }
        }
      }
    })






})

module.exports = router