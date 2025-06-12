
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageModal from './ImageModal';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  location: string;
}

const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749724867/avenue_of_the_baobabs-madagascar_k0msxy.png",
      title: "Avenue of the Baobabs",
      description: "Madagascar's most iconic landscape featuring ancient baobab trees silhouetted against golden sunsets.",
      location: "Morondava"
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749724923/Twalo-Voyage-en-Afrique-Madagasc_otmqcz.png",
      title: "Andasibe-Mantadia",
      description: "Mystical rainforest home to the largest lemur species and incredible biodiversity.",
      location: "Eastern Madagascar"
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749724721/Tsingy-of-Bemaraha-Madagascar-c-Yann-Arthus-Bertrand_bsmruo.jpg",
      title: "Tsingy de Bemaraha",
      description: "Otherworldly limestone formations creating a stone forest of razor-sharp pinnacles.",
      location: "Bemaraha"
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749724986/GettyImages-804605482-5c8b6caa46e0fb000177002c_ooxg7q.jpg",
      title: "Amber Mountain",
      description: "Lush montane rainforest with cascading waterfalls and endemic wildlife.",
      location: "Northern Madagascar"
    },
    {
      id: 5,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749725031/403719-300_mfdb2t.jpg",
      title: "Isalo National Park",
      description: "Dramatic sandstone formations and deep canyons carved by millions of years of erosion.",
      location: "Central Madagascar"
    },
    {
      id: 6,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749725060/the-beautiful-islands-of-madagascar-nosy-iranja-near-nosy-be.692e04b4_b3zyuq.jpg",
      title: "Nosy Be Beaches",
      description: "Pristine tropical beaches with crystal-clear waters and vibrant coral reefs.",
      location: "Nosy Be"
    },
    {
      id: 7,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749725152/240516186_k888zr.jpg",
      title: "Morondava Beach",
      description: "Stunning coastal views where desert meets the ocean in perfect harmony.",
      location: "Morondava"
    },
    {
      id: 8,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749725089/Parc-national-Ankarafantsika_urpxu1.jpg",
      title: "Ankarafantsika",
      description: "Dense tropical forest reserve known for its diverse bird species and pristine lakes.",
      location: "Northwestern Madagascar"
    },
    {
      id: 9,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749724930/Masoala-National-Park-Madagascar_vs4tgo.jpg",
      title: "Masoala Peninsula",
      description: "Remote rainforest peninsula offering untouched wilderness and marine sanctuaries.",
      location: "Northeastern Madagascar"
    },
    {
      id: 10,
      src: "https://res.cloudinary.com/diarbmabn/image/upload/v1749725179/1259508_w-3840_h-2160_q-70_m-crop_fsuewa.jpg",
      title: "Ranomafana",
      description: "Mountainous rainforest with hot springs and rare golden bamboo lemurs.",
      location: "Southeastern Madagascar"
    }
  ];

  const visibleImages = images.slice(0, visibleCount);
  const hasMoreImages = visibleCount < images.length;

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 6, images.length));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <section id="gallery" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Gallery
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Journey through Madagascar's breathtaking landscapes, from ancient baobab forests 
              to pristine beaches and mystical stone forests.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {visibleImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image)}
                initial={index >= 6 ? { opacity: 0, y: 50 } : false}
                animate={index >= 6 ? { opacity: 1, y: 0 } : {}}
                transition={index >= 6 ? { duration: 0.6, delay: (index - 6) * 0.1 } : {}}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <img
                    src={image.src}
                    alt={image.title}
                    loading="lazy"
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="h-5 w-5" />
                        <span className="text-sm font-medium">View Details</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-b-2xl -mt-4 relative z-10 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {image.title}
                  </h3>
                  <div className="flex items-center text-orange-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{image.location}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {hasMoreImages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-12"
            >
              <Button
                onClick={loadMoreImages}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                See More
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default ImageGallery;
