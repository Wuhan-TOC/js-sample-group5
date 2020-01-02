import Locker from './Locker'

describe('locker test', () => {
  it('should generate a barcode when store package given available locker', () => {

    let locker = new Locker();

    let result = locker.storePackageWithAvailableBox()

    expect(result).not.toBeNull()
  })

  it("should print error message when store package given an locker without empty box", () => {
    let locker = new Locker();

    let result = locker.storePackageWithoutAvailableBox()

    expect(result).toEqual("error")
  })

  it("should get true when get package given a barcode", () => {
    let locker = new Locker();

    let result = locker.getPackage("223432")

    expect(result).toEqual(true)
  })

  it("should get false when get package given a barcode", () => {
    let locker = new Locker();

    let result = locker.getPackage(null)

    expect(result).toEqual(false)
  })
})
