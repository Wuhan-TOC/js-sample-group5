import {
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  STORE_PACKAGE_ERROR,
} from '../src/constants'
import GraduateRobot from '../src/graduateRobot'
import Locker from '../src/locker'
import Ticket from '../src/ticket'

describe('GraduateRobot test', () => {
  it('should generate a ticket from first locker when robot store package given 2 available locker', () => {
    const firstLocker = new Locker(5, 1)
    const secondLocker = new Locker(5, 2)
    const robot = new GraduateRobot([firstLocker, secondLocker])

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should show error message when robot store package given 2 unavailable locker', () => {
    const firstLocker = new Locker(1, 1)
    firstLocker.storePackage()
    const secondLocker = new Locker(1, 2)
    secondLocker.storePackage()
    const robot = new GraduateRobot([firstLocker, secondLocker])

    const result = robot.store()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should generate a ticket from second locker when robot store package given 2 lockers with first unavailable', () => {
    const firstLocker = new Locker(1, 1)
    firstLocker.storePackage()
    const secondLocker = new Locker(1, 2)
    const robot = new GraduateRobot([firstLocker, secondLocker])

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(2)
  })

  it('should show success message when robot get package given a valid ticket', () => {
    const firstLocker = new Locker(1, 1)
    const ticket = firstLocker.storePackage()
    const robot = new GraduateRobot([firstLocker])

    const result = robot.withdraw(ticket)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when robot get package given an invalid ticket', () => {
    const firstLocker = new Locker(1, 1)
    firstLocker.storePackage()
    const robot = new GraduateRobot([firstLocker])

    const result = robot.withdraw(new Ticket(1, '123456789'))

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
