import {
    Model,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
    DataTypes,
    type Sequelize,
    type ForeignKey,
  } from 'sequelize';
  
  import type { User } from './user.js';
  
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
  
  export class Customer extends Model<
    InferAttributes<Customer>,
    InferCreationAttributes<Customer>
  > {
    declare id: CreationOptional<number>;
    declare customerName: string;
    declare userId: ForeignKey<User['id']>;
  }
  
  export function CustomerFactory(sequelize: Sequelize) {
    Customer.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        customerName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        
      },
      {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'customer',
      }
    );
  
    return Customer;
  }