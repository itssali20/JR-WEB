import React from "react";

const AboutSection = () => {
  return (
    <section className="bg-white px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Top Label */}
        <p className="text-orange-500 font-medium mb-2">{`{ Who We Are }`}</p>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-12">
          WE ARE LEADING DIGITAL MARKETING AGENCY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Image Block */}
          <div className="relative">
            <img
              src="https://www.hellobackgrounds.com/assets/img/previews/hb-workspace-0016.jpg"
              alt="Office workspace"
              className="w-full rounded-[30px] shadow-lg object-cover"
            />

            {/* Floating Circle Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-full shadow-md flex flex-col items-center justify-center text-center w-28 h-28">
              <div className="text-orange-500 text-sm font-semibold uppercase">
                Create
              </div>
              <div className="w-10 h-[1px] bg-gray-300 my-1"></div>
              <div className="text-gray-600 text-[11px] leading-tight">
                Idea • Insight <br /> Solution
              </div>
            </div>
          </div>

          {/* Right Side Text & Small Image */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Our story
              </h3>
              <p className="text-gray-600 leading-relaxed">
                At <span className="font-semibold">BrightEdge Studio</span>, we
                specialize in crafting custom web solutions, including branding,
                web design, development, and marketing, tailored to meet your
                business needs.
              </p>
            </div>

            <img
              src="https://www.shutterstock.com/image-photo/high-angle-view-software-developer-600nw-2218017813.jpg"
              alt="Developer working"
              className="rounded-3xl shadow-lg w-full object-cover"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              10<span className="text-orange-500">+</span>
            </h3>
            <p className="text-gray-600 mt-2">Years Experience</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              500<span className="text-orange-500">+</span>
            </h3>
            <p className="text-gray-600 mt-2">Projects Done</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              140<span className="text-orange-500">+</span>
            </h3>
            <p className="text-gray-600 mt-2">Happy Clients</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-gray-900">
              98<span className="text-orange-500">%</span>
            </h3>
            <p className="text-gray-600 mt-2">Satisfied Clients</p>
          </div>
        </div>

        {/* Company Logos Section */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
            We work with the world's top companies
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-10 opacity-80">
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=logoipsum" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=LOGOIPSUM" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=IPSUM" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=LOGO" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=LIP" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=LOGOIPSUM" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=LOGO" alt="Logo" className="h-8 md:h-10" />
            <img src="https://dummyimage.com/120x50/ccc/000.png&text=IPSUM" alt="Logo" className="h-8 md:h-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
