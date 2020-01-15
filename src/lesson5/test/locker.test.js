import Locker from '../src/locker'
import {
  STORE_PACKAGE_ERROR,
  GET_PACKAGE_ERROR,
  GET_PACKAGE_SUCCESS,
} from '../src/constants'
import Ticket from '../src/ticket'

describe('Locker test', () => {
  it('should get a ticket when store package given an available locker', () => {
    const locker = new Locker(24, 1)

    const result = locker.storePackage()

    expect(result).not.toEqual(STORE_PACKAGE_ERROR)
  })

  it('should show error message when store package given an locker without empty box', () => {
    const locker = new Locker(1, 1)
    locker.storePackage()

    const result = locker.storePackage()

    expect(result).toEqual(STORE_PACKAGE_ERROR)
  })

  it('should open the locker when get package given a valid ticket', () => {
    const locker = new Locker(4, 1)
    const ticket = locker.storePackage()

    const result = locker.getPackage(ticket)

    expect(result).toEqual(GET_PACKAGE_SUCCESS)
  })

  it('should show error message when get package given an invalid ticket', () => {
    const locker = new Locker(5, 1)
    locker.storePackage()
    const ticket = new Ticket(1, '32432432432')

    const result = locker.getPackage(ticket)

    expect(result).toEqual(GET_PACKAGE_ERROR)
  })

  it('should get 0.5 when get vacancy Rate given a box with 1 full and 1 empty ', () => {
    const locker = new Locker(2, 1)
    locker.storePackage()

    const result = locker.getVacancyRate()

    expect(result).toBe(0.5)
  })
})
