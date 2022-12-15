export interface getCaptchaModal {
    captchaId: string;
    picPath: string;
}

export interface LoginModel {
    username: string;
    password: string;
    captcha: string;
    captchaId: string;
}

export interface GetUserInfoModel {
    userId: string;
    token: string;
    user: object;
}