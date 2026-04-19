import React, { useEffect } from 'react';
import Svg, { Circle, Ellipse, Path, Rect, G, Polygon } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  withSpring,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { BennyAnimation } from '@/types/action';

const AnimatedG = Animated.createAnimatedComponent(G);

// Fox palette
const C = {
  orange: '#F47C30',
  darkOrange: '#C85010',
  cream: '#FFF0D0',
  dark: '#2C1500',
  nose: '#3D1A00',
  pink: '#FFB8A0',
  tail: '#F47C30',
};

interface Props {
  animation: BennyAnimation;
  size?: number;
}

export default function BennyFox({ animation, size = 200 }: Props) {
  const bounceY = useSharedValue(0);
  const foxScale = useSharedValue(1);
  const leftArmY = useSharedValue(0);
  const rightArmY = useSharedValue(0);
  const eyeRY = useSharedValue(7);

  // Idle bounce — always running
  useEffect(() => {
    bounceY.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 700, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration: 700, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
      false,
    );
  }, []);

  // Blink every ~3 seconds
  useEffect(() => {
    const doBlink = () => {
      eyeRY.value = withSequence(
        withTiming(0.5, { duration: 70 }),
        withTiming(7, { duration: 70 }),
      );
    };
    const interval = setInterval(doBlink, 3200);
    return () => clearInterval(interval);
  }, []);

  // Task-specific animations
  useEffect(() => {
    cancelAnimation(leftArmY);
    cancelAnimation(rightArmY);
    cancelAnimation(foxScale);
    leftArmY.value = withTiming(0, { duration: 200 });
    rightArmY.value = withTiming(0, { duration: 200 });
    foxScale.value = withTiming(1, { duration: 200 });

    switch (animation) {
      case 'wakeUp':
        // Both arms stretch up repeatedly
        leftArmY.value = withDelay(
          100,
          withRepeat(
            withSequence(
              withTiming(-25, { duration: 800 }),
              withTiming(0, { duration: 800 }),
            ),
            -1,
          ),
        );
        rightArmY.value = withRepeat(
          withSequence(
            withTiming(-25, { duration: 800 }),
            withTiming(0, { duration: 800 }),
          ),
          -1,
        );
        break;

      case 'brushTeeth':
        // Right arm oscillates quickly (brushing)
        rightArmY.value = withRepeat(
          withSequence(
            withTiming(-18, { duration: 250 }),
            withTiming(5, { duration: 250 }),
          ),
          -1,
        );
        break;

      case 'washFace':
        // Both arms come up to face
        leftArmY.value = withRepeat(
          withSequence(
            withTiming(-20, { duration: 600 }),
            withTiming(0, { duration: 600 }),
          ),
          -1,
        );
        rightArmY.value = withDelay(
          150,
          withRepeat(
            withSequence(
              withTiming(-20, { duration: 600 }),
              withTiming(0, { duration: 600 }),
            ),
            -1,
          ),
        );
        break;

      case 'getDressed':
        // Arms raise alternately
        leftArmY.value = withRepeat(
          withSequence(
            withTiming(-22, { duration: 500 }),
            withTiming(0, { duration: 500 }),
            withTiming(0, { duration: 400 }),
          ),
          -1,
        );
        rightArmY.value = withDelay(
          500,
          withRepeat(
            withSequence(
              withTiming(-22, { duration: 500 }),
              withTiming(0, { duration: 500 }),
              withTiming(0, { duration: 400 }),
            ),
            -1,
          ),
        );
        break;

      case 'eatBreakfast':
        // Right arm goes to mouth slowly
        rightArmY.value = withRepeat(
          withSequence(
            withTiming(-22, { duration: 700 }),
            withTiming(0, { duration: 700 }),
            withTiming(0, { duration: 500 }),
          ),
          -1,
        );
        break;

      case 'toilet':
        // Gentle sit — body sinks slightly, handled via bounce reduction
        bounceY.value = withRepeat(
          withSequence(
            withTiming(-2, { duration: 1200 }),
            withTiming(2, { duration: 1200 }),
          ),
          -1,
        );
        break;

      case 'celebrate':
        foxScale.value = withRepeat(
          withSequence(
            withSpring(1.18, { damping: 4, stiffness: 200 }),
            withTiming(1, { duration: 200 }),
          ),
          4,
        );
        leftArmY.value = withRepeat(
          withSequence(
            withTiming(-30, { duration: 200 }),
            withTiming(0, { duration: 200 }),
          ),
          4,
        );
        rightArmY.value = withDelay(
          100,
          withRepeat(
            withSequence(
              withTiming(-30, { duration: 200 }),
              withTiming(0, { duration: 200 }),
            ),
            4,
          ),
        );
        break;

      default:
        break;
    }
  }, [animation]);

  const foxStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }, { scale: foxScale.value }],
  }));

  const leftArmAnimProps = useAnimatedProps(() => ({
    transform: [{ translateY: leftArmY.value }],
  }));

  const rightArmAnimProps = useAnimatedProps(() => ({
    transform: [{ translateY: rightArmY.value }],
  }));

  const eyeAnimProps = useAnimatedProps(() => ({
    ry: eyeRY.value,
  }));

  const rightEyeAnimProps = useAnimatedProps(() => ({
    ry: eyeRY.value,
  }));

  const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

  const s = size / 200;

  return (
    <Animated.View style={[foxStyle, { width: size, height: size * 1.2 }]}>
      <Svg
        width={200 * s}
        height={240 * s}
        viewBox="0 0 200 240"
      >
        {/* === TAIL (behind body) === */}
        <Path
          d="M 130 175 C 175 165 195 130 170 105 C 155 88 135 100 145 118 C 152 130 140 148 125 155"
          stroke={C.orange}
          strokeWidth={36}
          strokeLinecap="round"
          fill="none"
        />
        {/* Tail tip (cream) */}
        <Ellipse cx={167} cy={104} rx={16} ry={13} fill={C.cream} />

        {/* === BODY === */}
        <Ellipse cx={100} cy={168} rx={56} ry={52} fill={C.orange} />
        {/* Cream chest patch */}
        <Ellipse cx={100} cy={162} rx={35} ry={40} fill={C.cream} />

        {/* === LEFT EAR === */}
        <Polygon points="62,68 50,20 88,62" fill={C.orange} />
        <Polygon points="65,64 57,30 84,60" fill={C.darkOrange} />

        {/* === RIGHT EAR === */}
        <Polygon points="138,68 150,20 112,62" fill={C.orange} />
        <Polygon points="135,64 143,30 116,60" fill={C.darkOrange} />

        {/* === HEAD === */}
        <Circle cx={100} cy={96} r={46} fill={C.orange} />

        {/* === MUZZLE === */}
        <Ellipse cx={100} cy={110} rx={23} ry={17} fill={C.cream} />

        {/* === CHEEK BLUSH === */}
        <Ellipse cx={72} cy={104} rx={9} ry={6} fill={C.pink} opacity={0.55} />
        <Ellipse cx={128} cy={104} rx={9} ry={6} fill={C.pink} opacity={0.55} />

        {/* === EYES === */}
        <AnimatedEllipse
          cx={82}
          cy={90}
          rx={7}
          animatedProps={eyeAnimProps}
          fill={C.dark}
        />
        <Circle cx={84} cy={88} r={2.2} fill="white" />

        <AnimatedEllipse
          cx={118}
          cy={90}
          rx={7}
          animatedProps={rightEyeAnimProps}
          fill={C.dark}
        />
        <Circle cx={120} cy={88} r={2.2} fill="white" />

        {/* === NOSE === */}
        <Ellipse cx={100} cy={103} rx={6} ry={4.5} fill={C.nose} />
        <Circle cx={98} cy={102} r={1.5} fill="white" opacity={0.6} />

        {/* === SMILE === */}
        <Path
          d="M 88 112 Q 100 122 112 112"
          stroke={C.nose}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />

        {/* === LEFT ARM (animated) === */}
        <AnimatedG animatedProps={leftArmAnimProps}>
          <Rect x={36} y={145} width={22} height={48} rx={11} fill={C.orange} />
          {/* Paw */}
          <Ellipse cx={47} cy={196} rx={13} ry={9} fill={C.orange} />
          <Ellipse cx={47} cy={197} rx={9} ry={7} fill={C.cream} />
        </AnimatedG>

        {/* === RIGHT ARM (animated) === */}
        <AnimatedG animatedProps={rightArmAnimProps}>
          <Rect x={142} y={145} width={22} height={48} rx={11} fill={C.orange} />
          {/* Paw */}
          <Ellipse cx={153} cy={196} rx={13} ry={9} fill={C.orange} />
          <Ellipse cx={153} cy={197} rx={9} ry={7} fill={C.cream} />
        </AnimatedG>

        {/* === LEGS === */}
        <Rect x={66} y={200} width={26} height={30} rx={12} fill={C.orange} />
        <Rect x={108} y={200} width={26} height={30} rx={12} fill={C.orange} />

        {/* === FEET === */}
        <Ellipse cx={79} cy={228} rx={16} ry={9} fill={C.orange} />
        <Ellipse cx={79} cy={229} rx={12} ry={6} fill={C.cream} />
        <Ellipse cx={121} cy={228} rx={16} ry={9} fill={C.orange} />
        <Ellipse cx={121} cy={229} rx={12} ry={6} fill={C.cream} />
      </Svg>
    </Animated.View>
  );
}
