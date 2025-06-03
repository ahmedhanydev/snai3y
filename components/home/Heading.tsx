import Image from "next/image";
import Link from "next/link";

export const Heading = () => {
  return (
    <div className="w-full h-[90vh] bg-blue-100 flex ">
      <div className="w-1/2 h-full hidden md:flex">
        <Image
          src="/images/carpentry.jpg"
          alt="Craftsmen team"
          width={500}
          height={500}
          className=" w-full h-full object-cover object-top"
        />
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center ">
        <h1 className="text-4xl  text-center md:text-5xl font-bold mb-4 ">
          ابحث عن أفضل الصنايعية بالقرب منك
        </h1>
        <p className="text-lg text-center  mb-8">
          الكهربائيين والسباكين والنجارين والمزيد - كلهم ​​في مكان واحد.
        </p>
        <Link
          href="/request"
          className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-medium !rounded-button whitespace-nowrap cursor-pointer"
        >
          طلب خدمة
        </Link>
      </div>
    </div>
  );
};
