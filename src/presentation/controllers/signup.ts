import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/errors"
import { badRequest } from "../helpers/http-helpers"
export class SignupController {
    handle(http_response: HttpRequest): HttpResponse {
        if (!http_response.body.name) {
            return badRequest(new MissingParamError('name'))
        }
        else if(!http_response.body.email) {
            return badRequest(new MissingParamError('email'))
        }
        else if(!http_response.body.password) {
            return badRequest(new MissingParamError('password'))
        }
    }
}