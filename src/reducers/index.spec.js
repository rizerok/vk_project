import { reducer } from '../modules/counter';

describe('reducers', () => {
    describe('counter', () => {
        it('should provide the initial state', () => {
            expect(reducer(undefined, {})).toBe(0);
        });

        it('should handle reducer/increment action', () => {
            expect(reducer(0, { type: 'counter/increment' })).toBe(1);
        });

        it('should handle reducer/decrement action', () => {
            expect(reducer(1, { type: 'counter/decrement' })).toBe(0);
        });

        it('should ignore unknown actions', () => {
            expect(reducer(1, { type: 'unknown' })).toBe(1);
        });
    });
});
