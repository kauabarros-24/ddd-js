import { HttpRequest, HttpResponse, Controller } from "../../protocols";
import { MissingParamError, InvalidParamError } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http-helpers";
import { AddAccount, EmailValidator} from "./signup_protocols"

export class SignupController implements Controller{
    private readonly emailValidator: EmailValidator;
    private readonly addAccount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    async handle(http_request: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirm'];
            for (const field of requiredFields) {
                if (!http_request.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }
            const { email, name, password, passwordConfirm} = http_request.body
            if (password !== passwordConfirm) {
                return badRequest(new InvalidParamError('passwordConfirm'))
            }
            const is_valid = this.emailValidator.is_valid(email);
            if (!is_valid) {
                return badRequest(new InvalidParamError('email'));
            }
            const account = await this.addAccount.add({ 
                name, 
                email,
                password
            })
            return ok(account)
            
            
        } catch (error) {
            console.log(error)
            return serverError()
        }
    }
}
