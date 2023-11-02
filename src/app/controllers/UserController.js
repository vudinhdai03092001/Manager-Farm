const Account = require('../models/Account')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cookieParser = require('cookie-parser');
class UserController {
    index(req, res) {
        res.render('user/login')
    }
    login(req, res, next) {
        try {
            var username = req.body.username
            var password = req.body.password
            //tìm kiếm user theo tên
            Account.findOne({
                username,

            })
                .then(data => {
                    //so sánh mật khẩu khi người dùng nhập vào với mật khẩu trong data
                    bcrypt.compare(password, data.password, (err, result) => {
                        if (err) {
                            console.error('Lỗi khi so sánh mật khẩu:', err);
                        } else if (result) {
                            var token = jwt.sign({ _id: data._id }, 'mk')
                            var par = jwt.verify(token, 'mk')

                            Account.findOne({ _id: par._id })
                                .then(tk => {
                                    res.json({
                                        message: 'Đăng nhập thành công',
                                        token: token,
                                        getUser: tk,
                                    })
                                })
                        } else {
                            console.log('mật khẩu sai')
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json('loi sever')
                })
        } catch (error) {
            return res.redirect('/user/login')
        }
    }
    //[get] register
    renderRegister(req, res) {
        res.render('user/register')
    }
    //[post] form register
    register(req, res, next) {
        try {
            var email = req.body.email
            console.log(email)
            Account.findOne({
                email
            })
                .then(data => {
                    if (data) {
                         res.json({
                            message: "tài khoản đã tồn tại"
                        })
                    }
                    else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                console.error('Lỗi khi băm mật khẩu:', err);
                            } else {
                                // Lưu mật khẩu băm vào cơ sở dữ liệu 
                                const formdata = req.body
                                formdata.role = 0;
                                formdata.password = hash;
                                const account = new Account(formdata)
                                account.save()
                                    .then(() => res.redirect('/user/login'))
                                    .catch(next)
                            }
                        })
                    }
                })
                .catch(
                    error => next(error)
                )
        } catch (error) {
            return res.redirect('/user/register')
        }
    }
    // [GET] render formpass
    renderchangepass(req, res) {
        res.render('user/changePassword')
    }
    //[POST] change pass
    changepass(req, res, next) {
        try {
            var token = req.cookies.token
            var id = jwt.verify(token, 'mk')
            Account.findOne({ _id: id }).lean()
                .then(data => {
                    var curenpasss = req.body.currentpassword
                    bcrypt.compare(curenpasss, data.password, (err, result) => {
                        if (err) {
                            console.error('Lỗi khi tạo mật khẩu băm:', err);
                        } else if (result) {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    console.error('Lỗi khi băm mật khẩu:', err);
                                } else {
                                    // Lưu mật khẩu băm vào cơ sở dữ liệu 
                                    Account.updateOne({ _id: id }, {
                                        password: hash
                                    })
                                        .then(() => { return console.log('đã thay đổi') })
                                        .catch(next)
                                }
                            });
                        }
                        else {
                            console.log('mật khẩu hiện tại không đúng')
                        }
                    })
                })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new UserController