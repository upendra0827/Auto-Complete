export class Trie {
    constructor(list) {
        this.tree = {}
        this.add(list)
    }

    add(list) {
        for (let i = 0; i < list.length; i++) {
            let node = this.tree

            for (let letter of list[i]) {
                if (!node[letter]) {
                    node[letter] = {}
                }

                node = node[letter]
            }

            node.isEnd = true
        }
    }

    _getAllWordsWithPrefix(node, prefix, store = []) {

        if (node.isEnd) {
            store.push(prefix)
        } else {
            for (let key in node) {
                this._getAllWordsWithPrefix(node[key], prefix + key, store)
            }
        }

        return store
    }

    getWordsWithPrefix(word) {
        let node = this.tree

        for (let letter of word) {
            if (!node[letter]) return []

            node = node[letter]
        }

        return this._getAllWordsWithPrefix(node, word, [])
    }
}