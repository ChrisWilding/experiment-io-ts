import * as t from 'io-ts'

const Gin = t.type({
    name: t.string,
    style: t.string,
    distillery: t.string
})

const Tonic = t.type({
    name: t.string
})

const Pairing = t.type({
    gin: Gin,
    tonic: Tonic,
    garnish: t.string
})

export { Gin, Tonic, Pairing }
