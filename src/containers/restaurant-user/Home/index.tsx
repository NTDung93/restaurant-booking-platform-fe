import Category from '@/containers/restaurant-user/Home/Components/Category';
import Footer from '@/components/restaurant-user/Footer';
import Header from '@/components/restaurant-user/Header';
import HeroBanner from '@/components/restaurant-user/HeroBanner';
import EatingPlan from '@/containers/restaurant-user/Home/Components/LocationsByTag';
import PopularRestaurants from '@/containers/restaurant-user/Home/Components/PopularRestaurants';
import OnSaleRestaurants from '@/containers/restaurant-user/Home/Components/OnSaleRestaurants';
import IntroVideo from '@/containers/restaurant-user/Home/Components/IntroVideo';
import VoucherCarousel from '@/containers/restaurant-user/Home/Components/VoucherCarousel';
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
