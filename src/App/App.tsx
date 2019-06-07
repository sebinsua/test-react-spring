import React, { useState, useCallback } from 'react';
import { Animated } from 'react-native';
import { useTransition } from 'react-spring/native';

import { Container, AnimatedPage, Title } from './styles';

const pages = [
  ({ style }) => (
    <AnimatedPage style={{ ...style, backgroundColor: 'red' }}>
      <Title>A</Title>
    </AnimatedPage>
  ),
  ({ style }) => (
    <AnimatedPage style={{ ...style, backgroundColor: 'green' }}>
      <Title>B</Title>
    </AnimatedPage>
  ),
  ({ style }) => (
    <AnimatedPage style={{ ...style, backgroundColor: 'blue' }}>
      <Title>C</Title>
    </AnimatedPage>
  ),
];

export const App = () => {
  const [index, set] = useState(0);
  const onTouchStart = useCallback(() => set(state => (state + 1) % 3), []);
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: [{ translateX: 0 }] },
    enter: { opacity: 1, transform: [{ translateX: 50 }] },
    leave: { opacity: 0, transform: [{ translateX: 250 }] },
  });

  return (
    <Container onTouchStart={onTouchStart}>
      {transitions.map(({ key, item, props: { opacity, transform } }) => {
        const Page = pages[item];
        return <Page key={key} style={{ opacity, transform }} />;
      })}
    </Container>
  );
};
