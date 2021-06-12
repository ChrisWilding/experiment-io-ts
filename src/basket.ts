import * as t from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import * as f from 'fp-ts/lib/function'

class Item {
    name: string
    number: number
    price: number

    constructor(name: string, number: number, price: number) {
        this.name = name
        this.number = number
        this.price = price
    }

    total(): number {
        return this.number * this.price
    }
}

const ItemCodec = t.type({
    name: t.string,
    number: t.number,
    price: t.number
})

class Basket {
    items: Item[]

    constructor(items: Item[]) {
        this.items = items
    }

    total(): number {
        return this.items.reduce((previous, current) => previous + current.total(), 0)
    }
}

const BasketCodec = t.type({
    items: t.array(ItemCodec)
})

export const makeBasket = f.flow(
        BasketCodec.decode,
        E.map((basket): Basket => {
            const items = basket.items.map(item => new Item(item.name, item.number, item.price))
            return new Basket(items)
        })
    )
