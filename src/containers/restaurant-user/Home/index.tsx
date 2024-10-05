import Category from '@/containers/restaurant-user/Home/Components/Category';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import Hero from '@/components/restaurant-user/Hero';

import Plan from '@/containers/restaurant-user/Home/Components/Plan';
import Popular from '@/containers/restaurant-user/Home/Components/Popular';
import Sales from '@/containers/restaurant-user/Home/Components/Sales';
import Video from '@/containers/restaurant-user/Home/Components/Video';
import VoucherCarousel from '@/containers/restaurant-user/Home/Components/VoucherCarousel';
import Image from './Components/ImagePage';
import CategoryMobile from './Components/CategoryCarousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
        <div className="hidden sm:block">
          <Category />
        </div>

        <div className="block sm:hidden">
          <CategoryMobile />
        </div>
        <VoucherCarousel />
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
