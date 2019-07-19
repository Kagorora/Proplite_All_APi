import dotenv from 'dotenv';
import crypt from 'bcrypt';
import jwt from '../helpers/tokenGenerator';
import userModel from '../models/user';
import con from '../dbConnect';
import search from '../helpers/search';


dotenv.config();
class userController {
  static welcome(req, res) {
    return res.status(200).json({status: 200, msg: "welcome To PROPERTY-PRO-LITE"});
  }

//   =============================== SIGN UP ==========================
  static async signup(req, res) {
    const {
      first_name, last_name, phoneNumber, email, password, address, is_admin,
    } = req.user;

    const findUser = await search.searchUser(req.user.email);
    if (findUser.rowCount !== 0) {
      return res.status(409).json({ status: 409, error: 'user with the same email already exist' });
    }
    const passkey = crypt.hashSync(password, 10);
    const addUser = await con.query(userModel.addUser,
    [ email, first_name, last_name, passkey,phoneNumber, address, is_admin]);
    if (addUser.rowCount !== 0) {
      const token = jwt.signToken(addUser.rows[0]);
      return res.status(201).json({
        status: 201,
        data: {
          token,
        },
      });
    } 
    return res.status(400).json({ status: 400, error: 'user not added' });
  }

  //=========================== LOGIN =========================================

  static async signin(req, res) {
    const findUser = await search.searchUser(req.user.email);
    if (findUser.rowCount !== 0) {
      const passkey = crypt.compareSync(req.user.password, findUser.rows[0].password);
      if (passkey) {
        const jwtoken = jwt.signToken(findUser.rows[0]);
        return res.status(200).json({
          status: 200,
          data: {
            token: jwtoken,
          },
        });
      } return res.status(401).json({ status: 400, message: 'incorrect password' });
    } return res.status(404).json({ status: 404, message: 'incorrect email' });
  }

}

export default userController;