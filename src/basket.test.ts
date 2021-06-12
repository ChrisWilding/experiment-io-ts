import * as E from 'fp-ts/lib/Either'

import { makeBasket } from './basket'

test('decodes to a class', () => {
    const json = {
        items: [
            {
                name: 'Carrot',
                number: 2,
                price: 5
            }, {
                name: 'Orange',
                number: 5,
                price: 1
            }
        ]
    }

    const validation = makeBasket(json)

    if (!E.isRight(validation)) {
        throw new Error('basket is invalid')
    }

    const basket = validation.right

    expect(basket.items).toHaveLength(2)
    expect(basket.total()).toEqual(15)
})
