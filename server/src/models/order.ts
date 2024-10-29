import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
  } from 'sequelize';
  
  import type { Customer } from './customer.js';
  
  /*
  
  ! This is how we declared the Car model using our own interfaces
  
  import { DataTypes, Sequelize, Model, Optional } from 'sequelize'
  
  interface CarAttributes {
    id: number;
    make: string;
    model: string;
    mileage: number;
    driverId: number;
  }
  
  interface CarCreationAttributes extends Optional<CarAttributes, 'id'> {}
  
  export class Car extends Model<CarAttributes, CarCreationAttributes> implements CarAttributes {
    declare id: number;
    declare make: string;
    declare model: string;
    declare mileage: number;
    declare driverId: number;
  }
  
  */
  
  // ! This is how we declare the Car model using sequelize's built-in types
  
  export class Order extends Model<
    InferAttributes<Order>,
    InferCreationAttributes<Order>
  > {
    declare id: CreationOptional<number>;
    declare orderData: Text;
    declare customerId: ForeignKey<Customer['id']>;
  }
  
  export function OrderFactory(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        orderData: {
          type: DataTypes.TEXT,
          allowNull: false,
    
        },
        
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'order',
      }
    );
  
    return Order;
  }