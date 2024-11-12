import { Metadata } from 'next';

import SettingsClient from './page.client';

export const metadata: Metadata = {
  title: {
    template: '%s | Task manager',
    default: 'Task manager',
  },
  description: "Vladyslav's Task manager description",
  applicationName: 'Task manager',
};

export default function Settings() {
  return <SettingsClient />;
}
