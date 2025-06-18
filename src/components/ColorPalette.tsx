
interface ColorPaletteProps {
  colors: string[];
}

const ColorPalette = ({ colors }: ColorPaletteProps) => {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {colors.map((color, index) => (
          <div
            key={index}
            className="group cursor-pointer"
            onClick={() => copyToClipboard(color)}
          >
            <div
              className="w-full aspect-square rounded-lg shadow-sm border-2 border-white group-hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
              title={`Click to copy ${color}`}
            />
            <p className="text-sm font-mono text-center mt-2 text-gray-600 group-hover:text-gray-900 transition-colors">
              {color}
            </p>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        Click any color to copy its hex code
      </p>
    </div>
  );
};

export default ColorPalette;
