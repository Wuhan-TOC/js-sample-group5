import { GET_PACKAGE_ERROR } from './constants'

export default class Robot {
  constructor(lockers) {
    this.lockers = lockers
  }

  store = () => {
    const index = this.getHighestVacancyBox()
    return this.lockers[index].storePackage()
  }

  getPack = (ticket) => {
    for (const locker of this.lockers) {
      const result = locker.getPackage(ticket)
      if (result !== GET_PACKAGE_ERROR) {
        return result
      }
    }
    return GET_PACKAGE_ERROR
  }

  getHighestVacancyBox = () => {
    let highestVacancylockerIndex = 0
    let highestVacancyRate = this.lockers[0].getVacancyRate()

    for (const locker of this.lockers) {
      const currentVacancyRate = locker.getVacancyRate()
      if (currentVacancyRate > highestVacancyRate) {
        highestVacancylockerIndex = locker.index
        highestVacancyRate = locker.getVacancyRate()
      }
    }
    return highestVacancylockerIndex
  }
}
