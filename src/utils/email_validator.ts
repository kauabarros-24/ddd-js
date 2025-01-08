import { EmailValidator } from "../presentation/controllers/signup/signup_protocols";
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
    is_valid(email: string): boolean {
        return validator.isEmail(email)
    }   
}