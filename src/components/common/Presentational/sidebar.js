import React, {useState,useEffect} from 'react'
import { FaList, FaRegHeart,FaHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { Link, withRouter } from 'react-router-dom';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
    SubMenu 
  } from "react-pro-sidebar";
  import "react-pro-sidebar/dist/css/styles.css"; 
  import "./sidebar.css"; 


const Sidebar = () => {
      //create initial menuCollapse state using useState hook
      const [menuCollapse, setMenuCollapse] = useState(false)

      //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
      //condition checking to change state from true to false and vice versa
      menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    return (
        <div id="header" className="mt-2">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Admin" : "Admin Profile"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                Profile
                <Link to="/profile" />
              </MenuItem>
              <MenuItem icon={<FaList />}>Company   <Link to="/companies" /></MenuItem>
              <MenuItem icon={<FaRegHeart />}>Venues  <Link to="/venues" /></MenuItem>
              <MenuItem icon={<RiPencilLine />}>Events  <Link to="/events" /></MenuItem>
              {/* <MenuItem icon={<BiCog />}>Settings  <Link to="/setting" /></MenuItem> */}
              
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    )
}

export default Sidebar
