---
permalink: clean-code
title: "Clean Code Principles"
description: "The most important clean code principles for writing readable, maintainable, and professional software."
date: 2026-05-31
tags: ["Software"]
secondaryTags: ["Clean Code", "Best Practices", "Refactoring"]
thumbnail: "/images/blog/clean-code-thumbnail.svg"
lang: en
---

Clean code is code that is easy to read, understand, and change. These principles are based on Robert C. Martin's "Clean Code" book and industry best practices.

## Why Clean Code Matters

- You read code **10x more** than you write it
- Clean code reduces bugs
- Clean code makes onboarding faster
- AI tools produce better results when working with clean code

## Naming

The most important skill. Good names remove the need for comments.

```python
# Bad
d = 5
lst = get_data()
def calc(x, y): ...

# Good
days_since_last_login = 5
active_users = get_active_users()
def calculate_total_price(quantity, unit_price): ...
```

**Rules:**
- Use intention-revealing names
- Avoid abbreviations (except well-known ones like `url`, `id`)
- Classes = nouns (`UserService`, `OrderRepository`)
- Functions = verbs (`get_user`, `calculate_price`, `send_email`)
- Booleans = questions (`is_active`, `has_permission`, `can_edit`)

## Functions

```python
# Bad — does too many things
def process_order(order):
    validate(order)
    calculate_tax(order)
    save_to_db(order)
    send_email(order)
    update_inventory(order)

# Good — each function does one thing
def process_order(order):
    validated_order = validate(order)
    order_with_tax = calculate_tax(validated_order)
    save_order(order_with_tax)
    notify_customer(order_with_tax)
    update_inventory(order_with_tax)
```

**Rules:**
- **Small** — 5-20 lines ideally
- **Do one thing** — if you can extract a function, the original does too much
- **One level of abstraction** — don't mix high-level and low-level logic
- **Few arguments** — 0-2 is ideal, 3+ is a code smell
- **No side effects** — a function called `get_user` should not modify anything

## DRY — Don't Repeat Yourself

```python
# Bad — duplicated logic
def get_admin_greeting(name):
    return f"Hello, {name}! Welcome back. Today is {date.today()}"

def get_user_greeting(name):
    return f"Hello, {name}! Welcome back. Today is {date.today()}"

# Good
def get_greeting(name):
    return f"Hello, {name}! Welcome back. Today is {date.today()}"
```

But: **don't over-abstract**. Duplication is better than wrong abstraction.

## Comments

```python
# Bad — the comment says what the code already says
# increment counter by 1
counter += 1

# Bad — outdated comment
# Returns the user's age
def get_user_name(): ...

# Good — explains WHY, not WHAT
# We add 1 because the API uses 1-based indexing
index = position + 1

# Good — warns about consequences
# WARNING: This query takes ~30 seconds on large datasets
results = run_full_scan()
```

**Rule:** If you need a comment, first try to make the code clearer.

## Error Handling

```python
# Bad — generic catch
try:
    process_order(order)
except:
    print("error")

# Good — specific exceptions, meaningful messages
try:
    process_order(order)
except InsufficientStockError as e:
    logger.warning(f"Order failed: {e}")
    notify_customer_out_of_stock(order)
except PaymentDeclinedError as e:
    logger.error(f"Payment failed: {e}")
    retry_payment(order)
```

## Code Smells

| Smell | Problem | Solution |
|-------|---------|----------|
| Long functions | Hard to understand | Extract smaller functions |
| Long parameter lists | Complex interface | Use objects/dataclasses |
| Duplicate code | Multiple places to change | Extract shared function |
| Nested conditionals | Hard to follow | Guard clauses, early return |
| Magic numbers | Unclear meaning | Named constants |
| Dead code | Confusion | Delete it |

### Guard Clauses

```python
# Bad — deeply nested
def process(user):
    if user is not None:
        if user.is_active:
            if user.has_permission:
                do_work(user)

# Good — guard clauses
def process(user):
    if user is None:
        return
    if not user.is_active:
        return
    if not user.has_permission:
        return
    do_work(user)
```

## The Boy Scout Rule

> Leave the code cleaner than you found it.

Every time you touch a file, make one small improvement: rename a variable, extract a function, remove dead code.

## Summary

| Principle | Key Rule |
|-----------|----------|
| Naming | Names should reveal intention |
| Functions | Small, do one thing |
| DRY | Don't repeat, but don't over-abstract |
| Comments | Explain why, not what |
| Errors | Specific exceptions, meaningful messages |
| Boy Scout | Leave it better than you found it |
