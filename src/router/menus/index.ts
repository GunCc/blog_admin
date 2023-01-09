import { RouteRecordNormalized } from "vue-router";
import { router } from "..";
import { getAllParentPath, transformMenuModule } from "../helper/menuHelper";
import { Menu, MenuModule } from "../types";
import { PermissionModeEnum } from "/@/enums/appEnum";
import { useStore } from "/@/store";
import { filter } from "/@/utils/helper/treeHelper";
import { isUrl } from "/@/utils/is";
import { pathToRegexp } from 'path-to-regexp';

const menuModules: MenuModule[] = [];


const getPermissionMode = () => {
    const store = useStore();
    return store.getters["AppStore/getProjectConfig"].permissionMode
}

// 获取权限模式
const isBackMode = () => {
    return getPermissionMode() === PermissionModeEnum.BACK;
}

// 获取是否为路由权限
const isRouteMappingMode = () => {
    return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
// 获取角色
const isRoleMode = () => {
    return getPermissionMode() === PermissionModeEnum.ROLE
}


// 获取子菜单
export async function getChildrenMenus(parentPath: string) {
    const menus = await getMenus();
    const parent = menus.find((item) => item.path === parentPath);
    if (!parent || !parent.children || !parent?.meta?.hideChildrenInMenu) {
        return [] as Menu[];
    }
    if (isRoleMode()) {
        const routes = router.getRoutes();
        return filter(parent.children, basicFilter(routes))
    }
    return parent.children;
}

// 获取菜单
export const getMenus = async (): Promise<Menu[]> => {
    debugger
    const menus = await getAsyncMenus();
    console.log(menus)
    if (isRoleMode()) {
        const routes = router.getRoutes();
        return filter(menus, basicFilter(routes))
    }
    return menus
}

// 静态菜单
const staticMenus: Menu[] = [];
(() => {
    menuModules.sort((a, b) => {
        return (a.orderNo || 0) - (b.orderNo || 0)
    })
    for (const menu of menuModules) {
        staticMenus.push(transformMenuModule(menu))
    }
})();




// 获取异步菜单
async function getAsyncMenus() {
    const store = useStore();
    console.log('store.getters["PermStore/getBackMenuList"]',store.getters["PermStore/getBackMenuList"])
    if (isBackMode()) {
        return store.getters["PermStore/getBackMenuList"].filter((item) => !item.meta?.hideMenu && !item.hideMenu);
    }
    if (isRouteMappingMode()) {
        return store.getters["PermStore/getFrontMenuList"].filter((item) => !item.hideMenu);
    }
    return staticMenus;
}

// 基本过滤
function basicFilter(routes: RouteRecordNormalized[]) {
    return (menu: Menu) => {
        const matchRoute = routes.find((route) => {
            if (isUrl(menu.path)) return true;
            if (route.meta?.carryParam) {
                return pathToRegexp(route.path).test(menu.path)
            }
            // 是否一样
            const isSame = route.path === menu.path
            if (!isSame) return false;
            // 忽略权限
            if (route.meta?.ignoreAuth) return true;
            return isSame || pathToRegexp(route.path).test(menu.path)
        })
        if (!matchRoute) return false;
        menu.icon = (menu.icon || matchRoute.meta.icon) as string;
        menu.meta = matchRoute.meta;
        return true;
    }
}


// 获取当前菜单父菜单
export async function getCurrentParentPath(currentPath: string) {
    const menus = await getAsyncMenus();
    const allParentPath = await getAllParentPath(menus, currentPath);
    return allParentPath?.[0]
}

// 获取一级菜单，删除子菜单
export async function getShallowMenus(): Promise<Menu[]> {
    const menus = await getAsyncMenus();
    const shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
    if (isRoleMode()) {
        const routes = router.getRoutes();
        return shallowMenuList.filter(basicFilter(routes))
    }
    return shallowMenuList
}