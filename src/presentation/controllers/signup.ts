import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/errors"
import { badRequest } from "../helpers/http-helpers"
export class SignupController {
    handle(http_response: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', "passwordConfirm"]
        for (const field of requiredFields) {
            if (!http_response.body[field]) {
                return badRequest(new MissingParamError(field))
            }
            
        }
    }
}