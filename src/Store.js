import querystring from 'querystring'
import { observable, decorate, computed } from "mobx"

class Store {
    constructor() {
        this.bookIds = []
        this.metadata = {}
        this.searchParams = {
            library_id: 'Library',
        }
        this.searchResult = {}
    }

    async get(route, params) {
        const data = await fetch('/api/' + route + '?' + querystring.stringify(params))
        return data.json()
    }

    async post(route, params) {
        const data = await fetch('/api/' + route, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(params)
        })
        return data.json()
    }


    updateData(data) {
        const {book_ids: bookIds, ...searchResult} = data.search_result

        Object.assign(this.metadata, data.metadata)
        this.bookIds.push(...bookIds)

        return searchResult
    }

    async search() {
        const data = await this.get('books-init', this.searchParams)
        this.searchResult = this.updateData(data)
    }
    
    async more() {
        this.searchResult.offset += this.searchResult.num
        const data = await this.post('more-books', this.searchResult)
        this.updateData(data)
    }

    get hasMore() {
        return !this.searchResult.total_num || this.bookIds.length < this.searchResult.total_num
    }
}

decorate(Store,{
    bookIds: observable,
    searchResult: observable,
    hasMore: computed,
})

export default Store