export default class Locker {
  storePackageWithAvailableBox = () => ''

  storePackageWithoutAvailableBox = () => 'error'

  getPackage = (barcode) => barcode !== null && barcode !== ''
}
