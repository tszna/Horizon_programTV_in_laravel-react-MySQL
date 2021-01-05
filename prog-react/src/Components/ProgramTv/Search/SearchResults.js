import React from 'react';
import AuditionResult from './AuditionResult';
import ChannelResult from './ChannelResult';

export default class SearchResults extends React.Component {
    render() {
        const channels = this.props.results.filter(result => result.type === 'channel');
        const auditions = this.props.results.filter(result => result.type === 'audition');
        // const inputFocusOut = this.props.isInputFocusingOut;

        return (
            <div 
                id="search-results-box" 
                hidden={!this.props.show}
                // style={inputFocusOut ? {
                //     minWidth: "15vw",
                //     width: "20vw",
                // } : {}}
            >
                {this.props.results.length ? (
                    <div>
                        <ul className="list-style-none px-0">
                            {channels.map(row => (<ChannelResult key={row.id} channel={row} pointOnChannel={this.props.pointOnChannel} />))}
                        </ul>

                        <strong className="px-3">Audycje</strong>
                        <hr className="mt-0" />

                        <ul className="list-style-none px-0">
                            {auditions.map(row => (<AuditionResult key={row.id} audition={row} pointOnAudition={this.props.pointOnAudition} />))}
                        </ul>
                    </div>
                ) : (
                    <p>Brak wyników</p>
                )}
            </div>
        )
    }
}