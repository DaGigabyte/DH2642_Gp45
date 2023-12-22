// Team profile pic
import Jasper from "../assets/team/jasper.png";
import Zia from "../assets/team/zia-mohseni.png";

// Team members array
const teamMembers = [
  {
    id: 1,
    name: "Emanuel Wilches",
    role: "Back-end Developer",
    image: "https://avatars.githubusercontent.com/u/57797989?v=4",
    about: "",
  },
  {
    id: 2,
    name: "Jasper",
    role: "Back-end Developer",
    image: Jasper,
    about:
      "I like learning new programming languages and collaborating with other bright minds. It has been so much fun studying this course as an exchange student.",
  },
  {
    id: 3,
    name: "Pontus Morin",
    role: "Front-end Developer",
    image: "https://avatars.githubusercontent.com/u/57797989?v=4",
    about: "",
  },
  {
    id: 4,
    name: "Zia Mohseni",
    role: "Front-end Developer",
    image: Zia,
    about:
      "I am a student at KTH, studying Computer Science. I am a passionate full stack web developer who loves simplicity in things and crafts beautiful user interfaces with love.",
  },
];

function AboutUs() {
  return (
    <div className="flex flex-col space-y-10 md:space-y-20 md:pt-10 max-w-6xl">
      {/* About the team */}
      <div className="flex flex-col items-center space-y-10">
        <h1>About The Team</h1>
        <p className="text-lg px-5">
          Welcome! We are four Computer Science students from KTH University
          working on an exciting project for our course, "DH2642 HT23
          Interaction Programming and the Dynamic Web (iprogdh)." Our goal is to
          create an advanced website that connects with other online services
          using APIs, a cornerstone in modern web development. We're focusing on
          using Firebase to store our website's information safely and
          efficiently. This project is all about combining our classroom
          learning with real-world web development, making a website that's not
          only functional but also engaging. Join us on this journey as we
          explore the world of web development and bring our classroom theories
          to life!
        </p>
      </div>
      {/* Meet the team */}
      <div className="flex flex-col items-center space-y-10">
        <h1>Meet The Team!</h1>
        <div className="flex flex-wrap justify-center">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center relative  bg-white p-3 rounded-lg mb-10 mr-10 cursor-pointer"
            >
              <img
                className="rounded-full w-48 h-48"
                src={member.image}
                alt={member.name}
              />
              <h2 className="text-lg mb-1">{member.name}</h2>
              <p className="text-lg mb-1">{member.role}</p>
              {/* About member show on hover */}
              <div className="absolute inset-1 p-2 bg-white/90 rounded-lg opacity-0 hover:opacity-100 transition duration-500 ease-in-out">
                <p className="text-lg">
                  {member.about ? member.about : "No bio"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
