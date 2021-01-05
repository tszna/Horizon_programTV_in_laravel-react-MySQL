import React from "react";

import settings from "../../../settings";
import "./AuditionDetails.css";

const downloadCsv = function (csvText, fileName) {
    const element = document.createElement("a");

    element.setAttribute("href", "data:text/csv;charset=utf-8," + window.encodeURIComponent(csvText));
    element.setAttribute("download", `${fileName}.csv`);
    element.style.display = "none";

    document.body.append(element);

    element.click();

    document.body.removeChild(element);
}

const exportAudition = function (audition) {
    fetch(`${settings.apiUrl}/audition/export/${audition.id}`)
        .then(response => {
            response.text()
                .then(text => {
                    downloadCsv(text, audition.title);
                });
        })
        .catch(e => console.log(e));
}

const AuditionDetails = ({audition, actionOnClose, isLoadingAudition}) => {
    return (
        <div className="position-fixed w-100 bottom-0 audition-details p-1 py-1">
            <div className={"card-body " + (isLoadingAudition ? "roll-out" : "")}>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-light" onClick={actionOnClose}>X</button>
                </div>

                <div className="p-5 py-2">
                    <div className="d-flex align-items-center mt-2">
                        <div className="channel-logo">
                            <img src={settings.resourceURL + audition.channel.avatar} alt={audition.channel.id} />
                        </div>

                        <div className="px-3 d-flex align-items-center h-100">
                            {audition.channel.name}
                        </div>
                    </div>

                    <h3 className="card-title mb-0">
                        {audition.title}
                    </h3>

                    <small>
                        {audition.description}
                    </small>

                    <div>
                        <button className="btn btn-outline-light" onClick={() => {exportAudition(audition)}}>
                            CSV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuditionDetails;