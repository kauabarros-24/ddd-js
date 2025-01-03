import { HttpRequest, HttpResponse } from "../protocols/http";
import { MissingParamError } from "../errors/missing_param";
import { badRequest } from "../helpers/http-helpers";
import { EmailValidator } from "../protocols/email_validator";
import { InvalidParamError } from "../errors/invalid_param";
import { ServerError } from "../errors/server_param";

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
            const is_valid = this.emailValidator.is_valid(http_request.body.email);
            if (!is_valid) {
                return badRequest(new InvalidParamError('email'));
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: new ServerError()
            };
        }
    }
}
