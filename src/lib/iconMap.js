// Named imports only — this keeps lucide-react tree-shakeable. A wildcard
// `import * as Icons from 'lucide-react'` pulls in the whole icon set
// (700KB+ in the production bundle) even though servicesData.js only ever
// references a fixed, known set of icon names.
//
// If you add a new service with a different icon in servicesData.js,
// import that icon here and add it to `serviceIconMap`.
import {
  Globe,
  LayoutGrid,
  Smartphone,
  BrainCircuit,
  CloudCog,
  ShieldCheck,
  Plug,
  PenTool,
  Sparkles,
} from 'lucide-react';

export const serviceIconMap = {
  Globe,
  LayoutGrid,
  Smartphone,
  BrainCircuit,
  CloudCog,
  ShieldCheck,
  Plug,
  PenTool,
  Sparkles, // fallback icon
};

export function getServiceIcon(name) {
  return serviceIconMap[name] ?? Sparkles;
}
