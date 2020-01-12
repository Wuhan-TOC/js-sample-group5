import Robot from './robot'
import {
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  STORE_PACKAGE_ERROR,
} from './constants'
import Locker from './locker'
import Ticket from './ticket'

describe('Robot test', () => {
  const fullBox = {
    boxStatus: false,
    barcode: '123',
  }
  const emptyBox = {
    boxStatus: true,
    barcode: '',
  }
  const TOTAL_BOXES = 24

  it('should generate a ticket from first locker when robot store package given 3 available locker', () => {
    const boxes = Array(TOTAL_BOXES).fill(emptyBox)
    const lockers = [
      new Locker(boxes, 1),
      new Locker(boxes, 2),
      new Locker(boxes, 3),
    ]
    const robot = new Robot(lockers)

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should show error message when robot store package given 3 unavailable locker', () => {
    const boxes = Array(TOTAL_BOXES).fill(fullBox)
    const lockers = [
      new Locker(boxes, 1),
      new Locker(boxes, 2),
      new Locker(boxes, 3),
    ]
    const robot = new Robot(lockers)

    const result = robot.store()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should generate a ticket from second locker when robot store package given 3 lockers with first unavailable', () => {
    const lockers = [
      new Locker(Array(TOTAL_BOXES).fill(fullBox), 1),
      new Locker(Array(TOTAL_BOXES).fill(emptyBox), 2),
      new Locker(Array(TOTAL_BOXES).fill(emptyBox), 3),
    ]
    const robot = new Robot(lockers)

    const ticket = robot.store()
    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(2)
  })

  it('should show success message when robot get package given a valid ticket', () => {
    const boxes = Array(TOTAL_BOXES).fill(emptyBox)
    const lockers = [
      new Locker(boxes, 1),
      new Locker(boxes, 2),
      new Locker(boxes, 3),
    ]
    const robot = new Robot(lockers)
    const ticket = robot.store()

    const result = robot.getPack(ticket)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when robot get package given an invalid ticket', () => {
    const boxes = Array(TOTAL_BOXES).fill(emptyBox)
    const lockers = [
      new Locker(boxes, 1),
      new Locker(boxes, 2),
      new Locker(boxes, 3),
    ]
    const robot = new Robot(lockers)

    const result = robot.getPack(new Ticket(1, '23333333'))

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
