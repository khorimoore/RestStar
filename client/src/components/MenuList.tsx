import React from 'react';

import type { MenuListData } from "../interfaces/MenuListData";
// import auth from '../utils/auth';

// Define the props for the component
interface MenuListProps {

    menuLists: MenuListData[] | null; // users can be an array of MenuData objects or null
    addOrders(id:number):void
}

const MenuList: React.FC<MenuListProps> = ({ menuLists,addOrders }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out all the MenuList !
            </h2>
            <div className="row align-center mb-5 shadow-sm" >
            {menuLists && menuLists.map((menuList) => (

                    <div className="col-2 m-2" key={menuList.id}>
                        <button className='btn btn-info' onClick={()=>addOrders(menuList.id)}>{menuList.id}. {menuList.name}</button>
                    </div>
            ))}
            </div>
        </>
    );
};

export default MenuList;

