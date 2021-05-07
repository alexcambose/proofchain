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
    }
    return computedEvents;
};
exports.parseTransactionEvents = parseTransactionEvents;
const parseEvent = (event) => {
    if (Array.isArray(event)) {
        return event.map((e) => (Object.assign(Object.assign({}, e.returnValues), { event: e })));
    }
    return Object.assign(Object.assign({}, event.returnValues), { event });
};
exports.parseEvent = parseEvent;
