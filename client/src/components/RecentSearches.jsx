import React, { useEffect, useState } from "react";
import { Card, List } from "semantic-ui-react";

const RecentSearches = () => {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    // A function to fetch the list of students that will be load anytime that list change
    fetch("http://localhost:8080/api/history")
      .then((response) => response.json())
      .then((history) => {
        setHistory(history);
      });
  };

  useEffect(() => {
    loadHistory();
  }, [history]);

  return (
    <Card>
      <Card.Content>
        <Card.Header>Search History</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
            <List>
                <List.Item>{history.search}</List.Item>
            </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default RecentSearches;
