import React, { useState } from "react";
import axios from 'axios';

function FetchWordDefinition() {
  const [word, setWord] = useState("digital");
  const [definition, setDefinition] = useState("");

  const fetchDefinition = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const meanings = response.data[0].meanings
        .map((meaning) => meaning.definitions[0].definition)
        .join("; ");
      setDefinition(meanings);
    } catch (e) {
      console.error("Error fetching definition:", error);
    }
    // .then((genericResponse) => genericResponse.json())
    // .then((data) => {
    //   const meanings = data[0].meanings
    //     .map((meaning) => meaning.definitions[0].definition)
    //     .join("; ");
    //   setDefinition(meanings);
    // })
    // .catch((error) => console.error("Error fetching definition:", error));
  };

  return (
    <div>
      <h2>Word Definition</h2>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={fetchDefinition}>Fetch Definition</button>
      {definition ? <p>{definition}</p> : <p>Loading...</p>}
    </div>
  );
}

export default FetchWordDefinition;
