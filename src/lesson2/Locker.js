import findIndex from 'lodash/findIndex'
import {
  StatusEnum,
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  getRandomInt,
  getRandomString,
  GET_PACKAGE_SUCCESS,
} from '.'

export default class Locker {
  constructor(boxCount) {
    this.totalCount = boxCount
    this.boxArr = new Array(boxCount).fill({
      status: StatusEnum.available,
      tempCode: '',
    })
  }

  storePackage = () => {
    if (this.totalCount === 0) {
      return STORE_PACKAGE_ERROR
    }
    const randomId = getRandomInt(this.totalCount)
    const box = this.boxArr[randomId]
    if (box.status === StatusEnum.available) {
      box.status = StatusEnum.unavailable
      box.tempCode = getRandomString(box.id)
      this.boxArr.splice(randomId, 1, box)
      return box.tempCode
    }
    return STORE_PACKAGE_ERROR
  }

  getPackage = (barcode) => {
    if (barcode === '' || barcode === null) {
      return GET_PACKAGE_ERROR
    }
    const index = findIndex(this.boxArr, (box) => box.tempCode === barcode)

    if (index >= 0) {
      const newBox = this.boxArr[index]
      newBox.tempCode = ''
      newBox.status = StatusEnum.available
      this.boxArr.splice(index, 1, newBox)
      return GET_PACKAGE_SUCCESS
    }
    return GET_PACKAGE_ERROR
  }
}
