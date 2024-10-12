import AntTitle from 'antd/es/typography/Title';
import { TitleProps as AntTitleProps } from 'antd/lib/typography/Title';
interface TitleProps extends AntTitleProps {
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export const Title = ({ children, ...props }: TitleProps) => (
  <AntTitle {...props}>{children}</AntTitle>
);
