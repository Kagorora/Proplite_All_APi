import dotenv from 'dotenv';
import con from './dbConnect';
import user from './models/user';
import property from './models/property';


dotenv.config();
const createTables = async () => {
  const tableUser = user.userTable;
  const tableProperty = property.propertyTable;
  const tables = `${tableUser}; ${tableProperty}`;

  await con.query(tables);
  await con.query(user.addUser, ['Niyonkuru@gmail.com','Kagorora', 'Maxime', 'Niyonkuru@1', '0782299719', 'Kigali-Rwanda', true]);
  await con.query(user.addUser, ['Niyonkuru1@gmail.com','keza', 'Aline', 'KezaAline@1', '0782299719', 'Kigali-Rwanda', true]);

  await con.query(property.createProperty, ['kagorora','available', 100, 'Rwanda', 'Kigali', '4KGL', '2bedRooms']);
  await con.query(property.createProperty, ['Maxime','available', 100, 'Rwanda', 'Kigali', '4KGL', '2bedRooms']);
};
createTables();

export default createTables;


 