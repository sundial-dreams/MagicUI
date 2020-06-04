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
  },
  clearCookies(name: string) {
    const Session = session.defaultSession;
    return Session.cookies.remove(domain, name);
  }
};

type UserType = {
  email: string,
  password: string,
  avatar: string,
  nickname: string
};

export async function saveUser(user: UserType) {
  await Session.setCookies('user-email', user.email);
  await Session.setCookies('user-password', user.password);
  await Session.setCookies('user-avatar', user.avatar);
  await Session.setCookies('user-nickname', user.nickname);
}

export async function getUser() {
  let email = await Session.getCookies('user-email').then(([v]) => v && v.value);
  let password = await Session.getCookies('user-password').then(([v]) => v && v.value);
  let avatar = await Session.getCookies('user-avatar').then(([v]) => v && v.value);
  let nickname = await Session.getCookies('user-nickname').then(([v]) => v && v.value);
  return { email, avatar, password, nickname };
}

export async function clearUser() {
  await Session.clearCookies('user-email');
  await Session.clearCookies('user-password');
  await Session.clearCookies('user-avatar');
  await Session.clearCookies('user-nickname');
}