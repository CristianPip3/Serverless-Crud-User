const { expect } = require('chai')
const getByIdUseCase = require('src/app/user/getById')

describe('App -> User -> GetById', () => {
  let useCase
  const mockData = {
    names: 'test',
    lastName: 'dev',
    type: 'CC',
    age: 30,
    image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
  }

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        findById: () => mockData
      }

      useCase = getByIdUseCase({
        userRepository: MockRepository
      })
    })

    it('should display all the records on success', async () => {
      const user = await useCase.getById('12')
      expect(user).to.equal(mockData)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        findById: () => Promise.reject('Error')
      }

      useCase = getByIdUseCase({
        userRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.getById('12')
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
