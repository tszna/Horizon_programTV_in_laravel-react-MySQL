import React from 'react';

const lengthFromScale = (scale, time) => {
    let _length = scale*time/30;
    return _length;
}
const diff = (origin, date, scale) => {
    let _time = (new Date(date)).getTime()/60000;
    let _diff = (_time - origin)*scale/30;
    return _diff;
}

const ChannelRow = ({ data, scale, origin, height}) => {
    const _data = data.sort((a, b) => a.date_start > b.date_start);

    return (
        <div className="channel-row" style={{height: height+'px' || '60px'}}>
            {_data.map(item => 
                <div key={item.id}
                    id={"audition-id-" + item.id}
                    className="channel-cell program"
                    style={{
                        height: height+'px' || '60px',
                        width: `${lengthFromScale(scale, item.duration)}px`,
                        transform: `translateX(${diff(origin, item.date_start, scale)}px)`
                    }}>

                    <div className="channel-description">
                        <div>{item.title} {(new Date(item.date_start)).getHours().toString().padStart(2, '0') + ":" + (new Date(item.date_start)).getMinutes().toString().padStart(2, '0')} ({item.duration}min)</div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChannelRow;