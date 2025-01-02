import { HttpRequest, HttpResponse } from "../protocols/http"
export class SignupController {
    handle(http_response: HttpRequest): HttpResponse {
        if (!http_response.body.name) {
            return {
                statusCode: 400,
                body: new Error('Missing param: name')
            }
        }
        else if(!http_response.body.email) {
            return {
                statusCode: 400,
                body: new Error('Missing param: email')
            }
        }
        else if(!http_response.body.password) {
            return {
                statusCode: 400,
                body: new Error('Missing param: password')
            }
        }
    }
}