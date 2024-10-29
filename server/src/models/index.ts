import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { CustomerFactory } from './customer.js';
import { OrderFactory } from './order.js';

const User = UserFactory(sequelize);
const Customer = CustomerFactory(sequelize);
const Order = OrderFactory(sequelize);


//user has many customers
User.hasMany(Customer, {
    onDelete: 'CASCADE',
  });
  
// The association can also be created 
Customer.belongsTo(User,{ foreignKey: 'userId' });
//Customer has many orders
Customer.hasMany(Order, {
    onDelete: 'CASCADE',
  });
  
// The association can also be created 
  Order.belongsTo(Customer);

export { User , Customer};
