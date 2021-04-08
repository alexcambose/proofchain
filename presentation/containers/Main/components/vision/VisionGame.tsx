import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  VisionGameContainer,
  VisionGameIndicator,
  VisionGameIndicatorContainer,
  VisionGameItems,
  VisionGameItemsContainer,
  VisionGameOptionItem,
  VisionGameOptions,
} from './VisionGame.styled';

interface IVisionGameProps {}

const VisionGame: React.FunctionComponent<IVisionGameProps> = (props) => {
  const visionGameIndicator = useRef();
  const visionGameItemFirst = useRef();
  const visionGameItemLast = useRef();
  const visionGameItem1 = useRef();
  const visionGameItem2 = useRef();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollHandler = () => {
    const $visionGameIndicator = visionGameIndicator.current;
    const $visionGameItemFirst = visionGameItemFirst.current;
    const $visionGameItemLast = visionGameItemLast.current;
    const $visionGameItem1 = visionGameItem1.current;
    const $visionGameItem2 = visionGameItem2.current;
    // @ts-ignore
    const { top } = $visionGameItemFirst.getBoundingClientRect();
    // @ts-ignore
    const { top: bottom } = $visionGameItemLast.getBoundingClientRect();
    // let newValue = Math.floor((window.innerHeight / 1.5 - top) / 2.9);
    let newValue = Math.floor(window.innerHeight / 2 - top);
    newValue = Math.max($visionGameItemFirst.offsetTop, newValue);
    newValue = Math.min($visionGameItemLast.offsetTop, newValue);
    $visionGameIndicator.style.marginTop = newValue + 'px';

    // enable item
    const items = [
      $visionGameItemFirst,
      $visionGameItem1,
      $visionGameItem2,
      $visionGameItemLast,
    ];
    let minItem = 0,
      minDistance = Infinity;
    for (let i = 0; i < items.length; i++) {
      const distance = Math.abs(
        $visionGameIndicator.offsetTop - items[i].offsetTop
      );
      if (distance < minDistance) {
        minDistance = distance;
        minItem = i;
      }
      items[i].style.opacity = 0.3;
      items[i].style.textShadow = 'none';
    }
    items[minItem].style.opacity = 1;
    items[minItem].style.textShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
  };
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  return (
    <VisionGameContainer>
      <VisionGameItemsContainer>
        <VisionGameIndicatorContainer>
          <VisionGameIndicator ref={visionGameIndicator}>
            Imagine you know exactly
          </VisionGameIndicator>
        </VisionGameIndicatorContainer>
        <VisionGameOptions>
          <VisionGameOptionItem ref={visionGameItemFirst}>
            where each product comes from
          </VisionGameOptionItem>
          <VisionGameOptionItem ref={visionGameItem1}>
            how each product was made
          </VisionGameOptionItem>
          <VisionGameOptionItem ref={visionGameItem2}>
            what each product contains
          </VisionGameOptionItem>
          <VisionGameOptionItem ref={visionGameItemLast}>
            if a product has a positive impact
          </VisionGameOptionItem>
        </VisionGameOptions>
      </VisionGameItemsContainer>
    </VisionGameContainer>
  );
};

export default VisionGame;
