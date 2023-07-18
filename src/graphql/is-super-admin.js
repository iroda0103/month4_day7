import {ForbiddedError} from '../shared/errors/index.js'

export const isSuperAdmin = (contextValue) => {
    if (contextValue.user.role!='super-admin') {
      throw new ForbiddedError('Forbiddin');
    }
  }