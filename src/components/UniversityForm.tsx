
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "@/lib/formSchema";
import { getBranchInviteLink, generateWhatsAppMessage, openWhatsAppWithMessage } from "@/lib/whatsappUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, GraduationCap, Phone, Mail, Hash, Users, MessageCircle } from "lucide-react";

const UniversityForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    inviteLink?: string;
    formData?: FormData;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const selectedBranch = watch("branch");

  const onSubmit = async (data: FormData) => {
    console.log('jhhggyfytfyfytty');
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const inviteLink = getBranchInviteLink(data.branch);
      
      setSubmissionResult({
        success: true,
        inviteLink,
        formData: data,
      });

      toast({
        title: "Form Submitted Successfully! 🎉",
        description: `Welcome to ${data.branch} branch! Your WhatsApp invite link is ready.`,
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppShare = () => {
    if (!submissionResult?.formData || !submissionResult?.inviteLink) return;
    
    const message = generateWhatsAppMessage(
      submissionResult.formData.firstname,
      submissionResult.formData.lastname,
      submissionResult.formData.branch,
      submissionResult.inviteLink
    );
    
    openWhatsAppWithMessage(message);
  };

  const handleDirectMessage = () => {
    if (!submissionResult?.formData || !submissionResult?.inviteLink) return;
    
    const message = generateWhatsAppMessage(
      submissionResult.formData.firstname,
      submissionResult.formData.lastname,
      submissionResult.formData.branch,
      submissionResult.inviteLink
    );
    
    openWhatsAppWithMessage(message, submissionResult.formData.phoneNumber);
  };

  if (submissionResult?.success) {
    return (
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Users className="h-6 w-6" />
            Invitation Ready!
          </CardTitle>
          <CardDescription className="text-blue-100">
            Your WhatsApp group invite link has been generated
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Welcome to {submissionResult.formData?.branch} Branch!
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-sm text-gray-600 mb-2">Your group invite link:</p>
              <p className="font-mono text-sm bg-white p-2 rounded border break-all">
                {submissionResult.inviteLink}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleDirectMessage}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Send to My Number
            </Button>
            <Button 
              onClick={handleWhatsAppShare}
              variant="outline"
              className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
            >
              <Phone className="h-4 w-4 mr-2" />
              Share via WhatsApp
            </Button>
          </div>
          
          <Button 
            onClick={() => setSubmissionResult(null)}
            variant="ghost"
            className="w-full"
          >
            Submit Another Form
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <GraduationCap className="h-6 w-6" />
          University WhatsApp Branch Invite
        </CardTitle>
        <CardDescription className="text-blue-100">
          Join your branch WhatsApp group - BTech Department
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div className="grid  md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="text-sm font-semibold text-gray-700">
                First Name
              </Label>
              <Input
                id="firstname"
                {...register("firstname")}
                placeholder="Enter your firstname name"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstname && (
                <p className="text-sm text-red-600">{errors.firstname.message}</p>
              )}
            </div>
            

            
            <div className="space-y-2">
              <Label htmlFor="lastname" className="text-sm font-semibold text-gray-700">
                Last Name
              </Label>
              <Input
                id="lastname"
                {...register("lastname")}
                placeholder="Enter your Surname"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstname && (
                <p className="text-sm text-red-600">{errors.lastname.message}</p>
              )}
            </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                {...register("phoneNumber")}
                placeholder="10-digit Indian number"
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
              {errors.phoneNumber && (
                <p className="text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>


          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch" className="text-sm font-semibold text-gray-700">
              Branch *
            </Label>
            <Select onValueChange={(value) => setValue("branch", value as FormData["branch"])}>
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select your branch" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="CE">Computer Engineering (CE)</SelectItem>
                <SelectItem value="CSE">Computer Science Engineering (CSE)</SelectItem>
                <SelectItem value="EC">Electronics & Communication (EC)</SelectItem>
                <SelectItem value="CIVIL">Civil Engineering (CIVIL)</SelectItem>
                <SelectItem value="MECH">Mechanical Engineering (MECH)</SelectItem>
                <SelectItem value="EE">Electrical Engineering (EE)</SelectItem>
              </SelectContent>
            </Select>
            {errors.branch && (
              <p className="text-sm text-red-600">{errors.branch.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Users className="h-5 w-5 mr-2" />
                Get WhatsApp Invite Link
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UniversityForm;
