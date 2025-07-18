import Header from "../../components/layout/userLayout/Header";
import HeroSection from "../../components/layout/userLayout/HeroSection";
import FeaturesSection from "../../components/layout/userLayout/FeaturesSection";
import SecuritySection from "../../components/layout/userLayout/SecuritySection";
import StatsSection from "../../components/layout/userLayout/StatsSection";
import CTASection from "../../components/layout/userLayout/CTASection";
import Footer from "../../components/layout/userLayout/Footer";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <HeroSection />
            <FeaturesSection />
            <SecuritySection />
            <StatsSection />
            <CTASection />
            <Footer />
        </div>
    );
};
export default HomePage;