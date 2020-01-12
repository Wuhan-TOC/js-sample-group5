import Locker from '../src/locker'
import {
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  TOTAL_BOXES,
} from '../src/constants'
import Ticket from '../src/ticket'

describe('Locker test', () => {
  it('should get a ticket when store package given an available locker', () => {
    const boxes = Array(TOTAL_BOXES).fill('')
    const locker = new Locker(boxes, 1)

    const result = locker.storePackage()

    expect(result).not.toEqual(STORE_PACKAGE_ERROR)
  })

  it('should show error message when store package given an locker without empty box', () => {
    const boxes = Array(TOTAL_BOXES).fill('1234567890')
    const locker = new Locker(boxes, 1)

    const result = locker.storePackage()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should open the locker when get package given a valid ticket', () => {
    const boxes = Array(23)
      .fill('')
      .concat('1234567890')
    const locker = new Locker(boxes, 1)
    const ticket = new Ticket(1, '1234567890')

    const result = locker.getPackage(ticket)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when get package given an invalid ticket', () => {
    const boxes = Array(23)
      .fill('')
      .concat('1234567890')
    const locker = new Locker(boxes, 1)
    const ticket = new Ticket(1, '32432432432')

    const result = locker.getPackage(ticket)

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })

  it('should get 0.5 when get vacancy Rate given a box with 12 full and 12 empty ', () => {
    const boxes = Array(12)
      .fill('1234567890')
      .concat(Array(12).fill(''))
    const locker = new Locker(boxes, 1)

    const result = locker.getVacancyRate()

    expect(result).toBe(0.5)
  })
})
