export const setCookie = (name: string, value: string, days = 7, domain?: string) => {
 if (typeof document ==='undefined') return;
 const date = new Date();
 date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
 const expires ="; expires=" + date.toUTCString();
 let cookieString = name +"=" + (value ||"") + expires +"; path=/; SameSite=Lax";
 if (domain) {
   cookieString += "; domain=" + domain;
 }
 document.cookie = cookieString;
};

export const getCookie = (name: string) => {
 if (typeof document ==='undefined') return null;
 const nameEQ = name +"=";
 const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
 return null;
};

export const removeCookie = (name: string) => {
 if (typeof document ==='undefined') return;
 document.cookie = name +'=; Max-Age=-99999999; path=/;';
};
