import Category from '@/containers/location-user/Home/Components/Category';
import Footer from '@/components/location-user/Footer';
import Header from '@/components/location-user/Header';
import HeroBanner from '@/components/location-user/HeroBanner';

import EatingPlan from '@/containers/location-user/Home/Components/EatingPlan';
import PopularRestaurants from '@/containers/location-user/Home/Components/PopularRestaurants';
import OnSaleRestaurants from '@/containers/location-user/Home/Components/OnSaleRestaurants';
import IntroVideo from '@/containers/location-user/Home/Components/IntroVideo';
import VoucherCarousel from '@/containers/location-user/Home/Components/VoucherCarousel';
import RestaurantGallery from './Components/RestaurantGallery';
import CategoryMobile from './Components/CategoryCarousel';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className="flex-grow">
        <Header />
        <HeroBanner />

        <div className="hidden sm:block">
          <Category />
        </div>

        <div className="block sm:hidden">
          <CategoryMobile />
        </div>

        <VoucherCarousel />
        <PopularRestaurants />
        <IntroVideo />
        <RestaurantGallery />
        <EatingPlan />
        <OnSaleRestaurants />
      </div>
      <Footer />
    </div>
  );
}
