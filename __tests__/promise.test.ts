
import { fakeApiCall } from '../utils/fetchApiCall';

test('the data is peanut butter', () => {
    return fakeApiCall().then(data => {
        expect(data).toBe('peanut butter');
    });
});