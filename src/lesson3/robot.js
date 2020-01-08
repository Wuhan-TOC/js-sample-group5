import Ticket from './ticket'
import findIndex from 'lodash/findIndex'
import {
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  STORE_PACKAGE_ERROR,
} from './constants'

export default class Robot {
  constructor(availableLockerCount, lockers) {
    this.lockers = lockers
    this.availableCount = availableLockerCount
  }

  store = () => {
    const lockerStoreIndex = findIndex(
      this.lockers,
      (locker) => locker.totalAvailableBox > 0
    )
    if (lockerStoreIndex >= 0) {
      const locker = this.lockers[lockerStoreIndex]
      const barcode = locker.storePackage()
      return new Ticket(locker.lockerNumber, barcode)
    }
    return STORE_PACKAGE_ERROR
  }

  getPackage = (ticket) => {
    const index = findIndex(
      this.lockers,
      (locker) => locker.lockerNumber === ticket.lockerNumber
    )
    if (index < 0) {
      return GET_PACKAGE_ERROR
    }
    const locker = this.lockers[index]
    return locker.getPackage(ticket.barcode)
  }
}
