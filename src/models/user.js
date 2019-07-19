const userTable = `
CREATE TABLE IF NOT EXISTS users (
        id serial primary key,
        email varchar(50) UNIQUE,
        first_name varchar(50) NOT NULL,
        last_name varchar(25) NOT NULL,
        password varchar(100) NOT NULL,
        phoneNumber varchar(50),
        address varchar(100) NOT NULL,
        is_admin boolean DEFAULT 'false'
    )`;
const addUser = `insert into users (
    email,
    first_name,
    last_name,
    password,
    phoneNumber,
    address,
    is_admin
    )VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;

const removeUser = 'delete from users where email = ($1)';
const searchUser = 'select * from users where email = ($1)';
const searchUserById = 'select * from users where userid = ($1)';

export default {
  userTable,
  addUser,
  removeUser,
  searchUser,
  searchUserById,
};