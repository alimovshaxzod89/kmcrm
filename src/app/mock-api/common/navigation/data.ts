/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'tablo',
        title: 'Tablo',
        type : 'basic',
        icon : 'heroicons_outline:desktop-computer',
        link : '/production/tablo'
    },
    {
        id   : 'furniture-map',
        title: 'Harakat Xarita',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/production/map'
    },
    {
        id   : 'production',
        title: 'Ishlab chiqarish',
        type : 'basic',
        icon : 'heroicons_outline:map',
        link : '/production/production'
    },
    {
        id   : 'reports',
        title: 'Hisobotlar',
        tooltip: 'Seh hisobotlari',
        type : 'aside',
        icon : 'heroicons_outline:chart-bar',
        children: [
            {
                id   : 'readiness',
                title: 'Buyurtmalar holati',
                type : 'basic',
                icon : 'heroicons_outline:badge-check',
                link : '/production/report/readiness'
            },
            {
                id   : 'ready-in-summary',
                title: 'Tayyor mahsulotlar',
                type : 'basic',
                icon : 'heroicons_outline:badge-check',
                link : '/production/report/ready-in-summary'
            },
            {
                id   : 'seh-status',
                title: 'Sehlar holati',
                type : 'basic',
                icon : 'heroicons_outline:check-circle',
                link : '/production/report/seh-status'
            },
            {
                id   : 'seh-yuklanma',
                title: 'Sehlar yuklanmasi',
                type : 'basic',
                icon : 'heroicons_outline:check-circle',
                link : '/production/report/seh-yuklanma'
            },
            {
                id   : 'seh-earn-month',
                title: 'Sehlar ishlagan pullari',
                type : 'basic',
                icon : 'mat_outline:work',
                link : '/production/report/seh-earn-month'
            }
        ]
    },
    {
        id   : 'salary',
        title: 'Kunlik ish haqqi',
        type : 'basic',
        icon : 'heroicons_outline:currency-dollar',
        link : '/salary/daily'
    },
    // {
    //     id   : 'example',
    //     title: 'Example',
    //     type : 'basic',
    //     icon : 'heroicons_outline:chart-pie',
    //     link : '/example'
    // },
    // {
    //     id   : 'unit',
    //     title: 'Units123',
    //     type : 'basic',
    //     icon : 'heroicons_outline:view-list',
    //     link : '/units'
    // },
    // {
    //     id   : 'good-categories',
    //     title: 'Категории Сырья',
    //     type : 'basic',
    //     icon : 'heroicons_outline:view-list',
    //     link : '/good-categories'
    // }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
