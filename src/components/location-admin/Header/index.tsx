import { HOME_ROUTE } from '@/common/constants/routerConstant';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="w-full h-[80px] md:h-[100px] bg-[#312525] fixed top-0 left-0 z-50">
        <div className="max-w-[98.5%]  mx-auto h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to={HOME_ROUTE}>
              <img
                className="w-[150px] h-auto"
                src="https://res.cloudinary.com/dnslrwedn/image/upload/v1727033229/SKEDEAT_logo_tr%E1%BA%AFng-01_rrkx3o.png"
                alt="Logo"
              />
            </Link>
            <nav
              className={`md:flex space-x-4 md:space-x-10 ml-0 flex-col md:flex-row absolute md:static left-0 top-[80px] w-full md:w-auto bg-[#312525] md:bg-transparent`}
              style={{ marginLeft: '0px' }}
            >
              <a href="#"> </a>
              <Link
                to={HOME_ROUTE}
                className="text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0"
              >
                Kênh nhà hàng
              </Link>
              <a
                href="#"
                className="text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0"
              >
                Trang chủ
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link
              to="/signin"
              className="text-white text-lg md:text-xl hover:text-[#D86500] p-4 md:p-0"
            >
              Đăng nhập
            </Link>
            <div className="w-[40px] md:w-[50px] h-[40px] md:h-[49px] bg-[#d9d9d9] rounded-full flex items-center justify-center">
              <UserOutlined style={{ fontSize: '24px' }} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
