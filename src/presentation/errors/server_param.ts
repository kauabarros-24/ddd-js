export class ServerError extends Error {
    constructor(paramName?: string) {
        super(`Server param: ${paramName}`)
        this.name = 'ServerError'
    }
}  