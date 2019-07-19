import con from '../dbConnect';
import userModel from '../models/user';
import propertyModel from '../models/property';


class search {
  static async searchUser(email) {
    const u = con.query(userModel.searchUser, [email.toLowerCase()]);
    return u;
  }

  static async searchProperty(id) {
    console.log(id);
    const u = con.query(propertyModel.searchProduct, [id]);
    return u;
  }

  static async searchUserById(id) {
    return con.query(userModel.searchUserById, [id]);
  }


}
export default search;
