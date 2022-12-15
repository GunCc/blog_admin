interface TreeHelperConfig {
    id: string;
    children: string;
    pid: string;
}

// 默认配置
const DEFAULT_CONFIG: TreeHelperConfig = {
    id: "id",
    children: "children",
    pid: "pid"
}

// 获取配置
const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG)

// 过滤
export function filter<T = any>(
    tree: T[],
    func: (n: T) => Boolean,
    config: Partial<TreeHelperConfig> = {},
): T[] {
    // 获取配置
    config = getConfig(config)
    const children = config.children as string;
    function listFilter(list: T[]) {
        return list.map((node: any) => ({ ...node })).filter(node => {
            // 递归调用 对含有children项 进行再次调用自身函数 listFilter
            node[children] = node[children] && listFilter(node[children]);
            // 执行传入的回调 func 进行过滤
            return func(node) || (node[children] && node[children].length)
        })
    }
    return listFilter(tree)
}


// 查找路径
export function findPath<T = any>(
    tree: any,
    func: Fn,
    config: Partial<TreeHelperConfig> = {}
): T | T[] | null {
    config = getConfig(config);
    const path: T[] = [];
    const list = [...tree];
    const visitedSet = new Set();
    const { children } = config;
    while (list.length) {
        const node = list[0];
        if (visitedSet.has(node)) {
            path.pop();
            list.shift();
        } else {
            visitedSet.add(node);
            node[children!] && list.unshift(...node[children!]);
            path.push(node);
            if (func(node)) {
                return path;
            }
        }
    }
    return null;
}
