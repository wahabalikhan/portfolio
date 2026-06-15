import { IconCode, IconDeviceGamepad2, IconToolsKitchen2, IconShieldCheck } from '@tabler/icons-react';

// Per-repo overrides for the Development tab cards, keyed by GitHub repo name
export const devProjectMeta = {
  'portfolio': {
    icon: IconCode,
    accent: 'violet',
    title: 'Portfolio',
    description: 'A live, AI-assisted personal site — designed, coded, and shipped through conversational prompts from layout to deployment.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
  },
  'escape-game': {
    icon: IconDeviceGamepad2,
    accent: 'emerald',
    title: 'Escape Game',
    description: 'A 2D GUI escape-room game in Java, demonstrating object-oriented game architecture and core algorithmic logic.',
    tech: ['Java', 'Swing', 'OOP'],
  },
  'bobbys-desserts': {
    icon: IconToolsKitchen2,
    accent: 'amber',
    title: "Bobby's Desserts",
    description: 'A full-stack PHP/MySQL ordering site demonstrating authentication, role-based access, and CRUD-driven admin tooling.',
    tech: ['PHP', 'MySQL', 'JavaScript'],
  },
  'final-FYP-Insurance_Brokerage_and_Management_System-19001546': {
    icon: IconShieldCheck,
    accent: 'sky',
    title: 'Insurance Brokerage System',
    description: 'A PHP/MySQL platform streamlining policy management, bookings, and quotes between admins, brokers, and customers.',
    tech: ['PHP', 'MySQL', 'SQL'],
  },
};

export const defaultDevProjectMeta = {
  icon: IconCode,
  accent: 'violet',
};
