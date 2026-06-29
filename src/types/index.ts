type UseLocalStorageReturn<T> = [
    T,
    (value: T | ((prevValue: T) => T)) => void,
    () => void
]