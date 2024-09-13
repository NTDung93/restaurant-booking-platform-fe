// import { AntdRegistry } from '@ant-design/nextjs-registry';
// import { Inter } from 'next/font/google';
// import { ConfigProvider } from 'antd';
// import theme from '@/theme';
// // import { AppProvider } from '@/libs/redux/provider';

// import './global.css';
// const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'GreenZ',
//   description: 'GreenZ',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <html lang="en">
//         <body className={inter.className}>
//           <AntdRegistry>
//             <ConfigProvider
//               theme={{
//                 token: {
//                   fontFamily: inter.style.fontFamily,
//                   colorPrimary: theme.color.primary,
//                 },
//                 components: {
//                   Form: {
//                     marginLG: 12,
//                   },
//                   Collapse: {
//                     contentPadding: 0,
//                   },
//                 },
//               }}
//             >
//               <AppProvider>{children}</AppProvider>
//             </ConfigProvider>
//           </AntdRegistry>
//         </body>
//       </html>
//     </>
//   );
// }
