import React, { useState, useCallback } from 'react';
import { Upload, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        // Simulate API call
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        // Simulate API call
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeImage = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        label: Math.random() > 0.5 ? 'REAL' : 'FAKE',
        confidence: Math.random() * 0.5 + 0.5
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Deepfake Detection</h1>
          <p className="text-gray-400">Upload an image to analyze its authenticity using advanced AI</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div 
            className={`
              border-2 border-dashed rounded-xl p-8 
              ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'} 
              ${!image ? 'min-h-[400px]' : ''}
              transition-all duration-200
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!image ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <Upload className="w-12 h-12 mb-4 text-gray-400" />
                <p className="mb-2 text-xl font-semibold">Drag and drop your image here</p>
                <p className="text-gray-400 mb-4">or</p>
                <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </label>
              </div>
            ) : (
              <img 
                src={image} 
                alt="Uploaded" 
                className="w-full h-auto rounded-lg"
              />
            )}
          </div>

          <div className="bg-gray-800 rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-[300px]">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Analyzing image...</p>
              </div>
            ) : result ? (
              <div>
                <div className={`flex items-center mb-6 p-4 rounded-lg ${
                  result.label === 'REAL' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {result.label === 'REAL' ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {result.label === 'REAL' ? 'Authentic Image' : 'Potential Deepfake'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Analysis Details</h3>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span>Authenticity Score</span>
                      <span>{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          result.label === 'REAL' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
                <ImageIcon className="w-12 h-12 mb-4" />
                <p>Upload an image to see the analysis</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;