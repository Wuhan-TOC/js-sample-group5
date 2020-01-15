import Locker from '../src/locker'
import superRobot from '../src/superRobot'
import {
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
  STORE_PACKAGE_ERROR,
} from '../src/constants'
import Ticket from '../src/ticket'

describe('SuperRobot test', () => {
  it('should generate a ticket from first locker when robot store package given the first locker with 100% Vacancy and the second locker with 50% Vacancy', () => {
    const firstLocker = new Locker(2, 1)
    const secondLocker = new Locker(2, 2)
    secondLocker.storePackage()
    const robot = new superRobot([firstLocker, secondLocker])

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should generate a ticket from first locker when robot store package given the first locker with 50% Vacancy and the second locker with 50% Vacancy', () => {
    const firstLocker = new Locker(2, 1)
    firstLocker.storePackage()
    const secondLocker = new Locker(2, 2)
    secondLocker.storePackage()
    const robot = new superRobot([firstLocker, secondLocker])

    const ticket = robot.store()

    expect(ticket.barcode).not.toBeNull()
    expect(ticket.lockerNumber).toBe(1)
  })

  it('should show error message when store package given the first locker with 0% Vacancy and the second locker with 0% Vacancy', () => {
    const firstLocker = new Locker(1, 1)
    firstLocker.storePackage()
    const secondLocker = new Locker(1, 2)
    secondLocker.storePackage()
    const robot = new superRobot([firstLocker, secondLocker])

    const result = robot.store()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should show success message when robot get package given ticket with first locker number ', () => {
    const firstLocker = new Locker(5, 1)
    const ticket = firstLocker.storePackage()
    const secondLocker = new Locker(5, 2)
    const robot = new superRobot([firstLocker, secondLocker])

    const result = robot.withdraw(ticket)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when robot get package given an invalid ticket', () => {
    const firstLocker = new Locker(5, 1)
    firstLocker.storePackage()
    const secondLocker = new Locker(5, 2)
    const robot = new superRobot([firstLocker, secondLocker])

    const result = robot.withdraw(new Ticket(1, '123456789'))

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })

  it('should show error message when robot get package given an used ticket', () => {
    const firstLocker = new Locker(5, 1)
    const ticket = firstLocker.storePackage()
    firstLocker.getPackage(ticket)
    const secondLocker = new Locker(5, 2)
    const robot = new superRobot([firstLocker, secondLocker])

    const result = robot.withdraw(ticket)

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })
})
