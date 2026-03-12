export type Certification = {
  id: string;
  title: string;
  issuedDate: string;
};

export const certifications: Certification[] = [
  { id: '1', title: 'Basics of Embedded Systems',  issuedDate: 'Mar 1, 2026'  },
  { id: '2', title: 'Full Stack Developement',      issuedDate: 'Mar 4, 2026'  },
  { id: '3', title: 'Understanding RabbitMQ',       issuedDate: 'Mar 10, 2026' },
];