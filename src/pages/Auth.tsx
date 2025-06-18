
import { useState } from "react";
import AuthForm from "@/components/AuthForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              FashionAI
            </h1>
          </div>
          <p className="text-gray-600">
            Discover your perfect colors with AI-powered analysis
          </p>
        </div>

        <AuthForm 
          isLogin={isLogin} 
          onToggleMode={() => setIsLogin(!isLogin)} 
        />
      </div>
    </div>
  );
};

export default Auth;
