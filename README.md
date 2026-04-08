#  Kalpathon Hackathon Submission

## Team Details

| Field | Details |
|------|--------|
| **Team Name** | The_Himalayan_Coder |
| **Project Name** | Fest_Flow |
| **Track** | Track - 1 Web Development |
| **Problem Statement** | PS-04 / Hyper-Local Event Ticketing Startup|

---

##  Team Leader

| Name | Role | Contact |
|------|------|--------|
| **Kanchan Kapri** | Team Leader / Backend Developer |  7055638703 |
|  **Team ID**      |  Team ID: KPT063                |


---

##  Team Members

| Name | Role |
|------|------|
| **Junaid Khan** | Frontend Developer |

---

##  Project Overview

###  Problem

Many college fests, local events, and community gatherings lack a centralized platform for discovery and ticketing. Information is scattered across social media platforms like WhatsApp and Instagram, making it difficult for users to find events and for organizers to manage registrations, ticket sales, and attendance efficiently.


###  Solution

We developed a hyper-local event ticketing web platform that allows users to easily discover, book, and manage nearby events such as college fests, workshops, and pop-ups, and also it's become easy for event organiser to manage attendence and track by the dashboard.

The platform also empowers organizers with tools to create events, sell tickets, track attendance, and analyze performance, all in one place—making event management seamless and scalable.
Example:  
We developed a smart system that leverages modern technologies to provide efficient, scalable, and user-friendly solutions.

---

### Backend Setup & Running

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**:
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your values:
     - `MONGO_URI`: MongoDB connection string (local or Atlas)
     - `JWT_SECRET`: A strong random secret (32+ characters)
     - `CLOUDINARY_*`: Image hosting credentials (sign up at cloudinary.com)
     - `PORT`: Server port (default 5000)

3. **Start the server**:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`. Confirm with GET `/` returning `API is running...`.

4. **Test the API**:
   - Use the Hoppscotch flow guide: `backend/docs/postman/hoppscotch-flow-guide.md`
   - Or import the Postman collection: `backend/postman/FestFlow.postman_collection.json`

---

###  Key Features

- 🔹 Feature 1 –  Location-Based Event Discovery – Find events happening nearby
- 🔹 Feature 2 –  Online Ticket Booking – Seamless and secure ticket purchasing
- 🔹 Feature 3 –  Organizer Dashboard – Create and manage events easily
- 🔹 Feature 4 –  QR Code Entry System – Fast and efficient check-in process
- 🔹 Feature 5 - Event Filters & Categories – Sort by type (tech, fest, food, etc.)
- 🔹 Feature 6 - Real-Time Analytics – Track registrations and revenue


---

###  Tech Stack

| Category | Technologies |
|----------|------------|
| **Frontend** | React.js|
| **Backend** | Node.js & Express.js |
| **Database** | MongoDB |
| **Other Tools** | Github |

---

### Impact

- Simplifies event discovery for users

- Increases visibility for college and local events

- Saves time and reduces manual effort in ticket management

- Encourages community engagement and participation

- Scalable solution for cities and campuses across India

---

##  Additional Links

| Resource | Link |
|---------|------|
|  Presentation |  |
|  GitHub Repo |  |
|  Demo Video | |

---

##  Final Note

*Built with passion to solve real-world problems and create impactful innovation.*
