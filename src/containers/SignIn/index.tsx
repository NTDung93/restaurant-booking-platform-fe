import { AccountSignIn } from '@/common/models/user';
import { Button } from '@/components/Button';
import CustomizeRequiredMark from '@/components/CustomizeRequiredMark';
import theme from '@/theme';
import { Flex, Form, Input } from 'antd';
import { pick } from 'lodash';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ModalView from '@/components/ModalView';
import { selectUserStatus } from './selectors';
import { getUserInfo, signIn } from './thunks';
import { ApiStatus } from '@/common/enums/apiStatus';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxDispatch } from '@/libs/redux/store';

export default function SignIn() {
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const status = useSelector(selectUserStatus);
  // const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch<ReduxDispatch>();
  const navigate = useNavigate();

  const onFinish = async (values: AccountSignIn) => {
    // const {setAuth} = useAuth();
    const accountSignIn = pick(values, ['username', 'password']);
    // const username = accountSignIn.username;

    const getTokenResult = await dispatch(signIn(accountSignIn));
    if (signIn.fulfilled.match(getTokenResult)) {
      const getUserInfoResult = await dispatch(getUserInfo());
      if (getUserInfo.fulfilled.match(getUserInfoResult)) {
        // const userRole = userInfo?.roleName;
        // setAuth({username, userRole});
        navigate('/');
      }
    } else {
      setModalVisible(true);
    }
  };

  return (
    <Flex
      vertical
      className="w-full h-screen justify-center content-center items-center"
    >
      <h1 className="mb-4">Sign In</h1>

      <ModalView
        visible={modalVisible}
        setVisible={setModalVisible}
        okText={'Close'}
        showCloseBtn={false}
        description={'Sign in failed'}
      />
      <Form
        className="font-medium relative"
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        requiredMark={CustomizeRequiredMark}
      >
        <div className="w-80">
          <div>
            <Form.Item
              name={'username'}
              label={'Username'}
              rules={[
                {
                  required: true,
                  message: (
                    <span className="font-normal">
                      Please enter your username!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder={'Enter username here'} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name={'password'}
              label={'Password'}
              rules={[
                {
                  required: true,
                  message: (
                    <span className="font-normal">
                      Please enter your password!
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder={'Enter password here'} />
            </Form.Item>
          </div>
        </div>

        <div className="sticky !bottom-0">
          <Form.Item className="!m-0">
            <div
              className="pb-4 pt-4"
              style={{ backgroundColor: theme.color.white }}
            >
              <Flex justify="end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="!flex items-center"
                  loading={status == ApiStatus.Loading}
                >
                  Sign In
                  <ArrowRightOutlined className="ml-2" />
                </Button>
              </Flex>
            </div>
          </Form.Item>
        </div>
      </Form>
    </Flex>
  );
}
