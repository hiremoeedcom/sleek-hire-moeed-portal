
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  Palette, 
  CheckCircle, 
  ArrowRight, 
  Eye,
  Users,
  Smartphone,
  Monitor,
  Figma
} from "lucide-react";

const UIUXDesign = () => {
  const services = [
    "User research & analysis",
    "Wireframing & prototyping",
    "Visual design & branding",
    "Design systems & style guides",
    "Usability testing & optimization",
    "Mobile-first responsive design",
    "Accessibility compliance",
    "Design handoff to developers"
  ];

  const designTypes = [
    {
      title: "Website Design",
      description: "Beautiful, user-friendly website designs that convert",
      icon: Monitor,
      features: ["Landing pages", "Corporate websites", "E-commerce design", "Portfolio sites"]
    },
    {
      title: "Mobile App Design",
      description: "Intuitive mobile interfaces for iOS and Android",
      icon: Smartphone,
      features: ["App interfaces", "User onboarding", "Navigation design", "Icon design"]
    },
    {
      title: "Design Systems",
      description: "Consistent design languages for scalable products",
      icon: Palette,
      features: ["Component libraries", "Style guides", "Brand guidelines", "Design tokens"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="UI/UX Design Services - Abdul Moeed"
        description="Professional UI/UX design services. Create beautiful, user-friendly interfaces that convert visitors into customers."
        keywords="ui design, ux design, user interface, user experience, web design, app design"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Palette className="w-4 h-4 mr-2" />
              UI/UX Design Services
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Beautiful <span className="gradient-text">User Experiences</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Design interfaces that users love and convert visitors into customers. From wireframes to final designs, I create experiences that work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
                <Link to="/estimate">Get Design Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Discuss Design</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Design Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive design services from research to final implementation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-4 text-green-500" />
                  <p className="font-medium">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Design Types Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">What I Design</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From websites to mobile apps, I create designs that work across all platforms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {designTypes.map((type, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8 text-center">
                  <type.icon className="h-16 w-16 mx-auto mb-6 text-black" />
                  <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                  <p className="text-gray-600 mb-6">{type.description}</p>
                  <div className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="mr-2 mb-2">
                        {feature}
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
            <h2 className="text-4xl font-bold mb-6 gradient-text">Design Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A user-centered approach that ensures every design decision is backed by research and testing
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Research</h3>
                <p className="text-gray-600 text-sm">Understanding users and business goals</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Monitor className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Wireframe</h3>
                <p className="text-gray-600 text-sm">Creating structure and user flows</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Palette className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Design</h3>
                <p className="text-gray-600 text-sm">Visual design and branding</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Figma className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Prototype</h3>
                <p className="text-gray-600 text-sm">Interactive prototypes for testing</p>
              </CardContent>
            </Card>
            <Card className="hover-lift">
              <CardContent className="p-6 text-center">
                <Eye className="h-12 w-12 mx-auto mb-4 text-black" />
                <h3 className="text-lg font-bold mb-2">Test</h3>
                <p className="text-gray-600 text-sm">User testing and optimization</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 gradient-text">Design Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional design tools for high-quality deliverables
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {["Figma", "Adobe Creative Suite", "Principle", "InVision"].map((tool, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold mb-2">{tool}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Improve Your Design?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let's create beautiful, user-friendly designs that help your business grow and engage your audience effectively.
          </p>
          <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800">
            <Link to="/estimate">
              Start Design Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default UIUXDesign;
