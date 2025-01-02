import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamError } from "../errors/errors"
export class SignupController {
    handle(http_response: HttpRequest): HttpResponse {
        if (!http_response.body.name) {
            return {
                statusCode: 400,
                body: new MissingParamError('name')
            }
        }
        else if(!http_response.body.email) {
            return {
                statusCode: 400,
                body: new MissingParamError('email')
            }
        }
        else if(!http_response.body.password) {
            return {
                statusCode: 400,
                body: new MissingParamError('password')
            }
        }
    }
}