import { notifications } from "@mantine/notifications";
import { Image, rem } from "@mantine/core";
import classes from '@/components/dashboard/notification/notification.module.css';
import classesx from '@/components/dashboard/notification/dashNotification.module.css';

export interface showNotificationProps {
    title: string;
    message: string;
    icon?: string;
    withClose: boolean;
}

export const showNotification = ({title, message, icon, withClose} : showNotificationProps) => {
    const notifIcon = <Image src={icon ? icon : '/favicon.png'} alt="icon" style={{ width: rem(40), borderRadius: '100%' }} />

    notifications.show({
        title: title,
        withCloseButton: withClose,
        message: message,
        icon: notifIcon,
        withBorder: true,
        classNames: classes
    });
};

export const showDashNotification = ({title, message, icon, withClose} : showNotificationProps) => {
    const notifIcon = <Image src={icon ? icon : '/favicon.png'} alt="icon" style={{ width: rem(40), borderRadius: '100%' }} />

    notifications.show({
        title: title,
        withCloseButton: withClose,
        message: message,
        icon: notifIcon,
        withBorder: true,
        classNames: classesx
    });
};