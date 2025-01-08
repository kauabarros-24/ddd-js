import { EmailValidatorAdapter } from "./email_validator";
import validator from 'validator';

jest.mock('validator', () => ({
    isEmail (): boolean {
        return true
    }
}));

const makeSut = (): EmailValidatorAdapter => {
    return new EmailValidatorAdapter();
};

describe("EmailValidatorAdapter", () => {
    test('Should return false if validator returns false', () => {
        const sut = makeSut();
        jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false); 
        const is_valid = sut.is_valid('invalid_email@gmail.com');
        expect(is_valid).toBe(false);
    });

    test('Should return true if validator returns true', () => {
        const sut = makeSut();
        const is_valid = sut.is_valid('valid_email@gmail.com');
        expect(is_valid).toBe(true);
    });

    test('Should call validator with correct email', () => {
        const sut = makeSut();
        const isEmailSpy = jest.spyOn(validator, 'isEmail');
        sut.is_valid('any_email@gmail.com');
        expect(isEmailSpy).toHaveBeenCalledWith('any_email@gmail.com');
    });
});
