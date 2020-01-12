import { GET_PACKAGE_ERROR, STORE_PACKAGE_ERROR } from './constants'

export default class Robot {
  constructor(lockers) {
    this.lockers = lockers
  }

  store = () => {
    for (const locker of this.lockers) {
      const result = locker.storePackage()
      if (result !== STORE_PACKAGE_ERROR) {
        return result
      }
    }
    return STORE_PACKAGE_ERROR
  }

  getPack = (ticket) => {
    for (const locker of this.lockers) {
      const result = locker.getPackage(ticket)
      if (result !== GET_PACKAGE_ERROR) {
        return result
      }
    }
    return GET_PACKAGE_ERROR
  }
}
