function resolvePromise(promise, promiseState) {
    promiseState.setPromise(promise);
    promiseState.setData(null);
    promiseState.setError(null);
    function successACB(result) {
        if (promiseState.promise === promise) {
            promiseState.setData(result);
        }
    }
    function failureACB(error) {
        if (promiseState.promise === promise) {
            promiseState.setError(error);
        }
    }
    promise?.then(successACB).catch(failureACB);
}

export default resolvePromise;