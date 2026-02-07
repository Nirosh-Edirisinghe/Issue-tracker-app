
import loginImg from './login.png'
import logo from './logo.png'
import logo1 from './logo1.png'
import logo2 from './logo2.png'


export const assets = {
 loginImg,logo,logo1,logo2
}

export const issues = [
  {
    id: 1,
    title: "Login button not working",
    description: "Login button does not respond when clicked.",
    status: "OPEN",
    priority: "HIGH",
    userId: 101,
  },
  {
    id: 2,
    title: "UI alignment issue",
    description: "Navbar items are not aligned properly on mobile view.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    userId: 102,
  },
  {
    id: 3,
    title: "API response delay",
    description: "Fetching issues API is slow.",
    status: "RESOLVED",
    priority: "HIGH",
    userId: 101,
  },
  {
    id: 4,
    title: "Typo in dashboard title",
    description: "Dashboard heading has a spelling mistake.",
    status: "CLOSED",
    priority: "LOW",
    userId: 103,
  },
  {
    id: 5,
    title: "Search not filtering correctly",
    description: "Search results do not update properly.",
    status: "OPEN",
    priority: "MEDIUM",
    userId: 102,
  },
];
