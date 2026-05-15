// Change this value (1..3) to switch branding set, then build/deploy.
export const ACTIVE_LOGO_SET = 1;

const fullBySet = {
  1: '/sub1.png',
  2: '/sub3.png',
  3: '/sub5.png',
};

const halfBySet = {
  1: '/sub2.png',
  2: '/sub4.png',
  3: '/sub6.png',
};

export const fullLogo = fullBySet[ACTIVE_LOGO_SET] || fullBySet[1];
export const halfLogo = halfBySet[ACTIVE_LOGO_SET] || halfBySet[1];
