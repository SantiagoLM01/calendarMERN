import { authSlice, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser"



describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState)


    })

    test('debe de realizar el login', () => {

        let state = authSlice.getInitialState();

        state = authSlice.reducer(state, onLogin(testUserCredentials))

        expect(state.user).toBe(testUserCredentials)



    })

    test('debe de realizar el logout', () => {

        let state = authSlice.getInitialState();

        state = authSlice.reducer(state, onLogout())

        expect(state.status).toBe('not-authenticated')



    })



})