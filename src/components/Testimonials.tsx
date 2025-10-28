import { useState } from "react";
import { X } from "lucide-react";

const reviewImages = [
  "/reviews/IMG_2509.jpg",
  "/reviews/IMG_4461.jpg",
  "/reviews/IMG_4462.jpg",
  "/reviews/IMG_4501.jpg",
  "/reviews/IMG_4512.jpg",
  "/reviews/IMG_4521.jpg",
  "/reviews/IMG_4528.jpg",
  "/reviews/IMG_4582.jpg",
  "/reviews/IMG_4591.jpg",
  "/reviews/IMG_4594.jpg",
  "/reviews/IMG_4624 2.jpg",
  "/reviews/IMG_4628.jpg",
  "/reviews/IMG_4630 2.jpg",
  "/reviews/IMG_4656 2.jpg",
  "/reviews/IMG_4657 2.jpg",
  "/reviews/IMG_4662.jpg",
  "/reviews/IMG_4693.jpg",
  "/reviews/IMG_4716.jpg",
  "/reviews/IMG_4739.jpg",
  "/reviews/IMG_4747.jpg",
  "/reviews/IMG_4826.jpg",
  "/reviews/IMG_4891 2.jpg",
  "/reviews/IMG_4902.jpg",
  "/reviews/IMG_4972.jpg",
  "/reviews/IMG_5010.jpg",
  "/reviews/IMG_5029.jpg",
  "/reviews/IMG_5031.jpg",
  "/reviews/IMG_5105.jpg",
  "/reviews/IMG_5121.jpg",
  "/reviews/IMG_5158.jpg",
  "/reviews/IMG_5162.jpg",
];

const Testimonials = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/30" dir="rtl">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            آراء زبناءنا 💬
          </h2>
          <p className="text-xl text-muted-foreground">
            تجارب حقيقية من عملائنا المميزين
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {reviewImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover-lift cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`تقييم العميل ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold text-lg">انقر لتكبير الصورة</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Review"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Testimonials;
