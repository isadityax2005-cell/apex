import { useState } from 'react';

const properties = [
  {
    id: 'bandra',
    title: 'Bandra Luxury Villa',
    type: 'Villa',
    price: '$4,200,000',
    specs: '6 Beds · 7 Baths · 8,500 sqft',
    image: '/properties/bandra_ext.jpg',
  },
  {
    id: 'juhu',
    title: 'Juhu Beachfront Mansion',
    type: 'Mansion',
    price: '$8,500,000',
    specs: '8 Beds · 10 Baths · 12,000 sqft',
    image: '/properties/juhu_ext.jpg',
  },
  {
    id: 'worli',
    title: 'Worli Sea Face Penthouse',
    type: 'Penthouse',
    price: '$5,900,000',
    specs: '4 Beds · 5 Baths · 6,200 sqft',
    image: '/properties/worli_ext.jpg',
  }
];

export default function PropertyListing() {
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);

  return (
    <section className="relative w-full z-20 bg-black/80 backdrop-blur-xl min-h-screen pt-32 pb-24 px-8 md:px-16 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">Exclusive Listings</h2>
        <p className="text-white/50 mb-16 font-mono text-sm uppercase tracking-widest">Mumbai, Maharashtra</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((prop) => (
            <div 
              key={prop.id}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-colors bg-white/5"
              onClick={() => setSelectedProperty(prop)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                {/* Fallback gradient if image fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 -z-10" />
                <img 
                  src={prop.image} 
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white/60 font-mono text-xs uppercase tracking-widest mb-2">{prop.type}</p>
                <h3 className="text-2xl font-medium mb-1">{prop.title}</h3>
                <p className="text-xl font-light text-white/90 mb-4">{prop.price}</p>
                
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-sm text-white/50 border-t border-white/20 pt-4 mt-2">
                    {prop.specs}
                  </p>
                  <button className="mt-6 w-full py-3 bg-white text-black font-medium text-sm rounded-lg hover:bg-zinc-200 transition-colors">
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basic Modal for Gallery (Expandable later) */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex flex-col pt-24 px-8 overflow-y-auto">
          <button 
            onClick={() => setSelectedProperty(null)}
            className="absolute top-8 right-8 text-white/50 hover:text-white font-mono text-sm tracking-widest uppercase transition-colors"
          >
            [ Close ]
          </button>
          
          <div className="max-w-5xl mx-auto w-full mb-24">
            <h2 className="text-4xl md:text-6xl font-medium mb-4">{selectedProperty.title}</h2>
            <p className="text-white/50 font-mono text-sm tracking-widest mb-12">{selectedProperty.specs}</p>
            
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10 mb-8">
              <img src={selectedProperty.image} alt="Exterior" className="w-full h-full object-cover" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Interior */}
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group relative">
                <img src={`/properties/${selectedProperty.id}_int.jpg`} alt="Interior" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-mono text-xs uppercase tracking-widest">Interior</span>
                </div>
              </div>
              
              {/* Kitchen */}
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group relative">
                <img src={`/properties/${selectedProperty.id}_kit.jpg`} alt="Kitchen" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-mono text-xs uppercase tracking-widest">Kitchen</span>
                </div>
              </div>

              {/* Bathroom */}
              <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/10 group relative">
                <img src={`/properties/${selectedProperty.id}_bath.jpg`} alt="Bathroom" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-mono text-xs uppercase tracking-widest">Bathroom</span>
                </div>
              </div>
              
              {/* Locked Amenities */}
              <div className="aspect-square rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white/30 font-mono text-xs uppercase overflow-hidden cursor-not-allowed">
                Amenities (Locked)
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
