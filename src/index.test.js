import Locker from './Locker'

describe('locker test', () => {
  it('should generate a barcode when store package given available locker', () => {
    const locker = new Locker()

    const result = locker.this.storePackageWithAvailableBox()

    expect(result).not.toBeNull()
  })

  it('should print error message when store package given an locker without empty box', () => {
    const locker = new Locker()

    const result = locker.storePackageWithoutAvailableBox()

    expect(result).toEqual('error')
  })

  it('should get true when get package given a barcode', () => {
    const locker = new Locker()

    const result = locker.getPackage('223432')

    expect(result).toEqual(true)
  })

  it('should get false when get package given a barcode', () => {
    const locker = new Locker()

    const result = locker.getPackage(null)

    expect(result).toEqual(false)
  })
})
