import React, { useState, useEffect } from "react";
import "./App.scss";
import Navigation from "../components/Navigation/Navigation";

import axios from "axios";
import { Container, List } from "semantic-ui-react";

const App: React.FC = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then(response => setActivities(response.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Container className="Container">
        <List>
          {activities.map(({ id, title }) => (
            <List.Item key={id}>{title}</List.Item>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default App;
