import React from "react";
import asfahan from "../assets/images/team/1.jpg";
import asmar from "../assets/images/team/asmar.jpg";
import jahangirt from "../assets/images/team/jahangirt.jpg";
import Rashed from "../assets/images/team/Rashed.jpg";

export default function TeamSection() {
  const team = [
    {
      name: "Jahangir Khan",
      role: "Chief Executive Officer",
      image: jahangirt,
    },
    {
      name: "Asfahan Ahmed",
      role: "Marketing Director",
      image: asfahan,
    },
    {
      name: "Rashed Khan",
      role: "Project Manager",
      image: Rashed,
    },
    {
      name: "Asmar Ali",
      role: "Chief Finance Officer",
      image: asmar,
    }
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-16 lg:px-24">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold md:font-extrabold lg:font-extrabold text-gray-900 leading-tight">
          DEDICATED DIGITAL EXPERTS AT YOUR SERVICE
        </h2>
      </div>

      {/* Team Grid - Single Row (horizontally scrollable on small/medium, grid on large) */}
      <div
        className="max-w-6xl mx-auto flex flex-nowrap gap-6 overflow-x-auto px-2 sm:px-6 snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible"
        role="list"
        aria-label="Team members"
      >
        {team.map((member, i) => (
          <div
            key={i}
            role="listitem"
            tabIndex={0}
            className="flex-none w-64 sm:w-72 md:w-80 lg:w-auto snap-center flex flex-col items-center text-center"
          >
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