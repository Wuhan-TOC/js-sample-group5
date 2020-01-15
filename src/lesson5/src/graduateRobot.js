import { STORE_PACKAGE_ERROR } from './constants'

export default class GraduateRobot {
  constructor(lockers) {
    this.lockers = lockers
  }

  store = () => {
    const result = this.lockers.find((locker) => locker.getVacancyRate() > 0)
    if (!result) {
      return STORE_PACKAGE_ERROR
    }
    return result.storePackage()
  }

  withdraw = (ticket) => {
    const correctLocker = this.lockers.find((locker) => {
      return locker.lockerNumber === ticket.lockerNumber
    })
    return correctLocker.getPackage(ticket)
  }
}
