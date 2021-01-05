import React from 'react';
import {Container} from 'react-bootstrap';

import MoveButton from './MoveButton';
import SearchInput from './Search';

import TimeLine from './TimeLine';
import Channels from './Channels';

import settings from '../../settings';
import AuditionDetails from "./AuditionDetails";

const constants = {
    sideWidth: '100px',
    channelHeight: 80,
    minTScale: 150,
    interval: 5,
    minRequestTime: 60
}

const mergeAuditions = (oldAuditions, newAuditions) => {
    if (!newAuditions.length) return oldAuditions;
    if (!oldAuditions.length) return newAuditions;

    let _newAuditions = [];

    newAuditions.forEach(_new => {
        let isExist = false;

        for (var i = 0; i < oldAuditions.length; i++) {
            let _old = oldAuditions[i];
            if (_new.id === _old.id) {
                isExist = true;
                break;
            }
        }

        if (!isExist) _newAuditions.push(_new);
    });

    return oldAuditions.concat(_newAuditions);
}

const mergeChannels = (oldChannels, newChannels) => {
    if (!newChannels.length) return oldChannels;
    if (!oldChannels.length) return newChannels;

    let _newChannels = [];

    newChannels.forEach(_new => {
        let isMerge = false;
        for (var i = 0; i < oldChannels.length; i++) {
            let _old = oldChannels[i];

            if (_new.id === _old.id) {
                isMerge = true;
                oldChannels[i].auditions = mergeAuditions(_old.auditions, _new.auditions);
                break;
            }
        }

        if (!isMerge) _newChannels.push(_new);
    });

    return oldChannels.concat(_newChannels);
}

export default class ProgramTv extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            channels: [],
            currentDateInMinutes: Number.parseInt((Date.now() / 60000)),
            manuallyChangedRange: false,
            channelOffset: 0,
            timeLineWidth: 0,
            offset: 0,
            TScale: 0,
            originDirection: 'center',
            lastUpdated: 0,
            auditionDetails: null,
        };

        this.loading = false;
        this.timelineRef = null;
        this.intervalId = null;
        this.isLoadingAudition = false;

        this.moveButtonClicked = this.moveButtonClicked.bind(this);
        this.nowButtonClicked = this.nowButtonClicked.bind(this);
        this.pointOnChannel = this.pointOnChannel.bind(this);
        this.pointOnAudition = this.pointOnAudition.bind(this);
        this.onAuditionDetailsClose = this.onAuditionDetailsClose.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        window.addEventListener('scroll', this.handleScroll);
        this.fetchNextChannels(0);

        this.intervalId = setInterval(this.handleTimer, constants.interval * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {manuallyChangedRange, timeLineWidth} = prevState;

        if (!manuallyChangedRange && timeLineWidth) {
            return {offset: timeLineWidth / 2}
        }

        return null;
    }

    handleScroll = () => {
        const {offset} = this.state;
        const html = document.documentElement;
        const height = Math.max(html.clientHeight, html.scrollHeight);

        if (html.scrollTop + window.innerHeight >= height) {
            this.fetchNextChannels(offset, true);
        }
    }

    handleResize = () => {
        if (!this.timelineRef) return;
        const {offset, TScale, manuallyChangedRange} = this.state;

        let _timeline_width = this.timelineRef.clientWidth;
        let _half_time_length = _timeline_width / 6;
        _half_time_length = _half_time_length > constants.minTScale ? _half_time_length : constants.minTScale;

        const roznicaMiedzyPrzeszlaSzerokosciaPrzedzialuAObecna = (offset / TScale) * (_half_time_length - TScale);
        let _offset = manuallyChangedRange ? offset + roznicaMiedzyPrzeszlaSzerokosciaPrzedzialuAObecna : offset;

        this.setState({
            TScale: _half_time_length,
            timeLineWidth: _timeline_width,
            offset: _offset
        });
    }

    handleTimer = () => {
        const {manuallyChangedRange, offset, TScale, lastUpdated} = this.state;
        if (manuallyChangedRange) return;

        let _lastUpdated = lastUpdated + constants.interval;
        if (lastUpdated >= constants.minRequestTime) {
            this.fetchNextChannels(offset + constants.minRequestTime / 60 * TScale);
            _lastUpdated = 0;
        }

        this.setState({
            currentDateInMinutes: (Date.now() / 60000),
            lastUpdated: _lastUpdated
        });
    }

    fetchNextChannels(offset, isScrolling = false) {
        const {channels, channelOffset, currentDateInMinutes, timeLineWidth, TScale} = this.state;

        let _channelOffset = 0, _channelAmount = 0;
        if (isScrolling) {
            if (this.loading) return;
            this.loading = true;

            const visiblePageHeight = window.innerHeight;
            const channelHeightFactor = 0.01;

            _channelOffset = channelOffset;
            _channelAmount = Math.ceil(channelHeightFactor * visiblePageHeight);
        } else {
            if (channelOffset) {
                _channelAmount = channelOffset;
            } else {
                let _initialCount = Math.ceil((document.documentElement.scrollHeight - document.body.scrollHeight) / constants.channelHeight);
                _channelAmount = _initialCount || 15;
            }
        }

        let _diffT = TScale ? parseInt(30 * (timeLineWidth / 2 - offset) / TScale) : 0;
        const _time = parseInt((currentDateInMinutes + _diffT) * 60);

        fetch(settings.apiUrl + "/channel/" + _channelOffset + "/" + _channelAmount + "/" + _time)
            .then(res => res.json())
            .then(channelJson => {
                    this.loading = false;
                    this.setState({
                        channels: mergeChannels(channels, channelJson),
                        channelOffset: _channelOffset + _channelAmount
                    });
                },
                error => {
                    this.loading = false;
                    console.error(error);
                }
            )
    }

    moveButtonClicked(direction) {
        const {offset, timeLineWidth} = this.state;

        let move = 0;

        if (direction === 'left') {
            move = timeLineWidth;
        } else {
            move = -timeLineWidth;
        }

        let _offset = offset + move;

        if (_offset > 0 && _offset < timeLineWidth) {
            this.nowButtonClicked();
        } else {
            this.setState({
                manuallyChangedRange: true,
                offset: _offset,
                originDirection: _offset > timeLineWidth / 2 ? 'right' : 'left'
            });
        }

        this.fetchNextChannels(_offset);
    }

    nowButtonClicked() {
        const {timeLineWidth} = this.state;
        this.setState({
            manuallyChangedRange: false,
            offset: timeLineWidth / 2,
            originDirection: 'center'
        });
    }

    /**
     * Wskazanie na kanał (event).
     *
     * @param event
     */
    pointOnChannel(event) {
        const channelId = event.target.dataset.target ?? event.target.parentNode.dataset.target;
        let element = document.getElementById("channel-id-" + channelId);

        if (element === null) {
            this.loadChannel(channelId)
                .then(() => this.scrollToElement("channel-id-" + channelId));
        } else {
            this.scrollToElement("channel-id-" + channelId);
        }
    }

    /**
     * Wskazanie na audycję (event).
     *
     * @param {MouseEvent} event
     * @param {Number} auditionId
     * @param {Number} channelId
     */
    pointOnAudition(event, auditionId, channelId) {
        this.isLoadingAudition = true;
        const channel = document.getElementById("channel-id-" + channelId);

        new Promise((resolve) => {
            if (channel === null) {
                resolve(this.loadChannel(channelId));
            } else {
                resolve();
            }
        })
            .then(() => {
                fetch(settings.apiUrl + "/audition/load/" + auditionId + "/")
                    .then(res => res.json())
                    .then(audition => this.setState({
                        auditionDetails: audition
                    }));
            })
            .finally(() => {
                this.isLoadingAudition = false;
            })
    }

    /**
     * Doczytanie kanału do listy obecnie załadowanych.
     *
     * @param channelId
     * @returns {Promise<any>}
     */
    loadChannel(channelId) {
        const {channels, offset, channelOffset, currentDateInMinutes, timeLineWidth, TScale} = this.state;

        let _diffT = TScale ? parseInt(30 * (timeLineWidth / 2 - offset) / TScale) : 0;
        const _time = parseInt((currentDateInMinutes + _diffT) * 60);

        return fetch(settings.apiUrl + "/channel/load/" + channelId + "/" + _time)
            .then(res => res.json())
            .then(channel => {
                    this.setState({
                        channels: mergeChannels(channels, [channel]),
                        channelOffset: channelOffset + 1
                    });

                    return channel;
                },
                error => {
                    console.error(error);
                }
            );
    }

    /**
     * Scrollowanie do wskazanego id na stronie.
     *
     * @param id
     */
    scrollToElement(id) {
        const element = document.getElementById(id);
        element.scrollIntoView();

        const previousBorder = element.style.border;
        element.style.border = '2px solid red';
        setTimeout(() => {
            element.style.border = previousBorder;
        }, 2000);
    }

    /**
     * Akcja zamknięcia okna szczegółów audycji.
     *
     * @param event
     */
    onAuditionDetailsClose(event) {
        this.setState({
            auditionDetails: null
        });
    }


    render() {
        const {channels, TScale, offset, currentDateInMinutes, originDirection, auditionDetails} = this.state;

        return (
            <div>
                <Container fluid className={'d-flex justify-content-center'}>
                    <SearchInput pointOnChannel={this.pointOnChannel} pointOnAudition={this.pointOnAudition}/>
                </Container>

                <Container fluid className={'d-flex justify-content-between'}>
                    <MoveButton left clicked={this.moveButtonClicked}/>
                    <MoveButton right clicked={this.moveButtonClicked}/>
                </Container>

                <TimeLine
                    childRef={ref => this.timelineRef = ref}
                    offset={offset}
                    scale={TScale}
                    origin={currentDateInMinutes}
                    {...constants}/>

                <Channels
                    channels={channels}
                    offset={offset}
                    scale={TScale}
                    origin={currentDateInMinutes}
                    originDirection={originDirection}
                    clickedControl={this.nowButtonClicked}
                    {...constants}/>

                {auditionDetails && (
                    <AuditionDetails audition={auditionDetails} actionOnClose={this.onAuditionDetailsClose} isLoadingAudition={this.isLoadingAudition} />
                )}
            </div>
        );
    }
}