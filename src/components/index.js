import React, { useEffect, useState } from "react";
import './style.css'
import { Trie } from "./Trie";
import { suggestionsList } from './list';

const AutoComplete = () => {

    const trie = new Trie(suggestionsList)
    const [suggestions, setSuggestions] = useState([])
    let [currentIndex, setCurrentIndex] = useState(-1)
    const [query, setQuery] = useState('')

    useEffect(() => {
        handleInputChange(query)
    }, [query])

    const handleInputChange = (query) => {
        if (query.length > 0) {
            const list = trie.getWordsWithPrefix(query)
            setSuggestions(list)
        } else {
            setSuggestions([])
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            if (currentIndex < suggestions.length) {
                setCurrentIndex(prev => prev + 1)
            } else {
                setCurrentIndex(0)
            }
        } else if (e.key === 'ArrowUp') {
            if (currentIndex >= 0) {
                setCurrentIndex(prev => prev - 1)
            } else {
                setCurrentIndex(suggestions.length - 1)
            }
        } else if (e.key === 'Backspace') {
            if (currentIndex > -1 && currentIndex < suggestions.length) setQuery(suggestions[currentIndex])
            setCurrentIndex(-1)
        }
    }


    return (
        <div className="autocomplete">
            <h1>Search your desired country</h1>
            <input className="inputField"
                value={currentIndex > -1 && currentIndex < suggestions.length ? suggestions[currentIndex] : query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown} />
            <div className="suggestions">
                {
                    suggestions.map((country, i) => (
                        <div key={country} className={`${currentIndex === i && 'active'}`}>
                            <div>{country}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default AutoComplete;
