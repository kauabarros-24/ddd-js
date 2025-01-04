import { HttpRequest, HttpResponse, EmailValidator } from "../protocols/";
import { MissingParamError, InvalidParamError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helpers";
export class SignupController {
    private readonly emailValidator: EmailValidator;

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator;
    }

    handle(http_request: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirm'];
            for (const field of requiredFields) {
                if (!http_request.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }
            if (http_request.body.password !== http_request.body.passwordConfirm) {
                return badRequest(new InvalidParamError('passwordConfirm'))
            }
            const is_valid = this.emailValidator.is_valid(http_request.body.email);
            if (!is_valid) {
                return badRequest(new InvalidParamError('email'));
            }
        } catch (error) {
            return serverError()
        }
    }
}
