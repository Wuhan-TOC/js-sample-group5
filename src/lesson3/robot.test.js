import Robot from './robot'
import {
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  STORE_PACKAGE_ERROR,
  TOTAL_BOXES,
} from './constants'
import Locker from './locker'
import Ticket from './ticket'
import Box from './box'

describe('Robot test', () => {
  it('should generate a ticket from first locker when robot store package given 10 available locker', () => {
    const availableBoxes = Array(10).fill(TOTAL_BOXES)
    const lockers = []
    availableBoxes.forEach((item, index) => {
      const locker = new Locker(item, index + 1)
      lockers.push(locker)
    })
    const robot = new Robot(10, lockers)

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should show error message when robot store package given 10 unavailable locker', () => {
    const availableBoxes = Array(10).fill(0)
    const lockers = []
    availableBoxes.forEach((item, index) => {
      const locker = new Locker(item, index + 1)
      lockers.push(locker)
    })
    const robot = new Robot(10, lockers)

    const result = robot.store()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should generate a ticket from second locker when robot store package given 10 lockers with first unavailable', () => {
    const firstLocker = new Locker(0, 1)
    const lockers = [firstLocker]
    const availableBoxes = Array(9).fill(TOTAL_BOXES)
    availableBoxes.forEach((item, index) => {
      const locker = new Locker(item, index + 2)
      lockers.push(locker)
    })
    const robot = new Robot(9, lockers)

    const ticket = robot.store()
    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(2)
  })

  it('should show success message when robot get package given a valid ticket', () => {
    const availableBoxes = Array(10).fill(TOTAL_BOXES)
    const lockers = []
    availableBoxes.forEach((item, index) => {
      const locker = new Locker(item, index + 1)
      if (index === 4) {
        locker.availableBoxes.splice(2, 1)
        locker.unavailableBoxes.push(new Box(3, false, '3232323'))
      }
      lockers.push(locker)
    })
    const robot = new Robot(10, lockers)

    const ticket = new Ticket(5, '3232323')
    const result = robot.getPackage(ticket)
    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when robot get package given an invalid ticket', () => {
    const availableBoxes = Array(10).fill(TOTAL_BOXES)
    const lockers = []
    availableBoxes.forEach((item, index) => {
      const locker = new Locker(item, index + 1)
      lockers.push(locker)
    })
    const robot = new Robot(10, lockers)

    const ticket = new Ticket(5, '23333333')
    const result = robot.getPackage(ticket)
    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
