
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using the services provided by Abdul Moeed ("Hire Moeed"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Services Description</h2>
                <p className="text-gray-600 mb-4">
                  We provide professional software development services including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Web application development</li>
                  <li>Mobile application development</li>
                  <li>UI/UX design services</li>
                  <li>API development and integration</li>
                  <li>Technical consulting and support</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Project Scope and Deliverables</h2>
                <p className="text-gray-600 mb-4">
                  All projects will be defined by a written agreement that includes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Detailed project scope and requirements</li>
                  <li>Timeline and milestones</li>
                  <li>Payment terms and schedule</li>
                  <li>Specific deliverables and acceptance criteria</li>
                  <li>Revision and change request procedures</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Payment schedules will be defined in the project agreement</li>
                  <li>Invoices are due within 15 days of receipt</li>
                  <li>Late payments may incur additional fees</li>
                  <li>Work may be suspended for overdue payments</li>
                  <li>Refunds are subject to the project agreement terms</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  Upon full payment, you will own the custom code developed specifically for your project. However:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Third-party libraries and frameworks remain under their respective licenses</li>
                  <li>General methodologies and techniques remain our intellectual property</li>
                  <li>We retain the right to use general knowledge gained for future projects</li>
                  <li>Confidential information will be protected as per our privacy policy</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Client Responsibilities</h2>
                <p className="text-gray-600 mb-4">
                  To ensure successful project completion, clients must:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Provide timely feedback and approvals</li>
                  <li>Supply necessary content, assets, and information</li>
                  <li>Maintain open and professional communication</li>
                  <li>Respect project timelines and deadlines</li>
                  <li>Make payments according to the agreed schedule</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Warranties and Disclaimers</h2>
                <p className="text-gray-600 mb-4">
                  We provide our services "as is" and make no warranties beyond:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Code will be developed using industry best practices</li>
                  <li>Services will be performed with professional skill and care</li>
                  <li>Deliverables will meet the specifications outlined in the project agreement</li>
                  <li>We disclaim all other warranties, express or implied</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  Our liability is limited to the total amount paid for the specific project. We are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business interruption</li>
                  <li>Third-party actions or integrations</li>
                  <li>Issues arising from client-provided content or specifications</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Termination</h2>
                <p className="text-gray-600 mb-4">
                  Either party may terminate the agreement with written notice. Upon termination:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>Payment is due for all completed work</li>
                  <li>Work-in-progress will be delivered in its current state</li>
                  <li>Confidentiality obligations continue</li>
                  <li>Refunds will be handled according to the project agreement</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These terms are governed by the laws of the jurisdiction where services are provided. Any disputes will be resolved through professional mediation or arbitration.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of our services constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-600">
                    Email: hello@hiremoeed.me<br />
                    Subject: Terms of Service Inquiry
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
