import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {

    //constructor(private authService: AuthService) { }


    login() {
        return {
            msg: "Lets login in"
        }

    }


    signup() {
        return {
            msg: "Lets sign up "
        }
    }
}