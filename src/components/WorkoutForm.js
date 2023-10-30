import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function WorkoutForm() {
  const { user } = useAuth0();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    let userId = user.sub;

    const workout = { title, load, reps, userId };

    const response = await fetch(
      "https://workoutbuddy-api-0ncp.onrender.com/api/workouts/",
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      console.log(
        `title=${workout.title}loads=${workout.load} reps=${workout.reps}`
      );
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New workout added", json);
    }
  }

  return (
    <div className="workout-form">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />

        <button>Add Workout</button>
        {error && <div className="error error-message-box">{error}</div>}
      </form>
    </div>
  );
}

export default WorkoutForm;
