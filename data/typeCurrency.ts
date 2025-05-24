
import { ImageSourcePropType } from 'react-native';
export interface CurrencyInfo {
    code: string;
    currency: string;
    countries: string;
    locale: string;
    flag: string; // path atau nama bendera
}

export const currencyList: CurrencyInfo[] = [
    {
        code: 'IDR',
        currency: 'Rupiah',
        countries: 'Indonesia',
        locale: 'id-ID',
        flag: 'id',
    },
    {
        code: 'USD',
        currency: 'US Dollar',
        countries: 'United States',
        locale: 'en-US',
        flag: 'us',
    },
    {
        code: 'EUR',
        currency: 'Euro',
        countries: 'Germany',
        locale: 'de-DE',
        flag: 'de',
    },
    {
        code: 'EUR',
        currency: 'Euro',
        countries: 'France',
        locale: 'fr-FR',
        flag: 'fr',
    },
    {
        code: 'EUR',
        currency: 'Euro',
        countries: 'Italy',
        locale: 'it-IT',
        flag: 'it',
    },
    {
        code: 'EUR',
        currency: 'Euro',
        countries: 'Spain',
        locale: 'es-ES',
        flag: 'es',
    },
    {
        code: 'EUR',
        currency: 'Euro',
        countries: 'Netherlands',
        locale: 'nl-NL',
        flag: 'nl',
    },
    {
        code: 'EUR',
        currency: 'Euro',
        countries: 'Portugal',
        locale: 'pt-PT',
        flag: 'pt',
    },
    {
        code: 'GBP',
        currency: 'Pound Sterling',
        countries: 'United Kingdom',
        locale: 'en-GB',
        flag: 'gb',
    },
    {
        code: 'JPY',
        currency: 'Yen',
        countries: 'Japan',
        locale: 'ja-JP',
        flag: 'jp',
    },
    {
        code: 'THB',
        currency: 'Baht',
        countries: 'Thailand',
        locale: 'th-TH',
        flag: 'th',
    },
    {
        code: 'MYR',
        currency: 'Ringgit',
        countries: 'Malaysia',
        locale: 'ms-MY',
        flag: 'my',
    },
    {
        code: 'SGD',
        currency: 'Singapore Dollar',
        countries: 'Singapore',
        locale: 'en-SG',
        flag: 'sg',
    },
    {
        code: 'VND',
        currency: 'Dong',
        countries: 'Vietnam',
        locale: 'vi-VN',
        flag: 'vn',
    },
    {
        code: 'PHP',
        currency: 'Philippine Peso',
        countries: 'Philippines',
        locale: 'en-PH',
        flag: 'ph',
    },
];




// source

export const flagImages: { [key: string]: ImageSourcePropType } = {
    id: require('@/assets/flags/id.png'), // Indonesia
    us: require('@/assets/flags/us.png'), // United States
    de: require('@/assets/flags/de.png'), // Germany
    fr: require('@/assets/flags/fr.png'), // France
    it: require('@/assets/flags/it.png'), // Italy
    es: require('@/assets/flags/es.png'), // Spain
    nl: require('@/assets/flags/nl.png'), // Netherlands
    pt: require('@/assets/flags/pt.png'), // Portugal
    gb: require('@/assets/flags/gb.png'), // United Kingdom
    jp: require('@/assets/flags/jp.png'), // Japan
    th: require('@/assets/flags/th.png'), // Thailand
    my: require('@/assets/flags/my.png'), // Malaysia
    sg: require('@/assets/flags/sg.png'), // Singapore
    vn: require('@/assets/flags/vn.png'), // Vietnam
    ph: require('@/assets/flags/ph.png'), // Philippines
};
