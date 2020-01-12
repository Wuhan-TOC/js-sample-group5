import Locker from './locker'
import {
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  TOTAL_BOXES,
} from './constants'

describe('Locker test', () => {
  it('should get a ticket when store package given an available locker', () => {
    const box = {
      boxStatus: true,
      barcode: '',
    }
    const boxes = Array(TOTAL_BOXES).fill(box)
    const locker = new Locker(boxes, 1)

    const result = locker.storePackage()

    expect(result).not.toEqual(STORE_PACKAGE_ERROR)
  })

  it('should show error message when store package given an locker without empty box', () => {
    const box = {
      boxStatus: false,
      barcode: '1234567890',
    }
    const boxes = Array(TOTAL_BOXES).fill(box)
    const locker = new Locker(boxes, 1)

    const result = locker.storePackage()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should open the locker when get package given a valid barcode', () => {
    const box = {
      boxStatus: true,
      barcode: '',
    }
    const boxes = Array(TOTAL_BOXES).fill(box)
    const locker = new Locker(boxes, 1)
    const barcode = locker.storePackage()

    const result = locker.getPackage(barcode)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when get package given an invalid barcode', () => {
    const box = {
      boxStatus: false,
      barcode: '1234567890',
    }
    const boxes = Array(TOTAL_BOXES).fill(box)
    const locker = new Locker(boxes, 1)

    const result = locker.getPackage('32432432432')

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
