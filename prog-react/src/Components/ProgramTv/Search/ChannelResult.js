import React from 'react';

import settings from "../../../settings";

export default class ChannelResult extends React.Component {
    render() {
        return (
            <li className="px-3 py-2 d-flex flex-row flex-no-wrap search-result search-result-channel"
                onClick={this.props.pointOnChannel}
                data-target={this.props.channel.id}>
                
                <div className="channel-logo">
                    <img id="search-result-img" src={settings.resourceURL + this.props.channel.avatar} alt={this.props.channel.id} />
                </div>
                <div className="px-3 d-flex align-items-center h-100">
                    {this.props.channel.name}
                </div>
            </li>
        );
    }
}