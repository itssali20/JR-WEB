import React from "react";

export default function TeamSection() {
  const team = [
    {
      name: "Michael Rivera",
      role: "Brand Strategist",
      image: "https://img.freepik.com/free-photo/portrait-adult-male-smiling_23-2148729648.jpg",
    },
    {
      name: "Emily Carter",
      role: "Creative Director",
      image: "https://img.freepik.com/free-photo/blue-eyed-business-woman-white-blouse-standing-confident-pose-with-her-international-co-workers-indoor-portrait-asian-african-employees-with-blonde-lady_197531-3756.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Sarah Johnson",
      role: "Web Designer",
      image: "https://plus.unsplash.com/premium_photo-1661593195372-874ca9d29713?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhbSUyMG1lbWJlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "David Lee",
      role: "UI/UX Designer",
      image: "https://img.freepik.com/free-photo/young-adult-pressing-buzzer-button_23-2149586556.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Rachel Kim",
      role: "Frontend Developer",
      image: "https://thumbs.dreamstime.com/b/happy-professional-bank-manager-consulting-client-office-corporate-meeting-mature-business-woman-lawyer-finances-management-381281281.jpg",
    },
    {
      name: "Alex Moore",
      role: "Photographer",
      image: "https://img.freepik.com/free-photo/front-view-smiley-man-outdoors_23-2149915911.jpg",
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <p className="text-orange-600 font-semibold mb-2">{`{ Meet Our Team }`}</p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          DEDICATED DIGITAL EXPERTS AT YOUR SERVICE
        </h2>
      </div>

      {/* Team Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {team.map((member, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="w-full aspect-[4/5] overflow-hidden rounded-[2.5rem] relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-[2.5rem] [clip-path:polygon(0_0,100%_0,100%_85%,85%_100%,0_100%)]"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-5">
              {member.name}
            </h3>
            <p className="text-gray-600 text-base">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
