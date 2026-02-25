export const customers = [
  { id: 1, name: 'Rahul Sharma', phone: '9876543210', email: 'rahul.sharma@email.com', totalVisits: 15, totalSpent: 18500, lastVisit: '2026-02-25', membership: 'Gold', birthday: '1990-05-15' },
  { id: 2, name: 'Priya Patel', phone: '9876543211', email: 'priya.patel@email.com', totalVisits: 22, totalSpent: 28400, lastVisit: '2026-02-24', membership: 'Platinum', birthday: '1988-08-22' },
  { id: 3, name: 'Amit Kumar', phone: '9876543212', email: 'amit.kumar@email.com', totalVisits: 8, totalSpent: 9200, lastVisit: '2026-02-23', membership: 'Silver', birthday: '1992-11-30' },
  { id: 4, name: 'Sneha Singh', phone: '9876543213', email: 'sneha.singh@email.com', totalVisits: 31, totalSpent: 42000, lastVisit: '2026-02-25', membership: 'Platinum', birthday: '1985-03-18' },
  { id: 5, name: 'Vikram Reddy', phone: '9876543214', email: 'vikram.reddy@email.com', totalVisits: 12, totalSpent: 15600, lastVisit: '2026-02-20', membership: 'Gold', birthday: '1995-07-10' },
  { id: 6, name: 'Anita Desai', phone: '9876543215', email: 'anita.desai@email.com', totalVisits: 18, totalSpent: 22800, lastVisit: '2026-02-22', membership: 'Gold', birthday: '1987-12-05' },
  { id: 7, name: 'Rahul Verma', phone: '9876543216', email: 'rahul.verma@email.com', totalVisits: 5, totalSpent: 4800, lastVisit: '2026-02-18', membership: 'Silver', birthday: '1998-01-25' },
  { id: 8, name: 'Kiran Joshi', phone: '9876543217', email: 'kiran.joshi@email.com', totalVisits: 25, totalSpent: 31500, lastVisit: '2026-02-25', membership: 'Platinum', birthday: '1983-09-12' },
  { id: 9, name: 'Deepak Malhotra', phone: '9876543218', email: 'deepak.m@email.com', totalVisits: 9, totalSpent: 11200, lastVisit: '2026-02-19', membership: 'Silver', birthday: '1991-04-08' },
  { id: 10, name: 'Meera Nair', phone: '9876543219', email: 'meera.nair@email.com', totalVisits: 14, totalSpent: 18200, lastVisit: '2026-02-21', membership: 'Gold', birthday: '1989-06-28' },
];

export const membershipLevels = ['Silver', 'Gold', 'Platinum'];

export const getCustomersByMembership = (level) => customers.filter(c => c.membership === level);

export const getCustomerById = (id) => customers.find(c => c.id === id);

export const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);
