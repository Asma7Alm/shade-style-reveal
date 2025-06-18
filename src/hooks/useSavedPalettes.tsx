
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface SavedPalette {
  id: string;
  user_id: string;
  image_url?: string;
  skin_tone: string;
  hair_color: string;
  eye_color: string;
  color_palette: string[];
  created_at: string;
  updated_at: string;
}

export const useSavedPalettes = () => {
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSavedPalettes = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_palettes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved palettes:', error);
        toast({
          title: "Error",
          description: "Failed to load your saved palettes.",
          variant: "destructive",
        });
        return;
      }

      setSavedPalettes(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load your saved palettes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const savePalette = async (
    imageUrl: string | null,
    skinTone: string,
    hairColor: string,
    eyeColor: string,
    colorPalette: string[]
  ) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save palettes.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('saved_palettes')
        .insert({
          user_id: user.id,
          image_url: imageUrl,
          skin_tone: skinTone,
          hair_color: hairColor,
          eye_color: eyeColor,
          color_palette: colorPalette
        });

      if (error) {
        console.error('Error saving palette:', error);
        toast({
          title: "Save Failed",
          description: "Failed to save your palette. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Palette Saved!",
        description: "Your color palette has been saved successfully.",
      });
      
      // Refresh the saved palettes list
      fetchSavedPalettes();
      return true;
    } catch (error) {
      console.error('Error saving palette:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save your palette. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deletePalette = async (paletteId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_palettes')
        .delete()
        .eq('id', paletteId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting palette:', error);
        toast({
          title: "Delete Failed",
          description: "Failed to delete the palette.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Palette Deleted",
        description: "The palette has been removed from your collection.",
      });
      
      fetchSavedPalettes();
      return true;
    } catch (error) {
      console.error('Error deleting palette:', error);
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedPalettes();
    }
  }, [user]);

  return {
    savedPalettes,
    loading,
    savePalette,
    deletePalette,
    fetchSavedPalettes
  };
};
