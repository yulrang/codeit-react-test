export const fakeApiCall = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ data: 'mocked data' });
    }, 250);
});