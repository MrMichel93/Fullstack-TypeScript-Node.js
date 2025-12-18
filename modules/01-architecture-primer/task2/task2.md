# Task 2: HTTP Methods Practice

## Objective
Design a RESTful API for a simple blog application using appropriate HTTP methods.

## Instructions

Design API endpoints for a blog that has posts and comments. Each endpoint should use the correct HTTP method.

## Requirements

Complete this API design table:

| Action | HTTP Method | Endpoint | Request Body | Response |
|--------|-------------|----------|--------------|----------|
| List all posts | ? | ? | ? | ? |
| Get single post | ? | ? | ? | ? |
| Create new post | ? | ? | ? | ? |
| Update a post | ? | ? | ? | ? |
| Delete a post | ? | ? | ? | ? |
| Add comment to post | ? | ? | ? | ? |
| Get comments for post | ? | ? | ? | ? |

## Example Entry

| Action | HTTP Method | Endpoint | Request Body | Response |
|--------|-------------|----------|--------------|----------|
| List all posts | GET | /api/posts | None | Array of posts |

## Verification Questions

After completing the table, answer:
1. Why do we use GET for retrieving data instead of POST?
2. When should you use PUT vs PATCH for updates?
3. What status code should be returned when creating a new post?
4. What happens if you try to DELETE a post that doesn't exist?

## Bonus Challenge

Add these features to your API design:
1. Pagination for listing posts (limit, offset)
2. Filtering posts by category or author
3. Liking/unliking a post
4. Searching posts by title or content
