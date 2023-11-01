const Account = require('../models/Account')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
                            return res.redirect('/user/login')
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
    renderRegister(req, res) {
        res.render('user/register')
    }
    register(req, res, next) {
        try {
            var email = req.body.email
            console.log(email)
            Account.findOne({
                email
            })
                .then(data => {
                    if (data) {
                        return res.json({
                            message: "Email này đã đã tồn tại"
                        })
                    }
                })
                .catch(
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.error('Lỗi khi tạo mật khẩu băm:', err);
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
                )

        } catch (error) {

        }
        //mã hóa mật khẩu




    }
}
module.exports = new UserController