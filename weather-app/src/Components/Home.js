import React from "react";

const Home = () => {
  const api = {
    key: "143d8b76759d409186be983f59e673a1",
    url: "https://api.openweathermap.org/data/2.5/",
  };

  return (
    <main>
      <div>
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>
    </main>
  );
};

export default Home;
