import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryShowcase from '../components/home/CategoryShowcase';
import NewArrivals from '../components/home/NewArrivals';
import TopSelling from '../components/home/TopSelling';
import BrowseByStyle from '../components/home/BrowseByStyle';
import CustomerReviews from '../components/home/CustomerReviews';
import Newsletter from '../components/home/Newsletter';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Top Selling */}
      <TopSelling />

      {/* Browse by Style */}
      <BrowseByStyle />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Newsletter Subscription */}
      <Newsletter />
    </div>
  );
}

export default Home;
