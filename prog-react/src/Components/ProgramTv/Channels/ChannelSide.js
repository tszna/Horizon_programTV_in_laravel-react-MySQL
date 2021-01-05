import React from 'react';

import settings from "../../../settings";

const ChannelSide = ({channels, sideWidth, channelHeight, ...props}) => {

    return (
        <div className="channel-sidebar" style={{width: sideWidth}}>
            {channels.map(channel => 
                <div className="channel-cell" key={channel.id} id={"channel-id-" + channel.id} style={{height: channelHeight+'px' || '60px'}}>
                    <div className="channel-logo">
                        <img src={settings.resourceURL + channel.avatar} alt={channel.id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChannelSide;