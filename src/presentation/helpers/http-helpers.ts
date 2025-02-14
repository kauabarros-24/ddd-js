import { HttpResponse } from "../protocols/http"
import { ServerError } from "../errors/server_param"

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error
})

export const serverError = (): HttpResponse => ({
    statusCode: 500,
    body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data
})
