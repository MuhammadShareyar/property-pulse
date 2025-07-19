import Image from "next/image";

const PropertyImages = ({images}) => {
  return (
    <section class="bg-blue-50 p-4">
      <div class="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            width={1800}
            height={400}
            priority={true}
            className="object-cover h-[400px] w-full rounded-xl cursor-pointer"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div className={`${images.length === 3 && index===2 ? "col-span-2" : "col-span-1"}`} key={index}>
                <Image
                  src={image}
                  alt=""
                  width={1800}
                  height={400}
                  class="object-cover h-[400px] w-full rounded-xl cursor-pointer"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
