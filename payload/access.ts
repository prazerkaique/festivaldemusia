import type { Access, FieldAccess } from 'payload'

/** Qualquer usuário logado */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

/** Somente master */
export const isMaster: Access = ({ req: { user } }) => user?.role === 'master'

/** Logado = lê, master = cria/deleta */
export const contentAccess = {
  read: isLoggedIn,
  create: isLoggedIn,
  update: isLoggedIn,
  delete: isMaster,
}

/** Globals: todos leem, só master deleta campos sensíveis */
export const globalAccess = {
  read: isLoggedIn,
  update: isLoggedIn,
}

/** Campo visível apenas para master */
export const masterFieldOnly: FieldAccess = ({ req: { user } }) => user?.role === 'master'
