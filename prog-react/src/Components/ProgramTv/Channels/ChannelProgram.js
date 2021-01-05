import React from 'react';
import ChannelRow from './ChannelRow';

const ChannelProgram = ({ channels, scale, offset, origin, originDirection, channelHeight, clickedControl}) => {
    
    return (
        <div className="channel-program-container">
            <div className="channel-program-wrapper">
                <div className="channel-program" style={{left: `${offset}px`}}>
                    {channels.map(channel => 
                        <ChannelRow key={channel.id} data={channel.auditions} scale={scale} origin={origin} height={channelHeight}/>
                    )}
                    <div className="time-bound"/>
                </div>
            </div>
            <div className={`picker ${originDirection}`} onClick={clickedControl}>Teraz</div>
        </div>
    )
}

export default ChannelProgram;