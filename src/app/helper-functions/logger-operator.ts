import { Observable } from 'rxjs';

/**
 * Operator for logging value from the Rxjs piped stream where it is placed. Does not modify the stream.
 * An optional logging message can be given as argument
 * Ex: if value 2 is passed to the following stream, the console messages will look like below
 *  someObservable$.pipe(log('before map'), map(x => x * 2), log('after map'), log()).subcribe(x => console.log('final x=', x))
 * //
 * before map => 2
 * after map => 4
 * => 4
 * final x=4
 * //
 * @param {string} [message]
 * @returns unmodified stream received, just like tap operator
 */
export function log(message?: string) {
  return function logFn<T>(source: Observable<T>) {
    const output = new Observable<T>((observer) => {
      const subscription = source.subscribe(
        (val) => {
          console.log(`${message ?? ''} =>`, val);
          observer.next(val);
        },
        (err) => {
          console.error(`${message ?? ''} =>`, err);
          observer.error(err);
        },
        () => {
          console.log(`${message ?? ''} => %ccomplete`, 'color: green');
          observer.complete();
        }
      );
      return subscription;
    });
    return output;
  };
}
