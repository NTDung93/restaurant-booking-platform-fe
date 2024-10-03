import Category from '@/components/restaurant-user/Category';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import Hero from '@/components/restaurant-user/Hero';
import Image from '@/components/restaurant-user/ImagePage';
import Plan from '@/components/restaurant-user/Plan';
import Popular from '@/components/restaurant-user/Popular';
import Sales from '@/components/restaurant-user/Sales';
import Video from '@/components/restaurant-user/Video';
import Voucher from '@/components/restaurant-user/Voucher';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
        <Category />
        <Voucher />
        <Popular />
        <Video />
        <Image />
        <Plan />
        <Sales />
      </div>
      <Footer />
    </div>
  );
}
