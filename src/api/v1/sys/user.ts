import { getCaptchaModal } from "./model/userModal";
import { ErrorMessageMode } from "/@/types/axios";
import { http } from "/@/utils/http/axios";

enum Api {
    Captcha = "base/captcha"
}

export const getCaptcha = (mode: ErrorMessageMode = "modal") =>
    http.post<getCaptchaModal>(
        { url: Api.Captcha },
        {
            errorMessageMode: mode
        }
    )
