import { SignupController } from "./signup";
import { MissingParamError, InvalidParamError, ServerError } from "../errors";
import { EmailValidator } from "../protocols/";
import { AddAccount, AddAccountModel } from "../../domain/usecases";
import { AccountModel } from "../../domain/models";

interface SubTypes {
    sut: SignupController;
    emailValidator: EmailValidator;
    addAccountStub: AddAccount;
}

const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        is_valid(email: string): boolean {
            return true;
        }
    }
    return new EmailValidatorStub();
};

const makeAddAccount = (): AddAccount => {
    class AddAccountStub implements AddAccount {
        add(account: AddAccountModel): AccountModel {
            return {
                id: "valid_id",
                name: "valid_name",
                email: "valid_email@gmail.com",
                password: "valid_password",
            };
        }
    }
    return new AddAccountStub();
};

const makeSut = (): SubTypes => {
    const emailValidator = makeEmailValidator();
    const addAccountStub = makeAddAccount();
    const sut = new SignupController(emailValidator, addAccountStub);

    return {
        sut,
        emailValidator,
        addAccountStub,
    };
};

describe("SignupController", () => {
    test("Should return 400 if no name is provided", () => {
        const { sut } = makeSut();
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(400);
        expect(http_response.body).toEqual(new MissingParamError("name"));
    });

    test("Should return 400 if no email is provided", () => {
        const { sut } = makeSut();
        const http_request = {
            body: {
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(400);
        expect(http_response.body).toEqual(new MissingParamError("email"));
    });

    test("Should return 400 if no password is provided", () => {
        const { sut } = makeSut();
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                name: "any_name",
                passwordConfirm: "any_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(400);
        expect(http_response.body).toEqual(new MissingParamError("password"));
    });

    test("Should return 400 if no password confirm is provided", () => {
        const { sut } = makeSut();
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                name: "any_name",
                password: "any_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(400);
        expect(http_response.body).toEqual(new MissingParamError("passwordConfirm"));
    });

    test("Should return 400 if email provided is invalid", () => {
        const { sut, emailValidator } = makeSut();
        jest.spyOn(emailValidator, "is_valid").mockReturnValueOnce(false);
        const http_request = {
            body: {
                email: "invalid_email@gmail.com",
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(400);
        expect(http_response.body).toEqual(new InvalidParamError("email"));
    });

    test("Should return 400 if passwordConfirm is not valid or fail", () => {
        const { sut } = makeSut();
        const http_request = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "wrong_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(400);
        expect(http_response.body).toEqual(new InvalidParamError("passwordConfirm"));
    });

    test("Should call EmailValidator with correct email", () => {
        const { sut, emailValidator } = makeSut();
        const isValidSpy = jest.spyOn(emailValidator, "is_valid");
        const http_request = {
            body: {
                email: "any_email@gmail.com",
                name: "any_name",
                password: "any_password",
                passwordConfirm: "any_password",
            },
        };
        sut.handle(http_request);
        expect(isValidSpy).toHaveBeenCalledWith(http_request.body.email);
    });

    test("Should return 500 if EmailValidator throws", () => {
        const { sut, emailValidator } = makeSut();
        jest.spyOn(emailValidator, "is_valid").mockImplementationOnce(() => {
            throw new Error();
        });
        const http_request = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_password",
            },
        };
        const http_response = sut.handle(http_request);
        expect(http_response.statusCode).toBe(500);
        expect(http_response.body).toEqual(new ServerError());
    });

    test("Should call AddAccount with correct values", () => {
        const { sut, addAccountStub } = makeSut();
        const addSpy = jest.spyOn(addAccountStub, "add");
        const http_request = {
            body: {
                name: "any_name",
                email: "any_email@gmail.com",
                password: "any_password",
                passwordConfirm: "any_password",
            },
        };
        sut.handle(http_request);
        expect(addSpy).toHaveBeenCalledWith({
            name: "any_name",
            email: "any_email@gmail.com",
            password: "any_password",
        });
    });
});
