function resolvePromise(promise, promiseState) {
    promiseState.promise = promise;
    promiseState.data = null;
    promiseState.error = null;
    function successACB(result) {
        if (promiseState.promise === promise) {
            promiseState.data = result;
        }
    }
    function failureACB(error) {
        if (promiseState.promise === promise) {
            promiseState.error = error;
        }
    }
    promise?.then(successACB).catch(failureACB);
}

export default resolvePromise;