const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const deleteUseCase = require('src/app/user/delete')

use(sinonChai)

describe('App -> User -> Delete', () => {
  const body = {
    names: 'test',
    lastName: 'dev',
    type: 'CC',
    age: 30,
    image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
  }
  let useCase
  let methodDestroy
  let methodFinById

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        destroy: data => data,
        findById: () => Promise.resolve(body)
      }

      methodFinById = sinon.spy(MockRepository, 'findById')
      methodDestroy = sinon.spy(MockRepository, 'destroy')
      useCase = deleteUseCase({
        userRepository: MockRepository
      })
    })

    it('should have called delete method of userRepository', async () => {
      await useCase.remove({ id: 1 })
      // eslint-disable-next-line
      expect(methodFinById).to.have.been.called;
    })
    it('should have called delete method of userRepository', async () => {
      await useCase.remove({ id: 1 })
      // eslint-disable-next-line
      expect(methodDestroy).to.have.been.called;
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        destroy: () => Promise.reject('Error'),
        findById: () => Promise.resolve(body)
      }

      useCase = deleteUseCase({
        userRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.remove({ id: 1 })
      } catch (e) {
        console.log(e.message)
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
