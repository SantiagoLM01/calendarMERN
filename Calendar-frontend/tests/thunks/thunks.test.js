import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { openModal } from '../../src/store/ui/thunks'
import { onOpenDateModal } from '../../src/store/ui/uiSlice'



describe('async actions', () => {

    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('should first', async () => {

        const Modal = {isDateModalOpen : false}

        await openModal(Modal)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(onOpenDateModal())


    })
})