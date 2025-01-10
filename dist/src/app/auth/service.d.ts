import { forgetPassword, loginUser, registerUser, resetPassword, verifyOtp } from "./entity";
import { User } from "../user/entity";
export declare class AuthServices {
    createNewUser(data: registerUser): Promise<User>;
    authenticateUser(data: loginUser): Promise<User>;
    forgetPassword(data: forgetPassword): Promise<void>;
    resetPassword(data: resetPassword): Promise<string>;
    verifyEmail(data: verifyOtp): Promise<string>;
    private hashPassword;
    private assignToken;
}
