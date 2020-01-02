export default class Locker {

  storePackageWithAvailableBox() {
    return "";
  }

  storePackageWithoutAvailableBox() {
    return "error";
  }

  getPackage(barcode) {
    return barcode != null && barcode !== "" &&  barcode !== undefined
  }
}