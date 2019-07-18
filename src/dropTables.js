import con from './dbConnect';

const dropTables = async () => {
  await con.query('drop table transaction; drop table property; drop table user;');
};
dropTables();

export default dropTables;
