import Category from '@/components/Category';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Image from '@/components/Image';
import Plan from '@/components/Plan';
import Popular from '@/components/Popular';
import Sales from '@/components/Sales';
import Video from '@/components/Video';
import Voucher from '@/components/Voucher';

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
