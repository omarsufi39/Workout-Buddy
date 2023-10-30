import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

// Components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import LoginButton from "../components/LoginButton";

function Home() {
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    try {
      console.log("fetching data");

      if (isAuthenticated) {
        async function fetchWorkouts() {
          const response = await fetch(
            "https://workoutbuddy-q3zw.onrender.com/api/workouts/" +
              user.sub.split("|")[1]
          );
          const json = await response.json();
          if (response.ok) {
            setWorkouts(json);
          }
        }
        fetchWorkouts();
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [workouts, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div>
        {console.log(isAuthenticated)}
        <h1>You are not authenticated please log in</h1>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    isAuthenticated && (
      <div className="Home">
        <h3 className="welcome-back-banner">Welcome back {user.name}</h3>
        <div className="workouts">
          {workouts &&
            workouts.map((element) => (
              <WorkoutDetails key={element._id} workout={element} />
            ))}
        </div>
        <WorkoutForm />
      </div>
    )
  );
}

export default Home;
