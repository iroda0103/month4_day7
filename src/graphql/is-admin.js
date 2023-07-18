import {ForbiddedError} from '../shared/errors/index.js'
export const isAdmin = (contextValue) => {
    if (contextValue.user.role=='user') {
      throw new ForbiddedError('Forbiddin');
    }
  }