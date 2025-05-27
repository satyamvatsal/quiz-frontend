const TechStacks = () => {
  const techStack = [
    {
      component: "Frontend",
      technology: "React.js + Vite + Tailwind CSS",
      description:
        "Built with React.js and Vite for fast development and hot reload. React’s component-based structure (e.g., Timer, QuestionCard) keeps UI logic modular. Tailwind CSS enables rapid, responsive styling using utility classes. Context APIs manage global states like authentication and sockets, improving code clarity and maintainability.",
    },
    {
      component: "Backend",
      technology: "Node.js + Express.js + WebSocket + JWT",
      description:
        "Uses Node.js and Express.js to handle APIs and business logic with middleware for CORS and JWT auth. WebSocket supports real-time interactions during live quizzes. JWT ensures secure, stateless user authentication for scalable session handling.",
    },
    {
      component: "Real-Time Communication",
      technology: "Socket.IO + JWT",
      description:
        "Socket.IO enables real-time, bidirectional communication to sync quiz questions and user responses. It handles auto-reconnection and event-based messaging. Each connection is authenticated using JWT to ensure secure access before joining a game session.",
    },
    {
      component: "Database",
      technology: "PostgreSQL",
      description:
        "Strong ACID compliance. Support for complex queries and relations (users ↔ quiz_reponses ↔ questions). Stores quiz questions, user responses, etc with robust query support.",
    },
    {
      component: "Question Broadcasting",
      technology: "Redis Pub-Sub",
      description:
        "Enables efficient broadcasting of quiz questions across multiple servers in real time for scaliability.",
    },
    {
      component: "User Response Handling",
      technology: "Redis Queue",
      description:
        "Since database can be slow to process user responses in real time, we have used redis queue to handle responses. This ensures that each response get stored in db without getting lost.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-2 sm:px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl m-10  font-bold text-center text-yellow-200">
          Quiz App Tech Stack Overview
        </h1>
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-[#0f172a] text-white border border-gray-700">
            <thead className="bg-[#1e293b] text-white">
              <tr>
                <th className="py-3 px-5 text-left border-b border-gray-600">
                  Component
                </th>
                <th className="py-3 px-5 text-left border-b border-gray-600">
                  Technology
                </th>
                <th className="py-3 px-5 text-left border-b border-gray-600">
                  Description / Role
                </th>
              </tr>
            </thead>
            <tbody>
              {techStack.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#334155] transition-colors duration-200"
                >
                  <td className="py-4 px-5 border-b border-gray-700">
                    {item.component}
                  </td>
                  <td className="py-4 px-5 border-b border-gray-700 text-yellow-200">
                    {item.technology}
                  </td>
                  <td className="py-4 px-5 border-b border-gray-700">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-white m-10 text-center text-lg italic">
            Built with ❤️ by{" "}
            <span className="font-semibold">Team Vision CSE</span> to bring
            real-time quiz battles to life.
          </div>
        </div>
      </div>
    </div>
  );
};
export default TechStacks;
