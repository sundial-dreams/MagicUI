import { session } from 'electron';

export const domain = 'http://localhost';

export function setCookies(name: string, value: string) {
  const Session = session.defaultSession;
  const Cookies = Session.cookies;
  return Cookies.set({
    url: domain,
    name,
    value
  });
}

export function getCookies(name: string | null = null) {
  const Session = session.defaultSession;
  const Cookies = Session.cookies;
  if (!name) return Cookies.get({ url: domain });
  return Cookies.get({ url: domain, name });
}

export const Session = {
  setCookies(name: string, value: string) {
    const Session = session.defaultSession;
    const Cookies = Session.cookies;

    return Cookies.set({
      url: domain,
      name,
      value,
    });
  },
  getCookies(name: string | null = null) {
    const Session = session.defaultSession;
    const Cookies = Session.cookies;
    if (!name) return Cookies.get({ url: domain });
    return Cookies.get({ url: domain, name });
  }
};

type UserType = {
  email: string,
  password: string,
  avatar: string
};

export async function saveUser(user: UserType) {
  await Session.setCookies('user-email', user.email);
  await Session.setCookies('user-password', user.password);
  await Session.setCookies('user-avatar', user.avatar);
}

export async function getUser() {
  let email = await Session.getCookies('user-email').then(([v]) => v.value);
  let password = await Session.getCookies('user-password').then(([v]) => v.value);
  let avatar = await Session.getCookies('user-avatar').then(([v]) => v.value);
  return { email, avatar, password };
}