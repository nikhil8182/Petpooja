export const staff = [
  { id: 1, name: 'Rajesh Kumar', role: 'Manager', phone: '9876543210', salary: 45000, status: 'active', joinedDate: '2022-01-15', avatar: 'RK' },
  { id: 2, name: 'Priya Sharma', role: 'Cashier', phone: '9876543211', salary: 28000, status: 'active', joinedDate: '2022-03-20', avatar: 'PS' },
  { id: 3, name: 'Amit Patel', role: 'Waiter', phone: '9876543212', salary: 22000, status: 'active', joinedDate: '2022-05-10', avatar: 'AP' },
  { id: 4, name: 'Sneha Singh', role: 'Waiter', phone: '9876543213', salary: 22000, status: 'active', joinedDate: '2022-06-01', avatar: 'SS' },
  { id: 5, name: 'Vikram Malhotra', role: 'Chef', phone: '9876543214', salary: 55000, status: 'active', joinedDate: '2021-11-05', avatar: 'VM' },
  { id: 6, name: 'Anita Desai', role: 'Chef', phone: '9876543215', salary: 50000, status: 'active', joinedDate: '2022-02-20', avatar: 'AD' },
  { id: 7, name: 'Rahul Verma', role: 'Waiter', phone: '9876543216', salary: 21000, status: 'on-leave', joinedDate: '2023-01-10', avatar: 'RV' },
  { id: 8, name: 'Kiran Joshi', role: 'Cashier', phone: '9876543217', salary: 26000, status: 'active', joinedDate: '2023-04-15', avatar: 'KJ' },
  { id: 9, name: 'Deepak Reddy', role: 'Chef', phone: '9876543218', salary: 48000, status: 'active', joinedDate: '2023-06-01', avatar: 'DR' },
  { id: 10, name: 'Meera Nair', role: 'Helper', phone: '9876543219', salary: 18000, status: 'active', joinedDate: '2023-08-20', avatar: 'MN' },
];

export const roles = ['Manager', 'Cashier', 'Waiter', 'Chef', 'Helper'];

export const getStaffByRole = (role) => staff.filter(s => s.role === role);

export const getStaffById = (id) => staff.find(s => s.id === id);

export const activeStaff = staff.filter(s => s.status === 'active');
