import { forgetPassword, loginUser, registerUser, resendOtp, resetPassword, verifyOtp } from "./auth.interface";
export declare class RegisterUser implements registerUser {
    email: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    password: string;
    phoneNumber: string;
}
export declare class LoginUser implements loginUser {
    email: string;
    password: string;
}
export declare class ForgetPassword implements forgetPassword {
    email: string;
}
export declare class ResetPassword implements resetPassword {
    email: string;
    password: string;
}
export declare class VerifyOtp implements verifyOtp {
    email: string;
    token?: string;
}
export declare class ResendOtp implements resendOtp {
    email: string;
}
