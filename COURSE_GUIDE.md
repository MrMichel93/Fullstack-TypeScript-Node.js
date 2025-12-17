# Course Guide for Instructors

This guide helps instructors effectively teach the Full-Stack Development with Python course.

## 🎯 Course Overview

**Target Audience:** Ages 16-20 with basic Python and HTML knowledge

**Duration:** 8-12 weeks (2-3 weeks per project)

**Format:** Project-based, hands-on learning

**Philosophy:** Learn by doing, not by theory

## 📅 Suggested Schedule

### Week 1: Introduction & Architecture
- **Day 1-2:** Course overview, setup, environment configuration
- **Day 3-4:** Architecture Primer (client/server, HTTP)
- **Day 5:** Security overview, debugging basics
- **Homework:** Read all documentation, set up development environment

### Weeks 2-3: Project 1 - Notes App
- **Week 2:** Basic CRUD operations, database basics
- **Week 3:** Complete implementation, extensions, code review
- **Deliverable:** Working notes app with at least one extension

### Weeks 4-5: Project 2 - URL Shortener
- **Week 4:** URL handling, redirects, unique ID generation
- **Week 5:** Statistics, validation, complete implementation
- **Deliverable:** Working URL shortener with click tracking

### Weeks 6-8: Project 3 - Simple Blog
- **Week 6:** User authentication, password hashing
- **Week 7:** Sessions, protected routes
- **Week 8:** User-specific data, complete implementation
- **Deliverable:** Multi-user blog with authentication

### Weeks 9-11: Project 4 - Inventory Tracker
- **Week 9:** Complex queries, search functionality
- **Week 10:** Filtering, sorting, validation
- **Week 11:** Dashboard, complete implementation
- **Deliverable:** Full inventory management system

### Week 12: Final Projects & Deployment
- Polish projects
- Deploy to cloud
- Create portfolio presentations

## 👥 Teaching Tips

### For Beginners (Ages 16-17)
- **More scaffolding:** Provide more complete starter code
- **Pair programming:** Have students work in pairs
- **Frequent check-ins:** Review progress every class
- **Extra resources:** Provide video tutorials
- **Smaller steps:** Break TODOs into smaller sub-tasks

### For Advanced Students (Ages 18-20)
- **Less scaffolding:** Provide minimal starter code
- **Extensions first:** Encourage starting extensions early
- **Code reviews:** Have students review each other's code
- **Best practices:** Emphasize production-ready code
- **Research tasks:** Assign independent research

## 🎓 Teaching Strategies

### 1. Start with the Big Picture
- Always explain WHY before HOW
- Show the complete working app first
- Trace through a full request/response cycle
- Draw diagrams on whiteboard

### 2. TODO-Driven Development
- Students follow TODO comments in code
- TODOs are numbered and sequential
- Each TODO teaches one concept
- Solution available for reference

### 3. Test Early, Test Often
- Test after completing each TODO
- Don't move on until current feature works
- Use browser DevTools to debug
- Encourage experimentation

### 4. Code Reviews
- Review one student's code as a class
- Discuss improvements (not criticisms)
- Share different approaches
- Highlight good practices

### 5. Show, Don't Tell
- Live code in front of class
- Make mistakes intentionally
- Debug problems together
- Think out loud

## 🐛 Common Student Mistakes

### Mistake 1: Forgetting to Activate Virtual Environment
**Symptom:** "Module not found" errors

**Solution:**
```bash
# Show them this visual cue
(venv)  # <- This should appear in terminal
```

### Mistake 2: Not Saving Files
**Symptom:** "Changes don't show up"

**Solution:**
- Use auto-save in editor
- Always check file has * indicator
- Hard refresh browser (Ctrl+Shift+R)

### Mistake 3: Mixing Tabs and Spaces
**Symptom:** IndentationError

**Solution:**
- Configure editor to use 4 spaces
- Use a linter (flake8, pylint)
- Show them how to reveal whitespace

### Mistake 4: Not Reading Error Messages
**Symptom:** "It doesn't work!"

**Solution:**
- Teach how to read tracebacks
- Find the last line in their code
- Google the error message
- Use debug mode in Flask

### Mistake 5: Copy-Pasting Without Understanding
**Symptom:** Code works but can't explain it

**Solution:**
- Ask them to explain each line
- Have them modify it slightly
- Remove the code and rewrite from memory
- Pair programming review

### Mistake 6: Not Committing Frequently
**Symptom:** Losing work, can't undo changes

**Solution:**
- Commit after each working feature
- Use meaningful commit messages
- Show `git log` to see history
- Practice `git diff` before committing

## 📊 Assessment Ideas

### Formative Assessment (During Course)
1. **Code Check-ins:** Review commits each week
2. **Feature Demos:** Students demo working features
3. **Debugging Challenges:** Give broken code to fix
4. **Pair Programming:** Observe collaboration
5. **Self-Assessment:** Students rate their understanding

### Summative Assessment (End of Course)
1. **Portfolio Review:** All 4 projects completed and working
2. **Code Quality:** Clean, readable, well-structured
3. **Extensions:** At least 1 extension per project
4. **Presentation:** 5-min demo of best project
5. **Written Reflection:** What they learned, challenges faced

### Grading Rubric (Example)

**Project Completion (40%)**
- All required features working
- Follows TODO instructions
- Code runs without errors

**Code Quality (30%)**
- Readable and well-organized
- Proper indentation and naming
- Comments where needed
- No security vulnerabilities

**Extensions (20%)**
- At least one extension completed
- Extension adds meaningful functionality
- Shows creativity and problem-solving

**Documentation (10%)**
- README with setup instructions
- Screenshots/demo
- Known issues documented

## 🚧 Common Issues & Solutions

### Issue: "My database won't update!"
- Delete the .db file
- Run `db.create_all()` again
- Or use Flask-Migrate for schema changes

### Issue: "Port 5000 already in use"
```python
# Use a different port
app.run(debug=True, port=5001)
```

### Issue: "Template not found"
- Check file is in `templates/` folder
- Check filename spelling
- Check `render_template('filename.html')` syntax

### Issue: "Static files not loading"
- Hard refresh browser
- Check file is in `static/` folder
- Check `url_for('static', filename='style.css')` syntax
- Restart Flask server

## 💡 Extension Challenge Ideas

Encourage students to try these after completing basic projects:

**Easy:**
- Add timestamps
- Add search
- Improve styling
- Add validation

**Medium:**
- Add user authentication
- File uploads
- Email notifications
- API integration

**Hard:**
- Real-time updates (WebSockets)
- Payment integration
- Mobile responsive
- Deploy to cloud

## 📚 Additional Resources

### For Instructors
- [Python Teaching Resources](https://wiki.python.org/moin/BeginnersGuide/Teachers)
- [CS50's Introduction to Web Development](https://cs50.harvard.edu/web/)
- [Full Stack Open](https://fullstackopen.com/)

### For Students
- [Flask Mega-Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)
- [Python Official Tutorial](https://docs.python.org/3/tutorial/)
- [W3Schools HTML/CSS](https://www.w3schools.com/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

### Video Tutorials
- [Corey Schafer's Flask Series](https://www.youtube.com/playlist?list=PL-osiE80TeTs4UjLw5MM6OjgkjFeUxCYH)
- [Tech With Tim Flask](https://www.youtube.com/watch?v=mqhxxeeTbu0&list=PLzMcBGfZo4-n4vJJybUVV3Un_NFS5EOgX)

## 🤝 Getting Help

### Debugging Process to Teach
1. Read the error message carefully
2. Check what you changed last
3. Use print statements to inspect variables
4. Search the error on Google/Stack Overflow
5. Check documentation
6. Ask a classmate
7. Ask instructor (with specific error info)

### Questions to Ask Students
- "What did you expect to happen?"
- "What actually happened?"
- "What have you tried so far?"
- "Can you show me the error message?"
- "What was the last thing you changed?"

## 🎯 Learning Outcomes

By the end of this course, students should be able to:

**Technical Skills:**
- [ ] Build a web application from scratch
- [ ] Design and implement database schemas
- [ ] Handle HTTP requests and responses
- [ ] Implement user authentication
- [ ] Validate and sanitize user input
- [ ] Debug common web development issues
- [ ] Use version control (git)
- [ ] Deploy applications to the web

**Soft Skills:**
- [ ] Read and write technical documentation
- [ ] Break large problems into smaller tasks
- [ ] Research solutions independently
- [ ] Explain technical concepts clearly
- [ ] Collaborate on code projects
- [ ] Persist through challenging bugs

## 🎉 Celebration Ideas

- **Demo Day:** Students present projects to class
- **Code Gallery Walk:** Display projects, students tour and comment
- **Certificate of Completion:** Create official certificates
- **Portfolio Party:** Deploy projects together
- **Alumni Panel:** Invite previous students to share experiences

## 📧 Support

For questions about this course:
- Create an issue in the GitHub repository
- Share improvements via pull request
- Adapt and modify for your teaching context

---

**Good luck teaching! Your students are lucky to have you.** 🎓

Remember: The best way to learn is by building. Keep it practical, keep it fun, and keep encouraging your students to experiment and explore!
