import React from 'react';

const AuditionResult = ({ audition, pointOnAudition }) => {
    const date = new Date(Date.parse(audition.date_start));

    return (
        <li
            className="d-flex flex-column justify-content-center search-result audition-search-result px-3"
            onClick={(e) => pointOnAudition(e, audition.id, audition.channel_id)}
        >
            <p className="mb-0">
                {audition.title}
            </p>

            <small className="text-muted mb-0">
                {audition.duration}min
            </small>

            <p className="text-muted mb-0">
                <strong>
                    {new Intl.DateTimeFormat('pl-PL').format(date)}: {date.getHours().toString().padStart(2, '0')}:{date.getMinutes().toString().padStart(2, '0')} - {audition.channel.name}
                </strong>
            </p>
        </li>
    )
}

export default AuditionResult;