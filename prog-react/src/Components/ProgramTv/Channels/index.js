import React from 'react';

import ChannelSide from './ChannelSide';
import ChannelProgram from './ChannelProgram';

import './Channels.css';

const Channels = (props) => {
    return (
        <div className="d-flex" style={{backgroundColor: 'black'}}>
            <ChannelSide {...props} />
            <ChannelProgram {...props} />
        </div>
    )
}

export default Channels;