import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Body } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post("login")
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto)

  }

  @Post("signup")
  signup(@Body() dto: AuthDto) {
    console.log({ dto })
    return this.authService.signup(dto)
  }
}