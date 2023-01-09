// 可以为空 类型为 T
declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;

// 深度拷贝
declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T<P>>;
}

// Vite 环境配置
declare interface ViteEnv {
    // 端口
    VITE_PORT: number;
    // 是否使用 MOCK
    VITE_USE_MOCK: boolean;
    // 是否开启PWA
    VITE_USE_PWA: boolean;
    // 打包路径
    VITE_PUBLIC_PATH: string;
    // 代理配置
    VITE_PROXY: [string, string[]];
    // 应用标题
    VITE_BLOG_APP_TITLE: string;
    // 应用短标题
    VITE_BLOG_APP_SHORT_NAME: string;
    // 是否使用CDN
    VITE_USE_CDN: boolean;
    // 是否使用控制台
    VITE_DROP_CONSOLE: boolean;
    // 打包格式
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    // 打包后删除源文件
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    // 遗产
    VITE_LEGACY: boolean;
    // 使用图片
    VITE_USE_IMAGEMIN: boolean;
    // 生成UI
    VITE_GENERATE_UI: string;
}


declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type TargetContext = "_self" | '_blank'