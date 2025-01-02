import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/missing_param"
import { badRequest } from "../helpers/http-helpers"
import { EmailValidator } from "../protocols/email_validator"
import { InvalidParamError } from "../errors/invalid_param"
export class SignupController {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
        
    }

    handle(http_response: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', "passwordConfirm"]
        for (const field of requiredFields) {
            if (!http_response.body[field]) {
                return badRequest(new MissingParamError(field))
            }
            
        }
        const is_valid = this.emailValidator.is_valid(http_response.body.email)
        if (!is_valid) {
            return badRequest(new InvalidParamError('email'))
        }
        
    }
}