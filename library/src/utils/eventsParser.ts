export const parseTransactionEvents = <T>(events: any): T => {
  const eventNames = Object.keys(events);
  let computedEvents = {};
  for (let name of eventNames) {
    // @ts-ignore
    computedEvents[name] = parseEvent(events[name]);
    // @ts-ignore
  }
  return computedEvents as T;
};
export const parseEvent = (event: any) => {
  if (Array.isArray(event)) {
    return event.map((e) => ({ ...e.returnValues, event: e }));
  }
  return { ...event.returnValues, event };
};
