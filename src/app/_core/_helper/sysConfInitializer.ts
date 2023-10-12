import { SystemConfigService } from "../_service/systemconfig.service";

export function sysConfInitializer(sysConfService: SystemConfigService) {
  return () => new Promise<void>((resolve, reject) => {
    const subscription = sysConfService.loadDataSystem().subscribe(data => {
      localStorage.setItem('sysConf', JSON.stringify(data));
      subscription.unsubscribe(); // Make sure to unsubscribe to prevent memory leaks.
      resolve();
    });
  });
}

// import { SystemConfigService } from "../_service/systemconfig.service";
// import { Observable, tap } from 'rxjs';

// export function sysConfInitializer(sysConfService: SystemConfigService): () => Observable<any> {
//   return () => {
//     return sysConfService.loadDataSystem().pipe(
//       tap(data => {
//         localStorage.setItem('sysConf', JSON.stringify(data));
//       })
//     );
//   };
// }

// import { SystemConfigService } from "../_service/systemconfig.service";
// import { BehaviorSubject } from 'rxjs';

// export const sysConfInitializationComplete = new BehaviorSubject<boolean>(false);

// export function sysConfInitializer(sysConfService: SystemConfigService) {
//   return () => new Promise<void>((resolve, reject) => {
//     const subscription = sysConfService.loadDataSystem().subscribe(data => {
//       localStorage.setItem('sysConf', JSON.stringify(data));
//       subscription.unsubscribe();
//       sysConfInitializationComplete.next(true); // Signal that initialization is complete.
//     });
//   });
// }

// import { SystemConfigService } from "../_service/systemconfig.service";

// export function sysConfInitializer(sysConfService: SystemConfigService) {
//   return () => {
//     return sysConfService.loadDataSystem().toPromise().then(data => {
//       localStorage.setItem('sysConf', JSON.stringify(data));
//     });
//   };
// }


