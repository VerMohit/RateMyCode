import '@mantine/core/styles.css';

import { Container, MantineProvider, Title } from '@mantine/core';
import MainSource from './components/MainSource';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <MainSource />
    </MantineProvider>
  );
}
