export * from "../../../domain/usecases"
export * from "../../../domain/models"

export interface EmailValidator {
    is_valid(email: string): boolean
}