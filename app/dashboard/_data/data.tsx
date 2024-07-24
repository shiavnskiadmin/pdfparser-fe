import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];

export interface SubSubcategory {
  [key: string]: string[];
}

export interface Subcategory {
  [key: string]: string[] | SubSubcategory;
}

export interface Category {
  [key: string]: string[] | Subcategory;
}

export const metaDataCategories = {
  Business: {
    Finance: ["Budgets", "Financial Statements", "Invoices", "Tax Documents"],
    "Human Resources": [
      "Employee Contracts",
      "Policies",
      "Payroll",
      "Training Materials",
    ],
    Legal: ["Contracts", "Compliance Documents", "Litigation", "Agreements"],
    Marketing: ["Campaign Reports", "Brand Guidelines", "Ad Creative"],
    Sales: ["Proposals", "Quotes", "Sales Reports", "Product Brochures"],
    Operations: ["SOPs", "Procurement", "Supply Chain", "Inventory"],
  },
  Education: {
    Academic: ["Curriculum", "Lesson Plans", "Research Papers", "Study Guides"],
    Administrative: ["Policies", "Admission Forms", "Event Schedules"],
    Faculty: ["Meeting Minutes", "Performance Reviews", "Course Syllabi"],
    Student: ["Assignments", "Attendance", "Exam Results", "Certificates"],
  },
  Healthcare: {
    "Medical Records": ["Patient History", "Lab Reports", "Imaging Reports"],
    Billing: ["Insurance Claims", "Payment Receipts", "Billing Statements"],
    Research: ["Case Studies", "Research Papers", "Clinical Trials"],
    Administration: ["Policies", "Staff Training", "Compliance"],
  },
  "Government and Legal": {
    "Permits & Licenses": [
      "Business Licenses",
      "Work Permits",
      "Building Permits",
    ],
    "Legal Documents": ["Deeds", "Wills", "Court Orders", "Regulations"],
    Reports: ["Annual Reports", "Audit Reports", "Economic Surveys"],
    Compliance: ["Regulatory Filings", "Audit Findings"],
  },
  "IT and Software": {
    Development: ["Code Documentation", "Release Notes", "API References"],
    Support: ["Knowledge Base Articles", "Troubleshooting Guides"],
    Infrastructure: [
      "Network Diagrams",
      "Server Configurations",
      "Access Logs",
    ],
    Security: ["Vulnerability Assessments", "Penetration Test Reports"],
  },
  "Personal Documents": {
    Identification: ["Passports", "Birth Certificates", "Driver’s Licenses"],
    Financial: ["Bank Statements", "Investment Documents", "Tax Returns"],
    Legal: ["Property Deeds", "Wills", "Marriage Certificates"],
  },
  "Creative and Media": {
    Design: ["Mockups", "Sketches", "Style Guides"],
    Writing: ["Manuscripts", "Screenplays", "Articles"],
    "Audio/Video": ["Storyboards", "Scripts", "Licensing Agreements"],
  },
};
