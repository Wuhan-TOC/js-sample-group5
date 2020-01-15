import GraduateRobot from './graduateRobot'

export default class SuperRobot extends GraduateRobot{
  constructor(lockers) {
    super(lockers)
  }

  store = () => {
    const locker = this.getHighestVacancyLocker()
    return locker.storePackage()
  }

  getHighestVacancyLocker = () => {
    let result = this.lockers[0]
    this.lockers.forEach((locker) => {
      if (locker.getVacancyRate() > result.getVacancyRate()) {
        result = locker
      }
      return result
    })
    return result
  }
}
