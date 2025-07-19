import Image from 'next/image';

const PropertyHeaderImage = ({image}) => {
  return (
    <section>
      <div class="container-xl m-auto">
        <div class="grid grid-cols-1">
          <Image
            src={`/images/properties/${image}`}
            alt=""
            width="0"
            height="0"
            sizes="100vw"
            class="object-cover h-[400px] w-full"
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyHeaderImage