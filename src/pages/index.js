import Image from "next/image";
import Blogs from "@/components/blogs";
import AppliedJobs from "@/components/AppliedJobs";
import Footer from "@/components/Footer";  // Assuming you have a Footer component

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex column layout for vertical stacking */}
      <div className="flex flex-grow p-4"> {/* Use flex-grow to ensure the content takes up remaining space */}
        <div className="w-1/4 p-4">
          <AppliedJobs />
        </div>

        <div className="w-3/4 p-4">
          <Blogs />
        </div>
      </div>
    </div>
  );
}
