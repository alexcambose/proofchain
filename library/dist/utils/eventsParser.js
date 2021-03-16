"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEvent = exports.parseTransactionEvents = void 0;
const parseTransactionEvents = (events) => {
    const eventNames = Object.keys(events);
    let computedEvents = {};
    for (let name of eventNames) {
        // @ts-ignore
        computedEvents[name] = exports.parseEvent(events[name]);
        // @ts-ignore
        computedEvents[name].event = events[name];
    }
    return computedEvents;
};
exports.parseTransactionEvents = parseTransactionEvents;
const parseEvent = (event) => (Object.assign(Object.assign({}, event.returnValues), { event }));
exports.parseEvent = parseEvent;
