import findIndex from 'lodash/findIndex'
import {
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  getRandomInt,
  getRandomString,
  GET_PACKAGE_SUCCESS,
} from '.'

export default class Locker {
  constructor(totalAvailableBoxes) {
    this.totalAvailableBoxes = totalAvailableBoxes
    this.boxArr = new Array(totalAvailableBoxes).fill({
      isAvailable: true,
      barcode: '',
    })
  }

  storePackage = () => {
    if (this.totalAvailableBoxes === 0) {
      return STORE_PACKAGE_ERROR
    }
    const randomId = getRandomInt(this.totalAvailableBoxes)
    const box = this.boxArr[randomId]
    if (box.isAvailable === true) {
      box.isAvailable = false
      box.barcode = getRandomString(box.id)
      this.boxArr.splice(randomId, 1, box)
      return box.barcode
    }
    return STORE_PACKAGE_ERROR
  }

  getPackage = (barcode) => {
    if (barcode === '' || barcode === null) {
      return GET_PACKAGE_ERROR
    }
    const index = findIndex(this.boxArr, (box) => box.barcode === barcode)

    if (index >= 0) {
      const newBox = this.boxArr[index]
      newBox.barcode = ''
      newBox.isAvailable = true
      this.boxArr.splice(index, 1, newBox)
      return GET_PACKAGE_SUCCESS
    }
    return GET_PACKAGE_ERROR
  }
}
