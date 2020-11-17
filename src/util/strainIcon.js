import hybrid from '../images/hybrid.png';
import indica from '../images/indica.png';
import sativa from '../images/sativa.png';

const strainIcon = strainType => {
  return strainType === 'hybrid'
    ? hybrid
    : strainType === 'sativa'
    ? sativa
    : indica;
};

export default strainIcon;
