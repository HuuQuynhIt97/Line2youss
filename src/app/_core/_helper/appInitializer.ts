import { AuthService } from "../_service/auth.service";

export function appInitializer(authService: AuthService) {
  return () => new Promise<void>((resolve, reject) => {
     authService.refreshToken().subscribe(data => {
      resolve();
    });
  });
}

