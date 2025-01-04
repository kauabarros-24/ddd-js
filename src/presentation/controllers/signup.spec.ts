import { SignupController } from "./signup"
import { MissingParamError, InvalidParamError, ServerError } from "../errors"
import { EmailValidator } from "../protocols/"


interface SubTypes {
    sut: SignupController
    emailValidator: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        is_valid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}



const makeSut = (): SubTypes => {

    
    class EmailValidatorStub implements EmailValidator{
        is_valid(email: string): boolean {
            throw new Error()
        }
    }

    const emailValidator = new EmailValidatorStub()
    const sut = new SignupController(emailValidator)
    return {
        sut,        
        emailValidator,
    }
}

describe('SignupController', () => {
    test('Should return 400 if no name is provided', () =>  {
        const { sut } = makeSut()
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
        const  { sut } = makeSut()
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
        const  { sut } = makeSut()
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
        const { sut } = makeSut()
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
    test ('Should return 400 if email provided is invalid', () => {
        const  { sut, emailValidator} = makeSut()
        jest.spyOn(emailValidator, 'is_valid').mockReturnValueOnce(false)
        const http_request = {
            body: {
                email: "invalid_email@gmail.com",
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password"

            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new InvalidParamError('email'))

    })
    test('Should return 400 if passwordConfirm is not valid or fail', () => {
        const { sut } = makeSut()
        const http_request = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_passwordConfirm"
            }
        }
        const http_response = sut.handle(http_request)
        expect(http_response.statusCode).toBe(400)
        expect(http_response.body).toEqual(new InvalidParamError('passwordConfirm'))
    })
    test ('Should call EmailValidator with correct email', () => {
        const  { sut, emailValidator} = makeSut()
        const isValidSpy = jest.spyOn(emailValidator, 'is_valid').mockReturnValueOnce(false)
        const http_request = {
            body: {
                email: "invalid_email@gmail.com",
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password"

            }
        }
        sut.handle(http_request)
        expect(isValidSpy).toHaveBeenCalledWith(http_request.body.email)


    }) 
    test ('Should return 500 if EmailValidator throws', () => {
    
        const { sut, emailValidator} = makeSut()
        jest.spyOn(emailValidator, "is_valid").mockImplementationOnce(() => {
            throw new Error()
        })
        const http_request = { 
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_password"

            }
        }
        const http_response = sut.handle(http_request)
        console.log(http_response.statusCode)
        expect(http_response.statusCode).toBe(500)
        expect(http_response.body).toEqual(new ServerError())
    })

})