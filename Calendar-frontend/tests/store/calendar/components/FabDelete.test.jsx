import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import FabDelete from "../../../../src/calendar/components/FabDelete"
import {store} from '../../../../src/store/store'

describe('Pruebas en FabDelete', () => {

    test('debe de mostrar el componente', () => { 
        
        render(<Provider store={store}><FabDelete></FabDelete></Provider>)
        screen.debug()

     })





})