import { SignupController } from "./signup"
import { MissingParamError } from "../errors/errors"

const makeSut = (): SignupController => {
    return new SignupController()
}

describe('SignupController', () => {
    test('Should return 400 if no name is provided', () =>  {
        const sut = makeSut()
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_password"
            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new MissingParamError('name'))
    })
    test ('Should return 400 if no email is provided', () => {
        const sut = makeSut()
        const http_request = {
            body: {
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password"
            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new MissingParamError('email'))
    })
    test ('Should return 400 if no password is provided', () => {
        const sut = makeSut()
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                name: "any_name",
                passwordConfirm: "any_passworConfirm"
            }

        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new MissingParamError('password'))
    })
    test ('Should return 400 if no password confirm is provided', () => {
        const sut = makeSut()
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                name: "any_name",
                password: "any_password",
            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new MissingParamError('passwordConfirm'))
    })
})