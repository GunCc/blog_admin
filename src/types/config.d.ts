/*
 * @Author: Mango 2859893460@qq.com
 * @Date: 2022-10-22 14:14:56
 * @LastEditors: Mango 2859893460@qq.com
 * @LastEditTime: 2022-11-23 11:09:11
 * @FilePath: \blog_admin\src\types\config.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from "../enums/appEnum";
import { CacheTypeEnum } from "../enums/cacheEnum";
import {
  MenuModeEnum,
  MenuTypeEnum,
  MixSidebarTriggerEnum,
  TriggerEnum,
} from "../enums/menuEnum";

// 暂定两种语言
export type LocaleType = "zh_CN" | "en";

export interface GlobEnvConfig {
  // 网址标题
  VITE_BLOG_APP_TITLE: string;
  // 服务器地址
  VITE_BLOG_API_URL: string;
  // 服务器前缀
  VITE_BLOG_API_URL_PREFIX?: string;
  // 项目缩写
  VITE_BLOG_APP_SHORT_NAME: string;
  // 下载地址
  VITE_BLOG_UPLOAD_URL?: string;
}

// GlobEnvConfig 变量映射
export interface GlobalConfig {
  title: string;
  apiUrl: string;
  uploadUrl?: string;
  urlPrefix?: string;
  shortName: string;
}

//语言包管理
export interface LocaleSetting {
  showPicker: boolean;
  locale: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}

// 项目配置
export interface ProjectConfig {
  // 权限缓存类型
  permissionCacheType: CacheTypeEnum;
  // 显示设置按钮
  showSettingButton: boolean;
  // 显示黑暗模式切换按钮
  showDarkModeToggle: boolean;
  // 设置按钮定位
  settingButtonPosition: SettingButtonPositionEnum;
  // 权限模式
  permissionMode: PermissionModeEnum;
  // Session 过期时间
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // 灰色模式
  grayMode: boolean;
  // 弱色
  colorWeak: boolean;
  // 自定义颜色
  themeColor: string;
  // 满屏
  fullContent: boolean;
  // 内容模式
  contentMode: ContentEnum;
  // 显示图片
  showLogo: boolean;
  // 显示页脚
  showFooter: boolean;
  // 头部设置
  headerSetting: HeaderSetting;
  // 菜单设置
  menuSetting: MenuSetting;
  // 工具栏设置
  multiTabsSetting: MultiTabsSetting;
  // 动画设置
  transitionSetting: TransitionSetting;
  // 打开 KeepAlive
  openKeepAlive: boolean;
  // 时间锁
  lockTime: number;
  // 显示面包屑
  showBreadCrumb: boolean;
  // 面包屑是否显示图标
  showBreadCrumbIcon: boolean;
  // 是否开始错误函数
  useErrorHandle: boolean;
  // 是否打开返回上一页功能
  useOpenBackTop: boolean;
  // 是否打开iframe page
  canEmbedIFramePage: boolean;
  // 是否打开消息通知
  closeMessageOnSwitch: boolean;
  // 是否删除所有Http的Pending
  removeAllHttpPending: boolean;
}

export interface TransitionSetting {
  // 是否打开动画
  enable: boolean;
  // 路由点击动画模式
  basicTransition: RouterTransitionEnum;
  // 是否开启页面切换动画
  openPageLoading: boolean;
  // 是否开启加载条
  openNProgress: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
}

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  // 是否展开
  collapsed: boolean;
  // 是否隐藏
  siderHidden: boolean;
  // 是否可以拉开
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: "start" | "center" | "end";
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  // 是否撑满
  showFullScreen: boolean;
  // 锁住屏幕
  useLockPage: boolean;
  // 显示文档
  showDoc: boolean;
  // 显示通知
  showNotice: boolean;
  // 显示搜索
  showSearch: boolean;
}
