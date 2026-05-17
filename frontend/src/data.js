// Central data store — swap these exports for API calls when backend is ready

export const CUSTOMERS = [
  { id: 1,  name: 'Noa Shapiro',    email: 'noa@store.co.il',      phone: '050-111-2233', company: 'Baldar',      licenses: 3, source: 'Wix',         status: 'Active',   joined: 'May 16, 2026', orders: 14, revenue: '₪4,820' },
  { id: 2,  name: 'Eran Mizrahi',   email: 'eran@shop.co.il',      phone: '052-334-5566', company: 'Run Soft',    licenses: 1, source: 'WooCommerce', status: 'Active',   joined: 'May 15, 2026', orders: 8,  revenue: '₪2,140' },
  { id: 3,  name: 'Lior Cohen',     email: 'lior@market.co.il',    phone: '054-667-8899', company: 'Baldar',      licenses: 2, source: 'Shopify',     status: 'Inactive', joined: 'May 14, 2026', orders: 21, revenue: '₪7,300' },
  { id: 4,  name: 'Tamar Goldberg', email: 'tamar@web.co.il',      phone: '050-223-4455', company: 'Baldar',      licenses: 4, source: 'WooCommerce', status: 'Active',   joined: 'May 13, 2026', orders: 6,  revenue: '₪1,890' },
  { id: 5,  name: 'Avi Ben-David',  email: 'avi@store.co.il',      phone: '053-556-7788', company: 'Run Soft',    licenses: 1, source: 'Wix',         status: 'Inactive', joined: 'May 12, 2026', orders: 3,  revenue: '₪880'   },
  { id: 6,  name: 'Maya Peretz',    email: 'maya@shop.co.il',      phone: '058-889-0011', company: 'DHL Israel',  licenses: 2, source: 'Shopify',     status: 'Active',   joined: 'May 11, 2026', orders: 17, revenue: '₪5,550' },
  { id: 7,  name: 'Roi Katz',       email: 'roi@market.co.il',     phone: '050-001-1122', company: 'Baldar',      licenses: 1, source: 'WooCommerce', status: 'Active',   joined: 'May 10, 2026', orders: 9,  revenue: '₪3,200' },
  { id: 8,  name: 'Hila Stern',     email: 'hila@web.co.il',       phone: '052-223-3344', company: 'Israel Post', licenses: 3, source: 'Wix',         status: 'Active',   joined: 'May 9, 2026',  orders: 11, revenue: '₪3,740' },
  { id: 9,  name: 'Dan Levy',       email: 'dan@techstores.co.il', phone: '054-445-6677', company: 'Run Soft',    licenses: 2, source: 'WooCommerce', status: 'Active',   joined: 'May 8, 2026',  orders: 5,  revenue: '₪1,620' },
  { id: 10, name: 'Shira Tal',      email: 'shira@myshop.co.il',   phone: '050-778-9900', company: 'Baldar',      licenses: 1, source: 'Shopify',     status: 'Active',   joined: 'May 7, 2026',  orders: 7,  revenue: '₪2,450' },
  { id: 11, name: 'Guy Nachman',    email: 'guy@boutique.co.il',   phone: '052-112-2334', company: 'Tamnun',      licenses: 2, source: 'Wix',         status: 'Active',   joined: 'May 6, 2026',  orders: 4,  revenue: '₪1,340' },
  { id: 12, name: 'Yael Ben-Ami',   email: 'yael@store.co.il',     phone: '053-334-4556', company: 'Yango',       licenses: 0, source: 'WooCommerce', status: 'Inactive', joined: 'May 5, 2026',  orders: 2,  revenue: '₪640'   },
]

export const COMPANIES = [
  { id: 1, name: 'Baldar',       provider: 'Baldar',   managers: 2, licenses: 320, customers: 198, status: 'Active',   revenue: '₪182,400' },
  { id: 2, name: 'Run Software', provider: 'Run Soft', managers: 1, licenses: 210, customers: 112, status: 'Active',   revenue: '₪94,500'  },
  { id: 3, name: 'DHL Israel',   provider: 'DHL',      managers: 1, licenses: 98,  customers: 54,  status: 'Active',   revenue: '₪43,200'  },
  { id: 4, name: 'Israel Post',  provider: 'IL Post',  managers: 1, licenses: 180, customers: 87,  status: 'Active',   revenue: '₪78,300'  },
  { id: 5, name: 'Yango',        provider: 'Yango',    managers: 0, licenses: 45,  customers: 21,  status: 'Inactive', revenue: '₪18,900'  },
  { id: 6, name: 'Tamnun',       provider: 'Tamnun',   managers: 1, licenses: 60,  customers: 30,  status: 'Active',   revenue: '₪26,700'  },
]

export const LICENSES = [
  { id: 1094, key: 'LIC-A3F9', customer: 'Noa Shapiro',    company: 'Baldar',      type: 'Standard', started: 'Jan 1, 2026',  expires: 'Dec 31, 2026', status: 'Active'   },
  { id: 1093, key: 'LIC-B7K2', customer: 'Eran Mizrahi',   company: 'Run Soft',    type: 'Standard', started: 'Feb 1, 2026',  expires: 'Jan 31, 2027', status: 'Active'   },
  { id: 1092, key: 'LIC-C1M4', customer: 'Lior Cohen',     company: 'Baldar',      type: 'Premium',  started: 'Mar 1, 2025',  expires: 'Feb 28, 2026', status: 'Expired'  },
  { id: 1091, key: 'LIC-D5P8', customer: 'Tamar Goldberg', company: 'Baldar',      type: 'Standard', started: 'Apr 1, 2026',  expires: 'Mar 31, 2027', status: 'Active'   },
  { id: 1090, key: 'LIC-E9Q1', customer: 'Avi Ben-David',  company: 'Run Soft',    type: 'Standard', started: 'May 1, 2026',  expires: 'Apr 30, 2027', status: 'Inactive' },
  { id: 1089, key: 'LIC-F2R6', customer: 'Maya Peretz',    company: 'DHL Israel',  type: 'Premium',  started: 'Jan 15, 2026', expires: 'Jan 14, 2027', status: 'Active'   },
  { id: 1088, key: 'LIC-G6S3', customer: 'Roi Katz',       company: 'Baldar',      type: 'Standard', started: 'Feb 20, 2026', expires: 'Feb 19, 2027', status: 'Active'   },
  { id: 1087, key: 'LIC-H4T1', customer: 'Hila Stern',     company: 'Israel Post', type: 'Premium',  started: 'Mar 5, 2026',  expires: 'Mar 4, 2027',  status: 'Active'   },
  { id: 1086, key: 'LIC-I8U7', customer: 'Dan Levy',       company: 'Run Soft',    type: 'Standard', started: 'Apr 12, 2026', expires: 'Apr 11, 2027', status: 'Active'   },
  { id: 1085, key: 'LIC-J2V5', customer: 'Shira Tal',      company: 'Baldar',      type: 'Standard', started: 'May 3, 2026',  expires: 'May 2, 2027',  status: 'Active'   },
]

export const ORDERS = [
  { id: '#4521', customer: 'Noa Shapiro',    source: 'Wix',         company: 'Baldar',      date: 'May 17, 2026', status: 'Delivered',  total: '₪340'   },
  { id: '#4520', customer: 'Eran Mizrahi',   source: 'WooCommerce', company: 'Run Soft',    date: 'May 17, 2026', status: 'Shipped',    total: '₪125'   },
  { id: '#4519', customer: 'Lior Cohen',     source: 'Shopify',     company: 'Baldar',      date: 'May 16, 2026', status: 'Processing', total: '₪890'   },
  { id: '#4518', customer: 'Tamar Goldberg', source: 'WooCommerce', company: 'Baldar',      date: 'May 16, 2026', status: 'Pending',    total: '₪67'    },
  { id: '#4517', customer: 'Avi Ben-David',  source: 'Wix',         company: 'Run Soft',    date: 'May 15, 2026', status: 'Delivered',  total: '₪432'   },
  { id: '#4516', customer: 'Maya Peretz',    source: 'Shopify',     company: 'DHL Israel',  date: 'May 15, 2026', status: 'Shipped',    total: '₪210'   },
  { id: '#4515', customer: 'Roi Katz',       source: 'WooCommerce', company: 'Baldar',      date: 'May 14, 2026', status: 'Delivered',  total: '₪780'   },
  { id: '#4514', customer: 'Hila Stern',     source: 'Wix',         company: 'Israel Post', date: 'May 14, 2026', status: 'Pending',    total: '₪55'    },
  { id: '#4513', customer: 'Noa Shapiro',    source: 'Wix',         company: 'Baldar',      date: 'May 13, 2026', status: 'Processing', total: '₪1,200' },
  { id: '#4512', customer: 'Eran Mizrahi',   source: 'WooCommerce', company: 'Run Soft',    date: 'May 13, 2026', status: 'Delivered',  total: '₪320'   },
  { id: '#4511', customer: 'Dan Levy',       source: 'WooCommerce', company: 'Run Soft',    date: 'May 12, 2026', status: 'Shipped',    total: '₪148'   },
  { id: '#4510', customer: 'Shira Tal',      source: 'Shopify',     company: 'Baldar',      date: 'May 12, 2026', status: 'Delivered',  total: '₪590'   },
  { id: '#4509', customer: 'Guy Nachman',    source: 'Wix',         company: 'Tamnun',      date: 'May 11, 2026', status: 'Pending',    total: '₪220'   },
  { id: '#4508', customer: 'Yael Ben-Ami',   source: 'WooCommerce', company: 'Yango',       date: 'May 11, 2026', status: 'Delivered',  total: '₪85'    },
  { id: '#4507', customer: 'Maya Peretz',    source: 'Shopify',     company: 'DHL Israel',  date: 'May 10, 2026', status: 'Processing', total: '₪660'   },
]

export const SHIPMENTS = [
  { id: 'SH-8821', order: '#4520', customer: 'Eran Mizrahi',   carrier: 'Run Soft',    tracking: 'RS-9921004871', from: 'Tel Aviv',  to: 'Haifa',       dispatched: 'May 17', eta: 'May 18', status: 'In Transit',  progress: 60  },
  { id: 'SH-8820', order: '#4519', customer: 'Lior Cohen',     carrier: 'Baldar',      tracking: 'BD-3345119022', from: 'Jerusalem', to: 'Tel Aviv',    dispatched: 'May 16', eta: 'May 18', status: 'Processing', progress: 25  },
  { id: 'SH-8819', order: '#4518', customer: 'Tamar Goldberg', carrier: 'Baldar',      tracking: 'BD-3345119023', from: 'Netanya',   to: 'Beer Sheva',  dispatched: 'May 16', eta: 'May 19', status: 'Pending',    progress: 10  },
  { id: 'SH-8818', order: '#4516', customer: 'Maya Peretz',    carrier: 'DHL Israel',  tracking: 'DHL-441289001', from: 'Rishon',    to: 'Eilat',       dispatched: 'May 15', eta: 'May 17', status: 'In Transit',  progress: 80  },
  { id: 'SH-8817', order: '#4514', customer: 'Hila Stern',     carrier: 'Israel Post', tracking: 'ISP-778921443', from: 'Tel Aviv',  to: 'Modiin',      dispatched: 'May 14', eta: 'May 18', status: 'Pending',    progress: 5   },
  { id: 'SH-8816', order: '#4513', customer: 'Noa Shapiro',    carrier: 'Baldar',      tracking: 'BD-3345119020', from: 'Herzliya',  to: 'Petah Tikva', dispatched: 'May 13', eta: 'May 15', status: 'Delivered',  progress: 100 },
  { id: 'SH-8815', order: '#4511', customer: 'Dan Levy',       carrier: 'Run Soft',    tracking: 'RS-9921004869', from: 'Tel Aviv',  to: 'Ramat Gan',   dispatched: 'May 12', eta: 'May 14', status: 'Delivered',  progress: 100 },
  { id: 'SH-8814', order: '#4509', customer: 'Guy Nachman',    carrier: 'Tamnun',      tracking: 'TM-5512883401', from: 'Bat Yam',   to: 'Holon',       dispatched: 'May 11', eta: 'May 16', status: 'In Transit',  progress: 70  },
]

export const ACTIVITY = [
  { text: 'New customer Noa Shapiro registered via Wix',     time: '5 min ago',  type: 'customer' },
  { text: 'License LIC-A3F9 assigned to Noa Shapiro',       time: '22 min ago', type: 'license'  },
  { text: 'Order #4521 delivered — Baldar',                  time: '45 min ago', type: 'order'    },
  { text: 'Company "DHL Israel" updated by admin',           time: '1 hr ago',   type: 'company'  },
  { text: '38 shipments synced from WooCommerce',            time: '2 hr ago',   type: 'shipment' },
  { text: 'License LIC-C1M4 expired — Lior Cohen',          time: '3 hr ago',   type: 'license'  },
  { text: 'New order #4519 received from Shopify',           time: '4 hr ago',   type: 'order'    },
  { text: 'Customer Eran Mizrahi updated account details',   time: '5 hr ago',   type: 'customer' },
]
