import { Banner } from '@/components/home/Banner';
import { WhatIsVps } from '@/components/home/WhatIsVps';
import { WhyOurService } from '@/components/home/WhyOurService';
import { DataCenterRegions } from '@/components/home/DataCenterRegions';
import { OperationSystems } from '@/components/home/OperationSystems';
import { Faq } from '@/components/home/Faq';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <>
      <Banner />
      <WhatIsVps />
      <WhyOurService />
      <DataCenterRegions />
      <OperationSystems />
      <Faq />
      <CtaBanner />
    </>
  );
}
