
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  CheckCircle, 
  ArrowRight, 
  Apple, 
  Play,
  Bell,
  Shield,
  Zap
} from "lucide-react";

const MobileApps = () => {
  const features = [
    "React Native development",
    "iOS and Android compatibility",
    "Native performance optimization",
    "App Store and Play Store deployment",
    "Push notifications & analytics",
    "Offline functionality",
    "Biometric authentication",
    "In-app purchases integration"
  ];

  const appTypes = [
    {
      title: "Business Apps",
      description: "Professional applications for businesses and enterprises",
      icon: Shield,
      examples: ["CRM apps", "Inventory management", "Employee portals", "Customer service"]
    },
    {
      title: "E-commerce Apps",
      description: "Mobile shopping experiences that drive sales",
      icon: Smartphone,
      examples: ["Online stores", "Marketplace apps", "Payment integration", "Order tracking"]
    },
    {
      title: "Social Platforms",
      description: "Connect users with engaging social features",
      icon: Bell,
      examples: ["Chat applications", "Social networks", "Community platforms", "Content sharing"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Mobile App Development Services - Abdul Moeed"
        description="Professional mobile app development for iOS and Android using React Native. Custom mobile applications that engage users."
        keywords="mobile app development, react native, ios development, android development, cross-platform"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile App Development
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Cross-Platform <span className="gradient-text">Mobile Apps</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Build powerful mobile applications for iOS and Android with React Native. One codebase, native performance, faster time to market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/estimate">Get App Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Discuss App Idea</Link>
              </Button>
            </div>
            <div className="flex justify-center gap-8">
              <div className="flex items-center">
                <Apple className="w-6 h-6 mr-2" />
                <span>iOS Compatible</span>
              </div>
              <div className="flex items-center">
                <Play className="w-6 h-6 mr-2" />
                <span>Android Compatible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">App Development Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a successful mobile app launch and growth
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <p className="font-medium">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Types Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Types of Apps I Build</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple utility apps to complex enterprise solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {appTypes.map((type, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8 text-center">
                  <type.icon className="h-16 w-16 mx-auto mb-6 text-black" />
                  <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <div className="space-y-2">
                    {type.examples.map((example, idx) => (
                      <Badge key={idx} variant="outline" className="mr-2">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Development Process</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-4">01</div>
                <h3 className="text-lg font-bold mb-2">Planning</h3>
                <p className="text-gray-600">App concept, user flows, and technical requirements</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-4">02</div>
                <h3 className="text-lg font-bold mb-2">Design</h3>
                <p className="text-gray-600">UI/UX design and interactive prototypes</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-4">03</div>
                <h3 className="text-lg font-bold mb-2">Development</h3>
                <p className="text-gray-600">React Native development and testing</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold mb-4">04</div>
                <h3 className="text-lg font-bold mb-2">Launch</h3>
                <p className="text-gray-600">App store submission and deployment</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Mobile App?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Turn your app idea into reality with professional mobile development services. Let's discuss your project requirements.
          </p>
          <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/estimate">
              Start App Development
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MobileApps;
