import { REFUSED } from "dns";

export class SignupController {
    handle(http_response: any): any {
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
    }
}