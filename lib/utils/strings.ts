import { TFunction } from 'next-i18next';
import { Address } from '../types';

export const getTitleString = (
  title: string | string[] | undefined,
): string => {
  let titleString = 'Kara';
  if (title) {
    titleString += ' | ';
    if (Array.isArray(title)) {
      titleString += title.join(' | ');
    } else {
      titleString += title;
    }
  }
  return titleString;
};

export const displayAddress = (address?: Address, t?: TFunction): string => {
  if (!address) return '';
  if (!t) return `${address.city}, ${address.isoCode}`;
  return `${address.city}, ${t(`iso.${address.isoCode}`)}`;
};
