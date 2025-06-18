
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, Palette } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSavedPalettes } from "@/hooks/useSavedPalettes";
import ColorPalette from "@/components/ColorPalette";
import UserMenu from "@/components/UserMenu";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const { user } = useAuth();
  const { savedPalettes, loading, deletePalette } = useSavedPalettes();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-6">
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Please Log In</h2>
            <p className="text-gray-600">You need to be logged in to view your saved palettes.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FashionAI
                </h1>
              </div>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Your Saved Palettes</h2>
            </div>
            <p className="text-gray-600">
              View and manage your personalized color collections
            </p>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your saved palettes...</p>
            </div>
          )}

          {!loading && savedPalettes.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Palettes</h3>
                <p className="text-gray-600 mb-6">
                  You haven't saved any color palettes yet. Upload a photo to get started!
                </p>
                <Button onClick={() => navigate("/")} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Upload Photo
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && savedPalettes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPalettes.map((palette) => (
                <Card key={palette.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {new Date(palette.created_at).toLocaleDateString()}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deletePalette(palette.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {palette.image_url && (
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={palette.image_url} 
                          alt="Saved photo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Skin Tone:</span>
                        <span className="font-medium">{palette.skin_tone}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hair Color:</span>
                        <span className="font-medium">{palette.hair_color}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Eye Color:</span>
                        <span className="font-medium">{palette.eye_color}</span>
                      </div>
                    </div>

                    <ColorPalette colors={Array.isArray(palette.color_palette) ? palette.color_palette : []} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Saved;
