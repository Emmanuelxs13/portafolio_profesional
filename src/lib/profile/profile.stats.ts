import { Profile } from '@/types/profile';
import { ProfileStats } from './types';

export function computeProfileStats(profile: Profile): ProfileStats {
  const sortedExperience = [...profile.experience].sort((a, b) => {
    return new Date(a.from).getTime() - new Date(b.from).getTime();
  });
  const firstExperience = sortedExperience[0];

  const yearsOfExperience = Math.floor(
    (Date.now() - new Date(firstExperience.from).getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return {
    yearsOfExperience,
    projectsCompleted: profile.projects.length,
    certificatesEarned: profile.certificates.length,
    technologiesUsed: [
      ...profile.skills.frontend,
      ...profile.skills.backend,
      ...profile.skills.database,
      ...profile.skills.tools,
    ].length,
  };
}
