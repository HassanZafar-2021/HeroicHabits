import { jwtDecode } from "jwt-decode"; 

class AuthService {
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem("id_token") ?? "";
  }

  isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp * 1000 < Date.now();
    } catch (error) {
      return true; 
    }
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

// Export an instance of the AuthService class
export default new AuthService();
