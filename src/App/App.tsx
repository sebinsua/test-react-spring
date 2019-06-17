import React, { useState, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useTransition, config } from 'react-spring/native';

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
    intitial: { translateX: 0 * width },
    from: { translateX: -1 * width },
    enter: { translateX: 0 * width },
    leave: { translateX: 1 * width },
    config: (_, phase) => {
      switch (phase) {
        default:
          return { friction: 20, tension: 120 };
        case 'leave':
          return config.molasses;
      }
    },
  });
  return (
    <Container onTouchStart={onTouchStart}>
      {transitions.map(({ key, item, props: { translateX } }) => {
        const Page = pages[item];
        return <Page key={key} style={{ transform: [{ translateX }] }} />;
      })}
    </Container>
  );
};
