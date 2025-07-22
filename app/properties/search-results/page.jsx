import Link from "next/link";
import PropertySearchForm from "@/components/PropertySearchForm";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();

  const locationPattern = new RegExp(location, "i");

  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { "location.street": locationPattern },
      { "location.city": locationPattern },
      { "location.state": locationPattern },
      { "location.zipcode": locationPattern },
    ],
  };

  if (propertyType && propertyType !== "All") {
    const propertyTypePattern = new RegExp(propertyType, "i");
    query.type = propertyTypePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();

  const properties = convertToSerializeableObject(propertiesQueryResults);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-7xl mx-auto px-4 flex flex-col items-start sm:px6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="container-xl lg:container m-auto px-4 py-6">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <FaArrowAltCircleLeft className="mr-2" />
          Back to Properties
        </Link>

        <h1 className="text-2xl mb-4">Search Results</h1>

        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default SearchResultPage;
