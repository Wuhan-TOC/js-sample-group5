import Robot from '../src/robot'
import {
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  STORE_PACKAGE_ERROR,
  TOTAL_BOXES,
} from '../src/constants'
import Locker from '../src/locker'
import Ticket from '../src/ticket'

describe('Robot test', () => {
  it('should 0 when robot get highest vacancy given the first locker with 24 available box of 24 and the second locker with 12 available box of 24', () => {
    const firstBoxes = Array(TOTAL_BOXES).fill('')
    const secondBoxes = Array(12)
      .fill('1234567890')
      .concat(Array(12).fill(''))
    const lockers = [new Locker(firstBoxes, 1), new Locker(secondBoxes, 2)]
    const robot = new Robot(lockers)

    const result = robot.getHighestVacancyBox()

    expect(result).toBe(0)
  })

  it('should generate a ticket from first locker when robot store package given the first locker with 100% Vacancy and the second locker with 50% Vacancy', () => {
    const firstBoxes = Array(TOTAL_BOXES).fill('')
    const secondBoxes = Array(5)
      .fill('1234567890')
      .concat(Array(5).fill(''))
    const lockers = [new Locker(firstBoxes, 1), new Locker(secondBoxes, 2)]
    const robot = new Robot(lockers)

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should generate a ticket from first locker when robot store package given the first locker with 50% Vacancy and the second locker with 50% Vacancy', () => {
    const firstBoxes = Array(4)
      .fill('1234567890')
      .concat(Array(4).fill(''))
    const secondBoxes = Array(5)
      .fill('1234567890')
      .concat(Array(5).fill(''))
    const lockers = [new Locker(firstBoxes, 1), new Locker(secondBoxes, 2)]
    const robot = new Robot(lockers)

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should show error message when store package given the first locker with 0% Vacancy and the second locker with 0% Vacancy', () => {
    const firstBoxes = Array(24).fill('1234567890')
    const secondBoxes = Array(12).fill('1234567890')
    const lockers = [new Locker(firstBoxes, 1), new Locker(secondBoxes, 2)]
    const robot = new Robot(lockers)

    const result = robot.store()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should show success message when robot get package given ticket with fisrt box in first locker number ', () => {
    const firstBoxes = ['1234567890'].concat(Array(11).fill(''))
    const lockers = [new Locker(firstBoxes, 1)]
    const robot = new Robot(lockers)
    const ticket = new Ticket(1, '1234567890')

    const result = robot.getPack(ticket)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when robot get package given an invalid ticket', () => {
    const boxes = ['1234567890'].concat(Array(11).fill(''))
    const lockers = [new Locker(boxes, 1)]
    const robot = new Robot(lockers)
    const ticket = new Ticket(1, '23333333')

    const result = robot.getPack(ticket)

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })

  it('should show error message when robot get package given an used ticket', () => {
    const firstBoxes = ['1234567890'].concat(Array(11).fill(''))
    const lockers = [new Locker(firstBoxes, 1)]
    const robot = new Robot(lockers)
    const ticket = new Ticket(1, '1234567890')
    robot.getPack(ticket)

    const result = robot.getPack(ticket)

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
