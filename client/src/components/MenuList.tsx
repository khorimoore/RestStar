import React from 'react';

import type { MenuListData } from "../interfaces/MenuListData";
// import auth from '../utils/auth';

// Define the props for the component
interface MenuListProps {
    menuLists: MenuListData[] | null; // users can be an array of UserData objects or null
}

const MenuList: React.FC<MenuListProps> = ({ menuLists }) => {
    return (
        <>
            <h2 className="pb-5">
                Check out all your MenuList !
            </h2>
            <div className="row align-center mb-5 shadow-sm" >
            {menuLists && menuLists.map((menuList) => (

                    <div className="col-2 m-2" key={menuList.id}>
                        <button className='btn btn-info'>{menuList.id}. {menuList.name}</button>
                    </div>
            ))}
            </div>
        </>
    );
};

export default MenuList;
