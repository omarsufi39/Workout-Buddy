import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

function WorkoutDetails(props) {
  const workout = props.workout;

  async function handleDelete(e) {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        body: JSON.stringify(workout),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      console.log("Something went wrong");
    }

    if (response.ok) {
      console.log("Workout deleted");
      console.log(workout._id);
    }
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <button onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 
          0116.138 21H7.862a2 2 0 01-1.995-1.858L5 
          7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 
          00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}

export default WorkoutDetails;
