import { useState, useEffect, useLayoutEffect } from "react";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import type { CustomerOrderData } from "../interfaces/CustomerOrderData";
import ErrorPage from "./ErrorPage";
import MenuList from '../components/MenuList';
import CustomerOrders from '../components/CustomerOrders';
import auth from '../utils/auth';

const Home = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const [customerOrderList, setCustomerOrderList] = useState<CustomerOrderData[]>([]);

    const foodItems = [
        { id: 1, name: "Burger", price: 5.99 },
        { id: 2, name: "Pizza", price: 8.99 },
        { id: 3, name: "Pasta", price: 7.49 },
        { id: 4, name: "Salad", price: 4.99 },
        { id: 5, name: "Fries", price: 2.99 },
        { id: 6, name: "Sandwich", price: 6.49 },
        { id: 7, name: "Soup", price: 3.99 }
    ];

    const addOrders = (id: number) => {
        const foodItem = foodItems.find(item => item.id === id);
        if (foodItem) {
            setCustomerOrderList(prevList => [...prevList, { ...foodItem }]);
        }
    };

    useEffect(() => {
        if (loginCheck) {
            fetchUsers();
        }
    }, [loginCheck]);

    useLayoutEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        } catch (err) {
            console.error('Failed to retrieve users:', err);
            setError(true);
        }
    };

    if (error) {
        return <ErrorPage />;
    }

    return (
        <>
            {
                loginCheck ? (
                    <div className='login-notice'>
                        <h1>Login to take Orders!</h1>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-2 shadow-lg text-break">
                            <CustomerOrders customerOrders={customerOrderList} />
                        </div>
                        <div className="col-9 m-5 shadow-lg">
                            <MenuList menuLists={foodItems} addOrders={addOrders} />
                            {/* Render users after fetching */}
                            <div>
                                <h2>Users:</h2>
                                {users.length > 0 ? (
                                    <ul>
                                        {users.map(user => (
                                            <li key={user.id}>{user.username}</li> // Adjust as necessary based on UserData structure
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No users found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
        </>
    );
};

export default Home;