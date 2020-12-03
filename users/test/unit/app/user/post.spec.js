const { expect } = require('chai')
const postUseCase = require('src/app/user/post')

describe('App -> User -> Post', () => {
  let useCase

  describe('Success path', () => {
    beforeEach(() => {
      const MockRepository = {
        create: data => data
      }
      const MockStorage = {
        uploadImage: () => Promise.resolve({
          names: 'test',
          lastName: 'dev',
          age: 30,
          type: 'CC',
          image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
        })
      }

      useCase = postUseCase({
        userRepository: MockRepository,
        storage: MockStorage
      })
    })

    it('should create the records and list', async () => {
      const body = {
        names: 'test',
        lastName: 'dev',
        age: 30,
        type: 'CC',
        image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
      }
      const lists = await useCase.create({ body })
      expect(lists.names).to.equal(body.names)
      expect(lists.lastName).to.equal(body.lastName)
      expect(lists.age).to.equal(body.age)
    })
  })

  describe('Fail path', () => {
    const body = {
      names: 'test',
      lastName: 'dev',
      type: 'CC',
      age: 30,
      image: 'iVBORw0KGgoAAAANSUhEUgAAAYIAAAKACAYAAACR2n8fAAEAAElEQVR42'
    }

    beforeEach(() => {
      const MockRepository = {
        // eslint-disable-next-line prefer-promise-reject-errors
        create: () => Promise.reject('Error')
      }
      const MockStorage = {
        // eslint-disable-next-line prefer-promise-reject-errors
        uploadImage: () => Promise.reject('Error')
      }

      useCase = postUseCase({
        userRepository: MockRepository,
        storage: MockStorage
      })
    })

    it('should display error on rejection', async () => {
      let error
      try {
        await useCase.create({ body })
      } catch (e) {
        error = e.message
      }
      expect(error).to.equal('Error')
    })
  })
})
