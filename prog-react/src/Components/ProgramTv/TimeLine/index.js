import React from 'react';
import './TimeLine.css';

const dateArray = (origin, offset, scale) => {
    let tOffset = scale ? 30*offset/scale : 0;
    let sTime = Math.ceil((origin - tOffset)/30)* 30 - 12*60;

    let dates = [];
    for(var i = 0; i < 48; i++){
        let _time = sTime + i*30;
        let _date = new Date(_time*60000);
        
        dates.push({
            text: _date.getHours().toString().padStart(2, '0') + ":" + _date.getMinutes().toString().padStart(2, '0'),
            pos: (_time - origin)*scale/30
        });
    }

    return dates;
}

const TimeLine = ({ sideWidth, offset, scale, origin, childRef}) => {
    const dates = dateArray(origin, offset, scale);

    return (
        <div style={{paddingLeft: sideWidth}}>
            <div
                className="timeline-wrapper"
                ref={item => childRef(item)}
            >
                <div className="timeline" style={{left: `${offset}px`}}>
                    {dates.map((date, index) => 
                        <div key={index} className="time-item" style={{width: scale, transform: `translateX(${date.pos}px)`}}>
                            {date.text}
                        </div>
                    )}
                </div>
            </div>    
        </div>
    )
}

export default TimeLine;