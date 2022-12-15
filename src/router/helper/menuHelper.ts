import { Menu, MenuModule } from "../types";
import { findPath } from "/@/utils/helper/treeHelper";
import { isUrl } from "/@/utils/is";


// 获取所有父级菜单
export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
    const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
    return (menuList || []).map((item) => item.path)
}


// 转换菜单
export function transformMenuModule(MenuModule: MenuModule): Menu {
    const { menu } = MenuModule;
    const menuList = [menu];
    joinParentPath(menuList);
    return menuList[0];
}

// 路径处理
function joinParentPath(menus: Menu[], parentPath = '') {
    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        // 注意：以 / 开头的嵌套路径将被视为根路径
        if (!(menu.path.startsWith("/") || isUrl(menu.path))) {
            menu.path = `${parentPath}/${menu.path}`
        }
        if (menu?.children?.length) {
            joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path);
        }
    }
}