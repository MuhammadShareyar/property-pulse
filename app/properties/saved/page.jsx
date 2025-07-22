import connectDB from "@/config/database";
import getSessionUser from "@/utils/getSessionUser";
import PropertyCard from "@/components/PropertyCard";
import User from "@/models/User";

const SavedPropertiesPage = async () => {
  const { userId } = await getSessionUser();

  const { bookmarks } = await User.findById(userId).populate("bookmarks");

  await connectDB();

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <p className="text-gray-500">You have no saved properties.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) }
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
