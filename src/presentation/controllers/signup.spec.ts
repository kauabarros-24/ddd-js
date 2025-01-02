import { SignupController } from "./signup"

describe('SignupController', () => {
    test('Should return 400 if no name is provided', () =>  {
        const sut = new SignupController()
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_password"
            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new Error('Missing param: name'))
    })
    test ('Should return 400 if no email is provided', () => {
        const sut = new SignupController()
        const http_request = {
            body: {
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password"
            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new Error("Missing param: email"))
    })
})