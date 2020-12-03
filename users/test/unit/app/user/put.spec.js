const { expect, use } = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const updateUseCase = require('src/app/user/patch')

use(sinonChai)

describe('App -> User -> Put', () => {
  const body = {
    names: 'test',
    lastName: 'dev',
    type: 'CC',
    age: 30,
    image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
  }
  let useCase
  let methodFindById
  let methodUpdate

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        update: data => data,
        findById: () => Promise.resolve(body)
      }
      methodFindById = sinon.spy(MockRepository, 'findById')
      methodUpdate = sinon.spy(MockRepository, 'update')
      useCase = updateUseCase({
        userRepository: MockRepository
      })
    })

    it('should have called findById method of userRepository', async () => {
      await useCase.update({ id: '12', body })
      // eslint-disable-next-line
      expect(methodFindById).to.have.been.called;
    })
    it('should have called update method of userRepository', async () => {
      await useCase.update({ id: '12', body })
      // eslint-disable-next-line
      expect(methodUpdate).to.have.been.called;
    })

    it('should update the records and list', async () => {
      const body = {
        names: 'test',
        lastName: 'dev',
        age: 30,
        type: 'CC',
        image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
      }
      const lists = await useCase.update({ id: '12', body })
      expect(lists.names).to.equal(body.names)
      expect(lists.lastName).to.equal(body.lastName)
      expect(lists.age).to.equal(body.age)
    })
  })

  describe('Fail path', () => {
    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        update: () => Promise.reject('Error')
      }

      useCase = updateUseCase({
        userRepository: MockRepository
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.update(body)
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error: Incorrect body on request')
    })
  })
})
