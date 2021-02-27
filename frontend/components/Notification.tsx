import { Notification as BaseUiNotification } from 'baseui/notification';

interface NotificationProps {
  [key: string]: string;
}
const Notification: React.FC<NotificationProps> = ({ children, ...props }) => {
  return (
    <BaseUiNotification
      {...props}
      overrides={{
        Body: {
          style: ({ $theme }) => ({
            width: '100%',
          }),
        },
      }}
    >
      {children}
    </BaseUiNotification>
  );
};

export default Notification;
