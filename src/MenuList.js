import React from "react";
import { Menu } from "antd";
import menus from "./menu";

const shouldfetch = (value, menuStr) => {
  console.log(menuStr);
  if(value == null) return true;
    if (value === menuStr.substring(0, value.length)) return true;
  return false;
};

const itemSearch = (value, menuItem) => {
    let flag = -1;
    if(menuItem?.children?.length){
        menuItem.children.map((mi) => {
            flag = flag * itemSearch(value, mi);
        });
        if(flag == 0) {
            menuItem.display = true;
            return 0;
        }
        if(!shouldfetch(value, menuItem.label)) {
            // menuItem.label = null;
            menuItem.display = false;
            return -1;
        }
        menuItem.display = true;
        return 0;
    }
    else {
        if(!shouldfetch(value, menuItem.label)) {
            console.log(menuItem.label);
            // menuItem.label = null;
            menuItem.display = false;
            return -1;
        }
        menuItem.display = true;
        return 0;
    }
    
};

// export const MenuSearch = ({ menus, value, ...rest }) => {
//   menus.map((menuItem) => {
//     itemSearch(value, menuItem);
//     // if (menuItem?.children?.length) {
//     //   return (
//     //       <Menu.SubMenu key={menuItem.key} title={menuItem.label} {...rest}>
//     //       <MenuSearch menus={(value, menuItem.children)} />
//     //     </Menu.SubMenu>
//     //   );
//     // } else {
//     //   if (shouldfetch(value, menuItem.label)) {
//     //     return (
//     //       <Menu.Item key={menuItem.key} {...rest}>
//     //         {menuItem.label}
//     //       </Menu.Item>
//     //     );
//     //   } else {
//     //     return null;
//     //   }
//     // }
//   }

// };

const MenuItem = ({ menus, ...rest }) => {
  return menus.map((menuItem) => {
    if(!menuItem.display) { return null;}
    if (menuItem?.children?.length) {
      return (
        <Menu.SubMenu key={menuItem.key} title={menuItem.label} {...rest}>
          <MenuItem menus={menuItem.children} />
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={menuItem.key} {...rest}>
          {menuItem.label}
        </Menu.Item>
      );
    }
  });
};

const MenuList = ({ menus, value }) => {
    itemSearch( value, menus );
  return (
    <Menu mode="inline">
      <MenuItem menus={menus.children} />
    </Menu>
  );
};

export default MenuList;
