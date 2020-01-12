import findIndex from 'lodash/findIndex'
import {
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
} from './constants'
import Ticket from './ticket'

export default class Locker {
  constructor(boxes, lockerNumber) {
    this.boxes = boxes
    this.lockerNumber = lockerNumber
  }

  storePackage = () => {
    /* eslint no-invalid-this:0*/
    const index = findIndex(this.boxes, (box) => box.boxStatus)
    if (index >= 0) {
      const barcode = Date.parse(new Date())
      this.boxes[index].boxStatus = false
      this.boxes[index].barcode = barcode
      return new Ticket(this.lockerNumber, barcode)
    }
    return STORE_PACKAGE_ERROR
  }

  getPackage = (ticket) => {
    const index = findIndex(this.boxes, (box) => box.barcode === ticket.barcode)
    if (index >= 0) {
      this.boxes[index].boxStatus = true
      this.boxes[index].barcode = ''
      return GET_PACKAGE_SUCCESS
    }
    return GET_PACKAGE_ERROR
  }
}
