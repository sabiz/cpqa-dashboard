import type MutRequest from './mutRequest';

export default interface MultiRequest {
    readonly subRequests: Array<MutRequest>;
    subValues: Array<number>;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isMultiRequest = function (obj: any): MultiRequest | void {
    if('subRequests' in obj) {
        return obj as MultiRequest;
    }
}