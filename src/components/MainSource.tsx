import React from 'react';
import { Container, Title } from '@mantine/core';
import { AllPosts } from './AllPosts';

export default function MainSource() {
  return (
    <Container>
      <Title>This is the home page we will be using!</Title>
      <AllPosts />
      <p>Note that all other components must be nested within the MantineProvider component!</p>
    </Container>
  );
}
