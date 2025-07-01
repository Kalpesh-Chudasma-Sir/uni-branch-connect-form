
import UniversityForm from "@/components/UniversityForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            University Portal
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with your branch mates through our official WhatsApp groups. 
            Fill out the form below to get your personalized invite link.
          </p>
        </div>
        <UniversityForm />
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 University WhatsApp Branch Connect</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
