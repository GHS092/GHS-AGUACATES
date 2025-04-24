import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F6F0] px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-[#2D5C34] mb-6">404</h1>
        
        <div className="w-16 h-[2px] bg-[#C6A96C] mx-auto mb-6"></div>
        
        <h2 className="text-2xl md:text-3xl font-display text-[#2D5C34] mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-gray-600 mb-8">
          Lo sentimos, no pudimos encontrar la página que estás buscando. 
          Puede que haya sido movida o ya no exista.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-[#2D5C34] text-white px-6 py-3 rounded-md hover:bg-[#2D5C34]/90 transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
      </div>
      
      <div className="mt-16">
        <img 
          src="/images/Aguacate Hass Premium.jpeg" 
          alt="Aguacate Inca Fields" 
          className="w-32 h-32 object-cover rounded-full border-4 border-[#C6A96C]" 
        />
      </div>
    </div>
  );
};

export default ErrorPage; 