import superRobot from './superRobot'

export default class ManagerRobot extends superRobot {
  constructor(lockers, robots) {
    super(lockers)
    this.robots = robots
    this.index = 0
  }

  managerStore = () => {
    const result = this.robots[this.index].store()
    this.changeIndex()
    return result
  }

  managerGetPack = () => {
    const result = this.robots[this.index].withdraw()
    this.changeIndex()
    return result
  }

  changeIndex = () => {
    if (this.index === this.robots.length - 1) {
      this.index = 0
    } else {
      this.index += 1
    }
  }
}
