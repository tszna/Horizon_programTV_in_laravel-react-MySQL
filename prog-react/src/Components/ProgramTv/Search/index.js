import React from 'react';

import settings from "../../../settings";
import SearchResults from './SearchResults';

import "./Search.css";

export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            showResults: false,
            isFocusingOut: false,
        }

        this.inputValueChange = this.inputValueChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onFocusOut = this.onFocusOut.bind(this);
    }

    inputValueChange(event) {
        const currentInputValue = event.target.value;

        if (currentInputValue.length === 0) {
            this.setState({
                results: [],
                showResults: false,
            });

            return;
        }

        fetch(settings.apiUrl + "/search/" + currentInputValue)
            .then(response => response.json())
            .then(results => {
                this.setState({
                    results,
                    showResults: true
                });
            })
            .catch(error => console.log(error));
    }

    onFocus(event) {
        const currentInputValue = event.target.value;

        if (currentInputValue.length) {
            this.setState({
                showResults: true,
            });
        }
    }

    onFocusOut(event) {
        setTimeout(() => {
            this.setState({
                showResults: false,
            });
        }, 200);
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    id="search-input"
                    placeholder="Szukaj.."
                    onInput={this.inputValueChange}
                    onFocus={this.onFocus}
                    onBlur={(e) => {
                        // this.setState({
                        //     isFocusingOut: true
                        // });

                        this.onFocusOut(e);

                        // setTimeout(() => {
                        //     this.setState({
                        //         isFocusingOut: false
                        //     });
                        // }, 400);
                    }}
                />

                <SearchResults 
                    results={this.state.results} 
                    show={this.state.showResults} 
                    pointOnChannel={this.props.pointOnChannel}
                    pointOnAudition={this.props.pointOnAudition}
                    isInputFocusingOut={this.state.isFocusingOut}
                />
            </div>
        );
    }
}