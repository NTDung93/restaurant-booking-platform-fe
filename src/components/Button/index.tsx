'use client';

import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import theme from '@/theme';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  shape?: 'circle' | 'round' | 'default';
  size?: 'small' | 'middle' | 'large';
  className?: string;
  disabled?: boolean;
  overrideCustomStyle?: boolean;
}

export const Button = ({
  children,
  icon,
  iconPosition,
  style,
  type = 'primary',
  shape = 'default',
  overrideCustomStyle = true,
  size,
  onClick,
  className,
  disabled,
  ...props
}: ButtonProps & AntButtonProps) => {
  const backgroundColor =
    type === 'primary' ? theme.color.primary : theme.color.white;
  return (
    <AntButton
      {...props}
      type={type}
      icon={icon}
      iconPosition={iconPosition}
      shape={shape}
      size={size}
      onClick={onClick}
      className={className}
      disabled={disabled}
      style={
        overrideCustomStyle
          ? { ...style }
          : { backgroundColor: backgroundColor, ...style }
      }
    >
      {children}
    </AntButton>
  );
};
