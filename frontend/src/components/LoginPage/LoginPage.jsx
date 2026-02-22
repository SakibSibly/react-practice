import HeroSection from "../HeroSection/HeroSection";
import FormSection from "../FormSection/FormSection";

const LoginPage = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-7 order-2 md:order-1">
                <HeroSection />
            </div>
            <div className="flex-3 order-1 md:order-2">
                <FormSection />
            </div>
        </div>
    )
}

export default LoginPage;