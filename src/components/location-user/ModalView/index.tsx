import React from 'react';
import Modal from '../Modal';
import { Title } from '../Title';
// import { useTranslations } from 'next-intl';
import theme from '@/theme';
import { Flex } from 'antd';
// import Image from 'next/image';

interface ModalProps {
  description?: string;
  okText?: string;
  cancelText?: string;
  onClose?: () => void;
  onOk?: () => void;
  visible: boolean;
  setVisible(pram: boolean): void;
  showCloseBtn?: boolean;
  showOkBtn?: boolean;
  hasFooter?: boolean;
  children?: React.ReactNode;
  descNode?: React.ReactNode;
}

const ModalView: React.FC<ModalProps> = ({
  description,
  okText,
  cancelText,
  onClose,
  onOk,
  visible,
  setVisible,
  showCloseBtn = true,
  showOkBtn = true,
  hasFooter = true,
  children,
  descNode,
}) => {
  // const t = useTranslations('General');

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const handleOk = () => {
    setVisible(false);
    onOk?.();
  };

  return (
    <>
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleClose}
        closable={false}
        okText={okText ?? 'Ok'}
        cancelText={cancelText ?? 'Cancel'}
        centered
        footer={(_, { OkBtn, CancelBtn }) =>
          hasFooter && (
            <Flex className="pt-5 gap-4">
              {showCloseBtn && <CancelBtn />}
              {showOkBtn && <OkBtn />}
            </Flex>
          )
        }
        maskClosable={false}
        okButtonProps={{
          style: { backgroundColor: theme.color.primary, flex: 1 },
        }}
        cancelButtonProps={{
          style: showOkBtn
            ? {
                color: theme.color.primary,
                borderColor: theme.color.primary,
                flex: 1,
              }
            : {
                backgroundColor: theme.color.primary,
                color: theme.color.white,
                flex: 1,
              },
        }}
      >
        <div className="text-center mb-4">
          {/* <Flex className="justify-center">
            <Image
              src="/icons/caution-circle.svg"
              alt="caution-circle"
              fill
              className="!w-[48px] object-contain object-top !static"
            />
          </Flex> */}
          <Title level={4} className="mt-6">
            {'Noti'}
          </Title>
          <p className="text-center px-6">
            {descNode ?? (
              <div dangerouslySetInnerHTML={{ __html: description! }} />
            )}
          </p>
        </div>
        {children}
      </Modal>
    </>
  );
};

export default ModalView;
