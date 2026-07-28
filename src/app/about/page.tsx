import type { Metadata } from 'next';
import { OurAudience } from '@/components/about/OurAudience';
import { OurAdvantages } from '@/components/about/OurAdvantages';
import { JoinTeam } from '@/components/about/JoinTeam';
import { CtaBanner } from '@/components/home/CtaBanner';

export const metadata: Metadata = {
  title: 'About Us — Kerny',
};

export default function AboutPage() {
  return (
    <>
      <OurAudience />
      <OurAdvantages />
      <JoinTeam />
      <CtaBanner />
    </>
  );
}
