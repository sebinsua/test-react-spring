import React, { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useTransition } from 'react-spring/native';

import { Container, AnimatedPage, Title } from './styles';

const pages = [
  ({ style }) => (
    <AnimatedPage style={{ ...style, backgroundColor: 'red' }}>
      <Title>R</Title>
    </AnimatedPage>
  ),
  ({ style }) => (
    <AnimatedPage style={{ ...style, backgroundColor: 'green' }}>
      <Title>G</Title>
    </AnimatedPage>
  ),
  ({ style }) => (
    <AnimatedPage style={{ ...style, backgroundColor: 'blue' }}>
      <Title>B</Title>
    </AnimatedPage>
  ),
];

export const App = () => {
  const [index, set] = useState(0);
  const onTouchStart = useCallback(() => set(state => (state + 1) % 3), []);

  const { width } = Dimensions.get('window');
  const transitions = useTransition(index, p => p, {
    intitial: { opacity: 1, translateX: 0 * width },
    from: { opacity: 0.5, translateX: -1 * width },
    enter: { opacity: 1, translateX: 0 * width },
    leave: { opacity: 0.5, translateX: 1 * width },
  });

  return (
    <Container onTouchStart={onTouchStart}>
      {transitions.map(({ key, item, props: { opacity, translateX } }) => {
        const Page = pages[item];
        return (
          <Page key={key} style={{ opacity, transform: [{ translateX }] }} />
        );
      })}
    </Container>
  );
};
