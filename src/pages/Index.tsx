
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSavedPalettes } from "@/hooks/useSavedPalettes";
import PhotoUpload from "@/components/PhotoUpload";
import ColorPalette from "@/components/ColorPalette";
import AnalysisResults from "@/components/AnalysisResults";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { savePalette } = useSavedPalettes();
  const navigate = useNavigate();

  // Dummy AI results as requested
  const dummyResults = {
    skinTone: "Medium Neutral",
    hairColor: "Dark Brown", 
    eyeColor: "Hazel",
    palette: ["#8A4FFF", "#FF8E72", "#F9DC5C", "#379683", "#3F72AF", "#F67280", "#F5CAC3", "#6C5B7B"]
  };

  const handlePhotoUpload = (photoUrl: string) => {
    setUploadedPhoto(photoUrl);
    // Simulate AI processing delay
    setTimeout(() => {
      setShowResults(true);
      toast({
        title: "Analysis Complete!",
        description: "Your personalized color palette is ready.",
      });
    }, 2000);
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save palettes.",
        variant: "destructive",
      });
      return;
    }

    if (!showResults) {
      toast({
        title: "No Results",
        description: "Please upload a photo and wait for analysis first.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    const success = await savePalette(
      uploadedPhoto,
      dummyResults.skinTone,
      dummyResults.hairColor,
      dummyResults.eyeColor,
      dummyResults.palette
    );
    setIsSaving(false);

    if (success) {
      // Optionally navigate to saved page after successful save
      // navigate("/saved");
    }
  };

  const handleShare = async () => {
    if (!showResults) {
      toast({
        title: "No Results",
        description: "Please upload a photo and get analysis results first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const paletteText = dummyResults.palette.join(', ');
      await navigator.clipboard.writeText(paletteText);
      toast({
        title: "Palette Copied!",
        description: "Color palette copied to clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Copy Failed",
        description: "Failed to copy palette to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleBackToUpload = () => {
    setUploadedPhoto(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                FashionAI
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Try
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/saved")}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Saved
              </Button>
              <UserMenu />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.user_metadata?.full_name || user?.email}!
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your photo and let our AI analyze your unique features to create a personalized color palette that enhances your natural beauty.
            </p>
          </div>

          {/* Upload Section */}
          {!uploadedPhoto && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center">Upload Your Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <PhotoUpload onPhotoUpload={handlePhotoUpload} />
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {uploadedPhoto && (
            <>
              {/* Back Button */}
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={handleBackToUpload}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Upload</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Photo & Analysis */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Photo</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={uploadedPhoto} 
                          alt="Uploaded photo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {showResults && (
                    <AnalysisResults results={dummyResults} />
                  )}
                </div>

                {/* Color Palette */}
                {showResults && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Personalized Palette</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ColorPalette colors={dummyResults.palette} />
                        
                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                          <Button 
                            onClick={handleSave} 
                            className="flex-1"
                            disabled={isSaving}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? "Saving..." : "Save Palette"}
                          </Button>
                          <Button onClick={handleShare} variant="outline" className="flex-1">
                            <Share className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Loading State */}
          {uploadedPhoto && !showResults && (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Colors...</h3>
                  <p className="text-gray-600">Our AI is detecting your skin tone, hair, and eye color to create your perfect palette.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
