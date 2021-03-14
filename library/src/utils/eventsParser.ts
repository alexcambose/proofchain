export const parseTransactionEvents = <T>(events: any): T => {
  const eventNames = Object.keys(events);
  let computedEvents = {};
  for (let name of eventNames) {
    // @ts-ignore
    computedEvents[name] = parseEvent(events[name]);
    // @ts-ignore
    computedEvents[name].event = events[name];
  }
  return computedEvents as T;
};
export const parseEvent = (event: any) => event.returnValues;
