import { identity } from '@cotto/utils.ts';
export function create(type, fn = identity) {
    const creator = (payload, meta) => (Object.assign({ type, payload: fn(payload) }, meta));
    creator.type = type;
    return creator;
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