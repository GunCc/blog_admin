import type { App } from "vue";
import type { I18n, I18nOptions } from "vue-i18n";
import { createI18n } from "vue-i18n";
import { useStore } from "vuex";
import { localeSetting } from "../settings/localeSetting";
import { LocaleType } from "../types/config";
import { setHtmlPageLang, setLoadLocalePool } from "./helper";

const { fallback, availableLocales } = localeSetting;

export let i18n: ReturnType<typeof createI18n>;

export async function createI18nOptions(): Promise<I18nOptions> {
    const store = useStore();
    console.log(store)
    const locale = "zh-CN" as LocaleType;
    const defaultLocal = await import(`./lang/${locale}.ts`);
    const message = defaultLocal.default?.message ?? {};
    setHtmlPageLang(locale);
    setLoadLocalePool((localLocalePool) => {
        localLocalePool.push(locale)
    })

    return {
        legacy: false,
        locale,
        fallbackLocale: fallback,
        messages: {
            [locale]: message,
        },
        availableLocales: availableLocales,
        sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
        silentTranslationWarn: true, // true - warning off
        missingWarn: false,
        silentFallbackWarn: true,
    };
}

export async function setupI18n(app: App) {
    const options = await createI18nOptions();
    i18n = createI18n(options) as I18n;
    app.use(i18n);
}
