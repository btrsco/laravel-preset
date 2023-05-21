import { aleaFactory } from 'alea-generator';
import MersenneTwister from 'mersenne-twister';

function minMax (opts) {
  let { random, min, max } = opts;
  return Math.floor(random * ( max - min + 1 ) + min);
}

export function random (opts) {
  let { value, min, max } = opts;
  let alea = aleaFactory(value);
  let seed = alea.random() * 10000000;
  let mersenne = new MersenneTwister(seed);

  return minMax({ random: mersenne.random(), min, max });
}
