import Category from '@/components/client/Category';
import Footer from '@/components/client/Footer';
import Header from '@/components/client/Header';
import Hero from '@/components/client/Hero';
import Image from '@/components/client/Image-page';

import Plan from '@/components/client/Plan';
import Popular from '@/components/client/Popular';
import Sales from '@/components/client/Sales';
import Video from '@/components/client/Video';
import Voucher from '@/components/client/Voucher';

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
