import type { LocaleSetting, LocaleType } from "@/types/config";

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CH: "zh_CN",
  EN_US: "en",
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CH,
  fallback: LOCALE.ZH_CH,
  availableLocales: [LOCALE.ZH_CH, LOCALE.EN_US],
};
