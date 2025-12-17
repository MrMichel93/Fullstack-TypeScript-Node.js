# Full-Stack Development with Python

**A project-based course for ages 16-20 with basic Python and HTML knowledge**

This is not a theory course. You learn by building real-world projects.

## 🎯 Course Goals

- Understand how data flows through a web application
- Learn backend development fundamentals
- Build portfolio-ready projects
- Practice modern web security

## 🛠️ Tech Stack

- **Backend**: Flask or FastAPI (your choice!)
- **Frontend**: HTML, CSS, minimal JavaScript
- **Database**: SQLite
- **Python**: 3.8+

## 📚 Course Structure

### 1. [Architecture Primer](./docs/01-architecture-primer.md)
Learn the fundamentals:
- Client vs Server
- HTTP Request/Response lifecycle
- How web apps work

### 2. Mini Projects (TODO-driven)

Each project introduces new concepts through hands-on coding:

| Project | Backend Concept | Frontend Concept | Difficulty |
|---------|----------------|------------------|------------|
| [Notes App](./projects/01-notes-app/) | CRUD operations, SQLite basics | Forms, POST/GET requests | ⭐ Beginner |
| [URL Shortener](./projects/02-url-shortener/) | Redirects, Unique IDs | Dynamic content, URL parameters | ⭐⭐ Beginner+ |
| [Simple Blog](./projects/03-simple-blog/) | Authentication, Sessions | Login forms, Protected routes | ⭐⭐⭐ Intermediate |
| [Inventory Tracker](./projects/04-inventory-tracker/) | Search/Filter, Validation | Tables, Search UI | ⭐⭐⭐ Intermediate |

### 3. [Security Basics](./docs/02-security-basics.md)
- Password hashing with bcrypt
- Input validation and sanitization
- Common vulnerabilities (SQL injection, XSS)

### 4. [Debugging & Testing](./docs/03-debugging-testing.md)
- Logging best practices
- Error handling patterns
- Basic testing strategies

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Basic Python knowledge (variables, functions, loops)
- Basic HTML knowledge (tags, forms)
- A code editor (VS Code recommended)

### Setup

1. **Clone this repository**
```bash
git clone https://github.com/MrMichel93/Fullstack-TypeScript-Node.js.git
cd Fullstack-TypeScript-Node.js
```

2. **Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Start with Project 1**
```bash
cd projects/01-notes-app
python app.py
```

Visit http://localhost:5000 in your browser!

## 📖 How to Use This Course

1. **Read the Architecture Primer** first to understand the big picture
2. **Complete projects in order** - each builds on previous concepts
3. **Follow the TODO comments** in the starter code
4. **Try extension challenges** after completing each project
5. **Review security and debugging guides** as you progress

## 🎓 For Instructors

See [COURSE_GUIDE.md](./COURSE_GUIDE.md) for:
- Teaching tips
- Common student mistakes
- Additional resources
- Assessment ideas

## 📝 Project Structure

Each project folder contains:
- `README.md` - Project overview and learning objectives
- `starter/` - Incomplete code with TODO comments
- `solution/` - Complete working solution
- `extensions/` - Optional challenge ideas
- `templates/` - HTML files
- `static/` - CSS and minimal JavaScript

## 🤝 Contributing

Found a bug or have a suggestion? Open an issue or submit a pull request!

## 📄 License

MIT License - Feel free to use this for teaching or learning.

---

**Ready to build?** Start with the [Architecture Primer](./docs/01-architecture-primer.md)!
