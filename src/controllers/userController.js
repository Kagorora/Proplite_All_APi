import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import userModal from '../modals/users';
import helper from '../helper/helper';
import userSchema from './validation/userSchema';

dotenv.config();

class userController {

  // get all users
  static users(req, res) {
    res.status(200).json({ status: 200, data: userModal });
  }

  // Sign up
  static signup(req, res) {
    const {
      email, first_Name, last_Name, password, phoneNumber, address, is_admin,
    } = req.body;
    const findUser = userModal.find(u => u.email === email);

    if (findUser) { return res.status(400).json({ status: 400, error: 'email exists' }); }

    const idNo = userModal.length + 1;
    const jwtoken = jwt.sign({
      id: idNo, email, first_Name, last_Name, is_admin,
    }, process.env.SECRET_KEY, { expiresIn: '14d' });
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = userSchema.validate({
      id: idNo, email, first_Name, last_Name, password: hashedPassword, phoneNumber, address, is_admin,
    });

    if (newUser.error) {
      return res.status(400).json({
        status: 400,
        error: newUser.error.details[0].message,
      });
    }

    userModal.push(newUser);

    // const { id } =;
    // console.log(newUser.value.id);

    return res.status(201).json({
      status: 201,
      // message: `${newUser.first_Name} account successfull created`,
      data: {
        token: jwtoken, userEmail: newUser.value.email, userFirstN: newUser.value.first_Name, lastN: newUser.value.last_Name, userphoneNumber: newUser.value.phoneNumber, userAddress: newUser.value.address, useris_admin: newUser.value.is_admin,
      },
    });
  }

  // Login
  static signin(req, res) {
    const { email, password } = req.body;

    const user = userModal.find(u => u.email === email.toLowerCase());

    if (user) {
      if (user.password === password) {
        const jwtoken = jwt.sign({ id: user.id }, 'Token');


        const {
          id, email, first_Name, last_Name, phoneNumber, address,
        } = user;
        return res.status(200).json({
          status: 200,
          message: `Logged in as ${user.first_Name}`,
          data: {
            token: jwtoken, id, email, first_Name, last_Name, phoneNumber, address,
          },
        });
      }
      return res.status(400).json({ status: 400, error: 'incorect password' });
    }
    return res.status(404).json({ status: 404, error: 'user not found' });
  }

}

export default userController;
