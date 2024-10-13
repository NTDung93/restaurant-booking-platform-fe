export type ToastType = 'info' | 'success' | 'warning' | 'error';

const Toast = ({
  type = 'info',
  message,
}: {
  type: ToastType;
  message: string;
}) => {
  // Define a mapping of the notification types to their corresponding DaisyUI alert classes
  const alertClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error',
  };

  // Use the type to determine the correct alert class; default to 'info' if type is not recognized
  const alertClass = alertClasses[type] || alertClasses.info;

  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${alertClass}`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
