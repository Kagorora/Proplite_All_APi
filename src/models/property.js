const propertyTable = `
CREATE TABLE IF NOT EXISTS properties (
    id serial primary key,
    owner varchar(50) NOT NULL,
    status varchar(10),
    price float,
    state varchar(10) NOT NULL,
    city varchar(10) NOT NULL,
    address varchar(10) NOT NULL,
    type varchar(10) NOT NULL
    )`;
const createProperty = `insert into properties (
    owner,
    status,
    price,
    state, 
    city,
    address,
    type
    )VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;

const removeProperty = 'delete from properties where id = ($1)';
const searchProperty = 'select * from properties where id = ($1)';
const searchPropertyById = 'select * from users where id= ($1)';

export default {
  propertyTable,
  createProperty,
  removeProperty,
  searchProperty,
  searchPropertyById
};