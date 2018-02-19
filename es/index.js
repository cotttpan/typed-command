import { identity, mapValues } from '@cotto/utils.ts';
export function create(type, fn = identity) {
    const creator = (payload, meta) => (Object.assign({ type, payload: fn(payload, meta) }, meta));
    creator.type = type;
    return creator;
}
export function scoped(scope, creators) {
    const enhance = (creator) => {
        const mapper = (...args) => {
            const { payload } = creator(...args);
            return payload;
        };
        return create(scope + creator.type, mapper);
    };
    return mapValues(creators, enhance);
}
export function match(creator) {
    return (command) => {
        return command != null && command.type === creator.type;
    };
}
export function isCommand(command) {
    return Object(command) === command && typeof command.type === 'string';
}
//# sourceMappingURL=index.js.map