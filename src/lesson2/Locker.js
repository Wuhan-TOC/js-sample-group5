import Box from './Box'
import findIndex from 'lodash/findIndex'
import {
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  TOTAL_BOXES,
  getRandomInt,
  getRandomString,
} from '.'

export default class Locker {
  constructor(totalAvailableBox) {
    this.totalAvailableBox = totalAvailableBox
    this.availableBoxes = []
    this.unavailableBoxes = []
    this.InitBoxes(totalAvailableBox)
  }

  InitBoxes = (totalAvailableBox) => {
    if (totalAvailableBox === 0) {
      return
    }

    for (let i = 0; i < totalAvailableBox; i++) {
      const box = new Box(i + 1, true, '')
      this.availableBoxes.push(box)
    }

    for (let i = totalAvailableBox; i <= TOTAL_BOXES; i++) {
      const box = new Box(i, false, '')
      this.unavailableBoxes.push(box)
    }
  }

  storePackage = () => {
    if (this.totalAvailableBox === 0) {
      return STORE_PACKAGE_ERROR
    }

    const randomId = getRandomInt(this.totalAvailableBox)
    const availableBox = this.availableBoxes[randomId]
    if (availableBox.isAvailable === true) {
      this.totalAvailableBox--
      const barcode = getRandomString(availableBox.boxNumber)
      const newLockedbox = new Box(availableBox.boxNumber, false, barcode)
      this.availableBoxes.splice(randomId, 1)
      this.unavailableBoxes.push(newLockedbox)
      return barcode
    }
    return STORE_PACKAGE_ERROR
  }

  getPackage = (barcode) => {
    if (barcode === '' || barcode === null) {
      return GET_PACKAGE_ERROR
    }

    let index = -1
    index = findIndex(this.unavailableBoxes, (box) => box.barcode === barcode)

    if (index >= 0) {
      const newUnlockedBox = new Box(
        this.availableBoxes[index].boxNumber,
        true,
        ''
      )
      this.availableBoxes.push(newUnlockedBox)
      this.unavailableBoxes.splice(index, 1)
      return GET_PACKAGE_SUCCESS
    }
    return GET_PACKAGE_ERROR
  }
}
