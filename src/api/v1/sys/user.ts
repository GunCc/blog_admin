import { getCaptchaModal, GetUserInfoModel, LoginModel } from "./model/userModal";
import { ErrorMessageMode } from "/@/types/axios";
import { http } from "/@/utils/http/axios";

enum Api {
    Captcha = "base/captcha",
    Login = "base/login"
}

export const getCaptcha = (mode: ErrorMessageMode = "modal") =>
    http.post<getCaptchaModal>(
        { url: Api.Captcha },
        {
            errorMessageMode: mode
        }
    )


// 登录
export const loginApi = (params: LoginModel, mode: ErrorMessageMode = "modal") =>
    http.post<GetUserInfoModel>(
        { url: Api.Login, params },
        {
            errorMessageMode: mode
        }
    )