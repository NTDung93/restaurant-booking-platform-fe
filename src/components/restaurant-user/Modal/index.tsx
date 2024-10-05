import { Modal as AntdModal, ModalProps } from 'antd';

interface Props {}

export default function Modal(props: Props & ModalProps) {
  const { children } = props;

  return <AntdModal {...props}>{children}</AntdModal>;
}
