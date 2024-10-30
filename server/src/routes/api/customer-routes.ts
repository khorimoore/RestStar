import express from 'express';
import type { Request, Response } from 'express';
import { Customer } from '../../models/customer.js';
import { Order } from '../../models/order.js';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jsonwebtoken';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (req: Request, res: Response) => {


    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        const decoded:JwtPayload = jwtDecode(token);
        try {
            const customers = await Customer.findAll({
                where:{userId:decoded.user.id},
                include: [{ model: Order }],
            });
            res.json(customers);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }

    }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Customer.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { customerName, orderData } = req.body;
  console.log();
  const authHeader = req.headers.authorization;
  if(authHeader){
      const token = authHeader.split(' ')[1];
      const decoded:JwtPayload = jwtDecode(token);
      console.log(decoded.user.id);
    
      try {
        const newCustomer = await Customer.create({customerName:customerName,userId:decoded.user.id});
        console.log(newCustomer);
        console.log(orderData);
        const  orderDataString:string= JSON.stringify(orderData);
        await Order.create({orderData:orderDataString,customerId:newCustomer.id})
        res.status(201).json(newCustomer);
      } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
  }
  

});

// PUT /users/:id - Update a user by id
// router.put('/:id', async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { username, password } = req.body;
//   try {
//     const user = await Customer.findByPk(id);
//     if (user) {
//       user.username = username;
//       user.password = password;
//       await user.save();
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await Customer.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export { router as customerRouter };