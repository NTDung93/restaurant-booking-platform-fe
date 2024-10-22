import Header from '@/components/restaurant-admin/Header';
import Menu from '@/components/restaurant-admin/Menu';
import { Button, Rate, Input, Table } from 'antd';
import { useState } from 'react';
import Image from '@/components/restaurant-admin/Img';

export default function ReviewManagementPage() {
  // State variables for data and filters
  const [reviews] = useState([
    {
      id: '#554654845791',
      tableNumber: 5,
      customer: 'Khách Hàng SG1',
      status: 'Đã hoàn thành',
      rating: 5,
      date: '25/09/2024 19:00',
      note: 'Quán ngon, phục vụ tốt, sẽ quay lại!',
    },
    // ... other review data
  ]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState<number | null>(null); // Handle star ratings filter

  // Columns for the Ant Design Table component
  const columns = [
    {
      title: 'Mã bàn đặt',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Thời gian đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Số sao đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Bình luận của khách hàng',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Tùy chọn',
      key: 'action',
      render: () => (
        <div className="flex space-x-2">
          <Button type="primary">Xem</Button>
          <Button type="default">Báo cáo</Button>
        </div>
      ),
    },
  ];

  // Filtering and searching the reviews
  const filteredReviews = reviews.filter(
    (review) =>
      (!filter || review.rating === filter) &&
      (!searchText || review.note.includes(searchText)),
  );

  return (
    <>
      <Header />
      <div className="mt-[100px] flex min-h-screen">
        <Menu />
        <div className="w-[85vw] flex flex-col">
          <Image />
          <div className="w-[85vw] flex flex-col px-10 py-8 space-y-8">
            {/* Đánh giá nhà hàng tổng quan */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">Đánh giá Nhà Hàng 4.9/5</h2>
              <div className="grid grid-cols-3 gap-6">
                {/* Add your summary components here, similar to ManageLocationFood */}
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">Tổng lượt đánh giá</h3>
                  <p className="text-4xl font-bold">453</p>
                  <p className="text-sm text-gray-500">
                    So với 30 ngày trước: -5%
                  </p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Tỷ lệ đánh giá 5 sao
                  </h3>
                  <p className="text-4xl font-bold">87%</p>
                  <p className="text-sm text-gray-500">
                    So với 30 ngày trước: +3%
                  </p>
                </div>
                <div className="bg-white p-6 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Tỷ lệ đánh giá 4 sao
                  </h3>
                  <p className="text-4xl font-bold">80%</p>
                  <p className="text-sm text-gray-500">
                    So với 30 ngày trước: +2%
                  </p>
                </div>
              </div>
            </div>

            {/* Danh sách đánh giá */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Danh sách đánh giá</h2>
              <div className="flex space-x-4">
                <Input
                  placeholder="Tìm kiếm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-1/3"
                />
                <Button onClick={() => setFilter(null)}>Xác nhận</Button>
                <Button onClick={() => setFilter(5)}>Lọc 5 sao</Button>
              </div>
              <Table
                columns={columns}
                dataSource={filteredReviews}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
