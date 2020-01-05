import Locker from './Locker'
import { STORE_PACKAGE_ERROR, GET_PACKAGE_SUCCESS, GET_PACKAGE_ERROR } from '.'

describe('Locker test', () => {
  it('should generate a barcode when store package given an available locker', () => {
    const locker = new Locker(24)

    const result = locker.storePackage()

    expect(result).not.toEqual(STORE_PACKAGE_ERROR)
  })

  it('should show error message when store package given an locker without empty box', () => {
    const locker = new Locker(0)

    const result = locker.storePackage()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should open the locker when get package given a valid barcode', () => {
    const locker = new Locker(24)

    const barcode = locker.storePackage()

    const result = locker.getPackage(barcode)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when get package given an invalid barcode', () => {
    const locker = new Locker(24)

    locker.storePackage()

    const result = locker.getPackage('32432432432')

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
