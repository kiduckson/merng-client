import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  return (
    <Grid stackable columns={2}>
      {user && (
        <Grid.Row verticalAlign="middle" centered>
          <Grid.Column textAlign="center">
            <PostForm />
          </Grid.Column>
        </Grid.Row>
      )}
      <Grid.Row className="page-title" centered style={{ padding: "10px" }}>
        <h1>최근 포스팅</h1>
      </Grid.Row>
      {loading ? (
        <h1>Loading posts..</h1>
      ) : (
        <Transition.Group>
          {posts &&
            posts.map(post => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} tablet={1} />
              </Grid.Column>
            ))}
        </Transition.Group>
      )}
      <Grid.Row></Grid.Row>
    </Grid>
  );
}

export default Home;
