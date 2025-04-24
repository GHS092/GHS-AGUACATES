import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, ZoomIn, X, Timer, ChefHat, Users, BookOpen } from 'lucide-react';
import { setModalOpen } from './Header';

type Recipe = {
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
} | null;

type GalleryItem = {
  id: number;
  image: string;
  alt: string;
  category: 'platos' | 'ingredientes' | 'cultivo';
  recipe?: Recipe;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: "/images/Tostada de aguacate con huevo pochado y semillas de chía.jpg",
    alt: "Tostada de aguacate con huevo pochado y semillas de chía",
    category: 'platos',
    recipe: {
      ingredients: [
        "2 rebanadas de pan integral",
        "1 aguacate maduro Inca Fields",
        "2 huevos frescos",
        "1 cucharada de semillas de chía",
        "1 limón (jugo)",
        "Sal marina y pimienta recién molida al gusto",
        "Hojuelas de chile rojo (opcional)",
        "Microgreens para decorar"
      ],
      instructions: [
        "Corta el aguacate por la mitad, retira el hueso y machaca la pulpa en un recipiente.",
        "Añade el jugo de limón, sal y pimienta al aguacate y mezcla bien.",
        "Tuesta el pan hasta que esté dorado y crujiente.",
        "Mientras tanto, prepara los huevos pochados: hierve agua con un chorrito de vinagre, crea un remolino con una cuchara y desliza con cuidado los huevos. Cocina por 3 minutos.",
        "Unta generosamente el aguacate machacado sobre las tostadas.",
        "Coloca un huevo pochado sobre cada tostada.",
        "Espolvorea con semillas de chía, hojuelas de chile si deseas, y decora con microgreens.",
        "Añade un poco más de sal marina y pimienta negra recién molida al gusto."
      ],
      prepTime: "10 minutos",
      cookTime: "5 minutos",
      servings: 2
    }
  },
  {
    id: 2,
    image: "/images/Plato gourmet con aguacate y langostinos.jpg",
    alt: "Plato gourmet con aguacate y langostinos",
    category: 'platos',
    recipe: {
      ingredients: [
        "12 langostinos grandes, pelados y desvenados",
        "2 aguacates Inca Fields maduros",
        "1 limón (jugo y ralladura)",
        "2 cucharadas de aceite de oliva extra virgen",
        "1 diente de ajo finamente picado",
        "1 cucharadita de pimentón ahumado",
        "1 manojo pequeño de cilantro fresco",
        "Sal marina y pimienta negra recién molida",
        "Flores comestibles para decorar"
      ],
      instructions: [
        "Marina los langostinos en aceite de oliva, ajo, pimentón, la mitad del jugo de limón, sal y pimienta por 15 minutos.",
        "Corta los aguacates por la mitad, retira los huesos y córtalos en láminas finas.",
        "Sella los langostinos en una sartén caliente por 2 minutos de cada lado hasta que estén rosados y bien cocidos.",
        "Dispón las láminas de aguacate en forma de abanico en cada plato.",
        "Coloca los langostinos sobre el aguacate.",
        "Mezcla el aceite de oliva restante con el jugo de limón y la ralladura, sal y pimienta para crear un aderezo.",
        "Rocía el aderezo sobre el plato, espolvorea cilantro picado y decora con flores comestibles.",
        "Sirve inmediatamente para disfrutar de la temperatura y texturas contrastantes."
      ],
      prepTime: "20 minutos",
      cookTime: "5 minutos",
      servings: 4
    }
  },
  {
    id: 3,
    image: "/images/Guacamole fresco con lima y cilantro.jpg",
    alt: "Guacamole fresco con lima y cilantro",
    category: 'platos',
    recipe: {
      ingredients: [
        "3 aguacates Inca Fields maduros",
        "1 tomate mediano, sin semillas y picado en cubitos",
        "1/2 cebolla roja pequeña, finamente picada",
        "1 chile jalapeño o serrano, sin semillas y finamente picado",
        "1/4 taza de cilantro fresco picado",
        "2 limas (jugo)",
        "1/2 cucharadita de comino molido",
        "Sal marina al gusto",
        "Totopos de maíz para servir"
      ],
      instructions: [
        "Corta los aguacates por la mitad, retira los huesos y extrae la pulpa a un recipiente.",
        "Machaca los aguacates con un tenedor hasta obtener la consistencia deseada (puedes dejarlo más o menos grumoso según tu preferencia).",
        "Agrega inmediatamente el jugo de una lima para evitar que el aguacate se oxide.",
        "Incorpora el tomate, la cebolla, el chile y el cilantro, mezclando suavemente.",
        "Sazona con sal, comino y el jugo de lima restante.",
        "Prueba y ajusta los condimentos según tu gusto.",
        "Refrigera por 30 minutos antes de servir para que los sabores se integren.",
        "Sirve con totopos de maíz y una rodaja de lima como decoración."
      ],
      prepTime: "15 minutos",
      cookTime: "0 minutos",
      servings: 6
    }
  },
  {
    id: 4,
    image: "/images/Aguacates frescos recien cocechados.jpg",
    alt: "Aguacates frescos recién cosechados",
    category: 'ingredientes'
  },
  {
    id: 5,
    image: "/images/Sushi con aguacate y salmón premium.jpg",
    alt: "Sushi con aguacate y salmón premium",
    category: 'platos',
    recipe: {
      ingredients: [
        "2 tazas de arroz para sushi",
        "3 cucharadas de vinagre de arroz",
        "1 cucharada de azúcar",
        "1 cucharadita de sal",
        "200g de salmón fresco de calidad sashimi",
        "1 aguacate Inca Fields maduro",
        "4 hojas de alga nori",
        "Salsa de soja",
        "Wasabi",
        "Jengibre encurtido (gari)"
      ],
      instructions: [
        "Lava el arroz hasta que el agua salga clara. Cocina según las instrucciones del paquete.",
        "Mezcla el vinagre, azúcar y sal, y añade al arroz caliente. Enfría abanicando.",
        "Corta el salmón en tiras largas de 1 cm de ancho.",
        "Corta el aguacate por la mitad, retira el hueso y corta en láminas finas.",
        "Coloca una hoja de nori en la esterilla de bambú, con el lado brillante hacia abajo.",
        "Extiende una capa fina de arroz sobre el alga, dejando un borde de 2 cm en la parte superior.",
        "Coloca tiras de salmón y aguacate en el centro del arroz.",
        "Enrolla firmemente y sella el borde con un poco de agua.",
        "Corta el rollo en 8 piezas iguales con un cuchillo afilado.",
        "Sirve con salsa de soja, wasabi y jengibre encurtido."
      ],
      prepTime: "30 minutos",
      cookTime: "20 minutos",
      servings: 4
    }
  },
  {
    id: 6,
    image: "/images/Smoothie de aguacate, arandanos, brambuesa y platano.jpg",
    alt: "Smoothie de aguacate, arandanos, brambuesa y platano",
    category: 'platos',
    recipe: {
      ingredients: [
        "1/2 aguacate Inca Fields maduro",
        "1 plátano maduro, preferiblemente congelado",
        "100g de arándanos frescos o congelados",
        "100g de frambuesas frescas o congeladas",
        "250ml de leche de almendras o coco",
        "1 cucharada de miel o jarabe de agave (opcional)",
        "1 cucharada de semillas de chía",
        "Hielo al gusto"
      ],
      instructions: [
        "Corta el aguacate por la mitad, retira el hueso y extrae la pulpa.",
        "Pela el plátano y córtalo en trozos.",
        "Coloca todos los ingredientes en una licuadora de alta potencia.",
        "Licúa hasta obtener una mezcla suave y homogénea.",
        "Si es necesario, ajusta la consistencia añadiendo más leche vegetal o hielo.",
        "Sirve inmediatamente en vasos altos.",
        "Decora con algunas frambuesas, arándanos y semillas de chía por encima."
      ],
      prepTime: "10 minutos",
      cookTime: "0 minutos",
      servings: 2
    }
  },
  {
    id: 7,
    image: "/images/Campos de aguacate.jpg",
    alt: "Campos de aguacate",
    category: 'cultivo'
  },
  {
    id: 8,
    image: "/images/Trabajador seleccionando los mejores aguacates.jpg",
    alt: "Trabajador seleccionando los mejores aguacates",
    category: 'cultivo'
  },
  {
    id: 9,
    image: "/images/Postre de mousse de chocolate con aguacate.jpg",
    alt: "Postre de mousse de chocolate con aguacate",
    category: 'platos',
    recipe: {
      ingredients: [
        "2 aguacates Inca Fields maduros",
        "200g de chocolate negro (70% cacao), derretido",
        "60ml de leche de coco",
        "3 cucharadas de cacao en polvo sin azúcar",
        "4 cucharadas de miel o jarabe de arce",
        "1 cucharadita de extracto de vainilla",
        "1 pizca de sal marina",
        "Frambuesas frescas y hojas de menta para decorar",
        "Virutas de chocolate para servir"
      ],
      instructions: [
        "Corta los aguacates por la mitad, retira los huesos y extrae la pulpa a un procesador de alimentos.",
        "Añade el chocolate derretido, la leche de coco, el cacao en polvo, la miel, la vainilla y la sal.",
        "Procesa hasta obtener una mezcla suave y homogénea, raspando los lados si es necesario.",
        "Prueba y ajusta el dulzor según tu preferencia.",
        "Divide la mousse en copas o vasos elegantes.",
        "Refrigera por al menos 2 horas hasta que esté firme.",
        "Antes de servir, decora con frambuesas frescas, hojas de menta y virutas de chocolate.",
        "Puedes añadir una pizca de chile en polvo para un toque inesperado de calor que realza el sabor del chocolate."
      ],
      prepTime: "15 minutos",
      cookTime: "0 minutos (plus 2 horas de refrigeración)",
      servings: 4
    }
  }
];

const GalleryImage = ({ 
  item, 
  index, 
  onClick 
}: { 
  item: GalleryItem; 
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.alt} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Image overlay with zoom icon on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
            <ZoomIn className="text-white" size={32} strokeWidth={1.5} />
          </div>
        </div>
      </div>
      
      {/* Category badge */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs tracking-wider text-[#2D5C34] uppercase rounded-full shadow-sm border border-[#C6A96C]/20">
        {item.category}
      </div>
      
      {/* Recipe indicator */}
      {item.recipe && (
        <div className="absolute bottom-4 right-4 bg-[#C6A96C]/90 backdrop-blur-sm p-2 rounded-full text-white shadow-md">
          <BookOpen size={16} />
        </div>
      )}
      
      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <h3 className="text-white font-display text-lg leading-tight text-shadow">
          {item.alt}
        </h3>
      </div>
    </motion.div>
  );
};

// Modal component for expanded view
const GalleryModal = ({ 
  item, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  item: GalleryItem | null; 
  onClose: () => void; 
  onPrev: () => void; 
  onNext: () => void;
}) => {
  if (!item) return null;
  
  const isFood = item.category === 'platos';

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-4 md:p-10 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A96C' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
    
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 text-white hover:text-[#C6A96C] z-20 transition-colors duration-300 bg-black/70 p-3 rounded-full shadow-lg"
        aria-label="Close modal"
      >
        <X size={28} />
      </button>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }} 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C6A96C] z-20 transition-colors duration-300 bg-black/70 p-2 rounded-full"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }} 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#C6A96C] z-20 transition-colors duration-300 bg-black/70 p-2 rounded-full"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      
      <div 
        className="bg-white/95 rounded-lg shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Image section */}
          <div className="lg:w-1/2 relative">
            <motion.img 
              src={item.image} 
              alt={item.alt} 
              className="w-full h-full object-cover object-center"
              style={{ maxHeight: '80vh' }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs tracking-wider text-[#2D5C34] uppercase rounded-full shadow-sm border border-[#C6A96C]/20">
              {item.category}
            </div>
          </div>
          
          {/* Content section */}
          <div className="lg:w-1/2 p-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-[#2D5C34] font-display text-3xl font-bold mb-4 border-b border-[#C6A96C]/30 pb-4">
                {item.alt}
              </h2>
              
              {isFood && item.recipe ? (
                <div className="space-y-6">
                  {/* Recipe header */}
                  <div className="flex flex-wrap gap-6 py-4 border-b border-[#C6A96C]/20">
                    <div className="flex items-center gap-2">
                      <Timer size={18} className="text-[#C6A96C]" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Tiempo Total</p>
                        <p className="text-sm font-medium">{item.recipe.prepTime} + {item.recipe.cookTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <ChefHat size={18} className="text-[#C6A96C]" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Dificultad</p>
                        <p className="text-sm font-medium">Media</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-[#C6A96C]" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Porciones</p>
                        <p className="text-sm font-medium">{item.recipe.servings}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-[#2D5C34] font-display text-xl font-bold mb-3 flex items-center">
                      <span className="inline-block w-8 h-[1px] bg-[#C6A96C] mr-3"></span>
                      Ingredientes
                    </h3>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                      {item.recipe.ingredients.map((ingredient, i) => (
                        <li key={i} className="text-gray-700">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Instructions */}
                  <div>
                    <h3 className="text-[#2D5C34] font-display text-xl font-bold mb-3 flex items-center">
                      <span className="inline-block w-8 h-[1px] bg-[#C6A96C] mr-3"></span>
                      Preparación
                    </h3>
                    <ol className="space-y-3 pl-2">
                      {item.recipe.instructions.map((instruction, i) => (
                        <li key={i} className="flex gap-3 text-gray-700">
                          <span className="bg-[#C6A96C] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  {/* Chef's note */}
                  <div className="bg-[#F9F6F0] p-4 rounded-lg border border-[#C6A96C]/20">
                    <p className="text-[#2D5C34] italic text-sm">
                      <span className="font-bold">Nota del Chef:</span> Los aguacates Inca Fields son perfectos para esta receta gracias a su textura cremosa y sabor excepcional. Para mejores resultados, utilice aguacates en su punto óptimo de maduración.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {item.category === 'cultivo' && "Nuestros campos están ubicados en los valles fértiles de la región andina, donde el clima excepcional y el suelo mineral crean las condiciones perfectas para cultivar aguacates de clase mundial con un sabor y textura incomparables."}
                  
                  {item.category === 'ingredientes' && "Nuestros aguacates Inca Fields son cosechados a mano en su punto óptimo de maduración para garantizar la mejor calidad. Cada aguacate pasa por un riguroso proceso de selección realizado por expertos agricultores que han perfeccionado este arte por generaciones."}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  
  // Actualizar el estado del modal cuando cambia selectedItem
  useEffect(() => {
    // Si hay un item seleccionado, el modal está abierto
    setModalOpen(selectedItem !== null);
  }, [selectedItem]);

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'todos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Handle modal navigation
  const handlePrev = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  const handleNext = () => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedItem(null);
  };

  // Category button component
  const CategoryButton = ({ name, label }: { name: string; label: string }) => (
    <button
      onClick={() => setSelectedCategory(name)}
      className={`transition-all duration-300 px-6 py-2 text-xs uppercase tracking-wider border ${
        selectedCategory === name
          ? 'bg-[#2D5C34] text-white border-[#2D5C34]'
          : 'bg-transparent text-[#2D5C34] border-[#2D5C34]/30 hover:border-[#2D5C34]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="gallery" className="py-28 bg-white relative" ref={ref}>
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[#F9F6F0] opacity-20 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C6A96C' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center mb-4">
              <div className="h-[1px] w-10 bg-[#C6A96C] mr-3"></div>
              <span className="text-[#2D5C34] text-sm tracking-[0.2em] uppercase font-light">Creaciones Culinarias</span>
              <div className="h-[1px] w-10 bg-[#C6A96C] ml-3"></div>
            </div>
            
            <h2 className="text-[#2D5C34] font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Galería <span className="text-[#C6A96C]">Gourmet</span>
            </h2>
            
            <p className="text-gray-600 font-body text-lg max-w-2xl mx-auto mb-10">
              Descubre la versatilidad de nuestros aguacates en creaciones culinarias espectaculares
              y el proceso de cultivo que los hace únicos.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <CategoryButton name="todos" label="Todos" />
              <CategoryButton name="platos" label="Platos" />
              <CategoryButton name="ingredientes" label="Ingredientes" />
              <CategoryButton name="cultivo" label="Cultivo" />
            </div>
          </motion.div>
          
          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <GalleryImage 
                key={item.id} 
                item={item} 
                index={index} 
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
          
          {/* Modal gallery */}
          {selectedItem && (
            <GalleryModal 
              item={selectedItem} 
              onClose={closeModal}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          )}
          
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a
              href="https://www.instagram.com/incafields"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-button-gold inline-flex items-center gap-2"
            >
              <span>Síguenos en Instagram</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
