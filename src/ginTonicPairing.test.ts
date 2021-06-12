import { isRight } from 'fp-ts/Either'
import * as t from 'io-ts'

import { Pairing } from "./ginTonicPairing"

test('decodes json to a strongly typed object', () => {
    const validation = Pairing.decode({
        gin: {
            name: 'Sipsmith',
            style: 'London Dry Gin',
            distillery: 'Sipsmith'
        },
        tonic: {
            name: 'Fever-Tree Indian Tonic'
        },
        garnish: 'Lime'
    })

    if (!isRight(validation)) {
        throw new Error('pairing is invalid')
    }

    const pairing = validation.right

    expect(pairing.gin.name).toBe('Sipsmith')
    expect(pairing.gin.style).toBe('London Dry Gin')
    expect(pairing.gin.distillery).toBe('Sipsmith')
    expect(pairing.tonic.name).toBe('Fever-Tree Indian Tonic')
    expect(pairing.garnish).toBe('Lime')
})

test('encodes a strongly typed object as json', () => {
    type Pairing = t.TypeOf<typeof Pairing>

    const pairing: Pairing = {
        gin: {
            name: 'Sipsmith',
            style: 'London Dry Gin',
            distillery: 'Sipsmith'
        },
        tonic: {
            name: 'Fever-Tree Indian Tonic'
        },
        garnish: 'Lime'
    }

    const json = Pairing.encode(pairing)

    expect(json).toEqual({
        gin: {
            name: 'Sipsmith',
            style: 'London Dry Gin',
            distillery: 'Sipsmith'
        },
        tonic: {
            name: 'Fever-Tree Indian Tonic'
        },
        garnish: 'Lime'
    })
})
