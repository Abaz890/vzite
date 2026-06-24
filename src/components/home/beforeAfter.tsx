import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

import CrmScreenshot from '@/assets/home/crm-realestate.png';

export const BeforeAfterSlider = () => {
    return (
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={CrmScreenshot} alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src="https://garantme.fr/hubfs/Before%20Mail%20box%20v2.svg" alt="Image two" />}
      />
    );
  }