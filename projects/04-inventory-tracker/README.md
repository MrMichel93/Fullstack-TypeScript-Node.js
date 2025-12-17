# Project 4: Inventory Tracker

**Difficulty:** ⭐⭐⭐ Intermediate

Build an inventory management system for tracking items, quantities, categories, and suppliers.

## 🎯 Learning Objectives

### Backend Concepts
- Complex database queries (filtering, sorting)
- Search functionality across multiple fields
- Data validation and constraints
- Aggregate functions (counting, summing)
- Multiple related models

### Frontend Concepts
- Search and filter UI
- Data tables with sorting
- Form validation with feedback
- Dynamic filtering without page reload (optional JS)

## ✨ Features

Your Inventory Tracker will:
- ✅ Add, edit, delete inventory items
- ✅ Track item name, quantity, price, category
- ✅ Search items by name or description
- ✅ Filter by category
- ✅ Sort by different fields
- ✅ Low stock alerts (quantity < threshold)
- ✅ Calculate total inventory value
- ✅ Export to CSV (optional)

## 🏗️ Database Models

### Item
- id
- name
- description
- quantity
- price
- category_id (foreign key)
- supplier_id (foreign key)
- minimum_stock (threshold for low stock alert)
- created_at
- updated_at

### Category
- id
- name
- description

### Supplier (Optional)
- id
- name
- contact_email
- phone

## 📊 Key Features to Implement

### 1. Search Functionality
```python
@app.route('/items/search')
def search_items():
    query = request.args.get('q', '')
    items = Item.query.filter(
        Item.name.contains(query) | Item.description.contains(query)
    ).all()
    return render_template('items.html', items=items, query=query)
```

### 2. Filtering by Category
```python
category_id = request.args.get('category')
if category_id:
    items = Item.query.filter_by(category_id=category_id).all()
else:
    items = Item.query.all()
```

### 3. Sorting
```python
sort_by = request.args.get('sort', 'name')
order = request.args.get('order', 'asc')

if sort_by == 'name':
    query = Item.query.order_by(Item.name.asc() if order == 'asc' else Item.name.desc())
elif sort_by == 'quantity':
    query = Item.query.order_by(Item.quantity.asc() if order == 'asc' else Item.quantity.desc())
```

### 4. Low Stock Alerts
```python
@app.route('/items/low-stock')
def low_stock():
    items = Item.query.filter(Item.quantity < Item.minimum_stock).all()
    return render_template('low_stock.html', items=items)
```

### 5. Total Value Calculation
```python
from sqlalchemy import func

total_value = db.session.query(
    func.sum(Item.quantity * Item.price)
).scalar() or 0
```

## 📝 Step-by-Step Guide

### Step 1: Set Up Models
- Create Item, Category, and Supplier models
- Define relationships
- Initialize database

### Step 2: Basic CRUD
- Create items with all fields
- Edit existing items
- Delete items
- List all items in a table

### Step 3: Categories
- Create/manage categories
- Assign items to categories
- Filter items by category

### Step 4: Search
- Add search form
- Implement search across name and description
- Highlight search terms (optional)

### Step 5: Sorting and Filtering
- Add sort dropdowns
- Implement multi-column sorting
- Combine search + filter + sort

### Step 6: Dashboard
- Show total items count
- Show total inventory value
- Show low stock alerts
- Show items by category (chart/table)

### Step 7: Data Validation
- Validate quantity ≥ 0
- Validate price ≥ 0
- Validate required fields
- Handle duplicate names

## 🧪 Testing Checklist

**CRUD Operations:**
- [ ] Can create item with all fields
- [ ] Can edit item details
- [ ] Can delete item
- [ ] Can view all items

**Search & Filter:**
- [ ] Search finds items by name
- [ ] Search finds items by description
- [ ] Can filter by category
- [ ] Can combine search and filter

**Sorting:**
- [ ] Can sort by name (A-Z, Z-A)
- [ ] Can sort by quantity (low-high, high-low)
- [ ] Can sort by price

**Validation:**
- [ ] Cannot create item with negative quantity
- [ ] Cannot create item with negative price
- [ ] Required fields show errors when empty

**Dashboard:**
- [ ] Shows correct total item count
- [ ] Calculates total value correctly
- [ ] Shows low stock items

## 🎨 Extension Ideas

1. **Stock Adjustments** - Track history of quantity changes
2. **Barcode Scanner** - Add items by scanning barcodes
3. **Reorder Alerts** - Email alerts for low stock
4. **Suppliers** - Manage supplier information
5. **Purchase Orders** - Track incoming orders
6. **Sales Tracking** - Record when items are sold
7. **Multi-Location** - Track items in multiple warehouses
8. **Image Upload** - Add photos of items
9. **CSV Import/Export** - Bulk import/export data
10. **Reports** - Generate inventory reports (PDF)

## 🎓 What You've Learned

By completing this project, you now know:
- Complex database queries and relationships
- Search and filter implementation
- Data validation techniques
- Aggregate calculations
- Building practical business applications

## 📚 Resources

- [SQLAlchemy Querying](https://docs.sqlalchemy.org/en/20/orm/queryguide/)
- [Flask Request Args](https://flask.palletsprojects.com/en/latest/api/#flask.Request.args)
- [Input Validation Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

## 🎉 Course Complete!

Congratulations! You've completed all four projects. You now have:
- 4 portfolio-ready projects
- Understanding of full-stack web development
- Backend fundamentals with Flask/Python
- Frontend skills with HTML/CSS/JS
- Database design and querying
- Security awareness

## ⏭️ Next Steps

1. **Deploy Your Projects** - Put them online with Heroku, PythonAnywhere, or Railway
2. **Add to Portfolio** - Showcase on GitHub with good READMEs
3. **Expand Features** - Try extension challenges
4. **Learn More** - Django, React, APIs, Testing
5. **Build Your Own** - Design and build your own project idea!

---

**Keep building and learning!** 🚀
