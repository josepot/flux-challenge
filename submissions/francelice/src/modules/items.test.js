
import {firstSith, scrollUp, scrollDown, ACTIONS} from './items'

describe('actions', () => {
    it('should create an action to fetch first sith', () => {
      const expectedAction = {
        type: ACTIONS.FIRST_FETCH,
      }
      expect(firstSith()).toEqual(expectedAction)
    });

    it('should create an action to scroll up', () => {
        const expectedAction = {
          type: ACTIONS.USER_SCROLL,
          up: true
        }
        expect(scrollUp()).toEqual(expectedAction)
      });

      
    it('should create an action to scroll down', () => {
        const expectedAction = {
          type: ACTIONS.USER_SCROLL,
          up: false
        }
        expect(scrollDown()).toEqual(expectedAction)
      })

  })