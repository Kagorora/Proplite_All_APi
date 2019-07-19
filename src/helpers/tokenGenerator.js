import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class tokenGenerator {
  static signToken(addUser) {
    const jwtoken = jwt.sign({
      id: addUser.userid,
      email: addUser.email,
      is_amin: addUser.is_admin,
    }, process.env.NEVERMIND);
    return jwtoken;
  }
}
export default tokenGenerator;
