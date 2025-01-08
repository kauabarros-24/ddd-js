import { resolve } from 'path'
import { AccountModel } from '../../../domain/models'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add_account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements AddAccount{
    private readonly encripter: Encrypter
    constructor (encrypter: Encrypter) {
        this.encripter = encrypter

    }
    async add(account: AddAccountModel): Promise<AccountModel> {
        await this.encripter.encrypt(account.password)
        return new Promise(resolve => resolve(null))
    }

}