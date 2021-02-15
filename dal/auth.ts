import { forward, createDomain } from 'effector'
import { createCustomError } from '@/lib/errors'
import { attachWrapper } from '@/lib/effector-extra'
import {
  Method, authenticate, requestFx, authRequestFx,
} from './rest-api'
import { User } from './entities'

const EMAIL_ALREADY_EXISTS = 1001
const USER_NOT_FOUND = 404

export const EmailAlreadyExists = createCustomError('EmailAlreadyExists')
export const UserNotFound = createCustomError('UserNotFound')
export const UnknownError = createCustomError('UnknownError')

export type AuthenticateResult = {
  access_token: string;
  token_type: 'bearer';
  expire_at: number;
  user: User;
}

export type LoginOrRegisterByGoogleParams = {
  idToken: string;
}

export const loginOrRegisterByGoogleFx = attachWrapper({
  effect: requestFx,
  mapParams: ({ idToken }: LoginOrRegisterByGoogleParams) => ({
    method: Method.post,
    url: '/login-or-register-by-google',
    body: {
      id_token: idToken,
    },
  }),
  mapResult: ({ result }): AuthenticateResult => result.data,
})

export type LoginOrRegisterByFbParams = {
  accessToken: string;
}

export const loginOrRegisterByFbFx = attachWrapper({
  effect: requestFx,
  mapParams: ({ accessToken }: LoginOrRegisterByFbParams) => ({
    method: Method.post,
    url: '/login-or-register-by-fb',
    body: {
      access_token: accessToken,
    },
  }),
  mapResult: ({ result }): AuthenticateResult => result.data,
})

export type RegisterByEmailParams = {
  name: string;
  password: string;
  email: string;
}

export const registerByEmailFx = attachWrapper({
  effect: requestFx,
  mapParams: (params: RegisterByEmailParams) => ({
    method: Method.post,
    url: '/register-by-email',
    body: params,
  }),
  mapResult: ({ result }): AuthenticateResult => result.data,
  mapError: ({ error }) => {
    if (error.response?.data?.code === EMAIL_ALREADY_EXISTS) {
      return new EmailAlreadyExists()
    }
    return new UnknownError()
  },
})

export type LoginByEmailParams = {
  email: string;
  password: string;
}

export const loginByEmailFx = attachWrapper({
  effect: requestFx,
  mapParams: (params: LoginByEmailParams) => ({
    method: Method.post,
    url: '/login-by-email',
    body: params,
  }),
  mapResult: ({ result }): AuthenticateResult => result.data,
  mapError: ({ error }) => {
    if (error.response?.status === USER_NOT_FOUND) {
      return new UserNotFound()
    }
    return new UnknownError()
  },
})

export const getCurrentUserFx = attachWrapper({
  effect: authRequestFx,
  mapParams: (_: void) => ({
    method: Method.get,
    url: '/me',
  }),
  mapResult: ({ result }): User => result.data,
})

const extractToken = ({ access_token }: AuthenticateResult) => access_token

forward({
  from: [
    loginByEmailFx.doneData.map(extractToken),
    registerByEmailFx.doneData.map(extractToken),
    loginOrRegisterByGoogleFx.doneData.map(extractToken),
    loginOrRegisterByFbFx.doneData.map(extractToken),
  ],
  to: authenticate,
})
